import { existsSync } from 'fs';

export const isGitRepository = () => {
  return existsSync('.git');
}
