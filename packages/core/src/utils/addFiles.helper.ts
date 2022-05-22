import { generateFiles, names, offsetFromRoot, Tree } from '@nrwl/devkit';
import { NormalisedSchema } from './schema';

/**
 * Adds files to the tree
 * @param tree The tree to add files to
 * @param srcFolder Source folder of the project
 * @param options The options to use
 */
export function addFiles(tree: Tree, srcFolder: string, options: NormalisedSchema) {
  const projectNames = names(options.name);
  const templateOptions = {
    ...options,
    ...projectNames,
    packageName: names(options.projectName).fileName.split('-').join('_'),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };
  generateFiles(tree, srcFolder, options.projectRoot, templateOptions);
}
