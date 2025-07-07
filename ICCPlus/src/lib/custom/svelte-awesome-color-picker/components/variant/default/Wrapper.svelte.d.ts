/**
 * Default variant wrapper
 *
 * **Import**
 * this component is the default variant and cannot be imported
 *
 * **Use**
 * N.A.
 *
 * **Props**
 * @prop wrapper: HTMLElement | undefined — DOM element of the wrapper element
 * @prop isOpen: boolean — indicator of the popup state
 * @prop isDialog: boolean — if set to true, the wrapper should have a dialog role and be absolute. It should be relative otherwise
 * @prop children: import('svelte').Snippet — children
 */
declare const Wrapper: import("svelte").Component<{
    /** DOM element of the wrapper element */
    wrapper: HTMLElement | undefined;
    /** indicator of the popup state */
    isOpen: boolean;
    /** if set to true, the wrapper should have a dialog role and be absolute. It should be relative otherwise */
    isDialog: boolean;
    /** children */
    children: import("svelte").Snippet;
}, {}, "wrapper">;
type Wrapper = ReturnType<typeof Wrapper>;
export default Wrapper;
