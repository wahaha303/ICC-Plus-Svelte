import { default as ColorPicker } from './components/ColorPicker.svelte';
export default ColorPicker;
export type { HsvaColor, RgbaColor } from 'colord';
export declare const ChromeVariant: {
    wrapper: import("svelte").Component<{
        wrapper: HTMLElement | undefined;
        isOpen: boolean;
        isDialog: boolean;
        children: import("svelte").Snippet;
    }, {}, "wrapper">;
};
export declare const A11yVariant: {
    wrapper: import("svelte").Component<{
        wrapper: HTMLElement;
        isOpen: boolean;
        isDialog: boolean;
        children: import("svelte").Snippet;
    }, {}, "wrapper">;
    a11yNotice: import("svelte").Component<{
        components: import("./type/types").Components;
        hex: string;
        a11yColors: Array<import("./type/types").A11yColor>;
        a11yLevel: "AA" | "AAA";
        a11yTexts?: import("./utils/texts").A11yTextsPartial | undefined;
    }, {}, "">;
    a11ySingleNotice: import("svelte").Component<import("./components/variant/accessibility/A11ySingleNotice.svelte").Props, {}, "">;
};
export { mix } from './utils/colors.js';
