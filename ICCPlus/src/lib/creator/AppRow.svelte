<div class="row-{row.id}-bg text-center{!bCreatorMode && !isEnabled ? ' hidden' : ''}" style={rowBody} bind:clientWidth={width}>
    {#if bCreatorMode && (row.isEditModeOn || row.isSimpleEditMode)}
        <Card class="mt-n3">
            <CardContent class="p-0 mb-4">
                {#if app.useChoiceEditBtn && !row.isEditModeOn && row.isSimpleEditMode}
                    <div class="row-edit-button__edit-mode">
                        <IconButton onclickcapture={() => delete row.isSimpleEditMode} size="button"><i class="mdi mdi-wrench"></i></IconButton>
                    </div>
                {/if}
                <div class="toolbar">
                    <div class="spacer"></div>
                    {#each rowToolbarButtons as rowButton}
                        <Wrapper text={rowButton.text}>
                            <IconButton onclickcapture={rowButton.action} oncontextmenu={rowButton.contextAction}><i class={rowButton.icon}></i></IconButton>  
                        </Wrapper>
                    {/each}
                </div>
                <div class="row gy-4 p-4">
                    <div class={col2}>
                        {#if row.isButtonRow}
                            <Button onclickcapture={() => {dlgVariables.currentDialog = 'appButtonSettings'; dlgVariables.row = row;}} variant="raised">
                                <Label>Open Button Settings</Label>
                            </Button>
                        {:else}
                            {#if row.image && !app.hideImages}
                                <button type="button" onclickcapture={() => {dlgVariables.currentDialog = 'appImageUpload'; dlgVariables.data = row; dlgVariables.imgProp = 'image';}} class="btn--image-background">
                                    <img src={row.image} alt="" loading="lazy" class="btn--image" style="max-height:140px;"/>
                                </button>
                            {/if}
                            <Button onclickcapture={() => {dlgVariables.currentDialog = 'appImageUpload'; dlgVariables.data = row; dlgVariables.imgProp = 'image';}} variant="raised">
                                <Label>Change Image</Label>
                            </Button>
                        {/if}
                        
                    </div>
                    <div class={col2}>
                        <div class="d-column">
                            <FormField class="ml-4 mb-3">
                                <Switch bind:checked={row.isButtonRow} onSMUISwitchChange={() => {
                                    if (row.isButtonRow) {
                                        row.image = '';
                                        row.buttonType = true;
                                        row.buttonId = '';
                                        row.buttonText = 'Click';
                                        row.buttonRandom = false;
                                        row.buttonRandomNumber = 1;
                                    } else {
                                        delete row.buttonType;
                                        delete row.buttonId;
                                        delete row.buttonText;                                        
                                        delete row.buttonTypeRadio;
                                        delete row.pointTypeRandom
                                        delete row.btnPointAddon
                                        delete row.randomMin;
                                        delete row.randomMax;
                                        delete row.buttonRandom;
                                        delete row.buttonRandomNumber;
                                        delete row.isWeightedRandom;
                                        delete row.onlyUnselectedChoices;
                                        delete row.onlyIfNoChoices;
                                    }
                                }} color="secondary" class="switch-scale" />
                                {#snippet label()}
                                    Button?
                                {/snippet}
                            </FormField>
                            <FormField class="ml-4 mb-3">
                                <Switch bind:checked={row.isInfoRow} color="secondary" class="switch-scale" />
                                {#snippet label()}
                                    Non-activatable?
                                {/snippet}
                            </FormField>
                            <FormField class="ml-4 mb-3">
                                <Switch bind:checked={row.isResultRow} onSMUISwitchChange={() => {if (row.isResultRow) row.isGroupRow = false}} color="secondary" class="switch-scale" />
                                {#snippet label()}
                                    Selected Choices?
                                {/snippet}
                            </FormField>
                            <FormField class="ml-4 mb-3">
                                <Switch bind:checked={() => row.isGroupRow ?? false, (e) => row.isGroupRow = e} onSMUISwitchChange={() => {if (row.isGroupRow) row.isResultRow = false}} color="secondary" class="switch-scale" />
                                {#snippet label()}
                                    Group Choices?
                                {/snippet}
                            </FormField>
                            <FormField class="ml-4 mb-2">
                                <Switch bind:checked={() => row.width ?? false, (e) => {row.width = e}} color="secondary" class="switch-scale" />
                                {#snippet label()}
                                    Half of the screen?
                                {/snippet}
                            </FormField>
                        </div>
                    </div>
                    <div class={col2}>
                        <div class="d-column">
                            <Select bind:value={row.template} label="Template" variant="filled" alwaysFloat={true}>
                                {#each templates as template (template.text)}
                                    <Option value={template.value}>{template.text}</Option>
                                {/each}
                            </Select>
                            <Textfield bind:value={row.id} label="Row Id" onchange={changeRowId} variant="filled" />
                            <Textfield bind:value={() => row.debugTitle ?? '', (e) => row.debugTitle = e} label="Debug Title" variant="filled" />
                            {#if row.isResultRow || row.isGroupRow}
                                <Autocomplete
                                    options={getGroups()}
                                    getOptionLabel={getGroupLabel}
                                    bind:value={row.resultGroupId}
                                    label="Selected Choices from Group Id"
                                    toggle={true}
                                    showMenuWithNoInput={true}
                                    textfield$variant="filled"
                                    textfield$input$placeholder="All Rows and Choices"
                                />
                            {/if}
                        </div>
                    </div>
                    <div class={col2}>
                        <div class="d-column">
                            <Select bind:value={row.objectWidth} label="Choices Per Row" variant="filled" alwaysFloat={true}>
                                {#each objectWidths as objectWidth (objectWidth.text)}
                                    <Option value={objectWidth.value}>{objectWidth.text}</Option>
                                {/each}
                            </Select>
                            <Select bind:value={row.rowJustify} label="Choices Justify" variant="filled">
                                {#each justifies as justify (justify.value)}
                                    <Option value={justify.value}>{justify.value}</Option>
                                {/each}
                            </Select>
                            <Textfield bind:value={row.allowedChoices} onchange={() => row.allowedChoices = Math.max(row.allowedChoices, 0)} input$min={0} label="Allowed Choices" variant="filled" type="number" />
                            <Textfield bind:value={row.currentChoices} onchange={() => row.currentChoices = Math.max(row.currentChoices, 0)} input$min={0} label="Selected Choices" variant="filled" type="number" />
                        </div>
                    </div>
                    <div class={col4}>
                        <div class="d-column">
                            <FormField class="ml-4 mb-3">
                                <Switch bind:checked={() => row.deselectChoices ?? false, (e) => {row.deselectChoices = e}} color="secondary" class="switch-scale" />
                                {#snippet label()}
                                    Deselect choices if row doesn't meet requirements
                                {/snippet}
                            </FormField>
                            {#if row.isResultRow || row.isGroupRow}
                                <FormField class="ml-4 mb-3">
                                    <Switch bind:checked={() => row.choicesShareTemplate ?? false, (e) => {row.choicesShareTemplate = e}} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Use 'Image Top' template for all choices
                                    {/snippet}
                                </FormField>
                                <FormField class="ml-4 mb-3">
                                    <Switch bind:checked={() => row.textIsRemoved ?? false, (e) => row.textIsRemoved = e} onSMUISwitchChange={() => {
                                        if (!row.textIsRemoved) {
                                            delete row.objectTitleRemoved;
                                            delete row.objectImageRemoved;
                                            delete row.objectTextRemoved;
                                            delete row.objectScoreRemoved;
                                            delete row.objectRequirementRemoved;
                                            delete row.addonTitleRemoved;
                                            delete row.addonImageRemoved;
                                            delete row.addonTextRemoved;
                                            delete row.textIsRemoved;
                                        }
                                    }} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Hide the contents of choices
                                    {/snippet}
                                </FormField>
                                <FormField class="ml-4 mb-3">
                                    <Switch bind:checked={() => row.resultShowRowTitle ?? false, (e) => {row.resultShowRowTitle = e}} color="secondary" class="switch-scale" />
                                    {#snippet label()}
                                        Show the title of the row in the choice
                                    {/snippet}
                                </FormField>
                            {/if}
                        </div>
                    </div>
                </div>
                {#if (row.isResultRow || row.isGroupRow) && row.textIsRemoved}
                    <div class="row px-4">
                        <div class={col3}>
                            <FormField class="ml-4 mb-2">
                                <Switch bind:checked={() => row.objectTitleRemoved ?? false, (e) => {row.objectTitleRemoved = e}} color="secondary" class="switch-scale" />
                                {#snippet label()}
                                    Hide the title of choices
                                {/snippet}
                            </FormField>
                        </div>
                        <div class={col3}>
                            <FormField class="ml-4 mb-2">
                                <Switch bind:checked={() => row.objectImageRemoved ?? false, (e) => {row.objectImageRemoved = e}} color="secondary" class="switch-scale" />
                                {#snippet label()}
                                    Hide the image of choices
                                {/snippet}
                            </FormField>
                        </div>
                        <div class={col3}>
                            <FormField class="ml-4 mb-2">
                                <Switch bind:checked={() => row.objectTextRemoved ?? false, (e) => {row.objectTextRemoved = e}} color="secondary" class="switch-scale" />
                                {#snippet label()}
                                    Hide the text of choices
                                {/snippet}
                            </FormField>
                        </div>
                        <div class={col3}>
                            <FormField class="ml-4 mb-2">
                                <Switch bind:checked={() => row.objectScoreRemoved ?? false, (e) => {row.objectScoreRemoved = e}} color="secondary" class="switch-scale" />
                                {#snippet label()}
                                    Hide the scores of choices
                                {/snippet}
                            </FormField>
                        </div>
                        <div class={col3}>
                            <FormField class="ml-4 mb-2">
                                <Switch bind:checked={() => row.objectRequirementRemoved ?? false, (e) => {row.objectRequirementRemoved = e}} color="secondary" class="switch-scale" />
                                {#snippet label()}
                                    Hide the requirements of choices
                                {/snippet}
                            </FormField>
                        </div>
                        <div class={col3}>
                            <FormField class="ml-4 mb-2">
                                <Switch bind:checked={() => row.addonTitleRemoved ?? false, (e) => {row.addonTitleRemoved = e}} color="secondary" class="switch-scale" />
                                {#snippet label()}
                                    Hide the title of addons
                                {/snippet}
                            </FormField>
                        </div>
                        <div class={col3}>
                            <FormField class="ml-4 mb-2">
                                <Switch bind:checked={() => row.addonImageRemoved ?? false, (e) => {row.addonImageRemoved = e}} color="secondary" class="switch-scale" />
                                {#snippet label()}
                                    Hide the image of addons
                                {/snippet}
                            </FormField>
                        </div>
                        <div class={col3}>
                            <FormField class="ml-4 mb-2">
                                <Switch bind:checked={() => row.addonTextRemoved ?? false, (e) => {row.addonTextRemoved = e}} color="secondary" class="switch-scale" />
                                {#snippet label()}
                                    Hide the text of addons
                                {/snippet}
                            </FormField>
                        </div>
                    </div>
                {/if}
                <div class="row gx-0">
                    {#each row.requireds as required, i}
                        <div class="col p-2">
                            <ObjectRequired isEditModeOn={true} required={required} data={row} index={i} />
                            <div class="col-12 pt-1">
                                <Button onclickcapture={() => row.requireds.splice(i, 1)} variant="raised">
                                    <Label>Delete</Label>
                                </Button>
                            </div>
                        </div>
                    {/each}
                </div>
                <div class="row px-4 pt-3">
                    <div class="col-12">
                        {#if app.useTextEditor}
                            <Tiptap data={row} dataProp="title" label="Row Title" />
                        {:else}
                            <Textfield bind:value={row.title} label="Row Title" variant="filled" />
                        {/if}
                    </div>
                </div>
                <div class="row px-4 py-2">
                    <div class="col-12">
                        {#if app.useTextEditor}
                            <Tiptap data={row} dataProp="titleText" textarea={true} label="Row Text" rows={8} />
                        {:else}
                            <Textfield textarea bind:value={row.titleText} label="Row Text" variant="filled" input$rows={8} />
                        {/if}
                    </div>
                </div>
            </CardContent>
        </Card>
    {:else if isEnabled}
        <div class="row gx-0 row-{row.id} row-{row.id}-header" class:row-edit-button__wrapper={app.useChoiceEditBtn && bCreatorMode} style={row.title !== '' ? rowBackground : ''}>
            {#if app.useChoiceEditBtn && bCreatorMode}
                <div class="row-edit-button" style="width: auto;">
                    <IconButton onclickcapture={() => row.isSimpleEditMode = true} size="button"><i class="mdi mdi-wrench"></i></IconButton>
                </div>
            {/if}
            {#if row.template >= 4 || row.template === 1 || windowWidth <= 1280}
                <div class="col-12 m-0 p-0">
                    {#if (row.template === 1 || windowWidth <= 1280)}
                        {#if row.isButtonRow}
                            <Button class="row-button" onclickcapture={buttonActivate} disabled={!row.buttonType && (typeof row.buttonId !== 'undefined' && activatedMap.has(row.buttonId)) || isButtonPressable} style={rowButton} variant="raised" >
                                <Label>{@html typeof row.buttonText !== 'undefined' ? row.buttonText : 'Click'}</Label>
                            </Button>
                        {:else if row.image}
                            {#if row.imageSourceTooltip}
                                <Wrapper innerClass="w-100" text={row.imageSourceTooltip}>
                                    <img src={row.image} style={rowImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                                </Wrapper>
                            {:else}
                                <img src={row.image} style={rowImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {/if}
                        {/if}
                    {/if}
                    {#if row.title !== ''}
                        <h2 class="mb-0" style={rowTitle}>{@html DOMPurify.sanitize(replaceText(row.title), sanitizeArg)}</h2>
                    {/if}
                    {#if row.template === 5 && windowWidth > 1280}
                        {#if row.isButtonRow}
                            <Button class="row-button" onclickcapture={buttonActivate} disabled={!row.buttonType && (typeof row.buttonId !== 'undefined' && activatedMap.has(row.buttonId)) || isButtonPressable} style={rowButton} variant="raised" >
                                <Label>{@html typeof row.buttonText !== 'undefined' ? row.buttonText : 'Click'}</Label>
                            </Button>
                        {:else if row.image}
                            {#if row.imageSourceTooltip}
                                <img use:tooltip={row.imageSourceTooltip} oncontextmenu={copyTooltip} src={row.image} style={rowImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {:else}
                                <img src={row.image} style={rowImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {/if}
                        {/if}
                    {/if}
                    {#if row.titleText !== ''}
                        <p class="mb-0" style={rowText}>
                            {@html DOMPurify.sanitize(replaceText(row.titleText), sanitizeArg)}
                        </p>
                    {/if}
                    {#if row.template === 4 && windowWidth > 1280}
                        {#if row.isButtonRow}
                            <Button class="row-button" onclickcapture={buttonActivate} disabled={!row.buttonType && (typeof row.buttonId !== 'undefined' && activatedMap.has(row.buttonId)) || isButtonPressable} style={rowButton} variant="raised" >
                                <Label>{@html typeof row.buttonText !== 'undefined' ? row.buttonText : 'Click'}</Label>
                            </Button>
                        {:else if row.image}
                            {#if row.imageSourceTooltip}
                                <img use:tooltip={row.imageSourceTooltip} oncontextmenu={copyTooltip} src={row.image} style={rowImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {:else}
                                <img src={row.image} style={rowImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {/if}
                        {/if}
                    {/if}
                </div>
            {:else}
                {#if row.template === 2}
                    <div class="col p-0 text-center" style="max-width: {100 - rowImageBoxWidth}%">
                        {#if row.title !== ''}
                            <h2 class="mb-0" style={rowTitle}>{@html DOMPurify.sanitize(replaceText(row.title), sanitizeArg)}</h2>
                        {/if}
                        {#if row.titleText !== ''}
                            <p class="mb-0" style={rowText}>
                                {@html DOMPurify.sanitize(replaceText(row.titleText), sanitizeArg)}
                            </p>
                        {/if}
                    </div>
                    <div class="col p-0 text-center" style="max-width: {rowImageBoxWidth}%">
                        {#if row.isButtonRow}
                            <Button class="row-button" onclickcapture={buttonActivate} disabled={!row.buttonType && (typeof row.buttonId !== 'undefined' && activatedMap.has(row.buttonId)) || isButtonPressable} style={rowButton} variant="raised" >
                                <Label>{@html typeof row.buttonText !== 'undefined' ? row.buttonText : 'Click'}</Label>
                            </Button>
                        {:else if row.image}
                            {#if row.imageSourceTooltip}
                                <img use:tooltip={row.imageSourceTooltip} oncontextmenu={copyTooltip} src={row.image} style={rowImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {:else}
                                <img src={row.image} style={rowImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {/if}
                        {/if}
                    </div>
                {:else if row.template === 3}
                    <div class="col p-0 text-center" style="max-width: {rowImageBoxWidth}%">
                        {#if row.isButtonRow}
                            <Button class="row-button" onclickcapture={buttonActivate} disabled={!row.buttonType && (typeof row.buttonId !== 'undefined' && activatedMap.has(row.buttonId)) || isButtonPressable} style={rowButton} variant="raised" >
                                <Label>{@html typeof row.buttonText !== 'undefined' ? row.buttonText : 'Click'}</Label>
                            </Button>
                        {:else if row.image}
                            {#if row.imageSourceTooltip}
                                <img use:tooltip={row.imageSourceTooltip} oncontextmenu={copyTooltip} src={row.image} style={rowImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {:else}
                                <img src={row.image} style={rowImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {/if}
                        {/if}
                    </div>
                    <div class="col p-0 text-center" style="max-width: {100 - rowImageBoxWidth}%">
                        {#if row.title !== ''}
                            <h2 class="mb-0" style={rowTitle}>{@html DOMPurify.sanitize(replaceText(row.title), sanitizeArg)}</h2>
                        {/if}
                        {#if row.titleText !== ''}
                            <p class="mb-0" style={rowText}>
                                {@html DOMPurify.sanitize(replaceText(row.titleText), sanitizeArg)}
                            </p>
                        {/if}
                    </div>
                {/if}
            {/if}
        </div>
    {/if}
    {#if (bCreatorMode && row.isEditModeOn) || isEnabled}
        <div class="row gx-0 m-0 p-0 {rowJustify}">
            {#if row.isResultRow}
                {#each resultRow as val, i}
                    <AppObject bind:this={choiceRef} row={row} choice={val.choice} index={i} windowWidth={windowWidth} bCreatorMode={bCreatorMode} preloadImages={preloadImages} />
                {/each}
            {:else if row.isGroupRow}
                {#each groupRow as val, i}
                    <AppObject bind:this={choiceRef} row={row} choice={val.choice} index={i} windowWidth={windowWidth} bCreatorMode={bCreatorMode} preloadImages={preloadImages} isBackpack={isBackpack} mainDiv={mainDiv} />
                {/each}
            {:else}
                {#each row.objects as choice, i}
                    <AppObject bind:this={choiceRef} row={row} choice={choice} index={i} windowWidth={windowWidth} bCreatorMode={bCreatorMode} preloadImages={preloadImages} isBackpack={isBackpack} mainDiv={mainDiv} />
                {/each}
            {/if}
            {#if (bCreatorMode && row.isEditModeOn && !row.isResultRow && !row.isGroupRow)}
                <div class="p-2 {objectWidthClass()}">
                    <Wrapper text="L: Create New Single Choice<br>R: Paste Choice">
                        <button type="button" class="create-box col-12" style="min-height: 651px; font-size: 40px;" onclickcapture={createNewObject} oncontextmenu={(e: MouseEvent) => {
                            e.preventDefault();
                            pasteObject(row, -1);
                            (e.currentTarget as HTMLElement)?.blur();
                        }} aria-label="Create New Choice">
                            <i class="mdi mdi-plus-thick"></i>
                        </button>
                    </Wrapper>
                </div>
            {/if}
        </div>
    {/if}
</div>
<script lang="ts">
    import AppObject from './AppObject.svelte';
    import Autocomplete from '$lib/custom/autocomplete';
    import Button, { Label } from '@smui/button';
    import Card, { Content as CardContent } from '@smui/card';
    import DOMPurify from 'dompurify';
    import FormField from '@smui/form-field';
    import ObjectRequired from './Object/ObjectRequired.svelte';
    import Select, { Option } from '$lib/custom/select';
    import Switch from '@smui/switch';
	import IconButton from '@smui/icon-button';
    import Textfield from '$lib/custom/textfield';
    import { Wrapper } from '$lib/custom/tooltip';
    import { app, checkDupId, groupMap, getStyling, objectWidths, rowMap, checkRequirements, pointTypeMap, rowDesignMap, sanitizeArg, checkActivated, globalReqMap, replaceText, choiceMap, objectWidthToNum, generateObjectId, activatedMap, dlgVariables, variableMap, getGroups, winWidth, getGroupLabel, hexToRgba, pasteObject, snackbarVariables, menuVariables, clearClipboard, removeAnchor, exportData } from '$lib/store/store.svelte';
    import type { Requireds, Row } from '$lib/store/types';
    import { tooltip } from '$lib/custom/tooltip/store.svelte';
    import { tick } from 'svelte';
    import Tiptap from '$lib/store/Tiptap.svelte';

    const { row, bCreatorMode, windowWidth, preloadImages = false, isBackpack = false, mainDiv }: { row: Row, bCreatorMode: boolean, windowWidth: number, preloadImages?: boolean; isBackpack?: boolean, mainDiv?: HTMLDivElement } = $props();
    const rowToolbarButtons = [{
        action: () => { createNewObject() },
        contextAction: (e: MouseEvent) => { e.preventDefault(); pasteObject(row, -1); (e.currentTarget as HTMLElement)?.blur(); },
        text: 'L: Create New Single Choice<br>R: Paste Choice',
        icon: 'mdi mdi-file-plus'
    }, {
        action: () => { dlgVariables.currentDialog = 'appCreateMultipleChoices'; dlgVariables.func = createNewObjects },
        text: 'Create New Multiple Choices',
        icon: 'mdi mdi-file-multiple'
    }, {
        action: () => { dlgVariables.currentDialog = 'appObjectList'; dlgVariables.row = row },
        text: 'List of Choices',
        icon: 'mdi mdi-format-list-bulleted'
    }, {
        action: () => { dlgVariables.currentDialog = 'appRequirement'; dlgVariables.data = row },
        contextAction: (e: MouseEvent) => { reqContext(e) },
        text: 'L: Create Requirement<br>R: Context Menu',
        icon: 'mdi mdi-key-plus'
    }, {
        action: () => { dlgVariables.currentDialog = 'appRowSettings'; dlgVariables.row = row },
        text: 'Open Row Settings',
        icon: 'mdi mdi-cog'
    }];
    const templates = [{
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
    let choiceRef = $state<any>();
    let reqData = $state<Row | Requireds>();
    let backgroundStyle = $derived(getStyling('privateBackgroundIsOn', row));
    let rowImageStyle = $derived(getStyling('privateRowImageIsOn', row));
    let rowStyle = $derived(getStyling('privateRowIsOn', row));
    let textStyle = $derived(getStyling('privateTextIsOn', row));
    let width = $state(0);
    let rowId = row.id;
    let rowImageBoxWidth = $derived(typeof rowImageStyle.rowImageBoxWidth !== 'undefined' ? rowImageStyle.rowImageBoxWidth : 50);
    let isEnabled = $derived(checkRequirements(row.requireds));
    let col2 = $derived.by(() => {
        if (width > 1264) return 'col-2';
        else if (width > 960) return 'col-3';
        else if (width > 600) return 'col-4';
        else if (width > 470) return 'col-6';
        else return 'col-12';
    });
    let col3 = $derived.by(() => {
        if (width > 1264) return 'col-3';
        else if (width > 600) return 'col-6';
        else return 'col-12';
    });
    let col4 = $derived.by(() => {
        if (width > 1264) return 'col-4';
        else if (width > 960) return 'col-12';
        else if (width > 600) return 'col-8';
        else return 'col-12';
    });
    let isButtonPressable = $derived(row.onlyIfNoChoices && row.currentChoices !== 0);
    let rowJustify = $derived(row.rowJustify ? `justify-${row.rowJustify}` : '');

    let resultRow = $derived.by(() => {
        const result = [];
        if (typeof row.resultGroupId === 'undefined' || row.resultGroupId === '' || !row.resultGroupId) {
            for (const [key] of activatedMap) {
                const cMap = choiceMap.get(key);

                if (typeof cMap !== 'undefined') {
                    const aChoice = cMap.choice;
                    const aRow = cMap.row;

                    if (!aChoice.isNotResult) {
                        result.push({choice: aChoice, row: aRow});
                    }
                }
            }
        } else {
            for (const [key] of activatedMap) {
                const cMap = choiceMap.get(key);

                if (typeof cMap !== 'undefined') {
                    const aChoice = cMap.choice;
                    const aRow = cMap.row;

                    if (!aChoice.isNotResult) {
                        if (row.resultGroupId === aRow.resultGroupId) {
                            result.push({choice: aChoice, row: aRow});
                        } else {
                            if (typeof aChoice.groups !== 'undefined') {
                                for (let i = 0; i < aChoice.groups.length; i++) {
                                    if (aChoice.groups[i] === row.resultGroupId) {
                                        result.push({choice: aChoice, row: aRow});
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        result.sort((a, b) => {
            if (a.row.index !== b.row.index) return a.row.index - b.row.index;
            return a.choice.index - b.choice.index;
        });

        return result;
    });

    let groupRow = $derived.by(() => {
        const result = [];
        if (typeof row.resultGroupId !== 'undefined') {
            const group = groupMap.get(row.resultGroupId);

            if (typeof group !== 'undefined') {
                for (let i = 0; i < group.elements.length; i++) {
                    const cMap = choiceMap.get(group.elements[i]);
                    
                    if (typeof cMap !== 'undefined') {
                        result.push({choice: cMap.choice, row: cMap.row});
                    }
                }
            }
        }

        result.sort((a, b) => {
            if (a.row.index !== b.row.index) return a.row.index - b.row.index;
            return a.choice.index - b.choice.index;
        });

        return result;
    });

    let rowBodyBgImage = $derived.by(() => {
        if (typeof row.styling !== 'undefined' && row.isPrivateStyling && row.privateBackgroundIsOn && row.styling.backgroundImage) return row.styling;
        if (typeof app.rowDesignGroups !== 'undefined' && row.rowDesignGroups) {
            for (let i = 0; i < row.rowDesignGroups.length; i++) {
                let rowDesignGroup = rowDesignMap.get(row.rowDesignGroups[i]);
                if (typeof rowDesignGroup !== 'undefined') {
                    if (rowDesignGroup.privateBackgroundIsOn && rowDesignGroup.styling.backgroundImage) {
                        let id = rowDesignGroup.activatedId;
                        let globalReq = globalReqMap.get(id);
                        if (id === '' || checkActivated(rowDesignGroup.activatedId)) {
                            return rowDesignGroup.styling;
                        } else if (typeof app.globalRequirements !== 'undefined' && typeof globalReq !== 'undefined') {
                            if (checkRequirements(globalReq.requireds)) return rowDesignGroup.styling;
                        }
                    }
                }
            }
        }
        return false;
    });

    let rowBodyBgColor = $derived.by(() => {
        if (typeof row.styling !== 'undefined' && row.isPrivateStyling && row.privateBackgroundIsOn && row.styling.bgColorIsOn && row.styling.backgroundColor) return row.styling;
        if (typeof app.rowDesignGroups !== 'undefined' && row.rowDesignGroups) {
            for (let i = 0; i < row.rowDesignGroups.length; i++) {
                let rowDesignGroup = rowDesignMap.get(row.rowDesignGroups[i]);
                if (typeof rowDesignGroup !== 'undefined') {
                    if (rowDesignGroup.privateBackgroundIsOn && rowDesignGroup.styling.bgColorIsOn && rowDesignGroup.styling.backgroundColor) {
                        let id = rowDesignGroup.activatedId;
                        let globalReq = globalReqMap.get(id);
                        if (id === '' || checkActivated(rowDesignGroup.activatedId)) {
                            return rowDesignGroup.styling;
                        } else if (typeof app.globalRequirements !== 'undefined' && typeof globalReq !== 'undefined') {
                            if (checkRequirements(globalReq.requireds)) return rowDesignGroup.styling;
                        }
                    }
                }
            }
        }
        return false;
    });

    let rowBody = $derived.by(() => {
        let styles: string[] = [];

        if (bCreatorMode && row.isEditModeOn) {
            styles.push(`margin: 1%;`);
        } else {
            styles.push(`margin: ${rowStyle.rowBodyMarginTop}px ${rowStyle.rowBodyMarginSides}% ${rowStyle.rowBodyMarginBottom}px ${rowStyle.rowBodyMarginSides}%;`);
        }
        if (rowBodyBgImage) {
            styles.push(`background-image: url('${rowBodyBgImage.backgroundImage}'); ${rowBodyBgImage.isBackgroundRepeat ? 'background-repeat: repeat;' : (rowBodyBgImage.isBackgroundFitIn ? 'background-size: 100% 100%;' : 'background-size: cover;')}`);
        }
        if (rowBodyBgColor) {
            styles.push(`background-color: ${hexToRgba(rowBodyBgColor.backgroundColor)};`);
        }
        return styles.join(' ');
    });

    let rowBackground = $derived.by(() => {
        let suffix = rowStyle.rowBorderRadiusIsPixels ? 'px' : '%';
        let styles: string[] = [];

        if (rowStyle.rowBorderImage) {
            styles.push(`border-image: url('${rowStyle.rowBorderImage}') ${rowStyle.rowBorderImageSliceTop} ${rowStyle.rowBorderImageSliceRight} ${rowStyle.rowBorderImageSliceBottom} ${rowStyle.rowBorderImageSliceLeft} / ${rowStyle.rowBorderImageWidth}px ${rowStyle.rowBorderImageRepeat}; border-style: solid; padding: ${rowStyle.rowBorderImageWidth}px;`);
        }
        if (backgroundStyle.rowBackgroundImage) {
            styles.push(`background-image: url('${backgroundStyle.rowBackgroundImage}'); ${backgroundStyle.isRowBackgroundRepeat? 'background-repeat: repeat;' : (backgroundStyle.isRowBackgroundFitIn ? 'background-size: 100% 100%;' : 'background-size: cover;')}`);
        }
        if (backgroundStyle.rowBgColorIsOn) {
            styles.push(`background-color: ${hexToRgba(backgroundStyle.rowBgColor)};`);
        }
        styles.push(`margin-left: ${rowStyle.rowMargin}%; margin-right: ${rowStyle.rowMargin}%;`);        
        if (rowStyle.rowGradientIsOn) {
            styles.push(`background-image: linear-gradient(${rowStyle.rowGradient});`);
        }
        styles.push(`border-radius: ${rowStyle.rowBorderRadiusTopLeft}${suffix} ${rowStyle.rowBorderRadiusTopRight}${suffix} ${rowStyle.rowBorderRadiusBottomRight}${suffix} ${rowStyle.rowBorderRadiusBottomLeft}${suffix};`);
        if (rowStyle.rowOverflowIsOn) {
            styles.push(`overflow: hidden;`);
        }
        if (rowStyle.rowBorderIsOn) {
            styles.push(`border: ${rowStyle.rowBorderWidth}px ${rowStyle.rowBorderStyle} ${hexToRgba(rowStyle.rowBorderColor)};`);
        }
        if (rowStyle.rowDropShadowIsOn) {
            if (rowStyle.rowUseBoxShadowIsOn) {
                styles.push(`box-shadow: ${rowStyle.rowDropShadowH}px ${rowStyle.rowDropShadowV}px ${rowStyle.rowDropShadowBlur}px ${hexToRgba(rowStyle.rowDropShadowColor)};`);
            } else {
                styles.push(`filter: drop-shadow(${rowStyle.rowDropShadowH}px ${rowStyle.rowDropShadowV}px ${rowStyle.rowDropShadowBlur}px ${hexToRgba(rowStyle.rowDropShadowColor)});`);
            }
        }

        return styles.join(' ');
    });

    let rowTitle = $derived.by(() => {
        return `white-space: pre-line; font-family: '${textStyle.rowTitle}'; font-size: ${textStyle.rowTitleTextSize}%; text-align: ${textStyle.rowTitleAlign}; color: ${hexToRgba(textStyle.rowTitleColor)}`;
    });

    let rowText = $derived.by(() => {
        return `white-space: pre-wrap; font-family: '${textStyle.rowText}'; font-size: ${textStyle.rowTextTextSize}%; text-align: ${textStyle.rowTextAlign}; color: ${hexToRgba(textStyle.rowTextColor)}; padding: ${rowStyle.rowTextPaddingX}px ${rowStyle.rowTextPaddingY}% ${rowStyle.rowTextPaddingX}px ${rowStyle.rowTextPaddingY}%;`;
    });

    let rowImage = $derived.by(() => {
        let suffix = rowImageStyle.rowImgBorderRadiusIsPixels ? 'px' : '%';
        let styles: string[] = [];
        
        styles.push(`width: ${rowImageStyle.rowImageWidth}%; margin-top: ${rowImageStyle.rowImageMarginTop}%; margin-bottom: ${rowImageStyle.rowImageMarginBottom}%;`);
        styles.push(`border-radius: ${rowImageStyle.rowImgBorderRadiusTopLeft}${suffix} ${rowImageStyle.rowImgBorderRadiusTopRight}${suffix} ${rowImageStyle.rowImgBorderRadiusBottomRight}${suffix} ${rowImageStyle.rowImgBorderRadiusBottomLeft}${suffix};`);
        if (rowImageStyle.rowImgOverflowIsOn) {
            styles.push(`overflow: hidden;`);
        }
        if (rowImageStyle.rowImgBorderIsOn) {
            styles.push(`border: ${rowImageStyle.rowImgBorderWidth}px ${rowImageStyle.rowImgBorderStyle} ${hexToRgba(rowImageStyle.rowImgBorderColor)};`);
        }
        
        return styles.join(' ');
    });

    let rowButton = $derived(`padding-left: ${rowStyle.rowButtonYPadding}px; padding-right: ${rowStyle.rowButtonYPadding}px; padding-top: ${rowStyle.rowButtonXPadding}px; padding-bottom: ${rowStyle.rowButtonXPadding}px;`);

    $effect(() => {
        if (row.deselectChoices && !isEnabled) {
            for (let i = 0; i < row.objects.length; i++) {
                const choice = row.objects[i];

                if (choice.isActive) {
                    choiceRef.activateObject(choice, row);
                }
            }
        }
    });
    
    function changeRowId() {
        if (row.id === '') {
            row.id = rowId
        } else {
            if (row.id !== rowId) {
                row.id = checkDupId(row.id, rowMap);
                if (row.groups) {
                    for (let i = 0; i < row.groups.length; i++) {
                        let group = groupMap.get(row.groups[i]);
                        if (typeof group !== 'undefined') {
                            let elementIndex = group.rowElements.indexOf(rowId);
                            if (elementIndex !== -1) group.rowElements[elementIndex] = row.id;
                        }
                    }
                }
                if (row.rowDesignGroups) {
                    for (let i = 0; i < row.rowDesignGroups.length; i++) {
                        let dGroup = rowDesignMap.get(row.rowDesignGroups[i]);
                        if (typeof dGroup !== 'undefined') {
                            let elementIndex = dGroup.elements.indexOf(rowId);
                            if (elementIndex !== -1) dGroup.elements[elementIndex] = row.id;
                        }
                    }
                }
                rowMap.set(row.id, row);
                rowMap.delete(rowId);
                rowId = row.id;
            }
        }
    }

    function createNewObject() {
        let id = generateObjectId(0, app.objectIdLength);
        let idx = row.objects.length;
        row.objects.push({
            index: idx,
            id: id,
            title: app.defaultChoiceTitle,
            text: app.defaultChoiceText,
            debugTitle: '',
            image: '',
            template: 1,
            objectWidth: '',
            isActive: !1,
            isVisible: !0,
            multipleUseVariable: 0,
            initMultipleTimesMinus: 0,
            selectedThisManyTimesProp: 0,
            requireds: [],
            addons: [],
            scores: [],
            groups: [],
            objectDesignGroups: []
        });
        if (typeof row.groups !== 'undefined' && row.groups.length > 0) {
            for (let i = 0; i < row.groups.length; i++) {
                const group = groupMap.get(row.groups[i]);
                if (typeof group !== 'undefined') {
                    row.objects[idx].groups.push(group.id);
                    let elementIndex = group.elements.indexOf(id);
                    if (elementIndex === -1) group.elements.push(id);
                }
            }
        }
        choiceMap.set(id, {choice: row.objects[idx], row: row});
    }

    function createNewObjects(num: number) {
        for(let i = 0; i < num; i++) {
            createNewObject();
        }
    }

    function reqContext(e: MouseEvent) {
        const target = e.currentTarget as HTMLElement;
        e.preventDefault();
        target.blur();
        if (menuVariables.isOpen) {
            menuVariables.isOpen = false;
            removeAnchor();
        }
        menuVariables.anchor = target.parentElement;
        menuVariables.copy = () => copyRequireds();
        menuVariables.paste = () => pasteRequired();
        menuVariables.clear = () => clearClipboard(2);
        menuVariables.export = () => exportData(row.requireds, 'req');
        menuVariables.parent = row;
        menuVariables.importType = 'req';
        tick().then(() => {
            menuVariables.isOpen = true;
        });
    }

    function copyRequireds() {
        if (row.requireds.length > 0) {
            if (typeof app.tmpRequired === 'undefined') app.tmpRequired = [];
            app.tmpRequired.length = 0;
            for (let i = 0; i < row.requireds.length; i++) {
                const required = JSON.parse(JSON.stringify(row.requireds[i]));
                app.tmpRequired.push(required);
            }
            snackbarVariables.labelText = 'Copied to clipboard.';
            snackbarVariables.isOpen = true;
        } else {
            snackbarVariables.labelText = 'Nothing to copy.';
            snackbarVariables.isOpen = true;
        }
    }

    function pasteRequired() {
        if (typeof app.tmpRequired === 'undefined' || app.tmpRequired.length === 0) {
            snackbarVariables.labelText = 'The clipboard is empty.';
            snackbarVariables.isOpen = true;
        } else {
            for (var i = 0; i < app.tmpRequired.length; i++) {
                const tmpRequired = JSON.parse(JSON.stringify(app.tmpRequired[i]));
                row.requireds.push(tmpRequired);
            }
        }
    }

    function objectWidthClass() {
        let objectWidth = row.objectWidth;
        let objectWidthNum = objectWidthToNum(objectWidth);
        let objectsPerRowNum = app.objectsPerRow === 'col-6' ? 2 : app.objectsPerRow === 'col-4' ? 3 : 4;
        if ($winWidth > 1280) {
            return objectWidth;
        } else if ($winWidth > 720) {
            switch(objectWidthNum) {
                case 1: return 'col-12';
                case 2: return 'col-6';
                case 3: return objectsPerRowNum > 2 ? 'col-4' : app.objectsPerRow;
                case 4: return objectsPerRowNum > 3 ? 'col-3' : app.objectsPerRow;
                default: return app.objectsPerRow;
            }
        } else if ($winWidth > 480) {
            return objectWidthNum === 1 ? 'col-12' : 'col-6';
        } else {
            return 'col-12';
        }
    }

    function buttonActivate() {
        if (row.btnPointAddon && row.buttonTypeRadio === 'sumaddon' && typeof row.pointTypeRandom !== 'undefined') {
            const rndMax = row.randomMax || 0;
            const rndMin = row.randomMin || 0;
            const rnd = Math.floor(Math.random() * (rndMax - rndMin) + rndMin);
            const point = pointTypeMap.get(row.pointTypeRandom);

            if (typeof point !== 'undefined') {
                if (point.belowZeroNotAllowed && point.startingSum + rnd < 0) {
                    return;
                }
                point.startingSum += rnd;
            }
            return;
        }

        if (row.buttonRandom) {
            const selectedIndexes: number[] = [];
            const validChoices = row.objects.filter(choice => checkRequirements(choice.requireds) && (!choice.isNotSelectable || row.allowActivateUnselectable));

            if (row.isWeightedRandom) {
                let totalWeight = 0;

                for (let i = 0; i < validChoices.length; i++) {
                    const vChoice = validChoices[i];
                    const weight = vChoice.randomWeight || 100;

                    totalWeight += weight;
                }

                if (typeof row.buttonRandomNumber !== 'undefined') {
                    for (let i = 0; i < row.buttonRandomNumber; i++) {
                        const rnd = Math.floor(Math.random() * totalWeight);
                        let runningTotal = 0;

                        for (let j = 0; j < validChoices.length; j++) {
                            const vChoice = validChoices[j];
                            const weight = vChoice.randomWeight || 100;

                            runningTotal += weight;

                            if (rnd < runningTotal) {
                                choiceRef.activateObject(vChoice, row);
                                break;
                            }
                        }
                    }
                }
            } else {
                if (typeof row.buttonRandomNumber !== 'undefined') {
                    for (let i = 0; i < row.buttonRandomNumber; i++) {
                        let retries = 0;
                        let maxRetries = 100;
                        let choice;
                        let index;

                        do {
                            index = Math.floor(Math.random() * validChoices.length);
                            choice = validChoices[index];
                            retries++;
                        } while (
                            (row.onlyUnselectedChoices && (selectedIndexes.indexOf(index) !== -1 || activatedMap.has(choice.id))) &&
                            retries < maxRetries
                        );

                        if (choice && selectedIndexes.indexOf(index) === -1) {
                            selectedIndexes.push(index);
                            choiceRef.activateObject(choice, row);
                        }
                    }
                }
            }
        } else if (typeof row.buttonId !== 'undefined') {
            const variable = variableMap.get(row.buttonId);

            if (typeof variable !== 'undefined') {
                if (activatedMap.has(variable.id)) {
                    if (row.buttonType) {
                        variable.isTrue = false;
                        activatedMap.delete(variable.id);
                    }
                } else {
                    variable.isTrue = true;
                    activatedMap.set(variable.id, {multiple: 0, isVariable: true});
                }
            }
        }
    }

    function copyTooltip(e: Event) {
        e.preventDefault();
        navigator.clipboard.writeText(row.imageSourceTooltip!).then(() => {
            snackbarVariables.labelText = 'Tooltip copied to clipboard.';
            snackbarVariables.isOpen = true;
        }).catch(() => {
            console.log(row.imageSourceTooltip);
            snackbarVariables.labelText = 'Tooltip text logged to developer console.';
            snackbarVariables.isOpen = true;
        });
    }
</script>