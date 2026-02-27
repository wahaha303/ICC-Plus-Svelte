{#if isShown}
    <div class={objectWidthClass()}>
        <div class:fullHeight={fullHeight} class="d-flex">
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div class="row row-{row.id} choice-{choice.id} {isActive ? 'choice-selected' : 'choice-unselected'} {isEnabled ? 'choice-enabled' : 'choice-disabled'} {(isActive && filterStyle.selOverlayOnImage) || (!isEnabled && filterStyle.reqOverlayOnImage) ? 'bg-overlay ' : ''}w-100" style={objectBackground} onclickcapture={(e) => activateObject(choice, row, e, true)}>
                {#if choice.template >= 4 || choice.template === 1 || windowWidth <= 1280 || row.choicesShareTemplate}
                    <div class="d-column w-100 p-0 align-items-center" style={sAddons ? objectFilter : undefined}>
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
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                            {/if}
                            {#if !row.objectScoreRemoved && !choice.showScoreInAddon}
                                {#each choice.scores as score}
                                    <ObjectScore score={score} row={row} choice={choice} />
                                {/each}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 1}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                            {/if}
                            {#if !row.objectRequirementRemoved && !choice.showReqInAddon}
                                {#each choice.requireds as required}
                                    <ObjectRequired required={required} scoreText={scoreText} />
                                {/each}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 2}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
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
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                            {/if}
                            {#if choice.template === 4 && windowWidth > 1280 && choice.image && !row.objectImageRemoved}
                                {#if choice.imageSourceTooltip}
                                    <img use:tooltip={choice.imageSourceTooltip} oncontextmenu={copyTooltip} src={choice.image} style={objectImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                                {:else}
                                    <img src={choice.image} style={objectImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                                {/if}
                            {/if}
                        </div>
                        {#if nAddons}
                            <div class="row g-0 p-0 w-100{addonJustify}">
                                {#each nAddons as addon, i}
                                    {#if app.showAllAddons > 0 || (!addon.hideAddon || choice.isActive) && (addon.showAddon || checkRequirements(addon.requireds))}
                                        <ObjectAddon row={row} choice={choice} addon={addon} isEnabled={isEnabled} windowWidth={windowWidth} preloadImages={preloadImages} isFirst={firstAddonIndex === i} isBackpack={isBackpack} mainDiv={mainDiv} />
                                    {/if}
                                {/each}
                            </div>
                        {/if}
                        {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 4}
                            <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                        {/if}
                    </div>
                    {#if sAddons}
                        <div class="row g-0 p-0 w-100{addonJustify}">
                            {#each sAddons as addon, i}
                                {#if app.showAllAddons > 0 || (!addon.hideAddon || choice.isActive) && (addon.showAddon || checkRequirements(addon.requireds))}
                                    <ObjectAddon row={row} choice={choice} addon={addon} isEnabled={isEnabled} windowWidth={windowWidth} preloadImages={preloadImages} isFirst={firstAddonIndex === i} isBackpack={isBackpack} mainDiv={mainDiv} index={i} list={sAddons as SelectableAddon[]} />
                                {/if}
                            {/each}
                        </div>
                    {/if}
                {:else}
                    {#if choice.template === 2}
                        <div class="row g-0" style={sAddons ? objectFilter : undefined}>
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
                                    <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                                {/if}
                                {#if !row.objectScoreRemoved && !choice.showScoreInAddon}
                                    {#each choice.scores as score}
                                        <ObjectScore score={score} row={row} choice={choice} />
                                    {/each}
                                {/if}
                                {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 1}
                                    <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                                {/if}
                                {#if !row.objectRequirementRemoved && !choice.showReqInAddon}
                                    {#each choice.requireds as required}
                                        <ObjectRequired required={required} scoreText={scoreText} />
                                    {/each}
                                {/if}
                                {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 2}
                                    <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                                {/if}
                                {#if choice.text !== '' && !row.objectTextRemoved}
                                    {#key choiceTextKey}
                                        <p class="mb-0" style={objectText}>
                                            {@html DOMPurify.sanitize(replaceText(choice.text), sanitizeArg)}
                                        </p>
                                    {/key}
                                {/if}
                                {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 3}
                                    <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                                {/if}
                                {#if !choice.useSeperateAddon}
                                    {#if nAddons}
                                        <div class="row g-0 p-0 col w-100{addonJustify}">
                                            {#each nAddons as addon, i}
                                                {#if app.showAllAddons > 0 || (!addon.hideAddon || choice.isActive) && (addon.showAddon || checkRequirements(addon.requireds))}
                                                    <ObjectAddon row={row} choice={choice} addon={addon} isEnabled={isEnabled} windowWidth={windowWidth} preloadImages={preloadImages} isFirst={firstAddonIndex === i} isBackpack={isBackpack} mainDiv={mainDiv} />
                                                {/if}
                                            {/each}
                                        </div>
                                    {/if}
                                    {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 4}
                                        <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                                    {/if}
                                {/if}
                            </div>
                            {#if choice.useSeperateAddon}
                                <div class="col-12 text-center">
                                    {#if nAddons}
                                        <div class="row g-0 p-0 col w-100{addonJustify}">
                                            {#each nAddons as addon, i}
                                                {#if app.showAllAddons > 0 || (!addon.hideAddon || choice.isActive) && (addon.showAddon || checkRequirements(addon.requireds))}
                                                    <ObjectAddon row={row} choice={choice} addon={addon} isEnabled={isEnabled} windowWidth={windowWidth} preloadImages={preloadImages} isFirst={firstAddonIndex === i} isBackpack={isBackpack} mainDiv={mainDiv} />
                                                {/if}
                                            {/each}
                                        </div>
                                    {/if}
                                    {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 4}
                                        <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                                    {/if}
                                </div>
                            {/if}
                        </div>
                        {#if sAddons}
                            <div class="row g-0 p-0 col w-100{addonJustify}">
                                {#each sAddons as addon, i}
                                    {#if app.showAllAddons > 0 || (!addon.hideAddon || choice.isActive) && (addon.showAddon || checkRequirements(addon.requireds))}
                                        <ObjectAddon row={row} choice={choice} addon={addon} isEnabled={isEnabled} windowWidth={windowWidth} preloadImages={preloadImages} isFirst={firstAddonIndex === i} isBackpack={isBackpack} mainDiv={mainDiv} index={i} list={sAddons as SelectableAddon[]} />
                                    {/if}
                                {/each}
                            </div>
                        {/if}
                    {:else if choice.template === 3}
                        <div class="row g-0" style={sAddons ? objectFilter : undefined}>
                            <div class="col p-0 text-center" style="max-width: {100 - choiceImageBoxWidth}%">
                                {#if choice.title !== '' && !row.objectTitleRemoved}
                                    {#key choiceTitleKey}<h2 class="mb-0" style={objectTitle}>{@html DOMPurify.sanitize(choiceTitleKey, sanitizeArg)}</h2>{/key}
                                {/if}
                                {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 0}
                                    <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                                {/if}
                                {#if !row.objectScoreRemoved && !choice.showScoreInAddon}
                                    {#each choice.scores as score}
                                        <ObjectScore score={score} row={row} choice={choice} />
                                    {/each}
                                {/if}
                                {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 1}
                                    <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                                {/if}
                                {#if !row.objectRequirementRemoved && !choice.showReqInAddon}
                                    {#each choice.requireds as required}
                                        <ObjectRequired required={required} scoreText={scoreText} />
                                    {/each}
                                {/if}
                                {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 2}
                                    <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                                {/if}
                                {#if choice.text !== '' && !row.objectTextRemoved}
                                    {#key choiceTextKey}
                                        <p class="mb-0" style={objectText}>
                                            {@html DOMPurify.sanitize(choiceTextKey, sanitizeArg)}
                                        </p>
                                    {/key}
                                {/if}
                                {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 3}
                                    <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                                {/if}
                                {#if !choice.useSeperateAddon}
                                    {#if nAddons}
                                        <div class="row g-0 p-0 col w-100{addonJustify}">
                                            {#each nAddons as addon, i}
                                                {#if app.showAllAddons > 0 || (!addon.hideAddon || choice.isActive) && (addon.showAddon || checkRequirements(addon.requireds))}
                                                    <ObjectAddon row={row} choice={choice} addon={addon} isEnabled={isEnabled} windowWidth={windowWidth} preloadImages={preloadImages} isFirst={firstAddonIndex === i} isBackpack={isBackpack} mainDiv={mainDiv} />
                                                {/if}
                                            {/each}
                                        </div>
                                    {/if}
                                    {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 4}
                                        <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
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
                                    {#if nAddons}
                                        <div class="row g-0 p-0 col w-100{addonJustify}">
                                            {#each nAddons as addon, i}
                                                {#if app.showAllAddons > 0 || (!addon.hideAddon || choice.isActive) && (addon.showAddon || checkRequirements(addon.requireds))}
                                                    <ObjectAddon row={row} choice={choice} addon={addon} isEnabled={isEnabled} windowWidth={windowWidth} preloadImages={preloadImages} isFirst={firstAddonIndex === i} isBackpack={isBackpack} mainDiv={mainDiv} />
                                                {/if}
                                            {/each}
                                        </div>
                                    {/if}
                                    {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 4}
                                        <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                                    {/if}
                                </div>
                            {/if}
                        </div>
                        {#if sAddons}
                            <div class="row g-0 p-0 col w-100{addonJustify}">
                                {#each sAddons as addon, i}
                                    {#if app.showAllAddons > 0 || (!addon.hideAddon || choice.isActive) && (addon.showAddon || checkRequirements(addon.requireds))}
                                        <ObjectAddon row={row} choice={choice} addon={addon} isEnabled={isEnabled} windowWidth={windowWidth} preloadImages={preloadImages} isFirst={firstAddonIndex === i} isBackpack={isBackpack} mainDiv={mainDiv} index={i} list={sAddons as SelectableAddon[]} />
                                    {/if}
                                {/each}
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
	import type { BgStyles, Choice, ChoiceOptions, Filters, Row, SelectableAddon } from '$lib/store/types';
	import { app, choiceMap, getStyling, checkRequirements, sanitizeArg, replaceText, objectWidthToNum, snackbarVariables, winWidth, hexToRgba, selectObject, deselectObject, selectedOneMore, selectedOneLess, wordDialog, closestByClassPrefix } from '$lib/store/store.svelte';
    import { tooltip } from '$lib/custom/tooltip/store.svelte';

    export { activateObject, options };
    
    const { row, choice, windowWidth, preloadImages = false, isBackpack, mainDiv, isSearch = false }: { row: Row, choice: Choice, index: number, windowWidth: number, preloadImages?: boolean, isBackpack?: boolean, mainDiv?: HTMLDivElement, isSearch?: boolean } = $props();
    const linkedObjects: string[] = [];
    const options: ChoiceOptions = {linkedObjects: linkedObjects, mainDiv: mainDiv, bCreatorMode: false, isBackpack: isBackpack, isOverDlg: false, isOverImg: false};
    const nAddons = $derived.by(() => {
        const list = choice.addons;
        if (!list || list.length === 0) return null;

        const result = [];
        for (let i = 0; i < list.length; i++) {
            const addon = list[i];
            if (addon.isSelectable !== true) result.push(addon);
        }
        return result.length === 0 ? null : result;
    });
    const sAddons = $derived.by(() => {
        const list = choice.addons;
        if (!list || list.length === 0) return null;
        
        const result = [];
        for (let i = 0; i < list.length; i++) {
            const addon = list[i];
            if (addon.isSelectable === true && (app.showAllAddons > 0 || !addon.hideAddon || choice.isActive && (addon.showAddon || checkRequirements(addon.requireds)))) result.push(addon);
        }
        return result.length === 0 ? null : result;
    });

    let firstAddonIndex = $derived.by(() => {
        if (nAddons) {
            for (let i = 0; i < nAddons.length; i++) {
                const addon = nAddons[i];
                if (app.showAllAddons > 0 || !addon.skipIndex && (!addon.hideAddon || choice.isActive) && (addon.showAddon || checkRequirements(addon.requireds))) {
                    return i;
                }
            }
        }
        if (sAddons) {
            for (let i = 0; i < sAddons.length; i++) {
                const addon = sAddons[i];
                if (!addon.skipIndex) {
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
        if (isSearch) return true;
        if (choice.isActive) {
            return !filterStyle.selFilterVisibleIsOn;
        } else if (!isEnabled) {
            return !filterStyle.reqFilterVisibleIsOn
        }
        return !filterStyle.unselFilterVisibleIsOn;
    });
    let addonJustify = $derived(choice.addonJustify ? ` justify-${choice.addonJustify}` : '');
    let isActive = $derived(choice.isActive);
    let fullHeight = $derived(objectStyle.objectHeight && !isSearch);
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
        const styles: string[] = [];

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

    let multiChoiceCounter = $derived.by(() => {
        if (choice.hideMultipleCounter) {
            return isEnabled;
        }

        return true;
    });

    let objectText = $derived.by(() => {
        const styles: string[] = [];

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
        const bgStyles: BgStyles = {};
        const filters: Filters = {};

        if (objectStyle.objectBorderImage) {
            bgStyles.borderImage = `border-image: url('${objectStyle.objectBorderImage}') ${objectStyle.objectBorderImageSliceTop} ${objectStyle.objectBorderImageSliceRight} ${objectStyle.objectBorderImageSliceBottom} ${objectStyle.objectBorderImageSliceLeft} / ${objectStyle.objectBorderImageWidth}px ${objectStyle.objectBorderImageRepeat}; border-style: solid; padding: ${objectStyle.objectBorderImageWidth}px;`;
        }
        if (backgroundStyle.objectBackgroundImage) {
            bgStyles.bgImage = `background-image: url('${backgroundStyle.objectBackgroundImage}'); ${backgroundStyle.isObjectBackgroundRepeat? 'background-repeat: repeat;' : (backgroundStyle.isObjectBackgroundFitIn ? 'background-size: 100% 100%;' : 'background-size: cover;')}`;
        }
        if (backgroundStyle.objectBgColorIsOn) {
            bgStyles.bgColor = `background-color: ${hexToRgba(backgroundStyle.objectBgColor)};`;
        }
        bgStyles.margin = `margin: ${objectStyle.objectMargin}px;`;
        bgStyles.borderRadius = `border-radius: ${objectStyle.objectBorderRadiusTopLeft}${suffix} ${objectStyle.objectBorderRadiusTopRight}${suffix} ${objectStyle.objectBorderRadiusBottomRight}${suffix} ${objectStyle.objectBorderRadiusBottomLeft}${suffix};`;
        if (objectStyle.objectOverflowIsOn) {
            bgStyles.overflow = `overflow: hidden;`;
        }
        if (objectStyle.objectBorderIsOn || (isActive && filterStyle.selBorderColorIsOn) || (!isEnabled && filterStyle.reqBorderColorIsOn)) {
            let borderColor = objectStyle.objectBorderColor;
            
            if (!isEnabled && filterStyle.reqBorderColorIsOn) {
                borderColor = filterStyle.reqFilterBorderColor;
            } else if (isActive && filterStyle.selBorderColorIsOn) {
                borderColor = filterStyle.selFilterBorderColor;
            }
            bgStyles.border = `border: ${objectStyle.objectBorderWidth}px ${objectStyle.objectBorderStyle} ${hexToRgba(borderColor)};`;
        }
        if (objectStyle.objectDropShadowIsOn) {
            if (objectStyle.objectUseBoxShadowIsOn) {
                bgStyles.boxShadow = `box-shadow: ${objectStyle.objectDropShadowH}px ${objectStyle.objectDropShadowV}px ${objectStyle.objectDropShadowBlur}px ${objectStyle.objectDropShadowSpread}px ${hexToRgba(objectStyle.objectDropShadowColor)};`;
            } else {
                if (sAddons) {
                    bgStyles.filter = `filter: drop-shadow(${objectStyle.objectDropShadowH}px ${objectStyle.objectDropShadowV}px ${objectStyle.objectDropShadowBlur}px ${hexToRgba(objectStyle.objectDropShadowColor)})`;
                } else {
                    filters.dropShadow = ` drop-shadow(${objectStyle.objectDropShadowH}px ${objectStyle.objectDropShadowV}px ${objectStyle.objectDropShadowBlur}px ${hexToRgba(objectStyle.objectDropShadowColor)})`;
                }
            }
        }

        if (!sAddons) {
            setFilters(bgStyles, filters);
        }
        if (Object.keys(filters).length > 0) {
            bgStyles.filter = `filter:${Object.values(filters).join('')};`;
        }
        
        return Object.values(bgStyles).join(' ');
    });

    let objectFilter = $derived.by(() => {
        const bgStyles: BgStyles = {};
        const filters: Filters = {};
        const suffix = objectStyle.objectBorderRadiusIsPixels ? 'px' : '%';
        const rtl = objectStyle.objectBorderRadiusIsPixels && objectStyle.objectBorderWidth && objectStyle.objectBorderRadiusTopLeft ? objectStyle.objectBorderRadiusTopLeft - objectStyle.objectBorderWidth : objectStyle.objectBorderRadiusTopLeft;
        const rtr = objectStyle.objectBorderRadiusIsPixels && objectStyle.objectBorderWidth && objectStyle.objectBorderRadiusTopRight ? objectStyle.objectBorderRadiusTopRight - objectStyle.objectBorderWidth : objectStyle.objectBorderRadiusTopRight;

        setFilters(bgStyles, filters);
        if (rtl && rtr) bgStyles.borderRadius = `border-radius: ${rtl}${suffix} ${rtr}${suffix} 0 0;`;
        if (Object.keys(filters).length > 0) {
            bgStyles.filter = `filter:${Object.values(filters).join('')};`;
        }
        
        return Object.values(bgStyles).join(' ');
    });

    let objectImage = $derived.by(() => {
        const styles: string[] = [];
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
        const style: string[] = [];

        style.push(`font-family: '${textStyle.scoreText}'; font-size: ${textStyle.scoreTextSize}%; text-align: ${textStyle.scoreTextAlign};`);
        if (!isEnabled && filterStyle.reqScoreTextColorIsOn) {
            style.push(`color: ${hexToRgba(filterStyle.reqFilterSTextColor)}`);
        } else if (choice.isActive && filterStyle.selScoreTextColorIsOn) {
            style.push(`color: ${hexToRgba(filterStyle.selFilterSTextColor)}`);
        } else {
            style.push(`color: ${hexToRgba(textStyle.scoreTextColor)};`);
        }

        return style.join(' ');
    });

    $effect(() => {
        if (mainDiv) options.mainDiv = mainDiv;
        if (isBackpack) options.isBackpack = isBackpack;
    });

    function setFilters(bgStyles: BgStyles, filters: Filters) {
        if (isEnabled) {
            if (isActive) {
                if (filterStyle.selFilterBlurIsOn) {
                    filters.blur = ` blur(${filterStyle.selFilterBlur}px)`;
                }
                if (filterStyle.selFilterBrightIsOn) {
                    filters.brightness = ` brightness(${filterStyle.selFilterBright}%)`;
                }
                if (filterStyle.selFilterContIsOn) {
                    filters.contrast = ` contrast(${filterStyle.selFilterCont}%)`;
                }
                if (filterStyle.selFilterGrayIsOn) {
                    filters.grayscale = ` grayscale(${filterStyle.selFilterGray}%)`;
                }
                if (filterStyle.selFilterHueIsOn) {
                    filters.hueRotate = ` hue-rotate(${filterStyle.selFilterHue}deg)`;
                }
                if (filterStyle.selFilterInvertIsOn) {
                    filters.invert = ` invert(${filterStyle.selFilterInvert}%)`;
                }
                if (filterStyle.selFilterOpacIsOn) {
                    filters.opacity = ` opacity(${filterStyle.selFilterOpac}%)`;
                }
                if (filterStyle.selFilterSaturIsOn) {
                    filters.saturate = ` saturate(${filterStyle.selFilterSatur})`;
                }
                if (filterStyle.selFilterSepiaIsOn) {
                    filters.sepia = ` sepia(${filterStyle.selFilterGray}%)`;
                }
                if (filterStyle.selBgColorIsOn) {
                    bgStyles.bgColor = `background-color: ${hexToRgba(filterStyle.selFilterBgColor)};`;
                }
                if (objectStyle.objectGradientIsOn) {
                    bgStyles.bgImage = `background-image: linear-gradient(${objectStyle.objectGradientOnSelect});`;
                }
            } else {
                if (filterStyle.unselFilterBlurIsOn) {
                    filters.blur = ` blur(${filterStyle.unselFilterBlur}px)`;
                }
                if (filterStyle.unselFilterBrightIsOn) {
                    filters.brightness = ` brightness(${filterStyle.unselFilterBright}%)`;
                }
                if (filterStyle.unselFilterContIsOn) {
                    filters.contrast = ` contrast(${filterStyle.unselFilterCont}%)`;
                }
                if (filterStyle.unselFilterGrayIsOn) {
                    filters.grayscale = ` grayscale(${filterStyle.unselFilterGray}%)`;
                }
                if (filterStyle.unselFilterHueIsOn) {
                    filters.hueRotate = ` hue-rotate(${filterStyle.unselFilterHue}deg)`;
                }
                if (filterStyle.unselFilterInvertIsOn) {
                    filters.invert = ` invert(${filterStyle.unselFilterInvert}%)`;
                }
                if (filterStyle.unselFilterOpacIsOn) {
                    filters.opacity = ` opacity(${filterStyle.unselFilterOpac}%)`;
                }
                if (filterStyle.unselFilterSaturIsOn) {
                    filters.saturate = ` saturate(${filterStyle.unselFilterSatur})`;
                }
                if (filterStyle.unselFilterSepiaIsOn) {
                    filters.sepia = ` sepia(${filterStyle.unselFilterGray}%)`;
                }
                if (objectStyle.objectGradientIsOn) {
                    bgStyles.bgImage = `background-image: linear-gradient(${objectStyle.objectGradient});`;
                }
            }
            if (app.isPointerCursor && !choice.isNotSelectable && (!choice.isSelectableMultiple || (choice.allowSelectByClick && choice.multipleUseVariable === 0))) {
                bgStyles.cursor = `cursor: pointer;`;
            }
        } else {
            if (filterStyle.reqFilterBlurIsOn) {
                filters.blur = ` blur(${filterStyle.reqFilterBlur}px)`;
            }
            if (filterStyle.reqFilterBrightIsOn) {
                filters.brightness = ` brightness(${filterStyle.reqFilterBright}%)`;
            }
            if (filterStyle.reqFilterContIsOn) {
                filters.contrast = ` contrast(${filterStyle.reqFilterCont}%)`;
            }
            if (filterStyle.reqFilterGrayIsOn) {
                filters.grayscale = ` grayscale(${filterStyle.reqFilterGray}%)`;
            }
            if (filterStyle.reqFilterHueIsOn) {
                filters.hueRotate = ` hue-rotate(${filterStyle.reqFilterHue}deg)`;
            }
            if (filterStyle.reqFilterInvertIsOn) {
                filters.invert = ` invert(${filterStyle.reqFilterInvert}%)`;
            }
            if (filterStyle.reqFilterOpacIsOn) {
                filters.opacity = ` opacity(${filterStyle.reqFilterOpac}%)`;
            }
            if (filterStyle.reqFilterSaturIsOn) {
                filters.saturate = ` saturate(${filterStyle.reqFilterSatur})`;
            }
            if (filterStyle.reqFilterSepiaIsOn) {
                filters.sepia = ` sepia(${filterStyle.reqFilterGray}%)`;
            }
            if (filterStyle.reqBgColorIsOn) {
                bgStyles.bgColor = `background-color: ${hexToRgba(filterStyle.reqFilterBgColor)};`;
            }
            if (objectStyle.objectGradientIsOn) {
                bgStyles.bgImage = `background-image: linear-gradient(${objectStyle.objectGradientOnReq});`;
            }
        }
    }

    function objectWidthClass() {
        if (isSearch) return 'col-sm-6 col-12';
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

    function activateObject(localChoice: Choice, localRow: Row, e?: MouseEvent, isManually: boolean = false) {
        const target = e && e.target ? e.target as HTMLElement : null
        let origRow = localRow;

        options.isOverDlg = false;
        options.isOverImg = false;

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