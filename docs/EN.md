English | [简体中文](./ZH-HANS-CN.md)

## Prepare
On anyway, you need to install [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com).

Click the fork button, fill in something, and then click the "Create fork" to fork this repository to your account.

Then clone your forked repository to your local machine.
```bash
git clone https://github.com/your-username/mccg.git
```
On your cloned repository's directory, run this command:
```bash
npm install @types/jquery --save-dev
```
If you not installed TypeScript Compiler, run this command:
```bash
npm install typescript -g
```

## ❗ Important Notes ❗
Due to historical reasons, all pages are collectively referred to as command pages, and there is no distinction between command pages and regular pages.

## File Structure <!-- Please add <br /> at the end of each line to achieve zero line spacing -->
`docs/` Documentation.<br />
`src/` TypeScript and all source code that needs to be compiled (excluding declaration files).<br />
[`src/init.ts`](../src/init.ts) Initialization file<br />
[`src/ready.min.ts`](../src/ready.min.ts) Code to be executed after the main page has loaded.<br />
`src/ready.command.*.page.ts` Code to be executed independently after internal command page has loaded.<br />
[`init.js`](../init.js) & [`ready.min.js`](../ready.min.js) & `ready.command.*.page.js` Compiled files.<br />
[`datas.init.js`](../datas.init.js) Big data initialization file.<br />
[`command.page.css`](../command.page.css) Common styles for all command pages.<br />
`command.page.*.css` Independent styles for each command page, where `*` is the page name.<br />
[`mccg.extension.d.ts`](../mccg.extension.d.ts) Declaration file for the future development of the plugin system.<br />
[`dark.css`](../dark.css) Styles for dark mode.<br />
[`index.html`](../index.html) Main page.<br />
[`jquery-3.7.1.min.js`](../jquery-3.7.1.min.js) jQuery library.<br />
[`tsconfig.json`](../tsconfig.json) TypeScript configuration file.<br />