<Dialog
    bind:open
    escapeKeyAction={currentDialog === 'none' ? 'close' : ''}
    surface$style="width: 600px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
    style={dialogStyle}
>
    <Title tabindex={0} autofocus>
        Row Settings
    </Title>
    <Content>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 gy-2 pb-4">
                    <div class="col-12">Sort The Choices In The Row</div>
                    <Select bind:value={sortType} label="Sort By..." variant="filled">
                        {#each sorts as sort (sort.text)}
                            <Option value={sort.value}>{sort.text}</Option>
                        {/each}
                    </Select>
                    <div class="col-12 pt-2">
                        <Button onclickcapture={sortObjects} variant="raised">
                            <Label>Sort</Label>
                        </Button>
                    </div>
                </div>
                <div class="col-12 gy-2">
                    <div class="col-12">Copy Choices Into Another Row</div>
                    <Autocomplete
                        options={[...getRows(), ...getBackpackRows()]}
                        getOptionLabel={getRowLabel}
                        bind:value={newRow}
                        label="Copy this row's choices into..."
                        toggle={true}
                        showMenuWithNoInput={true}
                        textfield$variant="filled"
                        class="w-100"
                    />
                    <div class="row gx-4 pt-2 pb-4">
                        <div class="col-sm-6 col-12">
                            <Button onclickcapture={copyObjects} variant="raised">
                                <Label>Copy</Label>
                            </Button>
                        </div>
                        <div class="col-sm-6 col-12">
                            <Button onclickcapture={mergeRow} variant="raised">
                                <Label>Copy and Delete</Label>
                            </Button>
                        </div>
                    </div>
                </div>
                {#if app.styling.objectImgObjectFillIsOn}
                    <div class="col-12 gy-2">
                        <Textfield bind:value={() => row.objectImgObjectFillHeight ?? 0, (e) => row.objectImgObjectFillHeight = e} label="Height of Image Container" type="number" input$min={0} onchange={() => {
                            if (typeof row.objectImgObjectFillHeight !== 'undefined' && row.objectImgObjectFillHeight < 0) {
                                row.objectImgObjectFillHeight = 0;
                            }
                        }} class="w-100"/>
                    </div>
                {/if}
                <div class="col-12 gy-2 pb-5">
                    <div class="col-12">Group Membership</div>
                    <div class="col-12">- This is for displaying in the Result Row. </div>
                    <div class="col-12">- For group-related functions, use Manage Groups feature.</div>
                    <Autocomplete
                        options={getGroups()}
                        bind:value={row.resultGroupId}
                        label="All choices In Row Are Members Of This Group In Result Row"
                        toggle={true}
                        showMenuWithNoInput={true}
                        textfield$variant="filled"
                        class="w-100"
                    />
                </div>
                <div class="col-12 gy-2">
                    <FormField class="ml-4 mb-2">
                        <Switch bind:checked={() => row.isPrivateStyling?? false, (e) => {
                            if (e) {
                                row.isPrivateStyling = true;
                                row.styling = {};
                            } else {
                                delete row.isPrivateStyling;
                                delete row.privateFilterIsOn;
                                delete row.privateTextIsOn;
                                delete row.privateObjectImageIsOn;
                                delete row.privateObjectIsOn;
                                delete row.privateRowImageIsOn;
                                delete row.privateRowIsOn;
                                delete row.privateAddonImageIsOn;
                                delete row.privateAddonIsOn;
                                delete row.privateBackgroundIsOn;
                                delete row.privateMultiChoiceIsOn;
                                delete row.styling;
                            }
                        }} color="secondary" class="switch-scale" />
                        {#snippet label()}
                            Use private styling?
                        {/snippet}
                    </FormField>
                    {#if row.isPrivateStyling}
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
{#if currentDialog === 'appRowDesign'}
    <AppRowDesign open={currentDialog === 'appRowDesign'} onclose={() => (currentDialog = 'none')} data={row} />
{:else if currentDialog === 'appRowImage'}
    <AppRowImage open={currentDialog === 'appRowImage'} onclose={() => (currentDialog = 'none')} data={row} />
{:else if currentDialog === 'appChoiceDesign'}
    <AppChoiceDesign open={currentDialog === 'appChoiceDesign'} onclose={() => (currentDialog = 'none')} data={row} />
{:else if currentDialog === 'appChoiceImage'}
    <AppChoiceImage open={currentDialog === 'appChoiceImage'} onclose={() => (currentDialog = 'none')} data={row} />
{:else if currentDialog === 'appAddonDesign'}
    <AppAddonDesign open={currentDialog === 'appAddonDesign'} onclose={() => (currentDialog = 'none')} data={row} />
{:else if currentDialog === 'appAddonImage'}
    <AppAddonImage open={currentDialog === 'appAddonImage'} onclose={() => (currentDialog = 'none')} data={row} />
{:else if currentDialog === 'appFilter'}
    <AppFilter open={currentDialog === 'appFilter'} onclose={() => (currentDialog = 'none')} data={row} />
{:else if currentDialog === 'appBackground'}
    <AppBackground open={currentDialog === 'appBackground'} onclose={() => (currentDialog = 'none')} data={row} />
{:else if currentDialog === 'appText'}
    <AppText open={currentDialog === 'appText'} onclose={() => (currentDialog = 'none')} data={row} />
{:else if currentDialog === 'appMultiChoice'}
    <AppMultiChoice open={currentDialog === 'appMultiChoice'} onclose={() => (currentDialog = 'none')} data={row} />
{/if}

<script lang="ts">
    import AppAddonDesign from './Design/AppAddonDesign.svelte';
    import AppAddonImage from './Design/AppAddonImage.svelte';
    import AppBackground from './Design/AppBackground.svelte';
    import AppChoiceDesign from './Design/AppChoiceDesign.svelte';
    import AppChoiceImage from './Design/AppChoiceImage.svelte';
    import AppFilter from './Design/AppFilter.svelte';
    import AppMultiChoice from './Design/AppMultiChoice.svelte';
    import AppRowDesign from './Design/AppRowDesign.svelte';
    import AppRowImage from './Design/AppRowImage.svelte';
    import AppText from './Design/AppText.svelte';
    import Autocomplete from '$lib/custom/autocomplete';
    import Button, { Label } from '@smui/button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import FormField from '@smui/form-field';
    import Select, { Option } from '$lib/custom/select';
    import Switch from '@smui/switch';
    import Textfield from '$lib/custom/textfield';
    import { Wrapper } from '$lib/custom/tooltip';
    import { app, appVersion, backpackStyling, choiceMap, generateObjectId, getTimestamp, initStyling, objectWidths, pointBarStyling, rowMap, getGroups, getRows, getBackpackRows, generateScoreId, scoreSet, StylingSchema, snackbarVariables, getRowLabel, groupMap, objectDesignMap, filterStyling, textStyling, objectImageStyling, rowImageStyling, addonImageStyling, backgroundStyling, objectStyling, rowStyling, addonStyling, multiChoiceStyling } from '$lib/store/store.svelte';
    import type { Row, Styling } from '$lib/store/types';
    
    let { open, onclose, row }: { open: boolean; onclose: () => void; row: Row } = $props();
    const sorts = [{
        text: 'Object Width - Biggest to smallest.',
        value: '1'
    }, {
        text: 'Object Width - Smallest to Biggest.',
        value: '2'
    }, {
        text: 'Text Length - Longest to Shortest.',
        value: '3'
    }, {
        text: 'Text Length - Shortest to Longest.',
        value: '4'
    }];
    const designMenuComponent = [{
        action: () => { currentDialog = 'appRowDesign' },
        name: 'Manage Row Design',
        text: 'Here you can change the margin, padding, borders, and drop-shadow on rows.'
    }, {
        action: () => { currentDialog = 'appRowImage' },
        name: 'Manage Row Image Design',
        text: 'Here you can change the margin and padding of images on rows.'
    }, {
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
    let currentDialog = $state<'none' | 'appRowDesign' | 'appRowImage' | 'appChoiceDesign' | 'appChoiceImage' | 'appAddonDesign' | 'appAddonImage' | 'appFilter' | 'appBackground' | 'appText' | 'appMultiChoice'>('none');
    let sortType = $state('1');
    let newRow = $state('');
    let valueTypeFiles: FileList | null = $state(null);
    let dialogStyle = $derived.by(() => {
        let styles = [];

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
                        row.styling = parsed.data;
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
        const bgKeys = ['bgColorIsOn', 'backgroundColor', 'isBackgroundRepeat', 'isBackgroundFitIn', 'backgroundImage'];

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
        row.privateFilterIsOn = Object.keys(filterStyling).some(key => key in data);
        row.privateTextIsOn = Object.keys(textStyling).some(key => key in data);
        row.privateObjectImageIsOn = Object.keys(objectImageStyling).some(key => key in data);
        row.privateRowImageIsOn = Object.keys(rowImageStyling).some(key => key in data);
        row.privateAddonImageIsOn = Object.keys(addonImageStyling).some(key => key in data);
        row.privateBackgroundIsOn = Object.keys(backgroundStyling).some(key => key in data);
        row.privateObjectIsOn = Object.keys(objectStyling).some(key => key in data);
        row.privateRowIsOn = Object.keys(rowStyling).some(key => key in data);
        row.privateAddonIsOn = Object.keys(addonStyling).some(key => key in data);
        row.privateMultiChoiceIsOn = Object.keys(multiChoiceStyling).some(key => key in data);
    }

    function exportDesign() {
        if (row.styling) {
            const design: {version: string, styling: Styling} = {version: appVersion, styling: {}};        
            design.styling = row.styling;

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

    function sortObjects() {
        const widthIndexMap = new Map(objectWidths.map((item, index) => [item.value, index]));
        const fallbackIndex = objectWidths.length;

        if (sortType === '1') {
            row.objects.sort((a, b) => {
                const aIndex = widthIndexMap.get(a.objectWidth) ?? fallbackIndex;
                const bIndex = widthIndexMap.get(b.objectWidth) ?? fallbackIndex;
                
                return bIndex - aIndex;
            });
        } else if (sortType === '2') {
            row.objects.sort((a, b) => {
                const aIndex = widthIndexMap.get(a.objectWidth) ?? fallbackIndex;
                const bIndex = widthIndexMap.get(b.objectWidth) ?? fallbackIndex;
                
                return aIndex - bIndex;
            });
        } else if (sortType === '3') {
            row.objects.sort((a, b) => {
                const aLength = a.text.length;
                const bLength = b.text.length;

                return aLength > bLength ? -1 : aLength < bLength ? 1 : 0;
            });
        } else if (sortType === '4') {
            row.objects.sort((a, b) => {
                const aLength = a.text.length;
                const bLength = b.text.length;

                return aLength < bLength ? -1 : aLength > bLength ? 1 : 0;
            });
        }

        for (let i = 0; i < row.objects.length; i++) {
            row.objects[i].index = i;
        }
    }

    function mergeRow() {
        if (newRow !== '') {
            const nRow = rowMap.get(newRow);

            if (typeof nRow !== 'undefined') {
                const length = nRow.objects.length;

                nRow.objects.push(...row.objects);
                row.objects.splice(0);

                for (let i = length; i < nRow.objects.length; i++) {
                    const oChoice = nRow.objects[i];

                    oChoice.index = i;
                    choiceMap.set(oChoice.id, {choice: oChoice, row: nRow});
                }
            }
        }
    }

    function copyObjects() {
        if (newRow !== '') {
            const nRow = rowMap.get(newRow);

            if (typeof nRow !== 'undefined') {
                for (let i = 0; i < row.objects.length; i++) {
                    const clone = JSON.parse(JSON.stringify(row.objects[i]));

                    clone.id = generateObjectId(0, app.objectIdLength);
                    clone.index = nRow.objects.length;
                    clone.isActive = false;

                    for (let j = 0; j < clone.scores.length; j++) {
                        const score = clone.scores[j];

                        score.idx = generateScoreId(0, 5);
                        scoreSet.add(score.idx);
                        delete score.isActive;
                        delete score.setValue;
                        delete score.discountIsOn;
                        delete score.discountShow;
                        delete score.discountBeforeText;
                        delete score.discountAfterText;
                        delete score.discountScore;
                        delete score.discountScoreCal;
                        delete score.isChangeDiscount;
                        delete score.tmpDisScore;
                        delete score.tmpDiscount;
                        delete score.discountedFrom;
                        delete score.dupTextA;
                        delete score.dupTextB;
                        delete score.discountTextA;
                        delete score.discountTextB;
                        delete score.notStackableDiscount;
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
                        for (let j = 0; j < clone.groups.length; j++) {
                            let group = groupMap.get(clone.groups[j]);
                            if (typeof group !== 'undefined') {
                                let elementIndex = group.elements.indexOf(clone.id);
                                if (elementIndex === -1) group.elements.push(clone.id);
                            }
                        }
                    }
                    if (clone.objectDesignGroups) {
                        for (let j = 0; j < clone.objectDesignGroups.length; j++) {
                            let dGroup = objectDesignMap.get(clone.objectDesignGroups[j]);
                            if (typeof dGroup !== 'undefined') {
                                let elementIndex = dGroup.elements.indexOf(clone.id);
                                if (elementIndex === -1) dGroup.elements.push(clone.id);
                            }
                        }
                    }
                }
            }
        }
    }
</script>