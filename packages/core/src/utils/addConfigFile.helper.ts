import { Tree } from '@nrwl/devkit';
import { PythonShell } from 'python-shell';
import { NormalizedSchema } from '../types';
import { ensureConfigExists } from './ensurePyprojectTomlExists.helper';

export function addConfigFile(tree: Tree, options: NormalizedSchema) {
  if (!options.standaloneConfig) {
    const file = options.packageManager === 'poetry' && 'pyproject.toml';
    const version = PythonShell.getVersion();
    const content =
      options.packageManager === 'poetry' &&
      `
    [tool.poetry]
    authors     = ["Mugdha Arunim Ahmed <mugdhaarunimahmed2017@gmail.com>"]
    description = ""
    name        = "${options.name}"
    version     = "0.0.1"

      [tool.poetry.dependencies]
      python = "^${version}"

      [tool.poetry.dev-dependencies]
      pytest = "^5.2"

    [build-system]
    build-backend = "poetry.core.masonry.api"
    requires      = ["poetry-core>=1.0.0"]
    `;
    if (!tree.exists(file)) tree.write(file, content);
    ensureConfigExists(tree, file);
  }
}
