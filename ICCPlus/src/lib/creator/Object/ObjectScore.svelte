{#if isEditModeOn}
    <div bind:clientWidth={width} class="pb-1">
        <div class="d-row justify-space-between overflow-auto">
            <Wrapper text="Move Up">
                <IconButton onclickcapture={moveScoreUp}><i class="mdi mdi-chevron-up"></i></IconButton>
            </Wrapper>
            <div class="d-flex">
                <Wrapper text="Create New Reqruirement">
                    <IconButton onclickcapture={() => {dlgVariables.data = score; dlgVariables.currentDialog = 'appRequirement'}} ><i class="mdi mdi-key-plus"></i></IconButton>
                </Wrapper>
                <Wrapper text="Copy Score">
                    <IconButton onclickcapture={copyScore}><i class="mdi mdi-clipboard-outline"></i></IconButton>
                </Wrapper>
            </div>
            <Wrapper text="Move Down">
                <IconButton onclickcapture={moveScoreDown}><i class="mdi mdi-chevron-down"></i></IconButton>
            </Wrapper>
        </div>
        <div class="row gx-3">
            <FormField class="col-12">
                <Checkbox bind:checked={() => score.isNotRecalculatable?? false, (e) => score.isNotRecalculatable = e} onchange={() => {
                    if (!score.isNotRecalculatable) {
                        delete score.isNotDiscountable;
                    }
                }} />
                {#snippet label()}
                    Prevent Recalculation
                {/snippet}    
            </FormField>
            <FormField class={col6}>
                <Checkbox bind:checked={() => score.isNotDiscountable?? false, (e) => score.isNotDiscountable = e} onchange={() => {
                    if (!score.isNotDiscountable) {
                        delete score.isNotDiscountable;
                    }
                }} />
                {#snippet label()}
                    Prevent Discount
                {/snippet}
            </FormField>
            <FormField class={col6}>
                <Checkbox bind:checked={() => score.isRandom?? false, (e) => score.isRandom = e} onchange={() => {
                    if (score.isRandom) {
                        score.minValue = 0;
                        score.maxValue = 0;
                        score.setValue = false;
                    } else {
                        delete score.isRandom;
                        delete score.minValue;
                        delete score.maxValue;
                        delete score.setValue;
                    }
                }} />
                {#snippet label()}
                    Enable Random
                {/snippet}
            </FormField>
            {#if choice?.isSelectableMultiple}
                <FormField class="col-12">
                    <Checkbox bind:checked={() => score.multiplyByTimes?? false, (e) => score.multiplyByTimes = e} onchange={() => {
                        if (!score.multiplyByTimes) {
                            delete score.multiplyByTimes;
                        }
                    }} />
                    {#snippet label()}
                        Muliply by number of selections
                    {/snippet}
                </FormField>
            {/if}
        </div>
        <div class="row gx-3">
            <div class={col6}>
                <Autocomplete
                    options={getPointTypes()}
                    getOptionLabel={getPointTypeLabel}
                    bind:value={score.id}
                    label="Point Type"
                    toggle={true}
                    showMenuWithNoInput={true}
                    textfield$variant="filled"
                    class="col-12 my-1"
                />
                {#if score.isRandom}
                    <Textfield class="mb-1" bind:value={() => score.minValue?? 0, (e) => score.minValue = e} onchange={() => {
                        if (score.minValue && !pointType?.allowFloat) {
                            score.minValue = Math.floor(score.minValue);
                        }
                    }} label="Minimum Value" type="number" variant="filled" />
                    <Textfield class="mb-1" bind:value={() => score.maxValue?? 0, (e) => score.maxValue = e} onchange={() => {
                        if (score.maxValue && !pointType?.allowFloat) {
                            score.maxValue = Math.floor(score.maxValue);
                        }
                    }} label="Maximum Value" type="number" variant="filled" />
                {:else}
                    <Textfield class="mb-1" bind:value={score.value} onchange={() => {
                        if (!pointType?.allowFloat) {
                            score.value = Math.floor(score.value);
                        }
                    }} label="Value" type="number" variant="filled" />
                {/if}
            </div>
            <div class={col6}>
                <Textfield class="my-1" bind:value={score.beforeText} label="Text Before" variant="filled" />
                <Textfield class="mb-1" bind:value={score.afterText} label="Text After" variant="filled" />
            </div>
        </div>
        <div class="row gy-3 p-2">
            {#each score.requireds as required, i}
                <div class="{required.requireds.length > 0 ? 'col-12' : reqCol} p-2">
                    <ObjectRequired required={required} isEditModeOn={true} data={score} index={i} isNotShown={true} />
                    <Button onclickcapture={() => score.requireds.splice(i, 1)} class="w-100" variant="raised">
                        <Label>Delete</Label>
                    </Button>
                </div>
            {/each}
        </div>
        <div class="row gx-3">
            <FormField class={col6}>
                <Checkbox bind:checked={score.showScore} />
                {#snippet label()}
                    Show Score
                {/snippet}
            </FormField>
            <FormField class={col6}>
                <Checkbox bind:checked={() => score.hideValue?? false, (e) => score.hideValue = e} onchange={() => {
                    if (!score.hideValue) {
                        delete score.hideValue;
                    }
                }} />
                {#snippet label()}
                    Hide Value
                {/snippet}
            </FormField>
        </div>
    </div>
{:else if isPointtypeActivated() && checkRequirements(score.requireds)}
    <div class="row m-0">
        <div class="col-12 p-0 m-0 d-flex align-items-center justify-center" style={scoreText}>
            <p class="m-0 d-flex align-items-center {score.id !== ''}">
                {#if pointType?.iconIsOn}
                    {#if iconBeforeTextL}
                        <img src={iconImage} class="me-1" style="width: {iconWidth}px; height: {iconHeight}px;" alt="">
                    {/if}
                    {@html DOMPurify.sanitize(scoreBeforeText, sanitizeArg)}
                    {#if iconBeforeTextR}
                        <img src={iconImage} class="mx-1" style="width: {iconWidth}px; height: {iconHeight}px;" alt="">
                    {/if}
                    {@html DOMPurify.sanitize(scoreValueText, sanitizeArg)}
                    {#if iconAfterTextL}
                        <img src={iconImage} class="mx-1" style="width: {iconWidth}px; height: {iconHeight}px;" alt="">
                    {/if}
                    {@html DOMPurify.sanitize(scoreAfterText, sanitizeArg)}
                    {#if iconAfterTextR}
                        <img src={iconImage} class="ms-1" style="width: {iconWidth}px; height: {iconHeight}px;" alt="">
                    {/if}
                {:else}
                    {@html DOMPurify.sanitize(`${scoreBeforeText} ${scoreValueText} ${scoreAfterText}`, sanitizeArg)}
                {/if}
            </p>
        </div>
    </div>
{/if}

<script lang="ts">
    import Autocomplete from '$lib/custom/autocomplete/Autocomplete.svelte';
    import Button, { Label } from '@smui/button';
    import Checkbox from '@smui/checkbox';
    import DOMPurify from 'dompurify';
    import FormField from '@smui/form-field';
    import IconButton from '@smui/icon-button';
    import ObjectRequired from './ObjectRequired.svelte';
    import Textfield from '$lib/custom/textfield';
    import { Wrapper } from '$lib/custom/tooltip';
    import { app, checkActivated, checkRequirements, getStyling, globalReqMap, pointTypeMap, sanitizeArg, getPointTypes, snackbarVariables, dlgVariables, variableMap, hexToRgba, choiceMap } from '$lib/store/store.svelte';
    import type { Choice, Row, Score } from '$lib/store/types';

    let { isEditModeOn = false, score, row, choice, num = 0 }: { isEditModeOn?: boolean; score: Score; row?: Row; choice: Choice; num?: number } = $props();
    let width = $state(0);
    let col6 = $derived.by(() => {
        if (width > 300) return 'col-6';
        else return 'col-12';
    });
    let reqCol = $derived.by(() => {
        if (width > 400) return 'col-6';
        else return 'col-12';
    })
    let textStyle = $derived(getStyling('privateTextIsOn', row, choice));
    let filterStyle = $derived(getStyling('privateFilterIsOn', row, choice));
    let pointType = $derived(pointTypeMap.get(score.id));
    let isEnabled = $derived.by(() => {
        return checkRequirements(choice.requireds);
    });
    let scoreAfterText = $derived.by(() => {
        let text = [];
        text.push(`${score.afterText}`);
        if (score.discountIsOn && score.discountShow && typeof score.discountAfterText !== 'undefined') {
            if (score.appliedDiscount) {
                text.push(`${score.discountAfterText}`);
            } else {
                if (score.discountedFrom && score.discountedFrom.length > 0) {
                    const cMap = choiceMap.get(score.discountedFrom[0]);

                    if (typeof cMap !== 'undefined') {
                        const dChoice = cMap.choice;

                        if (dChoice.useDiscountCount && typeof dChoice.discountCount !== 'undefined' && typeof dChoice.numDiscountChoices !== 'undefined') {
                            if (dChoice.discountCount > dChoice.numDiscountChoices) {
                                text.push(`${score.discountAfterText}`);
                            } else {
                                if (typeof score.tmpDiscount !== 'undefined') {
                                    let value = score.value;
                                    let tmpText = '';
                                    for (let j = 0; j < score.tmpDiscount.length; j++) {
                                        if (score.tmpDiscount[j].showDiscount && value > score.tmpDiscount[j].discountedValue) {
                                            value = score.tmpDiscount[j].discountedValue;
                                            tmpText = score.tmpDiscount[j].beforeText || '';
                                        }
                                    }
                                    text.push(`${tmpText}`);
                                }
                            }
                        } else {
                            text.push(`${score.discountAfterText}`);
                        }
                    }
                }
            }
        }

        return text.join(' ');
    });
    let scoreBeforeText = $derived.by(() => {
        let text = [];
        text.push(`${score.beforeText}`);
        if (score.discountIsOn && score.discountShow && typeof score.discountBeforeText !== 'undefined') {
            if (score.appliedDiscount) {
                text.push(`${score.discountBeforeText}`);
            } else {
                if (score.discountedFrom && score.discountedFrom.length > 0) {
                    const cMap = choiceMap.get(score.discountedFrom[0]);

                    if (typeof cMap !== 'undefined') {
                        const dChoice = cMap.choice;

                        if (dChoice.useDiscountCount && typeof dChoice.discountCount !== 'undefined' && typeof dChoice.numDiscountChoices !== 'undefined') {
                            if (dChoice.discountCount > dChoice.numDiscountChoices) {
                                text.push(`${score.discountBeforeText}`);
                            } else {
                                if (typeof score.tmpDiscount !== 'undefined') {
                                    let value = score.value;
                                    let tmpText = '';
                                    for (let j = 0; j < score.tmpDiscount.length; j++) {
                                        if (score.tmpDiscount[j].showDiscount && value > score.tmpDiscount[j].discountedValue) {
                                            value = score.tmpDiscount[j].discountedValue;
                                            tmpText = score.tmpDiscount[j].beforeText || '';
                                        }
                                    }
                                    text.push(`${tmpText}`);
                                }
                            }
                        } else {
                            text.push(`${score.discountBeforeText}`);
                        }
                    }
                }
            }
        }

        return text.join(' ');
    });
    let scoreValueText = $derived.by(() => {
        if (!score.hideValue) {
            if (score.isRandom && !score.setValue) {
                if (typeof score.maxValue !== 'undefined') {
                    if (score.maxValue < 0) {
                        return `${scoreMaxValue} ~ ${scoreMinValue}`;
                    } else {
                        return `${scoreMinValue} ~ ${scoreMaxValue}`;
                    }
                }
            }
            return `${scoreValue}`;
        }
        return '';
    });
    let scoreValue = $derived.by(() => {
        let value = score.value;
        if (score.discountIsOn && score.discountShow && typeof score.discountScore !== 'undefined') {
            if (score.appliedDiscount) {
                value = score.discountScore;
            } else if (score.discountedFrom && score.discountedFrom.length > 0) {
                const cMap = choiceMap.get(score.discountedFrom[0]);

                if (typeof cMap !== 'undefined') {
                    const dChoice = cMap.choice;

                    if (dChoice.useDiscountCount && typeof dChoice.discountCount !== 'undefined' && typeof dChoice.numDiscountChoices !== 'undefined') {
                        if (dChoice.discountCount > dChoice.numDiscountChoices) {
                            value = score.discountScore;
                        } else {
                            if (typeof score.tmpDiscount !== 'undefined') {
                                for (let j = 0; j < score.tmpDiscount.length; j++) {
                                    if (value > score.tmpDiscount[j].discountedValue) value = score.tmpDiscount[j].discountedValue;
                                }
                            }
                        }
                    } else {
                        value = score.discountScore;
                    }
                }
            }
        }
        value = Math.abs(value);
        if (!pointType?.allowFloat) {
            value = Math.floor(value);
        } else {
            value = value % 1 === 0 ? value : parseFloat(value.toFixed(typeof pointType.decimalPlaces !== 'undefined' ? pointType.decimalPlaces : 2));
        }
        if (pointType?.plussOrMinusAdded) {
            let prefix = pointType.plussOrMinusInverted ? (checkNegative ? '-' : '+') : (checkNegative ? '+' : '-');
            return `${prefix}${value}`;
        }
        return `${value}`;
    });
    let scoreMaxValue = $derived.by(() => {
        if (typeof score.maxValue !== 'undefined') {
            let isNegative = score.maxValue < 0;
            let value = Math.abs(score.maxValue);
            if (!pointType?.allowFloat) {
                value = Math.floor(value);
            } else {
                value = value % 1 === 0 ? value : parseFloat(value.toFixed(typeof pointType.decimalPlaces !== 'undefined' ? pointType.decimalPlaces : 2));
            }
            if (pointType?.plussOrMinusAdded) {
                let prefix = pointType.plussOrMinusInverted ? (isNegative ? '-' : '+') : (isNegative ? '+' : '-');
                return `${prefix}${value}`;
            }
            return `${value}`;
        }
        return '';
    });
    let scoreMinValue = $derived.by(() => {
        if (typeof score.minValue !== 'undefined') {
            let isNegative = score.minValue < 0;
            let value = Math.abs(score.minValue);
            if (!pointType?.allowFloat) {
                value = Math.floor(value);
            } else {
                value = value % 1 === 0 ? value : parseFloat(value.toFixed(typeof pointType.decimalPlaces !== 'undefined' ? pointType.decimalPlaces : 2));
            }
            if (pointType?.plussOrMinusAdded) {
                let prefix = pointType.plussOrMinusInverted ? (isNegative ? '-' : '+') : (isNegative ? '+' : '-');
                return `${prefix}${value}`;
            }
            return `${value}`;
        }
        return '';
    });
    let checkNegative = $derived.by(() => {
        if (score.discountShow) {
            return (typeof score.discountScore !== 'undefined' ? score.discountScore : score.value) < 0;
        }
        return score.value < 0;
    });
    let scoreText = $derived.by(() => {
        let style = [];

        style.push(`font-family: '${textStyle.scoreText}'; font-size: ${textStyle.scoreTextSize}%; text-align: ${textStyle.scoreTextAlign};`);
        if (pointType?.pointColorsIsOn) {
            if (checkNegative) {
                style.push(`color: ${hexToRgba(pointType.positiveColor)};`);
            } else {
                style.push(`color: ${hexToRgba(pointType.negativeColor)};`);
            }
        } else {
            style.push(`color: ${hexToRgba(textStyle.scoreTextColor)};`);
        }
        if (!isEnabled) {
            if (filterStyle.reqScoreTextColorIsOn)  {
                style.push(`color: ${hexToRgba(filterStyle.reqFilterSTextColor)}`);
            }
        } else if (choice.isActive) {
            if (filterStyle.selScoreTextColorIsOn) {
                style.push(`color: ${hexToRgba(filterStyle.selFilterSTextColor)}`);
            }
        }

        return style.join(' ');
    });
    let isNegIcon = $derived(pointType?.negativeIconIsOn && checkNegative);
    let imageSidePlacement = $derived(isNegIcon ? pointType?.negativeImageSidePlacement : pointType?.imageSidePlacement);
    let imageOnSide = $derived(isNegIcon ? pointType?.negativeImageOnSide : pointType?.imageOnSide);
    let iconImage = $derived((isNegIcon ? pointType?.negativeImage : pointType?.image) || '');
    let iconWidth = $derived((isNegIcon ? pointType?.negativeIconWidth : pointType?.iconWidth) || 0);
    let iconHeight = $derived((isNegIcon ? pointType?.negativeIconHeight : pointType?.iconHeight) || 0);
    let iconBeforeTextL = $derived(!imageSidePlacement && !imageOnSide);
    let iconBeforeTextR = $derived(!imageSidePlacement && imageOnSide);
    let iconAfterTextL = $derived(imageSidePlacement && !imageOnSide);
    let iconAfterTextR = $derived(imageSidePlacement && imageOnSide);

    function moveScoreDown() {
        if (num < choice.scores.length - 1) {
            choice.scores.splice(num, 2, choice.scores[num + 1], choice.scores[num]);
        }
    }

    function moveScoreUp() {
        if (num > 0) {
            choice.scores.splice(num - 1, 2, choice.scores[num], choice.scores[num - 1]);
        }
    }

    function copyScore() {
        if (typeof app.tmpScore === 'undefined') app.tmpScore = [];
        app.tmpScore.length = 0;
        app.tmpScore.push(JSON.parse(JSON.stringify(score)));
        snackbarVariables.labelText = 'Copied to clipboard.';
        snackbarVariables.isOpen = true;
    }

    function getPointTypeLabel(str: string) {
        let point = pointTypeMap.get(str);
        if (typeof point !== 'undefined') {
            return `${point.id} | ${point.name}`;
        }
        return '';
    }

    function isPointtypeActivated() {
        if (score.showScore) {
            if (typeof pointType !== 'undefined') {
                if (pointType.isNotShownObjects) {
                    if (typeof pointType.activatedId !== 'undefined' && pointType.activatedId !== '') {
                        let globalReq = globalReqMap.get(pointType.activatedId);
                        let variable = variableMap.get(pointType.activatedId);
                        if (typeof globalReq !== 'undefined') {
                            return checkRequirements(globalReq.requireds);
                        }
                        if (typeof variable !== 'undefined') {
                            return variable.isTrue;
                        }
                        return checkActivated(pointType.activatedId);
                    }
                    return false;
                }
            }
            return true;
        }
        return false;
    }

</script>