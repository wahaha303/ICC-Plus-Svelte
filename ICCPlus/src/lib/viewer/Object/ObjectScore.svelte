{#if isPointtypeActivated() && checkRequirements(score.requireds)}
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
                        {@html DOMPurify.sanitize(`${scoreFullText}`, sanitizeArg)}
                    {/if}
                </p>
            {/key}
        </div>
    </div>
{/if}

<script lang="ts">
    import DOMPurify from 'dompurify';
    import { checkActivated, checkRequirements, getStyling, globalReqMap, pointTypeMap, sanitizeArg, variableMap, hexToRgba, choiceMap, calcStackDiscount } from '$lib/store/store.svelte';
    import type { Addon, Choice, Row, Score } from '$lib/store/types';
    import { evaluate } from '@antv/expr';
    import { DISABLED, ACTIVE } from '$lib/store/constants';

    let { score, row, choice, addon }: { score: Score; row?: Row; choice: Choice; addon?: Addon; } = $props();
    let data = $derived(addon ? addon : choice);
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
        if (score.hideValue || !score.id) return '';

        let value = score.value;
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
    let scoreFullText = $derived.by(() => {
        let result = '';
        if (scoreBeforeText) result += scoreBeforeText;
        if (scoreValueText) result += (result ? ' ' : '') + scoreValueText;
        if (scoreAfterText) result += (result ? ' ' : '') + scoreAfterText;

        return result;
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