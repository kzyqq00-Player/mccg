declare namespace MccgTypes {
    type STheme = 'os-default' | 'dark' | 'light';
    interface EventTargetType<T extends EventTarget> extends Event { target: T }
    
    /** Path of datas.init.js. */
    type DIJP = typeof import('datas.init.js'); 
}