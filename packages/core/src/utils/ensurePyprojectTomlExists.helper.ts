import { readWorkspaceConfiguration, Tree, updateWorkspaceConfiguration } from '@nrwl/devkit';

export function ensureConfigExists(tree: Tree, file: string) {
  if (!tree.exists(file)) return;

  const workspaceConfig = readWorkspaceConfiguration(tree);
  const dependencies = workspaceConfig.implicitDependencies ?? {};
  if (!dependencies[file]) {
    dependencies[file] = '*';
    workspaceConfig.implicitDependencies = dependencies;
    updateWorkspaceConfiguration(tree, workspaceConfig);
  }
}
