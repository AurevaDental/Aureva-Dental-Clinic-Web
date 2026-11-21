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
    // Relative path to avoid duplicate checks if directories mirror each other
    const rel = path.relative(dir, file);
    if (!seenFiles.has(rel)) {
      seenFiles.add(rel);
      htmlFiles.push(file);
    }
  }
}

console.log(`Scanning ${htmlFiles.length} built HTML files for "undefined", "NaN", and "[object Object]" in visible text...`);

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
             .replace(/&rarr;/g, '→');
  // Collapse whitespace
  return text.replace(/\s+/g, ' ');
}

const patterns = [
  { name: 'undefined', regex: /\bundefined\b/ },
  { name: 'NaN', regex: /\bNaN\b/ },
  { name: '[object Object]', regex: /\[object Object\]/ }
];

let totalHits = 0;
const hitsByFile = [];

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const visible = extractVisibleText(content);
  
  const fileHits = [];
  for (const { name, regex } of patterns) {
    let match;
    const globalRegex = new RegExp(regex.source, 'g');
    while ((match = globalRegex.exec(visible)) !== null) {
      const start = Math.max(0, match.index - 80);
      const end = Math.min(visible.length, match.index + match[0].length + 80);
      const surrounding = visible.slice(start, end).trim();
      fileHits.push({
        term: name,
        surrounding: `"...${surrounding}..."`
      });
      totalHits++;
    }
  }

  if (fileHits.length > 0) {
    hitsByFile.push({ file, hits: fileHits });
  }
}

if (totalHits > 0) {
  console.error(`\n❌ Built HTML check FAILED: Found ${totalHits} invalid visible text occurrence(s) across ${hitsByFile.length} file(s):\n`);
  for (const { file, hits } of hitsByFile) {
    console.error(`File: ${file}`);
    for (const hit of hits) {
      console.error(`  - Found "${hit.term}": ${hit.surrounding}`);
    }
    console.error('');
  }
  process.exit(1);
} else {
  console.log(`✓ HTML check PASSED: No "undefined", "NaN", or "[object Object]" found in ${htmlFiles.length} built pages.`);
  process.exit(0);
}
