<Dialog
    bind:open
    surface$style="width: 600px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
>
    <Title class="dialog-title">
        Choices
    </Title>
    <Content class="p-0">
        <Accordion multiple>
            <section use:dndzone={{ items: itemList, dropFromOthersDisabled: true }} onconsider={handleDndConsider} onfinalize={handleDndFinalize} >
                {#each itemList as item, i (item.id)}
                    <Panel class="m-0" bind:open={() => item.open != null ? item.open : false, (e) => item.open = e} conditionalRender={true}>
                        <Header>
                            <div class:panel--active={item.open}>{`${i + 1}. ${item.debugTitle} ${item.title} / ${item.id}`}</div>
                            {#snippet icon()}
                                <IconButton onclick={(e) => {e.preventDefault(); e.stopPropagation(); scrollToObject(item.id)}} size="mini">
                                    <Icon class="mdi mdi-target"></Icon>
                                </IconButton>
                            {/snippet}
                        </Header>
                        <AcdContent class="py-0 pe-0">
                            {#if typeof item.addons !== 'undefined' && item.addons.length > 0 && item.open}
                                <div class="container-fluid p-0">
                                    {#each item.addons as subItem, j (j)}
                                        <div class="row gx-0 ps-2 py-2 justify-space-between align-items-center">
                                            <div class="col">
                                                {`${j + 1}. ${subItem.title}`}
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
	import { choiceMap } from '$lib/store/store.svelte';
	import type { Addon, Choice, Row } from '$lib/store/types';
	import IconButton, { Icon } from '@smui/icon-button';

    type DndItem = { id: string, debugTitle: string,title: string, addons: Addon[], open?: boolean };
    let { open, onclose, row, mainDiv }: { open: boolean; onclose: () => void; row: Row; mainDiv: HTMLDivElement } = $props();
    let itemList = $state<DndItem[]>(JSON.parse(JSON.stringify(row.objects.map(({ id, debugTitle, title, addons }) => ({ id, debugTitle: (debugTitle != null) ? debugTitle : '', title, addons: addons.map(({ title }) => ({ title }))})))));

    function handleDndConsider(e: CustomEvent) {
        itemList = e.detail.items;
    }

    function handleDndFinalize(e: CustomEvent) {
        itemList = e.detail.items;

        const newOrderIds = itemList.map(item => item.id);
        row.objects = newOrderIds.map(id => row.objects.find(choice => choice.id === id)).filter(Boolean) as Choice[];

        for (let i = 0; i < row.objects.length; i++) {
            row.objects[i].index = i;
        }
    }

    function scrollToObject(id: string) {
        const cMap = choiceMap.get(id);

        if (typeof cMap !== 'undefined' && cMap.choice) {
            const rIdx = cMap.row.index + 1;
            const cIdx = cMap.choice.index + 1;
            const divs = mainDiv.children[rIdx]?.children[1]?.children[1]?.children;

            if (typeof divs !== 'undefined' && typeof divs[cIdx] !== 'undefined') {
                window.scrollTo({top: divs[cIdx].getBoundingClientRect().top + window.scrollY, behavior: 'smooth'});
            }
        }
    }
    
</script>
