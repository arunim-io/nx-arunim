import { ExecutorContext } from '@nrwl/devkit';
import { execSync } from 'child_process';

/**
 * Executes python in a shell.
 * @param context The context of the executor.
 * @param command The command to execute.
 * @param params The parameters to pass to the command.
 * @param options The options to pass to the command.
 */
export function runPythonCommand(
  context: ExecutorContext,
  command: Command,
  params: string[],
  options: { cwd?: string; cmd?: string } = {},
) {
  // Take the parameters or set defaults
  const cmd = options.cmd || 'python3';
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
