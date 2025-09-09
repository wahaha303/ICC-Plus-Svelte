import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, 'dist/local');
const indexPath = path.join(dist, 'index.html');

if (!fs.existsSync(indexPath)) {
  process.exit(1);
}

let html = fs.readFileSync(indexPath, 'utf-8');

const scriptTagRegex = /^[ \t]*<script\s+type="module"[^>]*src="([^"]+)"[^>]*><\/script>[ \t]*\r?\n?/im;
const match = html.match(scriptTagRegex);

if (!match) {
  process.exit(1);
}

const jsPath = match[1];

html = html.replace(scriptTagRegex, '');

const polyfillTag = `<script src="./js/polyfills.js"></script>`
html = html.replace(/<\/head>/i, `  ${polyfillTag}\n  </head>`);

const preloadTag = `<link href="${jsPath}" rel=preload as=script>`;
html = html.replace(/<\/head>/i, `  ${preloadTag}\n  </head>`);

const normalScriptTag = `<script src="${jsPath}"></script>`;
html = html.replace(/<\/body>/i, `  ${normalScriptTag}\n  </body>`);

fs.writeFileSync(indexPath, html, 'utf-8');
