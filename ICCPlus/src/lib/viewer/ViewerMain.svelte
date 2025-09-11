<div bind:clientWidth={width} bind:this={thisDiv} class="ab-0" style={background}>
    <div class="fadeOverlay" style={fadeStyle}></div>
    <TopAppBar class="viewer-menu" style={viewerMenuStyle} variant="static">
        <AppBarRow>
            <AppBarSection class="py-0 justify-left">
                <div class="col-8">
                    <IconButton onclick={() => currentComponent.value = 'appMain'} size="mini">
                        <i class="mdi mdi-chevron-left"></i>
                    </IconButton>
                </div>
                <div class="col-2">
                    <Button onclickcapture={() => downloadAsImage(thisDiv)} variant="unelevated">
                        <BtnIcon class="mdi mdi-file-image" />
                        <Label>Download Image</Label>
                    </Button>
                </div>
                <div class="col-2">
                    <input type="file" accept=".json, .zip" bind:this={fileInput} bind:files={valueTypeFiles} onchange={() => loadFromDisk(valueTypeFiles)} style="display: none;">
                    <Button onclickcapture={() => fileInput?.click()} variant="unelevated">
                        <BtnIcon class="mdi mdi-upload" />
                        <Label>Load Project</Label>
                    </Button>
                </div>
            </AppBarSection>
        </AppBarRow>
    </TopAppBar>
    <Drawer bind:open={menuOpen} style="top: 0;" variant="modal">
        <Content class="navigation-drawer">
            <List>
                <Item onSMUIAction={() => menuOpen = false} class="my-0">
                    <Graphic class="mdi mdi-chevron-left" />
                    <Text class="w-100 list-text text-center">Close Menu</Text>
                </Item>
                <Separator class="my-3" />
                <Item onSMUIAction={toggleTheme} class="my-0">
                    <Graphic class="mdi mdi-theme-light-dark" />
                    <Text class="w-100 list-text text-center">Toogle Dark/Light Theme</Text>
                </Item>
                <Item onSMUIAction={() => topPointBar = !topPointBar} class="my-0">
                    <Graphic class="mdi mdi-swap-vertical" />
                    <Text class="w-100 list-text text-center">Top/Bottom Point Bar</Text>
                </Item>
                <Item onSMUIAction={() => {confirmDialog.action = () => cleanActivated(); confirmDialog.context = "Are you sure you want to clear selected choices?<br>This action cannot be undone."; currentDialog = "dlgCommon"; menuOpen = false;}} class="my-0">
                    <Graphic class="mdi mdi-select-off" />
                    <Text class="w-100 list-text text-center">Clear Selected Choices</Text>
                </Item>
                {#if app.importedChoicesIsOpen}
                    <Item onSMUIAction={() => {currentDialog = 'appBuildForm'; menuOpen = false;}} class="my-0">
                        <Graphic class="mdi mdi-format-list-checks" />
                        <Text class="w-100 list-text text-center">Open Build Form</Text>
                    </Item>
                    <Item onSMUIAction={() => {currentDialog = 'appSaveLoad'; menuOpen = false;}} class="my-0">
                        <Graphic class="mdi mdi-content-save" />
                        <Text class="w-100 list-text text-center">Save/Load Build</Text>
                    </Item>
                {/if}
                <Item onSMUIAction={() => {currentDialog = 'appGlobalSettings'; menuOpen = false;}} class="my-0">
                    <Graphic class="mdi mdi-cog" />
                    <Text class="w-100 list-text text-center">Settings</Text>
                </Item>
            </List>
        </Content>
    </Drawer>
    <Scrim />
    <div class="s-main" style={mainStyle}>
        {#if app.showMusicPlayer}
            <TopAppBar class="music-player" variant="fixed" >
                <AppBarRow class="music-player--row">
                    <AppBarSection class="px-2 justify-left">
                        <IconButton class="music-player--button" onclickcapture={handlePlayButton} size="button" aria-label="Play">
                            <i class={bgmVariables.bgmIsPlaying ? 'mdi mdi-pause' : 'mdi mdi-play'}></i>
                        </IconButton>
                        <IconButton class="music-player--button" onclickcapture={handleStopButton} size="button" aria-label="Stop">
                            <i class="mdi mdi-stop"></i>
                        </IconButton>
                        <IconButton class="music-player--button" onclickcapture={handleMuteButton} size="button" aria-label="Mute">
                            <i class={app.isMute ? 'mdi mdi-volume-off' : 'mdi mdi-volume-high'}></i>
                        </IconButton>
                        <div class="px-1" style="max-width: 104px; width: 100%">
                            <Slider bind:value={curVolume} min={0} max={100} step={1} class="mx-2" onpointerdown={handleVolumebarDown} onpointerup={handleVolumebarUp} disabled={app.isMute} />
                        </div>
                        <div class="ps-1" style="max-width:150px; overflow: hidden;">
                            <span class="scrolling-text">
                                {bgmVariables.bgmTitle}
                            </span>
                        </div>
                        <div class="px-1 col">
                            <Slider bind:value={curBgmTime} min={0} max={bgmVariables.curBgmLength || 1} step={1} class="mx-2" onpointerdown={handlePlaybarDown} onpointerup={handlePlaybarUp} />
                        </div>
                        <div class="text-center" style="width: 180px">
                            {bgmTime}
                        </div>
                    </AppBarSection>
                </AppBarRow>
            </TopAppBar>
        {/if}
        {#if pointBarIsOn}
            <TopAppBar class="pointBar" style={pointBar} variant="fixed" color="secondary" >
                <AppBarRow class="justify-space-around">
                    <AppBarSection class="py-0 justify-center">
                        {#if app.importedChoicesIsOpen}
                            <Wrapper text="L-Click: Open Side Menu<br>R-Click: Open Build Form">
                                <IconButton class="pointbar-icons" onclickcapture={() => menuOpen = true} oncontextmenu={buildContext} aria-label="Open Import Window" style={pointBarIcon}>
                                    <i class="mdi mdi-format-list-checks"></i>
                                </IconButton>
                            </Wrapper>
                        {:else}
                            <IconButton class="pointbar-icons" onclickcapture={() => menuOpen = true} aria-label="Open Import Window" style={pointBarIcon}>
                                <i class="mdi mdi-format-list-checks"></i>
                            </IconButton>
                        {/if}
                    </AppBarSection>
                    <AppBarSection class="pointbar-center--viewer">
                        {#each app.pointTypes as point}
                            {#if checkPointEnable(point)}
                                <div class="py-0 justify-center" style={pointBarText}>
                                    <AppPointBar point={point} />
                                </div>
                            {/if}
                        {/each}
                    </AppBarSection>
                    <AppBarSection class="py-0 justify-center">
                        {#if app.backpack.length > 0 && ((typeof app.hideBackpackBtn === "undefined" || app.hideBackpackBtn === 0) || (app.hideBackpackBtn > 0 && app.hideBackpackBtn === app.btnBackpackIsOn))}
                            <IconButton class="pointbar-icons" onclickcapture={() => currentDialog = 'dlgBackpack'} aria-label="Open Backpack Window" style={pointBarIcon}>
                                <i class="mdi mdi-checkbox-marked-circle-outline"></i>
                            </IconButton>
                        {/if}
                    </AppBarSection>
                </AppBarRow>
            </TopAppBar>
        {/if}
        <div class="container-fluid p-0">
            <div bind:this={mainDiv} class="row gx-0">
                {#each app.rows as row}
                    <div class={row.width ? 'col-6': 'col-12'}>
                        <AppRow row={row} windowWidth={width} mainDiv={mainDiv} />
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>
{#if currentDialog === 'appSaveLoad'}
    <AppSaveLoad open={currentDialog === 'appSaveLoad'} onclose={() => (currentDialog = 'none')} />
{:else if currentDialog === 'dlgBackpack'}
    <DlgBackpack open={currentDialog === 'dlgBackpack'} onclose={() => (currentDialog = 'none')} />
{:else if currentDialog === 'appGlobalSettings'}
    <AppGlobalSettings open={currentDialog === 'appGlobalSettings'} onclose={() => (currentDialog = 'none')} />
{:else if currentDialog === 'appBuildForm'}
    <AppBuildForm open={currentDialog === 'appBuildForm'} onclose={() => (currentDialog = 'none')} />
{:else if currentDialog === 'dlgCommon'}
    <DlgCommon open={currentDialog === 'dlgCommon'} onclose={() => (currentDialog = 'none')} title={confirmDialog.title} context={confirmDialog.context} closeHandler={(e) => {
        if (e.detail.action === 'accept') {
            confirmDialog.action();
        }
    }}/>
{/if}
{#if dlgVariables.currentDialog === 'appImageUpload' && typeof dlgVariables.data !== 'undefined' && typeof dlgVariables.imgProp !== 'undefined'}
    <ImageUpload open={dlgVariables.currentDialog === 'appImageUpload'} onclose={() => (dlgVariables.currentDialog = 'none')} imgObject={dlgVariables.data} imgProp={dlgVariables.imgProp} />
{:else if dlgVariables.currentDialog === 'dlgCommon' && typeof dlgVariables.cFunc !== 'undefined' && typeof dlgVariables.title !== 'undefined' && typeof dlgVariables.context !== 'undefined'}
    <DlgCommon open={dlgVariables.currentDialog === 'dlgCommon'} onclose={() => (dlgVariables.currentDialog = 'none')} closeHandler={dlgVariables.cFunc} title={dlgVariables.title} context={dlgVariables.context} isWord={dlgVariables.isWord} />
{:else if dlgVariables.currentDialog === 'selectDialog' && typeof dlgVariables.choice !== 'undefined' && typeof dlgVariables.func !== 'undefined'}
    <ObjectSelectDialog open={dlgVariables.currentDialog === 'selectDialog'} onclose={() => (dlgVariables.currentDialog = 'none')} submit={dlgVariables.func} changeNum={dlgVariables.choice.multipleUseVariable} minVal={dlgVariables.choice.numMultipleTimesMinus} maxVal={dlgVariables.choice.numMultipleTimesPluss} />
{/if}
<Tooltip />

<script lang="ts">
    import Button, { Label, Icon as BtnIcon } from '@smui/button';
    import Drawer, { Content, Scrim } from '@smui/drawer';
    import IconButton from '@smui/icon-button';
    import List, { Item, Text, Graphic, Separator } from '@smui/list';
    import Slider from '@smui/slider';
    import Tooltip from '$lib/custom/tooltip';
    import TopAppBar, { Row as AppBarRow, Section as AppBarSection } from '@smui/top-app-bar';
    import { app, currentComponent, currentTheme, dlgVariables, bgmVariables, bgmPlayer, downloadAsImage, loadFromDisk, cleanActivated, checkPointEnable, hexToRgba } from '$lib/store/store.svelte';
    import AppBuildForm from './AppBuildForm.svelte';
    import AppGlobalSettings from './AppGlobalSettings.svelte';
    import AppPointBar from './AppPointBar.svelte';
    import AppSaveLoad from './AppSaveLoad.svelte';
	import AppRow from './AppRow.svelte';
    import DlgBackpack from './DlgBackpack.svelte';
	import ImageUpload from '$lib/store/ImageUpload.svelte';
    import DlgCommon from './DlgCommon.svelte';
    import ObjectSelectDialog from './Object/ObjectSelectDialog.svelte';
    import { Wrapper } from '$lib/custom/tooltip';
	import { get } from 'svelte/store';

    const confirmDialog = {
        action: () => {},
        title: 'Warning',
        context: ''
    };
    
    let menuOpen = $state(false);
    let topPointBar = $state(false);
    let currentDialog = $state<'none' | 'appSaveLoad' | 'dlgBackpack' | 'appGlobalSettings' | 'appBuildForm' | 'dlgCommon'>('none');
    let pointBarPosition = $derived(topPointBar ? app.showMusicPlayer ? 'top: 32px;' : 'top: 0;' : 'bottom: 0;');
    let viewerMenuStyle = $derived(topPointBar ? app.showMusicPlayer ? 'margin-top: 88px;' : 'margin-top: 56px;' : app.showMusicPlayer ? 'margin-top: 32px;' : '');
    let fadeStyle = $derived(`opacity: ${app.fadeTransitionIsOn ? 1 : 0}; transition: opacity ${app.fadeTransitionTime}s ease-out; background-color: ${hexToRgba(app.fadeTransitionColor)}; pointer-events: ${app.fadeTransitionIsOn ? 'auto' : 'none'}; cursor: ${app.fadeTransitionIsOn ? 'none' : 'auto'};`);
    let width = $state(0);
    let thisDiv = $state<HTMLDivElement>();
    let mainDiv = $state<HTMLDivElement>();
    
    let valueTypeFiles: FileList | null = $state(null);
    let fileInput = $state<HTMLInputElement>();
    
    let pointBarIsOn = $derived(app.pointTypes.length > 0 || app.backpack.length > 0 || app.importedChoicesIsOpen);
    let pointBar = $derived(`background-color: ${hexToRgba(app.styling.barBackgroundColor)}; margin:${app.styling.barMargin}px; padding:${app.styling.barPadding}px; ${pointBarPosition}`);
    let pointBarText = $derived(`color: ${hexToRgba(app.styling.barTextColor)}; margin: ${app.styling.barTextMargin}px; padding: ${app.styling.barTextPadding}px; font-family: '${app.styling.barTextFont}'; font-size: ${app.styling.barTextSize}px;`);
    let pointBarIcon = $derived(`color: ${hexToRgba(app.styling.barIconColor)};`);
    let background = $derived.by(() => {
        let styles: string[] = [];

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
        if (pointBarIsOn) {
            styles.push(`padding-bottom: 56px;`);
        }

        if(app.useVW) {
            styles.push(`font-size: 0.835vw;`);
        }
        
        return styles.join(' '); 
    });
    let mainStyle = $derived.by(() => {
        let styles: string[] = [];

        if (app.showMusicPlayer) {
            styles.push(`padding-top: 32px;`);
        }

        return styles.join(' ');
    });
    let bgmTime = $derived.by(() => {
        return `${calTime(bgmVariables.curBgmTime)} | ${calTime(bgmVariables.curBgmLength)}`;
    });
    let curBgmTime = $state(0);
    let curVolume = $state(100);
    let isChangingVol = $state(false);

    $effect(() => {
        if (!bgmVariables.isSeeking) {
            curBgmTime = bgmVariables.curBgmTime;
        }
    });

    $effect(() => {
        if (!isChangingVol) {
            curVolume = app.curVolume;
        }
    });

    function buildContext(e: MouseEvent) {
        const target = e.currentTarget as HTMLElement;
        e.preventDefault();
        target.blur();
        currentDialog = 'appBuildForm';
    }

    function calTime(num: number) {
        const h = Math.floor(num / 3600);
        const m = Math.floor((num % 3600) / 60);
        const s = Math.floor(num % 60);
        const rm = String(m).padStart(2, '0');
        const rs = String(s).padStart(2, '0');

        return h > 0 ? `${h}:${rm}:${rs}` : `${rm}:${rs}`;
    }

    function toggleTheme() {
        const t = localStorage.getItem('theme') as string;
        currentTheme.value = t === 'dark' ? 'light' : 'dark';
        let themeDarkLink: HTMLLinkElement | null = document.head.querySelector('#theme-dark');
        let themeLightLink: HTMLLinkElement | null = document.head.querySelector('#theme-light');

        if (currentTheme.value === 'dark') {
            if (themeDarkLink) {
                themeDarkLink.media='screen and (prefers-color-scheme: light)';
            }
            if (themeLightLink) {
                themeLightLink.media='screen and (prefers-color-scheme: dark)';
            }
        } else {
            if (themeDarkLink) {
                themeDarkLink.media='screen and (prefers-color-scheme: dark)';
            }
            if (themeLightLink) {
                themeLightLink.media='screen and (prefers-color-scheme: light)';
            }
        }
        localStorage.setItem('theme', currentTheme.value);
    }

    function handlePlayButton() {
        if (bgmPlayer && bgmVariables.curBgmLength !== 0) {
            const player = get(bgmPlayer);

            if (player) {
                if (bgmVariables.bgmIsPlaying) {
                    player.pauseVideo();
                    bgmVariables.bgmIsPlaying = false;

                    if (bgmVariables.bgmPlayInterval !== 0) {
                        clearInterval(bgmVariables.bgmPlayInterval);
                        bgmVariables.bgmPlayInterval = 0;
                    }
                } else {
                    let bgmTime = 0;
                    let checkTime = 0;

                    if (bgmVariables.bgmPlayInterval !== 0) {
                        clearInterval(bgmVariables.bgmPlayInterval);
                        bgmVariables.bgmPlayInterval = 0;
                    }

                    player.playVideo();
                    bgmVariables.bgmIsPlaying = true;
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
            }
        }
    }

    function handleStopButton() {
        if (bgmPlayer && bgmVariables.bgmIsPlaying && bgmVariables.curBgmLength !== 0) {
            const player = get(bgmPlayer);

            if (player) {
                player.stopVideo();
                bgmVariables.bgmIsPlaying = false;
                bgmVariables.curBgmTime = 0;
                
                if (bgmVariables.bgmPlayInterval !== 0) {
                    clearInterval(bgmVariables.bgmPlayInterval);
                    bgmVariables.bgmPlayInterval = 0;
                }
            }
        }
    }

    function handleMuteButton() {
        app.isMute = !app.isMute;
        if (bgmPlayer) {
            const player = get(bgmPlayer);

            if (player) {
                if (app.isMute) {
                    player.mute();
                } else {
                    player.unMute();
                }
            }
        }
    }

    function handlePlaybarDown() {
        if (bgmPlayer && bgmVariables.bgmIsPlaying) {
            bgmVariables.isSeeking = true;
        }
    }

    function handlePlaybarUp() {
        if (bgmPlayer && bgmVariables.bgmIsPlaying) {
            const player = get(bgmPlayer);

            if (player) {
                player.seekTo(curBgmTime, true);
                bgmVariables.curBgmTime = curBgmTime;
            }
            bgmVariables.isSeeking = false;
        }
        (document.activeElement as HTMLElement)?.blur();
    }

    function handleVolumebarDown() {
        isChangingVol = true;
    }

    function handleVolumebarUp() {
        app.curVolume = curVolume;
        if (bgmPlayer) {
            const player = get(bgmPlayer);

            if (player) {
                player.setVolume(curVolume);
            }
        }
        isChangingVol = false;
        (document.activeElement as HTMLElement)?.blur();
    }
    
</script>