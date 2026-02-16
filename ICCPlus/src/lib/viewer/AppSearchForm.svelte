<Dialog
    bind:open
    surface$style="width: 800px; max-width: calc(100vw - 32px); min-height: 600px;"
    onSMUIDialogClosed={onclose}
>
    <Title class="px-3 pb-0 toolbar toolbar__dialog" tabindex={0} autofocus>
        Search
    </Title>
    <Autocomplete
        bind:this={sField}
        options={getSearchables()}
        getOptionLabel={getChoiceLabel}
        bind:value={searchVal}
        showMenuWithNoInput={false}
        textfield$variant="outlined"
        class="w-100 p-0"
        isSearch={true}
        selectOnExactMatch={false}
    />
    <Content class="p-0">
        <div class="row g-0" bind:clientWidth={width} style={background}>
            {#each searchResult as val, i}
                <div class="d-flex mb-2 justify-center">
                    <AppObject row={val.row} choice={val.choice as Choice} index={i} windowWidth={width} isSearch={true} />
                </div>
            {/each}
        </div>
    </Content>
    <Actions>
        <Button action="close">
            <Label class="dialog-actions--btn">Cancel</Label>
        </Button>
    </Actions>
</Dialog>
<script lang="ts">
    import Autocomplete from '$lib/custom/autocomplete/Autocomplete.svelte';
    import Button, { Label } from '@smui/button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import { choiceMap, getSearchables, hexToRgba } from '$lib/store/store.svelte';
    import AppObject from './AppObject.svelte';
    import { app } from '$lib/store/store.svelte';
    import type { Choice } from '$lib/store/types';

    let { open, onclose }: { open: boolean; onclose: () => void } = $props();
    let searchVal = $state('');
    let sField = $state<any>();
    let width = $state(0);
    let searchResult = $derived.by(() => {
        const result = [];
        if (sField && sField.sResult) {
            for (let i = 0; i < sField.sResult.length; i++) {
                const cMap = choiceMap.get(sField.sResult[i]);

                if (typeof cMap !== 'undefined') {
                    const choice = cMap.choice;

                    if (typeof choice.parentId !== 'undefined') {
                        const pMap = choiceMap.get(choice.parentId);

                        if (typeof pMap !== 'undefined') {
                            result.push(pMap);
                        }
                    } else {
                        result.push(cMap);
                    }
                }
            }
        } else {
            const cMap = choiceMap.get(searchVal);

            if (typeof cMap !== 'undefined') {
                const choice = cMap.choice;

                if (typeof choice.parentId !== 'undefined') {
                    const pMap = choiceMap.get(choice.parentId);

                    if (typeof pMap !== 'undefined') {
                        result.push(pMap);
                    }
                } else {
                    result.push(cMap);
                }
            }
        }

        return result;
    });
    let background = $derived.by(() => {
        let styles: string[] = [];

        styles.push('min-height: 451px;')
        if (app.styling.backgroundImage) {
            styles.push(`background-image: url('${app.styling.backgroundImage}');`);
        }
        styles.push(`background-color: ${hexToRgba(app.styling.backgroundColor)};`);
        if (app.styling.isBackgroundRepeat) {
            styles.push(`background-repeat: repeat;`);
        } else if (app.styling.isBackgroundFitIn) {
            styles.push(`background-size: 100% 100%;`);
        } else {
            styles.push(`background-size: cover;`);
        }

        if(app.useVW) {
            styles.push(`font-size: 0.835vw;`);
        }
        
        return styles.join(' '); 
    });

    function getChoiceLabel(str: string) {
        const cMap = choiceMap.get(str);
        if (typeof cMap !== 'undefined') {
            const choice = cMap.choice;
            const tempDiv = document.createElement('div');
            
            tempDiv.innerHTML = choice.title;
            
            return tempDiv.textContent;
        }
        return '';
    }

</script>