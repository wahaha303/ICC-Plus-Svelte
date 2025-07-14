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
                                <Select bind:value={app.objectsPerRow} label="Choices Per Row" variant="standard" alwaysFloat={true}>
                                    {#each objectWidths as objectWidth (objectWidth.text)}
                                        <Option value={objectWidth.value}>{objectWidth.text}</Option>
                                    {/each}
                                    {#snippet helperText()}
                                        Maximum number of choices per row for screens between 720px and 1280px.
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
                                <FormField>
                                    <Switch bind:checked={() => app.showMusicPlayer || false, (e) => app.showMusicPlayer = e} color="secondary" class="switch-scale" onchange={() => {
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
	import { app, bgmPlayer, bgmVariables, choiceMap, buildAutoSave, buildAbortController, appVersion, viewerSettings } from '$lib/store/store.svelte';
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