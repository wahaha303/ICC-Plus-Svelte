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
                <Checkbox bind:checked={() => data.privateRowIsOn?? false, (e) => data.privateRowIsOn = e} onchange={() => {
                    if (data.privateRowIsOn) {
                        let temp = JSON.parse(JSON.stringify(rowStyling));
                        Object.keys(rowStyling).forEach(key => {
                            if (app.styling.hasOwnProperty(key)) {
                                let val = app.styling[key as keyof StyleType];
                                if (typeof val !== 'undefined') temp[key as keyof StyleType] = val;
                            }
                        });
                        data.styling = {...(data.styling || {}), ...temp};
                        styling = data.styling!;
                    } else {
                        Object.keys(rowStyling).forEach(key => {
                            if (data.styling && app.styling.hasOwnProperty(key)) {
                                delete data.styling[key as keyof StyleType];
                            }
                        });
                    }
                }} />
                {#snippet label()}
                    <span class="title--text">Row Design</span>
                {/snippet}
            </FormField>
        {:else}
            <span class="title--text">Row Design</span>
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
                    <div class="col-12 pb-3">
                        <FormField>
                            <Switch bind:checked={() => styling.rowDesignIsAdvanced ?? false,(e) => styling.rowDesignIsAdvanced = e} color="secondary" class="switch-scale" />
                            {#snippet label()}
                                Advanced Design?
                            {/snippet}
                        </FormField>
                    </div>
                    {#if styling.rowDesignIsAdvanced}
                        <div class="row">
                            <div class="col-lg-4 gy-2">
                                <div class="col-12 px-3">Margin and Padding</div>
                                <Textfield class="mb-4" bind:value={() => styling.rowMargin ?? 0, (e) => styling.rowMargin = e} label="Text Margin" type="number" suffix="px" variant="filled" />
                                <Textfield class="mb-4" bind:value={() => styling.rowBodyMarginSides ?? 0, (e) => styling.rowBodyMarginSides = e} label="Row Left and Right Margin" type="number" suffix="%" variant="filled" />
                                <Textfield class="mb-4" bind:value={() => styling.rowBodyMarginTop ?? 0, (e) => styling.rowBodyMarginTop = e} label="Row Top Margin" type="number" suffix="px" variant="filled" />
                                <Textfield class="mb-4" bind:value={() => styling.rowBodyMarginBottom ?? 0, (e) => styling.rowBodyMarginBottom = e} label="Row Bottom Margin" type="number" suffix="px" variant="filled" />
                                <div class="col-12 px-3">Text Padding</div>
                                <Textfield class="mb-4" bind:value={() => styling.rowTextPaddingY ?? 0, (e) => styling.rowTextPaddingY = e} label="Text Left and Right Padding" type="number" suffix="px" variant="filled" />
                                <Textfield class="mb-4" bind:value={() => styling.rowTextPaddingX ?? 0, (e) => styling.rowTextPaddingX = e} label="Text Top and Bottom Padding" type="number" suffix="px" variant="filled" />
                                <FormField class="w-100">
                                    <Checkbox bind:checked={() => styling.rowBorderIsOn?? false, (e) => styling.rowBorderIsOn = e} />
                                    {#snippet label()}
                                        Border is turned on
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class="col-lg-4 gy-2">
                                <div class="col-12 px-3">Shadow that the row makes</div>
                                <Textfield class="mb-4" bind:value={() => styling.rowDropShadowH ?? 0, (e) => styling.rowDropShadowH = e} label="Horizontal Shadow" type="number" suffix="px" variant="filled" />
                                <Textfield class="mb-4" bind:value={() => styling.rowDropShadowV ?? 0, (e) => styling.rowDropShadowV = e} label="Vertical Shadow" type="number" suffix="px" variant="filled" />
                                <Textfield class="mb-4" bind:value={() => styling.rowDropShadowBlur ?? 0, (e) => styling.rowDropShadowBlur = e} label="Shadow Blur" type="number" suffix="px" variant="filled" />
                                <Textfield class="mb-4" bind:value={() => styling.rowDropShadowSpread ?? 0, (e) => styling.rowDropShadowSpread = e} label="Shadow Spread" type="number" suffix="px" variant="filled" />
                                <div class="col-12 px-3">The Width and Height of the buttons</div>
                                <Textfield class="mb-4" bind:value={() => styling.rowButtonXPadding ?? 0, (e) => styling.rowButtonXPadding = e} label="Button Height" type="number" suffix="px" variant="filled" />
                                <Textfield class="mb-4" bind:value={() => styling.rowButtonYPadding ?? 0, (e) => styling.rowButtonYPadding = e} label="Button Width" type="number" suffix="px" variant="filled" />
                                <FormField class="w-100">
                                    <Switch bind:checked={() => styling.rowUseBoxShadowIsOn ?? false, (e) => styling.rowUseBoxShadowIsOn = e} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Drop Shadow or Box Shadow?
                                    {/snippet}
                                </FormField>
                                <FormField class="w-100">
                                    <Checkbox bind:checked={() => styling.rowDropShadowIsOn?? false, (e) => styling.rowDropShadowIsOn = e} />
                                    {#snippet label()}
                                        Shadow Is turned on
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class="col-lg-4 gy-2">
                                <div class="col-12 px-3">Rounded corners on the row</div>
                                <Textfield class="mb-4" bind:value={() => styling.rowBorderRadiusTopLeft ?? 0, (e) => styling.rowBorderRadiusTopLeft = e} label="Border-radius Top Left" type="number" suffix={borderRadiusSuffix} variant="filled" />
                                <Textfield class="mb-4" bind:value={() => styling.rowBorderRadiusTopRight ?? 0, (e) => styling.rowBorderRadiusTopRight = e} label="Border-radius Top Right" type="number" suffix={borderRadiusSuffix} variant="filled" />
                                <Textfield class="mb-4" bind:value={() => styling.rowBorderRadiusBottomRight ?? 0, (e) => styling.rowBorderRadiusBottomRight = e} label="Border-radius Bottom Right" type="number" suffix={borderRadiusSuffix} variant="filled" />
                                <Textfield class="mb-4" bind:value={() => styling.rowBorderRadiusBottomLeft ?? 0, (e) => styling.rowBorderRadiusBottomLeft = e} label="Border-radius Bottom Left" type="number" suffix={borderRadiusSuffix} variant="filled" />
                                <div class="col-12 px-3">Border Style and Width</div>
                                <Select class="mb-4" bind:value={() => styling.rowBorderStyle ?? '', (e) => styling.rowBorderStyle = e} label="Border Style" variant="filled">
                                    {#each borderStyles as borderStyle}
                                        <Option value={borderStyle}>{borderStyle}</Option>
                                    {/each}
                                </Select>
                                <Textfield class="mb-4" bind:value={() => styling.rowBorderWidth ?? 0, (e) => styling.rowBorderWidth = e} label="Border Width" type="number" suffix="px" variant="filled" />
                                <FormField class="w-100">
                                    <Switch bind:checked={() => styling.rowBorderRadiusIsPixels ?? false, (e) => styling.rowBorderRadiusIsPixels = e} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Border-Radius Percent or Pixels?
                                    {/snippet}
                                </FormField>
                                <FormField class="w-100">
                                    <Checkbox bind:checked={() => styling.rowOverflowIsOn ?? false, (e) => styling.rowOverflowIsOn = e} />
                                    {#snippet label()}
                                        Border-Radius Cuts off overflow
                                    {/snippet}
                                </FormField>
                            </div>
                        </div>
                    {:else}
                        <div class="row">
                            <div class="col-lg-4 gy-2">
                                <div class="col-12 px-3">Size of the row</div>
                                <Textfield class="mb-4" bind:value={() => styling.rowMargin ?? 0, (e) => styling.rowMargin = e} label="Width of the row top" type="number" suffix="px" variant="filled" />
                                <Textfield class="mb-4" bind:value={() => styling.rowBodyMarginSides ?? 0, (e) => styling.rowBodyMarginSides = e} label="Space at the right and left of the rows" type="number" suffix="%" variant="filled" />
                                <Textfield class="mb-4" bind:value={() => styling.rowBodyMarginBottom ?? 0, (e) => styling.rowBodyMarginBottom = e} label="Space Between Rows" type="number" suffix="px" variant="filled" />
                                <FormField class="w-100">
                                    <Checkbox bind:checked={() => styling.rowBorderIsOn ?? false, (e) => styling.rowBorderIsOn = e} />
                                    {#snippet label()}
                                        Border is turned on
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class="col-lg-4 gy-2">
                                <div class="col-12 px-3">Padding of the text inside of row</div>
                                <Textfield class="mb-4" bind:value={() => styling.rowTextPaddingY ?? 0, (e) => styling.rowTextPaddingY = e} label="Text Left and Right Padding" type="number" suffix="px" variant="filled" />
                                <Textfield class="mb-half" bind:value={() => styling.rowTextPaddingX ?? 0, (e) => styling.rowTextPaddingX = e} label="Text Top and Bottom Padding" type="number" suffix="px" variant="filled" />
                                <div class="col-12 px-3">Shadow that the choice makes</div>
                                <Textfield class="mb-4" bind:value={() => styling.rowDropShadowH ?? 0, (e) => styling.rowDropShadowH = e} onchange={() => {
                                    styling.rowDropShadowV = styling.rowDropShadowH;
                                    styling.rowDropShadowSpread = styling.rowDropShadowH; 
                                    styling.rowDropShadowBlur = styling.rowDropShadowH;
                                }} label="The Higher the number the bigger the shadow will be" type="number" suffix="px" variant="filled" />
                                <FormField class="w-100">
                                    <Checkbox bind:checked={() => styling.rowDropShadowIsOn?? false, (e) => styling.rowDropShadowIsOn = e} />
                                    {#snippet label()}
                                        Drop Shadow Is turned on
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class="col-lg-4 gy-2">
                                <div class="col-12 px-3">Border Style and Width</div>
                                <Select class="mb-4" bind:value={() => styling.rowBorderStyle ?? '', (e) => styling.rowBorderStyle = e} label="Border Style" variant="filled">
                                    {#each borderStyles as borderStyle}
                                        <Option value={borderStyle}>{borderStyle}</Option>
                                    {/each}
                                </Select>
                                <Textfield class="mb-half" bind:value={() => styling.rowBorderWidth ?? 0, (e) => styling.rowBorderWidth = e} label="Border Width" type="number" suffix="px" variant="filled" />
                                <div class="col-12 px-3">Rounded corners on the row</div>
                                <Textfield class="mb-4" bind:value={() => styling.rowBorderRadiusTopLeft ?? 0, (e) => styling.rowBorderRadiusTopLeft = e} onchange={() => styling.rowBorderRadiusTopRight = styling.rowBorderRadiusTopLeft} label="Border-radius Top" type="number" suffix={borderRadiusSuffix} variant="filled" />
                                <Textfield class="mb-4" bind:value={() => styling.rowBorderRadiusBottomLeft ?? 0, (e) => styling.rowBorderRadiusBottomLeft = e} onchange={() => styling.rowBorderRadiusBottomRight = styling.rowBorderRadiusBottomLeft} label="Border-radius Bottom" type="number" suffix={borderRadiusSuffix} variant="filled" />
                            </div>
                        </div>
                    {/if}
                    <div class="row">
                        <div class="col-lg-4 gy-2 text-center">
                            <div class="col-12 px-3">Border Color</div>
                            <div class:disabled={!styling.rowBorderIsOn}>
                                <ColorPicker bind:hex={() => styling.rowBorderColor ?? '#000000', (e) => styling.rowBorderColor = e} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} />
                            </div>
                        </div>
                        <div class="col-lg-4 gy-2 text-center">
                            <div class="col-12 px-3">Color of the choice shadow</div>
                            <div class:disabled={!styling.rowDropShadowIsOn}>
                                <ColorPicker bind:hex={() => styling.rowDropShadowColor ?? '#000000', (e) => styling.rowDropShadowColor = e} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} />
                            </div>
                        </div>
                        <div class="col-lg-4 gy-2">
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.rowGradientIsOn ?? false, (e) => styling.rowGradientIsOn = e} />
                                {#snippet label()}
                                    Row Gradient is turned on
                                {/snippet}
                            </FormField>
                            {#if styling.rowGradientIsOn}
                                <Textfield bind:value={() => styling.rowGradient ?? '', (e) => styling.rowGradient = e} label="Gradient" variant="filled" input$placeholder="to left, blue, red" />
                                <div class="col-12">You might need to leave for the main menu if things stop updating, using something like (green, green) works. <a href="https://www.w3schools.com/css/css3_gradients.asp">https://www.w3schools.com/css/css3_gradients.asp</a></div>
                            {/if}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 text-center">Border Image</div>
                        <div class="col-lg-4 gy-2">
                            <div class="col-12 text-center px-5">
                                {#if styling.rowBorderImage}
                                    <button type="button" onclickcapture={() => {currentDialog = 'appImageUpload'; imgProp = 'rowBorderImage'}} class="btn--image-background">
                                        <img src={styling.rowBorderImage} alt="Row Border" loading="lazy" class="btn--image" style="max-height: 140px;" />
                                    </button>
                                {/if}
                                <Button onclickcapture={() => {currentDialog = 'appImageUpload'; imgProp = 'rowBorderImage'}} variant="raised">
                                    <Label>Change Image</Label>
                                </Button>
                            </div>
                        </div>
                        <div class="col-lg-8 gy-2">
                            <div class="row">
                                <div class="col-lg-4 gy-2">
                                    <Select class="mb-4" bind:value={() => styling.rowBorderImageRepeat ?? '', (e) => styling.rowBorderImageRepeat = e} label="Image Repeat" variant="filled">
                                        {#each borderImageRepeat as imageRepeat}
                                            <Option value={imageRepeat}>{imageRepeat}</Option>
                                        {/each}
                                    </Select>
                                    <Textfield class="mb-4" bind:value={() => styling.rowBorderImageWidth ?? 0, (e) => styling.rowBorderImageWidth = e} label="Border Width" type="number" suffix="px" variant="filled" />
                                </div>
                                <div class="col-lg-4 gy-2">
                                    <Textfield class="mb-4" bind:value={() => styling.rowBorderImageSliceTop ?? 0, (e) => styling.rowBorderImageSliceTop = e} label="Slice Top" type="number" suffix="px" variant="filled" />
                                    <Textfield class="mb-4" bind:value={() => styling.rowBorderImageSliceBottom ?? 0, (e) => styling.rowBorderImageSliceBottom = e} label="Slice Bottom" type="number" suffix="px" variant="filled" />
                                </div>
                                <div class="col-lg-4 gy-2">
                                    <Textfield class="mb-4" bind:value={() => styling.rowBorderImageSliceLeft ?? 0, (e) => styling.rowBorderImageSliceLeft = e} label="Slice Left" type="number" suffix="px" variant="filled" />
                                    <Textfield class="mb-4" bind:value={() => styling.rowBorderImageSliceRight ?? 0, (e) => styling.rowBorderImageSliceRight = e} label="Slice Right" type="number" suffix="px" variant="filled" />
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
    import { app, rowStyling } from '$lib/store/store.svelte';
    import type { Row, Styling, rowStyling as StyleType, RowDesignGroup, ObjectDesignGroup } from '$lib/store/types';

    let { open, onclose, data }: { open: boolean; onclose: () => void; data?: Row | RowDesignGroup | ObjectDesignGroup } = $props();
    const borderStyles = ['solid', 'dotted', 'dashed', 'double', 'groove', 'ridge', 'inset', 'outset', 'hidden'];
    const borderImageRepeat = ['stretch', 'repeat', 'round', 'space'];
    let currentDialog = $state<'none' | 'appImageUpload'>('none');
    let imgProp = $state('');
    let styling = $state<Styling>(typeof data !== 'undefined' ? data.styling || rowStyling : app.styling);
    let isTransparent = $state(false);
    let dialogStyle = $derived(isTransparent ? 'opacity: 0.2' : '');
    let borderRadiusSuffix = $derived.by(() => {
        if (styling.rowBorderRadiusIsPixels) return 'px';
        else return '%';
    });
    let isDisabled = $derived(typeof data !== 'undefined' && !data.privateRowIsOn);
</script>