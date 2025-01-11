declare namespace MccgTypes {
    type STheme = 'os-default' | 'dark' | 'light';
    interface EventTargetType<T extends EventTarget> extends Event { target: T }
    type Data = object;
    type BlockNameIdMap = Data['idBlockMap'];

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
                    name: keyof BlockNameIdMap;
                    id: BlockNameIdMap[keyof BlockNameIdMap];
                    easterEgg: {
                        times: number;
                        value: string;
                    };
                };
                blockSelectButtonClicked: boolean;
                inputNamespaceId(): void;
            }
        };
        theme: {
            value: STheme,
            setFromOSDefault(e: MediaQueryListEvent | MediaQueryList): void;
            darkStyleSheet: HTMLLinkElement,
            matcher: MediaQueryList,
            boundChangeEvent: boolean,
        };
        temp: Partial<{
            errorReport: string;
        }>;
        footer: HTMLElement;
        homePage: HTMLBodyElement;
        eCommandPage: HTMLBodyElement;
        backToHomePage(this: typeof mccg): void;
        commandPage(this: typeof mccg): void;
        generateErrorReport(error: Error, description?: string): string;
    }
}

declare const mccg: MccgObject;