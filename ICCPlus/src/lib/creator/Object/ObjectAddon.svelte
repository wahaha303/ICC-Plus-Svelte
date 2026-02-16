{#if isEditModeOn}
    <div bind:clientWidth={width}>
        <div class="d-row justify-space-between overflow-auto title--text">
            <Wrapper text="Move Up">
                <IconButton onclickcapture={moveAddonUp}><i class="mdi mdi-chevron-up"></i></IconButton>
            </Wrapper>
            <div class="d-flex">
                {#if addon.isSelectable}
                    <Wrapper text="Create Score">
                        <IconButton onclickcapture={createNewScore}><i class="mdi mdi-numeric-9-plus-box"></i></IconButton>
                    </Wrapper>
                {/if}
                <Wrapper text="Create Requirement">
                    <IconButton onclickcapture={() => {dlgVariables.data = addon; dlgVariables.currentDialog = 'appRequirement'}}><i class="mdi mdi-key-plus"></i></IconButton>
                </Wrapper>
                <Wrapper text="Copy Addon">
                    <IconButton disabled={addon.isActive} onclickcapture={copyAddon}><i class="mdi mdi-clipboard-outline"></i></IconButton>
                </Wrapper>
            </div>
            <Wrapper text="Move Down">
                <IconButton onclickcapture={moveAddonDown}><i class="mdi mdi-chevron-down"></i></IconButton>
            </Wrapper>
        </div>
        <div class="py-3 px-5 col-12">
            {#if addon.image && !app.hideImages}
                <button type="button" onclickcapture={() => {imgDialog.data = addon; imgDialog.currentDialog = 'appImageUpload'; imgDialog.imgProp = 'image'}} class="btn--image-background">
                    <img src={addon.image} alt="" loading="lazy" class="btn--image" style="max-height: 175px"/>
                </button>
            {/if}
            <Button onclickcapture={() => {imgDialog.data = addon; imgDialog.currentDialog = 'appImageUpload'; imgDialog.imgProp = 'image'}} variant="raised">
                <Label>Change Image</Label>
            </Button>
        </div>
        <div class="row gx-3">
            <FormField class="col-12">
                <Checkbox bind:checked={() => addon.showAddon ?? false, (e) => addon.showAddon = e} onchange={() => {
                    if (!addon.showAddon) {
                        delete addon.showAddon;
                    }
                }} />
                {#snippet label()}
                    Always show this addon
                {/snippet}
            </FormField>
            <FormField class="col-12">
                <Checkbox bind:checked={() => addon.hideAddon ?? false, (e) => addon.hideAddon = e} onchange={() => {
                    if (!addon.hideAddon) {
                        delete addon.hideAddon;
                    }
                }} />
                {#snippet label()}
                    Hide unless this choice is selected
                {/snippet}
            </FormField>
            {#if choice.showScoreInAddon || choice.showReqInAddon}
                <FormField class="col-12">
                    <Checkbox bind:checked={() => addon.skipIndex ?? false, (e) => addon.skipIndex = e} onchange={() => {
                        if (!addon.skipIndex) {
                            delete addon.skipIndex;
                        }
                    }} />
                    {#snippet label()}
                        Skip displaying choice score / requirement
                    {/snippet}
                </FormField>
            {/if}
            <Wrapper text="Selectable Addons are always shown below other Addons.">
                <FormField class="col-12">
                    <Checkbox disabled={addon.isActive} bind:checked={() => addon.isSelectable ?? false, (e) => addon.isSelectable = e} onchange={toggleSelectable} />
                    {#snippet label()}
                        This addon is selectable
                    {/snippet}
                </FormField>
            </Wrapper>
            <div class="col-12">
                <div class="row g-1">
                    {#if addon.isSelectable}
                        <div class="col-12">
                            <Textfield bind:value={addon.id} onfocus={() => addonId = addon.id} onchange={() => changeAddonId()} label="Addon Id" variant="filled" disabled={addon.isActive} />
                        </div>
                    {/if}
                    <div class={col6}>
                        <Select bind:value={addon.template} label="Template" variant="filled" alwaysFloat={true}>
                            {#each templates as template (template.text)}
                                <Option value={template.value}>{template.text}</Option>
                            {/each}
                        </Select>
                    </div>
                    <div class={col6}>
                        <Select bind:value={addon.addonWidth} label="Addons per row" variant="filled">
                            {#each addonWidths as addonWidth (addonWidth.text)}
                                <Option value={addonWidth.value}>{addonWidth.text}</Option>
                            {/each}
                        </Select>
                    </div>
                </div>
                <div class="py-2 col-12">
                    {#if app.useTextEditor}
                        <Tiptap data={addon} dataProp="title" label="Addon Title" />
                    {:else}
                        <Textfield bind:value={addon.title} label="Addon Title" variant="filled" />
                    {/if}
                </div>
                <div class="pb-3 col-12">
                    {#if app.useTextEditor}
                        <Tiptap data={addon} dataProp="text" textarea={true} label="Addon Text" />
                    {:else}
                        <Textfield textarea bind:value={addon.text} label="Addon Text" variant="filled" input$rows={5} />
                    {/if}
                </div>
            </div>
        </div>
        <Accordion>
            {#if addon.isSelectable && addon.scores && addon.scores.length > 0}
                <Panel class="bordered-panel{panelScore ? ' on-top' : ''}" bind:open={panelScore} variant="unelevated" conditionalRender={true}>
                    <Header class="p-0">
                        Scores: {addon.scores.length}
                    </Header>
                    <AcdContent style="overflow:visible">
                        {#if panelScore}
                        <div class="row gy-4">
                            {#each addon.scores as score, i}
                                <div class="col-12 p-0">
                                    <ObjectScore score={score} choice={choice} addon={addon} isEditModeOn={true} num={i} />
                                    <Button onclickcapture={() => {addon.scores!.splice(i, 1); scoreSet.delete(score.idx)}} class="w-100 mt-1" variant="raised" disabled={addon.isActive}>
                                        <Label>Delete</Label>
                                    </Button>
                                </div>
                            {/each}
                        </div>
                        {/if}
                    </AcdContent>
                </Panel>
            {/if}
            {#if addon.requireds.length > 0}
                <Panel class="bordered-panel {panelReq ? 'on-top' : ''}" bind:open={panelReq} variant="unelevated" conditionalRender={true}>
                    <Header class="p-0">
                        Requirements: {addon.requireds.length}
                    </Header>
                    <AcdContent style="overflow:visible">
                        {#if panelReq}
                        <div class="row">
                            {#each addon.requireds as req, i}
                                <div class="{req.requireds.length > 0 ? 'col-12' : reqCol} p-2">
                                    <ObjectRequired required={req} isEditModeOn={true} data={choice} index={i} />
                                    <Button onclickcapture={() => addon.requireds.splice(i, 1)} class="w-100 mt-1" variant="raised" disabled={addon.isActive}>
                                        <Label>Delete</Label>
                                    </Button>
                                </div>
                            {/each}
                        </div>
                        {/if}
                    </AcdContent>
                </Panel>
            {/if}
            {#if addon.isSelectable}
                <Panel class="bordered-panel" variant="unelevated">
                    <Header class="p-0">
                        Functions:
                    </Header>
                    <AcdContent class="p-0">
                        <Accordion class="p-0">
                            <Panel class="bordered-panel" bind:open={panel01} variant="unelevated" conditionalRender={true}>
                                <Header class="p-0">
                                    - This Addon
                                    {#snippet icon()}
                                        <IconButton toggle pressed={panel01} size="mini">
                                            <Icon class="mdi mdi-chevron-up" on></Icon>
                                            <Icon class="mdi mdi-chevron-down"></Icon>
                                        </IconButton>
                                    {/snippet}
                                </Header>
                                <AcdContent style="overflow:visible">
                                    {#if panel01}
                                    <div class="row gy-3">
                                        <FormField class="{addon.isActive ? 'disabled ' : ''}col-12 m-1 p-0">
                                            <Checkbox bind:checked={() => addon.isSelectableMultiple ?? false, (e) => addon.isSelectableMultiple = e} onchange={() => {
                                                if (addon.isSelectableMultiple) {
                                                    addon.numMultipleTimesMinus = 0;
                                                    addon.numMultipleTimesPluss = app.defaultChoiceMaxNum;
                                                    addon.initMultipleTimesMinus = 0;
                                                    addon.isMultipleUseVariable = true;
                                                    addon.multipleUseVariable = 0;
                                                    delete addon.isAutoActive;
                                                    tmpActivatedMap.delete(addon.id);
                                                } else {
                                                    delete addon.isSelectableMultiple;
                                                    delete addon.isMultipleUseVariable;
                                                    delete addon.multipleScoreId;
                                                    delete addon.hideMultipleCounter;
                                                    delete addon.numMultipleTimesMinus;
                                                    delete addon.numMultipleTimesPluss;
                                                    delete addon.initMultipleTimesMinus;
                                                    delete addon.allowSelectByClick;
                                                    delete addon.useSlider;
                                                    delete addon.hideCounter;
                                                    delete addon.multipleUseVariable;
                                                    if (typeof addon.scores !== 'undefined') {
                                                        for (let i = 0; i < addon.scores.length; i++) {
                                                            const score = addon.scores[i];
                                                            delete score.multiplyByTimes;
                                                            delete score.displayMulScore;
                                                        }
                                                    }
                                                }
                                            }} />
                                            {#snippet label()}
                                                Can Be Selected Multiple Times
                                            {/snippet}
                                        </FormField>
                                        {#if addon.isSelectableMultiple}
                                            <Wrapper innerClass="m-0 p-0" text="Disabling this checkbox will make most features unavailable.">
                                                <FormField class="{addon.isActive ? 'disabled ' : ''}col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => addon.isMultipleUseVariable ?? false, (e) => addon.isMultipleUseVariable = e} onchange={() => {
                                                        if (addon.isMultipleUseVariable) {
                                                            delete addon.multipleScoreId;
                                                        } else {
                                                            delete addon.isMultipleUseVariable;
                                                            if (typeof addon.scores !== 'undefined') {
                                                                for (let i = 0; i < addon.scores.length; i++) {
                                                                    const score = addon.scores[i];
                                                                    delete score.multiplyByTimes;
                                                                    delete score.displayMulScore;
                                                                }
                                                            }
                                                        }
                                                    }} />
                                                    {#snippet label()}
                                                        Use a Simple Variable
                                                    {/snippet}
                                                </FormField>
                                            </Wrapper>
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => addon.allowSelectByClick ?? false, (e) => addon.allowSelectByClick = e} onchange={() => {
                                                    if (!addon.allowSelectByClick) delete addon.allowSelectByClick;
                                                }} />
                                                {#snippet label()}
                                                    Allow First Selection by Clicking the Choice
                                                {/snippet}
                                            </FormField>
                                            {#if addon.allowSelectByClick}
                                                <FormField class="col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => addon.hideCounterUntilSelect ?? false, (e) => addon.hideCounterUntilSelect = e} onchange={() => {
                                                        if (!addon.hideCounterUntilSelect) delete addon.hideCounterUntilSelect;
                                                    }} />
                                                    {#snippet label()}
                                                        Hide Counter Until First Selection
                                                    {/snippet}
                                                </FormField>
                                            {/if}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => addon.hideMultipleCounter ?? false, (e) => addon.hideMultipleCounter = e} onchange={() => {
                                                    if (!addon.hideMultipleCounter) delete addon.hideMultipleCounter;
                                                }} />
                                                {#snippet label()}
                                                    Hide Counter if Requirement Is Missing
                                                {/snippet}
                                            </FormField>
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => addon.useSlider ?? false, (e) => addon.useSlider = e} onchange={() => {
                                                    if (!addon.useSlider) {
                                                        delete addon.useSlider;
                                                        delete addon.hideCounter;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Enable Slider for Selection
                                                {/snippet}
                                            </FormField>
                                            {#if addon.useSlider}
                                                <FormField class="col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => addon.hideCounter ?? false, (e) => addon.hideCounter = e} onchange={() => {
                                                        if (!addon.hideCounter) {
                                                            delete addon.hideCounter;
                                                        }
                                                    }} />
                                                    {#snippet label()}
                                                        Hide Counter Completely
                                                    {/snippet}
                                                </FormField>
                                            {/if}
                                            {#if !addon.isMultipleUseVariable}
                                                <div class="col-12 m-1">The point type used here should only be used for this addon.</div>
                                                <div class:disabled={addon.isActive} class="col-12 m-1 px-2">
                                                    <Autocomplete
                                                        options={getPointTypes()}
                                                        getOptionLabel={getPointTypeLabel}
                                                        bind:value={addon.multipleScoreId}
                                                        label="Point Type"
                                                        toggle={true}
                                                        showMenuWithNoInput={true}
                                                        textfield$variant="filled"
                                                        class="w-100 p-0"
                                                    />
                                                </div>
                                            {/if}
                                            <div class:disabled={addon.isActive} class="col-12 m-1 px-2">
                                                <Wrapper text="Some features may not work properly if this value is set below 0.">
                                                    <Textfield bind:value={() => addon.numMultipleTimesMinus ?? 0, (e) => addon.numMultipleTimesMinus = e} onchange={() => addon.initMultipleTimesMinus = addon.numMultipleTimesMinus} label="Number at which the minus stops working" type="number" variant="filled" />
                                                </Wrapper>
                                                <Textfield bind:value={() => addon.numMultipleTimesPluss ?? 0, (e) => addon.numMultipleTimesPluss = e} label="Number at which the plus stops working" type="number" variant="filled" />
                                            </div>
                                            <div class="b-line"></div>
                                        {/if}
                                        <FormField class="col-12 m-1 p-0">
                                            <Checkbox bind:checked={() => addon.isNotSelectable ?? false, (e) => addon.isNotSelectable = e} onchange={() => {
                                                if (!addon.isNotSelectable) delete addon.isNotSelectable;
                                            }} />
                                            {#snippet label()}
                                                Cannot Be Selected Manually
                                            {/snippet}
                                        </FormField>
                                        <FormField class="col-12 m-1 p-0">
                                            <Checkbox bind:checked={() => addon.selectOnce ?? false, (e) => addon.selectOnce = e} onchange={() => {
                                                if (!addon.selectOnce) delete addon.selectOnce;
                                            }} />
                                            {#snippet label()}
                                                Cannot Be Deselected Manually
                                            {/snippet}
                                        </FormField>
                                        <FormField class="col-12 m-1 p-0">
                                            <Checkbox bind:checked={() => addon.notDeselectedByClean ?? false, (e) => addon.notDeselectedByClean = e} onchange={() => {
                                                if (!addon.notDeselectedByClean) {
                                                    delete addon.notDeselectedByClean;
                                                    delete addon.activateAfterReset;
                                                }
                                            }} />
                                            {#snippet label()}
                                                Cannot Be Reset Manually
                                            {/snippet}
                                        </FormField>
                                        <FormField class="col-12 m-1 p-0">
                                            <Checkbox bind:checked={() => addon.isNotResult ?? false, (e) => addon.isNotResult = e} onchange={() => {
                                                if (!addon.isNotResult) delete addon.isNotResult;
                                            }} />
                                            {#snippet label()}
                                                Cannot Be Shown in Result Row
                                            {/snippet}
                                        </FormField>
                                        <FormField class="col-12 m-1 p-0">
                                            <Checkbox bind:checked={() => addon.isNotSearchable ?? false, (e) => addon.isNotSearchable = e} onchange={() => {
                                                if (!addon.isNotSearchable) delete addon.isNotSearchable;
                                            }} />
                                            {#snippet label()}
                                                Cannot Be Searched
                                            {/snippet}
                                        </FormField>
                                        <FormField class="{addon.isActive ? 'disabled ' : ''}col-12 m-1 p-0">
                                            <Checkbox bind:checked={() => addon.isImageUpload ?? false, (e) => addon.isImageUpload = e} onchange={() => {
                                                if (!addon.isImageUpload) delete addon.isImageUpload;
                                            }} />
                                            {#snippet label()}
                                                Allows the Player to Upload Image
                                            {/snippet}
                                        </FormField>
                                        <FormField class="col-12 m-1 p-0">
                                            <Checkbox bind:checked={() => addon.deselectParent ?? false, (e) => addon.deselectParent = e} onchange={() => {
                                                if (!addon.deselectParent) delete addon.deselectParent;
                                            }} />
                                            {#snippet label()}
                                                Will Deselect Parent Choice when Deselected
                                            {/snippet}
                                        </FormField>
                                    </div>
                                    {/if}
                                </AcdContent>
                            </Panel>
                            <Panel class="bordered-panel {panel02 ? 'on-top' : ''}" bind:open={panel02} variant="unelevated" conditionalRender={true}>
                                <Header class="p-0">
                                    - Other Choices
                                    {#snippet icon()}
                                        <IconButton toggle pressed={panel02} size="mini">
                                            <Icon class="mdi mdi-chevron-up" on></Icon>
                                            <Icon class="mdi mdi-chevron-down"></Icon>
                                        </IconButton>
                                    {/snippet}
                                </Header>
                                <AcdContent style="overflow:visible">
                                    {#if panel02}
                                    <div class:disabled={addon.isActive} class="row gy-3">
                                        <FormField class="col-12 m-1 p-0">
                                            <Checkbox bind:checked={() => addon.cleanACtivatedOnSelect ?? false, (e) => addon.cleanACtivatedOnSelect = e} onchange={() => {
                                                if (!addon.cleanACtivatedOnSelect) delete addon.cleanACtivatedOnSelect;
                                            }} />
                                            {#snippet label()}
                                                Clear All Selected Choices
                                            {/snippet}
                                        </FormField>
                                        <FormField class="col-12 m-1 p-0">
                                            <Checkbox bind:checked={() => addon.activateOtherChoice ?? false, (e) => addon.activateOtherChoice = e} onchange={() => {
                                                if (!addon.activateOtherChoice) {
                                                    delete addon.activateOtherChoice;
                                                    delete addon.isNotDeactivate;
                                                    delete addon.isAllowDeselect;
                                                    delete addon.isActivateRandom;
                                                    delete addon.numActivateRandom;
                                                    delete addon.activateThisChoice;
                                                    delete addon.activateAfterReset;
                                                }
                                            }} />
                                            {#snippet label()}
                                                Force Other Choices to Be Active
                                            {/snippet}
                                        </FormField>
                                        {#if addon.activateOtherChoice}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => addon.isNotDeactivate ?? false, (e) => addon.isNotDeactivate = e} onchange={() => {
                                                    if (!addon.isNotDeactivate) delete addon.isNotDeactivate;
                                                }} />
                                                {#snippet label()}
                                                    Keep Other Choices Active when Deselected
                                                {/snippet}
                                            </FormField>
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => addon.isAllowDeselect ?? false, (e) => addon.isAllowDeselect = e} onchange={() => {
                                                    if (!addon.isAllowDeselect) {
                                                        delete addon.isAllowDeselect;
                                                        delete addon.activateAfterReset;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Allow Deselection of Activated Choices
                                                {/snippet}
                                            </FormField>
                                            {#if addon.isAllowDeselect && addon.notDeselectedByClean}
                                                <FormField class="col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => addon.activateAfterReset ?? false, (e) => addon.activateAfterReset = e} onchange={() => {
                                                        if (!addon.activateAfterReset) delete addon.activateAfterReset;
                                                    }} />
                                                    {#snippet label()}
                                                        Activate Choices Again After Reset
                                                    {/snippet}
                                                </FormField>
                                            {/if}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => addon.isNotActiveUnselectable ?? false, (e) => addon.isNotActiveUnselectable = e} onchange={() => {
                                                    if (!addon.isNotActiveUnselectable) delete addon.isNotActiveUnselectable;
                                                }} />
                                                {#snippet label()}
                                                    Prevent Activation of Unselectable Choices
                                                {/snippet}
                                            </FormField>
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => addon.isActivateRandom ?? false, (e) => addon.isActivateRandom = e} onchange={() => {
                                                    if (!addon.isActivateRandom) delete addon.isActivateRandom;
                                                    else addon.numActivateRandom = 0;
                                                }} />
                                                {#snippet label()}
                                                    Activate Choices at Random
                                                {/snippet}
                                            </FormField>
                                            <div class="col-12 m-1 px-4">
                                                Using the same ID multiple times may cause issues. You can use comma to activate multiple choices (ID,ID,ID/ON#1).
                                            </div>
                                            <div class="col-12 m-1 px-2">
                                                {#if addon.isActivateRandom}
                                                    <Textfield bind:value={() => addon.numActivateRandom ?? 0, (e) => addon.numActivateRandom = e} label="Number of choices to activate" type="number" variant="filled" />
                                                {/if}
                                                <Textfield bind:value={() => addon.activateThisChoice ?? '', (e) => addon.activateThisChoice = e} label="Choice / Group IDs" variant="filled" />
                                            </div>
                                            <div class="b-line"></div>
                                        {/if}
                                        <FormField class="col-12 m-1 p-0">
                                            <Checkbox bind:checked={() => addon.deactivateOtherChoice ?? false, (e) => addon.deactivateOtherChoice = e} onchange={() => {
                                                if (!addon.deactivateOtherChoice) {
                                                    delete addon.deactivateOtherChoice;
                                                    delete addon.deactivateThisChoice;
                                                }
                                            }} />
                                            {#snippet label()}
                                                Deactivate Other Choices
                                            {/snippet}
                                        </FormField>
                                        {#if addon.deactivateOtherChoice}
                                            <div class="col-12 m-1 px-4">
                                                Using the same ID multiple times may cause issues. You can use comma to activate multiple choices (ID,ID,ID/ON#1).
                                            </div>
                                            <div class="col-12 m-1 px-2">
                                                <Textfield bind:value={() => addon.deactivateThisChoice ?? '', (e) => addon.deactivateThisChoice = e} label="Choice / Group IDs" variant="filled" />
                                            </div>
                                            <div class="b-line"></div>
                                        {/if}
                                        <FormField class="col-12 m-1 p-0">
                                            <Checkbox bind:checked={() => addon.discountOther ?? false, (e) => addon.discountOther = e} onchange={() => {
                                                if (addon.discountOther) {
                                                    addon.discountGroups = [];
                                                    addon.discountPointTypes = [];
                                                    addon.discountValue = 0;
                                                } else {
                                                    delete addon.discountOther;
                                                    delete addon.discountLowLimitIsOn;
                                                    delete addon.discountLowLimit;
                                                    delete addon.discountShow;
                                                    delete addon.discountBeforeText;
                                                    delete addon.discountAfterText
                                                    delete addon.isDisChoices;
                                                    delete addon.discountGroups;
                                                    delete addon.discountChoices;
                                                    delete addon.discountRows;
                                                    delete addon.discountPointTypes;
                                                    delete addon.discountOperator;
                                                    delete addon.discountValue;
                                                    delete addon.discountTextDuplicated;
                                                    delete addon.replaceScoreText;
                                                    delete addon.hideScoreValue;
                                                    delete addon.hideScoreIcon;
                                                    delete addon.useDiscountCount;
                                                    delete addon.discountCount;
                                                }
                                            }} />
                                            {#snippet label()}
                                                Discount Other Choices
                                            {/snippet}
                                        </FormField>
                                        {#if addon.discountOther}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => addon.stackableDiscount ?? false, (e) => addon.stackableDiscount = e} onchange={() => {
                                                    if (!addon.stackableDiscount) delete addon.stackableDiscount;
                                                }} />
                                                {#snippet label()}
                                                    Allow Stacking Discounts
                                                {/snippet}
                                            </FormField>
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => addon.discountLowLimitIsOn ?? false, (e) => addon.discountLowLimitIsOn = e} onchange={() => {
                                                    if (!addon.discountLowLimitIsOn) {
                                                        delete addon.discountLowLimitIsOn;
                                                        delete addon.discountLowLimit;
                                                    } else {
                                                        addon.discountLowLimit = 0;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Enable Minimum Score Cap
                                                {/snippet}
                                            </FormField>
                                            {#if addon.discountLowLimitIsOn}
                                                <div class="col-12 m-1 px-2">
                                                    <Textfield bind:value={() => addon.discountLowLimit ?? 0, (e) => addon.discountLowLimit = e} label="Score Cap" type="number" variant="filled" />
                                                </div>
                                            {/if}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => addon.discountShow ?? false, (e) => addon.discountShow = e} onchange={() => {
                                                    if (!addon.discountShow) {
                                                        delete addon.discountShow;
                                                        delete addon.discountBeforeText;
                                                        delete addon.discountAfterText;
                                                        delete addon.discountTextDuplicated;
                                                        delete addon.replaceScoreText;
                                                        delete addon.hideScoreValue;
                                                        delete addon.hideScoreIcon;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Display Discounted Score
                                                {/snippet}
                                            </FormField>
                                            {#if addon.discountShow}
                                                <FormField class="col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => addon.discountTextDuplicated ?? false, (e) => addon.discountTextDuplicated = e} onchange={() => {
                                                        if (!addon.discountTextDuplicated) delete addon.discountTextDuplicated;
                                                    }} />
                                                    {#snippet label()}
                                                        Display Repeated Text Only Once
                                                    {/snippet}
                                                </FormField>
                                                <FormField class="col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => addon.replaceScoreText ?? false, (e) => addon.replaceScoreText = e} onchange={() => {
                                                        if (!addon.replaceScoreText) {
                                                            delete addon.replaceScoreText;
                                                            delete addon.hideScoreValue;
                                                            delete addon.hideScoreIcon;
                                                        } else {
                                                            addon.discountTextDuplicated = true;
                                                        }
                                                    }} />
                                                    {#snippet label()}
                                                        Replace Score Text Completely
                                                    {/snippet}
                                                </FormField>
                                                {#if addon.replaceScoreText}
                                                    <FormField class="col-12 m-1 p-0">
                                                        <Checkbox bind:checked={() => addon.hideScoreValue ?? false, (e) => addon.hideScoreValue = e} onchange={() => {
                                                            if (!addon.hideScoreValue) {
                                                                delete addon.hideScoreValue;
                                                            }
                                                        }} />
                                                        {#snippet label()}
                                                            Hide Score Value
                                                        {/snippet}
                                                    </FormField>
                                                    <FormField class="col-12 m-1 p-0">
                                                        <Checkbox bind:checked={() => addon.hideScoreIcon ?? false, (e) => addon.hideScoreIcon = e} onchange={() => {
                                                            if (!addon.hideScoreIcon) {
                                                                delete addon.hideScoreIcon;
                                                            }
                                                        }} />
                                                        {#snippet label()}
                                                            Hide Score Icon
                                                        {/snippet}
                                                    </FormField>
                                                    <div class={col6}>
                                                        <Textfield bind:value={() => addon.discountBeforeText ?? '', (e) => addon.discountBeforeText = e} label="Text Before" variant="filled" />
                                                    </div>
                                                    <div class={col6}>
                                                        <Textfield bind:value={() => addon.discountAfterText ?? '', (e) => addon.discountAfterText = e} label="Text After" variant="filled" />
                                                    </div>
                                                {:else}
                                                    <div class={col6}>
                                                        <Textfield bind:value={() => addon.discountBeforeText ?? '', (e) => addon.discountBeforeText = e} label="Added to Text Before" variant="filled" />
                                                    </div>
                                                    <div class={col6}>
                                                        <Textfield bind:value={() => addon.discountAfterText ?? '', (e) => addon.discountAfterText = e} label="Added to Text After" variant="filled" />
                                                    </div>
                                                {/if}
                                            {/if}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => addon.useDiscountCount ?? false, (e) => addon.useDiscountCount = e} onchange={() => {
                                                    if (addon.useDiscountCount) {
                                                        addon.discountCount = 0;
                                                    } else {
                                                        delete addon.useDiscountCount;
                                                        delete addon.discountCount;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Specify Number of Choices to Be Discounted
                                                {/snippet}
                                            </FormField>
                                            {#if addon.useDiscountCount}
                                                <div class="col-12 m-1 px-2">
                                                    <Textfield bind:value={() => addon.discountCount ?? 0, (e) => addon.discountCount = e} onchange={() => addon.discountCount = Math.max(0, addon.discountCount || 0)} label="Number of choices" type="number" input$min={0} variant="filled" />
                                                </div>
                                            {/if}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => addon.isDisChoices ?? false, (e) => addon.isDisChoices = e} onchange={() => {
                                                    if (addon.isDisChoices) {
                                                        addon.discountChoices = [];
                                                        addon.discountRows = [];
                                                        delete addon.discountGroups;
                                                    } else {
                                                        addon.discountGroups = [];
                                                        delete addon.isDisChoices;
                                                        delete addon.discountChoices;
                                                        delete addon.discountRows;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Select Individual Choices Instead of Groups
                                                {/snippet}
                                            </FormField>
                                            {#if addon.isDisChoices}
                                                <div class="col-12 m-1 px-4">
                                                    Do not select choices that are already included in the selected rows.
                                                </div>
                                            {/if}
                                            <div class="col-12 m-1 px-2">
                                                {#if addon.isDisChoices}
                                                    <CustomChipInput acValue={addon.discountRows ?? []} acOptions={isBackpack ? getBackpackRows() : getRows()} inputLabel="Rows to apply discount" getLabel={getRowLabel} selectProp={choice} />
                                                    <CustomChipInput acValue={addon.discountChoices ?? []} acOptions={isBackpack ? getBackpackSelectables() : getSelectables()} inputLabel="Choices to apply discount" getLabel={getChoiceLabel} selectProp={choice} />
                                                {:else}
                                                    <CustomChipInput acValue={addon.discountGroups ?? []} acOptions={getGroups()} inputLabel="Groups to apply discount" getLabel={getGroupLabel} selectProp={choice} />
                                                {/if}
                                                <CustomChipInput acValue={addon.discountPointTypes ?? []} acOptions={getPointTypes()} inputLabel="Point Types to apply discount" getLabel={getPointTypeLabel} selectProp={choice} />
                                            </div>
                                            <div class={col6}>
                                                <Select bind:value={addon.discountOperator} label="Operator" variant="filled">
                                                    {#each discountOperators as operator (operator.text)}
                                                        <Option value={operator.value}>{operator.text}</Option>
                                                    {/each}
                                                </Select>
                                            </div>
                                            <div class={col6}>
                                                <Textfield bind:value={() => addon.discountValue ?? 0, (e) => addon.discountValue = e} label="Discount Value" type="number" variant="filled" />
                                            </div>
                                            <div class="b-line"></div>
                                        {/if}
                                        <FormField class="col-12 m-1 p-0">
                                            <Checkbox bind:checked={() => addon.duplicateRow ?? false, (e) => addon.duplicateRow = e} onchange={() => {
                                                if (!addon.duplicateRow) {
                                                    delete addon.duplicateRow;
                                                    delete addon.dRowAddSufReq;
                                                    delete addon.dRowAddSufFunc;
                                                    delete addon.duplicateRowId;
                                                    delete addon.duplicateRowPlace;
                                                }
                                            }} />
                                            {#snippet label()}
                                                Duplicate a Row
                                            {/snippet}
                                        </FormField>
                                        {#if addon.duplicateRow}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => addon.dRowAddSufReq ?? false, (e) => addon.dRowAddSufReq = e} onchange={() => {
                                                    if (!addon.dRowAddSufReq) {
                                                        delete addon.dRowAddSufReq;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Do Not Add Suffix to Requirement IDs
                                                {/snippet}
                                            </FormField>
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => addon.dRowAddSufFunc ?? false, (e) => addon.dRowAddSufFunc = e} onchange={() => {
                                                    if (!addon.dRowAddSufFunc) {
                                                        delete addon.dRowAddSufFunc;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Do Not Add Suffix to Function IDs
                                                {/snippet}
                                            </FormField>                                                
                                            <div class="col-12 m-1 px-4">
                                                IDs in the duplicated row will have a suffix (e.g., /D#n).
                                            </div>
                                            <div class="col-12 m-1 px-2">
                                                <Autocomplete
                                                    options={isBackpack ? getBackpackRows() : getRows()}
                                                    getOptionLabel={getRowLabel}
                                                    bind:value={addon.duplicateRowId}
                                                    label="Source Row (to be duplicated)"
                                                    toggle={true}
                                                    showMenuWithNoInput={true}
                                                    textfield$variant="filled"
                                                    class="w-100 p-0"
                                                />
                                                <Autocomplete
                                                    options={isBackpack ? getBackpackRows() : getRows()}
                                                    getOptionLabel={getRowLabel}
                                                    bind:value={addon.duplicateRowPlace}
                                                    label="Target Placement (insert after)"
                                                    toggle={true}
                                                    showMenuWithNoInput={true}
                                                    textfield$variant="filled"
                                                    class="w-100 p-0"
                                                />
                                            </div>
                                            <div class="b-line"></div>
                                        {/if}
                                        <FormField class="col-12 m-1 p-0">
                                            <Checkbox bind:checked={() => addon.isContentHidden ?? false, (e) => addon.isContentHidden = e} onchange={() => {
                                                if (addon.isContentHidden) {
                                                    addon.hiddenContentsRow = [];
                                                    addon.hiddenContentsType = [];
                                                } else {
                                                    delete addon.isContentHidden;
                                                    delete addon.hiddenContentsRow;
                                                    delete addon.hiddenContentsType;
                                                }
                                            }} />
                                            {#snippet label()}
                                                Hide the Contents of Choices
                                            {/snippet}
                                        </FormField>
                                        {#if addon.isContentHidden}
                                            <div class="col-12 m-1 px-2">
                                                <CustomChipInput acValue={addon.hiddenContentsRow ?? []} acOptions={isBackpack ? getBackpackRows() : getRows()} inputLabel="Target Row" getLabel={getRowLabel} selectProp={choice} />
                                                <CustomChipInput acValue={addon.hiddenContentsType ?? []} acOptions={hideContentValue} inputLabel="Target Content" getLabel={(e) => hideContentText[parseInt(e) - 1]} selectProp={choice} />
                                            </div>
                                            <div class="b-line"></div>
                                        {/if}
                                        <FormField class="col-12 m-1 p-0">
                                            <Checkbox bind:checked={() => addon.addToAllowChoice ?? false, (e) => addon.addToAllowChoice = e} onchange={() => {
                                                if (addon.addToAllowChoice) {
                                                    addon.idOfAllowChoice = [];
                                                } else {
                                                    delete addon.addToAllowChoice;
                                                    delete addon.idOfAllowChoice;
                                                    delete addon.numbAddToAllowChoice;
                                                }
                                            }} />
                                            {#snippet label()}
                                                Adjust Allowed Choices for Rows
                                            {/snippet}
                                        </FormField>
                                        {#if addon.addToAllowChoice}
                                            <div class="col-12 m-1 px-2">
                                                <CustomChipInput acValue={addon.idOfAllowChoice ?? []} acOptions={isBackpack ? getBackpackRows() : getRows()} inputLabel="Target Row" getLabel={getRowLabel} selectProp={choice} />
                                                <Textfield bind:value={() => addon.numbAddToAllowChoice ?? 0, (e) => addon.numbAddToAllowChoice = e} label="Number to increase or decrease" type="number" variant="filled" />
                                            </div>
                                            <div class="b-line"></div>
                                        {/if}
                                        <FormField class="col-12 m-1 p-0">
                                            <Checkbox bind:checked={() => addon.showAllAddons ?? false, (e) => addon.showAllAddons = e} onchange={() => {
                                                if (!addon.showAllAddons) {
                                                    delete addon.showAllAddons;
                                                }
                                            }} />
                                            {#snippet label()}
                                                Show All Addons
                                            {/snippet}
                                        </FormField>
                                        <FormField class="col-12 m-1 p-0">
                                            <Checkbox bind:checked={() => addon.changeTemplates ?? false, (e) => addon.changeTemplates = e} onchange={() => {
                                                if (!addon.changeTemplates) {
                                                    delete addon.changeTemplates;
                                                    delete addon.changeTemplatesList;
                                                    delete addon.changeToThisTemplate;
                                                } else {
                                                    addon.changeToThisTemplate = 1;
                                                }
                                            }} />
                                            {#snippet label()}
                                                Change Image Template
                                            {/snippet}
                                        </FormField>
                                        {#if addon.changeTemplates}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => addon.changeAddonTemplate ?? false, (e) => addon.changeAddonTemplate = e} onchange={() => {
                                                    if (!addon.changeAddonTemplate) {
                                                        delete addon.changeAddonTemplate;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Change Addon Image Template too
                                                {/snippet}
                                            </FormField>
                                            <div class="col-12 m-1 px-4">
                                                Using the same ID multiple times may cause issues. You can use comma to change multiple items (ID,ID,ID).
                                            </div>
                                            <div class="col-12 pe-1">
                                                <Select bind:value={() => addon.changeToThisTemplate ?? 1, (e) => addon.changeToThisTemplate = e} label="Template" variant="filled" alwaysFloat={true}>
                                                    {#each templates as template (template.text)}
                                                        <Option value={template.value}>{template.text}</Option>
                                                    {/each}
                                                </Select>
                                            </div>
                                            <div class="col-12 mt-0 m-1 px-2">
                                                <Textfield bind:value={() => addon.changeTemplatesList ?? '', (e) => addon.changeTemplatesList = e} label="Row / Choice / Group IDs" variant="filled" />
                                            </div>
                                            <div class="b-line"></div>
                                        {/if}
                                        <FormField class="col-12 m-1 p-0">
                                            <Checkbox bind:checked={() => addon.changeWidth ?? false, (e) => addon.changeWidth = e} onchange={() => {
                                                if (!addon.changeWidth) {
                                                    delete addon.changeWidth;
                                                    delete addon.changeWidthList;
                                                    delete addon.changeToThisWidth;
                                                } else {
                                                    addon.changeToThisWidth = '';
                                                }
                                            }} />
                                            {#snippet label()}
                                                Change Choices Per Row
                                            {/snippet}
                                        </FormField>
                                        {#if addon.changeWidth}
                                            <div class="col-12 m-1 px-4">
                                                Using the same ID multiple times may cause issues. You can use comma to change multiple items (ID,ID,ID).
                                            </div>
                                            <div class="col-12 pe-1">
                                                <Select bind:value={() => addon.changeToThisWidth ?? '', (e) => addon.changeToThisWidth = e} label="Template" variant="filled" alwaysFloat={true}>
                                                    {#each objectWidths as objectWidth (objectWidth.text)}
                                                        <Option value={objectWidth.value}>{objectWidth.text}</Option>
                                                    {/each}
                                                </Select>
                                            </div>
                                            <div class="col-12 mt-0 m-1 px-2">
                                                <Textfield bind:value={() => addon.changeWidthList ?? '', (e) => addon.changeWidthList = e} label="Row / Choice / Group IDs" variant="filled" />
                                            </div>
                                            <div class="b-line"></div>
                                        {/if}
                                    </div>
                                    {/if}
                                </AcdContent>
                            </Panel>
                            <Panel class="bordered-panel {panel03 ? 'on-top' : ''}" bind:open={panel03} variant="unelevated" conditionalRender={true}>
                                <Header class="p-0">
                                    - Effects
                                    {#snippet icon()}
                                        <IconButton toggle pressed={panel03} size="mini">
                                            <Icon class="mdi mdi-chevron-up" on></Icon>
                                            <Icon class="mdi mdi-chevron-down"></Icon>
                                        </IconButton>
                                    {/snippet}
                                </Header>
                                <AcdContent style="overflow:visible">
                                    {#if panel03}
                                    <div class:disabled={addon.isActive} class="row gy-3">
                                        <FormField class="col-12 m-1 p-0">
                                            <Checkbox bind:checked={() => addon.scrollToRow ?? false, (e) => addon.scrollToRow = e} onchange={() => {
                                                if (!addon.scrollToRow) {
                                                    delete addon.scrollToRow;
                                                    delete addon.scrollToObject;
                                                    delete addon.scrollObjectId;
                                                    delete addon.scrollRowId
                                                }
                                            }} />
                                            {#snippet label()}
                                                Scroll to Row
                                            {/snippet}
                                        </FormField>
                                        {#if addon.scrollToRow}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => addon.scrollToObject ?? false, (e) => addon.scrollToObject = e} onchange={() => {
                                                    if (addon.scrollToObject) {
                                                        delete addon.scrollRowId;
                                                    } else {
                                                        delete addon.scrollToObject;
                                                        delete addon.scrollObjectId;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Scroll to Choice Instead
                                                {/snippet}
                                            </FormField>
                                            <div class="col-12 m-1 px-2">
                                                {#if addon.scrollToObject}
                                                    <Autocomplete
                                                        options={isBackpack ? getBackpackChoices() : getChoices()}
                                                        getOptionLabel={getChoiceLabel}
                                                        bind:value={addon.scrollObjectId}
                                                        label="Target Choice"
                                                        toggle={true}
                                                        showMenuWithNoInput={true}
                                                        textfield$variant="filled"
                                                        class="w-100 p-0"
                                                    />
                                                {:else}
                                                    <Autocomplete
                                                        options={isBackpack ? getBackpackRows() : getRows()}
                                                        getOptionLabel={getRowLabel}
                                                        bind:value={addon.scrollRowId}
                                                        label="Target Row"
                                                        toggle={true}
                                                        showMenuWithNoInput={true}
                                                        textfield$variant="filled"
                                                        class="w-100 p-0"
                                                    />
                                                {/if}
                                            </div>
                                            <div class="b-line"></div>
                                        {/if}
                                        <FormField class="col-12 m-1 p-0">
                                            <Checkbox bind:checked={() => addon.changePointBar ?? false, (e) => addon.changePointBar = e} onchange={() => {
                                                if (!addon.changePointBar) {
                                                    delete addon.changePointBar;
                                                    delete addon.changeBarBgColorIsOn;
                                                    delete addon.changeBarTextColorIsOn;
                                                    delete addon.changeBarIconColorIsOn;
                                                    delete addon.changedBarBgColor;
                                                    delete addon.changedBarTextColor;
                                                    delete addon.changedBarIconColor;
                                                }
                                            }} />
                                            {#snippet label()}
                                                Change Point Bar Design
                                            {/snippet}
                                        </FormField>
                                            {#if addon.changePointBar}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => addon.changeBarBgColorIsOn ?? false, (e) => addon.changeBarBgColorIsOn = e} onchange={() => {
                                                    if (!addon.changeBarBgColorIsOn) {
                                                        delete addon.changeBarBgColorIsOn;
                                                        delete addon.changedBarBgColor;
                                                    } else {
                                                        addon.changedBarBgColor = '#000000';
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Change Point Bar Background Color
                                                {/snippet}
                                            </FormField>
                                            {#if addon.changeBarBgColorIsOn}
                                                <div class="col-12 m-1 px-4">
                                                    <ColorPicker bind:hex={() => addon.changedBarBgColor ?? '#000000', (e) => addon.changedBarBgColor = e} components={ChromeVariant} sliderDirection="horizontal" />
                                                </div>
                                            {/if}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => addon.changeBarTextColorIsOn ?? false, (e) => addon.changeBarTextColorIsOn = e} onchange={() => {
                                                    if (!addon.changeBarTextColorIsOn) {
                                                        delete addon.changeBarTextColorIsOn;
                                                        delete addon.changedBarTextColor;
                                                    } else {
                                                        addon.changedBarTextColor = '#000000';
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Change Point Bar Text Color
                                                {/snippet}
                                            </FormField>
                                            {#if addon.changeBarTextColorIsOn}
                                                <div class="col-12 m-1 px-4">
                                                    <ColorPicker bind:hex={() => addon.changedBarTextColor ?? '#000000', (e) => addon.changedBarTextColor = e} components={ChromeVariant} sliderDirection="horizontal" />
                                                </div>
                                            {/if}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => addon.changeBarIconColorIsOn ?? false, (e) => addon.changeBarIconColorIsOn = e} onchange={() => {
                                                    if (!addon.changeBarIconColorIsOn) {
                                                        delete addon.changeBarIconColorIsOn;
                                                        delete addon.changedBarIconColor;
                                                    } else {
                                                        addon.changedBarIconColor = '#000000';
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Change Point Bar Icon Color
                                                {/snippet}
                                            </FormField>
                                            {#if addon.changeBarIconColorIsOn}
                                                <div class="col-12 m-1 px-4">
                                                    <ColorPicker bind:hex={() => addon.changedBarIconColor ?? '#000000', (e) => addon.changedBarIconColor = e} components={ChromeVariant} sliderDirection="horizontal" />
                                                </div>
                                            {/if}
                                            <div class="b-line"></div>
                                        {/if}
                                        <FormField class="col-12 m-1 p-0">
                                            <Checkbox bind:checked={() => addon.changeBackground ?? false, (e) => addon.changeBackground = e} onchange={() => {
                                                if (!addon.changeBackground) {
                                                    delete addon.changeBackground;
                                                    delete addon.changedBgColorCode;
                                                    delete addon.changeBgImage;
                                                    delete addon.bgImage;
                                                } else {
                                                    addon.changedBgColorCode = '#000000';
                                                }
                                            }} />
                                            {#snippet label()}
                                                Change Background Color
                                            {/snippet}
                                        </FormField>
                                        {#if addon.changeBackground}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => addon.changeBgImage ?? false, (e) => addon.changeBgImage = e} onchange={() => {
                                                    if (addon.changeBgImage) {
                                                        delete addon.changedBgColorCode;
                                                    } else {
                                                        delete addon.changeBgImage;
                                                        delete addon.bgImage;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Use Backgrond Image
                                                {/snippet}
                                            </FormField>
                                            {#if addon.changeBgImage}
                                                <div class="col-12 px-5 py-3">
                                                    {#if addon.bgImage && !app.hideImages}
                                                        <button type="button" onclickcapture={() => {imgDialog.currentDialog = 'appImageUpload'; imgDialog.data = choice; imgDialog.imgProp = 'bgImage'}} class="btn--image-background">
                                                            <img src={addon.bgImage} alt="" loading="lazy" class="btn--image" style="max-height: 175px"/>
                                                        </button>
                                                    {/if}
                                                    <Button onclickcapture={() => {imgDialog.currentDialog = 'appImageUpload'; imgDialog.data = choice; imgDialog.imgProp = 'bgImage'}} variant="raised">
                                                        <Label>Change Image</Label>
                                                    </Button>
                                                </div>
                                            {:else}
                                                <div class="col-12 m-1 px-4">
                                                    <ColorPicker bind:hex={() => addon.changedBgColorCode ?? '#000000', (e) => addon.changedBgColorCode = e} components={ChromeVariant} sliderDirection="horizontal" />
                                                </div>
                                            {/if}
                                            <div class="b-line"></div>
                                        {/if}
                                        <FormField class="col-12 m-1 p-0">
                                            <Checkbox bind:checked={() => addon.setBgmIsOn ?? false, (e) => addon.setBgmIsOn = e} onchange={() => {
                                                if (!addon.setBgmIsOn) {
                                                    delete addon.setBgmIsOn;
                                                    delete addon.bgmNoLoop;
                                                    delete addon.bgmFadeIn;
                                                    delete addon.bgmFadeInSec;
                                                    delete addon.bgmFadeOut;
                                                    delete addon.bgmFadeOutSec;
                                                    delete addon.bgmId;
                                                    delete addon.useAudioURL;
                                                }
                                            }} />
                                            {#snippet label()}
                                                Enable Background Music
                                            {/snippet}
                                        </FormField>
                                        {#if addon.setBgmIsOn}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => addon.useAudioURL ?? false, (e) => addon.useAudioURL = e} onchange={() => {
                                                    if (!addon.useAudioURL) {
                                                        delete addon.useAudioURL;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Use External URL
                                                {/snippet}
                                            </FormField>
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => addon.bgmNoLoop ?? false, (e) => addon.bgmNoLoop = e} onchange={() => {
                                                    if (!addon.bgmNoLoop) {
                                                        delete addon.bgmNoLoop;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Do Not Loop Music
                                                {/snippet}
                                            </FormField>
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => addon.bgmFadeIn ?? false, (e) => addon.bgmFadeIn = e} onchange={() => {
                                                    if (addon.bgmFadeIn) {
                                                        addon.bgmFadeInSec = 0;
                                                    } else {
                                                        delete addon.bgmFadeIn;
                                                        delete addon.bgmFadeInSec;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Enable Fade In
                                                {/snippet}
                                            </FormField>
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => addon.bgmFadeOut ?? false, (e) => addon.bgmFadeOut = e} onchange={() => {
                                                    if (addon.bgmFadeOut) {
                                                        addon.bgmFadeOutSec = 0;
                                                    } else {
                                                        delete addon.bgmFadeOut;
                                                        delete addon.bgmFadeOutSec;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Enable Fade Out
                                                {/snippet}
                                            </FormField>
                                            <div class="col-12 m-1 px-4">
                                                {addon.useAudioURL ? 'Enter the audio file URL. Use the direct URL to the audio file, not a page or player link.' : 'Enter only the YouTube video ID (e.g., naktUDBaHuw), not the full URL.'}
                                            </div>
                                            <div class="col-12 m-1 px-2">
                                                {#if addon.bgmFadeIn}
                                                    <Textfield bind:value={() => addon.bgmFadeInSec ?? 0, (e) => addon.bgmFadeInSec = e} label="Fade In Duration" type="number" suffix="ms" variant="filled" />
                                                {/if}
                                                {#if addon.bgmFadeOut}
                                                    <Textfield bind:value={() => addon.bgmFadeOutSec ?? 0, (e) => addon.bgmFadeOutSec = e} label="Fade Out Duration" type="number" suffix="ms" variant="filled" />
                                                {/if}
                                                <Textfield bind:value={() => addon.bgmId ?? '', (e) => addon.bgmId = e} label={addon.useAudioURL ? 'Audio File URL' : 'Youtube Video ID'} variant="filled" />
                                            </div>
                                            <div class="b-line"></div>
                                        {/if}
                                        <FormField class="col-12 m-1 p-0">
                                            <Checkbox bind:checked={() => addon.muteBgm ?? false, (e) => addon.muteBgm = e} onchange={() => {
                                                if (!addon.muteBgm) {
                                                    delete addon.muteBgm;
                                                }
                                            }} />
                                            {#snippet label()}
                                                Mute Background Music
                                            {/snippet}
                                        </FormField>
                                    </div>
                                    {/if}
                                </AcdContent>
                            </Panel>
                            <Panel class="bordered-panel {panel04 ? 'on-top' : ''}" bind:open={panel04} variant="unelevated" conditionalRender={true}>
                                <Header class="p-0">
                                    - Miscellaneous
                                    {#snippet icon()}
                                        <IconButton toggle pressed={panel04} size="mini">
                                            <Icon class="mdi mdi-chevron-up" on></Icon>
                                            <Icon class="mdi mdi-chevron-down"></Icon>
                                        </IconButton>
                                    {/snippet}
                                </Header>
                                <AcdContent style="overflow:visible">
                                    {#if panel04}
                                    <div class:disabled={addon.isActive} class="row gy-3">
                                        <FormField class="col-12 m-1 p-0">
                                            <Checkbox bind:checked={() => addon.multiplyPointtypeIsOn ?? false, (e) => addon.multiplyPointtypeIsOn = e} onchange={() => {
                                                if (addon.multiplyPointtypeIsOn) {
                                                    addon.pointTypeToMultiply = [];
                                                    addon.multiplyWithThis = 0;
                                                } else {
                                                    delete addon.multiplyPointtypeIsOn;
                                                    delete addon.multiplyPointtypeIsId;
                                                    delete addon.pointTypeToMultiply;
                                                    delete addon.multiplyWithThis;
                                                }
                                            }} />
                                            {#snippet label()}
                                                Multiply into Point Types
                                            {/snippet}
                                        </FormField>
                                        {#if addon.multiplyPointtypeIsOn}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => addon.multiplyPointtypeIsId ?? false, (e) => addon.multiplyPointtypeIsId = e} onchange={() => {
                                                    if (addon.multiplyPointtypeIsId) {
                                                        delete addon.multiplyWithThis;
                                                    } else {
                                                        delete addon.multiplyPointtypeIsId;
                                                        addon.multiplyWithThis = 0;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Use a Point Type as multiplier
                                                {/snippet}
                                            </FormField>
                                            <div class="col-12 m-1 px-2">
                                                <CustomChipInput acValue={addon.pointTypeToMultiply ?? []} acOptions={getPointTypes()} inputLabel="Target Point Type" getLabel={getPointTypeLabel} selectProp={choice} />
                                                    {#if addon.multiplyPointtypeIsId}
                                                        <Autocomplete
                                                            options={getPointTypes()}
                                                            getOptionLabel={getPointTypeLabel}
                                                            bind:value={addon.multiplyWithThis}
                                                            label="Multiplied by"
                                                            toggle={true}
                                                            showMenuWithNoInput={true}
                                                            textfield$variant="filled"
                                                            class="w-100 p-0"
                                                        />
                                                    {:else}
                                                        <Textfield bind:value={() => addon.multiplyWithThis ?? 0, (e) => addon.multiplyWithThis = e} label="Multiplied by" type="number" variant="filled" />
                                                    {/if}
                                            </div>
                                            <div class="b-line"></div>
                                        {/if}
                                        <FormField class="col-12 m-1 p-0">
                                            <Checkbox bind:checked={() => addon.dividePointtypeIsOn ?? false, (e) => addon.dividePointtypeIsOn = e} onchange={() => {
                                                if (addon.dividePointtypeIsOn) {
                                                    addon.pointTypeToDivide = [];
                                                    addon.divideWithThis = 0;
                                                } else {
                                                    delete addon.dividePointtypeIsOn;
                                                    delete addon.pointTypeToDivide;
                                                    delete addon.divideWithThis;
                                                }
                                            }} />
                                            {#snippet label()}
                                                Divide into Point Types
                                            {/snippet}
                                        </FormField>
                                        {#if addon.dividePointtypeIsOn}
                                            <div class="col-12 m-1 px-2">
                                                <CustomChipInput acValue={addon.pointTypeToDivide ?? []} acOptions={getPointTypes()} inputLabel="Target Point Type" getLabel={getPointTypeLabel} selectProp={choice} />
                                                <Textfield bind:value={() => addon.divideWithThis ?? 0, (e) => addon.divideWithThis = e} label="Divided by" type="number" variant="filled" />
                                            </div>
                                            <div class="b-line"></div>
                                        {/if}
                                        <FormField class="col-12 m-1 p-0">
                                            <Checkbox bind:checked={() => addon.setPointtypeIsOn ?? false, (e) => addon.setPointtypeIsOn = e} onchange={() => {
                                                if (addon.setPointtypeIsOn) {
                                                    addon.pointTypeToSet = [];
                                                    addon.setWithThis = '';
                                                } else {
                                                    delete addon.setPointtypeIsOn;
                                                    delete addon.pointTypeToSet;
                                                    delete addon.setWithThis;
                                                }
                                            }} />
                                            {#snippet label()}
                                                Set Point Types Value
                                            {/snippet}
                                        </FormField>
                                        {#if addon.setPointtypeIsOn}
                                            <div class="col-12 m-1 px-2">
                                                <CustomChipInput acValue={addon.pointTypeToSet ?? []} acOptions={getPointTypes()} inputLabel="Target Point Type" getLabel={getPointTypeLabel} selectProp={choice} />
                                                <Textfield bind:value={() => addon.setWithThis ?? '', (e) => addon.setWithThis = e} label="Expression" input$placeholder="{'{point ID}'} * 2" variant="filled" />
                                            </div>
                                            <div class="b-line"></div>
                                        {/if}
                                        <FormField class="col-12 m-1 p-0">
                                            <Checkbox bind:checked={() => addon.isChangeVariables ?? false, (e) => addon.isChangeVariables = e} onchange={() => {
                                                if (addon.isChangeVariables) {
                                                    addon.changedVariables = [];
                                                    addon.changeType = '1';
                                                } else {
                                                    delete addon.isChangeVariables;
                                                    delete addon.changedVariables;
                                                    delete addon.changeType;
                                                }
                                            }} />
                                            {#snippet label()}
                                                Set Variable Status
                                            {/snippet}
                                        </FormField>
                                        {#if addon.isChangeVariables}
                                            <div class="col-12 m-1 px-2">
                                                <CustomChipInput acValue={addon.changedVariables ?? []} acOptions={getVariables()} inputLabel="Target Variable" selectProp={choice} />
                                                <Select bind:value={addon.changeType} label="Value" variant="filled">
                                                    {#each variableTypes as type (type.text)}
                                                        <Option value={type.value}>{type.text}</Option>
                                                    {/each}
                                                </Select>
                                            </div>
                                            <div class="b-line"></div>
                                        {/if}
                                        <FormField class="col-12 m-1 p-0">
                                            <Checkbox bind:checked={() => addon.textfieldIsOn ?? false, (e) => addon.textfieldIsOn = e} onchange={() => {
                                                if (addon.textfieldIsOn) {
                                                    addon.wordChangeSelect = '';
                                                    addon.wordChangeDeselect = '';
                                                    delete addon.confirmIsOn;
                                                } else {
                                                    delete addon.textfieldIsOn;
                                                    delete addon.customTextfieldIsOn;
                                                    delete addon.idOfTheTextfieldWord;
                                                    delete addon.wordPromptText;
                                                    delete addon.wordChangeSelect;
                                                    delete addon.wordChangeDeselect;
                                                }
                                            }} />
                                            {#snippet label()}
                                                Change Word
                                            {/snippet}
                                        </FormField>
                                        {#if addon.textfieldIsOn}
                                            <div class="col-12 m-1 px-2">
                                                <Autocomplete
                                                    options={getWords()}
                                                    bind:value={addon.idOfTheTextfieldWord}
                                                    label="Word ID"
                                                    toggle={true}
                                                    showMenuWithNoInput={true}
                                                    textfield$variant="filled"
                                                    class="w-100 p-0"
                                                />
                                                <Textfield bind:value={() => addon.wordChangeSelect ?? '', (e) => addon.wordChangeSelect = e} label="Replacement Text when Selected" variant="filled" />
                                                <Textfield bind:value={() => addon.wordChangeDeselect ?? '', (e) => addon.wordChangeDeselect = e} label="Replacement Text when Deselected" variant="filled" />
                                            </div>
                                            <div class="b-line"></div>
                                        {/if}
                                        <FormField class="col-12 m-1 p-0">
                                            <Checkbox bind:checked={() => addon.confirmIsOn ?? false, (e) => addon.confirmIsOn = e} onchange={() => {
                                                if (addon.confirmIsOn) {
                                                    addon.wordPromptText = '';
                                                    delete addon.textfieldIsOn;
                                                    delete addon.customTextfieldIsOn;
                                                    delete addon.idOfTheTextfieldWord;
                                                    delete addon.wordPromptText;
                                                    delete addon.wordChangeSelect;
                                                    delete addon.wordChangeDeselect;
                                                } else {
                                                    delete addon.confirmIsOn;
                                                    delete addon.wordPromptText;
                                                }
                                            }} />
                                            {#snippet label()}
                                                Show Confirm Dialog
                                            {/snippet}
                                        </FormField>
                                        {#if addon.confirmIsOn}
                                            <div class="col-12 m-1 px-2">
                                                <Textfield bind:value={() => addon.wordPromptText ?? '', (e) => addon.wordPromptText = e} label="Dialog Text" variant="filled" />
                                            </div>
                                            <div class="b-line"></div>
                                        {/if}
                                        <FormField class="col-12 m-1 p-0">
                                            <Checkbox bind:checked={() => addon.backpackBtnRequirement ?? false, (e) => addon.backpackBtnRequirement = e} onchange={() => {
                                                if (addon.backpackBtnRequirement) {
                                                    app.hideBackpackBtn += 1;
                                                } else {
                                                    delete addon.backpackBtnRequirement;
                                                    app.hideBackpackBtn -= 1;
                                                }
                                            }} />
                                            {#snippet label()}
                                                Must Be Selected to Show Backpack Button
                                            {/snippet}
                                        </FormField>
                                    </div>
                                    {/if}
                                </AcdContent>
                            </Panel>
                        </Accordion>
                    </AcdContent>
                </Panel>
            {/if}
        </Accordion>
    </div>
{:else}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="text-center row-{row.id} choice-{choice.id} addon{addon.isSelectable ? ` addon-${addon.id}` : ''} {addonWidthClass()}" style={addonBackground} onclickcapture={addon.isSelectable ? (e) => activateObject(addon as SelectableAddon, row, e, true) : undefined}>
        {#if addon.template >= 4 || addon.template === 1 || windowWidth <= 1280}
            <div>
                {#if (addon.template === 1 || windowWidth <= 1280) && addon.image && !row.addonImageRemoved}
                    {#if addon.imageSourceTooltip}
                        <img use:tooltip={addon.imageSourceTooltip} oncontextmenu={copyTooltip} src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                    {:else}
                        <img src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                    {/if}
                {/if}
                {#if addon.title !== '' && !row.addonTitleRemoved}
                    {#key addonTitleKey}
                        <h3 class="m-0" style={addonTitle}>
                            {@html DOMPurify.sanitize(addonTitleKey, sanitizeArg)}
                        </h3>
                    {/key}
                {/if}
                {#if addon.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 0}
                    <ObjectMultiChoice isEnabled={!!isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} addon={addon as SelectableAddon} selectedOneMore={() => selectedOneMore(addon as SelectableAddon, row, options)} selectedOneLess={() => selectedOneLess(addon as SelectableAddon, row, options)} />
                {/if}
                {#if !row.objectScoreRemoved}
                    {#if choice.showScoreInAddon && isFirst}
                        {#each choice.scores as score}
                            <ObjectScore score={score} row={row} choice={choice} />
                        {/each}
                    {/if}
                    {#if addon.scores}
                        {#each addon.scores as score}
                            <ObjectScore score={score} row={row} choice={choice} addon={addon} />
                        {/each}
                    {/if}
                {/if}
                {#if addon.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 1}
                    <ObjectMultiChoice isEnabled={!!isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} addon={addon as SelectableAddon} selectedOneMore={() => selectedOneMore(addon as SelectableAddon, row, options)} selectedOneLess={() => selectedOneLess(addon as SelectableAddon, row, options)} />
                {/if}
                {#if !row.objectRequirementRemoved}
                    {#if choice.showReqInAddon && isFirst}
                        {#each choice.requireds as required}
                            <ObjectRequired required={required} scoreText={scoreText} />
                        {/each}
                    {/if}
                    {#each addon.requireds as required}
                        <ObjectRequired required={required} scoreText={scoreText} />
                    {/each}
                {/if}
                {#if addon.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 2}
                    <ObjectMultiChoice isEnabled={!!isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} addon={addon as SelectableAddon} selectedOneMore={() => selectedOneMore(addon as SelectableAddon, row, options)} selectedOneLess={() => selectedOneLess(addon as SelectableAddon, row, options)} />
                {/if}
                {#if addon.template === 5 && windowWidth > 1280 && addon.image && !row.addonImageRemoved}
                    {#if addon.imageSourceTooltip}
                        <img use:tooltip={addon.imageSourceTooltip} oncontextmenu={copyTooltip} src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                    {:else}
                        <img src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                    {/if}
                {/if}
                {#if addon.text !== '' && !row.addonTextRemoved}
                    {#key addonTextKey}
                        <p class="mb-0" style={addonText}>
                            {@html DOMPurify.sanitize(addonTextKey, sanitizeArg)}
                        </p>
                    {/key}
                {/if}
                {#if addon.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 3}
                    <ObjectMultiChoice isEnabled={!!isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} addon={addon as SelectableAddon} selectedOneMore={() => selectedOneMore(addon as SelectableAddon, row, options)} selectedOneLess={() => selectedOneLess(addon as SelectableAddon, row, options)} />
                {/if}
                {#if addon.template === 4 && windowWidth > 1280 && addon.image && !row.addonImageRemoved}
                    {#if addon.imageSourceTooltip}
                        <img use:tooltip={addon.imageSourceTooltip} oncontextmenu={copyTooltip} src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                    {:else}
                        <img src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                    {/if}
                {/if}
                {#if addon.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 4}
                    <ObjectMultiChoice isEnabled={!!isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} addon={addon as SelectableAddon} selectedOneMore={() => selectedOneMore(addon as SelectableAddon, row, options)} selectedOneLess={() => selectedOneLess(addon as SelectableAddon, row, options)} />
                {/if}
            </div>
        {:else}
            <div class="row m-0 p-0 w-100">
                {#if addon.template === 2}
                    <div class="col p-0 text-center" style="max-width: {addonImageBoxWidth}%">
                        {#if addon.image && !row.addonImageRemoved}
                            {#if addon.imageSourceTooltip}
                                <img use:tooltip={addon.imageSourceTooltip} oncontextmenu={copyTooltip} src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {:else}
                                <img src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {/if}
                        {/if}
                    </div>
                    <div class="col p-0 text-center" style="max-width: {100 - addonImageBoxWidth}%">
                        {#if addon.title !== '' && !row.addonTitleRemoved}
                            {#key addonTitleKey}<h2 class="mb-0" style={addonTitle}>{@html DOMPurify.sanitize(addonTitleKey, sanitizeArg)}</h2>{/key}
                        {/if}
                        {#if addon.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 0}
                            <ObjectMultiChoice isEnabled={!!isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} addon={addon as SelectableAddon} selectedOneMore={() => selectedOneMore(addon as SelectableAddon, row, options)} selectedOneLess={() => selectedOneLess(addon as SelectableAddon, row, options)} />
                        {/if}
                        {#if !row.objectScoreRemoved}
                            {#if choice.showScoreInAddon && isFirst}
                                {#each choice.scores as score}
                                    <ObjectScore score={score} row={row} choice={choice} />
                                {/each}
                            {/if}
                            {#if addon.scores}
                                {#each addon.scores as score}
                                    <ObjectScore score={score} row={row} choice={choice} addon={addon} />
                                {/each}
                            {/if}
                        {/if}
                        {#if addon.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 1}
                            <ObjectMultiChoice isEnabled={!!isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} addon={addon as SelectableAddon} selectedOneMore={() => selectedOneMore(addon as SelectableAddon, row, options)} selectedOneLess={() => selectedOneLess(addon as SelectableAddon, row, options)} />
                        {/if}
                        {#if !row.objectRequirementRemoved}
                            {#if choice.showReqInAddon && isFirst}
                                {#each choice.requireds as required}
                                    <ObjectRequired required={required} scoreText={scoreText} />
                                {/each}
                            {/if}
                            {#each addon.requireds as required}
                                <ObjectRequired required={required} scoreText={scoreText} />
                            {/each}
                        {/if}
                        {#if addon.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 2}
                            <ObjectMultiChoice isEnabled={!!isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} addon={addon as SelectableAddon} selectedOneMore={() => selectedOneMore(addon as SelectableAddon, row, options)} selectedOneLess={() => selectedOneLess(addon as SelectableAddon, row, options)} />
                        {/if}
                        {#if addon.text !== '' && !row.addonTextRemoved}
                            {#key addonTextKey}
                                <p class="mb-0" style={addonText}>
                                    {@html DOMPurify.sanitize(addonTextKey, sanitizeArg)}
                                </p>
                            {/key}
                        {/if}
                        {#if addon.isSelectableMultiple && multiChoiceCounter && (multiChoiceStyle.multiChoiceCounterPosition === 3 || multiChoiceStyle.multiChoiceCounterPosition === 4)}
                            <ObjectMultiChoice isEnabled={!!isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} addon={addon as SelectableAddon} selectedOneMore={() => selectedOneMore(addon as SelectableAddon, row, options)} selectedOneLess={() => selectedOneLess(addon as SelectableAddon, row, options)} />
                        {/if}
                    </div>
                {:else if addon.template === 3}
                    <div class="col p-0 text-center" style="max-width: {100 - addonImageBoxWidth}%">
                        {#if addon.title !== '' && !row.addonTitleRemoved}
                            {#key addonTitleKey}<h2 class="mb-0" style={addonTitle}>{@html DOMPurify.sanitize(addonTitleKey, sanitizeArg)}</h2>{/key}
                        {/if}
                        {#if addon.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 0}
                            <ObjectMultiChoice isEnabled={!!isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} addon={addon as SelectableAddon} selectedOneMore={() => selectedOneMore(addon as SelectableAddon, row, options)} selectedOneLess={() => selectedOneLess(addon as SelectableAddon, row, options)} />
                        {/if}
                        {#if !row.objectScoreRemoved}
                            {#if choice.showScoreInAddon && isFirst}
                                {#each choice.scores as score}
                                    <ObjectScore score={score} row={row} choice={choice} />
                                {/each}
                            {/if}
                            {#if addon.scores}
                                {#each addon.scores as score}
                                    <ObjectScore score={score} row={row} choice={choice} addon={addon} />
                                {/each}
                            {/if}
                        {/if}
                        {#if addon.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 1}
                            <ObjectMultiChoice isEnabled={!!isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} addon={addon as SelectableAddon} selectedOneMore={() => selectedOneMore(addon as SelectableAddon, row, options)} selectedOneLess={() => selectedOneLess(addon as SelectableAddon, row, options)} />
                        {/if}
                        {#if !row.objectRequirementRemoved}
                            {#if choice.showReqInAddon && isFirst}
                                {#each choice.requireds as required}
                                    <ObjectRequired required={required} scoreText={scoreText} />
                                {/each}
                            {/if}
                            {#each addon.requireds as required}
                                <ObjectRequired required={required} scoreText={scoreText} />
                            {/each}
                        {/if}
                        {#if addon.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 2}
                            <ObjectMultiChoice isEnabled={!!isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} addon={addon as SelectableAddon} selectedOneMore={() => selectedOneMore(addon as SelectableAddon, row, options)} selectedOneLess={() => selectedOneLess(addon as SelectableAddon, row, options)} />
                        {/if}
                        {#if addon.text !== '' && !row.addonTextRemoved}
                            {#key addonTextKey}
                                <p class="mb-0" style={addonText}>
                                    {@html DOMPurify.sanitize(addonTextKey, sanitizeArg)}
                                </p>
                            {/key}
                        {/if}
                        {#if addon.isSelectableMultiple && multiChoiceCounter && (multiChoiceStyle.multiChoiceCounterPosition === 3 || multiChoiceStyle.multiChoiceCounterPosition === 4)}
                            <ObjectMultiChoice isEnabled={!!isEnabled && !row.isInfoRow && !choice.isNotSelectable} row={row} choice={choice} addon={addon as SelectableAddon} selectedOneMore={() => selectedOneMore(addon as SelectableAddon, row, options)} selectedOneLess={() => selectedOneLess(addon as SelectableAddon, row, options)} />
                        {/if}
                    </div>
                    <div class="col p-0 text-center" style="max-width: {addonImageBoxWidth}%">
                        {#if addon.image && !row.addonImageRemoved}
                            {#if addon.imageSourceTooltip}
                                <img use:tooltip={addon.imageSourceTooltip} oncontextmenu={copyTooltip} src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {:else}
                                <img src={addon.image} style={addonImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {/if}
                        {/if}
                    </div>
                {/if}
            </div>
        {/if}
    </div>
{/if}

<script lang="ts">
    import Accordion, { Panel, Header, Content as AcdContent} from '$lib/custom/accordion';
    import Autocomplete from '$lib/custom/autocomplete/Autocomplete.svelte';
    import Button, { Label } from '@smui/button';
    import Checkbox from '@smui/checkbox';
    import ColorPicker, { ChromeVariant } from '$lib/custom/svelte-awesome-color-picker';
    import CustomChipInput from '$lib/store/CustomChipInput.svelte';
    import DOMPurify from 'dompurify';
    import FormField from '@smui/form-field';
    import IconButton, { Icon } from '@smui/icon-button';
    import ObjectRequired from './ObjectRequired.svelte';
    import Select, { Option } from '$lib/custom/select';
    import Textfield from '$lib/custom/textfield/Textfield.svelte';
    import { Wrapper } from '$lib/custom/tooltip';
    import { app, checkRequirements, dlgVariables, getStyling, replaceText, sanitizeArg, snackbarVariables, hexToRgba, winWidth, objectWidthToNum, imgDialog, generateObjectId, scoreSet, getPointTypes, getPointTypeLabel, getRowLabel, getChoiceLabel, getGroups, getGroupLabel, getBackpackRows, getRows, getBackpackChoices, getChoices, getVariables, objectWidths, getWords, generateScoreId, selectableAddonItems, choiceMap, selectedOneMore, deselectObject, selectObject, checkDupId, closestByClassPrefix, selectedOneLess, getBackpackSelectables, getSelectables, tmpActivatedMap } from '$lib/store/store.svelte';
    import type { Choice, Row, Addon, SelectableAddon, ChoiceOptions, BgStyles, Filters } from '$lib/store/types';
    import { tooltip } from '$lib/custom/tooltip/store.svelte';
    import Tiptap from '$lib/store/Tiptap.svelte';
    import ObjectScore from './ObjectScore.svelte';
    import ObjectMultiChoice from './ObjectMultiChoice.svelte';

    let { isEditModeOn = false, addon, row, choice, bCreatorMode, isEnabled, windowWidth = 0, preloadImages = false, index, isFirst, isBackpack = false, mainDiv }: { isEditModeOn?: boolean; addon: Addon | SelectableAddon; row: Row; choice: Choice; bCreatorMode: boolean; isEnabled?: boolean, windowWidth?: number, preloadImages?: boolean, index?: number, isFirst?: boolean, isBackpack?: boolean; mainDiv?: HTMLDivElement } = $props();

    const templates = [{
        text: "Image Top",
        value: 1
    }, {
        text: "Image Left",
        value: 2
    }, {
        text: "Image Right",
        value: 3
    }, {
        text: "Image Bottom",
        value: 4
    }, {
        text: "Image Center",
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
    const discountOperators = [{
        text: '+ Plus',
        value: '1'
    }, {
        text: '- Minus',
        value: '2'
    }, {
        text: '× Multiply',
        value: '3'
    }, {
        text: '÷ Divide',
        value: '4'
    }, {
        text: '= Assignment',
        value: '5'
    }];
    const hideContentText = ['Title of Choice', 'Image of Choice', 'Text of Choice', 'Score of Choice', 'Requirement of Choice', 'Title of Addon', 'Image of Addon', 'Text of Addon'];
    const hideContentValue = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const variableTypes = [{
        text: 'True',
        value: '1'
    }, {
        text: 'False',
        value: '2'
    }, {
        text: 'Toggle',
        value: '3'
    }];
    const linkedObjects: string[] = [];
    const options: ChoiceOptions = {linkedObjects: linkedObjects, mainDiv: mainDiv, bCreatorMode: bCreatorMode, isBackpack: isBackpack, isOverDlg: false, isOverImg: false};
    let addonId = '';
    let width = $state(0);
    let reqCol = $derived.by(() => {
        if (width > 400) return 'col-6';
        else return 'col-12';
    });
    let col6 = $derived.by(() => {
        if (width > 278) return 'col-6';
        else return 'col-12';
    });
    let panelScore = $state(false);
    let panelReq = $state(false);
    let panel01 = $state(false);
    let panel02 = $state(false);
    let panel03 = $state(false);
    let panel04 = $state(false);
    
    let isActive = $derived(typeof choice !== 'undefined' ? choice.isActive : false);
    let addonImageStyle = $derived(getStyling('privateAddonImageIsOn', row, choice));
    let addonStyle = $derived(getStyling('privateAddonIsOn', row, choice));
    let filterStyle = $derived(getStyling('privateFilterIsOn', row, choice));
    let objectImageStyle = $derived(getStyling('privateObjectImageIsOn', row, choice));
    let objectStyle = $derived(getStyling('privateObjectIsOn', row, choice));
    let textStyle = $derived(getStyling('privateTextIsOn', row, choice));
    let multiChoiceStyle = $derived(getStyling('privateMultiChoiceIsOn', row, choice));
    let addonEnabled = $derived(checkRequirements(addon.requireds));
    let addonTitleKey = $derived(replaceText(addon.title));
    let addonTextKey = $derived(replaceText(addon.text));    
    let addonImageBoxWidth = $derived(typeof addonImageStyle.addonImageBoxWidth !== 'undefined' ? addonImageStyle.addonImageBoxWidth : 50);
    let multiChoiceCounter = $derived.by(() => {
        if (addon.hideMultipleCounter) {
            return isEnabled;
        }

        return true;
    });
    
    let addonBackground = $derived.by(() => {
        let useDesign = addonStyle.useAddonDesign; 
        let suffix = (useDesign ? addonStyle.addonBorderRadiusIsPixels : objectStyle.objectBorderRadiusIsPixels) ? 'px' : '%';
        const bgStyles: BgStyles = {};
        const filters: Filters = {};

        if (useDesign) {
            if (addonStyle.addonBorderImage) {
                bgStyles.borderImage = `border-image: url('${addonStyle.addonBorderImage}') ${addonStyle.addonBorderImageSliceTop} ${addonStyle.addonBorderImageSliceRight} ${addonStyle.addonBorderImageSliceBottom} ${addonStyle.addonBorderImageSliceLeft} / ${addonStyle.addonBorderImageWidth}px ${addonStyle.addonBorderImageRepeat}; border-style: solid; padding: ${addonStyle.addonBorderImageWidth}px;`;
            }
            if (addonStyle.useAddonBackgroundImage && addonStyle.addonBackgroundImage) {
                bgStyles.bgImage = `background-image: url('${addonStyle.addonBackgroundImage}'); ${addonStyle.isObjectBackgroundRepeat? 'background-repeat: repeat;' : (addonStyle.isObjectBackgroundFitIn ? 'background-size: 100% 100%;' : 'background-size: cover;')}`;
            }
            if (addonStyle.addonBgColorIsOn) {
                bgStyles.bgColor = `background-color: ${hexToRgba(addonStyle.addonBgColor)};`;
            }
            bgStyles.margin = `margin: ${addonStyle.addonMargin}px;`;
            bgStyles.borderRadius = `border-radius: ${addonStyle.addonBorderRadiusTopLeft}${suffix} ${addonStyle.addonBorderRadiusTopRight}${suffix} ${addonStyle.addonBorderRadiusBottomRight}${suffix} ${addonStyle.addonBorderRadiusBottomLeft}${suffix};`;
            if (addonStyle.addonOverflowIsOn) {
                bgStyles.overflow = `overflow: hidden;`;
            }
            if (addonStyle.addonBorderIsOn) {
                bgStyles.border = `border: ${addonStyle.addonBorderWidth}px ${addonStyle.addonBorderStyle} ${hexToRgba(addonStyle.addonBorderColor)};`;
            }
            if (addonStyle.addonGradientIsOn) {
                bgStyles.bgImage = `background-image: linear-gradient(${addonStyle.addonGradient});`;
            }
            if (addonStyle.addonDropShadowIsOn) {
                if (addonStyle.addonUseBoxShadowIsOn) {
                    bgStyles.boxShadow = `box-shadow: ${addonStyle.addonDropShadowH}px ${addonStyle.addonDropShadowV}px ${addonStyle.addonDropShadowBlur}px ${addonStyle.addonDropShadowSpread}px ${hexToRgba(addonStyle.addonDropShadowColor)};`;
                } else {
                    filters.dropShadow = ` drop-shadow(${addonStyle.addonDropShadowH}px ${addonStyle.addonDropShadowV}px ${addonStyle.addonDropShadowBlur}px ${hexToRgba(addonStyle.addonDropShadowColor)})`;
                }
            }
        }
        if (isEnabled) {
            if (addonEnabled) {
                if (addon.isActive || isActive && !addon.isSelectable) {
                    if (useDesign) {
                        if (filterStyle.selBorderColorIsOn) {
                            bgStyles.border = `border: ${addonStyle.addonBorderWidth}px ${addonStyle.addonBorderStyle} ${hexToRgba(filterStyle.selFilterBorderColor)};`;
                        }
                        if (addonStyle.addonGradientIsOn) {
                            bgStyles.bgImage = `background-image: linear-gradient(${addonStyle.addonGradientOnSelect});`;
                        }
                    } else if (addon.isSelectable) {
                        if (filterStyle.selBorderColorIsOn) {
                            bgStyles.border = `border: ${objectStyle.objectBorderWidth}px ${objectStyle.objectBorderStyle} ${hexToRgba(filterStyle.selFilterBorderColor)};`;
                        }
                        if (objectStyle.objectGradientIsOn) {
                            bgStyles.bgImage = `background-image: linear-gradient(${objectStyle.objectGradientOnSelect});`;
                        }
                    }
                    if (filterStyle.selBgColorIsOn) {
                        bgStyles.bgColor = `background-color: ${hexToRgba(filterStyle.selFilterBgColor)};`;
                    }
                    if (filterStyle.selFilterBlurIsOn) {
                        filters.blur = ` blur(${filterStyle.selFilterBlur}px)`;
                    }
                    if (filterStyle.selFilterBrightIsOn) {
                        filters.brightness = ` brightness(${filterStyle.selFilterBright}%)`;
                    }
                    if (filterStyle.selFilterContIsOn) {
                        filters.contrast = ` contrast(${filterStyle.selFilterCont}%)`;
                    }
                    if (filterStyle.selFilterGrayIsOn) {
                        filters.grayscale = ` grayscale(${filterStyle.selFilterGray}%)`;
                    }
                    if (filterStyle.selFilterHueIsOn) {
                        filters.hueRotate = ` hue-rotate(${filterStyle.selFilterHue}deg)`;
                    }
                    if (filterStyle.selFilterInvertIsOn) {
                        filters.invert = ` invert(${filterStyle.selFilterInvert}%)`;
                    }
                    if (filterStyle.selFilterOpacIsOn) {
                        filters.opacity = ` opacity(${filterStyle.selFilterOpac}%)`;
                    }
                    if (filterStyle.selFilterSaturIsOn) {
                        filters.saturate = ` saturate(${filterStyle.selFilterSatur})`;
                    }
                    if (filterStyle.selFilterSepiaIsOn) {
                        filters.sepia = ` sepia(${filterStyle.selFilterGray}%)`;
                    }
                } else {
                    if (objectStyle.objectGradientIsOn && addon.isSelectable) {
                        bgStyles.bgImage = `background-image: linear-gradient(${objectStyle.objectGradient});`;
                    }
                    if (filterStyle.unselFilterBlurIsOn) {
                        filters.blur = ` blur(${filterStyle.unselFilterBlur}px)`;
                    }
                    if (filterStyle.unselFilterBrightIsOn) {
                        filters.brightness = ` brightness(${filterStyle.unselFilterBright}%)`;
                    }
                    if (filterStyle.unselFilterContIsOn) {
                        filters.contrast = ` contrast(${filterStyle.unselFilterCont}%)`;
                    }
                    if (filterStyle.unselFilterGrayIsOn) {
                        filters.grayscale = ` grayscale(${filterStyle.unselFilterGray}%)`;
                    }
                    if (filterStyle.unselFilterHueIsOn) {
                        filters.hueRotate = ` hue-rotate(${filterStyle.unselFilterHue}deg)`;
                    }
                    if (filterStyle.unselFilterInvertIsOn) {
                        filters.invert = ` invert(${filterStyle.unselFilterInvert}%)`;
                    }
                    if (filterStyle.unselFilterOpacIsOn) {
                        filters.opacity = ` opacity(${filterStyle.unselFilterOpac}%)`;
                    }
                    if (filterStyle.unselFilterSaturIsOn) {
                        filters.saturate = ` saturate(${filterStyle.unselFilterSatur})`;
                    }
                    if (filterStyle.unselFilterSepiaIsOn) {
                        filters.sepia = ` sepia(${filterStyle.unselFilterGray}%)`;
                    }
                }
            } else {
                if (useDesign) {
                    if (filterStyle.reqBorderColorIsOn) {
                        bgStyles.border = `border: ${addonStyle.addonBorderWidth}px ${addonStyle.addonBorderStyle} ${hexToRgba(filterStyle.reqFilterBorderColor)};`;
                    }
                    if (addonStyle.addonGradientIsOn) {
                        bgStyles.bgImage = `background-image: linear-gradient(${addonStyle.addonGradientOnReq});`;
                    }
                } else if (addon.isSelectable) {
                    if (filterStyle.reqBorderColorIsOn) {
                        bgStyles.border = `border: ${objectStyle.objectBorderWidth}px ${objectStyle.objectBorderStyle} ${hexToRgba(filterStyle.reqFilterBorderColor)};`;
                    }
                    if (objectStyle.objectGradientIsOn) {
                        bgStyles.bgImage = `background-image: linear-gradient(${objectStyle.objectGradientOnReq});`;
                    }
                }
                if (filterStyle.reqBgColorIsOn) {
                    bgStyles.bgColor = `background-color: ${hexToRgba(filterStyle.reqFilterBgColor)};`;
                }
                if (filterStyle.reqFilterBlurIsOn) {
                    filters.blur = ` blur(${filterStyle.reqFilterBlur}px)`;
                }
                if (filterStyle.reqFilterBrightIsOn) {
                    filters.brightness = ` brightness(${filterStyle.reqFilterBright}%)`;
                }
                if (filterStyle.reqFilterContIsOn) {
                    filters.contrast = ` contrast(${filterStyle.reqFilterCont}%)`;
                }
                if (filterStyle.reqFilterGrayIsOn) {
                    filters.grayscale = ` grayscale(${filterStyle.reqFilterGray}%)`;
                }
                if (filterStyle.reqFilterHueIsOn) {
                    filters.hueRotate = ` hue-rotate(${filterStyle.reqFilterHue}deg)`;
                }
                if (filterStyle.reqFilterInvertIsOn) {
                    filters.invert = ` invert(${filterStyle.reqFilterInvert}%)`;
                }
                if (filterStyle.reqFilterOpacIsOn) {
                    filters.opacity = ` opacity(${filterStyle.reqFilterOpac}%)`;
                }
                if (filterStyle.reqFilterSaturIsOn) {
                    filters.saturate = ` saturate(${filterStyle.reqFilterSatur})`;
                }
                if (filterStyle.reqFilterSepiaIsOn) {
                    filters.sepia = ` sepia(${filterStyle.reqFilterGray}%)`;
                }
            }
        }
        if (Object.keys(filters).length > 0) {
            bgStyles.filter = `filter:${Object.values(filters).join('')};`;
        }

        return Object.values(bgStyles).join(' ');
    });

    let addonTitle = $derived.by(() => {
        let styles: string[] = [];

        styles.push(`white-space: pre-line; font-family: '${textStyle.addonTitle}'; font-size: ${textStyle.addonTitleTextSize}%; text-align: ${textStyle.addonTitleAlign};`);
        if (!isEnabled && filterStyle.reqATitleColorIsOn) {
            styles.push(`color: ${hexToRgba(filterStyle.reqFilterATitleColor)};`);
        } else if ((addon.isActive || isActive && !addon.isSelectable) && filterStyle.selATitleColorIsOn) {
            styles.push(`color: ${hexToRgba(filterStyle.selFilterATitleColor)};`);
        } else {
            styles.push(`color: ${hexToRgba(textStyle.addonTitleColor)};`);
        }
        if (addonStyle.useAddonDesign) {
            if (addonStyle.titlePaddingIsOn) {
                styles.push(`padding: ${addonStyle.addonTextPadding}px;`);
            }
        } else if (objectStyle.titlePaddingIsOn) {
            styles.push(`padding: ${objectStyle.objectTextPadding}px;`);
        }

        return styles.join(' ');
    });

    let addonText = $derived.by(() => {
        let styles: string[] = [];

        styles.push(`white-space: pre-wrap; font-family: '${textStyle.addonText}'; text-align: ${textStyle.addonTextAlign}; font-size: ${textStyle.addonTextTextSize}%;`);
        if (!isEnabled && filterStyle.reqATextColorIsOn) {
            styles.push(`color: ${hexToRgba(filterStyle.reqFilterATextColor)};`);
        } else if ((addon.isActive || isActive && !addon.isSelectable) && filterStyle.selATextColorIsOn) {
            styles.push(`color: ${hexToRgba(filterStyle.selFilterATextColor)};`);
        } else {
            styles.push(`color: ${hexToRgba(textStyle.addonTextColor)};`);
        }
        if (addonStyle.useAddonDesign) {
            styles.push(`padding: ${addonStyle.addonTextPadding}px;`);
        } else {
            styles.push(`padding: ${objectStyle.objectTextPadding}px;`);
        }

        return styles.join(' ');
    });

    let addonImage = $derived.by(() => {
        let styles: string[] = [];
        let useDesign = addonImageStyle.useAddonImage;
        let suffix = (useDesign ? addonImageStyle.addonImgBorderRadiusIsPixels : objectImageStyle.objectImgBorderRadiusIsPixels) ? 'px' : '%';

        if (useDesign) {
            styles.push(`width: ${addonImageStyle.addonImageWidth}%; margin-top: ${addonImageStyle.addonImageMarginTop}%; margin-bottom: ${addonImageStyle.addonImageMarginBottom}%;`);
            if (addonImageStyle.addonImgObjectFillIsOn) {
                styles.push(`object-fit: ${addonImageStyle.addonImgObjectFillStyle};`);
                const imgHeight = choice.addonImgObjectFillHeight || objectImageStyle.addonImgObjectFillHeight;
                if (imgHeight) {
                    styles.push(`height: ${imgHeight}px`);
                }
            }
            styles.push(`border-radius: ${addonImageStyle.addonImgBorderRadiusTopLeft}${suffix} ${addonImageStyle.addonImgBorderRadiusTopRight}${suffix} ${addonImageStyle.addonImgBorderRadiusBottomRight}${suffix} ${addonImageStyle.addonImgBorderRadiusBottomLeft}${suffix};`);
            if (addonImageStyle.addonImgOverflowIsOn) {
                styles.push(`overflow: hidden;`);
            }
            if (addonImageStyle.addonImgBorderIsOn) {
                const borderColor = isEnabled ? ((addon.isActive || isActive && !addon.isSelectable) && filterStyle.selImgBorderColorIsOn && filterStyle.selFilterImgBorderColor) || addonImageStyle.addonImgBorderColor : (filterStyle.reqImgBorderColorIsOn && filterStyle.reqFilterImgBorderColor) || addonImageStyle.addonImgBorderColor;
                styles.push(`border: ${addonImageStyle.addonImgBorderWidth}px ${addonImageStyle.addonImgBorderStyle} ${hexToRgba(borderColor)};`);
            }
        } else {
            styles.push(`width: ${objectImageStyle.objectImageWidth}%; margin-top: ${objectImageStyle.objectImageMarginTop}%; margin-bottom: ${objectImageStyle.objectImageMarginBottom}%;`);
            if (objectImageStyle.objectImgObjectFillIsOn) {
                styles.push(`object-fit: ${objectImageStyle.objectImgObjectFillStyle};`);
                const imgHeight = row?.objectImgObjectFillHeight || objectImageStyle.objectImgObjectFillHeight;
                if (imgHeight) {
                    styles.push(`height: ${imgHeight}px;`);
                }
            }
            styles.push(`border-radius: ${objectImageStyle.objectImgBorderRadiusTopLeft}${suffix} ${objectImageStyle.objectImgBorderRadiusTopRight}${suffix} ${objectImageStyle.objectImgBorderRadiusBottomRight}${suffix} ${objectImageStyle.objectImgBorderRadiusBottomLeft}${suffix};`);
            if (objectImageStyle.objectImgOverflowIsOn) {
                styles.push(`overflow: hidden;`);
            }
            if (objectImageStyle.objectImgBorderIsOn) {
                const borderColor = isEnabled ? ((addon.isActive || isActive && !addon.isSelectable) && filterStyle.selImgBorderColorIsOn && filterStyle.selFilterImgBorderColor) || objectImageStyle.objectImgBorderColor : (filterStyle.reqImgBorderColorIsOn && filterStyle.reqFilterImgBorderColor) || objectImageStyle.objectImgBorderColor;
                styles.push(`border: ${objectImageStyle.objectImgBorderWidth}px ${objectImageStyle.objectImgBorderStyle} ${hexToRgba(borderColor)};`);
            }
        }

        return styles.join(' ');
    });

    let scoreText = $derived.by(() => {
        let style: string[] = [];

        style.push(`font-family: '${textStyle.scoreText}'; font-size: ${textStyle.scoreTextSize}%; text-align: ${textStyle.scoreTextAlign};`);
        if (!isEnabled) {
            if (filterStyle.reqScoreTextColorIsOn)  {
                style.push(`color: ${hexToRgba(filterStyle.reqFilterSTextColor)}`);
            }
        } else if (addon.isActive || isActive && !addon.isSelectable) {
            if (filterStyle.selScoreTextColorIsOn) {
                style.push(`color: ${hexToRgba(filterStyle.selFilterSTextColor)}`);
            }
        } else {
            style.push(`color: ${hexToRgba(textStyle.scoreTextColor)};`);
        }

        return style.join(' ');
    });

    function addonWidthClass() {
        let addonWidth = (addon.addonWidth || 'col-12');
        let addonWidthNum = objectWidthToNum(addonWidth);
        let objectsPerRowNum = app.objectsPerRow === 'col-6' ? 2 : app.objectsPerRow === 'col-4' ? 3 : 4;
        if ($winWidth > 1280) {
            return addonWidth;
        } else if ($winWidth > 720) {
            switch(addonWidthNum) {
                case 1: return 'col-12';
                case 2: return 'col-6';
                case 3: return objectsPerRowNum > 2 ? 'col-4' : app.objectsPerRow;
                case 4: return objectsPerRowNum > 3 ? 'col-3' : app.objectsPerRow;
                default: return app.objectsPerRow;
            }
        } else if ($winWidth > 480) {
            return addonWidthNum === 1 ? 'col-12' : 'col-6';
        } else {
            return 'col-12';
        }
    }

    function copyAddon() {
        if (typeof app.tmpAddon === 'undefined') app.tmpAddon = [];
        app.tmpAddon.length = 0;
        app.tmpAddon.push(JSON.parse(JSON.stringify(addon)));
        snackbarVariables.labelText = 'Copied to clipboard.';
        snackbarVariables.isOpen = true;
    }
    
    function moveAddonUp() {
        if (typeof choice !== 'undefined' && typeof index !== 'undefined' && index > 0) {
            choice.addons.splice(index - 1, 2, choice.addons[index], choice.addons[index - 1]);
        }
    }

    function moveAddonDown() {
        if (typeof choice !== 'undefined' && typeof index !== 'undefined' && index < choice.addons.length - 1) {
            choice.addons.splice(index, 2, choice.addons[index + 1], choice.addons[index]);
        }
    }

    function copyTooltip(e: Event) {
        navigator.clipboard.writeText(addon.imageSourceTooltip).then(() => {
            snackbarVariables.labelText = 'Tooltip copied to clipboard.';
            snackbarVariables.isOpen = true;
        }).catch(() => {
            console.log(addon.imageSourceTooltip);
            snackbarVariables.labelText = 'Tooltip text logged to developer console.';
            snackbarVariables.isOpen = true;
        });
    }

    function toggleSelectable() {
        if (addon.isSelectable) {
            const idx = choice.addons.indexOf(addon);
            addon.id = generateObjectId(0, app.objectIdLength, true);
            addon.scores = [];
            
            choiceMap.set(addon.id, {choice: choice.addons[idx] as SelectableAddon, row: row});
        } else {
            for (let i = 0; i < selectableAddonItems.length; i++) {
                const item = selectableAddonItems[i];
                delete addon[item];
            }

            choiceMap.delete(addon.id);
            addon.id = '';
        }
    }

    function createNewScore() {
        if (!addon.scores) addon.scores = [];
        addon.scores.push({
            idx: generateScoreId(0, 5),
            id: '',
            value: 0,
            type: '',
            requireds: [],
            beforeText: app.defaultBeforePoint,
            afterText: app.defaultAfterPoint,
            showScore: app.defaultUseShowScore
        });
    }

    function changeAddonId() {
        if (addon.id === '') {
            addon.id = addonId
        } else {
            if (addon.id !== addonId) {
                addon.id = checkDupId(addon.id, choiceMap);
                choiceMap.set(addon.id, {choice: addon as SelectableAddon, row: row});
                choiceMap.delete(addonId);
                addonId = addon.id;
            }
        }
    }

    function activateObject(localChoice: SelectableAddon, localRow: Row, e?: MouseEvent, isManually: boolean = false) {
        const target = e && e.target ? e.target as HTMLElement : null
        let origRow = localRow;

        options.isOverDlg = false;
        options.isOverImg = false;

        if (localRow.isResultRow || localRow.isGroupRow) {
            const cMap = choiceMap.get(localChoice.id);

            if (typeof cMap !== 'undefined') {
                origRow = cMap.row;
            }
        }

        if (localChoice.isSelectableMultiple) {
            if (localChoice.id === addon.id && localChoice.allowSelectByClick && localChoice.multipleUseVariable === 0) {
                if (target) {
                    if (closestByClassPrefix(target, 'multi-', 'addon-')) return;
                }

                selectedOneMore(localChoice, origRow, options);
            }
        } else {
            if (checkRequirements(localChoice.requireds) && !localRow.isInfoRow && (!isManually || !localChoice.isNotSelectable) && !localChoice.forcedActivated) {
                if (localChoice.isActive) {
                    if (!localChoice.selectOnce) deselectObject(localChoice, origRow, options);
                } else {
                    selectObject(localChoice, origRow, options);
                }
            }
        }
    }
</script>