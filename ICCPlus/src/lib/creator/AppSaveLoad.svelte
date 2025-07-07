<Dialog
    bind:open
    surface$style="width: 700px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
    id="dialog"
>
        <Title class="text-left dialog-title" tabindex={0} autofocus>
            Save/Load Project
        </Title>
        <Content class="pt-3">
            <div class="container-fluid pb-2 mb-2" style="border: 1px solid">
                {#if autoSaveSlot.stored}
                    <div class="row gx-0" style="border-bottom: 1px solid">
                            <div class="col-sm-1 col-2 d-flex align-items-center justify-center">
                                <IconButton onclick={() => {confirmDialog.action = () => loadAutoSave(); confirmDialog.context = "Are you sure you want to load this project?<br>Any unsaved changes will be lost."; currentDialog = "dlgCommon";}}><i class="mdi mdi-alpha-a-box-outline"></i></IconButton>
                            </div>
                            <div class="col-sm-11 col-10">
                                <div class="col-12 pt-1">
                                    <div>{autoSaveSlot.name}</div>
                                    <div>{autoSaveSlot.time}</div>
                                </div>
                            </div>
                    </div>
                {/if}
                {#each slots as slot, i}
                    {#if slot.stored}
                        <div class="row gx-0" style="border-bottom: 1px solid">
                            <div class="col-sm-1 col-2 d-flex align-items-center justify-center">
                                <IconButton onclick={() => {confirmDialog.action = () => loadApp(i); confirmDialog.context = "Are you sure you want to load this project?<br>Any unsaved changes will be lost."; currentDialog = "dlgCommon";}}><i class="mdi mdi-play"></i></IconButton>
                            </div>
                            <div class="col-sm-10 col-8">
                                <div class="col-12 pt-1">
                                    <div>{slot.name}</div>
                                    <div>{slot.time}</div>
                                </div>
                            </div>
                            <div class="col-sm-1 col-2 d-flex align-items-center justify-center">
                                <IconButton onclick={() => {confirmDialog.action = () => removeSave(i); confirmDialog.context = "Are you sure you want to delete this project?<br>This action cannot be undone."; currentDialog = "dlgCommon";}}><i class="mdi mdi-trash-can"></i></IconButton>
                            </div>
                        </div>
                    {:else}
                        <div class="row gx-0" style="border-bottom: 1px solid">
                            <div class="col-sm-1 col-2 d-flex align-items-center justify-center">
                                <IconButton onclick={() => saveApp(i)}><i class="mdi mdi-content-save"></i></IconButton>
                            </div>
                            <div class="col-sm-11 col-10">
                                <div class="col-12">
                                    <Textfield bind:value={slot.name} onclick={() => slot.name = ''} onblur={() => {if (slot.name === '') slot.name = `Slot ${i + 1}`}} input$onkeydown={(e) => {if(e.key === 'Enter') saveApp(i)}} class="textbox-mini" variant="standard" />
                                </div>
                            </div>
                        </div>
                    {/if}
                {/each}
            </div>
            <div class="row gy-2">
                <div class="col pb-2 d-row align-items-center">
                    <Button onclick={() => currentDialog = 'appProjectStats'} >
                        <Label>Project Stats</Label>
                    </Button>
                </div>
                <div class="col pb-2">
                    <div class="d-row align-items-center justify-end">
                        <IconButton onclick={() => currentPage > 1 ? currentPage -= 1 : currentPage = 11}><i class="mdi mdi-menu-left"></i></IconButton>
                        <span class="list-text px-2">Page {currentPage}</span>
                        <IconButton onclick={() => currentPage < 11 ? currentPage += 1 : currentPage = 1}><i class="mdi mdi-menu-right"></i></IconButton>
                    </div>
                </div>
            </div>
            <div class="row gy-2">
                <div class="col-sm-6 col-12">
                    <Button onclick={saveToDisk} variant="raised" >
                        <i class="mdi mdi-download mdc-button__icon"></i>
                        <Label>Save to Disk</Label>
                    </Button>
                </div>
                <div class="col-sm-6 col-12">
                    <input type="file" accept=".json, .zip" bind:this={fileInput} bind:files={valueTypeFiles} onchange={() => loadFromDisk(valueTypeFiles)} style="display: none;">
                    <Button onclick={() => fileInput.click()} variant="raised">
                        <i class="mdi mdi-upload mdc-button__icon"></i>
                        <Label>Load from Disk</Label>
                    </Button>
                </div>
                <div class="col-12">
                    <Button onclick={imageSeparation} variant="raised" >
                        <i class="mdi mdi-folder-arrow-down mdc-button__icon"></i>
                        <Label>Export Project with Separate Images</Label>
                    </Button>
                </div>
            </div>
        </Content>
        <Actions>
            <Button action="close">
                <Label class="dialog-actions--btn">Close</Label>
            </Button>
        </Actions>
</Dialog>
{#if currentDialog === 'dlgCommon'}
    <DlgCommon open={currentDialog === 'dlgCommon'} onclose={() => (currentDialog = 'none')} title={confirmDialog.title} context={confirmDialog.context} closeHandler={(e) => {
        if (e.detail.action === 'accept') {
            confirmDialog.action();
        }
    }}/>
{:else if currentDialog === 'appProjectStats'}
    <AppProjectStats open={currentDialog === 'appProjectStats'} onclose={() => (currentDialog = 'none')} />
{/if}

<script lang="ts">
    import AppProjectStats from './AppProjectStats.svelte';
    import Button, { Label } from '@smui/button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import DlgCommon from './DlgCommon.svelte';
    import IconButton from '@smui/icon-button';
    import Textfield from '$lib/custom/textfield';
    import JsZip from 'jszip';
    import type { App } from '$lib/store/types';
	import { app, autoSaveSlot, saveSlots, saveToSlot, deleteSlot, snackbarVariables, isDataURL, getDataURL, getTimestamp, removeNulls, initializeApp, loadFromDisk, AppSchema, appVersion, getSelectedObjectId } from '$lib/store/store.svelte';

    let { open, onclose }: { open: boolean; onclose: () => void } = $props();

    const confirmDialog = {
        action: () => {},
        title: 'Warning',
        context: ''
    };
    const slotsPerPage = 9;
    const totalSlots = 99;

    let currentDialog = $state<'none' | 'dlgCommon' | 'appProjectStats'>('none');
    let currentPage = $state(1);
    let pageStart = $derived((currentPage - 1) * slotsPerPage);
    let pageEnd = $derived((Math.min(pageStart + slotsPerPage - 1, totalSlots)));
    let slots = $derived(Array.from({ length: pageEnd - pageStart + 1}, (_, i) => saveSlots[pageStart + i]));
    
    let valueTypeFiles: FileList | null = $state(null);
    let fileInput: HTMLInputElement;

    function addImage(str: string, base64: string, imgMap: Map<string, string>, zip: JsZip) {
        const img = imgMap.get(base64);

        if (typeof img !== 'undefined') {
            return img;
        } else {
            imgMap.set(base64, str);
            zip.file(str, getDataURL(base64), { base64: true });
            return str;
        }
    }

    function imageSeparation() {
        try {
            const zip = new JsZip();
            const tempApp: App = removeNulls(JSON.parse(JSON.stringify(app)));
            const imgMap: Map<string, string> = new Map();
            const stylingKeys = [
                ['backgroundImage', 'Bg'],
                ['rowBackgroundImage', 'RBg'],
                ['objectBackgroundImage', 'OBg'],
                ['addonBackgroundImage', 'ABg'],
                ['rowBorderImage', 'RB'],
                ['objectBorderImage', 'OB'],
                ['addonBorderImage', 'AB']
            ];

            tempApp.version = appVersion;

            for (let i = 0; i < stylingKeys.length; i++) {
                const key = stylingKeys[i][0];
                const val = stylingKeys[i][1];
                const dataURL = tempApp.styling[key];

                if (dataURL && isDataURL(dataURL)) {
                    const mime = getMime(dataURL);
                    const ext = getExt(mime);
                    const path = `images/${val}.${ext}`;

                    tempApp.styling[key] = addImage(path, dataURL, imgMap, zip);
                }
            }

            for (let i = 0; i < tempApp.rows.length; i++) {
                const row = tempApp.rows[i];
                const rowStylingKeys = [
                    ['rowBackgroundImage', `R${i + 1}_RBg`],
                    ['objectBackgroundImage', `R${i + 1}_OBg`],
                    ['addonBackgroundImage', `R${i + 1}_ABg`],
                    ['rowBorderImage', `R${i + 1}_RB`],
                    ['objectBorderImage', `R${i + 1}_OB`],
                    ['addonBorderImage', `R${i + 1}_AB`]
                ];

                if (typeof row.styling !== 'undefined') {
                    for (let j = 0; j < rowStylingKeys.length; j++) {
                        const key = rowStylingKeys[j][0];
                        const val = rowStylingKeys[j][1];
                        const dataURL = row.styling[key];

                        if (dataURL && isDataURL(dataURL)) {
                            const mime = getMime(dataURL);
                            const ext = getExt(mime);
                            const path = `images/${val}.${ext}`;

                            row.styling[key] = addImage(path, dataURL, imgMap, zip);
                        }
                    }
                }

                if (row.image && isDataURL(row.image)) {
                    const mime = getMime(row.image);
                    const ext = getExt(mime);
                    const path = `images/R${i + 1}.${ext}`;

                    row.image = addImage(path, row.image, imgMap, zip);
                }

                if (typeof row.objects !== 'undefined') {
                    for (let j = 0; j < row.objects.length; j++) {
                        const choice = row.objects[j];
                        const choiceStylingKeys = [
                            ['objectBackgroundImage', `R${i + 1}C${j + 1}_OBg`],
                            ['objectBorderImage', `R${i + 1}C${j + 1}_OB`],
                            ['addonBackgroundImage', `R${i + 1}C${j + 1}_ABg`],
                            ['addonBorderImage', `R${i + 1}C${j + 1}_AB`]
                        ];

                        if (typeof choice.styling !== 'undefined') {
                            for (let k = 0; k < choiceStylingKeys.length; k++) {
                                const key = choiceStylingKeys[k][0];
                                const val = choiceStylingKeys[k][1];
                                const dataURL = choice.styling[key];

                                if (dataURL && isDataURL(dataURL)) {
                                    const mime = getMime(dataURL);
                                    const ext = getExt(mime);
                                    const path = `images/${val}.${ext}`;

                                    choice.styling[key] = addImage(path, dataURL, imgMap, zip);
                                }
                            }
                        }

                        if (choice.image && isDataURL(choice.image)) {
                            const mime = getMime(choice.image);
                            const ext = getExt(mime);
                            const path = `images/R${i + 1}C${j + 1}.${ext}`;

                            choice.image = addImage(path, choice.image, imgMap, zip);
                        }

                        if (typeof choice.addons !== 'undefined') {
                            for (let k = 0; k < choice.addons.length; k++) {
                                const addon = choice.addons[k];

                                if (addon.image && isDataURL(addon.image)) {
                                    const mime = getMime(choice.image);
                                    const ext = getExt(mime);
                                    const path = `images/R${i + 1}C${j + 1}A${k + 1}.${ext}`;

                                    addon.image = addImage(path, addon.image, imgMap, zip);
                                }
                            }
                        }
                    }
                }
            }

            if (typeof tempApp.backpack !== 'undefined') {
                for (let i = 0; i < tempApp.backpack.length; i++) {
                    const row = tempApp.backpack[i];
                    const rowStylingKeys = [
                        ['rowBackgroundImage', `BR${i + 1}_RBg`],
                        ['objectBackgroundImage', `BR${i + 1}_OBg`],
                        ['addonBackgroundImage', `BR${i + 1}_ABg`],
                        ['rowBorderImage', `BR${i + 1}_RB`],
                        ['objectBorderImage', `BR${i + 1}_OB`],
                        ['addonBorderImage', `BR${i + 1}_AB`]
                    ];

                    if (typeof row.styling !== 'undefined') {
                        for (let j = 0; j < rowStylingKeys.length; j++) {
                            const key = rowStylingKeys[j][0];
                            const val = rowStylingKeys[j][1];
                            const dataURL = row.styling[key];

                            if (dataURL && isDataURL(dataURL)) {
                                const mime = getMime(dataURL);
                                const ext = getExt(mime);
                                const path = `images/${val}.${ext}`;

                                row.styling[key] = addImage(path, dataURL, imgMap, zip);
                            }
                        }
                    }

                    if (row.image && isDataURL(row.image)) {
                        const mime = getMime(row.image);
                        const ext = getExt(mime);
                        const path = `images/BR${i + 1}.${ext}`;

                        row.image = addImage(path, row.image, imgMap, zip);
                    }

                    if (typeof row.objects !== 'undefined') {
                        for (let j = 0; j < row.objects.length; j++) {
                            const choice = row.objects[j];
                            const choiceStylingKeys = [
                                ['objectBackgroundImage', `BR${i + 1}C${j + 1}_OBg`],
                                ['objectBorderImage', `BR${i + 1}C${j + 1}_OB`],
                                ['addonBackgroundImage', `BR${i + 1}C${j + 1}_ABg`],
                                ['addonBorderImage', `BR${i + 1}C${j + 1}_AB`]
                            ];

                            if (typeof choice.styling !== 'undefined') {
                                for (let k = 0; k < choiceStylingKeys.length; k++) {
                                    const key = choiceStylingKeys[k][0];
                                    const val = choiceStylingKeys[k][1];
                                    const dataURL = choice.styling[key];

                                    if (dataURL && isDataURL(dataURL)) {
                                        const mime = getMime(dataURL);
                                        const ext = getExt(mime);
                                        const path = `images/${val}.${ext}`;

                                        choice.styling[key] = addImage(path, dataURL, imgMap, zip);
                                    }
                                }
                            }

                            if (choice.image && isDataURL(choice.image)) {
                                const mime = getMime(choice.image);
                                const ext = getExt(mime);
                                const path = `images/BR${i + 1}C${j + 1}.${ext}`;

                                choice.image = addImage(path, choice.image, imgMap, zip);
                            }

                            if (typeof choice.addons !== 'undefined') {
                                for (let k = 0; k < choice.addons.length; k++) {
                                    const addon = choice.addons[k];

                                    if (addon.image && isDataURL(addon.image)) {
                                        const mime = getMime(choice.image);
                                        const ext = getExt(mime);
                                        const path = `images/BR${i + 1}C${j + 1}A${k + 1}.${ext}`;

                                        addon.image = addImage(path, addon.image, imgMap, zip);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            if (typeof tempApp.rowDesignGroups !== 'undefined') {
                for (let i = 0; i < tempApp.rowDesignGroups.length; i++) {
                    const dGroup = tempApp.rowDesignGroups[i];
                    const rowStylingKeys = [
                        ['rowBackgroundImage', `RD${i + 1}_RBg`],
                        ['objectBackgroundImage', `RD${i + 1}_OBg`],
                        ['addonBackgroundImage', `RD${i + 1}_ABg`],
                        ['rowBorderImage', `RD${i + 1}_RB`],
                        ['objectBorderImage', `RD${i + 1}_OB`],
                        ['addonBorderImage', `RD${i + 1}_AB`]
                    ];

                    if (typeof dGroup.styling !== 'undefined') {
                        for (let j = 0; j < rowStylingKeys.length; j++) {
                            const key = rowStylingKeys[j][0];
                            const val = rowStylingKeys[j][1];
                            const dataURL = dGroup.styling[key];

                            if (dataURL && isDataURL(dataURL)) {
                                const mime = getMime(dataURL);
                                const ext = getExt(mime);
                                const path = `images/${val}.${ext}`;

                                dGroup.styling[key] = addImage(path, dataURL, imgMap, zip);
                            }
                        }
                    }
                }
            }

            if (typeof tempApp.objectDesignGroups !== 'undefined') {
                for (let i = 0; i < tempApp.objectDesignGroups.length; i++) {
                    const dGroup = tempApp.objectDesignGroups[i];
                    const choiceStylingKeys = [
                        ['objectBackgroundImage', `OD${i + 1}_OBg`],
                        ['addonBackgroundImage', `OD${i + 1}_ABg`],
                        ['objectBorderImage', `OD${i + 1}_OB`],
                        ['addonBorderImage', `OD${i + 1}_AB`]
                    ];

                    if (typeof dGroup.styling !== 'undefined') {
                        for (let j = 0; j < choiceStylingKeys.length; j++) {
                            const key = choiceStylingKeys[j][0];
                            const val = choiceStylingKeys[j][1];
                            const dataURL = dGroup.styling[key];

                            if (dataURL && isDataURL(dataURL)) {
                                const mime = getMime(dataURL);
                                const ext = getExt(mime);
                                const path = `images/${val}.${ext}`;

                                dGroup.styling[key] = addImage(path, dataURL, imgMap, zip);
                            }
                        }
                    }
                }
            }

            const saveData = JSON.stringify(tempApp);
            const blob = new Blob([saveData], { type: 'application/json' });

            zip.file('project.json', blob);
            zip.generateAsync({ type: 'blob' }).then(function (blob) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                const filename = `CYOA_${getTimestamp()}.zip`;
                
                a.href = url;
                a.download = filename;
                a.click();

                URL.revokeObjectURL(url);
            });
        } catch (error) {
            snackbarVariables.labelText = 'Failed to export project.';
            snackbarVariables.isOpen = true;
            console.error(error);
        }
    }

    function getMime(str: string) {
        const match = str.match(/^data:(image\/[^;]+);/);

        return match ? match[1] : str;
    }

    function getExt(str: string) {
        const ext = str.split('/')[1];
        const mt: Record<string, string> = {
            'svg+xml': 'svg',
            'vnd.microsoft.icon': 'ico',
            'x-icon': 'ico'
        };
        return mt[ext] ? mt[ext] : ext;
    }

    function loadApp(index: number) {
        const cleanedData = removeNulls(saveSlots[index].app);
        const parsed = AppSchema.safeParse(cleanedData);

        if (parsed.success) {
            initializeApp(parsed.data);
            snackbarVariables.labelText = 'Data loaded successfully.';
            snackbarVariables.isOpen = true;
        } else {
            snackbarVariables.labelText = 'Failed to load data.';
            snackbarVariables.isOpen = true;
            console.error(parsed.error);
        }
    }

    function loadAutoSave() {
        const cleanedData = removeNulls(autoSaveSlot.app);
        const parsed = AppSchema.safeParse(cleanedData);
        
        if (parsed.success) {
            initializeApp(parsed.data);
            snackbarVariables.labelText = 'Data loaded successfully.';
            snackbarVariables.isOpen = true;
        } else {
            snackbarVariables.labelText = 'Failed to load data.';
            snackbarVariables.isOpen = true;
            console.error(parsed.error);
        }
    }

    function saveToDisk() {
        app.activated = getSelectedObjectId().split(',');
        const tempApp = JSON.parse(JSON.stringify(app));
        tempApp.version = appVersion;

        const saveData = JSON.stringify(tempApp);
        const blob = new Blob([saveData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const filename = `project_${getTimestamp()}.json`;
        
        a.href = url;
        a.download = filename;
        a.click();

        URL.revokeObjectURL(url);
    }

    function saveApp(index: number) {
        app.activated = getSelectedObjectId().split(',');
        const tempApp = JSON.parse(JSON.stringify(app));
        tempApp.version = appVersion;

        const key = `${location.pathname.replace(/\/index\.html$/, '/')}slot-${index}`;
        const userLocale = navigator.language;
        const now = new Date();
        const formatter = new Intl.DateTimeFormat(userLocale, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        const currentTimeString = formatter.format(now);
        const slotData = {
            stored: true,
            name: saveSlots[index].name || `Slot-${index + 1}`,
            time: currentTimeString,
            app: tempApp
        }

        saveToSlot(slotData, key, index, 'cyoaStore');
    }

    function removeSave(index: number) {
        const key = `${location.pathname.replace(/\/index\.html$/, '/')}slot-${index}`;

        deleteSlot(key, index, 'cyoaStore');
    }

</script>