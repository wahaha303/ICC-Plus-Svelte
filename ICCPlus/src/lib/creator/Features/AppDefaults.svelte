<Dialog
    bind:open
    surface$style="width: 1300px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
>
    <Title class="dialog-title" tabindex={0} autofocus>
        Project Defaults
    </Title>
    <Content>
        <div class="container-fluid pb-4">
            <Accordion class="mt-4">
                <Panel class="bordered-panel{panel01 ? ' on-top' : ''}" bind:open={panel01} variant="unelevated" conditionalRender={true}>
                    <Header class="p-0">
                        Default Settings - Row
                        {#snippet icon()}
                            <IconButton toggle pressed={panel01} size="mini">
                                <Icon class="mdi mdi-chevron-up" on></Icon>
                                <Icon class="mdi mdi-chevron-down"></Icon>
                            </IconButton>
                        {/snippet}
                    </Header>
                    <AcdContent style="overflow:visible">
                        {#if panel01}
                                <Select bind:value={app.defaultRowTemplate} label="Template" variant="filled" alwaysFloat={true}>
                                    {#each rowTemplates as template (template.text)}
                                        <Option value={template.value}>{template.text}</Option>
                                    {/each}
                                </Select>
                                <Select bind:value={app.defaultRowWidth} label="Choices per row" variant="filled" alwaysFloat={true}>
                                    {#each objectWidths as objectWidth (objectWidth.text)}
                                        <Option value={objectWidth.value}>{objectWidth.text}</Option>
                                    {/each}
                                </Select>
                                <Select bind:value={app.defaultRowJustify} label="Choices Justify" variant="filled">
                                    {#each justifies as justify (justify.value)}
                                        <Option value={justify.value}>{justify.value}</Option>
                                    {/each}
                                </Select>
                                <Textfield bind:value={app.defaultRowAllowedChoices} onchange={() => app.defaultRowAllowedChoices = Math.max(app.defaultRowAllowedChoices, 0)} input$min={0} label="Allowed Choices" variant="filled" type="number" />
                            <Textfield bind:value={app.defaultRowTitle} label="Row Title" variant="filled" />
                            <Textfield textarea bind:value={app.defaultRowText} label="Row Text" variant="filled" input$rows={5} />
                        {/if}
                    </AcdContent>
                </Panel>
                <Panel class="bordered-panel{panel02 ? ' on-top' : ''}" bind:open={panel02} variant="unelevated" conditionalRender={true}>
                    <Header class="p-0">
                        Default Settings - Choice
                        {#snippet icon()}
                            <IconButton toggle pressed={panel02} size="mini">
                                <Icon class="mdi mdi-chevron-up" on></Icon>
                                <Icon class="mdi mdi-chevron-down"></Icon>
                            </IconButton>
                        {/snippet}
                    </Header>
                    <AcdContent style="overflow:visible">
                        {#if panel02}
                            <Select bind:value={app.defaultChoiceTemplate} label="Template" variant="filled" alwaysFloat={true}>
                                {#each choiceTemplates as template (template.text)}
                                    <Option value={template.value}>{template.text}</Option>
                                {/each}
                            </Select>
                            <Select bind:value={app.defaultChoiceWidth} label="Choices per row" variant="filled" alwaysFloat={true}>
                                {#each objectWidths as objectWidth (objectWidth.text)}
                                    <Option value={objectWidth.value}>{objectWidth.text}</Option>
                                {/each}
                            </Select>
                            <Textfield bind:value={app.defaultChoiceMaxNum} onchange={() => app.defaultChoiceMaxNum = Math.max(app.defaultChoiceMaxNum, 0)} input$min={0} label="Number at witch the plus stops working" variant="filled" type="number" />
                            <Textfield bind:value={app.defaultChoiceTitle} label="Choice Title" variant="filled" />
                            <Textfield textarea bind:value={app.defaultChoiceText} label="Choice Text" variant="filled" input$rows={5} />
                        {/if}
                    </AcdContent>
                </Panel>
                <Panel class="bordered-panel{panel03 ? ' on-top' : ''}" bind:open={panel03} variant="unelevated" conditionalRender={true}>
                    <Header class="p-0">
                        Default Settings - Addon
                        {#snippet icon()}
                            <IconButton toggle pressed={panel03} size="mini">
                                <Icon class="mdi mdi-chevron-up" on></Icon>
                                <Icon class="mdi mdi-chevron-down"></Icon>
                            </IconButton>
                        {/snippet}
                    </Header>
                    <AcdContent style="overflow:visible">
                        {#if panel03}
                            <div class="row pb-2">
                                <FormField class="col-lg-4 col-12">
                                    <Switch bind:checked={() => app.defaultUseSeperateAddon ?? false, (e) => app.defaultUseSeperateAddon = e} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Enable Use Seperate Layout
                                    {/snippet}
                                </FormField>
                                <FormField class="col-lg-4 col-12">
                                    <Switch bind:checked={() => app.defaultUseShowAddon ?? false, (e) => app.defaultUseShowAddon = e} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Enable Always Show Addon
                                    {/snippet}
                                </FormField>
                                <FormField class="col-lg-4 col-12">
                                    <Switch bind:checked={() => app.defaultUseHideAddon ?? false, (e) => app.defaultUseHideAddon = e} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Enable Hide unless Be Selected
                                    {/snippet}
                                </FormField>
                            </div>
                            <Select bind:value={app.defaultAddonTemplate} label="Template" variant="filled" alwaysFloat={true}>
                                {#each choiceTemplates as template (template.text)}
                                    <Option value={template.value}>{template.text}</Option>
                                {/each}
                            </Select>
                            <Select bind:value={app.defaultAddonWidth} label="Addons per row" variant="filled" alwaysFloat={true}>
                                {#each addonWidths as addonWidth (addonWidth.text)}
                                    <Option value={addonWidth.value}>{addonWidth.text}</Option>
                                {/each}
                            </Select>
                            <Select bind:value={app.defaultAddonJustify} label="Addon Justify" variant="filled" alwaysFloat={true}>
                                {#each justifies as justify (justify.value)}
                                    <Option value={justify.value}>{justify.value}</Option>
                                {/each}
                            </Select>
                            <Textfield bind:value={app.defaultAddonTitle} label="Addon Title" variant="filled" />
                            <Textfield textarea bind:value={app.defaultAddonText} label="Addon Text" variant="filled" input$rows={5} />
                        {/if}
                    </AcdContent>
                </Panel>
                <Panel class="bordered-panel{panel04 ? ' on-top' : ''}" bind:open={panel04} variant="unelevated" conditionalRender={true}>
                    <Header class="p-0">
                        Default Settings - Score
                        {#snippet icon()}
                            <IconButton toggle pressed={panel04} size="mini">
                                <Icon class="mdi mdi-chevron-up" on></Icon>
                                <Icon class="mdi mdi-chevron-down"></Icon>
                            </IconButton>
                        {/snippet}
                    </Header>
                    <AcdContent style="overflow:visible">
                        {#if panel04}
                            <div class="row pb-2">
                                <FormField class="col-12">
                                    <Switch bind:checked={() => app.defaultUseShowScore ?? false, (e) => app.defaultUseShowScore = e} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Enable Show Score
                                    {/snippet}
                                </FormField>
                            </div>
                            <Textfield bind:value={app.defaultBeforePoint} label="Before Points Text" variant="filled" />
                            <Textfield bind:value={app.defaultAfterPoint} label="After Points Text" variant="filled" />
                        {/if}
                    </AcdContent>
                </Panel>
                <Panel class="bordered-panel{panel05 ? ' on-top' : ''}" bind:open={panel05} variant="unelevated" conditionalRender={true}>
                    <Header class="p-0">
                        Default Settings - Requirement
                        {#snippet icon()}
                            <IconButton toggle pressed={panel05} size="mini">
                                <Icon class="mdi mdi-chevron-up" on></Icon>
                                <Icon class="mdi mdi-chevron-down"></Icon>
                            </IconButton>
                        {/snippet}
                    </Header>
                    <AcdContent style="overflow:visible">
                        {#if panel05}
                            <div class="row pb-2">
                                <FormField class="col-12">
                                    <Switch bind:checked={() => app.defaultUseShowReq ?? false, (e) => app.defaultUseShowReq = e} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Enable Show Requirement
                                    {/snippet}
                                </FormField>
                            </div>
                            <div class="row">
                                <div class="col-md-4 col-12 mb-4">
                                    <div class="col-12">Requirement</div>
                                    <Textfield bind:value={app.defaultBeforeReq} label="Before Required Text" variant="filled" />
                                    <Textfield bind:value={app.defaultAfterReq} label="After Required Text" variant="filled" />
                                </div>
                                <div class="col-md-4 col-12 mb-4">
                                    <div class="col-12">Or Requirement</div>
                                    <Select bind:value={app.orderOrReqText} label="Order of Text" variant="filled">
                                        {#each orderOrReq as order (order.text)}
                                            <Option value={order.value}>{order.text}</Option>
                                        {/each}
                                    </Select>
                                    <Textfield bind:value={app.defaultOrReq} label="Or Requirement Text" variant="filled" />
                                </div>
                                <div class="col-md-4 col-12 mb-4">
                                    <div class="col-12">Selected From Requirement</div>
                                    <Select bind:value={app.orderSelReqText} label="Order of Text" variant="filled">
                                        {#each orderSelReq as order (order.text)}
                                            <Option value={order.value}>{order.text}</Option>
                                        {/each}
                                    </Select>
                                    <Textfield bind:value={app.defaultSelReq} label="Selected From Requirement Text" variant="filled" />
                                </div>
                            </div>
                        {/if}
                    </AcdContent>
                </Panel>
            </Accordion>
            <div class="row gx-0">
                <div class="col-12 mt-3">
                    Clicking this will change the id of all of the choices and rows where the title is longer than 2 letters, or the default title, into the title, which can make it easier to manage on larger projects with large amounts of requirements being used. Spaces will be replaced with underscores(_).
                </div>
                <div class="col-12">
                    <Button onclickcapture={idToTitle} variant="raised">
                        <Label>Change Ids to titles</Label>
                    </Button>
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
<script lang="ts">
    import Accordion, { Panel, Header, Content as AcdContent} from '$lib/custom/accordion';
    import Button, { Label } from '@smui/button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import FormField from '@smui/form-field';
    import IconButton, { Icon } from '@smui/icon-button';
    import Switch from '@smui/switch';
    import Textfield from '$lib/custom/textfield/Textfield.svelte';
    import Select, { Option } from '$lib/custom/select';
	import { app, checkDupId, rowMap, choiceMap, objectWidths } from '$lib/store/store.svelte';
    
    let { open, onclose }: { open: boolean; onclose: () => void } = $props();
    let panel01 = $state(false);
    let panel02 = $state(false);
    let panel03 = $state(false);
    let panel04 = $state(false);
    let panel05 = $state(false);
    const orderOrReq = [{
        text: 'X of Y',
        value: '0'
    }, {
        text: 'Y of X',
        value: '1'
    }];
    const orderSelReq = [{
        text: 'X from Y',
        value: '0'
    }, {
        text: 'Y from X',
        value: '1'
    }];
    const justifies = [{
        value: 'start'
    }, {
        value: 'center'
    }, {
        value: 'end'
    }, {
        value: 'space-around'
    }, {
        value: 'space-between'
    }];
    const rowTemplates = [{
        text: 'Image Top',
        value: 1
    }, {
        text: 'Image Right',
        value: 2
    }, {
        text: 'Image Left',
        value: 3
    }, {
        text: 'Image Bottom',
        value: 4
    }, {
        text: 'Image Center',
        value: 5
    }];
    const choiceTemplates = [{
        text: 'Image Top',
        value: 1
    }, {
        text: 'Image Left',
        value: 2
    }, {
        text: 'Image Right',
        value: 3
    }, {
        text: 'Image Bottom',
        value: 4
    }, {
        text: 'Image Center',
        value: 5
    }];
    const addonWidths = [{
        text: '1 per row',
        value: 'col-12'
    }, {
        text: '11/12',
        value: 'col-sm-11'
    }, {
        text: '10/12',
        value: 'col-sm-10'
    }, {
        text: '9/12',
        value: 'col-sm-9'
    }, {
        text: '8/12',
        value: 'col-sm-8'
    }, {
        text: '7/12',
        value: 'col-sm-7'
    }, {
        text: '2 per row',
        value: 'col-sm-6'
    }, {
        text: '5/12',
        value: 'col-sm-5'
    }, {
        text: '3 per row',
        value: 'col-md-4'
    }, {
        text: '4 per row',
        value: 'col-md-3'
    }, {
        text: '5 per row',
        value: 'w-20'
    }, {
        text: '6 per row',
        value: 'col-lg-2'
    }, {
        text: '7 per row',
        value: 'w-14'
    }, {
        text: '8 per row',
        value: 'w-12'
    }, {
        text: '9 per row',
        value: 'w-11'
    }, {
        text: '10 per row',
        value: 'w-10'
    }, {
        text: '11 per row',
        value: 'w-9'
    }, {
        text: '12 per row',
        value: 'col-xl-1'
    }];
    

    function getTextContent(str: string) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = str;

        return tempDiv.textContent;
    }

    function idToTitle() {
        for (let i = 0; i < app.rows.length; i++) {
            let appRow = app.rows[i];
            if (appRow.id.length > 2 && appRow.title !== app.defaultRowTitle) {
                let rowTitle = getTextContent(appRow.title.replace(/[ ,]/g, '_'));
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = rowTitle;

                let id = checkDupId(rowTitle, rowMap);
                let data = rowMap.get(appRow.id);
                if (typeof data !== 'undefined') {
                    rowMap.set(id, data);
                    rowMap.delete(appRow.id);
                    appRow.id = id;
                }
            }
            for (let j = 0; j < appRow.objects.length; j++) {
                let appChoice = appRow.objects[j];
                if (appChoice.id.length > 2 && appChoice.title !== app.defaultChoiceTitle) {
                    let choiceTitle = getTextContent(appChoice.title.replace(/[ ,]/g, '_'));
                    let id = checkDupId(choiceTitle, choiceMap);
                    let data = choiceMap.get(appChoice.id);
                    if (typeof data !== 'undefined') {
                        choiceMap.set(id, data);
                        choiceMap.delete(appChoice.id);
                        appChoice.id = id;
                    }
                }
            }
        }
        for (let i = 0; i < app.backpack.length; i++) {
            let appRow = app.backpack[i];
            if (appRow.id.length > 2 && appRow.title !== app.defaultRowTitle) {
                let rowTitle = getTextContent(appRow.title.replace(/[ ,]/g, '_'));
                let id = checkDupId(rowTitle, rowMap);
                let data = rowMap.get(appRow.id);
                if (typeof data !== 'undefined') {
                    rowMap.set(id, data);
                    rowMap.delete(appRow.id);
                    appRow.id = id;
                }
            }
            for (let j = 0; j < appRow.objects.length; j++) {
                let appChoice = appRow.objects[j];
                if (appChoice.id.length > 2 && appChoice.title !== app.defaultChoiceTitle) {
                    let choiceTitle = getTextContent(appChoice.title.replace(/[ ,]/g, '_'));
                    let id = checkDupId(choiceTitle, choiceMap);
                    let data = choiceMap.get(appChoice.id);
                    if (typeof data !== 'undefined') {
                        choiceMap.set(id, data);
                        choiceMap.delete(appChoice.id);
                        appChoice.id = id;
                    }
                }
            }
        }
    }
</script>