// Reads the Register (append-only JSON Lines) and the worked example.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(here, '../../..');
const read = (f) => fs.existsSync(f) ? fs.readFileSync(f, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : [];

export default function () {
  const entries = read(path.join(ROOT, 'register/register.jsonl'));
  const examples = read(path.join(ROOT, 'register/example-entry.jsonl'));
  if (entries.some((e) => e.example)) throw new Error('register.jsonl contains an entry marked example:true; examples never go on the Register');
  const byId = new Map(entries.map((e) => [e.entry_id, e]));
  for (const e of entries) {
    if (e.supersedes && !byId.has(e.supersedes)) throw new Error(`Register entry ${e.entry_id} supersedes unknown entry ${e.supersedes}`);
  }
  const superseded = new Set(entries.filter((e) => e.supersedes).map((e) => e.supersedes));
  return { entries, examples, superseded: [...superseded], empty: entries.length === 0, schema: JSON.parse(fs.readFileSync(path.join(ROOT, 'register/schema.json'), 'utf8')) };
}
