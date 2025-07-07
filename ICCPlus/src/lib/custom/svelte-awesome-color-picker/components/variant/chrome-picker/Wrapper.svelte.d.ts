/**
 * Chrome variant wrapper — this component is meant to be used with the ChromeVariant object to display a Chrome like variant.
 *
 * **Import**
 * ```js
 * import { ChromeVariant } from 'svelte-awesome-color-picker';
 * ```
 *
 * **Use**
 * ```svelte
 * <ColorPicker bind:hex components={ChromeVariant} />
 * ```
 *
 * **Props**
 * @prop wrapper: HTMLElement — DOM element of the wrapper element
 * @prop isOpen: boolean — indicator of the popup state
 * @prop isDialog: boolean — if set to true, the wrapper should have a dialog role and be absolute. It should be relative otherwise
 * @prop children: import('svelte').Snippet — children
 */
declare const Wrapper: import("svelte").Component<{
    /** DOM element of the wrapper element */
    wrapper: HTMLElement;
    /** indicator of the popup state */
    isOpen: boolean;
    /** if set to true, the wrapper should have a dialog role and be absolute. It should be relative otherwise */
    isDialog: boolean;
    /** children */
    children: import("svelte").Snippet;
}, {}, "wrapper">;
type Wrapper = ReturnType<typeof Wrapper>;
export default Wrapper;
