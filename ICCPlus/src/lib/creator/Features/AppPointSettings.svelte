<Dialog
    bind:open
    escapeKeyAction={currentDialog === 'none' ? 'close' : ''}
    surface$style="width: 800px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
>
    <Title class="dialog-title" tabindex={0} autofocus>
        Point Settings
    </Title>
    <Content class="pb-0">
        <div class="row gx-0 p-4">
            <div class="col-12">
                <FormField>
                    <Switch bind:checked={() => currentPoint.pointColorsIsOn ?? false, (e) => {
                            if (e) {
                                currentPoint.pointColorsIsOn = e;
                                currentPoint.positiveColor = hex;
                                currentPoint.negativeColor = hex;
                            } else {
                                delete currentPoint.pointColorsIsOn;
                                delete currentPoint.positiveColor;
                                delete currentPoint.negativeColor;
                            }
                        }} color="secondary" class="switch-scale" />
                    {#snippet label()}
                        Set colors for positive or negative in the Choices.
                    {/snippet}
                </FormField>
            </div>
            {#if currentPoint?.pointColorsIsOn}
                <div class="col-md-6 col-12 text-center">
                    <div class="d-column">
                        Positive Color
                        <ColorPicker bind:hex={() => currentPoint?.positiveColor?? hex, (e) => {currentPoint.positiveColor = e}} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} />
                    </div>
                </div>
                <div class="col-md-6 col-12 text-center">
                    <div class="d-column">
                        Negative Color
                        <ColorPicker bind:hex={() => currentPoint?.negativeColor?? hex, (e) => {currentPoint.negativeColor = e}} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} />
                    </div>
                </div>
            {/if}
            <div class="col-12">
                <FormField>
                    <Switch bind:checked={() => currentPoint?.pointPrivateColorIsOn?? false, (e) => {
                            if (e) {
                                currentPoint.pointPrivateColorIsOn = e;
                                currentPoint.privateColor = hex;
                                currentPoint.privateNegativeColor = hex;
                            } else {
                                delete currentPoint.pointPrivateColorIsOn;
                                delete currentPoint.privateColor;
                                delete currentPoint.privateNegativeColor;
                            }
                        }} color="secondary" class="switch-scale" />
                    {#snippet label()}
                        Set colors for positive or negative in the Point-Bar.
                    {/snippet}
                </FormField>
            </div>
            {#if currentPoint?.pointPrivateColorIsOn}
                <div class="col-md-6 col-12 text-center">
                    <div class="d-column">
                        Positive Color
                        <ColorPicker bind:hex={() => currentPoint?.privateColor?? hex, (e) => {currentPoint.privateColor = e}} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} />
                    </div>
                </div>
                <div class="col-md-6 col-12 text-center">
                    <div class="d-column">
                        Negative Color
                        <ColorPicker bind:hex={() => currentPoint?.privateNegativeColor?? hex, (e) => {currentPoint.privateNegativeColor = e}} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} />
                    </div>
                </div>
            {/if}
            <div class="col-12">
                <FormField>
                    <Switch bind:checked={() => currentPoint?.iconIsOn?? false, (e) => {
                            if (e) {
                                currentPoint.iconIsOn = e;
                            } else {
                                delete currentPoint.iconIsOn;
                                delete currentPoint.image;
                                delete currentPoint.iconWidth;
                                delete currentPoint.iconHeight;
                                delete currentPoint.imageOnSide;
                                delete currentPoint.imageSidePlacement;
                            }
                        }} color="secondary" class="switch-scale" />
                    {#snippet label()}
                        Set icon for positive or negative.
                    {/snippet}
                </FormField>
            </div>
            {#if currentPoint?.iconIsOn}
                <div class="col-12 ps-3">
                    <FormField>
                        <Switch bind:checked={() => currentPoint?.negativeIconIsOn?? false, (e) => {
                                if (e) {
                                    currentPoint.negativeIconIsOn = e;
                                } else {
                                    delete currentPoint.negativeIconIsOn;
                                    delete currentPoint.negativeImage;
                                    delete currentPoint.negativeIconWidth;
                                    delete currentPoint.negativeIconHeight;
                                    delete currentPoint.negativeImageOnSide;
                                    delete currentPoint.negativeImageSidePlacement;
                                }
                            }} color="secondary" class="switch-scale" />
                        {#snippet label()}
                            Use seperate Icon for negative.
                        {/snippet}
                    </FormField>
                </div>
                {#if currentPoint?.negativeIconIsOn}
                    <div class="col-12 text-center">Icon for positive</div>
                {/if}
                <div class="col-md-6 col-12">
                    <div class="p-3">
                        {#if currentPoint?.image}
                            <button type="button" onclick={() => {currentDialog = 'appImageUpload'; imgProp = 'image'}} class="btn--image-background">
                                <img src={currentPoint?.image} alt="Icon for Positive Number" loading="lazy" class="btn--image" style="max-height: 140px;" />
                            </button>
                        {/if}
                        <Button onclick={() => {currentDialog = 'appImageUpload'; imgProp = 'image'}} variant="raised">
                            <Label>Change Image</Label>
                        </Button>
                    </div>
                </div>
                <div class="col-md-6 col-12">
                    <div class="d-column p-3">
                        <FormField>
                            <Switch bind:checked={() => currentPoint?.imageOnSide?? false, (e) => currentPoint.imageOnSide = e} color="secondary" class="switch-scale" />
                            {#snippet label()}
                                Image is on Left/Right side.
                            {/snippet}
                        </FormField>
                        <FormField>
                            <Switch bind:checked={() => currentPoint?.imageSidePlacement?? false, (e) => currentPoint.imageSidePlacement = e} color="secondary" class="switch-scale" />
                            {#snippet label()}
                                Image is Before/After text.
                            {/snippet}
                        </FormField>
                        <Textfield bind:value={() => currentPoint?.iconWidth?? 0, (e) => currentPoint.iconWidth = e} onchange={() => currentPoint.iconWidth = Math.max(currentPoint.iconWidth || 0, 0)} input$min={0} label="Image Width" type="number" variant="filled" suffix="px" />
                        <Textfield bind:value={() => currentPoint?.iconHeight?? 0, (e) => currentPoint.iconHeight = e} onchange={() => currentPoint.iconHeight = Math.max(currentPoint.iconHeight || 0, 0)} input$min={0} label="Image Height" type="number" variant="filled" suffix="px" />
                    </div>
                </div>
                {#if currentPoint?.negativeIconIsOn}
                    <div class="col-12 text-center">Icon for negative</div>
                    <div class="col-md-6 col-12">
                        <div class="p-3">
                            {#if currentPoint?.negativeImage}
                                <button type="button" onclick={() => {currentDialog = 'appImageUpload'; imgProp = 'negativeImage'}} class="btn--image-background">
                                    <img src={currentPoint?.negativeImage} alt="Icon for Negative Number" loading="lazy" class="btn--image" style="max-height: 140px;" />
                                </button>
                            {/if}
                            <Button onclick={() => {currentDialog = 'appImageUpload'; imgProp = 'negativeImage'}} variant="raised">
                                <Label>Change Image</Label>
                            </Button>
                        </div>
                    </div>
                    <div class="col-md-6 col-12">
                        <div class="d-column p-3">
                            <FormField>
                                <Switch bind:checked={() => currentPoint?.negativeImageOnSide?? false, (e) => currentPoint.negativeImageOnSide = e} color="secondary" class="switch-scale" />
                                {#snippet label()}
                                    Image is on Left/Right side.
                                {/snippet}
                            </FormField>
                            <FormField>
                                <Switch bind:checked={() => currentPoint?.negativeImageSidePlacement?? false, (e) => currentPoint.negativeImageSidePlacement = e} color="secondary" class="switch-scale" />
                                {#snippet label()}
                                    Image is Before/After text.
                                {/snippet}
                            </FormField>
                            <Textfield bind:value={() => currentPoint?.negativeIconWidth?? 0, (e) => currentPoint.negativeIconWidth = e} onchange={() => currentPoint.negativeIconWidth = Math.max(currentPoint.negativeIconWidth || 0, 0)} input$min={0} label="Image Width" type="number" variant="filled" suffix="px" />
                            <Textfield bind:value={() => currentPoint?.negativeIconHeight?? 0, (e) => currentPoint.negativeIconHeight = e} onchange={() => currentPoint.negativeIconHeight = Math.max(currentPoint.negativeIconHeight || 0, 0)} input$min={0} label="Image Height" type="number" variant="filled" suffix="px" />
                        </div>
                    </div>
                {/if}
            {/if}
        </div>
    </Content>
    <Actions>
        <Button action="close">
            <Label class="dialog-actions--btn">Close</Label>
        </Button>
    </Actions>
</Dialog>
{#if currentDialog === 'appImageUpload'}
    <ImageUpload open={currentDialog === 'appImageUpload'} onclose={() => (currentDialog = 'none')} imgObject={currentPoint} imgProp={imgProp} />
{/if}
<script lang="ts">
    import Button, { Label } from '@smui/button';
    import ColorPicker, { ChromeVariant } from '$lib/custom/svelte-awesome-color-picker';
    import FormField from '@smui/form-field';
    import Switch from '@smui/switch';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Textfield from '$lib/custom/textfield';
    import ImageUpload from '$lib/store/ImageUpload.svelte';
    import type { PointType } from '$lib/store/types';

    let { open, onclose, currentPoint }: { open: boolean; onclose: () => void; currentPoint: PointType } = $props();

    let currentDialog = $state<'none' | 'appImageUpload'>('none');
    let hex = $state('#000000FF');
    let imgProp = $state('');
</script>