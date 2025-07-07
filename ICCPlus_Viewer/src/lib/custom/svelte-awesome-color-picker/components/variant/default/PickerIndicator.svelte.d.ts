interface Props {
    /** indicator position in % */
    pos: {
        x: number;
        y: number;
    };
    /** indicator whether the selected color is light or dark */
    isDark: boolean;
}
declare const PickerIndicator: import("svelte").Component<Props, {}, "">;
type PickerIndicator = ReturnType<typeof PickerIndicator>;
export default PickerIndicator;
