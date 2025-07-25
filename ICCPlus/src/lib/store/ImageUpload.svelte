<Dialog
    bind:open
    surface$style="width: 1200px; max-width: calc(100vw - 32px);"
    style="text-align: center"
    onSMUIDialogClosed={onclose}
>
    <Title tabindex={0} autofocus>
        Image
    </Title>
    <Content>
        <div class="container">
            {#if canHaveURL}
                <div class="mb-4 text-left">
                    <FormField>
                        <Switch bind:checked={imgIsUrl} color="secondary" class="switch-scale" />
                        {#snippet label()}
                            Uploaded Image or External URL.
                        {/snippet}
                    </FormField>
                </div>
            {/if}
            <div class="row">
                {#if imgIsUrl}
                    <div class="col col-lg-4">
                        <Textfield bind:value={() => imgObject?.imageLink || '', (e) => {imgObject.imageLink = e}} label="External Image URL" variant="filled" />
                        <Button onclick={() => {setImage(imgObject, imgProp, imgObject.imageLink)}} variant="raised">
                            <Label>Convert URL to Image</Label>
                        </Button>
                    </div>
                    <div class="col col-lg-8">
                        {#if (typeof getImage(imgObject, imgProp) !== 'undefined' && getImage(imgObject, imgProp) !== '')}
                            <img src={getImage(imgObject, imgProp)} alt="Converted" loading="lazy">
                            <Button onclick={() => {setImage(imgObject, imgProp, ''); delete imgObject.imageLink}} variant="raised" class="my-3">
                                <Label>Remove Photo</Label>
                            </Button>
                            <Textfield bind:value={() => imgObject?.imageSourceTooltip || '', (e) => {imgObject.imageSourceTooltip = e}} label="Tooltip That Shows When Hovering over it" variant="filled" />
                        {/if}
                    </div>
                {:else}
                    <div class="col col-lg-4">
                        <div>
                            {#if (open)}
                                <PictureInput 
                                    hideChangeButton={true}
                                    removable={true}
                                    crop={false}
                                    prefill={isDataURL(getImage(imgObject, imgProp)) ? getImage(imgObject, imgProp) : ''}
                                    onchange={(e) => {setImage(imgObject, imgProp, e)}}
                                    onclick={() => autoCompressFlag = app.compressImageAuto}
                                    onremove={() => setImage(imgObject, imgProp, '')}
                                />
                            {/if}
                        </div>
                        <div class:hidden={!(getImage(imgObject, imgProp))} class="p-2">
                            <b>Before:</b>{originalSize} kB|<b>After:</b>{compressedSize} kB
                        </div>
                        <Textfield bind:value={() => imgObject?.imageSourceTooltip || '', (e) => {imgObject.imageSourceTooltip = e}} label="Tooltip That Shows When Hovering over it" variant="filled" />
                    </div>
                    <div class="col-lg-8">
                        <TabBar tabs={['Cropper', 'Compress']} bind:active>
                            {#snippet tab(tab)}
                                <Tab {tab}>
                                    <TabLabel>{tab}</TabLabel>
                                </Tab>
                            {/snippet}
                        </TabBar>
                        <Paper role="tabpanel" variant="unelevated" style={active !== 'Cropper' ? 'display: none;' : ''}>
                            <PaperContent>
                                <div class="row justify-center">
                                    <div class="col">
                                        <Textfield bind:value={aspectWidth} label="Width Aspect" type="number" variant="filled" />
                                    </div>
                                    <div class="col">
                                        <Textfield bind:value={aspectHeight} label="Height Aspect" type="number" variant="filled" />
                                    </div>
                                    <div class="col">
                                        <Button onclick={changeAspect} variant="raised" style="height: 100%;">
                                            <Label>Change Aspect</Label>
                                        </Button>
                                    </div>
                                </div>
                                <div class="mt-2">
                                    <Button onclick={cropImage} variant="raised">
                                        <Label>Crop Image</Label>
                                    </Button>
                                </div>
                                {#if (isDataURL(getImage(imgObject, imgProp)))}
                                    <div>
                                        <img bind:this={imageElement} alt="Cropper" src={getImage(imgObject, imgProp)} loading="lazy" class="cropper-image">
                                    </div>
                                {/if}
                            </PaperContent>
                        </Paper>
                        <Paper role="tabpanel" variant="unelevated" style={active !== 'Compress' ? 'display: none;' : ''}>
                            <PaperContent>
                                <div class="row justify-center">
                                    <div class="col">
                                        <Textfield bind:value={scale} onchange={redraw} label="Image Scale" type="number" variant="filled" />
                                    </div>
                                    <div class="col">
                                        <Textfield bind:value={quality} onchange={redraw} label="Image Quality" type="number" variant="filled" />
                                    </div>
                                    <div class="col">
                                        <Button onclick={compressImage} variant="raised" style="height: 100%;">
                                            <Label>Compress Image</Label>
                                        </Button>
                                    </div>
                                    {#if (isDataURL(getImage(imgObject, imgProp)))}
                                        <div class="pt-3 col col-12">
                                            <img alt="Compress" src={getImage(imgObject, imgProp)} loading="lazy">
                                        </div>
                                    {/if}
                                </div>
                            </PaperContent>
                        </Paper>
                    </div>
                {/if}
            </div>
        </div>
    </Content>
    <Actions>
        <Button action="close">
            <Label class="dialog-actions--btn">Close</Label>
        </Button>
    </Actions>
</Dialog>
<script lang="ts">
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Button, { Label } from '@smui/button';
    import Cropper from 'cropperjs';
    import FormField from '@smui/form-field';
    import Paper, { Content as PaperContent } from '@smui/paper';
    import PictureInput from './PictureInput.svelte';
    import Switch from '@smui/switch';
    import Tab, { Label as TabLabel } from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    import Textfield from '$lib/custom/textfield';
    import type { CommonImage } from '$lib/store/types';
    import 'cropperjs/dist/cropper.min.css';
	import { app, getDataURL, isDataURL } from './store.svelte';
    
    let { open, onclose, imgObject, imgProp, canHaveURL = true }: { open: boolean; onclose: () => void; imgObject: CommonImage; imgProp: string; canHaveURL?: boolean } = $props();

    let active = $state('Cropper');
    let cropper: Cropper;
    let scale = $state(100);
    let quality = $state(90);
    let autoCompressFlag: boolean = false;
    let aspectHeight = $state(1);
    let aspectWidth = $state(1);
    let imageElement = $state<HTMLImageElement>();
    let original = $state<string>();
    let compressed = $state<string>();
    let imgIsUrl = $state(false);
    let counter = 0;

    let originalSize = $derived.by(() => {
        if (original) {
            const dataURL =  getDataURL(original);
            const strLength = dataURL.length;
            const sizeInBytes = strLength * (3 / 4) - 2;
            return Math.round(sizeInBytes / 1024);
        }
        return 0;
    });
    let compressedSize = $derived.by(() => {
        if (compressed) {
            const dataURL = compressed.split(',')[1];
            const strLength = dataURL.length;
            const sizeInBytes = strLength * (3 / 4) - 2;
            return Math.round(sizeInBytes / 1024);
        }
        return 0;
    });
    
    $effect(() => {
        if (imageElement) {
            cropper = new Cropper(imageElement, {
                viewMode: 3,
                dragMode: 'move',
            });
        } else {
            if (cropper) {
                cropper.destroy();
            }
        }

        return () => {
            if (cropper) {
                cropper.destroy();
            }
        }
    });
    
    function redraw() {
        const str = getImage(imgObject, imgProp);
        if (str) {
            drawImage(str);
        }
    }

    function compressImage() {
        if (compressed) {
            setImage(imgObject, imgProp, compressed, false);
        }
    }

    function changeAspect() {
        if (cropper) {
            cropper.setAspectRatio(aspectWidth / aspectHeight);
        }
    }

    function cropImage() {
        if (cropper && imageElement) {
            const croppedImage = cropper.getCroppedCanvas().toDataURL('image/webp');
            imageElement.src = croppedImage;
            setImage(imgObject, imgProp, croppedImage);
        }
    }

    function drawImage(str: string) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext("2d");;
        const img = new Image;
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const imgScale = scale / 100;
            const imgWidth = img.width * imgScale;
            const imgHeight = img.height * imgScale;
            
            canvas.setAttribute('width', imgWidth.toString());
            canvas.setAttribute('height', imgHeight.toString());
            ctx?.drawImage(img, 0, 0, imgWidth, imgHeight);
            compressed = canvas.toDataURL("image/webp", quality / 100);
            counter++;
            if (autoCompressFlag && counter > 1) {
                autoCompressFlag = false;
                compressImage();
                counter = 0;
            }
        }
        img.src = str;
    }
    
    function setImage(obj: CommonImage, str: string, value: string, isFirst: boolean = true) {
        if (obj) {
            obj[str] = value;
            original = value;
            if (cropper) {
                cropper.replace(value);
            }
            if (isFirst) {
                drawImage(value);
            }
        }
    }

    function getImage(obj: CommonImage, str: string) {
        if (obj && obj[str]) {
            return obj[str];
        }
        return '';
    }

</script>
<style>
    img {
        display: block;
        width: 100%;
    }
</style>