<Autocomplete
    bind:this={element}
    options={options}
    getOptionLabel={getOptionLabel}
    bind:value={value}
    label={label}
    toggle={toggle}
    showMenuWithNoInput={showMenuWithNoInput}
    textfield$variant={textfield$variant}
    class={innerClass}
    onfocuslost={setValue}
/>
<script lang="ts">
    import Autocomplete from '$lib/custom/autocomplete/Autocomplete.svelte';

    type OwnProps = {
        options: any[],
        bindObj: any,
        bindVal: string,
        label?: string,
        getOptionLabel?: (e: any) => string,
        toggle?: boolean,
        showMenuWithNoInput?: boolean,
        innerClass?: string,
        textfield$variant?: 'filled' | 'outlined' | 'standard'
    }

    let {
        options,
        bindObj,
        bindVal,
        label = '',
        getOptionLabel = (e) => {return e.toString()},
        toggle = true,
        showMenuWithNoInput = true,
        innerClass = '',
        textfield$variant = 'filled'
    }:OwnProps = $props();

    let value = $state();
    let element: Autocomplete | null = null;

    value = bindObj[bindVal];

    $effect(() => {
        if (!element?.isExpanded() && value !== bindObj[bindVal]) {
            value = bindObj[bindVal];
        }
    });

    function setValue() {
        if (bindObj[bindVal] !== value) bindObj[bindVal] = value;
    }
</script>