type Command = 'run' | 'build' | 'test' | 'lint';
type PackageManager = 'pip' | 'poetry' | 'pipenv';
type TestingPackage = 'unittest' | 'pytest';
type Linter = 'flake8' | 'pylint';
type Formatter = 'autpep8' | 'black' | 'yapf';

/** Base schema for generators */
interface GeneratorSchema {
  name: string;
  description?: string;
  tags?: string;
  directory?: string;
  packageManager?: PackageManager;
  standaloneConfig?: boolean;
  skipInstall?: boolean;
  testRunner?: TestingPackage;
  linter?: Linter;
  formatter?: Formatter;
}

/** Base schema for executors */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ExecutorSchema {}

/** Base normalized schema for executors */
interface NormalizedSchema extends GeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}
