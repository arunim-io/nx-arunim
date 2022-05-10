import { readWorkspaceConfiguration, Tree, updateWorkspaceConfiguration } from '@nrwl/devkit';

/**
 * Ensures that pyproject.toml is an implicit dependency so that changes to pyproject.toml triggers
 * projects to be flagged as affected
 */
export function ensurePyprojectTomlDependency(tree: Tree) {
  const file = 'pyproject.toml';
  if (!tree.exists(file)) return;
  const workspaceConfig = readWorkspaceConfiguration(tree);
  const dependencies = workspaceConfig.implicitDependencies ?? {};
  if (!dependencies[file]) {
    dependencies[file] = '*';
    workspaceConfig.implicitDependencies = dependencies;
    updateWorkspaceConfiguration(tree, workspaceConfig);
  }
}
