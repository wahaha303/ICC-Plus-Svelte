{#if isEditModeOn}
    <div bind:clientWidth={width} class="pb-1">
        <div class:disabled={choice.isActive} class="d-row justify-space-between overflow-auto title--text">
            <Wrapper text="Move Up">
                <IconButton onclickcapture={moveScoreUp}><i class="mdi mdi-chevron-up"></i></IconButton>
            </Wrapper>
            <div class="d-flex">
                <Wrapper text="Create New Requirement">
                    <IconButton onclickcapture={() => {dlgVariables.data = score; dlgVariables.currentDialog = 'appRequirement'; dlgVariables.isWord = false;}} ><i class="mdi mdi-key-plus"></i></IconButton>
                </Wrapper>
                <Wrapper text="Copy Score">
                    <IconButton onclickcapture={copyScore}><i class="mdi mdi-clipboard-outline"></i></IconButton>
                </Wrapper>
            </div>
            <Wrapper text="Move Down">
                <IconButton onclickcapture={moveScoreDown}><i class="mdi mdi-chevron-down"></i></IconButton>
            </Wrapper>
        </div>
        <div class:disabled={choice.isActive} class="row gx-3">
            {#if choice.isSelectableMultiple && choice.isMultipleUseVariable}
                <FormField class="col-12">
                    <Checkbox bind:checked={() => score.multiplyByTimes ?? false, (e) => score.multiplyByTimes = e} onchange={() => {
                        if (!score.multiplyByTimes) {
                            delete score.multiplyByTimes;
                            delete score.displayMulScore;
                        }
                    }} />
                    {#snippet label()}
                        Muliply by number of selections
                    {/snippet}
                </FormField>
                {#if score.multiplyByTimes}
                    <FormField class="col-12">
                        <Checkbox bind:checked={() => score.displayMulScore ?? false, (e) => score.displayMulScore = e} onchange={() => {
                            if (!score.displayMulScore) {
                                delete score.displayMulScore;
                            }
                        }} />
                        {#snippet label()}
                            Display multiplied score
                        {/snippet}
                    </FormField>
                {/if}
            {/if}
            <FormField class={col6}>
                <Checkbox bind:checked={() => score.isNotRecalculatable ?? false, (e) => score.isNotRecalculatable = e} onchange={() => {
                    if (!score.isNotRecalculatable) {
                        delete score.isNotDiscountable;
                    }
                }} />
                {#snippet label()}
                    No Recalculation
                {/snippet}
            </FormField>
            <FormField class={col6}>
                <Checkbox bind:checked={() => score.isNotDiscountable ?? false, (e) => score.isNotDiscountable = e} onchange={() => {
                    if (!score.isNotDiscountable) {
                        delete score.isNotDiscountable;
                    }
                }} />
                {#snippet label()}
                    No Discount
                {/snippet}
            </FormField>
            <FormField class={col6}>
                <Checkbox bind:checked={() => score.isRandom ?? false, (e) => score.isRandom = e} onchange={() => {
                    if (score.isRandom) {
                        score.minValue = 0;
                        score.maxValue = 0;
                        if (!score.setValue) score.setValue = false;
                        if (score.useExpression) {
                            score.expMinValue = '';
                            score.expMaxValue = '';
                        }
                    } else {
                        delete score.isRandom;
                        delete score.minValue;
                        delete score.maxValue;
                        if (score.useExpression) {
                            delete score.expMinValue;
                            delete score.expMaxValue;
                        } else {
                            delete score.setValue;
                        }
                    }
                }} />
                {#snippet label()}
                    Enable Random
                {/snippet}
            </FormField>
            <Wrapper innerClass={col6} text="Point IDs must be wrapped in curly braces. (e.g. {'{point ID}'} * 2)">
                <FormField>
                    <Checkbox bind:checked={() => score.useExpression ?? false, (e) => score.useExpression = e} onchange={() => {
                        if (score.useExpression) {
                            score.expValue = '';
                            if (!score.setValue) score.setValue = false;
                            if (score.isRandom) {
                                score.expMinValue = '';
                                score.expMaxValue = '';
                            }
                        } else {
                            delete score.useExpression;
                            delete score.expValue;
                            if (score.isRandom) {
                                delete score.expMinValue;
                                delete score.expMaxValue;
                            } else {
                                delete score.setValue;
                            }
                        }
                    }} />
                    {#snippet label()}
                        Use Expression
                    {/snippet}
                </FormField>
            </Wrapper>
        </div>
        <div class="row gx-3">
            <div class:disabled={choice.isActive} class={col6}>
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
                    {#if score.useExpression}
                        <Textfield class="mb-1" bind:value={() => score.expMinValue ?? '', (e) => score.expMinValue = e} label="Min Expression" input$placeholder="{'{point ID}'} * 2" variant="filled" />
                        <Textfield class="mb-1" bind:value={() => score.expMaxValue ?? '', (e) => score.expMaxValue = e} label="Max Expression" input$placeholder="{'{point ID}'} * 2" variant="filled" />
                    {:else}
                        <Textfield class="mb-1" bind:value={() => score.minValue ?? 0, (e) => score.minValue = e} onchange={() => {
                            if (score.minValue && !pointType?.allowFloat) {
                                score.minValue = Math.floor(score.minValue);
                            }
                        }} label="Minimum Value" type="number" variant="filled" />
                        <Textfield class="mb-1" bind:value={() => score.maxValue ?? 0, (e) => score.maxValue = e} onchange={() => {
                            if (score.maxValue && !pointType?.allowFloat) {
                                score.maxValue = Math.floor(score.maxValue);
                            }
                        }} label="Maximum Value" type="number" variant="filled" />
                    {/if}
                {:else if score.useExpression}
                    <Textfield class="mb-1" bind:value={() => score.expValue ?? '', (e) => score.expValue = e} label="Expression" input$placeholder="{'{point ID}'} * 2" variant="filled" />
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
        <div class="row gx-3">
            <FormField class={col6}>
                <Checkbox bind:checked={score.showScore} />
                {#snippet label()}
                    Show Score
                {/snippet}
            </FormField>
            {#if score.showScore}
                <FormField class={col6}>
                    <Checkbox bind:checked={() => score.hideValue ?? false, (e) => score.hideValue = e} onchange={() => {
                        if (!score.hideValue) {
                            delete score.hideValue;
                        }
                    }} />
                    {#snippet label()}
                        Hide Value
                    {/snippet}
                </FormField>
            {/if}
        </div>
        <div class:disabled={choice.isActive} class="row gy-3 p-2">
            {#each score.requireds as required, i}
                <div class="{required.requireds.length > 0 ? 'col-12' : reqCol} p-2">
                    <ObjectRequired required={required} isEditModeOn={true} data={score} index={i} isNotShown={true} />
                    <Button onclickcapture={() => score.requireds.splice(i, 1)} class="w-100" variant="raised">
                        <Label>Delete</Label>
                    </Button>
                </div>
            {/each}
        </div>
    </div>
{:else if isPointtypeActivated() && checkRequirements(score.requireds)}
    <div class="row m-0">
        <div class="col-12 p-0 m-0 d-flex align-items-center justify-{textAlign}" style={scoreText}>
            {#key scoreWholeText}
                <p class="m-0 d-flex text-prewrap align-items-center">
                    {#if scoreIcon}
                        {#if iconBeforeTextL}<img src={iconImage} class="me-1" style="width: {iconWidth}px; height: {iconHeight}px;" alt="">{/if}
                        {@html DOMPurify.sanitize(scoreBeforeText, sanitizeArg)}{#if iconBeforeTextR}<img src={iconImage} class="mx-1" style="width: {iconWidth}px; height: {iconHeight}px;" alt="">{/if}
                        {@html DOMPurify.sanitize(scoreValueText, sanitizeArg)}{#if iconAfterTextL}<img src={iconImage} class="mx-1" style="width: {iconWidth}px; height: {iconHeight}px;" alt="">{/if}
                        {@html DOMPurify.sanitize(scoreAfterText, sanitizeArg)}{#if iconAfterTextR}<img src={iconImage} class="ms-1" style="width: {iconWidth}px; height: {iconHeight}px;" alt="">{/if}
                    {:else}
                        {@html DOMPurify.sanitize(`${scoreBeforeText} ${scoreValueText} ${scoreAfterText}`, sanitizeArg)}
                    {/if}
                </p>
            {/key}
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
    import { app, checkActivated, checkRequirements, getStyling, globalReqMap, pointTypeMap, sanitizeArg, getPointTypes, snackbarVariables, dlgVariables, variableMap, hexToRgba, deleteDiscount } from '$lib/store/store.svelte';
    import type { Choice, Row, Score, Addon } from '$lib/store/types';
    import { evaluate } from '@antv/expr';
    import { DISABLED, ACTIVE } from '$lib/store/constants';

    let { isEditModeOn = false, score, row, choice, addon, num = 0 }: { isEditModeOn?: boolean; score: Score; row?: Row; choice: Choice; addon?: Addon; num?: number } = $props();
    let data = $derived(addon ? addon : choice);
    let width = $state(0);
    let col6 = $derived.by(() => {
        if (width > 300) return 'col-6';
        else return 'col-12';
    });
    let reqCol = $derived.by(() => {
        if (width > 400) return 'col-6';
        else return 'col-12';
    });
    let textStyle = $derived(getStyling('privateTextIsOn', row, choice));
    let filterStyle = $derived(getStyling('privateFilterIsOn', row, choice));
    let pointType = $derived(pointTypeMap.get(score.id));
    let isEnabled = $derived(checkRequirements(data.requireds));
    let discountTexts = $derived.by(() => {
        const result = { before: '', after: '', replace: false, show: false, hideVal: false, hideIcon: false };
        const beforeTexts: string[] = [];
        const afterTexts: string[] = [];
        if (!score.discountIsOn || !score.appliedDiscount || typeof score.discounts === 'undefined') return result;
        for (let i = 0; i < score.discounts.length; i++) {
            const dc = score.discounts[i];

            if (dc.state === ACTIVE && dc.showDiscount) {
                result.show = true;
                if (dc.beforeText !== '') {
                    if (!dc.consolidate || dc.consolidate && beforeTexts.indexOf(dc.beforeText) === DISABLED) beforeTexts.push(dc.beforeText);
                }
                if (dc.afterText !== '') {
                    if (!dc.consolidate || dc.consolidate && afterTexts.indexOf(dc.afterText) === DISABLED) afterTexts.push(dc.afterText);
                }
                if (dc.replaceText) result.replace = true;
                if (dc.hideValue) result.hideVal = true;
                if (dc.hideIcon) result.hideIcon = true;
                if (!dc.stackable) break;
            }
        }
        if (beforeTexts.length > 0) {
            result.before = beforeTexts.join(' ');
        }
        if (afterTexts.length > 0) {
            result.after = afterTexts.join(' ');
        }
        
        return result;
    });
    let scoreAfterText = $derived.by(() => {
        let text = [];
        if (score.discountIsOn && score.appliedDiscount && discountTexts.show) {
            if (!discountTexts.replace) text.push(`${score.afterText}`);
            if (discountTexts.after !== '') text.push(`${discountTexts.after}`);
        } else {
            text.push(`${score.afterText}`);
        }
        return text.join(' ');
    });
    let scoreBeforeText = $derived.by(() => {
        let text = [];
        if (score.discountIsOn && score.appliedDiscount && discountTexts.show) {
            if (!discountTexts.replace) text.push(`${score.beforeText}`);
            if (discountTexts.before !== '') text.push(`${discountTexts.before}`);
        } else {
            text.push(`${score.beforeText}`);
        }
        return text.join(' ');
    });
    let scoreValueText = $derived.by(() => {
        let value = score.value;
        if (!score.hideValue) {
            if (score.isRandom && !score.setValue) {
                return scoreRandomValue;
            }
            if (!score.setValue && score.useExpression && score.expValue) {
                const point = pointTypeMap.get(score.id);
                if (typeof point !== 'undefined') {
                    try {
                        const replaced = score.expValue.replace(/\{([^{}]+)\}/g, (_, vStr) => {
                            const vPoint = pointTypeMap.get(vStr);
                            if (typeof vPoint !== 'undefined') {
                                return `${vPoint.startingSum}`;
                            }
                            throw new Error(`Undefined variable: "${vStr}"`);
                        });
                        value = evaluate(replaced);
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
            if (discountTexts.show && score.appliedDiscount) {
                if (discountTexts.replace && discountTexts.hideVal) return '';
                if (typeof score.discountScore !== 'undefined') value = score.discountScore;
            }
            value = Math.abs(value);
            if (!pointType?.allowFloat) {
                value = Math.floor(value);
            } else {
                value = value % 1 === 0 ? value : parseFloat(value.toFixed(typeof pointType.decimalPlaces !== 'undefined' ? pointType.decimalPlaces : 2));
            }
            if (data.isSelectableMultiple && data.isMultipleUseVariable && score.multiplyByTimes && score.displayMulScore) {
                value = value * (data.multipleUseVariable + 1);
            }
            if (pointType?.plussOrMinusAdded) {
                let prefix = pointType.plussOrMinusInverted ? (checkNegative ? '-' : '+') : (checkNegative ? '+' : '-');
                return `${prefix}${value}`;
            }
            return `${value}`;
        }
        return '';
    });
    let scoreRandomValue = $derived.by(() => {
        let maxVal = 0;
        let minVal = 0;
        let isMaxNegative = false;
        let isMinNegative = false;
        if (score.useExpression) {
            if (score.expMaxValue) {
                try {
                    const replaced = score.expMaxValue.replace(/\{([^{}]+)\}/g, (_, vStr) => {
                        const vPoint = pointTypeMap.get(vStr);
                        if (typeof vPoint !== 'undefined') {
                            return `${vPoint.startingSum}`;
                        }
                        throw new Error(`Undefined variable: "${vStr}"`);
                    });
                    maxVal = evaluate(replaced);
                    isMaxNegative = maxVal < 0;
                } catch (e) {
                    console.error(e);
                }
            }
            if (score.expMinValue) {
                try {
                    const replaced = score.expMinValue.replace(/\{([^{}]+)\}/g, (_, vStr) => {
                        const vPoint = pointTypeMap.get(vStr);
                        if (typeof vPoint !== 'undefined') {
                            return `${vPoint.startingSum}`;
                        }
                        throw new Error(`Undefined variable: "${vStr}"`);
                    });
                    minVal = evaluate(replaced);
                    isMinNegative = minVal < 0;
                } catch (e) {
                    console.error(e);
                }
            }
        } else if (typeof score.maxValue !== 'undefined' && typeof score.minValue !== 'undefined') {
            isMaxNegative = score.maxValue < 0;
            isMinNegative = score.minValue < 0;
            maxVal = Math.abs(score.maxValue);
            minVal = Math.abs(score.minValue);
        }
        if (!pointType?.allowFloat) {
            maxVal = Math.floor(maxVal);
            minVal = Math.floor(minVal);
        } else {
            maxVal = maxVal % 1 === 0 ? maxVal : parseFloat(maxVal.toFixed(typeof pointType.decimalPlaces !== 'undefined' ? pointType.decimalPlaces : 2));
            minVal = minVal % 1 === 0 ? minVal : parseFloat(minVal.toFixed(typeof pointType.decimalPlaces !== 'undefined' ? pointType.decimalPlaces : 2));
        }
        if (pointType?.plussOrMinusAdded) {
            let maxPrefix = pointType.plussOrMinusInverted ? (isMaxNegative ? '-' : '+') : (isMaxNegative ? '+' : '-');
            let minPrefix = pointType.plussOrMinusInverted ? (isMinNegative ? '-' : '+') : (isMinNegative ? '+' : '-');
            return isMaxNegative ? `${maxPrefix}${maxVal} ~ ${minPrefix}${minVal}` : `${minPrefix}${minVal} ~ ${maxPrefix}${maxVal}`;
        }
        return isMaxNegative ? `${maxVal} ~ ${minVal}` : `${minVal} ~ ${maxVal}`;
    });
    let checkNegative = $derived.by(() => {
        if (score.discountShow) {
            return (typeof score.discountScore !== 'undefined' && score.appliedDiscount ? score.discountScore : score.value) < 0;
        }
        return score.value < 0;
    });
    let scoreText = $derived.by(() => {
        const style: string[] = [];
        let color = hexToRgba(textStyle.scoreTextColor);

        style.push(`font-family: '${textStyle.scoreText}'; font-size: ${textStyle.scoreTextSize}%;`);
        
        if (pointType && pointType.pointColorsIsOn) {
            if (checkNegative) {
                color = hexToRgba(pointType.positiveColor);
            } else {
                color = hexToRgba(pointType.negativeColor);
            }
        }
        if (!isEnabled) {
            if (filterStyle.reqScoreTextColorIsOn)  {
                color = hexToRgba(filterStyle.reqFilterSTextColor);
            }
        } else if (data.isActive) {
            if (filterStyle.selScoreTextColorIsOn) {
                color = hexToRgba(filterStyle.selFilterSTextColor);
            }
        }
        style.push(`color: ${color};`);

        return style.join(' ');
    });
    let scoreIcon = $derived.by(() => {
        if (!pointType || !pointType.iconIsOn) return false;
        if (score.appliedDiscount && discountTexts.show) {
            if (discountTexts.replace && discountTexts.hideIcon) return false;
        }
        return true;
    });
    let isNegIcon = $derived(pointType?.negativeIconIsOn && !checkNegative);
    let imageSidePlacement = $derived.by(() => {
        if (!pointType) return false;
        if (isNegIcon) {
            return pointType.useSeperatePosition ? !!pointType.negativeImageSidePlacementInChoice : !!pointType.negativeImageSidePlacement;
        }
        return pointType.useSeperatePosition ? !!pointType.imageSidePlacementInChoice : !!pointType.imageSidePlacement;
    });
    let imageOnSide = $derived.by(() => {
        if (!pointType) return false;
        if (isNegIcon) {
            return pointType.useSeperatePosition ? !!pointType.negativeImageOnSideInChoice : !!pointType.negativeImageOnSide;
        }
        return pointType.useSeperatePosition ? !!pointType.imageOnSideInChoice : !!pointType.imageOnSide;
    });
    let textAlign = $derived.by(() => {
        const align = textStyle.scoreTextAlign;

        if (align === 'left') return 'start';
        if (align === 'right') return 'end';
        if (align === 'justify') return 'space-between';
        return 'center';
    });
    let iconImage = $derived((isNegIcon ? pointType?.negativeImage : pointType?.image) || '');
    let iconWidth = $derived((isNegIcon ? pointType?.negativeIconWidth : pointType?.iconWidth) || 0);
    let iconHeight = $derived((isNegIcon ? pointType?.negativeIconHeight : pointType?.iconHeight) || 0);
    let iconBeforeTextL = $derived(!imageSidePlacement && !imageOnSide);
    let iconBeforeTextR = $derived(!imageSidePlacement && imageOnSide);
    let iconAfterTextL = $derived(imageSidePlacement && !imageOnSide);
    let iconAfterTextR = $derived(imageSidePlacement && imageOnSide);
    let scoreWholeText = $derived(`${scoreBeforeText} ${scoreValueText} ${scoreAfterText}`);

    function moveScoreDown() {
        if (data.scores && num < data.scores!.length - 1) {
            data.scores.splice(num, 2, data.scores[num + 1], data.scores[num]);
        }
    }

    function moveScoreUp() {
        if (data.scores && num > 0) {
            data.scores.splice(num - 1, 2, data.scores[num], data.scores[num - 1]);
        }
    }

    function copyScore() {
        if (typeof app.tmpScore === 'undefined') app.tmpScore = [];
        const tmpScore = JSON.parse(JSON.stringify(score));

        deleteDiscount(tmpScore);
        app.tmpScore.length = 0;
        app.tmpScore.push(tmpScore);
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