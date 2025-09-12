{#if isShown}
    <div class={objectWidthClass()}>
        <div class:fullHeight={fullHeight} class="d-flex">
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div class="row row-{row.id} choice-{choice.id} {isActive ? 'choice-selected' : 'choice-unselected'} {isEnabled ? 'choice-enabled' : 'choice-disabled'} {(isActive && filterStyle.selOverlayOnImage) || (!isEnabled && filterStyle.reqOverlayOnImage) ? 'bg-overlay ' : ''}w-100" style={objectBackground} onclickcapture={(e) => activateObject(choice, row, e, true)}>
                {#if choice.template >= 4 || choice.template === 1 || windowWidth <= 1280 || row.choicesShareTemplate}
                    <div class="d-column w-100 p-0 align-items-center">
                        {#if row.resultShowRowTitle}
                            <div class="col-12" style={scoreText}>
                                {@html DOMPurify.sanitize(replaceText(oriRow.title !== '' ? oriRow.title : oriRow.debugTitle || ''), sanitizeArg)}
                            </div>
                        {/if}
                        {#if (choice.template === 1 || windowWidth <= 1280 || row.choicesShareTemplate) && choice.image && !row.objectImageRemoved}
                            {#if choice.imageSourceTooltip}
                                <img use:tooltip={choice.imageSourceTooltip} oncontextmenu={copyTooltip} src={choice.image} style={objectImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {:else}
                                <img src={choice.image} style={objectImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {/if}
                        {/if}
                        <div class="w-100">
                            {#if choice.title !== '' && !row.objectTitleRemoved}
                                <h3 class="m-0" style={objectTitle}>
                                    {@html DOMPurify.sanitize(replaceText(choice.title), sanitizeArg)}
                                </h3>
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 0}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                            {/if}
                            {#if !row.objectScoreRemoved && !choice.showScoreInAddon}
                                {#each choice.scores as score}
                                    <ObjectScore score={score} row={row} choice={choice} />
                                {/each}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 1}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                            {/if}
                            {#if !row.objectRequirementRemoved && !choice.showReqInAddon}
                                {#each choice.requireds as required}
                                    <ObjectRequired required={required} scoreText={scoreText} />
                                {/each}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 2}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                            {/if}
                            {#if choice.template === 5 && windowWidth > 1280 && choice.image && !row.objectImageRemoved}
                                {#if choice.imageSourceTooltip}
                                    <img use:tooltip={choice.imageSourceTooltip} oncontextmenu={copyTooltip} src={choice.image} style={objectImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                                {:else}
                                    <img src={choice.image} style={objectImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                                {/if}
                            {/if}
                            {#if choice.text !== '' && !row.objectTextRemoved}
                                <p class="mb-0" style={objectText}>
                                    {@html DOMPurify.sanitize(replaceText(choice.text), sanitizeArg)}
                                </p>
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 3}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice}  selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                            {/if}
                            {#if choice.template === 4 && windowWidth > 1280 && choice.image && !row.objectImageRemoved}
                                {#if choice.imageSourceTooltip}
                                    <img use:tooltip={choice.imageSourceTooltip} oncontextmenu={copyTooltip} src={choice.image} style={objectImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                                {:else}
                                    <img src={choice.image} style={objectImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                                {/if}
                            {/if}
                        </div>
                        {#if choice.addons && choice.addons.length > 0}
                            <div class="d-column p-0 col w-100{addonJustify}">
                                {#each choice.addons as addon, i}
                                    {#if app.showAllAddons > 0 || (!addon.hideAddon || choice.isActive) && (addon.showAddon || checkRequirements(addon.requireds))}
                                        <ObjectAddon row={row} choice={choice} addon={addon} isEnabled={isEnabled} windowWidth={windowWidth} preloadImages={preloadImages} isFirst={firstAddonIndex === i} />
                                    {/if}
                                {/each}
                            </div>
                        {/if}
                        {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 4}
                            <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                        {/if}
                    </div>
                {:else}
                    {#if choice.template === 2}
                        <div class="col p-0 text-center" style="max-width: {choiceImageBoxWidth}%">
                            {#if choice.image && !row.objectImageRemoved}
                                {#if choice.imageSourceTooltip}
                                    <img use:tooltip={choice.imageSourceTooltip} oncontextmenu={copyTooltip} src={choice.image} style={objectImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                                {:else}
                                    <img src={choice.image} style={objectImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                                {/if}
                            {/if}
                        </div>
                        <div class="col p-0 text-center" style="max-width: {100 - choiceImageBoxWidth}%">
                            {#if choice.title !== '' && !row.objectTitleRemoved}
                                <h2 class="mb-0" style={objectTitle}>{@html DOMPurify.sanitize(replaceText(choice.title), sanitizeArg)}</h2>
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 0}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                            {/if}
                            {#if !row.objectScoreRemoved && !choice.showScoreInAddon}
                                {#each choice.scores as score}
                                    <ObjectScore score={score} row={row} choice={choice} />
                                {/each}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 1}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                            {/if}
                            {#if !row.objectRequirementRemoved && !choice.showReqInAddon}
                                {#each choice.requireds as required}
                                    <ObjectRequired required={required} scoreText={scoreText} />
                                {/each}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 2}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                            {/if}
                            {#if choice.text !== '' && !row.objectTextRemoved}
                                <p class="mb-0" style={objectText}>
                                    {@html DOMPurify.sanitize(replaceText(choice.text), sanitizeArg)}
                                </p>
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 3}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                            {/if}
                            {#if !choice.useSeperateAddon}
                                {#if choice.addons && choice.addons.length > 0}
                                    <div class="d-column p-0 col w-100{addonJustify}">
                                        {#each choice.addons as addon, i}
                                            {#if app.showAllAddons > 0 || (!addon.hideAddon || choice.isActive) && (addon.showAddon || checkRequirements(addon.requireds))}
                                                <ObjectAddon row={row} choice={choice} addon={addon} isEnabled={isEnabled} windowWidth={windowWidth} preloadImages={preloadImages} isFirst={firstAddonIndex === i} />
                                            {/if}
                                        {/each}
                                    </div>
                                {/if}
                                {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 4}
                                    <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                                {/if}
                            {/if}
                        </div>
                        {#if choice.useSeperateAddon}
                            <div class="col-12 text-center">
                                {#if choice.addons && choice.addons.length > 0}
                                    <div class="d-column p-0 col w-100{addonJustify}">
                                        {#each choice.addons as addon, i}
                                            {#if app.showAllAddons > 0 || (!addon.hideAddon || choice.isActive) && (addon.showAddon || checkRequirements(addon.requireds))}
                                                <ObjectAddon row={row} choice={choice} addon={addon} isEnabled={isEnabled} windowWidth={windowWidth} preloadImages={preloadImages} isFirst={firstAddonIndex === i} />
                                            {/if}
                                        {/each}
                                    </div>
                                {/if}
                                {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 4}
                                    <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                                {/if}
                            </div>
                        {/if}
                    {:else if choice.template === 3}
                        <div class="col p-0 text-center" style="max-width: {100 - choiceImageBoxWidth}%">
                            {#if choice.title !== '' && !row.objectTitleRemoved}
                                <h2 class="mb-0" style={objectTitle}>{@html DOMPurify.sanitize(replaceText(choice.title), sanitizeArg)}</h2>
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 0}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                            {/if}
                            {#if !row.objectScoreRemoved && !choice.showScoreInAddon}
                                {#each choice.scores as score}
                                    <ObjectScore score={score} row={row} choice={choice} />
                                {/each}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 1}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                            {/if}
                            {#if !row.objectRequirementRemoved && !choice.showReqInAddon}
                                {#each choice.requireds as required}
                                    <ObjectRequired required={required} scoreText={scoreText} />
                                {/each}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 2}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                            {/if}
                            {#if choice.text !== '' && !row.objectTextRemoved}
                                <p class="mb-0" style={objectText}>
                                    {@html DOMPurify.sanitize(replaceText(choice.text), sanitizeArg)}
                                </p>
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 3}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                            {/if}
                            {#if !choice.useSeperateAddon}
                                {#if choice.addons && choice.addons.length > 0}
                                    <div class="d-column p-0 col w-100{addonJustify}">
                                        {#each choice.addons as addon, i}
                                            {#if app.showAllAddons > 0 || (!addon.hideAddon || choice.isActive) && (addon.showAddon || checkRequirements(addon.requireds))}
                                                <ObjectAddon row={row} choice={choice} addon={addon} isEnabled={isEnabled} windowWidth={windowWidth} preloadImages={preloadImages} isFirst={firstAddonIndex === i} />
                                            {/if}
                                        {/each}
                                    </div>
                                {/if}
                                {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 4}
                                    <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                                {/if}
                            {/if}
                        </div>
                        <div class="col p-0 text-center" style="max-width: {choiceImageBoxWidth}%">
                            {#if choice.image && !row.objectImageRemoved}
                                {#if choice.imageSourceTooltip}
                                    <img use:tooltip={choice.imageSourceTooltip} oncontextmenu={copyTooltip} src={choice.image} style={objectImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                                {:else}
                                    <img src={choice.image} style={objectImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                                {/if}
                            {/if}
                        </div>
                        {#if choice.useSeperateAddon}
                            <div class="col-12 text-center">
                                {#if choice.addons && choice.addons.length > 0}
                                    <div class="d-column p-0 col w-100{addonJustify}">
                                        {#each choice.addons as addon, i}
                                            {#if app.showAllAddons > 0 || (!addon.hideAddon || choice.isActive) && (addon.showAddon || checkRequirements(addon.requireds))}
                                                <ObjectAddon row={row} choice={choice} addon={addon} isEnabled={isEnabled} windowWidth={windowWidth} preloadImages={preloadImages} isFirst={firstAddonIndex === i} />
                                            {/if}
                                        {/each}
                                    </div>
                                {/if}
                                {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 4}
                                    <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                                {/if}
                            </div>
                        {/if}
                    {/if}
                {/if}
            </div>
        </div>
    </div>
{/if}
{#if currentDialog === 'dlgCommon'}
    <DlgCommon open={currentDialog === 'dlgCommon'} onclose={() => (currentDialog = 'none')} title="" context={wordDialog.context} closeHandler={(e, wordText) => {
        if (e.detail.action === 'accept' && wordDialog.choice && wordDialog.row) {
            isOverDlg = true;
            if (wordDialog.isWord) wordDialog.choice.wordChangeSelect = wordText;
            selectObject(wordDialog.choice, wordDialog.row);
            isOverDlg = false;
        } else {
            isOverDlg = false;
        }
    }} isWord={wordDialog.isWord} prevText={wordDialog.prevText} />
{/if}

<script lang="ts">
    import DlgCommon from './DlgCommon.svelte';
    import DOMPurify from 'dompurify';
    import ObjectAddon from './Object/ObjectAddon.svelte';
    import ObjectMultiChoice from './Object/ObjectMultiChoice.svelte';
    import ObjectRequired from './Object/ObjectRequired.svelte';
    import ObjectScore from './Object/ObjectScore.svelte';
	import type { ActivatedMap, Choice, Row, TempScore } from '$lib/store/types';
	import { app, choiceMap, groupMap, getStyling, checkRequirements, sanitizeArg, replaceText, pointTypeMap, activatedMap, variableMap, rowMap, wordMap, bgmPlayer, tmpActivatedMap, mdObjects, bgmVariables, objectWidthToNum, selectDiscount, deselectDiscount, checkPoints, cleanActivated, initYoutubePlayer, playBgm, dlgVariables, snackbarVariables, duplicateRow, winWidth, applyWidth, applyTemplate, revertTemplate, revertWidth, hexToRgba } from '$lib/store/store.svelte';
    import { SvelteMap } from 'svelte/reactivity';
	import { get } from 'svelte/store';
    import { tick } from 'svelte';
    import { tooltip } from '$lib/custom/tooltip/store.svelte';

    export { activateObject };
    
    const { row, choice, windowWidth, preloadImages = false, isBackpack, mainDiv }: { row: Row, choice: Choice, index: number, windowWidth: number, preloadImages?: boolean, isBackpack?: boolean, mainDiv?: HTMLDivElement } = $props();
    const linkedObjects: string[] = [];
    const wordDialog: {
        choice: Choice | null,
        row: Row | null,
        context: string,
        prevText: string,
        isWord: boolean
    } = {
        choice: null,
        row: null,
        context: '',
        prevText: '',
        isWord: true
    };

    let firstAddonIndex = $derived.by(() => {
        if (choice.addons) {
            for (let i = 0; i < choice.addons.length; i++) {
                const addon = choice.addons[i];
                if (app.showAllAddons > 0 || !addon.skipIndex && (!addon.hideAddon || choice.isActive) && (addon.showAddon || checkRequirements(addon.requireds))) {
                    return i;
                }
            }
        }
        return -1;
    });
    let backgroundStyle = $derived(getStyling('privateBackgroundIsOn', row, choice));
    let filterStyle = $derived(getStyling('privateFilterIsOn', row, choice));
    let multiChoiceStyle = $derived(getStyling('privateMultiChoiceIsOn', row, choice));
    let objectImageStyle = $derived(getStyling('privateObjectImageIsOn', row, choice));
    let objectStyle = $derived(getStyling('privateObjectIsOn', row, choice));
    let textStyle = $derived(getStyling('privateTextIsOn', row, choice));
    
    let choiceImageBoxWidth = $derived(typeof objectImageStyle.objectImageBoxWidth !== 'undefined' ? objectImageStyle.objectImageBoxWidth : 50);
    let currentDialog = $state<'none' | 'dlgCommon'>('none');
    let isOverDlg = false;

    let isEnabled = $derived.by(() => {
        return checkRequirements(choice.requireds);
    });
    let isShown = $derived.by(() => {
        if (choice.isActive) {
            return !filterStyle.selFilterVisibleIsOn;
        } else if (!isEnabled) {
            return !filterStyle.reqFilterVisibleIsOn
        }
        return !filterStyle.unselFilterVisibleIsOn;
    });
    let addonJustify = $derived(choice.addonJustify ? ` justify-${choice.addonJustify}` : '');
    let isActive = $derived(choice.isActive);
    let fullHeight = $derived(objectStyle.objectHeight);
    let oriRow = $derived.by(() => {
        if (row.isResultRow) {
            const cMap = choiceMap.get(choice.id);
            if (typeof cMap !== 'undefined') {
                return cMap.row;
            }
        }
        return row;
    });
    let objectTitle = $derived.by(() => {
        let styles: string[] = [];

        styles.push(`white-space: pre-line; font-family: '${textStyle.objectTitle}'; font-size: ${textStyle.objectTitleTextSize}%; text-align: ${textStyle.objectTitleAlign};`);
        if (!isEnabled && filterStyle.reqCTitleColorIsOn) {
            styles.push(`color: ${hexToRgba(filterStyle.reqFilterCTitleColor)};`);
        } else if (isActive && filterStyle.selCTitleColorIsOn) {
            styles.push(`color: ${hexToRgba(filterStyle.selFilterCTitleColor)};`);
        } else {
            styles.push(`color: ${hexToRgba(textStyle.objectTitleColor)};`);
        }
        if (objectStyle.titlePaddingIsOn) {
            styles.push(`padding: ${objectStyle.objectTextPadding}px;`);
        }

        return styles.join(' ');
    });

    let multiChoiceText = $derived(`font-family: '${multiChoiceStyle.multiChoiceTextFont}'; color: ${hexToRgba(textStyle.scoreTextColor)}; font-size: ${multiChoiceStyle.multiChoiceTextSize}%; align-content: center;`);

    let multiChoiceButton = $derived(`font-size: ${multiChoiceStyle.multiChoiceCounterSize}%; color: ${hexToRgba(textStyle.scoreTextColor)};`);

    let multiChoiceCounter = $derived.by(() => {
        if (choice.hideMultipleCounter) {
            return isEnabled;
        }

        return true;
    });

    let objectText = $derived.by(() => {
        let styles: string[] = [];

        styles.push(`white-space: pre-wrap; font-family: '${textStyle.objectText}'; text-align: ${textStyle.objectTextAlign}; font-size: ${textStyle.objectTextTextSize}%;`);
        if (!isEnabled && filterStyle.reqCTextColorIsOn) {
            styles.push(`color: ${hexToRgba(filterStyle.reqFilterCTextColor)};`);
        } else if (isActive && filterStyle.selCTextColorIsOn) {
            styles.push(`color: ${hexToRgba(filterStyle.selFilterCTextColor)};`);
        } else {
            styles.push(`color: ${hexToRgba(textStyle.objectTextColor)};`);
        }
        styles.push(`padding: ${objectStyle.objectTextPadding}px;`);

        return styles.join(' ');
    });
    
    let objectBackground = $derived.by(() => {
        const suffix = objectStyle.objectBorderRadiusIsPixels ? 'px' : '%';
        let bgImageIndex = 0;
        let bgColorIndex = 0;
        let filterIndex = 0;
        let styles: string[] = [];

        if (objectStyle.objectBorderImage) {
            styles.push(`border-image: url('${objectStyle.objectBorderImage}') ${objectStyle.objectBorderImageSliceTop} ${objectStyle.objectBorderImageSliceRight} ${objectStyle.objectBorderImageSliceBottom} ${objectStyle.objectBorderImageSliceLeft} / ${objectStyle.objectBorderImageWidth}px ${objectStyle.objectBorderImageRepeat}; border-style: solid; padding: ${objectStyle.objectBorderImageWidth}px;`);
        }
        if (backgroundStyle.objectBackgroundImage) {
            styles.push(`background-image: url('${backgroundStyle.objectBackgroundImage}'); ${backgroundStyle.isObjectBackgroundRepeat? 'background-repeat: repeat;' : (backgroundStyle.isObjectBackgroundFitIn ? 'background-size: 100% 100%;' : 'background-size: cover;')}`);
            bgImageIndex = styles.length;
        }
        if (backgroundStyle.objectBgColorIsOn) {
            styles.push(`background-color: ${hexToRgba(backgroundStyle.objectBgColor)};`);
            bgColorIndex = styles.length;
        }
        styles.push(`margin: ${objectStyle.objectMargin}px;`);
        styles.push(`border-radius: ${objectStyle.objectBorderRadiusTopLeft}${suffix} ${objectStyle.objectBorderRadiusTopRight}${suffix} ${objectStyle.objectBorderRadiusBottomRight}${suffix} ${objectStyle.objectBorderRadiusBottomLeft}${suffix};`);
        if (objectStyle.objectOverflowIsOn) {
            styles.push(`overflow: hidden;`);
        }
        if (objectStyle.objectBorderIsOn || (isActive && filterStyle.selBorderColorIsOn) || (!isEnabled && filterStyle.reqBorderColorIsOn)) {
            let borderColor = objectStyle.objectBorderColor;
            
            if (!isEnabled && filterStyle.reqBorderColorIsOn) {
                borderColor = filterStyle.reqFilterBorderColor;
            } else if (isActive && filterStyle.selBorderColorIsOn) {
                borderColor = filterStyle.selFilterBorderColor;
            }
            styles.push(`border: ${objectStyle.objectBorderWidth}px ${objectStyle.objectBorderStyle} ${hexToRgba(borderColor)};`);
        }
        if (objectStyle.objectDropShadowIsOn) {
            if (objectStyle.objectUseBoxShadowIsOn) {
                styles.push(`box-shadow: ${objectStyle.objectDropShadowH}px ${objectStyle.objectDropShadowV}px ${objectStyle.objectDropShadowBlur}px ${hexToRgba(objectStyle.objectDropShadowColor)};`);
            } else {
                filterIndex = styles.length;
                styles.push(`filter: drop-shadow(${objectStyle.objectDropShadowH}px ${objectStyle.objectDropShadowV}px ${objectStyle.objectDropShadowBlur}px ${hexToRgba(objectStyle.objectDropShadowColor)})`);
            }
        }
        if (filterIndex === 0) {
            styles.push(`filter:`);
            filterIndex = styles.length;
        }
        if (isEnabled) {
            if (isActive) {
                if (filterStyle.selFilterBlurIsOn) {
                    styles.push(` blur(${filterStyle.selFilterBlur}px)`);
                }
                if (filterStyle.selFilterBrightIsOn) {
                    styles.push(` brightness(${filterStyle.selFilterBright}%)`);
                }
                if (filterStyle.selFilterContIsOn) {
                    styles.push(` contrast(${filterStyle.selFilterCont}%)`);
                }
                if (filterStyle.selFilterGrayIsOn) {
                    styles.push(` grayscale(${filterStyle.selFilterGray}%)`);
                }
                if (filterStyle.selFilterHueIsOn) {
                    styles.push(` hue-rotate(${filterStyle.selFilterHue}deg)`);
                }
                if (filterStyle.selFilterInvertIsOn) {
                    styles.push(` invert(${filterStyle.selFilterInvert}%)`);
                }
                if (filterStyle.selFilterOpacIsOn) {
                    styles.push(` opacity(${filterStyle.selFilterOpac}%)`);
                }
                if (filterStyle.selFilterSaturIsOn) {
                    styles.push(` saturate(${filterStyle.selFilterSatur})`);
                }
                if (filterStyle.selFilterSepiaIsOn) {
                    styles.push(` sepia(${filterStyle.selFilterGray}%)`);
                }
                if (styles.length === filterIndex) {
                    styles.splice(filterIndex - 1, 1);
                } else {
                    styles.push(`;`);
                }
                if (filterStyle.selBgColorIsOn) {
                    if (bgColorIndex !== 0) {
                        styles.splice(bgColorIndex - 1, 1);
                    }
                    if (!filterStyle.selOverlayOnImage) {
                        if (bgImageIndex !== 0) {
                            styles.splice(bgImageIndex - 1, 1);
                        }
                    }
                    styles.push(`background-color: ${hexToRgba(filterStyle.selFilterBgColor)};`);
                }
                if (objectStyle.objectGradientIsOn) {
                    styles.push(`background-image: linear-gradient(${objectStyle.objectGradientOnSelect});`);
                }
            } else {
                if (filterStyle.unselFilterBlurIsOn) {
                    styles.push(` blur(${filterStyle.unselFilterBlur}px)`);
                }
                if (filterStyle.unselFilterBrightIsOn) {
                    styles.push(` brightness(${filterStyle.unselFilterBright}%)`);
                }
                if (filterStyle.unselFilterContIsOn) {
                    styles.push(` contrast(${filterStyle.unselFilterCont}%)`);
                }
                if (filterStyle.unselFilterGrayIsOn) {
                    styles.push(` grayscale(${filterStyle.unselFilterGray}%)`);
                }
                if (filterStyle.unselFilterHueIsOn) {
                    styles.push(` hue-rotate(${filterStyle.unselFilterHue}deg)`);
                }
                if (filterStyle.unselFilterInvertIsOn) {
                    styles.push(` invert(${filterStyle.unselFilterInvert}%)`);
                }
                if (filterStyle.unselFilterOpacIsOn) {
                    styles.push(` opacity(${filterStyle.unselFilterOpac}%)`);
                }
                if (filterStyle.unselFilterSaturIsOn) {
                    styles.push(` saturate(${filterStyle.unselFilterSatur})`);
                }
                if (filterStyle.unselFilterSepiaIsOn) {
                    styles.push(` sepia(${filterStyle.unselFilterGray}%)`);
                }
                if (styles.length === filterIndex) {
                    styles.splice(filterIndex - 1, 1);
                } else {
                    styles.push(`;`);
                }
                if (objectStyle.objectGradientIsOn) {
                    styles.push(`background-image: linear-gradient(${objectStyle.objectGradient});`);
                }
            }
            if (app.isPointerCursor && !choice.isNotSelectable && (!choice.isSelectableMultiple || (choice.allowSelectByClick && choice.multipleUseVariable === 0))) {
                styles.push(`cursor: pointer;`);
            }
        } else {
            if (filterStyle.reqFilterBlurIsOn) {
                styles.push(` blur(${filterStyle.reqFilterBlur}px)`);
            }
            if (filterStyle.reqFilterBrightIsOn) {
                styles.push(` brightness(${filterStyle.reqFilterBright}%)`);
            }
            if (filterStyle.reqFilterContIsOn) {
                styles.push(` contrast(${filterStyle.reqFilterCont}%)`);
            }
            if (filterStyle.reqFilterGrayIsOn) {
                styles.push(` grayscale(${filterStyle.reqFilterGray}%)`);
            }
            if (filterStyle.reqFilterHueIsOn) {
                styles.push(` hue-rotate(${filterStyle.reqFilterHue}deg)`);
            }
            if (filterStyle.reqFilterInvertIsOn) {
                styles.push(` invert(${filterStyle.reqFilterInvert}%)`);
            }
            if (filterStyle.reqFilterOpacIsOn) {
                styles.push(` opacity(${filterStyle.reqFilterOpac}%)`);
            }
            if (filterStyle.reqFilterSaturIsOn) {
                styles.push(` saturate(${filterStyle.reqFilterSatur})`);
            }
            if (filterStyle.reqFilterSepiaIsOn) {
                styles.push(` sepia(${filterStyle.reqFilterGray}%)`);
            }
            if (styles.length === filterIndex) {
                styles.splice(filterIndex - 1, 1);
            } else {
                styles.push(`;`);
            }
            if (filterStyle.reqBgColorIsOn) {
                if (bgColorIndex !== 0) {
                    styles.splice(bgColorIndex - 1, 1);
                }
                if (!filterStyle.reqOverlayOnImage) {
                    if (bgImageIndex !== 0) {
                        styles.splice(bgImageIndex - 1, 1);
                    }
                }
                styles.push(`background-color: ${hexToRgba(filterStyle.reqFilterBgColor)};`);
            }
            if (objectStyle.objectGradientIsOn) {
                styles.push(`background-image: linear-gradient(${objectStyle.objectGradientOnReq});`);
            }
        }
        return styles.join(' ');
    });

    let objectImage = $derived.by(() => {
        let styles: string[] = [];
        const suffix = objectImageStyle.objectImgBorderRadiusIsPixels ? 'px' : '%';

        styles.push(`width: ${objectImageStyle.objectImageWidth}%; margin-top: ${objectImageStyle.objectImageMarginTop}%; margin-bottom: ${objectImageStyle.objectImageMarginBottom}%;`);
        if (objectImageStyle.objectImgObjectFillIsOn) {
            styles.push(`object-fit: ${objectImageStyle.objectImgObjectFillStyle}; height: ${row.objectImgObjectFillHeight}px;`);
        }
        styles.push(`border-radius: ${objectImageStyle.objectImgBorderRadiusTopLeft}${suffix} ${objectImageStyle.objectImgBorderRadiusTopRight}${suffix} ${objectImageStyle.objectImgBorderRadiusBottomRight}${suffix} ${objectImageStyle.objectImgBorderRadiusBottomLeft}${suffix};`);
        if (objectImageStyle.objectImgOverflowIsOn) {
            styles.push(`overflow: hidden;`);
        }
        if (objectImageStyle.objectImgBorderIsOn) {
            styles.push(`border: ${objectImageStyle.objectImgBorderWidth}px ${objectImageStyle.objectImgBorderStyle} ${hexToRgba(objectImageStyle.objectImgBorderColor)};`);
        }

        return styles.join(' ');
    });

    let scoreText = $derived.by(() => {
        let style: string[] = [];

        style.push(`font-family: '${textStyle.scoreText}'; font-size: ${textStyle.scoreTextSize}%; text-align: ${textStyle.scoreTextAlign};`);
        style.push(`color: ${hexToRgba(textStyle.scoreTextColor)};`);
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

    let scoreUpdate:string[] = [];

    function objectWidthClass() {
        let objectWidth = (choice.objectWidth || row.objectWidth);
        let objectWidthNum = objectWidthToNum(objectWidth);
        let objectsPerRowNum = app.objectsPerRow === 'col-6' ? 2 : app.objectsPerRow === 'col-4' ? 3 : 4;
        if ($winWidth > 1280) {
            return objectWidth;
        } else if ($winWidth > 720) {
            switch(objectWidthNum) {
                case 1: return 'col-12';
                case 2: return 'col-6';
                case 3: return objectsPerRowNum > 2 ? 'col-4' : app.objectsPerRow;
                case 4: return objectsPerRowNum > 3 ? 'col-3' : app.objectsPerRow;
                default: return app.objectsPerRow;
            }
        } else if ($winWidth > 480) {
            return objectWidthNum === 1 ? 'col-12' : 'col-6';
        } else {
            return 'col-12';
        }
    }

    function selectForceActivate(localChoice: Choice, fChoice: Choice, fRow: Row, num: number) {
        if (!fChoice.isNotSelectable || !localChoice.isNotActiveUnselectable) {
            let isLinked = false;

            if (fChoice.activateOtherChoice && typeof fChoice.activateThisChoice !== 'undefined' && linkedObjects.indexOf(localChoice.id) === -1 && fChoice.activateThisChoice.split(',').some(item => item.split('/ON#')[0] === localChoice.id)) {
                linkedObjects.push(localChoice.id);
                isLinked = true;
            }
            if (fChoice.isSelectableMultiple) {
                if (fChoice.isMultipleUseVariable && typeof fChoice.numMultipleTimesMinus !== 'undefined' && typeof fChoice.numMultipleTimesPluss !== 'undefined') {
                    let count = fChoice.multipleUseVariable;

                    if (num > 0) {
                        for (let i = 0; i < num; i++) {
                            selectedOneMore(fChoice, fRow);
                            count++;
                            if (!localChoice.isAllowDeselect) {
                                fChoice.numMultipleTimesMinus += 1;
                            }
                        }
                    } else if (num < 0) {
                        for (let i = 0; i > (num * -1); i++) {
                            selectedOneLess(fChoice, fRow);
                            count--;
                            if (!localChoice.isAllowDeselect) {
                                fChoice.numMultipleTimesPluss -= 1;
                            }
                        }
                    }
                    if (fChoice.multipleUseVariable !== count) {
                        const limitVal = Math.abs(fChoice.numMultipleTimesMinus - fChoice.numMultipleTimesPluss);

                        if (fChoice.numMultipleTimesMinus > fChoice.numMultipleTimePluss) {
                            const tmpAct = tmpActivatedMap.get(fChoice.id);

                            if (num > 0) {
                                fChoice.numMultipleTimesMinus -= limitVal;
                                if (typeof tmpAct !== 'undefined') {
                                    tmpAct.multiple += limitVal;
                                } else {
                                    tmpActivatedMap.set(fChoice.id, {multiple: limitVal, isAllowDeselect: localChoice.isAllowDeselect || false});
                                }
                            } else if (num < 0) {
                                if (typeof tmpAct !== 'undefined') {
                                    tmpAct.multiple -= limitVal;
                                } else {
                                    tmpActivatedMap.set(fChoice.id, {multiple: -limitVal, isAllowDeselect: localChoice.isAllowDeselect || false});
                                }
                            }
                        }
                    }
                }
            } else {
                if (!fChoice.isActive) activateObject(fChoice, fRow);
                if (!localChoice.isAllowDeselect) fChoice.forcedActivated = true;
                if (typeof fChoice.activatedFrom === 'undefined') fChoice.activatedFrom = 0;
                if (!isLinked) fChoice.activatedFrom++;
            }
            if (!fChoice.isActive) {
                delete fChoice.forcedActivated;
                tmpActivatedMap.set(fChoice.id, {multiple: num, isAllowDeselect: localChoice.isAllowDeselect || false});
            }
        }
    }

    function deselectForceActivate(localChoice: Choice, fChoice: Choice, fRow: Row, num: number) {
        if (fChoice.activateOtherChoice && typeof fChoice.activateThisChoice !== 'undefined' && linkedObjects.indexOf(localChoice.id) === -1 && fChoice.activateThisChoice.split(',').some(item => item.split('/ON#')[0] === localChoice.id)) {
            linkedObjects.push(localChoice.id);
        }
        if (fChoice.isSelectableMultiple) {
            if (fChoice.isMultipleUseVariable && typeof fChoice.numMultipleTimesMinus !== 'undefined' && typeof fChoice.numMultipleTimesPluss !== 'undefined') {
                if (fChoice.isActive) {
                    if (num > 0) {
                        for (let i = 0; i < num; i++) {
                            if (!localChoice.isAllowDeselect) fChoice.numMultipleTimesMinus -= 1;
                            if (!localChoice.isNotDeactivate) {
                                selectedOneLess(fChoice, fRow);
                            }
                        }
                    } else if (num < 0) {
                        for (let i = 0; i > (num * -1); i++) {
                            if (!localChoice.isAllowDeselect) fChoice.numMultipleTimesPluss += 1;
                            if (!localChoice.isNotDeactivate) {
                                selectedOneMore(fChoice, fRow);
                            }
                        }
                    }
                } else {
                    const tmpAct = tmpActivatedMap.get(fChoice.id);
                    let tmpNum = 0;

                    if (typeof tmpAct !== 'undefined') {
                        tmpNum = tmpAct.multiple - num;
                        if (tmpNum === 0) {
                            tmpActivatedMap.delete(fChoice.id);
                        } else {
                            tmpActivatedMap.set(fChoice.id, {multiple: tmpNum, isAllowDeselect: localChoice.isAllowDeselect || false});
                        }
                    } else {
                        tmpActivatedMap.delete(fChoice.id);
                    }
                }
            }
        } else {
            if (typeof fChoice.activatedFrom !== 'undefined') {
                fChoice.activatedFrom--;
                if (fChoice.activatedFrom <= 0 || linkedObjects.indexOf(localChoice.id) !== -1) {
                    if (fChoice.isActive) {
                        delete fChoice.activatedFrom;
                        delete fChoice.forcedActivated;
                        if (!localChoice.isNotDeactivate) deselectObject(fChoice, fRow);
                    } else {
                        tmpActivatedMap.delete(fChoice.id);
                    }
                }
            } else {
                delete fChoice.forcedActivated;
                if (!localChoice.isNotDeactivate && fChoice.isActive) deselectObject(fChoice, fRow);
            }
        }
    }

    function selectForceRandomActivate(localChoice: Choice) {
        if (typeof localChoice.activateThisChoice !== 'undefined') {
            let forceList = localChoice.activateThisChoice.split(',');
            let listMap = new Map<string, number>();
            for (let i = 0; i < forceList.length; i++) {
                let [key, val = '0'] = forceList[i].split('/ON#');
                let num = parseInt(val);
                let group = groupMap.get(key);
                if (typeof group !== 'undefined') {
                    for (let j = 0; j < group.elements.length; j++) {
                        if (!activatedMap.has(group.elements[j])) {
                            listMap.set(group.elements[j], num);
                        }
                    }
                } else {
                    if (!activatedMap.has(key)) {
                        listMap.set(key, num);
                    }
                }
            }
            let listArray = [...listMap.keys()];
            let actNum = Math.min(listArray.length, localChoice.numActivateRandom || 0);
            let repeatNum = actNum;
            for (let i = listArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [listArray[i], listArray[j]] = [listArray[j], listArray[i]];
            }
            let result: string[] = [];
            for (let i = 0; i < actNum;) {
                let id = listArray[i];
                let cMap = choiceMap.get(id);
                if (typeof cMap !== 'undefined') {
                    let rndRow = cMap.row;
                    let rndChoice = cMap.choice;
                    selectForceActivate(localChoice, rndChoice, rndRow, listMap.get(id) || 0);
                    if (!rndChoice.isActive) {
                        if (result.length < actNum && listArray.length > repeatNum) {
                            listArray[i] = listArray[repeatNum++];
                            if (typeof rndChoice.activatedFrom !== 'undefined') {
                                rndChoice.activatedFrom--;
                                if (rndChoice.activatedFrom === 0) tmpActivatedMap.delete(rndChoice.id);
                            }
                            continue;
                        } else {
                            break;
                        }
                    }
                    result.push(id);
                }
                i++;
            }
            
            if (localChoice.isSelectableMultiple) {
                if (typeof localChoice.activatedRandomMul === 'undefined') localChoice.activatedRandomMul = [];
                localChoice.activatedRandomMul[localChoice.multipleUseVariable - 1] = [...result];
            } else {
                localChoice.activatedRandom = [...result];
            }
        }
    }

    function deselectUpdateScore(localChoice: Choice, tmpScores: TempScore, count: number, changedScores = new Set<string>()) {
        const activated = Array.from(activatedMap.keys());

        for (let i = activated.length - 1; i >= 0; i--) {
            const id = activated[i];
            const cMap = choiceMap.get(id);
            if (typeof cMap !== 'undefined') {
                const aRow = cMap.row;
                const aChoice = cMap.choice;
                const thisTmpScores = new SvelteMap<string, number>();
                const addCountSet = new Set<Choice>();
                const removeCountSet = new Set<Choice>();
                let disChoices = new Set<Choice>();
                let isChanged = false;
                let isRevoked = false;
                let idx = localChoice.appliedDisChoices ? localChoice.appliedDisChoices.indexOf(aChoice.id) : -1;
                for (let j = 0; j < aChoice.scores.length; j++) {
                    const aScore = aChoice.scores[j];
                    if (!aScore.isNotRecalculatable) {
                        const point = pointTypeMap.get(aScore.id);
                        if (typeof point !== 'undefined') {
                            if (localChoice.discountOther && aScore.isChangeDiscount && aScore.isActive && typeof aScore.tmpDisScore !== 'undefined') {
                                if (!localChoice.useDiscountCount || (localChoice.useDiscountCount && localChoice.appliedDisChoices)) {
                                    const mul = aChoice.multipleUseVariable;
                                    let remainDiscount = false;

                                    if (localChoice.useDiscountCount && aScore.discountedFrom && aScore.discountedFrom.length > 0) {
                                        if (idx !== -1) {
                                            for (let k = 0; k < aScore.discountedFrom.length; k++) {
                                                const cMap2 = choiceMap.get(aScore.discountedFrom[k]);

                                                if (typeof cMap2 !== 'undefined') {
                                                    const dChoice = cMap2.choice;
                                                    const cnt = dChoice.isSelectableMultiple && dChoice.isMultipleUseVariable && dChoice.stackableDiscount && dChoice.discountCount ? (dChoice.discountCount * dChoice.multipleUseVariable) + Number(localChoice.id === dChoice.id) : dChoice.discountCount;

                                                    if (dChoice.useDiscountCount && dChoice.appliedDisChoices && cnt && cnt > dChoice.appliedDisChoices.length) {
                                                        if (dChoice.id !== localChoice.id) disChoices.add(dChoice);
                                                        remainDiscount = true;
                                                    }
                                                }
                                            }
                                        } else {
                                            remainDiscount = true;
                                        }
                                    }

                                    if (remainDiscount) {
                                        delete aScore.isChangeDiscount;
                                        delete aScore.tmpDisScore;
                                        continue;
                                    }

                                    if (aChoice.isSelectableMultiple && aChoice.isMultipleUseVariable && typeof aChoice.numMultipleTimesMinus !== 'undefined') {
                                        for (let k = mul - 1; k >= 0; k--) {
                                            if (aChoice.isActive) {
                                                if (point.belowZeroNotAllowed && point.startingSum + aScore.tmpDisScore < 0) {
                                                    if (aChoice.forcedActivated && aChoice.isActive) {
                                                        aChoice.forcedActivated = false;
                                                        aChoice.numMultipleTimesMinus--;
                                                        selectedOneLess(aChoice, aRow);
                                                        aChoice.forcedActivated = true;
                                                    } else {
                                                        selectedOneLess(aChoice, aRow);
                                                    }
                                                } else {
                                                    point.startingSum += aScore.tmpDisScore;
                                                }
                                            }
                                        }

                                        if (aChoice.isActive) {
                                            thisTmpScores.set(aScore.id, aScore.tmpDisScore);
                                            delete aScore.isChangeDiscount;
                                            delete aScore.tmpDisScore;
                                        }
                                    } else if (!aChoice.isSelectableMultiple) {
                                        if (point.belowZeroNotAllowed && point.startingSum + aScore.tmpDisScore < 0) {
                                            if (aChoice.forcedActivated) {
                                                delete aChoice.forcedActivated;
                                                if (!aChoice.isAllowDeselect) tmpActivatedMap.set(aChoice.id, {multiple: aChoice.multipleUseVariable});
                                            }
                                            if (aChoice.isSelectableMultiple && aChoice.isMultipleUseVariable) {
                                                for (let k = 0; k < aChoice.multipleUseVariable; k++) {
                                                    if (aChoice.isActive) selectedOneLess(aChoice, aRow);
                                                }
                                            } else {
                                                if (aChoice.isActive) deselectObject(aChoice, aRow);
                                            }
                                        } else {
                                            point.startingSum += aScore.tmpDisScore;
                                            thisTmpScores.set(aScore.id, aScore.tmpDisScore);
                                            delete aScore.isChangeDiscount;
                                            delete aScore.tmpDisScore;
                                        }
                                    }
                                    isChanged = localChoice.id !== aChoice.id;
                                    if (!aScore.discountIsOn) delete aScore.appliedDiscount;
                                    isRevoked = true;
                                }
                            }
                            if (!changedScores.has(aScore.idx)) {
                                const hasScore = localChoice.scores.length > 0;
                                const scoreLeng = localChoice.scores.length || 1;
                                for (let k = 0; k < scoreLeng; k++) {
                                    const lScore = hasScore ? localChoice.scores[k] : null;
                                    const tmpScore = lScore ? (tmpScores.get(lScore.id) || 0) : 0;
                                    const lPoint = lScore ? pointTypeMap.get(lScore.id) : null;
                                    if (!hasScore || hasScore && lPoint) {
                                        if (aChoice.isActive) {
                                            const afterDeselected = checkRequirements(aScore.requireds);
                                            const tmpActivated: SvelteMap<string, ActivatedMap> = new SvelteMap(JSON.parse(JSON.stringify([...activatedMap])));
                                            tmpActivated.set(localChoice.id, {multiple : localChoice.multipleUseVariable});
                                            aRow.currentChoices += 1;
                                            if (lPoint) lPoint.startingSum += tmpScore;
                                            const beforeDeselected = checkRequirements(aScore.requireds, tmpActivated);
                                            aRow.currentChoices -= 1;
                                            if (lPoint) lPoint.startingSum -= tmpScore;
                                            if (beforeDeselected !== afterDeselected) {
                                                let scoreVal = aScore.discountIsOn && typeof aScore.discountScore !== 'undefined' ? aScore.discountScore : aScore.value;
                                                scoreVal = point.allowFloat ? scoreVal : Math.floor(scoreVal);
                                                let isApplied = false;
                                                if (beforeDeselected) {
                                                    if (aChoice.isSelectableMultiple && aChoice.isMultipleUseVariable && typeof aChoice.numMultipleTimesMinus !== 'undefined') {
                                                        const mul = aChoice.multipleUseVariable;

                                                        for (let l = mul - 1; l >= 0; l--) {
                                                            if (typeof aScore.isActiveMul !== 'undefined' && aScore.isActiveMul[k]) {
                                                                if (point.belowZeroNotAllowed && point.startingSum + scoreVal < 0) {
                                                                    if (aChoice.forcedActivated && aChoice.isActive) {
                                                                        aChoice.forcedActivated = false;
                                                                        aChoice.numMultipleTimesMinus--;
                                                                        selectedOneLess(aChoice, aRow);
                                                                        aChoice.forcedActivated = true;
                                                                    } else {
                                                                        selectedOneLess(aChoice, aRow);
                                                                    }
                                                                } else {
                                                                    point.startingSum += scoreVal;
                                                                    thisTmpScores.set(aScore.id, scoreVal);
                                                                    aScore.isActiveMul[l] = false;
                                                                    if (!isApplied) isApplied = true;
                                                                }
                                                            }
                                                        }
                                                    } else if (!aChoice.isSelectableMultiple) {
                                                        if (aScore.isActive) {
                                                            if (point.belowZeroNotAllowed && point.startingSum + scoreVal < 0) {
                                                                if (aChoice.forcedActivated) delete aChoice.forcedActivated;
                                                                deselectObject(aChoice, aRow);
                                                            } else {
                                                                point.startingSum += scoreVal;
                                                                thisTmpScores.set(aScore.id, scoreVal);
                                                                delete aScore.isActive;
                                                                isApplied = true;
                                                            }
                                                        }
                                                    }
                                                    if (isApplied && aScore.discountIsOn && aScore.appliedDiscount && aScore.discountedFrom) {
                                                        for (let l = 0; l < aScore.discountedFrom.length; l++) {
                                                            const dcMap = choiceMap.get(aScore.discountedFrom[l]);

                                                            if (typeof dcMap !== 'undefined') {
                                                                const dChoice = dcMap.choice;

                                                                if (dChoice.useDiscountCount && typeof dChoice.discountCount !== 'undefined' && dChoice.appliedDisChoices && dChoice.appliedDisChoices.indexOf(aChoice.id) !== -1) {
                                                                    delete aScore.appliedDiscount;
                                                                    removeCountSet.add(dChoice);
                                                                    break;
                                                                } else {
                                                                    delete aScore.appliedDiscount;
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                } else {
                                                    if (aChoice.isSelectableMultiple && aChoice.isMultipleUseVariable && typeof aChoice.numMultipleTimesMinus !== 'undefined') {
                                                        const mul = aChoice.multipleUseVariable;
                                                        if (typeof aScore.isActiveMul === 'undefined') aScore.isActiveMul = [];
                                                        for (let l = mul - 1; l >= 0; l--) {
                                                            if (!aScore.isActiveMul[l]) {
                                                                if (point.belowZeroNotAllowed && point.startingSum + scoreVal < 0) {
                                                                    if (aChoice.forcedActivated && aChoice.isActive) {
                                                                        aChoice.forcedActivated = false;
                                                                        aChoice.numMultipleTimesMinus--;
                                                                        selectedOneLess(aChoice, aRow);
                                                                        aChoice.forcedActivated = true;
                                                                    } else {
                                                                        selectedOneLess(aChoice, aRow);
                                                                    }
                                                                } else {
                                                                    point.startingSum -= scoreVal;
                                                                    thisTmpScores.set(aScore.id, scoreVal);
                                                                    aScore.isActiveMul[l] = true;
                                                                    if (!isApplied) isApplied = true;
                                                                }
                                                            }
                                                        }
                                                    } else if (!aChoice.isSelectableMultiple) {
                                                        if (!aScore.isActive) {
                                                            if (point.belowZeroNotAllowed && point.startingSum - scoreVal < 0) {
                                                                if (aChoice.forcedActivated) delete aChoice.forcedActivated;
                                                                deselectObject(aChoice, aRow);
                                                            } else {
                                                                point.startingSum -= scoreVal;
                                                                thisTmpScores.set(aScore.id, scoreVal);
                                                                aScore.isActive = true;
                                                                isApplied = true;
                                                            }
                                                        }
                                                    }
                                                    if (isApplied && aScore.discountIsOn && !aScore.appliedDiscount && aScore.discountedFrom) {
                                                        for (let l = 0; l < aScore.discountedFrom.length; l++) {
                                                            const dcMap = choiceMap.get(aScore.discountedFrom[l]);

                                                            if (typeof dcMap !== 'undefined') {
                                                                const dChoice = dcMap.choice;

                                                                if (dChoice.useDiscountCount && typeof dChoice.discountCount !== 'undefined') {
                                                                    const count = dChoice.isSelectableMultiple && dChoice.isMultipleUseVariable && dChoice.stackableDiscount ? dChoice.discountCount * dChoice.multipleUseVariable : dChoice.discountCount;
                                                                    if (!dChoice.appliedDisChoices) dChoice.appliedDisChoices = [];
                                                                    if (count > dChoice.appliedDisChoices.length || dChoice.appliedDisChoices.indexOf(aChoice.id) !== -1) {
                                                                        aScore.appliedDiscount = true;
                                                                        addCountSet.add(dChoice);
                                                                        break;
                                                                    }
                                                                } else {
                                                                    aScore.appliedDiscount = true;
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                if (!isChanged) {
                                                    isChanged = true;
                                                }
                                                changedScores.add(aScore.idx);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (disChoices.size > 0) {
                    const dChoices = Array.from(disChoices);
                    for (let j = 0; j < dChoices.length; j++) {
                        const dChoice = dChoices[j];
                        
                        if (!dChoice.appliedDisChoices) dChoice.appliedDisChoices = [];
                        if (dChoice.appliedDisChoices.indexOf(aChoice.id) === -1) dChoice.appliedDisChoices.push(aChoice.id);
                        if (idx !== -1) localChoice.appliedDisChoices!.splice(idx, 1);
                    }
                }
                if (isRevoked && localChoice.appliedDisChoices && idx !== -1) {
                    localChoice.appliedDisChoices.splice(idx, 1);
                }
                if (removeCountSet.size > 0) {
                    removeCountSet.forEach((dChoice) => {
                        if (dChoice.appliedDisChoices) {
                            if (!dChoice.scores.some(score => score.appliedDiscount)) {
                                const index = dChoice.appliedDisChoices.indexOf(aChoice.id);

                                if (index !== -1) dChoice.appliedDisChoices.splice(index, 1);
                            }
                        }
                    });
                }
                if (addCountSet.size > 0) {
                    addCountSet.forEach((dChoice) => {
                        if (dChoice.appliedDisChoices) {
                            if (dChoice.appliedDisChoices.indexOf(aChoice.id) === -1) dChoice.appliedDisChoices.push(aChoice.id);
                        }
                    });
                }
                if (isChanged) {
                    scoreUpdate.length === 0 ? scoreUpdate.push(`Scores Updated On: ${aChoice.title}`) : scoreUpdate.push(`, ${aChoice.title}`);
                    deselectUpdateScore(aChoice, thisTmpScores, count + 1, changedScores);
                }
            }
        }
        if (count === 0) {
            if (scoreUpdate.length > 0 && !app.hideScoresUpdated) {
                const tempDiv = document.createElement('div');
        
                tempDiv.innerHTML = scoreUpdate.join('');
                snackbarVariables.labelText = tempDiv.textContent;
                snackbarVariables.isOpen = true;
            }
            scoreUpdate.splice(0);
        }
    }

    function selectUpdateScore(localChoice: Choice, tmpScores: TempScore, count: number, changedScores = new Set<string>()) {
        const activated = Array.from(activatedMap.keys());

        for (let i = 0; i < activated.length; i++) {
            const id = activated[i];
            const cMap = choiceMap.get(id);
            if (typeof cMap !== 'undefined') {
                const aRow = cMap.row;
                const aChoice = cMap.choice;
                const thisTmpScores = new SvelteMap<string, number>();
                const addCountSet = new Set<Choice>();
                const removeCountSet = new Set<Choice>();
                let isDiscounted = false;
                let isChanged = false;
                if (localChoice.useDiscountCount && !localChoice.appliedDisChoices) localChoice.appliedDisChoices = [];
                for (let j = 0; j < aChoice.scores.length; j++) {
                    const aScore = aChoice.scores[j];
                    if (!aScore.isNotRecalculatable) {
                        const point = pointTypeMap.get(aScore.id);
                        if (typeof point !== 'undefined') {
                            if (localChoice.discountOther && aScore.isChangeDiscount && aScore.isActive && typeof aScore.tmpDisScore !== 'undefined' && aChoice.id !== localChoice.id) {
                                const mul = aChoice.multipleUseVariable;
                                const count = localChoice.isSelectableMultiple && localChoice.isMultipleUseVariable && localChoice.stackableDiscount && localChoice.discountCount ? localChoice.discountCount * localChoice.multipleUseVariable : localChoice.discountCount;

                                if (!localChoice.useDiscountCount || (localChoice.useDiscountCount && count && count > localChoice.appliedDisChoices!.length)) {
                                    if (aChoice.isSelectableMultiple && aChoice.isMultipleUseVariable && typeof aChoice.numMultipleTimesMinus !== 'undefined') {
                                        for (let k = mul - 1; k >= 0; k--) {
                                            if (aChoice.isActive) {
                                                if (point.belowZeroNotAllowed && point.startingSum + aScore.tmpDisScore < 0) {
                                                    if (aChoice.forcedActivated && aChoice.isActive) {
                                                        aChoice.forcedActivated = false;
                                                        aChoice.numMultipleTimesMinus--;
                                                        selectedOneLess(aChoice, aRow);
                                                        aChoice.forcedActivated = true;
                                                    } else {
                                                        selectedOneLess(aChoice, aRow);
                                                    }
                                                } else {
                                                    point.startingSum += aScore.tmpDisScore;
                                                }
                                            }
                                        }

                                        if (aChoice.isActive) {
                                            thisTmpScores.set(aScore.id, aScore.tmpDisScore);
                                            delete aScore.isChangeDiscount;
                                            delete aScore.tmpDisScore;
                                        }
                                    } else if (!aChoice.isSelectableMultiple) {
                                        if (point.belowZeroNotAllowed && point.startingSum + aScore.tmpDisScore < 0) {
                                            if (aChoice.forcedActivated) delete aChoice.forcedActivated;
                                            deselectObject(aChoice, aRow);
                                        } else {
                                            point.startingSum += aScore.tmpDisScore;
                                            thisTmpScores.set(aScore.id, aScore.tmpDisScore);
                                            delete aScore.isChangeDiscount;
                                            delete aScore.tmpDisScore;
                                        }
                                    }
                                    isChanged = true;
                                    if (aChoice.isActive) {
                                        aScore.appliedDiscount = true;
                                        isDiscounted = true;
                                    }
                                }
                            }
                            if (!changedScores.has(aScore.idx)) {
                                const hasScore = localChoice.scores.length > 0;
                                const scoreLeng = localChoice.scores.length || 1;
                                for (let k = 0; k < scoreLeng; k++) {
                                    const lScore = hasScore ? localChoice.scores[k] : null;
                                    const tmpScore = lScore ? (tmpScores.get(lScore.id) || 0) : 0;
                                    const lPoint = lScore ? pointTypeMap.get(lScore.id) : null;
                                    if (!hasScore || hasScore && lPoint) {
                                        if (aChoice.isActive && !aScore.isChanged) {
                                            const afterSelected = checkRequirements(aScore.requireds);
                                            const tmpActivated: SvelteMap<string, ActivatedMap> = new SvelteMap(JSON.parse(JSON.stringify([...activatedMap])));
                                            tmpActivated.delete(localChoice.id);
                                            aRow.currentChoices -= 1;
                                            if (lPoint) lPoint.startingSum += tmpScore;
                                            const beforeSelected = checkRequirements(aScore.requireds, tmpActivated);
                                            aRow.currentChoices += 1;
                                            if (lPoint) lPoint.startingSum -= tmpScore;
                                            if (beforeSelected !== afterSelected) {
                                                let scoreVal = aScore.discountIsOn && typeof aScore.discountScore !== 'undefined' ? aScore.discountScore : aScore.value;
                                                scoreVal = point.allowFloat ? scoreVal : Math.floor(scoreVal);
                                                let isApplied = false;
                                                if (beforeSelected) {
                                                    if (aChoice.isSelectableMultiple && aChoice.isMultipleUseVariable && typeof aChoice.numMultipleTimesMinus !== 'undefined') {
                                                        const mul = aChoice.multipleUseVariable;
                                                        
                                                        for (let l = mul - 1; l >= 0; l--) {
                                                            if (typeof aScore.isActiveMul !== 'undefined' && aScore.isActiveMul[l]) {
                                                                if (point.belowZeroNotAllowed && point.startingSum + scoreVal < 0) {
                                                                    if (aChoice.forcedActivated && aChoice.isActive) {
                                                                        aChoice.forcedActivated = false;
                                                                        aChoice.numMultipleTimesMinus--;
                                                                        selectedOneLess(aChoice, aRow);
                                                                        aChoice.forcedActivated = true;
                                                                    } else {
                                                                        selectedOneLess(aChoice, aRow);
                                                                    }
                                                                } else {
                                                                    point.startingSum += scoreVal;
                                                                    thisTmpScores.set(aScore.id, scoreVal);
                                                                    aScore.isActiveMul[l] = false;
                                                                    if (!isApplied) isApplied = true;
                                                                }
                                                            }
                                                        }
                                                    } else if (!aChoice.isSelectableMultiple) {
                                                        if (aScore.isActive) {
                                                            if (point.belowZeroNotAllowed && point.startingSum + scoreVal < 0) {
                                                                if (aChoice.forcedActivated) delete aChoice.forcedActivated;
                                                                deselectObject(aChoice, aRow);
                                                            } else {
                                                                point.startingSum += scoreVal;
                                                                thisTmpScores.set(aScore.id, scoreVal);
                                                                delete aScore.isActive;
                                                                isApplied = true;
                                                            }
                                                        }
                                                    }
                                                    if (isApplied && aScore.discountIsOn && aScore.appliedDiscount && aScore.discountedFrom) {
                                                        for (let l = 0; l < aScore.discountedFrom.length; l++) {
                                                            const dcMap = choiceMap.get(aScore.discountedFrom[l]);

                                                            if (typeof dcMap !== 'undefined') {
                                                                const dChoice = dcMap.choice;

                                                                if (dChoice.useDiscountCount && typeof dChoice.discountCount !== 'undefined' && dChoice.appliedDisChoices && dChoice.appliedDisChoices.indexOf(aChoice.id) !== -1) {
                                                                    delete aScore.appliedDiscount;
                                                                    removeCountSet.add(dChoice);
                                                                    break;
                                                                } else {
                                                                    delete aScore.appliedDiscount;
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                } else {
                                                    if (aChoice.isSelectableMultiple && aChoice.isMultipleUseVariable && typeof aChoice.numMultipleTimesMinus !== 'undefined') {
                                                        const mul = aChoice.multipleUseVariable;
                                                        if (typeof aScore.isActiveMul === 'undefined') aScore.isActiveMul = [];
                                                        for (let l = mul - 1; l >= 0; l--) {
                                                            if (!aScore.isActiveMul[l]) {
                                                                if (point.belowZeroNotAllowed && point.startingSum + scoreVal < 0) {
                                                                    if (aChoice.forcedActivated && aChoice.isActive) {
                                                                        aChoice.forcedActivated = false;
                                                                        aChoice.numMultipleTimesMinus--;
                                                                        selectedOneLess(aChoice, aRow);
                                                                        aChoice.forcedActivated = true;
                                                                    } else {
                                                                        selectedOneLess(aChoice, aRow);
                                                                    }
                                                                } else {
                                                                    point.startingSum -= scoreVal;
                                                                    thisTmpScores.set(aScore.id, scoreVal);
                                                                    aScore.isActiveMul[l] = true;
                                                                    if (!isApplied) isApplied = true;
                                                                }
                                                            }
                                                        }
                                                    } else if (!aChoice.isSelectableMultiple) {
                                                        if (!aScore.isActive) {
                                                            if (point.belowZeroNotAllowed && point.startingSum - scoreVal < 0) {
                                                                if (aChoice.forcedActivated) delete aChoice.forcedActivated;
                                                                deselectObject(aChoice, aRow);
                                                            } else {
                                                                point.startingSum -= scoreVal;
                                                                thisTmpScores.set(aScore.id, scoreVal);
                                                                aScore.isActive = true;
                                                                isApplied = true;
                                                            }
                                                        }
                                                    }
                                                    if (isApplied && aScore.discountIsOn && !aScore.appliedDiscount && aScore.discountedFrom) {
                                                        for (let l = 0; l < aScore.discountedFrom.length; l++) {
                                                            const dcMap = choiceMap.get(aScore.discountedFrom[l]);

                                                            if (typeof dcMap !== 'undefined') {
                                                                const dChoice = dcMap.choice;

                                                                if (dChoice.useDiscountCount && typeof dChoice.discountCount !== 'undefined') {
                                                                    const count = dChoice.isSelectableMultiple && dChoice.isMultipleUseVariable && dChoice.stackableDiscount ? dChoice.discountCount * dChoice.multipleUseVariable : dChoice.discountCount;
                                                                    if (!dChoice.appliedDisChoices) dChoice.appliedDisChoices = [];
                                                                    if (count > dChoice.appliedDisChoices.length || dChoice.appliedDisChoices.indexOf(aChoice.id) !== -1) {
                                                                        aScore.appliedDiscount = true;
                                                                        addCountSet.add(dChoice);
                                                                        break;
                                                                    }
                                                                } else {
                                                                    aScore.appliedDiscount = true;
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                if (!isChanged) {
                                                    isChanged = true;
                                                }
                                                changedScores.add(aScore.idx);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (isDiscounted && localChoice.appliedDisChoices) {
                    if (localChoice.appliedDisChoices.indexOf(aChoice.id) === -1) localChoice.appliedDisChoices.push(aChoice.id);
                }
                if (removeCountSet.size > 0) {
                    removeCountSet.forEach((dChoice) => {
                        if (dChoice.appliedDisChoices) {
                            if (!dChoice.scores.some(score => score.appliedDiscount)) {
                                const index = dChoice.appliedDisChoices.indexOf(aChoice.id);

                                if (index !== -1) dChoice.appliedDisChoices.splice(index, 1);
                            }
                        }
                    });
                }
                if (addCountSet.size > 0) {
                    addCountSet.forEach((dChoice) => {
                        if (dChoice.appliedDisChoices) {
                            if (dChoice.appliedDisChoices.indexOf(aChoice.id) === -1) dChoice.appliedDisChoices.push(aChoice.id);
                        }
                    });
                }
                if (isChanged) {
                    scoreUpdate.length === 0 ? scoreUpdate.push(`Scores Updated On: ${aChoice.title}`) : scoreUpdate.push(`, ${aChoice.title}`);
                    selectUpdateScore(aChoice, thisTmpScores, count + 1, changedScores);
                }
            }
        }
        if (count === 0) {
            if (scoreUpdate.length > 0 && !app.hideScoresUpdated) {
                const tempDiv = document.createElement('div');
        
                tempDiv.innerHTML = scoreUpdate.join('');
                snackbarVariables.labelText = tempDiv.textContent;
                snackbarVariables.isOpen = true;
            }
            scoreUpdate.splice(0);
        }
    }

    function activateTempChoices() {
        let isActivated = false;
        Array.from(tmpActivatedMap.entries()).forEach(([id, val]) => {
            const cMap = choiceMap.get(id);
            if (typeof cMap !== 'undefined') {
                const aRow = cMap.row;
                const aChoice = cMap.choice;
                if (!aChoice.isActive) {
                    activateObject(aChoice, aRow);
                    if (aChoice.isActive) {
                        tmpActivatedMap.delete(id);
                        isActivated = true;
                        if (!val.isAllowDeselect) aChoice.forcedActivated = true;
                    }
                }
            }
        });
        if (isActivated) activateTempChoices();
    }

    function activateObject(localChoice: Choice, localRow: Row, e?: MouseEvent, isManually: boolean = false) {
        let origRow = localRow;
        if (localRow.isResultRow || localRow.isGroupRow) {
            const cMap = choiceMap.get(localChoice.id);

            if (typeof cMap !== 'undefined') {
                origRow = cMap.row;
            }
        }
        if (localChoice.isSelectableMultiple) {
            if (localChoice.id === choice.id && localChoice.allowSelectByClick && localChoice.multipleUseVariable === 0) {
                if (e && e.target) {
                    const target = e.target as HTMLElement;

                    if (target.classList.contains('counter-icons') || target.classList.contains('mdi-plus') || target.classList.contains('mdi-minus') || target.classList.contains('mdc-slider')) {
                        return;
                    }
                }
                selectedOneMore(localChoice, origRow);
            }
        } else {
            if (checkRequirements(localChoice.requireds) && !localRow.isInfoRow && (!isManually || !localChoice.isNotSelectable) && !localChoice.forcedActivated) {
                if (localChoice.isActive) {
                    if (!localChoice.selectOnce) deselectObject(localChoice, origRow);
                } else {
                    selectObject(localChoice, origRow);
                }
            }
        }
    }

    function deselectObject(localChoice: Choice, localRow: Row) {
        const pointCheck = checkPoints(localChoice, false);
        if (pointCheck) {
            const deselectProcess = () => {
                const tmpScores = new SvelteMap<string, number>();
                let countSet = new Set<Choice>();
                for (let i = 0; i < localChoice.scores.length; i++) {
                    const score = localChoice.scores[i];
                    if (checkRequirements(score.requireds) && score.isActive || score.isActive) {
                        const point = pointTypeMap.get(score.id);
                        if (typeof point !== 'undefined') {
                            let val = score.value;
                            if (score.discountIsOn && typeof score.discountScore !== 'undefined' && score.appliedDiscount) {
                                if (score.discountedFrom && score.discountedFrom.length > 0) {
                                    for (let j = 0; j < score.discountedFrom.length; j++) {
                                        const cMap = choiceMap.get(score.discountedFrom[j]);

                                        if (typeof cMap !== 'undefined') {
                                            const dChoice = cMap.choice;

                                            if (dChoice.useDiscountCount && typeof dChoice.discountCount !== 'undefined' && dChoice.appliedDisChoices && dChoice.appliedDisChoices.length > 0) {
                                                countSet.add(dChoice);
                                                break;
                                            }
                                        }
                                    }
                                }
                                val = score.discountScore;
                            }
                            val = point.allowFloat ? val : Math.floor(val);
                            point.startingSum += val;
                            let tmpScore = tmpScores.get(score.id);
                            if (typeof tmpScore !== 'undefined') {
                                tmpScores.set(score.id, -val + tmpScore);
                            } else {
                                tmpScores.set(score.id, -val);
                            }
                            delete score.isActive;
                            delete score.setValue;
                            delete score.appliedDiscount
                        }
                    } else {
                        delete score.setValue;
                        delete score.appliedDiscount;
                    }
                }

                if (countSet.size > 0) {
                    countSet.forEach((dChoice) => {
                        if (dChoice.appliedDisChoices) {
                            const index = dChoice.appliedDisChoices.indexOf(localChoice.id);

                            if (index !== -1) dChoice.appliedDisChoices.splice(index, 1);
                        }
                    });
                }

                if (localChoice.activateOtherChoice && typeof localChoice.activateThisChoice !== 'undefined') {
                    if (localChoice.isActivateRandom && typeof localChoice.activatedRandom !== 'undefined') {
                        for (let i = 0; i < localChoice.activatedRandom.length; i++) {
                            const cMap = choiceMap.get(localChoice.activatedRandom[i]);
                            if (typeof cMap !== 'undefined') {
                                const fRow = cMap.row;
                                const fChoice = cMap.choice;
                                deselectForceActivate(localChoice, fChoice, fRow, 0);
                            }
                        }
                        delete localChoice.activatedRandom;
                    } else {
                        const list = localChoice.activateThisChoice.split(',');
                        for (let i = 0; i < list.length; i++) {
                            const item = list[i].split('/ON#');
                            const forceNum = item.length > 1 ? parseInt(item[1]) : 0;
                            const cMap = choiceMap.get(item[0]);
                            if (typeof cMap !== 'undefined') {
                                const fRow = cMap.row;
                                const fChoice = cMap.choice;
                                deselectForceActivate(localChoice, fChoice, fRow, forceNum);
                            } else {
                                const groupData = groupMap.get(item[0]);
                                if (typeof groupData !== 'undefined') {
                                    const groupEle = groupData.elements;
                                    for (let j = 0; j < groupEle.length; j++) {
                                        const cMap = choiceMap.get(groupEle[j]);
                                        if (typeof cMap !== 'undefined') {
                                            const fRow = cMap.row;
                                            const fChoice = cMap.choice;
                                            deselectForceActivate(localChoice, fChoice, fRow, forceNum);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                if (localChoice.discountOther) {
                    if (typeof localChoice.discountOperator !== 'undefined' && typeof localChoice.discountValue !== 'undefined') {
                        if (typeof localChoice.discountPointTypes === 'undefined') localChoice.discountPointTypes = [];
                        if (localChoice.isDisChoices) {
                            const dList = new Set<string>();
                            if (typeof localChoice.discountRows !== 'undefined') {
                                for (let i = 0; i < localChoice.discountRows.length; i++) {
                                    const dRow = rowMap.get(localChoice.discountRows[i]);
                                    if (typeof dRow !== 'undefined') {
                                        for (let j = 0; j < dRow.objects.length; j++) {
                                            const dChoice = dRow.objects[j];
                                            deselectDiscount(localChoice, dChoice);
                                            dList.add(dChoice.id);
                                        }
                                    }
                                }
                            }
                            if (typeof localChoice.discountChoices !== 'undefined') {
                                for (let i = 0; i < localChoice.discountChoices.length; i++) {
                                    if (!dList.has(localChoice.discountChoices[i])) {
                                        const cMap = choiceMap.get(localChoice.discountChoices[i]);
                                        if (typeof cMap !== 'undefined') {
                                            deselectDiscount(localChoice, cMap.choice);
                                        }
                                    }
                                }
                            }
                        } else {
                            if (typeof localChoice.discountGroups !== 'undefined') {
                                for (let i = 0; i < localChoice.discountGroups.length; i++) {
                                    const groupData = groupMap.get(localChoice.discountGroups[i]);
                                    if (typeof groupData !== 'undefined') {
                                        for (let j = 0; j < groupData.elements.length; j++) {
                                            const cMap = choiceMap.get(groupData.elements[j]);
                                            if (typeof cMap !== 'undefined') {
                                                deselectDiscount(localChoice, cMap.choice);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                
                localChoice.isActive = false;
                localRow.currentChoices -= 1;
                activatedMap.delete(localChoice.id);

                Array.from(activatedMap.entries()).forEach(([id, val]) => {
                    const cMap = choiceMap.get(id);
                    if (typeof cMap !== 'undefined') {
                        const aRow = cMap.row;
                        const aChoice = cMap.choice;
                        if (aChoice.id !== localChoice.id) {
                            if (!checkRequirements(aChoice.requireds)) {
                                if (aChoice.forcedActivated) {
                                    delete aChoice.forcedActivated;
                                    if (!aChoice.isAllowDeselect) tmpActivatedMap.set(aChoice.id, {multiple: val.multiple});
                                }
                                if (val.multiple === 0) {
                                    if (aChoice.isActive) deselectObject(aChoice, aRow);
                                } else if (val.multiple > 0) {
                                    for (let i = 0; i < val.multiple; i++) {
                                        if (aChoice.isActive) selectedOneLess(aChoice, aRow);
                                    }
                                }
                            }
                        }
                    }
                });

                if (localChoice.multiplyPointtypeIsOnCheck && typeof localChoice.pointTypeToMultiply !== 'undefined') {
                    let idx = 0;
                    for (let i = 0; i < localChoice.pointTypeToMultiply.length; i++) {
                        let point = pointTypeMap.get(localChoice.pointTypeToMultiply[i]);

                        if (typeof point !== 'undefined') {
                            for (let j = mdObjects.length - 1; j >= 0; j--) {
                                let mdChoice = mdObjects[j];

                                if (mdChoice.multiplyPointtypeIsOnCheck && typeof mdChoice.startingSumAtMultiply !== 'undefined') {
                                    let val = mdChoice.startingSumAtMultiply[i].value * mdChoice.startingSumAtMultiply[i].calcVal;
                                    val = point.allowFloat ? val : Math.floor(val);
                                    point.startingSum -= val;
                                    point.startingSum += mdChoice.startingSumAtMultiply[i].value;
                                }
                                if (mdChoice.dividePointtypeIsOnCheck && typeof mdChoice.startingSumAtDivide !== 'undefined') {
                                    let val = mdChoice.startingSumAtDivide[i].value / mdChoice.startingSumAtDivide[i].calcVal;
                                    val = point.allowFloat ? val : Math.floor(val);
                                    point.startingSum -= val;
                                    point.startingSum += mdChoice.startingSumAtDivide[i].value;
                                }
                                if (mdChoice.id === localChoice.id) {
                                    idx = j;
                                    break;
                                }
                            }
                            for (let j = idx + 1;  j < mdObjects.length; j++) {
                                let mdChoice = mdObjects[j];

                                if (mdChoice.multiplyPointtypeIsOnCheck && typeof mdChoice.startingSumAtMultiply !== 'undefined') {
                                    mdChoice.startingSumAtMultiply[i].value = point.startingSum;
                                    point.startingSum *= mdChoice.startingSumAtMultiply[i].calcVal;
                                    point.startingSum = point.allowFloat ? point.startingSum : Math.floor(point.startingSum);
                                } 
                                if (mdChoice.dividePointtypeIsOnCheck && typeof mdChoice.startingSumAtDivide !== 'undefined') {
                                    mdChoice.startingSumAtDivide[i].value = point.startingSum;
                                    point.startingSum /= mdChoice.startingSumAtDivide[i].calcVal;
                                    point.startingSum = point.allowFloat ? point.startingSum : Math.floor(point.startingSum);
                                }
                            }
                        }
                    }

                    delete localChoice.multiplyPointtypeIsOnCheck;
                    delete localChoice.startingSumAtMultiply;
                    if (!localChoice.dividePointtypeIsOnCheck) mdObjects.splice(idx, 1);
                }

                if (localChoice.dividePointtypeIsOnCheck && typeof localChoice.pointTypeToDivide !== 'undefined') {
                    let idx = 0;
                    for (let i = 0; i < localChoice.pointTypeToDivide.length; i++) {
                        let point = pointTypeMap.get(localChoice.pointTypeToDivide[i]);

                        if (typeof point !== 'undefined') {
                            for (let j = mdObjects.length - 1; j >= 0; j--) {
                                let mdChoice = mdObjects[j];

                                if (mdChoice.multiplyPointtypeIsOnCheck && typeof mdChoice.startingSumAtMultiply !== 'undefined') {
                                    let val = mdChoice.startingSumAtMultiply[i].value * mdChoice.startingSumAtMultiply[i].calcVal;
                                    val = point.allowFloat ? val : Math.floor(val);
                                    point.startingSum -= val;
                                    point.startingSum += mdChoice.startingSumAtMultiply[i].value;
                                }
                                if (mdChoice.dividePointtypeIsOnCheck && typeof mdChoice.startingSumAtDivide !== 'undefined') {
                                    let val = mdChoice.startingSumAtDivide[i].value / mdChoice.startingSumAtDivide[i].calcVal;
                                    val = point.allowFloat ? val : Math.floor(val);
                                    point.startingSum -= val;
                                    point.startingSum += mdChoice.startingSumAtDivide[i].value;
                                }
                                if (mdChoice.id === localChoice.id) {
                                    idx = j;
                                    break;
                                }
                            }
                            for (let j = idx + 1;  j < mdObjects.length; j++) {
                                let mdChoice = mdObjects[j];

                                if (mdChoice.multiplyPointtypeIsOnCheck && typeof mdChoice.startingSumAtMultiply !== 'undefined') {
                                    mdChoice.startingSumAtMultiply[i].value = point.startingSum;
                                    point.startingSum *= mdChoice.startingSumAtMultiply[i].calcVal;
                                    point.startingSum = point.allowFloat ? point.startingSum : Math.floor(point.startingSum);
                                }
                                if (mdChoice.dividePointtypeIsOnCheck && typeof mdChoice.startingSumAtDivide !== 'undefined') {
                                    mdChoice.startingSumAtDivide[i].value = point.startingSum;
                                    point.startingSum /= mdChoice.startingSumAtDivide[i].calcVal;
                                    point.startingSum = point.allowFloat ? point.startingSum : Math.floor(point.startingSum);
                                }
                            }
                        }
                    }

                    delete localChoice.dividePointtypeIsOnCheck;
                    delete localChoice.startingSumAtDivide;
                    mdObjects.splice(idx, 1);
                }

                if (localChoice.isChangeVariables && typeof localChoice.changedVariables !== 'undefined') {
                    for (let i = 0; i < localChoice.changedVariables.length; i++) {
                        const variable = variableMap.get(localChoice.changedVariables[i]);
                        if (typeof variable !== 'undefined') {
                            if (localChoice.changeType === '1') {
                                variable.isTrue = false;
                            } else if (localChoice.changeType === '2') {
                                variable.isTrue = true;
                            } else if (localChoice.changeType === '3') {
                                variable.isTrue = !variable.isTrue;
                            }
                        }
                    }
                }

                if (localChoice.addToAllowChoice && typeof localChoice.idOfAllowChoice !== 'undefined' && typeof localChoice.numbAddToAllowChoice !== 'undefined') {
                    for (let i = 0; i < localChoice.idOfAllowChoice.length; i++) {
                        const aRow = rowMap.get(localChoice.idOfAllowChoice[i]);
                        if (typeof aRow !== 'undefined') {
                            aRow.allowedChoices -= localChoice.numbAddToAllowChoice;
                            if (aRow.allowedChoices > 0 && aRow.currentChoices >= aRow.allowedChoices) {
                                for (let j = 0; j < aRow.objects.length; j++) {
                                    const thisChoice = aRow.objects[j];
                                    if (thisChoice.isActive) {
                                        if (!thisChoice.forcedActivated) {
                                            if (thisChoice.isSelectableMultiple) {
                                                let counter = thisChoice.multipleUseVariable;
                                                for (let k = 0; k < counter; k++) {
                                                    selectedOneLess(thisChoice, aRow);
                                                }
                                            } else {
                                                deselectObject(thisChoice, aRow);
                                            }
                                        }
                                    }    
                                    if (aRow.allowedChoices >= aRow.currentChoices) {
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }

                if (localChoice.textfieldIsOn && typeof localChoice.idOfTheTextfieldWord !== 'undefined' && typeof localChoice.wordChangeSelect !== 'undefined') {
                    const word = wordMap.get(localChoice.idOfTheTextfieldWord);
                    if (typeof word !== 'undefined') {
                        word.replaceText = typeof localChoice.wordChangeDeselect === 'undefined' ? '' : localChoice.wordChangeDeselect;
                    }
                }

                if (localChoice.isImageUpload) {
                    if (typeof localChoice.defaultImage !== 'undefined') localChoice.image = localChoice.defaultImage;
                }

                if (localChoice.backpackBtnRequirement) {
                    if (typeof app.btnBackpackIsOn !== 'undefined') {
                        app.btnBackpackIsOn -= 1;
                    }
                }

                if (localChoice.showAllAddons) {
                    if (typeof app.showAllAddons !== 'undefined') {
                        app.showAllAddons -= 1;
                    }
                }

                if (localChoice.changeBackground) {
                    if (localChoice.changeBgImage) {
                        if (typeof app.bgImageStack !== 'undefined') {
                            const idx = app.bgImageStack.findIndex(item => item.id === localChoice.id);
                            if (idx !== -1) app.bgImageStack.splice(idx, 1);

                            const leng = app.bgImageStack.length;
                            if (leng > 0) {
                                app.styling.backgroundImage = app.bgImageStack[leng - 1].data;
                            } else {
                                app.styling.backgroundImage = app.defaultBgImage || '';
                                delete app.bgImageStack;
                            }
                        }
                    } else {
                        if (typeof localChoice.changedBgColorCode !== 'undefined') {
                            if (typeof app.bgColorStack !== 'undefined') {
                                const idx = app.bgColorStack.findIndex(item => item.id === localChoice.id);
                                if (idx !== -1) app.bgColorStack.splice(idx, 1);

                                const leng = app.bgColorStack.length;
                                if (leng > 0) {
                                    app.styling.backgroundColor = app.bgColorStack[leng - 1].data;
                                } else {
                                    app.styling.backgroundColor = app.defaultBgColor || '#FFFFFFFF';
                                    delete app.bgColorStack;
                                }
                            }
                        }
                    }
                }
                
                if (localChoice.changePointBar) {
                    if (localChoice.changeBarBgColorIsOn && typeof localChoice.changedBarBgColor !== 'undefined') {
                        if (typeof app.barBgColorStack !== 'undefined') {
                            const idx = app.barBgColorStack.findIndex(item => item.id === localChoice.id);
                            if (idx !== -1) app.barBgColorStack.splice(idx, 1);

                            const leng = app.barBgColorStack.length;
                            if (leng > 0) {
                                app.styling.barBackgroundColor = app.barBgColorStack[leng - 1].data;
                            } else {
                                app.styling.barBackgroundColor = app.defaultBarBgColor || '#FFFFFFFF';
                                delete app.barBgColorStack;
                            }
                        }
                    }
                    if (localChoice.changeBarIconColorIsOn && typeof localChoice.changedBarIconColor !== 'undefined') {
                        if (typeof app.barIconColorStack !== 'undefined') {
                            const idx = app.barIconColorStack.findIndex(item => item.id === localChoice.id);
                            if (idx !== -1) app.barIconColorStack.splice(idx, 1);

                            const leng = app.barIconColorStack.length;
                            if (leng > 0) {
                                app.styling.barIconColor = app.barIconColorStack[leng - 1].data;
                            } else {
                                app.styling.barIconColor = app.defaultBarIconColor || '#0000008A';
                                delete app.barIconColorStack;
                            }
                        }
                    }
                    if (localChoice.changeBarTextColorIsOn && typeof localChoice.changedBarTextColor !== 'undefined') {
                        if (typeof app.barTextColorStack !== 'undefined') {
                            const idx = app.barTextColorStack.findIndex(item => item.id === localChoice.id);
                            if (idx !== -1) app.barTextColorStack.splice(idx, 1);

                            const leng = app.barTextColorStack.length;
                            if (leng > 0) {
                                app.styling.barTextColor = app.barTextColorStack[leng - 1].data;
                            } else {
                                app.styling.barTextColor = app.defaultBarIconColor || '#000000';
                                delete app.barTextColorStack;
                            }
                        }
                    }
                }

                if (localChoice.changeTemplates) {
                    if (localChoice.changeTemplatesList && localChoice.changeToThisTemplate) {
                        const list = localChoice.changeTemplatesList.split(',');
                        
                        for (let i = 0; i < list.length; i++) {
                            const item = list[i];
                            const cMap = choiceMap.get(item);
                            if (typeof cMap !== 'undefined') {
                                const tChoice = cMap.choice;
                                revertTemplate(tChoice, localChoice.id);

                                if(localChoice.changeAddonTemplate) {
                                    for (let j = 0; j < tChoice.addons.length; j++) {
                                        const tAddon = tChoice.addons[j];
                                        revertTemplate(tAddon, localChoice.id);
                                    }
                                }
                                continue;
                            }

                            const tRow = rowMap.get(item);
                            if (typeof tRow !== 'undefined') {
                                revertTemplate(tRow, localChoice.id);
                                continue;
                            }

                            const groupData = groupMap.get(item[0]);
                            if (typeof groupData !== 'undefined') {
                                const groupRowEle = groupData.rowElements;

                                for (let j = 0; j < groupRowEle.length; j++) {
                                    const gtRow = rowMap.get(groupRowEle[j]);
                                    if (typeof gtRow !== 'undefined') {
                                        revertTemplate(gtRow, localChoice.id);
                                    }
                                }
                                const groupEle = groupData.elements;                                    
                                for (let j = 0; j < groupEle.length; j++) {
                                    const gcMap = choiceMap.get(groupEle[j]);
                                    if (typeof gcMap !== 'undefined') {
                                        const gtChoice = gcMap.choice;
                                        revertTemplate(gtChoice, localChoice.id);
                                    }
                                }
                                continue;
                            }
                        }
                    }
                }

                if (localChoice.changeWidth) {
                    if (localChoice.changeWidthList && localChoice.changeToThisWidth) {
                        const list = localChoice.changeWidthList.split(',');
                        
                        for (let i = 0; i < list.length; i++) {
                            const item = list[i];
                            const cMap = choiceMap.get(item);
                            if (typeof cMap !== 'undefined') {
                                const tChoice = cMap.choice;
                                revertWidth(tChoice, localChoice.id);
                                continue;
                            }

                            const tRow = rowMap.get(item);
                            if (typeof tRow !== 'undefined') {
                                revertWidth(tRow, localChoice.id);
                                continue;
                            }

                            const groupData = groupMap.get(item[0]);
                            if (typeof groupData !== 'undefined') {
                                const groupRowEle = groupData.rowElements;

                                for (let j = 0; j < groupRowEle.length; j++) {
                                    const gtRow = rowMap.get(groupRowEle[j]);
                                    if (typeof gtRow !== 'undefined') {
                                        revertWidth(gtRow, localChoice.id);
                                    }
                                }
                                const groupEle = groupData.elements;                                    
                                for (let j = 0; j < groupEle.length; j++) {
                                    const gcMap = choiceMap.get(groupEle[j]);
                                    if (typeof gcMap !== 'undefined') {
                                        const gtChoice = gcMap.choice;
                                        revertWidth(gtChoice, localChoice.id);
                                    }
                                }
                                continue;
                            }
                        }
                    }
                }

                if (localChoice.setBgmIsOn && bgmPlayer) {
                    if (localChoice.bgmId) {
                        bgmVariables.bgmIsPlaying = false;
                        playBgm(localChoice, localChoice.bgmId, 0);
                    }
                }

                if (localChoice.muteBgm && bgmPlayer) {
                    const player = get(bgmPlayer);

                    app.isMute = false;
                    if (player && typeof player.unMute === 'function') {
                        player.unMute();
                    }
                }

                if (localChoice.isContentHidden && typeof localChoice.hiddenContentsRow !== 'undefined' && typeof localChoice.hiddenContentsType !== 'undefined') {
                    for (let i = 0; i < localChoice.hiddenContentsRow.length; i++) {
                        const hRow = rowMap.get(localChoice.hiddenContentsRow[i]);
                        if (typeof hRow !== 'undefined') {
                            for (let j = 0; j < localChoice.hiddenContentsType.length; j++) {
                                switch (localChoice.hiddenContentsType[j]) {
                                    case '1':
                                        delete hRow.objectTitleRemoved;
                                        break;
                                    case '2':
                                        delete hRow.objectImageRemoved;
                                        break;
                                    case '3':
                                        delete hRow.objectTextRemoved;
                                        break;
                                    case '4':
                                        delete hRow.objectScoreRemoved;
                                        break;
                                    case '5':
                                        delete hRow.objectRequirementRemoved;
                                        break;
                                    case '6':
                                        delete hRow.addonTitleRemoved;
                                        break;
                                    case '7':
                                        delete hRow.addonImageRemoved;
                                        break;
                                    case '8':
                                        delete hRow.addonTextRemoved;
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }
                    }
                }
                delete localChoice.tempSlots;
                deselectUpdateScore(localChoice, tmpScores, 0);
                activateTempChoices();
                delete localChoice.appliedDisChoices;
            }

            if (localChoice.isSelectDelayed && typeof localChoice.selectDelayTime !== 'undefined') {
                if (!localChoice.selectDelayTimer) {
                    localChoice.selectDelayTimer = window.setTimeout(() => {
                        if (linkedObjects.indexOf(localChoice.id) === -1) {
                            if (localChoice.isFadeTransition) {
                                if (typeof localChoice.fadeTransitionColor === 'undefined' || localChoice.fadeTransitionColor === '') {
                                    app.fadeTransitionColor = '000000FF';
                                } else {
                                    app.fadeTransitionColor = localChoice.fadeTransitionColor;
                                }

                                if (typeof localChoice.fadeInTransitionTime === 'undefined') {
                                    app.fadeTransitionTime = 0.25;
                                } else {
                                    app.fadeTransitionTime = localChoice.fadeInTransitionTime / 1000;
                                }

                                app.fadeTransitionIsOn = true;
                                window.setTimeout(() => {
                                    if (typeof localChoice.fadeOutTransitionTime !== 'undefined') {
                                        app.fadeTransitionTime = localChoice.fadeOutTransitionTime / 1000;
                                    }
                                    app.fadeTransitionIsOn = false;
                                    deselectProcess();
                                }, app.fadeTransitionTime * 1000);
                            } else {
                                deselectProcess();
                            }
                        }
                        if (linkedObjects.indexOf(localChoice.id) === 0) {
                            linkedObjects.splice(0);
                        }
                        delete localChoice.selectDelayTimer;
                    }, localChoice.selectDelayTime);
                }
            } else {
                if (linkedObjects.indexOf(localChoice.id) === -1) {
                    if (localChoice.isFadeTransition) {
                        if (typeof localChoice.fadeTransitionColor === 'undefined' || localChoice.fadeTransitionColor === '') {
                            app.fadeTransitionColor = '000000FF';
                        } else {
                            app.fadeTransitionColor = localChoice.fadeTransitionColor;
                        }

                        if (typeof localChoice.fadeInTransitionTime === 'undefined') {
                            app.fadeTransitionTime = 0.25;
                        } else {
                            app.fadeTransitionTime = localChoice.fadeInTransitionTime / 1000;
                        }

                        app.fadeTransitionIsOn = true;
                        window.setTimeout(() => {
                            if (typeof localChoice.fadeOutTransitionTime !== 'undefined') {
                                app.fadeTransitionTime = localChoice.fadeOutTransitionTime / 1000;
                            }
                            app.fadeTransitionIsOn = false;
                            deselectProcess();
                        }, app.fadeTransitionTime * 1000);
                    } else {
                        deselectProcess();
                    }
                }
                if (linkedObjects.indexOf(localChoice.id) === 0) {
                    linkedObjects.splice(0);
                }
            }
        }
    }

    function selectObject(localChoice: Choice, localRow: Row) {
        let selectable = true;

        if (localRow.allowedChoices > 0 && localRow.currentChoices >= localRow.allowedChoices) {
            let count = 0;
            for (let i = 0; i < localRow.objects.length; i++) {
                const thisChoice = localRow.objects[i];
                if (thisChoice.isActive) {
                    if (!thisChoice.forcedActivated && !thisChoice.selectOnce) {
                        if (thisChoice.isSelectableMultiple) {
                            let counter = thisChoice.multipleUseVariable;
                            for (let j = 0; j < counter; j++) {
                                selectedOneLess(thisChoice, localRow);
                            }
                        } else {
                            activateObject(thisChoice, localRow);
                        }
                        break;
                    } else {
                        count++;
                    }
                }
            }
            if (count >= localRow.allowedChoices) {
                selectable = false;
            }
        }

        if (selectable) {
            for (let i = 0; i < localChoice.scores.length; i++) {
                const score = localChoice.scores[i];
                const point = pointTypeMap.get(score.id);
                if (typeof point !== 'undefined' && score.isRandom && !score.setValue && typeof score.maxValue !== 'undefined' && typeof score.minValue !== 'undefined') {
                    score.value = Math.floor(Math.random() * (score.maxValue - score.minValue + 1)) + score.minValue;
                    score.value = point.allowFloat ? score.value : Math.floor(score.value);
                    score.setValue = true;
                }
            }
            const pointCheck = checkPoints(localChoice, true);
            if (pointCheck) {
                const selectProcess = () => {
                    const tmpScores = new SvelteMap<string, number>();

                    localChoice.isActive = true;
                    activatedMap.set(localChoice.id, {multiple: 0});
                    localRow.currentChoices += 1;

                    if (localChoice.discountOther) {
                        if (typeof localChoice.discountOperator !== 'undefined' && typeof localChoice.discountValue !== 'undefined') {
                            if (localChoice.isDisChoices) {
                                const dList = new Set<string>();
                                if (typeof localChoice.discountRows !== 'undefined') {
                                    for (let i = 0; i < localChoice.discountRows.length; i++) {
                                        const dRow = rowMap.get(localChoice.discountRows[i]);
                                        if (typeof dRow !== 'undefined') {
                                            for (let j = 0; j < dRow.objects.length; j++) {
                                                const dChoice = dRow.objects[j];
                                                selectDiscount(localChoice, dChoice);
                                                dList.add(dChoice.id);
                                            }
                                        }
                                    }
                                }
                                if (typeof localChoice.discountChoices !== 'undefined') {
                                    for (let i = 0; i < localChoice.discountChoices.length; i++) {
                                        if (!dList.has(localChoice.discountChoices[i])) {
                                            const cMap = choiceMap.get(localChoice.discountChoices[i]);
                                            if (typeof cMap !== 'undefined') {
                                                selectDiscount(localChoice, cMap.choice);
                                            }
                                        }
                                    }
                                }
                            } else {
                                if (typeof localChoice.discountGroups !== 'undefined') {
                                    for (let i = 0; i < localChoice.discountGroups.length; i++) {
                                        const groupData = groupMap.get(localChoice.discountGroups[i]);
                                        if (typeof groupData !== 'undefined') {
                                            for (let j = 0; j < groupData.elements.length; j++) {
                                                const cMap = choiceMap.get(groupData.elements[j]);
                                                if (typeof cMap !== 'undefined') {
                                                    selectDiscount(localChoice, cMap.choice);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    let countSet = new Set<Choice>();
                    for (let i = 0; i < localChoice.scores.length; i++) {
                        const score = localChoice.scores[i];
                        if (checkRequirements(score.requireds) && !score.isActive) {
                            const point = pointTypeMap.get(score.id);
                            if (typeof point !== 'undefined') {
                                let val = score.value;
                                if (score.appliedDiscount && typeof score.discountScore !== 'undefined') {
                                    val = score.discountScore;
                                } else if (score.discountIsOn && typeof score.discountScore !== 'undefined' && score.discountedFrom && score.discountedFrom.length > 0) {
                                    let isDiscounted = false;
                                    for (let j = 0; j < score.discountedFrom.length; j++) {
                                        const cMap = choiceMap.get(score.discountedFrom[j]);

                                        if (typeof cMap !== 'undefined') {
                                            const dChoice = cMap.choice;

                                            if (dChoice.useDiscountCount && typeof dChoice.discountCount !== 'undefined') {
                                                const count = dChoice.isSelectableMultiple && dChoice.isMultipleUseVariable && dChoice.stackableDiscount ? dChoice.discountCount * dChoice.multipleUseVariable : dChoice.discountCount;
                                                if (!dChoice.appliedDisChoices) dChoice.appliedDisChoices = [];
                                                if (count > dChoice.appliedDisChoices.length) {
                                                    countSet.add(dChoice);
                                                    val = score.discountScore;
                                                    score.appliedDiscount = true;
                                                    isDiscounted = true;
                                                    break;
                                                }
                                            } else {
                                                val = score.discountScore;
                                                score.appliedDiscount = true;
                                                isDiscounted = true;
                                                break;
                                            }
                                        }
                                    }
                                    if (!isDiscounted && typeof score.tmpDiscount !== 'undefined') {
                                        for (let j = 0; j < score.tmpDiscount.length; j++) {
                                            if (val > score.tmpDiscount[j].discountedValue) val = score.tmpDiscount[j].discountedValue;
                                        }
                                    }
                                }
                                val = point.allowFloat ? val : Math.floor(val);
                                point.startingSum -= val;
                                score.isActive = true;
                                let tmpScore = tmpScores.get(score.id);
                                if (typeof tmpScore !== 'undefined') {
                                    tmpScores.set(score.id, val + tmpScore);
                                } else {
                                    tmpScores.set(score.id, val);
                                }
                            }
                        }
                    }
                    
                    if (countSet.size > 0) {
                        countSet.forEach((dChoice) => {
                            if (dChoice.appliedDisChoices) {
                                if (dChoice.appliedDisChoices.indexOf(localChoice.id) === -1) dChoice.appliedDisChoices.push(localChoice.id);
                            }
                        });
                    }

                    if (localChoice.duplicateRow) {
                        if (typeof localChoice.duplicateRowId !== 'undefined' && typeof localChoice.duplicateRowPlace !== 'undefined') {
                            duplicateRow(localChoice, localRow);
                        }
                    }
                    
                    if (localChoice.activateOtherChoice && typeof localChoice.activateThisChoice !== 'undefined') {
                        if (localChoice.isActivateRandom) {
                            selectForceRandomActivate(localChoice);
                        } else {
                            const list = localChoice.activateThisChoice.split(',');
                            for (let i = 0; i < list.length; i++) {
                                const item = list[i].split('/ON#');
                                const forceNum = item.length > 1 ? parseInt(item[1]) : 0;
                                const cMap = choiceMap.get(item[0]);
                                if (typeof cMap !== 'undefined') {
                                    const fRow = cMap.row;
                                    const fChoice = cMap.choice;
                                    selectForceActivate(localChoice, fChoice, fRow, forceNum);
                                } else {
                                    const groupData = groupMap.get(item[0]);
                                    if (typeof groupData !== 'undefined') {
                                        const groupEle = groupData.elements;
                                        for (let j = 0; j < groupEle.length; j++) {
                                            const cMap = choiceMap.get(groupEle[j]);
                                            if (typeof cMap !== 'undefined') {
                                                const fRow = cMap.row;
                                                const fChoice = cMap.choice;
                                                selectForceActivate(localChoice, fChoice, fRow, forceNum);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    
                    if (localChoice.deactivateOtherChoice && typeof localChoice.deactivateThisChoice !== 'undefined') {
                        const list = localChoice.deactivateThisChoice.split(',');
                        for (let i = 0; i < list.length; i++) {
                            const item = list[i].split('/ON#');
                            const deactiveNum = item.length > 1 ? parseInt(item[1]) : 0;
                            const cMap = choiceMap.get(item[0]);
                            if (typeof cMap !== 'undefined') {
                                const dRow = cMap.row;
                                const dChoice = cMap.choice;
                                if (dChoice.isActive) {
                                    if (dChoice.isSelectableMultiple && dChoice.isMultipleUseVariable) {
                                        for (let j = 0; j < deactiveNum; j++) {
                                            selectedOneLess(dChoice, dRow);
                                        }
                                    } else {
                                        deselectObject(dChoice, dRow);
                                    }
                                }
                            } else {
                                const groupData = groupMap.get(item[0]);
                                if (typeof groupData !== 'undefined') {
                                    const groupEle = groupData.elements;
                                    for (let j = 0; j < groupEle.length; j++) {
                                        const cMap = choiceMap.get(groupEle[j]);
                                        if (typeof cMap !== 'undefined') {
                                            const dRow = cMap.row;
                                            const dChoice = cMap.choice;
                                            if (dChoice.isActive) {
                                                if (dChoice.isSelectableMultiple && dChoice.isMultipleUseVariable) {
                                                    for (let k = 0; k < deactiveNum; k++) {
                                                        selectedOneLess(dChoice, dRow);
                                                    }
                                                } else {
                                                    deselectObject(dChoice, dRow);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    Array.from(activatedMap.entries()).forEach(([id, val]) => {
                        const cMap = choiceMap.get(id);
                        if (typeof cMap !== 'undefined') {
                            const aRow = cMap.row;
                            const aChoice = cMap.choice;
                            if (aChoice.id !== localChoice.id) {
                                if (!checkRequirements(aChoice.requireds)) {
                                    if (aChoice.forcedActivated) {
                                        delete aChoice.forcedActivated;
                                        if (!aChoice.isAllowDeselect) tmpActivatedMap.set(aChoice.id, {multiple: val.multiple});
                                    }
                                    if (val.multiple === 0) {
                                        if (aChoice.isActive) deselectObject(aChoice, aRow);
                                    } else if (val.multiple > 0) {
                                        for (let i = 0; i < val.multiple; i++) {
                                            if (aChoice.isActive) selectedOneLess(aChoice, aRow);
                                        }
                                    }
                                }
                            }
                        }
                    });

                    if (localChoice.multiplyPointtypeIsOn && typeof localChoice.pointTypeToMultiply !== 'undefined' && typeof localChoice.multiplyWithThis !== 'undefined') {
                        let count = 0;
                        localChoice.multiplyPointtypeIsOnCheck = true;
                        if (typeof localChoice.startingSumAtMultiply !== 'object') localChoice.startingSumAtMultiply = [];
                        for (let i = 0; i < localChoice.pointTypeToMultiply.length; i++) {
                            let point = pointTypeMap.get(localChoice.pointTypeToMultiply[i]);

                            if (typeof point !== 'undefined') {
                                if (localChoice.multiplyPointtypeIsId && typeof localChoice.multiplyWithThis === 'string') {
                                    let calcPoint = pointTypeMap.get(localChoice.multiplyWithThis);

                                    if (typeof calcPoint !== 'undefined') {
                                        localChoice.startingSumAtMultiply[i] = {value: point.startingSum, calcVal: calcPoint.startingSum};
                                        point.startingSum *= calcPoint.startingSum;
                                        point.startingSum = point.allowFloat ? point.startingSum : Math.floor(point.startingSum);
                                    } else {
                                        count++;
                                    }
                                } else if (typeof localChoice.multiplyWithThis === 'number') {
                                    localChoice.startingSumAtMultiply[i] = {value: point.startingSum, calcVal: localChoice.multiplyWithThis};
                                    point.startingSum *= localChoice.multiplyWithThis;
                                    point.startingSum = point.allowFloat ? point.startingSum : Math.floor(point.startingSum);
                                }
                            } else {
                                count++;
                            }
                        }
                        if (count === localChoice.pointTypeToMultiply.length) delete localChoice.multiplyPointtypeIsOnCheck;
                        if (localChoice.multiplyPointtypeIsOnCheck) mdObjects.push(localChoice);
                    }

                    if (localChoice.dividePointtypeIsOn && typeof localChoice.pointTypeToDivide !== 'undefined' && typeof localChoice.divideWithThis !== 'undefined') {
                        let count = 0;
                        localChoice.dividePointtypeIsOnCheck = true;
                        if (typeof localChoice.startingSumAtDivide !== 'object') localChoice.startingSumAtDivide = [];
                        for (let i = 0; i < localChoice.pointTypeToDivide.length; i++) {
                            let point = pointTypeMap.get(localChoice.pointTypeToDivide[i]);

                            if (typeof point !== 'undefined') {
                                if (localChoice.dividePointtypeIsId && typeof localChoice.divideWithThis === 'string') {
                                    let calcPoint = pointTypeMap.get(localChoice.divideWithThis);

                                    if (typeof calcPoint !== 'undefined') {
                                        if (calcPoint.startingSum === 0) {
                                            count++;
                                        } else {
                                            localChoice.startingSumAtDivide[i] = {value: point.startingSum, calcVal: calcPoint.startingSum};
                                            point.startingSum /= calcPoint.startingSum;
                                            point.startingSum = point.allowFloat ? point.startingSum : Math.floor(point.startingSum);
                                        }
                                    } else {
                                        count++;
                                    }
                                } else if (typeof localChoice.divideWithThis === 'number') {
                                    if (localChoice.dividedWithThis === 0) {
                                        count++;
                                    } else {
                                        localChoice.startingSumAtDivide[i] = {value: point.startingSum, calcVal: localChoice.divideWithThis};
                                        point.startingSum /= localChoice.divideWithThis;
                                        point.startingSum = point.allowFloat ? point.startingSum : Math.floor(point.startingSum);
                                    }
                                }
                            } else {
                                count++;
                            }
                        }
                        if (count === localChoice.pointTypeToDivide.length) delete localChoice.dividePointtypeIsOnCheck;
                        if (!localChoice.multiplyPointtypeIsOnCheck && localChoice.dividePointtypeIsOnCheck) mdObjects.push(localChoice);
                    }

                    if (localChoice.isChangeVariables && typeof localChoice.changedVariables !== 'undefined') {
                        for (let i = 0; i < localChoice.changedVariables.length; i++) {
                            const variable = variableMap.get(localChoice.changedVariables[i]);
                            if (typeof variable !== 'undefined') {
                                if (localChoice.changeType === '1') {
                                    variable.isTrue = true;
                                } else if (localChoice.changeType === '2') {
                                    variable.isTrue = false;
                                } else if (localChoice.changeType === '3') {
                                    variable.isTrue = !variable.isTrue;
                                }
                            }
                        }
                    }

                    if (localChoice.addToAllowChoice && typeof localChoice.idOfAllowChoice !== 'undefined' && typeof localChoice.numbAddToAllowChoice !== 'undefined') {
                        for (let i = 0; i < localChoice.idOfAllowChoice.length; i++) {
                            const aRow = rowMap.get(localChoice.idOfAllowChoice[i]);
                            if (typeof aRow !== 'undefined') {
                                aRow.allowedChoices += localChoice.numbAddToAllowChoice;
                                if (aRow.allowedChoices > 0 && aRow.currentChoices >= aRow.allowedChoices) {
                                    for (let j = 0; j < aRow.objects.length; j++) {
                                        const thisChoice = aRow.objects[j];
                                        if (thisChoice.isActive) {
                                            if (!thisChoice.forcedActivated) {
                                                if (thisChoice.isSelectableMultiple) {
                                                    let counter = thisChoice.multipleUseVariable;
                                                    for (let k = 0; k < counter; k++) {
                                                        selectedOneLess(thisChoice, aRow);    
                                                    }
                                                } else {
                                                    deselectObject(thisChoice, aRow);
                                                }
                                            }
                                        }
                                        if (aRow.allowedChoices >= aRow.currentChoices) {
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (localChoice.textfieldIsOn && typeof localChoice.idOfTheTextfieldWord !== 'undefined' && typeof localChoice.wordChangeSelect !== 'undefined') {
                        const word = wordMap.get(localChoice.idOfTheTextfieldWord);
                        if (typeof word !== 'undefined') {
                            word.replaceText = localChoice.wordChangeSelect;
                        }
                    }

                    if (localChoice.isImageUpload) {
                        localChoice.defaultImage = localChoice.image;
                        dlgVariables.currentDialog = 'appImageUpload';
                        dlgVariables.data = localChoice;
                        dlgVariables.imgProp = 'image';
                    }

                    if (localChoice.backpackBtnRequirement) {
                        app.btnBackpackIsOn += 1;
                    }

                    if (localChoice.showAllAddons) {
                        app.showAllAddons += 1;
                    }

                    if (localChoice.changeBackground) {
                        if (localChoice.changeBgImage) {
                            if (typeof localChoice.bgImage !== 'undefined') {
                                if (typeof app.bgImageStack === 'undefined') {
                                    app.bgImageStack = [];
                                    app.defaultBgImage = app.styling.backgroundImage || '';
                                }
                                app.bgImageStack.push({id: localChoice.id, data: localChoice.bgImage});
                                app.styling.backgroundImage = localChoice.bgImage;
                            }
                        } else {
                            if (typeof localChoice.changedBgColorCode !== 'undefined') {
                                if (typeof app.bgColorStack === 'undefined') {
                                    app.bgColorStack = [];
                                    app.defaultBgColor = app.styling.backgroundColor || '';
                                }
                                app.bgColorStack.push({id: localChoice.id, data: localChoice.changedBgColorCode});
                                app.styling.backgroundColor = localChoice.changedBgColorCode;
                            }
                        }
                    }
                    
                    if (localChoice.changePointBar) {
                        if (localChoice.changeBarBgColorIsOn && typeof localChoice.changedBarBgColor !== 'undefined') {
                            if (typeof app.barBgColorStack === 'undefined') {
                                app.barBgColorStack = [];
                                app.defaultBarBgColor = app.styling.barBackgroundColor || '#FFFFFFFF';
                            }
                            app.barBgColorStack.push({id: localChoice.id, data: localChoice.changedBarBgColor});
                            app.styling.barBackgroundColor = localChoice.changedBarBgColor;
                        }
                        if (localChoice.changeBarIconColorIsOn && typeof localChoice.changedBarIconColor !== 'undefined') {
                            if (typeof app.barIconColorStack === 'undefined') {
                                app.barIconColorStack = [];
                                app.defaultBarIconColor = app.styling.barIconColor || '#0000008A';
                            }
                            app.barIconColorStack.push({id: localChoice.id, data: localChoice.changedBarIconColor});
                            app.styling.barIconColor = localChoice.changedBarIconColor;
                        }
                        if (localChoice.changeBarTextColorIsOn && typeof localChoice.changedBarTextColor !== 'undefined') {
                            if (typeof app.barTextColorStack === 'undefined') {
                                app.barTextColorStack = [];
                                app.defaultBarTextColor = app.styling.barTextColor || '#000000';
                            }
                            app.barTextColorStack.push({id: localChoice.id, data: localChoice.changedBarTextColor});
                            app.styling.barTextColor = localChoice.changedBarTextColor;
                        }
                    }

                    if (localChoice.changeTemplates) {
                        if (localChoice.changeTemplatesList && localChoice.changeToThisTemplate) {
                            const list = localChoice.changeTemplatesList.split(',');
                            
                            for (let i = 0; i < list.length; i++) {
                                const item = list[i];
                                const cMap = choiceMap.get(item);
                                if (typeof cMap !== 'undefined') {
                                    const tChoice = cMap.choice;
                                    applyTemplate(tChoice, localChoice.id, localChoice.changeToThisTemplate);

                                    if(localChoice.changeAddonTemplate) {
                                        for (let j = 0; j < tChoice.addons.length; j++) {
                                            const tAddon = tChoice.addons[j];
                                            applyTemplate(tAddon, localChoice.id, localChoice.changeToThisTemplate);
                                        }
                                    }
                                    continue;
                                }

                                const tRow = rowMap.get(item);
                                if (typeof tRow !== 'undefined') {
                                    applyTemplate(tRow, localChoice.id, localChoice.changeToThisTemplate);
                                    continue;
                                }

                                const groupData = groupMap.get(item[0]);
                                if (typeof groupData !== 'undefined') {
                                    const groupRowEle = groupData.rowElements;

                                    for (let j = 0; j < groupRowEle.length; j++) {
                                        const gtRow = rowMap.get(groupRowEle[j]);
                                        if (typeof gtRow !== 'undefined') {
                                            applyTemplate(gtRow, localChoice.id, localChoice.changeToThisTemplate);
                                        }
                                    }
                                    const groupEle = groupData.elements;                                    
                                    for (let j = 0; j < groupEle.length; j++) {
                                        const gcMap = choiceMap.get(groupEle[j]);
                                        if (typeof gcMap !== 'undefined') {
                                            const gtChoice = gcMap.choice;
                                            applyTemplate(gtChoice, localChoice.id, localChoice.changeToThisTemplate);
                                        }
                                    }
                                    continue;
                                }
                            }
                        }
                    }

                    if (localChoice.changeWidth) {
                        if (localChoice.changeWidthList && localChoice.changeToThisWidth) {
                            const list = localChoice.changeWidthList.split(',');
                            
                            for (let i = 0; i < list.length; i++) {
                                const item = list[i];
                                const cMap = choiceMap.get(item);
                                if (typeof cMap !== 'undefined') {
                                    const tChoice = cMap.choice;
                                    applyWidth(tChoice, localChoice.id, localChoice.changeToThisWidth);
                                    continue;
                                }

                                const tRow = rowMap.get(item);
                                if (typeof tRow !== 'undefined') {
                                    applyWidth(tRow, localChoice.id, localChoice.changeToThisWidth);
                                    continue;
                                }

                                const groupData = groupMap.get(item[0]);
                                if (typeof groupData !== 'undefined') {
                                    const groupRowEle = groupData.rowElements;

                                    for (let j = 0; j < groupRowEle.length; j++) {
                                        const gtRow = rowMap.get(groupRowEle[j]);
                                        if (typeof gtRow !== 'undefined') {
                                            applyWidth(gtRow, localChoice.id, localChoice.changeToThisWidth);
                                        }
                                    }
                                    const groupEle = groupData.elements;                                    
                                    for (let j = 0; j < groupEle.length; j++) {
                                        const gcMap = choiceMap.get(groupEle[j]);
                                        if (typeof gcMap !== 'undefined') {
                                            const gtChoice = gcMap.choice;
                                            applyWidth(gtChoice, localChoice.id, localChoice.changeToThisWidth);
                                        }
                                    }
                                    continue;
                                }
                            }
                        }
                    }

                    if (localChoice.setBgmIsOn) {
                        if (localChoice.bgmId) {
                            bgmVariables.bgmIsPlaying = true;
                            
                            if (bgmVariables.isBgmInit) {
                                playBgm(localChoice, localChoice.bgmId, 0);
                            } else {
                                initYoutubePlayer(localChoice);
                                bgmVariables.isBgmInit = true;
                            }
                        }
                    }

                    if (localChoice.muteBgm && bgmPlayer) {
                        const player = get(bgmPlayer);

                        app.isMute = true;
                        if (player && typeof player.mute === 'function') {
                            player.mute();
                        }
                    }

                    if (localChoice.isContentHidden && typeof localChoice.hiddenContentsRow !== 'undefined' && typeof localChoice.hiddenContentsType !== 'undefined') {
                        for (let i = 0; i < localChoice.hiddenContentsRow.length; i++) {
                            const hRow = rowMap.get(localChoice.hiddenContentsRow[i]);
                            if (typeof hRow !== 'undefined') {
                                if (!hRow.textIsRemoved) hRow.textIsRemoved = true;
                                for (let j = 0; j < localChoice.hiddenContentsType.length; j++) {
                                    switch (localChoice.hiddenContentsType[j]) {
                                        case '1':
                                            hRow.objectTitleRemoved = true;
                                            break;
                                        case '2':
                                            hRow.objectImageRemoved = true;
                                            break;
                                        case '3':
                                            hRow.objectTextRemoved = true;
                                            break;
                                        case '4':
                                            hRow.objectScoreRemoved = true;
                                            break;
                                        case '5':
                                            hRow.objectRequirementRemoved = true;
                                            break;
                                        case '6':
                                            hRow.addonTitleRemoved = true;
                                            break;
                                        case '7':
                                            hRow.addonImageRemoved = true;
                                            break;
                                        case '8':
                                            hRow.addonTextRemoved = true;
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            }
                        }
                    }

                    if (localChoice.scrollToRow) {
                        tick().then(() => {
                            setTimeout(() => {
                                if (localChoice.scrollToObject) {
                                    if (localChoice.scrollObjectId) {
                                        const cMap = choiceMap.get(localChoice.scrollObjectId);
                                        if (typeof cMap !== 'undefined') {
                                            const sChoice = cMap.choice;
                                            const sRow = cMap.row;
                                            const divs = mainDiv?.children[sRow.index]?.children[0]?.children[1]?.children;
                                            if (typeof divs !== 'undefined') {
                                                if (isBackpack) {
                                                    const thisWindow = document.getElementById('backpackDialog');
                                                    thisWindow?.scrollTo({top: divs[sChoice.index].getBoundingClientRect().top + window.scrollY, behavior: 'smooth'});
                                                } else {
                                                    window.scrollTo({top: divs[sChoice.index].getBoundingClientRect().top + window.scrollY, behavior: 'smooth'});
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    if (localChoice.scrollRowId) {
                                        const sRow = rowMap.get(localChoice.scrollRowId);
                                        if (typeof sRow !== 'undefined') {
                                            const divs = mainDiv?.children;
                                            if (typeof divs !== 'undefined') {
                                                if (isBackpack) {
                                                        const thisWindow = document.getElementById('backpackDialog');
                                                        thisWindow?.scrollTo({top: divs[sRow.index].getBoundingClientRect().top + window.scrollY, behavior: 'smooth'});
                                                } else {
                                                    window.scrollTo({top: divs[sRow.index].getBoundingClientRect().top + window.scrollY, behavior: 'smooth'});
                                                }
                                            }
                                        }
                                    }
                                }
                            }, 10);
                        });
                    }

                    if (localChoice.cleanACtivatedOnSelect) {
                        cleanActivated();
                    }

                    selectUpdateScore(localChoice, tmpScores, 0);
                    activateTempChoices();
                    
                    if (!checkRequirements(localChoice.requireds) && localChoice.isActive) {
                        deselectObject(localChoice, localRow);
                    }
                }

                if (localChoice.customTextfieldIsOn && !isOverDlg) {
                    wordDialog.choice = localChoice;
                    wordDialog.row = localRow;
                    wordDialog.context = typeof localChoice.wordPromptText !== 'undefined' ? localChoice.wordPromptText : '';
                    wordDialog.prevText = localChoice.wordChangeSelect || '';
                    wordDialog.isWord = true;
                    currentDialog = 'dlgCommon';
                    
                    return;
                }

                if (localChoice.confirmIsOn && !isOverDlg) {
                    wordDialog.choice = localChoice;
                    wordDialog.row = localRow;
                    wordDialog.context = typeof localChoice.wordPromptText !== 'undefined' ? localChoice.wordPromptText : '';
                    wordDialog.isWord = false;
                    currentDialog = 'dlgCommon';
                    
                    return;
                }

                if (localChoice.isSelectDelayed && typeof localChoice.selectDelayTime !== 'undefined') {
                    if (!localChoice.selectDelayTimer) {
                        localChoice.selectDelayTimer = window.setTimeout(() => {
                            if (linkedObjects.indexOf(localChoice.id) === -1) {
                                if (localChoice.isFadeTransition) {
                                    if (typeof localChoice.fadeTransitionColor === 'undefined' || localChoice.fadeTransitionColor === '') {
                                        app.fadeTransitionColor = '000000FF';
                                    } else {
                                        app.fadeTransitionColor = localChoice.fadeTransitionColor;
                                    }

                                    if (typeof localChoice.fadeInTransitionTime === 'undefined') {
                                        app.fadeTransitionTime = 0.25;
                                    } else {
                                        app.fadeTransitionTime = localChoice.fadeInTransitionTime / 1000;
                                    }

                                    app.fadeTransitionIsOn = true;
                                    window.setTimeout(() => {
                                        if (typeof localChoice.fadeOutTransitionTime !== 'undefined') {
                                            app.fadeTransitionTime = localChoice.fadeOutTransitionTime / 1000;
                                        }
                                        app.fadeTransitionIsOn = false;
                                        selectProcess();
                                    }, app.fadeTransitionTime * 1000);
                                } else {
                                    selectProcess();
                                }
                            }
                            if (linkedObjects.indexOf(localChoice.id) === 0) {
                                linkedObjects.splice(0);
                            }
                            delete localChoice.selectDelayTimer;
                        }, localChoice.selectDelayTime);
                    }
                } else {
                    if (linkedObjects.indexOf(localChoice.id) === -1) {
                        if (localChoice.isFadeTransition) {
                            if (typeof localChoice.fadeTransitionColor === 'undefined' || localChoice.fadeTransitionColor === '') {
                                app.fadeTransitionColor = '000000FF';
                            } else {
                                app.fadeTransitionColor = localChoice.fadeTransitionColor;
                            }

                            if (typeof localChoice.fadeInTransitionTime === 'undefined') {
                                app.fadeTransitionTime = 0.25;
                            } else {
                                app.fadeTransitionTime = localChoice.fadeInTransitionTime / 1000;
                            }

                            app.fadeTransitionIsOn = true;
                            window.setTimeout(() => {
                                if (typeof localChoice.fadeOutTransitionTime !== 'undefined') {
                                    app.fadeTransitionTime = localChoice.fadeOutTransitionTime / 1000;
                                }
                                app.fadeTransitionIsOn = false;
                                selectProcess();
                            }, app.fadeTransitionTime * 1000);
                        } else {
                            selectProcess();
                        }
                    }
                    if (linkedObjects.indexOf(localChoice.id) === 0) {
                        linkedObjects.splice(0);
                    }
                }
            }
        }
    }

    function selectedOneMore(localChoice: Choice, localRow: Row) {
        const reqCheck = checkRequirements(localChoice.requireds) && !localRow.isInfoRow && !localChoice.isNotSelectable;
        let selectable = true;
        let origRow = localRow;
        if (localRow.isResultRow) {
            const cMap = choiceMap.get(localChoice.id);

            if (typeof cMap !== 'undefined') {
                origRow = cMap.row;
            }
        }

        if (reqCheck && localChoice.isMultipleUseVariable && localChoice.multipleUseVariable === 0) {
            if (origRow.allowedChoices > 0 && origRow.currentChoices >= origRow.allowedChoices) {
                let count = 0;
                for (let i = 0; i < origRow.objects.length; i++) {
                    const thisChoice = origRow.objects[i];
                    if (thisChoice.isActive) {
                        if (!thisChoice.forcedActivated && !thisChoice.selectOnce) {
                            if (thisChoice.isSelectableMultiple) {
                                let counter = thisChoice.multipleUseVariable;
                                for (let j = 0; j < counter; j++) {
                                    selectedOneLess(thisChoice, origRow);
                                }
                            } else {
                                activateObject(thisChoice, origRow);
                            }
                            break;
                        } else {
                            count++;
                        }
                    }
                }
                if (count >= origRow.allowedChoices) {
                    selectable = false;
                }
            }
        }

        if (selectable) {
            for (let i = 0; i < localChoice.scores.length; i++) {
                const score = localChoice.scores[i];
                const point = pointTypeMap.get(score.id);
                if (typeof point !== 'undefined' && score.isRandom && !score.setValue && typeof score.maxValue !== 'undefined' && typeof score.minValue !== 'undefined') {
                    score.value = Math.floor(Math.random() * (score.maxValue - score.minValue + 1)) + score.minValue;
                    score.value = point.allowFloat ? score.value : Math.floor(score.value);
                    score.setValue = true;
                }
            }
            const pointCheck = checkPoints(localChoice, true);
            if (pointCheck) {
                const selectProcess = () => {
                    const tmpScores = new SvelteMap<string, number>();
                    const wasActive = localChoice.isActive;
                    const isPos = localChoice.multipleUseVariable >= 0;
                    const selNum = Math.abs(localChoice.multipleUseVariable);

                    localChoice.multipleUseVariable += 1;

                    if (localChoice.multipleUseVariable === 0) {
                        activatedMap.delete(localChoice.id);
                        localChoice.isActive = false;
                        origRow.currentChoices -= 1;
                    } else {
                        if (localChoice.multipleUseVariable === 1) {
                            localChoice.isActive = true;
                            origRow.currentChoices += 1;
                        }
                        activatedMap.set(localChoice.id, {multiple: localChoice.multipleUseVariable});
                    }

                    if (isPos) {
                        if (localChoice.discountOther) {
                            if (typeof localChoice.discountOperator !== 'undefined' && typeof localChoice.discountValue !== 'undefined' && (localChoice.stackableDiscount || !localChoice.stackableDiscount && localChoice.multipleUseVariable === 1)) {
                                if (localChoice.isDisChoices) {
                                    const dList = new Set<string>();
                                    if (typeof localChoice.discountRows !== 'undefined') {
                                        for (let i = 0; i < localChoice.discountRows.length; i++) {
                                            const dRow = rowMap.get(localChoice.discountRows[i]);
                                            if (typeof dRow !== 'undefined') {
                                                for (let j = 0; j < dRow.objects.length; j++) {
                                                    const dChoice = dRow.objects[j];
                                                    selectDiscount(localChoice, dChoice);
                                                    dList.add(dChoice.id);
                                                }
                                            }
                                        }
                                    }
                                    if (typeof localChoice.discountChoices !== 'undefined') {
                                        for (let i = 0; i < localChoice.discountChoices.length; i++) {
                                            if (!dList.has(localChoice.discountChoices[i])) {
                                                const cMap = choiceMap.get(localChoice.discountChoices[i]);
                                                if (typeof cMap !== 'undefined') {
                                                    selectDiscount(localChoice, cMap.choice);
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    if (typeof localChoice.discountGroups !== 'undefined') {
                                        for (let i = 0; i < localChoice.discountGroups.length; i++) {
                                            const groupData = groupMap.get(localChoice.discountGroups[i]);
                                            if (typeof groupData !== 'undefined') {
                                                for (let j = 0; j < groupData.elements.length; j++) {
                                                    const cMap = choiceMap.get(groupData.elements[j]);
                                                    if (typeof cMap !== 'undefined') {
                                                        selectDiscount(localChoice, cMap.choice);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        let countSet = new Set<Choice>();
                        for (let i = 0; i < localChoice.scores.length; i++) {
                            const score = localChoice.scores[i];
                            if (typeof score.isActiveMul === 'undefined') score.isActiveMul = [];
                            if (checkRequirements(score.requireds) && !score.isActiveMul[selNum]) {
                                const point = pointTypeMap.get(score.id);
                                if (typeof point !== 'undefined') {
                                    let val = score.value;
                                    if (score.appliedDiscount && typeof score.discountScore !== 'undefined') {
                                        val = score.discountScore;
                                    } else if (score.discountIsOn && typeof score.discountScore !== 'undefined' && score.discountedFrom && score.discountedFrom.length > 0) {
                                        let isDiscounted = false;
                                        for (let j = 0; j < score.discountedFrom.length; j++) {
                                            const cMap = choiceMap.get(score.discountedFrom[j]);

                                            if (typeof cMap !== 'undefined') {
                                                const dChoice = cMap.choice;

                                                if (dChoice.useDiscountCount && typeof dChoice.discountCount !== 'undefined') {
                                                    const count = dChoice.isSelectableMultiple && dChoice.isMultipleUseVariable && dChoice.stackableDiscount ? dChoice.discountCount * dChoice.multipleUseVariable : dChoice.discountCount;
                                                    if (!dChoice.appliedDisChoices) dChoice.appliedDisChoices = [];
                                                    if (count > dChoice.appliedDisChoices.length) {
                                                        countSet.add(dChoice);
                                                        val = score.discountScore;
                                                        score.appliedDiscount = true;
                                                        isDiscounted = true;
                                                        break;
                                                    }
                                                } else {
                                                    val = score.discountScore;
                                                    score.appliedDiscount = true;
                                                    isDiscounted = true;
                                                    break;
                                                }
                                            }
                                        }
                                        if (!isDiscounted && typeof score.tmpDiscount !== 'undefined') {
                                            for (let j = 0; j < score.tmpDiscount.length; j++) {
                                                if (val > score.tmpDiscount[j].discountedValue) val = score.tmpDiscount[j].discountedValue;
                                            }
                                        }
                                    }
                                    val = point.allowFloat ? val : Math.floor(val);
                                    if (score.multiplyByTimes) {
                                        val = val * (selNum + 1);
                                    }
                                    point.startingSum -= val;
                                    score.isActiveMul[selNum] = true;
                                    let tmpScore = tmpScores.get(score.id);
                                    if (typeof tmpScore !== 'undefined') {
                                        tmpScores.set(score.id, val + tmpScore);
                                    } else {
                                        tmpScores.set(score.id, val);
                                    }
                                }
                            }
                        }

                        if (countSet.size > 0) {
                            countSet.forEach((dChoice) => {
                                if (dChoice.appliedDisChoices) {
                                    if (dChoice.appliedDisChoices.indexOf(localChoice.id) === -1) dChoice.appliedDisChoices.push(localChoice.id);
                                }
                            });
                        }
                    } else {
                        for (let i = 0; i < localChoice.scores.length; i++) {
                            const score = localChoice.scores[i];
                            if (typeof score.isActiveMulMinus === 'undefined') score.isActiveMulMinus = [];
                            if (checkRequirements(score.requireds) && score.isActiveMulMinus[selNum] || score.isActiveMulMinus[selNum]) {
                                const point = pointTypeMap.get(score.id);
                                if (typeof point !== 'undefined') {
                                    let val = score.discountIsOn && typeof score.discountScore !== 'undefined' ? score.discountScore : score.value;
                                    val = point.allowFloat ? val : Math.floor(val);
                                    if (score.multiplyByTimes) {
                                        val = val * (Math.abs(selNum));
                                    }
                                    point.startingSum -= val;
                                    let tmpScore = tmpScores.get(score.id);
                                    if (typeof tmpScore !== 'undefined') {
                                        tmpScores.set(score.id, val + tmpScore);
                                    } else {
                                        tmpScores.set(score.id, val);
                                    }
                                    delete score.isActiveMulMinus[selNum];
                                }
                            }
                        }
                    }

                    if (isPos) {
                        if (localChoice.duplicateRow) {
                            if (typeof localChoice.duplicateRowId !== 'undefined' && typeof localChoice.duplicateRowPlace !== 'undefined') {
                                duplicateRow(localChoice, origRow);
                            }
                        }
                        
                        if (localChoice.activateOtherChoice && typeof localChoice.activateThisChoice !== 'undefined') {
                            if (localChoice.isActivateRandom) {
                                selectForceRandomActivate(localChoice);
                            } else {
                                const list = localChoice.activateThisChoice.split(',');
                                for (let i = 0; i < list.length; i++) {
                                    const item = list[i].split('/ON#');
                                    const forceNum = item.length > 1 ? parseInt(item[1]) : 0;
                                    const cMap = choiceMap.get(item[0]);
                                    if (typeof cMap !== 'undefined') {
                                        const fRow = cMap.row;
                                        const fChoice = cMap.choice;
                                        if (fChoice.isSelectableMultiple || !wasActive) selectForceActivate(localChoice, fChoice, fRow, forceNum);
                                    } else {
                                        const groupData = groupMap.get(item[0]);
                                        if (typeof groupData !== 'undefined') {
                                            const groupEle = groupData.elements;
                                            for (let j = 0; j < groupEle.length; j++) {
                                                const cMap = choiceMap.get(groupEle[j]);
                                                if (typeof cMap !== 'undefined') {
                                                    const fRow = cMap.row;
                                                    const fChoice = cMap.choice;
                                                    if (fChoice.isSelectableMultiple || !wasActive) selectForceActivate(localChoice, fChoice, fRow, forceNum);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    Array.from(activatedMap.entries()).forEach(([id, val]) => {
                        const cMap = choiceMap.get(id);
                        if (typeof cMap !== 'undefined') {
                            const aRow = cMap.row;
                            const aChoice = cMap.choice;
                            if (aChoice.id !== localChoice.id) {
                                if (!checkRequirements(aChoice.requireds)) {
                                    if (aChoice.forcedActivated) {
                                        delete aChoice.forcedActivated;
                                        if (!aChoice.isAllowDeselect) tmpActivatedMap.set(aChoice.id, {multiple: val.multiple});
                                    }
                                    if (val.multiple === 0) {
                                        if (aChoice.isActive) deselectObject(aChoice, aRow);
                                    } else if (val.multiple > 0) {
                                        for (let i = 0; i < val.multiple; i++) {
                                            if (aChoice.isActive) selectedOneLess(aChoice, aRow);
                                        }
                                    }
                                }
                            }
                        }
                    });

                    if (localChoice.addToAllowChoice && typeof localChoice.idOfAllowChoice !== 'undefined' && typeof localChoice.numbAddToAllowChoice !== 'undefined') {
                        for (let i = 0; i < localChoice.idOfAllowChoice.length; i++) {
                            const aRow = rowMap.get(localChoice.idOfAllowChoice[i]);
                            if (typeof aRow !== 'undefined') {
                                aRow.allowedChoices += localChoice.numbAddToAllowChoice;
                                if (aRow.allowedChoices > 0 && aRow.currentChoices >= aRow.allowedChoices) {
                                    for (let j = 0; j < aRow.objects.length; j++) {
                                        const thisChoice = aRow.objects[j];
                                        if (thisChoice.isActive) {
                                            if (!thisChoice.forcedActivated) {
                                                if (thisChoice.isSelectableMultiple) {
                                                    let counter = thisChoice.multipleUseVariable;
                                                    for (let k = 0; k < counter; k++) {
                                                        selectedOneLess(thisChoice, aRow);
                                                    }
                                                } else {
                                                    if (thisChoice.isActive) deselectObject(thisChoice, aRow);
                                                }
                                            }
                                        }
                                        if (aRow.allowedChoices >= aRow.currentChoices) {
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (!wasActive) {
                        if (localChoice.isChangeVariables && typeof localChoice.changedVariables !== 'undefined') {
                            for (let i = 0; i < localChoice.changedVariables.length; i++) {
                                const variable = variableMap.get(localChoice.changedVariables[i]);
                                if (typeof variable !== 'undefined') {
                                    if (localChoice.changeType === '1') {
                                        variable.isTrue = true;
                                    } else if (localChoice.changeType === '2') {
                                        variable.isTrue = false;
                                    } else if (localChoice.changeType === '3') {
                                        variable.isTrue = !variable.isTrue;
                                    }
                                }
                            }
                        }

                        if (localChoice.backpackBtnRequirement) {
                            app.btnBackpackIsOn += 1;
                        }

                        if (localChoice.showAllAddons) {
                            app.showAllAddons += 1;
                        }

                        if (localChoice.changeBackground) {
                            if (localChoice.changeBgImage) {
                                if (typeof localChoice.bgImage !== 'undefined') {
                                    if (typeof app.bgImageStack === 'undefined') {
                                        app.bgImageStack = [];
                                        app.defaultBgImage = app.styling.backgroundImage || '';
                                    }
                                    app.bgImageStack.push({id: localChoice.id, data: localChoice.bgImage});
                                    app.styling.backgroundImage = localChoice.bgImage;
                                }
                            } else {
                                if (typeof localChoice.changedBgColorCode !== 'undefined') {
                                    if (typeof app.bgColorStack === 'undefined') {
                                        app.bgColorStack = [];
                                        app.defaultBgColor = app.styling.backgroundColor || '';
                                    }
                                    app.bgColorStack.push({id: localChoice.id, data: localChoice.changedBgColorCode});
                                    app.styling.backgroundColor = localChoice.changedBgColorCode;
                                }
                            }
                        }
                        
                        if (localChoice.changePointBar) {
                            if (localChoice.changeBarBgColorIsOn && typeof localChoice.changedBarBgColor !== 'undefined') {
                                if (typeof app.barBgColorStack === 'undefined') {
                                    app.barBgColorStack = [];
                                    app.defaultBarBgColor = app.styling.barBackgroundColor || '#FFFFFFFF';
                                }
                                app.barBgColorStack.push({id: localChoice.id, data: localChoice.changedBarBgColor});
                                app.styling.barBackgroundColor = localChoice.changedBarBgColor;
                            }
                            if (localChoice.changeBarIconColorIsOn && typeof localChoice.changedBarIconColor !== 'undefined') {
                                if (typeof app.barIconColorStack === 'undefined') {
                                    app.barIconColorStack = [];
                                    app.defaultBarIconColor = app.styling.barIconColor || '#0000008A';
                                }
                                app.barIconColorStack.push({id: localChoice.id, data: localChoice.changedBarIconColor});
                                app.styling.barIconColor = localChoice.changedBarIconColor;
                            }
                            if (localChoice.changeBarTextColorIsOn && typeof localChoice.changedBarTextColor !== 'undefined') {
                                if (typeof app.barTextColorStack === 'undefined') {
                                    app.barTextColorStack = [];
                                    app.defaultBarTextColor = app.styling.barTextColor || '#000000';
                                }
                                app.barTextColorStack.push({id: localChoice.id, data: localChoice.changedBarTextColor});
                                app.styling.barTextColor = localChoice.changedBarTextColor;
                            }
                        }

                        if (localChoice.changeTemplates) {
                            if (localChoice.changeTemplatesList && localChoice.changeToThisTemplate) {
                                const list = localChoice.changeTemplatesList.split(',');
                                
                                for (let i = 0; i < list.length; i++) {
                                    const item = list[i];
                                    const cMap = choiceMap.get(item);
                                    if (typeof cMap !== 'undefined') {
                                        const tChoice = cMap.choice;
                                        applyTemplate(tChoice, localChoice.id, localChoice.changeToThisTemplate);

                                        if(localChoice.changeAddonTemplate) {
                                            for (let j = 0; j < tChoice.addons.length; j++) {
                                                const tAddon = tChoice.addons[j];
                                                applyTemplate(tAddon, localChoice.id, localChoice.changeToThisTemplate);
                                            }
                                        }
                                        continue;
                                    }

                                    const tRow = rowMap.get(item);
                                    if (typeof tRow !== 'undefined') {
                                        applyTemplate(tRow, localChoice.id, localChoice.changeToThisTemplate);
                                        continue;
                                    }

                                    const groupData = groupMap.get(item[0]);
                                    if (typeof groupData !== 'undefined') {
                                        const groupRowEle = groupData.rowElements;

                                        for (let j = 0; j < groupRowEle.length; j++) {
                                            const gtRow = rowMap.get(groupRowEle[j]);
                                            if (typeof gtRow !== 'undefined') {
                                                applyTemplate(gtRow, localChoice.id, localChoice.changeToThisTemplate);
                                            }
                                        }
                                        const groupEle = groupData.elements;                                    
                                        for (let j = 0; j < groupEle.length; j++) {
                                            const gcMap = choiceMap.get(groupEle[j]);
                                            if (typeof gcMap !== 'undefined') {
                                                const gtChoice = gcMap.choice;
                                                applyTemplate(gtChoice, localChoice.id, localChoice.changeToThisTemplate);
                                            }
                                        }
                                        continue;
                                    }
                                }
                            }
                        }

                        if (localChoice.changeWidth) {
                            if (localChoice.changeWidthList && localChoice.changeToThisWidth) {
                                const list = localChoice.changeWidthList.split(',');
                                
                                for (let i = 0; i < list.length; i++) {
                                    const item = list[i];
                                    const cMap = choiceMap.get(item);
                                    if (typeof cMap !== 'undefined') {
                                        const tChoice = cMap.choice;
                                        applyWidth(tChoice, localChoice.id, localChoice.changeToThisWidth);
                                        continue;
                                    }

                                    const tRow = rowMap.get(item);
                                    if (typeof tRow !== 'undefined') {
                                        applyWidth(tRow, localChoice.id, localChoice.changeToThisWidth);
                                        continue;
                                    }

                                    const groupData = groupMap.get(item[0]);
                                    if (typeof groupData !== 'undefined') {
                                        const groupRowEle = groupData.rowElements;

                                        for (let j = 0; j < groupRowEle.length; j++) {
                                            const gtRow = rowMap.get(groupRowEle[j]);
                                            if (typeof gtRow !== 'undefined') {
                                                applyWidth(gtRow, localChoice.id, localChoice.changeToThisWidth);
                                            }
                                        }
                                        const groupEle = groupData.elements;                                    
                                        for (let j = 0; j < groupEle.length; j++) {
                                            const gcMap = choiceMap.get(groupEle[j]);
                                            if (typeof gcMap !== 'undefined') {
                                                const gtChoice = gcMap.choice;
                                                applyWidth(gtChoice, localChoice.id, localChoice.changeToThisWidth);
                                            }
                                        }
                                        continue;
                                    }
                                }
                            }
                        }

                        if (localChoice.setBgmIsOn) {
                            if (localChoice.bgmId) {
                                bgmVariables.bgmIsPlaying = true;
                                
                                if (bgmVariables.isBgmInit) {
                                    playBgm(localChoice, localChoice.bgmId, 0);
                                } else {
                                    initYoutubePlayer(localChoice);
                                    bgmVariables.isBgmInit = true;
                                }
                            }
                        }

                        if (localChoice.muteBgm && bgmPlayer) {
                            const player = get(bgmPlayer);

                            app.isMute = true;
                            if (player && typeof player.mute === 'function') {
                                player.mute();
                            }
                        }

                        if (localChoice.isContentHidden && typeof localChoice.hiddenContentsRow !== 'undefined' && typeof localChoice.hiddenContentsType !== 'undefined') {
                            for (let i = 0; i < localChoice.hiddenContentsRow.length; i++) {
                                const hRow = rowMap.get(localChoice.hiddenContentsRow[i]);
                                if (typeof hRow !== 'undefined') {
                                    if (!hRow.textIsRemoved) hRow.textIsRemoved = true;
                                    for (let j = 0; j < localChoice.hiddenContentsType.length; j++) {
                                        switch (localChoice.hiddenContentsType[j]) {
                                            case '1':
                                                hRow.objectTitleRemoved = true;
                                                break;
                                            case '2':
                                                hRow.objectImageRemoved = true;
                                                break;
                                            case '3':
                                                hRow.objectTextRemoved = true;
                                                break;
                                            case '4':
                                                hRow.objectScoreRemoved = true;
                                                break;
                                            case '5':
                                                hRow.objectRequirementRemoved = true;
                                                break;
                                            case '6':
                                                hRow.addonTitleRemoved = true;
                                                break;
                                            case '7':
                                                hRow.addonImageRemoved = true;
                                                break;
                                            case '8':
                                                hRow.addonTextRemoved = true;
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                }
                            }
                        }

                        if (localChoice.changeTemplates) {
                            if (localChoice.changeTemplatesList && localChoice.changeToThisTemplate) {
                                const list = localChoice.changeTemplatesList.split(',');
                                for (let i = 0; i < list.length; i++) {
                                    const item = list[i];
                                    const cMap = choiceMap.get(item);
                                    if (typeof cMap !== 'undefined') {
                                        const tChoice = cMap.choice;

                                        if (tChoice.defaultTemplate)
                                        tChoice.defaultTemplate = tChoice.template;
                                        tChoice.template = localChoice.changeToThisTemplate;

                                        if(localChoice.changeAddonTemplate) {

                                        }
                                    } else {
                                        const tRow = rowMap.get(item);

                                        if (typeof tRow !== 'undefined') {
                                            tRow.defaultTemplate = tRow.template;
                                            tRow.template = localChoice.changeToThisTemplate;
                                        } else {
                                            const groupData = groupMap.get(item[0]);

                                            if (typeof groupData !== 'undefined') {
                                                const groupRowEle = groupData.rowElements;

                                                for (let j = 0; j < groupRowEle.length; j++) {
                                                    const gtRow = rowMap.get(groupRowEle[j]);

                                                    if (typeof gtRow !== 'undefined') {
                                                        gtRow.defaultTemplate = gtRow.template;
                                                        gtRow.template = localChoice.changeToThisTemplate;
                                                    }
                                                }
                                                const groupEle = groupData.elements;
                                                
                                                for (let j = 0; j < groupEle.length; j++) {
                                                    const gcMap = choiceMap.get(groupEle[j]);

                                                    if (typeof gcMap !== 'undefined') {
                                                        const gtChoice = gcMap.choice;

                                                        gtChoice.defaultTemplate = gtChoice.template;
                                                        gtChoice.template = localChoice.changeToThisTemplate;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (localChoice.scrollToRow) {
                            tick().then(() => {
                                setTimeout(() => {
                                    if (localChoice.scrollToObject) {
                                        if (localChoice.scrollObjectId) {
                                            const cMap = choiceMap.get(localChoice.scrollObjectId);
                                            if (typeof cMap !== 'undefined') {
                                                const sChoice = cMap.choice;
                                                const sRow = cMap.row;
                                                const divs = mainDiv?.children[sRow.index]?.children[0]?.children[1]?.children;
                                                if (typeof divs !== 'undefined') {
                                                    if (isBackpack) {
                                                        const thisWindow = document.getElementById('backpackDialog');
                                                        thisWindow?.scrollTo({top: divs[sChoice.index].getBoundingClientRect().top + window.scrollY, behavior: 'smooth'});
                                                    } else {
                                                        window.scrollTo({top: divs[sChoice.index].getBoundingClientRect().top + window.scrollY, behavior: 'smooth'});
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                        if (localChoice.scrollRowId) {
                                            const sRow = rowMap.get(localChoice.scrollRowId);
                                            if (typeof sRow !== 'undefined') {
                                                const divs = mainDiv?.children;
                                                if (typeof divs !== 'undefined') {
                                                    if (isBackpack) {
                                                            const thisWindow = document.getElementById('backpackDialog');
                                                            thisWindow?.scrollTo({top: divs[sRow.index].getBoundingClientRect().top + window.scrollY, behavior: 'smooth'});
                                                    } else {
                                                        window.scrollTo({top: divs[sRow.index].getBoundingClientRect().top + window.scrollY, behavior: 'smooth'});
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }, 10);
                            });
                        }
                    }

                    selectUpdateScore(localChoice, tmpScores, 0);
                    activateTempChoices();

                    if (!checkRequirements(localChoice.requireds) && localChoice.isActive) {
                        selectedOneLess(localChoice, localRow);
                    }
                }

                if (reqCheck) {
                    if (localChoice.isMultipleUseVariable) {
                        if (typeof localChoice.multipleUseVariable === 'undefined') localChoice.multipleUseVariable = 0;
                        if (typeof localChoice.numMultipleTimesPluss === 'undefined') localChoice.numMultipleTimesPluss = 0;
                        if (localChoice.numMultipleTimesPluss > localChoice.multipleUseVariable) {
                            if (localChoice.isSelectDelayed && typeof localChoice.selectDelayTime !== 'undefined') {
                                if (!localChoice.selectDelayTimer) {
                                    localChoice.selectDelayTimer = window.setTimeout(() => {
                                        if (linkedObjects.indexOf(localChoice.id) === -1) {
                                            if (localChoice.isFadeTransition) {
                                                if (typeof localChoice.fadeTransitionColor === 'undefined' || localChoice.fadeTransitionColor === '') {
                                                    app.fadeTransitionColor = '000000FF';
                                                } else {
                                                    app.fadeTransitionColor = localChoice.fadeTransitionColor;
                                                }

                                                if (typeof localChoice.fadeInTransitionTime === 'undefined') {
                                                    app.fadeTransitionTime = 0.25;
                                                } else {
                                                    app.fadeTransitionTime = localChoice.fadeInTransitionTime / 1000;
                                                }

                                                app.fadeTransitionIsOn = true;
                                                window.setTimeout(() => {
                                                    if (typeof localChoice.fadeOutTransitionTime !== 'undefined') {
                                                        app.fadeTransitionTime = localChoice.fadeOutTransitionTime / 1000;
                                                    }
                                                    app.fadeTransitionIsOn = false;
                                                    selectProcess();
                                                }, app.fadeTransitionTime * 1000);
                                            } else {
                                                selectProcess();
                                            }
                                        }
                                        if (linkedObjects.indexOf(localChoice.id) === 0) {
                                            linkedObjects.splice(0);
                                        }
                                        delete localChoice.selectDelayTimer;
                                    }, localChoice.selectDelayTime);
                                }
                            } else {
                                if (linkedObjects.indexOf(localChoice.id) === -1) {
                                    if (localChoice.isFadeTransition) {
                                        if (typeof localChoice.fadeTransitionColor === 'undefined' || localChoice.fadeTransitionColor === '') {
                                            app.fadeTransitionColor = '000000FF';
                                        } else {
                                            app.fadeTransitionColor = localChoice.fadeTransitionColor;
                                        }

                                        if (typeof localChoice.fadeInTransitionTime === 'undefined') {
                                            app.fadeTransitionTime = 0.25;
                                        } else {
                                            app.fadeTransitionTime = localChoice.fadeInTransitionTime / 1000;
                                        }

                                        app.fadeTransitionIsOn = true;
                                        window.setTimeout(() => {
                                            if (typeof localChoice.fadeOutTransitionTime !== 'undefined') {
                                                app.fadeTransitionTime = localChoice.fadeOutTransitionTime / 1000;
                                            }
                                            app.fadeTransitionIsOn = false;
                                            selectProcess();
                                        }, app.fadeTransitionTime * 1000);
                                    } else {
                                        selectProcess();
                                    }
                                }
                                if (linkedObjects.indexOf(localChoice.id) === 0) {
                                    linkedObjects.splice(0);
                                }
                            }
                        }
                    } else if (typeof localChoice.multipleScoreId !== 'undefined') {
                        const point = pointTypeMap.get(localChoice.multipleScoreId);
                        if (typeof point !== 'undefined') {
                            if (typeof localChoice.numMultipleTimesPluss === 'undefined') localChoice.numMultipleTimesPluss = 0;
                            if (localChoice.numMultipleTimesPluss > point.startingSum) {
                                point.startingSum += 1;
                            }
                        }
                    }
                }
            }
        }
    }

    function selectedOneLess(localChoice: Choice, localRow: Row) {
        const pointCheck = checkPoints(localChoice, false);
        let origRow = localRow;
        if (localRow.isResultRow) {
            const cMap = choiceMap.get(localChoice.id);

            if (typeof cMap !== 'undefined') {
                origRow = cMap.row;
            }
        }
        
        if (pointCheck) {
            const deselectProcess = () => {
                const tmpScores = new SvelteMap<string, number>();
                const isPos = localChoice.multipleUseVariable > 0;
                const selNum = Math.abs(localChoice.multipleUseVariable - 1);

                if (isPos) {
                    for (let i = 0; i < localChoice.scores.length; i++) {
                        const score = localChoice.scores[i];
                        if (typeof score.isActiveMul !== 'undefined') {
                            if (checkRequirements(score.requireds) && score.isActiveMul[selNum] || score.isActiveMul[selNum]) {
                                const point = pointTypeMap.get(score.id);
                                if (typeof point !== 'undefined') {
                                    let val = score.discountIsOn && typeof score.discountScore !== 'undefined' ? score.discountScore : score.value;
                                    val = point.allowFloat ? val : Math.floor(val);
                                    if (score.multiplyByTimes) {
                                        val = val * (selNum + 1);
                                    }
                                    point.startingSum += val;
                                    let tmpScore = tmpScores.get(score.id);
                                    if (typeof tmpScore !== 'undefined') {
                                        tmpScores.set(score.id, -val + tmpScore);
                                    } else {
                                        tmpScores.set(score.id, -val);
                                    }
                                    delete score.isActiveMul[selNum];
                                    if (selNum === 0) delete score.setValue;
                                }
                            }
                        }
                    }

                    if (localChoice.activateOtherChoice && typeof localChoice.activateThisChoice !== 'undefined') {
                        if (localChoice.isActivateRandom && typeof localChoice.activatedRandomMul !== 'undefined' && typeof localChoice.activatedRandomMul[selNum] !== 'undefined') {
                            for (let i = 0; i < localChoice.activatedRandomMul[selNum].length; i++) {
                                const cMap = choiceMap.get(localChoice.activatedRandomMul[selNum][i]);
                                if (typeof cMap !== 'undefined') {
                                    const fRow = cMap.row;
                                    const fChoice = cMap.choice;
                                    deselectForceActivate(localChoice, fChoice, fRow, 0);
                                }
                            }
                            localChoice.activatedRandomMul.splice(selNum, 1);
                        } else {
                            const list = localChoice.activateThisChoice.split(',');
                            for (let i = 0; i < list.length; i++) {
                                const item = list[i].split('/ON#');
                                const forceNum = item.length > 1 ? parseInt(item[1]) : 0;
                                const cMap = choiceMap.get(item[0]);
                                if (typeof cMap !== 'undefined') {
                                    const fRow = cMap.row;
                                    const fChoice = cMap.choice;
                                    if (selNum === 0 || fChoice.isSelectableMultiple) deselectForceActivate(localChoice, fChoice, fRow, forceNum);
                                } else {
                                    const groupData = groupMap.get(item[0]);
                                    if (typeof groupData !== 'undefined') {
                                        const groupEle = groupData.elements;
                                        for (let j = 0; j < groupEle.length; j++) {
                                            const cMap = choiceMap.get(groupEle[j]);
                                            if (typeof cMap !== 'undefined') {
                                                const fRow = cMap.row;
                                                const fChoice = cMap.choice;
                                                if (selNum === 0 || fChoice.isSelectableMultiple) deselectForceActivate(localChoice, fChoice, fRow, forceNum);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (localChoice.discountOther) {
                        if (typeof localChoice.discountOperator !== 'undefined' && typeof localChoice.discountValue !== 'undefined' && (localChoice.stackableDiscount || !localChoice.stackableDiscount && localChoice.multipleUseVariable === 1)) {
                            if (typeof localChoice.discountPointTypes === 'undefined') localChoice.discountPointTypes = [];
                            if (localChoice.isDisChoices) {
                                const dList = new Set<string>();
                                if (typeof localChoice.discountRows !== 'undefined') {
                                    for (let i = 0; i < localChoice.discountRows.length; i++) {
                                        const dRow = rowMap.get(localChoice.discountRows[i]);
                                        if (typeof dRow !== 'undefined') {
                                            for (let j = 0; j < dRow.objects.length; j++) {
                                                const dChoice = dRow.objects[j];
                                                deselectDiscount(localChoice, dChoice);
                                                dList.add(dChoice.id);
                                            }
                                        }
                                    }
                                }
                                if (typeof localChoice.discountChoices !== 'undefined') {
                                    for (let i = 0; i < localChoice.discountChoices.length; i++) {
                                        if (!dList.has(localChoice.discountChoices[i])) {
                                            const cMap = choiceMap.get(localChoice.discountChoices[i]);
                                            if (typeof cMap !== 'undefined') {
                                                deselectDiscount(localChoice, cMap.choice);
                                            }
                                        }
                                    }
                                }
                            } else {
                                if (typeof localChoice.discountGroups !== 'undefined') {
                                    for (let i = 0; i < localChoice.discountGroups.length; i++) {
                                        const groupData = groupMap.get(localChoice.discountGroups[i]);
                                        if (typeof groupData !== 'undefined') {
                                            for (let j = 0; j < groupData.elements.length; j++) {
                                                const cMap = choiceMap.get(groupData.elements[j]);
                                                if (typeof cMap !== 'undefined') {
                                                    deselectDiscount(localChoice, cMap.choice);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    for (let i = 0; i < localChoice.scores.length; i++) {
                        const score = localChoice.scores[i];
                        if (typeof score.isActiveMulMinus === 'undefined') score.isActiveMulMinus = [];
                        if (checkRequirements(score.requireds) && !score.isActiveMulMinus[selNum]) {
                            const point = pointTypeMap.get(score.id);
                            if (typeof point !== 'undefined') {
                                let val = score.discountIsOn && typeof score.discountScore !== 'undefined' ? score.discountScore : score.value;
                                val = point.allowFloat ? val : Math.floor(val);
                                if (score.multiplyByTimes) {
                                    val = val * selNum;
                                }
                                point.startingSum += val;
                                let tmpScore = tmpScores.get(score.id);
                                if (typeof tmpScore !== 'undefined') {
                                    tmpScores.set(score.id, -val + tmpScore);
                                } else {
                                    tmpScores.set(score.id, -val);
                                }
                                score.isActiveMulMinus[selNum] = true;
                            }
                        }
                    }
                }

                localChoice.multipleUseVariable -= 1;

                if (localChoice.multipleUseVariable === 0) {
                    localChoice.isActive = false;
                    origRow.currentChoices -= 1;
                    activatedMap.delete(localChoice.id);
                } else {
                    if (localChoice.multipleUseVariable === -1) {
                        localChoice.isActive = true;
                        origRow.currentChoices += 1;
                    }
                    activatedMap.set(localChoice.id, {multiple: localChoice.multipleUseVariable});
                }

                Array.from(activatedMap.entries()).forEach(([id, val]) => {
                    const cMap = choiceMap.get(id);
                    if (typeof cMap !== 'undefined') {
                        const aRow = cMap.row;
                        const aChoice = cMap.choice;
                        if (aChoice.id !== localChoice.id) {
                            if (!checkRequirements(aChoice.requireds)) {
                                if (aChoice.forcedActivated) {
                                    delete aChoice.forcedActivated;
                                    if (!aChoice.isAllowDeselect) tmpActivatedMap.set(aChoice.id, {multiple: val.multiple});
                                }
                                if (val.multiple === 0) {
                                    if (aChoice.forcedActivated) delete aChoice.forcedActivated;
                                    if (aChoice.isActive) deselectObject(aChoice, aRow);
                                } else if (val.multiple > 0) {
                                    for (let i = 0; i < val.multiple; i++) {
                                        if (aChoice.isActive) selectedOneLess(aChoice, aRow);
                                    }
                                }
                            }
                        }
                    }
                });

                if (localChoice.addToAllowChoice && typeof localChoice.idOfAllowChoice !== 'undefined' && typeof localChoice.numbAddToAllowChoice !== 'undefined') {
                    for (let i = 0; i < localChoice.idOfAllowChoice.length; i++) {
                        const aRow = rowMap.get(localChoice.idOfAllowChoice[i]);
                        if (typeof aRow !== 'undefined') {
                            aRow.allowedChoices -= localChoice.numbAddToAllowChoice;
                            if (aRow.allowedChoices > 0 && aRow.currentChoices >= aRow.allowedChoices) {
                                for (let j = 0; j < aRow.objects.length; j++) {
                                    const thisChoice = aRow.objects[j];
                                    if (thisChoice.isActive) {
                                        if (!thisChoice.forcedActivated) {
                                            if (thisChoice.isSelectableMultiple) {
                                                let counter = thisChoice.multipleUseVariable;
                                                for (let k = 0; k < counter; k++) {
                                                    selectedOneLess(thisChoice, aRow);
                                                }
                                            } else {
                                                if (thisChoice.isActive) deselectObject(thisChoice, aRow);
                                            }
                                        }
                                    }    
                                    if (aRow.allowedChoices >= aRow.currentChoices) {
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }

                if (selNum === 0) {
                    if (localChoice.isChangeVariables && typeof localChoice.changedVariables !== 'undefined') {
                        for (let i = 0; i < localChoice.changedVariables.length; i++) {
                            const variable = variableMap.get(localChoice.changedVariables[i]);
                            if (typeof variable !== 'undefined') {
                                if (localChoice.changeType === '1') {
                                    variable.isTrue = false;
                                } else if (localChoice.changeType === '2') {
                                    variable.isTrue = true;
                                } else if (localChoice.changeType === '3') {
                                    variable.isTrue = !variable.isTrue;
                                }
                            }
                        }
                    }

                    if (localChoice.backpackBtnRequirement) {
                        if (typeof app.btnBackpackIsOn !== 'undefined') {
                            app.btnBackpackIsOn -= 1;
                        }
                    }

                    if (localChoice.showAllAddons) {
                        if (typeof app.showAllAddons !== 'undefined') {
                            app.showAllAddons -= 1;
                        }
                    }

                    if (localChoice.changeBackground) {
                        if (localChoice.changeBgImage) {
                            if (typeof app.bgImageStack !== 'undefined') {
                                const idx = app.bgImageStack.findIndex(item => item.id === localChoice.id);
                                if (idx !== -1) app.bgImageStack.splice(idx, 1);

                                const leng = app.bgImageStack.length;
                                if (leng > 0) {
                                    app.styling.backgroundImage = app.bgImageStack[leng - 1].data;
                                } else {
                                    app.styling.backgroundImage = app.defaultBgImage || '';
                                    delete app.bgImageStack;
                                }
                            }
                        } else {
                            if (typeof localChoice.changedBgColorCode !== 'undefined') {
                                if (typeof app.bgColorStack !== 'undefined') {
                                    const idx = app.bgColorStack.findIndex(item => item.id === localChoice.id);
                                    if (idx !== -1) app.bgColorStack.splice(idx, 1);

                                    const leng = app.bgColorStack.length;
                                    if (leng > 0) {
                                        app.styling.backgroundColor = app.bgColorStack[leng - 1].data;
                                    } else {
                                        app.styling.backgroundColor = app.defaultBgColor || '#FFFFFFFF';
                                        delete app.bgColorStack;
                                    }
                                }
                            }
                        }
                    }
                    
                    if (localChoice.changePointBar) {
                        if (localChoice.changeBarBgColorIsOn && typeof localChoice.changedBarBgColor !== 'undefined') {
                            if (typeof app.barBgColorStack !== 'undefined') {
                                const idx = app.barBgColorStack.findIndex(item => item.id === localChoice.id);
                                if (idx !== -1) app.barBgColorStack.splice(idx, 1);

                                const leng = app.barBgColorStack.length;
                                if (leng > 0) {
                                    app.styling.barBackgroundColor = app.barBgColorStack[leng - 1].data;
                                } else {
                                    app.styling.barBackgroundColor = app.defaultBarBgColor || '#FFFFFFFF';
                                    delete app.barBgColorStack;
                                }
                            }
                        }
                        if (localChoice.changeBarIconColorIsOn && typeof localChoice.changedBarIconColor !== 'undefined') {
                            if (typeof app.barIconColorStack !== 'undefined') {
                                const idx = app.barIconColorStack.findIndex(item => item.id === localChoice.id);
                                if (idx !== -1) app.barIconColorStack.splice(idx, 1);

                                const leng = app.barIconColorStack.length;
                                if (leng > 0) {
                                    app.styling.barIconColor = app.barIconColorStack[leng - 1].data;
                                } else {
                                    app.styling.barIconColor = app.defaultBarIconColor || '#0000008A';
                                    delete app.barIconColorStack;
                                }
                            }
                        }
                        if (localChoice.changeBarTextColorIsOn && typeof localChoice.changedBarTextColor !== 'undefined') {
                            if (typeof app.barTextColorStack !== 'undefined') {
                                const idx = app.barTextColorStack.findIndex(item => item.id === localChoice.id);
                                if (idx !== -1) app.barTextColorStack.splice(idx, 1);

                                const leng = app.barTextColorStack.length;
                                if (leng > 0) {
                                    app.styling.barTextColor = app.barTextColorStack[leng - 1].data;
                                } else {
                                    app.styling.barTextColor = app.defaultBarIconColor || '#000000';
                                    delete app.barTextColorStack;
                                }
                            }
                        }
                    }

                    if (localChoice.changeTemplates) {
                        if (localChoice.changeTemplatesList && localChoice.changeToThisTemplate) {
                            const list = localChoice.changeTemplatesList.split(',');
                            
                            for (let i = 0; i < list.length; i++) {
                                const item = list[i];
                                const cMap = choiceMap.get(item);
                                if (typeof cMap !== 'undefined') {
                                    const tChoice = cMap.choice;
                                    revertTemplate(tChoice, localChoice.id);

                                    if(localChoice.changeAddonTemplate) {
                                        for (let j = 0; j < tChoice.addons.length; j++) {
                                            const tAddon = tChoice.addons[j];
                                            revertTemplate(tAddon, localChoice.id);
                                        }
                                    }
                                    continue;
                                }

                                const tRow = rowMap.get(item);
                                if (typeof tRow !== 'undefined') {
                                    revertTemplate(tRow, localChoice.id);
                                    continue;
                                }

                                const groupData = groupMap.get(item[0]);
                                if (typeof groupData !== 'undefined') {
                                    const groupRowEle = groupData.rowElements;

                                    for (let j = 0; j < groupRowEle.length; j++) {
                                        const gtRow = rowMap.get(groupRowEle[j]);
                                        if (typeof gtRow !== 'undefined') {
                                            revertTemplate(gtRow, localChoice.id);
                                        }
                                    }
                                    const groupEle = groupData.elements;                                    
                                    for (let j = 0; j < groupEle.length; j++) {
                                        const gcMap = choiceMap.get(groupEle[j]);
                                        if (typeof gcMap !== 'undefined') {
                                            const gtChoice = gcMap.choice;
                                            revertTemplate(gtChoice, localChoice.id);
                                        }
                                    }
                                    continue;
                                }
                            }
                        }
                    }

                    if (localChoice.changeWidth) {
                        if (localChoice.changeWidthList && localChoice.changeToThisWidth) {
                            const list = localChoice.changeWidthList.split(',');
                            
                            for (let i = 0; i < list.length; i++) {
                                const item = list[i];
                                const cMap = choiceMap.get(item);
                                if (typeof cMap !== 'undefined') {
                                    const tChoice = cMap.choice;
                                    revertWidth(tChoice, localChoice.id);
                                    continue;
                                }

                                const tRow = rowMap.get(item);
                                if (typeof tRow !== 'undefined') {
                                    revertWidth(tRow, localChoice.id);
                                    continue;
                                }

                                const groupData = groupMap.get(item[0]);
                                if (typeof groupData !== 'undefined') {
                                    const groupRowEle = groupData.rowElements;

                                    for (let j = 0; j < groupRowEle.length; j++) {
                                        const gtRow = rowMap.get(groupRowEle[j]);
                                        if (typeof gtRow !== 'undefined') {
                                            revertWidth(gtRow, localChoice.id);
                                        }
                                    }
                                    const groupEle = groupData.elements;                                    
                                    for (let j = 0; j < groupEle.length; j++) {
                                        const gcMap = choiceMap.get(groupEle[j]);
                                        if (typeof gcMap !== 'undefined') {
                                            const gtChoice = gcMap.choice;
                                            revertWidth(gtChoice, localChoice.id);
                                        }
                                    }
                                    continue;
                                }
                            }
                        }
                    }

                    if (localChoice.setBgmIsOn && bgmPlayer) {
                        if (localChoice.bgmId) {
                            bgmVariables.bgmIsPlaying = false;
                            playBgm(localChoice, localChoice.bgmId, 0);
                        }
                    }

                    if (localChoice.muteBgm && bgmPlayer) {
                        const player = get(bgmPlayer);

                        app.isMute = false;
                        if (player && typeof player.unMute === 'function') {
                            player.unMute();
                        }
                    }

                    if (localChoice.isContentHidden && typeof localChoice.hiddenContentsRow !== 'undefined' && typeof localChoice.hiddenContentsType !== 'undefined') {
                        for (let i = 0; i < localChoice.hiddenContentsRow.length; i++) {
                            const hRow = rowMap.get(localChoice.hiddenContentsRow[i]);
                            if (typeof hRow !== 'undefined') {
                                for (let j = 0; j < localChoice.hiddenContentsType.length; j++) {
                                    switch (localChoice.hiddenContentsType[j]) {
                                        case '1':
                                            hRow.objectTitleRemoved = false;
                                            break;
                                        case '2':
                                            hRow.objectImageRemoved = false;
                                            break;
                                        case '3':
                                            hRow.objectTextRemoved = false;
                                            break;
                                        case '4':
                                            hRow.objectScoreRemoved = false;
                                            break;
                                        case '5':
                                            hRow.objectRequirementRemoved = false;
                                            break;
                                        case '6':
                                            hRow.addonTitleRemoved = false;
                                            break;
                                        case '7':
                                            hRow.addonImageRemoved = false;
                                            break;
                                        case '8':
                                            hRow.addonTextRemoved = false;
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            }
                        }
                    }
                }

                deselectUpdateScore(localChoice, tmpScores, 0);
                activateTempChoices();
            }

            if (!localRow.isInfoRow && !localChoice.isNotSelectable && !localChoice.selectOnce) {
                if (localChoice.isMultipleUseVariable) {
                    if (typeof localChoice.numMultipleTimesMinus === 'undefined') localChoice.numMultipleTimesMinus = 0;
                    if (localChoice.multipleUseVariable > localChoice.numMultipleTimesMinus) {
                        if (localChoice.isSelectDelayed && typeof localChoice.selectDelayTime !== 'undefined') {
                            if (!localChoice.selectDelayTimer) {
                                localChoice.selectDelayTimer = window.setTimeout(() => {
                                    if (linkedObjects.indexOf(localChoice.id) === -1) {
                                        if (localChoice.isFadeTransition) {
                                            if (typeof localChoice.fadeTransitionColor === 'undefined' || localChoice.fadeTransitionColor === '') {
                                                app.fadeTransitionColor = '000000FF';
                                            } else {
                                                app.fadeTransitionColor = localChoice.fadeTransitionColor;
                                            }

                                            if (typeof localChoice.fadeInTransitionTime === 'undefined') {
                                                app.fadeTransitionTime = 0.25;
                                            } else {
                                                app.fadeTransitionTime = localChoice.fadeInTransitionTime / 1000;
                                            }

                                            app.fadeTransitionIsOn = true;
                                            window.setTimeout(() => {
                                                if (typeof localChoice.fadeOutTransitionTime !== 'undefined') {
                                                    app.fadeTransitionTime = localChoice.fadeOutTransitionTime / 1000;
                                                }
                                                app.fadeTransitionIsOn = false;
                                                deselectProcess();
                                            }, app.fadeTransitionTime * 1000);
                                        } else {
                                            deselectProcess();
                                        }
                                    }
                                    if (linkedObjects.indexOf(localChoice.id) === 0) {
                                        linkedObjects.splice(0);
                                    }
                                    delete localChoice.selectDelayTimer;
                                }, localChoice.selectDelayTime);
                            }
                        } else {
                            if (linkedObjects.indexOf(localChoice.id) === -1) {
                                if (localChoice.isFadeTransition) {
                                    if (typeof localChoice.fadeTransitionColor === 'undefined' || localChoice.fadeTransitionColor === '') {
                                        app.fadeTransitionColor = '000000FF';
                                    } else {
                                        app.fadeTransitionColor = localChoice.fadeTransitionColor;
                                    }

                                    if (typeof localChoice.fadeInTransitionTime === 'undefined') {
                                        app.fadeTransitionTime = 0.25;
                                    } else {
                                        app.fadeTransitionTime = localChoice.fadeInTransitionTime / 1000;
                                    }

                                    app.fadeTransitionIsOn = true;
                                    window.setTimeout(() => {
                                        if (typeof localChoice.fadeOutTransitionTime !== 'undefined') {
                                            app.fadeTransitionTime = localChoice.fadeOutTransitionTime / 1000;
                                        }
                                        app.fadeTransitionIsOn = false;
                                        deselectProcess();
                                    }, app.fadeTransitionTime * 1000);
                                } else {
                                    deselectProcess();
                                }
                            }
                            if (linkedObjects.indexOf(localChoice.id) === 0) {
                                linkedObjects.splice(0);
                            }
                        }
                    }
                } else if (typeof localChoice.multipleScoreId !== 'undefined') {
                    const point = pointTypeMap.get(localChoice.multipleScoreId);
                    if (typeof point !== 'undefined') {
                        if (typeof localChoice.numMultipleTimesMinus === 'undefined') localChoice.numMultipleTimesMinus = 0;
                        if (point.startingSum > localChoice.numMultipleTimesMinus) {
                            point.startingSum -= 1;
                        }
                    }
                }
            }
        }
    }

    function copyTooltip(e: Event) {
        e.preventDefault();
        navigator.clipboard.writeText(choice.imageSourceTooltip).then(() => {
            snackbarVariables.labelText = 'Tooltip copied to clipboard.';
            snackbarVariables.isOpen = true;
        }).catch(() => {
            console.log(choice.imageSourceTooltip);
            snackbarVariables.labelText = 'Tooltip text logged to developer console.';
            snackbarVariables.isOpen = true;
        });
    }
</script>