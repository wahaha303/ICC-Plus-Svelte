import { type RgbaColor, type HsvaColor, type Colord } from 'colord';
import type { A11yColor, Components } from '../type/types.js';
import { type TextsPartial, type A11yTextsPartial } from '../utils/texts.js';
/**
 * Color Picker Component — default export of the library
 *
 * **Import**
 * ```js
 * import ColorPicker from 'svelte-awesome-color-picker';
 * ```
 *
 * **Use**
 * ```svelte
 * <ColorPicker bind:hex />
 * ```
 *
 * **Props**
 * @prop components: Partial&lt;Components&gt; = {} — customize the ColorPicker component parts. Can be used to display a Chrome variant or an Accessibility Notice
 * @prop label: string = 'Choose a color' — input label, hidden when the ColorPicker is always shown (prop `isDialog={false}`)
 * @prop name: string | undefined = undefined — input name, useful in a native form
 * @prop nullable: boolean = false — if set to true, the color picker becomes nullable (rgb, hsv and hex set to undefined)
 * @prop rgb: RgbaColor | null — rgb color
 * @prop hsv: HsvaColor | null — hsv color
 * @prop hex: string | null — hex color
 * @prop color: Colord | null = null — Colord color
 * @prop isDark: boolean = false — indicator whether the selected color is light or dark
 * @prop isAlpha: boolean = true — if set to false, disables the alpha channel
 * @prop isDialog: boolean = true — if set to false, the input and the label will not be displayed and the ColorPicker will always be visible
 * @prop isOpen: boolean = !isDialog — indicator of the popup state
 * @prop position: 'fixed' | 'responsive' | 'responsive-x' | 'responsive-y' = 'fixed' — if set to "responsive", the popup will adjust its x and y position depending on the available window space, "responsive-x" and "responsive-y" limit the behavior to either the x or y axis. The value 'responsive' will become the default in the next major release
 * @prop isTextInput: boolean = true — if set to false, hide the hex, rgb and hsv text inputs
 * @prop textInputModes: Array&lt;'hex' | 'rgb' | 'hsv'&gt; = ['hex', 'rgb', 'hsv'] — configure which hex, rgb and hsv inputs will be visible and in which order. If overridden, it is necessary to provide at least one value
 * @prop sliderDirection: 'horizontal' | 'vertical' = 'vertical' — If set to "horizontal", the hue and alpha sliders will be displayed horizontally. It is necessary to set this props to "horizontal" for the ChromeVariant
 * @prop disableCloseClickOutside: boolean = false — If set to true, it will not be possible to close the color picker by clicking outside
 * @prop a11yColors: Array&lt;A11yColor&gt; = [{ bgHex: '#ffffff' }] — used with the A11yVariant. Define the accessibility examples in the color picker
 * @prop a11yLevel: 'AA' | 'AAA' = 'AA' — required WCAG contrast level
 * @prop texts: TextsPartial | undefined = undefined — all translation tokens used in the library; can be partially overridden; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts)
 * @prop a11yTexts: A11yTextsPartial | undefined = undefined — all a11y translation tokens used in the library; override with translations if necessary; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts)
 * @prop onInput: ((color: { hsv: HsvaColor | null; rgb: RgbaColor | null; hex: string | null; color: Colord | null }) =&gt; void) | undefined — listener, dispatch an event when the color changes
 */
declare const ColorPicker: import("svelte").Component<{
    /** customize the ColorPicker component parts. Can be used to display a Chrome variant or an Accessibility Notice */
    components?: Partial<Components>;
    /** input label, hidden when the ColorPicker is always shown (prop `isDialog={false}`) */
    label?: string;
    /** input name, useful in a native form */
    name?: string | undefined;
    /** if set to true, the color picker becomes nullable (rgb, hsv and hex set to undefined) */
    nullable?: boolean;
    /** rgb color */
    rgb?: RgbaColor | null;
    /** hsv color */
    hsv?: HsvaColor | null;
    /** hex color */
    hex?: string | null;
    /** Colord color */
    color?: Colord | null;
    /** indicator whether the selected color is light or dark */
    isDark?: boolean;
    /** if set to false, disables the alpha channel */
    isAlpha?: boolean;
    /** if set to false, the input and the label will not be displayed and the ColorPicker will always be visible */
    isDialog?: boolean;
    /** indicator of the popup state */
    isOpen?: boolean;
    /** if set to "responsive", the popup will adjust its x and y position depending on the available window space, "responsive-x" and "responsive-y" limit the behavior to either the x or y axis. The value 'responsive' will become the default in the next major release */
    position?: "fixed" | "responsive" | "responsive-x" | "responsive-y";
    /** if set to false, hide the hex, rgb and hsv text inputs */
    isTextInput?: boolean;
    /** configure which hex, rgb and hsv inputs will be visible and in which order. If overridden, it is necessary to provide at least one value */
    textInputModes?: Array<"hex" | "rgb" | "hsv">;
    /** If set to "horizontal", the hue and alpha sliders will be displayed horizontally. It is necessary to set this props to "horizontal" for the ChromeVariant */
    sliderDirection?: "horizontal" | "vertical";
    /** If set to true, it will not be possible to close the color picker by clicking outside */
    disableCloseClickOutside?: boolean;
    /** used with the A11yVariant. Define the accessibility examples in the color picker */
    a11yColors?: Array<A11yColor>;
    /** required WCAG contrast level */
    a11yLevel?: "AA" | "AAA";
    /** all translation tokens used in the library; can be partially overridden; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts) */
    texts?: TextsPartial | undefined;
    /** all a11y translation tokens used in the library; override with translations if necessary; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts) */
    a11yTexts?: A11yTextsPartial | undefined;
    /** listener, dispatch an event when the color changes */
    onInput?: ((color: {
        hsv: HsvaColor | null;
        rgb: RgbaColor | null;
        hex: string | null;
        color: Colord | null;
    }) => void) | undefined;
}, {}, "rgb" | "hsv" | "hex" | "color" | "isOpen" | "isDark">;
type ColorPicker = ReturnType<typeof ColorPicker>;
export default ColorPicker;
