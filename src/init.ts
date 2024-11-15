// @ts-ignore
(import('./datas.init.js') as Promise<typeof import('datas.init.js')>).then((data) => data.default(), (data) => {
    if (data instanceof Error && /Failed to fetch dynamically imported module: .*/.test(data.message) && window.confirm('加载关键模块失败，是否重试？错误消息：\nCurrent file: datas.init.js'))
        window.location.reload();
    else if (data.default)
        data.default();
});

type sTheme = 'os-default' | 'dark' | 'light';
interface EventTargetType<T extends EventTarget> extends Event { target: T }

const mccg: {
    showingCmdPage: {
        showing: boolean;
        showingPage: string;
        showedPages: string[];
    };
    cmdPage: {
        setblock: {
            blockStates: [string, string | number][];
            TRElement: HTMLTableRowElement | Node;
            onBlockStateInput: (e: EventTargetType<HTMLInputElement>) => void;
            selectedBlock: {
                name: string;
                id: string;
            };
            blockSelectButtonClicked: boolean;
            blockIdMap: Map<string, string>;
            inputNamespaceId: () => void;
        }
    };
    theme: {
        value: sTheme,
        setFromOSDefault: (e: MediaQueryListEvent | MediaQueryList) => void;
        darkStyleSheet: HTMLLinkElement,
        matcher: MediaQueryList,
        bindedChangeEvent: boolean,
    };
    temp: object | null;
    footer: HTMLElement;
    homePage: HTMLBodyElement;
    eCommandPage: HTMLBodyElement;
    cancelHomePageHiddened: boolean;
    backToHomePage: (this: typeof mccg) => void;
    commandPage: (this: typeof mccg) => void;
} = {
    showingCmdPage: {
        showing: false,
        showingPage: 'home-page',
        showedPages: []
    },
    cmdPage: {
        setblock: {
            blockStates: [['', '']],
            TRElement: document.createElement('tr'),
            onBlockStateInput: (e) => {
                const cell = e.target.closest('td');
                const row = cell.closest('tr');
                const rowIndex = Array.from(row.parentNode.children).indexOf(row);
                const blockStates = mccg.cmdPage.setblock.blockStates;
                // @ts-ignore
                if (!blockStates[rowIndex]) blockStates[rowIndex] = [];
                blockStates[rowIndex][Array.from(cell.parentNode.children).indexOf(cell)] = e.target.value;
            },
            selectedBlock: void 0,
            blockSelectButtonClicked: false,
            blockIdMap: void 0,
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
        value: localStorage['theme'] as sTheme || 'os-default',
        setFromOSDefault: (e: MediaQueryListEvent | MediaQueryList) => {
            if (e.matches && $('#dark-stylesheet').length === 0)
                document.head.appendChild(mccg.theme.darkStyleSheet);
            else if (!e.matches && $('#dark-stylesheet').length > 0)
                $('#dark-stylesheet').remove();
        },
        darkStyleSheet: document.createElement('link'),
        matcher: matchMedia('(prefers-color-scheme: dark)'),
        bindedChangeEvent: false as boolean,
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
    temp: null,
    footer: void 0,
    homePage: void 0,
    eCommandPage: document.createElement('body'),
    cancelHomePageHiddened: false,
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
        const setBody = function(this: typeof mccg, appendStyles: boolean) {
            this.eCommandPage.innerHTML = $(`#${templateIdOfWillBeShowedPage}`).html();
            document.body = this.eCommandPage;
            
            if (document.body.lastChild.nodeName !== 'FOOTER')
                this.eCommandPage.appendChild(this.footer);
            this.showingCmdPage.showingPage = location.hash.slice(2);

            if (appendStyles === true) {
                const stylesheet = document.createElement('link');
                stylesheet.id = `command-page-${this.showingCmdPage.showingPage}-stylesheet`;
                stylesheet.rel = 'stylesheet';
                stylesheet.href = `command.page.${this.showingCmdPage.showingPage}.css`;
                // @ts-ignore
                $('.image').on('click', (e: EventTargetType<HTMLImageElement>) => open(e.target.src, '_self'));
                document.head.appendChild(stylesheet);
            }

            if (this.showingCmdPage.showingPage !== 'home-page') {
                const onlyThisCommandPageScript = document.createElement('script');
                onlyThisCommandPageScript.id = `ready-command-${this.showingCmdPage.showingPage}-page`;
                onlyThisCommandPageScript.classList.add('command-page-scripts');
                onlyThisCommandPageScript.src = `ready.command.${this.showingCmdPage.showingPage}.page.js`;

                const universalScript = document.createElement('script');
                universalScript.id = 'ready-command-page';
                universalScript.classList.add('command-page-scripts');
                universalScript.src = 'ready.command.page.js';

                document.head.appendChild(universalScript);
                document.head.appendChild(onlyThisCommandPageScript);
            }
            
            this.showingCmdPage.showing = true;
        }
        switch (location.hash) {
            case '#/setblock': templateIdOfWillBeShowedPage = 'setblock-page'; break;
            case '#/contact-me': templateIdOfWillBeShowedPage = 'contact-page'; break;
            default: this.backToHomePage(); return;
        }
        if (!this.showingCmdPage.showedPages.includes(templateIdOfWillBeShowedPage))
            this.showingCmdPage.showedPages.push(templateIdOfWillBeShowedPage);
        else {
            setBody.call(this, false);
            return;
        }

        setBody.call(this, true);
    }
};
(function(obj) {
    obj.eCommandPage.classList.add('command-page');

    $(function () { // @ts-ignore
        $('.image').on('click', (e: EventTargetType<HTMLImageElement>) => open(e.target.src, '_self'));
    });

    if (obj.theme.value === 'os-default') {
        obj.theme.setFromOSDefault(obj.theme.matcher);
        obj.theme.bindedChangeEvent = true;
        obj.theme.matcher.addEventListener('change', obj.theme.setFromOSDefault);
    }
    obj.theme.darkStyleSheet.id = 'dark-stylesheet';
    obj.theme.darkStyleSheet.rel = 'stylesheet';
    obj.theme.darkStyleSheet.href = 'dark.css';
    // @ts-ignore
    obj.cmdPage.setblock.TRElement.innerHTML = `<td><input type="text" placeholder="键"></td><td><input type="text" placeholder="值"></td>`;
    // @ts-ignore
    $(obj.cmdPage.setblock.TRElement)[0].childNodes.forEach((e) => { $(e).on('input', mccg.cmdPage.setblock.onBlockStateInput) });
})(mccg);