import { Tree } from '@nrwl/devkit';
import { execSync } from 'child_process';

export function createEnv(tree: Tree, options: NormalizedSchema) {
  const cwd = !options.standaloneConfig ? tree.root : options.projectRoot;
  try {
    if (options.packageManager === 'pip') {
      console.info('Creating requirements.txt file');
      tree.write(`${cwd}/requirements.txt`, '');
      console.info('Creating virtualenv & installing dependencies');
      execSync('python -m venv .venv && pip install -r requirements.txt', { cwd });
    } else if (options.packageManager === 'poetry') {
      console.info('Creating virtualenv & installing dependencies');
      execSync('poetry install', { cwd });
    }
  } catch (error) {
    console.error('Failed to execute command', error);
  }
}
