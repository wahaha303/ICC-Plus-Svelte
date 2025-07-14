<Dialog
    bind:open
    escapeKeyAction={currentDialog === 'none' ? 'close' : ''}
    surface$style="width: 800px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
>
    <Title class="dialog-title" tabindex={0} autofocus>
        Global Requirements
    </Title>
    <Content id="dialog--global-req" class="pb-2">
        {#if app.globalRequirements && app.globalRequirements.length > 3}
            <div style="position: relative; height: {totalHeight}px; width: 100%;">
                {#each items as row (row.index)}
                    <div class="py-3" data-index={row.index} use:observeResize={row.index} style="position: absolute; top: {row.start}px; width: 100%;">
                        {#if app.globalRequirements && app.globalRequirements[row.index]}
                            <div class="point-slot">
                                <div class="toolbar grey lighten-3 justify-space-around">
                                    <Wrapper text="Move Up">
                                        <IconButton class="mdi mdi-chevron-up" onclick={() => moveReqUp(row.index)} />
                                    </Wrapper>
                                    <Wrapper text="Delete Global Requirement">
                                        <IconButton class="mdi mdi-delete-forever" onclick={() => deleteReq(app.globalRequirements![row.index].id, row.index)} />
                                    </Wrapper>
                                    <Wrapper text="Add Requirement">
                                        <IconButton class="mdi mdi-key-plus" onclick={() => {currentDialog = 'appRequirement'; data = app.globalRequirements![row.index]}} />
                                    </Wrapper>
                                    <Wrapper text="Clone Global Requirement">
                                        <IconButton class="mdi mdi mdi-content-copy" onclick={() => cloneReq(app.globalRequirements![row.index], row.index)} />
                                    </Wrapper>
                                    <Wrapper text="Move Down">
                                        <IconButton class="mdi mdi-chevron-down" onclick={() => moveReqDown(row.index)} />
                                    </Wrapper>
                                </div>
                                <div class="row gy-3 p-3">
                                    <div class="col-sm-6 col-12">
                                        <Textfield bind:value={app.globalRequirements[row.index].id} onfocus={() => reqId = app.globalRequirements![row.index].id} onchange={() => changeReqId(app.globalRequirements![row.index])} label="Id" variant="filled" />
                                    </div>
                                    <div class="col-sm-6 col-12">
                                        <Textfield bind:value={app.globalRequirements![row.index].name} label="Name" variant="filled" />
                                    </div>
                                </div>
                                <div class="row gx-0">
                                    <div class="col p-2">
                                        {#if app.globalRequirements[row.index].requireds.length > 0}
                                            <Accordion>
                                                <Panel variant="unelevated">
                                                    <Header class="p-0">
                                                        Requirements: {app.globalRequirements![row.index].requireds.length}
                                                    </Header>
                                                    <AcdContent>
                                                        <div class="row gy-4">
                                                            {#each app.globalRequirements[row.index].requireds as required, i}
                                                                <div class="{required.requireds.length > 0 ? 'col-12' : 'col-sm-6 col-12'} p-2">
                                                                    <ObjectRequired required={required} isEditModeOn={true} />
                                                                    <Button onclick={() => app.globalRequirements![row.index].requireds.splice(i, 1)} class="mt-1" variant="raised">
                                                                        <Label>Delete</Label>
                                                                    </Button>
                                                                </div>
                                                            {/each}
                                                        </div>
                                                    </AcdContent>
                                                </Panel>
                                            </Accordion>
                                        {/if}
                                    </div>
                                </div>
                            </div>
                        {:else if row.index === app.globalRequirements.length}
                            <div>
                                <button type="button" class="create-box col-12" style="min-height: 154px; font-size: 40px;" onclick={createNewGlobalReq} aria-label="Create New Group">
                                    <i class="mdi mdi-plus-thick"></i>
                                </button>
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        {:else if app.globalRequirements}
            <div class="py-3">
                {#each app.globalRequirements as req, i}
                    <div class="point-slot my-5">
                        <div class="toolbar grey lighten-3 justify-space-around">
                            <Wrapper text="Move Up">
                                <IconButton class="mdi mdi-chevron-up" onclick={() => moveReqUp(i)} />
                            </Wrapper>
                            <Wrapper text="Delete Global Requirement">
                                <IconButton class="mdi mdi-delete-forever" onclick={() => deleteReq(req.id, i)} />
                            </Wrapper>
                            <Wrapper text="Add Requirement">
                                <IconButton class="mdi mdi-key-plus" onclick={() => {currentDialog = 'appRequirement'; data = req}} />
                            </Wrapper>
                            <Wrapper text="Clone Global Requirement">
                                <IconButton class="mdi mdi mdi-content-copy" onclick={() => cloneReq(req, i)} />
                            </Wrapper>
                            <Wrapper text="Move Down">
                                <IconButton class="mdi mdi-chevron-down" onclick={() => moveReqDown(i)} />
                            </Wrapper>
                        </div>
                        <div class="row gy-3 p-3">
                            <div class="col-sm-6 col-12">
                                <Textfield bind:value={req.id} onfocus={() => reqId = req.id} onchange={() => changeReqId(req)} label="Id" variant="filled" />
                            </div>
                            <div class="col-sm-6 col-12">
                                <Textfield bind:value={req.name} label="Name" variant="filled" />
                            </div>
                        </div>
                        <div class="row gx-0">
                            <div class="col p-2">
                                {#if req.requireds.length > 0}
                                    <Accordion>
                                        <Panel variant="unelevated">
                                            <Header class="p-0">
                                                Requirements: {req.requireds.length}
                                            </Header>
                                            <AcdContent>
                                                <div class="row gy-4">
                                                    {#each req.requireds as required, j}
                                                        <div class="{required.requireds.length > 0 ? 'col-12' : 'col-sm-6 col-12'} p-2">
                                                            <ObjectRequired required={required} isEditModeOn={true} />
                                                            <Button onclick={() => req.requireds.splice(j, 1)} class="mt-1" variant="raised">
                                                                <Label>Delete</Label>
                                                            </Button>
                                                        </div>
                                                    {/each}
                                                </div>
                                            </AcdContent>
                                        </Panel>
                                    </Accordion>
                                {/if}
                            </div>
                        </div>
                    </div>
                {/each}
                <div class="my-5">
                    <button type="button" class="create-box col-12" style="min-height: 154px; font-size: 40px;" onclick={createNewGlobalReq} aria-label="Create New Group">
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
                    <Button action="" onclick={createNewGlobalReq}>
                        <Label class="dialog-actions--btn">Create New Global Requirement</Label>
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
{#if currentDialog === 'appRequirement' && typeof data !== 'undefined'}
    <AppRequirement open={currentDialog === 'appRequirement'} onclose={() => (currentDialog = 'none')} data={data} />
{/if}

<script lang="ts">
    import Accordion, { Panel, Header, Content as AcdContent} from '@smui-extra/accordion';
    import AppRequirement from '../AppRequirement.svelte';
    import Button, { Label } from '@smui/button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import IconButton from '@smui/icon-button';
    import ObjectRequired from '../Object/ObjectRequired.svelte';
    import Textfield from '$lib/custom/textfield';
    import { Wrapper } from '$lib/custom/tooltip';
    import { app, checkDupId, globalReqMap, scrollToLastRow } from '$lib/store/store.svelte';
	import type { GlobalRequirement, Requireds } from '$lib/store/types';
    import { createVirtualizer } from '@tanstack/svelte-virtual';
    import { onMount } from 'svelte';
    
    let { open, onclose }: { open: boolean; onclose: () => void } = $props();
    let currentDialog = $state<'none' | 'appRequirement'>('none');
    let data = $state<GlobalRequirement | Requireds>();
    let reqId = '';
    const rowCount = () => (app.globalRequirements?.length ?? 0) + 1;
    let virtualListEl = $state<HTMLDivElement>(document.getElementById('dialog--group') as HTMLDivElement);
    let virtualizer = $state(createVirtualizer({
        count: rowCount(),
        getScrollElement: () => virtualListEl,
        estimateSize: () => 232,
        overscan: 1,
        measureElement: (el) => Math.max(el.getBoundingClientRect().height, 232)
    }));
    let totalHeight = $derived.by(() => {
        return $virtualizer.getTotalSize()
    });
    let items = $derived.by(() => {
        return $virtualizer.getVirtualItems();
    });

    onMount(() => {
        virtualListEl = document.getElementById('dialog--global-req') as HTMLDivElement;
        $virtualizer.setOptions({
            getScrollElement: () => virtualListEl,
            estimateSize: () => 232,
            measureElement: (el) => Math.max(el.getBoundingClientRect().height, 232)
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

    function changeReqId(req: GlobalRequirement) {
        if (req.id === '') {
            req.id = reqId;
        } else {
            if (req.id !== reqId) {
                req.id = checkDupId(req.id, globalReqMap);                
                globalReqMap.set(req.id, req);
                globalReqMap.delete(reqId);
                reqId = req.id;
            }
        }
    }

    function cloneReq(req: GlobalRequirement, num: number) {
        let id = generateReqId(0, 4);
        let clone = JSON.parse(JSON.stringify(req));
        clone.id = id;
        if (typeof app.globalRequirements !== 'undefined') {
            app.globalRequirements.splice(num + 1, 0, clone);
            globalReqMap.set(id, app.globalRequirements[num + 1]);
        }

        if (app.globalRequirements!.length > 3) {
            $virtualizer.setOptions({
                count: rowCount()
            });

            scrollToLastRow($virtualizer, virtualListEl, num + 1);
        }
    }

    function createNewGlobalReq() {
        let id = generateReqId(0, 4);
        if (typeof app.globalRequirements === 'undefined') app.globalRequirements = [];
        let index = app.globalRequirements.length;
        app.globalRequirements.push({
            id: id,
            name: `Requirement ${index + 1}`,
            requireds: [],
        });
        globalReqMap.set(id, app.globalRequirements[index]);

        if (app.globalRequirements.length > 3) {
            $virtualizer.setOptions({
                count: rowCount()
            });

            scrollToLastRow($virtualizer, virtualListEl, app.globalRequirements.length - 1);
        }
    }

    function deleteReq(id: string, num: number) {
        if (typeof app.globalRequirements !== 'undefined') {
            app.globalRequirements.splice(num, 1);
            globalReqMap.delete(id);

            if (app.globalRequirements.length > 3) {
                $virtualizer.setOptions({
                    count: rowCount()
                });
            }
        }
    }

    function generateReqId(repeated: number, strLength: number) {
        let id = 'Req-';
        let str = 'abcdefghijklmnopqrstuvwxyz0123456789';
        for (var o = 0; o < strLength; o++) {
            id += str.charAt(Math.floor(Math.random() * str.length));
        }
        if (globalReqMap.has(id)) {
            if (repeated > 2) {
                return generateReqId(0, ++strLength);
            } else {
                return generateReqId(++repeated, strLength);
            }
        } else {
            return id;
        }
    }

    function moveReqDown(num: number) {
        if (typeof app.globalRequirements !== 'undefined') {
            if (num < app.globalRequirements.length - 1) {
                app.globalRequirements.splice(num, 2, app.globalRequirements[num + 1], app.globalRequirements[num]);
            }
        }
    }

    function moveReqUp(num: number) {
        if (typeof app.globalRequirements !== 'undefined') {
            if (num > 0) {
                app.globalRequirements.splice(num - 1, 2, app.globalRequirements[num], app.globalRequirements[num - 1]);
            }
        }
    }
    
</script>