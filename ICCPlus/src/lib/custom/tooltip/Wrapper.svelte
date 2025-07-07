<div bind:this={anchorEl} class="p-0 m-0 {innerClass}">
  {@render children?.()}
</div>

<script lang="ts">
    import type { Snippet } from 'svelte';
    import { onMount } from 'svelte';
    import { tooltipVariables } from './store.svelte';

    let { text = '', innerClass = '', children }: { text?: string, innerClass?: string, children?: Snippet; } = $props();
    let anchorEl: HTMLElement;

    function showTooltip() {
        tooltipVariables.anchor = anchorEl;
        tooltipVariables.text = text;
        tooltipVariables.isVisible = true;
    }

    function hideTooltip() {
        tooltipVariables.isVisible = false;
    }

    onMount(() => {
        anchorEl.addEventListener('mouseenter', showTooltip);
        anchorEl.addEventListener('mouseleave', hideTooltip);
        anchorEl.addEventListener('focusin', showTooltip);
        anchorEl.addEventListener('focusout', hideTooltip);

        return () => {
            anchorEl.removeEventListener('mouseenter', showTooltip);
            anchorEl.removeEventListener('mouseleave', hideTooltip);
            anchorEl.removeEventListener('focusin', showTooltip);
            anchorEl.removeEventListener('focusout', hideTooltip);
        };
    });
</script>