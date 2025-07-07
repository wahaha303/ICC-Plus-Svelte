<ChipInput
    bind:chips={acValue}
    bind:value
    getChipLabel={(e) => getLabel(e)}
    getChipText={(e) => getLabel(e)}
    chipTrailingAction$aria-label="Remove Item"
    autocomplete$showMenuWithNoInput
    autocomplete$options={acOptions}
    autocomplete$getOptionLabel={(e) => getLabel(e)}
    autocomplete$multiple={multiple}
    autocomplete$multipleValue={acValue}
    autocomplete$toggle={true}
    autocomplete$onSMUIAutocompleteSelected={(e) => onSelected(e, selectProp)}
    autocomplete$onSMUIAutocompleteDeselected={(e) => onDeselected(e, selectProp)}
    chip$onSMUIChipRemoval={(e) => onDeselected(e, selectProp)}
    textfield$variant="filled"
    style="gap:0px"
>    
    {#snippet chipTrailingAction()}<i class="mdi mdi-close-circle"></i>{/snippet}
    {#snippet label()}
        {inputLabel}
    {/snippet}
</ChipInput>
<script lang="ts">
    import ChipInput from '$lib/custom/chip-input';

    type OwnProps = {
        acValue: any[],
        acOptions: any[],
        getLabel?: (e: any) => string,
        inputLabel?: string,
        onSelected?: (e: CustomEvent, t: any) => void,
        onDeselected?: (e: CustomEvent, t: any) => void,
        selectProp?: any,
        multiple?: boolean
    }

    let {
        acValue,
        acOptions,
        getLabel = (e) => {return e.toString()},
        inputLabel,
        onSelected = () => {},
        onDeselected = () => {},
        selectProp,
        multiple = true
    }:OwnProps = $props();

    let value = $state();

</script>