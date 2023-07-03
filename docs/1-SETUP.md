# Set up project

## Prerequisites

Before we begin, make sure you have the following installed:

- [Node.js] v16.x or later
- [npm] v8.x or later
- [git] v2.37.1 or later

If not you don't have Node.js and npm already installed, I recommend the read of [Download and install Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

```sh
% npm install -g @angular/cli
% npm ls @angular/cli -g
└── @angular/cli@16.1.3
```

## Create a new Angular app

```sh
% ng new mmb-demos.angular-crud 
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS

% cd mmb-demos.angular-crud
```

## Prettier - Code formatting

[ESLint] and [Prettier] help maintaining a consistent style:

- **Prettier for Formatting rules**: eg: max-len, no-mixed-spaces-and-tabs, keyword-spacing, comma-style…
- **ESLint for Code-quality rules**: eg no-unused-vars, no-extra-bind, no-implicit-globals, prefer-promise-reject-errors…

Prettier and ESLint complement each other, but they can also conflict when they disagree about style rules. The Prettier project has a guide to [integrating Prettier with ESLint](https://prettier.io/docs/en/integrating-with-linters.html) to make sure there are no conflicts and a guide on [how to integrate Prettier with your text editor](https://prettier.io/docs/en/editors.html).

```sh
% npm install -D prettier eslint-config-prettier
% npm ls prettier eslint-config-prettier
├── eslint-config-prettier@8.8.0
└── prettier@2.8.8
% echo {}> .prettierrc.json // See basic configs on https://prettier.io/docs/en/configuration.html
% touch .prettierignore // Use it to ignore (i.e. not reformat) certain files and folders
```

## Lint-staged - Pre-commit Hook

You can [use Prettier with a pre-commit tool](https://prettier.io/docs/en/precommit.html). This can re-format your files that are marked as “staged” via git add before you commit.

```sh
% npx mrm@2 lint-staged
```

This will install [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged), then add a configuration to the project’s `package.json` that will automatically format supported files in a pre-commit hook.

Update your `package.json` if necessary, `lint-staged` entry should looks:

```sh
"lint-staged": {
    "*.ts": "eslint --cache --fix",
    "*.{ts,css,md}": "prettier --write"
}
```