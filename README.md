<h1 align="center">react-ch-cli 💻</h1>

<h2>
  react-ch-cli is a program for creating components and hooks.
</h2>

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

### Requirements

- Node.js 16
- npm 5.2+

### Table of Contents

- [Config file](#config-file)
- [Generate components](#generate-components)
- [Generate hooks](#generate-hooks)

### Quickstart

Install via NPM:

```bash
  npm i react-ch-cli --save-dev
```

If you install globally, add _rcliconfig.json_ to _.gitignore_.

```bash
  npm i -g react-ch-cli
```

### Execution

You can run it using npx

```bash
  npx rgenerate component Avatar
```

Globally

```bash
  rgenerate component Avatar
```

### Config file

When first run in the project. It will look for the rcliconfig.json configuration file. If it does not find it, it will ask you a series of questions and will generate said configuration file in the root of the project.

Example of the **rcliconfig.json** config file:

```JSON
  {
    "baseURL": "src",
    "usesTypeScript": true,
    "usesCSSModule": false,
    "cssPreprocessor": "none",
    "usesTests": true,
    "testingLibrary": "Testing Library"
  }
```

- **baseURL**: (String) Default **_src_**.

- **usesTypeScript**: (Boolean) Default **_true_**. The components and hooks will be generated in tsx and ts format respectively.

- **usesCSSModule**: (Boolean) Default **_true_**. Generates the CSS Module file.

- **cssPreprocessor**: (String) Default **_scss_**. Values: scss, sass, and none.

- **usesTests**: (Boolean) Default **_true_**. Indicates whether to generate the test file.

- **testingLibrary**: (String) Default **_Testing Library_**.

You can modify the configuration file through the following options:

`npx rgenerate config [options]`

<table>
  <tr>
    <th>Options</th>
    <th>Description</th>
    <th>Values Type</th>
    <th>Default Value</th>
  </tr>
  <tr>
    <td width="30%">--changeURL</td>
    <td width="35%">Change the baseURL value of the configuration file.</td>
    <td width="17%">String</td>
    <td width="18%"></td>
  </tr>
  <tr>
    <td width="30%">--changeLang</td>
    <td width="35%">Modifies if the files are generated in JS or TS. Values: js, ts.</td>
    <td width="17%">String</td>
    <td width="18%"></td>
  </tr>
  <tr>
    <td width="30%">--useCSSModules</td>
    <td width="35%">Style sheets are generated in CSS Modules.</td>
    <td width="17%">Boolean</td>
    <td width="18%">True</td>
  </tr>
  <tr>
    <td width="30%">--no-useCSSModules</td>
    <td width="35%">Style sheets are generated in CSS.</td>
    <td width="17%">Boolean</td>
    <td width="18%">False</td>
  </tr>
  <tr>
    <td width="30%">--changeCSSPreprocessor</td>
    <td width="35%">Change the CSS preprocessor to use. Values: scss, sass, none.</td>
    <td width="17%">String</td>
    <td width="18%"></td>
  </tr>
  <tr>
    <td width="30%">--useTest</td>
    <td width="35%">Habilita la creación de archivo de prueba.</td>
    <td width="17%">Boolean</td>
    <td width="18%">True</td>
  </tr>
  <tr>
    <td width="30%">--no-useTest</td>
    <td width="35%">Deshabilita la creación de archivo de prueba.</td>
    <td width="17%">Boolean</td>
    <td width="18%">False</td>
  </tr>
</table>

### Generate Components

```bash
  npx rgenerate component Avatar
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
  npx rgenerate component pages/Home
```

```txt
|-- /pages
    |-- /components
        |-- /Avatar
            |-- index.jsx
            |-- Avatar.css
```

<table>
  <tr>
    <th>Options</th>
    <th>Description</th>
    <th>Values Type</th>
    <th>Default Value</th>
  </tr>
  <tr>
    <td width="30%">--fileName</td>
    <td width="35%">Generate a &lt;name&gt;.jsx|tsx file instead of index.</td>
    <td width="17%">String</td>
    <td width="18%">index</td>
  </tr>
  <tr>
    <td width="30%">--noStyles</td>
    <td width="35%">It will not generate the component's stylesheet.</td>
    <td width="17%">Boolean</td>
    <td width="18%">False</td>
  </tr>
  <tr>
    <td width="30%">--noTest</td>
    <td width="35%">It will not generate the test file of the component.</td>
    <td width="17%">Boolean</td>
    <td width="18%">False</td>
  </tr>
</table>

### Generate Hooks

```bash
  npx rgenerate hook useHook
```

This command will create a file with the name of the hook in the hooks folder. If the folder does not exist it will create it in the process.

```txt
|-- /src
    |-- /hooks
        | -- useHook.js
```
