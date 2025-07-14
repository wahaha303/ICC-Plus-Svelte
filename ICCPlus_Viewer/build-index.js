import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, 'dist');
const indexPath = path.join(dist, 'index.html');

if (!fs.existsSync(indexPath)) {
  process.exit(1);
}

const html = fs.readFileSync(indexPath, 'utf-8');

const cleanedHead = `<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1" />
    <title>CYOA Plus 2</title>
    <link rel="stylesheet" href="./css/loading.css">
    <script src="./js/core.js"></script>
</head>
`;

const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
let cleanedBody = bodyMatch ? bodyMatch[1] : '';
cleanedBody = cleanedBody.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '');
cleanedBody = cleanedBody.replace(/<script[^>]*\/?>/gi, '');

const finalHtml = `<!doctype html>
<html lang="en">
${cleanedHead}
<body>
    ${cleanedBody.trim()}
</body>
</html>`;

fs.writeFileSync(indexPath, finalHtml, 'utf-8');