<Dialog
    bind:open
    surface$style="width: 800px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
>
    <Title class="dialog-title" tabindex={0} autofocus>
        Words
    </Title>
    <Content id="dialog--word" class="pb-2">
        {#if app.words.length > 4}
            <div style="position: relative; height: {totalHeight}px; width: 100%;">
                {#each items as row (row.index)}
                    <div class="py-3" style="position: absolute; top: {row.start}px; width: 100%;">
                        {#if app.words[row.index]}
                            <div class="point-slot">
                                <div class="toolbar grey lighten-3 justify-space-around">
                                    <Wrapper text="Move Up">
                                        <IconButton class="mdi mdi-chevron-up" onclick={() => moveWordUp(row.index)} />
                                    </Wrapper>
                                    <Wrapper text="Delete Group">
                                        <IconButton class="mdi mdi-delete-forever" onclick={() => deleteWord(app.words[row.index].id, row.index)} />
                                    </Wrapper>
                                    <Wrapper text="Move Down">
                                        <IconButton class="mdi mdi-chevron-down" onclick={() => moveWordDown(row.index)} />
                                    </Wrapper>
                                </div>
                                <div class="row gy-4 p-3">
                                    <div class="col-sm-6 col-12">
                                        <Textfield bind:value={app.words[row.index].id} onfocus={() => wordId = app.words[row.index].id} onchange={() => changeWordId(app.words[row.index])} label="Id that can be placed in the text" variant="filled" />
                                    </div>
                                    <div class="col-sm-6 col-12">
                                        <Textfield bind:value={app.words[row.index].replaceText} label="Text to replace id with" variant="filled" />
                                    </div>
                                </div>
                            </div>
                        {:else if row.index === app.words.length}
                            <div>
                                <button type="button" class="create-box col-12" style="min-height: 138px; font-size: 40px;" onclick={createNewWord} aria-label="Create New Word">
                                    <i class="mdi mdi-plus-thick"></i>
                                </button>
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        {:else}
            {#each app.words as word, i}
                <div class="point-slot my-5">
                    <div class="toolbar grey lighten-3 justify-space-around">
                        <Wrapper text="Move Up">
                            <IconButton class="mdi mdi-chevron-up" onclick={() => moveWordUp(i)} />
                        </Wrapper>
                        <Wrapper text="Delete Group">
                            <IconButton class="mdi mdi-delete-forever" onclick={() => deleteWord(word.id, i)} />
                        </Wrapper>
                        <Wrapper text="Move Down">
                            <IconButton class="mdi mdi-chevron-down" onclick={() => moveWordDown(i)} />
                        </Wrapper>
                    </div>
                    <div class="row gy-4 p-3">
                        <div class="col-sm-6 col-12">
                            <Textfield bind:value={word.id} onfocus={() => wordId = word.id} onchange={() => changeWordId(word)} label="Id that can be placed in the text" variant="filled" />
                        </div>
                        <div class="col-sm-6 col-12">
                            <Textfield bind:value={word.replaceText} label="Text to replace id with" variant="filled" />
                        </div>
                    </div>
                </div>
            {/each}
            <div class="my-5">
                <button type="button" class="create-box col-12" style="min-height: 138px; font-size: 40px;" onclick={createNewWord} aria-label="Create New Word">
                    <i class="mdi mdi-plus-thick"></i>
                </button>
            </div>
        {/if}
    </Content>
    <Actions>
        <div class="container-fluid">
            <div class="row p-0">
                <div class="col-sm-6 col-12">
                    <Button action="" onclick={createNewWord}>
                        <Label class="dialog-actions--btn">Create New Word</Label>
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
    import { app, checkDupId, wordMap, generateWordId, scrollToLastRow } from '$lib/store/store.svelte';
    import type { Word } from '$lib/store/types';
    import { createVirtualizer } from '@tanstack/svelte-virtual';
    import { onMount } from 'svelte';
    
    let { open, onclose }: { open: boolean; onclose: () => void } = $props();
    let wordId = '';
    const rowCount = () => app.words.length + 1;
    let virtualListEl = $state<HTMLDivElement>(document.getElementById('dialog--word') as HTMLDivElement);
    let virtualizer = $state(createVirtualizer({
        count: rowCount(),
        getScrollElement: () => virtualListEl,
        estimateSize: () => 180,
        overscan: 1
    }));
    let totalHeight = $derived.by(() => {
        return $virtualizer.getTotalSize()
    });
    let items = $derived.by(() => {
        return $virtualizer.getVirtualItems();
    });

    onMount(() => {
        virtualListEl = document.getElementById('dialog--word') as HTMLDivElement;
        $virtualizer.setOptions({
            getScrollElement: () => virtualListEl,
            estimateSize: () => 180
        });
    });

    function changeWordId(word: Word) {
        if (word.id === '') {
            word.id = wordId;
        } else {
            if (word.id !== wordId) {
                word.id = checkDupId(word.id, wordMap);
                wordMap.set(word.id, word);
                wordMap.delete(wordId);
                wordId = word.id;
            }
        }
    }

    function createNewWord() {
        let id = generateWordId(0, 4);
        app.words.push({id: id, replaceText: ''});
        wordMap.set(id, app.words[app.words.length - 1]);

        if (app.words.length > 4) {
            $virtualizer.setOptions({
                count: rowCount()
            });
            scrollToLastRow($virtualizer, virtualListEl, app.words.length - 1);
        }
    }

    function deleteWord(id: string, num: number) {
        app.words.splice(num, 1);
        wordMap.delete(id);

        if (app.words.length > 4) {
            $virtualizer.setOptions({
                count: rowCount()
            });
        }
    }

    function moveWordDown(num: number) {
        if (num < app.words.length - 1) {
            app.words.splice(num, 2, app.words[num + 1], app.words[num]);
        }
    }

    function moveWordUp(num: number) {
        if (num > 0) {
            app.words.splice(num - 1, 2, app.words[num], app.words[num - 1]);
        }
    }
    
</script>