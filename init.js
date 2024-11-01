"use strict";
let mccg = {
    showingCmdPage: {
        showing: false,
        showingPage: 'home-page'
    },
    cmdPage: {
        setblock: {
            blockStates: [],
            blockStatesDivElementCache: document.createElement('div'),
            selectedBlock: {},
            blockSelectButtonClicked: false,
            blockIdMap: 0,
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
            if (e.matches)
                $('#dark-stylesheet').length === 0 ? document.head.appendChild(mccg.theme.darkStyleSheet) : 0;
            else if ($('#dark-stylesheet').length > 0) {
                $('#dark-stylesheet').remove();
            }
        },
        darkStyleSheet: document.createElement('link'),
        matcher: window.matchMedia('(prefers-color-scheme: dark)'),
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
    temp: {},
    footer: $('footer')[0],
    homePage: document.body,
    eCommandPage: document.createElement('body'),
    cancelHomePageHiddened: false,
    backToHomePage: function () {
        if (this.showingCmdPage.showing == true) {
            if ($(this.homePage).last()[0].nodeName != 'FOOTER')
                this.homePage.appendChild(this.footer);
            document.body = this.homePage;
            window.location.hash = '';
            $('.command-page-codes').remove();
            this.showingCmdPage.showing = false;
            this.showingCmdPage.showingPage = 'home-page';
        }
    },
    commandPage: function () {
        mccg.showingCmdPage.showing = true;
        switch (window.location.hash) {
            case '#/setblock':
                this.eCommandPage.innerHTML = $('#setblock-page')[0].innerHTML;
                break;
            case '#/contact-me':
                this.eCommandPage.innerHTML = $('#contact-page')[0].innerHTML;
                break;
            default: {
                mccg.showingCmdPage.showing = false;
                mccg.showingCmdPage.showingPage = 'home-page';
                window.history.replaceState(null, '', window.location.pathname + window.location.search);
                return;
            }
        }
        if ($(this.eCommandPage).last()[0].nodeName != 'FOOTER')
            this.eCommandPage.appendChild(this.footer);
        this.showingCmdPage.showingPage = window.location.hash.slice(2);
        let stylesheet = document.createElement('link');
        stylesheet.id = `command-page-${this.showingCmdPage.showingPage}-stylesheet`;
        stylesheet.classList.add('command-page-codes');
        stylesheet.rel = 'stylesheet';
        $(stylesheet).on('load', () => document.body.hidden = false);
        stylesheet.href = `command.page.${this.showingCmdPage.showingPage}.css`;
        let onlyThisCommandPageScript = document.createElement('script');
        onlyThisCommandPageScript.id = `ready-command-${this.showingCmdPage.showingPage}-page`;
        onlyThisCommandPageScript.classList.add('command-page-codes');
        onlyThisCommandPageScript.src = `ready.command.${this.showingCmdPage.showingPage}.page.js`;
        let universalScript = document.createElement('script');
        universalScript.id = 'ready-command-page';
        universalScript.classList.add('command-page-codes');
        universalScript.src = 'ready.command.page.js';
        document.body = this.eCommandPage;
        $('.image').on('click', (e) => window.open(e.target.src, '_self'));
        document.head.appendChild(stylesheet);
        document.head.appendChild(universalScript);
        document.head.appendChild(onlyThisCommandPageScript);
        this.showingCmdPage.showing = true;
    }
};
mccg.eCommandPage.classList.add('command-page');
$(function () {
    $('.image').on('click', (e) => window.open(e.target.src, '_self'));
});
initInfo();
if (mccg.theme.value == 'os-default') {
    mccg.theme.setFromOSDefault(mccg.theme.matcher);
    mccg.theme.bindedChangeEvent = true;
    mccg.theme.matcher.addEventListener('change', mccg.theme.setFromOSDefault);
}
mccg.theme.darkStyleSheet.id = 'dark-stylesheet';
mccg.theme.darkStyleSheet.rel = 'stylesheet';
mccg.theme.darkStyleSheet.href = 'dark.css';