<Dialog
    bind:open
    escapeKeyAction={currentDialog === 'none' ? 'close' : ''}
    surface$style="width: 1200px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
>
    <Title class="dialog-title" tabindex={0} autofocus>
        Design Groups
    </Title>
    <Content id="dialog--design-group" class="pb-2">
        <div class="row gy-4 text-center">
            <div class="col-md-6 col-12">
                <h5>Row Design Groups</h5>
            </div>
            <div class="col-md-6 col-12">
                <h5>Object Design Groups</h5>
            </div>
        </div>
        <div class="row gy-4">
            <div class="col-md-6 col-12">
                <div bind:this={rowVirtualListEl} style="max-height: 680px; overflow-y: auto; overflow-x: hidden;">
                    {#if app.rowDesignGroups && app.rowDesignGroups.length > 1}
                    <div style="position: relative; height: {rowTotalHeight}px; width: 100%;">
                        {#each rowItems as row (row.index)}
                            <div class="py-3" data-index={row.index} use:rowObserveResize={row.index} style="position: absolute; top: {row.start}px; width: 100%;">
                                {#if app.rowDesignGroups[row.index]}
                                    <div class="point-slot">
                                        <div class="toolbar grey lighten-3 justify-space-around">
                                            <Wrapper text="Move Up">
                                                <IconButton class="mdi mdi-chevron-up" onclick={() => moveDesignUp(row.index, true)} />
                                            </Wrapper>
                                            <Wrapper text="Delete Design">
                                                <IconButton class="mdi mdi-delete-forever" onclick={() => deleteDesign(app.rowDesignGroups![row.index].id, row.index, true)} />
                                            </Wrapper>
                                            <Wrapper text="Open Design Settings">
                                                <IconButton class="mdi mdi-pencil" onclick={() => {currentDialog = 'privateDesign', data = app.rowDesignGroups![row.index], bRow = true}} />
                                            </Wrapper>
                                            <Wrapper text="Clone Design">
                                                <IconButton class="mdi mdi-content-copy" onclick={() => cloneDesign(app.rowDesignGroups![row.index], row.index, true)} />
                                            </Wrapper>
                                            <Wrapper text="Move Down">
                                                <IconButton class="mdi mdi-chevron-down" onclick={() => moveDesignDown(row.index, true)} />
                                            </Wrapper>
                                        </div>
                                        <div class="row gy-4 p-3">
                                            <div class="col-sm-6 col-12">
                                                <Textfield bind:value={app.rowDesignGroups![row.index].id} onfocus={() => designId = app.rowDesignGroups![row.index].id} onchange={() => changeDesignId(app.rowDesignGroups![row.index], true)} label="Id" variant="filled" />
                                            </div>
                                            <div class="col-sm-6 col-12">
                                                <Textfield bind:value={app.rowDesignGroups![row.index].name} label="Name" variant="filled" />
                                            </div>
                                            <div class="col-12">
                                                <Textfield bind:value={app.rowDesignGroups![row.index].activatedId} label="Id Needed To Show" variant="filled" />
                                            </div>
                                            <div class="col-12">
                                                <CustomChipInput acValue={app.rowDesignGroups![row.index].elements} acOptions={$optimizedRows} inputLabel="Row Id" getLabel={getRowLabel} onSelected={setRowElement} onDeselected={releaseRowElement} selectProp={app.rowDesignGroups![row.index]}/>
                                            </div>
                                            <div class="col-12">
                                                <CustomChipInput acValue={app.rowDesignGroups![row.index].backpackElements} acOptions={$optimizedBackpackRows} inputLabel="Backpack Row Id" getLabel={getRowLabel} onSelected={setRowElement} onDeselected={releaseRowElement} selectProp={app.rowDesignGroups![row.index]}/>
                                            </div>
                                        </div>
                                    </div>
                                {:else if row.index === app.rowDesignGroups.length}
                                    <div class="pb-2">
                                        <button type="button" class="create-box col-12" style="min-height: 378px; font-size: 40px;" onclick={() => createNewDesignGroup(true)} aria-label="Create New Point Type">
                                            <i class="mdi mdi-plus-thick"></i>
                                        </button>
                                    </div>
                                {/if}
                            </div>
                        {/each}
                    </div>
                    {:else}
                        <div class="py-3">
                            {#if app.rowDesignGroups}
                                {#each app.rowDesignGroups as designGroup, i}
                                    <div class="point-slot mb-5">
                                        <div class="toolbar grey lighten-3 justify-space-around">
                                            <Wrapper text="Move Up">
                                                <IconButton class="mdi mdi-chevron-up" onclick={() => moveDesignUp(i, true)} />
                                            </Wrapper>
                                            <Wrapper text="Delete Design">
                                                <IconButton class="mdi mdi-delete-forever" onclick={() => deleteDesign(designGroup.id, i, true)} />
                                            </Wrapper>
                                            <Wrapper text="Open Design Settings">
                                                <IconButton class="mdi mdi-pencil" onclick={() => {currentDialog = 'privateDesign', data = designGroup, bRow = true}} />
                                            </Wrapper>
                                            <Wrapper text="Clone Design">
                                                <IconButton class="mdi mdi-content-copy" onclick={() => cloneDesign(designGroup, i, true)} />
                                            </Wrapper>
                                            <Wrapper text="Move Down">
                                                <IconButton class="mdi mdi-chevron-down" onclick={() => moveDesignDown(i, true)} />
                                            </Wrapper>
                                        </div>
                                        <div class="row gy-4 p-3">
                                            <div class="col-sm-6 col-12">
                                                <Textfield bind:value={designGroup.id} onfocus={() => designId = designGroup.id} onchange={() => changeDesignId(designGroup, true)} label="Id" variant="filled" />
                                            </div>
                                            <div class="col-sm-6 col-12">
                                                <Textfield bind:value={designGroup.name} label="Name" variant="filled" />
                                            </div>
                                            <div class="col-12">
                                                <Textfield bind:value={designGroup.activatedId} label="Id Needed To Show" variant="filled" />
                                            </div>
                                            <div class="col-12">
                                                <CustomChipInput acValue={designGroup.elements} acOptions={$optimizedRows} inputLabel="Row Id" getLabel={getRowLabel} onSelected={setRowElement} onDeselected={releaseRowElement} selectProp={designGroup}/>
                                            </div>
                                            <div class="col-12">
                                                <CustomChipInput acValue={designGroup.backpackElements} acOptions={$optimizedBackpackRows} inputLabel="Backpack Row Id" getLabel={getRowLabel} onSelected={setRowElement} onDeselected={releaseRowElement} selectProp={designGroup}/>
                                            </div>
                                        </div>
                                    </div>
                                {/each}
                            {/if}
                            <div class="mb-5">
                                <button type="button" class="create-box col-12" style="min-height: 378px; font-size: 40px;" onclick={() => createNewDesignGroup(true)} aria-label="Create New Point Type">
                                    <i class="mdi mdi-plus-thick"></i>
                                </button>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
            <div class="col-md-6 col-12">
                <div bind:this={objectVirtualListEl} style="max-height: 680px; overflow-y: auto; overflow-x: hidden;">
                    {#if app.objectDesignGroups && app.objectDesignGroups.length > 1}
                    <div style="position: relative; height: {objectTotalHeight}px; width: 100%;">
                        {#each objectItems as row (row.index)}
                            <div class="py-3" data-index={row.index} use:objectObserveResize={row.index} style="position: absolute; top: {row.start}px; width: 100%;">
                                {#if app.objectDesignGroups[row.index]}
                                    <div class="point-slot">
                                        <div class="toolbar grey lighten-3 justify-space-around">
                                            <Wrapper text="Move Up">
                                                <IconButton class="mdi mdi-chevron-up" onclick={() => moveDesignUp(row.index, false)} />
                                            </Wrapper>
                                            <Wrapper text="Delete Design">
                                                <IconButton class="mdi mdi-delete-forever" onclick={() => deleteDesign(app.objectDesignGroups![row.index].id, row.index, false)} />
                                            </Wrapper>
                                            <Wrapper text="Open Design Settings">
                                                <IconButton class="mdi mdi-pencil" onclick={() => {currentDialog = 'privateDesign', data = app.objectDesignGroups![row.index], bRow = false}} />
                                            </Wrapper>
                                            <Wrapper text="Clone Design">
                                                <IconButton class="mdi mdi-content-copy" onclick={() => cloneDesign(app.objectDesignGroups![row.index], row.index, false)} />
                                            </Wrapper>
                                            <Wrapper text="Move Down">
                                                <IconButton class="mdi mdi-chevron-down" onclick={() => moveDesignDown(row.index, false)} />
                                            </Wrapper>
                                        </div>
                                        <div class="row gy-4 p-3">
                                            <div class="col-sm-6 col-12">
                                                <Textfield bind:value={app.objectDesignGroups![row.index].id} onfocus={() => designId = app.objectDesignGroups![row.index].id} onchange={() => changeDesignId(app.objectDesignGroups![row.index], false)} label="Id" variant="filled" />
                                            </div>
                                            <div class="col-sm-6 col-12">
                                                <Textfield bind:value={app.objectDesignGroups![row.index].name} label="Name" variant="filled" />
                                            </div>
                                            <div class="col-12">
                                                <Textfield bind:value={app.objectDesignGroups![row.index].activatedId} label="Id Needed To Show" variant="filled" />
                                            </div>
                                            <div class="col-12">
                                                <CustomChipInput acValue={app.objectDesignGroups![row.index].elements} acOptions={$optimizedChoices} inputLabel="Row Id" getLabel={getChoiceLabel} onSelected={setChoiceElement} onDeselected={releaseChoiceElement} selectProp={app.objectDesignGroups![row.index]}/>
                                            </div>
                                            <div class="col-12">
                                                <CustomChipInput acValue={app.objectDesignGroups![row.index].backpackElements} acOptions={$optimizedBackpackChoices} inputLabel="Backpack Row Id" getLabel={getChoiceLabel} onSelected={setChoiceElement} onDeselected={releaseChoiceElement} selectProp={app.objectDesignGroups![row.index]}/>
                                            </div>
                                        </div>
                                    </div>
                                {:else if row.index === app.objectDesignGroups.length}
                                    <div class="pb-2">
                                        <button type="button" class="create-box col-12" style="min-height: 378px; font-size: 40px;" onclick={() => createNewDesignGroup(false)} aria-label="Create New Point Type">
                                            <i class="mdi mdi-plus-thick"></i>
                                        </button>
                                    </div>
                                {/if}
                            </div>
                        {/each}
                    </div>
                    {:else}
                        <div class="py-3">
                            {#if app.objectDesignGroups}
                                {#each app.objectDesignGroups as designGroup, i}
                                    <div class="point-slot mb-5">
                                        <div class="toolbar grey lighten-3 justify-space-around">
                                            <Wrapper text="Move Up">
                                                <IconButton class="mdi mdi-chevron-up" onclick={() => moveDesignUp(i, false)} />
                                            </Wrapper>
                                            <Wrapper text="Delete Design">
                                                <IconButton class="mdi mdi-delete-forever" onclick={() => deleteDesign(designGroup.id, i, false)} />
                                            </Wrapper>
                                            <Wrapper text="Open Design Settings">
                                                <IconButton class="mdi mdi-pencil" onclick={() => {currentDialog = 'privateDesign', data = designGroup, bRow = false}} />
                                            </Wrapper>
                                            <Wrapper text="Clone Design">
                                                <IconButton class="mdi mdi-content-copy" onclick={() => cloneDesign(designGroup, i, false)} />
                                            </Wrapper>
                                            <Wrapper text="Move Down">
                                                <IconButton class="mdi mdi-chevron-down" onclick={() => moveDesignDown(i, false)} />
                                            </Wrapper>
                                        </div>
                                        <div class="row gy-4 p-3">
                                            <div class="col-sm-6 col-12">
                                                <Textfield bind:value={designGroup.id} onfocus={() => designId = designGroup.id} onchange={() => changeDesignId(designGroup, false)} label="Id" variant="filled" />
                                            </div>
                                            <div class="col-sm-6 col-12">
                                                <Textfield bind:value={designGroup.name} label="Name" variant="filled" />
                                            </div>
                                            <div class="col-12">
                                                <Textfield bind:value={designGroup.activatedId} label="Id Needed To Show" variant="filled" />
                                            </div>
                                            <div class="col-12">
                                                <CustomChipInput acValue={designGroup.elements} acOptions={$optimizedChoices} inputLabel="Choice Id" getLabel={getChoiceLabel} onSelected={setChoiceElement} onDeselected={releaseChoiceElement} selectProp={designGroup}/>
                                            </div>
                                            <div class="col-12">
                                                <CustomChipInput acValue={designGroup.backpackElements} acOptions={$optimizedBackpackChoices} inputLabel="Backpack Choice Id" getLabel={getChoiceLabel} onSelected={setChoiceElement} onDeselected={releaseChoiceElement} selectProp={designGroup}/>
                                            </div>
                                        </div>
                                    </div>
                                {/each}
                            {/if}
                            <div class="mb-5">
                                <button type="button" class="create-box col-12" style="min-height: 378px; font-size: 40px;" onclick={() => createNewDesignGroup(false)} aria-label="Create New Point Type">
                                    <i class="mdi mdi-plus-thick"></i>
                                </button>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </Content>
    <Actions>
        <div class="container-fluid">
            <div class="row p-0">
                <div class="col-md-6 col-12">
                    <Button action="" onclick={() => createNewDesignGroup(true)}>
                        <Label class="dialog-actions--btn">Create New Row Group</Label>
                    </Button>
                </div>
                <div class="col-md-6 col-12">
                    <Button action="" onclick={() => createNewDesignGroup(false)}>
                        <Label class="dialog-actions--btn">Create New Choice Group</Label>
                    </Button>
                </div>
                <div class="col-12">
                    <Button action="close">
                        <Label class="dialog-actions--btn">Close</Label>
                    </Button>
                </div>
            </div>
        </div>
    </Actions>
</Dialog>
{#if currentDialog === 'privateDesign' && typeof data !== 'undefined'}
    <AppPrivateDesign open={currentDialog === 'privateDesign'} onclose={() => (currentDialog = 'none')} data={data} isRow={bRow} />
{/if}
<script lang="ts">
    import Button, { Label } from '@smui/button';
    import CustomChipInput from '$lib/store/CustomChipInput.svelte';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import IconButton from '@smui/icon-button'; 
    import AppPrivateDesign from './AppPrivateDesign.svelte';
    import { Wrapper } from '$lib/custom/tooltip';
    import Textfield from '$lib/custom/textfield/Textfield.svelte';
    import { app, checkDupId, choiceMap, rowDesignMap, rowMap, objectDesignMap, generateDesignId, optimizedRows, optimizedChoices, optimizedBackpackRows, optimizedBackpackChoices, getRowLabel, getChoiceLabel, scrollToLastRow } from '$lib/store/store.svelte';
	import type { RowDesignGroup, ObjectDesignGroup } from '$lib/store/types';
    import { createVirtualizer } from '@tanstack/svelte-virtual';
    import { onMount } from 'svelte';
    
    let { open, onclose }: { open: boolean; onclose: () => void } = $props();
    let currentDialog = $state<'none' | 'privateDesign'>('none');
    let data = $state<RowDesignGroup | ObjectDesignGroup>();
    let designId = '';
    let bRow = $state(false);
    const rowCount = () => (app.rowDesignGroups?.length ?? 0) + 1;
    const objectCount = () => (app.objectDesignGroups?.length ?? 0) + 1;
    let rowVirtualListEl = $state<HTMLDivElement | null>(null);
    let objectVirtualListEl = $state<HTMLDivElement | null>(null);
    let rowVirtualizer = $state(createVirtualizer({
        count: rowCount(),
        getScrollElement: () => rowVirtualListEl,
        estimateSize: () => 410,
        overscan: 1,
        measureElement: (el) => Math.max(el.getBoundingClientRect().height, 410)
    }));
    let objectVirtualizer = $state(createVirtualizer({
        count: objectCount(),
        getScrollElement: () => objectVirtualListEl,
        estimateSize: () => 410,
        overscan: 1,
        measureElement: (el) => Math.max(el.getBoundingClientRect().height, 410)
    }));
    let rowTotalHeight = $derived.by(() => {
        return $rowVirtualizer.getTotalSize()
    });
    let objectTotalHeight = $derived.by(() => {
        return $objectVirtualizer.getTotalSize()
    });
    let rowItems = $derived.by(() => {
        return $rowVirtualizer.getVirtualItems();
    });
    let objectItems = $derived.by(() => {
        return $objectVirtualizer.getVirtualItems();
    });

    onMount(() => {
        $rowVirtualizer.setOptions({
            getScrollElement: () => rowVirtualListEl,
            estimateSize: () => 410,
            measureElement: (el) => Math.max(el.getBoundingClientRect().height, 410)
        });
        $objectVirtualizer.setOptions({
            getScrollElement: () => objectVirtualListEl,
            estimateSize: () => 410,
            measureElement: (el) => Math.max(el.getBoundingClientRect().height, 410)
        });
    });

    function rowObserveResize(el: HTMLDivElement, index: number) {

        const observer = new ResizeObserver(() => {
            $rowVirtualizer.measureElement(el);
        });
        observer.observe(el);

        return {
            destroy() {
                observer.disconnect();
            }
        };
    }

    function objectObserveResize(el: HTMLDivElement, index: number) {

        const observer = new ResizeObserver(() => {
            $objectVirtualizer.measureElement(el);
        });
        observer.observe(el);

        return {
            destroy() {
                observer.disconnect();
            }
        };
    }

    function changeDesignId(design: RowDesignGroup | ObjectDesignGroup, isRow: boolean) {
        if (design.id === '') {
            design.id = designId;
        } else {
            if (design.id !== designId) {
                let designMap = isRow ? rowDesignMap : objectDesignMap;
                design.id = checkDupId(design.id, designMap);
                designMap.set(design.id, design);
                designMap.delete(designId);
                for (let i = 0; i < design.elements.length; i++) {
                    if (isRow) {
                        const rMap = rowMap.get(design.elements[i]);
                        if (typeof rMap !== 'undefined') {
                            if (rMap.rowDesignGroups) {
                                const idx = rMap.rowDesignGroups.indexOf(designId);
                                rMap.rowDesignGroups[idx] = design.id;
                            }
                        }
                    } else {
                        const cMap = choiceMap.get(design.elements[i]);
                        if (typeof cMap !== 'undefined') {
                            const choice = cMap.choice;
                            if (choice.objectDesignGroups) {
                                const idx = choice.objectDesignGroups.indexOf(designId);
                                choice.objectDesignGroups[idx] = design.id;
                            }
                        }
                    }
                }
                designId = design.id;
            }
        }
    }

    function cloneDesign(designGroup: RowDesignGroup | ObjectDesignGroup, num: number, isRow: boolean) {
        let id = generateDesignId(0, 4, isRow);
        let clone = JSON.parse(JSON.stringify(designGroup));
        clone.id = id;
        let group = isRow ? app.rowDesignGroups : app.objectDesignGroups;
        let designMap = isRow ? rowDesignMap : objectDesignMap;
        if (typeof group !== 'undefined') {
            group.splice(num + 1, 0, clone);
            designMap.set(id, group[num + 1]);
            let ori = designMap.get(designGroup.id);
            if (typeof ori !== 'undefined') {
                for (let i = 0; i < ori.elements.length; i++) {
                    if (isRow) {
                        let rMap = rowMap.get(ori.elements[i]);
                        if (typeof rMap !== 'undefined') {
                            let design = rMap.rowDesignGroups;
                            design?.push(id);
                        }
                    } else {
                        let cMap = choiceMap.get(ori.elements[i]);
                        if (typeof cMap !== 'undefined') {
                            let design = cMap.choice.objectDesignGroups;
                            design?.push(id);
                        }
                    }
                }
            }
        }
    }
    
    function createNewDesignGroup(isRow: boolean) {
        let id = generateDesignId(0, 4, isRow);
        let designGroup = isRow ? app.rowDesignGroups : app.objectDesignGroups;
        let designMap = isRow ? rowDesignMap : objectDesignMap;
        if (typeof designGroup === 'undefined') designGroup = [];
        designGroup.push({
            id: id,
            name: `Design Group ${designGroup.length + 1}`,
            activatedId: '',
            elements: [],
            backpackElements: [],
            styling: {}
        });
        designMap.set(id, designGroup[designGroup.length - 1]);

        if (isRow) {
            if (rowVirtualListEl) {
                $rowVirtualizer.setOptions({
                    count: rowCount()
                });
                scrollToLastRow($rowVirtualizer, rowVirtualListEl, designGroup.length - 1);
            }
        } else {
            if (objectVirtualListEl) {
                $objectVirtualizer.setOptions({
                    count: objectCount()
                });
                scrollToLastRow($objectVirtualizer, objectVirtualListEl, designGroup.length - 1);
            }
        }

    }

    function deleteDesign(id: string, num: number, isRow: boolean) {
        let designGroup = isRow ? app.rowDesignGroups : app.objectDesignGroups;
        let designMap = isRow ? rowDesignMap : objectDesignMap;
        let design = designMap.get(id);
        if (typeof design !== 'undefined') {
            for (let i = 0; i < design.elements.length; i++) {
                if (isRow) {
                    let rMap = rowMap.get(design.elements[i]);
                    if (typeof rMap !== 'undefined') {
                        let rowDesign = rMap.rowDesignGroups;
                        rowDesign?.splice(rowDesign.indexOf(id), 1);
                    }
                } else {
                    let cMap = choiceMap.get(design.elements[i]);
                    if (typeof cMap !== 'undefined') {
                        let objectDesign = cMap.choice.objectDesignGroups;
                        objectDesign?.splice(objectDesign.indexOf(id), 1);
                    }
                }
            }
            for (let i = 0; i < design.backpackElements.length; i++) {
                if (isRow) {
                    let rMap = rowMap.get(design.backpackElements[i]);
                    if (typeof rMap !== 'undefined') {
                        let rowDesign = rMap.rowDesignGroups;
                        rowDesign?.splice(rowDesign.indexOf(id), 1);
                    }
                } else {
                    let cMap = choiceMap.get(design.backpackElements[i]);
                    if (typeof cMap !== 'undefined') {
                        let objectDesign = cMap.choice.objectDesignGroups;
                        objectDesign?.splice(objectDesign.indexOf(id), 1);
                    }
                }
            }
        }
        if (typeof designGroup !== 'undefined') {
            designGroup.splice(num, 1);
            designMap.delete(id);
        }
        if (isRow) {
            $rowVirtualizer.setOptions({
                count: rowCount()
            });
        } else {
            $objectVirtualizer.setOptions({
                count: objectCount()
            });
        }
    }

    function moveDesignDown(num: number, isRow: boolean) {
        let designGroup = isRow ? app.rowDesignGroups : app.objectDesignGroups;
        if (typeof designGroup !== 'undefined') {
            if (num < designGroup.length - 1) {
                designGroup.splice(num, 2, designGroup[num + 1], designGroup[num]);
            }
        }
    }

    function moveDesignUp(num: number, isRow: boolean) {
        let designGroup = isRow ? app.rowDesignGroups : app.objectDesignGroups;
        if (num > 0) {
            if (typeof designGroup !== 'undefined') {
                designGroup.splice(num - 1, 2, designGroup[num], designGroup[num - 1]);
            }
        }
    }

    function  releaseRowElement(e: CustomEvent, design: RowDesignGroup) {
        let key = typeof e.detail === 'object' ? e.detail.chipId : e.detail;
        let row = rowMap.get(key);
        if (typeof row !== 'undefined') {
            if (typeof row.rowDesignGroups !== 'undefined') {
                row.rowDesignGroups.splice(row.rowDesignGroups.indexOf(design.id), 1);
            }
        }
    }

    function setRowElement(e: CustomEvent, design: RowDesignGroup) {
        let row = rowMap.get(e.detail);
        if (typeof row !== 'undefined') {
            if (typeof row.rowDesignGroups === 'undefined') row.rowDesignGroups = [];
            if (row.rowDesignGroups.indexOf(design.id) === -1) row.rowDesignGroups.push(design.id);
        }
    }

    function  releaseChoiceElement(e: CustomEvent, design: ObjectDesignGroup) {
        let key = typeof e.detail === 'object' ? e.detail.chipId : e.detail;
        let cMap = choiceMap.get(key);
        if (typeof cMap !== 'undefined') {
            let choice = cMap.choice;
            if (typeof choice.objectDesignGroups !== 'undefined') {
                choice.objectDesignGroups.splice(choice.objectDesignGroups.indexOf(design.id), 1);
            }
        }
    }

    function setChoiceElement(e: CustomEvent, design: ObjectDesignGroup) {
        let cMap = choiceMap.get(e.detail);
        if (typeof cMap !== 'undefined') {
            let choice = cMap.choice;
            if (typeof choice.objectDesignGroups === 'undefined') choice.objectDesignGroups = [];
            if (choice.objectDesignGroups.indexOf(design.id) === -1) choice.objectDesignGroups.push(design.id);
        }
    }

</script>