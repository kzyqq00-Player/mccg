declare namespace MccgTypes {
    type STheme = 'os-default' | 'dark' | 'light';
    interface EventTargetType<T extends EventTarget> extends Event { target: T }
}