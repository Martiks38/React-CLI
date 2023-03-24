# React CLI

React CLI is a program for creating components and hooks. This tool was created for learning and personal use.

## Requirements

- Node.js

## Installation

```bash
npm install
npm link
```

## Unistall

```bash
npm uninstall rg -g
npm unlink rg -g
npm rm rg -g
```

## Config

```JSON
{
  "usesTypeScript": true,
  "usesCSSModule": true,
  "cssPreprocessor": "scss"
}
```

- **usesTypeScript**: (Boolean) Default **_true_**. The components and hooks will be generated in tsx and ts format respectively.

- **usesCSSModule**: (Boolean) Default **_true_**. Generates the CSS Module file.

- **cssPreprocessor**: (String) Default **_scss_**. Values: scss, sass, and none.

- **root**: (String) Default **_src/_**.

## Commands

- `rg --version, -V`
- `rg --help, -h`
- `rg generate <component | hook> <name>` or `rg g <component | hook> <name>`
