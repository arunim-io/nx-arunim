import { generateFiles, names, offsetFromRoot, Tree } from '@nrwl/devkit';
import path = require('path');

export function addFiles(tree: Tree, dir: string, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };
  generateFiles(tree, path.join(dir, 'files'), options.projectRoot, templateOptions);
}
