English | [简体中文](./ZH-HANS-CN.md)

Sorry, the documentation and comments are not yet complete.

**Chineses** 如果你看得懂这句话请转到简体中文，因为英文文档有一些东西不适合中国开发者（比如npm镜像）。**Chineses**

## Prepare
On anyway, you need to install [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com).

Click the fork button, fill in something, and then click the "Create fork" to fork this repository to your account.

Then clone your forked repository to your local machine.
```bash
git clone https://github.com/your-username/mccg.git
```
On your cloned repository's directory, run this command:
```bash
npm install
tsc
```

## ❗Important Notes❗
Due to historical reasons, all pages are collectively referred to as command pages, and there is no distinction between command pages and regular pages.

Please use the .private directory to storage your private files. Don't modify the .gitignore file if you don't have a special needs.

## File Structure <!-- Please add <br /> at the end of each line to achieve zero line spacing -->
`docs/` Documentation.<br />
`src/` TypeScript and all source code that needs to be compiled (excluding declaration files).<br />
[`src/init.ts`](../src/init.ts) Initialization file<br />
[`src/ready.min.ts`](../src/ready.min.ts) Code to be executed after the main page has loaded.<br />
`src/ready.command.*.page.ts` Code to be executed independently after internal command page has loaded.<br />
[`ready.command.page.js`](../ready.command.page.js) Code to be executed communal after internal command page has loaded.<br />
[`command.page.css`](../command.page.css) Common styles for internal command pages.<br />
`command.page.*.css` Independent styles for each command page, where `*` is the page name.<br />
[`mccg.extension.d.ts`](../mccg.extension.d.ts) Declaration file for the future development of the plugin system.<br />
[`dark.css`](../dark.css) Styles for dark mode.<br />
[`index.html`](../index.html) Main page.<br />
[`tsconfig.json`](../tsconfig.json) TypeScript configuration file.<br />