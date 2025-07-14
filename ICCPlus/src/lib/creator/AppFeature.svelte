<Dialog
    bind:open
    escapeKeyAction={currentDialog === 'none' ? 'close' : ''}
    surface$style="width: 1200px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
>
    <Title class="text-left dialog-title" tabindex={0} autofocus>
        Features
    </Title>
    <Content>
        <div class="row p-2">
            {#each featureMenuComponent as _undefined, i}
                {#if i === 10}
                    <div class="col-12 d-column justify-space-between pt-3">
                        <p class="mb-3">{featureMenuComponent[i].text}</p>
                        <Button onclick={featureMenuComponent[i].action} variant="raised" >
                            <Label>{featureMenuComponent[i].name}</Label>
                        </Button>
                    </div>
                {:else}
                    <div class="col-sm-6 col-12 d-column justify-space-between py-2">
                        <p class="mb-3">{featureMenuComponent[i].text}</p>
                        <Button onclick={featureMenuComponent[i].action} variant="raised" >
                            <Label>{featureMenuComponent[i].name}</Label>
                        </Button>
                    </div>
                {/if}
            {/each}
        </div>
    </Content>
    <Actions>
        <Button action="close">
            <Label class="dialog-actions--btn">Close</Label>
        </Button>
    </Actions>
</Dialog>
{#if currentDialog === 'appPoints'}
    <AppPoints open={currentDialog === 'appPoints'} onclose={() => (currentDialog = 'none')} />
{:else if currentDialog === 'appVariables'}
    <AppVariables open={currentDialog === 'appVariables'} onclose={() => (currentDialog = 'none')} />
{:else if currentDialog === 'appGroups'}
    <AppGroups open={currentDialog === 'appGroups'} onclose={() => (currentDialog = 'none')} />
{:else if currentDialog === 'appBackpack'}
    <AppBackpack open={currentDialog === 'appBackpack'} onclose={() => (currentDialog = 'none')} />
{:else if currentDialog === 'appTemplates'}
    <AppTemplates open={currentDialog === 'appTemplates'} onclose={() => (currentDialog = 'none')} />
{:else if currentDialog === 'appDefaults'}
    <AppDefaults open={currentDialog === 'appDefaults'} onclose={() => (currentDialog = 'none')} />
{:else if currentDialog === 'appSymbols'}
    <AppSymbols open={currentDialog === 'appSymbols'} onclose={() => (currentDialog = 'none')} />
{:else if currentDialog === 'appWords'}
    <AppWords open={currentDialog === 'appWords'} onclose={() => (currentDialog = 'none')} />
{:else if currentDialog === 'appIdSearch'}
    <AppIdSearch open={currentDialog === 'appIdSearch'} onclose={() => (currentDialog = 'none')} />
{:else if currentDialog === 'appDesignGroups'}
    <AppDesignGroups open={currentDialog === 'appDesignGroups'} onclose={() => (currentDialog = 'none')} />
{:else if currentDialog === 'appGlobalRequirements'}
    <AppGlobalRequirements open={currentDialog === 'appGlobalRequirements'} onclose={() => (currentDialog = 'none')} />
{/if}

<script lang="ts">    
    import AppPoints from './Features/AppPoints.svelte';
    import AppVariables from './Features/AppVariables.svelte';
    import AppGroups from './Features/AppGroups.svelte';
    import AppBackpack from './Features/AppBackpack.svelte';
    import AppTemplates from './Features/AppTemplates.svelte';
    import AppDefaults from './Features/AppDefaults.svelte';
    import AppSymbols from './Features/AppSymbols.svelte';
    import AppWords from './Features/AppWords.svelte';
    import AppIdSearch from './Features/AppIdSearch.svelte';
    import AppDesignGroups from './Features/AppDesignGroups.svelte';
    import AppGlobalRequirements from './Features/AppGlobalRequirements.svelte';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Button, { Label } from '@smui/button';

    let { open, onclose }: { open: boolean; onclose: () => void } = $props();
    const featureMenuComponent = [{
        action: () => { currentDialog = 'appPoints' },
        name: 'Manage Points',
        text: 'Point systems can be created and used to handle the player\'s ability to buy things and to keep a record of selected choices in a group or row.'
    }, {
        action: () => { currentDialog = 'appVariables' },
        name: 'Manage Variables',
        text: 'Variables can currently only be used by adding them to buttons, which in turn can activate and deactivate them, and the variable-id can be used in requirements.'
    }, {
        action: () => { currentDialog = 'appGroups' },
        name: 'Manage Groups',
        text: 'Rows and objects can be added into groups, and rows that show the selected choices can then use a group to decide which choices to show.'
    }, {
        action: () => { currentDialog = 'appBackpack' },
        name: 'Manage Backpack and Choice Import',
        text: 'The backpack is where rows can show which choices have been selected can be placed, and the import is where selected choices can be imported.'
    }, {
        action: () => { currentDialog = 'appDefaults' },
        name: 'Manage Defaults',
        text: 'In defaults, you can write in default text that you want the choices and rows to be filled with when created.'
    }, {
        action: () => { currentDialog = 'appTemplates' },
        name: 'Style Template',
        text: 'In styles, you can find the premade design-templates, that either can be used as-is or to create a new design from.'
    }, {
        action: () => { currentDialog = 'appWords' },
        name: 'Words',
        text: 'Words can be changed when a choice is presssed, or in textfields by the player, and be placed around in the text.'
    }, {
        action: () => { currentDialog = 'appSymbols' },
        name: 'Symbols and Image Compression',
        text: 'Symbols will show off some of the alt-codes that can be used in your project where you can place text. This is also where you can compress all the images in your project.'
    }, {
        action: () => { currentDialog = 'appIdSearch' },
        name: 'ID / Name List',
        text: 'Will show you a list of ID\'s and the names of the choices they belong to.'
    }, {
        action: () => { currentDialog = 'appDesignGroups' },
        name: 'Manage Design Groups',
        text: 'In Design Groups, you can manage Private Styling in a granular way.'
    }, {
        action: () => { currentDialog = 'appGlobalRequirements' },
        name: 'Manage Global Requirements',
        text: 'In Global Requirements, You can define requirements that are common to multiple choices.'
    }];
    let currentDialog = $state<'none' | 'appPoints' | 'appVariables' | 'appGroups' | 'appBackpack' | 'appTemplates' | 'appDefaults' | 'appSymbols' | 'appWords' | 'appIdSearch' | 'appDesignGroups' | 'appGlobalRequirements'>('none');

</script>