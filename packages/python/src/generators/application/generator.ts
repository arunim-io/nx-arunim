import { addProjectConfiguration, formatFiles, normalizePath, Tree } from '@nrwl/devkit';
import { join, normalize } from 'path';
import { addConfigFile } from '../../utils/config.helper';
import { createEnv } from '../../utils/env.helper';
import { addFiles } from '../../utils/files.helper';
import { normalizeOptions } from '../../utils/normalizeOptions.helper';
import { ApplicationGeneratorSchema } from './schema';

export default async function (tree: Tree, options: ApplicationGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);
  const sourceRoot = normalizedOptions.projectRoot;
  const targetOptions = {
    outputPath: normalizePath(join(normalize('dist'), sourceRoot)),
    main: normalizePath(join(sourceRoot, 'main.py')),
  };

  addProjectConfiguration(tree, normalizedOptions.projectName, {
    root: normalizedOptions.projectRoot,
    projectType: 'library',
    sourceRoot: `${normalizedOptions.projectRoot}/src`,
    targets: {
      build: {
        executor: '@nx-python/core:build',
        options: targetOptions,
      },
      serve: {
        executor: '@nx-python/core:serve',
        options: {
          main: targetOptions.main,
        },
      },
      test: {
        executor: '@nx-python/core:test',
      },
      lint: {
        executor: '@nx-python/core:lint',
      },
    },
    tags: normalizedOptions.parsedTags,
  });

  if (normalizedOptions.packageManager !== 'pip') addConfigFile(tree, normalizedOptions);
  addFiles(tree, __dirname, normalizedOptions);
  createEnv(tree, normalizedOptions);
  await formatFiles(tree);
}
