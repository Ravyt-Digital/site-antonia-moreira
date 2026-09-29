import { cp, mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'dist');
const html = await readFile(path.join(root, 'index.html'), 'utf8');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(path.join(root, 'public'), output, { recursive: true });
await writeFile(path.join(output, 'index.html'), html);
const assets = new Set([...html.matchAll(/(?:src|href)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)].map(match => decodeURIComponent(match[1])));
for (const asset of assets) {
  const filename = path.resolve(output, '.' + asset);
  if (!filename.startsWith(output + path.sep) || !(await stat(filename)).isFile()) {
    throw new Error(`Arquivo local ausente ou inválido: ${asset}`);
  }
}
console.log(`Build concluído: dist/; ${assets.size} arquivos locais verificados.`);
