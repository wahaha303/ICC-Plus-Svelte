<Dialog
    bind:open
    escapeKeyAction={currentDialog === 'none' ? 'close' : ''}
    surface$style="width: 600px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
>
    <Title tabindex={0} autofocus>
        Design Settings
    </Title>
    <Content>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 gy-2">
                    <div class="row">
                        <div class="col-12 py-2">
                            <div class="hide-file-ui">
                                <Textfield bind:files={valueTypeFiles} label="Import Design" type="file" input$accept="application/json" />
                            </div>
                        </div>
                        <div class="col-12 py-3">
                            <Wrapper text="Here you can export your design.">
                                <Button onclick={exportDesign} variant="raised" >
                                    <Label>Export Design</Label>
                                </Button>
                            </Wrapper>
                        </div>
                        {#each designMenuComponent as menu, i}
                            {#if i > 1 || (i <= 1 && isRow)}
                                <div class="col-sm-6 col-12 pt-2 pb-3">
                                    <Wrapper text={menu.text}>
                                        <Button onclick={menu.action} variant="raised" >
                                            <Label class="line-default">{menu.name}</Label>
                                        </Button>
                                    </Wrapper>
                                </div>
                            {/if}
                        {/each}
                    </div>
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
    <AppRowDesign open={currentDialog === 'appRowDesign'} onclose={() => (currentDialog = 'none')} data={data} />
{:else if currentDialog === 'appRowImage'}
    <AppRowImage open={currentDialog === 'appRowImage'} onclose={() => (currentDialog = 'none')} data={data} />
{:else if currentDialog === 'appChoiceDesign'}
    <AppChoiceDesign open={currentDialog === 'appChoiceDesign'} onclose={() => (currentDialog = 'none')} data={data} />
{:else if currentDialog === 'appChoiceImage'}
    <AppChoiceImage open={currentDialog === 'appChoiceImage'} onclose={() => (currentDialog = 'none')} data={data} />
{:else if currentDialog === 'appAddonDesign'}
    <AppAddonDesign open={currentDialog === 'appAddonDesign'} onclose={() => (currentDialog = 'none')} data={data} />
{:else if currentDialog === 'appAddonImage'}
    <AppAddonImage open={currentDialog === 'appAddonImage'} onclose={() => (currentDialog = 'none')} data={data} />
{:else if currentDialog === 'appFilter'}
    <AppFilter open={currentDialog === 'appFilter'} onclose={() => (currentDialog = 'none')} data={data} />
{:else if currentDialog === 'appBackground'}
    <AppBackground open={currentDialog === 'appBackground'} onclose={() => (currentDialog = 'none')} data={data} />
{:else if currentDialog === 'appText'}
    <AppText open={currentDialog === 'appText'} onclose={() => (currentDialog = 'none')} data={data} />
{:else if currentDialog === 'appMultiChoice'}
    <AppMultiChoice open={currentDialog === 'appMultiChoice'} onclose={() => (currentDialog = 'none')} data={data} />
{/if}

<script lang="ts">
    import AppAddonDesign from '../Design/AppAddonDesign.svelte';
    import AppAddonImage from '../Design/AppAddonImage.svelte';
    import AppBackground from '../Design/AppBackground.svelte';
    import AppChoiceDesign from '../Design/AppChoiceDesign.svelte';
    import AppChoiceImage from '../Design/AppChoiceImage.svelte';
    import AppFilter from '../Design/AppFilter.svelte';
    import AppMultiChoice from '../Design/AppMultiChoice.svelte';
    import AppRowDesign from '../Design/AppRowDesign.svelte';
    import AppRowImage from '../Design/AppRowImage.svelte';
    import AppText from '../Design/AppText.svelte';
    import Button, { Label } from '@smui/button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Textfield from '$lib/custom/textfield';
    import { Wrapper } from '$lib/custom/tooltip';
    import { appVersion, backpackStyling, getTimestamp, initStyling, pointBarStyling, rowImageStyling, rowStyling, filterStyling, textStyling, objectImageStyling, addonImageStyling, backgroundStyling, objectStyling, addonStyling, multiChoiceStyling, snackbarVariables, StylingSchema } from '$lib/store/store.svelte';
    import type { RowDesignGroup, ObjectDesignGroup, Styling } from '$lib/store/types';
    
    let { open, onclose, data, isRow }: { open: boolean; onclose: () => void; data: RowDesignGroup | ObjectDesignGroup; isRow: boolean } = $props();
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
    let valueTypeFiles: FileList | null = $state(null);

    $effect(() => {
        if (valueTypeFiles !== null && valueTypeFiles.length === 1 && valueTypeFiles[0].type === "application/json") {
            const file = new FileReader;
            file.onload = () => {
                try {
                    const jData = JSON.parse(file.result as string);
                    const oldVersion = (typeof data.version === 'undefined' || data.version === '2.0.0-beta');
                    let parsed;

                    if (typeof data.styling === 'undefined') {
                        parsed = StylingSchema.safeParse(jData);
                    } else {
                        parsed = StylingSchema.safeParse(jData.styling);
                    }
                    if (parsed.success) {
                        initStyling(parsed.data, oldVersion);
                        removeInvalidStyles(parsed.data);
                        data.styling = parsed.data;
                        checkPrivateDesign(parsed.data, isRow);
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

    function removeInvalidStyles(style: any) {
        const bgKeys = isRow ? ['bgColorIsOn', 'backgroundColor', 'isBackgroundRepeat', 'isBackgroundFitIn', 'backgroundImage'] : ['bgColorIsOn', 'backgroundColor', 'rowBgColorIsOn', 'rowBgColor', 'isBackgroundRepeat', 'isBackgroundFitIn', 'backgroundImage', 'isRowBackgroundRepeat', 'isRowBackgroundFitIn', 'rowBackgroundImage'];

        if (!isRow) {
            Object.keys(rowStyling).forEach((key) => {
                if (key in style) {
                    delete style[key];
                }
            });
            Object.keys(rowImageStyling).forEach((key) => {
                if (key in style) {
                    delete style[key];
                }
            });
        }

        Object.keys(pointBarStyling).forEach((key) => {
            if (key in style) {
                delete style[key];
            }
        });
        Object.keys(backpackStyling).forEach((key) => {
            if (key in style) {
                delete style[key];
            }
        });

        for (let i = 0; i < bgKeys.length; i++) {
            const key = bgKeys[i];

            if (key in style) {
                delete style[key];
            }
        }
    }

    function checkPrivateDesign(styling: any, isRow: boolean) {
        if (isRow) {
            data.privateRowImageIsOn = Object.keys(rowImageStyling).some(key => key in styling);
            data.privateRowIsOn = Object.keys(rowStyling).some(key => key in styling);
        }
        data.privateFilterIsOn = Object.keys(filterStyling).some(key => key in styling);
        data.privateTextIsOn = Object.keys(textStyling).some(key => key in styling);
        data.privateObjectImageIsOn = Object.keys(objectImageStyling).some(key => key in styling);
        data.privateAddonImageIsOn = Object.keys(addonImageStyling).some(key => key in styling);
        data.privateBackgroundIsOn = Object.keys(backgroundStyling).some(key => key in styling);
        data.privateObjectIsOn = Object.keys(objectStyling).some(key => key in styling);
        data.privateAddonIsOn = Object.keys(addonStyling).some(key => key in styling);
        data.privateMultiChoiceIsOn = Object.keys(multiChoiceStyling).some(key => key in styling);
    }

    function exportDesign() {
        if (data.styling) {
            const design: {version: string, styling: Styling} = {version: appVersion, styling: {}};        
            design.styling = data.styling;

            const saveData = JSON.stringify(design);
            const blob = new Blob([saveData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            const filename = `project_${getTimestamp()}.json`;
            
            a.href = url;
            a.download = filename;
            a.click();

            URL.revokeObjectURL(url);
        }
    }
</script>