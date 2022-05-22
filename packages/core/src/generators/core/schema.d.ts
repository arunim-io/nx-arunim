export interface CoreGeneratorSchema {
  name: string;
  tags?: string;
  directory?: string;
  packageManager?: PackageManager;
  pythonVersion?: string;
}
