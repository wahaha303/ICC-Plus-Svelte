import type { Texts } from '../../../utils/texts.js';
interface Props {
    /** whether the color picker is undefined */
    isUndefined: boolean;
    /** all translation tokens used in the library; can be partially overridden; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts) */
    texts: Texts;
}
declare const NullabilityCheckbox: import("svelte").Component<Props, {}, "isUndefined">;
type NullabilityCheckbox = ReturnType<typeof NullabilityCheckbox>;
export default NullabilityCheckbox;
