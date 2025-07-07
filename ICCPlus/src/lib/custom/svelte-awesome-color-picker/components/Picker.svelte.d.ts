import type { Components } from '../type/types.js';
import type { Texts } from '../utils/texts.js';
interface Props {
    /** customize the ColorPicker component parts. Can be used to display a Chrome variant or an Accessibility Notice */
    components: Components;
    /** hue value */
    h: number;
    /** saturation value */
    s: number;
    /** vibrance value */
    v: number;
    /** indicator whether the selected color is light or dark */
    isDark: boolean;
    /** all translation tokens used in the library; can be partially overridden; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts) */
    texts: Texts;
    /** listener, dispatch an event when the user drags, clicks or tabs at the picker */
    onInput: (color: {
        s: number;
        v: number;
    }) => void;
}
/**
 * Picker wrapper containing the mouse and keyboard logic to select the color. _internal component_
 *
 * **Import**
 * N.A.
 *
 * **Use**
 * N.A.
 *
 * **Props**
 * @prop components: Components — customize the ColorPicker component parts. Can be used to display a Chrome variant or an Accessibility Notice
 * @prop h: number — hue value
 * @prop s: number — saturation value
 * @prop v: number — vibrance value
 * @prop isDark: boolean — indicator whether the selected color is light or dark
 * @prop texts: Texts — all translation tokens used in the library; can be partially overridden; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts)
 * @prop onInput: (color: { s: number; v: number }) =&gt; void — listener, dispatch an event when the user drags, clicks or tabs at the picker
 */
declare const Picker: import("svelte").Component<Props, {}, "s" | "v">;
type Picker = ReturnType<typeof Picker>;
export default Picker;
