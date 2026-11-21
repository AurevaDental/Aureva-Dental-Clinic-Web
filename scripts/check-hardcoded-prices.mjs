import fs from 'node:fs';
import path from 'node:path';

const SRC_DIR = path.resolve('src');
const EXCLUDED_FILES = [
  path.resolve('src/data/prices.ts'),
];

// Matches ₹, Rs., Rs, INR followed by digits (e.g. ₹500, Rs. 500, INR 500) or shorthand like ₹4k
const PRICE_REGEX = /(?:₹\s*\d+|\b(?:Rs\.?|INR)\s*\d+)/i;

function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const allFiles = walkDir(SRC_DIR);
let violations = [];

for (const filePath of allFiles) {
  if (EXCLUDED_FILES.includes(filePath)) continue;

  const content = fs.readFileSync(filePath, 'utf8');

  // If file contains FOREIGN_BENCHMARKS, mask out the FOREIGN_BENCHMARKS declaration
  let sanitizedContent = content;
  if (content.includes('FOREIGN_BENCHMARKS')) {
    // Replace everything between const FOREIGN_BENCHMARKS = ... ; with blank lines
    sanitizedContent = content.replace(/const\s+FOREIGN_BENCHMARKS\s*=\s*[\s\S]*?;\s*(\n|$)/g, (match) => {
      return match.split('\n').map(() => '').join('\n');
    });
  }

  const lines = sanitizedContent.split('\n');
  lines.forEach((line, index) => {
    // Check if line matches price regex
    if (PRICE_REGEX.test(line)) {
      violations.push({
        file: path.relative(process.cwd(), filePath).replace(/\\/g, '/'),
        line: index + 1,
        text: line.trim()
      });
    }
  });
}

if (violations.length > 0) {
  console.error(`\n❌ Found ${violations.length} hardcoded price(s) in src/:`);
  violations.forEach(v => {
    console.error(`  ${v.file}:${v.line} -> ${v.text}`);
  });
  console.error('\nPlease replace all hardcoded prices with canonical keys from src/data/prices.ts.\n');
  process.exit(1);
} else {
  console.log('✅ No hardcoded prices found in src/.');
  process.exit(0);
}
