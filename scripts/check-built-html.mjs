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

console.log(`Scanning ${htmlFiles.length} built HTML files for errors and prohibited claims...`);

function extractPageContent(html) {
  // 1. Title tags
  const titles = Array.from(html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi), m => m[1]);
  // 2. Meta content attributes
  const metas = Array.from(html.matchAll(/<meta\b[^>]*\bcontent=["']([^"']*)["'][^>]*>/gi), m => m[1]);
  // 3. JSON-LD scripts
  const jsonLds = Array.from(html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi), m => m[1]);
  
  // 4. Visible text: remove scripts (styles, non-jsonld scripts, comments, html tags)
  let bodyText = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ');
  bodyText = bodyText.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ');
  bodyText = bodyText.replace(/<!--[\s\S]*?-->/g, ' ');
  bodyText = bodyText.replace(/<[^>]+>/g, ' ');

  const combined = [bodyText, ...titles, ...metas, ...jsonLds].join('. ');
  return combined.replace(/&nbsp;/g, ' ')
                 .replace(/&amp;/g, '&')
                 .replace(/&lt;/g, '<')
                 .replace(/&gt;/g, '>')
                 .replace(/&quot;/g, '"')
                 .replace(/&#39;/g, "'")
                 .replace(/&rarr;/g, '→')
                 .replace(/&ndash;/g, '–')
                 .replace(/\s+/g, ' ');
}

function extractSentence(text, matchIndex, matchLength) {
  const before = text.slice(Math.max(0, matchIndex - 120), matchIndex);
  const after = text.slice(matchIndex + matchLength, Math.min(text.length, matchIndex + matchLength + 120));
  
  // Find start of sentence (. ! ? or start of string)
  const startOffset = before.search(/[.!?]\s+[A-Z0-9"'{]/);
  const start = startOffset !== -1 ? Math.max(0, matchIndex - 120 + startOffset + 2) : Math.max(0, matchIndex - 80);
  
  // Find end of sentence (. ! ? or end of string)
  const endOffset = after.search(/[.!?](?:\s|$)/);
  const end = endOffset !== -1 ? matchIndex + matchLength + endOffset + 1 : Math.min(text.length, matchIndex + matchLength + 80);
  
  return text.slice(start, end).trim();
}

// Failure patterns: fail the build if found in built HTML (visible text, meta, or JSON-LD)
const failurePatterns = [
  // Build corruption / invalid values
  { name: 'undefined', regex: /\bundefined\b/ },
  { name: 'NaN', regex: /\bNaN\b/ },
  { name: '[object Object]', regex: /\[object Object\]/ },
  { name: '₹2,50,000 onwards', regex: /₹2,50,000\s+onwards/ },
  { name: '₹1,500 – ₹7,000', regex: /₹1,500\s*[–—-]\s*₹7,000/ },
  { name: '₹1,500 – ₹10,000', regex: /₹1,500\s*[–—-]\s*₹10,000/ },
  
  // Guarded claims (FAILURES per Task 4)
  { name: 'hospital-grade', regex: /hospital-grade/i },
  { name: 'hospital grade', regex: /hospital\s+grade/i },
  { name: 'air polish', regex: /air\s+polish/i },
  { name: 'airflow', regex: /airflow/i },
  { name: 'CAD/CAM', regex: /CAD\/CAM/i },
  { name: 'hermetically sealed', regex: /hermetically\s+sealed/i },
  { name: 'sterilization pouch', regex: /sterilization\s+pouch/i },
  { name: 'sterilisation pouch', regex: /sterilisation\s+pouch/i },
  { name: 'validated autoclave', regex: /validated\s+autoclave/i },
  { name: 'computerized local', regex: /computerized\s+local/i },
  { name: 'computerised local', regex: /computerised\s+local/i },
  { name: 'Invisalign', regex: /\bInvisalign\b/i },
  { name: 'Damon', regex: /\bDamon\b/i },
  { name: '0% EMI', regex: /0%\s*EMI/i },
  { name: 'lifetime', regex: /\blifetime\b/i },
  { name: 'warranty', regex: /\bwarranty\b/i },
  { name: 'success rate', regex: /\bsuccess\s+rate\b/i },
  { name: 'painless', regex: /\bpainless/i },
  { name: 'pain-free', regex: /\bpain-free/i },
  { name: 'perfect', regex: /\bperfect/i },
  { name: 'safest', regex: /\bsafest\b/i },
  { name: 'guaranteed', regex: /\bguaranteed\b/i },
  { name: 'Dr. Agniss', regex: /Dr\.?\s*Agniss/i },
  { name: 'Single-Sitting Root Canal', regex: /Single-Sitting\s+Root\s+Canal/i }
];

// Warning patterns: print a warning list (not a failure)
const warningPatterns = [
  { name: 'best', regex: /\bbest\b/i },
  { name: 'top', regex: /\btop\b/i },
  { name: 'No. 1', regex: /\bno\.?\s*1\b/i }
];

let totalFailures = 0;
const failureHitsByFile = [];
let totalWarnings = 0;
const warningHitsByFile = [];

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const pageText = extractPageContent(content);
  
  const fileFailures = [];
  for (const { name, regex } of failurePatterns) {
    let match;
    const globalRegex = new RegExp(regex.source, regex.flags.includes('g') ? regex.flags : regex.flags + 'g');
    while ((match = globalRegex.exec(pageText)) !== null) {
      const sentence = extractSentence(pageText, match.index, match[0].length);
      fileFailures.push({
        term: name,
        sentence
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
    const globalRegex = new RegExp(regex.source, regex.flags.includes('g') ? regex.flags : regex.flags + 'g');
    while ((match = globalRegex.exec(pageText)) !== null) {
      const sentence = extractSentence(pageText, match.index, match[0].length);
      fileWarnings.push({
        term: name,
        sentence
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
      console.log(`    - Warning "${hit.term}": "${hit.sentence}"`);
    }
    if (hits.length > 3) {
      console.log(`    ... and ${hits.length - 3} more`);
    }
  }
}

if (totalFailures > 0) {
  console.error(`\n❌ Built HTML check FAILED: Found ${totalFailures} invalid occurrence(s) across ${failureHitsByFile.length} file(s):\n`);
  for (const { file, hits } of failureHitsByFile) {
    const relFile = path.relative(process.cwd(), file);
    console.error(`Page: ${relFile}`);
    for (const hit of hits) {
      console.error(`  - Found "${hit.term}": "${hit.sentence}"`);
    }
    console.error('');
  }
  process.exit(1);
} else {
  console.log(`\n✓ HTML check PASSED: No invalid values or prohibited claims found in ${htmlFiles.length} built pages.`);
  process.exit(0);
}
