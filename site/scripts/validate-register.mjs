// validate-register.mjs <file.jsonl> <schema.json>
// Every line must be valid JSON conforming to the schema; supersedes must
// point at an earlier line; timestamps must not decrease; no duplicate ids.
import fs from 'node:fs';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const [file, schemaFile] = process.argv.slice(2);
if (!file || !schemaFile) { console.error('usage: validate-register.mjs <file.jsonl> <schema.json>'); process.exit(2); }
const ajv = new Ajv2020({ allErrors: true, strict: true, strictRequired: false });
addFormats(ajv);
const validate = ajv.compile(JSON.parse(fs.readFileSync(schemaFile, 'utf8')));
const lines = fs.readFileSync(file, 'utf8').split('\n');
const ids = new Set(); let last = ''; let n = 0; let bad = 0;
lines.forEach((line, i) => {
  if (!line.trim()) return;
  n++;
  let e;
  try { e = JSON.parse(line); } catch (err) { console.error(`${file}:${i + 1}: invalid JSON: ${err.message}`); bad++; return; }
  if (!validate(e)) { console.error(`${file}:${i + 1}: ${ajv.errorsText(validate.errors, { separator: '\n    ' })}`); bad++; }
  if (ids.has(e.entry_id)) { console.error(`${file}:${i + 1}: duplicate entry_id ${e.entry_id}`); bad++; }
  if (e.supersedes && !ids.has(e.supersedes)) { console.error(`${file}:${i + 1}: supersedes '${e.supersedes}' which does not appear earlier in the file`); bad++; }
  if (e.timestamp < last) { console.error(`${file}:${i + 1}: timestamp ${e.timestamp} is earlier than the previous entry (${last}); entries are appended in order`); bad++; }
  if (file.endsWith('register.jsonl') && e.example) { console.error(`${file}:${i + 1}: example entries never go on the Register`); bad++; }
  // Bridge Article 14.1: a declaration includes Articles 1–7, 10, 11, 13 and 14; "full adoption" only if all fourteen.
  if (e.entry_type === 'declaration' && Array.isArray(e.articles_adopted)) {
    const have = new Set(e.articles_adopted);
    const missing = ['1','2','3','4','5','6','7','10','11','13','14'].filter((a) => !have.has(a));
    if (missing.length) { console.error(`${file}:${i + 1}: declaration must include Bridge Articles 1–7, 10, 11, 13 and 14 (Article 14.1); missing ${missing.join(', ')}`); bad++; }
    const all = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14'].every((a) => have.has(a));
    if (e.full_adoption && !all) { console.error(`${file}:${i + 1}: full_adoption may be true only where every Article is adopted (Article 14.1)`); bad++; }
  }
  // Article 14.3: an adoption expires three years after its declaration unless renewed.
  if ((e.entry_type === 'declaration' || e.entry_type === 'annual-verification') && e.expiry && e.timestamp) {
    const max = new Date(e.timestamp); max.setUTCFullYear(max.getUTCFullYear() + 3);
    if (new Date(e.expiry) > max) { console.error(`${file}:${i + 1}: expiry ${e.expiry} is more than three years after ${e.timestamp} (Article 14.3)`); bad++; }
  }
  // Article 5.4: a withholding is limited to ninety days unless renewed by the verifier.
  if (e.entry_type === 'withholding' && e.withholding && e.timestamp) {
    const max = new Date(e.timestamp); max.setUTCDate(max.getUTCDate() + 90);
    if (new Date(e.withholding.expires) > max) { console.error(`${file}:${i + 1}: withholding expires more than ninety days after the entry (Article 5.4)`); bad++; }
  }
  ids.add(e.entry_id); last = e.timestamp;
});
if (bad) { console.error(`validate-register: ${bad} problem(s) in ${file}`); process.exit(1); }
console.log(`validate-register: ${file}: ${n} entries valid`);
