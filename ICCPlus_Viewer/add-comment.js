import fs from 'fs';
import path from 'path';

const DIST = path.resolve('./dist');
const manifestPath = path.join(DIST, './.vite/manifest.json');

if (!fs.existsSync(manifestPath)) {
    process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
const jsFiles = [];

if (manifest['index.html']) {
    jsFiles.push(path.join(DIST, manifest['index.html'].file));
}
if (manifest['index-legacy.html']) {
    jsFiles.push(path.join(DIST, manifest['index-legacy.html'].file));
}
jsFiles.push(path.join(DIST, './local/js/app.js'));
const pattern = /(app=\w+\()(\{version[\s\S]*?\})(\))/g;

const replacer = (_match, p1, p2, p3) => {
  return `${p1}\n\n/*! Delete and replace this part with your project if you're pasting it in, leave it here if you have placed your project.json file under index.html. */\n${p2}\n/*! End */\n\n${p3}`;
};

for (const file of jsFiles) {
  if (!fs.existsSync(file)) {
    continue;
  }

  const original = fs.readFileSync(file, 'utf-8');
  const replaced = original.replace(pattern, replacer);

  fs.writeFileSync(file, replaced, 'utf-8');
}
