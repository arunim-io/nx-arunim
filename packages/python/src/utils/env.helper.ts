import { Tree } from '@nrwl/devkit';
import { execaCommandSync } from 'execa';
import { RequirementsTxt } from './files.constants';

export function createEnv(tree: Tree, options: NormalizedSchema) {
  const cwd = !options.standaloneConfig ? tree.root : options.projectRoot;
  try {
    if (options.packageManager === 'pip') {
      console.info('Creating requirements-dev.txt file');
      const content = RequirementsTxt(options);
      tree.write(`${cwd}/requirements-dev.txt`, content);
      console.info('Creating virtualenv & installing dependencies');
      const output = execaCommandSync(
        'python -m venv .venv && pip install -r requirements-dev.txt',
        { cwd },
      ).stdout;
      console.info(output);
    } else if (options.packageManager === 'poetry') {
      console.info('Creating virtualenv & installing dependencies');
      execaCommandSync('poetry update && poetry install', { cwd }).stdout;
    }
  } catch (error) {
    console.error('Failed to execute command', error);
  }
}
