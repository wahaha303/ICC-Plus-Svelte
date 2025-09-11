{#if !choice.hideCounterUntilSelect || choice.multipleUseVariable !== 0}
    <div class="d-row justify-space-around w-100">
        {#if !choice.hideCounter}
            <IconButton class="counter-icons" disabled={!isEnabled} onclickcapture={clickCounterMinus}>
                <i class="mdi mdi-minus" style={multiChoiceButton}></i>
            </IconButton>
        {/if}
        <div translate="no" style={multiChoiceText} onclickcapture={clickNumber}>
            {multipleNum}
        </div>
        {#if !choice.hideCounter}
            <IconButton class="counter-icons" disabled={!isEnabled} onclickcapture={clickCounterPlus}>
                <i class="mdi mdi-plus" style={multiChoiceButton}></i>
            </IconButton>
        {/if}
    </div>
    {#if choice.useSlider}
        <div class="px-5 w-100">
            <Slider bind:value={sliderNum} min={choice.numMultipleTimesMinus} max={choice.numMultipleTimesPluss} step={1} class="mx-2" onpointerup={handleSliderUp} disabled={!isEnabled} discrete />
        </div>
    {/if}
{/if}

<script lang="ts">
    import IconButton from '@smui/icon-button';
    import type { Choice } from '$lib/store/types';
    import { pointTypeMap, dlgVariables } from '$lib/store/store.svelte';
    import Slider from '@smui/slider';

    const { isEnabled, multiChoiceButton, multiChoiceText, choice, selectedOneMore, selectedOneLess }: { isEnabled:boolean, multiChoiceButton:string, multiChoiceText:string, choice: Choice, selectedOneMore: () => void, selectedOneLess: () => void } = $props();

    let sliderNum = $state(0);
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

    $effect(() => {
        if (choice.useSlider) {
            sliderNum = multipleNum;
        }
    })

    function clickCounterPlus(e: Event) {
        selectedOneMore();
    }

    function clickCounterMinus(e: Event) {
        selectedOneLess();
    }

    function handleSliderUp() {
        const loop = sliderNum - multipleNum;
        for (let i = 0; i < Math.abs(loop); i++) {
            if (loop > 0) {
                selectedOneMore();
            } else {
                selectedOneLess();
            }
        }
        if (document.activeElement) {
            (document.activeElement as HTMLElement).blur();
        }
    }

    function clickNumber(e: Event) {
        if (isEnabled) {
            dlgVariables.currentDialog = 'selectDialog';
            dlgVariables.choice = choice;
            dlgVariables.func = handleManually;
        }
    }

    function handleManually(num: number) {
        const loop = num - choice.multipleUseVariable;
        for (let i = 0; i < Math.abs(loop); i++) {
            if (loop > 0) {
                selectedOneMore();
            } else {
                selectedOneLess();
            }
        }
    }

</script>