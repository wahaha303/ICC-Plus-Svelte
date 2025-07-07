import { type A11yTextsPartial } from '../../../utils/texts.js';
import type { A11yColor, Components } from '../../../type/types.js';
/**
 * Accessibility notice — this component is meant to be used with the A11yVariant object as a variant to display the accessibility notice.
 *
 * **Import**
 * ```js
 * import { A11yVariant } from 'svelte-awesome-color-picker';
 * ```
 *
 * **Use**
 * ```svelte
 * <ColorPicker bind:hex components={A11yVariant} />
 * ```
 *
 * **Props**
 * @prop components: Components — customize the ColorPicker component parts. Can be used to display a Chrome variant or an Accessibility Notice
 * @prop hex: string — hex color
 * @prop a11yColors: Array&lt;A11yColor&gt; — define the accessibility examples in the color picker
 * @prop a11yLevel: 'AA' | 'AAA' — required WCAG contrast level
 * @prop a11yTexts: A11yTextsPartial | undefined = undefined — all a11y translation tokens used in the library; override with translations if necessary; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts)
 */
declare const A11yNotice: import("svelte").Component<{
    /** customize the ColorPicker component parts. Can be used to display a Chrome variant or an Accessibility Notice */
    components: Components;
    /** hex color */
    hex: string;
    /** define the accessibility examples in the color picker */
    a11yColors: Array<A11yColor>;
    /** required WCAG contrast level */
    a11yLevel: "AA" | "AAA";
    /** all a11y translation tokens used in the library; override with translations if necessary; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts) */
    a11yTexts?: A11yTextsPartial | undefined;
}, {}, "">;
type A11yNotice = ReturnType<typeof A11yNotice>;
export default A11yNotice;
