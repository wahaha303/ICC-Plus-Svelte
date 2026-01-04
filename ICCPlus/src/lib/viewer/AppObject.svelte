{#if isShown}
    <div class={objectWidthClass()}>
        <div class:fullHeight={fullHeight} class="d-flex">
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div class="row row-{row.id} choice-{choice.id} {isActive ? 'choice-selected' : 'choice-unselected'} {isEnabled ? 'choice-enabled' : 'choice-disabled'} {(isActive && filterStyle.selOverlayOnImage) || (!isEnabled && filterStyle.reqOverlayOnImage) ? 'bg-overlay ' : ''}w-100" style={objectBackground} onclickcapture={(e) => activateObject(choice, row, e, true)}>
                {#if choice.template >= 4 || choice.template === 1 || windowWidth <= 1280 || row.choicesShareTemplate}
                    <div class="d-column w-100 p-0 align-items-center">
                        {#if row.resultShowRowTitle}
                            {#key oriTitleKey}
                                <div class="col-12" style={scoreText}>
                                    {@html DOMPurify.sanitize(oriTitleKey, sanitizeArg)}
                                </div>
                            {/key}
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
                                {#key choiceTitleKey}
                                    <h3 class="m-0" style={objectTitle}>
                                        {@html DOMPurify.sanitize(choiceTitleKey, sanitizeArg)}
                                    </h3>
                                {/key}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 0}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                            {/if}
                            {#if !row.objectScoreRemoved && !choice.showScoreInAddon}
                                {#each choice.scores as score}
                                    <ObjectScore score={score} row={row} choice={choice} />
                                {/each}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 1}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                            {/if}
                            {#if !row.objectRequirementRemoved && !choice.showReqInAddon}
                                {#each choice.requireds as required}
                                    <ObjectRequired required={required} scoreText={scoreText} />
                                {/each}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 2}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                            {/if}
                            {#if choice.template === 5 && windowWidth > 1280 && choice.image && !row.objectImageRemoved}
                                {#if choice.imageSourceTooltip}
                                    <img use:tooltip={choice.imageSourceTooltip} oncontextmenu={copyTooltip} src={choice.image} style={objectImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                                {:else}
                                    <img src={choice.image} style={objectImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                                {/if}
                            {/if}
                            {#if choice.text !== '' && !row.objectTextRemoved}
                                {#key choiceTextKey}
                                    <p class="mb-0" style={objectText}>
                                        {@html DOMPurify.sanitize(choiceTextKey, sanitizeArg)}
                                    </p>
                                {/key}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 3}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice}  selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
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
                            <div class="row p-0 w-100{addonJustify}">
                                {#each choice.addons as addon, i}
                                    {#if app.showAllAddons > 0 || (!addon.hideAddon || choice.isActive) && (addon.showAddon || checkRequirements(addon.requireds))}
                                        <ObjectAddon row={row} choice={choice} addon={addon} isEnabled={isEnabled} windowWidth={windowWidth} preloadImages={preloadImages} isFirst={firstAddonIndex === i} />
                                    {/if}
                                {/each}
                            </div>
                        {/if}
                        {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 4}
                            <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
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
                                {#key choiceTitleKey}<h2 class="mb-0" style={objectTitle}>{@html DOMPurify.sanitize(choiceTitleKey, sanitizeArg)}</h2>{/key}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 0}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                            {/if}
                            {#if !row.objectScoreRemoved && !choice.showScoreInAddon}
                                {#each choice.scores as score}
                                    <ObjectScore score={score} row={row} choice={choice} />
                                {/each}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 1}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                            {/if}
                            {#if !row.objectRequirementRemoved && !choice.showReqInAddon}
                                {#each choice.requireds as required}
                                    <ObjectRequired required={required} scoreText={scoreText} />
                                {/each}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 2}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                            {/if}
                            {#if choice.text !== '' && !row.objectTextRemoved}
                                {#key choiceTextKey}
                                    <p class="mb-0" style={objectText}>
                                        {@html DOMPurify.sanitize(replaceText(choice.text), sanitizeArg)}
                                    </p>
                                {/key}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 3}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
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
                                    <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
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
                                    <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                                {/if}
                            </div>
                        {/if}
                    {:else if choice.template === 3}
                        <div class="col p-0 text-center" style="max-width: {100 - choiceImageBoxWidth}%">
                            {#if choice.title !== '' && !row.objectTitleRemoved}
                                {#key choiceTitleKey}<h2 class="mb-0" style={objectTitle}>{@html DOMPurify.sanitize(choiceTitleKey, sanitizeArg)}</h2>{/key}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 0}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                            {/if}
                            {#if !row.objectScoreRemoved && !choice.showScoreInAddon}
                                {#each choice.scores as score}
                                    <ObjectScore score={score} row={row} choice={choice} />
                                {/each}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 1}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                            {/if}
                            {#if !row.objectRequirementRemoved && !choice.showReqInAddon}
                                {#each choice.requireds as required}
                                    <ObjectRequired required={required} scoreText={scoreText} />
                                {/each}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 2}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                            {/if}
                            {#if choice.text !== '' && !row.objectTextRemoved}
                                {#key choiceTextKey}
                                    <p class="mb-0" style={objectText}>
                                        {@html DOMPurify.sanitize(choiceTextKey, sanitizeArg)}
                                    </p>
                                {/key}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 3}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
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
                                    <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
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
                                    <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                                {/if}
                            </div>
                        {/if}
                    {/if}
                {/if}
            </div>
        </div>
    </div>
{/if}

<script lang="ts">
    import DOMPurify from 'dompurify';
    import ObjectAddon from './Object/ObjectAddon.svelte';
    import ObjectMultiChoice from './Object/ObjectMultiChoice.svelte';
    import ObjectRequired from './Object/ObjectRequired.svelte';
    import ObjectScore from './Object/ObjectScore.svelte';
	import type { Choice, choiceOptions, Row } from '$lib/store/types';
	import { app, choiceMap, getStyling, checkRequirements, sanitizeArg, replaceText, objectWidthToNum, snackbarVariables, winWidth, hexToRgba, selectObject, deselectObject, selectedOneMore, selectedOneLess } from '$lib/store/store.svelte';
    import { tooltip } from '$lib/custom/tooltip/store.svelte';

    export { activateObject, options };
    
    const { row, choice, windowWidth, preloadImages = false, isBackpack, mainDiv }: { row: Row, choice: Choice, index: number, windowWidth: number, preloadImages?: boolean, isBackpack?: boolean, mainDiv?: HTMLDivElement } = $props();
    const linkedObjects: string[] = [];
    const options: choiceOptions = {linkedObjects: linkedObjects, mainDiv: mainDiv, bCreatorMode: false, isBackpack: isBackpack, isOverDlg: false};

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
    let oriTitleKey = $derived(replaceText(oriRow.title !== '' ? oriRow.title : oriRow.debugTitle || ''));
    let choiceTitleKey = $derived(replaceText(choice.title));
    let choiceTextKey = $derived(replaceText(choice.text));

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
                styles.push(`box-shadow: ${objectStyle.objectDropShadowH}px ${objectStyle.objectDropShadowV}px ${objectStyle.objectDropShadowBlur}px ${objectStyle.objectDropShadowSpread}px ${hexToRgba(objectStyle.objectDropShadowColor)};`);
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
            styles.push(`object-fit: ${objectImageStyle.objectImgObjectFillStyle};`);
            const imgHeight = row.objectImgObjectFillHeight || objectImageStyle.objectImgObjectFillHeight;
            if (imgHeight) {
                styles.push(`height: ${imgHeight}px;`);
            }
        }
        styles.push(`border-radius: ${objectImageStyle.objectImgBorderRadiusTopLeft}${suffix} ${objectImageStyle.objectImgBorderRadiusTopRight}${suffix} ${objectImageStyle.objectImgBorderRadiusBottomRight}${suffix} ${objectImageStyle.objectImgBorderRadiusBottomLeft}${suffix};`);
        if (objectImageStyle.objectImgOverflowIsOn) {
            styles.push(`overflow: hidden;`);
        }
        if (objectImageStyle.objectImgBorderIsOn) {
            const borderColor = isEnabled ? (isActive && filterStyle.selImgBorderColorIsOn && filterStyle.selFilterImgBorderColor) || objectImageStyle.objectImgBorderColor : (filterStyle.reqImgBorderColorIsOn && filterStyle.reqFilterImgBorderColor) || objectImageStyle.objectImgBorderColor;
            styles.push(`border: ${objectImageStyle.objectImgBorderWidth}px ${objectImageStyle.objectImgBorderStyle} ${hexToRgba(borderColor)};`);
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

    $effect(() => {
        if (mainDiv) options.mainDiv = mainDiv;
        if (isBackpack) options.isBackpack = isBackpack;
    });

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

    function closestByClassPrefix(el: HTMLElement, prefix: string, endpoint: string) {
        let current: HTMLElement | null = el;
        let isEnd = false;

        while (current) {
            for (const cls of current.classList) {
                if (cls.startsWith(prefix)) return true;
                if (cls.startsWith(endpoint)) isEnd = true;
            }
            if (isEnd) return false;
            current = current.parentElement;
        }

        return false;
    }

    function activateObject(localChoice: Choice, localRow: Row, e?: MouseEvent, isManually: boolean = false) {
        const target = e && e.target ? e.target as HTMLElement : null
        let origRow = localRow;

        if (target && localChoice.isActive && localChoice.addons && localChoice.addons.length > 0) {
            if (closestByClassPrefix(target, 'addon-', 'addon')) return;
        }

        if (localRow.isResultRow || localRow.isGroupRow) {
            const cMap = choiceMap.get(localChoice.id);

            if (typeof cMap !== 'undefined') {
                origRow = cMap.row;
            }
        }

        if (localChoice.isSelectableMultiple) {
            if (localChoice.id === choice.id && localChoice.allowSelectByClick && localChoice.multipleUseVariable === 0) {
                if (target) {
                    if (closestByClassPrefix(target, 'multi-', 'choice-')) return;
                }

                selectedOneMore(localChoice, origRow, options);
            }
        } else {
            if (checkRequirements(localChoice.requireds) && !localRow.isInfoRow && (!isManually || !localChoice.isNotSelectable) && !localChoice.forcedActivated) {
                if (localChoice.isActive) {
                    if (!localChoice.selectOnce) deselectObject(localChoice, origRow, options);
                } else {
                    selectObject(localChoice, origRow, options);
                }
            }
        }
    }

    function copyTooltip(e: Event) {
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