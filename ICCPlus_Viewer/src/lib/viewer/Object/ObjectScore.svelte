{#if isPointtypeActivated() && checkRequirements(score.requireds)}
    <div class="row m-0">
        <div class="col-12 p-0 m-0 d-flex align-items-center justify-center" style={scoreText}>
            <p class="m-0 d-flex align-items-center">
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
    import DOMPurify from 'dompurify';
    import { checkActivated, checkRequirements, choiceMap, getStyling, globalReqMap, hexToRgba, pointTypeMap, sanitizeArg, variableMap } from '$lib/store/store.svelte';
    import type { Choice, Row, Score } from '$lib/store/types';

    let { score, row, choice }: { isEditModeOn?: boolean; score: Score; row: Row; choice: Choice } = $props();
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