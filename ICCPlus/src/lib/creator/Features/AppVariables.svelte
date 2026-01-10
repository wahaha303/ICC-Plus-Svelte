<Dialog
    bind:open
    surface$style="width: 1920px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
>
    {#if showAll}
        <Title class="dialog-title" tabindex={0} autofocus>
            Variables
        </Title>
    {:else}
        <div class="d-row align-items-center justify-end">
            <Title class="dialog-title pe-4" tabindex={0} autofocus>
                Variables
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
    <Content id="dialog--variables" class="pb-2">
        <div style="position: relative; height: {$virtualizer.getTotalSize()}px; width: 100%;">
            {#each $virtualizer.getVirtualItems() as vRow (vRow.index)}
                <div class="py-3" data-index={vRow.index} use:observeResize={vRow.index} style="position: absolute; top: {vRow.start}px; width: 100%;">
                    <div class="row g-3 pb-3">
                        {#each variableRows[vRow.index] as variable, i}
                            <div class="col-xl-4 col-12">
                                <div class="point-slot">
                                    <div class="toolbar grey lighten-3 justify-space-around">
                                        <Wrapper text="Move Up">
                                            <IconButton class="mdi mdi-chevron-left" onclickcapture={() => moveVariableUp(variable, vRow.index * 3 + i)} />
                                        </Wrapper>
                                        <Wrapper text="Delete Word">
                                            <IconButton class="mdi mdi-delete-forever" onclickcapture={() => deleteVariable(variable)} />
                                        </Wrapper>
                                        <Wrapper text="Move Down">
                                            <IconButton class="mdi mdi-chevron-right" onclickcapture={() => moveVariableDown(variable, vRow.index * 3 + i)} />
                                        </Wrapper>
                                    </div>
                                    <div class="row gy-4 p-3">
                                        <div class="col-12">
                                            <CustomAutocomplete
                                                options={vCats}
                                                getOptionLabel={getCategoryLabel}
                                                bindObj={variable}
                                                bindVal="category"
                                                label="Category"
                                                toggle={true}
                                                showMenuWithNoInput={true}
                                                textfield$variant="filled"
                                                innerClass="w-100 p-0"
                                            />
                                        </div>
                                        <div class="col-sm-6 col-12">
                                            <Textfield bind:value={variable.id} onfocus={() => variableId = variable.id} onchange={() => changeVariableId(variable)} label="Id" variant="filled" />
                                        </div>
                                        <div class="col-sm-6 col-12">
                                            <Textfield bind:value={() => variable.isTrue ? 'true' : 'false', (e) => {}} label="Status" variant="filled" disabled />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/each}
                        {#if vRow.index === variableRows.length - 1}
                            <div class="col-xl-4 col-12">
                                <button type="button" class="create-box col-12" style="min-height: 210px; font-size: 40px;" onclickcapture={createNewVariable} aria-label="Create New Word">
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
            <div class="row">
                <div class="col-sm-6 col-12">
                    <Button action="" onclickcapture={createNewVariable}>
                        <Label class="dialog-actions--btn">Create New Variable</Label>
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
    import Textfield from '$lib/custom/textfield/Textfield.svelte';
    import { Wrapper } from '$lib/custom/tooltip';
    import { app, checkDupId, variableMap, generateVariableId, scrollToLastRow, categoryMap } from '$lib/store/store.svelte';
    import type { Category, Variable } from '$lib/store/types';
    import { createVirtualizer } from '@tanstack/svelte-virtual';
    import { onMount } from 'svelte';
    import CustomAutocomplete from '$lib/store/CustomAutocomplete.svelte';
    
    let { open, onclose, category = {idx: -1, name: '', type: 'variable'}, showAll, slots }: { open: boolean; onclose: () => void; category?: Category; showAll: boolean; slots: any } = $props();
    let variableId = '';
    let cIdx = $state(category.idx);
    let curCat = $state(category.idx);
    let catVariable = $derived(showAll ? app.variables : app.variables.filter(item => item.category === cIdx));
    let variableRows = $derived.by(() => {
        const result: any[][] = [];
        for (let i = 0; i < catVariable.length; i += 3) {
            result.push(catVariable.slice(i, i + 3));
        }
        if (result.length === 0) result.push([]);
        return result;
    });
    const rowCount = () => variableRows.length;
    let virtualListEl = $state<HTMLDivElement>(document.getElementById('dialog--variables') as HTMLDivElement);
    let virtualizer = $state(createVirtualizer({
        count: rowCount(),
        getScrollElement: () => virtualListEl,
        estimateSize: () => 252,
        overscan: 1,
        measureElement: (el) => Math.max(el.getBoundingClientRect().height, 252) //+72px
    }));
    let vCats = $derived(app.categories.filter(item => item.type === category.type).map(item => item.idx));


    onMount(() => {
        virtualListEl = document.getElementById('dialog--variables') as HTMLDivElement;
        $virtualizer.setOptions({
            getScrollElement: () => virtualListEl,
            estimateSize: () => 252,
            measureElement: (el) => Math.max(el.getBoundingClientRect().height, 252)
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

    function changeVariableId(variable: Variable) {
        if (variable.id === '') {
            variable.id = variableId;
        } else {
            if (variable.id !== variableId) {
                variable.id = checkDupId(variable.id, variableMap);
                variableMap.set(variable.id, variable);
                variableMap.delete(variableId);
                variableId = variable.id;
            }
        }
    }

    function createNewVariable() {
        let id = generateVariableId(0, 4);
        app.variables.push({id: id, isTrue: false, category: cIdx});
        variableMap.set(id, app.variables[app.variables.length - 1]);

        $virtualizer.setOptions({
            count: rowCount()
        });
        scrollToLastRow($virtualizer, virtualListEl, app.variables.length - 1);
    }

    function deleteVariable(variable: Variable) {
        app.variables.splice(app.variables.indexOf(variable), 1);
        variableMap.delete(variable.id);

        $virtualizer.setOptions({
            count: rowCount()
        });
    }

    function moveVariableUp(variable: Variable, num: number) {
        if (num > 0) {
            const prevIdx = app.variables.indexOf(catVariable[num - 1]);
            const curIdx = app.variables.indexOf(variable);
            [app.variables[prevIdx], app.variables[curIdx]] = [app.variables[curIdx], app.variables[prevIdx]];
        }
    }

    function moveVariableDown(variable: Variable, num: number) {
        if (num < catVariable.length - 1) {
            const nextIdx = app.variables.indexOf(catVariable[num + 1]);
            const curIdx = app.variables.indexOf(variable);
            [app.variables[curIdx], app.variables[nextIdx]] = [app.variables[nextIdx], app.variables[curIdx]];
        }
    }

    function getCategoryLabel(idx: number) {
        const cat = categoryMap.get(`variable_${idx}`);
        if (typeof cat !== 'undefined') {
            return `${cat.idx + 1}. ${cat.name}`;
        }
        return '';
    }

    function swapCategory() {
        const cat = categoryMap.get(`${category.type}_${curCat}`);
        if (typeof cat !== 'undefined') {
            const oldVariable = app.variables.filter(item => item.category === curCat);

            for (let i = 0; i < catVariable.length;) {
                catVariable[i].category = curCat;
            }
            for (let i = 0; i < oldVariable.length; i++) {
                oldVariable[i].category = cIdx;
            }
            category.idx = curCat;
            cat.idx = cIdx;

            categoryMap.set(`${category.type}_${cIdx}`, cat);
            categoryMap.set(`${category.type}_${curCat}`, category);
        } else {
            const oldIdx = category.idx;

            for (let i = 0; i < catVariable.length;) {
                catVariable[i].category = curCat;
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