<Dialog
    bind:open
    surface$style="width: 1200px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
    style={dialogStyle}
>
    <Title class="dialog-title" tabindex={0} autofocus>
        {#if typeof data !== 'undefined'}
            <FormField>
                <Checkbox bind:checked={() => data.privateRowImageIsOn ?? false, (e) => data.privateRowImageIsOn = e} onchange={() => {
                    if (data.privateRowImageIsOn) {
                        let temp = JSON.parse(JSON.stringify(rowImageStyling));
                        Object.keys(rowImageStyling).forEach(key => {
                            if (app.styling.hasOwnProperty(key)) {
                                let val = app.styling[key as keyof StyleType];
                                if (typeof val !== 'undefined') temp[key as keyof StyleType] = val;
                            }
                        });
                        data.styling = {...(data.styling || {}), ...temp};
                        styling = data.styling!;
                    } else {
                        Object.keys(rowImageStyling).forEach(key => {
                            if (data.styling && app.styling.hasOwnProperty(key)) {
                                delete data.styling[key as keyof StyleType];
                            }
                        });
                    }
                }} />
                {#snippet label()}
                    <span class="title--text">Row Image Design</span>
                {/snippet}
            </FormField>
        {:else}
            <span class="title--text">Row Image Design</span>
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
                        <div class="col-lg-4 col-12 gy-2">
                            <div class="col-12 px-3">Style and Width of the border</div>
                            <Select class="mb-4" bind:value={() => styling.rowImgBorderStyle ?? '', (e) => styling.rowImgBorderStyle = e} label="Border Style" variant="filled">
                                {#each borderStyles as borderStyle}
                                    <Option value={borderStyle}>{borderStyle}</Option>
                                {/each}
                            </Select>
                            <Textfield class="mb-half" bind:value={() => styling.rowImgBorderWidth ?? 0, (e) => styling.rowImgBorderWidth = e} label="Thickness of the border" type="number" suffix="px" variant="filled" />
                            <div class="col-12 px-3">Size and Margin of the row image</div>
                            <Textfield class="mb-4" bind:value={() => styling.rowImageWidth ?? 0, (e) => styling.rowImageWidth = e} label="Width of the image inside of the row" type="number" suffix="%" variant="filled" />
                            <Textfield class="mb-4" bind:value={() => styling.rowImageMarginTop ?? 0, (e) => styling.rowImageMarginTop = e} label="Space Between Top of row and Image" type="number" suffix="%" variant="filled" />
                            <Textfield class="mb-half" bind:value={() => styling.rowImageMarginBottom ?? 0, (e) => styling.rowImageMarginBottom = e} label="Space Between Title and Image" type="number" suffix="%" variant="filled" />
                            <div class="col-12 px-3">Works only with the Image Left/Right template</div>
                            <Textfield class="mb-half" bind:value={() => styling.rowImageBoxWidth ?? 0, (e) => styling.rowImageBoxWidth = e} label="Width of the image box inside of row" type="number" suffix="%" variant="filled" onchange={() => styling.rowImageBoxWidth = Math.max(0, Math.min(100, (styling.rowImageBoxWidth ?? 50)))} input$min={0} input$max={100} />
                        </div>
                        <div class="col-lg-4 col-12 gy-2">
                            <div class="col-12 px-3">Rounded corners on the image</div>
                            <Textfield class="mb-4" bind:value={() => styling.rowImgBorderRadiusTopLeft ?? 0, (e) => styling.rowImgBorderRadiusTopLeft = e} label="Border-radius Top Left" type="number" suffix={borderRadiusSuffix} variant="filled" />
                            <Textfield class="mb-4" bind:value={() => styling.rowImgBorderRadiusTopRight ?? 0, (e) => styling.rowImgBorderRadiusTopRight = e} label="Border-radius Top Right" type="number" suffix={borderRadiusSuffix} variant="filled" />
                            <Textfield class="mb-4" bind:value={() => styling.rowImgBorderRadiusBottomRight ?? 0, (e) => styling.rowImgBorderRadiusBottomRight = e} label="Border-radius Bottom Right" type="number" suffix={borderRadiusSuffix} variant="filled" />
                            <Textfield class="mb-4" bind:value={() => styling.rowImgBorderRadiusBottomLeft ?? 0, (e) => styling.rowImgBorderRadiusBottomLeft = e} label="Border-radius Bottom Left" type="number" suffix={borderRadiusSuffix} variant="filled" />
                            <FormField class="w-100">
                                <Switch bind:checked={() => styling.rowImgBorderRadiusIsPixels ?? false, (e) => styling.rowImgBorderRadiusIsPixels = e} color="secondary" class="switch-scale" />
                                {#snippet label()}
                                    Border-Radius Percent or Pixels?
                                {/snippet}
                            </FormField>
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.rowImgBorderIsOn ?? false, (e) => styling.rowImgBorderIsOn = e} />
                                {#snippet label()}
                                    Enable Border
                                {/snippet}
                            </FormField>
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.rowImgOverflowIsOn ?? false, (e) => styling.rowImgOverflowIsOn = e} />
                                {#snippet label()}
                                    Cut off overflow images
                                {/snippet}
                            </FormField>
                        </div>
                        <div class="col-lg-4 col-12 gy-2 text-center">
                            <div class="col-12 px-3">Border Color</div>
                            <div class:disabled={!styling.rowImgBorderIsOn}>
                                <ColorPicker bind:hex={() => styling.rowImgBorderColor ?? '#000000', (e) => styling.rowImgBorderColor = e} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} />
                            </div>
                        </div>
                        <div class="row pt-4">
                            <div class="col-12">
                                <FormField class="w-100">
                                    <Checkbox bind:checked={() => styling.rowImgObjectFillIsOn ?? false, (e) => styling.rowImgObjectFillIsOn = e} onchange={() => {
                                        if (styling.rowImgObjectFillIsOn) {
                                            styling.rowImgObjectFillStyle = 'none';
                                        } else {
                                            styling.rowImgObjectFillStyle = '';
                                            styling.rowImgObjectFillHeight = 0;
                                        }
                                    }} />
                                    {#snippet label()}
                                        Enable object-fit
                                    {/snippet}
                                </FormField>
                                <div class="col-12 px-3">How the images fit inside of the row.</div>
                                <div class="col-12{styling.rowImgObjectFillIsOn ? '' : ' disabled'}">
                                    <Select class="mb-half" bind:value={() => styling.rowImgObjectFillStyle ?? '', (e) => styling.rowImgObjectFillStyle = e} label="Fill" variant="filled">
                                        {#each fitStyles as fitStyle}
                                            <Option value={fitStyle.value}>{fitStyle.text}</Option>
                                        {/each}
                                    </Select>
                                    <div class="col-12 px-3">If you don’t want to set the image height, just leave it as 0.</div>
                                    <Textfield bind:value={() => styling.rowImgObjectFillHeight ?? 0, (e) => styling.rowImgObjectFillHeight = e} label="Image Height" type="number" suffix="px" variant="filled" />
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
<script lang="ts">
    import Button, { Label } from '@smui/button';
    import Card, { Content as CardContent } from '@smui/card';
    import Checkbox from '@smui/checkbox';
    import ColorPicker, { ChromeVariant } from '$lib/custom/svelte-awesome-color-picker';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import FormField from '@smui/form-field';
    import Textfield from '$lib/custom/textfield/Textfield.svelte';
    import Select, { Option } from '$lib/custom/select';
    import Switch from '@smui/switch';
    import { app, rowImageStyling } from '$lib/store/store.svelte';
    import type { Row, Styling, rowImageStyling as StyleType, RowDesignGroup, ObjectDesignGroup } from '$lib/store/types';

    let { open, onclose, data }: { open: boolean; onclose: () => void; data?: Row | RowDesignGroup | ObjectDesignGroup } = $props();
    const borderStyles = ['solid', 'dotted', 'dashed', 'double', 'groove', 'ridge', 'inset', 'outset', 'hidden'];
    const fitStyles = [{
        value: "fill",
        text: "Fill: The replaced content is sized to fill the element's content box. If necessary, the object will be stretched or squished to fit"
    }, {
        value: "contain",
        text: "Contain: The replaced content is scaled to maintain its aspect ratio while fitting within the element's content box"
    }, {
        value: "cover",
        text: "Cover: The replaced content is sized to maintain its aspect ratio while filling the element's entire content box. The object will be clipped to fit"
    }, {
        value: "scale-down",
        text: "Scale-down: The content is sized as if none or contain were specified (would result in a smaller concrete object size)"
    }, {
        value: "none",
        text: "None: The replaced content is not resized"
    }];
    let styling = $state<Styling>(typeof data !== 'undefined' ? data.styling || rowImageStyling : app.styling);
    let isTransparent = $state(false);
    let dialogStyle = $derived(isTransparent ? 'opacity: 0.2' : '');
    let borderRadiusSuffix = $derived.by(() => {
        if (styling.rowImgBorderRadiusIsPixels) return 'px';
        else return '%';
    });
    let isDisabled = $derived(typeof data !== 'undefined' && !data.privateRowImageIsOn);
</script>