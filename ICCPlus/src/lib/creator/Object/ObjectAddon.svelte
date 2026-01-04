{#if isEditModeOn}
    <div bind:clientWidth={width}>
        <div class="d-row justify-space-between overflow-auto title--text">
            <Wrapper text="Move Up">
                <IconButton onclickcapture={moveAddonUp}><i class="mdi mdi-chevron-up"></i></IconButton>
            </Wrapper>
            <div class="d-flex">
                <Wrapper text="Create New Requirement">
                    <IconButton onclickcapture={() => {dlgVariables.data = addon; dlgVariables.currentDialog = 'appRequirement'}}><i class="mdi mdi-key-plus"></i></IconButton>
                </Wrapper>
                <Wrapper text="Copy Addon">
                    <IconButton onclickcapture={copyAddon}><i class="mdi mdi-clipboard-outline"></i></IconButton>
                </Wrapper>
            </div>
            <Wrapper text="Move Down">
                <IconButton onclickcapture={moveAddonDown}><i class="mdi mdi-chevron-down"></i></IconButton>
            </Wrapper>
        </div>
        <div class="py-3 px-5 col-12">
            {#if addon.image && !app.hideImages}
                <button type="button" onclickcapture={() => {dlgVariables.data = addon; dlgVariables.currentDialog = 'appImageUpload'; dlgVariables.imgProp = 'image'}} class="btn--image-background">
                    <img src={addon.image} alt="" loading="lazy" class="btn--image" style="max-height: 175px"/>
                </button>
            {/if}
            <Button onclickcapture={() => {dlgVariables.data = addon; dlgVariables.currentDialog = 'appImageUpload'; dlgVariables.imgProp = 'image'}} variant="raised">
                <Label>Change Image</Label>
            </Button>
        </div>
        <div class="row gx-3">
            <FormField class="col-12">
                <Checkbox bind:checked={() => addon.showAddon ?? false, (e) => addon.showAddon = e} onchange={() => {
                    if (!addon.showAddon) {
                        delete addon.showAddon;
                    }
                }} />
                {#snippet label()}
                    Always show this addon
                {/snippet}
            </FormField>
            <FormField class="col-12">
                <Checkbox bind:checked={() => addon.hideAddon ?? false, (e) => addon.hideAddon = e} onchange={() => {
                    if (!addon.hideAddon) {
                        delete addon.hideAddon;
                    }
                }} />
                {#snippet label()}
                    Hide unless this choice is selected
                {/snippet}
            </FormField>
            {#if choice.showScoreInAddon || choice.showReqInAddon}
                <FormField class="col-12">
                    <Checkbox bind:checked={() => addon.skipIndex ?? false, (e) => addon.skipIndex = e} onchange={() => {
                        if (!addon.skipIndex) {
                            delete addon.skipIndex;
                        }
                    }} />
                    {#snippet label()}
                        Skip displaying choice score / requirement
                    {/snippet}
                </FormField>
            {/if}
            <!-- <FormField class="col-12">
                <Checkbox bind:checked={() => addon.isSelectable ?? false, (e) => addon.isSelectable = e} onchange={() => {
                    if (!addon.isSelectable) {
                        addon.id = '';
                        delete addon.isSelectable;
                    } else {
                        addon.id = generateObjectId(0, app.objectIdLength, true);
                    }
                }} />
                {#snippet label()}
                    This addon is selectable
                {/snippet}
            </FormField> -->
            <div class="col-12">
                <div class="row g-1">
                    {#if addon.isSelectable}
                        <div class="col-12">
                            <Textfield bind:value={addon.id} label="Addon Id" variant="filled" />
                        </div>
                    {/if}
                    <div class={col6}>
                        <Select bind:value={addon.template} label="Template" variant="filled" alwaysFloat={true}>
                            {#each templates as template (template.text)}
                                <Option value={template.value}>{template.text}</Option>
                            {/each}
                        </Select>
                    </div>
                    <div class={col6}>
                        <Select bind:value={addon.addonWidth} label="Addons per row" variant="filled">
                            {#each addonWidths as addonWidth (addonWidth.text)}
                                <Option value={addonWidth.value}>{addonWidth.text}</Option>
                            {/each}
                        </Select>
                    </div>
                </div>
                <div class="py-2 col-12">
                    {#if app.useTextEditor}
                        <Tiptap data={addon} dataProp="title" label="Addon Title" />
                    {:else}
                        <Textfield bind:value={addon.title} label="Addon Title" variant="filled" />
                    {/if}
                </div>
                <div class="pb-3 col-12">
                    {#if app.useTextEditor}
                        <Tiptap data={addon} dataProp="text" textarea={true} label="Addon Text" />
                    {:else}
                        <Textfield textarea bind:value={addon.text} label="Addon Text" variant="filled" input$rows={5} />
                    {/if}
                </div>
            </div>
        </div>
        <div class="row gy-3 p-2">
            {#each addon.requireds as required, i}
                <div class="{required.requireds.length > 0 ? 'col-12' : reqCol} p-2">
                    <ObjectRequired required={required} isEditModeOn={true} data={addon} index={i} />
                    <Button onclickcapture={() => addon.requireds.splice(i, 1)} class="mt-1" variant="raised">
                        <Label>Delete</Label>
                    </Button>
                </div>
            {/each}
        </div>
    </div>
{:else}
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
{/if}

<script lang="ts">
    import Button, { Label } from '@smui/button';
    import Checkbox from '@smui/checkbox';
    import DOMPurify from 'dompurify';
    import FormField from '@smui/form-field';
    import IconButton from '@smui/icon-button';
    import ObjectRequired from './ObjectRequired.svelte';
    import Select, { Option } from '$lib/custom/select';
    import Textfield from '$lib/custom/textfield/Textfield.svelte';
    import { Wrapper } from '$lib/custom/tooltip';
    import { app, checkRequirements, dlgVariables, getStyling, replaceText, sanitizeArg, snackbarVariables, hexToRgba, winWidth, objectWidthToNum } from '$lib/store/store.svelte';
    import type { Choice, Row, Addon } from '$lib/store/types';
    import { tooltip } from '$lib/custom/tooltip/store.svelte';
    import Tiptap from '$lib/store/Tiptap.svelte';
    import ObjectScore from './ObjectScore.svelte';

    let { isEditModeOn = false, addon, row, choice, isEnabled, windowWidth = 0, preloadImages = false, index, isFirst }: { isEditModeOn?: boolean; addon: Addon; row?: Row; choice: Choice; isEnabled?: boolean, windowWidth?: number, preloadImages?: boolean, index?: number, isFirst?: boolean } = $props();

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
    const addonWidths = [{
        text: '1 per Choice',
        value: 'col-12'
    }, {
        text: '11/12',
        value: 'col-sm-11'
    }, {
        text: '10/12',
        value: 'col-sm-10'
    }, {
        text: '9/12',
        value: 'col-sm-9'
    }, {
        text: '8/12',
        value: 'col-sm-8'
    }, {
        text: '7/12',
        value: 'col-sm-7'
    }, {
        text: '2 per Choice',
        value: 'col-sm-6'
    }, {
        text: '5/12',
        value: 'col-sm-5'
    }, {
        text: '3 per Choice',
        value: 'col-md-4'
    }, {
        text: '4 per Choice',
        value: 'col-md-3'
    }, {
        text: '5 per Choice',
        value: 'w-20'
    }, {
        text: '6 per Choice',
        value: 'col-lg-2'
    }, {
        text: '7 per Choice ',
        value: 'w-14'
    }, {
        text: '8 per Choice ',
        value: 'w-12'
    }, {
        text: '9 per Choice ',
        value: 'w-11'
    }, {
        text: '10 per Choice',
        value: 'w-10'
    }, {
        text: '11 per Choice ',
        value: 'w-9'
    }, {
        text: '12 per Choice',
        value: 'col-xl-1'
    }];
    let width = $state(0);
    let reqCol = $derived.by(() => {
        if (width > 400) return 'col-6';
        else return 'col-12';
    });
    let col6 = $derived.by(() => {
        if (width > 278) return 'col-6';
        else return 'col-12';
    });
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

    function copyAddon() {
        if (typeof app.tmpAddon === 'undefined') app.tmpAddon = [];
        app.tmpAddon.length = 0;
        app.tmpAddon.push(JSON.parse(JSON.stringify(addon)));
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