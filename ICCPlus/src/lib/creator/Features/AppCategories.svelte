<Dialog
    bind:open
    surface$style="width: 960px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
    id="dialog"
>
        <Title class="text-left dialog-title" tabindex={0} autofocus>
            {typeString[type]} Categories
        </Title>
        <Content class="pt-3">
            {#if type === 'designGroup'}
                <div class="d-row align-items-center justify-end">
                    <IconButton onclickcapture={() => isRowGroup = !isRowGroup}><i class="mdi mdi-menu-left"></i></IconButton>
                    <span class="list-text px-2">{isRowGroup ? 'Row' : 'Choice'} Design Groups</span>
                    <IconButton onclickcapture={() => isRowGroup = !isRowGroup}><i class="mdi mdi-menu-right"></i></IconButton>
                </div>
            {/if}
            <div class="container-fluid pb-2 mb-2">
                <div class="row gx-0 pb-1">
                    <div class="col-12">
                        <div class="category-slot d-flex" onclickcapture={(e) => enterCategory(e, -1)} style="height: 50px; font-size: 2rem;">
                            <div class="col-12 category-text"  onclickcapture={(e) => enterCategory(e, -1)}>
                                Show All
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row gx-1 gy-1">
                    {#each slots as slot, i}
                        <div class="col-md-4 col-12">
                            {#if slot.stored}
                                <div class="category-slot d-colum" onclickcapture={(e) => enterCategory(e, pageNum + i)}>
                                    <div class="d-row justify-end">
                                        <Wrapper text="Edit Name" innerClass="icon-button">
                                            <IconButton onclickcapture={() => editName(pageNum + i)} size="button"><i class="mdi mdi-square-edit-outline"></i></IconButton>
                                        </Wrapper>
                                        <Wrapper text="Delete" innerClass="icon-button">
                                            <IconButton onclickcapture={() => deleteCategory(pageNum + i)} size="button"><i class="mdi mdi-delete-forever"></i></IconButton>
                                        </Wrapper>
                                    </div>
                                    <div class="col-12 category-text">
                                        <span>{slot.name}</span>
                                    </div>
                                </div>
                            {:else}
                                <Wrapper text="Create New Category">
                                    <button type="button" class="create-box col-12" style="height: 100px; font-size: 40px;" onclickcapture={() => createNewCategory(pageNum + i)} aria-label="Create New Category">
                                        <i class="mdi mdi-plus-thick"></i>
                                    </button>
                                </Wrapper>
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>
            <div class="row gy-2">
                <div class="col pb-2">
                    <div class="d-row align-items-center justify-end">
                        <IconButton onclickcapture={() => currentPage > 1 ? currentPage -= 1 : currentPage = 11}><i class="mdi mdi-menu-left"></i></IconButton>
                        <span class="list-text px-2">Page {currentPage}</span>
                        <IconButton onclickcapture={() => currentPage < 11 ? currentPage += 1 : currentPage = 1}><i class="mdi mdi-menu-right"></i></IconButton>
                    </div>
                </div>
            </div>
        </Content>
        <Actions>
            <Button action="close">
                <Label class="dialog-actions--btn">Close</Label>
            </Button>
        </Actions>
</Dialog>
{#if currentDialog === 'dlgCommon'}
    <DlgCommon open={currentDialog === 'dlgCommon'} onclose={() => (currentDialog = 'none')} title={confirmDialog.title} context={confirmDialog.context} isWord={confirmDialog.isEdit} defaultRow={1} textLabel={confirmDialog.label} prevText={confirmDialog.prevText} closeHandler={(e, name) => {
        if (e.detail.action === 'accept') {
            confirmDialog.action(name || '');
        }
    }}/>
{:else if currentDialog === 'appPoints'}
    <AppPoints open={currentDialog === 'appPoints'} onclose={() => (currentDialog = 'none')} category={currentCategory} showAll={showAll} slots={catSlots} />
{:else if currentDialog === 'appVariables'}
    <AppVariables open={currentDialog === 'appVariables'} onclose={() => (currentDialog = 'none')} category={currentCategory} showAll={showAll} slots={catSlots} />
{:else if currentDialog === 'appGroups'}
    <AppGroups open={currentDialog === 'appGroups'} onclose={() => (currentDialog = 'none')} category={currentCategory} showAll={showAll} slots={catSlots} />
{:else if currentDialog === 'appWords'}
    <AppWords open={currentDialog === 'appWords'} onclose={() => (currentDialog = 'none')} category={currentCategory} showAll={showAll} slots={catSlots} />
{:else if currentDialog === 'appDesignGroups'}
    <AppDesignGroups open={currentDialog === 'appDesignGroups'} onclose={() => (currentDialog = 'none')} category={currentCategory} showAll={showAll} isRow={isRowGroup} slots={catSlots} />
{:else if currentDialog === 'appGlobalRequirements'}
    <AppGlobalRequirements open={currentDialog === 'appGlobalRequirements'} onclose={() => (currentDialog = 'none')} category={currentCategory} showAll={showAll} slots={catSlots} />
{/if}

<script lang="ts">
    import Button, { Label } from '@smui/button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import DlgCommon from '$lib/creator/DlgCommon.svelte';
    import IconButton from '@smui/icon-button';
    import { Wrapper } from '$lib/custom/tooltip';
	import { app, categoryMap } from '$lib/store/store.svelte';
    import AppPoints from './AppPoints.svelte';
    import AppVariables from './AppVariables.svelte';
    import AppGroups from './AppGroups.svelte';
    import AppWords from './AppWords.svelte';
    import AppDesignGroups from './AppDesignGroups.svelte';
    import AppGlobalRequirements from './AppGlobalRequirements.svelte';
    import type { Category } from '$lib/store/types';

    let { open, onclose, type }: { open: boolean; onclose: () => void; type: string } = $props();

    let isRowGroup = $state(true);
    const confirmDialog = {
        action: (name: string) => {},
        title: 'Confirm',
        label: '',
        context: '',
        prevText: '',
        isEdit: false
    };
    const slotsPerPage = 9;
    const totalSlots = 99;
    const typeMap: Record<string, string> = {
        point: 'appPoints',
        variable: 'appVariables',
        group: 'appGroups',
        word: 'appWords',
        rDesign: 'appDesignGroups',
        cDesign: 'appDesignGroups',
        globalReq: 'appGlobalRequirements'
    }
    const typeString: Record<string, string> = {
        point: 'Point Type',
        variable: 'Variable',
        group: 'Group',
        word: 'Word',
        designGroup: 'Design Group',
        globalReq: 'Global Requirement'
    }
    const dType = $derived(type === 'designGroup' ? isRowGroup ? 'rDesign' : 'cDesign' : type);

    let catSlots1 = $state(Array.from({ length: 99 }, () => ({
        name: '',
        stored: false
    })));
    let catSlots2 = $state(Array.from({ length: 99 }, () => ({
        name: '',
        stored: false
    })));
    let catSlots = $derived(type === 'designGroup' && !isRowGroup ? catSlots2 : catSlots1);
    let currentDialog = $state('none');
    let currentPage = $state(1);
    let pageStart = $derived((currentPage - 1) * slotsPerPage);
    let pageEnd = $derived((Math.min(pageStart + slotsPerPage - 1, totalSlots)));
    let slots = $derived(Array.from({ length: pageEnd - pageStart + 1}, (_, i) => catSlots[pageStart + i]));
    let pageNum = $derived((currentPage - 1) * 9);
    let currentCategory = $state<Category>();
    let showAll = $state(false);

    $effect(() => {
        if (app.categories) {
            for (let i = 0; i < app.categories.length; i++) {
                const cat = app.categories[i];
                if (cat.type === dType) {
                    const slot = catSlots[cat.idx];

                    slot.name = cat.name;
                    slot.stored = true;
                }
            }
        }
    });

    function createNewCategory(idx: number) {
        const slot = catSlots[idx];

        confirmDialog.isEdit = true;
        confirmDialog.title = 'Create New Category';
        confirmDialog.context = '';
        confirmDialog.label = 'Category Name';
        confirmDialog.prevText = `Slot ${idx + 1}`;
        confirmDialog.action = (catName) => {
            app.categories.push({idx: idx, name: catName, type: dType});
            categoryMap.set(`${dType}_${idx}`, app.categories[app.categories.length - 1]);
            slot.name = catName;
            slot.stored = true;
        }

        currentDialog = 'dlgCommon';
    }

    function clearCategory(items: any, idx: number) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].category === idx) {
                items[i].category = -1;
            }
        }
    }

    function deleteCategory(idx: number) {
        const slot = catSlots[idx];

        confirmDialog.isEdit = false;
        confirmDialog.title = 'Warning';
        confirmDialog.context = 'Are you sure you want to delete this category?<br>This action cannot be undone.<br>Items assigned to this category will remain.';
        confirmDialog.label = '';
        confirmDialog.prevText = '';
        confirmDialog.action = (_) => {
            const cat = categoryMap.get(`${dType}_${idx}`);

            if (typeof cat !== 'undefined') {
                const sources = {
                    point: () => app.pointTypes,
                    variable: () => app.variables,
                    group: () => app.groups,
                    word: () => app.words,
                    rDesign: () => {
                        if (typeof app.rowDesignGroups === 'undefined') app.rowDesignGroups = [];
                        return app.rowDesignGroups;
                    },
                    cDesign: () => {
                        if (typeof app.objectDesignGroups === 'undefined') app.objectDesignGroups = [];
                        return app.objectDesignGroups;
                    },
                    globalReq: () => {
                        if (typeof app.globalRequirements === 'undefined') app.globalRequirements = [];
                        return app.globalRequirements;
                    }
                }
                if (dType in sources) clearCategory(sources[dType as keyof typeof sources](), idx);
                app.categories.splice(app.categories.indexOf(cat), 1);
                slot.name = '';
                slot.stored = false;
            }
        }

        currentDialog = 'dlgCommon';
    }

    function editName(idx: number) {
        const slot = catSlots[idx];

        confirmDialog.isEdit = true;
        confirmDialog.title = 'Edit Category Name';
        confirmDialog.context = '';
        confirmDialog.label = 'Category Name';
        confirmDialog.prevText = slot.name;
        confirmDialog.action = (catName) => {
            const cat = categoryMap.get(`${dType}_${idx}`);

            if (typeof cat !== 'undefined') {
                cat.name = catName;
                slot.name = catName;
            }
        }

        currentDialog = 'dlgCommon';
    }

    function enterCategory(e: MouseEvent, idx: number) {
        if (e && e.target) {
            const target = e.target as HTMLElement;

            if (target.classList.contains('icon-button') || target.classList.contains('mdi')) {
                return;
            }

            if (idx === -1) {
                showAll = true;
                currentCategory = undefined;
            } else {
                const cat = categoryMap.get(`${dType}_${idx}`);

                if (typeof cat !== 'undefined') {
                    currentCategory = cat;
                    showAll = false;
                }
            }

            currentDialog = typeMap[dType];
        }
    }

</script>