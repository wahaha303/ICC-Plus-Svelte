<div bind:clientWidth={width} class="ab-0" style={background}>
    <div class="fadeOverlay" style={fadeStyle}></div>
    <Drawer class="mdc-drawer--mini">
        <Content class="navigation-drawer">
            <List>
                <Item onSMUIAction={() => currentComponent.value = "appMain"} class="my-0">
                    <Graphic class="mdi mdi-chevron-left" />
                    <Text class="w-100 list-text text-center">Return To Menu</Text>
                </Item>
                <Separator class="my-3" />
                {#each upperMenuCompoenet as _undefined, i}
                    <Item onSMUIAction={upperMenuCompoenet[i].action} class="my-0">
                        <Graphic class={upperMenuCompoenet[i].icon} />
                        <Text class="w-100 list-text text-center">{upperMenuCompoenet[i].text}</Text>
                    </Item>
                {/each}
            </List>
            <List>
                {#each lowerMenuCompoenet as _undefined, i}
                    <Item onSMUIAction={lowerMenuCompoenet[i].action} class="my-0">
                        <Graphic class={lowerMenuCompoenet[i].icon} />
                        <Text class="w-100 list-text text-center">{lowerMenuCompoenet[i].text}</Text>
                    </Item>
                {/each}
            </List>
        </Content>
    </Drawer>
    <div class="s-main" style={mainStyle}>
        {#if app.showMusicPlayer}
            <TopAppBar class="music-player" style="max-width: calc(100vw - 56px)" variant="fixed" >
                <AppBarRow class="music-player--row">
                    <AppBarSection class="px-2 justify-left">
                        <IconButton class="music-player--button" onclick={handlePlayButton} size="button" aria-label="Play">
                            <i class={bgmVariables.bgmIsPlaying ? 'mdi mdi-pause' : 'mdi mdi-play'}></i>
                        </IconButton>
                        <IconButton class="music-player--button" onclick={handleStopButton} size="button" aria-label="Stop">
                            <i class="mdi mdi-stop"></i>
                        </IconButton>
                        <IconButton class="music-player--button" onclick={handleMuteButton} size="button" aria-label="Mute">
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
            <TopAppBar class="pointBar" style={pointBar} color="secondary" variant="fixed" >
                <AppBarRow class="justify-space-around">
                    {#if app.importedChoicesIsOpen}
                        <AppBarSection class="py-0 justify-center">
                            <IconButton class="pointbar-icons" onclick={() => currentDialog = 'appBuildForm'} aria-label="Open Import Window" style={pointBarIcon}>
                                <i class="mdi mdi-format-list-checks"></i>
                            </IconButton>
                        </AppBarSection>
                    {/if}
                    <AppBarSection class="pointbar-center--creator">
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
                            <IconButton class="pointbar-icons" onclick={() => currentDialog = 'dlgBackpack'} aria-label="Open Backpack Window" style={pointBarIcon}>
                                <i class="mdi mdi-checkbox-marked-circle-outline"></i>
                            </IconButton>
                        {/if}
                    </AppBarSection>
                </AppBarRow>
            </TopAppBar>
        {/if}
        <div class="container-fluid p-0">
            <div bind:this={mainDiv}  class="row gx-0">
                {#if bCreatorMode && !app.useToolbarBtn}
                    <div class="p-2 col-12">
                        <button type="button" class="create-box col-12" style="min-height: 100px; font-size: 40px;" onclick={() => createNewRow(0)} aria-label="Create New Row">
                            <i class="mdi mdi-plus-thick"></i>
                        </button>
                    </div>
                {/if}
                {#each app.rows as row, i}
                    <div class={row.width ? 'col-6': 'col-12'}>
                        {#if bCreatorMode}
                            <div class="p-2 col-12">
                                <Card>
                                    <CardContent class="toolbar toolbar--row justify-space-between px-3 py-2">
                                            <div class="toolbar__title">{(row.debugTitle ?? '') + row.title}</div>
                                            <div class="d-row">
                                                <Wrapper text={row.isEditModeOn ? 'Preivew' : 'Edit Row'}>
                                                    <IconButton class={row.isEditModeOn ? 'mdi mdi-arrow-left' : 'mdi mdi-wrench'} onclick={() => row.isEditModeOn = !row.isEditModeOn} />
                                                </Wrapper>
                                                {#if app.useToolbarBtn}
                                                    <Wrapper text="Insert Row Above">
                                                        <IconButton class="mdi mdi-folder-arrow-up" onclick={() => createNewRow(i)} />
                                                    </Wrapper>
                                                {/if}
                                                <Wrapper text="Delete Row">
                                                    <IconButton class="mdi mdi-delete-forever" onclick={() => deleteRow(row, i)} />
                                                </Wrapper>
                                                <Wrapper text="Clone Row">
                                                    <IconButton class="mdi mdi-content-copy" onclick={() => cloneRow(row, i)} />
                                                </Wrapper>
                                                <Wrapper text="Move Row Up">
                                                    <IconButton class="mdi mdi-chevron-up" onclick={() => moveRowUp(i)} />
                                                </Wrapper>
                                                <Wrapper text="Move Row Down">
                                                    <IconButton class="mdi mdi-chevron-down" onclick={() => moveRowDown(i)} />
                                                </Wrapper>
                                            </div>
                                    </CardContent>
                                </Card>
                            </div>
                        {/if}
                        <AppRow row={row} bCreatorMode={bCreatorMode} windowWidth={width} mainDiv={mainDiv} />
                        {#if bCreatorMode && !app.useToolbarBtn}
                            <div class="p-2 col-12">
                                <button type="button" class="create-box col-12" style="min-height: 100px; font-size: 40px;" onclick={() => createNewRow(i + 1)} aria-label="Create New Row">
                                    <i class="mdi mdi-plus-thick"></i>
                                </button>
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>
{#if currentDialog === 'appFeature'}
    <AppFeature open={currentDialog === 'appFeature'} onclose={() => (currentDialog = 'none')} />
{:else if currentDialog === 'appDesign'}
    <AppDesign open={currentDialog === 'appDesign'} onclose={() => (currentDialog = 'none')} />
{:else if currentDialog === 'appSaveLoad'}
    <AppSaveLoad open={currentDialog === 'appSaveLoad'} onclose={() => (currentDialog = 'none')} />
{:else if currentDialog === 'appBuildForm'}
    <AppBuildForm open={currentDialog === 'appBuildForm'} onclose={() => (currentDialog = 'none')} />
{:else if currentDialog === 'appIdSearch'}
    <AppIdSearch open={currentDialog === 'appIdSearch'} onclose={() => (currentDialog = 'none')} />
{:else if currentDialog === 'dlgBackpack'}
    <DlgBackpack open={currentDialog === 'dlgBackpack'} onclose={() => (currentDialog = 'none')} />
{:else if currentDialog === 'appRowList'}
    <AppRowList open={currentDialog === 'appRowList'} onclose={() => (currentDialog = 'none')} mainDiv={mainDiv} />
{:else if currentDialog === 'appGlobalSettings'}
    <AppGlobalSettings open={currentDialog === 'appGlobalSettings'} onclose={() => (currentDialog = 'none')} />
{/if}
{#if dlgVariables.currentDialog === 'appImageUpload' && typeof dlgVariables.data !== 'undefined' && typeof dlgVariables.imgProp !== 'undefined'}
    <ImageUpload open={dlgVariables.currentDialog === 'appImageUpload'} onclose={() => (dlgVariables.currentDialog = 'none')} imgObject={dlgVariables.data} imgProp={dlgVariables.imgProp} />
{:else if dlgVariables.currentDialog === 'appPointSettings' && typeof dlgVariables.point !== 'undefined'}
    <AppPointSettings open={dlgVariables.currentDialog === 'appPointSettings'} onclose={() => (dlgVariables.currentDialog = 'none')} currentPoint={dlgVariables.point} />
{:else if dlgVariables.currentDialog === 'appButtonSettings' && typeof dlgVariables.row !== 'undefined'}
    <AppButtonSettings open={dlgVariables.currentDialog === 'appButtonSettings'} onclose={() => (dlgVariables.currentDialog = 'none')} row={dlgVariables.row} />
{:else if dlgVariables.currentDialog === 'appCreateMultipleChoices' && typeof dlgVariables.func !== 'undefined'}
    <AppCreateMultipleChoice open={dlgVariables.currentDialog === 'appCreateMultipleChoices'} onclose={() => (dlgVariables.currentDialog = 'none')} submit={dlgVariables.func} />
{:else if dlgVariables.currentDialog === 'appRequirement' && typeof dlgVariables.data !== 'undefined'}
    <AppRequirement open={dlgVariables.currentDialog === 'appRequirement'} onclose={() => (dlgVariables.currentDialog = 'none')} data={dlgVariables.data} />
{:else if dlgVariables.currentDialog === 'appRowSettings' && typeof dlgVariables.row !== 'undefined'}
    <AppRowSettings open={dlgVariables.currentDialog === 'appRowSettings'} onclose={() => (dlgVariables.currentDialog = 'none')} row={dlgVariables.row} />
{:else if dlgVariables.currentDialog === 'appObjectSettings' && typeof dlgVariables.row !== 'undefined' && typeof dlgVariables.choice !== 'undefined'}
    <AppObjectSettings open={dlgVariables.currentDialog === 'appObjectSettings'} onclose={() => (dlgVariables.currentDialog = 'none')} choice={dlgVariables.choice} />
{:else if dlgVariables.currentDialog === 'appObjectList' && typeof dlgVariables.row !== 'undefined'}
    <AppObjectList open={dlgVariables.currentDialog === 'appObjectList'} onclose={() => (dlgVariables.currentDialog = 'none')} row={dlgVariables.row} mainDiv={mainDiv} />
{:else if dlgVariables.currentDialog === 'dlgCommon' && typeof dlgVariables.cFunc !== 'undefined' && typeof dlgVariables.title !== 'undefined' && typeof dlgVariables.context !== 'undefined'}
    <DlgCommon open={dlgVariables.currentDialog === 'dlgCommon'} onclose={() => (dlgVariables.currentDialog = 'none')} closeHandler={dlgVariables.cFunc} title={dlgVariables.title} context={dlgVariables.context} isWord={dlgVariables.isWord} />
{/if}
<Tooltip />
<Snackbar bind:this={snackbar} labelText={snackbarVariables.labelText} timeoutMs={snackbarVariables.timeoutMs}>
    <SnackbarLabel class="text-center" />
</Snackbar>

<script lang="ts">
    import Card, { Content as CardContent } from '@smui/card';
    import Drawer, { Content } from '@smui/drawer';
    import List, { Item, Text, Graphic, Separator } from '@smui/list';
    import IconButton from '@smui/icon-button';
    import Slider from '@smui/slider';
    import Snackbar, {Label as SnackbarLabel } from '@smui/snackbar';
    import Tooltip, { Wrapper } from '$lib/custom/tooltip';
    import TopAppBar, { Row as AppBarRow, Section as AppBarSection } from '@smui/top-app-bar';
    import { app, currentComponent, rowMap, choiceMap, activatedMap, cleanActivated, generateRowId, dlgVariables, tmpActivatedMap, snackbarVariables, bgmVariables, bgmPlayer,  toggleTheme, generateScoreId, scoreSet, checkPointEnable, groupMap, objectDesignMap, rowDesignMap } from '$lib/store/store.svelte';
    import type { Row } from '$lib/store/types';
    import AppBuildForm from './AppBuildForm.svelte';
    import AppDesign from './AppDesign.svelte';
	import AppFeature from './AppFeature.svelte';
    import AppSaveLoad from './AppSaveLoad.svelte';
	import AppRow from './AppRow.svelte';
    import AppPointBar from './AppPointBar.svelte';
    import DlgBackpack from './DlgBackpack.svelte';
	import ImageUpload from '$lib/store/ImageUpload.svelte';
	import AppButtonSettings from './AppButtonSettings.svelte';
	import AppCreateMultipleChoice from './AppCreateMultipleChoice.svelte';
    import AppPointSettings from './Features/AppPointSettings.svelte';
    import AppRowList from './AppRowList.svelte';
	import AppRequirement from './AppRequirement.svelte';
	import AppRowSettings from './AppRowSettings.svelte';
	import AppObjectSettings from './AppObjectSettings.svelte';
	import AppIdSearch from './Features/AppIdSearch.svelte';
	import AppObjectList from './AppObjectList.svelte';
	import AppGlobalSettings from './AppGlobalSettings.svelte';
    import DlgCommon from './DlgCommon.svelte';
	import { get } from 'svelte/store';

    const upperMenuCompoenet = [{
        action: () => {
            createNewRow(-1);
        },
        text: 'Create New Row',
        icon: 'mdi mdi-folder-plus'
    }, {
        action: () => {
                currentDialog = 'appRowList';
        },
        text: 'Open Row List',
        icon: 'mdi mdi-format-list-bulleted'
    }, {
        action: () => {
            currentDialog = 'appFeature';
        },
        text: 'Open Features',
        icon: 'mdi mdi-tools'
    }, {
        action: () => {
            currentDialog = 'appDesign';
        },
        text: 'Modify Design',
        icon: 'mdi mdi-pencil'
    }, {
        action: () => {
            currentDialog = 'appSaveLoad';
        },
        text: 'Save/Load Project',
        icon: 'mdi mdi-content-save'
    }];
    const lowerMenuCompoenet = $state([{
        action: () => {
            toggleTheme();
        },
        text: 'Toggle Dark/Light Theme',
        icon: 'mdi mdi-theme-light-dark'
    }, {
        action: () => {
            currentDialog = 'appGlobalSettings';
        },
        text: 'Global Settings',
        icon: 'mdi mdi-cog'
    }, {
        action: () => {
            cleanActivated();
        },
        text: 'Clean Selected Choices',
        icon: 'mdi mdi-select-off'
    }, {
        action: () => {
            currentDialog = 'appIdSearch';
        },
        text: 'See ID/Title List',
        icon: 'mdi mdi-clipboard-list'
    }]);
    
    let currentDialog = $state<'none' | 'appFeature' | 'appDesign' | 'appSaveLoad' | 'appBuildForm' | 'appIdSearch' | 'dlgBackpack' | 'appRowList' | 'appGlobalSettings'>('none');
    let { bCreatorMode }: { bCreatorMode: boolean } = $props();
    let pointBarPosition = $state('bottom:0');
    let fadeStyle = $derived(`opacity: ${app.fadeTransitionIsOn ? 1 : 0}; transition: opacity ${app.fadeTransitionTime}s ease-out; background-color: ${app.fadeTransitionColor}; pointer-events: ${app.fadeTransitionIsOn ? 'auto' : 'none'}; cursor: ${app.fadeTransitionIsOn ? 'none' : 'auto'};`);
    let width = $state(0);
    let mainDiv = $state<HTMLDivElement>();
    let snackbar: Snackbar;
    
    let pointBarIsOn = $derived(app.pointTypes.length > 0 || app.backpack.length > 0 || app.importedChoicesIsOpen);
    let pointBar = $derived(`max-width: calc(100% - 56px); background-color: ${app.styling.barBackgroundColor}; margin:${app.styling.barMargin}px; padding:${app.styling.barPadding}px; ${pointBarPosition}`);
    let pointBarText = $derived(`color: ${app.styling.barTextColor}; margin: ${app.styling.barTextMargin}px; padding: ${app.styling.barTextPadding}px; font-family: "${app.styling.barTextFont}"; font-size: ${app.styling.barTextSize}px`);
    let pointBarIcon = $derived(`color: ${app.styling.barIconColor};`);
    let background = $derived.by(() => {
        let styles = [];

        if (app.styling.backgroundImage) {
            styles.push(`background-image: url('${app.styling.backgroundImage}');`);
        }
        styles.push(`background-color: ${app.styling.backgroundColor};`);
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
        
        return styles.join(''); 
    });
    let mainStyle = $derived.by(() => {
        let styles = [];

        styles.push(`margin-left: 56px;`);

        if (app.showMusicPlayer) {
            styles.push(`padding-top: 32px;`);
        }

        return styles.join('');
    });
    let bgmTime = $derived.by(() => {
        return `${calTime(bgmVariables.curBgmTime)} | ${calTime(bgmVariables.curBgmLength)}`;
    });
    let curBgmTime = $state(0);
    let curVolume = $state(100);
    let isChangingVol = $state(false);

    $effect(() => {
        if (snackbarVariables.isOpen) {
            snackbar.close();
            snackbar.open();
            snackbarVariables.isOpen = false;
        }
    });

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

    function calTime(num: number) {
        const h = Math.floor(num / 3600);
        const m = Math.floor((num % 3600) / 60);
        const s = Math.floor(num % 60);
        const rm = String(m).padStart(2, '0');
        const rs = String(s).padStart(2, '0');

        return h > 0 ? `${h}:${rm}:${rs}` : `${rm}:${rs}`;
    }

    function cloneRow(row: Row, num: number) {
        let id = generateRowId(0, app.rowIdLength);
        let clone: Row = JSON.parse(JSON.stringify(row));

        clone.id = id;
        app.rows.splice(num + 1, 0, clone);
        rowMap.set(id, clone);

        for (let i = 0; i < clone.objects.length; i++) {
            const cChoice = clone.objects[i];

            cChoice.id = generateObjectId(0, app.objectIdLength);
            cChoice.index = i;
            cChoice.isActive = false;
            delete cChoice.forcedActivated;

            for (let j = 0; j < cChoice.scores.length; j++) {
                const score = cChoice.scores[j];

                score.idx = generateScoreId(0, 5);
                scoreSet.add(score.idx);
                delete score.isActive;
                delete score.setValue;
                delete score.discountIsOn;
                delete score.discountShow;
                delete score.discountBeforeText;
                delete score.discountAfterText;
                delete score.discountScore;
                delete score.discountScoreCal;
                delete score.isChangeDiscount;
                delete score.tmpDisScore;
                delete score.tmpDiscount;
                delete score.discountedFrom;
                delete score.dupTextA;
                delete score.dupTextB;
                delete score.discountTextA;
                delete score.discountTextB;
                delete score.notStackableDiscount;
            }

            for (let j = 0; j < cChoice.addons.length; j++) {
                const addon = cChoice.addons[j];

                addon.parentId = cChoice.id;
            }

            if (cChoice.backpackBtnRequirement) {
                if (typeof app.hideBackpackBtn !== 'undefined') {
                    app.hideBackpackBtn += 1;
                } else {
                    delete cChoice.backpackBtnRequirement;
                }
            }

            choiceMap.set(cChoice.id, {choice: cChoice, row: clone});

            if (cChoice.groups) {
                for (let j = 0; j < cChoice.groups.length; j++) {
                    let group = groupMap.get(cChoice.groups[j]);
                    if (typeof group !== 'undefined') {
                        let elementIndex = group.elements.indexOf(cChoice.id);
                        if (elementIndex === -1) group.elements.push(cChoice.id);
                    }
                }
            }
            if (cChoice.objectDesignGroups) {
                for (let j = 0; j < cChoice.objectDesignGroups.length; j++) {
                    let dGroup = objectDesignMap.get(cChoice.objectDesignGroups[j]);
                    if (typeof dGroup !== 'undefined') {
                        let elementIndex = dGroup.elements.indexOf(cChoice.id);
                        if (elementIndex === -1) dGroup.elements.push(cChoice.id);
                    }
                }
            }
        }

        if (clone.groups) {
            for (let i = 0; i < clone.groups.length; i++) {
                let group = groupMap.get(clone.groups[i]);
                if (typeof group !== 'undefined') {
                    let elementIndex = group.rowElements.indexOf(clone.id);
                    if (elementIndex === -1) group.rowElements.push(clone.id);
                }
            }
        }

        if (clone.rowDesignGroups) {
            for (let i = 0; i < clone.rowDesignGroups.length; i++) {
                let dGroup = rowDesignMap.get(clone.rowDesignGroups[i]);
                if (typeof dGroup !== 'undefined') {
                    let elementIndex = dGroup.elements.indexOf(clone.id);
                    if (elementIndex === -1) dGroup.elements.push(clone.id);
                }
            }
        }

        for (let i = num + 1; i < app.rows.length; i++) {
            app.rows[i].index = i;
        }
    }

    function createNewRow(index: number) {
        let id = generateRowId(0, app.rowIdLength);
        let idx = app.rows.length;
        if (index === -1) {
            app.rows.push({
                index: idx,
                id: id,
                title: app.defaultRowTitle,
                titleText: app.defaultRowText,
                debugTitle: '',
                objectWidth: 'col-md-3',
                image: '',
                template: 1,
                isButtonRow: false,
                isResultRow: false,
                resultGroupId: '',
                isInfoRow: false,
                defaultAspectWidth: 1,
                defaultAspectHeight: 1,
                allowedChoices: 0,
                currentChoices: 0,
                requireds: [],
                isEditModeOn: false,
                isRequirementOpen: false,
                objects: [],
                rowDesignGroups: []
            });
            rowMap.set(id, app.rows[idx]);
        } else {
            app.rows.splice(index, 0, {
                index: index,
                id: id,
                title: app.defaultRowTitle,
                titleText: app.defaultRowText,
                debugTitle: '',
                objectWidth: 'col-md-3',
                image: '',
                template: 1,
                isButtonRow: false,
                buttonType: true,
                buttonId: '',
                buttonText: 'Click',
                buttonRandom: false,
                buttonRandomNumber: 1,
                isResultRow: false,
                resultGroupId: '',
                isInfoRow: false,
                defaultAspectWidth: 1,
                defaultAspectHeight: 1,
                allowedChoices: 0,
                currentChoices: 0,
                requireds: [],
                isEditModeOn: false,
                isRequirementOpen: false,
                objects: [],
                rowDesignGroups: []
            });
            for (let i = index + 1; i < app.rows.length; i++) {
                app.rows[i].index = i;
            }
            rowMap.set(id, app.rows[index]);
        }
    }

    function deleteRow(row: Row, num: number) {
        function deleteProc() {
            for (let i = 0; i < row.objects.length; i++) {
                const choice = row.objects[i];

                if (choice.backpackBtnRequirement) {
                    if (choice.isActive) {
                        app.btnBackpackIsOn -= 1;
                    }
                    app.hideBackpackBtn -= 1;
                }

                if (choice.groups) {
                    for (let j = 0; j < choice.groups.length; j++) {
                        let group = groupMap.get(choice.groups[j]);
                        if (typeof group !== 'undefined') {
                            let elementIndex = group.elements.indexOf(choice.id);
                            if (elementIndex !== -1) group.elements.splice(elementIndex, 1);
                        }
                    }
                }
                if (choice.objectDesignGroups) {
                    for (let j = 0; j < choice.objectDesignGroups.length; j++) {
                        let dGroup = objectDesignMap.get(choice.objectDesignGroups[j]);
                        if (typeof dGroup !== 'undefined') {
                            let elementIndex = dGroup.elements.indexOf(choice.id);
                            if (elementIndex !== -1) dGroup.elements.splice(elementIndex, 1);
                        }
                    }
                }

                activatedMap.delete(choice.id);
                tmpActivatedMap.delete(choice.id);
                choiceMap.delete(choice.id);
            }

            if (row.groups) {
                for (let i = 0; i < row.groups.length; i++) {
                    let group = groupMap.get(row.groups[i]);
                    if (typeof group !== 'undefined') {
                        let elementIndex = group.rowElements.indexOf(row.id);
                        if (elementIndex !== -1) group.rowElements.splice(elementIndex, 1);
                    }
                }
            }
            if (row.rowDesignGroups) {
                for (let i = 0; i < row.rowDesignGroups.length; i++) {
                    let dGroup = rowDesignMap.get(row.rowDesignGroups[i]);
                    if (typeof dGroup !== 'undefined') {
                        let elementIndex = dGroup.elements.indexOf(row.id);
                        if (elementIndex !== -1) dGroup.elements.splice(elementIndex, 1);
                    }
                }
            }

            app.rows.splice(num, 1);
            rowMap.delete(row.id);
            for (let i = num; i < app.rows.length; i++) {
                app.rows[i].index = i;
            }
        }
        if (app.checkDeleteRow) {
            dlgVariables.currentDialog = 'dlgCommon';
            dlgVariables.row = row;
            dlgVariables.context = 'Are you sure you want to delete this row?<br>Be sure to deselect all choices before deleting this row.';
            dlgVariables.title = '';
            dlgVariables.cFunc = (e: CustomEvent) => {
                if (e.detail.action === 'accept') {
                    deleteProc();
                }
            }
        } else {
            deleteProc();
        }
    }

    function generateObjectId(repeated: number, strLength: number) {
        let id = 'choice-';
        let str = 'abcdefghijklmnopqrstuvwxyz0123456789';
        for (var o = 0; o < strLength; o++) {
            id += str.charAt(Math.floor(Math.random() * str.length));
        }
        if (choiceMap.has(id)) {
            if (repeated > 2) {
                return generateObjectId(0, ++strLength);
            } else {
                return generateObjectId(++repeated, strLength);
            }
        } else {
            return id;
        }
    }

    function moveRowUp(num: number) {
        if (num > 0) {
            [app.rows[num - 1], app.rows[num]] = [app.rows[num], app.rows[num - 1]];
            app.rows[num - 1].index -= 1;
            app.rows[num].index += 1;
        }
    }

    function moveRowDown(num: number) {
        if (num < app.rows.length - 1) {
            [app.rows[num], app.rows[num + 1]] = [app.rows[num + 1], app.rows[num]];
            app.rows[num].index -= 1;
            app.rows[num + 1].index += 1;
        }
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