/**
 * Accessibility horizontal wrapper — this component is meant to be used with the A11yVariant object as a variant to display the accessibility notice.
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
 * @prop wrapper: HTMLElement — DOM element of the Color Picker popup wrapper
 * @prop isOpen: boolean — indicator of the popup state
 * @prop isDialog: boolean — if set to true, the wrapper should have a dialog role and be absolute. It should be relative otherwise
 * @prop children: import('svelte').Snippet — children
 */
declare const A11yHorizontalWrapper: import("svelte").Component<{
    /** DOM element of the Color Picker popup wrapper */
    wrapper: HTMLElement;
    /** indicator of the popup state */
    isOpen: boolean;
    /** if set to true, the wrapper should have a dialog role and be absolute. It should be relative otherwise */
    isDialog: boolean;
    /** children */
    children: import("svelte").Snippet;
}, {}, "wrapper">;
type A11yHorizontalWrapper = ReturnType<typeof A11yHorizontalWrapper>;
export default A11yHorizontalWrapper;
