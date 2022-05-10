/**
 * Changes Windows-style path to POSIX-style path
 * @param osSpecificPath
 * @returns path
 */
export function toPosixPath(osSpecificPath: string) {
  return osSpecificPath
    .replace(/^[A-Z]:/, '')
    .split('\\')
    .join('/');
}
