<Dialog
    bind:open
    surface$style="width: 1200px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
    style={dialogStyle}
>
    <Title class="dialog-title" tabindex={0} autofocus>
        {#if typeof data !== 'undefined'}
            <FormField>
                <Checkbox bind:checked={() => data.privateAddonImageIsOn ?? false, (e) => data.privateAddonImageIsOn = e} onchange={() => {
                    if (data.privateAddonImageIsOn) {
                        let temp = JSON.parse(JSON.stringify(addonImageStyling));
                        Object.keys(addonImageStyling).forEach(key => {
                            if (app.styling.hasOwnProperty(key)) {
                                let val = app.styling[key as keyof StyleType];
                                if (typeof val !== 'undefined') temp[key as keyof StyleType] = val;
                            }
                        });
                        data.styling = {...(data.styling || {}), ...temp};
                        styling = data.styling!;
                    } else {
                        Object.keys(addonImageStyling).forEach(key => {
                            if (data.styling && app.styling.hasOwnProperty(key)) {
                                delete data.styling[key as keyof StyleType];
                            }
                        });
                    }
                }}/>
                {#snippet label()}
                    <span class="title--text">Addon Image Design</span>
                {/snippet}
            </FormField>
        {:else}
            <span class="title--text">Addon Image Design</span>
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
                                <Switch bind:checked={() => styling.useAddonImage ?? false, (e) => styling.useAddonImage = e} color="secondary" class="switch-scale" />
                                {#snippet label()}
                                    Use a Seperate Design?
                                {/snippet}
                            </FormField>
                        </div>
                    {/if}
                    <div class:disabled={isDisabled}>
                        <div class="row">
                            <div class="col-lg-4 col-12 gy-2">
                                <div class="col-12 px-3">Style and Width of the border</div>
                                <Select class="mb-4" bind:value={() => styling.addonImgBorderStyle ?? '', (e) => styling.addonImgBorderStyle = e} label="Border Style" variant="filled">
                                    {#each borderStyles as borderStyle}
                                        <Option value={borderStyle}>{borderStyle}</Option>
                                    {/each}
                                </Select>
                                <Textfield class="mb-half" bind:value={() => styling.addonImgBorderWidth ?? 0, (e) => styling.addonImgBorderWidth = e} label="Thickness of the border" type="number" suffix="px" variant="filled" />
                                <div class="col-12 px-3">Size and Margin of the addon image</div>
                                <Textfield class="mb-4" bind:value={() => styling.addonImageWidth ?? 0, (e) => styling.addonImageWidth = e} label="Width of the image inside of the row" type="number" suffix="%" variant="filled" />
                                <Textfield class="mb-4" bind:value={() => styling.addonImageMarginTop ?? 0, (e) => styling.addonImageMarginTop = e} label="Space Between Top of row and Image" type="number" suffix="%" variant="filled" />
                                <Textfield class="mb-half" bind:value={() => styling.addonImageMarginBottom ?? 0, (e) => styling.addonImageMarginBottom = e} label="Space Between Title and Image" type="number" suffix="%" variant="filled" />
                                <div class="col-12 px-3">Works only with the Image Left/Right template</div>
                                <Textfield class="mb-half" bind:value={() => styling.addonImageBoxWidth ?? 0, (e) => styling.addonImageBoxWidth = e} label="Width of the image box inside of row" type="number" suffix="%" variant="filled" onchange={() => styling.addonImageBoxWidth = Math.max(0, Math.min(100, (styling.addonImageBoxWidth ?? 50)))} input$min={0} input$max={100} />
                            </div>
                            <div class="col-lg-4 col-12 gy-2">
                                <div class="col-12 px-3">Rounded corners on the image</div>
                                <Textfield class="mb-4" bind:value={() => styling.addonImgBorderRadiusTopLeft ?? 0, (e) => styling.addonImgBorderRadiusTopLeft = e} label="Border-radius Top Left" type="number" suffix={borderRadiusSuffix} variant="filled" />
                                <Textfield class="mb-4" bind:value={() => styling.addonImgBorderRadiusTopRight ?? 0, (e) => styling.addonImgBorderRadiusTopRight = e} label="Border-radius Top Right" type="number" suffix={borderRadiusSuffix} variant="filled" />
                                <Textfield class="mb-4" bind:value={() => styling.addonImgBorderRadiusBottomRight ?? 0, (e) => styling.addonImgBorderRadiusBottomRight = e} label="Border-radius Bottom Right" type="number" suffix={borderRadiusSuffix} variant="filled" />
                                <Textfield class="mb-4" bind:value={() => styling.addonImgBorderRadiusBottomLeft ?? 0, (e) => styling.addonImgBorderRadiusBottomLeft = e} label="Border-radius Bottom Left" type="number" suffix={borderRadiusSuffix} variant="filled" />
                                <FormField class="w-100">
                                    <Switch bind:checked={() => styling.addonImgBorderRadiusIsPixels ?? false, (e) => styling.addonImgBorderRadiusIsPixels = e} disabled={isDisabled} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Border-Radius Percent or Pixels?
                                    {/snippet}
                                </FormField>
                                <FormField class="w-100">
                                    <Checkbox bind:checked={() => styling.addonImgBorderIsOn ?? false, (e) => styling.addonImgBorderIsOn = e} />
                                    {#snippet label()}
                                        Enable Border
                                    {/snippet}
                                </FormField>
                                <FormField class="w-100">
                                    <Checkbox bind:checked={() => styling.addonImgOverflowIsOn ?? false, (e) => styling.addonImgOverflowIsOn = e} />
                                    {#snippet label()}
                                        Cut off overflow images
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class="col-lg-4 col-12 gy-2 text-center">
                                <div class="col-12 px-3">Border Color</div>
                                <div class:disabled={!styling.addonImgBorderIsOn}>
                                    <ColorPicker bind:hex={() => styling.addonImgBorderColor ?? '#000000', (e) => styling.addonImgBorderColor = e} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} />
                                </div>
                            </div>
                        </div>
                        <div class="row pt-4">
                            <div class="col-12">
                                <FormField class="w-100">
                                    <Checkbox bind:checked={() => styling.addonImgObjectFillIsOn ?? false, (e) => styling.addonImgObjectFillIsOn = e} onchange={() => {
                                        if (styling.addonImgObjectFillIsOn) {
                                            styling.addonImgObjectFillStyle = 'none';
                                        } else {
                                            styling.addonImgObjectFillStyle = '';
                                            styling.addonImgObjectFillHeight = 0;
                                        }
                                    }}/>
                                    {#snippet label()}
                                        Enable object-fit
                                    {/snippet}
                                </FormField>
                                <div class="col-12 px-3">How the images fit inside of the addon.</div>
                                <div class="col-12 px-3">A textfield where you can decide the Size of the container will appear in Row Settings when the switch is on.</div>
                                <div class="col-12{styling.addonImgObjectFillIsOn ? '' : ' disabled'}">
                                    <Select class="mb-half" bind:value={() => styling.addonImgObjectFillStyle ?? '', (e) => styling.addonImgObjectFillStyle = e} label="Fill" variant="filled">
                                        {#each fitStyles as fitStyle}
                                            <Option value={fitStyle.value}>{fitStyle.text}</Option>
                                        {/each}
                                    </Select>
                                    <div class="col-12 px-3">If you don’t want to set the image height, just leave it as 0.</div>
                                    <Textfield bind:value={() => styling.addonImgObjectFillHeight ?? 0, (e) => styling.addonImgObjectFillHeight = e} label="Image Height" type="number" suffix="px" variant="filled" />
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
    import { app, addonImageStyling } from '$lib/store/store.svelte';
    import type { Choice, Row, Styling, addonImageStyling as StyleType, RowDesignGroup, ObjectDesignGroup } from '$lib/store/types';

    let { open, onclose, data }: { open: boolean; onclose: () => void; data?: Row | Choice | RowDesignGroup | ObjectDesignGroup } = $props();
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
    let styling = $state<Styling>(typeof data !== 'undefined' ? data.styling || addonImageStyling : app.styling);
    let isTransparent = $state(false);
    let dialogStyle = $derived(isTransparent ? 'opacity: 0.2' : '');
    let borderRadiusSuffix = $derived.by(() => {
        if (styling.addonImgBorderRadiusIsPixels) return 'px';
        else return '%';
    });
    let isDisabled = $derived(typeof data === 'undefined' ? !styling.useAddonImage : !data.privateAddonImageIsOn);
</script>