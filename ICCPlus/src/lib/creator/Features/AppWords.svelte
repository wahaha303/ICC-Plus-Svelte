<Dialog
    bind:open
    surface$style="width: 1920px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
>
    {#if showAll}
        <Title class="dialog-title" tabindex={0} autofocus>
            Words
        </Title>
    {:else}
        <div class="d-row align-items-center justify-end">
            <Title class="dialog-title pe-4" tabindex={0} autofocus>
                Words
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
    <Content id="dialog--word" class="pb-2">
        <div style="position: relative; height: {$virtualizer.getTotalSize()}px; width: 100%;">
            {#each $virtualizer.getVirtualItems() as wRow (wRow.index)}
                <div class="py-3" data-index={wRow.index} use:observeResize={wRow.index} style="position: absolute; top: {wRow.start}px; width: 100%;">
                    <div class="row g-3 pb-3">
                        {#each wordRows[wRow.index] as word, i}
                            <div class="col-xl-4 col-12">
                                <div class="point-slot">
                                    <div class="toolbar grey lighten-3 justify-space-around">
                                        <Wrapper text="Move Up">
                                            <IconButton class="mdi mdi-chevron-left" onclickcapture={() => moveWordUp(word, i)} />
                                        </Wrapper>
                                        <Wrapper text="Delete Word">
                                            <IconButton class="mdi mdi-delete-forever" onclickcapture={() => deleteWord(word, i)} />
                                        </Wrapper>
                                        <Wrapper text="Move Down">
                                            <IconButton class="mdi mdi-chevron-right" onclickcapture={() => moveWordDown(word, i)} />
                                        </Wrapper>
                                    </div>
                                    <div class="row gy-4 p-3">
                                        <div class="col-12">
                                            <CustomAutocomplete
                                                options={wCats}
                                                getOptionLabel={getCategoryLabel}
                                                bindObj={word}
                                                bindVal="category"
                                                label="Category"
                                                toggle={true}
                                                showMenuWithNoInput={true}
                                                textfield$variant="filled"
                                                innerClass="w-100 p-0"
                                            />
                                        </div>
                                        <div class="col-sm-6 col-12">
                                            <Textfield bind:value={word.id} onfocus={() => wordId = word.id} onchange={() => changeWordId(word)} label="Id that can be placed in the text" variant="filled" />
                                        </div>
                                        <div class="col-sm-6 col-12">
                                            <Textfield bind:value={word.replaceText} label="Text to replace id with" variant="filled" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/each}
                        {#if wRow.index === wordRows.length - 1}
                            <div class="col-xl-4 col-12">
                                <button type="button" class="create-box col-12" style="min-height: 210px; font-size: 40px;" onclickcapture={createNewWord} aria-label="Create New Word">
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
                    <Button action="" onclickcapture={createNewWord}>
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
    import CustomAutocomplete from '$lib/store/CustomAutocomplete.svelte';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import IconButton from '@smui/icon-button'; 
    import Select, { Option } from '$lib/custom/select';
    import Textfield from '$lib/custom/textfield/Textfield.svelte';
    import { Wrapper } from '$lib/custom/tooltip';
    import { app, checkDupId, wordMap, generateWordId, scrollToLastRow, categoryMap } from '$lib/store/store.svelte';
    import type { Category, Word } from '$lib/store/types';
    import { createVirtualizer } from '@tanstack/svelte-virtual';
    import { onMount } from 'svelte';
    
    let { open, onclose, category = {idx: -1, name: '', type: 'word'}, showAll, slots }: { open: boolean; onclose: () => void; category?: Category; showAll: boolean; slots: any } = $props();
    let wordId = '';
    let cIdx = $state(category.idx);
    let curCat = $state(category.idx);
    let catWord = $derived(showAll ? app.words : app.words.filter(item => item.category === cIdx));
    let wordRows = $derived.by(() => {
        const result: any[][] = [];
        for (let i = 0; i < catWord.length; i += 3) {
            result.push(catWord.slice(i, i + 3));
        }
        if (result.length === 0) result.push([]);
        return result;
    });
    const rowCount = () => wordRows.length;
    let virtualListEl = $state<HTMLDivElement>(document.getElementById('dialog--word') as HTMLDivElement);
    let virtualizer = $state(createVirtualizer({
        count: rowCount(),
        getScrollElement: () => virtualListEl,
        estimateSize: () => 252,
        overscan: 1,
        measureElement: (el) => Math.max(el.getBoundingClientRect().height, 252) //+72px
    }));
    let wCats = $derived(app.categories.filter(item => item.type === category.type).map(item => item.idx));


    onMount(() => {
        virtualListEl = document.getElementById('dialog--word') as HTMLDivElement;
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
        app.words.push({id: id, replaceText: '', category: cIdx});
        wordMap.set(id, app.words[app.words.length - 1]);

        if (catWord.length > 4) {
            $virtualizer.setOptions({
                count: rowCount()
            });
            scrollToLastRow($virtualizer, virtualListEl, catWord.length - 1);
        }
    }

    function deleteWord(id: string, num: number) {
        app.words.splice(num, 1);
        wordMap.delete(id);

        if (catWord.length > 4) {
            $virtualizer.setOptions({
                count: rowCount()
            });
        }
    }

    function moveWordUp(word: Word, num: number) {
        if (num > 0) {
            const prevIdx = app.words.indexOf(catWord[num - 1]);
            const curIdx = app.words.indexOf(word);
            [app.words[prevIdx], app.words[curIdx]] = [app.words[curIdx], app.words[prevIdx]];
        }
    }

    function moveWordDown(word: Word, num: number) {
        if (num < catWord.length - 1) {
            const nextIdx = app.words.indexOf(catWord[num + 1]);
            const curIdx = app.words.indexOf(word);
            [app.words[curIdx], app.words[nextIdx]] = [app.words[nextIdx], app.words[curIdx]];
        }
    }
    
    function getCategoryLabel(idx: number) {
        const cat = categoryMap.get(`word_${idx}`);
        if (typeof cat !== 'undefined') {
            return `${cat.idx + 1}. ${cat.name}`;
        }
        return '';
    }

    function swapCategory() {
        const cat = categoryMap.get(`${category.type}_${curCat}`);
        if (typeof cat !== 'undefined') {
            const oldWord = app.words.filter(item => item.category === curCat);

            for (let i = 0; i < catWord.length;) {
                catWord[i].category = curCat;
            }
            for (let i = 0; i < oldWord.length; i++) {
                oldWord[i].category = cIdx;
            }
            category.idx = curCat;
            cat.idx = cIdx;

            categoryMap.set(`${category.type}_${cIdx}`, cat);
            categoryMap.set(`${category.type}_${curCat}`, category);
        } else {
            const oldIdx = category.idx;

            for (let i = 0; i < catWord.length;) {
                catWord[i].category = curCat;
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