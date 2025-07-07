/**
 * button to open the color picker. Also provides a hidden input with the hex value selected by the user
 * to fallback to color picker to the default browser one if a problem happens. This component cannot be imported
 * directly but can be overridden.
 *
 * **Import**
 * _N.A._
 *
 * **Use**
 * _N.A._
 *
 * **Props**
 * @prop labelElement: HTMLLabelElement | undefined — DOM element of the label wrapper
 * @prop hex: string | null — hex color
 * @prop label: string — input label
 * @prop name: string | undefined = undefined — input name, useful in a native form
 */
declare const Input: import("svelte").Component<{
    /** DOM element of the label wrapper */
    labelElement: HTMLLabelElement | undefined;
    /** hex color */
    hex: string | null;
    /** input label */
    label: string;
    /** input name, useful in a native form */
    name?: string | undefined;
}, {}, "labelElement">;
type Input = ReturnType<typeof Input>;
export default Input;
