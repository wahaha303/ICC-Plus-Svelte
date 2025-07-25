<svelte:options runes />

<div
  bind:this={element}
  use:useActions={use}
  use:Ripple={{
    ripple,
    unbounded: false,
    surface: !$nonInteractive,
    disabled: $disabled || $nonInteractive,
    addClass,
    removeClass,
    addStyle,
  }}
  class={classMap({
    [className]: true,
    'smui-accordion__header': true,
    ...internalClasses,
  })}
  style={Object.entries(internalStyles)
    .map(([name, value]) => `${name}: ${value};`)
    .concat([style])
    .join(' ')}
  role="button"
  tabindex={$nonInteractive ? -1 : 0}
  aria-expanded={$open ? 'true' : 'false'}
  {...restProps}
  onclick={(e) => {
    handleClick(e);
    restProps.onclick?.(e);
    e.currentTarget.blur();
  }}
  onkeydown={(e) => {
    handleKeyDown(e);
    restProps.onkeydown?.(e);
  }}
>
  {#if ripple}
    <div class="smui-accordion__header__ripple"></div>
  {/if}
  <div
    class={classMap({
      'smui-accordion__header__title': true,
      'smui-accordion__header__title--with-description': description,
    })}
  >
    {@render children?.()}
  </div>
  {#if description}
    <div class="smui-accordion__header__description">
      {@render description?.()}
    </div>
  {/if}
  {#if icon}
    <div class="smui-accordion__header__icon">
      {@render icon?.()}
    </div>
  {/if}
</div>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import { getContext } from 'svelte';
  import type { SmuiAttrs } from '@smui/common';
  import type { ActionArray } from '@smui/common/internal';
  import { classMap, useActions, dispatch } from '@smui/common/internal';
  import Ripple from '@smui/ripple';

  type OwnProps = {
    /**
     * An array of Action or [Action, ActionProps] to be applied to the element.
     */
    use?: ActionArray;
    /**
     * A space separated list of CSS classes.
     */
    class?: string;
    /**
     * A list of CSS styles.
     */
    style?: string;
    /**
     * Whether to show a ripple animation.
     */
    ripple?: boolean;

    children?: Snippet;
    /**
     * A spot for the description.
     */
    description?: Snippet;
    /**
     * A spot for the icon.
     */
    icon?: Snippet;
  };
  let {
    use = [],
    class: className = '',
    style = '',
    ripple = true,
    children,
    description,
    icon,
    ...restProps
  }: OwnProps & SmuiAttrs<'div', keyof OwnProps> = $props();

  let element: HTMLDivElement;
  let internalClasses: { [k: string]: boolean } = $state({});
  let internalStyles: { [k: string]: string } = $state({});

  const disabled = getContext<SvelteStore<boolean>>(
    'SMUI:accordion:panel:disabled',
  );
  const nonInteractive = getContext<SvelteStore<boolean>>(
    'SMUI:accordion:panel:nonInteractive',
  );
  const open = getContext<SvelteStore<boolean>>('SMUI:accordion:panel:open');

  function handleClick(event: MouseEvent) {
    if (event.button === 0) {
      dispatch(getElement(), 'SMUIAccordionHeaderActivate', {
        event,
      });
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      dispatch(getElement(), 'SMUIAccordionHeaderActivate', {
        event,
      });
    }
  }

  function addClass(className: string) {
    if (!internalClasses[className]) {
      internalClasses[className] = true;
    }
  }

  function removeClass(className: string) {
    if (!(className in internalClasses) || internalClasses[className]) {
      internalClasses[className] = false;
    }
  }

  function addStyle(name: string, value: string) {
    if (internalStyles[name] != value) {
      if (value === '' || value == null) {
        delete internalStyles[name];
      } else {
        internalStyles[name] = value;
      }
    }
  }

  export function getElement() {
    return element;
  }
</script>
