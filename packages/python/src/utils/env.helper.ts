import { Tree } from '@nrwl/devkit';
import { execaCommandSync } from 'execa';

export function createEnv(tree: Tree, options: NormalizedSchema) {
  const cwd = !options.standaloneConfig ? tree.root : options.projectRoot;
  try {
    if (options.packageManager === 'pip') {
      console.info('Creating requirements.txt file');
      const content = `
      pytest
      `;
      tree.write(`${cwd}/requirements.txt`, content);
      console.info('Creating virtualenv & installing dependencies');
      const output = execaCommandSync('python -m venv .venv && pip install -r requirements.txt', {
        cwd,
      }).stdout;
      console.info(output);
    } else if (options.packageManager === 'poetry') {
      console.info('Creating virtualenv & installing dependencies');
      execaCommandSync('poetry install', { cwd }).stdout;
    }
  } catch (error) {
    console.error('Failed to execute command', error);
  }
}
