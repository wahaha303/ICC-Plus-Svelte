<Dialog
    bind:open
    surface$style="width: 700px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
    id="dialog"
>
        <Title class="text-left dialog-title" tabindex={0} autofocus>
            Save/Load Build
        </Title>
        <Content class="pt-3">
            <div class="container-fluid pb-2 mb-2" style="border: 1px solid">
                {#if isLegacy}
                    {#each legacySlots as slot, i}
                        {#if slot.stored}
                            <div class="row gx-0" style="border-bottom: 1px solid">
                                <div class="col-sm-1 col-2 d-flex align-items-center justify-center">
                                    <IconButton onclickcapture={() => {confirmDialog.action = () => loadLegacySave(i); confirmDialog.context = "Are you sure you want to load this build?<br>Any unsaved changes will be lost."; currentDialog = "dlgCommon";}}><i class="mdi mdi-play"></i></IconButton>
                                </div>
                                <div class="col-sm-10 col-8">
                                    <div class="col-12 pt-1">
                                        <div>{slot.name}</div>
                                        <div>{slot.time}</div>
                                    </div>
                                </div>
                                <div class="col-sm-1 col-2 d-flex align-items-center justify-center">
                                    <IconButton onclickcapture={() => copyBuildCode(i)}><i class="mdi mdi-clipboard-outline"></i></IconButton>
                                </div>
                            </div>
                        {:else}
                            <div class="row gx-0" style="border-bottom: 1px solid">
                                <div class="col-12" style="height: 48px">
                                    Empty
                                </div>
                            </div>
                        {/if}
                    {/each}
                {:else}
                    {#if buildAutoSaveSlot.stored}
                        <div class="row gx-0" style="border-bottom: 1px solid">
                            <div class="col-sm-1 col-2 d-flex align-items-center justify-center">
                                <IconButton onclickcapture={() => {confirmDialog.action = () => loadAutoSave(); confirmDialog.context = "Are you sure you want to load this build?<br>Any unsaved changes will be lost."; currentDialog = "dlgCommon";}}><i class="mdi mdi-alpha-a-box-outline"></i></IconButton>
                            </div>
                            <div class="col-sm-11 col-10">
                                <div class="col-12 pt-1">
                                    <div>{buildAutoSaveSlot.name}</div>
                                    <div>{buildAutoSaveSlot.time}</div>
                                </div>
                            </div>
                        </div>
                    {/if}
                    {#each slots as slot, i}
                        {#if slot.stored}
                            <div class="row gx-0" style="border-bottom: 1px solid">
                                <div class="col-sm-1 col-2 d-flex align-items-center justify-center">
                                    <IconButton onclickcapture={() => {confirmDialog.action = () => loadApp(i); confirmDialog.context = "Are you sure you want to load this build?<br>Any unsaved changes will be lost."; currentDialog = "dlgCommon";}}><i class="mdi mdi-play"></i></IconButton>
                                </div>
                                <div class="col-sm-10 col-8">
                                    <div class="col-12 pt-1">
                                        <div>{slot.name}</div>
                                        <div>{slot.time}</div>
                                    </div>
                                </div>
                                <div class="col-sm-1 col-2 d-flex align-items-center justify-center">
                                    <IconButton onclickcapture={() => {confirmDialog.action = () => removeSave(i); confirmDialog.context = "Are you sure you want to delete this build?<br>This action cannot be undone."; currentDialog = "dlgCommon";}}><i class="mdi mdi-trash-can"></i></IconButton>
                                </div>
                            </div>
                        {:else}
                            <div class="row gx-0" style="border-bottom: 1px solid">
                                <div class="col-sm-1 col-2 d-flex align-items-center justify-center">
                                    <IconButton onclickcapture={() => saveApp(i)}><i class="mdi mdi-content-save"></i></IconButton>
                                </div>
                                <div class="col-sm-11 col-10">
                                    <div class="col-12">
                                        <Textfield bind:value={slot.name} onclickcapture={() => slot.name = ''} onblur={() => {if (slot.name === '') slot.name = `Slot ${i + 1}`}} input$onkeydown={(e) => {if(e.key === 'Enter') saveApp(i)}} class="textbox-mini" variant="standard" />
                                    </div>
                                </div>
                            </div>
                        {/if}
                    {/each}
                {/if}
            </div>
            <div class="row gy-2">
                <div class="col pb-2">
                    <FormField style="height: 48px">
                        <Switch bind:checked={isLegacy} onSMUISwitchChange={() => currentPage = 1} color="secondary" class="switch-scale" />
                        {#snippet label()}
                            Load from Legacy Version
                        {/snippet}
                    </FormField>
                </div>
                <div class="col pb-2">
                    <div class="d-row align-items-center justify-end">
                        <IconButton onclickcapture={() => currentPage > 1 ? currentPage -= 1 : currentPage = 11}><i class="mdi mdi-menu-left"></i></IconButton>
                        <span class="list-text px-2">Page {currentPage}</span>
                        <IconButton onclickcapture={() => currentPage < 11 ? currentPage += 1 : currentPage = 1}><i class="mdi mdi-menu-right"></i></IconButton>
                    </div>
                </div>
            </div>
            <div class="row gy-2">
                <div class="col-12">
                    <Button onclickcapture={() => currentDialog = 'appBuildForm'} variant="raised" >
                        <Label>Open Build Form</Label>
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
{:else if currentDialog === 'appBuildForm'}
    <AppBuildForm open={currentDialog === 'appBuildForm'} onclose={() => (currentDialog = 'none')} />
{/if}

<script lang="ts">
    import Button, { Label } from '@smui/button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import DlgCommon from './DlgCommon.svelte';
    import FormField from '@smui/form-field';
    import IconButton from '@smui/icon-button';
    import Switch from '@smui/switch';
    import Textfield from '$lib/custom/textfield';
    import AppBuildForm from './AppBuildForm.svelte';
	import { buildAutoSaveSlot, buildSaveSlots, saveToSlot, deleteSlot, getSelectedObjectId, loadActivated, oldSaveSlots, snackbarVariables, loadFromSlot } from '$lib/store/store.svelte';

    let { open, onclose }: { open: boolean; onclose: () => void } = $props();

    const confirmDialog = {
        action: () => {},
        title: 'Warning',
        context: ''
    };
    const slotsPerPage = 9;
    const totalSlots = 99;

    let currentDialog = $state<'none' | 'appBuildForm' | 'dlgCommon'>('none');
    let currentPage = $state(1);
    let pageStart = $derived((currentPage - 1) * slotsPerPage);
    let pageEnd = $derived((Math.min(pageStart + slotsPerPage - 1, totalSlots)));
    let slots = $derived(Array.from({ length: pageEnd - pageStart + 1}, (_, i) => buildSaveSlots[pageStart + i]));
    let legacySlots = $derived(Array.from({ length: pageEnd - pageStart + 1}, (_, i) => oldSaveSlots[pageStart + i]));
    let isLegacy = $state(false);

    async function loadApp(index: number) {
        const key = `${location.pathname.replace(/\/index\.html$/, '/')}slot-${index}`;
        const data = await loadFromSlot(key, 'buildStore');
        loadActivated(data.app);
    }

    async function loadAutoSave() {
        const key = `${location.pathname.replace(/\/index\.html$/, '/')}autoSave`;
        const data = await loadFromSlot(key, 'buildStore');
        loadActivated(data.app);
    }

    async function loadLegacySave(index: number) {
        const key = legacySlots[index].name;
        const data = await loadFromSlot(key, 'buildStore', true);
        const result = Array.isArray(data.value) ? data.value.join(',') : data.value;
        loadActivated(result);
    }

    async function copyBuildCode(index: number) {
        const key = legacySlots[index].name;
        const data = await loadFromSlot(key, 'buildStore', true);
        const text = Array.isArray(data.value) ? data.value.join(',') : data.value;

        navigator.clipboard.writeText(text).then(() => {
            snackbarVariables.labelText = 'Build code copied to clipboard.'
            snackbarVariables.isOpen = true;
        }).catch(error => {
            snackbarVariables.labelText = 'Failed to copy build code to clipboard.'
            snackbarVariables.isOpen = true;
            console.error(error);
        })
    }

    function saveApp(index: number) {
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
            name: buildSaveSlots[index].name,
            time: currentTimeString,
            app: getSelectedObjectId()
        }

        saveToSlot(slotData, key, index, 'buildStore', true);
    }

    function removeSave(index: number) {
        const key = `${location.pathname.replace(/\/index\.html$/, '/')}slot-${index}`;

        deleteSlot(key, index, 'buildStore', true);
    }

</script>