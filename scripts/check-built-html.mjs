import fs from 'node:fs';
import path from 'node:path';

// Directories to check (Astro dist and Vercel static output)
const candidateDirs = ['dist', '.vercel/output/static'];
const targetDirs = candidateDirs.filter(d => fs.existsSync(d));

if (targetDirs.length === 0) {
  console.error('Error: No build output directory found (checked dist, .vercel/output/static).');
  process.exit(1);
}

function getHtmlFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

// Collect all unique html files
const htmlFiles = [];
const seenFiles = new Set();
for (const dir of targetDirs) {
  for (const file of getHtmlFiles(dir)) {
    const rel = path.relative(dir, file);
    if (!seenFiles.has(rel)) {
      seenFiles.add(rel);
      htmlFiles.push(file);
    }
  }
}

console.log(`Scanning ${htmlFiles.length} built HTML files for errors and old conflicting values...`);

function extractVisibleText(html) {
  // Remove scripts, styles, and HTML comments
  let text = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ');
  text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ');
  text = text.replace(/<!--[\s\S]*?-->/g, ' ');
  // Remove all other HTML tags
  text = text.replace(/<[^>]+>/g, ' ');
  // Decode common HTML entities
  text = text.replace(/&nbsp;/g, ' ')
             .replace(/&amp;/g, '&')
             .replace(/&lt;/g, '<')
             .replace(/&gt;/g, '>')
             .replace(/&quot;/g, '"')
             .replace(/&#39;/g, "'")
             .replace(/&rarr;/g, '→')
             .replace(/&ndash;/g, '–');
  // Collapse whitespace
  return text.replace(/\s+/g, ' ');
}

// Failure patterns: fail the build if found in built HTML
const failurePatterns = [
  { name: 'undefined', regex: /\bundefined\b/ },
  { name: 'NaN', regex: /\bNaN\b/ },
  { name: '[object Object]', regex: /\[object Object\]/ },
  { name: '₹2,50,000 onwards', regex: /₹2,50,000\s+onwards/ },
  { name: '₹1,500 – ₹7,000', regex: /₹1,500\s*[–—-]\s*₹7,000/ },
  { name: '₹1,500 – ₹10,000', regex: /₹1,500\s*[–—-]\s*₹10,000/ }
];

// Warning patterns: print a warning list (not a failure)
const warningPatterns = [
  { name: 'best', regex: /\bbest\b/i },
  { name: 'top', regex: /\btop\b/i },
  { name: 'No. 1', regex: /\bno\.?\s*1\b/i },
  { name: 'painless', regex: /\bpainless\b/i },
  { name: 'pain-free', regex: /\bpain-free\b/i },
  { name: 'guaranteed', regex: /\bguaranteed\b/i },
  { name: 'perfect', regex: /\bperfect\b/i },
  { name: 'lifetime', regex: /\blifetime\b/i },
  { name: 'warranty', regex: /\bwarranty\b/i },
  { name: 'success rate', regex: /\bsuccess rate\b/i },
  { name: '0%', regex: /\b0%\b/i }
];

let totalFailures = 0;
const failureHitsByFile = [];
let totalWarnings = 0;
const warningHitsByFile = [];

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const visible = extractVisibleText(content);
  
  const fileFailures = [];
  for (const { name, regex } of failurePatterns) {
    let match;
    const globalRegex = new RegExp(regex.source, 'g');
    while ((match = globalRegex.exec(visible)) !== null) {
      const start = Math.max(0, match.index - 80);
      const end = Math.min(visible.length, match.index + match[0].length + 80);
      const surrounding = visible.slice(start, end).trim();
      fileFailures.push({
        term: name,
        surrounding: `"...${surrounding}..."`
      });
      totalFailures++;
    }
  }
  if (fileFailures.length > 0) {
    failureHitsByFile.push({ file, hits: fileFailures });
  }

  const fileWarnings = [];
  for (const { name, regex } of warningPatterns) {
    let match;
    const globalRegex = new RegExp(regex.source, 'gi');
    while ((match = globalRegex.exec(visible)) !== null) {
      const start = Math.max(0, match.index - 60);
      const end = Math.min(visible.length, match.index + match[0].length + 60);
      const surrounding = visible.slice(start, end).trim();
      fileWarnings.push({
        term: name,
        surrounding: `"...${surrounding}..."`
      });
      totalWarnings++;
    }
  }
  if (fileWarnings.length > 0) {
    warningHitsByFile.push({ file, hits: fileWarnings });
  }
}

if (warningHitsByFile.length > 0) {
  console.log(`\n⚠️  Prohibited words warning scan: Found ${totalWarnings} occurrence(s) across ${warningHitsByFile.length} file(s) (Review if any non-quote copy):`);
  for (const { file, hits } of warningHitsByFile) {
    console.log(`  File: ${path.relative(process.cwd(), file)}`);
    for (const hit of hits.slice(0, 3)) { // Show up to 3 per file
      console.log(`    - Warning "${hit.term}": ${hit.surrounding}`);
    }
    if (hits.length > 3) {
      console.log(`    ... and ${hits.length - 3} more`);
    }
  }
}

if (totalFailures > 0) {
  console.error(`\n❌ Built HTML check FAILED: Found ${totalFailures} invalid visible text occurrence(s) across ${failureHitsByFile.length} file(s):\n`);
  for (const { file, hits } of failureHitsByFile) {
    console.error(`File: ${file}`);
    for (const hit of hits) {
      console.error(`  - Found "${hit.term}": ${hit.surrounding}`);
    }
    console.error('');
  }
  process.exit(1);
} else {
  console.log(`\n✓ HTML check PASSED: No invalid values ("undefined", "NaN", "[object Object]", "₹2,50,000 onwards", "₹1,500 – ₹7,000", "₹1,500 – ₹10,000") found in ${htmlFiles.length} built pages.`);
  process.exit(0);
}
