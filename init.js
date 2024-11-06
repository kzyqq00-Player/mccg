"use strict";
const mccg = {
    showingCmdPage: {
        showing: false,
        showingPage: 'home-page'
    },
    cmdPage: {
        setblock: {
            blockStates: [['', '']],
            TRElement: document.createElement('tr'),
            onBlockStateInput: (e) => {
                const cell = e.target.closest('td');
                const row = cell.closest('tr');
                const rowIndex = Array.from(row.parentNode.children).indexOf(row);
                if (!mccg.cmdPage.setblock.blockStates[rowIndex])
                    mccg.cmdPage.setblock.blockStates[rowIndex] = [];
                mccg.cmdPage.setblock.blockStates[rowIndex][Array.from(cell.parentNode.children).indexOf(cell)] = e.target.value;
            },
            selectedBlock: void 0,
            blockSelectButtonClicked: false,
            blockIdMap: void 0,
            inputNamespaceId: function () {
                $('#block-reset')[0].hidden = false;
                $('#search-in-database')[0].hidden = true;
                $('#directly-input-namespace-id')[0].hidden = true;
                let input = $('#block input')[0];
                input.placeholder = 'ID';
                input.value = '';
            }
        }
    },
    theme: new Proxy({
        value: localStorage['theme'] || 'os-default',
        setFromOSDefault: (e) => {
            if (e.matches && $('#dark-stylesheet').length === 0)
                document.head.appendChild(mccg.theme.darkStyleSheet);
            else if (!e.matches && $('#dark-stylesheet').length > 0)
                $('#dark-stylesheet').remove();
        },
        darkStyleSheet: document.createElement('link'),
        matcher: matchMedia('(prefers-color-scheme: dark)'),
        bindedChangeEvent: false,
    }, {
        set(obj, prop, value) {
            if (prop == 'value') {
                if (value == 'dark') {
                    document.head.appendChild(obj.darkStyleSheet);
                    obj.bindedChangeEvent = false;
                    obj.matcher.removeEventListener('change', obj.setFromOSDefault);
                }
                else if (value == 'light') {
                    $('#dark-stylesheet').remove();
                    obj.bindedChangeEvent = false;
                    obj.matcher.removeEventListener('change', obj.setFromOSDefault);
                }
                else if (value == 'os-default') {
                    if (!obj.bindedChangeEvent) {
                        obj.bindedChangeEvent = true;
                        obj.matcher.addEventListener('change', obj.setFromOSDefault);
                    }
                    obj.setFromOSDefault(obj.matcher);
                }
                else
                    throw new TypeError(`'${value}' is not a legal theme.`);
            }
            return Reflect.set(...arguments);
        }
    }),
    temp: null,
    footer: void 0,
    homePage: void 0,
    eCommandPage: document.createElement('body'),
    cancelHomePageHiddened: false,
    backToHomePage: function () {
        if (this.showingCmdPage.showing == true) {
            if (document.body.lastChild.nodeName !== 'FOOTER')
                this.homePage.appendChild(this.footer);
            document.body = this.homePage;
            location.hash = '';
            $('.command-page-codes').remove();
            this.showingCmdPage.showing = false;
            this.showingCmdPage.showingPage = 'home-page';
        }
    },
    commandPage: function () {
        switch (location.hash) {
            case '#/setblock':
                this.eCommandPage.innerHTML = $('#setblock-page').html();
                break;
            case '#/contact-me':
                this.eCommandPage.innerHTML = $('#contact-page').html();
                break;
            default: return;
        }
        if (document.body.lastChild.nodeName !== 'FOOTER')
            this.eCommandPage.appendChild(this.footer);
        this.showingCmdPage.showingPage = location.hash.slice(2);
        let stylesheet = document.createElement('link');
        stylesheet.id = `command-page-${this.showingCmdPage.showingPage}-stylesheet`;
        stylesheet.classList.add('command-page-codes');
        stylesheet.rel = 'stylesheet';
        $(stylesheet).on('load', () => document.body.hidden = false);
        stylesheet.href = `command.page.${this.showingCmdPage.showingPage}.css`;
        const onlyThisCommandPageScript = document.createElement('script');
        onlyThisCommandPageScript.id = `ready-command-${this.showingCmdPage.showingPage}-page`;
        onlyThisCommandPageScript.classList.add('command-page-codes');
        onlyThisCommandPageScript.src = `ready.command.${this.showingCmdPage.showingPage}.page.js`;
        const universalScript = document.createElement('script');
        universalScript.id = 'ready-command-page';
        universalScript.classList.add('command-page-codes');
        universalScript.src = 'ready.command.page.js';
        document.body = this.eCommandPage;
        $('.image').on('click', (e) => open(e.target.src, '_self'));
        document.head.appendChild(stylesheet);
        document.head.appendChild(universalScript);
        document.head.appendChild(onlyThisCommandPageScript);
        this.showingCmdPage.showing = true;
    }
};
(function (obj) {
    obj.eCommandPage.classList.add('command-page');
    $(function () {
        $('.image').on('click', (e) => open(e.target.src, '_self'));
    });
    initInfo();
    if (obj.theme.value == 'os-default') {
        obj.theme.setFromOSDefault(obj.theme.matcher);
        obj.theme.bindedChangeEvent = true;
        obj.theme.matcher.addEventListener('change', obj.theme.setFromOSDefault);
    }
    obj.theme.darkStyleSheet.id = 'dark-stylesheet';
    obj.theme.darkStyleSheet.rel = 'stylesheet';
    obj.theme.darkStyleSheet.href = 'dark.css';
    obj.cmdPage.setblock.TRElement.innerHTML = `<td><input type="text" placeholder="键"></td><td><input type="text" placeholder="值"></td>`;
    $(obj.cmdPage.setblock.TRElement)[0].childNodes.forEach((e) => { $(e).on('input', mccg.cmdPage.setblock.onBlockStateInput); });
})(mccg);
