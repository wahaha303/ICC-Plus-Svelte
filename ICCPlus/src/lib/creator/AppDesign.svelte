<Dialog
    bind:open
    escapeKeyAction={currentDialog === 'none' ? 'close' : ''}
    surface$style="width: 800px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
    id="dialog"
    style={dialogStyle}
>
    <Title class="text-left dialog-title" tabindex={0} autofocus>
        Design
    </Title>
    <Content>
        <div class="row p-2">
            <div class="col-12">
                Hover over the buttons to see what they do.
            </div>
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
            {#each designMenuComponent as menu, i}
                <div class="col-sm-6 col-12 pt-2 pb-3">
                    <Wrapper text={menu.text}>
                        <Button onclickcapture={menu.action} variant="raised" >
                            <Label>{menu.name}</Label>
                        </Button>
                    </Wrapper>
                </div>
            {/each}
        </div>
    </Content>
    <Actions>
        <Button action="close">
            <Label class="dialog-actions--btn">Close</Label>
        </Button>
    </Actions>
</Dialog>
{#if currentDialog === 'appRowDesign'}
    <AppRowDesign open={currentDialog === 'appRowDesign'} onclose={() => (currentDialog = 'none')} />
{:else if currentDialog === 'appRowImage'}
    <AppRowImage open={currentDialog === 'appRowImage'} onclose={() => (currentDialog = 'none')} />
{:else if currentDialog === 'appChoiceDesign'}
    <AppChoiceDesign open={currentDialog === 'appChoiceDesign'} onclose={() => (currentDialog = 'none')} />
{:else if currentDialog === 'appChoiceImage'}
    <AppChoiceImage open={currentDialog === 'appChoiceImage'} onclose={() => (currentDialog = 'none')} />
{:else if currentDialog === 'appAddonDesign'}
    <AppAddonDesign open={currentDialog === 'appAddonDesign'} onclose={() => (currentDialog = 'none')} />
{:else if currentDialog === 'appAddonImage'}
    <AppAddonImage open={currentDialog === 'appAddonImage'} onclose={() => (currentDialog = 'none')} />
{:else if currentDialog === 'appFilter'}
    <AppFilter open={currentDialog === 'appFilter'} onclose={() => (currentDialog = 'none')} />
{:else if currentDialog === 'appBackground'}
    <AppBackground open={currentDialog === 'appBackground'} onclose={() => (currentDialog = 'none')} />
{:else if currentDialog === 'appText'}
    <AppText open={currentDialog === 'appText'} onclose={() => (currentDialog = 'none')} />
{:else if currentDialog === 'appPointbar'}
    <AppPointbar open={currentDialog === 'appPointbar'} onclose={() => (currentDialog = 'none')} />
{:else if currentDialog === 'appMultiChoice'}
    <AppMultiChoice open={currentDialog === 'appMultiChoice'} onclose={() => (currentDialog = 'none')} />
{:else if currentDialog === 'appBackpack'}
    <AppBackpack open={currentDialog === 'appBackpack'} onclose={() => (currentDialog = 'none')} />
{/if}

<script lang="ts">
    import AppAddonDesign from './Design/AppAddonDesign.svelte';
    import AppAddonImage from './Design/AppAddonImage.svelte';
    import AppBackground from './Design/AppBackground.svelte';
    import AppBackpack from './Design/AppBackpack.svelte';
    import AppChoiceDesign from './Design/AppChoiceDesign.svelte';
    import AppChoiceImage from './Design/AppChoiceImage.svelte';
    import AppFilter from './Design/AppFilter.svelte';
    import AppMultiChoice from './Design/AppMultiChoice.svelte';
    import AppPointbar from './Design/AppPointbar.svelte';
    import AppRowDesign from './Design/AppRowDesign.svelte';
    import AppRowImage from './Design/AppRowImage.svelte';
    import AppText from './Design/AppText.svelte';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Button, { Label } from '@smui/button';
    import { Wrapper } from '$lib/custom/tooltip';
    import Textfield from '$lib/custom/textfield';
	import { app, appVersion, getTimestamp, initStyling, snackbarVariables, StylingSchema } from '$lib/store/store.svelte';
    import type { Styling } from '$lib/store/types';

    let { open, onclose }: { open: boolean; onclose: () => void } = $props();
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
        action: () => { currentDialog = 'appPointbar' },
        name: 'Manage Point-Bar Design',
        text: 'Here you can change the color, postition and font of the bar that holds the created points.'
    }, {
        action: () => { currentDialog = 'appMultiChoice' },
        name: 'Manage Multi Choice Design',
        text: 'Here you can change the color, size and font of the  choices that can be selected multiple times.'
    }, {
        action: () => { currentDialog = 'appBackpack' },
        name: 'Manage Backpack Design',
        text: 'Here you can change the backpack.'
    }];

    let currentDialog = $state<'none' | 'appRowDesign' | 'appRowImage' | 'appChoiceDesign' | 'appChoiceImage' | 'appAddonDesign' | 'appAddonImage' | 'appFilter' | 'appBackground' | 'appText' | 'appPointbar' | 'appMultiChoice' | 'appBackpack'>('none');
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
                        app.styling = parsed.data;
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

    function exportDesign() {
        if (app.styling) {
            const design: {version: string, styling: Styling} = {version: appVersion, styling: {}};        
            design.styling = app.styling;

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
</script>