declare namespace MccgTypes {
    type STheme = 'os-default' | 'dark' | 'light';
    interface EventTargetType<T extends EventTarget> extends Event { target: T }
    type Datas = typeof import('../src/datas');
    type IdBlockMap = Datas['idBlockMap'];

    interface MccgObject {
        showingCmdPage: {
            showing: boolean;
            showingPage: string;
            showedPages: Set<string>;
        };
        cmdPage: {
            setblock: {
                blockStates: ([string, string | number] | [])[];
                TRElement: HTMLTableRowElement | Node;
                onBlockStateInput(e: EventTargetType<HTMLInputElement>): void;
                selectedBlock: {
                    name: IdBlockMap[keyof IdBlockMap];
                    id: keyof IdBlockMap;
                    easterEgg: {
                        times: number;
                        value: string;
                    };
                };
                blockSelectButtonClicked: boolean;
                idBlockMap: IdBlockMap;
                inputNamespaceId(): void;
            }
        };
        theme: {
            value: STheme,
            setFromOSDefault(e: MediaQueryListEvent | MediaQueryList): void;
            darkStyleSheet: HTMLLinkElement,
            matcher: MediaQueryList,
            bindedChangeEvent: boolean,
        };
        temp: Partial<{
            errorReport: string;
        }>;
        footer: HTMLElement;
        homePage: HTMLBodyElement;
        eCommandPage: HTMLBodyElement;
        cancelHomePageHiddened: boolean;
        backToHomePage(this: typeof mccg): void;
        commandPage(this: typeof mccg): void;
        generateErrorReport(error: Error, description?: string): string;
    }
}