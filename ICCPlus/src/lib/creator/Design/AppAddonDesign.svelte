<Dialog
    bind:open
    escapeKeyAction={currentDialog === 'none' ? 'close' : ''}
    surface$style="width: 1200px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
    style={dialogStyle}
>
    <Title class="dialog-title" tabindex={0} autofocus>
        {#if typeof data !== 'undefined'}
            <FormField>
                <Checkbox bind:checked={() => data.privateAddonIsOn?? false, (e) => data.privateAddonIsOn = e} onchange={() => {
                    if (data.privateAddonIsOn) {
                        let temp = JSON.parse(JSON.stringify(addonStyling));
                        Object.keys(addonStyling).forEach(key => {
                            if (app.styling.hasOwnProperty(key)) {
                                let val = app.styling[key as keyof StyleType];
                                if (typeof val !== 'undefined') temp[key as keyof StyleType] = val;
                            }
                        });
                        data.styling = {...(data.styling || {}), ...temp};
                        styling = data.styling!;
                    } else {
                        Object.keys(addonStyling).forEach(key => {
                            if (data.styling && app.styling.hasOwnProperty(key)) {
                                delete data.styling[key as keyof StyleType];
                            }
                        });
                    }
                }} />
                {#snippet label()}
                    <span class="title--text">Addon Design</span>
                {/snippet}
            </FormField>
        {:else}
            <span class="title--text">Addon Design</span>
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
                <div class="container-fluid">
                    {#if typeof data === 'undefined'}
                        <div class="col-12 pb-3">
                            <FormField>
                                <Switch bind:checked={() => styling.useAddonDesign?? false, (e) => styling.useAddonDesign = e} color="secondary" class="switch-scale" />
                                {#snippet label()}
                                    Use a Seperate Design?
                                {/snippet}
                            </FormField>
                        </div>
                    {/if}
                    <div class:disabled={isDisabled}>
                        <div class="col-12 pb-3">
                            <FormField>
                                <Switch bind:checked={() => styling.addonDesignIsAdvanced?? false, (e) => styling.addonDesignIsAdvanced = e} disabled={isDisabled} color="secondary" class="switch-scale" />
                                {#snippet label()}
                                    Advanced Design?
                                {/snippet}
                            </FormField>
                        </div>
                        {#if styling.addonDesignIsAdvanced}
                            <div class="row">
                                <div class="col-lg-4 col-12 gy-2">
                                    <div class="col-12 px-3">Margin and Padding</div>
                                    <Textfield class="mb-4" bind:value={() => styling.addonMargin?? 0, (e) => styling.addonMargin = e} label="Margin" type="number" suffix="px" variant="filled" />
                                    <Textfield class="mb-half" bind:value={() => styling.addonTextPadding?? 0, (e) => styling.addonTextPadding = e} label="Padding" type="number" suffix="px" variant="filled" />
                                    <div class="col-12 px-3">Border Style and Width</div>
                                    <Select class="mb-4" bind:value={() => styling.addonBorderStyle?? '', (e) => styling.addonBorderStyle = e} label="Border Style" variant="filled">
                                        {#each borderStyles as borderStyle}
                                            <Option value={borderStyle}>{borderStyle}</Option>
                                        {/each}
                                    </Select>
                                    <Textfield class="mb-4" bind:value={() => styling.addonBorderWidth?? 0, (e) => styling.addonBorderWidth = e} label="Border Width" type="number" suffix="px" variant="filled" />
                                    <FormField class="w-100">
                                        <Checkbox bind:checked={() => styling.addonBorderIsOn?? false, (e) => styling.addonBorderIsOn = e} />
                                        {#snippet label()}
                                            Border is turned on
                                        {/snippet}
                                    </FormField>
                                </div>
                                <div class="col-lg-4 col-12 gy-2">
                                    <div class="col-12 px-3">Shadow that the addon makes</div>
                                    <Textfield class="mb-4" bind:value={() => styling.addonDropShadowH?? 0, (e) => styling.addonDropShadowH = e} label="Horizontal Shadow" type="number" suffix="px" variant="filled" />
                                    <Textfield class="mb-4" bind:value={() => styling.addonDropShadowV?? 0, (e) => styling.addonDropShadowV = e} label="Vertical Shadow" type="number" suffix="px" variant="filled" />
                                    <Textfield class="mb-4" bind:value={() => styling.addonDropShadowBlur?? 0, (e) => styling.addonDropShadowBlur = e} label="Shadow Blur" type="number" suffix="px" variant="filled" />
                                    <Textfield class="mb-4" bind:value={() => styling.addonDropShadowSpread?? 0, (e) => styling.addonDropShadowSpread = e} label="Shadow Spread" type="number" suffix="px" variant="filled" />
                                    <FormField class="w-100">
                                        <Switch bind:checked={() => styling.addonUseBoxShadowIsOn?? false, (e) => styling.addonUseBoxShadowIsOn = e} color="secondary" class="switch-scale" />
                                        {#snippet label()}
                                            Drop Shadow or Box Shadow?
                                        {/snippet}
                                    </FormField>
                                    <FormField class="w-100">
                                        <Checkbox bind:checked={() => styling.addonDropShadowIsOn?? false, (e) => styling.addonDropShadowIsOn = e} />
                                        {#snippet label()}
                                            Shadow Is turned on
                                        {/snippet}
                                    </FormField>
                                </div>
                                <div class="col-lg-4 col-12 gy-2">
                                    <div class="col-12 px-3">Rounded corners on the addon</div>
                                    <Textfield class="mb-4" bind:value={() => styling.addonBorderRadiusTopLeft?? 0, (e) => styling.addonBorderRadiusTopLeft = e} label="Border-radius Top Left" type="number" suffix={borderRadiusSuffix} variant="filled" />
                                    <Textfield class="mb-4" bind:value={() => styling.addonBorderRadiusTopRight?? 0, (e) => styling.addonBorderRadiusTopRight = e} label="Border-radius Top Right" type="number" suffix={borderRadiusSuffix} variant="filled" />
                                    <Textfield class="mb-4" bind:value={() => styling.addonBorderRadiusBottomRight?? 0, (e) => styling.addonBorderRadiusBottomRight = e} label="Border-radius Bottom Right" type="number" suffix={borderRadiusSuffix} variant="filled" />
                                    <Textfield class="mb-4" bind:value={() => styling.addonBorderRadiusBottomLeft?? 0, (e) => styling.addonBorderRadiusBottomLeft = e} label="Border-radius Bottom Left" type="number" suffix={borderRadiusSuffix} variant="filled" />
                                    <FormField class="w-100">
                                        <Switch bind:checked={() => styling.addonBorderRadiusIsPixels?? false, (e) => styling.addonBorderRadiusIsPixels = e} color="secondary" class="switch-scale" />
                                        {#snippet label()}
                                            Border-Radius Percent or Pixels?
                                        {/snippet}
                                    </FormField>
                                    <FormField class="w-100">
                                        <Checkbox bind:checked={() => styling.addonOverflowIsOn?? false, (e) => styling.addonOverflowIsOn = e} />
                                        {#snippet label()}
                                            Border-Radius Cuts off overflow
                                        {/snippet}
                                    </FormField>
                                </div>
                            </div>
                        {:else}
                            <div class="row">
                                <div class="col-lg-4 col-12 gy-2">
                                    <div class="col-12 px-3">Margin and Padding of the addons</div>
                                    <Textfield class="mb-4" bind:value={() => styling.addonMargin?? 0, (e) => styling.addonMargin = e} label="Space between the addons" type="number" suffix="px" variant="filled" />
                                    <Textfield class="mb-4" bind:value={() => styling.addonTextPadding?? 0, (e) => styling.addonTextPadding = e} label="Space between the text in the addons and its border" type="number" suffix="px" variant="filled" />
                                    <FormField class="w-100">
                                        <Checkbox bind:checked={() => styling.addonBorderIsOn?? false, (e) => styling.addonBorderIsOn = e} />
                                        {#snippet label()}
                                            Border is turned on
                                        {/snippet}
                                    </FormField>
                                </div>
                                <div class="col-lg-4 col-12 gy-2">
                                    <div class="col-12 px-3">Border Style and Width</div>
                                    <Select class="mb-4" bind:value={() => styling.addonBorderStyle?? '', (e) => styling.addonBorderStyle = e} label="Border Style" variant="filled">
                                        {#each borderStyles as borderStyle}
                                            <Option value={borderStyle}>{borderStyle}</Option>
                                        {/each}
                                    </Select>
                                    <Textfield class="mb-4" bind:value={() => styling.addonBorderWidth?? 0, (e) => styling.addonBorderWidth = e} label="Border Width" type="number" suffix="px" variant="filled" />
                                    <FormField class="w-100">
                                        <Checkbox bind:checked={() => styling.addonDropShadowIsOn?? false, (e) => styling.addonDropShadowIsOn = e} />
                                        {#snippet label()}
                                            Drop Shadow Is turned on
                                        {/snippet}
                                    </FormField>
                                </div>
                                <div class="col-lg-4 col-12 gy-2">                                    
                                    <div class="col-12 px-3">Rounded corners on the addon</div>
                                    <Textfield class="mb-4" bind:value={() => styling.addonBorderRadiusTopLeft?? 0, (e) => styling.addonBorderRadiusTopLeft = e} onchange={() => styling.addonBorderRadiusTopRight = styling.addonBorderRadiusTopLeft} label="Border-radius Top" type="number" suffix={borderRadiusSuffix} variant="filled" />
                                    <Textfield class="mb-half" bind:value={() => styling.addonBorderRadiusBottomLeft?? 0, (e) => styling.addonBorderRadiusBottomLeft = e} onchange={() => styling.addonBorderRadiusBottomRight = styling.addonBorderRadiusBottomLeft} label="Border-radius Bottom" type="number" suffix={borderRadiusSuffix} variant="filled" />
                                    <div class="col-12 px-3">Shadow that the addon makes</div>
                                    <Textfield class="mb-4" bind:value={() => styling.addonDropShadowH?? 0, (e) => styling.addonDropShadowH = e} onchange={() => {
                                        styling.addonDropShadowV = styling.addonDropShadowH;
                                        styling.addonDropShadowSpread = styling.addonDropShadowH; 
                                        styling.addonDropShadowBlur = styling.addonDropShadowH;
                                    }} label="The Higher the number the bigger the shadow will be" type="number" suffix="px" variant="filled" />
                                </div>
                            </div>
                        {/if}
                        <div class="row">
                            <div class="col-lg-4 col-12 gy-2 text-center">
                                <div class="col-12 px-3">Border Color</div>
                                <div class:disabled={!styling.addonBorderIsOn}>
                                    <ColorPicker bind:hex={() => styling.addonBorderColor?? '#000000', (e) => styling.addonBorderColor = e} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} />
                                </div>
                            </div>
                            <div class="col-lg-4 col-12 gy-2 text-center">
                                <div class="col-12 px-3">Color of the addpm shadow</div>
                                <div class:disabled={!styling.addonDropShadowIsOn}>
                                    <ColorPicker bind:hex={() => styling.addonDropShadowColor?? '#000000', (e) => styling.addonDropShadowColor = e} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} />
                                </div>
                            </div>
                            <div class="col-lg-4 col-12 gy-2">
                                <FormField class="w-100">
                                    <Checkbox bind:checked={() => styling.titlePaddingIsOn?? false, (e) => styling.titlePaddingIsOn = e} />
                                    {#snippet label()}
                                        Apply padding to the Addon Title
                                    {/snippet}
                                </FormField>
                                <FormField class="w-100">
                                    <Checkbox bind:checked={() => styling.addonGradientIsOn?? false, (e) => styling.addonGradientIsOn = e} />
                                    {#snippet label()}
                                        Addon Gradient is turned on
                                    {/snippet}
                                </FormField>
                                {#if styling.addonGradientIsOn}
                                    <Textfield bind:value={() => styling.addonGradient?? '', (e) => styling.addonGradient = e} label="Gradient when Not Selected" variant="filled" input$placeholder="to left, blue, red" />
                                    <Textfield bind:value={() => styling.addonGradientOnSelect?? '', (e) => styling.addonGradientOnSelect = e} label="Gradient when Selected" variant="filled" input$placeholder="to left, blue, red" />
                                    <Textfield bind:value={() => styling.addonGradientOnReq?? '', (e) => styling.addonGradientOnReq = e} label="Gradient when Missing Requirement" variant="filled" input$placeholder="to left, blue, red" />
                                    <div class="col-12">You might need to leave for the main menu if things stop updating, using something like (green, green) works. <a href="https://www.w3schools.com/css/css3_gradients.asp">https://www.w3schools.com/css/css3_gradients.asp</a></div>
                                {/if}
                                <FormField>
                                    <Switch bind:checked={() => styling.useAddonBackgroundImage?? false, (e) => styling.useAddonBackgroundImage = e} disabled={isDisabled} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Use a Background Image?
                                    {/snippet}
                                </FormField>
                                {#if styling.useAddonBackgroundImage}
                                    <FormField class="w-100">
                                        <Checkbox bind:checked={() => styling.isAddonBackgroundRepeat?? false, (e) => styling.isAddonBackgroundRepeat = e} onchange={() => {
                                            if (styling.isAddonBackgroundRepeat) styling.isAddonBackgroundFitIn = false;
                                        }} />
                                        {#snippet label()}
                                            Does it repeat?
                                        {/snippet}
                                    </FormField>
                                    <FormField class="w-100">
                                        <Checkbox bind:checked={() => styling.isAddonBackgroundFitIn?? false, (e) => styling.isAddonBackgroundFitIn = e} onchange={() => {
                                            if (styling.isAddonBackgroundFitIn) styling.isAddonBackgroundRepeat = false;
                                        }} />
                                        {#snippet label()}
                                            Does it fit in?
                                        {/snippet}
                                    </FormField>
                                    <div>
                                        {#if styling.addonBackgroundImage}
                                            <button type="button" onclick={() => {currentDialog = 'appImageUpload'; imgProp = 'addonBackgroundImage'}} class="btn--image-background">
                                                <img src={styling.addonBackgroundImage} alt="Addon Background" loading="lazy" class="btn--image" style="max-height: 80px;" />
                                            </button>
                                        {/if}
                                        <Button onclick={() => {currentDialog = 'appImageUpload'; imgProp = 'addonBackgroundImage'}} variant="raised">
                                            <Label>Change Image</Label>
                                        </Button>
                                    </div>
                                {:else}
                                    <FormField class="w-100">
                                        <Checkbox bind:checked={() => styling.addonBgColorIsOn?? false, (e) => styling.addonBgColorIsOn = e} />
                                        {#snippet label()}
                                            Use addon background color?
                                        {/snippet}
                                    </FormField>
                                    <div class:disabled={!styling.addonBgColorIsOn}>
                                        <ColorPicker bind:hex={() => styling.addonBgColor?? '#000000', (e) => styling.addonBgColor = e} components={ChromeVariant} sliderDirection="horizontal" />
                                    </div>
                                {/if}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 text-center">Border Image</div>
                            <div class="col-lg-4 col-12 gy-2">
                                <div class="col-12 text-center px-5">
                                    {#if styling.addonBorderImage}
                                        <button type="button" onclick={() => {currentDialog = 'appImageUpload'; imgProp = 'addonBorderImage'}} class="btn--image-background">
                                            <img src={styling.addonBorderImage} alt="Addon Border" loading="lazy" class="btn--image" style="max-height: 140px;" />
                                        </button>
                                    {/if}
                                    <Button onclick={() => {currentDialog = 'appImageUpload'; imgProp = 'addonBorderImage'}} variant="raised">
                                        <Label>Change Image</Label>
                                    </Button>
                                </div>
                            </div>
                            <div class="col-lg-8 col-12 gy-2">
                                <div class="row">
                                    <div class="col-lg-4 col-12 gy-2">
                                        <Select class="mb-4" bind:value={() => styling.addonBorderImageRepeat?? '', (e) => styling.addonBorderImageRepeat = e} label="Image Repeat" variant="filled">
                                            {#each borderImageRepeat as imageRepeat}
                                                <Option value={imageRepeat}>{imageRepeat}</Option>
                                            {/each}
                                        </Select>
                                        <Textfield class="mb-4" bind:value={() => styling.addonBorderImageWidth?? 0, (e) => styling.addonBorderImageWidth = e} label="Border Width" type="number" suffix="px" variant="filled" />
                                    </div>
                                    <div class="col-lg-4 col-12 gy-2">
                                        <Textfield class="mb-4" bind:value={() => styling.addonBorderImageSliceTop?? 0, (e) => styling.addonBorderImageSliceTop = e} label="Slice Top" type="number" suffix="px" variant="filled" />
                                        <Textfield class="mb-4" bind:value={() => styling.addonBorderImageSliceBottom?? 0, (e) => styling.addonBorderImageSliceBottom = e} label="Slice Bottom" type="number" suffix="px" variant="filled" />
                                    </div>
                                    <div class="col-lg-4 col-12 gy-2">
                                        <Textfield class="mb-4" bind:value={() => styling.addonBorderImageSliceLeft?? 0, (e) => styling.addonBorderImageSliceLeft = e} label="Slice Left" type="number" suffix="px" variant="filled" />
                                        <Textfield class="mb-4" bind:value={() => styling.addonBorderImageSliceRight?? 0, (e) => styling.addonBorderImageSliceRight = e} label="Slice Right" type="number" suffix="px" variant="filled" />
                                    </div>
                                </div>
                            </div>
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
    import ImageUpload from '$lib/store/ImageUpload.svelte';
    import Textfield from '$lib/custom/textfield/Textfield.svelte';
    import Select, { Option } from '$lib/custom/select';
    import Switch from '@smui/switch';
    import { app, addonStyling } from '$lib/store/store.svelte';
    import type { Choice, Row, Styling, addonStyling as StyleType, RowDesignGroup, ObjectDesignGroup } from '$lib/store/types';

    let { open, onclose, data }: { open: boolean; onclose: () => void; data?: Row | Choice | RowDesignGroup | ObjectDesignGroup } = $props();
    const borderStyles = ['solid', 'dotted', 'dashed', 'double', 'groove', 'ridge', 'inset', 'outset', 'hidden'];
    const borderImageRepeat = ['stretch', 'repeat', 'round', 'space'];
    let currentDialog = $state<'none' | 'appImageUpload'>('none');
    let imgProp = $state('');
    let styling = $state<Styling>(typeof data !== 'undefined' ? data.styling || addonStyling : app.styling);
    let isTransparent = $state(false);
    let dialogStyle = $derived(isTransparent ? 'opacity: 0.2' : '');
    let borderRadiusSuffix = $derived.by(() => {
        if (styling.addonBorderRadiusIsPixels) return 'px';
        else return '%';
    });
    let isDisabled = $derived(typeof data === 'undefined' ? !styling.useAddonDesign : !data.privateAddonIsOn);
</script>