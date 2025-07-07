<Dialog
    bind:open
    surface$style="width: 1300px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
>
    <Title class="dialog-title" tabindex={0} autofocus>
        Symbols and Image Compression
    </Title>
    <Content>
        <div class="container-fluid">
            <div class="row p-2 gy-3">
                <div class="col-12">
                    {#each symbols as symbol}
                        <span class="symbol">{symbol}</span>
                    {/each}
                </div>
                <div class="col-12">
                    More can be found on <a href="https://www.alt-codes.net/" target="_blank">https://www.alt-codes.net/</a>
                </div>
                <div class="col-12">
                    <Button onclick={compressAllImages} variant="raised" >
                        <Label>Compress All Images</Label>
                    </Button>
                </div>
                <div class="col-12">
                    This will reduce the size and quality of every image in your project that is above the size in the text field below, down to lower than that size. Before you do this, make a backup, and you'll probably want to keep working on an uncompressed project file, as you might want a version with high-quality images later. Compressing below 100 Kb with 200+ images might freeze your browser.
                </div>
                <div class="col-6">
                    <Textfield bind:value={maxSize} label="Max Size of Images after compress (KB)" suffix="KB" variant="standard" />
                </div>
                <div class="col-6 d-flex align-items-center">
                    {imageCounter} Images Compressed | Size Reduced With {parseFloat(sizeReduced.toFixed(2))} MB <br>{progress}
                </div>
                <div class="col-12">
                    <Button onclick={cleanAllStyle} variant="raised" >
                        <Label>Clean All Private Styling</Label>
                    </Button>
                </div>
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
    import Button, { Label } from '@smui/button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import { app, isDataURL } from '$lib/store/store.svelte';
	import Textfield from '$lib/custom/textfield/Textfield.svelte';
    
    let { open, onclose }: { open: boolean; onclose: () => void } = $props();
    let maxSize = $state(100);
    let imageCounter = $state(0);
    let sizeReduced = $state(0);
    let progress = $state('');

    const symbols = ["✅", "✓", "✔", "🗸", "☑", "🗹", "♂", "♀", "⚥", "⚢", "⚣", "⚤", "⚦", "⚧", "⚨", "⚩", "•", "◘", "○", "◙", "•", "‣", "⁃", "⁌", "⁍", "◘", "◦", "⦾", "⦿", "♥", "♡", "🖤", "💙", "💚", "💛", "💜", "🧡", "🤍", "🤎", "❣", "❤", "❥", "🎔", "💓", "💔", "💖", "💗", "💕", "💞", "💘", "↑", "↓", "→", "←", "↔", "↕", "↨", "▲", "▼", "►", "◄", "⤴", "⤵", "↩", "↪", "🏹", "⭐", "★", "☆", "★", "✯"];

    function cleanAllStyle() {
        for (let i = 0; i < app.rows.length; i++) {
            const row = app.rows[i];

            delete row.privateAddonImageIsOn;
            delete row.privateAddonIsOn;
            delete row.privateBackgroundIsOn;
            delete row.privateFilterIsOn;
            delete row.privateMultiChoiceIsOn;
            delete row.privateObjectImageIsOn;
            delete row.privateObjectIsOn;
            delete row.privateRowImageIsOn;
            delete row.privateRowIsOn;
            delete row.privateTextIsOn;
            delete row.isPrivateStyling;
            delete row.styling;

            for (let j = 0; j < row.objects.length; j++) {
                const choice = row.objects[j];

                delete choice.privateAddonImageIsOn;
                delete choice.privateAddonIsOn;
                delete choice.privateBackgroundIsOn;
                delete choice.privateFilterIsOn;
                delete choice.privateMultiChoiceIsOn;
                delete choice.privateObjectImageIsOn;
                delete choice.privateObjectIsOn;
                delete choice.privateTextIsOn;
                delete choice.isPrivateStyling;
                delete choice.styling;
            }
        }

        for (let i = 0; i < app.backpack.length; i++) {
            const row = app.backpack[i];

            delete row.privateAddonImageIsOn;
            delete row.privateAddonIsOn;
            delete row.privateBackgroundIsOn;
            delete row.privateFilterIsOn;
            delete row.privateMultiChoiceIsOn;
            delete row.privateObjectImageIsOn;
            delete row.privateObjectIsOn;
            delete row.privateRowImageIsOn;
            delete row.privateRowIsOn;
            delete row.privateTextIsOn;
            delete row.isPrivateStyling;
            delete row.styling;

            for (let j = 0; j < row.objects.length; j++) {
                const choice = row.objects[j];

                delete choice.privateAddonImageIsOn;
                delete choice.privateAddonIsOn;
                delete choice.privateBackgroundIsOn;
                delete choice.privateFilterIsOn;
                delete choice.privateMultiChoiceIsOn;
                delete choice.privateObjectImageIsOn;
                delete choice.privateObjectIsOn;
                delete choice.privateTextIsOn;
                delete choice.isPrivateStyling;
                delete choice.styling;
            }
        }
    }

    async function compressAllImages() {
        sizeReduced = 0;
        progress = 'Compressing...';
        for (let i = 0; i < app.rows.length; i++) {
            const row = app.rows[i];

            if (row.image && isDataURL(row.image) && row.image.length > maxSize * 1024) {
                try {
                    const beforeSize = row.image.length;
                    row.image = await compressImage(row.image);
                    imageCounter++;
                    sizeReduced += (beforeSize - row.image.length) / 1024 / 1024;
                } catch (e) {
                    console.error(e);
                }
            }
            
            for (let j = 0; j < row.objects.length; j++) {
                const choice = row.objects[j];

                if (choice.image && isDataURL(choice.image) && choice.image.length > maxSize * 1024) {
                    try {
                        const beforeSize = choice.image.length;
                        choice.image = await compressImage(choice.image);
                        imageCounter++;
                        sizeReduced += (beforeSize - choice.image.length) / 1024 / 1024;
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
        }
        for (let i = 0; i < app.backpack.length; i++) {
            const row = app.backpack[i];

            if (row.image && isDataURL(row.image) && row.image.length > maxSize * 1024) {
                try {
                    const beforeSize = row.image.length;
                    row.image = await compressImage(row.image);
                    imageCounter++;
                    sizeReduced += (beforeSize - row.image.length) / 1024 / 1024;
                } catch (e) {
                    console.error(e);
                }
            }
            
            for (let j = 0; j < row.objects.length; j++) {
                const choice = row.objects[j];

                if (choice.image && isDataURL(choice.image) && choice.image.length > maxSize * 1024) {
                    try {
                        const beforeSize = choice.image.length;
                        choice.image = await compressImage(choice.image);
                        imageCounter++;
                        sizeReduced += (beforeSize - choice.image.length) / 1024 / 1024;
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
        }
        progress = 'Complete';
    }

    function compressImage(str: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.crossOrigin = 'anonymous';

            img.onload = () => {
                let imgWidth = img.width;
                let imgHeight = img.height;

                if (imgWidth > 1920 || imgHeight > 1920) {
                    const ratio = Math.min(1920 / imgWidth, 1920 / imgHeight);
                    imgWidth = imgWidth * ratio;
                    imgHeight = imgHeight * ratio;
                }

                canvas.width = imgWidth;
                canvas.height = imgHeight;

                ctx?.drawImage(img, 0, 0, imgWidth, imgHeight);

                const compress = (): string => {
                    return canvas.toDataURL('image/webp', 0.75);
                }

                let compressed = compress();

                let quality = 0.75;

                while (compressed.length > maxSize * 1024 && quality > 0.1) {
                    quality -= 0.05;
                    compressed = canvas.toDataURL('image/webp', quality);
                }

                resolve(compressed);
            };

            img.onerror = (e) => reject(new Error('Failed to load image'));

            img.src = str;
        });
    }
</script>