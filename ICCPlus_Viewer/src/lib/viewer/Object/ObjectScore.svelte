{#if isPointtypeActivated() && checkRequirements(score.requireds)}
    <div class="row m-0">
        <div class="col-12 p-0 m-0 d-flex align-items-center justify-center" style={scoreText}>
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
    import DOMPurify from 'dompurify';
    import { checkActivated, checkRequirements, getStyling, globalReqMap, pointTypeMap, sanitizeArg, variableMap, hexToRgba, choiceMap } from '$lib/store/store.svelte';
    import type { Choice, Row, Score } from '$lib/store/types';

    let { score, row, choice }: { isEditModeOn?: boolean; score: Score; row: Row; choice: Choice } = $props();
    let textStyle = $derived(getStyling('privateTextIsOn', row, choice));
    let filterStyle = $derived(getStyling('privateFilterIsOn', row, choice));
    let pointType = $derived(pointTypeMap.get(score.id));
    let isEnabled = $derived(checkRequirements(choice.requireds));
    let discountFlags = $derived.by(() => {
        let result = { isWithinCount: false, isSimple: false };
        if (!score.discountIsOn || !score.discountedFrom || score.discountedFrom.length === 0) return result;
        for (let i = 0; i < score.discountedFrom.length; i++) {
            const cMap = choiceMap.get(score.discountedFrom[i]);

            if (typeof cMap !== 'undefined') {
                const dChoice = cMap.choice;

                if (dChoice.useDiscountCount && typeof dChoice.discountCount !== 'undefined' && dChoice.appliedDisChoices) {
                    const count = dChoice.isSelectableMultiple && dChoice.isMultipleUseVariable ? dChoice.discountCount * dChoice.multipleUseVariable : dChoice.discountCount;
                    if (count > dChoice.appliedDisChoices.length) {
                        result.isWithinCount = true;
                        break;
                    }
                } else {
                    result.isSimple = true;
                    break;
                }
            }
        }
        return result;
    });
    let scoreAfterText = $derived.by(() => {
        let text = [];
        if (score.discountIsOn && score.discountShow && score.discountAfterText) {
            if (score.appliedDiscount) {
                if (!score.replaceText) text.push(`${score.afterText}`);
                text.push(`${score.discountAfterText}`);
            } else {
                if (discountFlags.isWithinCount) {
                    if (!score.replaceText) text.push(`${score.afterText}`);
                    text.push(`${score.discountAfterText}`);
                } else if (discountFlags.isSimple) {
                    if (!score.replaceText) text.push(`${score.afterText}`);
                    text.push(`${score.discountAfterText}`);
                } else {
                    if (typeof score.tmpDiscount !== 'undefined') {
                        let value = score.value;
                        let tmpText = '';
                        let replaceText = false;
                        for (let j = 0; j < score.tmpDiscount.length; j++) {
                            if (score.tmpDiscount[j].showDiscount && value > score.tmpDiscount[j].discountedValue) {
                                value = score.tmpDiscount[j].discountedValue;
                                tmpText = score.tmpDiscount[j].beforeText || '';
                                replaceText = score.tmpDiscount[j].replaceText || false;
                            }
                        }
                        if (!replaceText) text.push(`${score.afterText}`);
                        text.push(`${tmpText}`);
                    } else {
                        text.push(`${score.afterText}`);
                    }
                }
            }
        } else {
            text.push(`${score.afterText}`);
        }
        return text.join(' ');
    });
    let scoreBeforeText = $derived.by(() => {
        let text = [];
        if (score.discountIsOn && score.discountShow && score.discountBeforeText) {
            if (score.appliedDiscount) {
                if (!score.replaceText) text.push(`${score.beforeText}`);
                text.push(`${score.discountBeforeText}`);
            } else {
                if (discountFlags.isWithinCount) {
                    if (!score.replaceText) text.push(`${score.beforeText}`);
                    text.push(`${score.discountBeforeText}`);
                } else if (discountFlags.isSimple) {
                    if (!score.replaceText) text.push(`${score.beforeText}`);
                    text.push(`${score.discountBeforeText}`);
                } else {
                    if (typeof score.tmpDiscount !== 'undefined') {
                        let value = score.value;
                        let tmpText = '';
                        let replaceText = false;
                        for (let j = 0; j < score.tmpDiscount.length; j++) {
                            if (score.tmpDiscount[j].showDiscount && value > score.tmpDiscount[j].discountedValue) {
                                value = score.tmpDiscount[j].discountedValue;
                                tmpText = score.tmpDiscount[j].beforeText || '';
                                replaceText = score.tmpDiscount[j].replaceText || false;
                            }
                        }
                        if (!replaceText) text.push(`${score.beforeText}`);
                        text.push(`${tmpText}`);
                    } else {
                        text.push(`${score.beforeText}`);
                    }
                }
            }
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
            if (score.discountShow) {
                if (score.appliedDiscount) {
                    if (score.replaceText && score.hideDisValue) {
                        return '';
                    }
                    if (typeof score.discountScore !== 'undefined') value = score.discountScore;
                } else {
                    if (discountFlags.isWithinCount || discountFlags.isSimple) {
                        if (score.replaceText && score.hideDisValue) return '';
                        if (score.useExpression && score.expValue) {
                            if (score.discountedFrom && score.discountedFrom.length > 0) {
                                for (let j = 0; j < score.discountedFrom.length; j++) {
                                    const cMap = choiceMap.get(score.discountedFrom[j]);

                                    if (typeof cMap !== 'undefined') {
                                        const dChoice = cMap.choice;

                                        value = calcStackDiscount(value, dChoice.discountOperator!, dChoice.discountValue!);

                                        if (dChoice.discountLowLimitIsOn && typeof dChoice.discountLowLimit !== 'undefined') {
                                            value = Math.max(value, dChoice.discountLowLimit);
                                        }
                                    }
                                }
                            }
                        } else if (typeof score.discountScore !== 'undefined') value = score.discountScore;
                    } else {
                        if (typeof score.tmpDiscount !== 'undefined') {
                            let hideValue = false;
                            for (let j = 0; j < score.tmpDiscount.length; j++) {
                                if (score.tmpDiscount[j].showDiscount && value > score.tmpDiscount[j].discountedValue) {
                                    value = score.tmpDiscount[j].discountedValue;
                                    hideValue = score.tmpDiscount[j].hideValue || false;
                                }
                            }
                            if (hideValue) return '';
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
            return (typeof score.discountScore !== 'undefined' && (score.appliedDiscount || discountFlags.isWithinCount || discountFlags.isSimple) ? score.discountScore : score.value) < 0;
        }
        return score.value < 0;
    });
    let scoreText = $derived.by(() => {
        let style: string[] = [];

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
    let scoreIcon = $derived.by(() => {
        if (!pointType || !pointType.iconIsOn) return false;
        if (score.discountIsOn && score.discountShow) {
            if (score.appliedDiscount) {
                if (score.replaceText && score.hideDisIcon) return false;
            } else {
                if (discountFlags.isWithinCount) {
                    if (score.replaceText && score.hideDisIcon) return false;
                } else if (discountFlags.isSimple) {
                    if (score.hideDisIcon) return false;
                } else {
                    if (typeof score.tmpDiscount !== 'undefined') {
                        let value = score.value;
                        let hideIcon = false;
                        for (let j = 0; j < score.tmpDiscount.length; j++) {
                            if (score.tmpDiscount[j].showDiscount && value > score.tmpDiscount[j].discountedValue) {
                                value = score.tmpDiscount[j].discountedValue;
                                hideIcon = score.tmpDiscount[j].hideIcon || false;
                            }
                        }
                        if (hideIcon) return false;
                    }
                }
            }
        }
        return true;
    });
    let isNegIcon = $derived(pointType?.negativeIconIsOn && checkNegative);
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
    let iconImage = $derived((isNegIcon ? pointType?.negativeImage : pointType?.image) || '');
    let iconWidth = $derived((isNegIcon ? pointType?.negativeIconWidth : pointType?.iconWidth) || 0);
    let iconHeight = $derived((isNegIcon ? pointType?.negativeIconHeight : pointType?.iconHeight) || 0);
    let iconBeforeTextL = $derived(!imageSidePlacement && !imageOnSide);
    let iconBeforeTextR = $derived(!imageSidePlacement && imageOnSide);
    let iconAfterTextL = $derived(imageSidePlacement && !imageOnSide);
    let iconAfterTextR = $derived(imageSidePlacement && imageOnSide);
    let scoreWholeText = $derived(`${scoreBeforeText} ${scoreValueText} ${scoreAfterText}`);

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