<Dialog
    bind:open
    surface$style="width: 600px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
>
    <Title class="dialog-title">
        Rows
    </Title>
    <Content class="p-0">
        <Accordion multiple>
            <section use:dndzone={{ items: itemList, dropFromOthersDisabled: true }} onconsider={handleDndConsider} onfinalize={handleDndFinalize} >
                {#each itemList as item, i (item.id)}
                    <Panel class="m-0" bind:open={() => item.open != null ? item.open : false, (e) => item.open = e} conditionalRender={true}>
                        <Header>
                            <div class:panel--active={item.open} class="list__title">{@html `${i + 1}. ${item.debugTitle || ''} ${item.title} / ${item.id}`} </div>
                            {#snippet icon()}
                                <IconButton onclickcapture={(e) => {e.preventDefault(); e.stopPropagation(); scrollToRow(item.id)}} size="mini">
                                    <Icon class="mdi mdi-target"></Icon>
                                </IconButton>
                            {/snippet}
                        </Header>
                        <AcdContent class="py-0 pe-0">
                            {#if typeof item.objects !== 'undefined' && item.objects.length > 0 && item.open}
                                <div class="container-fluid p-0">
                                    {#each item.objects as subItem, j (subItem.id)}
                                        <div class="row gx-0 ps-2 py-2 justify-space-between align-items-center">
                                            <div class="col list__title">
                                                {`${j + 1}. ${subItem.debugTitle || ''} ${subItem.title} / ${subItem.id}`}
                                            </div>
                                            <div class="col pe-3 text-right">
                                                <IconButton onclickcapture={(e) => {e.preventDefault(); e.stopPropagation(); scrollToObject(subItem.id)}} size="mini">
                                                    <Icon class="mdi mdi-target"></Icon>
                                                </IconButton>
                                            </div>
                                        </div>
                                    {/each}
                                </div>
                            {/if}
                        </AcdContent>
                    </Panel>
                {/each}
            </section>
        </Accordion>
    </Content>
    <Actions>
        <Button action="close">
            <Label class="dialog-actions--btn">Close</Label>
        </Button>
    </Actions>
</Dialog>
<script lang="ts">
    import Accordion, { Panel, Header, Content as AcdContent} from '$lib/custom/accordion';
    import Button, { Label } from '@smui/button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import { dndzone } from 'svelte-dnd-action';
	import { app, choiceMap, rowMap } from '$lib/store/store.svelte';
	import type { Choice, Row } from '$lib/store/types';
	import IconButton, { Icon } from '@smui/icon-button';
    import { tick } from 'svelte';

    type DndItem = { id: string, debugTitle: string, title: string, objects: Choice[], open?: boolean };
    let { open, onclose, mainDiv }: { open: boolean; onclose: () => void; mainDiv: HTMLDivElement } = $props();
    let itemList = $state<DndItem[]>(JSON.parse(JSON.stringify(app.rows.map(({ id, debugTitle, title, objects }) => ({ id, debugTitle: (debugTitle != null) ? debugTitle : '', title, objects: objects.map(({ id, debugTitle, title }) => ({ id, debugTitle: (debugTitle != null) ? debugTitle : '', title}))})))));

    function handleDndConsider(e: CustomEvent) {
        itemList = e.detail.items;
    }

    function handleDndFinalize(e: CustomEvent) {
        itemList = e.detail.items;

        const newOrderIds = itemList.map(item => item.id);
        app.rows = newOrderIds.map(id => app.rows.find(row => row.id === id)).filter(Boolean) as Row[];

        for (let i = 0; i < app.rows.length; i++) {
            app.rows[i].index = i;
        }
    }

    function scrollToRow(id: string) {
        const row = rowMap.get(id);
        
        if (typeof row !== 'undefined') {
            const rIdx = app.useToolbarBtn ? row.index : row.index + 1;
            const divs = mainDiv.children;

            if (typeof divs !== 'undefined' && typeof divs[rIdx] !== 'undefined') {
                window.scrollTo({top: divs[rIdx].getBoundingClientRect().top + window.scrollY, behavior: 'smooth'});
            }
        }
    }

    function scrollToObject(id: string) {
        const cMap = choiceMap.get(id);

        if (typeof cMap !== 'undefined' && cMap.choice) {
            const rIdx = app.useToolbarBtn ? cMap.row.index : cMap.row.index + 1;
            const cIdx = cMap.choice.index;
            const divs = mainDiv.children[rIdx]?.children[1]?.children[1]?.children;
            const target = typeof divs === 'undefined' ? mainDiv.children[rIdx] : divs[cIdx];

            if (typeof target !== 'undefined') {
                window.scrollTo({top: target.getBoundingClientRect().top + window.scrollY, behavior: 'smooth'});
            }
        }
    }
    
</script>
