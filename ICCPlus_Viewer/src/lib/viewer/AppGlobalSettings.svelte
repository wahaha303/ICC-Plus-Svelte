<Dialog
    bind:open
    surface$style="width: 600px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
>
    <Title class="text-left dialog-title" tabindex={0} autofocus>
        Settings
    </Title>
    <Content>
        <TabBar tabs={['General', 'About']} bind:active>
            {#snippet tab(tab)}
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
                                <Select bind:value={app.objectsPerRow} label="Choices per row" variant="standard" alwaysFloat={true}>
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
                                    <Switch bind:checked={() => app.buildAutoSaveIsOn || false, (e) => app.buildAutoSaveIsOn = e} onSMUISwitchChange={() => {
                                        if (app.buildAutoSaveIsOn) {
                                            saveProcess();
                                        }
                                    }} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Enable Auto Save
                                    {/snippet}
                                </FormField>
                            </div>
                            {#if app.buildAutoSaveIsOn}
                                <div class="col-12 px-3 mt-0">
                                    <Textfield bind:value={() => app.buildAutoSaveInterval || 10, (e) => app.buildAutoSaveInterval = e} label="Auto Save Interval" type="number" suffix="min" variant="standard" style="max-width: 200px" input$class="text-right" input$min="1" onchange={() => {
                                        if (app.buildAutoSaveInterval < 1) {
                                            app.buildAutoSaveInterval = 1;
                                        }
                                        saveProcess();
                                    }} />
                                </div>
                            {/if}
                            <div class="col-12">
                                <FormField>
                                    <Switch bind:checked={() => app.preloadImages || false, (e) => app.preloadImages = e} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Preload Images in Backpack
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class="col-12">
                                <FormField>
                                    <Switch bind:checked={viewerSettings.allowDeselect} onSMUISwitchChange={allowDeselectInBackpack} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Allow Deselecting Choices in Backpack
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class="col-12">
                                <Wrapper text="Enabling this option may cause image downloads to fail or reduce the image resolution.">
                                    <FormField>
                                        <Switch bind:checked={viewerSettings.isSingleFile} color="secondary" class="switch-scale" />
                                        {#snippet label()}
                                            Download Images as Single File
                                        {/snippet}
                                    </FormField>
                                </Wrapper>
                            </div>
                            <div class="col-12">
                                <FormField>
                                    <Switch bind:checked={() => app.showMusicPlayer || false, (e) => app.showMusicPlayer = e} color="secondary" class="switch-scale" onchange={() => {
                                        if (app.showMusicPlayer) {
                                            const player = get(musicPlayer);

                                            if (player) {
                                                let bgmTime = 0;
                                                let checkTime = 0;

                                                if (bgmVariables.bgmTitleInterval !== 0) {
                                                    clearInterval(bgmVariables.bgmTitleInterval);
                                                    bgmVariables.bgmTitleInterval = 0;
                                                }
                                                bgmVariables.bgmTitleInterval = window.setInterval(() => {
                                                    if (bgmVariables.bgmObjectId !== '') {
                                                        const cMap = choiceMap.get(bgmVariables.bgmObjectId);

                                                        if (typeof cMap !== 'undefined') {
                                                            const choice = cMap.choice;

                                                            if (player.getId() === choice.bgmId && player.getTitle() !== '') {
                                                                bgmVariables.bgmTitle = player.getTitle();
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
                                                    if (!bgmVariables.isSeeking && player.isPlaying()) {
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
                                <Select bind:value={app.cropperPosition} label="Image Cropper Position" variant="standard" alwaysFloat={true}>
                                    {#each positions as position (position.text)}
                                        <Option value={position.value}>{position.text}</Option>
                                    {/each}
                                    {#snippet helperText()}
                                        Default position of the image cropper
                                    {/snippet}
                                </Select>
                            </div>
                            <div class="col-12">
                                <Textfield bind:value={() => app.styling.backPackWidth || 1200, (e) => app.styling.backPackWidth = e} label="Backpack Width" type="number" suffix="px" variant="standard" input$min="0" onchange={() => {
                                    if (typeof app.styling.backPackWidth !== 'undefined' && app.styling.backPackWidth < 0) {
                                        app.styling.backPackWidth = 0;
                                    }
                                }} />
                            </div>
                        </div>
                    </div>
                </PaperContent>
            </Paper>
        {:else if active === 'About'}
            <Paper role="tabpanel" variant="unelevated">
                <PaperTitle class="text-center">
                    <b>Interactive CYOA Creator Plus</b>
                </PaperTitle>
                <PaperContent>
                    <div class="container-fluid p-0">
                        <div class="row gy-3">
                            <div class="col-12 text-right">
                                v{appVersion}<br>
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
<script lang="ts">
    import Button, { Label } from '@smui/button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import FormField from '@smui/form-field';
    import Paper, { Title as PaperTitle, Content as PaperContent } from '@smui/paper';
    import Select, { Option } from '$lib/custom/select';
    import Switch from '@smui/switch';
    import Tab, { Label as TabLabel } from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    import Textfield from '$lib/custom/textfield';
	import { app, musicPlayer, bgmVariables, choiceMap, buildAutoSave, buildAbortController, appVersion, viewerSettings } from '$lib/store/store.svelte';
	import { get } from 'svelte/store';
    import { Wrapper } from '$lib/custom/tooltip';

    let { open, onclose }: { open: boolean; onclose: () => void; } = $props();
    const objectWidths = [{
        text: "2 per row",
        value: "col-6"
    }, {
        text: "3 per row",
        value: "col-4"
    }, {
        text: "4 per row",
        value: "col-3"
    }];
    const positions = [{
        text: 'top-left',
        value: 0
    }, {
        text: 'top-center',
        value: 1
    }, {
        text: 'top-right',
        value: 2
    }, {
        text: 'middle-left',
        value: 3
    }, {
        text: 'center',
        value: 4
    }, {
        text: 'middle-right',
        value: 5
    }, {
        text: 'bottom-left',
        value: 6
    }, {
        text: 'bottom-center',
        value: 7
    }, {
        text: 'bottom-right',
        value: 8
    }];
    let active = $state('General');

    function saveProcess() {
        if (buildAbortController) {
            buildAbortController.abort();
        }
        buildAutoSave();
    }

    function allowDeselectInBackpack() {
        const check = viewerSettings.allowDeselect;
        for (let i = 0; i < app.backpack.length; i++) {
            const row = app.backpack[i];

            if (row.isResultRow) {
                row.isInfoRow = !check;
            }
        }
    }
</script>