<Dialog
    bind:open
    surface$style="width: 1200px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
    style={dialogStyle}
>
    <Title class="dialog-title" tabindex={0} autofocus>
        {#if typeof data !== 'undefined'}
            <FormField>
                <Checkbox bind:checked={() => data.privateFilterIsOn ?? false, (e) => data.privateFilterIsOn = e} onchange={() => {
                    if (data.privateFilterIsOn) {
                        let temp = JSON.parse(JSON.stringify(filterStyling));
                        Object.keys(filterStyling).forEach(key => {
                            if (app.styling.hasOwnProperty(key)) {
                                let val = app.styling[key as keyof StyleType];
                                if (typeof val !== 'undefined') temp[key as keyof StyleType] = val;
                            }
                        });
                        data.styling = {...(data.styling || {}), ...temp};
                        styling = data.styling!;
                    } else {
                        Object.keys(filterStyling).forEach(key => {
                            if (data.styling && app.styling.hasOwnProperty(key)) {
                                delete data.styling[key as keyof StyleType];
                            }
                        });
                    }
                }} />
                {#snippet label()}
                    <span class="title--text">Filter</span>
                {/snippet}
            </FormField>
        {:else}
            <span class="title--text">Filter</span>
        {/if}
        <FormField>
            <Checkbox bind:checked={isTransparent} />
            {#snippet label()}
                Preview Behind Dialog
            {/snippet}
        </FormField>
    </Title>
    <Content class="p-0">
        <Card class="no-shadow">
            <CardContent>
                <div class:disabled={isDisabled} class="container-fluid">
                    <div class="row">
                        <div class="col-12 px-3 py-2 b-line">
                            <h5>Filter on Choice that is selected</h5>
                        </div>
                        <div class="col-12 gy-2">
                            <FormField>
                                <Switch bind:checked={() => styling.selFilterVisibleIsOn ?? false,(e) => styling.selFilterVisibleIsOn = e} color="secondary" class="switch-scale" />
                                {#snippet label()}
                                    Hide the Choice Completely
                                {/snippet}
                            </FormField>
                        </div>
                        <div class:disabled={styling.selFilterVisibleIsOn} class="col-lg-4 col-12 gy-2">
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.selFilterBlurIsOn ?? false, (e) => styling.selFilterBlurIsOn = e} />
                            </FormField>
                            <Textfield bind:value={() => styling.selFilterBlur ?? 0, (e) => styling.selFilterBlur = e} disabled={!styling.selFilterBlurIsOn} label="Blur" type="number" suffix="px" variant="filled" />
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.selFilterBrightIsOn ?? false, (e) => styling.selFilterBrightIsOn = e} />
                            </FormField>
                            <Textfield bind:value={() => styling.selFilterBright ?? 0, (e) => styling.selFilterBright = e} disabled={!styling.selFilterBrightIsOn} label="Brightness" type="number" suffix="%" variant="filled" />
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.selFilterContIsOn ?? false, (e) => styling.selFilterContIsOn = e} />
                            </FormField>
                            <Textfield bind:value={() => styling.selFilterCont ?? 0, (e) => styling.selFilterCont = e} disabled={!styling.selFilterContIsOn} label="Contrast" type="number" suffix="%" variant="filled" />
                        </div>
                        <div class:disabled={styling.selFilterVisibleIsOn} class="col-lg-4 col-12 gy-2">
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.selFilterHueIsOn ?? false, (e) => styling.selFilterHueIsOn = e} />
                            </FormField>
                            <Textfield bind:value={() => styling.selFilterHue ?? 0, (e) => styling.selFilterHue = e} disabled={!styling.selFilterHueIsOn} label="Hue-rotate" type="number" suffix="deg" variant="filled" />
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.selFilterInvertIsOn ?? false, (e) => styling.selFilterInvertIsOn = e} />
                            </FormField>
                            <Textfield bind:value={() => styling.selFilterInvert ?? 0, (e) => styling.selFilterInvert = e} disabled={!styling.selFilterInvertIsOn} label="Invert" type="number" suffix="%" variant="filled" />
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.selFilterSepiaIsOn ?? false, (e) => styling.selFilterSepiaIsOn = e} />
                            </FormField>
                            <Textfield bind:value={() => styling.selFilterSepia ?? 0, (e) => styling.selFilterSepia = e} disabled={!styling.selFilterSepiaIsOn} label="Sepia" type="number" suffix="%" variant="filled" />
                        </div>
                        <div class:disabled={styling.selFilterVisibleIsOn} class="col-lg-4 col-12 gy-2">
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.selFilterOpacIsOn ?? false, (e) => styling.selFilterOpacIsOn = e} />
                            </FormField>
                            <Textfield bind:value={() => styling.selFilterOpac ?? 0, (e) => styling.selFilterOpac = e} disabled={!styling.selFilterOpacIsOn} label="Opacity" type="number" suffix="%" variant="filled" />
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.selFilterSaturIsOn ?? false, (e) => styling.selFilterSaturIsOn = e} />
                            </FormField>
                            <Textfield bind:value={() => styling.selFilterSatur ?? 0, (e) => styling.selFilterSatur = e} disabled={!styling.selFilterSaturIsOn} label="Saturate" type="number" suffix="%" variant="filled" />
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.selFilterGrayIsOn ?? false, (e) => styling.selFilterGrayIsOn = e} />
                            </FormField>
                            <Textfield bind:value={() => styling.selFilterGray ?? 0, (e) => styling.selFilterGray = e} disabled={!styling.selFilterGrayIsOn} label="Greyscale" type="number" suffix="%" variant="filled" />
                        </div>
                    </div>
                    <div class:disabled={styling.selFilterVisibleIsOn} class="row">
                        <div class="col-lg-4 col-12 gy-2 text-center">
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.selBgImageIsOn ?? false, (e) => styling.selBgImageIsOn = e} />
                                {#snippet label()}
                                    Background Image
                                {/snippet}
                            </FormField>
                            <div class:disabled={!styling.selBgImageIsOn}>
                                {#if styling.selFilterBgImage}
                                    <button type="button" onclickcapture={() => {currentDialog = 'appImageUpload'; imgProp = 'selFilterBgImage'}} class="btn--image-background">
                                        <img src={styling.selFilterBgImage} alt="Filter Background" loading="lazy" class="btn--image" style="max-height: 140px;" />
                                    </button>
                                {/if}
                                <Button onclickcapture={() => {currentDialog = 'appImageUpload'; imgProp = 'selFilterBgImage'}} variant="raised" disabled={!styling.selBgImageIsOn}>
                                    <Label>Change Image</Label>
                                </Button>
                            </div>
                        </div>
                        <div class="col-lg-4 col-12 gy-2">
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.selBgColorIsOn ?? false, (e) => styling.selBgColorIsOn = e} />
                                {#snippet label()}
                                    Background Color
                                {/snippet}
                            </FormField>
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.selOverlayOnImage ?? false, (e) => styling.selOverlayOnImage = e} disabled={!styling.selBgColorIsOn} />
                                {#snippet label()}
                                    Overlay on Image?
                                {/snippet}
                            </FormField>
                            <div class:disabled={!styling.selBgColorIsOn}>
                                <ColorPicker bind:hex={() => styling.selFilterBgColor ?? '#000000', (e) => styling.selFilterBgColor = e} components={ChromeVariant} sliderDirection="horizontal" />
                            </div>
                        </div>
                        <div class="col-lg-4 col-12 gy-2">
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.selBorderColorIsOn ?? false, (e) => styling.selBorderColorIsOn = e} />
                                {#snippet label()}
                                    Border Color
                                {/snippet}
                            </FormField>
                            <div class:disabled={!styling.selBorderColorIsOn}>
                                <ColorPicker bind:hex={() => styling.selFilterBorderColor ?? '#000000', (e) => styling.selFilterBorderColor = e} components={ChromeVariant} sliderDirection="horizontal" />
                            </div>
                        </div>
                        <div class="col-lg-4 col-12 gy-2">
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.selCTitleColorIsOn ?? false, (e) => styling.selCTitleColorIsOn = e} />
                                {#snippet label()}
                                    Choice Title Color
                                {/snippet}
                            </FormField>
                            <div class:disabled={!styling.selCTitleColorIsOn}>
                                <ColorPicker bind:hex={() => styling.selFilterCTitleColor ?? '#000000', (e) => styling.selFilterCTitleColor = e} components={ChromeVariant} sliderDirection="horizontal" />
                            </div>
                        </div>
                    </div>
                    <div class:disabled={styling.selFilterVisibleIsOn} class="row">
                        <div class="col-xl-3 col-lg-6 col-12 gy-2">
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.selCTextColorIsOn ?? false, (e) => styling.selCTextColorIsOn = e} />
                                {#snippet label()}
                                    Choice Text Color
                                {/snippet}
                            </FormField>
                            <div class:disabled={!styling.selCTextColorIsOn}>
                                <ColorPicker bind:hex={() => styling.selFilterCTextColor ?? '#000000', (e) => styling.selFilterCTextColor = e} components={ChromeVariant} sliderDirection="horizontal" />
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-6 col-12 gy-2">
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.selATitleColorIsOn ?? false, (e) => styling.selATitleColorIsOn = e} />
                                {#snippet label()}
                                    Addon Title Color
                                {/snippet}
                            </FormField>
                            <div class:disabled={!styling.selATitleColorIsOn}>
                                <ColorPicker bind:hex={() => styling.selFilterATitleColor ?? '#000000', (e) => styling.selFilterATitleColor = e} components={ChromeVariant} sliderDirection="horizontal" />
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-6 col-12 gy-2">
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.selATextColorIsOn ?? false, (e) => styling.selATextColorIsOn = e} />
                                {#snippet label()}
                                    Addon Text Color
                                {/snippet}
                            </FormField>
                            <div class:disabled={!styling.selATextColorIsOn}>
                                <ColorPicker bind:hex={() => styling.selFilterATextColor ?? '#000000', (e) => styling.selFilterATextColor = e} components={ChromeVariant} sliderDirection="horizontal" />
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-6 col-12 gy-2">
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.selScoreTextColorIsOn ?? false, (e) => styling.selScoreTextColorIsOn = e} />
                                {#snippet label()}
                                    Score & Requirement Color
                                {/snippet}
                            </FormField>
                            <div class:disabled={!styling.selScoreTextColorIsOn}>
                                <ColorPicker bind:hex={() => styling.selFilterSTextColor ?? '#000000', (e) => styling.selFilterSTextColor = e} components={ChromeVariant} sliderDirection="horizontal" />
                            </div>
                        </div>
                    </div>
                    <div class="row pt-5">
                        <div class="col-12 px-3 py-2 b-line">
                            <h5>Filter on Choice that is missing its required</h5>
                        </div>                            
                        <div class="col-12 gy-2">
                            <FormField>
                                <Switch bind:checked={() => styling.reqFilterVisibleIsOn ?? false,(e) => styling.reqFilterVisibleIsOn = e} color="secondary" class="switch-scale" />
                                {#snippet label()}
                                    Hide the Choice Completely
                                {/snippet}
                            </FormField>
                        </div>
                        <div class:disabled={styling.reqFilterVisibleIsOn} class="col-lg-4 col-12 gy-2">
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.reqFilterBlurIsOn ?? false, (e) => styling.reqFilterBlurIsOn = e} />
                            </FormField>
                            <Textfield bind:value={() => styling.reqFilterBlur ?? 0, (e) => styling.reqFilterBlur = e} disabled={!styling.reqFilterBlurIsOn} label="Blur" type="number" suffix="px" variant="filled" />
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.reqFilterBrightIsOn ?? false, (e) => styling.reqFilterBrightIsOn = e} />
                            </FormField>
                            <Textfield bind:value={() => styling.reqFilterBright ?? 0, (e) => styling.reqFilterBright = e} disabled={!styling.reqFilterBrightIsOn} label="Brightness" type="number" suffix="%" variant="filled" />
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.reqFilterContIsOn ?? false, (e) => styling.reqFilterContIsOn = e} />
                            </FormField>
                            <Textfield bind:value={() => styling.reqFilterCont ?? 0, (e) => styling.reqFilterCont = e} disabled={!styling.reqFilterContIsOn} label="Contrast" type="number" suffix="%" variant="filled" />
                        </div>
                        <div class:disabled={styling.reqFilterVisibleIsOn} class="col-lg-4 col-12 gy-2">
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.reqFilterHueIsOn ?? false, (e) => styling.reqFilterHueIsOn = e} />
                            </FormField>
                            <Textfield bind:value={() => styling.reqFilterHue ?? 0, (e) => styling.reqFilterHue = e} disabled={!styling.reqFilterHueIsOn} label="Hue-rotate" type="number" suffix="deg" variant="filled" />
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.reqFilterInvertIsOn ?? false, (e) => styling.reqFilterInvertIsOn = e} />
                            </FormField>
                            <Textfield bind:value={() => styling.reqFilterInvert ?? 0, (e) => styling.reqFilterInvert = e} disabled={!styling.reqFilterInvertIsOn} label="Invert" type="number" suffix="%" variant="filled" />
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.reqFilterSepiaIsOn ?? false, (e) => styling.reqFilterSepiaIsOn = e} />
                            </FormField>
                            <Textfield bind:value={() => styling.reqFilterSepia ?? 0, (e) => styling.reqFilterSepia = e} disabled={!styling.reqFilterSepiaIsOn} label="Sepia" type="number" suffix="%" variant="filled" />
                        </div>
                        <div class:disabled={styling.reqFilterVisibleIsOn} class="col-lg-4 col-12 gy-2">
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.reqFilterOpacIsOn ?? false, (e) => styling.reqFilterOpacIsOn = e} />
                            </FormField>
                            <Textfield bind:value={() => styling.reqFilterOpac ?? 0, (e) => styling.reqFilterOpac = e} disabled={!styling.reqFilterOpacIsOn} label="Opacity" type="number" suffix="%" variant="filled" />
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.reqFilterSaturIsOn ?? false, (e) => styling.reqFilterSaturIsOn = e} />
                            </FormField>
                            <Textfield bind:value={() => styling.reqFilterSatur ?? 0, (e) => styling.reqFilterSatur = e} disabled={!styling.reqFilterSaturIsOn} label="Saturate" type="number" suffix="%" variant="filled" />
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.reqFilterGrayIsOn ?? false, (e) => styling.reqFilterGrayIsOn = e} />
                            </FormField>
                            <Textfield bind:value={() => styling.reqFilterGray ?? 0, (e) => styling.reqFilterGray = e} disabled={!styling.reqFilterGrayIsOn} label="Greyscale" type="number" suffix="%" variant="filled" />
                        </div>
                    </div>
                    <div class:disabled={styling.reqFilterVisibleIsOn} class="row">
                        <div class="col-lg-4 col-12 gy-2 text-center">
                            <div class:disabled={styling.reqFilterVisibleIsOn}>
                                <FormField class="w-100">
                                    <Checkbox bind:checked={() => styling.reqBgImageIsOn ?? false, (e) => styling.reqBgImageIsOn = e} />
                                    {#snippet label()}
                                        Background Image
                                    {/snippet}
                                </FormField>
                                <div class:disabled={!styling.reqBgImageIsOn}>
                                    {#if styling.reqFilterBgImage}
                                        <button type="button" onclickcapture={() => {currentDialog = 'appImageUpload'; imgProp = 'reqFilterBgImage'}} class="btn--image-background">
                                            <img src={styling.reqFilterBgImage} alt="Filter Background for Required" loading="lazy" class="btn--image" style="max-height: 140px;" />
                                        </button>
                                    {/if}
                                    <Button onclickcapture={() => {currentDialog = 'appImageUpload'; imgProp = 'reqFilterBgImage'}} variant="raised" disabled={!styling.reqBgImageIsOn}>
                                        <Label>Change Image</Label>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-12 gy-2">
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.reqBgColorIsOn ?? false, (e) => styling.reqBgColorIsOn = e} />
                                {#snippet label()}
                                    Background Color
                                {/snippet}
                            </FormField>
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.reqOverlayOnImage ?? false, (e) => styling.reqOverlayOnImage = e} disabled={!styling.reqBgColorIsOn} />
                                {#snippet label()}
                                    Overlay on Image?
                                {/snippet}
                            </FormField>
                            <div class:disabled={!styling.reqBgColorIsOn}>
                                <ColorPicker bind:hex={() => styling.reqFilterBgColor ?? '#000000', (e) => styling.reqFilterBgColor = e} components={ChromeVariant} sliderDirection="horizontal" />
                            </div>
                        </div>
                        <div class="col-lg-4 col-12 gy-2">
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.reqBorderColorIsOn ?? false, (e) => styling.reqBorderColorIsOn = e} />
                                {#snippet label()}
                                    Border Color
                                {/snippet}
                            </FormField>
                            <div class:disabled={!styling.reqBorderColorIsOn}>
                                <ColorPicker bind:hex={() => styling.reqFilterBorderColor ?? '#000000', (e) => styling.reqFilterBorderColor = e} components={ChromeVariant} sliderDirection="horizontal" />
                            </div>
                        </div>
                        <div class="col-lg-4 col-12 gy-2">
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.reqCTitleColorIsOn ?? false, (e) => styling.reqCTitleColorIsOn = e} />
                                {#snippet label()}
                                    Choice Title Color
                                {/snippet}
                            </FormField>
                            <div class:disabled={!styling.reqCTitleColorIsOn}>
                                <ColorPicker bind:hex={() => styling.reqFilterCTitleColor ?? '#000000', (e) => styling.reqFilterCTitleColor = e} components={ChromeVariant} sliderDirection="horizontal" />
                            </div>
                        </div>
                    </div>
                    <div class:disabled={styling.reqFilterVisibleIsOn} class="row">
                        <div class="col-xl-3 col-lg-6 col-12 gy-2">
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.reqCTextColorIsOn ?? false, (e) => styling.reqCTextColorIsOn = e} />
                                {#snippet label()}
                                    Choice Text Color
                                {/snippet}
                            </FormField>
                            <div class:disabled={!styling.reqCTextColorIsOn}>
                                <ColorPicker bind:hex={() => styling.reqFilterCTextColor ?? '#000000', (e) => styling.reqFilterCTextColor = e} components={ChromeVariant} sliderDirection="horizontal" />
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-6 col-12 gy-2">
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.reqATitleColorIsOn ?? false, (e) => styling.reqATitleColorIsOn = e} />
                                {#snippet label()}
                                    Addon Title Color
                                {/snippet}
                            </FormField>
                            <div class:disabled={!styling.reqATitleColorIsOn}>
                                <ColorPicker bind:hex={() => styling.reqFilterATitleColor ?? '#000000', (e) => styling.reqFilterATitleColor = e} components={ChromeVariant} sliderDirection="horizontal" />
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-6 col-12 gy-2">
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.reqATextColorIsOn ?? false, (e) => styling.reqATextColorIsOn = e} />
                                {#snippet label()}
                                    Addon Text Color
                                {/snippet}
                            </FormField>
                            <div class:disabled={!styling.reqATextColorIsOn}>
                                <ColorPicker bind:hex={() => styling.reqFilterATextColor ?? '#000000', (e) => styling.reqFilterATextColor = e} components={ChromeVariant} sliderDirection="horizontal" />
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-6 col-12 gy-2">
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.reqScoreTextColorIsOn ?? false, (e) => styling.reqScoreTextColorIsOn = e} />
                                {#snippet label()}
                                    Score & Requirement Color
                                {/snippet}
                            </FormField>
                            <div class:disabled={!styling.reqScoreTextColorIsOn}>
                                <ColorPicker bind:hex={() => styling.reqFilterSTextColor ?? '#000000', (e) => styling.reqFilterSTextColor = e} components={ChromeVariant} sliderDirection="horizontal" />
                            </div>
                        </div>
                    </div>
                    <div class="row pt-5">
                        <div class="col-12 px-3 py-2 b-line">
                            <h5>Filter on Choice that is not selected</h5>
                        </div>
                        <div class="col-12 gy-2">
                            <FormField>
                                <Switch bind:checked={() => styling.unselFilterVisibleIsOn ?? false,(e) => styling.unselFilterVisibleIsOn = e} color="secondary" class="switch-scale" />
                                {#snippet label()}
                                    Hide the Choice Completely
                                {/snippet}
                            </FormField>
                        </div>
                        <div class:disabled={styling.unselFilterVisibleIsOn} class="col-lg-4 col-12 gy-2">
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.unselFilterBlurIsOn ?? false, (e) => styling.unselFilterBlurIsOn = e} />
                            </FormField>
                            <Textfield bind:value={() => styling.unselFilterBlur ?? 0, (e) => styling.unselFilterBlur = e} disabled={!styling.unselFilterBlurIsOn} label="Blur" type="number" suffix="px" variant="filled" />
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.unselFilterBrightIsOn ?? false, (e) => styling.unselFilterBrightIsOn = e} />
                            </FormField>
                            <Textfield bind:value={() => styling.unselFilterBright ?? 0, (e) => styling.unselFilterBright = e} disabled={!styling.unselFilterBrightIsOn} label="Brightness" type="number" suffix="%" variant="filled" />
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.unselFilterContIsOn ?? false, (e) => styling.unselFilterContIsOn = e} />
                            </FormField>
                            <Textfield bind:value={() => styling.unselFilterCont ?? 0, (e) => styling.unselFilterCont = e} disabled={!styling.unselFilterContIsOn} label="Contrast" type="number" suffix="%" variant="filled" />
                        </div>
                        <div class:disabled={styling.unselFilterVisibleIsOn} class="col-lg-4 col-12 gy-2">
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.unselFilterHueIsOn ?? false, (e) => styling.unselFilterHueIsOn = e} />
                            </FormField>
                            <Textfield bind:value={() => styling.unselFilterHue ?? 0, (e) => styling.unselFilterHue = e} disabled={!styling.unselFilterHueIsOn} label="Hue-rotate" type="number" suffix="deg" variant="filled" />
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.unselFilterInvertIsOn ?? false, (e) => styling.unselFilterInvertIsOn = e} />
                            </FormField>
                            <Textfield bind:value={() => styling.unselFilterInvert ?? 0, (e) => styling.unselFilterInvert = e} disabled={!styling.unselFilterInvertIsOn} label="Invert" type="number" suffix="%" variant="filled" />
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.unselFilterSepiaIsOn ?? false, (e) => styling.unselFilterSepiaIsOn = e} />
                            </FormField>
                            <Textfield bind:value={() => styling.unselFilterSepia ?? 0, (e) => styling.unselFilterSepia = e} disabled={!styling.unselFilterSepiaIsOn} label="Sepia" type="number" suffix="%" variant="filled" />
                        </div>
                        <div class:disabled={styling.unselFilterVisibleIsOn} class="col-lg-4 col-12 gy-2">
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.unselFilterOpacIsOn ?? false, (e) => styling.unselFilterOpacIsOn = e} />
                            </FormField>
                            <Textfield bind:value={() => styling.unselFilterOpac ?? 0, (e) => styling.unselFilterOpac = e} disabled={!styling.unselFilterOpacIsOn} label="Opacity" type="number" suffix="%" variant="filled" />
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.unselFilterSaturIsOn ?? false, (e) => styling.unselFilterSaturIsOn = e} />
                            </FormField>
                            <Textfield bind:value={() => styling.unselFilterSatur ?? 0, (e) => styling.unselFilterSatur = e} disabled={!styling.unselFilterSaturIsOn} label="Saturate" type="number" suffix="%" variant="filled" />
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.unselFilterGrayIsOn ?? false, (e) => styling.unselFilterGrayIsOn = e} />
                            </FormField>
                            <Textfield bind:value={() => styling.unselFilterGray ?? 0, (e) => styling.unselFilterGray = e} disabled={!styling.unselFilterGrayIsOn} label="Greyscale" type="number" suffix="%" variant="filled" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </Content>
    <Actions>
        <Button action="close">
            <Label class="dialog-actions--btn">Close</Label>
        </Button>
    </Actions>
</Dialog>
{#if currentDialog === 'appImageUpload'}
<ImageUpload open={currentDialog === 'appImageUpload'} onclose={() => (currentDialog = 'none')} imgObject={styling} imgProp={imgProp} canHaveURL={true} />
{/if}

<script lang="ts">
    import Button, { Label } from '@smui/button';
    import Card, { Content as CardContent } from '@smui/card';
    import Checkbox from '@smui/checkbox';
    import ColorPicker, { ChromeVariant } from '$lib/custom/svelte-awesome-color-picker';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import FormField from '@smui/form-field';
    import Textfield from '$lib/custom/textfield/Textfield.svelte';
    import Switch from '@smui/switch';
    import { app, filterStyling } from '$lib/store/store.svelte';
    import type { Choice, Row, Styling, filterStyling as StyleType, RowDesignGroup, ObjectDesignGroup } from '$lib/store/types';
    import ImageUpload from '$lib/store/ImageUpload.svelte';

    let { open, onclose, data }: { open: boolean; onclose: () => void; data?: Row | Choice | RowDesignGroup | ObjectDesignGroup } = $props();
    let styling = $state<Styling>(typeof data !== 'undefined' ? data.styling || filterStyling : app.styling);
    let isTransparent = $state(false);
    let dialogStyle = $derived(isTransparent ? 'opacity: 0.2' : '');
    let isDisabled = $derived(typeof data !== 'undefined' && !data.privateFilterIsOn);
    let currentDialog = $state<'none' | 'appImageUpload'>('none');
    let imgProp = $state('');
</script>