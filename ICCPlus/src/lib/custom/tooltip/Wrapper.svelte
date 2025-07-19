<div use:tooltip={{ text: text, delay: 0 }} class={innerClass}>
  {@render children?.()}
</div>

<script lang="ts">
    import type { Snippet } from 'svelte';
    import { tooltip } from './store.svelte';

    let { text = '', innerClass = '', children }: { text?: string, innerClass?: string, children?: Snippet; } = $props();
</script>