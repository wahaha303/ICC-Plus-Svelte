<Dialog
    bind:open
    surface$style="width: 1200px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
    style={dialogStyle}
>
    <Title class="dialog-title" tabindex={0} autofocus>
        <span class="title--text">Point Bar</span>
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
                    <div class="row">
                        <div class="col-lg-4 col-12 gy-2">
                            <div class="col-12 px-3">Style of text inside the point-bar</div>
                            <Textfield class="mb-4" bind:value={() => styling.barTextPadding ?? 0, (e) => styling.barTextPadding = e} label="Bar Text Padding" type="number" suffix="px" variant="filled" />
                            <Textfield class="mb-4" bind:value={() => styling.barTextMargin ?? 0, (e) => styling.barTextMargin = e} label="Bar Text Margin" type="number" suffix="px" variant="filled" />
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.customBarTextFont ?? false, (e) => styling.customBarTextFont = e} />
                                {#snippet label()}
                                    Use Local Custom Font?
                                {/snippet}
                            </FormField>
                            {#if styling.customBarTextFont}
                                <Textfield class="mb-4" bind:value={() => styling.barTextFont ?? '', (e) => styling.barTextFont = e} label="Text Font" variant="filled" />
                            {:else}
                                <Select class="mb-4" bind:value={() => styling.barTextFont ?? '', (e) => styling.barTextFont = e} label="Text Font" variant="filled">
                                    {#each textFonts as textFont}
                                        <Option value={textFont}>{textFont}</Option>
                                    {/each}
                                </Select>
                            {/if}
                            <div class="col-12 px-3">Style of text inside the point-bar</div>
                            <Textfield class="mb-4" bind:value={() => styling.barPadding ?? 0, (e) => styling.barPadding = e} label="Bar Padding" type="number" suffix="px" variant="filled" />
                            <Textfield class="mb-4" bind:value={() => styling.barMargin ?? 0, (e) => styling.barMargin = e} label="Bar Margin" type="number" suffix="px" variant="filled" />
                            <Textfield class="mb-4" bind:value={() => styling.barTextSize ?? 0, (e) => styling.barTextSize = e} label="Bar Text Size" type="number" suffix="px" variant="filled" />
                        </div>
                        <div class="col-lg-4 col-12 gy-2 text-center">
                            <div class="col-12 px-3">Bar Text Color</div>
                            <ColorPicker bind:hex={() => styling.barTextColor ?? '#000000', (e) => styling.barTextColor = e} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} --picker-height="100px" />
                            <div class="col-12 px-3">Bar Points Color Positive</div>
                            <ColorPicker bind:hex={() => styling.barPointPos ?? '#000000', (e) => styling.barPointPos = e} components={ChromeVariant} sliderDirection="horizontal" isDialog={false}  --picker-height="100px"/>
                            <div class="col-12 px-3">Bar Points Color Negative</div>
                            <ColorPicker bind:hex={() => styling.barPointNeg ?? '#000000', (e) => styling.barPointNeg = e} components={ChromeVariant} sliderDirection="horizontal" isDialog={false}  --picker-height="100px"/>
                        </div>
                        <div class="col-lg-4 col-12 gy-2 text-center">
                            <div class="col-12 px-3">Bar Background Color</div>
                            <ColorPicker bind:hex={() => styling.barBackgroundColor ?? '#000000', (e) => styling.barBackgroundColor = e} components={ChromeVariant} sliderDirection="horizontal" isDialog={false}  --picker-height="100px"/>
                            <div class="col-12 px-3">Bar Icon Color</div>
                            <ColorPicker bind:hex={() => styling.barIconColor ?? '#000000', (e) => styling.barIconColor = e} components={ChromeVariant} sliderDirection="horizontal" isDialog={false}  --picker-height="100px"/>
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
    import { app, textFonts, pointBarStyling } from '$lib/store/store.svelte';
    import type { Choice, Row, Styling, pointBarStyling as StyleType } from '$lib/store/types';

    let { open, onclose }: { open: boolean; onclose: () => void; } = $props();
    const borderStyles = ['solid', 'dotted', 'dashed', 'double', 'groove', 'ridge', 'inset', 'outset', 'hidden'];
    let isTransparent = $state(false);
    let dialogStyle = $derived(isTransparent ? 'opacity: 0.2' : '');
    let styling = $state<Styling>(app.styling);
</script>