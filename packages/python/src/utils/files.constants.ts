import { PythonShell } from 'python-shell';

export function RequirementsTxt({ testRunner, formatter, linter }: NormalizedSchema) {
  return `
  ${
    formatter === 'autopep8'
      ? `
    pep8
    autopep8
  `
      : formatter === 'black'
      ? 'black'
      : formatter === 'yapf' && 'yapf'
  }
  ${linter === 'pylint' ? 'pylint' : linter === 'flake8' && 'flake8'}
  ${testRunner === 'pytest' && 'pytest'}
  `;
}

export function PoetryToml({ name, testRunner, formatter, linter }: NormalizedSchema) {
  const version = PythonShell.getVersion();

  return `
  [tool.poetry]
  authors     = []
  description = ""
  name        = "${name}"
  version     = "0.0.1"

    [tool.poetry.dependencies]
    python = "^${version}"

    [tool.poetry.dev-dependencies]
    ${
      formatter === 'autopep8'
        ? `
      pep8 = "^1.7.1"
      autopep8 = "^1.6.0"
    `
        : formatter === 'black'
        ? 'black = "22.3.0"'
        : formatter === 'yapf' && 'yapf = "0.32.0"'
    }
    ${linter === 'pylint' ? `pylint = "^2.13.9"` : linter === 'flake8' && `flake8 = "^4.0.1"`}
    ${testRunner === 'pytest' && 'pytest = "^5.2"'}

  [build-system]
  build-backend = "poetry.core.masonry.api"
  requires      = ["poetry-core>=1.0.0"]
  `;
}
