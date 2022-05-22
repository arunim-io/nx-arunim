import { Tree } from '@nrwl/devkit';
import { ensurePyprojectTomlDependency } from './ensurePyprojectTomlDependency';
import { NormalisedSchema } from './schema';

export function createPyprojectToml(tree: Tree, options: NormalisedSchema) {
  if (options.packageManager === 'poetry') {
    const file = 'pyproject.toml';
    const content = `
    [tool.poetry]
    name        = "${options.npmScope}\n"
    version     = "^${options.pythonVersion}\n"
    description = ""

      [tool.poetry.dependencies]
      python = "^3.7"

      [tool.poetry.dev-dependencies]

    [build-system]
    build-backend = "poetry.core.masonry.api"
    requires      = ["poetry-core>=1.0.0"]
    `;
    if (!tree.exists(`${file}`)) tree.write(`${file}`, content);
    ensurePyprojectTomlDependency(tree);
  }
}
