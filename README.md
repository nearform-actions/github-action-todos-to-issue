![CI](https://github.com/nearform/github-action-todos-to-issue/actions/workflows/ci.yml/badge.svg?event=push)

# github-action-todos-to-issue
This GitHub action scans your repository looking for TODO comments in your source code and then creates an issue with the found todos.

## Basic example
To use this action you can simply create a new file in your repository located in `.github/workflows/todos-to-issue.yml` and paste the content below into it:

```yaml
name: Todos to issue

on:
  push:
    branches:    
      - 'main'

jobs:
  todos-to-issue:
    runs-on: ubuntu-latest
    name: Looks for TODO comments in the source code and creates an issue with the found TODOs
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      - name: Get branch name
        id: get_branch
        shell: bash
        run: echo "##[set-output name=branch;]$(echo ${GITHUB_REF#refs/heads/})"
      - name: Run todos to issue action
        uses: ./.github/actions/github-action-todos-to-issue
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          github-branch: ${{ steps.get_branch.outputs.branch }}
```

You can easily replace the branch on which the scan will be executed (default is _main_) or add multiple branches.

The same applies with the events on which you want to apply the action (default is on _push_ event)

## Inputs
This action has different inputs, some of them required and others optional:

* `github-token`:
  * **Description**: this value is automatically populated by GitHub
  * **Required**: yes
* `github-branch`:
  * **Description**: this value is automatically populated with the `get_branch` step in the `todos-to-issue.yml` file
  * **Required**: yes
* `pattern`:
  * **Description**: it specifies the pattern you want to match during the scan of the source code.
  * **Required**: no
  * **Default**: `'TODO:,// TODO'`
* `scan-dir`:
  * **Description**: it specifies the directory you want to scan.
  * **Required**: no
  * **Default**: `'.'`
* `exclude-dirs`:
  * **Description**: it specifies the excluded directories from the scan.
  * **Required**: no
  * **Default**: `'node_modules,.github'`
* `scan-extensions`:
  * **Description**: it specifies the files extensions you want to scan.
  * **Required**: no
  * **Default**: `'.js,.ts,.cjs,.mjs'`

## Example with all the inputs
```yaml
name: Todos to issue

on:
  push:
    branches:    
      - 'main'

jobs:
  todos-to-issue:
    runs-on: ubuntu-latest
    name: Looks for TODO comments in the source code and creates an issue with the found TODOs
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      - name: Get branch name
        id: get_branch
        shell: bash
        run: echo "##[set-output name=branch;]$(echo ${GITHUB_REF#refs/heads/})"
      - name: Run todos to issue action
        uses: ./.github/actions/github-action-todos-to-issue
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          github-branch: ${{ steps.get_branch.outputs.branch }}
          pattern: 'TODO:,// TODO'
          scan-dir: '.'
          exclude-dirs: 'node_modules,.github'
          scan-extensions: '.js,.ts,.cjs,.mjs'
```