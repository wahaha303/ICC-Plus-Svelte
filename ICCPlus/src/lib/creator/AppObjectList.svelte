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
            <section use:dndzone={{ items: itemList, dropFromOthersDisabled: true, flipDurationMs: 0, morphDisabled: true, dropAnimationDisabled: true }} onconsider={handleDndConsider} onfinalize={handleDndFinalize} >
                {#each itemList as item (item.id)}
                    <Panel class="m-0" bind:open={() => openItems[item.id] ?? false, (e) => openItems[item.id] = e} conditionalRender={true}>
                        <Header>
                            <div class:panel--active={openItems[item.id]} class="list__title">{item.num}. {item.debugTitle || ''} {@html item.title} / {item.id}</div>
                            {#snippet icon()}
                                <IconButton onclickcapture={(e) => {e.preventDefault(); e.stopPropagation(); scrollToObject(item.id)}} size="mini">
                                    <Icon class="mdi mdi-target"></Icon>
                                </IconButton>
                            {/snippet}
                        </Header>
                        <AcdContent class="py-0 pe-0">
                            {#if typeof item.addons !== 'undefined' && item.addons.length > 0 && openItems[item.id]}
                                <div class="container-fluid p-0">
                                    {#each item.addons as subItem}
                                        <div class="row gx-0 ps-2 py-2 justify-space-between align-items-center">
                                            <div class="col list__title">
                                                {subItem.num}. {@html subItem.title}
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
	import { choiceMap, sanitizeArg } from '$lib/store/store.svelte';
	import type { Choice, Row } from '$lib/store/types';
	import IconButton, { Icon } from '@smui/icon-button';

    type DndItem = { id: string, debugTitle: string, title: string, num: number, addons: { title: string, num: number }[] };
    let { open, onclose, row, mainDiv }: { open: boolean; onclose: () => void; row: Row; mainDiv: HTMLDivElement } = $props();

    // svelte-ignore state_referenced_locally
    let itemList = $state.raw<DndItem[]>(row.objects.map(({ id, debugTitle, title, addons }, index) => ({ id, debugTitle: debugTitle != null ? debugTitle : '', title: DOMPurify.sanitize(title, sanitizeArg), num: index + 1, addons: addons.map(({ title }, index) => ({ title: DOMPurify.sanitize(title, sanitizeArg), num: index + 1 }))})));
    let openItems = $state<Record<string, boolean>>({});

    function handleDndConsider(e: CustomEvent) {
        itemList = e.detail.items;
    }

    function handleDndFinalize(e: CustomEvent) {
        const finalItems: DndItem[] = e.detail.items;
        const choiceById = new Map(row.objects.map(choice => [choice.id, choice] as const));
        const reordered = finalItems.map(item => choiceById.get(item.id)).filter((choice): choice is Choice => choice !== undefined);

        if (reordered.length !== finalItems.length) {
            return;
        }

        for (let i = 0; i < reordered.length; i++) {
            reordered[i].index = i;
        }

        row.objects = reordered;

        itemList = finalItems.map((item, index) => ({ ...item, num: index + 1 }));
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
