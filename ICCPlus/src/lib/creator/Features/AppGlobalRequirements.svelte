<Dialog
    bind:open
    escapeKeyAction={currentDialog === 'none' ? 'close' : ''}
    surface$style="width: 1920px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
>
    {#if showAll}
        <Title class="dialog-title" tabindex={0} autofocus>
            Global Requirements
        </Title>
    {:else}
        <div class="d-row align-items-center justify-end">
            <Title class="dialog-title pe-4" tabindex={0} autofocus>
                Global Requirements
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
    <Content id="dialog--global-req" class="pb-2">
        <div style="position: relative; height: {$virtualizer.getTotalSize()}px; width: 100%;">
            {#each $virtualizer.getVirtualItems() as rRow (rRow.index)}
                <div class="py-3" data-index={rRow.index} use:observeResize={rRow.index} style="position: absolute; top: {rRow.start}px; width: 100%;">
                    <div class="row g-3 pb-3">
                        {#each reqRows[rRow.index] as req, i}
                            <div class="col-xl-4 col-12">
                                <div class="point-slot">
                                    <div class="toolbar grey lighten-3 justify-space-around">
                                        <Wrapper text="Move Up">
                                            <IconButton class="mdi mdi-chevron-up" onclickcapture={() => moveReqUp(req, i)} />
                                        </Wrapper>
                                        <Wrapper text="Delete Global Requirement">
                                            <IconButton class="mdi mdi-delete-forever" onclickcapture={() => deleteReq(req.id, i)} />
                                        </Wrapper>
                                        <Wrapper text="Add Requirement">
                                            <IconButton class="mdi mdi-key-plus" onclickcapture={() => {currentDialog = 'appRequirement'; data = req}} />
                                        </Wrapper>
                                        <Wrapper text="Clone Global Requirement">
                                            <IconButton class="mdi mdi mdi-content-copy" onclickcapture={() => cloneReq(req, i)} />
                                        </Wrapper>
                                        <Wrapper text="Move Down">
                                            <IconButton class="mdi mdi-chevron-down" onclickcapture={() => moveReqDown(req, i)} />
                                        </Wrapper>
                                    </div>
                                    <div class="row gy-3 p-3">
                                        <div class="col-12">
                                            <CustomAutocomplete
                                                options={rCats}
                                                getOptionLabel={getCategoryLabel}
                                                bindObj={req}
                                                bindVal="category"
                                                label="Category"
                                                toggle={true}
                                                showMenuWithNoInput={true}
                                                textfield$variant="filled"
                                                innerClass="w-100 p-0"
                                            />
                                        </div>
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
                                                                        <Button onclickcapture={() => req.requireds.splice(j, 1)} class="mt-1" variant="raised">
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
                            </div>
                        {/each}
                        {#if rRow.index === reqRows.length - 1}
                            <div class="col-xl-4 col-12">
                                <button type="button" class="create-box col-12" style="min-height: 226px; font-size: 40px;" onclickcapture={createNewGlobalReq} aria-label="Create New Requirement">
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
                    <Button action="" onclickcapture={createNewGlobalReq}>
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
    import Accordion, { Panel, Header, Content as AcdContent} from '$lib/custom/accordion';
    import AppRequirement from '../AppRequirement.svelte';
    import Button, { Label } from '@smui/button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import IconButton from '@smui/icon-button';
    import ObjectRequired from '../Object/ObjectRequired.svelte';
    import Select, { Option } from '$lib/custom/select';
    import Textfield from '$lib/custom/textfield';
    import { Wrapper } from '$lib/custom/tooltip';
    import { app, categoryMap, checkDupId, globalReqMap, scrollToLastRow } from '$lib/store/store.svelte';
	import type { Category, GlobalRequirement, Requireds } from '$lib/store/types';
    import { createVirtualizer } from '@tanstack/svelte-virtual';
    import { onMount } from 'svelte';
    import CustomAutocomplete from '$lib/store/CustomAutocomplete.svelte';
    
    let { open, onclose, category = {idx: -1, name: '', type: 'globalReq'}, showAll, slots }: { open: boolean; onclose: () => void; category?: Category; showAll: boolean; slots: any } = $props();
    let currentDialog = $state<'none' | 'appRequirement'>('none');
    let data = $state<GlobalRequirement | Requireds>();
    let reqId = '';
    let cIdx = $state(category.idx);
    let curCat = $state(category.idx);
    let catReq = $derived(showAll ? app.globalRequirements! : app.globalRequirements!.filter(item => item.category === cIdx));
    let reqRows = $derived.by(() => {
        const result: any[][] = [];
        for (let i = 0; i < catReq.length; i += 3) {
            result.push(catReq.slice(i, i + 3));
        }
        if (result.length === 0) result.push([]);
        return result;
    });
    const rowCount = () => reqRows.length;
    let virtualListEl = $state<HTMLDivElement>(document.getElementById('dialog--global-req') as HTMLDivElement);
    let virtualizer = $state(createVirtualizer({
        count: rowCount(),
        getScrollElement: () => virtualListEl,
        estimateSize: () => 252,
        overscan: 1,
        measureElement: (el) => Math.max(el.getBoundingClientRect().height, 305) //+72px
    }));
    let rCats = $derived(app.categories.filter(item => item.type === category.type).map(item => item.idx));


    onMount(() => {
        virtualListEl = document.getElementById('dialog--global-req') as HTMLDivElement;
        $virtualizer.setOptions({
            getScrollElement: () => virtualListEl,
            estimateSize: () => 305,
            measureElement: (el) => Math.max(el.getBoundingClientRect().height, 305)
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
            category: cIdx,
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

    function moveReqUp(req: GlobalRequirement, num: number) {
        if (typeof app.globalRequirements !== 'undefined' && num > 0) {
            const prevIdx = app.globalRequirements.indexOf(catReq[num - 1]);
            const curIdx = app.globalRequirements.indexOf(req);
            [app.globalRequirements[prevIdx], app.globalRequirements[curIdx]] = [app.globalRequirements[curIdx], app.globalRequirements[prevIdx]];
        }
    }

    function moveReqDown(req: GlobalRequirement, num: number) {
        if (typeof app.globalRequirements !== 'undefined' && num < catReq.length - 1) {
            const nextIdx = app.globalRequirements.indexOf(catReq[num + 1]);
            const curIdx = app.globalRequirements.indexOf(req);
            [app.globalRequirements[curIdx], app.globalRequirements[nextIdx]] = [app.globalRequirements[nextIdx], app.globalRequirements[curIdx]];
        }
    }

    function getCategoryLabel(idx: number) {
        const cat = categoryMap.get(`req_${idx}`);
        if (typeof cat !== 'undefined') {
            return `${cat.idx + 1}. ${cat.name}`;
        }
        return '';
    }

    function swapCategory() {
        const cat = categoryMap.get(`${category.type}_${curCat}`);
        if (typeof cat !== 'undefined') {
            const oldReq = app.globalRequirements!.filter(item => item.category === curCat);

            for (let i = 0; i < catReq.length;) {
                catReq[i].category = curCat;
            }
            for (let i = 0; i < oldReq.length; i++) {
                oldReq[i].category = cIdx;
            }
            category.idx = curCat;
            cat.idx = cIdx;

            categoryMap.set(`${category.type}_${cIdx}`, cat);
            categoryMap.set(`${category.type}_${curCat}`, category);
        } else {
            const oldIdx = category.idx;

            for (let i = 0; i < catReq.length;) {
                catReq[i].category = curCat;
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