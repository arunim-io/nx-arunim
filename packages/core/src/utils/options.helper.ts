import { names, readJson, Tree } from '@nrwl/devkit';
import { CoreGeneratorSchema } from '../generators/core/schema';
import { NormalisedSchema } from './schema';

export function normaliseOptions(
  tree: Tree,
  projectBase: string,
  options: CoreGeneratorSchema,
): NormalisedSchema {
  const nxJson = readJson(tree, 'nx.json');
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${projectBase}/${projectDirectory}`;
  const parsedTags = options.tags ? options.tags.split(',').map((s) => s.trim()) : [];
  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
    skipPyprojectToml: !!options.skipPyprojectToml,
    npmScope: nxJson.npmScope,
    pythonVersion: options.pythonVersion,
  };
}
