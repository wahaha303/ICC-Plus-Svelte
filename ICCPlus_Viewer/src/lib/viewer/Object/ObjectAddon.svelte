
{#if app.showAllAddons > 0 || addon.showAddon || checkRequirements(addon.requireds)}
    <div class="text-center" style={addonBackground}>
        {#if addon.template >= 4 || addon.template === 1 || windowWidth <= 1280}
            <span class="d-inline-block">
                {#if (addon.template === 1 || windowWidth <= 1280) && addon.image && !row?.addonImageRemoved}
                    {#if addon.imageSourceTooltip}
                        <img use:tooltip={addon.imageSourceTooltip} src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                    {:else}
                        <img src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                    {/if}
                {/if}
                {#if addon.title !== '' && !row?.addonTitleRemoved}
                    <h3 class="m-0" style={addonTitle}>
                        {@html DOMPurify.sanitize(replaceText(addon.title), sanitizeArg)}
                    </h3>
                {/if}
                {#if !row?.objectRequirementRemoved}
                    {#each addon.requireds as required}
                        <ObjectRequired required={required} scoreText={scoreText} />
                    {/each}
                {/if}
                {#if addon.template === 5 && addon.image && !row?.addonImageRemoved}
                    {#if addon.imageSourceTooltip}
                        <img use:tooltip={addon.imageSourceTooltip} src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                    {:else}
                        <img src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                    {/if}
                {/if}
                {#if addon.text !== '' && !row?.addonTextRemoved}
                    <p class="mb-0" style={addonText}>
                        {@html DOMPurify.sanitize(replaceText(addon.text), sanitizeArg)}
                    </p>
                {/if}
                {#if addon.template === 4 && addon.image && !row?.addonImageRemoved}
                    {#if addon.imageSourceTooltip}
                        <img use:tooltip={addon.imageSourceTooltip} src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                    {:else}
                        <img src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                    {/if}
                {/if}
            </span>
        {:else}
            <div class="row m-0 p-0 w-100">
                {#if addon.template === 2}
                    <div class="col p-0 text-center" style="max-width: {addonImageBoxWidth}%">
                        {#if addon.image && !row?.addonImageRemoved}
                            {#if addon.imageSourceTooltip}
                                <img use:tooltip={addon.imageSourceTooltip} src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {:else}
                                <img src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {/if}
                        {/if}
                    </div>
                    <div class="col p-0 text-center" style="max-width: {100 - addonImageBoxWidth}%">
                        {#if addon.title !== '' && !row?.addonTitleRemoved}
                            <h2 class="mb-0" style={addonTitle}>{@html DOMPurify.sanitize(replaceText(addon.title), sanitizeArg)}</h2>
                        {/if}
                        {#if !row?.objectRequirementRemoved}
                            {#each addon.requireds as required}
                                <ObjectRequired required={required} scoreText={scoreText} />
                            {/each}
                        {/if}
                        {#if addon.text !== '' && !row?.addonTextRemoved}
                            <p class="mb-0" style={addonText}>
                                {@html DOMPurify.sanitize(replaceText(addon.text), sanitizeArg)}
                            </p>
                        {/if}
                    </div>
                {:else if addon.template === 3}
                    <div class="col p-0 text-center" style="max-width: {100 - addonImageBoxWidth}%">
                        {#if addon.title !== '' && !row?.addonTitleRemoved}
                            <h2 class="mb-0" style={addonTitle}>{@html DOMPurify.sanitize(replaceText(addon.title), sanitizeArg)}</h2>
                        {/if}
                        {#if !row?.objectRequirementRemoved}
                            {#each addon.requireds as required}
                                <ObjectRequired required={required} scoreText={scoreText} />
                            {/each}
                        {/if}
                        {#if addon.text !== '' && !row?.addonTextRemoved}
                            <p class="mb-0" style={addonText}>
                                {@html DOMPurify.sanitize(replaceText(addon.text), sanitizeArg)}
                            </p>
                        {/if}
                    </div>
                    <div class="col p-0 text-center" style="max-width: {addonImageBoxWidth}%">
                        {#if addon.image && !row?.addonImageRemoved}
                            {#if addon.imageSourceTooltip}
                                <img use:tooltip={addon.imageSourceTooltip} src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {:else}
                                <img src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {/if}
                        {/if}
                    </div>
                {/if}
            </div>
        {/if}
    </div>
{/if}

<script lang="ts">
    import DOMPurify from 'dompurify';
    import ObjectRequired from './ObjectRequired.svelte';
    import { app, checkRequirements, getStyling, hexToRgba, replaceText, sanitizeArg } from '$lib/store/store.svelte';
    import type { Choice, Row, Addon } from '$lib/store/types';
    import { tooltip } from '$lib/custom/tooltip/store.svelte';

    let { addon, row, choice, isEnabled, windowWidth = 0, preloadImages = false }: { addon: Addon; row?: Row; choice?: Choice; isEnabled?: boolean, windowWidth?: number, preloadImages?: boolean } = $props();

    let isActive = $derived(typeof choice !== 'undefined' ? choice.isActive : false);
    let addonImageStyle = $derived(getStyling('privateAddonImageIsOn', row, choice));
    let addonStyle = $derived(getStyling('privateAddonIsOn', row, choice));
    let filterStyle = $derived(getStyling('privateFilterIsOn', row, choice));
    let objectImageStyle = $derived(getStyling('privateObjectImageIsOn', row, choice));
    let objectStyle = $derived(getStyling('privateObjectIsOn', row, choice));
    let textStyle = $derived(getStyling('privateTextIsOn', row, choice));
    let addonEnabled = $derived(checkRequirements(addon.requireds))
    
    let addonImageBoxWidth = $derived(typeof addonImageStyle.addonImageBoxWidth !== 'undefined' ? addonImageStyle.addonImageBoxWidth : 50);

    let addonBackground = $derived.by(() => {
        let useDesign = addonStyle.useAddonDesign; 
        let suffix = (useDesign ? addonStyle.addonBorderRadiusIsPixels : objectStyle.objectBorderRadiusIsPixels) ? 'px' : '%';
        let bgImageIndex = 0;
        let bgColorIndex = 0;
        let filterIndex = 0;
        let styles = [];

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
            if (addonStyle.addonDropShadowIsOn) {
                if (addonStyle.addonUseBoxShadowIsOn) {
                    styles.push(`box-shadow: ${addonStyle.addonDropShadowH}px ${addonStyle.addonDropShadowV}px ${addonStyle.addonDropShadowBlur}px ${hexToRgba(addonStyle.addonDropShadowColor)};`);
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
            if (addonStyle.addonGradientIsOn) {
                styles.push(`background-image: linear-gradient(${addonStyle.addonGradient});`);
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
            if (addonStyle.addonGradientIsOn) {
                styles.push(`background-image: linear-gradient(${addonStyle.addonGradientOnReq});`);
            }
        }

        return styles.join(' ');
    });

    let addonTitle = $derived.by(() => {
        let styles = [];

        styles.push(`font-family: '${textStyle.addonTitle}'; font-size: ${textStyle.addonTitleTextSize}%; text-align: ${textStyle.addonTitleAlign};`);
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
        let styles = [];

        styles.push(`font-family: '${textStyle.addonText}'; text-align: ${textStyle.addonTextAlign}; font-size: ${textStyle.addonTextTextSize}%; white-space: pre-line;`);
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
        let styles = [];
        let useDesign = addonImageStyle.useAddonImage;
        let suffix = (useDesign ? addonImageStyle.addonImgBorderRadiusIsPixels : objectImageStyle.objectImgBorderRadiusIsPixels) ? 'px' : '%';

        if (useDesign) {
            styles.push(`width: ${addonImageStyle.addonImageWidth}%; margin-top: ${addonImageStyle.addonImageMarginTop}%; margin-bottom: ${addonImageStyle.addonImageMarginBottom}%;`);
            if (addonImageStyle.addonImgObjectFillIsOn && choice?.addonImgObjectFillHeight) {
                styles.push(`object-fit: ${addonImageStyle.addonImgObjectFillStyle}; height: ${choice?.addonImgObjectFillHeight}px;`);
            }
            styles.push(`border-radius: ${addonImageStyle.addonImgBorderRadiusTopLeft}${suffix} ${addonImageStyle.addonImgBorderRadiusTopRight}${suffix} ${addonImageStyle.addonImgBorderRadiusBottomRight}${suffix} ${addonImageStyle.addonImgBorderRadiusBottomLeft}${suffix};`);
            if (addonImageStyle.addonImgOverflowIsOn) {
                styles.push(`overflow: hidden;`);
            }
            if (addonImageStyle.addonImgBorderIsOn) {
                styles.push(`border: ${addonImageStyle.addonImgBorderWidth}px ${addonImageStyle.addonImgBorderStyle} ${hexToRgba(addonImageStyle.addonImgBorderColor)};`);
            }    
        } else {
            styles.push(`width: ${objectImageStyle.objectImageWidth}%; margin-top: ${objectImageStyle.objectImageMarginTop}%; margin-bottom: ${objectImageStyle.objectImageMarginBottom}%;`);
            if (objectImageStyle.objectImgObjectFillIsOn && row?.objectImgObjectFillHeight) {
                styles.push(`object-fit: ${objectImageStyle.objectImgObjectFillStyle}; height: ${row?.objectImgObjectFillHeight}px;`);
            }
            styles.push(`border-radius: ${objectImageStyle.objectImgBorderRadiusTopLeft}${suffix} ${objectImageStyle.objectImgBorderRadiusTopRight}${suffix} ${objectImageStyle.objectImgBorderRadiusBottomRight}${suffix} ${objectImageStyle.objectImgBorderRadiusBottomLeft}${suffix};`);
            if (objectImageStyle.objectImgOverflowIsOn) {
                styles.push(`overflow: hidden;`);
            }
            if (objectImageStyle.objectImgBorderIsOn) {
                styles.push(`border: ${objectImageStyle.objectImgBorderWidth}px ${objectImageStyle.objectImgBorderStyle} ${hexToRgba(objectImageStyle.objectImgBorderColor)};`);
            }
        }

        return styles.join(' ');
    });

    let scoreText = $derived.by(() => {
        return `font-family: '${textStyle.scoreText}'; font-size: ${textStyle.scoreTextSize}%; text-align: ${textStyle.scoreTextAlign}; color: ${hexToRgba(textStyle.scoreTextColor)};`;
    });

</script>