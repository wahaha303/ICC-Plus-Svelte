<div class="row-{row.id}-bg text-center {!isEnabled ? 'hidden' : ''}" style={rowBody} bind:clientWidth={width}>
    {#if isEnabled}
        <div class="row gx-0 row-{row.id}" style={row.title !== '' ? rowBackground : ''}>
            {#if row.template >= 4 || row.template === 1 || windowWidth <= 1280}
                <div class="col-12 m-0 p-0">
                    {#if (row.template === 1 || windowWidth <= 1280)}
                        {#if row.isButtonRow}
                            <Button onclickcapture={buttonActivate} disabled={!row.buttonType && (typeof row.buttonId !== 'undefined' && activatedMap.has(row.buttonId)) || isButtonPressable} style={rowButton} variant="raised" >
                                <Label>{@html typeof row.buttonText !== 'undefined' ? row.buttonText : 'Click'}</Label>
                            </Button>
                        {:else if row.image}
                            {#if row.imageSourceTooltip}
                                <img use:tooltip={row.imageSourceTooltip} src={row.image} style={rowImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {:else}
                                <img src={row.image} style={rowImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {/if}
                        {/if}
                    {/if}
                    {#if row.title !== ''}
                        <h2 class="mb-0" style={rowTitle}>{@html DOMPurify.sanitize(replaceText(row.title), sanitizeArg)}</h2>
                    {/if}
                    {#if row.template === 5 && windowWidth > 1280}
                        {#if row.isButtonRow}
                            <Button onclickcapture={buttonActivate} disabled={!row.buttonType && (typeof row.buttonId !== 'undefined' && activatedMap.has(row.buttonId)) || isButtonPressable} style={rowButton} variant="raised" >
                                <Label>{@html typeof row.buttonText !== 'undefined' ? row.buttonText : 'Click'}</Label>
                            </Button>
                        {:else if row.image}
                            {#if row.imageSourceTooltip}
                                <img use:tooltip={row.imageSourceTooltip} src={row.image} style={rowImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {:else}
                                <img src={row.image} style={rowImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {/if}
                        {/if}
                    {/if}
                    {#if row.titleText !== ''}
                        <p class="mb-0" style={rowText}>
                            {@html DOMPurify.sanitize(replaceText(row.titleText), sanitizeArg)}
                        </p>
                    {/if}
                    {#if row.template === 4 && windowWidth > 1280}
                        {#if row.isButtonRow}
                            <Button onclickcapture={buttonActivate} disabled={!row.buttonType && (typeof row.buttonId !== 'undefined' && activatedMap.has(row.buttonId)) || isButtonPressable} style={rowButton} variant="raised" >
                                <Label>{@html typeof row.buttonText !== 'undefined' ? row.buttonText : 'Click'}</Label>
                            </Button>
                        {:else if row.image}
                            {#if row.imageSourceTooltip}
                                <img use:tooltip={row.imageSourceTooltip} src={row.image} style={rowImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {:else}
                                <img src={row.image} style={rowImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {/if}
                        {/if}
                    {/if}
                </div>
            {:else}
                {#if row.template === 2}
                    <div class="col p-0 text-center" style="max-width: {100 - rowImageBoxWidth}%">
                        {#if row.title !== ''}
                            <h2 class="mb-0" style={rowTitle}>{@html DOMPurify.sanitize(replaceText(row.title), sanitizeArg)}</h2>
                        {/if}
                        {#if row.titleText !== ''}
                            <p class="mb-0" style={rowText}>
                                {@html DOMPurify.sanitize(replaceText(row.titleText), sanitizeArg)}
                            </p>
                        {/if}
                    </div>
                    <div class="col p-0 text-center" style="max-width: {rowImageBoxWidth}%">
                        {#if row.isButtonRow}
                            <Button onclickcapture={buttonActivate} disabled={!row.buttonType && (typeof row.buttonId !== 'undefined' && activatedMap.has(row.buttonId)) || isButtonPressable} style={rowButton} variant="raised" >
                                <Label>{@html typeof row.buttonText !== 'undefined' ? row.buttonText : 'Click'}</Label>
                            </Button>
                        {:else if row.image}
                            {#if row.imageSourceTooltip}
                                <img use:tooltip={row.imageSourceTooltip} src={row.image} style={rowImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {:else}
                                <img src={row.image} style={rowImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {/if}
                        {/if}
                    </div>
                {:else if row.template === 3}
                    <div class="col p-0 text-center" style="max-width: {rowImageBoxWidth}%">
                        {#if row.isButtonRow}
                            <Button onclickcapture={buttonActivate} disabled={!row.buttonType && (typeof row.buttonId !== 'undefined' && activatedMap.has(row.buttonId)) || isButtonPressable} style={rowButton} variant="raised" >
                                <Label>{@html typeof row.buttonText !== 'undefined' ? row.buttonText : 'Click'}</Label>
                            </Button>
                        {:else if row.image}
                            {#if row.imageSourceTooltip}
                                <img use:tooltip={row.imageSourceTooltip} src={row.image} style={rowImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {:else}
                                <img src={row.image} style={rowImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {/if}
                        {/if}
                    </div>
                    <div class="col p-0 text-center" style="max-width: {100 - rowImageBoxWidth}%">
                        {#if row.title !== ''}
                            <h2 class="mb-0" style={rowTitle}>{@html DOMPurify.sanitize(replaceText(row.title), sanitizeArg)}</h2>
                        {/if}
                        {#if row.titleText !== ''}
                            <p class="mb-0" style={rowText}>
                                {@html DOMPurify.sanitize(replaceText(row.titleText), sanitizeArg)}
                            </p>
                        {/if}
                    </div>
                {/if}
            {/if}
        </div>
    {/if}
    {#if isEnabled}
        <div class="row gx-0 m-0 p-0 {rowJustify}">
            {#if row.isResultRow}
                {#each resultRow as val, i}
                    <AppObject bind:this={choiceRef} row={row} choice={val.choice} index={i} windowWidth={windowWidth} preloadImages={preloadImages} />
                {/each}
            {:else if row.isGroupRow}
                {#each groupRow as val, i}
                    <AppObject bind:this={choiceRef} row={row} choice={val.choice} index={i} windowWidth={windowWidth} preloadImages={preloadImages} isBackpack={isBackpack} mainDiv={mainDiv} />
                {/each}
            {:else}
                {#each row.objects as choice, i}
                    <AppObject bind:this={choiceRef} row={row} choice={choice} index={i} windowWidth={windowWidth} preloadImages={preloadImages} isBackpack={isBackpack} mainDiv={mainDiv} />
                {/each}
            {/if}
        </div>
    {/if}
</div>
<script lang="ts">
    import AppObject from './AppObject.svelte';
    import Button, { Label } from '@smui/button';
    import DOMPurify from 'dompurify';
    import { app, getStyling, checkRequirements, pointTypeMap, rowDesignMap, sanitizeArg, checkActivated, globalReqMap, replaceText, choiceMap, activatedMap, variableMap, hexToRgba, groupMap } from '$lib/store/store.svelte';
    import type { Row } from '$lib/store/types';
    import { tooltip } from '$lib/custom/tooltip/store.svelte';

    const { row, windowWidth, preloadImages = false, isBackpack = false, mainDiv }: { row:Row, windowWidth:number, preloadImages?: boolean, isBackpack?: boolean, mainDiv?: HTMLDivElement } = $props();
    
    let choiceRef = $state<any>();
    let backgroundStyle = $derived(getStyling('privateBackgroundIsOn', row));
    let rowImageStyle = $derived(getStyling('privateRowImageIsOn', row));
    let rowStyle = $derived(getStyling('privateRowIsOn', row));
    let textStyle = $derived(getStyling('privateTextIsOn', row));
    let width = $state(0);
    let rowImageBoxWidth = $derived(typeof rowImageStyle.rowImageBoxWidth !== 'undefined' ? rowImageStyle.rowImageBoxWidth : 50);
    let isEnabled = $derived(checkRequirements(row.requireds));
    let isButtonPressable = $derived(row.onlyIfNoChoices && row.currentChoices !== 0);
    let rowJustify = $derived(row.rowJustify ? `justify-${row.rowJustify}` : '');

    let resultRow = $derived.by(() => {
        const result = [];
        if (typeof row.resultGroupId === 'undefined' || row.resultGroupId === '' || !row.resultGroupId) {
            for (const [key] of activatedMap) {
                const cMap = choiceMap.get(key);

                if (typeof cMap !== 'undefined') {
                    const aChoice = cMap.choice;
                    const aRow = cMap.row;

                    if (!aChoice.isNotResult) {
                        result.push({choice: aChoice, row: aRow});
                    }
                }
            }
        } else {
            for (const [key] of activatedMap) {
                const cMap = choiceMap.get(key);

                if (typeof cMap !== 'undefined') {
                    const aChoice = cMap.choice;
                    const aRow = cMap.row;

                    if (!aChoice.isNotResult) {
                        if (row.resultGroupId === aRow.resultGroupId) {
                            result.push({choice: aChoice, row: aRow});
                        } else {
                            if (typeof aChoice.groups !== 'undefined') {
                                for (let i = 0; i < aChoice.groups.length; i++) {
                                    if (aChoice.groups[i] === row.resultGroupId) {
                                        result.push({choice: aChoice, row: aRow});
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        result.sort((a, b) => {
            if (a.row.index !== b.row.index) return a.row.index - b.row.index;
            return a.choice.index - b.choice.index;
        });

        return result;
    });

    let groupRow = $derived.by(() => {
        const result = [];
        if (typeof row.resultGroupId !== 'undefined') {
            const group = groupMap.get(row.resultGroupId);

            if (typeof group !== 'undefined') {
                for (let i = 0; i < group.elements.length; i++) {
                    const cMap = choiceMap.get(group.elements[i]);
                    
                    if (typeof cMap !== 'undefined') {
                        result.push({choice: cMap.choice, row: cMap.row});
                    }
                }
            }
        }

        result.sort((a, b) => {
            if (a.row.index !== b.row.index) return a.row.index - b.row.index;
            return a.choice.index - b.choice.index;
        });

        return result;
    });

    let rowBodyBgImage = $derived.by(() => {
        if (typeof row.styling !== 'undefined' && row.isPrivateStyling && row.privateBackgroundIsOn && row.styling.backgroundImage) return row.styling;
        if (typeof app.rowDesignGroups !== 'undefined' && row.rowDesignGroups) {
            for (let i = 0; i < row.rowDesignGroups.length; i++) {
                let rowDesignGroup = rowDesignMap.get(row.rowDesignGroups[i]);
                if (typeof rowDesignGroup !== 'undefined') {
                    if (rowDesignGroup.privateBackgroundIsOn && rowDesignGroup.styling.backgroundImage) {
                        let id = rowDesignGroup.activatedId;
                        let globalReq = globalReqMap.get(id);
                        if (id === '' || checkActivated(rowDesignGroup.activatedId)) {
                            return rowDesignGroup.styling;
                        } else if (typeof app.globalRequirements !== 'undefined' && typeof globalReq !== 'undefined') {
                            if (checkRequirements(globalReq.requireds)) return rowDesignGroup.styling;
                        }
                    }
                }
            }
        }
        return false;
    });

    let rowBodyBgColor = $derived.by(() => {
        if (typeof row.styling !== 'undefined' && row.isPrivateStyling && row.privateBackgroundIsOn && row.styling.bgColorIsOn && row.styling.backgroundColor) return row.styling;
        if (typeof app.rowDesignGroups !== 'undefined' && row.rowDesignGroups) {
            for (let i = 0; i < row.rowDesignGroups.length; i++) {
                let rowDesignGroup = rowDesignMap.get(row.rowDesignGroups[i]);
                if (typeof rowDesignGroup !== 'undefined') {
                    if (rowDesignGroup.privateBackgroundIsOn && rowDesignGroup.styling.bgColorIsOn && rowDesignGroup.styling.backgroundColor) {
                        let id = rowDesignGroup.activatedId;
                        let globalReq = globalReqMap.get(id);
                        if (id === '' || checkActivated(rowDesignGroup.activatedId)) {
                            return rowDesignGroup.styling;
                        } else if (typeof app.globalRequirements !== 'undefined' && typeof globalReq !== 'undefined') {
                            if (checkRequirements(globalReq.requireds)) return rowDesignGroup.styling;
                        }
                    }
                }
            }
        }
        return false;
    });

    let rowBody = $derived.by(() => {
        let styles: string[] = [];;

        styles.push(`margin: ${rowStyle.rowBodyMarginTop}px ${rowStyle.rowBodyMarginSides}% ${rowStyle.rowBodyMarginBottom}px ${rowStyle.rowBodyMarginSides}%;`);
        if (rowBodyBgImage) {
            styles.push(`background-image: url('${rowBodyBgImage.backgroundImage}'); ${rowBodyBgImage.isBackgroundRepeat ? 'background-repeat: repeat;' : (rowBodyBgImage.isBackgroundFitIn ? 'background-size: 100% 100%;' : 'background-size: cover;')}`);
        }
        if (rowBodyBgColor) {
            styles.push(`background-color: ${hexToRgba(rowBodyBgColor.backgroundColor)};`);
        }
        return styles.join(' ');
    });

    let rowBackground = $derived.by(() => {
        let suffix = rowStyle.rowBorderRadiusIsPixels ? 'px' : '%';
        let styles: string[] = [];;

        if (rowStyle.rowBorderImage) {
            styles.push(`border-image: url('${rowStyle.rowBorderImage}') ${rowStyle.rowBorderImageSliceTop} ${rowStyle.rowBorderImageSliceRight} ${rowStyle.rowBorderImageSliceBottom} ${rowStyle.rowBorderImageSliceLeft} / ${rowStyle.rowBorderImageWidth}px ${rowStyle.rowBorderImageRepeat}; border-style: solid; padding: ${rowStyle.rowBorderImageWidth}px;`);
        }
        if (backgroundStyle.rowBackgroundImage) {
            styles.push(`background-image: url('${backgroundStyle.rowBackgroundImage}'); ${backgroundStyle.isRowBackgroundRepeat? 'background-repeat: repeat;' : (backgroundStyle.isRowBackgroundFitIn ? 'background-size: 100% 100%;' : 'background-size: cover;')}`);
        }
        if (backgroundStyle.rowBgColorIsOn) {
            styles.push(`background-color: ${hexToRgba(backgroundStyle.rowBgColor)};`);
        }
        styles.push(`margin-left: ${rowStyle.rowMargin}%; margin-right: ${rowStyle.rowMargin}%;`);        
        if (rowStyle.rowGradientIsOn) {
            styles.push(`background-image: linear-gradient(${rowStyle.rowGradient});`);
        }
        styles.push(`border-radius: ${rowStyle.rowBorderRadiusTopLeft}${suffix} ${rowStyle.rowBorderRadiusTopRight}${suffix} ${rowStyle.rowBorderRadiusBottomRight}${suffix} ${rowStyle.rowBorderRadiusBottomLeft}${suffix};`);
        if (rowStyle.rowOverflowIsOn) {
            styles.push(`overflow: hidden;`);
        }
        if (rowStyle.rowBorderIsOn) {
            styles.push(`border: ${rowStyle.rowBorderWidth}px ${rowStyle.rowBorderStyle} ${hexToRgba(rowStyle.rowBorderColor)};`);
        }
        if (rowStyle.rowDropShadowIsOn) {
            if (rowStyle.rowUseBoxShadowIsOn) {
                styles.push(`box-shadow: ${rowStyle.rowDropShadowH}px ${rowStyle.rowDropShadowV}px ${rowStyle.rowDropShadowBlur}px ${hexToRgba(rowStyle.rowDropShadowColor)};`);
            } else {
                styles.push(`filter: drop-shadow(${rowStyle.rowDropShadowH}px ${rowStyle.rowDropShadowV}px ${rowStyle.rowDropShadowBlur}px ${hexToRgba(rowStyle.rowDropShadowColor)});`);
            }
        }

        return styles.join(' ');
    });

    let rowTitle = $derived.by(() => {
        return `font-family: '${textStyle.rowTitle}'; font-size: ${textStyle.rowTitleTextSize}%; text-align: ${textStyle.rowTitleAlign}; color: ${hexToRgba(textStyle.rowTitleColor)}`;
    });

    let rowText = $derived.by(() => {
        return `white-space: pre-wrap; font-family: '${textStyle.rowText}'; font-size: ${textStyle.rowTextTextSize}%; text-align: ${textStyle.rowTextAlign}; color: ${hexToRgba(textStyle.rowTextColor)}; padding: ${rowStyle.rowTextPaddingX}px ${rowStyle.rowTextPaddingY}% ${rowStyle.rowTextPaddingX}px ${rowStyle.rowTextPaddingY}%;`;
    });

    let rowImage = $derived.by(() => {
        let suffix = rowImageStyle.rowImgBorderRadiusIsPixels ? 'px' : '%';
        let styles: string[] = [];;
        
        styles.push(`width: ${rowImageStyle.rowImageWidth}%; margin-top: ${rowImageStyle.rowImageMarginTop}%; margin-bottom: ${rowImageStyle.rowImageMarginBottom}%;`);
        styles.push(`border-radius: ${rowImageStyle.rowImgBorderRadiusTopLeft}${suffix} ${rowImageStyle.rowImgBorderRadiusTopRight}${suffix} ${rowImageStyle.rowImgBorderRadiusBottomRight}${suffix} ${rowImageStyle.rowImgBorderRadiusBottomLeft}${suffix};`);
        if (rowImageStyle.rowImgOverflowIsOn) {
            styles.push(`overflow: hidden;`);
        }
        if (rowImageStyle.rowImgBorderIsOn) {
            styles.push(`border: ${rowImageStyle.rowImgBorderWidth}px ${rowImageStyle.rowImgBorderStyle} ${hexToRgba(rowImageStyle.rowImgBorderColor)};`);
        }
        
        return styles.join(' ');
    });

    let rowButton = $derived(`padding-left: ${rowStyle.rowButtonYPadding}px; padding-right: ${rowStyle.rowButtonYPadding}px; padding-top: ${rowStyle.rowButtonXPadding}px; padding-bottom: ${rowStyle.rowButtonXPadding}px;`);

    $effect(() => {
        if (row.deselectChoices && !isEnabled) {
            for (let i = 0; i < row.objects.length; i++) {
                const choice = row.objects[i];

                if (choice.isActive) {
                    choiceRef.activateObject(choice, row);
                }
            }
        }
    });

    function buttonActivate() {
        if (row.btnPointAddon && row.buttonTypeRadio === 'sumaddon' && typeof row.pointTypeRandom !== 'undefined') {
            const rndMax = row.randomMax || 0;
            const rndMin = row.randomMin || 0;
            const rnd = Math.floor(Math.random() * (rndMax - rndMin) + rndMin);
            const point = pointTypeMap.get(row.pointTypeRandom);

            if (typeof point !== 'undefined') {
                point.startingSum += rnd;
            }
            return;
        }

        if (row.buttonRandom) {
            const selectedIndexes: number[] = [];
            const validChoices = row.objects.filter(choice => checkRequirements(choice.requireds) && (!choice.isNotSelectable || row.allowActivateUnselectable));

            if (row.isWeightedRandom) {
                let totalWeight = 0;

                for (let i = 0; i < validChoices.length; i++) {
                    const vChoice = validChoices[i];
                    const weight = vChoice.randomWeight || 100;

                    totalWeight += weight;
                }

                if (typeof row.buttonRandomNumber !== 'undefined') {
                    for (let i = 0; i < row.buttonRandomNumber; i++) {
                        const rnd = Math.floor(Math.random() * totalWeight);
                        let runningTotal = 0;

                        for (let j = 0; j < validChoices.length; j++) {
                            const vChoice = validChoices[j];
                            const weight = vChoice.randomWeight || 100;

                            runningTotal += weight;

                            if (rnd < runningTotal) {
                                choiceRef.activateObject(vChoice, row);
                                break;
                            }
                        }
                    }
                }
            } else {
                if (typeof row.buttonRandomNumber !== 'undefined') {
                    for (let i = 0; i < row.buttonRandomNumber; i++) {
                        let retries = 0;
                        let maxRetries = 100;
                        let choice;
                        let index;

                        do {
                            index = Math.floor(Math.random() * validChoices.length);
                            choice = validChoices[index];
                            retries++;
                        } while (
                            (row.onlyUnselectedChoices && (selectedIndexes.indexOf(index) !== -1 || activatedMap.has(choice.id))) &&
                            retries < maxRetries
                        );

                        if (choice && selectedIndexes.indexOf(index) === -1) {
                            selectedIndexes.push(index);
                            choiceRef.activateObject(choice, row);
                        }
                    }
                }
            }
        } else if (typeof row.buttonId !== 'undefined') {
            const variable = variableMap.get(row.buttonId);

            if (typeof variable !== 'undefined') {
                if (activatedMap.has(variable.id)) {
                    if (row.buttonType) {
                        variable.isTrue = false;
                        activatedMap.delete(variable.id);
                    }
                } else {
                    variable.isTrue = true;
                    activatedMap.set(variable.id, {multiple: 0, isVariable: true});
                }
            }
        }
    }
</script>