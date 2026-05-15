{#if !data.hideCounterUntilSelect || data.multipleUseVariable !== 0}
    <div class="d-row justify-space-around w-100 multi-counter">
        {#if !data.hideCounter}
            <IconButton class="counter-icons" disabled={!isEnabled} onclickcapture={clickCounterMinus}>
                <i class="mdi mdi-minus" style={multiChoiceButton}></i>
            </IconButton>
        {/if}
        <div translate="no" style={multiChoiceText} onclickcapture={clickNumber}>
            {multipleNum}
        </div>
        {#if !data.hideCounter}
            <IconButton class="counter-icons" disabled={!isEnabled} onclickcapture={clickCounterPlus}>
                <i class="mdi mdi-plus" style={multiChoiceButton}></i>
            </IconButton>
        {/if}
    </div>
    {#if data.useSlider}
        <div class="px-5 w-100 multi-slider">
            <Slider bind:value={sliderNum} min={data.numMultipleTimesMinus} max={data.numMultipleTimesPluss} step={1} class="mx-2" onpointerup={handleSliderUp} disabled={!isEnabled} discrete />
        </div>
    {/if}
{/if}

<script lang="ts">
    import IconButton from '@smui/icon-button';
    import type { Row, Choice, SelectableAddon } from '$lib/store/types';
    import { pointTypeMap, dlgVariables, getStyling, hexToRgba } from '$lib/store/store.svelte';
    import Slider from '@smui/slider';

    const { isEnabled, row, choice, addon, selectedOneMore, selectedOneLess }: { isEnabled:boolean, row: Row, choice: Choice, addon?: SelectableAddon, selectedOneMore: () => void, selectedOneLess: () => void } = $props();

    let sliderNum = $state(0);
    let data = $derived(addon ? addon : choice);
    let multipleNum = $derived.by(() => {
        if (data.isMultipleUseVariable) {
            return data.multipleUseVariable;
        } else {
            if (typeof data.multipleScoreId !== 'undefined') {
                let point = pointTypeMap.get(data.multipleScoreId);
                if (typeof point !== 'undefined') {
                    return point.startingSum;
                }
            }
            return 0;
        }
    });
    let textStyle = $derived(getStyling('privateTextIsOn', row, choice));
    let filterStyle = $derived(getStyling('privateFilterIsOn', row, choice));
    let multiChoiceStyle = $derived(getStyling('privateMultiChoiceIsOn', row, choice));
    let multiChoiceText = $derived.by(() => {
        const style: string[] = [];
        let color = hexToRgba(textStyle.scoreTextColor);

        style.push(`font-family: '${multiChoiceStyle.multiChoiceTextFont}'; font-size: ${multiChoiceStyle.multiChoiceTextSize}%; align-content: center;`);

        if (!isEnabled) {
            if (filterStyle.reqScoreTextColorIsOn)  {
                color = hexToRgba(filterStyle.reqFilterSTextColor);
            }
        } else if (data.isActive) {
            if (filterStyle.selScoreTextColorIsOn) {
                color = hexToRgba(filterStyle.selFilterSTextColor);
            }
        }

        style.push(`color: ${color}`);

        return style.join(' ');
    });
    let multiChoiceButton = $derived.by(() => {
        let color = hexToRgba(textStyle.scoreTextColor);

        if (!isEnabled) {
            if (filterStyle.reqScoreTextColorIsOn)  {
                color = hexToRgba(filterStyle.reqFilterSTextColor);
            }
        } else if (data.isActive) {
            if (filterStyle.selScoreTextColorIsOn) {
                color = hexToRgba(filterStyle.selFilterSTextColor);
            }
        }

        return `font-size: ${multiChoiceStyle.multiChoiceCounterSize}%; color: ${color};`;
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