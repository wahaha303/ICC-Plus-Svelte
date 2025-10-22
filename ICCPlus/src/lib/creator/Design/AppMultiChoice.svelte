<Dialog
    bind:open
    surface$style="width: 1200px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
    style={dialogStyle}
>
    <Title class="dialog-title" tabindex={0} autofocus>
        {#if typeof data !== 'undefined'}
            <FormField>
                <Checkbox bind:checked={() => data.privateMultiChoiceIsOn?? false, (e) => data.privateMultiChoiceIsOn = e} onchange={() => {
                    if (data.privateMultiChoiceIsOn) {
                        let temp = JSON.parse(JSON.stringify(multiChoiceStyling));
                        Object.keys(multiChoiceStyling).forEach(key => {
                            if (app.styling.hasOwnProperty(key)) {
                                let val = app.styling[key as keyof StyleType];
                                if (typeof val !== 'undefined') temp[key as keyof StyleType] = val;
                            }
                        });
                        data.styling = {...(data.styling || {}), ...temp};
                        styling = data.styling!;
                    } else {
                        Object.keys(multiChoiceStyling).forEach(key => {
                            if (data.styling && app.styling.hasOwnProperty(key)) {
                                delete data.styling[key as keyof StyleType];
                            }
                        });
                    }
                }} />
                {#snippet label()}
                    <span class="title--text">Multi Choice</span>
                {/snippet}
            </FormField>
        {:else}
            <span class="title--text">Multi Choice</span>
        {/if}
        <FormField>
            <Checkbox bind:checked={isTransparent} />
            {#snippet label()}
                Preview Behind Dialog
            {/snippet}
        </FormField>
    </Title>
    <Content class="p-0">
        <Card class="no-shadow">
            <CardContent>
                <div class:disabled={isDisabled} class="container-fluid">
                    <div class="row">
                        <div class="col-12 px-3 text-center">Tier number</div>
                        <div class="col-sm-6 col-12 gy-2">
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.customMultiTextFont?? false, (e) => styling.customMultiTextFont = e} />
                                {#snippet label()}
                                    Use Local Custom Font?
                                {/snippet}
                            </FormField>
                            {#if styling.customMultiTextFont}
                                <Textfield class="mb-4" bind:value={() => styling.multiChoiceTextFont?? '', (e) => styling.multiChoiceTextFont = e} label="Text Font" variant="filled" />
                            {:else}
                                <Select class="mb-4" bind:value={() => styling.multiChoiceTextFont?? '', (e) => styling.multiChoiceTextFont = e} label="Text Font" variant="filled">
                                    {#each textFonts as textFont}
                                        <Option value={textFont}>{textFont}</Option>
                                    {/each}
                                </Select>
                            {/if}
                        </div>
                        <div class="col-sm-6 col-12 gy-2 d-column justify-end">
                            <Textfield class="mb-4" bind:value={() => styling.multiChoiceTextSize?? 0, (e) => styling.multiChoiceTextSize = e} label="Text Size" type="number" suffix="%" variant="filled" />
                        </div>
                        <div class="col-12 px-3 text-center">Counter</div>
                        <div class="col-sm-6 col-12 gy-2">
                            <Select class="mb-4" bind:value={() => styling.multiChoiceCounterPosition?? 0, (e) => styling.multiChoiceCounterPosition = e} label="Counter Position" variant="filled" alwaysFloat={true} >
                                {#each counterPositions as position}
                                    <Option value={position.value}>{position.text}</Option>
                                {/each}
                            </Select>
                        </div>
                        <div class="col-sm-6 col-12 gy-2">
                            <Textfield class="mb-4" bind:value={() => styling.multiChoiceCounterSize?? 0, (e) => styling.multiChoiceCounterSize = e} label="Text Size" type="number" suffix="%" variant="filled" />
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
    import Button, { Label } from '@smui/button';
    import Card, { Content as CardContent } from '@smui/card';
    import Checkbox from '@smui/checkbox';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import FormField from '@smui/form-field';
    import Textfield from '$lib/custom/textfield/Textfield.svelte';
    import Select, { Option } from '$lib/custom/select';
    import { app, textFonts, multiChoiceStyling } from '$lib/store/store.svelte';
    import type { Choice, Row, Styling, multiChoiceStyling as StyleType, RowDesignGroup, ObjectDesignGroup } from '$lib/store/types';

    let { open, onclose, data }: { open: boolean; onclose: () => void; data?: Row | Choice | RowDesignGroup | ObjectDesignGroup } = $props();
    const counterPositions = [{
        text: "Bottom of Choice Title",
        value: 0
    }, {
        text: "Bottom of Choice Scores",
        value: 1
    }, {
        text: "Bottom of Choice Requirements",
        value: 2
    }, {
        text: "Bottom of Choice Text",
        value: 3
    }, {
        text: "Bottom of Choice Addons",
        value: 4
    }];
    let styling = $state<Styling>(typeof data !== 'undefined' ? data.styling || multiChoiceStyling : app.styling);
    let isTransparent = $state(false);
    let dialogStyle = $derived(isTransparent ? 'opacity: 0.2' : '');
    let isDisabled = $derived(typeof data !== 'undefined' && !data.privateMultiChoiceIsOn);
</script>