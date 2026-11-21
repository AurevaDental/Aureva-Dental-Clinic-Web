const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.json': 'application/json',
  '.woff2': 'font/woff2'
};

function createStaticServer(distDir, port) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let reqPath = decodeURI(req.url.split('?')[0]);
      if (reqPath.endsWith('/')) reqPath += 'index.html';
      let filePath = path.join(distDir, reqPath);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }
      if (!fs.existsSync(filePath)) {
        filePath = path.join(distDir, '404.html');
      }
      if (!fs.existsSync(filePath)) {
        res.writeHead(404);
        return res.end('Not Found');
      }
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    });

    server.listen(port, () => {
      resolve(server);
    });
  });
}

async function runAudit() {
  const lighthouse = (await import('lighthouse')).default;
  const chromeLauncher = await import('chrome-launcher');

  const server = await createStaticServer(path.resolve('dist/client'), 4321);
  console.log('Static server listening on http://localhost:4321');

  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu']
  });
  console.log('Chrome launched on port:', chrome.port);

  const pages = [
    { name: 'home', path: '/' },
    { name: 'prices', path: '/prices/' },
    { name: 'treatment', path: '/treatments/dental-implants/' }
  ];

  const results = {};

  for (const page of pages) {
    console.log(`Auditing ${page.name} (${page.path})...`);
    const runnerResult = await lighthouse(`http://localhost:4321${page.path}`, {
      port: chrome.port,
      output: 'json',
      logLevel: 'error',
      formFactor: 'mobile',
      screenEmulation: {
        mobile: true,
        width: 390,
        height: 844,
        deviceScaleFactor: 2,
        disabled: false
      },
      throttling: {
        rttMs: 150,
        throughputKbps: 1638.4,
        cpuSlowdownMultiplier: 4
      }
    });

    const lhr = runnerResult.lhr;
    results[page.name] = {
      performanceScore: Math.round(lhr.categories.performance.score * 100),
      accessibilityScore: Math.round(lhr.categories.accessibility.score * 100),
      lcp: lhr.audits['largest-contentful-paint'].displayValue,
      cls: lhr.audits['cumulative-layout-shift'].displayValue,
      fcp: lhr.audits['first-contentful-paint'].displayValue,
      tbt: lhr.audits['total-blocking-time'].displayValue
    };
  }

  await chrome.kill();
  server.close();

  console.log('\n--- LIGHTHOUSE RESULTS ---');
  console.log(JSON.stringify(results, null, 2));
}

runAudit().catch(err => {
  console.error('Audit error:', err);
  process.exit(1);
});
