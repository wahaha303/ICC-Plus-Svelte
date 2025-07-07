{#if !choice.hideCounterUntilSelect || choice.multipleUseVariable !== 0}
    <div class="d-row justify-space-around w-100">
        <IconButton class="counter-icons" disabled={!isEnabled} onclick={clickCounterMinus}>
            <i class="mdi mdi-minus" style={multiChoiceButton}></i>
        </IconButton>
        <div translate="no" style={multiChoiceText}>
            {multipleNum}
        </div>
        <IconButton class="counter-icons" disabled={!isEnabled} onclick={clickCounterPlus}>
            <i class="mdi mdi-plus" style={multiChoiceButton}></i>
        </IconButton>
    </div>
{/if}

<script lang="ts">
    import IconButton from '@smui/icon-button';
    import type { Choice } from '$lib/store/types';
    import { pointTypeMap } from '$lib/store/store.svelte';

    const { isEnabled, multiChoiceButton, multiChoiceText, choice, selectedOneMore, selectedOneLess }: { isEnabled:boolean, multiChoiceButton:string, multiChoiceText:string, choice: Choice, selectedOneMore: () => void, selectedOneLess: () => void } = $props();

    let multipleNum = $derived.by(() => {
        if (choice.isMultipleUseVariable) {
            return choice.multipleUseVariable;
        } else {
            if (typeof choice.multipleScoreId !== 'undefined') {
                let point = pointTypeMap.get(choice.multipleScoreId);
                if (typeof point !== 'undefined') {
                    return point.startingSum;
                }
            }
            return 0;
        }
    });
    
    function clickCounterPlus(e: Event) {
        e.stopPropagation();
        selectedOneMore();
    }

    function clickCounterMinus(e: Event) {
        e.stopPropagation();
        selectedOneLess();
    }

</script>