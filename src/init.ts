import $ from 'jquery'
window.$ = $;

const mccg: MccgTypes.MccgObject = {
    showingCmdPage: {
        showing: false,
        showingPage: 'home-page',
        showedPages: new Set()
    },
    cmdPage: {
        setblock: {
            blockStates: [['', '']], // 块状态数组
            TRElement: document.createElement('tr'), // 表格行元素
            onBlockStateInput: (e) => {
                const cell = e.target.closest('td');
                const row = cell!.closest('tr');
                const rowIndex = Array.from(row!.parentNode!.children).indexOf(row!);
                const blockStates = mccg.cmdPage.setblock.blockStates;
                if (!blockStates[rowIndex]) blockStates[rowIndex] = [];
                blockStates[rowIndex][Array.from(cell!.parentNode!.children).indexOf(cell!)] = e.target.value;
            },
            // @ts-expect-error
            selectedBlock: null,
            blockSelectButtonClicked: false,
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
        setFromOSDefault: (e: { matches: boolean; }) => {
            if (e.matches && $('#dark-stylesheet').length === 0)
                document.head.appendChild(mccg.theme.darkStyleSheet);
            else if (!e.matches && $('#dark-stylesheet').length > 0)
                $('#dark-stylesheet').remove();
        },
        darkStyleSheet: document.createElement('link'),
        matcher: matchMedia('(prefers-color-scheme: dark)'),
        boundChangeEvent: false as boolean,
    }, {
        set(obj, prop, value) {
            if (prop === 'value') {
                if (value === 'dark') {
                    document.head.appendChild(obj.darkStyleSheet);
                    obj.boundChangeEvent = false;
                    obj.matcher.removeEventListener('change', obj.setFromOSDefault);
                } else if (value === 'light') {
                    $('#dark-stylesheet').remove();
                    obj.boundChangeEvent = false;
                    obj.matcher.removeEventListener('change', obj.setFromOSDefault);
                } else if (value === 'os-default') { // nnd找了那么久的bug原来是大括号没加
                    if (!obj.boundChangeEvent) {
                        obj.boundChangeEvent = true;
                        obj.matcher.addEventListener('change', obj.setFromOSDefault);
                    }
                    obj.setFromOSDefault(obj.matcher);
                } else throw new TypeError(`'${value}' is not a legal theme.`);
            } // @ts-ignore
            return Reflect.set(...arguments);
        }
    }),
    temp: {},
    // @ts-expect-error
    footer: null,
    // @ts-expect-error
    homePage: null,
    eCommandPage: document.createElement('body'),
    backToHomePage() {
        if (this.showingCmdPage.showing) {
            if (document.body.lastChild!.nodeName !== 'FOOTER')
                this.homePage.appendChild(this.footer);
            document.body = this.homePage;
            $('.command-page-scripts').remove();
            history.replaceState(null, '', location.pathname + location.search);
            this.showingCmdPage.showing = false;
            this.showingCmdPage.showingPage = 'home-page';
        }
    },
    commandPage() {
        let templateIdOfWillBeShowedPage: string;
        const setBody = (function (this: typeof mccg, appendStyles: boolean) {
            this.eCommandPage.innerHTML = $(`#${templateIdOfWillBeShowedPage}`).html();
            document.body = this.eCommandPage;

            if (document.body.lastElementChild!.tagName !== 'FOOTER')
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
                onlyThisCommandPageScript.src = `src/ready.command.${this.showingCmdPage.showingPage}.page.ts`;

                const universalScript = document.createElement('script');
                universalScript.id = 'ready-command-page';
                universalScript.classList.add('command-page-scripts');
                universalScript.src = 'src/ready.command.page.js';

                document.head.appendChild(universalScript);
                document.head.appendChild(onlyThisCommandPageScript);
            }

            this.showingCmdPage.showing = true;
        }).bind(this);
        switch (location.hash) {
            case '#/setblock':
                templateIdOfWillBeShowedPage = 'setblock-page';
                break;
            case '#/contact-me':
                templateIdOfWillBeShowedPage = 'contact-page';
                break;
            default:
                this.backToHomePage();
                return;
        }
        if (!this.showingCmdPage.showedPages.has(templateIdOfWillBeShowedPage))
            this.showingCmdPage.showedPages.add(templateIdOfWillBeShowedPage);
        else {
            setBody(false);
            return;
        }

        setBody(true);
    },
    generateErrorReport(error, description) {
        const {name, stack, message} = error;
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
            })(); // This just an easter-egg don't scold me :)
    }
};
(function(mccg) {
    window.mccg = mccg;
    mccg.eCommandPage.classList.add('command-page');

    if (mccg.theme.value === 'os-default') {
        mccg.theme.setFromOSDefault(mccg.theme.matcher);
        mccg.theme.boundChangeEvent = true;
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
                    onSuccess = () => {};
                };
                const copy = () => {
                    navigator.clipboard.writeText(mccg.temp.errorReport!).then(onSuccess, () => {
                        console.warn('由于技术限制, 请点击一下页面任意位置');
                        new Promise<void>(resolve => {
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