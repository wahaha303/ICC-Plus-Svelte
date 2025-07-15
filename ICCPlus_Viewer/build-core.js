import fs from 'fs';
import path from 'path';

const DIST = path.resolve('./dist');
const manifestPath = path.join(DIST, './.vite/manifest.json');

if (!fs.existsSync(manifestPath)) {
    process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
const appEntry = manifest['index.html'];
const jsFile = appEntry.file;
const cssFiles = appEntry.css || [];
const legacyEntry = manifest['index-legacy.html'];
const polyfillEntry = manifest['vite/legacy-polyfills-legacy'];

const vendorChunk = Object.values(manifest).find(f => f.file.includes('chunk-vendors.') && f.file.endsWith('.js'));
const vendorCss = Object.values(manifest).find(f => f.file.includes('chunk-vendors.') && f.file.endsWith('.css'));

let coreJs = `const currentScript = document.currentScript || document.getElementsByTagName('script')[document.getElementsByTagName('script').length - 1];
const basePath = new URL('../', currentScript.src).pathname;

function add(tag, attrs = {}) {
    var el = document.createElement(tag);
    for (var key in attrs) {
        if (key === 'text') el.textContent = attrs[key];
        else el.setAttribute(key, attrs[key]);
    }
    document.head.appendChild(el);
}

add('link', { id: 'theme-light', rel: 'stylesheet', href: basePath + 'css/smui.css', media: '(prefers-color-scheme: light)' });
add('link', { id: 'theme-dark', rel: 'stylesheet', href: basePath + 'css/smui-dark.css', media: 'screen and (prefers-color-scheme: dark)' });
add('link', { rel: 'stylesheet', href: basePath + 'css/roboto.css' });
add('link', { rel: 'stylesheet', href: basePath + 'css/bootstrap.min.css' });
add('link', { rel: 'stylesheet', href: basePath + 'css/material-icons.css' });
`;

if (vendorCss) {
    coreJs += `add('link', { rel: 'stylesheet', href: basePath + '${vendorCss.file}', crossorigin: '' });\n`;
}
for (const css of cssFiles) {
    coreJs += `add('link', { rel: 'stylesheet', href: basePath + '${css}', crossorigin: '' });\n`;
}

if (vendorChunk) {
    coreJs += `add('link', { rel: 'modulepreload', href: basePath + '${vendorChunk.file}', crossorigin: '' });\n`;
}

coreJs += `add('script', { type: 'module', src: basePath + '${jsFile}', crossorigin: '' });
add('script', {
type: 'module',
text: \`
    import.meta.url;
    import("_").catch(() => 1);
    (async function*(){})().next();
    window.__vite_is_modern_browser = true;
\`
});
add('script', {
type: 'module',
text: \`
    !function(){
        if(window.__vite_is_modern_browser) return;
        console.warn("vite: loading legacy chunks, syntax error above and the same error below should be ignored");
        var e = document.getElementById("vite-legacy-polyfill");
        var n = document.createElement("script");
        n.src = e.src;
        n.onload = function(){
            System.import(document.getElementById('vite-legacy-entry').getAttribute('data-src'));
        };
        document.body.appendChild(n);
    }();
\`
});
`;

coreJs += `addEventListener('DOMContentLoaded', () => {
    var safariFix = document.createElement('script');
    safariFix.setAttribute('nomodule', '');
    safariFix.textContent = \`!function(){
        var e=document,t=e.createElement("script");
        if(!("noModule"in t)&&"onbeforeload"in t){
            var n=!1;
            e.addEventListener("beforeload",function(e){
                if(e.target===t)n=!0;
                else if(!e.target.hasAttribute("nomodule")||!n)return;
                e.preventDefault()
            },!0),
            t.type="module",
            t.src=".",
            e.head.appendChild(t),
            t.remove()
        }
    }();\`;
    document.body.appendChild(safariFix);

    var polyfillScript = document.createElement('script');
    polyfillScript.setAttribute('nomodule', '');
    polyfillScript.setAttribute('crossorigin', '');
    polyfillScript.id = 'vite-legacy-polyfill';
    polyfillScript.src = basePath + '${polyfillEntry.file}';
    polyfillScript.onload = function(){
        var entrySrc = basePath + '${legacyEntry.file}';
        function tryImport(retries) {
            if (window.System && typeof window.System.import === 'function') {
                window.System.import(entrySrc);
            } else if (retries > 0) {
                setTimeout(() => tryImport(retries - 1), 100);
            } else {
                console.error("SystemJS failed to load.");
            }
        }
        tryImport(100);
    }
    document.body.appendChild(polyfillScript);

    var legacyEntry = document.createElement('script');
    legacyEntry.setAttribute('nomodule', '');
    legacyEntry.setAttribute('crossorigin', '');
    legacyEntry.id = 'vite-legacy-entry';
    legacyEntry.setAttribute('data-src', basePath + '${legacyEntry.file}');
    document.body.appendChild(legacyEntry);
});
`;

fs.writeFileSync(path.join(DIST, './js/core.js'), coreJs);