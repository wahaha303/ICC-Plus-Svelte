<Dialog
    bind:open
    surface$style="width: 600px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
>
    <Title tabindex={0} autofocus>
        Row Button Settings
    </Title>
    <Content class="p-0">
        <Card class="no-shadow">
            <CardContent>
                <div class="container-fluid">
                    <div class="row text-center">
                        <div class="col-12 pb-4">
                            <Textfield class="mb-4" bind:value={row.buttonText} label="Button Text" variant="filled" />
                            {#each options as option}
                                <FormField class="w-100">
                                    <Radio bind:group={row.buttonTypeRadio} value={option.value} />
                                    {#snippet label()}
                                        {option.name}
                                    {/snippet}
                                </FormField>
                            {/each}
                        </div>
                        <div class="col-12">
                            {#if row.buttonTypeRadio === 'sumaddon'}
                                <FormField class="w-100 pb-3">
                                    <Switch bind:checked={() => row.btnPointAddon ?? false, (e) => row.btnPointAddon = e} onSMUISwitchChange={() => {
                                        if (row.btnPointAddon) {
                                            row.randomMin = 0;
                                            row.randomMax = 0;
                                        } else {
                                            delete row.btnPointAddon;
                                            delete row.pointTypeRandom;
                                            delete row.randomMin;
                                            delete row.randomMax;
                                        }
                                    }} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Button will add a sum to a Point-type
                                    {/snippet}
                                </FormField>
                                {#if row.btnPointAddon}
                                    <Autocomplete
                                        options={optimizedPointTypes}
                                        bind:value={row.pointTypeRandom}
                                        label="Point-Type to use"
                                        toggle={true}
                                        showMenuWithNoInput={true}
                                        textfield$variant="filled"
                                        class="w-100"
                                    />
                                    <Textfield bind:value={() => row.randomMin ?? 0, (e) => row.randomMin = e} label="Random Min" type="number" variant="filled" />
                                    <Textfield bind:value={() => row.randomMax ?? 0, (e) => row.randomMax = e} label="Random Max" type="number" variant="filled" />
                                {/if}
                            {:else if row.buttonTypeRadio === 'choiceselect'}
                                <div class="col-12 pb-4">
                                    {#if !row.buttonRandom}
                                        <Autocomplete
                                            options={optimizedVariables}
                                            bind:value={row.buttonId}
                                            label="Variable"
                                            toggle={true}
                                            showMenuWithNoInput={true}
                                            textfield$variant="filled"
                                            class="w-100"
                                        />
                                    {:else if !row.isWeightedRandom}
                                        <Textfield bind:value={row.buttonRandomNumber} label="Number of random choices that will be selected" type="number" variant="filled" />
                                    {/if}
                                </div>
                                <FormField class="w-100 pb-3">
                                    <Switch bind:checked={() => row.buttonRandom?? false, (e) => row.buttonRandom = e} onSMUISwitchChange={() => {
                                        if (row.buttonRandom) {
                                            row.buttonRandomNumber = 1;
                                            row.isWeightedRandom = false;
                                            delete row.buttonId;
                                        } else {
                                            delete row.buttonRandom;
                                            delete row.buttonRandomNumber;
                                            delete row.isWeightedRandom
                                            delete row.onlyUnselectedChoices;
                                            delete row.onlyIfNoChoices;
                                        }
                                    }} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Random or Variable?
                                    {/snippet}
                                </FormField>
                                {#if row.buttonRandom}
                                    <FormField class="w-100 pb-3">
                                        <Switch bind:checked={() => row.isWeightedRandom ?? false, (e) => row.isWeightedRandom = e} onSMUISwitchChange={() => {
                                            if (row.isWeightedRandom) {
                                                delete row.buttonRandomNumber;
                                            } else {
                                                row.buttonRandomNumber = 1;
                                                delete row.isWeightedRandom;
                                            }
                                        }} color="secondary" class="switch-scale" />
                                        {#snippet label()}
                                            Uniform or Weighted?
                                        {/snippet}
                                    </FormField>
                                    <FormField class="w-100 pb-3">
                                        <Switch bind:checked={() => row.onlyUnselectedChoices ?? false, (e) => row.onlyUnselectedChoices = e} color="secondary" class="switch-scale" />
                                        {#snippet label()}
                                            Only Unselected choices?
                                        {/snippet}
                                    </FormField>
                                    <FormField class="w-100 pb-3">
                                        <Switch bind:checked={() => row.onlyIfNoChoices ?? false, (e) => row.onlyIfNoChoices = e} color="secondary" class="switch-scale" />
                                        {#snippet label()}
                                            Button can only be pressed if no choices is selected?
                                        {/snippet}
                                    </FormField>
                                {:else}
                                    <FormField class="w-100 pb-3">
                                        <Switch bind:checked={() => row.buttonType ?? false, (e) => row.buttonType = e} color="secondary" class="switch-scale" />
                                        {#snippet label()}
                                            Toggleable?
                                        {/snippet}
                                    </FormField>
                                {/if}
                            {/if}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </Content>
    <Actions>
        <Button action="close">
            <Label class="dialog-actions--btn">Close</Label>
        </Button>
    </Actions>
</Dialog>
<script lang="ts">
    import Autocomplete from '$lib/custom/autocomplete';
    import Button, { Label } from '@smui/button';
    import Card, { Content as CardContent } from '@smui/card';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import FormField from '@smui/form-field';
    import Radio from '@smui/radio';
    import Switch from '@smui/switch';
    import Textfield from '$lib/custom/textfield/Textfield.svelte';
    import { app } from '$lib/store/store.svelte';
    import type { Row } from '$lib/store/types';

    let { open, onclose, row }: { open: boolean; onclose: () => void; row: Row } = $props();
    let options = [{
        name: 'Point Type Sum Addon',
        value: 'sumaddon'
    }, {
        name: 'Other',
        value: 'choiceselect'
    }];
    let optimizedPointTypes = $derived(app.pointTypes.map(({id}) => id));
    let optimizedVariables = $derived(app.variables.map(({id}) => id));
</script>