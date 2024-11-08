declare namespace Mccg {
    interface Extension extends EventTarget {
        /**
         * The extension's name, should be unique of all extensions.
         */
        readonly name: string;
        /**
         * The extension's developer, yeah, it should be your name.
         */
        readonly developer: string;
        /**
         * The extension's license name. The license should be in the project folder.
         */
        readonly license?: string;
        /**
         * The extension's entrance function.
         * 
         * @param this Current extension.
         */
        readonly entrance: (this: Extension) => void;
        /**
         * It means the extension is or not registed.
         */
        readonly registed: boolean;
        /** 
         * The extension system assigned space.
         * 
         * Don't trying storage something in other object, the code review will waring you :)
         * 
         * And we need this object do something. It won't upload to server.
         * 
         * If you want storage something in localstorage, use `localStorage` property.
         */
        storage: object | null;
        /**
         * The extension system assigned localstorage space.
         * 
         * Don't trying storage something in `window.localStorage`, the code review will waring you :)
         * 
         * You can use `Storage API` to operation this object.
         */
        localStorage?: Storage;
        /**
         * The extension system assigned sessionStorage space.
         * 
         * Don't trying storage something in `window.sessionStorage`, the code review will waring you :)
         * 
         * You can use `Storage API` to operation this object.
         */
        sessionStorage?: Storage;
        /**
         * @param options We don't know passed a boolean will happening what, but we don't care :)
         */
        addEventListener<K extends keyof ExtensionEventMap>(type: K, listener: (this: Extension, ev: ExtensionEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        /**
         * @param options We don't know passed a boolean will happening what, but we don't care :)
         */
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        /**
         * @param options We don't know passed a boolean will happening what, but we don't care :)
         */
        removeEventListener<K extends keyof ExtensionEventMap>(type: K, listener: (this: Extension, ev: ExtensionEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        /**
         * @param options We don't know passed a boolean will happening what, but we don't care :)
         */
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
        /**
         * <span style="color:#ffBB00;">Don't call this method!</span>
         * 
         * If you really want to call this method, <span style="color:#ffBB00;">then code review will waring you :)</span>
         */
        dispatchEvent(event: Event): boolean;
    }

    /**
     * The T itself or a function returns T.
     */
    type ArgHandler<T> = T | (() => T);

    interface ExtensionStatic {
        new (option: InitExtension): Extension;
        prototype: Extension;

        // Extensions' operation
        register: (...extensions: Extension[]) => void;
        unregister: (...extensions: Extension[]) => void;
        /**
         * All extensions. Contains registed and unregisted extensions.
         * 
         * If you want get all registed extensions, look for this example:
         * @example
         * let extensions = MccgExtension.extensions;
         * let result = extensions.filter((e) => e.registed);
         * @description Then the `result` will be registed extensions
         */
        extensions: Extension[];
        /**
         * Like the `window`, but we won't developers use `window` storage vars.
         * 
         * This object can let multiple extensions transfer datas.
         */
        global: object;

        // Tool method
        /**
         * @param pageName Will override the page's name.
         * @param pageBody A body element, is going to be override page's body. Or a function, returns the body element.
         * @param pageLoadedCallback After page loaded, this callback will call.
         * @param lArgs `pageLoadedCallback`'s args.
         */
        // 家人们太逆天了
        pageOverride<LA extends any[]>(pageName: InternalPages, pageBody: ArgHandler<HTMLBodyElement>, /** @param args `pageOverride` function's `lArgs` parameter. */ pageLoadedCallback?: (...args: LA) => any, ...lArgs: LA): void;
        /**
         * @param lArgs An array that expands and is passed to `pageLoadedCallback`.
         */
        pageOverride<LA extends any[]>(pageName: string, pageBody: ArgHandler<HTMLBodyElement>, /** @param args Expanded from of the `lArgs` parameter in the `pageOperation` function. */ pageLoadedCallback?: (...args: LA) => any, lArgs?: LA): void;
        /**
         * @param pageCloseCallback After page close, this callback will call.
         * @param cArgs `pageCloseCallback`'s args.
         */
        pageOverride<CA extends any[]>(pageName: string, pageBody: ArgHandler<HTMLBodyElement>, pageLoadedCallback: () => any, /** @param args `pageOverride` function's `cArgs` parameter. */ pageCloseCallback: (...args: CA) => any, ...cArgs: CA): void;
        /**
         * @param cArgs An array that expands and is passed to `pageCloseCallback`.
         */
        pageOverride<CA extends any[]>(pageName: string, pageBody: ArgHandler<HTMLBodyElement>, pageLoadedCallback: () => any, /** @param args Expanded from of the `lArgs` parameter in the `pageOperation` function. */ pageCloseCallback: (...args: CA) => any, cArgs?: CA): void;
        /**
         * @param lArgs Oops, JavaScript forbids the rest parameter not at the end of the parameters, so this is an array and not a rest parameter. Therefore, this array will be expanded and passed to `pageLoadedCallback`.
         */
        pageOverride<LA extends any[], CA extends any[]>(pageName: string, pageBody: ArgHandler<HTMLBodyElement>, /** @param args Expanded from of the `lArgs` parameter in the `pageOperation` function. */ pageLoadedCallback: (...args: LA) => any, lArgs: LA, /** @param args `pageOverride` function's `cArgs` parameter. */ pageCloseCallback: (...args: CA) => any, ...cArgs: CA): void;
        /**
         * @param lArgs Oops, JavaScript forbids the rest parameter not at the end of the parameters, so this is an array and not a rest parameter. Therefore, this array will be expanded and passed to `pageLoadedCallback`.
         * @param cArgs An array that expands and is passed to `pageCloseCallback`.
         */
        pageOverride<LA extends any[], CA extends any[]>(pageName: string, pageBody: ArgHandler<HTMLBodyElement>, /** @param args Expanded from of the `lArgs` parameter in the `pageOperation` function. */ pageLoadedCallback: (...args: LA) => any, lArgs: LA, /** @param args `pageOverride` function's `cArgs` parameter. */ pageCloseCallback: (...args: CA) => any, cArgs?: CA): void;
        /**
         * @param pageName Will add the page's name.
         * @param pageBody A body element, is going to be override page's body. Or a function, returns the body element.
         * @param pageLoadedCallback After page loaded, this callback will call.
         * @param lArgs `pageLoadedCallback`'s args.
         */
        pageAdd<LA extends any[]>(pageName: string, pageBody: ArgHandler<HTMLBodyElement>, /** @param args Expanded from of the `lArgs` parameter in the `pageOperation` function. */ pageLoadedCallback?: (...args: LA) => any, lArgs?: LA): void;
        /**
         * @param pageCloseCallback After page close, this callback will call.
         * @param cArgs `pageCloseCallback`'s args.
         */
        pageAdd<CA extends any[]>(pageName: string, pageBody: ArgHandler<HTMLBodyElement>, pageLoadedCallback: () => any, /** @param args `pageAdd` function's `cArgs` parameter. */ pageCloseCallback: (...args: CA) => any, ...cArgs: CA): void;
        /**
         * @param cArgs An array that expands and is passed to `pageCloseCallback`.
         */
        pageAdd<CA extends any[]>(pageName: string, pageBody: ArgHandler<HTMLBodyElement>, pageLoadedCallback: () => any, /** @param args Expanded from of the `lArgs` parameter in the `pageOperation` function. */ pageCloseCallback: (...args: CA) => any, cArgs?: CA): void;
        /**
         * @param lArgs Oops, JavaScript forbids the rest parameter not at the end of the parameters, so we back in the mine, got our pickaxe swinging from for s2s, ss2s, and this is an array and not a rest parameter. Therefore, this array will be expanded and passed to `pageLoadedCallback`.
         */
        pageAdd<LA extends any[], CA extends any[]>(pageName: string, pageBody: ArgHandler<HTMLBodyElement>, /** @param args Expanded from of the `lArgs` parameter in the `pageOperation` function. */ pageLoadedCallback: (...args: LA) => any, lArgs: LA, /** @param args `pageAdd` function's `cArgs` parameter. */ pageCloseCallback: (...args: CA) => any, ...cArgs: CA): void;
        /**
         * @param lArgs Oops, JavaScript forbids the rest parameter not at the end of the parameters, so this is an array and not a rest parameter. Therefore, this array will be expanded and passed to `pageLoadedCallback`.
         * @param cArgs An array that expands and is passed to `pageCloseCallback`.
         */
        pageAdd<LA extends any[], CA extends any[]>(pageName: string, pageBody: ArgHandler<HTMLBodyElement>, /** @param args Expanded from of the `lArgs` parameter in the `pageOperation` function. */ pageLoadedCallback: (...args: LA) => any, lArgs: LA, /** @param args `pageAdd` function's `cArgs` parameter. */ pageCloseCallback: (...args: CA) => any, cArgs?: CA): void;
    }
    // var n: ExtensionStatic;
    type ExtensionInternalProps = "registed";
    type InitExtension = Omit<Extension, keyof EventTarget | ExtensionInternalProps>;
    type InternalPages = "home-page" | "contact-me" | "setblock";
    
    /* declare var Extension: {
        prototype: Extension;
        new(): Extension;
    } */
    
    type OnlyWay = Pick<ExtensionEventDetail, "way">;
    
    interface ExtensionEventMap {
        "uninstall": CustomEvent<ExtensionEventDetail>;
        "disable": CustomEvent<OnlyWay>;
        "enable": CustomEvent<OnlyWay>;
        "unregister": CustomEvent<{way: "debug"}>;
    }
    
    interface ExtensionEventDetail {
        /**
         * How to operation the extension.
         */
        readonly way: "debug" | "settings";
        /**
         * The user select save or delete the extension's storages.
         * 
         * If true, the extension system will remove the extension object's `storage`, `localStorage` and `sessionStorage`'s properties.
         * 
         * You can use this property say goodbye to the user, but you can't prevent this.
         */
        readonly saveStorage: boolean;
    }
}

declare var MccgExtension: Mccg.ExtensionStatic;