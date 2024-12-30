import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { resolve, dirname } from "path";
import { isGitRepository } from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

process.chdir(resolve(__dirname, '../'));

const prepare = () => {
  if (isGitRepository()) {
    try {
      execSync("pnpm run prepare:husky");
      console.log('Husky successfully prepared.');
    } catch (error) {
      console.error("Failed to prepare Husky: ", error.message);
      process.exit(1);
    }
  } else {
    console.log("Not a git repository. Skipping Husky setup.")
  }
}

prepare();
