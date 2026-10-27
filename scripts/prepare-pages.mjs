import { copyFile, writeFile } from 'node:fs/promises';

// GitHub Pages serves 404.html for unknown paths. Copying the built app there
// lets BrowserRouter handle deep links such as /Lithos/course on a refresh.
await copyFile('dist/index.html', 'dist/404.html');
await writeFile('dist/.nojekyll', '');

console.log('Prepared dist/404.html and dist/.nojekyll for GitHub Pages.');
