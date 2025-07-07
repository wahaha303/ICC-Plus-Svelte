<Dialog
    bind:open
    surface$style="width: 800px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
>
    <Title class="dialog-title" tabindex={0} autofocus>
        Project Stats
    </Title>
    <Content>
        <div class="container-fluid text-center">
            <div class="row p-2 gy-3">
                <div class="col-md-6 col-12">
                    <div class="col p-3">
                        Character Count:
                        <br>
                        {characterCount} Characters
                    </div>
                    <div class="col p-3">
                        Choice Count:
                        <br>
                        {choiceCount} Choices
                    </div>
                    <div class="col p-3">
                        Images Count:
                        <br>
                        {imageCount} Images
                    </div>
                    <div class="col p-3">
                        Rows Count:
                        <br>
                        {rowCount} Rows
                    </div>
                </div>
                <div class="col-md-6 col-12">
                    <div class="col p-3">
                        Biggest Picture:
                        <br>
                        {biggestImage} KB, {biggestImageName}
                    </div>
                    <div class="col p-3">
                        Smallest Picture:
                        <br>
                        {smallestImage} KB, {smallestImageName}
                    </div>
                    <div class="col p-3">
                        Time Guesstimate:
                        <br>
                        {Math.floor(((characterCount / 175) + (imageCount * 5)))} Minutes / {parseFloat((((characterCount / 175) + (imageCount * 5)) / 60).toFixed(1))} Hours
                        <br>
                        (175 Characters Per Minute,
                        <br>
                        5 Minutes Per Picture)
                    </div>
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
    import { app } from '$lib/store/store.svelte';
    import { onMount } from 'svelte';

    let { open, onclose }: { open: boolean; onclose: () => void } = $props();

    let characterCount = $state(0);
    let choiceCount = $state(0);
    let imageCount = $state(0);
    let rowCount = $state(0);
    let biggestImage = $state(0);
    let biggestImageName = $state('');
    let smallestImage = $state(0);
    let smallestImageName = $state('');
    
    onMount(() => {
        let charCnt = 0;
        let choCnt = 0;
        let imgCnt = 0;
        let rowCnt = 0;
        let bigImgSize = 0;
        let bigImgName = '';
        let smallImgSize = 0;
        let smallImgName = '';
        for (let i = 0; i < app.rows.length; i++) {
            const row = app.rows[i];
            rowCnt += 1;

            if (typeof row.title !== 'undefined') charCnt += row.title.length;
            if (typeof row.titleText !== 'undefined') charCnt += row.titleText.length;
            if (typeof row.image !== 'undefined' && row.image.length > 0) {
                if (row.image.length > bigImgSize) {
                    bigImgSize = row.image.length;
                    bigImgName = row.title;
                }
                if (smallImgSize === 0 || row.image.length < smallImgSize) {
                    smallImgSize = row.image.length;
                    smallImgName = row.title;
                }
                imgCnt += 1;
            }
            
            for (let j = 0; j < row.objects.length; j++) {
                const choice = row.objects[j];
                choCnt += 1;

                if (typeof choice.title !== 'undefined') charCnt += choice.title.length;
                if (typeof choice.text !== 'undefined') charCnt += choice.text.length;
                if (typeof choice.image !== 'undefined' && choice.image.length > 0) {
                    if (choice.image.length > bigImgSize) {
                        bigImgSize = choice.image.length;
                        bigImgName = choice.title;
                    }
                    if (smallImgSize === 0 || choice.image.length < smallImgSize) {
                        smallImgSize = choice.image.length;
                        smallImgName = choice.title;
                    }
                    imgCnt += 1;
                }

                for (let k = 0; k < choice.addons.length; k++) {
                    const addon = choice.addons[k];

                    if (typeof addon.title !== 'undefined') charCnt += addon.title.length;
                    if (typeof addon.text !== 'undefined') charCnt += addon.text.length;
                    if (typeof addon.image !== 'undefined' && addon.image.length > 0) {
                        if (addon.image.length > bigImgSize) {
                            bigImgSize = addon.image.length;
                            bigImgName = addon.title;
                        }
                        if (smallImgSize === 0 || addon.image.length < smallImgSize) {
                            smallImgSize = addon.image.length;
                            smallImgName = addon.title;
                        }
                        imgCnt += 1;
                    }
                }
            }
        }
        for (let i = 0; i < app.backpack.length; i++) {
            const row = app.backpack[i];
            rowCnt += 1;

            if (typeof row.title !== 'undefined') charCnt += row.title.length;
            if (typeof row.titleText !== 'undefined') charCnt += row.titleText.length;
            if (typeof row.image !== 'undefined' && row.image.length > 0) {
                if (row.image.length > bigImgSize) {
                    bigImgSize = row.image.length;
                    bigImgName = row.title;
                }
                if (smallImgSize === 0 || row.image.length < smallImgSize) {
                    smallImgSize = row.image.length;
                    smallImgName = row.title;
                }
                imgCnt += 1;
            }
            
            for (let j = 0; j < row.objects.length; j++) {
                const choice = row.objects[j];
                choCnt += 1;

                if (typeof choice.title !== 'undefined') charCnt += choice.title.length;
                if (typeof choice.text !== 'undefined') charCnt += choice.text.length;
                if (typeof choice.image !== 'undefined' && choice.image.length > 0) {
                    if (choice.image.length > bigImgSize) {
                        bigImgSize = choice.image.length;
                        bigImgName = choice.title;
                    }
                    if (smallImgSize === 0 || choice.image.length < smallImgSize) {
                        smallImgSize = choice.image.length;
                        smallImgName = choice.title;
                    }
                    imgCnt += 1;
                }

                for (let k = 0; k < choice.addons.length; k++) {
                    const addon = choice.addons[k];

                    if (typeof addon.title !== 'undefined') charCnt += addon.title.length;
                    if (typeof addon.text !== 'undefined') charCnt += addon.text.length;
                    if (typeof addon.image !== 'undefined' && addon.image.length > 0) {
                        if (addon.image.length > bigImgSize) {
                            bigImgSize = addon.image.length;
                            bigImgName = addon.title;
                        }
                        if (smallImgSize === 0 || addon.image.length < smallImgSize) {
                            smallImgSize = addon.image.length;
                            smallImgName = addon.title;
                        }
                        imgCnt += 1;
                    }
                }
            }
        }
        characterCount = charCnt;
        choiceCount = choCnt;
        imageCount = imgCnt;
        rowCount = rowCnt;
        biggestImage = Math.floor(bigImgSize / 1024);
        biggestImageName = bigImgName;
        smallestImage = Math.floor(smallImgSize / 1024);
        smallestImageName = smallImgName;
    });
</script>