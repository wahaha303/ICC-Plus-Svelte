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
            <section use:dndzone={{ items: itemList, dropFromOthersDisabled: true, flipDurationMs: 0, morphDisabled: true, dropAnimationDisabled: true }} onconsider={handleDndConsider} onfinalize={handleDndFinalize} >
                {#each itemList as item (item.id)}
                    <Panel class="m-0" bind:open={() => openItems[item.id] ?? false, (e) => openItems[item.id] = e} conditionalRender={true}>
                        <Header>
                            <div class:panel--active={openItems[item.id]} class="list__title">{item.num}. {item.debugTitle || ''} {@html item.title} / {item.id}</div>
                            {#snippet icon()}
                                <IconButton onclickcapture={(e) => {e.preventDefault(); e.stopPropagation(); scrollToRow(item.id)}} size="mini">
                                    <Icon class="mdi mdi-target"></Icon>
                                </IconButton>
                            {/snippet}
                        </Header>
                        <AcdContent class="py-0 pe-0">
                            {#if typeof item.objects !== 'undefined' && item.objects.length > 0 && openItems[item.id]}
                                <div class="container-fluid p-0">
                                    {#each item.objects as subItem (subItem.id)}
                                        <div class="row gx-0 ps-2 py-2 justify-space-between align-items-center">
                                            <div class="col list__title">
                                                {subItem.num}. {subItem.debugTitle || ''} {@html subItem.title} / {subItem.id}
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
    import DOMPurify from 'dompurify';
    import { dndzone } from 'svelte-dnd-action';
	import { app, choiceMap, rowMap, sanitizeArg } from '$lib/store/store.svelte';
	import type { Row } from '$lib/store/types';
	import IconButton, { Icon } from '@smui/icon-button';

    type DndItem = { id: string, debugTitle: string, title: string, num: number, objects: { id: string, debugTitle: string, title: string, num: number }[] };
    let { open, onclose, mainDiv }: { open: boolean; onclose: () => void; mainDiv: HTMLDivElement } = $props();

    // svelte-ignore state_referenced_locally
    let itemList = $state<DndItem[]>(app.rows.map(({ id, debugTitle, title, objects }, index) => ({ id, debugTitle: debugTitle ?? '', title: DOMPurify.sanitize(title, sanitizeArg), num: index + 1, objects: objects.map(({ id, debugTitle, title }, index) => ({ id, debugTitle: debugTitle ?? '', title: DOMPurify.sanitize(title, sanitizeArg), num: index + 1 }))})));
    let openItems = $state<Record<string, boolean>>({});

    function handleDndConsider(e: CustomEvent) {
        itemList = e.detail.items;
    }

    function handleDndFinalize(e: CustomEvent) {
        const finalItems: DndItem[] = e.detail.items;
        const rowById = new Map(app.rows.map(row => [row.id, row] as const));
        const reordered = finalItems.map(item => rowById.get(item.id)).filter((row): row is Row => row !== undefined);

        if (reordered.length !== finalItems.length) {
            return;
        }

        for (let i = 0; i < app.rows.length; i++) {
            reordered[i].index = i;
        }

        app.rows = reordered;

        itemList = finalItems.map((item, index) => ({ ...item, num: index + 1 }));
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
