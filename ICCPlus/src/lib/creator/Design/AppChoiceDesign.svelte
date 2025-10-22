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
                <Checkbox bind:checked={() => data.privateObjectIsOn?? false, (e) => data.privateObjectIsOn = e} onchange={() => {
                    if (data.privateObjectIsOn) {
                        let temp = JSON.parse(JSON.stringify(objectStyling));
                        Object.keys(objectStyling).forEach(key => {
                            if (app.styling.hasOwnProperty(key)) {
                                let val = app.styling[key as keyof StyleType];
                                if (typeof val !== 'undefined') temp[key as keyof StyleType] = val;
                            }
                        });
                        data.styling = {...(data.styling || {}), ...temp};
                        styling = data.styling!;
                    } else {
                        Object.keys(objectStyling).forEach(key => {
                            if (data.styling && app.styling.hasOwnProperty(key)) {
                                delete data.styling[key as keyof StyleType];
                            }
                        });
                    }
                }} />
                {#snippet label()}
                    <span class="title--text">Choice Design</span>
                {/snippet}
            </FormField>
        {:else}
            <span class="title--text">Choice Design</span>
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
                            <Checkbox bind:checked={() => styling.objectHeight?? false, (e) => styling.objectHeight = e} />
                            {#snippet label()}
                                If this is checked then every choice in a row will have identical height.
                            {/snippet}
                        </FormField>
                    </div>
                    <div class="col-12 pb-3">
                        <FormField>
                            <Switch bind:checked={() => styling.objectDesignIsAdvanced?? false, (e) => styling.objectDesignIsAdvanced = e} color="secondary" class="switch-scale" />
                            {#snippet label()}
                                Advanced Design?
                            {/snippet}
                        </FormField>
                    </div>
                    {#if styling.objectDesignIsAdvanced}
                        <div class="row">
                            <div class="col-lg-4 col-12 gy-2">
                                <div class="col-12 px-3">Margin and Padding</div>
                                <Textfield class="mb-4" bind:value={() => styling.objectMargin?? 0, (e) => styling.objectMargin = e} label="Margin" type="number" suffix="px" variant="filled" />
                                <Textfield class="mb-half" bind:value={() => styling.objectTextPadding?? 0, (e) => styling.objectTextPadding = e} label="Padding" type="number" suffix="px" variant="filled" />
                                <div class="col-12 px-3">Border Style and Width</div>
                                <Select class="mb-4" bind:value={() => styling.objectBorderStyle?? '', (e) => styling.objectBorderStyle = e} label="Border Style" variant="filled">
                                    {#each borderStyles as borderStyle}
                                        <Option value={borderStyle}>{borderStyle}</Option>
                                    {/each}
                                </Select>
                                <Textfield class="mb-4" bind:value={() => styling.objectBorderWidth?? 0, (e) => styling.objectBorderWidth = e} label="Border Width" type="number" suffix="px" variant="filled" />
                                <FormField class="w-100">
                                    <Checkbox bind:checked={() => styling.objectBorderIsOn?? false, (e) => styling.objectBorderIsOn = e} />
                                    {#snippet label()}
                                        Border is turned on
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class="col-lg-4 col-12 gy-2">
                                <div class="col-12 px-3">Shadow that the choice makes</div>
                                <Textfield class="mb-4" bind:value={() => styling.objectDropShadowH?? 0, (e) => styling.objectDropShadowH = e} label="Horizontal Shadow" type="number" suffix="px" variant="filled" />
                                <Textfield class="mb-4" bind:value={() => styling.objectDropShadowV?? 0, (e) => styling.objectDropShadowV = e} label="Vertical Shadow" type="number" suffix="px" variant="filled" />
                                <Textfield class="mb-4" bind:value={() => styling.objectDropShadowBlur?? 0, (e) => styling.objectDropShadowBlur = e} label="Shadow Blur" type="number" suffix="px" variant="filled" />
                                <Textfield class="mb-4{styling.objectUseBoxShadowIsOn ? '' : ' disabled'}" bind:value={() => styling.objectDropShadowSpread?? 0, (e) => styling.objectDropShadowSpread = e} label="Shadow Spread" type="number" suffix="px" variant="filled" />
                                <FormField class="w-100">
                                    <Switch bind:checked={() => styling.objectUseBoxShadowIsOn?? false, (e) => styling.objectUseBoxShadowIsOn = e} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Drop Shadow or Box Shadow?
                                    {/snippet}
                                </FormField>
                                <FormField class="w-100">
                                    <Checkbox bind:checked={() => styling.objectDropShadowIsOn?? false, (e) => styling.objectDropShadowIsOn = e} />
                                    {#snippet label()}
                                        Shadow is turned on
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class="col-lg-4 col-12 gy-2">
                                <div class="col-12 px-3">Rounded corners on the choice</div>
                                <Textfield class="mb-4" bind:value={() => styling.objectBorderRadiusTopLeft?? 0, (e) => styling.objectBorderRadiusTopLeft = e} label="Border-radius Top Left" type="number" suffix={borderRadiusSuffix} variant="filled" />
                                <Textfield class="mb-4" bind:value={() => styling.objectBorderRadiusTopRight?? 0, (e) => styling.objectBorderRadiusTopRight = e} label="Border-radius Top Right" type="number" suffix={borderRadiusSuffix} variant="filled" />
                                <Textfield class="mb-4" bind:value={() => styling.objectBorderRadiusBottomRight?? 0, (e) => styling.objectBorderRadiusBottomRight = e} label="Border-radius Bottom Right" type="number" suffix={borderRadiusSuffix} variant="filled" />
                                <Textfield class="mb-4" bind:value={() => styling.objectBorderRadiusBottomLeft?? 0, (e) => styling.objectBorderRadiusBottomLeft = e} label="Border-radius Bottom Left" type="number" suffix={borderRadiusSuffix} variant="filled" />
                                <FormField class="w-100">
                                    <Switch bind:checked={() => styling.objectBorderRadiusIsPixels?? false, (e) => styling.objectBorderRadiusIsPixels = e} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Border-Radius Percent or Pixels?
                                    {/snippet}
                                </FormField>
                                <FormField class="w-100">
                                    <Checkbox bind:checked={() => styling.objectOverflowIsOn?? false, (e) => styling.objectOverflowIsOn = e} />
                                    {#snippet label()}
                                        Border-Radius Cuts off overflow
                                    {/snippet}
                                </FormField>
                            </div>
                        </div>
                    {:else}
                        <div class="row">
                            <div class="col-lg-4 col-12 gy-2">
                                <div class="col-12 px-3">Margin and Padding of the choices</div>
                                <Textfield class="mb-4" bind:value={() => styling.objectMargin?? 0, (e) => styling.objectMargin = e} label="Space between the choices" type="number" suffix="px" variant="filled" />
                                <Textfield class="mb-4" bind:value={() => styling.objectTextPadding?? 0, (e) => styling.objectTextPadding = e} label="Space between the text in the choices and its border" type="number" suffix="px" variant="filled" />
                                <FormField class="w-100">
                                    <Checkbox bind:checked={() => styling.objectBorderIsOn?? false, (e) => styling.objectBorderIsOn = e} />
                                    {#snippet label()}
                                        Border is turned on
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class="col-lg-4 col-12 gy-2">
                                <div class="col-12 px-3">Border Style and Width</div>
                                <Select class="mb-4" bind:value={() => styling.objectBorderStyle?? '', (e) => styling.objectBorderStyle = e} label="Border Style" variant="filled">
                                    {#each borderStyles as borderStyle}
                                        <Option value={borderStyle}>{borderStyle}</Option>
                                    {/each}
                                </Select>
                                <Textfield class="mb-4" bind:value={() => styling.objectBorderWidth?? 0, (e) => styling.objectBorderWidth = e} label="Border Width" type="number" suffix="px" variant="filled" />
                                <FormField class="w-100">
                                    <Checkbox bind:checked={() => styling.objectDropShadowIsOn?? false, (e) => styling.objectDropShadowIsOn = e} />
                                    {#snippet label()}
                                        Drop Shadow Is turned on
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class="col-lg-4 col-12 gy-2">
                                
                                <div class="col-12 px-3">Rounded corners on the choice</div>
                                <Textfield class="mb-4" bind:value={() => styling.objectBorderRadiusTopLeft?? 0, (e) => styling.objectBorderRadiusTopLeft = e} onchange={() => styling.objectBorderRadiusTopRight = styling.objectBorderRadiusTopLeft} label="Border-radius Top" type="number" suffix={borderRadiusSuffix} variant="filled" />
                                <Textfield class="mb-half" bind:value={() => styling.objectBorderRadiusBottomLeft?? 0, (e) => styling.objectBorderRadiusBottomLeft = e} onchange={() => styling.objectBorderRadiusBottomRight = styling.objectBorderRadiusBottomLeft} label="Border-radius Bottom" type="number" suffix={borderRadiusSuffix} variant="filled" />
                                <div class="col-12 px-3">Shadow that the choice makes</div>
                                <Textfield class="mb-4" bind:value={() => styling.objectDropShadowH?? 0, (e) => styling.objectDropShadowH = e} onchange={() => {
                                    styling.objectDropShadowV = styling.objectDropShadowH;
                                    styling.objectDropShadowSpread = styling.objectDropShadowH; 
                                    styling.objectDropShadowBlur = styling.objectDropShadowH;
                                }} label="The Higher the number the bigger the shadow will be" type="number" suffix="px" variant="filled" />
                            </div>
                        </div>
                    {/if}
                    <div class="row">
                        <div class="col-lg-4 col-12 gy-2 text-center">
                            <div class="col-12 px-3">Border Color</div>
                            <div class:disabled={!styling.objectBorderIsOn}>
                                <ColorPicker bind:hex={() => styling.objectBorderColor?? '#000000', (e) => styling.objectBorderColor = e} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} />
                            </div>
                        </div>
                        <div class="col-lg-4 col-12 gy-2 text-center">
                            <div class="col-12 px-3">Color of the choice shadow</div>
                            <div class:disabled={!styling.objectDropShadowIsOn}>
                                <ColorPicker bind:hex={() => styling.objectDropShadowColor?? '#000000', (e) => styling.objectDropShadowColor = e} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} />
                            </div>
                        </div>
                        <div class="col-lg-4 col-12 gy-2">
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.titlePaddingIsOn?? false, (e) => styling.titlePaddingIsOn = e} />
                                {#snippet label()}
                                    Apply padding to the Choice Title
                                {/snippet}
                            </FormField>
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.removeSpaceAddonIsOn?? false, (e) => styling.removeSpaceAddonIsOn = e} />
                                {#snippet label()}
                                    Remove the space below the addon text
                                {/snippet}
                            </FormField>
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.objectGradientIsOn?? false, (e) => styling.objectGradientIsOn = e} />
                                {#snippet label()}
                                    Object Gradient is turned on
                                {/snippet}
                            </FormField>
                            {#if styling.objectGradientIsOn}
                                <Textfield bind:value={() => styling.objectGradient?? '', (e) => styling.objectGradient = e} label="Gradient when Not Selected" variant="filled" input$placeholder="to left, blue, red" />
                                <Textfield bind:value={() => styling.objectGradientOnSelect?? '', (e) => styling.objectGradientOnSelect = e} label="Gradient when Selected" variant="filled" input$placeholder="to left, blue, red" />
                                <Textfield bind:value={() => styling.objectGradientOnReq?? '', (e) => styling.objectGradientOnReq = e} label="Gradient when Missing Requirement" variant="filled" input$placeholder="to left, blue, red" />
                                <div class="col-12">You might need to leave for the main menu if things stop updating, using something like (green, green) works. <a href="https://www.w3schools.com/css/css3_gradients.asp">https://www.w3schools.com/css/css3_gradients.asp</a></div>
                            {/if}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 text-center">Border Image</div>
                        <div class="col-lg-4 col-12 gy-2">
                            <div class="col-12 text-center px-5">
                                {#if styling.objectBorderImage}
                                    <button type="button" onclickcapture={() => {currentDialog = 'appImageUpload'; imgProp = 'objectBorderImage'}} class="btn--image-background">
                                        <img src={styling.objectBorderImage} alt="Choice Border" loading="lazy" class="btn--image" style="max-height: 140px;" />
                                    </button>
                                {/if}
                                <Button onclickcapture={() => {currentDialog = 'appImageUpload'; imgProp = 'objectBorderImage'}} variant="raised">
                                    <Label>Change Image</Label>
                                </Button>
                            </div>
                        </div>
                        <div class="col-lg-8 col-12 gy-2">
                            <div class="row">
                                <div class="col-lg-4 col-12 gy-2">
                                    <Select class="mb-4" bind:value={() => styling.objectBorderImageRepeat?? '', (e) => styling.objectBorderImageRepeat = e} label="Image Repeat" variant="filled">
                                        {#each borderImageRepeat as imageRepeat}
                                            <Option value={imageRepeat}>{imageRepeat}</Option>
                                        {/each}
                                    </Select>
                                    <Textfield class="mb-4" bind:value={() => styling.objectBorderImageWidth?? 0, (e) => styling.objectBorderImageWidth = e} label="Border Width" type="number" suffix="px" variant="filled" />
                                </div>
                                <div class="col-lg-4 col-12 gy-2">
                                    <Textfield class="mb-4" bind:value={() => styling.objectBorderImageSliceTop?? 0, (e) => styling.objectBorderImageSliceTop = e} label="Slice Top" type="number" suffix="px" variant="filled" />
                                    <Textfield class="mb-4" bind:value={() => styling.objectBorderImageSliceBottom?? 0, (e) => styling.objectBorderImageSliceBottom = e} label="Slice Bottom" type="number" suffix="px" variant="filled" />
                                </div>
                                <div class="col-lg-4 col-12 gy-2">
                                    <Textfield class="mb-4" bind:value={() => styling.objectBorderImageSliceLeft?? 0, (e) => styling.objectBorderImageSliceLeft = e} label="Slice Left" type="number" suffix="px" variant="filled" />
                                    <Textfield class="mb-4" bind:value={() => styling.objectBorderImageSliceRight?? 0, (e) => styling.objectBorderImageSliceRight = e} label="Slice Right" type="number" suffix="px" variant="filled" />
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
    import { app, objectStyling } from '$lib/store/store.svelte';
    import type { Choice, Row, Styling, objectStyling as StyleType, RowDesignGroup, ObjectDesignGroup } from '$lib/store/types';

    let { open, onclose, data }: { open: boolean; onclose: () => void; data?: Row | Choice | RowDesignGroup | ObjectDesignGroup } = $props();
    const borderStyles = ['solid', 'dotted', 'dashed', 'double', 'groove', 'ridge', 'inset', 'outset', 'hidden'];
    const borderImageRepeat = ['stretch', 'repeat', 'round', 'space'];
    let currentDialog = $state<'none' | 'appImageUpload'>('none');
    let imgProp = $state('');
    let styling = $state<Styling>(typeof data !== 'undefined' ? data.styling || objectStyling : app.styling);
    let isTransparent = $state(false);
    let dialogStyle = $derived(isTransparent ? 'opacity: 0.2' : '');
    let borderRadiusSuffix = $derived.by(() => {
        if (styling.objectBorderRadiusIsPixels) return 'px';
        else return '%';
    });
    let isDisabled = $derived(typeof data !== 'undefined' && !data.privateObjectIsOn);
</script>