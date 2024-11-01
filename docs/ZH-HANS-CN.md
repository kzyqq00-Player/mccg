[English](./EN.md) | 简体中文

## 基本准备
无论如何，请确保安装了[Node.js](https://nodejs.org)和[npm](http://npmjs.org)。

点击fork，填写一些信息后点击“Create fork”，这样你就可以在你自己的仓库里进行开发了。

如果你想要在本地直接开发，需要克隆你fork的仓库：
```bash
git clone https://github.com/your-username/mccg.git
```
为了开发方便，你应该在你克隆的文件夹里安装jquery类型提示：
```bash
npm install jquery --save-dev
```
如果你没有安装TypeScript编译器，你需要安装它：
```bash
npm install typescript -g
```

## ❗注意事项❗
因为历史原因，所有页面统称为命令页面，不分为命令页面和普通页面。

## 文件结构 <!-- 请在每一行结束加上<br />以实现零行间距 -->
`docs/` 文档<br />
`src/` ts及所有需要编译的源代码（不包括声明文件）<br />
[`src/init.ts`](../src/init.ts) 初始化文件<br />
[`src/ready.min.ts`](../src/ready.min.ts) 主页面加载完成后执行的代码<br />
`src/ready.command.*.page.ts` 每个内置命令页面的加载完成后独立执行的代码<br />
[`init.js`](../init.js) & [`ready.min.js`](../ready.min.js) & `ready.command.*.page.js` 编译后的文件<br />
[`datas.init.js`](../datas.init.js) 大数据初始化文件<br />
[`command.page.css`](../command.page.css) 命令页面通用样式<br />
`command.page.*.css` 每个命令页面的独立样式，其中`*`是页面名<br />
[`mccg.extension.d.ts`](../mccg.extension.d.ts) 未来将会开发的插件系统的声明文件<br />
[`dark.css`](../dark.css) 深色模式样式<br />
[`index.html`](../index.html) 主页面<br />
[`jquery-3.7.1.min.js`](../jquery-3.7.1.min.js) jQuery库<br />
[`tsconfig.json`](../tsconfig.json) TypeScript配置文件<br />
