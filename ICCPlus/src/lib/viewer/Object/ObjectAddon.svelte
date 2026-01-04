<div class="text-center addon{addon.isSelectable ? ` addon-${addon.id}` : ''} {addonWidthClass()}" style={addonBackground}>
    {#if addon.template >= 4 || addon.template === 1 || windowWidth <= 1280}
        <div>
            {#if (addon.template === 1 || windowWidth <= 1280) && addon.image && !row?.addonImageRemoved}
                {#if addon.imageSourceTooltip}
                    <img use:tooltip={addon.imageSourceTooltip} oncontextmenu={copyTooltip} src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                {:else}
                    <img src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                {/if}
            {/if}
            {#if addon.title !== '' && !row?.addonTitleRemoved}
                {#key addonTitleKey}
                    <h3 class="m-0" style={addonTitle}>
                        {@html DOMPurify.sanitize(addonTitleKey, sanitizeArg)}
                    </h3>
                {/key}
            {/if}
            {#if !row?.objectScoreRemoved && choice.showScoreInAddon && isFirst}
                {#each choice.scores as score}
                    <ObjectScore score={score} row={row} choice={choice} />
                {/each}
            {/if}
            {#if !row?.objectRequirementRemoved}
                {#if choice.showReqInAddon && isFirst}
                    {#each choice.requireds as required}
                        <ObjectRequired required={required} scoreText={scoreText} />
                    {/each}
                {/if}
                {#each addon.requireds as required}
                    <ObjectRequired required={required} scoreText={scoreText} />
                {/each}
            {/if}
            {#if addon.template === 5 && windowWidth > 1280 && addon.image && !row?.addonImageRemoved}
                {#if addon.imageSourceTooltip}
                    <img use:tooltip={addon.imageSourceTooltip} oncontextmenu={copyTooltip} src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                {:else}
                    <img src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                {/if}
            {/if}
            {#if addon.text !== '' && !row?.addonTextRemoved}
                {#key addonTextKey}
                    <p class="mb-0" style={addonText}>
                        {@html DOMPurify.sanitize(addonTextKey, sanitizeArg)}
                    </p>
                {/key}
            {/if}
            {#if addon.template === 4 && windowWidth > 1280 && addon.image && !row?.addonImageRemoved}
                {#if addon.imageSourceTooltip}
                    <img use:tooltip={addon.imageSourceTooltip} oncontextmenu={copyTooltip} src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                {:else}
                    <img src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                {/if}
            {/if}
        </div>
    {:else}
        <div class="row m-0 p-0 w-100">
            {#if addon.template === 2}
                <div class="col p-0 text-center" style="max-width: {addonImageBoxWidth}%">
                    {#if addon.image && !row?.addonImageRemoved}
                        {#if addon.imageSourceTooltip}
                            <img use:tooltip={addon.imageSourceTooltip} oncontextmenu={copyTooltip} src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                        {:else}
                            <img src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                        {/if}
                    {/if}
                </div>
                <div class="col p-0 text-center" style="max-width: {100 - addonImageBoxWidth}%">
                    {#if addon.title !== '' && !row?.addonTitleRemoved}
                        {#key addonTitleKey}<h2 class="mb-0" style={addonTitle}>{@html DOMPurify.sanitize(addonTitleKey, sanitizeArg)}</h2>{/key}
                    {/if}
                    {#if !row?.objectScoreRemoved && choice.showScoreInAddon && isFirst}
                        {#each choice.scores as score}
                            <ObjectScore score={score} row={row} choice={choice} />
                        {/each}
                    {/if}
                    {#if !row?.objectRequirementRemoved}
                        {#if choice.showReqInAddon && isFirst}
                            {#each choice.requireds as required}
                                <ObjectRequired required={required} scoreText={scoreText} />
                            {/each}
                        {/if}
                        {#each addon.requireds as required}
                            <ObjectRequired required={required} scoreText={scoreText} />
                        {/each}
                    {/if}
                    {#if addon.text !== '' && !row?.addonTextRemoved}
                        {#key addonTextKey}
                            <p class="mb-0" style={addonText}>
                                {@html DOMPurify.sanitize(addonTextKey, sanitizeArg)}
                            </p>
                        {/key}
                    {/if}
                </div>
            {:else if addon.template === 3}
                <div class="col p-0 text-center" style="max-width: {100 - addonImageBoxWidth}%">
                    {#if addon.title !== '' && !row?.addonTitleRemoved}
                        {#key addonTitleKey}<h2 class="mb-0" style={addonTitle}>{@html DOMPurify.sanitize(addonTitleKey, sanitizeArg)}</h2>{/key}
                    {/if}
                    {#if !row?.objectScoreRemoved && choice.showScoreInAddon && isFirst}
                        {#each choice.scores as score}
                            <ObjectScore score={score} row={row} choice={choice} />
                        {/each}
                    {/if}
                    {#if !row?.objectRequirementRemoved}
                        {#if choice.showReqInAddon && isFirst}
                            {#each choice.requireds as required}
                                <ObjectRequired required={required} scoreText={scoreText} />
                            {/each}
                        {/if}
                        {#each addon.requireds as required}
                            <ObjectRequired required={required} scoreText={scoreText} />
                        {/each}
                    {/if}
                    {#if addon.text !== '' && !row?.addonTextRemoved}
                        {#key addonTextKey}
                            <p class="mb-0" style={addonText}>
                                {@html DOMPurify.sanitize(addonTextKey, sanitizeArg)}
                            </p>
                        {/key}
                    {/if}
                </div>
                <div class="col p-0 text-center" style="max-width: {addonImageBoxWidth}%">
                    {#if addon.image && !row?.addonImageRemoved}
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
    import { app, checkRequirements, getStyling, replaceText, sanitizeArg, hexToRgba, snackbarVariables, winWidth, objectWidthToNum } from '$lib/store/store.svelte';
    import type { Choice, Row, Addon } from '$lib/store/types';
    import { tooltip } from '$lib/custom/tooltip/store.svelte';
    import ObjectScore from './ObjectScore.svelte';

    let { addon, row, choice, isEnabled, windowWidth = 0, preloadImages = false, isFirst }: { addon: Addon; row: Row; choice: Choice; isEnabled?: boolean, windowWidth?: number, preloadImages?: boolean, isFirst?: boolean } = $props();

    let isActive = $derived(typeof choice !== 'undefined' ? choice.isActive : false);
    let addonImageStyle = $derived(getStyling('privateAddonImageIsOn', row, choice));
    let addonStyle = $derived(getStyling('privateAddonIsOn', row, choice));
    let filterStyle = $derived(getStyling('privateFilterIsOn', row, choice));
    let objectImageStyle = $derived(getStyling('privateObjectImageIsOn', row, choice));
    let objectStyle = $derived(getStyling('privateObjectIsOn', row, choice));
    let textStyle = $derived(getStyling('privateTextIsOn', row, choice));
    let addonEnabled = $derived(checkRequirements(addon.requireds));
    let addonTitleKey = $derived(replaceText(addon.title));
    let addonTextKey = $derived(replaceText(addon.text));
    
    let addonImageBoxWidth = $derived(typeof addonImageStyle.addonImageBoxWidth !== 'undefined' ? addonImageStyle.addonImageBoxWidth : 50);

    let addonBackground = $derived.by(() => {
        let useDesign = addonStyle.useAddonDesign; 
        let suffix = (useDesign ? addonStyle.addonBorderRadiusIsPixels : objectStyle.objectBorderRadiusIsPixels) ? 'px' : '%';
        let bgImageIndex = 0;
        let bgColorIndex = 0;
        let filterIndex = 0;
        let styles: string[] = [];

        if (useDesign) {
            if (addonStyle.addonBorderImage) {
                styles.push(`border-image: url('${addonStyle.addonBorderImage}') ${addonStyle.addonBorderImageSliceTop} ${addonStyle.addonBorderImageSliceRight} ${addonStyle.addonBorderImageSliceBottom} ${addonStyle.addonBorderImageSliceLeft} / ${addonStyle.addonBorderImageWidth}px ${addonStyle.addonBorderImageRepeat}; border-style: solid; padding: ${addonStyle.addonBorderImageWidth}px;`);
            }
            if (addonStyle.useAddonBackgroundImage && addonStyle.addonBackgroundImage) {
                styles.push(`background-image: url('${addonStyle.addonBackgroundImage}'); ${addonStyle.isObjectBackgroundRepeat? 'background-repeat: repeat;' : (addonStyle.isObjectBackgroundFitIn ? 'background-size: 100% 100%;' : 'background-size: cover;')}`);
                bgImageIndex = styles.length;
            }
            if (addonStyle.addonBgColorIsOn) {
                styles.push(`background-color: ${hexToRgba(addonStyle.addonBgColor)};`);
                bgColorIndex = styles.length;
            }
            styles.push(`margin: ${addonStyle.addonMargin}px;`);
            styles.push(`border-radius: ${addonStyle.addonBorderRadiusTopLeft}${suffix} ${addonStyle.addonBorderRadiusTopRight}${suffix} ${addonStyle.addonBorderRadiusBottomRight}${suffix} ${addonStyle.addonBorderRadiusBottomLeft}${suffix};`);
            if (addonStyle.addonOverflowIsOn) {
                styles.push(`overflow: hidden;`);
            }
            if (addonStyle.addonBorderIsOn || (isActive && filterStyle.selBorderColorIsOn) || (!isEnabled && filterStyle.reqBorderColorIsOn)) {
                let borderColor = addonStyle.addonBorderColor;
                
                if (!isEnabled && filterStyle.reqBorderColorIsOn) {
                    borderColor = filterStyle.reqFilterBorderColor;
                } else if (isActive && filterStyle.selBorderColorIsOn) {
                    borderColor = filterStyle.selFilterBorderColor;
                }
                styles.push(`border: ${addonStyle.addonBorderWidth}px ${addonStyle.addonBorderStyle} ${hexToRgba(borderColor)};`);
            }
            if (addonStyle.addonGradientIsOn) {
                if (isEnabled && addonEnabled) {
                    if (isActive) {
                        styles.push(`background-image: linear-gradient(${addonStyle.addonGradientOnSelect});`);
                    } else {
                        styles.push(`background-image: linear-gradient(${addonStyle.addonGradient});`);
                    }
                } else {
                    styles.push(`background-image: linear-gradient(${addonStyle.addonGradientOnReq});`);
                }
            }
            if (addonStyle.addonDropShadowIsOn) {
                if (addonStyle.addonUseBoxShadowIsOn) {
                    styles.push(`box-shadow: ${addonStyle.addonDropShadowH}px ${addonStyle.addonDropShadowV}px ${addonStyle.addonDropShadowBlur}px ${addonStyle.addonDropShadowSpread}px ${hexToRgba(addonStyle.addonDropShadowColor)};`);
                } else {
                    filterIndex = styles.length;
                    styles.push(`filter: drop-shadow(${addonStyle.addonDropShadowH}px ${addonStyle.addonDropShadowV}px ${addonStyle.addonDropShadowBlur}px ${hexToRgba(addonStyle.addonDropShadowColor)})`);
                }
            }            
            if (filterIndex === 0) {
                styles.push(`filter:`);
                filterIndex = styles.length;
            }
            if (isEnabled && addonEnabled) {
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
                }
                if (styles.length === filterIndex) {
                    styles.splice(filterIndex - 1, 1);
                } else {
                    styles.push(`;`);
                }
            }
        }
        if ((app.showAllAddons > 0 || addon.showAddon) && isEnabled && !addonEnabled) {
            if (filterIndex === 0) {
                styles.push(`filter:`);
                filterIndex = styles.length;
            }
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
                if (!filterStyle.reqOverlayOnImage) {
                    if (bgColorIndex !== 0) {
                        styles.splice(bgColorIndex - 1, 1);
                    }
                    if (bgImageIndex !== 0) {
                        styles.splice(bgImageIndex - 1, 1);
                    }
                }
                styles.push(`background-color: ${hexToRgba(filterStyle.reqFilterBgColor)};`);
            }
            if (useDesign && addonStyle.addonGradientIsOn) {
                styles.push(`background-image: linear-gradient(${addonStyle.addonGradientOnReq});`);
            }
        }
        return styles.join(' ');
    });

    let addonTitle = $derived.by(() => {
        let styles: string[] = [];

        styles.push(`white-space: pre-line; font-family: '${textStyle.addonTitle}'; font-size: ${textStyle.addonTitleTextSize}%; text-align: ${textStyle.addonTitleAlign};`);
        if (!isEnabled && filterStyle.reqATitleColorIsOn) {
            styles.push(`color: ${hexToRgba(filterStyle.reqFilterATitleColor)};`);
        } else if (isActive && filterStyle.selATitleColorIsOn) {
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
        } else if (isActive && filterStyle.selATextColorIsOn) {
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
                const borderColor = isEnabled ? (isActive && filterStyle.selImgBorderColorIsOn && filterStyle.selFilterImgBorderColor) || addonImageStyle.addonImgBorderColor : (filterStyle.reqImgBorderColorIsOn && filterStyle.reqFilterImgBorderColor) || addonImageStyle.addonImgBorderColor;
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
                const borderColor = isEnabled ? (isActive && filterStyle.selImgBorderColorIsOn && filterStyle.selFilterImgBorderColor) || objectImageStyle.objectImgBorderColor : (filterStyle.reqImgBorderColorIsOn && filterStyle.reqFilterImgBorderColor) || objectImageStyle.objectImgBorderColor;
                styles.push(`border: ${objectImageStyle.objectImgBorderWidth}px ${objectImageStyle.objectImgBorderStyle} ${hexToRgba(borderColor)};`);
            }
        }

        return styles.join(' ');
    });

    let scoreText = $derived.by(() => {
        return `font-family: '${textStyle.scoreText}'; font-size: ${textStyle.scoreTextSize}%; text-align: ${textStyle.scoreTextAlign}; color: ${hexToRgba(textStyle.scoreTextColor)};`;
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

</script>