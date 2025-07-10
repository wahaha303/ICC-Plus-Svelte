<Dialog
    bind:open
    escapeKeyAction={dlgVariables.currentDialog === 'none' ? 'close' : ''}
    surface$style="width: 1920px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
>
    <Content id="backpackDialog">
        <Card class="no-shadow">
            <CardContent>
                <div bind:clientWidth={width} class="container-fluid p-0">
                    <div class="row gx-0">
                        <div class="col-12 py-3">
                            <div class="col-xl-3 col-sm-6 col-12">
                                <Button onclick={() => createNewRow(-1)} variant="raised">
                                    <Label>Add New Backpack Row</Label>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div bind:this={mainDiv} class="row gx-0">
                        {#if !app.useToolbarBtn}
                            <div class="p-2 col-12">
                                <button type="button" class="create-box col-12" style="min-height: 100px; font-size: 40px;" onclick={() => createNewRow(0)} aria-label="Create New Row">
                                    <i class="mdi mdi-plus-thick"></i>
                                </button>
                            </div>
                        {/if}
                        {#each app.backpack as row, i}
                            <div class={row.width ? 'col-6': 'col-12'}>
                                <div class="p-2 col-12">
                                    <Card>
                                        <CardContent class="toolbar toolbar--row justify-space-between px-3 py-2">
                                                <div class="toolbar__title">{(row.debugTitle ?? '') + row.title}</div>
                                                <div class="d-row">
                                                    <Wrapper text={row.isEditModeOn ? 'Preview' : 'Edit Row'}>
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
                                <AppRow row={row} bCreatorMode={true} windowWidth={width} isBackpack={true} mainDiv={mainDiv} />
                                {#if !app.useToolbarBtn}
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
            </CardContent>
        </Card>
    </Content>
    <Actions>
        <Button action="close">
            <Label class="dialog-actions--btn">Close</Label>
        </Button>
    </Actions>
</Dialog>
<script lang="ts">
    import Button, { Label } from '@smui/button';
    import Card, { Content as CardContent } from '@smui/card';
    import Dialog, { Content, Actions } from '@smui/dialog';
    import IconButton from '@smui/icon-button';
    import { Wrapper } from '$lib/custom/tooltip';
    import { app, generateRowId, rowMap, choiceMap, dlgVariables, activatedMap, tmpActivatedMap, generateObjectId, generateScoreId, scoreSet, groupMap, objectDesignMap, rowDesignMap } from '$lib/store/store.svelte';
    import type { Row } from '$lib/store/types';
    import AppRow from '../AppRow.svelte';
    
    let { open, onclose }: { open: boolean; onclose: () => void } = $props();
    let width = $state(0);
    let mainDiv = $state<HTMLDivElement>();
    
    function cloneRow(row: Row, num: number) {
        let id = generateRowId(0, app.rowIdLength);
        let clone: Row = JSON.parse(JSON.stringify(row));

        clone.id = id;
        app.backpack.splice(num + 1, 0, clone);
        rowMap.set(id, clone);

        for (let i = 0; i < clone.objects.length; i++) {
            const cChoice = clone.objects[i];

            cChoice.id = generateObjectId(0, app.objectIdLength);
            cChoice.index = i;
            cChoice.isActive = false;
            delete cChoice.forcedActivated;

            for (let j = 0; j < clone.scores.length; j++) {
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
            app.backpack[i].index = i;
        }
    }

    function createNewRow(index: number) {
        let id = generateRowId(0, app.rowIdLength);
        let idx = app.backpack.length;
        if (index === -1) {
            app.backpack.push({
                index: idx,
                id: id,
                isBackpack: true,
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
                isResultRow: true,
                resultGroupId: '',
                isInfoRow: true,
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
            rowMap.set(id, app.backpack[idx]);
        } else {
            app.backpack.splice(index, 0, {
                index: index,
                id: id,
                isBackpack: true,
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
                isResultRow: true,
                resultGroupId: '',
                isInfoRow: true,
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
            for (let i = index + 1; i < app.backpack.length; i++) {
                app.backpack[i].index = i;
            }
            rowMap.set(id, app.backpack[index]);
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
                            let elementIndex = dGroup.backpackElements.indexOf(choice.id);
                            if (elementIndex !== -1) dGroup.backpackElements.splice(elementIndex, 1);
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
                        let elementIndex = dGroup.backpackElements.indexOf(row.id);
                        if (elementIndex !== -1) dGroup.backpackElements.splice(elementIndex, 1);
                    }
                }
            }
            
            app.backpack.splice(num, 1);
            rowMap.delete(row.id);
            
            for (let i = num; i < app.backpack.length; i++) {
                app.backpack[i].index = i;
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

    function moveRowUp(num: number) {
        if (num > 0) {
            [app.backpack[num - 1], app.backpack[num]] = [app.backpack[num], app.backpack[num - 1]];
            app.backpack[num - 1].index -= 1;
            app.backpack[num].index += 1;
        }
    }

    function moveRowDown(num: number) {
        if (num < app.backpack.length - 1) {
            [app.backpack[num], app.backpack[num + 1]] = [app.backpack[num + 1], app.backpack[num]];
            app.backpack[num].index -= 1;
            app.backpack[num + 1].index += 1;
        }
    }
</script>