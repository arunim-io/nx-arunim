import { readWorkspaceConfiguration, Tree, updateWorkspaceConfiguration } from '@nrwl/devkit';
import { PoetryToml } from './files.constants';

function ensureConfigExists(tree: Tree, file: string) {
  if (!tree.exists(file)) return;

  const workspaceConfig = readWorkspaceConfiguration(tree);
  const dependencies = workspaceConfig.implicitDependencies ?? {};
  if (!dependencies[file]) {
    dependencies[file] = '*';
    workspaceConfig.implicitDependencies = dependencies;
    updateWorkspaceConfiguration(tree, workspaceConfig);
  }
}

export function addConfigFile(tree: Tree, options: NormalizedSchema) {
  if (!options.standaloneConfig) {
    const file = options.packageManager === 'poetry' && 'pyproject.toml';
    const content = options.packageManager === 'poetry' && PoetryToml(options);
    if (!tree.exists(file)) tree.write(file, content);
    ensureConfigExists(tree, file);
  }
}
