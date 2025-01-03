const mccg: MccgTypes.MccgObject = {
    showingCmdPage: {
        showing: false, // 是否显示命令页面
        showingPage: 'home-page', // 当前显示的页面
        showedPages: new Set() // 已显示的页面集合
    },
    cmdPage: {
        setblock: {
            blockStates: [['', '']], // 块状态数组
            TRElement: document.createElement('tr'), // 表格行元素
            onBlockStateInput: (e) => {
                const cell = e.target.closest('td');
                const row = cell.closest('tr');
                const rowIndex = Array.from(row.parentNode.children).indexOf(row);
                const blockStates = mccg.cmdPage.setblock.blockStates;
                if (!blockStates[rowIndex]) blockStates[rowIndex] = [];
                blockStates[rowIndex][Array.from(cell.parentNode.children).indexOf(cell)] = e.target.value;
            },
            selectedBlock: void 0, // 选中的块
            blockSelectButtonClicked: false, // 块选择按钮是否被点击
            idBlockMap: void 0, // ID块映射
            inputNamespaceId: () => {
                $('#block-reset')[0].hidden = false;
                $('#search-in-database')[0].hidden = true;
                $('#directly-input-namespace-id')[0].hidden = true;
                let input = $('#block input')[0] as HTMLInputElement;
                input.placeholder = 'ID';
                input.value = '';
            }
        }
    },
    theme: new Proxy({
        value: localStorage.getItem('theme') as MccgTypes.STheme ?? 'os-default',
        setFromOSDefault: (e: { matches: boolean }) => {
            if (e.matches && $('#dark-stylesheet').length === 0)
                document.head.appendChild(mccg.theme.darkStyleSheet);
            else if (!e.matches && $('#dark-stylesheet').length > 0)
                $('#dark-stylesheet').remove();
        },
        darkStyleSheet: document.createElement('link'), // 暗色样式表
        matcher: matchMedia('(prefers-color-scheme: dark)'), // 媒体匹配器
        bindedChangeEvent: false as boolean, // 是否绑定了更改事件
    }, {
        set(obj, prop, value) {
            if (prop === 'value') {
                if (value === 'dark') {
                    document.head.appendChild(obj.darkStyleSheet);
                    obj.bindedChangeEvent = false;
                    obj.matcher.removeEventListener('change', obj.setFromOSDefault)
                } else if (value === 'light') {
                    $('#dark-stylesheet').remove();
                    obj.bindedChangeEvent = false;
                    obj.matcher.removeEventListener('change', obj.setFromOSDefault);
                } else if (value === 'os-default') { // nnd找了那么久的bug原来是大括号没加
                    if (!obj.bindedChangeEvent) {
                        obj.bindedChangeEvent = true;
                        obj.matcher.addEventListener('change', obj.setFromOSDefault);
                    }
                    obj.setFromOSDefault(obj.matcher);
                } else throw new TypeError(`'${value}' is not a legal theme.`);
            } // @ts-ignore
            return Reflect.set(...arguments);
        }
    }),
    temp: {}, // 临时存储对象
    footer: void 0, // 页脚
    homePage: void 0, // 主页
    eCommandPage: document.createElement('body'), // 命令页面元素
    cancelHomePageHiddened: false, // 是否取消主页隐藏
    backToHomePage: function () {
        if (this.showingCmdPage.showing === true) {
            if (document.body.lastChild.nodeName !== 'FOOTER')
                this.homePage.appendChild(this.footer);
            document.body = this.homePage;
            $('.command-page-scripts').remove();
            history.replaceState(null, '', location.pathname + location.search);
            this.showingCmdPage.showing = false;
            this.showingCmdPage.showingPage = 'home-page';
        }
    },
    commandPage: function () {
        let templateIdOfWillBeShowedPage: string;
        const setBody = (function (this: typeof mccg, appendStyles: boolean) {
            this.eCommandPage.innerHTML = $(`#${templateIdOfWillBeShowedPage}`).html();
            document.body = this.eCommandPage;
            
            if (document.body.lastElementChild.tagName !== 'FOOTER')
                this.eCommandPage.appendChild(this.footer);
            this.showingCmdPage.showingPage = location.hash.slice(2);

            if (appendStyles) {
                const stylesheet = document.createElement('link');
                stylesheet.id = `command-page-${this.showingCmdPage.showingPage}-stylesheet`;
                stylesheet.rel = 'stylesheet';
                stylesheet.href = `command.page.${this.showingCmdPage.showingPage}.css`;
                // @ts-ignore
                $('.image').on('click', (e: MccgTypes.EventTargetType<HTMLImageElement>) => open(e.target.src, '_self'));
                document.head.appendChild(stylesheet);
            }

            if (this.showingCmdPage.showingPage !== 'home-page') {
                const onlyThisCommandPageScript = document.createElement('script');
                onlyThisCommandPageScript.id = `ready-command-${this.showingCmdPage.showingPage}-page`;
                onlyThisCommandPageScript.classList.add('command-page-scripts');
                onlyThisCommandPageScript.src = `dist/ready.command.${this.showingCmdPage.showingPage}.page.js`;

                const universalScript = document.createElement('script');
                universalScript.id = 'ready-command-page';
                universalScript.classList.add('command-page-scripts');
                universalScript.src = 'ready.command.page.js';

                document.head.appendChild(universalScript);
                document.head.appendChild(onlyThisCommandPageScript);
            }
            
            this.showingCmdPage.showing = true;
        }).bind(this);
        switch (location.hash) {
            case '#/setblock': templateIdOfWillBeShowedPage = 'setblock-page'; break;
            case '#/contact-me': templateIdOfWillBeShowedPage = 'contact-page'; break;
            default: this.backToHomePage(); return;
        }
        if (!this.showingCmdPage.showedPages.has(templateIdOfWillBeShowedPage))
            this.showingCmdPage.showedPages.add(templateIdOfWillBeShowedPage);
        else {
            setBody(false);
            return;
        }

        setBody(true);
    },
    generateErrorReport: (error, description) => {
        const { name, stack, message } = error;
        return "Oops, my body's color is red now!\n\n"
            + (description ? `Description:\n// ${description}\n\n` : '')
            + `Error message: "${error}"\n\nError object: ${JSON.stringify({
                name,
                stack,
                message
            }, null, 1).replace(/\\n/g, '\n')}.\n`
            + (function () {
                const rand = Math.random();
                return rand >= 0 && rand <= 0.009 ? "\nDrink a coffee now? Submit to you error report's person is so lazy, he can't read the error report!\n"
                    + "Drink a coffee!" : '';
            })(); // This just a easter egg don't scold me :)
    }
};
(function(mccg) {
    mccg.eCommandPage.classList.add('command-page');

    if (mccg.theme.value === 'os-default') {
        mccg.theme.setFromOSDefault(mccg.theme.matcher);
        mccg.theme.bindedChangeEvent = true;
        mccg.theme.matcher.addEventListener('change', mccg.theme.setFromOSDefault);
    }
    mccg.theme.darkStyleSheet.id = 'dark-stylesheet';
    mccg.theme.darkStyleSheet.rel = 'stylesheet';
    mccg.theme.darkStyleSheet.href = 'dark.css';
    // @ts-ignore
    mccg.cmdPage.setblock.TRElement.innerHTML = `<td><input type="text" placeholder="键"></td><td><input type="text" placeholder="值"></td>`;
    // @ts-ignore
    $(mccg.cmdPage.setblock.TRElement)[0].childNodes.forEach((e) => { $(e).on('input', mccg.cmdPage.setblock.onBlockStateInput) });

    Object.defineProperty(window, 'copyError', {
        get() {
            if (mccg.temp.errorReport) {
                let onSuccess = () => {
                    console.info('复制成功');
                    onSuccess = () => { };
                };
                const copy = () => {
                    navigator.clipboard.writeText(mccg.temp.errorReport).then(onSuccess, () => {
                        console.warn('由于技术限制, 请点击一下页面任意位置');
                        new Promise<void>((resolve) => {
                            const id = setInterval(() => {
                                if (document.hasFocus()) {
                                    clearInterval(id);
                                    resolve();
                                }
                            }, 100);
                        }).then(() => {
                            onSuccess();
                            copy();
                        });
                    });
                };
                copy();
            } else throw new TypeError('找不到错误报告!');
            return () => {};
        },
        enumerable: true
    });
})(mccg);