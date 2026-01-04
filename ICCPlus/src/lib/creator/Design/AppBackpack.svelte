<Dialog
    bind:open
    escapeKeyAction={currentDialog === 'none' ? 'close' : ''}
    surface$style="width: 1200px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
    style={dialogStyle}
>
    <Title class="dialog-title" tabindex={0} autofocus>
        <span class="title--text">Backpack</span>
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
                    <div class="col-12 pb-3">
                        <FormField>
                            <Switch bind:checked={() => styling.useBackpackDesign ?? false, (e) => styling.useBackpackDesign = e} color="secondary" class="switch-scale" />
                            {#snippet label()}
                                Use a Seperate Design?
                            {/snippet}
                        </FormField>
                    </div>
                    <div class:disabled={!styling.useBackpackDesign} class="row">
                        <div class="col-sm-6 col-12 gy-2 text-center">
                            <ColorPicker bind:hex={() => styling.backpackBgColor ?? '#000000', (e) => styling.backpackBgColor = e} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} />
                        </div>
                        <div class="col-sm-6 col-12 gy-2">                                
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.isBackpackBgRepeat ?? false, (e) => styling.isBackpackBgRepeat = e} onchange={() => {
                                    if (styling.isBackpackBgFitIn) styling.isBackpackBgFitIn = false;
                                }} />
                                {#snippet label()}
                                    Does it repeat?
                                {/snippet}
                            </FormField>
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.isBackpackBgFitIn ?? false, (e) => styling.isBackpackBgFitIn = e} onchange={() => {
                                    if (styling.isBackpackBgRepeat) styling.isBackpackBgRepeat = false;
                                }} />
                                {#snippet label()}
                                    Does it fit in?
                                {/snippet}
                            </FormField>
                            <div class="px-5">
                                {#if styling.backpackBgImage}
                                    <button type="button" onclickcapture={() => {currentDialog = 'appImageUpload'; imgProp = 'backpackBgImage'}} class="btn--image-background">
                                        <img src={styling.backpackBgImage} alt="Addon Background" loading="lazy" class="btn--image" style="max-height: 140px;" />
                                    </button>
                                {/if}
                                <Button onclickcapture={() => {currentDialog = 'appImageUpload'; imgProp = 'backpackBgImage'}} variant="raised">
                                    <Label>Change Image</Label>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <Textfield bind:value={() => styling.backPackWidth ?? 1200, (e) => styling.backPackWidth = e} label="Backpack Width" type="number" suffix="px" variant="filled" />
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
    import Switch from '@smui/switch';
    import Textfield from '$lib/custom/textfield/Textfield.svelte';
    import { app } from '$lib/store/store.svelte';
    import type { Styling } from '$lib/store/types';

    let { open, onclose }: { open: boolean; onclose: () => void; } = $props();
    let currentDialog = $state<'none' | 'appImageUpload'>('none');
    let imgProp = $state('');
    let styling = $state<Styling>(app.styling);
    let isTransparent = $state(false);
    let dialogStyle = $derived(isTransparent ? 'opacity: 0.2' : '');
</script>