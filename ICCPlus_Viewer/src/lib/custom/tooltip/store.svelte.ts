export type TooltipVariables = {
    anchor: HTMLElement | null,
    text: string,
    isVisible: boolean
}
export const tooltipVariables = $state<TooltipVariables>({
    anchor: null,
    text: '',
    isVisible: true
});