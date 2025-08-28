<Dialog
    bind:open
    surface$style="width: 600px; max-width: calc(100vw - 32px);"
    escapeKeyAction={currentDialog === 'none' ? 'close' : ''}
    onSMUIDialogClosed={onclose}
    style={dialogStyle}
>
    <Title class="text-left dialog-title" tabindex={0} autofocus>
        Global Settings
    </Title>
    <Content>
        <TabBar tabs={['General', 'Advanced', 'Display', 'Fonts']} bind:active>
            {#snippet tab(tab: any)}
                <Tab {tab}>
                    <TabLabel>{tab}</TabLabel>
                </Tab>
            {/snippet}
        </TabBar>

        {#if active === 'General'}
            <Paper role="tabpanel" variant="unelevated">
                <PaperContent>
                    <div class="container-fluid p-0">
                        <div class="row gy-3">
                            <div class="col-12">
                                <FormField>
                                    <Switch bind:checked={() => app.autoSaveIsOn ?? false, (e) => app.autoSaveIsOn = e} onSMUISwitchChange={() => {
                                        if (app.autoSaveIsOn) {
                                            saveProcess();
                                        }
                                    }} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Enable Auto Save
                                    {/snippet}
                                </FormField>
                            </div>
                            {#if app.autoSaveIsOn}
                                <div class="col-12 px-3 mt-0">
                                    <Textfield bind:value={() => app.autoSaveInterval ?? 10, (e) => app.autoSaveInterval = e} label="Auto Save Interval" type="number" suffix="min" variant="standard" style="max-width: 200px" input$class="text-right" input$min="1" onchange={() => {
                                        if (app.autoSaveInterval < 1) {
                                            app.autoSaveInterval = 1;
                                        }
                                        saveProcess();
                                    }} />
                                </div>
                            {/if}
                            <div class="col-12">
                                <FormField>
                                    <Switch bind:checked={() => app.enableShortcut ?? false, (e) => app.enableShortcut = e} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Enable Mode Switch Shortcuts
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class="col-12">
                                <FormField>
                                    <Switch bind:checked={() => app.importedChoicesIsOpen ?? false,(e) => app.importedChoicesIsOpen = e} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Enable the Save/Load Build Feature
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class="col-12">
                                <FormField>
                                    <Switch bind:checked={() => app.useChoiceEditBtn ?? false, (e) => app.useChoiceEditBtn = e} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Enable Edit Button for Choice
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class="col-12">
                                <FormField>
                                    <Switch bind:checked={() => app.checkDeleteRow ?? false, (e) => app.checkDeleteRow = e} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Confirm Before Deleting a Row
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class="col-12">
                                <FormField>
                                    <Switch bind:checked={() => app.checkDeleteObject ?? false, (e) => app.checkDeleteObject = e} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Confirm Before Deleting a Choice
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class="col-12">
                                <FormField>
                                    <Switch bind:checked={() => app.checkSelectAll ?? false, (e) => app.checkSelectAll = e} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Confirm Before Select/Deselect All
                                    {/snippet}
                                </FormField>
                            </div>
                        </div>
                    </div>
                </PaperContent>
            </Paper>
        {:else if active === 'Advanced'}
            <Paper role="tabpanel" variant="unelevated">
                <PaperContent>
                    <div class="container-fluid p-0">
                        <div class="row gy-3">
                            <div class="col-12">
                                <FormField>
                                    <Switch bind:checked={() => app.compressImageAuto ?? false, (e) => app.compressImageAuto = e} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Enable Auto Image Compression
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class="col-12">
                                <FormField>
                                    <Switch bind:checked={() => app.useTextEditor ?? false, (e) => app.useTextEditor = e} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Enable Text Editor
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class="col-12">
                                <FormField>
                                    <Switch bind:checked={() => app.preloadImages ?? false, (e) => app.preloadImages = e} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Preload Images in Backpack
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class="col-12">
                                <FormField>
                                    <Switch bind:checked={() => app.preloadExternalImages ?? false, (e) => app.preloadExternalImages = e} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Preload External Images in Viewer
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class="col-12">
                                <FormField>
                                    <Switch bind:checked={() => app.useVW ?? false, (e) => app.useVW = e} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Use Viewport Units for Default Font Size
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class="col-12">
                                <FormField>
                                    <Switch bind:checked={() => app.isPointerCursor ?? false, (e) => app.isPointerCursor = e} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Use Pointer Cursor on Hover Over Choices
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class="col-12">
                                <FormField>
                                    <Switch bind:checked={() => app.addPrefix ?? false, (e) => app.addPrefix = e} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Add Prefix to ID on Creation
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class="col-12 px-3">
                                <Textfield bind:value={() => app.rowIdLength ?? 4, (e) => app.rowIdLength = e} label="Length of Row Id to be generated" type="number" variant="standard" input$min="4" onchange={() => {
                                    if (app.rowIdLength < 4) {
                                        app.rowIdLength = 4;
                                    }
                                }} />
                            </div>
                            <div class="col-12 px-3">
                                <Textfield bind:value={() => app.objectIdLength ?? 4, (e) => app.objectIdLength = e} label="Length of Choice Id to be generated" type="number" variant="standard" input$min="4" onchange={() => {
                                    if (app.objectIdLength < 4) {
                                        app.objectIdLength = 4;
                                    }
                                }} />
                            </div>
                            <div class="col-12">
                                <Button onclickcapture={() => currentDialog = 'appCustomCss'} variant="raised" >
                                    <Label>Open Custom CSS</Label>
                                </Button>
                            </div>
                        </div>
                    </div>
                </PaperContent>
            </Paper>
        {:else if active === 'Display'}
            <Paper role="tabpanel" variant="unelevated">
                <PaperContent>
                    <div class="container-fluid p-0">
                        <div class="row gy-3">
                            <div class="col-12">
                                <Select bind:value={app.objectsPerRow} label="Choices Per Row" variant="standard" alwaysFloat={true}>
                                    {#each objectWidths as objectWidth (objectWidth.text)}
                                        <Option value={objectWidth.value}>{objectWidth.text}</Option>
                                    {/each}
                                    {#snippet helperText()}
                                        Maximum Number of Choices per Row for Screens Between 720px and 1280px.
                                    {/snippet}
                                </Select>
                            </div>
                            <div class="col-12">
                                <FormField>
                                    <Switch bind:checked={() => app.hideScoresUpdated?? false, (e) => app.hideScoresUpdated = e} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Hide 'Scores Updated On' Message
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class="col-12">
                                <FormField>
                                    <Switch bind:checked={() => app.hideChoiceDT?? false, (e) => app.hideChoiceDT = e} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Hide Debug Title of Choices
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class="col-12">
                                <FormField>
                                    <Switch bind:checked={() => app.hideImages?? false, (e) => app.hideImages = e} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Hide Images in the Edit Mode
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class="col-12">
                                <FormField>
                                    <Switch bind:checked={() => app.showMusicPlayer?? false, (e) => app.showMusicPlayer = e} color="secondary" class="switch-scale" onSMUISwitchChange={() => {
                                        if (app.showMusicPlayer) {
                                            const player = get(bgmPlayer);

                                            if (player) {
                                                let bgmTime = 0;
                                                let checkTime = 0;

                                                if (bgmVariables.bgmTitleInterval !== 0) {
                                                    clearInterval(bgmVariables.bgmTitleInterval);
                                                    bgmVariables.bgmTitleInterval = 0;
                                                }
                                                bgmVariables.bgmTitleInterval = window.setInterval(() => {
                                                    if (typeof player.playerInfo.videoData !== 'undefined' && bgmVariables.bgmObjectId !== '') {
                                                        const cMap = choiceMap.get(bgmVariables.bgmObjectId);

                                                        if (typeof cMap !== 'undefined') {
                                                            const choice = cMap.choice;

                                                            if (player.playerInfo.videoData.video_id === choice.bgmId && typeof player.playerInfo.videoData.title !== 'undefined' && player.playerInfo.videoData.title !== '') {
                                                                bgmVariables.bgmTitle = player.playerInfo.videoData.title;
                                                                bgmVariables.curBgmLength = player.getDuration();
                                                                clearInterval(bgmVariables.bgmTitleInterval);
                                                                bgmVariables.bgmTitleInterval = 0;
                                                            }
                                                        }
                                                    }
                                                }, 1000);
                                                if (bgmVariables.bgmPlayInterval !== 0) {
                                                    clearInterval(bgmVariables.bgmPlayInterval);
                                                    bgmVariables.bgmPlayInterval = 0;
                                                }
                                                bgmVariables.bgmPlayInterval = window.setInterval(() => {
                                                    if (typeof player.playerInfo.videoData !== 'undefined' && !bgmVariables.isSeeking && player.getPlayerState() === 1) {
                                                        const curTime = Math.floor(player.getCurrentTime());

                                                        if (curTime !== bgmVariables.curBgmTime) {
                                                            if (bgmTime !== curTime) {
                                                                bgmVariables.curBgmTime = curTime
                                                            } else {
                                                                checkTime++;
                                                                if (checkTime > bgmVariables.curBgmLength) checkTime = 1;
                                                                bgmVariables.curBgmTime = checkTime;
                                                            }
                                                        } else {
                                                            bgmTime = curTime;
                                                            checkTime = curTime + 1;
                                                            bgmVariables.curBgmTime = checkTime;
                                                        }
                                                    }
                                                }, 1000);
                                            }
                                        } else {
                                            if (bgmVariables.bgmIsPlaying) {
                                                if (bgmVariables.bgmTitleInterval !== 0) {
                                                    clearInterval(bgmVariables.bgmTitleInterval);
                                                    bgmVariables.bgmTitleInterval = 0;
                                                }
                                                if (bgmVariables.bgmPlayInterval !== 0) {
                                                    clearInterval(bgmVariables.bgmPlayInterval);
                                                    bgmVariables.bgmPlayInterval = 0;
                                                }
                                            }
                                        }
                                    }} />
                                    {#snippet label()}
                                        Show Background Music Player
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class="col-12">
                                <FormField>
                                    <Switch bind:checked={() => app.useToolbarBtn ?? false, (e) => app.useToolbarBtn = e} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Use Toolbar Button to Add Row
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class="col-12">
                                <FormField>
                                    <Switch bind:checked={() => useAltMenu.value ?? false, (e) => useAltMenu.value = e} onSMUISwitchChange={toggleAltMenu} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Show Menu on Top
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class="col-12 px-3">
                                <Textfield bind:value={() => app.tooltipDelay ?? 1000, (e) => app.tooltipDelay = e} label="Tooltip Delay (Image)" type="number" variant="standard" suffix="ms" input$min="0" input$class="text-right" onchange={() => {
                                    if (typeof app.tooltipDelay !== 'undefined' && app.tooltipDelay < 0) {
                                        app.tooltipDelay = 0;
                                    }
                                }} />
                            </div>
                        </div>
                    </div>
                </PaperContent>
            </Paper>
        {:else if active === 'Fonts'}
            <Paper role="tabpanel" variant="unelevated">
                <PaperContent>
                    <div class="container-fluid p-0">
                        <div class="row gy-3">
                            <div class="col-12">
                                <FormField>
                                    <Switch bind:checked={importFromUrl} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Import Custom Font from URL
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class="col-12 px-3">
                                <Textfield bind:value={importField} label={importFromUrl ? 'Font URL' : 'Font Name'} input$onkeydown={(e) => {if(e.key === 'Enter') importFont()}} variant="standard">
                                    {#snippet helper()}
                                        <HelperText persistent>
                                            {#if importFromUrl}
                                                Enter the URL of the CSS file to import. (e.g. https://yourlink/font.css)<br>The URL must support cross-origin requests (CORS).
                                            {:else}
                                                Enter the name of a font available on Google Fonts.
                                            {/if}
                                        </HelperText>
                                    {/snippet}
                                </Textfield>
                            </div>
                            <div class="col-12">
                                <Button onclickcapture={importFont} variant="raised" >
                                    <Label>Import</Label>
                                </Button>
                            </div>
                            <div class="col-10">
                                {#if importFromUrl}
                                    <Select bind:value={fontUrl} label="Font URL" variant="standard">
                                        <Option value="" />
                                        {#each app.customFonts as font}
                                            <Option value={font}>{font}</Option>
                                        {/each}
                                    </Select>
                                {:else}
                                    <Select bind:value={fontName} label="Google Fonts" variant="standard">
                                        <Option value="Times New Roman">Times New Roman</Option>
                                        {#each app.googleFonts as font}
                                            <Option value={font}>{font}</Option>
                                        {/each}
                                    </Select>
                                {/if}
                            </div>
                            <div class="col-2 d-flex align-items-center justify-center">
                                <IconButton onclickcapture={deleteFont} disabled={(!importFromUrl && fontName === 'Times New Roman') || (importFromUrl && fontUrl === '')}><i class="mdi mdi-trash-can"></i></IconButton>
                            </div>
                            {#if importFromUrl}
                                <div class="col-12">
                                    <Textfield bind:value={fontName} label='Font Name' variant="standard" />
                                </div>
                            {/if}
                            <div class="col-12">
                                <span style={loremStyle}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
                            </div>
                        </div>
                    </div>
                </PaperContent>
            </Paper>
        {/if}
    </Content>
    <Actions>
        <Button action="close">
            <Label class="dialog-actions--btn">Close</Label>
        </Button>
    </Actions>
</Dialog>
{#if currentDialog === 'appCustomCss'}
    <AppCustomCSS open={currentDialog === 'appCustomCss'} onclose={() => (currentDialog = 'none')} />
{/if}
<script lang="ts">
    import Button, { Label } from '@smui/button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import FormField from '@smui/form-field';
    import HelperText from '$lib/custom/textfield/helper-text/HelperText.svelte';
    import IconButton from '@smui/icon-button';
    import Paper, { Content as PaperContent } from '@smui/paper';
    import Select, { Option } from '$lib/custom/select';
    import Switch from '@smui/switch';
    import Tab, { Label as TabLabel } from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    import Textfield from '$lib/custom/textfield';
    import AppCustomCSS from './AppCustomCSS.svelte';
	import { app, bgmPlayer, bgmVariables, choiceMap, textFonts, autoSave, cyoaAbortController, snackbarVariables, useAltMenu, toggleAltMenu } from '$lib/store/store.svelte';
	import { get } from 'svelte/store';

    let { open, onclose }: { open: boolean; onclose: () => void; } = $props();
    const objectWidths = [{
        text: "2 Per Row",
        value: "col-6"
    }, {
        text: "3 Per Row",
        value: "col-4"
    }, {
        text: "4 Per Row",
        value: "col-3"
    }];
    let active = $state('General');
    let importFromUrl = $state(false);
    let importField = $state('');
    let fontUrl = $state('');
    let fontName = $state('Times New Roman');
    let currentDialog = $state<'none' | 'appCustomCss'>('none');

    let loremStyle = $derived(`font-family: '${fontName}'`);
    let dialogStyle = $derived.by(() => {
        let styles: string[] = [];

        styles.push('transition:opacity 0.1s;');
        if (currentDialog !== 'none') {
            styles.push('opacity: 0;');
        }
        
        return styles.join(' ');
    });

    function saveProcess() {
        if (cyoaAbortController) {
            cyoaAbortController.abort();
        }
        autoSave();
    }

    async function importFont() {
        if (importFromUrl) {
            const idx = app.customFonts.indexOf(importField);
            if (importField !== '') {
                if (idx === -1) {
                    try {
                        const res = await fetch(importField, { method: 'GET', mode: 'cors' });

                        if (res.ok) {
                            const tag = document.createElement('link');
                            tag.id = importField;
                            tag.rel = 'stylesheet';
                            tag.href = importField;
                            tag.crossOrigin = 'anonymous';
                            document.head.appendChild(tag);
                            app.customFonts.push(importField);
                            snackbarVariables.labelText = 'Font imported successfully.'
                        } else {
                            snackbarVariables.labelText = 'Unable to access the URL. Please check the URL.';
                            snackbarVariables.isOpen = true;
                            console.log(res.status);
                        }
                    } catch (error) {
                        snackbarVariables.labelText = 'Unable to access the URL. This might be due to a network issue or CORS restriction.';
                        snackbarVariables.isOpen = true;
                        console.log(error);
                    }
                } else {
                    snackbarVariables.labelText = 'This URL has already been added.';
                    snackbarVariables.isOpen = true;
                }
            } else {
                snackbarVariables.labelText = 'Please enter a URL.';
                snackbarVariables.isOpen = true;
            }
        } else {
            const idx = app.googleFonts.indexOf(importField);
            if (importField !== '') {
                if (idx === -1) {
                    const fontId = importField.replace(/ /g, '+');
                    console.log(fontId);
                    const url = `https://fonts.googleapis.com/css2?family=${fontId}&display=swap`;

                    try {
                        const res = await fetch(url, { method: 'GET', mode: 'cors' });

                        if (res.ok) {
                            const tag = document.createElement('link');
                            tag.id = fontId;
                            tag.rel = 'stylesheet';
                            tag.href = url;
                            tag.crossOrigin = 'anonymous';
                            document.head.appendChild(tag);
                            app.googleFonts.push(importField);
                            textFonts.push(importField);
                            snackbarVariables.labelText = 'Font imported successfully.';
                            snackbarVariables.isOpen = true;
                        } else {
                            snackbarVariables.labelText = 'Unable to load the font. Please check the font name.';
                            snackbarVariables.isOpen = true;
                            console.log(res.status);
                        }
                    } catch (error) {
                        snackbarVariables.labelText = 'Unable to access the Google Fonts. Please check the font name.';
                        snackbarVariables.isOpen = true;
                        console.log(error);
                    }
                } else {
                    snackbarVariables.labelText = 'This font has already been added.';
                    snackbarVariables.isOpen = true;
                }
            } else {
                snackbarVariables.labelText = 'Please enter a Font name.';
                snackbarVariables.isOpen = true;
            }
        }
    }

    function deleteFont() {
        if (importFromUrl) {
            const cIdx = app.customFonts.indexOf(fontUrl);
            const tag = document.getElementById(fontUrl);

            fontUrl = '';

            if (cIdx !== -1) {
                app.customFonts.splice(cIdx, 1);
            }

            if (tag) {
                tag.remove();
            }
        } else {
            const fontId = fontName.replace(/ /g, '+');
            const gIdx = app.googleFonts.indexOf(fontName);
            const tIdx = textFonts.indexOf(fontName);
            const tag = document.getElementById(fontId);

            fontName = 'Times New Roman';

            if (gIdx !== -1) {
                app.googleFonts.splice(gIdx, 1);
            }

            if (tIdx !== -1) {
                textFonts.splice(tIdx, 1);
            }

            if (tag) {
                tag.remove();
            }
        }
    }
</script>