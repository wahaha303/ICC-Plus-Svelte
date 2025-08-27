<div
  class="mdc-tooltip"
  role="tooltip"
  bind:this={el}
  style="z-index: 9999;"
>
  <div class="mdc-tooltip__surface">
    {@html tooltipVariables.text}
  </div>
</div>

<script lang="ts">
  import { onDestroy } from 'svelte';
  import { createPopper, type Instance } from '@popperjs/core';
  import { tooltipVariables } from './store.svelte';

  let el = $state<HTMLElement>();
  let popper: Instance | null = null;

  $effect(() => {
    if (el && tooltipVariables.text !== '') {
        if (tooltipVariables.isVisible && tooltipVariables.anchor && tooltipVariables.anchor.isConnected) {
            popper?.destroy();
            popper = createPopper(tooltipVariables.anchor, el, {
              placement: 'top',
              modifiers: [
                  { name: 'offset', options: { offset: [0, 6] } },
                  { name: 'preventOverflow', options: { boundary: 'viewport' } },
                  { name: 'flip', options: { fallbackPlacements: ['top', 'bottom'] } }
              ]
            });
            el.classList.add('mdc-tooltip--shown');
        } else if (popper) {
            popper.destroy();
            popper = null;
            el.classList.remove('mdc-tooltip--shown');
        }
    }
  });

  onDestroy(() => {
    popper?.destroy();
  });
</script>