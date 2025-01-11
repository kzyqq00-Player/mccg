const McCs = (function () {
    /** @type {(keyof McCs)[]} */
    const validExternalKeys = ['summon'];

    /** @type {McCs} */
    const exports = new Proxy({
        commandResultProcesser(command, ...moreInfo) {
            alert(`命令: ${command}\n你可以直接粘贴(Ctrl+V)命令到MC中执行`);
            navigator.clipboard.writeText(command);
            console.log(command);
            for (const info of [...moreInfo]) {
                console.log(info);
            }
        },
        registerRouter(options) {
            hashes = [...new Set(options.filter((item) => typeof item === 'string').concat(options.filter((item) => Array.isArray(item)).map((item) => item[0])))].concat(hashes);
            hashHandlers = hashHandlers.concat(options.filter((item) => Array.isArray(item)));
            if (!registeredFirstRouter) {
                window.addEventListener('hashchange', hashChangeHandler);
                registeredFirstRouter = true;
            }
            hashChangeHandler();
        },
        getFetchOptions(mime) {
            return {
                headers: {
                    accept: `${mime}; charset=utf-8`,
                    'cache-control': 'no-cache'
                },
                cache: 'no-cache'
            }
        }
    }, {
        set() {
            if (!validExternalKeys.includes(arguments[1])) {
                console.warn('雕虫小技');
                return false;
            } else {
                settingProperty = true; // @ts-expect-error
                const res = Reflect.set(...arguments);
                settingProperty = false;
                return res;
            }
        },
        setPrototypeOf(obj, proto) {
            if (!inited) {
                return Reflect.setPrototypeOf(obj, proto);
            } else {
                console.warn('看来你挺有经验');
                return false;
            }
        },
        deleteProperty() {
            console.warn('孩子你无敌了');
            return false;
        },
        defineProperty() {
            if (!settingProperty) {
                console.warn('666');
                return false;
            } else { // @ts-expect-error
                return Reflect.defineProperty(...arguments);
            }
        }
    });

    let settingProperty = false;
    let inited = false;
    let hashes = [];
    let hashHandlers = [];
    let registeredFirstRouter = false;

    Object.setPrototypeOf(exports, null);
    inited = true;

    const hashChangeHandler = () => {
        const hash = location.hash.slice(2);
        if (hashes.includes(hash)) {
            fetch('/' + hash + '.html', exports.getFetchOptions('text/html'))
                .then(response => {
                    if (!response.ok) {
                        console.groupCollapsed('网络报错信息');
                        console.log('状态:', response.statusText);
                        console.log('请求URL:', response.url);
                        console.groupEnd();
                        alert('网络错误! 请重试\n可在控制台查看详情');
                    }

                    return response.text();
                })
                .then(text => {
                    if (text.startsWith('<!')) {
                        const firstNewlineIndex = text.indexOf('\n');
                        text = firstNewlineIndex !== -1 ? text.slice(firstNewlineIndex + 1) : text;
                    }

                    const doc = new DOMParser().parseFromString(text, 'text/html');
                    document.body.replaceWith(doc.body);
                    
                    doc.querySelectorAll('script').forEach(script => {
                        if (script.type === 'importmap') {
                            throw new TypeError('不支持importmap');
                        }
                        if (script.src) {
                            if (script.type === 'module') {
                                console.warn('动态加载暂不支持模块。接下来很可能紧接着出现一个报错。');
                            }
                            fetch(script.src, exports.getFetchOptions('text/javascript'))
                                .then(async (response) => new Function(await response.text())());
                        } else {
                            new Function(script.textContent)();
                        }
                    });
                });
        }


        const indexOfHashOfHashHandlers = hashes.indexOf(hash);
        if (Array.isArray(indexOfHashOfHashHandlers)) {
            const handler = indexOfHashOfHashHandlers[1];
            if (typeof handler === 'function') {
                handler(location);
            }
        }
    };

    return exports;
})();
