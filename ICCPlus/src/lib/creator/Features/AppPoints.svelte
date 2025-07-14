<Dialog
    bind:open
    escapeKeyAction={dlgVariables.currentDialog === 'none' ? 'close' : ''}
    surface$style="width: 1920px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
>
    <Title class="dialog-title" tabindex={0} autofocus>
        Point Types
    </Title>
    <Content id="dialog--point" class="pb-2">
        <div style="position: relative; height: {$virtualizer.getTotalSize()}px; width: 100%;">
            {#each $virtualizer.getVirtualItems() as pRow (pRow.index)}
                <div class="py-3" data-index={pRow.index} use:observeResize={pRow.index} style="position: absolute; top: {pRow.start}px; width: 100%;">
                    <div class="row g-3 pb-3">
                        {#each pointRows[pRow.index] as point, i}
                            <div class="col-xl-4 col-12">
                                <div class="point-slot">
                                    <div class="toolbar grey lighten-3 justify-space-around">
                                        <Wrapper text="Move Left">
                                            <IconButton class="mdi mdi-chevron-left" onclick={() => movePointTypeUp(pRow.index * 3 + i)} />
                                        </Wrapper>
                                        <Wrapper text="Delete Point">
                                            <IconButton class="mdi mdi-delete-forever" onclick={() => deletePointType(point, pRow.index * 3 + i)} />
                                        </Wrapper>
                                        <Wrapper text="Open Point Settings">
                                            <IconButton class="mdi mdi-cog" onclick={() => {dlgVariables.currentDialog = 'appPointSettings'; dlgVariables.point = point}} />
                                        </Wrapper>
                                        <Wrapper text="Clone Point">
                                            <IconButton class="mdi mdi-content-copy" onclick={() => clonePointType(point, pRow.index * 3 + i)} />
                                        </Wrapper>
                                        <Wrapper text="Move Right">
                                            <IconButton class="mdi mdi-chevron-right" onclick={() => movePointTypeDown(pRow.index * 3 + i)} />
                                        </Wrapper>
                                    </div>
                                    <div class="row p-3">
                                        <div class="col-12 mb-2">
                                            <div class="d-column">
                                                <FormField>
                                                    <Switch bind:checked={() => point.belowZeroNotAllowed?? false, (e) => point.belowZeroNotAllowed = e} color="secondary" class="switch-scale" />
                                                    {#snippet label()}
                                                        This score is not allowed to go under 0.
                                                    {/snippet}
                                                </FormField>
                                                <FormField>
                                                    <Switch bind:checked={() => point.isNotShownPointBar?? false, (e) => point.isNotShownPointBar = e} color="secondary" class="switch-scale" />
                                                    {#snippet label()}
                                                        This score is not shown in the Point-Bar.
                                                    {/snippet}
                                                </FormField>
                                                <FormField>
                                                    <Switch bind:checked={() => point.isNotShownObjects?? false, (e) => point.isNotShownObjects = e} color="secondary" class="switch-scale" />
                                                    {#snippet label()}
                                                        This score is not shown in the Choices.
                                                    {/snippet}
                                                </FormField>
                                                <FormField>
                                                    <Switch bind:checked={() => point.allowFloat?? false, (e) => point.allowFloat = e} onSMUISwitchChange={() => {
                                                        if (point.allowFloat) {
                                                            point.decimalPlaces = 2;
                                                        } else {
                                                            delete point.decimalPlaces;
                                                            delete point.allowFloat;
                                                        }
                                                    }} color="secondary" class="switch-scale" />
                                                    {#snippet label()}
                                                        This score can include decimal values.
                                                    {/snippet}
                                                </FormField>
                                                {#if point.allowFloat}
                                                    <Wrapper text={'Digits beyond this value will not be displayed.'}>
                                                        <Textfield bind:value={point.decimalPlaces} label="Decimal Places" type="number" input$min={0} input$step="1" variant="filled" />
                                                    </Wrapper>
                                                {/if}
                                                <FormField>
                                                    <Switch bind:checked={() => point.plussOrMinusAdded?? false, (e) => point.plussOrMinusAdded = e} color="secondary" class="switch-scale" />
                                                    {#snippet label()}
                                                        Add a + or - in front of the scores.
                                                    {/snippet}
                                                </FormField>
                                                {#if point.plussOrMinusAdded}
                                                    <FormField class="ml-4">
                                                        <Switch bind:checked={() => point.plussOrMinusInverted?? false, (e) => point.plussOrMinusInverted = e} color="secondary" class="switch-scale" />
                                                        {#snippet label()}
                                                            Invert the + and -.
                                                        {/snippet}
                                                    </FormField>
                                                {/if}
                                            </div>
                                        </div>
                                        <div class="col-sm-4 col-12 my-2">
                                            <Textfield bind:value={point.id} onfocus={() => pointId = point.id} onchange={() => changePointId(point)} label="The Pointtype Id" variant="filled" required />
                                        </div>
                                        <div class="col-sm-4 col-12 my-2">
                                            <Textfield bind:value={point.name} label="The Pointtype Name" variant="filled" />
                                        </div>
                                        <div class="col-sm-4 col-12 my-2">
                                            <Textfield bind:value={point.startingSum} onchange={() => {
                                                if (!point.allowFloat) {
                                                    point.startingSum = Math.floor(point.startingSum);
                                                }
                                                point.initValue = point.startingSum;
                                            }} label="Starting Sum" type="number" variant="filled" />
                                            </div>
                                        <div class="col-12 my-2">
                                            <Textfield bind:value={point.initValue} onchange={() => {
                                                if (!point.allowFloat) {
                                                    point.initValue = Math.floor(point.initValue);
                                                }
                                            }} label="Initial Value" type="number" variant="filled" />
                                        </div>
                                        <div class="col-sm-4 col-12 my-2">
                                            <Wrapper text={!point.isNotShownPointBar && !point.isNotShownObjects ? 'Enable the \'Not shown\' option to use this.' : 'Enter a Choice ID, Global Requirement ID, or Variable ID.'}>
                                                <Textfield bind:value={point.activatedId} label="Id Needed to Show" variant="filled" disabled={!point.isNotShownPointBar && !point.isNotShownObjects} />
                                            </Wrapper>
                                        </div>
                                        <div class="col-sm-4 col-12 my-2">
                                            <Textfield bind:value={point.beforeText} label="Text Before Number" variant="filled" />
                                        </div>
                                        <div class="col-sm-4 col-12 my-2">
                                            <Textfield bind:value={point.afterText} label="Text After Number" variant="filled" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/each}
                        {#if pRow.index === pointRows.length - 1}
                            <div class="col-xl-4 col-12">
                                <button type="button" class="create-box col-12" style="min-height: 426px; font-size: 40px;" onclick={createNewPointType} aria-label="Create New Point Type">
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
                    <Button action="" onclick={createNewPointType}>
                        <Label class="dialog-actions--btn">Create New Point Type</Label>
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
    import FormField from '@smui/form-field';
    import IconButton from '@smui/icon-button';
    import Switch from '@smui/switch';
    import Textfield from '$lib/custom/textfield';
    import { Wrapper } from '$lib/custom/tooltip';
    import { app, pointTypeMap, generatePointTypeId, dlgVariables, checkDupId, scrollToLastRow } from '$lib/store/store.svelte';
    import type { PointType } from '$lib/store/types';
    import { onMount } from 'svelte';
    import { createVirtualizer } from '@tanstack/svelte-virtual';
    
    let { open, onclose }: { open: boolean; onclose: () => void } = $props();
    let pointId = '';
    let pointRows = $derived.by(() => {
        const result: any[][] = [];
        for (let i = 0; i < app.pointTypes.length; i += 3) {
            result.push(app.pointTypes.slice(i, i + 3));
        }
        if (result.length === 0) result.push([]);
        return result;
    });
    const pointCount = () => pointRows.length;
    let virtualListEl = $state<HTMLDivElement>(document.getElementById('dialog--point') as HTMLDivElement);
    let virtualizer = $state(createVirtualizer({
        count: pointCount(),
        getScrollElement: () => virtualListEl,
        estimateSize: () => 504,
        overscan: 1,
        measureElement: (el) => Math.max(el.getBoundingClientRect().height, 504)
    }));


    onMount(() => {
        virtualListEl = document.getElementById('dialog--point') as HTMLDivElement;
        $virtualizer.setOptions({
            getScrollElement: () => virtualListEl,
            estimateSize: () => 504,
            measureElement: (el) => Math.max(el.getBoundingClientRect().height, 504)
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

    function changePointId(point: PointType) {
        if (point.id === '') {
            point.id = pointId;
        } else {
            if (point.id !== pointId) {
                point.id = checkDupId(point.id, pointTypeMap);                
                pointTypeMap.set(point.id, point);
                pointTypeMap.delete(pointId);
                for (let i = 0; i < app.rows.length; i++) {
                    const row = app.rows[i];

                    for (let j = 0; j < row.objects.length; j++) {
                        const choice = row.objects[j];

                        for (let k = 0; k < choice.scores.length; k++) {
                            const score = choice.scores[k];

                            if (score.id === pointId) {
                                score.id = point.id;
                            }
                        }
                    }
                }
                for (let i = 0; i < app.backpack.length; i++) {
                    const row = app.backpack[i];

                    for (let j = 0; j < row.objects.length; j++) {
                        const choice = row.objects[j];

                        for (let k = 0; k < choice.scores.length; k++) {
                            const score = choice.scores[k];

                            if (score.id === pointId) {
                                score.id = point.id;
                            }
                        }
                    }
                }
                pointId = point.id;
            }
        }
    }

    function clonePointType(point: PointType, num: number) {
        let id = generatePointTypeId(0, 4);
        let clone = JSON.parse(JSON.stringify(point));
        clone.id = id;
        app.pointTypes.splice(num + 1, 0, clone);
        pointTypeMap.set(id, app.pointTypes[num + 1]);

        $virtualizer.setOptions({
            count: pointCount()
        });

        scrollToLastRow($virtualizer, virtualListEl, Math.floor(num / 3) + (num % 3 === 2 ? 1 : 0));
    }

    function createNewPointType() {
        let id = generatePointTypeId(0, 4);
        app.pointTypes.push({
            id: id,
            name: `Point ${app.pointTypes.length + 1}`,
            startingSum: 0,
            initValue: 0,
            activatedId: '',
            beforeText: `Point ${app.pointTypes.length + 1}:`,
            afterText: ''
        });
        pointTypeMap.set(id, app.pointTypes[app.pointTypes.length - 1]);
        
        $virtualizer.setOptions({
            count: pointCount()
        });

        scrollToLastRow($virtualizer, virtualListEl, pointRows.length - 1);
    }


    function deletePointType(point: PointType, num: number) {
        app.pointTypes.splice(num, 1);
        pointTypeMap.delete(point.id);
        $virtualizer.setOptions({
            count: pointCount()
        });
    }

    function movePointTypeUp(num: number) {
        if (num > 0) {
            app.pointTypes.splice(num - 1, 2, app.pointTypes[num], app.pointTypes[num - 1]);
        }
    }

    function movePointTypeDown(num: number) {
        if (num < app.pointTypes.length - 1) {
            app.pointTypes.splice(num, 2, app.pointTypes[num + 1], app.pointTypes[num]);
        }
    }
</script>