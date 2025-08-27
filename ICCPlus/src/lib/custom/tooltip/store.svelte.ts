import { app } from "$lib/store/store.svelte";

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
type TooltipData = {
  text: string;
  delay: number;
}
let tooltipTimer: number = 0;
export function tooltip(node: HTMLElement, data: string | TooltipData) {
    let text = typeof data === 'string' ? data : data.text;

    function show() {
        let delay = typeof data === 'string' ? (typeof app.tooltipDelay !== 'undefined' ? app.tooltipDelay : 1000) : data.delay;
        if (tooltipTimer !== 0) {
            clearTimeout(tooltipTimer);
            tooltipTimer = 0;
        }

        if (delay > 0) {
            tooltipTimer = window.setTimeout(() => {
                tooltipVariables.anchor = node;
                tooltipVariables.text = text;
                tooltipVariables.isVisible = true;
            }, delay);
        } else {
            tooltipVariables.anchor = node;
            tooltipVariables.text = text;
            tooltipVariables.isVisible = true;
        }
    }

    function hide() {
        if (tooltipTimer !== 0) {
            clearTimeout(tooltipTimer);
            tooltipTimer = 0;
        }
        tooltipVariables.isVisible = false;
    }

    node.addEventListener('mouseenter', show);
    node.addEventListener('mouseleave', hide);
    node.addEventListener('focusin', show);
    node.addEventListener('focusout', hide);

    return {
        destroy() {
            tooltipVariables.isVisible = false;
            tooltipVariables.anchor = null;
            node.removeEventListener('mouseenter', show);
            node.removeEventListener('mouseleave', hide);
            node.removeEventListener('focusin', show);
            node.removeEventListener('focusout', hide);
        }
    };
};