<Dialog
    bind:open
    surface$style="width: 800px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
>
    <Title class="dialog-title" tabindex={0} autofocus>
        Variables
    </Title>
    <Content id="dialog--variables" class="pb-2">
        {#if app.variables.length > 4}
            <div style="position: relative; height: {totalHeight}px; width: 100%;">
                {#each items as row (row.index)}
                    <div class="py-3" data-index={row.index} use:observeResize={row.index} style="position: absolute; top: {row.start}px; width: 100%;">
                        {#if app.variables[row.index]}
                            <div class="point-slot">
                                <div class="toolbar grey lighten-3 justify-space-around">
                                    <Wrapper text="Move Up">
                                        <IconButton class="mdi mdi-chevron-up" onclickcapture={() => moveVariableUp(row.index)} />
                                    </Wrapper>
                                    <Wrapper text="Delete Group">
                                        <IconButton class="mdi mdi-delete-forever" onclickcapture={() => deleteVariable(app.variables[row.index].id, row.index)} />
                                    </Wrapper>
                                    <Wrapper text="Move Down">
                                        <IconButton class="mdi mdi-chevron-down" onclickcapture={() => moveVariableDown(row.index)} />
                                    </Wrapper>
                                </div>
                                <div class="row gy-4 p-3">
                                    <div class="col-sm-6 col-12">
                                        <Textfield bind:value={app.variables[row.index].id} onfocus={() => variableId = app.variables[row.index].id} onchange={() => changeVariableId(app.variables[row.index])} label="Id" variant="filled" />
                                    </div>
                                    <div class="col-sm-6 col-12">
                                        <Textfield bind:value={() => app.variables[row.index].isTrue ? 'true' : 'false', (e) => {}} label="Status" variant="filled" disabled />
                                    </div>
                                </div>
                            </div>
                        {:else if row.index === app.variables.length}
                            <div>
                                <button type="button" class="create-box col-12" style="min-height: 138px; font-size: 40px;" onclickcapture={createNewVariable} aria-label="Create New Variable">
                                    <i class="mdi mdi-plus-thick"></i>
                                </button>
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        {:else}
            {#each app.variables as variable, i}
                <div class="point-slot my-5">
                    <div class="toolbar grey lighten-3 justify-space-around">
                        <Wrapper text="Move Up">
                            <IconButton class="mdi mdi-chevron-up" onclickcapture={() => moveVariableUp(i)} />
                        </Wrapper>
                        <Wrapper text="Delete Group">
                            <IconButton class="mdi mdi-delete-forever" onclickcapture={() => deleteVariable(variable.id, i)} />
                        </Wrapper>
                        <Wrapper text="Move Down">
                            <IconButton class="mdi mdi-chevron-down" onclickcapture={() => moveVariableDown(i)} />
                        </Wrapper>
                    </div>
                    <div class="row gy-4 p-3">
                        <div class="col-sm-6 col-12">
                            <Textfield bind:value={variable.id} onfocus={() => variableId = variable.id} onchange={() => changeVariableId(variable)} label="Id" variant="filled" />
                        </div>
                        <div class="col-sm-6 col-12">
                            <Textfield bind:value={() => variable.isTrue ? 'true' : 'false', (e) => {}} label="Status" variant="filled" disabled />
                        </div>
                    </div>
                </div>
            {/each}
            <div class="my-5">
                <button type="button" class="create-box col-12" style="min-height: 138px; font-size: 40px;" onclickcapture={createNewVariable} aria-label="Create New Variable">
                    <i class="mdi mdi-plus-thick"></i>
                </button>
            </div>
        {/if}
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
    import Textfield from '$lib/custom/textfield/Textfield.svelte';
    import { Wrapper } from '$lib/custom/tooltip';
    import { app, checkDupId, variableMap, generateVariableId, scrollToLastRow } from '$lib/store/store.svelte';
    import type { Variable } from '$lib/store/types';
    import { createVirtualizer } from '@tanstack/svelte-virtual';
    import { onMount } from 'svelte';
    
    let { open, onclose }: { open: boolean; onclose: () => void } = $props();
    let variableId = '';
    const rowCount = () => app.variables.length + 1;
    let virtualListEl = $state<HTMLDivElement>(document.getElementById('dialog--vairables') as HTMLDivElement);
    let virtualizer = $state(createVirtualizer({
        count: rowCount(),
        getScrollElement: () => virtualListEl,
        estimateSize: () => 180,
        overscan: 1,
        measureElement: (el) => Math.max((el as HTMLElement).offsetHeight, 180),
    }));
    let totalHeight = $derived.by(() => {
        return $virtualizer.getTotalSize()
    });
    let items = $derived.by(() => {
        return $virtualizer.getVirtualItems();
    });

    onMount(() => {
        virtualListEl = document.getElementById('dialog--variables') as HTMLDivElement;
        setTimeout(() => {
            $virtualizer.setOptions({
                getScrollElement: () => virtualListEl,
                estimateSize: () => 180,
                measureElement: (el) => Math.max((el as HTMLElement).offsetHeight, 180),
            });
        }, 0);
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
        app.variables.push({id: id, isTrue: false});
        variableMap.set(id, app.variables[app.variables.length - 1]);

        if (app.variables.length > 4) {
            $virtualizer.setOptions({
                count: rowCount()
            });
            scrollToLastRow($virtualizer, virtualListEl, app.variables.length - 1);
        }
    }

    function deleteVariable(id: string, num: number) {
        app.variables.splice(num, 1);
        variableMap.delete(id);

        if (app.variables.length > 4) {
            $virtualizer.setOptions({
                count: rowCount()
            });
        }
    }

    function moveVariableDown(num: number) {
        if (num < app.variables.length - 1) {
            app.variables.splice(num, 2, app.variables[num + 1], app.variables[num]);
        }
    }

    function moveVariableUp(num: number) {
        if (num > 0) {
            app.variables.splice(num - 1, 2, app.variables[num], app.variables[num - 1]);
        }
    }
</script>