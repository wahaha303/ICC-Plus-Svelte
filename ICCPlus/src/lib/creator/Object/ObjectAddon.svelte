{#if isEditModeOn}
    <div bind:clientWidth={width}>
        <div class="d-row justify-space-between overflow-auto">
            <Wrapper text="Move Up">
                <IconButton onclick={moveAddonUp}><i class="mdi mdi-chevron-up"></i></IconButton>
            </Wrapper>
            <div class="d-flex">
                <Wrapper text="Create New Reqruirement">
                    <IconButton onclick={() => {dlgVariables.data = addon; dlgVariables.currentDialog = 'appRequirement'}}><i class="mdi mdi-key-plus"></i></IconButton>
                </Wrapper>
                <Wrapper text="Copy Requirement">
                    <IconButton onclick={copyRequirement}><i class="mdi mdi-clipboard-outline"></i></IconButton>
                </Wrapper>
            </div>
            <Wrapper text="Move Down">
                <IconButton onclick={moveAddonDown}><i class="mdi mdi-chevron-down"></i></IconButton>
            </Wrapper>
        </div>
        <div class="py-3 px-5 col-12">
            {#if addon.image && !app.hideImages}
                <button type="button" onclick={() => {dlgVariables.data = addon; dlgVariables.currentDialog = 'appImageUpload'; dlgVariables.imgProp = 'image'}} class="btn--image-background">
                    <img src={addon.image} alt="" loading="lazy" class="btn--image" style="max-height: 175px"/>
                </button>
            {/if}
            <Button onclick={() => {dlgVariables.data = addon; dlgVariables.currentDialog = 'appImageUpload'; dlgVariables.imgProp = 'image'}} variant="raised">
                <Label>Change Image</Label>
            </Button>
        </div>
        <div class="row gx-3">
            <FormField class="col-12">
                <Checkbox bind:checked={() => addon.showAddon ?? false, (e) => addon.showAddon = e} />
                {#snippet label()}
                    Always show this addon
                {/snippet}
            </FormField>
            <div class="col-12">
                <Select bind:value={addon.template} label="Template" variant="filled" alwaysFloat={true}>
                    {#each templates as template (template.text)}
                        <Option value={template.value}>{template.text}</Option>
                    {/each}
                </Select>
                <Textfield class="mb-1" bind:value={addon.title} label="Addon Title" variant="filled" />
                <Textfield textarea bind:value={addon.text} label="Addon Text" variant="filled" input$rows={5} />
            </div>
        </div>
        <div class="row gy-3 p-2">
            {#each addon.requireds as required, i}
                <div class={col6}>
                    <FormField class="w-100">
                        <Checkbox bind:checked={required.showRequired} onchange={() => {
                            if (!required.showRequired) {
                                delete required.hideRequired;
                            }
                        }} class="check-scale" />
                        {#snippet label()}
                            Show Requirement
                        {/snippet}
                    </FormField>
                    {#if required.showRequired}
                        <FormField class="w-100">
                            <Checkbox bind:checked={() => required.hideRequired?? false, (e) => required.hideRequired = e} class="check-scale" />
                            {#snippet label()}
                                Hide when Requirement is met
                            {/snippet}
                        </FormField>
                        <FormField class="w-100">
                            <Checkbox bind:checked={() => required.customTextIsOn?? false, (e) => required.customTextIsOn = e} onchange={() => {
                                if (!required.customTextIsOn) {
                                    delete required.customText;
                                }
                            }} class="check-scale" />
                            {#snippet label()}
                                Use custom requirement text
                            {/snippet}
                        </FormField>
                        {#if required.customTextIsOn}
                            <Textfield bind:value={() => required.customText?? '', (e) => required.customText = e} label="Custom Text" variant="filled" />
                        {:else}
                            <Textfield bind:value={required.beforeText} label="Text Before" variant="filled" />
                            <Textfield bind:value={required.afterText} label="Text After" variant="filled" />
                        {/if}
                    {/if}
                    <ObjectInnerReq required={required} />
                    <Button onclick={() => addon.requireds.splice(i, 1)} class="mt-1" variant="raised">
                        <Label>Delete</Label>
                    </Button>
                </div>
            {/each}
        </div>
    </div>
{:else if app.showAllAddons > 0 || addon.showAddon || checkRequirements(addon.requireds)}
    <div class="text-center" style={addonBackground}>
        {#if addon.template >= 4 || addon.template === 1 || windowWidth <= 960}
            <span class="m-0">
                {#if (addon.template === 1 || windowWidth <= 960) && addon.image && !row?.addonImageRemoved}
                    {#if addon.imageSourceTooltip}
                        <Wrapper text={addon.imageSourceTooltip}>
                            <img src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                        </Wrapper>
                    {:else}
                        <img src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                    {/if}
                {/if}
                {#if addon.title !== '' && !row?.addonTitleRemoved}
                    <h3 class="m-0" style={addonTitle}>
                        {@html DOMPurify.sanitize(replaceText(addon.title), sanitizeArg)}
                    </h3>
                {/if}
                {#each addon.requireds as required}
                    <ObjectRequired isRemoved={row?.addonRequirementRemoved} required={required} scoreText={scoreText} />
                {/each}
                {#if addon.template === 5 && addon.image && !row?.addonImageRemoved}
                    {#if addon.imageSourceTooltip}
                        <Wrapper text={addon.imageSourceTooltip}>
                            <img src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                        </Wrapper>
                    {:else}
                        <img src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                    {/if}
                {/if}
                {#if addon.text !== '' && !row?.addonTextRemoved}
                    <p style={addonText}>
                        {@html DOMPurify.sanitize(replaceText(addon.text), sanitizeArg)}
                    </p>
                {/if}
                {#if addon.template === 4 && addon.image && !row?.addonImageRemoved}
                    {#if addon.imageSourceTooltip}
                        <Wrapper text={addon.imageSourceTooltip}>
                            <img src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                        </Wrapper>
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
                                <Wrapper text={addon.imageSourceTooltip}>
                                    <img src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                                </Wrapper>
                            {:else}
                                <img src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {/if}
                        {/if}
                    </div>
                    <div class="col p-0 text-center" style="max-width: {100 - addonImageBoxWidth}%">
                        {#if addon.title !== '' && !row?.addonTitleRemoved}
                            <h2 class="mb-0" style={addonTitle}>{@html DOMPurify.sanitize(replaceText(addon.title), sanitizeArg)}</h2>
                        {/if}
                        {#each addon.requireds as required}
                            <ObjectRequired isRemoved={row?.addonRequirementRemoved} required={required} scoreText={scoreText} />
                        {/each}
                        {#if addon.text !== '' && !row?.addonTextRemoved}
                            <p style={addonText}>
                                {@html DOMPurify.sanitize(replaceText(addon.text), sanitizeArg)}
                            </p>
                        {/if}
                    </div>
                {:else if addon.template === 3}
                    <div class="col p-0 text-center" style="max-width: {100 - addonImageBoxWidth}%">
                        {#if addon.title !== '' && !row?.addonTitleRemoved}
                            <h2 class="mb-0" style={addonTitle}>{@html DOMPurify.sanitize(replaceText(addon.title), sanitizeArg)}</h2>
                        {/if}
                        {#each addon.requireds as required}
                            <ObjectRequired isRemoved={row?.addonRequirementRemoved} required={required} scoreText={scoreText} />
                        {/each}
                        {#if addon.text !== '' && !row?.addonTextRemoved}
                            <p style={addonText}>
                                {@html DOMPurify.sanitize(replaceText(addon.text), sanitizeArg)}
                            </p>
                        {/if}
                    </div>
                    <div class="col p-0 text-center" style="max-width: {addonImageBoxWidth}%">
                        {#if addon.image && !row?.addonImageRemoved}
                            {#if addon.imageSourceTooltip}
                                <Wrapper text={addon.imageSourceTooltip}>
                                    <img src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                                </Wrapper>
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
    import Button, { Label } from '@smui/button';
    import Checkbox from '@smui/checkbox';
    import DOMPurify from 'dompurify';
    import FormField from '@smui/form-field';
    import IconButton from '@smui/icon-button';
    import ObjectInnerReq from './ObjectInnerReq.svelte';
    import ObjectRequired from './ObjectRequired.svelte';
    import Select, { Option } from '$lib/custom/select';
    import Textfield from '$lib/custom/textfield';
    import { Wrapper } from '$lib/custom/tooltip';
    import { app, checkRequirements, dlgVariables, getStyling, replaceText, sanitizeArg, snackbarVariables } from '$lib/store/store.svelte';
    import type { Choice, Row, Addon } from '$lib/store/types';

    let { isEditModeOn = false, addon, row, choice, isEnabled, isActive, windowWidth = 0, preloadImages = false, index }: { isEditModeOn?: boolean; addon: Addon; row?: Row; choice?: Choice; isEnabled?: boolean, isActive?: boolean, windowWidth?: number, preloadImages?: boolean, index?: number } = $props();

    const templates = [{
        text: "Image top",
        value: 1
    }, {
        text: "Image left",
        value: 2
    }, {
        text: "Image right",
        value: 3
    }, {
        text: "Image bottom",
        value: 4
    }, {
        text: "Image center",
        value: 5
    }];
    let width = $state(0);
    let col6 = $derived.by(() => {
        if (width > 300) return 'col-6';
        else return 'col-12';
    });
    let addonImageStyle = $derived(getStyling('privateAddonImageIsOn', row, choice));
    let addonStyle = $derived(getStyling('privateAddonIsOn', row, choice));
    let filterStyle = $derived(getStyling('privateFilterIsOn', row, choice));
    let objectImageStyle = $derived(getStyling('privateObjectImageIsOn', row, choice));
    let objectStyle = $derived(getStyling('privateObjectIsOn', row, choice));
    let textStyle = $derived(getStyling('privateTextIsOn', row, choice));
    let addonEnabled = $derived(checkRequirements(addon.requireds))
    
    let addonImageBoxWidth = $derived(addonImageStyle.addonImageBoxWidth ?? 50);
    
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
                styles.push(`background-color: ${addonStyle.addonBgColor};`);
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
                styles.push(`border: ${addonStyle.addonBorderWidth}px ${addonStyle.addonBorderStyle} ${borderColor};`);
            }
            if (addonStyle.addonDropShadowIsOn) {
                if (addonStyle.addonUseBoxShadowIsOn) {
                    styles.push(`box-shadow: ${addonStyle.addonDropShadowH}px ${addonStyle.addonDropShadowV}px ${addonStyle.addonDropShadowBlur}px ${addonStyle.addonDropShadowColor};`);
                } else {
                    filterIndex = styles.length;
                    styles.push(`filter: drop-shadow(${addonStyle.addonDropShadowH}px ${addonStyle.addonDropShadowV}px ${addonStyle.addonDropShadowBlur}px ${addonStyle.addonDropShadowColor})`);
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
                styles.push(`background-image: linear-gradient('${addonStyle.addonGradient}');`);
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
                styles.push(`background-color: ${filterStyle.reqFilterBgColor};`);
            }
            if (addonStyle.addonGradientIsOn) {
                styles.push(`background-image: linear-gradient('${addonStyle.addonGradientOnReq}');`);
            }
        }

        return styles.join(' ');
    });

    let addonTitle = $derived.by(() => {
        let styles = [];

        styles.push(`font-family: ${textStyle.addonTitle};font-size: ${textStyle.addonTitleTextSize}%;text-align: ${textStyle.addonTitleAlign};`);
        if (!isEnabled && filterStyle.reqATitleColorIsOn) {
            styles.push(`color: ${filterStyle.reqFilterATitleColor};`);
        } else if (isActive && filterStyle.selATitleColorIsOn) {
            styles.push(`color: ${filterStyle.selFilterATitleColor};`);
        } else {
            styles.push(`color: ${textStyle.addonTitleColor};`);
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

        styles.push(`font-family: ${textStyle.addonText};text-align: ${textStyle.addonTextAlign};font-size: ${textStyle.addonTextTextSize}%;white-space: pre-line;`);
        if (!isEnabled && filterStyle.reqATextColorIsOn) {
            styles.push(`color: ${filterStyle.reqFilterATextColor};`);
        } else if (isActive && filterStyle.selATextColorIsOn) {
            styles.push(`color: ${filterStyle.selFilterATextColor};`);
        } else {
            styles.push(`color: ${textStyle.addonTextColor};`);
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
            if (addonImageStyle.addonImgObjectFillIsOn) {
                styles.push(`object-fit: ${addonImageStyle.addonImgObjectFillStyle}; height: ${choice?.addonImgObjectFillHeight ?? 200}px;`);
            }
            styles.push(`border-radius: ${addonImageStyle.addonImgBorderRadiusTopLeft}${suffix} ${addonImageStyle.addonImgBorderRadiusTopRight}${suffix} ${addonImageStyle.addonImgBorderRadiusBottomRight}${suffix} ${addonImageStyle.addonImgBorderRadiusBottomLeft}${suffix};`);
            if (addonImageStyle.addonImgOverflowIsOn) {
                styles.push(`overflow: hidden;`);
            }
            if (addonImageStyle.addonImgBorderIsOn) {
                styles.push(`border: ${addonImageStyle.addonImgBorderWidth}px ${addonImageStyle.addonImgBorderStyle} ${addonImageStyle.addonImgBorderColor};`);
            }    
        } else {
            styles.push(`width: ${objectImageStyle.objectImageWidth}%; margin-top: ${objectImageStyle.objectImageMarginTop}%; margin-bottom: ${objectImageStyle.objectImageMarginBottom}%;`);
            if (objectImageStyle.objectImgObjectFillIsOn) {
                styles.push(`object-fit: ${objectImageStyle.objectImgObjectFillStyle}; height: ${row?.objectImgObjectFillHeight ?? 200}px;`);
            }
            styles.push(`border-radius: ${objectImageStyle.objectImgBorderRadiusTopLeft}${suffix} ${objectImageStyle.objectImgBorderRadiusTopRight}${suffix} ${objectImageStyle.objectImgBorderRadiusBottomRight}${suffix} ${objectImageStyle.objectImgBorderRadiusBottomLeft}${suffix};`);
            if (objectImageStyle.objectImgOverflowIsOn) {
                styles.push(`overflow: hidden;`);
            }
            if (objectImageStyle.objectImgBorderIsOn) {
                styles.push(`border: ${objectImageStyle.objectImgBorderWidth}px ${objectImageStyle.objectImgBorderStyle} ${objectImageStyle.objectImgBorderColor};`);
            }
        }

        return styles.join(' ');
    });

    let scoreText = $derived.by(() => {
        return `font-family: ${textStyle.scoreText}; font-size: ${textStyle.scoreTextSize}%; text-align: ${textStyle.scoreTextAlign}; color: ${textStyle.scoreTextColor};`;
    });

    function copyRequirement() {
        app.tmpRequired.length = 0;
        app.tmpRequired.push(...addon.requireds);
        snackbarVariables.labelText = 'Copied to clipboard.';
        snackbarVariables.isOpen = true;
    }
    
    function moveAddonUp() {
        if (typeof choice !== 'undefined' && typeof index !== 'undefined' && index > 0) {
            choice.addons.splice(index - 1, 2, choice.addons[index], choice.addons[index - 1]);
        }
    }

    function moveAddonDown() {
        if (typeof choice !== 'undefined' && typeof index !== 'undefined' && index < choice.addons.length - 1) {
            choice.addons.splice(index, 2, choice.addons[index + 1], choice.addons[index]);
        }
    }

</script>