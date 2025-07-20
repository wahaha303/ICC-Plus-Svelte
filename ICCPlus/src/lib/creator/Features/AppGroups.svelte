<Dialog
    bind:open
    surface$style="width: 800px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
>
    <Title class="dialog-title" tabindex={0} autofocus>
        Groups
    </Title>
    <Content id="dialog--group" class="pb-2">
        {#if app.groups.length > 3}
            <div style="position: relative; height: {totalHeight}px; width: 100%;">
                {#each items as row (row.index)}
                    <div class="py-3" data-index={row.index} use:observeResize={row.index} style="position: absolute; top: {row.start}px; width: 100%; min-height: 262px;">
                        {#if app.groups[row.index]}
                            <div class="point-slot">
                                <div class="toolbar grey lighten-3 justify-space-around">
                                    <Wrapper text="Move Up">
                                        <IconButton class="mdi mdi-chevron-up" onclick={() => moveGroupUp(row.index)} />
                                    </Wrapper>
                                    <Wrapper text="Delete Group">
                                        <IconButton class="mdi mdi-delete-forever" onclick={() => deleteGroup(app.groups[row.index].id, row.index)} />
                                    </Wrapper>
                                    <Wrapper text="Move Down">
                                        <IconButton class="mdi mdi-chevron-down" onclick={() => moveGroupDown(row.index)} />
                                    </Wrapper>
                                </div>
                                <div class="row gy-4 p-3">
                                    <div class="col-sm-6 col-12">
                                        <Textfield bind:value={app.groups[row.index].id} onfocus={() => groupId = app.groups[row.index].id} onchange={() => changeGroupId(app.groups[row.index])} label="Group Id" variant="filled" />
                                    </div>
                                    <div class="col-sm-6 col-12">
                                        <Textfield bind:value={app.groups[row.index].name} label="Group Name" variant="filled" />
                                    </div>
                                    <div class="col-sm-6 col-12">
                                        <CustomChipInput acValue={app.groups[row.index].rowElements} acOptions={getRows()} inputLabel="Row Id" getLabel={getRowLabel} onSelected={setRowElement} onDeselected={releaseRowElement} selectProp={app.groups[row.index]} />
                                    </div>
                                    <div class="col-sm-6 col-12">
                                        <CustomChipInput acValue={app.groups[row.index].elements} acOptions={getChoices()} inputLabel="Choice Id" getLabel={getChoiceLabel} onSelected={setChoiceElement} onDeselected={releaseChoiceElement} selectProp={app.groups[row.index]}/>
                                    </div>
                                </div>
                            </div>
                        {/if}
                        {#if row.index === app.groups.length}
                            <div>
                                <button type="button" class="create-box col-12" style="min-height: 218px; font-size: 40px;" onclick={createNewGroup} aria-label="Create New Group">
                                    <i class="mdi mdi-plus-thick"></i>
                                </button>
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        {:else}
            <div class="py-3">
                {#each app.groups as group, i}
                    <div class="point-slot my-5">
                        <div class="toolbar grey lighten-3 justify-space-around">
                            <Wrapper text="Move Up">
                                <IconButton class="mdi mdi-chevron-up" onclick={() => moveGroupUp(i)} />
                            </Wrapper>
                            <Wrapper text="Delete Group">
                                <IconButton class="mdi mdi-delete-forever" onclick={() => deleteGroup(group.id, i)} />
                            </Wrapper>
                            <Wrapper text="Move Down">
                                <IconButton class="mdi mdi-chevron-down" onclick={() => moveGroupDown(i)} />
                            </Wrapper>
                        </div>
                        <div class="row gy-4 p-3">
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
                {/each}
                <div class="my-5">
                    <button type="button" class="create-box col-12" style="min-height: 218px; font-size: 40px;" onclick={createNewGroup} aria-label="Create New Group">
                        <i class="mdi mdi-plus-thick"></i>
                    </button>
                </div>
            </div>
        {/if}
    </Content>
    <Actions>
        <div class="container-fluid">
            <div class="row p-0">
                <div class="col-sm-6 col-12">
                    <Button action="" onclick={createNewGroup}>
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
    import Textfield from '$lib/custom/textfield';
    import { Wrapper } from '$lib/custom/tooltip';
    import CustomChipInput from '$lib/store/CustomChipInput.svelte';
    import { app, checkDupId, choiceMap, groupMap, rowMap, generateGroupId, getRows, getChoices, scrollToLastRow } from '$lib/store/store.svelte';
    import type { Group } from '$lib/store/types';
    import { createVirtualizer } from '@tanstack/svelte-virtual';
    import { onMount } from 'svelte';
    
    let { open, onclose }: { open: boolean; onclose: () => void } = $props();

    let groupId = '';
    const rowCount = () => app.groups.length + 1;
    let virtualListEl = $state<HTMLDivElement>(document.getElementById('dialog--group') as HTMLDivElement);
    let virtualizer = $state(createVirtualizer({
        count: rowCount(),
        getScrollElement: () => virtualListEl,
        estimateSize: () => 262,
        overscan: 2,
        measureElement: (el) => Math.max((el as HTMLElement).offsetHeight, 262),
    }));
    let totalHeight = $derived.by(() => {
        return $virtualizer.getTotalSize()
    });
    let items = $derived.by(() => {
        return $virtualizer.getVirtualItems();
    });

    onMount(() => {
        virtualListEl = document.getElementById('dialog--group') as HTMLDivElement;
        setTimeout(() => {
            $virtualizer.setOptions({
                getScrollElement: () => virtualListEl,
                estimateSize: (index) => estimateSize(index - 1),
                measureElement: (el) => Math.max((el as HTMLElement).offsetHeight, 262),
            });
        }, 0);
    });

    function estimateSize(index: number) {
        const group = app.groups[index];
        if (!group) {
            return 262;
        }
        const height = 262 + (Math.max(group.rowElements.length, group.elements.length) * 24);
        return height;
    }

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
            elements: [],
            rowElements: []
        });
        groupMap.set(id, app.groups[index]);
        
        if (app.groups.length > 3) {
            $virtualizer.setOptions({
                count: rowCount()
            });

            scrollToLastRow($virtualizer, virtualListEl, app.groups.length - 1);
        }
    }

    function deleteGroup(id: string, num: number) {
        app.groups.splice(num, 1);
        groupMap.delete(id);

        if (app.groups.length > 3) {
            $virtualizer.setOptions({
                count: rowCount()
            });
        }
    }
    
    function getChoiceLabel(str: string) {
        let cMap = choiceMap.get(str);
        if (typeof cMap !== 'undefined') {
            let choice = cMap.choice;
            return `${choice.id} | ${choice.debugTitle ? choice.debugTitle : ''} ${choice.title}`;
        }
        return '';
    }

    function getRowLabel(str: string) {
        let row = rowMap.get(str);
        if (typeof row !== 'undefined') {
            return `${row.id} | ${row.debugTitle ? row.debugTitle : ''} ${row.title}`;
        }
        return '';
    }

    function moveGroupDown(num: number) {
        if (num < app.groups.length - 1) {
            app.groups.splice(num, 2, app.groups[num + 1], app.groups[num]);
        }
    }

    function moveGroupUp(num: number) {
        if (num > 0) {
            app.groups.splice(num - 1, 2, app.groups[num], app.groups[num - 1]);
        }
    }

    function releaseChoiceElement(e: CustomEvent, group: Group) {
        let cMap = typeof e.detail === 'object' ? choiceMap.get(e.detail.chipId) : choiceMap.get(e.detail);
        if (typeof cMap !== 'undefined') {
            let row = cMap.row;
            let choice = cMap.choice;
            if (typeof choice.groups !== 'undefined') {
                choice.groups.splice(choice.groups.indexOf(group.id), 1);
                if (typeof row.groups !== 'undefined') {
                    let groupIndex = row.groups.indexOf(group.id);
                    let elementIndex = group.rowElements.indexOf(row.id);
                    if (groupIndex !== -1) row.groups.splice(groupIndex, 1);
                    if (elementIndex !== -1) group.rowElements.splice(elementIndex, 1);
                }
            }
        }
    }

    function  releaseRowElement(e: CustomEvent, group: Group) {
        let row = typeof e.detail === 'object' ? rowMap.get(e.detail.chipId) : rowMap.get(e.detail);
        if (typeof row !== 'undefined') {
            if (typeof row.groups !== 'undefined') {
                row.groups.splice(row.groups.indexOf(group.id), 1);
                for (let i = 0; i < row.objects.length; i++) {
                    let choice = row.objects[i];
                    let groupIndex = choice.groups.indexOf(group.id);
                    let elementIndex = group.elements.indexOf(choice.id);
                    if (groupIndex !== -1) choice.groups.splice(groupIndex, 1);
                    if (elementIndex !== -1) group.elements.splice(elementIndex, 1);
                }
            }
        }
    }

    function setChoiceElement(e: CustomEvent, group: Group) {
        let cMap = choiceMap.get(e.detail);
        if (typeof cMap !== 'undefined') {
            let choice = cMap.choice;
            if (typeof choice.groups === 'undefined') choice.groups = [];
            choice.groups.push(group.id);
        }
    }

    function setRowElement(e: CustomEvent, group: Group) {
        let row = rowMap.get(e.detail);
        if (typeof row !== 'undefined') {
            if (typeof row.groups === 'undefined') row.groups = [];
            row.groups.push(group.id);
            for (let i = 0; i < row.objects.length; i++) {
                let choice = row.objects[i];
                if (!choice.groups.includes(group.id)) {
                    choice.groups.push(group.id);
                    group.elements.push(choice.id);
                }
            }
        }
    }
    
</script>