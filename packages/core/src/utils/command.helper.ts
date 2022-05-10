import { ExecutorContext } from '@nrwl/devkit';
import { execSync } from 'child_process';

/**
 * Executes python in a shell.
 * @param context
 * @param command
 * @param params
 * @param options
 * @returns success
 */
export function runPythonCommand(
  context: ExecutorContext,
  command: 'build' | 'run' | 'test',
  params: string[],
  options: { cwd?: string; cmd?: string } = {},
) {
  // Take the parameters or set defaults
  const cmd = options.cmd || 'poetry';
  const cwd = options.cwd || process.cwd();

  // Create the command to execute
  const execute = `${cmd} ${command} ${params.join(' ')}`;

  try {
    console.log(`Executing command: ${execute}`);
    execSync(execute, { cwd, stdio: [0, 1, 2] });
    return { success: true };
  } catch (e) {
    console.error(`Failed to execute command: ${execute}`, e);
    return { success: false };
  }
}
