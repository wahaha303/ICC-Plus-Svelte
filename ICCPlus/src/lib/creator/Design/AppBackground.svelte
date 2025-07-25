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
                <Checkbox bind:checked={() => data.privateBackgroundIsOn?? false, (e) => data.privateBackgroundIsOn = e} onchange={() => {
                    if (data.privateBackgroundIsOn) {
                        let temp = JSON.parse(JSON.stringify(backgroundStyling));
                        Object.keys(backgroundStyling).forEach(key => {
                            if (app.styling.hasOwnProperty(key)) {
                                let val = app.styling[key as keyof StyleType];
                                if (typeof val !== 'undefined') temp[key as keyof StyleType] = val;
                            }
                        });
                        if (isChoice) {
                            temp.backgroundImage = '';
                            temp.rowBackgroundImage = '';
                        }
                        data.styling = {...(data.styling || {}), ...temp};
                        styling = data.styling!;
                    } else {
                        Object.keys(backgroundStyling).forEach(key => {
                            if (data.styling && app.styling.hasOwnProperty(key)) {
                                delete data.styling[key as keyof StyleType];
                            }
                        });
                    }
                }} />
                {#snippet label()}
                    <span class="title--text">Background</span>
                {/snippet}
            </FormField>
        {:else}
            <span class="title--text">Background</span>
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
                        <div class="col-lg-4 col-12 gy-2 text-center">
                            <div class:transparent={typeof data === 'undefined'}>
                                <FormField class="w-100">
                                    <Checkbox bind:checked={() => styling.bgColorIsOn?? false, (e) => styling.bgColorIsOn = e} />
                                    {#snippet label()}
                                        Color of the background
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class:disabled={typeof data !== 'undefined' && !styling.bgColorIsOn}>
                                <ColorPicker bind:hex={() => styling.backgroundColor?? '#000000', (e) => styling.backgroundColor = e} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} />
                            </div>
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.isBackgroundRepeat?? false, (e) => styling.isBackgroundRepeat = e} onchange={() => {
                                    if (styling.isBackgroundRepeat) styling.isBackgroundFitIn = false;
                                }} />
                                {#snippet label()}
                                    Does it repeat?
                                {/snippet}
                            </FormField>
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.isBackgroundFitIn?? false, (e) => styling.isBackgroundFitIn = e} onchange={() => {
                                    if (styling.isBackgroundFitIn) styling.isBackgroundRepeat = false;
                                }} />
                                {#snippet label()}
                                    Does it fit in?
                                {/snippet}
                            </FormField>
                            <div class="px-5">
                                {#if styling.backgroundImage}
                                    <button type="button" onclickcapture={() => {currentDialog = 'appImageUpload'; imgProp = 'backgroundImage'}} class="btn--image-background">
                                        <img src={styling.backgroundImage} alt="Addon Background" loading="lazy" class="btn--image" style="max-height: 140px;" />
                                    </button>
                                {/if}
                                <Button onclickcapture={() => {currentDialog = 'appImageUpload'; imgProp = 'backgroundImage'}} variant="raised">
                                    <Label>Change Image</Label>
                                </Button>
                            </div>
                        </div>
                        <div class="col-lg-4 col-12 gy-2 text-center">
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.rowBgColorIsOn?? false, (e) => styling.rowBgColorIsOn = e} />
                                {#snippet label()}
                                    Color of the row background
                                {/snippet}
                            </FormField>
                            <div class:disabled={!styling.rowBgColorIsOn}>
                                <ColorPicker bind:hex={() => styling.rowBgColor?? '#000000', (e) => styling.rowBgColor = e} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} />
                            </div>
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.isRowBackgroundRepeat?? false, (e) => styling.isRowBackgroundRepeat = e} onchange={() => {
                                    if (styling.isRowBackgroundRepeat) styling.isRowBackgroundFitIn = false;
                                }} />
                                {#snippet label()}
                                    Does it repeat?
                                {/snippet}
                            </FormField>
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.isRowBackgroundFitIn?? false, (e) => styling.isRowBackgroundFitIn = e} onchange={() => {
                                    if (styling.isRowBackgroundFitIn) styling.isRowBackgroundRepeat = false;
                                }} />
                                {#snippet label()}
                                    Does it fit in?
                                {/snippet}
                            </FormField>
                            <div class="px-5">
                                {#if styling.rowBackgroundImage}
                                    <button type="button" onclickcapture={() => {currentDialog = 'appImageUpload'; imgProp = 'rowBackgroundImage'}} class="btn--image-background">
                                        <img src={styling.rowBackgroundImage} alt="Addon Background" loading="lazy" class="btn--image" style="max-height: 140px;" />
                                    </button>
                                {/if}
                                <Button onclickcapture={() => {currentDialog = 'appImageUpload'; imgProp = 'rowBackgroundImage'}} variant="raised">
                                    <Label>Change Image</Label>
                                </Button>
                            </div>
                        </div>
                        <div class="col-lg-4 col-12 gy-2 text-center">
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.objectBgColorIsOn?? false, (e) => styling.objectBgColorIsOn = e} />
                                {#snippet label()}
                                    Color of the choice background
                                {/snippet}
                            </FormField>
                            <div class:disabled={!styling.objectBgColorIsOn}>
                                <ColorPicker bind:hex={() => styling.objectBgColor?? '#000000', (e) => styling.objectBgColor = e} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} />
                            </div>
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.isObjectBackgroundRepeat?? false, (e) => styling.isObjectBackgroundRepeat = e} onchange={() => {
                                    if (styling.isObjectBackgroundRepeat) styling.isObjectBackgroundFitIn = false;
                                }} />
                                {#snippet label()}
                                    Does it repeat?
                                {/snippet}
                            </FormField>
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.isObjectBackgroundFitIn?? false, (e) => styling.isObjectBackgroundFitIn = e} onchange={() => {
                                    if (styling.isObjectBackgroundFitIn) styling.isObjectBackgroundRepeat = false;
                                }} />
                                {#snippet label()}
                                    Does it fit in?
                                {/snippet}
                            </FormField>
                            <div class="px-5">
                                {#if styling.objectBackgroundImage}
                                    <button type="button" onclickcapture={() => {currentDialog = 'appImageUpload'; imgProp = 'objectBackgroundImage'}} class="btn--image-background">
                                        <img src={styling.objectBackgroundImage} alt="Addon Background" loading="lazy" class="btn--image" style="max-height: 140px;" />
                                    </button>
                                {/if}
                                <Button onclickcapture={() => {currentDialog = 'appImageUpload'; imgProp = 'objectBackgroundImage'}} variant="raised">
                                    <Label>Change Image</Label>
                                </Button>
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
    import { app, backgroundStyling } from '$lib/store/store.svelte';
    import type { Choice, Row, Styling, backgroundStyling as StyleType, RowDesignGroup, ObjectDesignGroup } from '$lib/store/types';

    let { open, onclose, data, isChoice = false }: { open: boolean; onclose: () => void; data?: Row | Choice | RowDesignGroup | ObjectDesignGroup, isChoice?: boolean } = $props();
    let currentDialog = $state<'none' | 'appImageUpload'>('none');
    let imgProp = $state('');
    let styling = $state<Styling>(typeof data !== 'undefined' ? data.styling || backgroundStyling : app.styling);
    let isTransparent = $state(false);
    let dialogStyle = $derived(isTransparent ? 'opacity: 0.2' : '');
    let isDisabled = $derived(typeof data !== 'undefined' && !data.privateBackgroundIsOn);
</script>