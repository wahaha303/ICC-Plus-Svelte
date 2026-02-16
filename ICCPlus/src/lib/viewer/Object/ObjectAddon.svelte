<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="text-center row-{row.id} choice-{choice.id} addon{addon.isSelectable ? ` addon-${addon.id}` : ''} {addonWidthClass()}" style={addonBackground} onclickcapture={addon.isSelectable ? (e) => activateObject(addon as SelectableAddon, row, e, true) : undefined}>
    {#if addon.template >= 4 || addon.template === 1 || windowWidth <= 1280}
        <div>
            {#if (addon.template === 1 || windowWidth <= 1280) && addon.image && !row.addonImageRemoved}
                {#if addon.imageSourceTooltip}
                    <img use:tooltip={addon.imageSourceTooltip} oncontextmenu={copyTooltip} src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                {:else}
                    <img src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                {/if}
            {/if}
            {#if addon.title !== '' && !row.addonTitleRemoved}
                {#key addonTitleKey}
                    <h3 class="m-0" style={addonTitle}>
                        {@html DOMPurify.sanitize(addonTitleKey, sanitizeArg)}
                    </h3>
                {/key}
            {/if}
            {#if addon.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 0}
                <ObjectMultiChoice isEnabled={!!isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} addon={addon as SelectableAddon} selectedOneMore={() => selectedOneMore(addon as SelectableAddon, row, options)} selectedOneLess={() => selectedOneLess(addon as SelectableAddon, row, options)} />
            {/if}
            {#if !row.objectScoreRemoved}
                {#if choice.showScoreInAddon && isFirst}
                    {#each choice.scores as score}
                        <ObjectScore score={score} row={row} choice={choice} />
                    {/each}
                {/if}
                {#if addon.scores}
                    {#each addon.scores as score}
                        <ObjectScore score={score} row={row} choice={choice} addon={addon} />
                    {/each}
                {/if}
            {/if}
            {#if addon.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 1}
                <ObjectMultiChoice isEnabled={!!isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} addon={addon as SelectableAddon} selectedOneMore={() => selectedOneMore(addon as SelectableAddon, row, options)} selectedOneLess={() => selectedOneLess(addon as SelectableAddon, row, options)} />
            {/if}
            {#if !row.objectRequirementRemoved}
                {#if choice.showReqInAddon && isFirst}
                    {#each choice.requireds as required}
                        <ObjectRequired required={required} scoreText={scoreText} />
                    {/each}
                {/if}
                {#each addon.requireds as required}
                    <ObjectRequired required={required} scoreText={scoreText} />
                {/each}
            {/if}
            {#if addon.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 2}
                <ObjectMultiChoice isEnabled={!!isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} addon={addon as SelectableAddon} selectedOneMore={() => selectedOneMore(addon as SelectableAddon, row, options)} selectedOneLess={() => selectedOneLess(addon as SelectableAddon, row, options)} />
            {/if}
            {#if addon.template === 5 && windowWidth > 1280 && addon.image && !row.addonImageRemoved}
                {#if addon.imageSourceTooltip}
                    <img use:tooltip={addon.imageSourceTooltip} oncontextmenu={copyTooltip} src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                {:else}
                    <img src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                {/if}
            {/if}
            {#if addon.text !== '' && !row.addonTextRemoved}
                {#key addonTextKey}
                    <p class="mb-0" style={addonText}>
                        {@html DOMPurify.sanitize(addonTextKey, sanitizeArg)}
                    </p>
                {/key}
            {/if}
            {#if addon.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 3}
                <ObjectMultiChoice isEnabled={!!isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} addon={addon as SelectableAddon} selectedOneMore={() => selectedOneMore(addon as SelectableAddon, row, options)} selectedOneLess={() => selectedOneLess(addon as SelectableAddon, row, options)} />
            {/if}
            {#if addon.template === 4 && windowWidth > 1280 && addon.image && !row.addonImageRemoved}
                {#if addon.imageSourceTooltip}
                    <img use:tooltip={addon.imageSourceTooltip} oncontextmenu={copyTooltip} src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                {:else}
                    <img src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                {/if}
            {/if}
            {#if addon.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 4}
                <ObjectMultiChoice isEnabled={!!isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} addon={addon as SelectableAddon} selectedOneMore={() => selectedOneMore(addon as SelectableAddon, row, options)} selectedOneLess={() => selectedOneLess(addon as SelectableAddon, row, options)} />
            {/if}
        </div>
    {:else}
        <div class="row m-0 p-0 w-100">
            {#if addon.template === 2}
                <div class="col p-0 text-center" style="max-width: {addonImageBoxWidth}%">
                    {#if addon.image && !row.addonImageRemoved}
                        {#if addon.imageSourceTooltip}
                            <img use:tooltip={addon.imageSourceTooltip} oncontextmenu={copyTooltip} src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                        {:else}
                            <img src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                        {/if}
                    {/if}
                </div>
                <div class="col p-0 text-center" style="max-width: {100 - addonImageBoxWidth}%">
                    {#if addon.title !== '' && !row.addonTitleRemoved}
                        {#key addonTitleKey}<h2 class="mb-0" style={addonTitle}>{@html DOMPurify.sanitize(addonTitleKey, sanitizeArg)}</h2>{/key}
                    {/if}
                    {#if addon.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 0}
                        <ObjectMultiChoice isEnabled={!!isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} addon={addon as SelectableAddon} selectedOneMore={() => selectedOneMore(addon as SelectableAddon, row, options)} selectedOneLess={() => selectedOneLess(addon as SelectableAddon, row, options)} />
                    {/if}
                    {#if !row.objectScoreRemoved}
                        {#if choice.showScoreInAddon && isFirst}
                            {#each choice.scores as score}
                                <ObjectScore score={score} row={row} choice={choice} />
                            {/each}
                        {/if}
                        {#if addon.scores}
                            {#each addon.scores as score}
                                <ObjectScore score={score} row={row} choice={choice} addon={addon} />
                            {/each}
                        {/if}
                    {/if}
                    {#if addon.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 1}
                        <ObjectMultiChoice isEnabled={!!isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} addon={addon as SelectableAddon} selectedOneMore={() => selectedOneMore(addon as SelectableAddon, row, options)} selectedOneLess={() => selectedOneLess(addon as SelectableAddon, row, options)} />
                    {/if}
                    {#if !row.objectRequirementRemoved}
                        {#if choice.showReqInAddon && isFirst}
                            {#each choice.requireds as required}
                                <ObjectRequired required={required} scoreText={scoreText} />
                            {/each}
                        {/if}
                        {#each addon.requireds as required}
                            <ObjectRequired required={required} scoreText={scoreText} />
                        {/each}
                    {/if}
                    {#if addon.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 2}
                        <ObjectMultiChoice isEnabled={!!isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} addon={addon as SelectableAddon} selectedOneMore={() => selectedOneMore(addon as SelectableAddon, row, options)} selectedOneLess={() => selectedOneLess(addon as SelectableAddon, row, options)} />
                    {/if}
                    {#if addon.text !== '' && !row.addonTextRemoved}
                        {#key addonTextKey}
                            <p class="mb-0" style={addonText}>
                                {@html DOMPurify.sanitize(addonTextKey, sanitizeArg)}
                            </p>
                        {/key}
                    {/if}
                    {#if addon.isSelectableMultiple && multiChoiceCounter && (multiChoiceStyle.multiChoiceCounterPosition === 3 || multiChoiceStyle.multiChoiceCounterPosition === 4)}
                        <ObjectMultiChoice isEnabled={!!isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} addon={addon as SelectableAddon} selectedOneMore={() => selectedOneMore(addon as SelectableAddon, row, options)} selectedOneLess={() => selectedOneLess(addon as SelectableAddon, row, options)} />
                    {/if}
                </div>
            {:else if addon.template === 3}
                <div class="col p-0 text-center" style="max-width: {100 - addonImageBoxWidth}%">
                    {#if addon.title !== '' && !row.addonTitleRemoved}
                        {#key addonTitleKey}<h2 class="mb-0" style={addonTitle}>{@html DOMPurify.sanitize(addonTitleKey, sanitizeArg)}</h2>{/key}
                    {/if}
                    {#if addon.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 0}
                        <ObjectMultiChoice isEnabled={!!isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} addon={addon as SelectableAddon} selectedOneMore={() => selectedOneMore(addon as SelectableAddon, row, options)} selectedOneLess={() => selectedOneLess(addon as SelectableAddon, row, options)} />
                    {/if}
                    {#if !row.objectScoreRemoved}
                        {#if choice.showScoreInAddon && isFirst}
                            {#each choice.scores as score}
                                <ObjectScore score={score} row={row} choice={choice} />
                            {/each}
                        {/if}
                        {#if addon.scores}
                            {#each addon.scores as score}
                                <ObjectScore score={score} row={row} choice={choice} addon={addon} />
                            {/each}
                        {/if}
                    {/if}
                    {#if addon.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 1}
                        <ObjectMultiChoice isEnabled={!!isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} addon={addon as SelectableAddon} selectedOneMore={() => selectedOneMore(addon as SelectableAddon, row, options)} selectedOneLess={() => selectedOneLess(addon as SelectableAddon, row, options)} />
                    {/if}
                    {#if !row.objectRequirementRemoved}
                        {#if choice.showReqInAddon && isFirst}
                            {#each choice.requireds as required}
                                <ObjectRequired required={required} scoreText={scoreText} />
                            {/each}
                        {/if}
                        {#each addon.requireds as required}
                            <ObjectRequired required={required} scoreText={scoreText} />
                        {/each}
                    {/if}
                    {#if addon.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 2}
                        <ObjectMultiChoice isEnabled={!!isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} addon={addon as SelectableAddon} selectedOneMore={() => selectedOneMore(addon as SelectableAddon, row, options)} selectedOneLess={() => selectedOneLess(addon as SelectableAddon, row, options)} />
                    {/if}
                    {#if addon.text !== '' && !row.addonTextRemoved}
                        {#key addonTextKey}
                            <p class="mb-0" style={addonText}>
                                {@html DOMPurify.sanitize(addonTextKey, sanitizeArg)}
                            </p>
                        {/key}
                    {/if}
                    {#if addon.isSelectableMultiple && multiChoiceCounter && (multiChoiceStyle.multiChoiceCounterPosition === 3 || multiChoiceStyle.multiChoiceCounterPosition === 4)}
                        <ObjectMultiChoice isEnabled={!!isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} addon={addon as SelectableAddon} selectedOneMore={() => selectedOneMore(addon as SelectableAddon, row, options)} selectedOneLess={() => selectedOneLess(addon as SelectableAddon, row, options)} />
                    {/if}
                </div>
                <div class="col p-0 text-center" style="max-width: {addonImageBoxWidth}%">
                    {#if addon.image && !row.addonImageRemoved}
                        {#if addon.imageSourceTooltip}
                            <img use:tooltip={addon.imageSourceTooltip} oncontextmenu={copyTooltip} src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                        {:else}
                            <img src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                        {/if}
                    {/if}
                </div>
            {/if}
        </div>
    {/if}
</div>

<script lang="ts">
    import DOMPurify from 'dompurify';
    import ObjectRequired from './ObjectRequired.svelte';
    import { app, checkRequirements, getStyling, replaceText, sanitizeArg, hexToRgba, snackbarVariables, winWidth, objectWidthToNum, selectedOneMore, selectedOneLess, choiceMap, closestByClassPrefix, deselectObject, selectObject } from '$lib/store/store.svelte';
    import type { Choice, Row, Addon, BgStyles, Filters, SelectableAddon, ChoiceOptions } from '$lib/store/types';
    import { tooltip } from '$lib/custom/tooltip/store.svelte';
    import ObjectScore from './ObjectScore.svelte';
    import ObjectMultiChoice from './ObjectMultiChoice.svelte';

    let { addon, row, choice, isEnabled, windowWidth = 0, preloadImages = false, isFirst, isBackpack = false, mainDiv }: { addon: Addon | SelectableAddon; row: Row; choice: Choice; isEnabled?: boolean, windowWidth?: number, preloadImages?: boolean, isFirst?: boolean, isBackpack?: boolean; mainDiv?: HTMLDivElement } = $props();

    const linkedObjects: string[] = [];
    const options: ChoiceOptions = {linkedObjects: linkedObjects, mainDiv: mainDiv, bCreatorMode: false, isBackpack: isBackpack, isOverDlg: false, isOverImg: false};

    let isActive = $derived(typeof choice !== 'undefined' ? choice.isActive : false);
    let addonImageStyle = $derived(getStyling('privateAddonImageIsOn', row, choice));
    let addonStyle = $derived(getStyling('privateAddonIsOn', row, choice));
    let filterStyle = $derived(getStyling('privateFilterIsOn', row, choice));
    let objectImageStyle = $derived(getStyling('privateObjectImageIsOn', row, choice));
    let objectStyle = $derived(getStyling('privateObjectIsOn', row, choice));
    let textStyle = $derived(getStyling('privateTextIsOn', row, choice));
    let multiChoiceStyle = $derived(getStyling('privateMultiChoiceIsOn', row, choice));
    let addonEnabled = $derived(checkRequirements(addon.requireds));
    let addonTitleKey = $derived(replaceText(addon.title));
    let addonTextKey = $derived(replaceText(addon.text));
    let addonImageBoxWidth = $derived(typeof addonImageStyle.addonImageBoxWidth !== 'undefined' ? addonImageStyle.addonImageBoxWidth : 50);
    let multiChoiceCounter = $derived.by(() => {
        if (addon.hideMultipleCounter) {
            return isEnabled;
        }

        return true;
    });

    let addonBackground = $derived.by(() => {
        let useDesign = addonStyle.useAddonDesign; 
        let suffix = (useDesign ? addonStyle.addonBorderRadiusIsPixels : objectStyle.objectBorderRadiusIsPixels) ? 'px' : '%';
        const bgStyles: BgStyles = {};
        const filters: Filters = {};

        if (useDesign) {
            if (addonStyle.addonBorderImage) {
                bgStyles.borderImage = `border-image: url('${addonStyle.addonBorderImage}') ${addonStyle.addonBorderImageSliceTop} ${addonStyle.addonBorderImageSliceRight} ${addonStyle.addonBorderImageSliceBottom} ${addonStyle.addonBorderImageSliceLeft} / ${addonStyle.addonBorderImageWidth}px ${addonStyle.addonBorderImageRepeat}; border-style: solid; padding: ${addonStyle.addonBorderImageWidth}px;`;
            }
            if (addonStyle.useAddonBackgroundImage && addonStyle.addonBackgroundImage) {
                bgStyles.bgImage = `background-image: url('${addonStyle.addonBackgroundImage}'); ${addonStyle.isObjectBackgroundRepeat? 'background-repeat: repeat;' : (addonStyle.isObjectBackgroundFitIn ? 'background-size: 100% 100%;' : 'background-size: cover;')}`;
            }
            if (addonStyle.addonBgColorIsOn) {
                bgStyles.bgColor = `background-color: ${hexToRgba(addonStyle.addonBgColor)};`;
            }
            bgStyles.margin = `margin: ${addonStyle.addonMargin}px;`;
            bgStyles.borderRadius = `border-radius: ${addonStyle.addonBorderRadiusTopLeft}${suffix} ${addonStyle.addonBorderRadiusTopRight}${suffix} ${addonStyle.addonBorderRadiusBottomRight}${suffix} ${addonStyle.addonBorderRadiusBottomLeft}${suffix};`;
            if (addonStyle.addonOverflowIsOn) {
                bgStyles.overflow = `overflow: hidden;`;
            }
            if (addonStyle.addonBorderIsOn) {
                bgStyles.border = `border: ${addonStyle.addonBorderWidth}px ${addonStyle.addonBorderStyle} ${hexToRgba(addonStyle.addonBorderColor)};`;
            }
            if (addonStyle.addonGradientIsOn) {
                bgStyles.bgImage = `background-image: linear-gradient(${addonStyle.addonGradient});`;
            }
            if (addonStyle.addonDropShadowIsOn) {
                if (addonStyle.addonUseBoxShadowIsOn) {
                    bgStyles.boxShadow = `box-shadow: ${addonStyle.addonDropShadowH}px ${addonStyle.addonDropShadowV}px ${addonStyle.addonDropShadowBlur}px ${addonStyle.addonDropShadowSpread}px ${hexToRgba(addonStyle.addonDropShadowColor)};`;
                } else {
                    filters.dropShadow = ` drop-shadow(${addonStyle.addonDropShadowH}px ${addonStyle.addonDropShadowV}px ${addonStyle.addonDropShadowBlur}px ${hexToRgba(addonStyle.addonDropShadowColor)})`;
                }
            }
        }
        if (isEnabled) {
            if (addonEnabled) {
                if (addon.isActive || isActive && !addon.isSelectable) {
                    if (useDesign) {
                        if (filterStyle.selBorderColorIsOn) {
                            bgStyles.border = `border: ${addonStyle.addonBorderWidth}px ${addonStyle.addonBorderStyle} ${hexToRgba(filterStyle.selFilterBorderColor)};`;
                        }
                        if (addonStyle.addonGradientIsOn) {
                            bgStyles.bgImage = `background-image: linear-gradient(${addonStyle.addonGradientOnSelect});`;
                        }
                    } else if (addon.isSelectable) {
                        if (filterStyle.selBorderColorIsOn) {
                            bgStyles.border = `border: ${objectStyle.objectBorderWidth}px ${objectStyle.objectBorderStyle} ${hexToRgba(filterStyle.selFilterBorderColor)};`;
                        }
                        if (objectStyle.objectGradientIsOn) {
                            bgStyles.bgImage = `background-image: linear-gradient(${objectStyle.objectGradientOnSelect});`;
                        }
                    }
                    if (filterStyle.selBgColorIsOn) {
                        bgStyles.bgColor = `background-color: ${hexToRgba(filterStyle.selFilterBgColor)};`;
                    }
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
                } else {
                    if (objectStyle.objectGradientIsOn && addon.isSelectable) {
                        bgStyles.bgImage = `background-image: linear-gradient(${objectStyle.objectGradient});`;
                    }
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
                }
            } else {
                if (useDesign) {
                    if (filterStyle.reqBorderColorIsOn) {
                        bgStyles.border = `border: ${addonStyle.addonBorderWidth}px ${addonStyle.addonBorderStyle} ${hexToRgba(filterStyle.reqFilterBorderColor)};`;
                    }
                    if (addonStyle.addonGradientIsOn) {
                        bgStyles.bgImage = `background-image: linear-gradient(${addonStyle.addonGradientOnReq});`;
                    }
                } else if (addon.isSelectable) {
                    if (filterStyle.reqBorderColorIsOn) {
                        bgStyles.border = `border: ${objectStyle.objectBorderWidth}px ${objectStyle.objectBorderStyle} ${hexToRgba(filterStyle.reqFilterBorderColor)};`;
                    }
                    if (objectStyle.objectGradientIsOn) {
                        bgStyles.bgImage = `background-image: linear-gradient(${objectStyle.objectGradientOnReq});`;
                    }
                }
                if (filterStyle.reqBgColorIsOn) {
                    bgStyles.bgColor = `background-color: ${hexToRgba(filterStyle.reqFilterBgColor)};`;
                }
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
            }
        }
        if (Object.keys(filters).length > 0) {
            bgStyles.filter = `filter:${Object.values(filters).join('')};`;
        }

        return Object.values(bgStyles).join(' ');
    });

    let addonTitle = $derived.by(() => {
        let styles: string[] = [];

        styles.push(`white-space: pre-line; font-family: '${textStyle.addonTitle}'; font-size: ${textStyle.addonTitleTextSize}%; text-align: ${textStyle.addonTitleAlign};`);
        if (!isEnabled && filterStyle.reqATitleColorIsOn) {
            styles.push(`color: ${hexToRgba(filterStyle.reqFilterATitleColor)};`);
        } else if ((addon.isActive || isActive && !addon.isSelectable) && filterStyle.selATitleColorIsOn) {
            styles.push(`color: ${hexToRgba(filterStyle.selFilterATitleColor)};`);
        } else {
            styles.push(`color: ${hexToRgba(textStyle.addonTitleColor)};`);
        }
        if (addonStyle.useAddonDesign) {
            if (addonStyle.titlePaddingIsOn) {
                styles.push(`padding: ${addonStyle.addonTextPadding}px;`);
            }
        } else if (objectStyle.titlePaddingIsOn) {
            styles.push(`padding: ${objectStyle.objectTextPadding}px;`);
        }

        return styles.join(' ');
    });

    let addonText = $derived.by(() => {
        let styles: string[] = [];

        styles.push(`white-space: pre-wrap; font-family: '${textStyle.addonText}'; text-align: ${textStyle.addonTextAlign}; font-size: ${textStyle.addonTextTextSize}%;`);
        if (!isEnabled && filterStyle.reqATextColorIsOn) {
            styles.push(`color: ${hexToRgba(filterStyle.reqFilterATextColor)};`);
        } else if ((addon.isActive || isActive && !addon.isSelectable) && filterStyle.selATextColorIsOn) {
            styles.push(`color: ${hexToRgba(filterStyle.selFilterATextColor)};`);
        } else {
            styles.push(`color: ${hexToRgba(textStyle.addonTextColor)};`);
        }
        if (addonStyle.useAddonDesign) {
            styles.push(`padding: ${addonStyle.addonTextPadding}px;`);
        } else {
            styles.push(`padding: ${objectStyle.objectTextPadding}px;`);
        }

        return styles.join(' ');
    });

    let addonImage = $derived.by(() => {
        let styles: string[] = [];
        let useDesign = addonImageStyle.useAddonImage;
        let suffix = (useDesign ? addonImageStyle.addonImgBorderRadiusIsPixels : objectImageStyle.objectImgBorderRadiusIsPixels) ? 'px' : '%';

        if (useDesign) {
            styles.push(`width: ${addonImageStyle.addonImageWidth}%; margin-top: ${addonImageStyle.addonImageMarginTop}%; margin-bottom: ${addonImageStyle.addonImageMarginBottom}%;`);
            if (addonImageStyle.addonImgObjectFillIsOn) {
                styles.push(`object-fit: ${addonImageStyle.addonImgObjectFillStyle};`);
                const imgHeight = choice.addonImgObjectFillHeight || objectImageStyle.addonImgObjectFillHeight;
                if (imgHeight) {
                    styles.push(`height: ${imgHeight}px`);
                }
            }
            styles.push(`border-radius: ${addonImageStyle.addonImgBorderRadiusTopLeft}${suffix} ${addonImageStyle.addonImgBorderRadiusTopRight}${suffix} ${addonImageStyle.addonImgBorderRadiusBottomRight}${suffix} ${addonImageStyle.addonImgBorderRadiusBottomLeft}${suffix};`);
            if (addonImageStyle.addonImgOverflowIsOn) {
                styles.push(`overflow: hidden;`);
            }
            if (addonImageStyle.addonImgBorderIsOn) {
                const borderColor = isEnabled ? ((addon.isActive || isActive && !addon.isSelectable) && filterStyle.selImgBorderColorIsOn && filterStyle.selFilterImgBorderColor) || addonImageStyle.addonImgBorderColor : (filterStyle.reqImgBorderColorIsOn && filterStyle.reqFilterImgBorderColor) || addonImageStyle.addonImgBorderColor;
                styles.push(`border: ${addonImageStyle.addonImgBorderWidth}px ${addonImageStyle.addonImgBorderStyle} ${hexToRgba(borderColor)};`);
            }
        } else {
            styles.push(`width: ${objectImageStyle.objectImageWidth}%; margin-top: ${objectImageStyle.objectImageMarginTop}%; margin-bottom: ${objectImageStyle.objectImageMarginBottom}%;`);
            if (objectImageStyle.objectImgObjectFillIsOn) {
                styles.push(`object-fit: ${objectImageStyle.objectImgObjectFillStyle};`);
                const imgHeight = row?.objectImgObjectFillHeight || objectImageStyle.objectImgObjectFillHeight;
                if (imgHeight) {
                    styles.push(`height: ${imgHeight}px;`);
                }
            }
            styles.push(`border-radius: ${objectImageStyle.objectImgBorderRadiusTopLeft}${suffix} ${objectImageStyle.objectImgBorderRadiusTopRight}${suffix} ${objectImageStyle.objectImgBorderRadiusBottomRight}${suffix} ${objectImageStyle.objectImgBorderRadiusBottomLeft}${suffix};`);
            if (objectImageStyle.objectImgOverflowIsOn) {
                styles.push(`overflow: hidden;`);
            }
            if (objectImageStyle.objectImgBorderIsOn) {
                const borderColor = isEnabled ? ((addon.isActive || isActive && !addon.isSelectable) && filterStyle.selImgBorderColorIsOn && filterStyle.selFilterImgBorderColor) || objectImageStyle.objectImgBorderColor : (filterStyle.reqImgBorderColorIsOn && filterStyle.reqFilterImgBorderColor) || objectImageStyle.objectImgBorderColor;
                styles.push(`border: ${objectImageStyle.objectImgBorderWidth}px ${objectImageStyle.objectImgBorderStyle} ${hexToRgba(borderColor)};`);
            }
        }

        return styles.join(' ');
    });

    let scoreText = $derived.by(() => {
        let style: string[] = [];

        style.push(`font-family: '${textStyle.scoreText}'; font-size: ${textStyle.scoreTextSize}%; text-align: ${textStyle.scoreTextAlign};`);
        if (!isEnabled) {
            if (filterStyle.reqScoreTextColorIsOn)  {
                style.push(`color: ${hexToRgba(filterStyle.reqFilterSTextColor)}`);
            }
        } else if (addon.isActive || isActive && !addon.isSelectable) {
            if (filterStyle.selScoreTextColorIsOn) {
                style.push(`color: ${hexToRgba(filterStyle.selFilterSTextColor)}`);
            }
        } else {
            style.push(`color: ${hexToRgba(textStyle.scoreTextColor)};`);
        }

        return style.join(' ');
    });

    function addonWidthClass() {
        let addonWidth = (addon.addonWidth || 'col-12');
        let addonWidthNum = objectWidthToNum(addonWidth);
        let objectsPerRowNum = app.objectsPerRow === 'col-6' ? 2 : app.objectsPerRow === 'col-4' ? 3 : 4;
        if ($winWidth > 1280) {
            return addonWidth;
        } else if ($winWidth > 720) {
            switch(addonWidthNum) {
                case 1: return 'col-12';
                case 2: return 'col-6';
                case 3: return objectsPerRowNum > 2 ? 'col-4' : app.objectsPerRow;
                case 4: return objectsPerRowNum > 3 ? 'col-3' : app.objectsPerRow;
                default: return app.objectsPerRow;
            }
        } else if ($winWidth > 480) {
            return addonWidthNum === 1 ? 'col-12' : 'col-6';
        } else {
            return 'col-12';
        }
    }

    function copyTooltip(e: Event) {
        navigator.clipboard.writeText(addon.imageSourceTooltip).then(() => {
            snackbarVariables.labelText = 'Tooltip copied to clipboard.';
            snackbarVariables.isOpen = true;
        }).catch(() => {
            console.log(addon.imageSourceTooltip);
            snackbarVariables.labelText = 'Tooltip text logged to developer console.';
            snackbarVariables.isOpen = true;
        });
    }

    function activateObject(localChoice: SelectableAddon, localRow: Row, e?: MouseEvent, isManually: boolean = false) {
        const target = e && e.target ? e.target as HTMLElement : null
        let origRow = localRow;

        options.isOverDlg = false;
        options.isOverImg = false;

        if (localRow.isResultRow || localRow.isGroupRow) {
            const cMap = choiceMap.get(localChoice.id);

            if (typeof cMap !== 'undefined') {
                origRow = cMap.row;
            }
        }

        if (localChoice.isSelectableMultiple) {
            if (localChoice.id === addon.id && localChoice.allowSelectByClick && localChoice.multipleUseVariable === 0) {
                if (target) {
                    if (closestByClassPrefix(target, 'multi-', 'addon-')) return;
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
</script>