<Dialog
    bind:open
    surface$style="width: 1920px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
>
    {#if showAll}
        <Title class="dialog-title" tabindex={0} autofocus>
            Groups
        </Title>
    {:else}
        <div class="d-row align-items-center justify-end">
            <Title class="dialog-title pe-4" tabindex={0} autofocus>
                Groups
            </Title>
            <Wrapper text="Swap Slots">
                <IconButton class="mdi mdi-swap-horizontal-bold" onclickcapture={swapCategory} disabled={curCat === category.idx}/>
            </Wrapper>
            <Select bind:value={curCat} label="Category" alwaysFloat={true}>
                {#each slots as slot, i (i)}
                    <Option value={i}>{i + 1}. {slot.name}</Option>
                {/each}
            </Select>
        </div>
    {/if}
    <Content id="dialog--group" class="pb-2">
        <div style="position: relative; height: {$virtualizer.getTotalSize()}px; width: 100%;">
            {#each $virtualizer.getVirtualItems() as gRow (gRow.index)}
                <div class="py-3" data-index={gRow.index} use:observeResize={gRow.index} style="position: absolute; top: {gRow.start}px; width: 100%;">
                    <div class="row g-3 pb-3">
                        {#each groupRows[gRow.index] as group, i}
                            <div class="col-xl-4 col-12">
                                <div class="point-slot">
                                    <div class="toolbar grey lighten-3 justify-space-around">
                                        <Wrapper text="Move Up">
                                            <IconButton class="mdi mdi-chevron-left" onclickcapture={() => moveGroupUp(group, gRow.index * 3 + i)} />
                                        </Wrapper>
                                        <Wrapper text="Delete Group">
                                            <IconButton class="mdi mdi-delete-forever" onclickcapture={() => deleteGroup(group)} />
                                        </Wrapper>
                                        <Wrapper text="Clone Group">
                                            <IconButton class="mdi mdi-content-copy" onclickcapture={() => cloneGroup(group)} />
                                        </Wrapper>
                                        <Wrapper text="Move Down">
                                            <IconButton class="mdi mdi-chevron-right" onclickcapture={() => moveGroupDown(group, gRow.index * 3 + i)} />
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
                                            <Textfield bind:value={group.id} onfocus={() => groupId = group.id} onchange={() => changeGroupId(group)} label="Group Id" variant="filled" />
                                        </div>
                                        <div class="col-sm-6 col-12">
                                            <Textfield bind:value={group.name} label="Group Name" variant="filled" />
                                        </div>
                                        <div class="col-sm-6 col-12">
                                            <CustomChipInput acValue={group.rowElements} acOptions={getRows()} inputLabel="Row Id" getLabel={getRowLabel} onSelected={setRowElement} onDeselected={releaseRowElement} selectProp={group} />
                                        </div>
                                        <div class="col-sm-6 col-12">
                                            <CustomChipInput acValue={group.elements} acOptions={getChoices()} inputLabel="Choice Id" getLabel={getChoiceLabel} onSelected={setChoiceElement} onDeselected={releaseChoiceElement} selectProp={group}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/each}
                        {#if gRow.index === groupRows.length - 1}
                            <div class="col-xl-4 col-12">
                                <button type="button" class="create-box col-12" style="min-height: 290px; font-size: 40px;" onclickcapture={createNewGroup} aria-label="Create New Word">
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
                <div class="col-sm-6 col-12">
                    <Button action="" onclickcapture={createNewGroup}>
                        <Label class="dialog-actions--btn">Create New Group</Label>
                    </Button>
                </div>
                <div class="col-sm-6 col-12">
                    <Button action="close">
                        <Label class="dialog-actions--btn">Close</Label>
                    </Button>
                </div>
            </div>
        </div>
    </Actions>
</Dialog>
<script lang="ts">
    import Button, { Label } from '@smui/button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import IconButton from '@smui/icon-button';
    import Select, { Option } from '$lib/custom/select';
    import Textfield from '$lib/custom/textfield';
    import { Wrapper } from '$lib/custom/tooltip';
    import CustomChipInput from '$lib/store/CustomChipInput.svelte';
    import { app, checkDupId, choiceMap, groupMap, rowMap, generateGroupId, getRows, getChoices, getRowLabel, getChoiceLabel, scrollToLastRow, categoryMap } from '$lib/store/store.svelte';
    import type { Category, Group } from '$lib/store/types';
    import { createVirtualizer } from '@tanstack/svelte-virtual';
    import { onMount } from 'svelte';
    import CustomAutocomplete from '$lib/store/CustomAutocomplete.svelte';
    
    let { open, onclose, category = {idx: -1, name: '', type: 'group'}, showAll, slots }: { open: boolean; onclose: () => void; category?: Category; showAll: boolean; slots: any } = $props();

    let groupId = '';
    let cIdx = $state(category.idx);
    let curCat = $state(category.idx);
    let catGroup = $derived(showAll ? app.groups : app.groups.filter(item => item.category === cIdx));
    let groupRows = $derived.by(() => {
        const result: any[][] = [];
        for (let i = 0; i < catGroup.length; i += 3) {
            result.push(catGroup.slice(i, i + 3));
        }
        if (result.length === 0) result.push([]);
        return result;
    });
    const rowCount = () => groupRows.length;
    let virtualListEl = $state<HTMLDivElement>(document.getElementById('dialog--group') as HTMLDivElement);
    let virtualizer = $state(createVirtualizer({
        count: rowCount(),
        getScrollElement: () => virtualListEl,
        estimateSize: () => 334,
        overscan: 1,
        measureElement: (el) => Math.max(el.getBoundingClientRect().height, 334) //+72px
    }));
    let gCats = $derived(app.categories.filter(item => item.type === category.type).map(item => item.idx));


    onMount(() => {
        virtualListEl = document.getElementById('dialog--group') as HTMLDivElement;
        $virtualizer.setOptions({
            getScrollElement: () => virtualListEl,
            estimateSize: () => 334,
            measureElement: (el) => Math.max(el.getBoundingClientRect().height, 334)
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

    function changeGroupId(group: Group) {
        if (group.id === '') {
            group.id = groupId;
        } else {
            if (group.id !== groupId) {
                group.id = checkDupId(group.id, groupMap);                
                groupMap.set(group.id, group);
                groupMap.delete(groupId);
                for (let i = 0; i < group.rowElements.length; i++) {
                    const row = rowMap.get(group.rowElements[i]);
                    if (typeof row !== 'undefined') {
                        if (typeof row.groups !== 'undefined') {
                            const idx = row.groups.indexOf(groupId);
                            if (idx !== -1) row.groups[idx] = group.id
                        }
                    }
                }
                for (let i = 0; i < group.elements.length; i++) {
                    const cMap = choiceMap.get(group.elements[i]);
                    if (typeof cMap !== 'undefined') {
                        const choice = cMap.choice;
                        if (typeof choice.groups !== 'undefined') {
                            const idx = choice.groups.indexOf(groupId);
                            if (idx !== -1) choice.groups[idx] = group.id
                        }
                    }
                }
                groupId = group.id;
            }
        }
    }

    function createNewGroup() {
        let id = generateGroupId(0, 4);
        let index = app.groups.length;
        app.groups.push({
            id: id,
            name: `Group ${index + 1}`,
            category: cIdx,
            elements: [],
            rowElements: []
        });
        groupMap.set(id, app.groups[index]);
        
        $virtualizer.setOptions({
            count: rowCount()
        });

        scrollToLastRow($virtualizer, virtualListEl, app.groups.length - 1);
    }

    function cloneGroup(num: number) {
        const group = app.groups[num];
        const clone = JSON.parse(JSON.stringify(group));
        
        clone.id = generateGroupId(0, 4);
        app.groups.splice(num + 1, 0, clone);
        groupMap.set(clone.id, app.groups[num + 1]);

        for (let i = 0; i < clone.rowElements.length; i++) {
            const row = rowMap.get(clone.rowElements[i]);
            if (typeof row !== 'undefined') {
                if (typeof row.groups === 'undefined') row.groups = [];
                row.groups.push(clone.id);
            }
        }

        for (let i = 0; i < clone.elements.length; i++) {
            const cMap = choiceMap.get(clone.elements[i]);
            if (typeof cMap !== 'undefined') {
                const choice = cMap.choice;
                if (typeof choice.groups === 'undefined') choice.groups = [];
                choice.groups.push(clone.id);
            }
        }

        $virtualizer.setOptions({
            count: rowCount()
        });

        scrollToLastRow($virtualizer, virtualListEl, app.groups.length - 1);
    }

    function deleteGroup(group: Group) {
        console.log(group);
        for (let i = 0; i < group.rowElements.length; i++) {
            const row = rowMap.get(group.rowElements[i]);
            if (typeof row !== 'undefined' && typeof row.groups !== 'undefined') {
                row.groups.splice(row.groups.indexOf(group.id), 1);
            }
        }
        for (let i = 0; i < group.elements.length; i++) {
            const cMap = choiceMap.get(group.elements[i]);
            if (typeof cMap !== 'undefined') {
                const choice = cMap.choice;
                if (typeof choice.groups !== 'undefined') {
                    choice.groups.splice(choice.groups.indexOf(group.id), 1);
                    console.log(choice.groups);
                }
            }
        }
        app.groups.splice(app.groups.indexOf(group), 1);
        groupMap.delete(group.id);

        $virtualizer.setOptions({
            count: rowCount()
        });
    }
    

    function moveGroupUp(group: Group, num: number) {
        if (num > 0) {
            const prevIdx = app.groups.indexOf(catGroup[num - 1]);
            const curIdx = app.groups.indexOf(group);
            [app.groups[prevIdx], app.groups[curIdx]] = [app.groups[curIdx], app.groups[prevIdx]];
        }
    }

    function moveGroupDown(group: Group, num: number) {
        if (num < catGroup.length - 1) {
            const nextIdx = app.groups.indexOf(catGroup[num + 1]);
            const curIdx = app.groups.indexOf(group);
            [app.groups[curIdx], app.groups[nextIdx]] = [app.groups[nextIdx], app.groups[curIdx]];
        }
    }

    function releaseChoiceElement(e: CustomEvent, group: Group) {
        const cMap = typeof e.detail === 'object' ? choiceMap.get(e.detail.chipId) : choiceMap.get(e.detail);
        if (typeof cMap !== 'undefined') {
            const row = cMap.row;
            const choice = cMap.choice;
            if (typeof choice.groups !== 'undefined') {
                choice.groups.splice(choice.groups.indexOf(group.id), 1);
                if (typeof row.groups !== 'undefined') {
                    const groupIndex = row.groups.indexOf(group.id);
                    const elementIndex = group.rowElements.indexOf(row.id);
                    if (groupIndex !== -1) row.groups.splice(groupIndex, 1);
                    if (elementIndex !== -1) group.rowElements.splice(elementIndex, 1);
                }
            }
        }
    }

    function releaseRowElement(e: CustomEvent, group: Group) {
        const row = typeof e.detail === 'object' ? rowMap.get(e.detail.chipId) : rowMap.get(e.detail);
        if (typeof row !== 'undefined') {
            if (typeof row.groups !== 'undefined') {
                row.groups.splice(row.groups.indexOf(group.id), 1);
                for (let i = 0; i < row.objects.length; i++) {
                    const choice = row.objects[i];
                    const groupIndex = choice.groups.indexOf(group.id);
                    const elementIndex = group.elements.indexOf(choice.id);
                    if (groupIndex !== -1) choice.groups.splice(groupIndex, 1);
                    if (elementIndex !== -1) group.elements.splice(elementIndex, 1);
                }
            }
        }
    }

    function setChoiceElement(e: CustomEvent, group: Group) {
        const cMap = choiceMap.get(e.detail);
        if (typeof cMap !== 'undefined') {
            const choice = cMap.choice;
            if (typeof choice.groups === 'undefined') choice.groups = [];
            choice.groups.push(group.id);
        }
    }

    function setRowElement(e: CustomEvent, group: Group) {
        const row = rowMap.get(e.detail);
        if (typeof row !== 'undefined') {
            if (typeof row.groups === 'undefined') row.groups = [];
            row.groups.push(group.id);
            for (let i = 0; i < row.objects.length; i++) {
                const choice = row.objects[i];
                if (!choice.groups.includes(group.id)) {
                    choice.groups.push(group.id);
                    group.elements.push(choice.id);
                }
            }
        }
    }

    function getCategoryLabel(idx: number) {
        const cat = categoryMap.get(`group_${idx}`);
        if (typeof cat !== 'undefined') {
            return `${cat.idx + 1}. ${cat.name}`;
        }
        return '';
    }
    
    function swapCategory() {
        const cat = categoryMap.get(`${category.type}_${curCat}`);
        if (typeof cat !== 'undefined') {
            const oldGroup = app.groups.filter(item => item.category === curCat);

            for (let i = 0; i < catGroup.length;) {
                catGroup[i].category = curCat;
            }
            for (let i = 0; i < oldGroup.length; i++) {
                oldGroup[i].category = cIdx;
            }
            category.idx = curCat;
            cat.idx = cIdx;

            categoryMap.set(`${category.type}_${cIdx}`, cat);
            categoryMap.set(`${category.type}_${curCat}`, category);
        } else {
            const oldIdx = category.idx;

            for (let i = 0; i < catGroup.length;) {
                catGroup[i].category = curCat;
            }
            category.idx = curCat;
            slots[curCat].name = category.name;
            slots[curCat].stored = true;
            slots[oldIdx].name = '';
            slots[oldIdx].stored = false;
            categoryMap.set(`${category.type}_${curCat}`, category);
            categoryMap.delete(`${category.type}_${cIdx}`);
        }
        cIdx = curCat;
    }
</script>