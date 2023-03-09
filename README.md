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
    permissions:
      pull-requests: write
      issues: write
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      - name: Run todos to issue action
        uses: nearform/github-action-todos-to-issue@v1
```

You can easily replace the branch on which the scan will be executed (default is _main_) or add multiple branches.

The same applies with the events on which you want to apply the action (default is on _push_ event)

## Inputs
This action has different inputs, some of them required and others optional:

* `github-token`:
  * **Description**: this value is automatically populated by GitHub
  * **Required**: no
* `pattern`:
  * **Description**: it specifies the pattern you want to match during the scan of the source code.
  * **Required**: no
  * **Default**: `'TODO:,// TODO'`
* `scan-dir`:
  * **Description**: it specifies the directory you want to scan.
  * **Required**: no
  * **Default**: `'.'`
