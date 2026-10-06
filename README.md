# CRC Payroll

CRC Payroll is a minimal web application with a PDF file picker. Files remain in
the browser; PDF extraction, payroll portal integration, and exports are not yet
implemented.

> **Repository boundary:** files created in a remote development workspace do
> not automatically appear in a Windows clone or on GitHub. A successful
> `git push` must upload the commits to GitHub, and the Windows clone must then
> run `git pull`. If the push fails, repeatedly pulling the Windows clone cannot
> retrieve those unpublished commits.

## Run locally

1. Clone the repository and enter its directory:

   ```powershell
   git clone https://github.com/Mzucchi/CRC.git
   cd CRC
   ```

2. Start the application (no third-party packages are required):

   ```powershell
   npm start
   ```

3. Open <http://localhost:4173>.

The repository root must contain `package.json`. If `npm` reports `ENOENT`,
confirm that you are in the cloned `CRC` directory rather than its hidden
`.git` directory.

### Update an existing Windows clone

If `C:\Projects\CRC` already contains a `.git` directory, do not clone the
repository a second time. Update that clone and start the app from PowerShell:

```powershell
cd C:\Projects\CRC
git switch main
git pull --ff-only origin main
Test-Path .\package.json
npm start
```

`Test-Path` must print `True`. If it prints `False`, confirm that the GitHub
repository's `main` branch contains the application files before retrying the
pull.

## Publish changes to GitHub

Authenticated maintainers can publish a local branch with Git. GitHub CLI is
not required:

```powershell
git remote set-url origin https://github.com/Mzucchi/CRC.git
git push -u origin HEAD
```

After the push completes, open
<https://github.com/Mzucchi/CRC/compare/main...work?expand=1> to create a pull
request in the browser. If the branch has a name other than `work`, select it
from the **compare** branch menu on that page.

Alternatively, GitHub Desktop can publish the current branch and create the
pull request without installing GitHub CLI. Select the repository, switch to
the branch containing the application, click **Publish branch**, and then click
**Create Pull Request**. After the pull request is merged, use the update
commands above on every local clone.

The optional `gh` command is provided by [GitHub CLI](https://cli.github.com/),
which is a separate installation from Git. If Windows reports that `gh` is not
recognized, use the browser or GitHub Desktop workflow above instead.

## Build and preview

```powershell
npm run build
npm run preview
```

The build is written to `dist/`, and the preview server listens on port 4173 by
default. Set `HOST` or `PORT` to override the server defaults.
