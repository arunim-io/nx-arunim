import { ExecutorContext, Tree } from '@nrwl/devkit';
import { execSync } from 'child_process';
import { ensurePyprojectTomlDependency } from './ensurePyprojectTomlDependency';

/**
 * Creates a Python Virtual Environment
 * @param context The context of the executor.
 * @param params The parameters to pass to the command.
 * @param options The options to pass to the command.
 */
export async function createEnv(
  { projectName }: ExecutorContext,
  tree: Tree,
  command: Command,
  params: string[],
  options: { cwd?: string; cmd?: PackageManager } = {},
) {
  const cwd = options.cwd || process.cwd();
  let execute: string;
  switch (options.cmd) {
    case 'poetry':
      ensurePyprojectTomlDependency(tree);
      execute = `poetry shell`;
      break;
    default:
      execute = `python -m venv ${projectName} ${params.join(' ')}`;
      break;
  }

  try {
    console.log(`Executing command: ${execute}`);
    execSync(execute, { cwd, stdio: [0, 1, 2] });
    return { success: true };
  } catch (e) {
    console.error(`Failed to execute command: ${execute}`, e);
    return { success: false };
  }
}
