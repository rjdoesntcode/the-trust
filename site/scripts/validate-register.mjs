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
  ids.add(e.entry_id); last = e.timestamp;
});
if (bad) { console.error(`validate-register: ${bad} problem(s) in ${file}`); process.exit(1); }
console.log(`validate-register: ${file}: ${n} entries valid`);
