<Autocomplete
    options={getGroups()}
    getOptionLabel={getGroupLabel}
    bind:value={choice.groups[index]}
    label="Group"
    toggle={true}
    showMenuWithNoInput={true}
    textfield$variant="filled"
    class="col-12 on-top"
    onSMUIAutocompleteSelected={setGroupElement}
    onSMUIAutocompleteDeselected={releaseGroupElement}
/>

<script lang="ts">
    import Autocomplete from '$lib/custom/autocomplete/Autocomplete.svelte';
    import { groupMap, getGroups } from '$lib/store/store.svelte';
    import type { Choice } from '$lib/store/types';

    let { choice, index }: { choice: Choice; index: number; } = $props();

    function getGroupLabel(str: string) {
        let group = groupMap.get(str);
        if (typeof group !== 'undefined') {
            return `${group.id} | ${group.name}`;
        }
        return '';
    }

    function setGroupElement(e: CustomEvent) {
        let group = groupMap.get(e.detail);
        if (typeof group !== 'undefined') {
            if (group.elements.indexOf(choice.id) === -1) {
                group.elements.push(choice.id);
            }
        }
    }

    function releaseGroupElement(e: CustomEvent) {
        let group = groupMap.get(e.detail);
        if (typeof group !== 'undefined') {
            let cIdx = group.elements.indexOf(choice.id);
            if (cIdx !== -1) {
                group.elements.splice(cIdx, 1);
            }
        }
    }

</script>