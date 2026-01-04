<svelte:options runes />

<div
  bind:this={element}
  use:Anchor
  use:useActions={use}
  class={classMap({
    'smui-autocomplete': true,
    [className]: true,
  })}
  {...exclude(restProps, ['menu$', 'textfield$', 'list$'])}
  onfocusout={(
    event: FocusEvent & { currentTarget: EventTarget & HTMLDivElement },
  ) => {
    if (!disabled) {
      handleElementBlur(event);
    }
    restProps.onfocusout?.(event);
  }}
>
  <div
    bind:this={inputContainer}
    aria-controls={menuId}
    aria-expanded={menuOpen ? 'true' : 'false'}
    role="combobox"
    tabindex="0"
    onfocusin={() => {
      if (!disabled) {
        focused = true;
      }
    }}
    oninput={() => {
      focusedIndex = -1;
    }}
    onkeydowncapture={handleTextfieldKeydown}
  >
    {#if children}
      {@render children?.()}
    {:else}
      <Textfield
        {label}
        {disabled}
        bind:value={text}
        {...prefixFilter(restProps, 'textfield$')}
        onclick={(e) => {
          const target = e.target as HTMLElement;
          if (target) {
            if (target.classList.contains('mdc-text-field__input')) isOpen = !isOpen;
          }
        }}
      />
    {/if}
  </div>
  <Menu
    class={classMap({
      [menu$class]: true,
      'smui-autocomplete__menu': true,
    })}
    id={menuId}
    managed
    neverRestoreFocus
    open={menuOpen}
    bind:anchorElement={element}
    anchor={menu$anchor}
    anchorCorner={menu$anchorCorner}
    {...prefixFilter(restProps, 'menu$')}
    style="overflow-y: hidden"
  >
    <div style="max-height: 288px; overflow-y: auto;" onscroll={handleScroll}>
    <List {...prefixFilter(restProps, 'list$')}>
      {#if loadingState}
        <Item disabled>
          {#if loading}
            {@render loading()}
          {:else}
            <Text>Loading...</Text>
          {/if}
        </Item>
      {:else if errorState}
        <Item disabled>
          {#if error}
            {@render error()}
          {:else}
            <Text>Error while fetching suggestions.</Text>
          {/if}
        </Item>
      {:else}
        {#if multiple && matches.length > 0}
          <Item
              onSMUIAction={selectAll}
              onfocusin={(e) => {
                e.preventDefault();
                focus();
              }}
              class="b-line"
            >
              <Text>{isAllSelected ? 'Deselect All' : 'Select All'}</Text>
          </Item>
        {/if}
        {#each matches.slice(0, visibleCounter) as curMatch}
          <Item
            disabled={getOptionDisabled(curMatch)}
            selected={curMatch === value}
            onSMUIAction={() =>
              toggle ? toggleOption(curMatch) : selectOption(curMatch)}
            onfocusin={(e) => {
              e.preventDefault();
              focus();
            }}
          >
            {#if match}
              {@render match(curMatch)}
            {:else}
              {#if multiple}
                  <i class={multipleValue && multipleValue.includes(curMatch) ? 'mdi mdi-checkbox-outline button-icons' : 'mdi mdi-checkbox-blank-outline button-icons'}></i>
              {/if}
              <Text>{getOptionLabel(curMatch)}</Text>
            {/if}
          </Item>
        {:else}
          <Item
            disabled={noMatchesActionDisabled}
            onSMUIAction={(e) =>
              dispatch(getElement(), 'SMUIAutocompleteNoMatchesAction', e)}
          >
            {#if noMatches}
              {@render noMatches()}
            {:else}
              <Text>No matches found.</Text>
            {/if}
          </Item>
        {/each}
      {/if}
    </List>
  </div>
  </Menu>
</div>

<script module lang="ts">
  let counter = 0;
</script>

<script lang="ts">
  import type { ComponentProps, Snippet } from 'svelte';
  import { setContext, tick } from 'svelte';
  import { on } from 'svelte/events';
  import type { SmuiAttrs } from '@smui/common';
  import type { ActionArray } from '@smui/common/internal';
  import {
    classMap,
    exclude,
    prefixFilter,
    useActions,
    dispatch,
  } from '@smui/common/internal';
  import Textfield from '$lib/custom/textfield';
  import Menu from '@smui/menu';
  import type { SMUIListAccessor, SMUIListItemAccessor } from '@smui/list';
  import List, { Item, Text } from '@smui/list';
  import { Anchor } from '@smui/menu-surface';
  import { app, dlgVariables } from '$lib/store/store.svelte';

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
     * The styling variant of the input.
     */
    variant?: 'text' | 'raised' | 'unelevated' | 'outlined';
    /**
     * The available options, or a function that returns them asynchronously.
     */
    options?: (() => Promise<any[]>) | any[];
    /**
     * The value of the input.
     */
    value?: any;
    /**
     * A function that returns whether an option is disabled.
     */
    getOptionDisabled?: (option: any) => boolean;
    /**
     * A function that returns the text label for an object.
     */
    getOptionLabel?: (option: any) => string;
    /**
     * The text value of the input box.
     */
    text?: string;
    /**
     * The label or a spot for the label.
     */
    label?: string | Snippet | undefined;
    /**
     * Whether the input is disabled.
     */
    disabled?: boolean;
    /**
     * Whether options should be toggled when selected.
     */
    toggle?: boolean;
    /**
     * Allow the user to enter their own value as well as pick from the options.
     */
    combobox?: boolean;
    /**
     * Clear the input text when the input loses focus.
     */
    clearOnBlur?: boolean;
    /**
     * Select an option when the search text matches it exactly.
     */
    selectOnExactMatch?: boolean;
    /**
     * Show the options dropdown menu before the user enters any input text.
     */
    showMenuWithNoInput?: boolean;
    /**
     * Whether the item button displayed when there are no matches is disabled.
     */
    noMatchesActionDisabled?: boolean;
    /**
     * A function that takes a search input and returns options.
     */
    search?: (input: string) => Promise<any[] | false>;
    /**
     * A space separated list of CSS classes.
     */
    menu$class?: string;
    /**
     * Anchor the menu surface automatically to its parent element.
     *
     * If you set this to false, you need to provide an element to
     * `anchorElement`.
     */
    menu$anchor?: boolean;
    /**
     * Default anchor corner alignment of top left menu surface corner.
     */
    menu$anchorCorner?: ComponentProps<typeof Menu>['anchorCorner'];

    children?: Snippet;
    /**
     * A spot for the item text when the results are loading.
     */
    loading?: Snippet;
    /**
     * A spot for the item text when an error occurred.
     */
    error?: Snippet;
    /**
     * A spot for the item text for a matched option.
     */
    match?: Snippet<[any]>;
    /**
     * A spot for the item text when no matches were found.
     */
    noMatches?: Snippet;
    /**
     * Whether can check mutiple
    */
    multiple?: boolean;
    multipleValue?: string[];
    parentElement?: HTMLDivElement;
    onfocuslost?: () => void;
  };
  let {
    use = [],
    class: className = '',
    options = [],
    value = $bindable(),
    getOptionDisabled = () => false,
    getOptionLabel = (option: any) => (option == null ? '' : `${option}`),
    text = $bindable(getOptionLabel(value)),
    label,
    disabled = false,
    toggle = false,
    combobox = false,
    clearOnBlur = !combobox,
    selectOnExactMatch = true,
    showMenuWithNoInput = true,
    noMatchesActionDisabled = true,
    search = async (input: string) => {
      const linput = input.toLowerCase();
      const fullOptions =
        typeof options == 'function' ? await options() : options || [];

      if (linput === '') {
        return fullOptions;
      }

      const result = fullOptions.filter((item) =>
        getOptionLabel(item).toLowerCase().includes(linput),
      );
      result.sort((a, b) => {
        const aString = getOptionLabel(a).toLowerCase();
        const bString = getOptionLabel(b).toLowerCase();
        if (aString.startsWith(linput) && !bString.startsWith(linput)) {
          return -1;
        } else if (bString.startsWith(linput) && !aString.startsWith(linput)) {
          return 1;
        }
        return 0;
      });
      return result;
    },
    menu$class = '',
    menu$anchor = false,
    menu$anchorCorner = 'BOTTOM_START',
    children,
    loading,
    error,
    match,
    noMatches,
    multiple = false,
    multipleValue,
    parentElement,
    onfocuslost,
    ...restProps
  }: OwnProps &
    SmuiAttrs<'div', keyof OwnProps> & {
      [k in keyof ComponentProps<typeof Menu> as `menu\$${k}`]?: ComponentProps<
        typeof Menu
      >[k];
    } & {
      [k in keyof ComponentProps<
        typeof Textfield
      > as `textfield\$${k}`]?: ComponentProps<typeof Textfield>[k];
    } & {
      [k in keyof ComponentProps<typeof List> as `list\$${k}`]?: ComponentProps<
        typeof List
      >[k];
    } & {
      textfield$label?: never;
      textfield$value?: never;
    } = $props();

  let element: HTMLDivElement = $state(document.createElement('div'));
  let inputContainer: HTMLDivElement;
  let loadingState = $state(0);
  let errorState = $state(false);
  let focused = $state(false);
  let listAccessor: SMUIListAccessor;
  let matches: any[] = $state([]);
  let focusedIndex = $state(-1);
  let focusedItem: SMUIListItemAccessor | undefined = $state();
  let menuId: string =
    restProps['menu$id'] ?? 'SMUI-autocomplete-' + counter++ + '-menu';
  let isOpen = $state(false);
  let visibleCounter = $state(24);
  let isAllSelected = $state(false);

  const menuOpen = $derived(
    focused &&
      (text !== '' || showMenuWithNoInput) &&
      (loadingState > 0 ||
        (!combobox && (!(matches.length === 1 && matches[0] === value)) || toggle) ||
        (combobox &&
          !!matches.length &&
          !(matches.length === 1 && matches[0] === value))),
  );

  let previousText = text;
  $effect(() => {
    if (previousText !== text) {
      /*
      if (value != null && getOptionLabel(value) !== text) {
        deselectOption(value, false);
      }
      */

      // Only when we're focused do we need to perform a search.
      if (focused) {
        performSearch();
        previousText = text;
      }
    }
  });

  let performingSearchForOptions = false;
  $effect(() => {
    if (options && !performingSearchForOptions) {
      performingSearchForOptions = true;
      // Set search results on init and refresh search results when `options` is
      // changed.
      performSearch().then(() => {
        performingSearchForOptions = false;
      });
    }
  });

  let previousValue = value;
  $effect(() => {
    if (previousValue !== value) {
      // If the value changed from outside, update the text.
      text = getOptionLabel(value);
      previousValue = value;
    } else if (combobox && value !== text) {
      // An update came from the user.
      value = text;
      previousValue = value;
    }
  });

  let previousFocusedIndex: number | undefined = undefined;
  $effect(() => {
    if (previousFocusedIndex !== focusedIndex) {
      const activeItems = getActiveMenuItems();

      if (focusedIndex === -1) {
        focusedItem = undefined;
      } else {
        focusedItem = activeItems[focusedIndex];

        if (focusedItem) {
          focusedItem.activated = true;
          if (!isInViewport(focusedItem.element)) {
            focusedItem.element.scrollIntoView({
              block: 'end',
              inline: 'nearest',
            });
          }
        }
      }

      activeItems.forEach((item, i) => {
        if (i !== focusedIndex) {
          item.activated = false;
        }
      });

      if (listAccessor) {
        listAccessor.getOrderedList().forEach((itemAccessor) => {
          itemAccessor.tabindex = -1;
        });
      }

      previousFocusedIndex = focusedIndex;
    }
  });

  setContext('SMUI:list:mount', (accessor: SMUIListAccessor) => {
    if (!listAccessor) {
      listAccessor = accessor;
    }
  });

  async function performSearch() {
    // This will cause the menu to be rerendered, so we should preserve
    // focus if the menu is focused.
    if (focused && !isInputFocused()) {
      focus();
    }

    loadingState += 1;
    errorState = false;
    try {
      const searchResult = await search(text);
      if (searchResult !== false) {
        matches = searchResult;
        if (selectOnExactMatch) {
          const exactMatch = matches.find(
            (match) => getOptionLabel(match) === text,
          );
          if (exactMatch != null && getOptionLabel(value) !== text) {
            selectOption(exactMatch);
          }
        }
      }
    } catch (e: any) {
      errorState = true;
    }
    loadingState -= 1;
  }

  function selectOption(option: any, setText = true) {
    const event = dispatch(getElement(), 'SMUIAutocompleteSelected', option, {
      bubbles: true,
      cancelable: true,
    });

    if (event.defaultPrevented) {
      return;
    }

    if (multiple && multipleValue) {
      multipleValue.push(option);
      if (setText) {
        text = '';
      }
    } else {
      if (setText) {
        text = getOptionLabel(option);
      }
      value = option;
      if (!setText) {
        previousValue = option;
      }
      tick().then(() => blur());
    }
  }

  function deselectOption(option: any, setText = true) {
    const event = dispatch(getElement(), 'SMUIAutocompleteDeselected', option, {
      bubbles: true,
      cancelable: true,
    });

    if (event.defaultPrevented) {
      return;
    }

    if (multiple && multipleValue) {
      let index = multipleValue.indexOf(option);
      multipleValue.splice(index, 1);
    } else {
      if (setText) {
        text = '';
      }
      value = undefined;
      if (!setText) {
        previousValue = undefined;
      }
      visibleCounter = 24;
    }
  }

  function toggleOption(option: any) {
    if (multiple) {
      if (multipleValue && multipleValue.includes(option)) {
        deselectOption(option);
      } else {
        selectOption(option);
      }
    } else {
      if (option === value) {
        deselectOption(option);
      } else {
        selectOption(option);
      }
    }
  }

  function isInViewport(elem: Element) {
    var bounding = elem.getBoundingClientRect();
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <=
        (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function getActiveMenuItems() {
    if (!listAccessor) {
      return [];
    }
    return listAccessor
      .getOrderedList()
      .filter((itemAccessor) => !itemAccessor.disabled);
  }

  function handleTextfieldKeydown(e: KeyboardEvent) {
    if (combobox && !matches.length) {
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();

      if (
        focusedIndex === -1 ||
        focusedIndex === getActiveMenuItems().length - 1
      ) {
        focusedIndex = 0;
      } else {
        focusedIndex++;
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();

      if (focusedIndex === -1 || focusedIndex === 0) {
        focusedIndex = getActiveMenuItems().length - 1;
      } else {
        focusedIndex--;
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();

      const activeItems = getActiveMenuItems();

      if (focusedItem) {
        if (activeItems[focusedIndex]) {
          activeItems[focusedIndex].action(e);
        }
        focusedIndex = -1;
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      blur();      
    }
  }

  async function handleElementBlur(
    event: FocusEvent & { currentTarget: EventTarget & HTMLDivElement },
  ) {
    if (!document.hasFocus()) {
      // Document lost focus.
      on(
        window,
        'focus',
        () => {
          if (!getElement()?.contains(document.activeElement)) {
            handleElementBlur(event);
          }
        },
        { once: true },
      );
      return;
    }
    if (event.currentTarget?.contains(event.relatedTarget as Element | null)) {
      // Focus is remaining in the container.
      return;
    }
    if (focused && onfocuslost) onfocuslost();
    // Clear the focus and input.
    focusedIndex = -1;
    focused = false;

    if (clearOnBlur && value == null) {
      text = '';
    }
  }

  function isInputFocused() {
    if (inputContainer) {
      return (
        document.activeElement ===
        inputContainer.querySelector<HTMLInputElement>(
          'input.mdc-text-field__input',
        )
      );
    }
  }

  export function focus() {
    if (inputContainer) {
      const inputEl = inputContainer.querySelector<HTMLInputElement>(
        'input.mdc-text-field__input',
      );
        
      if (inputEl) {
        inputEl.focus();
      }
    }
  }

  export function blur() {
    if (inputContainer) {
      const inputEl = inputContainer.querySelector<HTMLInputElement>(
        'input.mdc-text-field__input',
      );

      if (inputEl) {
        inputEl.blur();
      }
      
      if (isOpen) {
        isOpen = false;
      }
    }
  }

  export function getElement() {
    return element;
  }

  export function isExpanded() {
    return menuOpen;
  }

  function selectAll() {
    function selectProc() {
      for (let i = 0; i < matches.length; i++) {
        let option = matches[i];
        if (isAllSelected) {
          if (multipleValue && multipleValue.includes(option)) {
            deselectOption(option);
          }
        } else {
          if (multipleValue && !multipleValue.includes(option)) {
            selectOption(option);
          }
        }
      }
      isAllSelected = !isAllSelected;
    }

    if (app.checkSelectAll) {
      dlgVariables.currentDialog = 'dlgCommon';
      dlgVariables.context = `Are you sure you want to ${isAllSelected ? 'deselect' : 'select'} all items?`;
      dlgVariables.title = '';
      dlgVariables.cFunc = (e: CustomEvent) => {
          if (e.detail.action === 'accept') {
              selectProc();
          }
      }
    } else {
      selectProc();
    }
  }

  function handleScroll(event: UIEvent) {
    const list = event.target as HTMLElement;
    if (list.scrollTop + list.clientHeight >= list.scrollHeight - 48) {
      visibleCounter = Math.min(visibleCounter + 12, matches.length);
    }
  }
  
</script>
