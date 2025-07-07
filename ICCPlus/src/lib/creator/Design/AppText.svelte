<Dialog
    bind:open
    surface$style="width: 1200px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
    style={dialogStyle}
>
    <Title class="dialog-title" tabindex={0} autofocus>
        {#if typeof data !== 'undefined'}
            <FormField>
                <Checkbox bind:checked={() => data.privateTextIsOn?? false, (e) => data.privateTextIsOn = e} onchange={() => {
                    if (data.privateTextIsOn) {
                        let temp = JSON.parse(JSON.stringify(textStyling));
                        Object.keys(textStyling).forEach(key => {
                            if (app.styling.hasOwnProperty(key)) {
                                let val = app.styling[key as keyof StyleType];
                                if (typeof val !== 'undefined') temp[key as keyof StyleType] = val;
                            }
                        });
                        data.styling = {...(data.styling || {}), ...temp};
                        styling = data.styling!;
                    } else {
                        Object.keys(textStyling).forEach(key => {
                            if (data.styling && app.styling.hasOwnProperty(key)) {
                                delete data.styling[key as keyof StyleType];
                            }
                        });
                    }
                }} />
                {#snippet label()}
                    <span class="title--text">Text</span>
                {/snippet}
            </FormField>
        {:else}
            <span class="title--text">Text</span>
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
                        <div class="col-lg-4 gy-2">
                            <div class="col-12 px-3">Row Title</div>
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.customRowTitle?? false, (e) => styling.customRowTitle = e} />
                                {#snippet label()}
                                    Use Local Custom Font?
                                {/snippet}
                            </FormField>
                            {#if styling.customRowTitle}
                                <Textfield class="mb-4" bind:value={() => styling.rowTitle?? '', (e) => styling.rowTitle = e} label="Text Font" variant="filled" />
                            {:else}
                                <Select class="mb-4" bind:value={() => styling.rowTitle?? '', (e) => styling.rowTitle = e} label="Text Font" variant="filled">
                                    {#each textFonts as textFont}
                                        <Option value={textFont}>{textFont}</Option>
                                    {/each}
                                </Select>
                            {/if}
                            <Textfield class="mb-4" bind:value={() => styling.rowTitleTextSize?? 0, (e) => styling.rowTitleTextSize = e} label="Text Size" type="number" suffix="%" variant="filled" />
                            <Select class="mb-4" bind:value={() => styling.rowTitleAlign?? '', (e) => styling.rowTitleAlign = e} label="Text Alignment" variant="filled">
                                {#each textAlignments as textAlignment}
                                    <Option value={textAlignment}>{textAlignment}</Option>
                                {/each}
                            </Select>
                            <div class="text-center">
                                <ColorPicker bind:hex={() => styling.rowTitleColor?? '#000000', (e) => styling.rowTitleColor = e} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} />
                            </div>
                        </div>
                        <div class="col-lg-4 gy-2">
                            <div class="col-12 px-3">Row Text</div>
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.customRowText?? false, (e) => styling.customRowText = e} />
                                {#snippet label()}
                                    Use Local Custom Font?
                                {/snippet}
                            </FormField>
                            {#if styling.customRowText}
                                <Textfield class="mb-4" bind:value={() => styling.rowText?? '', (e) => styling.rowText = e} label="Text Font" variant="filled" />
                            {:else}
                                <Select class="mb-4" bind:value={() => styling.rowText?? '', (e) => styling.rowText = e} label="Text Font" variant="filled">
                                    {#each textFonts as textFont}
                                        <Option value={textFont}>{textFont}</Option>
                                    {/each}
                                </Select>
                            {/if}
                            <Textfield class="mb-4" bind:value={() => styling.rowTextTextSize?? 0, (e) => styling.rowTextTextSize = e} label="Text Size" type="number" suffix="%" variant="filled" />
                            <Select class="mb-4" bind:value={() => styling.rowTextAlign?? '', (e) => styling.rowTextAlign = e} label="Text Alignment" variant="filled">
                                {#each textAlignments as textAlignment}
                                    <Option value={textAlignment}>{textAlignment}</Option>
                                {/each}
                            </Select>
                            <div class="text-center">
                                <ColorPicker bind:hex={() => styling.rowTextColor?? '#000000', (e) => styling.rowTextColor = e} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} />
                            </div>
                        </div>
                        <div class="col-lg-4 gy-2">
                            <div class="col-12 px-3">Choice Title</div>
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.customObjectTitle?? false, (e) => styling.customObjectTitle = e} />
                                {#snippet label()}
                                    Use Local Custom Font?
                                {/snippet}
                            </FormField>
                            {#if styling.customObjectTitle}
                                <Textfield class="mb-4" bind:value={() => styling.objectTitle?? '', (e) => styling.objectTitle = e} label="Text Font" variant="filled" />
                            {:else}
                                <Select class="mb-4" bind:value={() => styling.objectTitle?? '', (e) => styling.objectTitle = e} label="Text Font" variant="filled">
                                    {#each textFonts as textFont}
                                        <Option value={textFont}>{textFont}</Option>
                                    {/each}
                                </Select>
                            {/if}
                            <Textfield class="mb-4" bind:value={() => styling.objectTitleTextSize?? 0, (e) => styling.objectTitleTextSize = e} label="Text Size" type="number" suffix="%" variant="filled" />
                            <Select class="mb-4" bind:value={() => styling.objectTitleAlign?? '', (e) => styling.objectTitleAlign = e} label="Text Alignment" variant="filled">
                                {#each textAlignments as textAlignment}
                                    <Option value={textAlignment}>{textAlignment}</Option>
                                {/each}
                            </Select>
                            <div class="text-center">
                                <ColorPicker bind:hex={() => styling.objectTitleColor?? '#000000', (e) => styling.objectTitleColor = e} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 gy-2">
                            <div class="col-12 px-3">Choice Text</div>
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.customObjectText?? false, (e) => styling.customObjectText = e} />
                                {#snippet label()}
                                    Use Local Custom Font?
                                {/snippet}
                            </FormField>
                            {#if styling.customObjectText}
                                <Textfield class="mb-4" bind:value={() => styling.objectText?? '', (e) => styling.objectText = e} label="Text Font" variant="filled" />
                            {:else}
                                <Select class="mb-4" bind:value={() => styling.objectText?? '', (e) => styling.objectText = e} label="Text Font" variant="filled">
                                    {#each textFonts as textFont}
                                        <Option value={textFont}>{textFont}</Option>
                                    {/each}
                                </Select>
                            {/if}
                            <Textfield class="mb-4" bind:value={() => styling.objectTextTextSize?? 0, (e) => styling.objectTextTextSize = e} label="Text Size" type="number" suffix="%" variant="filled" />
                            <Select class="mb-4" bind:value={() => styling.objectTextAlign?? '', (e) => styling.objectTextAlign = e} label="Text Alignment" variant="filled">
                                {#each textAlignments as textAlignment}
                                    <Option value={textAlignment}>{textAlignment}</Option>
                                {/each}
                            </Select>
                            <div class="text-center">
                                <ColorPicker bind:hex={() => styling.objectTextColor?? '#000000', (e) => styling.objectTextColor = e} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} />
                            </div>
                        </div>
                        <div class="col-lg-4 gy-2">
                            <div class="col-12 px-3">Addon Title</div>
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.customAddonTitle?? false, (e) => styling.customAddonTitle = e} />
                                {#snippet label()}
                                    Use Local Custom Font?
                                {/snippet}
                            </FormField>
                            {#if styling.customAddonTitle}
                                <Textfield class="mb-4" bind:value={() => styling.addonTitle?? '', (e) => styling.addonTitle = e} label="Text Font" variant="filled" />
                            {:else}
                                <Select class="mb-4" bind:value={() => styling.addonTitle?? '', (e) => styling.addonTitle = e} label="Text Font" variant="filled">
                                    {#each textFonts as textFont}
                                        <Option value={textFont}>{textFont}</Option>
                                    {/each}
                                </Select>
                            {/if}
                            <Textfield class="mb-4" bind:value={() => styling.addonTitleTextSize?? 0, (e) => styling.addonTitleTextSize = e} label="Text Size" type="number" suffix="%" variant="filled" />
                            <Select class="mb-4" bind:value={() => styling.addonTitleAlign?? '', (e) => styling.addonTitleAlign = e} label="Text Alignment" variant="filled">
                                {#each textAlignments as textAlignment}
                                    <Option value={textAlignment}>{textAlignment}</Option>
                                {/each}
                            </Select>
                            <div class="text-center">
                                <ColorPicker bind:hex={() => styling.addonTitleColor?? '#000000', (e) => styling.addonTitleColor = e} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} />
                            </div>
                        </div>
                        <div class="col-lg-4 gy-2">
                            <div class="col-12 px-3">Addon Text</div>
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.customAddonText?? false, (e) => styling.customAddonText = e} />
                                {#snippet label()}
                                    Use Local Custom Font?
                                {/snippet}
                            </FormField>
                            {#if styling.customAddonText}
                                <Textfield class="mb-4" bind:value={() => styling.addonText?? '', (e) => styling.addonText = e} label="Text Font" variant="filled" />
                            {:else}
                                <Select class="mb-4" bind:value={() => styling.addonText?? '', (e) => styling.addonText = e} label="Text Font" variant="filled">
                                    {#each textFonts as textFont}
                                        <Option value={textFont}>{textFont}</Option>
                                    {/each}
                                </Select>
                            {/if}
                            <Textfield class="mb-4" bind:value={() => styling.addonTextTextSize?? 0, (e) => styling.addonTextTextSize = e} label="Text Size" type="number" suffix="%" variant="filled" />
                            <Select class="mb-4" bind:value={() => styling.addonTextAlign?? '', (e) => styling.addonTextAlign = e} label="Text Alignment" variant="filled">
                                {#each textAlignments as textAlignment}
                                    <Option value={textAlignment}>{textAlignment}</Option>
                                {/each}
                            </Select>
                            <div class="text-center">
                                <ColorPicker bind:hex={() => styling.addonTextColor?? '#000000', (e) => styling.addonTextColor = e} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 gy-2">
                            <div class="col-12 px-3">Score and Requirement Text</div>
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => styling.customScoreText?? false, (e) => styling.customScoreText = e} />
                                {#snippet label()}
                                    Use Local Custom Font?
                                {/snippet}
                            </FormField>
                            {#if styling.customScoreText}
                                <Textfield class="mb-4" bind:value={() => styling.scoreText?? '', (e) => styling.scoreText = e} label="Text Font" variant="filled" />
                            {:else}
                                <Select class="mb-4" bind:value={() => styling.scoreText?? '', (e) => styling.scoreText = e} label="Text Font" variant="filled">
                                    {#each textFonts as textFont}
                                        <Option value={textFont}>{textFont}</Option>
                                    {/each}
                                </Select>
                            {/if}
                            <Textfield class="mb-4" bind:value={() => styling.scoreTextSize?? 0, (e) => styling.scoreTextSize = e} label="Text Size" type="number" suffix="%" variant="filled" />
                            <Select class="mb-4" bind:value={() => styling.scoreTextAlign?? '', (e) => styling.scoreTextAlign = e} label="Text Alignment" variant="filled">
                                {#each textAlignments as textAlignment}
                                    <Option value={textAlignment}>{textAlignment}</Option>
                                {/each}
                            </Select>
                            <div class="text-center">
                                <ColorPicker bind:hex={() => styling.scoreTextColor?? '#000000', (e) => styling.scoreTextColor = e} components={ChromeVariant} sliderDirection="horizontal" isDialog={false} />
                            </div>
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
    import ColorPicker, { ChromeVariant } from '$lib/custom/svelte-awesome-color-picker';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import FormField from '@smui/form-field';
    import Textfield from '$lib/custom/textfield/Textfield.svelte';
    import Select, { Option } from '$lib/custom/select';
    import { app, textFonts, textStyling } from '$lib/store/store.svelte';
    import type { Choice, Row, Styling, textStyling as StyleType, RowDesignGroup, ObjectDesignGroup } from '$lib/store/types';

    let { open, onclose, data }: { open: boolean; onclose: () => void; data?: Row | Choice | RowDesignGroup | ObjectDesignGroup } = $props();
    const textAlignments = ['center', 'left', 'right', 'justify'];
    let styling = $state<Styling>(typeof data !== 'undefined' ? data.styling || textStyling : app.styling);
    let isTransparent = $state(false);
    let dialogStyle = $derived(isTransparent ? 'opacity: 0.2' : '');
    let isDisabled = $derived(typeof data !== 'undefined' && !data.privateTextIsOn);
</script>