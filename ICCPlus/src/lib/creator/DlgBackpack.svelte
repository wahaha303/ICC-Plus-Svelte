<Dialog
    bind:open
    escapeKeyAction={dlgVariables.currentDialog !== 'dlgBackpack' ? 'close' : ''}
    scrimClickAction={dlgVariables.currentDialog !== 'dlgBackpack' ? 'close' : ''}
    surface$style="width: {typeof app.styling.backPackWidth !== 'undefined' ? app.styling.backPackWidth : 1200}px; max-width: 100vw;"
    onSMUIDialogClosed={onclose}
>
    <Title class="p-0 m-0 row" tabindex={0} autofocus>
        <div class="p-0 col-12">
            <Button onclickcapture={() => downloadAsImage(printDiv)} class="h-100">
                <BtnIcon class="mdi mdi-file-image" />
                <Label>Download Image</Label>
            </Button>
        </div>
    </Title>
    <Content id="backpackDialog" class="p-0">
        <div bind:this={printDiv} bind:clientWidth={width} class="container-fluid p-0" style={background}>
            <div bind:this={mainDiv} class="row gx-0">
                {#each app.backpack as row}
                    <div class={row.width ? 'col-6': 'col-12'}>
                        <AppRow row={row} bCreatorMode={false} windowWidth={width} preloadImages={app.preloadImages} isBackpack={true} mainDiv={mainDiv} />
                    </div>
                {/each}
            </div>
        </div>
    </Content>
    <Actions class="p-0" style="min-height: 36px">
        <Button action="close">
            <Label class="dialog-actions--btn">Close</Label>
        </Button>
    </Actions>
</Dialog>
<script lang="ts">
    import Button, { Label, Icon as BtnIcon } from '@smui/button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import { app, dlgVariables, downloadAsImage, hexToRgba } from '$lib/store/store.svelte';
    import AppRow from './AppRow.svelte';
    
    let { open, onclose }: { open: boolean; onclose: () => void } = $props();
    let width = $state(0);
    let printDiv = $state<HTMLDivElement>();
    let mainDiv = $state<HTMLDivElement>();

    let background = $derived.by(() => {
        let styles = [];

        styles.push(`overflow-wrap: break-word;`);
        styles.push(`white-space: normal;`);

        if (app.styling.useBackpackDesign) {
            if (app.styling.backpackBgImage) {
                styles.push(`background-image: url('${app.styling.backpackBgImage}');`);
            }
            styles.push(`background-color: ${hexToRgba(app.styling.backpackBgColor)};`);
            if (app.styling.isBackpackBgRepeat) {
                styles.push(`background-repeat: repeat;`);
            } else if (app.styling.isBackpackBgFitIn) {
                styles.push(`background-size: 100% 100%;`);
            } else {
                styles.push(`background-size: cover;`);
            }
        } else {
            if (app.styling.backgroundImage) {
                styles.push(`background-image: url('${app.styling.backgroundImage}');`);
            }
            styles.push(`background-color: ${hexToRgba(app.styling.backgroundColor)};`);
            if (app.styling.isBackgroundRepeat) {
                styles.push(`background-repeat: repeat;`);
            } else if (app.styling.isBackgroundFitIn) {
                styles.push(`background-size: 100% 100%;`);
            } else {
                styles.push(`background-size: cover;`);
            }
        }
        
        return styles.join(' '); 
    });
    
</script>