<h1 align="center">React CLI 💻</h1>

<h2>
  React CLI is a program for creating components and hooks. This tool was created for learning and personal use.
</h2>

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

### Requirements

- Node.js 16
- npm 5.2+

### Table of Contents

- [Config file](#config-file)
- [Generate components](#generate-components)
- [Generate hooks](#generate-hooks)

### Execution

You can run it using npx

```bash
  npx rg component Avatar
```

### Config file

When first run in the project. It will look for the rcliconfig.json configuration file. If it does not find it, it will ask you a series of questions and will generate said configuration file in the root of the project.

Example of the **rcliconfig.json** config file:

```JSON
  {
    "baseURL": "src",
    "usesTypeScript": true,
    "usesCSSModule": false,
    "cssPreprocessor": "none"
  }
```

- **usesTypeScript**: (Boolean) Default **_true_**. The components and hooks will be generated in tsx and ts format respectively.

- **usesCSSModule**: (Boolean) Default **_true_**. Generates the CSS Module file.

- **cssPreprocessor**: (String) Default **_scss_**. Values: scss, sass, and none.

- **root**: (String) Default **_src/_**.

### Commands

- `npx rg --version, -V`
- `npx rg --help, -h`
- `npx rg component <name>` or `npx rg component <name>`
- `npx rg hook <name>` or `npx rg hook <name>`
- `npx rg root`
- `npx rg root --change <baseURL>`

### Generate Components

```bash
  npx rg component Avatar
```

This command will create a folder with the name of the component inside the default src/components directory and its corresponding files.

#### Component files structure

```txt
|-- /src
    |-- /components
        |-- /Avatar
            |-- index.jsx
            |-- Avatar.css
```

To generate a component in another folder you must write the name of the folder and the component joined by "/". For example:

```bash
  npx rg component pages/Home
```

```txt
|-- /pages
    |-- /components
        |-- /Avatar
            |-- index.jsx
            |-- Avatar.css
```

### Generate Hooks

```bash
  npx rg hook useHook
```

This command will create a file with the name of the hook in the hooks folder. If the folder does not exist it will create it in the process.

```txt
|-- /src
    |-- /hooks
        | -- useHook.js
```
