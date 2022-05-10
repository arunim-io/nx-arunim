import { CoreGeneratorSchema } from '../generators/core/schema';

export interface NormalisedSchema extends CoreGeneratorSchema {
  npmScope?: boolean;
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
  skipPyprojectToml?: boolean;
  pythonVersion?: string;
}
