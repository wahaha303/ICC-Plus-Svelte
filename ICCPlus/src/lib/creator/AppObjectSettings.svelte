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
                <div class:disabled={choice.isActive} class="col-12 gy-2 pb-5">
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
                    <div class="col-12">
                        <Button onclickcapture={copyToAnotherRow} variant="raised">
                            <Label>Copy</Label>
                        </Button>
                    </div>
                </div>
                {#if app.styling.useAddonDesign && app.styling.addonImgObjectFillIsOn}
                    <div class="col-12 gy-2">
                        <Textfield bind:value={() => choice.addonImgObjectFillHeight ?? 0, (e) => choice.addonImgObjectFillHeight = e} label="Height of Image Container" type="number" input$min={0} suffix="px" onchange={() => {
                            if (typeof choice.addonImgObjectFillHeight !== 'undefined' && choice.addonImgObjectFillHeight < 0) {
                                choice.addonImgObjectFillHeight = 0;
                            }
                        }} class="w-100"/>
                    </div>
                {/if}
                <div class="col-12 gy-2">
                    <FormField class="ml-4 mb-2">
                        <Switch bind:checked={() => choice.isPrivateStyling ?? false, (e) => choice.isPrivateStyling = e} onSMUISwitchChange={() => {
                            if (choice.isPrivateStyling) {
                                choice.styling = {};
                            } else {
                                delete choice.isPrivateStyling;
                                delete choice.privateFilterIsOn;
                                delete choice.privateTextIsOn;
                                delete choice.privateObjectImageIsOn;
                                delete choice.privateObjectIsOn;
                                delete choice.privateAddonImageIsOn;
                                delete choice.privateAddonIsOn;
                                delete choice.privateBackgroundIsOn;
                                delete choice.privateMultiChoiceIsOn;
                                delete choice.styling;
                            }
                        }} color="secondary" class="switch-scale" />
                        {#snippet label()}
                            Use private styling?
                        {/snippet}
                    </FormField>
                    {#if choice.isPrivateStyling}
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
    <AppChoiceDesign open={currentDialog === 'appChoiceDesign'} onclose={() => (currentDialog = 'none')} data={choice} />
{:else if currentDialog === 'appChoiceImage'}
    <AppChoiceImage open={currentDialog === 'appChoiceImage'} onclose={() => (currentDialog = 'none')} data={choice} />
{:else if currentDialog === 'appAddonDesign'}
    <AppAddonDesign open={currentDialog === 'appAddonDesign'} onclose={() => (currentDialog = 'none')} data={choice} />
{:else if currentDialog === 'appAddonImage'}
    <AppAddonImage open={currentDialog === 'appAddonImage'} onclose={() => (currentDialog = 'none')} data={choice} />
{:else if currentDialog === 'appFilter'}
    <AppFilter open={currentDialog === 'appFilter'} onclose={() => (currentDialog = 'none')} data={choice} />
{:else if currentDialog === 'appBackground'}
    <AppBackground open={currentDialog === 'appBackground'} onclose={() => (currentDialog = 'none')} data={choice} />
{:else if currentDialog === 'appText'}
    <AppText open={currentDialog === 'appText'} onclose={() => (currentDialog = 'none')} data={choice} />
{:else if currentDialog === 'appMultiChoice'}
    <AppMultiChoice open={currentDialog === 'appMultiChoice'} onclose={() => (currentDialog = 'none')} data={choice} />
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
    import { app, choiceMap, initStyling, appVersion, getTimestamp, filterStyling, textStyling, objectImageStyling, addonImageStyling, objectStyling, addonStyling, backgroundStyling, multiChoiceStyling,rowStyling, rowImageStyling, backpackStyling, pointBarStyling, rowMap, generateObjectId, getRows, generateScoreId, scoreSet, StylingSchema, snackbarVariables, getRowLabel, objectDesignMap, groupMap, getBackpackRows, deleteDiscount } from '$lib/store/store.svelte';
    import type { Choice, Styling } from '$lib/store/types';
    
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
    const rowId = choiceMap.get(choice.id)?.row.id;
    let currentDialog = $state<'none' | 'appChoiceDesign' | 'appChoiceImage' | 'appAddonDesign' | 'appAddonImage' | 'appFilter' | 'appBackground' | 'appText' | 'appMultiChoice'>('none');
    let newRow = $state('');
    let valueTypeFiles: FileList | null = $state(null);
    let dialogStyle = $derived.by(() => {
        let styles: string[] = [];

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
                        choice.styling = parsed.data;
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

        Object.keys(rowStyling).forEach((key) => {
            if (key in data) {
                delete data[key];
            }
        });
        Object.keys(rowImageStyling).forEach((key) => {
            if (key in data) {
                delete data[key];
            }
        });
        Object.keys(pointBarStyling).forEach((key) => {
            if (key in data) {
                delete data[key];
            }
        });
        Object.keys(backpackStyling).forEach((key) => {
            if (key in data) {
                delete data[key];
            }
        });

        for (let i = 0; i < bgKeys.length; i++) {
            const key = bgKeys[i];

            if (key in data) {
                delete data[key];
            }
        }
    }

    function checkPrivateDesign(data: any) {
        choice.privateFilterIsOn = Object.keys(filterStyling).some(key => key in data);
        choice.privateTextIsOn = Object.keys(textStyling).some(key => key in data);
        choice.privateObjectImageIsOn = Object.keys(objectImageStyling).some(key => key in data);
        choice.privateAddonImageIsOn = Object.keys(addonImageStyling).some(key => key in data);
        choice.privateBackgroundIsOn = Object.keys(backgroundStyling).some(key => key in data);
        choice.privateObjectIsOn = Object.keys(objectStyling).some(key => key in data);
        choice.privateAddonIsOn = Object.keys(addonStyling).some(key => key in data);
        choice.privateMultiChoiceIsOn = Object.keys(multiChoiceStyling).some(key => key in data);
    }

    function exportDesign() {
        if (choice.styling) {
            const design: {version: string, styling: Styling} = {version: appVersion, styling: {}};        
            design.styling = choice.styling;

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
                const clone = JSON.parse(JSON.stringify(choice));

                clone.id = generateObjectId(0, app.objectIdLength);
                clone.index = nRow.objects.length;
                clone.isActive = false;
                delete clone.forcedActivated;
                delete clone.appliedDisChoices;

                for (let i = 0; i < clone.scores.length; i++) {
                    const score = clone.scores[i];

                    score.idx = generateScoreId(0, 5);
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
</script>