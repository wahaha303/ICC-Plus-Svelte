<Dialog
    bind:open
    escapeKeyAction={currentDialog === 'none' ? 'close' : ''}
    surface$style="width: 1920px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
>
    <Title class="dialog-title" tabindex={0} autofocus>
        {isRow ? 'Row' : 'Choice'} Design Groups
    </Title>
    <Content id="dialog--design-group" class="pb-2">
        <div style="position: relative; height: {$virtualizer.getTotalSize()}px; width: 100%;">
            {#each $virtualizer.getVirtualItems() as gRow (gRow.index)}
                <div class="py-3" data-index={gRow.index} use:observeResize={gRow.index} style="position: absolute; top: {gRow.start}px; width: 100%;">
                    <div class="row g-3 pb-3">
                        {#each groupRows[gRow.index] as group, i}
                            <div class="col-xl-4 col-12">
                                <div class="point-slot">
                                    <div class="toolbar grey lighten-3 justify-space-around">
                                        <Wrapper text="Move Up">
                                            <IconButton class="mdi mdi-chevron-up" onclickcapture={() => moveDesignUp(group, i)} />
                                        </Wrapper>
                                        <Wrapper text="Delete Design">
                                            <IconButton class="mdi mdi-delete-forever" onclickcapture={() => deleteDesign(group.id, i)} />
                                        </Wrapper>
                                        <Wrapper text="Open Design Settings">
                                            <IconButton class="mdi mdi-pencil" onclickcapture={() => {currentDialog = 'privateDesign', data = group}} />
                                        </Wrapper>
                                        <Wrapper text="Clone Design">
                                            <IconButton class="mdi mdi-content-copy" onclickcapture={() => cloneDesign(group, i)} />
                                        </Wrapper>
                                        <Wrapper text="Move Down">
                                            <IconButton class="mdi mdi-chevron-down" onclickcapture={() => moveDesignDown(group, i)} />
                                        </Wrapper>
                                    </div>
                                    <div class="row gy-4 p-3">
                                        <div class="col-12">
                                        <CustomAutocomplete
                                            options={gCats}
                                            getOptionLabel={getCategoryLabel}
                                            bindObj={group}
                                            bindVal="category"
                                            label="Category"
                                            toggle={true}
                                            showMenuWithNoInput={true}
                                            textfield$variant="filled"
                                            innerClass="w-100 p-0"
                                        />
                                    </div>
                                        <div class="col-sm-6 col-12">
                                            <Textfield bind:value={group.id} onfocus={() => designId = group.id} onchange={() => changeDesignId(group)} label="Id" variant="filled" />
                                        </div>
                                        <div class="col-sm-6 col-12">
                                            <Textfield bind:value={group.name} label="Name" variant="filled" />
                                        </div>
                                        <div class="col-12">
                                            <Textfield bind:value={group.activatedId} label="Id Needed to Show" variant="filled" />
                                        </div>
                                        <div class="col-12">
                                            <CustomChipInput acValue={group.elements} acOptions={isRow ? getRows() : getChoices()} inputLabel="Row Id" getLabel={isRow ? getRowLabel : getChoiceLabel} onSelected={isRow ? setRowElement : setChoiceElement} onDeselected={isRow ? releaseRowElement : releaseChoiceElement} selectProp={group}/>
                                        </div>
                                        <div class="col-12">
                                            <CustomChipInput acValue={group.backpackElements} acOptions={isRow ? getBackpackRows() : getBackpackChoices()} inputLabel="Backpack Row Id" getLabel={isRow ? getRowLabel : getChoiceLabel} onSelected={isRow ? setRowElement : setChoiceElement} onDeselected={isRow ? releaseRowElement : releaseChoiceElement} selectProp={group}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/each}
                        {#if gRow.index === groupRows.length - 1}
                            <div class="col-xl-4 col-12">
                                <button type="button" class="create-box col-12" style="min-height: 450px; font-size: 40px;" onclickcapture={createNewDesignGroup} aria-label="Create New Design Group">
                                    <i class="mdi mdi-plus-thick"></i>
                                </button>
                            </div>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    </Content>
    <Actions>
        <div class="container-fluid">
            <div class="row p-0">
                <div class="col-md-6 col-12">
                    <Button action="" onclickcapture={() => createNewDesignGroup()}>
                        <Label class="dialog-actions--btn">Create New Design Group</Label>
                    </Button>
                </div>
                <div class="col-md-6 col-12">
                    <Button action="close">
                        <Label class="dialog-actions--btn">Close</Label>
                    </Button>
                </div>
            </div>
        </div>
    </Actions>
</Dialog>
{#if currentDialog === 'privateDesign' && typeof data !== 'undefined'}
    <AppPrivateDesign open={currentDialog === 'privateDesign'} onclose={() => (currentDialog = 'none')} data={data} isRow={isRow} />
{/if}
<script lang="ts">
    import Button, { Label } from '@smui/button';
    import CustomChipInput from '$lib/store/CustomChipInput.svelte';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import IconButton from '@smui/icon-button'; 
    import AppPrivateDesign from './AppPrivateDesign.svelte';
    import { Wrapper } from '$lib/custom/tooltip';
    import Textfield from '$lib/custom/textfield/Textfield.svelte';
    import { app, checkDupId, choiceMap, rowDesignMap, rowMap, objectDesignMap, generateDesignId, getRows, getChoices, getBackpackRows, getBackpackChoices, getRowLabel, getChoiceLabel, scrollToLastRow, categoryMap } from '$lib/store/store.svelte';
	import type { RowDesignGroup, ObjectDesignGroup, Category } from '$lib/store/types';
    import { createVirtualizer } from '@tanstack/svelte-virtual';
    import { onMount } from 'svelte';
    import CustomAutocomplete from '$lib/store/CustomAutocomplete.svelte';
    
    let { open, onclose, category = {idx: -1, name: '', type: 'rDesign'}, showAll, isRow }: { open: boolean; onclose: () => void; category?: Category; showAll: boolean; isRow: boolean } = $props();
    let currentDialog = $state<'none' | 'privateDesign'>('none');
    let data = $state<RowDesignGroup | ObjectDesignGroup>();
    let designId = '';
    let designGroup = (isRow ? app.rowDesignGroups : app.objectDesignGroups) || [];
    let catGroup = $derived(showAll ? designGroup : designGroup.filter(item => item.category === category.idx));
    let groupRows = $derived.by(() => {
        const result: any[][] = [];
        for (let i = 0; i < catGroup.length; i += 3) {
            result.push(catGroup.slice(i, i + 3));
        }
        if (result.length === 0) result.push([]);
        return result;
    });
    const rowCount = () => groupRows.length;
    let virtualListEl = $state<HTMLDivElement>(document.getElementById('dialog--design-group') as HTMLDivElement);
    let virtualizer = $state(createVirtualizer({
        count: rowCount(),
        getScrollElement: () => virtualListEl,
        estimateSize: () => 482,
        overscan: 1,
        measureElement: (el) => Math.max(el.getBoundingClientRect().height, 482) //+72px
    }));
    let gCats = $derived(app.categories.filter(item => item.type === category.type).map(item => item.idx));


    onMount(() => {
        virtualListEl = document.getElementById('dialog--design-group') as HTMLDivElement;
        $virtualizer.setOptions({
            getScrollElement: () => virtualListEl,
            estimateSize: () => 482,
            measureElement: (el) => Math.max(el.getBoundingClientRect().height, 482)
        });
    });

    function observeResize(el: HTMLDivElement, index: number) {

        const observer = new ResizeObserver(() => {
            $virtualizer.measureElement(el);
        });
        observer.observe(el);

        return {
            destroy() {
                observer.disconnect();
            }
        };
    }

    function changeDesignId(design: RowDesignGroup | ObjectDesignGroup) {
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

    function cloneDesign(group: RowDesignGroup | ObjectDesignGroup, num: number) {
        let id = generateDesignId(0, 4, isRow);
        let clone = JSON.parse(JSON.stringify(designGroup));
        clone.id = id;
        let designMap = isRow ? rowDesignMap : objectDesignMap;

        designGroup.splice(num + 1, 0, clone);
        designMap.set(id, designGroup[num + 1]);
        let ori = designMap.get(group.id);

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

        $virtualizer.setOptions({
            count: rowCount()
        });

        scrollToLastRow($virtualizer, virtualListEl, Math.floor(num / 3) + (num % 3 === 2 ? 1 : 0));
    }
    
    function createNewDesignGroup() {
        let id = generateDesignId(0, 4, isRow);
        let designMap = isRow ? rowDesignMap : objectDesignMap;

        designGroup.push({
            id: id,
            name: `Design Group ${designGroup.length + 1}`,
            activatedId: '',
            category: showAll ? -1 : category.idx,
            elements: [],
            backpackElements: [],
            styling: {}
        });
        designMap.set(id, designGroup[designGroup.length - 1]);

        $virtualizer.setOptions({
            count: rowCount()
        });

        scrollToLastRow($virtualizer, virtualListEl, groupRows.length - 1);
    }

    function deleteDesign(id: string, num: number) {
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
        
        $virtualizer.setOptions({
            count: rowCount()
        });
    }

    function moveDesignUp(design: RowDesignGroup | ObjectDesignGroup, num: number) {
        if (num > 0) {
            const prevIdx = designGroup.indexOf(catGroup[num - 1]);
            const curIdx = designGroup.indexOf(design);
            [designGroup[prevIdx], designGroup[curIdx]] = [designGroup[curIdx], designGroup[prevIdx]];
        }
    }

    function moveDesignDown(group: RowDesignGroup | ObjectDesignGroup, num: number) {
        if (num < catGroup.length - 1) {
            const nextIdx = designGroup.indexOf(catGroup[num + 1]);
            const curIdx = designGroup.indexOf(group);
            [designGroup[curIdx], designGroup[nextIdx]] = [designGroup[nextIdx], designGroup[curIdx]];
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

    function getCategoryLabel(idx: number) {
        const cat = categoryMap.get(`${isRow ? 'rDesign' : 'cDesign'}_${idx}`);
        if (typeof cat !== 'undefined') {
            return `${cat.idx + 1}. ${cat.name}`;
        }
        return '';
    }
</script>