export interface Props {
    /** placeholder, falls back to `Lorem Ipsum` */
    placeholder?: string | undefined;
    /** size of the text */
    size?: 'normal' | 'large' | undefined;
    /** required WCAG contrast level */
    a11yLevel: 'AA' | 'AAA';
    /** placeholder text color */
    textColor: string;
    /** placeholder background color */
    bgColor: string;
    /** RGAA contrast between the text and its background. Between 1 and 21 */
    contrast?: number;
    /** define the accessibility "contrast" text */
    contrastText: string;
}
/**
 * accessibility notice for a single color — this component is meant to be used with the A11yVariant object as a variant to display the accessibility notice.
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
 * @prop placeholder: string | undefined = undefined — placeholder, falls back to `Lorem Ipsum`
 * @prop size: 'normal' | 'large' | undefined = undefined — size of the text
 * @prop a11yLevel: 'AA' | 'AAA' — required WCAG contrast level
 * @prop textColor: string — placeholder text color
 * @prop bgColor: string — placeholder background color
 * @prop contrast: number = 1 — RGAA contrast between the text and its background. Between 1 and 21
 * @prop contrastText: string — define the accessibility "contrast" text
 */
declare const A11ySingleNotice: import("svelte").Component<Props, {}, "">;
type A11ySingleNotice = ReturnType<typeof A11ySingleNotice>;
export default A11ySingleNotice;
