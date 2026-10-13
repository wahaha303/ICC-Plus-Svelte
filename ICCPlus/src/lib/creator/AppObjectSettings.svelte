<Dialog
    bind:open
    escapeKeyAction={currentDialog === 'none' ? 'close' : ''}
    surface$style="width: 600px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
    style={dialogStyle}
>
    <Title tabindex={0} autofocus>
        Choice Settings
    </Title>
    <Content>
        <div class="container-fluid">
            <div class="row">
                <div class:disabled={curChoice.isActive} class="col-12 gy-2 pb-5">
                    <div class="col-12">Copy Choice Into Another Row</div>
                    <Autocomplete
                        options={[...getRows(), ...getBackpackRows()]}
                        getOptionLabel={getRowLabel}
                        bind:value={newRow}
                        label="Copy this choice into..."
                        toggle={true}
                        showMenuWithNoInput={true}
                        textfield$variant="filled"
                        class="w-100"
                    />
                    <div class="row gx-4 pt-2 pb-4">
                        <div class="col-sm-6 col-12">
                            <Button onclickcapture={copyToAnotherRow} variant="raised">
                                <Label>Copy</Label>
                            </Button>
                        </div>
                        <div class="col-sm-6 col-12">
                            <Button onclickcapture={cropChoice} variant="raised">
                                <Label>Copy and Delete</Label>
                            </Button>
                        </div>
                    </div>
                </div>
                {#if app.styling.useAddonDesign && app.styling.addonImgObjectFillIsOn}
                    <div class="col-12 gy-2">
                        <Textfield bind:value={() => curChoice.addonImgObjectFillHeight ?? 0, (e) => curChoice.addonImgObjectFillHeight = e} label="Height of Image Container" type="number" input$min={0} suffix="px" onchange={() => {
                            if (typeof curChoice.addonImgObjectFillHeight !== 'undefined' && curChoice.addonImgObjectFillHeight < 0) {
                                curChoice.addonImgObjectFillHeight = 0;
                            }
                        }} class="w-100"/>
                    </div>
                {/if}
                <div class="col-12 gy-2">
                    <FormField class="ml-4 mb-2">
                        <Switch bind:checked={() => curChoice.isPrivateStyling ?? false, (e) => curChoice.isPrivateStyling = e} onSMUISwitchChange={() => {
                            if (curChoice.isPrivateStyling) {
                                curChoice.styling = {};
                            } else {
                                delete curChoice.isPrivateStyling;
                                delete curChoice.privateFilterIsOn;
                                delete curChoice.privateTextIsOn;
                                delete curChoice.privateObjectImageIsOn;
                                delete curChoice.privateObjectIsOn;
                                delete curChoice.privateAddonImageIsOn;
                                delete curChoice.privateAddonIsOn;
                                delete curChoice.privateBackgroundIsOn;
                                delete curChoice.privateMultiChoiceIsOn;
                                delete curChoice.styling;
                            }
                        }} color="secondary" class="switch-scale" />
                        {#snippet label()}
                            Use private styling?
                        {/snippet}
                    </FormField>
                    {#if curChoice.isPrivateStyling}
                        <div class="row">
                            <div class="col-12 py-2">
                                <div class="hide-file-ui">
                                    <Textfield bind:files={valueTypeFiles} label="Import Design" type="file" input$accept="application/json" class="w-100"/>
                                </div>
                            </div>
                            <div class="col-12 py-3">
                                <Wrapper text="Here you can export your design.">
                                    <Button onclickcapture={exportDesign} variant="raised" >
                                        <Label>Export Design</Label>
                                    </Button>
                                </Wrapper>
                            </div>
                            {#each designMenuComponent as _undefined, i}
                                <div class="col-sm-6 col-12 pt-2 pb-3">
                                    <Wrapper text={designMenuComponent[i].text}>
                                        <Button onclickcapture={designMenuComponent[i].action} variant="raised" >
                                            <Label class="line-default">{designMenuComponent[i].name}</Label>
                                        </Button>
                                    </Wrapper>
                                </div>
                            {/each}
                        </div>
                    {/if}
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
{#if currentDialog === 'appChoiceDesign'}
    <AppChoiceDesign open={currentDialog === 'appChoiceDesign'} onclose={() => (currentDialog = 'none')} data={curChoice} />
{:else if currentDialog === 'appChoiceImage'}
    <AppChoiceImage open={currentDialog === 'appChoiceImage'} onclose={() => (currentDialog = 'none')} data={curChoice} />
{:else if currentDialog === 'appAddonDesign'}
    <AppAddonDesign open={currentDialog === 'appAddonDesign'} onclose={() => (currentDialog = 'none')} data={curChoice} />
{:else if currentDialog === 'appAddonImage'}
    <AppAddonImage open={currentDialog === 'appAddonImage'} onclose={() => (currentDialog = 'none')} data={curChoice} />
{:else if currentDialog === 'appFilter'}
    <AppFilter open={currentDialog === 'appFilter'} onclose={() => (currentDialog = 'none')} data={curChoice} />
{:else if currentDialog === 'appBackground'}
    <AppBackground open={currentDialog === 'appBackground'} onclose={() => (currentDialog = 'none')} data={curChoice} />
{:else if currentDialog === 'appText'}
    <AppText open={currentDialog === 'appText'} onclose={() => (currentDialog = 'none')} data={curChoice} />
{:else if currentDialog === 'appMultiChoice'}
    <AppMultiChoice open={currentDialog === 'appMultiChoice'} onclose={() => (currentDialog = 'none')} data={curChoice} />
{/if}

<script lang="ts">
    import AppAddonDesign from './Design/AppAddonDesign.svelte';
    import AppAddonImage from './Design/AppAddonImage.svelte';
    import AppBackground from './Design/AppBackground.svelte';
    import AppChoiceDesign from './Design/AppChoiceDesign.svelte';
    import AppChoiceImage from './Design/AppChoiceImage.svelte';
    import AppFilter from './Design/AppFilter.svelte';
    import AppMultiChoice from './Design/AppMultiChoice.svelte';
    import AppText from './Design/AppText.svelte';
    import Autocomplete from '$lib/custom/autocomplete';
    import Button, { Label } from '@smui/button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import FormField from '@smui/form-field';
    import Switch from '@smui/switch';
    import Textfield from '$lib/custom/textfield';
    import { Wrapper } from '$lib/custom/tooltip';
    import { app, choiceMap, initStyling, appVersion, getTimestamp, filterStyling, textStyling, objectImageStyling, addonImageStyling, objectStyling, addonStyling, backgroundStyling, multiChoiceStyling,rowStyling, rowImageStyling, backpackStyling, pointBarStyling, rowMap, generateId, getRows, scoreSet, StylingSchema, snackbarVariables, getRowLabel, objectDesignMap, groupMap, getBackpackRows, deleteDiscount } from '$lib/store/store.svelte';
    import type { Choice, SelectableAddon, Styling } from '$lib/store/types';
    
    let { open, onclose, choice }: { open: boolean; onclose: () => void; choice: Choice } = $props();
    const designMenuComponent = [{
        action: () => { currentDialog = 'appChoiceDesign' },
        name: 'Manage Choice Design',
        text: 'Here you can change the margin, padding, borders, and drop-shadow on choices.'
    }, {
        action: () => { currentDialog = 'appChoiceImage' },
        name: 'Manage Choices Image Design',
        text: 'Here you can change the margin and padding of images on objects.'
    }, {
        action: () => { currentDialog = 'appAddonDesign' },
        name: 'Manage Addon Design',
        text: 'Here you can change the margin,padding, borders, and drop-shadow on Addon.'
    }, {
        action: () => { currentDialog = 'appAddonImage' },
        name: 'Manage Addon Image Design',
        text: 'Here you can change the margin and padding of images on Addon.'
    }, {
        action: () => { currentDialog = 'appFilter' },
        name: 'Manage Filter Design',
        text: 'Here you can change the filters for choices that are selectedand the one\'s you dont have the requirements for.'
    }, {
        action: () => { currentDialog = 'appBackground' },
        name: 'Manage Background Design',
        text: 'Here you can change the color and place images in the background of rows, choices and the whole project.'
    }, {
        action: () => { currentDialog = 'appText' },
        name: 'Manage Text Design',
        text: 'Here you can change the size, font andcolor of the text on titles and text.'
    }, {
        action: () => { currentDialog = 'appMultiChoice' },
        name: 'Manage Multi Choice Design',
        text: 'Here you can change the color, size and font of the  choices that can be selected multiple times.'
    }];
    let currentDialog = $state<'none' | 'appChoiceDesign' | 'appChoiceImage' | 'appAddonDesign' | 'appAddonImage' | 'appFilter' | 'appBackground' | 'appText' | 'appMultiChoice'>('none');
    let newRow = $state('');
    let curChoice = $state(choice);
    let valueTypeFiles: FileList | null = $state(null);
    let dialogStyle = $derived.by(() => {
        const styles: string[] = [];

        styles.push('transition:opacity 0.1s;');
        if (currentDialog !== 'none') {
            styles.push('opacity: 0;');
        }
        
        return styles.join(' ');
    });

    $effect(() => {
        if (valueTypeFiles !== null && valueTypeFiles.length === 1 && valueTypeFiles[0].type === "application/json") {
            const file = new FileReader;
            file.onload = () => {
                try {
                    const data = JSON.parse(file.result as string);
                    const oldVersion = (typeof data.version === 'undefined' || data.version === '2.0.0-beta');
                    let parsed;

                    if (typeof data.styling === 'undefined') {
                        parsed = StylingSchema.safeParse(data);
                    } else {
                        parsed = StylingSchema.safeParse(data.styling);
                    }
                    if (parsed.success) {
                        initStyling(parsed.data, oldVersion);
                        removeInvalidStyles(parsed.data);
                        curChoice.styling = parsed.data;
                        checkPrivateDesign(parsed.data);
                        snackbarVariables.labelText = 'Data loaded successfully.';
                        snackbarVariables.isOpen = true;
                    } else {
                        snackbarVariables.labelText = 'Filed to load data.';
                        snackbarVariables.isOpen = true;
                        console.error(parsed.error);
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            file.readAsText(valueTypeFiles[0]);
        }
    });

    function removeInvalidStyles(data: any) {
        const bgKeys = ['bgColorIsOn', 'backgroundColor', 'rowBgColorIsOn', 'rowBgColor', 'isBackgroundRepeat', 'isBackgroundFitIn', 'backgroundImage', 'isRowBackgroundRepeat', 'isRowBackgroundFitIn', 'rowBackgroundImage'];

        for (const key of Object.keys(rowStyling)) {
            if (key in data) {
                delete data[key];
            }
        }
        for (const key of Object.keys(rowImageStyling)) {
            if (key in data) {
                delete data[key];
            }
        }
        for (const key of Object.keys(pointBarStyling)) {
            if (key in data) {
                delete data[key];
            }
        }
        for (const key of Object.keys(backpackStyling)) {
            if (key in data) {
                delete data[key];
            }
        }

        for (let i = 0; i < bgKeys.length; i++) {
            const key = bgKeys[i];

            if (key in data) {
                delete data[key];
            }
        }
    }

    function checkPrivateDesign(data: any) {
        curChoice.privateFilterIsOn = Object.keys(filterStyling).some(key => key in data);
        curChoice.privateTextIsOn = Object.keys(textStyling).some(key => key in data);
        curChoice.privateObjectImageIsOn = Object.keys(objectImageStyling).some(key => key in data);
        curChoice.privateAddonImageIsOn = Object.keys(addonImageStyling).some(key => key in data);
        curChoice.privateBackgroundIsOn = Object.keys(backgroundStyling).some(key => key in data);
        curChoice.privateObjectIsOn = Object.keys(objectStyling).some(key => key in data);
        curChoice.privateAddonIsOn = Object.keys(addonStyling).some(key => key in data);
        curChoice.privateMultiChoiceIsOn = Object.keys(multiChoiceStyling).some(key => key in data);
    }

    function exportDesign() {
        if (curChoice.styling) {
            const design: {version: string, styling: Styling} = {version: appVersion, styling: {}};        
            design.styling = curChoice.styling;

            const saveData = JSON.stringify(design);
            const blob = new Blob([saveData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            const filename = `design_${getTimestamp()}.json`;
            
            a.href = url;
            a.download = filename;
            a.click();

            URL.revokeObjectURL(url);
        }
    }

    function copyToAnotherRow() {
        if (newRow !== '') {
            const nRow = rowMap.get(newRow);

            if (typeof nRow !== 'undefined') {
                const clone: Choice = JSON.parse(JSON.stringify(curChoice));

                clone.id = generateId(0, app.objectIdLength, 'choice');
                clone.index = nRow.objects.length;
                clone.isActive = false;
                delete clone.forcedActivated;
                delete clone.appliedDisChoices;

                for (let i = 0; i < clone.scores.length; i++) {
                    const score = clone.scores[i];

                    score.idx = generateId(0, 5, 's');
                    scoreSet.add(score.idx);
                    delete score.isActive;
                    delete score.setValue;
                    deleteDiscount(score);
                }

                if (clone.backpackBtnRequirement) {
                    if (typeof app.hideBackpackBtn !== 'undefined') {
                        app.hideBackpackBtn += 1;
                    } else {
                        delete clone.backpackBtnRequirement;
                    }
                }

                nRow.objects.push(clone);
                choiceMap.set(clone.id, {choice: clone, row: nRow});

                if (clone.addons) {
                    for (let i = 0; i < clone.addons.length; i++) {
                        const addon = clone.addons[i];

                        addon.parentId = clone.id;
                        if (addon.isSelectable) {
                            addon.isActive = false;
                            delete addon.forcedActivated;
                            delete addon.appliedDisChoices;
                            addon.id = generateId(0, app.objectIdLength, 'addon');

                            if (addon.scores) {
                                for (let j = 0; j < addon.scores.length; j++) {
                                    const score = addon.scores[j];

                                    score.idx = generateId(0, 5, 's');
                                    scoreSet.add(score.idx);
                                    if (addon.isSelectableMultiple) {
                                        delete score.isActiveMul;
                                        delete score.isActiveMulMinus;
                                    } else {
                                        delete score.isActive;
                                    }
                                    delete score.setValue;
                                    deleteDiscount(score);
                                }
                            }
                            choiceMap.set(addon.id, {choice: clone.addons[i] as SelectableAddon, row: nRow});
                        }
                    }
                }
                if (clone.groups) {
                    for (let i = 0; i < clone.groups.length; i++) {
                        let group = groupMap.get(clone.groups[i]);
                        if (typeof group !== 'undefined') {
                            let elementIndex = group.elements.indexOf(clone.id);
                            if (elementIndex === -1) group.elements.push(clone.id);
                        }
                    }
                }
                if (clone.objectDesignGroups) {
                    for (let i = 0; i < clone.objectDesignGroups.length; i++) {
                        let dGroup = objectDesignMap.get(clone.objectDesignGroups[i]);
                        if (typeof dGroup !== 'undefined') {
                            let elementIndex = dGroup.elements.indexOf(clone.id);
                            if (elementIndex === -1) dGroup.elements.push(clone.id);
                        }
                    }
                }
            }
        }
    }

    function cropChoice() {
        if (newRow === '') return;

        const row = choiceMap.get(curChoice.id)?.row;
        if (typeof row === 'undefined') return;

        const nRow = rowMap.get(newRow);
        if (typeof nRow === 'undefined') return;

        const idx = curChoice.index;
        nRow.objects.push(curChoice);
        row.objects.splice(curChoice.index, 1);

        for (let i = idx; i < row.objects.length; i++) {
            row.objects[i].index = i;
        }

        const nIdx = nRow.objects.length - 1;
        const nChoice = nRow.objects[nIdx];

        nChoice.index = nIdx;
        choiceMap.set(nChoice.id, {choice: nChoice, row: nRow});
        curChoice = nChoice;
    }
</script>