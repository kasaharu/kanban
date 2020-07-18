import * as ejs from 'ejs';
import * as fs from 'fs';
import * as path from 'path';

let isProduction = false;
if (process.argv.length === 3) {
  isProduction = process.argv[2] === 'prod';
}

const envDirectory = path.join(__dirname, '../src/environments/');
const templateDirectory = path.join(envDirectory, 'templates/');
const targetEnvFile = isProduction ? 'environment.prod.ts' : 'environment.ts';

const overwriteValues = {
  KANBAN_API_KEY: process.env.KANBAN_API_KEY,
  KANBAN_AUTH_DOMAIN: process.env.KANBAN_AUTH_DOMAIN,
  KANBAN_DATABASE_URL: process.env.KANBAN_DATABASE_URL,
  KANBAN_PROJECT_ID: process.env.KANBAN_PROJECT_ID,
  KANBAN_STORAGE_BUCKET: process.env.KANBAN_STORAGE_BUCKET,
  KANBAN_MESSAGING_SENDER_ID: process.env.KANBAN_MESSAGING_SENDER_ID,
};

const environmentTemplate = fs.readFileSync(path.join(templateDirectory, targetEnvFile), { encoding: 'utf-8' });
const output = ejs.render(environmentTemplate, overwriteValues);
fs.writeFileSync(path.join(envDirectory, targetEnvFile), output);

process.exit(0);
