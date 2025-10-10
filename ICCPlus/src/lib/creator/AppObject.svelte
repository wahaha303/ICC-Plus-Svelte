{#if bCreatorMode && (row.isEditModeOn || choice.isEditModeOn) && !row.isResultRow && !row.isGroupRow}
    <div class={objectWidthClass()}>
        <div bind:clientWidth={width} class:position-relative={app.useChoiceEditBtn && !row.isEditModeOn && choice.isEditModeOn} class="container-fluid gx-0">
            {#if app.useChoiceEditBtn && !row.isEditModeOn && choice.isEditModeOn}
                <div class="choice-edit-button__edit-mode">
                    <IconButton onclickcapture={() => delete choice.isEditModeOn} size="button"><i class="mdi mdi-wrench"></i></IconButton>
                </div>
            {/if}
            <Card class="mx-1 my-2">
                <CardContent class="p-0">
                    <div class="toolbar justify-space-around">
                        {#each choiceToolbarButtons as choiceButton}
                            <Wrapper text={choiceButton.text}>
                                <IconButton onclickcapture={choiceButton.action} oncontextmenu={choiceButton.contextAction}><i class={choiceButton.icon}></i></IconButton>
                            </Wrapper>
                        {/each}
                    </div>
                    {#if row.isWeightedRandom}
                        <div class="col-12">
                            <Textfield bind:value={() => choice.randomWeight ?? 100, (e) => choice.randomWeight = e} label="Random Weight" variant="filled" type="number" />
                        </div>
                    {/if}
                    <div class="py-3 px-5 col-12">
                        {#if choice.image && !app.hideImages}
                            <button type="button" onclickcapture={() => {dlgVariables.currentDialog = 'appImageUpload', dlgVariables.data = choice, dlgVariables.imgProp = 'image'}} class="btn--image-background">
                                <img src={choice.image} alt="" loading="lazy" class="btn--image" style="max-height: 175px"/>
                            </button>
                        {/if}
                        <Button onclickcapture={() => {dlgVariables.currentDialog = 'appImageUpload', dlgVariables.data = choice, dlgVariables.imgProp = 'image'}} variant="raised">
                            <Label>Change Image</Label>
                        </Button>
                    </div>                    
                    <div class="row g-1 px-2 py-2">
                        <div class="col-12">
                            {#if app.useTextEditor}
                                <Tiptap data={choice} dataProp="title" label="Choice Title" />
                            {:else}
                                <Textfield bind:value={choice.title} label="Choice Title" variant="filled" />
                            {/if}
                        </div>
                    </div>
                    <div class="row gx-1 px-2 pb-3">
                        <div class="col-12">
                            {#if app.useTextEditor}
                                <Tiptap data={choice} dataProp="text" textarea={true} label="Choice Text" />
                            {:else}
                                <Textfield textarea bind:value={choice.text} label="Choice Text" variant="filled" input$rows={5} />
                            {/if}
                        </div>
                    </div>
                    <div class="row g-1 px-2 pb-2">
                        <div class={app.hideChoiceDT ? 'col-12' : col6}>
                            <Textfield bind:value={choice.id} onfocus={() => choiceId = choice.id} onchange={() => changeObjectId()} label="Choice Id" variant="filled" />
                        </div>
                        {#if !app.hideChoiceDT}
                            <div class={col6}>
                                <Textfield bind:value={() => choice.debugTitle ?? '', (e) => choice.debugTitle = e} label="Debug Title" variant="filled" />
                            </div>
                        {/if}
                    </div>
                    <div class="row g-1 px-2 pb-2">
                        <div class={col6}>
                            <Select bind:value={choice.template} label="Template" variant="filled" alwaysFloat={true}>
                                {#each templates as template (template.text)}
                                    <Option value={template.value}>{template.text}</Option>
                                {/each}
                            </Select>
                        </div>
                        <div class={col6}>
                            <Select bind:value={choice.objectWidth} label="Choices Per Row" variant="filled" alwaysFloat={true}>
                                {#each objectWidths as objectWidth (objectWidth.text)}
                                    <Option value={objectWidth.value}>{objectWidth.text}</Option>
                                {/each}
                            </Select>
                        </div>
                    </div>
                    <div class="toolbar justify-space-around">
                        {#each choiceBottomToolbarButtons as choiceButton}
                            <Wrapper text={choiceButton.text}>
                                <IconButton onclickcapture={choiceButton.action} oncontextmenu={choiceButton.contextAction}><i class={choiceButton.icon}></i></IconButton>
                            </Wrapper>
                        {/each}
                    </div>
                    <Accordion>
                    {#if choice.scores.length > 0}                        
                        <Panel class="bordered-panel {panelScore ? 'on-top' : ''}" bind:open={panelScore} variant="unelevated" conditionalRender={true}>
                            <Header class="p-0">
                                Scores: {choice.scores.length}
                            </Header>
                            <AcdContent style="overflow:visible">
                                {#if panelScore}
                                <div class="row gy-4">
                                    {#each choice.scores as score, i}
                                        <div class="col-12 p-0">
                                            <ObjectScore score={score} choice={choice} isEditModeOn={true} num={i} />
                                            <Button onclickcapture={() => {choice.scores.splice(i, 1); scoreSet.delete(score.idx)}} class="w-100 mt-1" variant="raised">
                                                <Label>Delete</Label>
                                            </Button>
                                        </div>
                                    {/each}
                                </div>
                                {/if}
                            </AcdContent>
                        </Panel>
                    {/if}
                    {#if choice.addons.length > 0}
                        <Panel class="bordered-panel {panelAddon ? 'on-top' : ''}" bind:open={panelAddon} variant="unelevated" conditionalRender={true}>
                            <Header class="p-0">
                                Addons: {choice.addons.length}
                            </Header>
                            <AcdContent style="overflow:visible">
                                {#if panelAddon}
                                <div class="row gy-4">
                                    <Wrapper text="Applies only when the choice image template is left or right." innerClass="mt-3">
                                        <FormField class="col-12 p-0">
                                            <Checkbox bind:checked={() => choice.useSeperateAddon ?? false, (e) => choice.useSeperateAddon = e} onchange={() => {
                                                if (!choice.useSeperateAddon) {
                                                    delete choice.useSeperateAddon;
                                                }
                                            }} />
                                            {#snippet label()}
                                                Use Seperate Layout
                                            {/snippet}
                                        </FormField>
                                    </Wrapper>
                                    <div class="col-12 p-0 mt-0">
                                        <Select bind:value={choice.addonJustify} label="Addon Justify" variant="filled">
                                            {#each justifies as justify}
                                                <Option value={justify}>{justify}</Option>
                                            {/each}
                                        </Select>
                                    </div>
                                    {#each choice.addons as addon, i}
                                        <div class="col-12 p-0">
                                            <ObjectAddon choice={choice} addon={addon} isEditModeOn={true} index={i} />
                                            <Button onclickcapture={() => choice.addons.splice(i, 1)} class="w-100 mt-1" variant="raised">
                                                <Label>Delete</Label>
                                            </Button>
                                        </div>
                                    {/each}
                                </div>
                                {/if}
                            </AcdContent>
                        </Panel>
                    {/if}
                    {#if choice.requireds.length > 0}
                        <Panel class="bordered-panel {panelReq ? 'on-top' : ''}" bind:open={panelReq} variant="unelevated" conditionalRender={true}>
                            <Header class="p-0">
                                Requirements: {choice.requireds.length}
                            </Header>
                            <AcdContent style="overflow:visible">
                                {#if panelReq}
                                <div class="row">
                                    {#each choice.requireds as req, i}
                                        <div class="{req.requireds.length > 0 ? 'col-12' : reqCol} p-2">
                                            <ObjectRequired required={req} isEditModeOn={true} data={choice} index={i} />
                                            <Button onclickcapture={() => choice.requireds.splice(i, 1)} class="w-100 mt-1" variant="raised">
                                                <Label>Delete</Label>
                                            </Button>
                                        </div>
                                    {/each}
                                </div>
                                {/if}
                            </AcdContent>
                        </Panel>
                    {/if}
                    {#if choice.groups.length > 0}
                        <Panel class="bordered-panel {panelGroup ? 'on-top' : ''}" bind:open={panelGroup} variant="unelevated" conditionalRender={true}>
                            <Header class="p-0">
                                Groups: {choice.groups.length}
                            </Header>
                            <AcdContent style="overflow:visible">
                                {#if panelGroup}
                                <div class="row">
                                    {#each choice.groups, i}
                                        <div class="col-12 p-0 pb-2">
                                            <ObjectGroup choice={choice} index={i} />
                                            <Button onclickcapture={() => deleteGroup(i)} class="w-100 mt-1" variant="raised">
                                                <Label>Delete</Label>
                                            </Button>
                                        </div>
                                    {/each}
                                </div>
                                {/if}
                            </AcdContent>
                        </Panel>
                    {/if}
                    <Panel class="bordered-panel" variant="unelevated">
                        <Header class="p-0">
                            Functions:
                        </Header>
                        <AcdContent class="p-0">
                            <Accordion class="p-0">
                                <Panel class="bordered-panel" bind:open={panel01} variant="unelevated" conditionalRender={true}>
                                    <Header class="p-0">
                                        - This Choice
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
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => choice.isSelectableMultiple ?? false, (e) => choice.isSelectableMultiple = e} onchange={() => {
                                                    if (choice.isSelectableMultiple) {
                                                        choice.numMultipleTimesMinus = 0;
                                                        choice.numMultipleTimesPluss = 0;
                                                        choice.initMultipleTimesMinus = 0;
                                                        choice.isMultipleUseVariable = true;
                                                    } else {
                                                        delete choice.isSelectableMultiple;
                                                        delete choice.isMultipleUseVariable;
                                                        delete choice.multipleScoreId;
                                                        delete choice.hideMultipleCounter;
                                                        delete choice.numMultipleTimesMinus;
                                                        delete choice.numMultipleTimesPluss;
                                                        delete choice.initMultipleTimesMinus;
                                                        delete choice.allowSelectByClick;
                                                        delete choice.useSlider;
                                                        delete choice.hideCounter;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Can Be Selected Multiple Times
                                                {/snippet}
                                            </FormField>
                                            {#if choice.isSelectableMultiple}
                                                <Wrapper innerClass="m-0 p-0" text="Disabling this checkbox will make most features unavailable.">
                                                    <FormField class="col-12 m-1 p-0">
                                                        <Checkbox bind:checked={() => choice.isMultipleUseVariable ?? false, (e) => choice.isMultipleUseVariable = e} onchange={() => {
                                                            if (choice.isMultipleUseVariable) {
                                                                delete choice.multipleScoreId;
                                                            } else {
                                                                delete choice.isMultipleUseVariable;
                                                            }
                                                        }} />
                                                        {#snippet label()}
                                                            Use a Simple Variable
                                                        {/snippet}
                                                    </FormField>
                                                </Wrapper>
                                                <FormField class="col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => choice.allowSelectByClick ?? false, (e) => choice.allowSelectByClick = e} onchange={() => {
                                                        if (!choice.allowSelectByClick) delete choice.allowSelectByClick;
                                                    }} />
                                                    {#snippet label()}
                                                        Allow First Selection by Clicking the Choice
                                                    {/snippet}
                                                </FormField>
                                                {#if choice.allowSelectByClick}
                                                    <FormField class="col-12 m-1 p-0">
                                                        <Checkbox bind:checked={() => choice.hideCounterUntilSelect ?? false, (e) => choice.hideCounterUntilSelect = e} onchange={() => {
                                                            if (!choice.hideCounterUntilSelect) delete choice.hideCounterUntilSelect;
                                                        }} />
                                                        {#snippet label()}
                                                            Hide Counter Until First Selection
                                                        {/snippet}
                                                    </FormField>
                                                {/if}
                                                <FormField class="col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => choice.hideMultipleCounter ?? false, (e) => choice.hideMultipleCounter = e} onchange={() => {
                                                        if (!choice.hideMultipleCounter) delete choice.hideMultipleCounter;
                                                    }} />
                                                    {#snippet label()}
                                                        Hide Counter if Requirement Is Missing
                                                    {/snippet}
                                                </FormField>
                                                <FormField class="col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => choice.useSlider ?? false, (e) => choice.useSlider = e} onchange={() => {
                                                        if (!choice.useSlider) {
                                                            delete choice.useSlider;
                                                            delete choice.hideCounter;
                                                        }
                                                    }} />
                                                    {#snippet label()}
                                                        Enable Slider for Selection
                                                    {/snippet}
                                                </FormField>
                                                {#if choice.useSlider}
                                                    <FormField class="col-12 m-1 p-0">
                                                        <Checkbox bind:checked={() => choice.hideCounter ?? false, (e) => choice.hideCounter = e} onchange={() => {
                                                            if (!choice.hideCounter) {
                                                                delete choice.hideCounter;
                                                            }
                                                        }} />
                                                        {#snippet label()}
                                                            Hide Counter Completely
                                                        {/snippet}
                                                    </FormField>
                                                {/if}
                                                {#if !choice.isMultipleUseVariable}
                                                    <div class="col-12 m-1">The point type used here should only be used for this choice.</div>
                                                    <div class="col-12 m-1 px-2">
                                                        <Autocomplete
                                                            options={getPointTypes()}
                                                            getOptionLabel={getPointTypeLabel}
                                                            bind:value={choice.multipleScoreId}
                                                            label="Point Type"
                                                            toggle={true}
                                                            showMenuWithNoInput={true}
                                                            textfield$variant="filled"
                                                            class="w-100 p-0"
                                                        />
                                                    </div>
                                                {/if}
                                                <div class="col-12 m-1 px-2">
                                                    <Wrapper text="Some features may not work properly if this value is set below 0.">
                                                        <Textfield bind:value={() => choice.numMultipleTimesMinus ?? 0, (e) => choice.numMultipleTimesMinus = e} onchange={() => choice.initMultipleTimesMinus = choice.numMultipleTimesMinus} label="Number at which the minus stops working" type="number" variant="filled" />
                                                    </Wrapper>
                                                    <Textfield bind:value={() => choice.numMultipleTimesPluss ?? 0, (e) => choice.numMultipleTimesPluss = e} label="Number at which the plus stops working" type="number" variant="filled" />
                                                </div>
                                                <div class="b-line"></div>
                                            {/if}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => choice.isNotSelectable ?? false, (e) => choice.isNotSelectable = e} onchange={() => {
                                                    if (!choice.isNotSelectable) delete choice.isNotSelectable;
                                                }} />
                                                {#snippet label()}
                                                    Cannot Be Selected Manually
                                                {/snippet}
                                            </FormField>
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => choice.selectOnce ?? false, (e) => choice.selectOnce = e} onchange={() => {
                                                    if (!choice.selectOnce) delete choice.selectOnce;
                                                }} />
                                                {#snippet label()}
                                                    Cannot Be Deselected Manually
                                                {/snippet}
                                            </FormField>
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => choice.notDeselectedByClean ?? false, (e) => choice.notDeselectedByClean = e} onchange={() => {
                                                    if (!choice.notDeselectedByClean) {
                                                        delete choice.notDeselectedByClean;
                                                        delete choice.activateAfterReset;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Cannot Be Reset Manually
                                                {/snippet}
                                            </FormField>
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => choice.isNotResult ?? false, (e) => choice.isNotResult = e} onchange={() => {
                                                    if (!choice.isNotResult) delete choice.isNotResult;
                                                }} />
                                                {#snippet label()}
                                                    Cannot Be Shown in Result Row
                                                {/snippet}
                                            </FormField>
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => choice.isImageUpload ?? false, (e) => choice.isImageUpload = e} onchange={() => {
                                                    if (!choice.isImageUpload) delete choice.isImageUpload;
                                                }} />
                                                {#snippet label()}
                                                    Allows the Player to Upload Image
                                                {/snippet}
                                            </FormField>
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => choice.isSelectDelayed ?? false, (e) => choice.isSelectDelayed = e} onchange={() => {
                                                    if (choice.isSelectDelayed) {
                                                        choice.selectDelayTime = 1000;
                                                    } else {
                                                        delete choice.isSelectDelayed;
                                                        delete choice.selectDelayTime;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Will Be Selected After a Delay
                                                {/snippet}
                                            </FormField>
                                            {#if choice.isSelectDelayed}
                                                <div class="col-12 m-1">Do not use this feature unless you know exactly what you're doing. User interactions during the delay may cause unexpected issues.</div>
                                                <div class="col-12 m-1 px-2">
                                                    <Textfield bind:value={() => choice.selectDelayTime ?? 0, (e) => choice.selectDelayTime = e} label="Delay" type="number" suffix="ms" variant="filled" />
                                                </div>
                                            {/if}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => choice.showScoreInAddon ?? false, (e) => choice.showScoreInAddon = e} onchange={() => {
                                                    if (!choice.showScoreInAddon) {
                                                        delete choice.showScoreInAddon;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Show Scores in First Visible Addon
                                                {/snippet}
                                            </FormField>
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => choice.showReqInAddon ?? false, (e) => choice.showReqInAddon = e} onchange={() => {
                                                    if (!choice.showReqInAddon) {
                                                        delete choice.showReqInAddon;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Show Requirements in First Visible Addon
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
                                        <div class="row gy-3">
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => choice.cleanACtivatedOnSelect ?? false, (e) => choice.cleanACtivatedOnSelect = e} onchange={() => {
                                                    if (!choice.cleanACtivatedOnSelect) delete choice.cleanACtivatedOnSelect;
                                                }} />
                                                {#snippet label()}
                                                    Clear All Selected Choices
                                                {/snippet}
                                            </FormField>
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => choice.activateOtherChoice ?? false, (e) => choice.activateOtherChoice = e} onchange={() => {
                                                    if (!choice.activateOtherChoice) {
                                                        delete choice.activateOtherChoice;
                                                        delete choice.isNotDeactivate;
                                                        delete choice.isAllowDeselect;
                                                        delete choice.isActivateRandom;
                                                        delete choice.numActivateRandom;
                                                        delete choice.activateThisChoice;
                                                        delete choice.activateAfterReset;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Force Other Choices to Be Active
                                                {/snippet}
                                            </FormField>
                                            {#if choice.activateOtherChoice}
                                                <FormField class="col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => choice.isNotDeactivate ?? false, (e) => choice.isNotDeactivate = e} onchange={() => {
                                                        if (!choice.isNotDeactivate) delete choice.isNotDeactivate;
                                                    }} />
                                                    {#snippet label()}
                                                        Keep Other Choices Active when Deselected
                                                    {/snippet}
                                                </FormField>
                                                <FormField class="col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => choice.isAllowDeselect ?? false, (e) => choice.isAllowDeselect = e} onchange={() => {
                                                        if (!choice.isAllowDeselect) {
                                                            delete choice.isAllowDeselect;
                                                            delete choice.activateAfterReset;
                                                        }
                                                    }} />
                                                    {#snippet label()}
                                                        Allow Deselection of Activated Choices
                                                    {/snippet}
                                                </FormField>
                                                {#if choice.isAllowDeselect && choice.notDeselectedByClean}
                                                    <FormField class="col-12 m-1 p-0">
                                                        <Checkbox bind:checked={() => choice.activateAfterReset ?? false, (e) => choice.activateAfterReset = e} onchange={() => {
                                                            if (!choice.activateAfterReset) delete choice.activateAfterReset;
                                                        }} />
                                                        {#snippet label()}
                                                            Activate Choices Again After Reset
                                                        {/snippet}
                                                    </FormField>
                                                {/if}
                                                <FormField class="col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => choice.isNotActiveUnselectable ?? false, (e) => choice.isNotActiveUnselectable = e} onchange={() => {
                                                        if (!choice.isNotActiveUnselectable) delete choice.isNotActiveUnselectable;
                                                    }} />
                                                    {#snippet label()}
                                                        Prevent Activation of Unselectable Choices
                                                    {/snippet}
                                                </FormField>
                                                <FormField class="col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => choice.isActivateRandom ?? false, (e) => choice.isActivateRandom = e} onchange={() => {
                                                        if (!choice.isActivateRandom) delete choice.isActivateRandom;
                                                        else choice.numActivateRandom = 0;
                                                    }} />
                                                    {#snippet label()}
                                                        Activate Choices at Random
                                                    {/snippet}
                                                </FormField>
                                                <div class="col-12 m-1 px-4">
                                                    Using the same ID multiple times may cause issues. You can use comma to activate multiple choices (ID,ID,ID/ON#1).
                                                </div>
                                                <div class="col-12 m-1 px-2">
                                                    {#if choice.isActivateRandom}
                                                        <Textfield bind:value={() => choice.numActivateRandom ?? 0, (e) => choice.numActivateRandom = e} label="Number of choices to activate" type="number" variant="filled" />
                                                    {/if}
                                                    <Textfield bind:value={() => choice.activateThisChoice ?? '', (e) => choice.activateThisChoice = e} label="Choice / Group IDs" variant="filled" />
                                                </div>
                                                <div class="b-line"></div>
                                            {/if}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => choice.deactivateOtherChoice ?? false, (e) => choice.deactivateOtherChoice = e} onchange={() => {
                                                    if (!choice.deactivateOtherChoice) {
                                                        delete choice.deactivateOtherChoice;
                                                        delete choice.deactivateThisChoice;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Deactivate Other Choices
                                                {/snippet}
                                            </FormField>
                                            {#if choice.deactivateOtherChoice}
                                                <div class="col-12 m-1 px-4">
                                                    Using the same ID multiple times may cause issues. You can use comma to activate multiple choices (ID,ID,ID/ON#1).
                                                </div>
                                                <div class="col-12 m-1 px-2">
                                                    <Textfield bind:value={() => choice.deactivateThisChoice ?? '', (e) => choice.deactivateThisChoice = e} label="Choice / Group IDs" variant="filled" />
                                                </div>
                                                <div class="b-line"></div>
                                            {/if}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => choice.discountOther ?? false, (e) => choice.discountOther = e} onchange={() => {
                                                    if (choice.discountOther) {
                                                        choice.discountGroups = [];
                                                        choice.discountPointTypes = [];
                                                        choice.discountValue = 0;
                                                    } else {
                                                        delete choice.discountOther;
                                                        delete choice.discountLowLimitIsOn;
                                                        delete choice.discountLowLimit;
                                                        delete choice.discountShow;
                                                        delete choice.discountBeforeText;
                                                        delete choice.discountAfterText
                                                        delete choice.isDisChoices;
                                                        delete choice.discountGroups;
                                                        delete choice.discountChoices;
                                                        delete choice.discountRows;
                                                        delete choice.discountPointTypes;
                                                        delete choice.discountOperator;
                                                        delete choice.discountValue;
                                                        delete choice.discountTextDuplicated;
                                                        delete choice.replaceScoreText;
                                                        delete choice.hideScoreValue;
                                                        delete choice.hideScoreIcon;
                                                        delete choice.useDiscountCount;
                                                        delete choice.discountCount;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Discount Other Choices
                                                {/snippet}
                                            </FormField>
                                            {#if choice.discountOther}
                                                <FormField class="col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => choice.stackableDiscount ?? false, (e) => choice.stackableDiscount = e} onchange={() => {
                                                        if (!choice.stackableDiscount) delete choice.stackableDiscount;
                                                    }} />
                                                    {#snippet label()}
                                                        Allow Stacking Discounts
                                                    {/snippet}
                                                </FormField>
                                                <FormField class="col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => choice.discountLowLimitIsOn ?? false, (e) => choice.discountLowLimitIsOn = e} onchange={() => {
                                                        if (!choice.discountLowLimitIsOn) {
                                                            delete choice.discountLowLimitIsOn;
                                                            delete choice.discountLowLimit;
                                                        } else {
                                                            choice.discountLowLimit = 0;
                                                        }
                                                    }} />
                                                    {#snippet label()}
                                                        Enable Minimum Score Cap
                                                    {/snippet}
                                                </FormField>
                                                {#if choice.discountLowLimitIsOn}
                                                    <div class="col-12 m-1 px-2">
                                                        <Textfield bind:value={() => choice.discountLowLimit ?? 0, (e) => choice.discountLowLimit = e} label="Score Cap" type="number" variant="filled" />
                                                    </div>
                                                {/if}
                                                <FormField class="col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => choice.discountShow ?? false, (e) => choice.discountShow = e} onchange={() => {
                                                        if (!choice.discountShow) {
                                                            delete choice.discountShow;
                                                            delete choice.discountBeforeText;
                                                            delete choice.discountAfterText;
                                                            delete choice.discountTextDuplicated;
                                                            delete choice.replaceScoreText;
                                                            delete choice.hideScoreValue;
                                                            delete choice.hideScoreIcon;
                                                        }
                                                    }} />
                                                    {#snippet label()}
                                                        Display Discounted Score
                                                    {/snippet}
                                                </FormField>
                                                {#if choice.discountShow}
                                                    <FormField class="col-12 m-1 p-0">
                                                        <Checkbox bind:checked={() => choice.discountTextDuplicated ?? false, (e) => choice.discountTextDuplicated = e} onchange={() => {
                                                            if (!choice.discountTextDuplicated) delete choice.discountTextDuplicated;
                                                        }} />
                                                        {#snippet label()}
                                                            Display Repeated Text Only Once
                                                        {/snippet}
                                                    </FormField>
                                                    <FormField class="col-12 m-1 p-0">
                                                        <Checkbox bind:checked={() => choice.replaceScoreText ?? false, (e) => choice.replaceScoreText = e} onchange={() => {
                                                            if (!choice.replaceScoreText) {
                                                                delete choice.replaceScoreText;
                                                                delete choice.hideScoreValue;
                                                                delete choice.hideScoreIcon;
                                                            } else {
                                                                choice.discountTextDuplicated = true;
                                                            }
                                                        }} />
                                                        {#snippet label()}
                                                            Replace Score Text Completely
                                                        {/snippet}
                                                    </FormField>
                                                    {#if choice.replaceScoreText}
                                                        <FormField class="col-12 m-1 p-0">
                                                            <Checkbox bind:checked={() => choice.hideScoreValue ?? false, (e) => choice.hideScoreValue = e} onchange={() => {
                                                                if (!choice.hideScoreValue) {
                                                                    delete choice.hideScoreValue;
                                                                }
                                                            }} />
                                                            {#snippet label()}
                                                                Hide Score Value
                                                            {/snippet}
                                                        </FormField>
                                                        <FormField class="col-12 m-1 p-0">
                                                            <Checkbox bind:checked={() => choice.hideScoreIcon ?? false, (e) => choice.hideScoreIcon = e} onchange={() => {
                                                                if (!choice.hideScoreIcon) {
                                                                    delete choice.hideScoreIcon;
                                                                }
                                                            }} />
                                                            {#snippet label()}
                                                                Hide Score Icon
                                                            {/snippet}
                                                        </FormField>
                                                        <div class={col6}>
                                                            <Textfield bind:value={() => choice.discountBeforeText ?? '', (e) => choice.discountBeforeText = e} label="Text Before" variant="filled" />
                                                        </div>
                                                        <div class={col6}>
                                                            <Textfield bind:value={() => choice.discountAfterText ?? '', (e) => choice.discountAfterText = e} label="Text After" variant="filled" />
                                                        </div>
                                                    {:else}
                                                        <div class={col6}>
                                                            <Textfield bind:value={() => choice.discountBeforeText ?? '', (e) => choice.discountBeforeText = e} label="Added to Text Before" variant="filled" />
                                                        </div>
                                                        <div class={col6}>
                                                            <Textfield bind:value={() => choice.discountAfterText ?? '', (e) => choice.discountAfterText = e} label="Added to Text After" variant="filled" />
                                                        </div>
                                                    {/if}
                                                {/if}
                                                <FormField class="col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => choice.useDiscountCount ?? false, (e) => choice.useDiscountCount = e} onchange={() => {
                                                        if (choice.useDiscountCount) {
                                                            choice.discountCount = 0;
                                                        } else {
                                                            delete choice.useDiscountCount;
                                                            delete choice.discountCount;
                                                        }
                                                    }} />
                                                    {#snippet label()}
                                                        Specify Number of Choices to Be Discounted
                                                    {/snippet}
                                                </FormField>
                                                {#if choice.useDiscountCount}
                                                    <div class="col-12 m-1 px-2">
                                                        <Textfield bind:value={() => choice.discountCount ?? 0, (e) => choice.discountCount = e} onchange={() => choice.discountCount = Math.max(0, choice.discountCount || 0)} label="Number of choices" type="number" input$min={0} variant="filled" />
                                                    </div>
                                                {/if}
                                                <FormField class="col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => choice.isDisChoices ?? false, (e) => choice.isDisChoices = e} onchange={() => {
                                                        if (choice.isDisChoices) {
                                                            choice.discountChoices = [];
                                                            choice.discountRows = [];
                                                            delete choice.discountGroups;
                                                        } else {
                                                            choice.discountGroups = [];
                                                            delete choice.isDisChoices;
                                                            delete choice.discountChoices;
                                                            delete choice.discountRows;
                                                        }
                                                    }} />
                                                    {#snippet label()}
                                                        Select Individual Choices Instead of Groups
                                                    {/snippet}
                                                </FormField>
                                                {#if choice.isDisChoices}
                                                    <div class="col-12 m-1 px-4">
                                                        Do not select choices that are already included in the selected rows.
                                                    </div>
                                                {/if}
                                                <div class="col-12 m-1 px-2">
                                                    {#if choice.isDisChoices}
                                                        <CustomChipInput acValue={choice.discountRows ?? []} acOptions={isBackpack ? getBackpackRows() : getRows()} inputLabel="Rows to apply discount" getLabel={getRowLabel} selectProp={choice} />
                                                        <CustomChipInput acValue={choice.discountChoices ?? []} acOptions={isBackpack ? getBackpackChoices() : getChoices()} inputLabel="Choices to apply discount" getLabel={getChoiceLabel} selectProp={choice} />
                                                    {:else}
                                                        <CustomChipInput acValue={choice.discountGroups ?? []} acOptions={getGroups()} inputLabel="Groups to apply discount" getLabel={getGroupLabel} selectProp={choice} />
                                                    {/if}
                                                    <CustomChipInput acValue={choice.discountPointTypes ?? []} acOptions={getPointTypes()} inputLabel="Point Types to apply discount" getLabel={getPointTypeLabel} selectProp={choice} />
                                                </div>
                                                <div class={col6}>
                                                    <Select bind:value={choice.discountOperator} label="Operator" variant="filled">
                                                        {#each discountOperators as operator (operator.text)}
                                                            <Option value={operator.value}>{operator.text}</Option>
                                                        {/each}
                                                    </Select>
                                                </div>
                                                <div class={col6}>
                                                    <Textfield bind:value={() => choice.discountValue ?? 0, (e) => choice.discountValue = e} label="Discount Value" type="number" variant="filled" />
                                                </div>
                                                <div class="b-line"></div>
                                            {/if}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => choice.duplicateRow ?? false, (e) => choice.duplicateRow = e} onchange={() => {
                                                    if (!choice.duplicateRow) {
                                                        delete choice.duplicateRow;
                                                        delete choice.dRowAddSufReq;
                                                        delete choice.dRowAddSufFunc;
                                                        delete choice.duplicateRowId;
                                                        delete choice.duplicateRowPlace;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Duplicate a Row
                                                {/snippet}
                                            </FormField>
                                            {#if choice.duplicateRow}
                                                <FormField class="col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => choice.dRowAddSufReq ?? false, (e) => choice.dRowAddSufReq = e} onchange={() => {
                                                        if (!choice.dRowAddSufReq) {
                                                            delete choice.dRowAddSufReq;
                                                        }
                                                    }} />
                                                    {#snippet label()}
                                                        Do Not Add Suffix to Requirement IDs
                                                    {/snippet}
                                                </FormField>
                                                <FormField class="col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => choice.dRowAddSufFunc ?? false, (e) => choice.dRowAddSufFunc = e} onchange={() => {
                                                        if (!choice.dRowAddSufFunc) {
                                                            delete choice.dRowAddSufFunc;
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
                                                        bind:value={choice.duplicateRowId}
                                                        label="Source Row (to be duplicated)"
                                                        toggle={true}
                                                        showMenuWithNoInput={true}
                                                        textfield$variant="filled"
                                                        class="w-100 p-0"
                                                    />
                                                    <Autocomplete
                                                        options={isBackpack ? getBackpackRows() : getRows()}
                                                        getOptionLabel={getRowLabel}
                                                        bind:value={choice.duplicateRowPlace}
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
                                                <Checkbox bind:checked={() => choice.isContentHidden ?? false, (e) => choice.isContentHidden = e} onchange={() => {
                                                    if (choice.isContentHidden) {
                                                        choice.hiddenContentsRow = [];
                                                        choice.hiddenContentsType = [];
                                                    } else {
                                                        delete choice.isContentHidden;
                                                        delete choice.hiddenContentsRow;
                                                        delete choice.hiddenContentsType;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Hide the Contents of Choices
                                                {/snippet}
                                            </FormField>
                                            {#if choice.isContentHidden}
                                                <div class="col-12 m-1 px-2">
                                                    <CustomChipInput acValue={choice.hiddenContentsRow ?? []} acOptions={isBackpack ? getBackpackRows() : getRows()} inputLabel="Target Row" getLabel={getRowLabel} selectProp={choice} />
                                                    <CustomChipInput acValue={choice.hiddenContentsType ?? []} acOptions={hideContentValue} inputLabel="Target Content" getLabel={(e) => hideContentText[parseInt(e) - 1]} selectProp={choice} />
                                                </div>
                                                <div class="b-line"></div>
                                            {/if}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => choice.addToAllowChoice ?? false, (e) => choice.addToAllowChoice = e} onchange={() => {
                                                    if (choice.addToAllowChoice) {
                                                        choice.idOfAllowChoice = [];
                                                    } else {
                                                        delete choice.addToAllowChoice;
                                                        delete choice.idOfAllowChoice;
                                                        delete choice.numbAddToAllowChoice;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Adjust Allowed Choices for Rows
                                                {/snippet}
                                            </FormField>
                                            {#if choice.addToAllowChoice}
                                                <div class="col-12 m-1 px-2">
                                                    <CustomChipInput acValue={choice.idOfAllowChoice ?? []} acOptions={isBackpack ? getBackpackRows() : getRows()} inputLabel="Target Row" getLabel={getRowLabel} selectProp={choice} />
                                                    <Textfield bind:value={() => choice.numbAddToAllowChoice ?? 0, (e) => choice.numbAddToAllowChoice = e} label="Number to increase or decrease" type="number" variant="filled" />
                                                </div>
                                                <div class="b-line"></div>
                                            {/if}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => choice.showAllAddons ?? false, (e) => choice.showAllAddons = e} onchange={() => {
                                                    if (!choice.showAllAddons) {
                                                        delete choice.showAllAddons;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Show All Addons
                                                {/snippet}
                                            </FormField>
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => choice.changeTemplates ?? false, (e) => choice.changeTemplates = e} onchange={() => {
                                                    if (!choice.changeTemplates) {
                                                        delete choice.changeTemplates;
                                                        delete choice.changeTemplatesList;
                                                        delete choice.changeToThisTemplate;
                                                    } else {
                                                        choice.changeToThisTemplate = 1;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Change Image Template
                                                {/snippet}
                                            </FormField>
                                            {#if choice.changeTemplates}
                                                <FormField class="col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => choice.changeAddonTemplate ?? false, (e) => choice.changeAddonTemplate = e} onchange={() => {
                                                        if (!choice.changeAddonTemplate) {
                                                            delete choice.changeAddonTemplate;
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
                                                    <Select bind:value={() => choice.changeToThisTemplate ?? 1, (e) => choice.changeToThisTemplate = e} label="Template" variant="filled" alwaysFloat={true}>
                                                        {#each templates as template (template.text)}
                                                            <Option value={template.value}>{template.text}</Option>
                                                        {/each}
                                                    </Select>
                                                </div>
                                                <div class="col-12 mt-0 m-1 px-2">
                                                    <Textfield bind:value={() => choice.changeTemplatesList ?? '', (e) => choice.changeTemplatesList = e} label="Row / Choice / Group IDs" variant="filled" />
                                                </div>
                                                <div class="b-line"></div>
                                            {/if}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => choice.changeWidth ?? false, (e) => choice.changeWidth = e} onchange={() => {
                                                    if (!choice.changeWidth) {
                                                        delete choice.changeWidth;
                                                        delete choice.changeWidthList;
                                                        delete choice.changeToThisWidth;
                                                    } else {
                                                        choice.changeToThisWidth = '';
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Change Choices Per Row
                                                {/snippet}
                                            </FormField>
                                            {#if choice.changeWidth}
                                                <div class="col-12 m-1 px-4">
                                                    Using the same ID multiple times may cause issues. You can use comma to change multiple items (ID,ID,ID).
                                                </div>
                                                <div class="col-12 pe-1">
                                                    <Select bind:value={() => choice.changeToThisWidth ?? '', (e) => choice.changeToThisWidth = e} label="Template" variant="filled" alwaysFloat={true}>
                                                        {#each objectWidths as objectWidth (objectWidth.text)}
                                                            <Option value={objectWidth.value}>{objectWidth.text}</Option>
                                                        {/each}
                                                    </Select>
                                                </div>
                                                <div class="col-12 mt-0 m-1 px-2">
                                                    <Textfield bind:value={() => choice.changeWidthList ?? '', (e) => choice.changeWidthList = e} label="Row / Choice / Group IDs" variant="filled" />
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
                                        <div class="row gy-3">
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => choice.scrollToRow ?? false, (e) => choice.scrollToRow = e} onchange={() => {
                                                    if (!choice.scrollToRow) {
                                                        delete choice.scrollToRow;
                                                        delete choice.scrollToObject;
                                                        delete choice.scrollObjectId;
                                                        delete choice.scrollRowId
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Scroll to Row
                                                {/snippet}
                                            </FormField>
                                            {#if choice.scrollToRow}
                                                <FormField class="col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => choice.scrollToObject ?? false, (e) => choice.scrollToObject = e} onchange={() => {
                                                        if (choice.scrollToObject) {
                                                            delete choice.scrollRowId;
                                                        } else {
                                                            delete choice.scrollToObject;
                                                            delete choice.scrollObjectId;
                                                        }
                                                    }} />
                                                    {#snippet label()}
                                                        Scroll to Choice Instead
                                                    {/snippet}
                                                </FormField>
                                                <div class="col-12 m-1 px-2">
                                                    {#if choice.scrollToObject}
                                                        <Autocomplete
                                                            options={isBackpack ? getBackpackChoices() : getChoices()}
                                                            getOptionLabel={getChoiceLabel}
                                                            bind:value={choice.scrollObjectId}
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
                                                            bind:value={choice.scrollRowId}
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
                                                <Checkbox bind:checked={() => choice.changePointBar ?? false, (e) => choice.changePointBar = e} onchange={() => {
                                                    if (!choice.changePointBar) {
                                                        delete choice.changePointBar;
                                                        delete choice.changeBarBgColorIsOn;
                                                        delete choice.changeBarTextColorIsOn;
                                                        delete choice.changeBarIconColorIsOn;
                                                        delete choice.changedBarBgColor;
                                                        delete choice.changedBarTextColor;
                                                        delete choice.changedBarIconColor;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Change Point Bar Design
                                                {/snippet}
                                            </FormField>
                                                {#if choice.changePointBar}
                                                <FormField class="col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => choice.changeBarBgColorIsOn ?? false, (e) => choice.changeBarBgColorIsOn = e} onchange={() => {
                                                        if (!choice.changeBarBgColorIsOn) {
                                                            delete choice.changeBarBgColorIsOn;
                                                            delete choice.changedBarBgColor;
                                                        } else {
                                                            choice.changedBarBgColor = '#000000';
                                                        }
                                                    }} />
                                                    {#snippet label()}
                                                        Change Point Bar Background Color
                                                    {/snippet}
                                                </FormField>
                                                {#if choice.changeBarBgColorIsOn}
                                                    <div class="col-12 m-1 px-4">
                                                        <ColorPicker bind:hex={() => choice.changedBarBgColor ?? '#000000', (e) => choice.changedBarBgColor = e} components={ChromeVariant} sliderDirection="horizontal" />
                                                    </div>
                                                {/if}
                                                <FormField class="col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => choice.changeBarTextColorIsOn ?? false, (e) => choice.changeBarTextColorIsOn = e} onchange={() => {
                                                        if (!choice.changeBarTextColorIsOn) {
                                                            delete choice.changeBarTextColorIsOn;
                                                            delete choice.changedBarTextColor;
                                                        } else {
                                                            choice.changedBarTextColor = '#000000';
                                                        }
                                                    }} />
                                                    {#snippet label()}
                                                        Change Point Bar Text Color
                                                    {/snippet}
                                                </FormField>
                                                {#if choice.changeBarTextColorIsOn}
                                                    <div class="col-12 m-1 px-4">
                                                        <ColorPicker bind:hex={() => choice.changedBarTextColor ?? '#000000', (e) => choice.changedBarTextColor = e} components={ChromeVariant} sliderDirection="horizontal" />
                                                    </div>
                                                {/if}
                                                <FormField class="col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => choice.changeBarIconColorIsOn ?? false, (e) => choice.changeBarIconColorIsOn = e} onchange={() => {
                                                        if (!choice.changeBarIconColorIsOn) {
                                                            delete choice.changeBarIconColorIsOn;
                                                            delete choice.changedBarIconColor;
                                                        } else {
                                                            choice.changedBarIconColor = '#000000';
                                                        }
                                                    }} />
                                                    {#snippet label()}
                                                        Change Point Bar Icon Color
                                                    {/snippet}
                                                </FormField>
                                                {#if choice.changeBarIconColorIsOn}
                                                    <div class="col-12 m-1 px-4">
                                                        <ColorPicker bind:hex={() => choice.changedBarIconColor ?? '#000000', (e) => choice.changedBarIconColor = e} components={ChromeVariant} sliderDirection="horizontal" />
                                                    </div>
                                                {/if}
                                                <div class="b-line"></div>
                                            {/if}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => choice.changeBackground ?? false, (e) => choice.changeBackground = e} onchange={() => {
                                                    if (!choice.changeBackground) {
                                                        delete choice.changeBackground;
                                                        delete choice.changedBgColorCode;
                                                        delete choice.changeBgImage;
                                                        delete choice.bgImage;
                                                    } else {
                                                        choice.changedBgColorCode = '#000000';
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Change Background Color
                                                {/snippet}
                                            </FormField>
                                            {#if choice.changeBackground}
                                                <FormField class="col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => choice.changeBgImage ?? false, (e) => choice.changeBgImage = e} onchange={() => {
                                                        if (choice.changeBgImage) {
                                                            delete choice.changedBgColorCode;
                                                        } else {
                                                            delete choice.changeBgImage;
                                                            delete choice.bgImage;
                                                        }
                                                    }} />
                                                    {#snippet label()}
                                                        Use Backgrond Image
                                                    {/snippet}
                                                </FormField>
                                                {#if choice.changeBgImage}
                                                    <div class="col-12 px-5 py-3">
                                                        {#if choice.bgImage && !app.hideImages}
                                                            <button type="button" onclickcapture={() => {dlgVariables.currentDialog = 'appImageUpload'; dlgVariables.data = choice; dlgVariables.imgProp = 'bgImage'}} class="btn--image-background">
                                                                <img src={choice.bgImage} alt="" loading="lazy" class="btn--image" style="max-height: 175px"/>
                                                            </button>
                                                        {/if}
                                                        <Button onclickcapture={() => {dlgVariables.currentDialog = 'appImageUpload'; dlgVariables.data = choice; dlgVariables.imgProp = 'bgImage'}} variant="raised">
                                                            <Label>Change Image</Label>
                                                        </Button>
                                                    </div>
                                                {:else}
                                                    <div class="col-12 m-1 px-4">
                                                        <ColorPicker bind:hex={() => choice.changedBgColorCode ?? '#000000', (e) => choice.changedBgColorCode = e} components={ChromeVariant} sliderDirection="horizontal" />
                                                    </div>
                                                {/if}
                                                <div class="b-line"></div>
                                            {/if}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => choice.setBgmIsOn ?? false, (e) => choice.setBgmIsOn = e} onchange={() => {
                                                    if (!choice.setBgmIsOn) {
                                                        delete choice.setBgmIsOn;
                                                        delete choice.bgmNoLoop;
                                                        delete choice.bgmFadeIn;
                                                        delete choice.bgmFadeInSec;
                                                        delete choice.bgmFadeOut;
                                                        delete choice.bgmFadeOutSec;
                                                        delete choice.bgmId;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Enable Background Music
                                                {/snippet}
                                            </FormField>
                                            {#if choice.setBgmIsOn}
                                                <FormField class="col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => choice.bgmNoLoop ?? false, (e) => choice.bgmNoLoop = e} onchange={() => {
                                                        if (!choice.bgmNoLoop) {
                                                            delete choice.bgmNoLoop;
                                                        }
                                                    }} />
                                                    {#snippet label()}
                                                        Do Not Loop Music
                                                    {/snippet}
                                                </FormField>
                                                <FormField class="col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => choice.bgmFadeIn ?? false, (e) => choice.bgmFadeIn = e} onchange={() => {
                                                        if (choice.bgmFadeIn) {
                                                            choice.bgmFadeInSec = 0;
                                                        } else {
                                                            delete choice.bgmFadeIn;
                                                            delete choice.bgmFadeInSec;
                                                        }
                                                    }} />
                                                    {#snippet label()}
                                                        Enable Fade In
                                                    {/snippet}
                                                </FormField>
                                                <FormField class="col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => choice.bgmFadeOut ?? false, (e) => choice.bgmFadeOut = e} onchange={() => {
                                                        if (choice.bgmFadeOut) {
                                                            choice.bgmFadeOutSec = 0;
                                                        } else {
                                                            delete choice.bgmFadeOut;
                                                            delete choice.bgmFadeOutSec;
                                                        }
                                                    }} />
                                                    {#snippet label()}
                                                        Enable Fade Out
                                                    {/snippet}
                                                </FormField>
                                                <div class="col-12 m-1 px-4">
                                                    Enter only the YouTube video ID (e.g., naktUDBaHuw), not the full URL.
                                                </div>
                                                <div class="col-12 m-1 px-2">
                                                    {#if choice.bgmFadeIn}
                                                        <Textfield bind:value={() => choice.bgmFadeInSec ?? 0, (e) => choice.bgmFadeInSec = e} label="Fade In Duration" type="number" suffix="ms" variant="filled" />
                                                    {/if}
                                                    {#if choice.bgmFadeOut}
                                                        <Textfield bind:value={() => choice.bgmFadeOutSec ?? 0, (e) => choice.bgmFadeOutSec = e} label="Fade Out Duration" type="number" suffix="ms" variant="filled" />
                                                    {/if}
                                                    <Textfield bind:value={() => choice.bgmId ?? '', (e) => choice.bgmId = e} label="Youtube Video ID" variant="filled" />
                                                </div>
                                                <div class="b-line"></div>
                                            {/if}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => choice.muteBgm ?? false, (e) => choice.muteBgm = e} onchange={() => {
                                                    if (!choice.muteBgm) {
                                                        delete choice.muteBgm;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Mute Background Music
                                                {/snippet}
                                            </FormField>
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => choice.isFadeTransition ?? false, (e) => choice.isFadeTransition = e} onchange={() => {
                                                    if (choice.isFadeTransition) {
                                                        choice.fadeTransitionColor = '#000000FF';
                                                        choice.fadeInTransitionTime = 250;
                                                        choice.fadeOutTransitionTime = 250;
                                                    } else {
                                                        delete choice.isFadeTransition;
                                                        delete choice.fadeTransitionColor;
                                                        delete choice.fadeInTransitionTime;
                                                        delete choice.fadeOutTransitionTime;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Trigger Fade Transition
                                                {/snippet}
                                            </FormField>
                                            {#if choice.isFadeTransition}
                                                <div class="col-12 m-1 px-4">
                                                    <ColorPicker bind:hex={() => choice.fadeTransitionColor ?? '#000000FF', (e) => choice.fadeTransitionColor = e} components={ChromeVariant} sliderDirection="horizontal" />
                                                </div>
                                                <div class="col-12 m-1 px-2">
                                                    <Textfield bind:value={() => choice.fadeInTransitionTime ?? 0, (e) => choice.fadeInTransitionTime = e} label="Fade In Duration" type="number" suffix="ms" variant="filled" />
                                                </div>
                                                <div class="col-12 m-1 px-2">
                                                    <Textfield bind:value={() => choice.fadeOutTransitionTime ?? 0, (e) => choice.fadeOutTransitionTime = e} label="Fade Out Duration" type="number" suffix="ms" variant="filled" />
                                                </div>
                                            {/if}
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
                                        <div class="row gy-3">
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => choice.multiplyPointtypeIsOn ?? false, (e) => choice.multiplyPointtypeIsOn = e} onchange={() => {
                                                    if (choice.multiplyPointtypeIsOn) {
                                                        choice.pointTypeToMultiply = [];
                                                        choice.multiplyWithThis = 0;
                                                    } else {
                                                        delete choice.multiplyPointtypeIsOn;
                                                        delete choice.multiplyPointtypeIsId;
                                                        delete choice.pointTypeToMultiply;
                                                        delete choice.multiplyWithThis;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Multiply into Point Types
                                                {/snippet}
                                            </FormField>
                                            {#if choice.multiplyPointtypeIsOn}
                                                <FormField class="col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => choice.multiplyPointtypeIsId ?? false, (e) => choice.multiplyPointtypeIsId = e} onchange={() => {
                                                        if (choice.multiplyPointtypeIsId) {
                                                            delete choice.multiplyWithThis;
                                                        } else {
                                                            delete choice.multiplyPointtypeIsId;
                                                            choice.multiplyWithThis = 0;
                                                        }
                                                    }} />
                                                    {#snippet label()}
                                                        Use a Point Type as multiplier
                                                    {/snippet}
                                                </FormField>
                                                <div class="col-12 m-1 px-2">
                                                    <CustomChipInput acValue={choice.pointTypeToMultiply ?? []} acOptions={getPointTypes()} inputLabel="Target Point Type" getLabel={getPointTypeLabel} selectProp={choice} />
                                                        {#if choice.multiplyPointtypeIsId}
                                                            <Autocomplete
                                                                options={getPointTypes()}
                                                                getOptionLabel={getPointTypeLabel}
                                                                bind:value={choice.multiplyWithThis}
                                                                label="Multiplied by"
                                                                toggle={true}
                                                                showMenuWithNoInput={true}
                                                                textfield$variant="filled"
                                                                class="w-100 p-0"
                                                            />
                                                        {:else}
                                                            <Textfield bind:value={() => choice.multiplyWithThis ?? 0, (e) => choice.multiplyWithThis = e} label="Multiplied by" type="number" variant="filled" />
                                                        {/if}
                                                </div>
                                                <div class="b-line"></div>
                                            {/if}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => choice.dividePointtypeIsOn ?? false, (e) => choice.dividePointtypeIsOn = e} onchange={() => {
                                                    if (choice.dividePointtypeIsOn) {
                                                        choice.pointTypeToDivide = [];
                                                        choice.divideWithThis = 0;
                                                    } else {
                                                        delete choice.dividePointtypeIsOn;
                                                        delete choice.pointTypeToDivide;
                                                        delete choice.divideWithThis;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Divide into Point Types
                                                {/snippet}
                                            </FormField>
                                            {#if choice.dividePointtypeIsOn}
                                                <div class="col-12 m-1 px-2">
                                                    <CustomChipInput acValue={choice.pointTypeToDivide ?? []} acOptions={getPointTypes()} inputLabel="Target Point Type" getLabel={getPointTypeLabel} selectProp={choice} />
                                                    <Textfield bind:value={() => choice.divideWithThis ?? 0, (e) => choice.divideWithThis = e} label="Divided by" type="number" variant="filled" />
                                                </div>
                                                <div class="b-line"></div>
                                            {/if}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => choice.setPointtypeIsOn ?? false, (e) => choice.setPointtypeIsOn = e} onchange={() => {
                                                    if (choice.setPointtypeIsOn) {
                                                        choice.pointTypeToSet = [];
                                                        choice.setWithThis = '';
                                                    } else {
                                                        delete choice.setPointtypeIsOn;
                                                        delete choice.pointTypeToSet;
                                                        delete choice.setWithThis;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Set Point Types Value
                                                {/snippet}
                                            </FormField>
                                            {#if choice.setPointtypeIsOn}
                                                <div class="col-12 m-1 px-2">
                                                    <CustomChipInput acValue={choice.pointTypeToSet ?? []} acOptions={getPointTypes()} inputLabel="Target Point Type" getLabel={getPointTypeLabel} selectProp={choice} />
                                                    <Textfield bind:value={() => choice.setWithThis ?? '', (e) => choice.setWithThis = e} label="Expression" input$placeholder="{'{point ID}'} * 2" variant="filled" />
                                                </div>
                                                <div class="b-line"></div>
                                            {/if}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => choice.isChangeVariables ?? false, (e) => choice.isChangeVariables = e} onchange={() => {
                                                    if (choice.isChangeVariables) {
                                                        choice.changedVariables = [];
                                                        choice.changeType = '1';
                                                    } else {
                                                        delete choice.isChangeVariables;
                                                        delete choice.changedVariables;
                                                        delete choice.changeType;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Set Variable Status
                                                {/snippet}
                                            </FormField>
                                            {#if choice.isChangeVariables}
                                                <div class="col-12 m-1 px-2">
                                                    <CustomChipInput acValue={choice.changedVariables ?? []} acOptions={getVariables()} inputLabel="Target Variable" selectProp={choice} />
                                                    <Select bind:value={choice.changeType} label="Value" variant="filled">
                                                        {#each variableTypes as type (type.text)}
                                                            <Option value={type.value}>{type.text}</Option>
                                                        {/each}
                                                    </Select>
                                                </div>
                                                <div class="b-line"></div>
                                            {/if}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => choice.textfieldIsOn ?? false, (e) => choice.textfieldIsOn = e} onchange={() => {
                                                    if (choice.textfieldIsOn) {
                                                        choice.wordChangeSelect = '';
                                                        choice.wordChangeDeselect = '';
                                                        delete choice.confirmIsOn;
                                                    } else {
                                                        delete choice.textfieldIsOn;
                                                        delete choice.customTextfieldIsOn;
                                                        delete choice.idOfTheTextfieldWord;
                                                        delete choice.wordPromptText;
                                                        delete choice.wordChangeSelect;
                                                        delete choice.wordChangeDeselect;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Change Word
                                                {/snippet}
                                            </FormField>
                                            {#if choice.textfieldIsOn}
                                                <FormField class="col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => choice.customTextfieldIsOn ?? false, (e) => choice.customTextfieldIsOn = e} onchange={() => {
                                                        if (choice.customTextfieldIsOn) {
                                                            choice.wordPromptText = '';
                                                        } else {
                                                            delete choice.customTextfieldIsOn;
                                                            delete choice.wordPromptText;
                                                        }
                                                    }} />
                                                    {#snippet label()}
                                                        Allows the Player to Set Word
                                                    {/snippet}
                                                </FormField>
                                                <div class="col-12 m-1 px-2">
                                                    <Autocomplete
                                                        options={getWords()}
                                                        bind:value={choice.idOfTheTextfieldWord}
                                                        label="Word ID"
                                                        toggle={true}
                                                        showMenuWithNoInput={true}
                                                        textfield$variant="filled"
                                                        class="w-100 p-0"
                                                    />
                                                    {#if choice.customTextfieldIsOn}
                                                        <Textfield bind:value={() => choice.wordPromptText ?? '', (e) => choice.wordPromptText = e} label="Prompt Text" variant="filled" />
                                                    {:else}
                                                        <Textfield bind:value={() => choice.wordChangeSelect ?? '', (e) => choice.wordChangeSelect = e} label="Replacement Text when Selected" variant="filled" />
                                                    {/if}
                                                    <Textfield bind:value={() => choice.wordChangeDeselect ?? '', (e) => choice.wordChangeDeselect = e} label="Replacement Text when Deselected" variant="filled" />
                                                </div>
                                                <div class="b-line"></div>
                                            {/if}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => choice.confirmIsOn ?? false, (e) => choice.confirmIsOn = e} onchange={() => {
                                                    if (choice.confirmIsOn) {
                                                        choice.wordPromptText = '';
                                                        delete choice.textfieldIsOn;
                                                        delete choice.customTextfieldIsOn;
                                                        delete choice.idOfTheTextfieldWord;
                                                        delete choice.wordPromptText;
                                                        delete choice.wordChangeSelect;
                                                        delete choice.wordChangeDeselect;
                                                    } else {
                                                        delete choice.confirmIsOn;
                                                        delete choice.wordPromptText;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Show Confirm Dialog
                                                {/snippet}
                                            </FormField>
                                            {#if choice.confirmIsOn}
                                                <div class="col-12 m-1 px-2">
                                                    <Textfield bind:value={() => choice.wordPromptText ?? '', (e) => choice.wordPromptText = e} label="Dialog Text" variant="filled" />
                                                </div>
                                                <div class="b-line"></div>
                                            {/if}
                                            <FormField class="col-12 m-1 p-0">
                                                <Checkbox bind:checked={() => choice.backpackBtnRequirement ?? false, (e) => choice.backpackBtnRequirement = e} onchange={() => {
                                                    if (choice.backpackBtnRequirement) {
                                                        app.hideBackpackBtn += 1;
                                                    } else {
                                                        delete choice.backpackBtnRequirement;
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
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    </div>
{:else if !(bCreatorMode && row.isEditModeOn) && isShown}
    <div class={objectWidthClass()}>
        <div class:fullHeight={fullHeight} class:position-relative={app.useChoiceEditBtn && !row.isResultRow && !row.isGroupRow} class="d-flex">
            {#if app.useChoiceEditBtn && !row.isResultRow && !row.isGroupRow && bCreatorMode}
                <div class="choice-edit-button">
                    <IconButton onclickcapture={() => choice.isEditModeOn = true} size="button"><i class="mdi mdi-wrench"></i></IconButton>
                </div>
            {/if}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div class="row row-{row.id} choice-{choice.id} {isActive ? 'choice-selected' : 'choice-unselected'} {isEnabled ? 'choice-enabled' : 'choice-disabled'} {(isActive && filterStyle.selOverlayOnImage) || (!isEnabled && filterStyle.reqOverlayOnImage) ? 'bg-overlay ' : ''}w-100" style={objectBackground} onclickcapture={(e) => activateObject(choice, row, e, true)}>
                {#if choice.template >= 4 || choice.template === 1 || windowWidth <= 1280 || row.choicesShareTemplate}
                    <div class="d-column w-100 p-0 align-items-center">
                        {#if row.resultShowRowTitle}
                            {#key oriTitleKey}
                                <div class="col-12" style={scoreText}>
                                    {@html DOMPurify.sanitize(oriTitleKey, sanitizeArg)}
                                </div>
                            {/key}
                        {/if}
                        {#if (choice.template === 1 || windowWidth <= 1280 || row.choicesShareTemplate) && choice.image && !row.objectImageRemoved}
                            {#if choice.imageSourceTooltip}
                                <img use:tooltip={choice.imageSourceTooltip} oncontextmenu={copyTooltip} src={choice.image} style={objectImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {:else}
                                <img src={choice.image} style={objectImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                            {/if}
                        {/if}
                        <div class="w-100">
                            {#if choice.title !== '' && !row.objectTitleRemoved}
                                {#key choiceTitleKey}
                                    <h3 class="m-0" style={objectTitle}>
                                        {@html DOMPurify.sanitize(choiceTitleKey, sanitizeArg)}
                                    </h3>
                                {/key}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 0}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                            {/if}
                            {#if !row.objectScoreRemoved && !choice.showScoreInAddon}
                                {#each choice.scores as score}
                                    <ObjectScore score={score} row={row} choice={choice} />
                                {/each}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 1}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                            {/if}
                            {#if !row.objectRequirementRemoved && !choice.showReqInAddon}
                                {#each choice.requireds as required}
                                    <ObjectRequired required={required} scoreText={scoreText} />
                                {/each}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 2}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                            {/if}
                            {#if choice.template === 5 && windowWidth > 1280 && choice.image && !row.objectImageRemoved}
                                {#if choice.imageSourceTooltip}
                                    <img use:tooltip={choice.imageSourceTooltip} oncontextmenu={copyTooltip} src={choice.image} style={objectImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                                {:else}
                                    <img src={choice.image} style={objectImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                                {/if}
                            {/if}
                            {#if choice.text !== '' && !row.objectTextRemoved}
                                {#key choiceTextKey}
                                    <p class="mb-0" style={objectText}>
                                        {@html DOMPurify.sanitize(choiceTextKey, sanitizeArg)}
                                    </p>
                                {/key}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 3}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice}  selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                            {/if}
                            {#if choice.template === 4 && windowWidth > 1280 && choice.image && !row.objectImageRemoved}
                                {#if choice.imageSourceTooltip}
                                    <img use:tooltip={choice.imageSourceTooltip} oncontextmenu={copyTooltip} src={choice.image} style={objectImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                                {:else}
                                    <img src={choice.image} style={objectImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                                {/if}
                            {/if}
                        </div>
                        {#if choice.addons && choice.addons.length > 0}
                            <div class="d-column p-0 col w-100{addonJustify}">
                                {#each choice.addons as addon, i}
                                    {#if app.showAllAddons > 0 || (!addon.hideAddon || choice.isActive) && (addon.showAddon || checkRequirements(addon.requireds))}
                                        <ObjectAddon row={row} choice={choice} addon={addon} isEnabled={isEnabled} windowWidth={windowWidth} preloadImages={preloadImages} isFirst={firstAddonIndex === i} />
                                    {/if}
                                {/each}
                            </div>
                        {/if}
                        {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 4}
                            <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                        {/if}
                    </div>
                {:else}
                    {#if choice.template === 2}
                        <div class="col p-0 text-center" style="max-width: {choiceImageBoxWidth}%">
                            {#if choice.image && !row.objectImageRemoved}
                                {#if choice.imageSourceTooltip}
                                    <img use:tooltip={choice.imageSourceTooltip} oncontextmenu={copyTooltip} src={choice.image} style={objectImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                                {:else}
                                    <img src={choice.image} style={objectImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                                {/if}
                            {/if}
                        </div>
                        <div class="col p-0 text-center" style="max-width: {100 - choiceImageBoxWidth}%">
                            {#if choice.title !== '' && !row.objectTitleRemoved}
                                {#key choiceTitleKey}<h2 class="mb-0" style={objectTitle}>{@html DOMPurify.sanitize(choiceTitleKey, sanitizeArg)}</h2>{/key}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 0}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                            {/if}
                            {#if !row.objectScoreRemoved && !choice.showScoreInAddon}
                                {#each choice.scores as score}
                                    <ObjectScore score={score} row={row} choice={choice} />
                                {/each}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 1}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                            {/if}
                            {#if !row.objectRequirementRemoved && !choice.showReqInAddon}
                                {#each choice.requireds as required}
                                    <ObjectRequired required={required} scoreText={scoreText} />
                                {/each}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 2}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                            {/if}
                            {#if choice.text !== '' && !row.objectTextRemoved}
                                {#key choiceTextKey}
                                    <p class="mb-0" style={objectText}>
                                        {@html DOMPurify.sanitize(replaceText(choice.text), sanitizeArg)}
                                    </p>
                                {/key}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 3}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                            {/if}
                            {#if !choice.useSeperateAddon}
                                {#if choice.addons && choice.addons.length > 0}
                                    <div class="d-column p-0 col w-100{addonJustify}">
                                        {#each choice.addons as addon, i}
                                            {#if app.showAllAddons > 0 || (!addon.hideAddon || choice.isActive) && (addon.showAddon || checkRequirements(addon.requireds))}
                                                <ObjectAddon row={row} choice={choice} addon={addon} isEnabled={isEnabled} windowWidth={windowWidth} preloadImages={preloadImages} isFirst={firstAddonIndex === i} />
                                            {/if}
                                        {/each}
                                    </div>
                                {/if}
                                {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 4}
                                    <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                                {/if}
                            {/if}
                        </div>
                        {#if choice.useSeperateAddon}
                            <div class="col-12 text-center">
                                {#if choice.addons && choice.addons.length > 0}
                                    <div class="d-column p-0 col w-100{addonJustify}">
                                        {#each choice.addons as addon, i}
                                            {#if app.showAllAddons > 0 || (!addon.hideAddon || choice.isActive) && (addon.showAddon || checkRequirements(addon.requireds))}
                                                <ObjectAddon row={row} choice={choice} addon={addon} isEnabled={isEnabled} windowWidth={windowWidth} preloadImages={preloadImages} isFirst={firstAddonIndex === i} />
                                            {/if}
                                        {/each}
                                    </div>
                                {/if}
                                {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 4}
                                    <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                                {/if}
                            </div>
                        {/if}
                    {:else if choice.template === 3}
                        <div class="col p-0 text-center" style="max-width: {100 - choiceImageBoxWidth}%">
                            {#if choice.title !== '' && !row.objectTitleRemoved}
                                {#key choiceTitleKey}<h2 class="mb-0" style={objectTitle}>{@html DOMPurify.sanitize(choiceTitleKey, sanitizeArg)}</h2>{/key}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 0}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                            {/if}
                            {#if !row.objectScoreRemoved && !choice.showScoreInAddon}
                                {#each choice.scores as score}
                                    <ObjectScore score={score} row={row} choice={choice} />
                                {/each}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 1}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                            {/if}
                            {#if !row.objectRequirementRemoved && !choice.showReqInAddon}
                                {#each choice.requireds as required}
                                    <ObjectRequired required={required} scoreText={scoreText} />
                                {/each}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 2}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                            {/if}
                            {#if choice.text !== '' && !row.objectTextRemoved}
                                {#key choiceTextKey}
                                    <p class="mb-0" style={objectText}>
                                        {@html DOMPurify.sanitize(choiceTextKey, sanitizeArg)}
                                    </p>
                                {/key}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 3}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                            {/if}
                            {#if !choice.useSeperateAddon}
                                {#if choice.addons && choice.addons.length > 0}
                                    <div class="d-column p-0 col w-100{addonJustify}">
                                        {#each choice.addons as addon, i}
                                            {#if app.showAllAddons > 0 || (!addon.hideAddon || choice.isActive) && (addon.showAddon || checkRequirements(addon.requireds))}
                                                <ObjectAddon row={row} choice={choice} addon={addon} isEnabled={isEnabled} windowWidth={windowWidth} preloadImages={preloadImages} isFirst={firstAddonIndex === i} />
                                            {/if}
                                        {/each}
                                    </div>
                                {/if}
                                {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 4}
                                    <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                                {/if}
                            {/if}
                        </div>
                        <div class="col p-0 text-center" style="max-width: {choiceImageBoxWidth}%">
                            {#if choice.image && !row.objectImageRemoved}
                                {#if choice.imageSourceTooltip}
                                    <img use:tooltip={choice.imageSourceTooltip} oncontextmenu={copyTooltip} src={choice.image} style={objectImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                                {:else}
                                    <img src={choice.image} style={objectImage} alt="" loading={preloadImages ? 'eager' : 'lazy'}>
                                {/if}
                            {/if}
                        </div>
                        {#if choice.useSeperateAddon}
                            <div class="col-12 text-center">
                                {#if choice.addons && choice.addons.length > 0}
                                    <div class="d-column p-0 col w-100{addonJustify}">
                                        {#each choice.addons as addon, i}
                                            {#if app.showAllAddons > 0 || (!addon.hideAddon || choice.isActive) && (addon.showAddon || checkRequirements(addon.requireds))}
                                                <ObjectAddon row={row} choice={choice} addon={addon} isEnabled={isEnabled} windowWidth={windowWidth} preloadImages={preloadImages} isFirst={firstAddonIndex === i} />
                                            {/if}
                                        {/each}
                                    </div>
                                {/if}
                                {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 4}
                                    <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row)} selectedOneLess={() => selectedOneLess(choice, row)} />
                                {/if}
                            </div>
                        {/if}
                    {/if}
                {/if}
            </div>
        </div>
    </div>
{/if}
{#if currentDialog === 'dlgCommon'}
    <DlgCommon open={currentDialog === 'dlgCommon'} onclose={() => (currentDialog = 'none')} title="" context={wordDialog.context} closeHandler={(e, wordText) => {
        if (e.detail.action === 'accept' && wordDialog.choice && wordDialog.row) {
            isOverDlg = true;
            if (wordDialog.isWord) wordDialog.choice.wordChangeSelect = wordText;
            selectObject(wordDialog.choice, wordDialog.row);
            isOverDlg = false;
        } else {
            isOverDlg = false;
        }
    }} isWord={wordDialog.isWord} prevText={wordDialog.prevText} />
{/if}

<script lang="ts">
    import Accordion, { Panel, Header, Content as AcdContent} from '$lib/custom/accordion';
    import Autocomplete from '$lib/custom/autocomplete/Autocomplete.svelte';
    import Button, { Label } from '@smui/button';
    import Card, { Content as CardContent } from '@smui/card';
    import Checkbox from '@smui/checkbox';
    import ColorPicker, { ChromeVariant } from '$lib/custom/svelte-awesome-color-picker';
    import CustomChipInput from '$lib/store/CustomChipInput.svelte';
    import DlgCommon from './DlgCommon.svelte';
    import DOMPurify from 'dompurify';
    import FormField from '@smui/form-field';
    import IconButton, { Icon } from '@smui/icon-button';
    import ObjectAddon from './Object/ObjectAddon.svelte';
    import ObjectGroup from './Object/ObjectGroup.svelte';
    import ObjectMultiChoice from './Object/ObjectMultiChoice.svelte';
    import ObjectRequired from './Object/ObjectRequired.svelte';
    import ObjectScore from './Object/ObjectScore.svelte';
    import Select, { Option } from '$lib/custom/select';
    import Textfield from '$lib/custom/textfield';
    import Tiptap from '$lib/store/Tiptap.svelte';
    import { Wrapper } from '$lib/custom/tooltip';
	import type { ActivatedMap, Choice, Row, TempScore } from '$lib/store/types';
	import { app, checkDupId, choiceMap, groupMap, getChoiceLabel, getRowLabel, getGroupLabel, getStyling, getPointTypeLabel, objectWidths, checkRequirements, sanitizeArg, replaceText, pointTypeMap, activatedMap, variableMap, rowMap, wordMap, bgmPlayer, tmpActivatedMap, mdObjects, bgmVariables, objectWidthToNum, generateObjectId, selectDiscount, deselectDiscount, checkPoints, cleanActivated, initYoutubePlayer, playBgm, dlgVariables, snackbarVariables, duplicateRow, getChoices, getGroups, getPointTypes, getRows, getVariables, getWords, objectDesignMap, winWidth, applyTemplate, applyWidth, revertTemplate, revertWidth, generateScoreId, scoreSet, getBackpackChoices, getBackpackRows, hexToRgba, menuVariables, removeAnchor, pasteObject, clearClipboard, deleteDiscount, exportData, expDiscount, setScoreValue } from '$lib/store/store.svelte';
    import { SvelteMap } from 'svelte/reactivity';
	import { get } from 'svelte/store';
    import { tick } from 'svelte';
    import { tooltip } from '$lib/custom/tooltip/store.svelte';
    import { evaluate } from '@antv/expr';

    export { activateObject, selectedOneMore, selectedOneLess };
    
    const { row, choice, index, windowWidth, bCreatorMode, preloadImages = false, isBackpack, mainDiv }: { row: Row, choice: Choice, index: number, windowWidth: number, bCreatorMode: boolean, preloadImages?: boolean; isBackpack?: boolean, mainDiv?: HTMLDivElement } = $props();
    const choiceToolbarButtons = [{
        action: () => { moveChoiceLeft() },
        text: 'Move Left',
        icon: 'mdi mdi-chevron-left'
    }, {
        action: () => { deleteObject() },
        text: 'Delete Choice',
        icon: 'mdi mdi-delete-forever'
    }, {
        action: () => { dlgVariables.currentDialog = 'appObjectSettings'; dlgVariables.row = row; dlgVariables.choice = choice; },
        text: 'Choice Settings',
        icon: 'mdi mdi-cog'
    }, {
        action: () => { cloneObject() },
        contextAction: (e: MouseEvent) => { choiceContext(e) },
        text: 'L: Clone Choice<br>R: Context Menu',
        icon: 'mdi mdi-content-copy'
    }, {
        action: () => { moveChoiceRight() },
        text: 'Move Right',
        icon: 'mdi mdi-chevron-right'
    }];
    const choiceBottomToolbarButtons = [{
        action: () => { createNewScore() },
        contextAction: (e: MouseEvent) => { scoreContext(e) },
        text: 'L: Create Score<br>R: Context Menu',
        icon: 'mdi mdi-numeric-9-plus-box'
    }, {
        action: () => { createNewAddon() },
        contextAction: (e: MouseEvent) => { addonContext(e) },
        text: 'L: Create Addon<br>R: Context Menu',
        icon: 'mdi mdi-comment-plus'
    }, {
        action: () => { dlgVariables.currentDialog = 'appRequirement'; dlgVariables.data = choice; },
        contextAction: (e: MouseEvent) => { requiredContext(e) },
        text: 'L: Create Requirement<br>R: Context Menu',
        icon: 'mdi mdi-key-plus'
    }, {
        action: () => { choice.groups.push('') },
        contextAction: (e: MouseEvent) => { groupContext(e) },
        text: 'L: Add To Group<br>R: Context Menu',
        icon: 'mdi mdi-group'
    }];
    const templates = [{
        text: 'Image top',
        value: 1
    }, {
        text: 'Image left',
        value: 2
    }, {
        text: 'Image right',
        value: 3
    }, {
        text: 'Image bottom',
        value: 4
    }, {
        text: 'Image center',
        value: 5
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
    const justifies = ['start', 'center', 'end', 'space-around', 'space-between'];
    const linkedObjects: string[] = [];
    const wordDialog: {
        choice: Choice | null,
        row: Row | null,
        context: string,
        prevText: string,
        isWord: boolean
    } = {
        choice: null,
        row: null,
        context: '',
        prevText: '',
        isWord: true
    };
    let panelScore = $state(false);
    let panelReq = $state(false);
    let panelAddon = $state(false);
    let panelGroup = $state(false);
    let panel01 = $state(false);
    let panel02 = $state(false);
    let panel03 = $state(false);
    let panel04 = $state(false);

    let firstAddonIndex = $derived.by(() => {
        if (choice.addons) {
            for (let i = 0; i < choice.addons.length; i++) {
                const addon = choice.addons[i];
                if (app.showAllAddons > 0 || !addon.skipIndex && (!addon.hideAddon || choice.isActive) && (addon.showAddon || checkRequirements(addon.requireds))) {
                    return i;
                }
            }
        }
        return -1;
    });
    let backgroundStyle = $derived(getStyling('privateBackgroundIsOn', row, choice));
    let filterStyle = $derived(getStyling('privateFilterIsOn', row, choice));
    let multiChoiceStyle = $derived(getStyling('privateMultiChoiceIsOn', row, choice));
    let objectImageStyle = $derived(getStyling('privateObjectImageIsOn', row, choice));
    let objectStyle = $derived(getStyling('privateObjectIsOn', row, choice));
    let textStyle = $derived(getStyling('privateTextIsOn', row, choice));
    
    let choiceImageBoxWidth = $derived(typeof objectImageStyle.objectImageBoxWidth !== 'undefined' ? objectImageStyle.objectImageBoxWidth : 50);
    let width = $state(0);
    let currentDialog = $state<'none' | 'dlgCommon'>('none');
    let choiceId = '';
    let isOverDlg = false;

    let col6 = $derived.by(() => {
        if (width > 278) return 'col-6';
        else return 'col-12';
    });
    let reqCol = $derived.by(() => {
        if (width > 400) return 'col-6';
        else return 'col-12';
    })
    let isEnabled = $derived.by(() => {
        return checkRequirements(choice.requireds);
    });
    let isShown = $derived.by(() => {
        if (choice.isActive) {
            return !filterStyle.selFilterVisibleIsOn;
        } else if (!isEnabled) {
            return !filterStyle.reqFilterVisibleIsOn
        }
        return !filterStyle.unselFilterVisibleIsOn;
    });
    let addonJustify = $derived(choice.addonJustify ? ` justify-${choice.addonJustify}` : '');
    let isActive = $derived(choice.isActive);
    let fullHeight = $derived((!row.isEditModeOn || !bCreatorMode) && objectStyle.objectHeight);
    let oriRow = $derived.by(() => {
        if (row.isResultRow) {
            const cMap = choiceMap.get(choice.id);
            if (typeof cMap !== 'undefined') {
                return cMap.row;
            }
        }
        return row;
    });

    let objectTitle = $derived.by(() => {
        let styles: string[] = [];

        styles.push(`white-space: pre-line; font-family: '${textStyle.objectTitle}'; font-size: ${textStyle.objectTitleTextSize}%; text-align: ${textStyle.objectTitleAlign};`);
        if (!isEnabled && filterStyle.reqCTitleColorIsOn) {
            styles.push(`color: ${hexToRgba(filterStyle.reqFilterCTitleColor)};`);
        } else if (isActive && filterStyle.selCTitleColorIsOn) {
            styles.push(`color: ${hexToRgba(filterStyle.selFilterCTitleColor)};`);
        } else {
            styles.push(`color: ${hexToRgba(textStyle.objectTitleColor)};`);
        }
        if (objectStyle.titlePaddingIsOn) {
            styles.push(`padding: ${objectStyle.objectTextPadding}px;`);
        }

        return styles.join(' ');
    });
    let oriTitleKey = $derived(replaceText(oriRow.title !== '' ? oriRow.title : oriRow.debugTitle || ''));
    let choiceTitleKey = $derived(replaceText(choice.title));
    let choiceTextKey = $derived(replaceText(choice.text));

    let multiChoiceText = $derived.by(() => {
        return `font-family: '${multiChoiceStyle.multiChoiceTextFont}'; color: ${hexToRgba(textStyle.scoreTextColor)}; font-size: ${multiChoiceStyle.multiChoiceTextSize}%; align-content: center;`;
    });

    let multiChoiceButton = $derived.by(() => {
        return `font-size: ${multiChoiceStyle.multiChoiceCounterSize}%; color: ${hexToRgba(textStyle.scoreTextColor)};`;
    });

    let multiChoiceCounter = $derived.by(() => {
        if (choice.hideMultipleCounter) {
            return isEnabled;
        }

        return true;
    });

    let objectText = $derived.by(() => {
        let styles: string[] = [];

        styles.push(`white-space: pre-wrap; font-family: '${textStyle.objectText}'; text-align: ${textStyle.objectTextAlign}; font-size: ${textStyle.objectTextTextSize}%;`);
        if (!isEnabled && filterStyle.reqCTextColorIsOn) {
            styles.push(`color: ${hexToRgba(filterStyle.reqFilterCTextColor)};`);
        } else if (isActive && filterStyle.selCTextColorIsOn) {
            styles.push(`color: ${hexToRgba(filterStyle.selFilterCTextColor)};`);
        } else {
            styles.push(`color: ${hexToRgba(textStyle.objectTextColor)};`);
        }
        styles.push(`padding: ${objectStyle.objectTextPadding}px;`);

        return styles.join(' ');
    });

    let objectBackground = $derived.by(() => {
        const suffix = objectStyle.objectBorderRadiusIsPixels ? 'px' : '%';
        let bgImageIndex = 0;
        let bgColorIndex = 0;
        let filterIndex = 0;
        let styles: string[] = [];

        if (objectStyle.objectBorderImage) {
            styles.push(`border-image: url('${objectStyle.objectBorderImage}') ${objectStyle.objectBorderImageSliceTop} ${objectStyle.objectBorderImageSliceRight} ${objectStyle.objectBorderImageSliceBottom} ${objectStyle.objectBorderImageSliceLeft} / ${objectStyle.objectBorderImageWidth}px ${objectStyle.objectBorderImageRepeat}; border-style: solid; padding: ${objectStyle.objectBorderImageWidth}px;`);
        }
        if (backgroundStyle.objectBackgroundImage) {
            styles.push(`background-image: url('${backgroundStyle.objectBackgroundImage}'); ${backgroundStyle.isObjectBackgroundRepeat? 'background-repeat: repeat;' : (backgroundStyle.isObjectBackgroundFitIn ? 'background-size: 100% 100%;' : 'background-size: cover;')}`);
            bgImageIndex = styles.length;
        }
        if (backgroundStyle.objectBgColorIsOn) {
            styles.push(`background-color: ${hexToRgba(backgroundStyle.objectBgColor)};`);
            bgColorIndex = styles.length;
        }
        styles.push(`margin: ${objectStyle.objectMargin}px;`);
        styles.push(`border-radius: ${objectStyle.objectBorderRadiusTopLeft}${suffix} ${objectStyle.objectBorderRadiusTopRight}${suffix} ${objectStyle.objectBorderRadiusBottomRight}${suffix} ${objectStyle.objectBorderRadiusBottomLeft}${suffix};`);
        if (objectStyle.objectOverflowIsOn) {
            styles.push(`overflow: hidden;`);
        }
        if (objectStyle.objectBorderIsOn || (isActive && filterStyle.selBorderColorIsOn) || (!isEnabled && filterStyle.reqBorderColorIsOn)) {
            let borderColor = objectStyle.objectBorderColor;
            
            if (!isEnabled && filterStyle.reqBorderColorIsOn) {
                borderColor = filterStyle.reqFilterBorderColor;
            } else if (isActive && filterStyle.selBorderColorIsOn) {
                borderColor = filterStyle.selFilterBorderColor;
            }
            styles.push(`border: ${objectStyle.objectBorderWidth}px ${objectStyle.objectBorderStyle} ${hexToRgba(borderColor)};`);
        }
        if (objectStyle.objectDropShadowIsOn) {
            if (objectStyle.objectUseBoxShadowIsOn) {
                styles.push(`box-shadow: ${objectStyle.objectDropShadowH}px ${objectStyle.objectDropShadowV}px ${objectStyle.objectDropShadowBlur}px ${hexToRgba(objectStyle.objectDropShadowColor)};`);
            } else {
                filterIndex = styles.length;
                styles.push(`filter: drop-shadow(${objectStyle.objectDropShadowH}px ${objectStyle.objectDropShadowV}px ${objectStyle.objectDropShadowBlur}px ${hexToRgba(objectStyle.objectDropShadowColor)})`);
            }
        }
        if (filterIndex === 0) {
            styles.push(`filter:`);
            filterIndex = styles.length;
        }
        if (isEnabled) {
            if (isActive) {
                if (filterStyle.selFilterBlurIsOn) {
                    styles.push(` blur(${filterStyle.selFilterBlur}px)`);
                }
                if (filterStyle.selFilterBrightIsOn) {
                    styles.push(` brightness(${filterStyle.selFilterBright}%)`);
                }
                if (filterStyle.selFilterContIsOn) {
                    styles.push(` contrast(${filterStyle.selFilterCont}%)`);
                }
                if (filterStyle.selFilterGrayIsOn) {
                    styles.push(` grayscale(${filterStyle.selFilterGray}%)`);
                }
                if (filterStyle.selFilterHueIsOn) {
                    styles.push(` hue-rotate(${filterStyle.selFilterHue}deg)`);
                }
                if (filterStyle.selFilterInvertIsOn) {
                    styles.push(` invert(${filterStyle.selFilterInvert}%)`);
                }
                if (filterStyle.selFilterOpacIsOn) {
                    styles.push(` opacity(${filterStyle.selFilterOpac}%)`);
                }
                if (filterStyle.selFilterSaturIsOn) {
                    styles.push(` saturate(${filterStyle.selFilterSatur})`);
                }
                if (filterStyle.selFilterSepiaIsOn) {
                    styles.push(` sepia(${filterStyle.selFilterGray}%)`);
                }
                if (styles.length === filterIndex) {
                    styles.splice(filterIndex - 1, 1);
                } else {
                    styles.push(`;`);
                }
                if (filterStyle.selBgColorIsOn) {
                    if (bgColorIndex !== 0) {
                        styles.splice(bgColorIndex - 1, 1);
                    }
                    if (!filterStyle.selOverlayOnImage) {
                        if (bgImageIndex !== 0) {
                            styles.splice(bgImageIndex - 1, 1);
                        }
                    }
                    styles.push(`background-color: ${hexToRgba(filterStyle.selFilterBgColor)};`);
                }
                if (objectStyle.objectGradientIsOn) {
                    styles.push(`background-image: linear-gradient(${objectStyle.objectGradientOnSelect});`);
                }
            } else {
                if (filterStyle.unselFilterBlurIsOn) {
                    styles.push(` blur(${filterStyle.unselFilterBlur}px)`);
                }
                if (filterStyle.unselFilterBrightIsOn) {
                    styles.push(` brightness(${filterStyle.unselFilterBright}%)`);
                }
                if (filterStyle.unselFilterContIsOn) {
                    styles.push(` contrast(${filterStyle.unselFilterCont}%)`);
                }
                if (filterStyle.unselFilterGrayIsOn) {
                    styles.push(` grayscale(${filterStyle.unselFilterGray}%)`);
                }
                if (filterStyle.unselFilterHueIsOn) {
                    styles.push(` hue-rotate(${filterStyle.unselFilterHue}deg)`);
                }
                if (filterStyle.unselFilterInvertIsOn) {
                    styles.push(` invert(${filterStyle.unselFilterInvert}%)`);
                }
                if (filterStyle.unselFilterOpacIsOn) {
                    styles.push(` opacity(${filterStyle.unselFilterOpac}%)`);
                }
                if (filterStyle.unselFilterSaturIsOn) {
                    styles.push(` saturate(${filterStyle.unselFilterSatur})`);
                }
                if (filterStyle.unselFilterSepiaIsOn) {
                    styles.push(` sepia(${filterStyle.unselFilterGray}%)`);
                }
                if (styles.length === filterIndex) {
                    styles.splice(filterIndex - 1, 1);
                } else {
                    styles.push(`;`);
                }
                if (objectStyle.objectGradientIsOn) {
                    styles.push(`background-image: linear-gradient(${objectStyle.objectGradient});`);
                }
            }
            if (app.isPointerCursor && !choice.isNotSelectable && (!choice.isSelectableMultiple || (choice.allowSelectByClick && choice.multipleUseVariable === 0))) {
                styles.push(`cursor: pointer;`);
            }
        } else {
            if (filterStyle.reqFilterBlurIsOn) {
                styles.push(` blur(${filterStyle.reqFilterBlur}px)`);
            }
            if (filterStyle.reqFilterBrightIsOn) {
                styles.push(` brightness(${filterStyle.reqFilterBright}%)`);
            }
            if (filterStyle.reqFilterContIsOn) {
                styles.push(` contrast(${filterStyle.reqFilterCont}%)`);
            }
            if (filterStyle.reqFilterGrayIsOn) {
                styles.push(` grayscale(${filterStyle.reqFilterGray}%)`);
            }
            if (filterStyle.reqFilterHueIsOn) {
                styles.push(` hue-rotate(${filterStyle.reqFilterHue}deg)`);
            }
            if (filterStyle.reqFilterInvertIsOn) {
                styles.push(` invert(${filterStyle.reqFilterInvert}%)`);
            }
            if (filterStyle.reqFilterOpacIsOn) {
                styles.push(` opacity(${filterStyle.reqFilterOpac}%)`);
            }
            if (filterStyle.reqFilterSaturIsOn) {
                styles.push(` saturate(${filterStyle.reqFilterSatur})`);
            }
            if (filterStyle.reqFilterSepiaIsOn) {
                styles.push(` sepia(${filterStyle.reqFilterGray}%)`);
            }
            if (styles.length === filterIndex) {
                styles.splice(filterIndex - 1, 1);
            } else {
                styles.push(`;`);
            }
            if (filterStyle.reqBgColorIsOn) {
                if (bgColorIndex !== 0) {
                    styles.splice(bgColorIndex - 1, 1);
                }
                if (!filterStyle.reqOverlayOnImage) {
                    if (bgImageIndex !== 0) {
                        styles.splice(bgImageIndex - 1, 1);
                    }
                }
                styles.push(`background-color: ${hexToRgba(filterStyle.reqFilterBgColor)};`);
            }
            if (objectStyle.objectGradientIsOn) {
                styles.push(`background-image: linear-gradient(${objectStyle.objectGradientOnReq});`);
            }
        }
        return styles.join(' ');
    });

    let objectImage = $derived.by(() => {
        let styles: string[] = [];
        const suffix = objectImageStyle.objectImgBorderRadiusIsPixels ? 'px' : '%';

        styles.push(`width: ${objectImageStyle.objectImageWidth}%; margin-top: ${objectImageStyle.objectImageMarginTop}%; margin-bottom: ${objectImageStyle.objectImageMarginBottom}%;`);
        if (objectImageStyle.objectImgObjectFillIsOn && row.objectImgObjectFillHeight) {
            styles.push(`object-fit: ${objectImageStyle.objectImgObjectFillStyle}; height: ${row.objectImgObjectFillHeight}px;`);
        }
        styles.push(`border-radius: ${objectImageStyle.objectImgBorderRadiusTopLeft}${suffix} ${objectImageStyle.objectImgBorderRadiusTopRight}${suffix} ${objectImageStyle.objectImgBorderRadiusBottomRight}${suffix} ${objectImageStyle.objectImgBorderRadiusBottomLeft}${suffix};`);
        if (objectImageStyle.objectImgOverflowIsOn) {
            styles.push(`overflow: hidden;`);
        }
        if (objectImageStyle.objectImgBorderIsOn) {
            styles.push(`border: ${objectImageStyle.objectImgBorderWidth}px ${objectImageStyle.objectImgBorderStyle} ${hexToRgba(objectImageStyle.objectImgBorderColor)};`);
        }

        return styles.join(' ');
    });

    let scoreText = $derived.by(() => {
        let style: string[] = [];

        style.push(`font-family: '${textStyle.scoreText}'; font-size: ${textStyle.scoreTextSize}%; text-align: ${textStyle.scoreTextAlign};`);
        style.push(`color: ${hexToRgba(textStyle.scoreTextColor)};`);
        if (!isEnabled) {
            if (filterStyle.reqScoreTextColorIsOn)  {
                style.push(`color: ${hexToRgba(filterStyle.reqFilterSTextColor)}`);
            }
        } else if (choice.isActive) {
            if (filterStyle.selScoreTextColorIsOn) {
                style.push(`color: ${hexToRgba(filterStyle.selFilterSTextColor)}`);
            }
        }

        return style.join(' ');
    });

    let scoreUpdate:string[] = [];

    function changeObjectId() {
        if (choice.id === '') {
            choice.id = choiceId
        } else {
            if (choice.id !== choiceId) {
                choice.id = checkDupId(choice.id, choiceMap);
                if (choice.groups) {
                    for (let i = 0; i < choice.groups.length; i++) {
                        let group = groupMap.get(choice.groups[i]);
                        if (typeof group !== 'undefined') {
                            let elementIndex = group.elements.indexOf(choiceId);
                            if (elementIndex !== -1) group.elements[elementIndex] = choice.id;
                        }
                    }
                }
                if (choice.objectDesignGroups) {
                    for (let i = 0; i < choice.objectDesignGroups.length; i++) {
                        let dGroup = objectDesignMap.get(choice.objectDesignGroups[i]);
                        if (typeof dGroup !== 'undefined') {
                            let elementIndex = dGroup.elements.indexOf(choiceId);
                            if (elementIndex !== -1) dGroup.elements[elementIndex] = choice.id;
                        }
                    }
                }
                choiceMap.set(choice.id, {choice: choice, row: row});
                choiceMap.delete(choiceId);
                choiceId = choice.id;
            }
        }
    }

    function createNewAddon() {
        choice.addons.push({
            id: '',
            title: app.defaultAddonTitle,
            text: app.defaultAddonText,
            template: 1,
            image: '',
            requireds: [],
            parentId: choice.id
        });
    }

    function createNewScore() {
        choice.scores.push({
            idx: generateScoreId(0, 5),
            id: '',
            value: 0,
            type: '',
            requireds: [],
            beforeText: app.defaultBeforePoint,
            afterText: app.defaultAfterPoint,
            showScore: true
        });
    }

    function copyScores() {
        if (choice.scores.length > 0) {
            if (typeof app.tmpScore === 'undefined') app.tmpScore = [];
            app.tmpScore.length = 0;
            for (let i = 0; i < choice.scores.length; i++) {
                const score = JSON.parse(JSON.stringify(choice.scores[i]));
                deleteDiscount(score);
                app.tmpScore.push(score);
            }
            snackbarVariables.labelText = 'Copied to clipboard.';
            snackbarVariables.isOpen = true;
        } else {
            snackbarVariables.labelText = 'Nothing to copy.';
            snackbarVariables.isOpen = true;
        }
    }

    function pasteScore() {
        if (typeof app.tmpScore === 'undefined' || app.tmpScore.length === 0) {
            snackbarVariables.labelText = 'The clipboard is empty.';
            snackbarVariables.isOpen = true;
        } else {
            for (var i = 0; i < app.tmpScore.length; i++) {
                const tmpScore = JSON.parse(JSON.stringify(app.tmpScore[i]));
                deleteDiscount(tmpScore);
                tmpScore.idx = generateScoreId(0, 5);
                choice.scores.push(tmpScore);
            }
        }
    }

    function copyAddons() {
        if (choice.addons.length > 0) {
            if (typeof app.tmpAddon === 'undefined') app.tmpAddon = [];
            app.tmpAddon.length = 0;
            for (let i = 0; i < choice.addons.length; i++) {
                const addon = JSON.parse(JSON.stringify(choice.addons[i]));
                app.tmpAddon.push(addon);
            }
            snackbarVariables.labelText = 'Copied to clipboard.';
            snackbarVariables.isOpen = true;
        } else {
            snackbarVariables.labelText = 'Nothing to copy.';
            snackbarVariables.isOpen = true;
        }
    }

    function pasteAddon() {
        if (typeof app.tmpAddon === 'undefined' || app.tmpAddon.length === 0) {
            snackbarVariables.labelText = 'The clipboard is empty.';
            snackbarVariables.isOpen = true;
        } else {
            for (var i = 0; i < app.tmpAddon.length; i++) {
                const tmpAddon = JSON.parse(JSON.stringify(app.tmpAddon[i]));
                tmpAddon.parentId = choice.id;
                choice.addons.push(tmpAddon);
            }
        }
    }

    function copyRequireds() {
        if (choice.requireds.length > 0) {
            if (typeof app.tmpRequired === 'undefined') app.tmpRequired = [];
            app.tmpRequired.length = 0;
            for (let i = 0; i < choice.requireds.length; i++) {
                const required = JSON.parse(JSON.stringify(choice.requireds[i]));
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
                choice.requireds.push(tmpRequired);
            }
        }
    }

    function copyGroups() {
        if (choice.groups.length > 0) {
            if (typeof app.tmpGroup === 'undefined') app.tmpGroup = [];
            app.tmpGroup.length = 0;
            for (let i = 0; i < choice.groups.length; i++) {
                app.tmpGroup.push(choice.groups[i]);
            }
            snackbarVariables.labelText = 'Copied to clipboard.';
            snackbarVariables.isOpen = true;
        } else {
            snackbarVariables.labelText = 'Nothing to copy.';
            snackbarVariables.isOpen = true;
        }
    }

    function pasteGroup() {
        if (typeof app.tmpGroup === 'undefined' || app.tmpGroup.length === 0) {
            snackbarVariables.labelText = 'The clipboard is empty.';
            snackbarVariables.isOpen = true;
        } else {
            for (var i = 0; i < app.tmpGroup.length; i++) {
                let group = groupMap.get(app.tmpGroup[i]);
                choice.groups.push(app.tmpGroup[i]);
                if (typeof group !== 'undefined') {
                    let elementIndex = group.elements.indexOf(choice.id);
                    if (elementIndex === -1) group.elements.push(choice.id);
                }
            }
        }
    }

    function choiceContext(e: MouseEvent) {
        const target = e.currentTarget as HTMLElement;
        e.preventDefault();
        target.blur();
        if (menuVariables.isOpen) {
            menuVariables.isOpen = false;
            removeAnchor();
        }
        menuVariables.anchor = target.parentElement;
        menuVariables.copy = () => copyObject();
        menuVariables.paste = () => pasteObject(row, choice.index + 1);
        menuVariables.clear = () => clearClipboard(1);
        menuVariables.export = () => exportData(choice, 'choice');
        menuVariables.parent = row;
        menuVariables.importType = 'choice';
        menuVariables.importNum = choice.index + 1;
        tick().then(() => {
            menuVariables.isOpen = true;
        });
    }
    
    function requiredContext(e: MouseEvent) {
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
        menuVariables.export = () => exportData(choice.requireds, 'req');
        menuVariables.parent = choice;
        menuVariables.importType = 'req';
        tick().then(() => {
            menuVariables.isOpen = true;
        });
    }

    function scoreContext(e: MouseEvent) {
        const target = e.currentTarget as HTMLElement;
        e.preventDefault();
        target.blur();
        if (menuVariables.isOpen) {
            menuVariables.isOpen = false;
            removeAnchor();
        }
        menuVariables.anchor = target.parentElement;
        menuVariables.copy = () => copyScores();
        menuVariables.paste = () => pasteScore();
        menuVariables.clear = () => clearClipboard(3);
        menuVariables.export = () => exportData(choice.scores, 'score');
        menuVariables.parent = choice;
        menuVariables.importType = 'score';
        tick().then(() => {
            menuVariables.isOpen = true;
        });
    }

    function addonContext(e: MouseEvent) {
        const target = e.currentTarget as HTMLElement;
        e.preventDefault();
        target.blur();
        if (menuVariables.isOpen) {
            menuVariables.isOpen = false;
            removeAnchor();
        }
        menuVariables.anchor = target.parentElement;
        menuVariables.copy = () => copyAddons();
        menuVariables.paste = () => pasteAddon();
        menuVariables.clear = () => clearClipboard(4);
        menuVariables.export = () => exportData(choice.addons, 'addon');
        menuVariables.parent = choice;
        menuVariables.importType = 'addon';
        tick().then(() => {
            menuVariables.isOpen = true;
        });
    }

    function groupContext(e: MouseEvent) {
        const target = e.currentTarget as HTMLElement;
        e.preventDefault();
        target.blur();
        if (menuVariables.isOpen) {
            menuVariables.isOpen = false;
            removeAnchor();
        }
        menuVariables.anchor = target.parentElement;
        menuVariables.copy = () => copyGroups();
        menuVariables.paste = () => pasteGroup();
        menuVariables.clear = () => clearClipboard(5);
        tick().then(() => {
            menuVariables.isOpen = true;
        });
    }

    function cloneObject() {
        const id = generateObjectId(0, app.objectIdLength);
        const clone: Choice = JSON.parse(JSON.stringify(choice));

        clone.id = id;
        clone.index = index + 1;
        clone.isActive = false;
        delete clone.forcedActivated;
        delete clone.appliedDisChoices;

        for (let i = 0; i < clone.scores.length; i++) {
            const score = clone.scores[i];

            score.idx = generateScoreId(0, 5);
            scoreSet.add(score.idx);
            if (clone.isSelectableMultiple) {
                delete score.isActiveMul;
                delete score.isActiveMulMinus;
            } else {
                delete score.isActive;
            }
            delete score.setValue;
            deleteDiscount(score);
        }

        for (let j = 0; j < clone.addons.length; j++) {
            const addon = clone.addons[j];

            addon.parentId = clone.id;
        }

        if (clone.backpackBtnRequirement) {
            if (typeof app.hideBackpackBtn !== 'undefined') {
                app.hideBackpackBtn += 1;
            } else {
                delete clone.backpackBtnRequirement;
            }
        }

        row.objects.splice(index + 1, 0, clone);
        choiceMap.set(id, {choice: row.objects[index + 1], row: row});

        for (let i = index + 2; i < row.objects.length; i++) {
            row.objects[i].index += 1;
        }

        if (clone.groups) {
            for (let i = 0; i < clone.groups.length; i++) {
                let group = groupMap.get(clone.groups[i]);
                if (typeof group !== 'undefined') {
                    let elementIndex = group.elements.indexOf(id);
                    if (elementIndex === -1) group.elements.push(id);
                }
            }
        }
        if (clone.objectDesignGroups) {
            for (let i = 0; i < clone.objectDesignGroups.length; i++) {
                let dGroup = objectDesignMap.get(clone.objectDesignGroups[i]);
                if (typeof dGroup !== 'undefined') {
                    let elementIndex = dGroup.elements.indexOf(id);
                    if (elementIndex === -1) dGroup.elements.push(id);
                }
            }
        }
    }

    function copyObject() {
        if (typeof app.tmpChoice === 'undefined') app.tmpChoice = [];
        const tmpChoice = JSON.parse(JSON.stringify(choice));

        tmpChoice.isActive = false;
        delete tmpChoice.forcedActivated;
        delete tmpChoice.appliedDisChoices;
        if (typeof tmpChoice.scores !== 'undefined' && tmpChoice.scores.length > 0) {
            for (let i = 0; i < tmpChoice.scores.length; i++) {
                deleteDiscount(tmpChoice.scores[i]);
            }
        }
        app.tmpChoice.length = 0;
        app.tmpChoice.push(tmpChoice);
        snackbarVariables.labelText = 'Copied to clipboard.';
        snackbarVariables.isOpen = true;
    }

    function deleteGroup(num: number) {
        const group = groupMap.get(choice.groups[num]);
        choice.groups.splice(num, 1);
        if (typeof group !== 'undefined') {
            let elementIndex = group.elements.indexOf(choice.id);
            let rowElementIndex = group.rowElements.indexOf(row.id);
            if (elementIndex !== -1) group.elements.splice(elementIndex, 1);
            if (rowElementIndex !== -1) group.rowElements.splice(rowElementIndex, 1);
        }
    }

    function deleteObject() {
        function deleteProc() {
            const idx = choice.index;
            if (choice.backpackBtnRequirement) {
                if (choice.isActive) {
                    app.btnBackpackIsOn -= 1;
                }
                app.hideBackpackBtn -= 1;
            }
            if (choice.showAllAddons && choice.isActive) {
                app.showAddons -= 1;
            }
            if (choice.groups) {
                for (let i = 0; i < choice.groups.length; i++) {
                    let group = groupMap.get(choice.groups[i]);
                    if (typeof group !== 'undefined') {
                        let elementIndex = group.elements.indexOf(choice.id);
                        if (elementIndex !== -1) group.elements.splice(elementIndex, 1);
                    }
                }
            }
            if (choice.objectDesignGroups) {
                for (let i = 0; i < choice.objectDesignGroups.length; i++) {
                    let dGroup = objectDesignMap.get(choice.objectDesignGroups[i]);
                    if (typeof dGroup !== 'undefined') {
                        let elementIndex = dGroup.elements.indexOf(choice.id);
                        if (elementIndex !== -1) dGroup.elements.splice(elementIndex, 1);
                    }
                }
            }

            activatedMap.delete(choice.id);
            tmpActivatedMap.delete(choice.id);
            row.objects.splice(index, 1);
            choiceMap.delete(choice.id);
            for (let i = idx; i < row.objects.length; i++) {
                row.objects[i].index = i;
            }
        }
        if (app.checkDeleteObject) {
            dlgVariables.currentDialog = 'dlgCommon';
            dlgVariables.row = row;
            dlgVariables.context = 'Are you sure you want to delete this choice?<br>Be sure to deselect this choice before delete.';
            dlgVariables.title = '';
            dlgVariables.cFunc = (e: CustomEvent) => {
                if (e.detail.action === 'accept') {
                    deleteProc();
                }
            }
        } else {
            deleteProc();
        }
    }

    function moveChoiceLeft() {
        if (index > 0) {
            [row.objects[index - 1], row.objects[index]] = [row.objects[index], row.objects[index - 1]];
            row.objects[index - 1].index -= 1;
            row.objects[index].index += 1;
        }
    }

    function moveChoiceRight() {
        if (index < row.objects.length - 1) {
            [row.objects[index], row.objects[index + 1]] = [row.objects[index + 1], row.objects[index]];
            row.objects[index].index -= 1;
            row.objects[index + 1].index += 1;
        }
    }

    function objectWidthClass() {
        let objectWidth = (choice.objectWidth || row.objectWidth);
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

    function selectForceActivate(localChoice: Choice, fChoice: Choice, fRow: Row, num: number) {
        if (!fChoice.isNotSelectable || !localChoice.isNotActiveUnselectable) {
            let isLinked = false;

            if (fChoice.activateOtherChoice && typeof fChoice.activateThisChoice !== 'undefined' && linkedObjects.indexOf(localChoice.id) === -1 && fChoice.activateThisChoice.split(',').some(item => item.split('/ON#')[0] === localChoice.id)) {
                linkedObjects.push(localChoice.id);
                isLinked = true;
            }
            if (fChoice.isSelectableMultiple) {
                if (fChoice.isMultipleUseVariable && typeof fChoice.numMultipleTimesMinus !== 'undefined' && typeof fChoice.numMultipleTimesPluss !== 'undefined') {
                    let count = fChoice.multipleUseVariable;

                    if (num > 0) {
                        for (let i = 0; i < num; i++) {
                            selectedOneMore(fChoice, fRow);
                            count++;
                            if (!localChoice.isAllowDeselect) {
                                fChoice.numMultipleTimesMinus += 1;
                            }
                        }
                    } else if (num < 0) {
                        for (let i = 0; i > (num * -1); i++) {
                            selectedOneLess(fChoice, fRow);
                            count--;
                            if (!localChoice.isAllowDeselect) {
                                fChoice.numMultipleTimesPluss -= 1;
                            }
                        }
                    }
                    if (fChoice.multipleUseVariable !== count) {
                        const limitVal = Math.abs(fChoice.numMultipleTimesMinus - fChoice.numMultipleTimesPluss);

                        if (fChoice.numMultipleTimesMinus > fChoice.numMultipleTimePluss) {
                            const tmpAct = tmpActivatedMap.get(fChoice.id);

                            if (num > 0) {
                                fChoice.numMultipleTimesMinus -= limitVal;
                                if (typeof tmpAct !== 'undefined') {
                                    tmpAct.multiple += limitVal;
                                } else {
                                    tmpActivatedMap.set(fChoice.id, {multiple: limitVal, isAllowDeselect: localChoice.isAllowDeselect || false});
                                }
                            } else if (num < 0) {
                                if (typeof tmpAct !== 'undefined') {
                                    tmpAct.multiple -= limitVal;
                                } else {
                                    tmpActivatedMap.set(fChoice.id, {multiple: -limitVal, isAllowDeselect: localChoice.isAllowDeselect || false});
                                }
                            }
                        }
                    }
                }
            } else {
                if (!fChoice.isActive) activateObject(fChoice, fRow);
                if (!localChoice.isAllowDeselect) fChoice.forcedActivated = true;
                if (typeof fChoice.activatedFrom === 'undefined') fChoice.activatedFrom = 0;
                if (!isLinked) fChoice.activatedFrom++;
            }
            if (!fChoice.isActive) {
                delete fChoice.forcedActivated;
                tmpActivatedMap.set(fChoice.id, {multiple: num, isAllowDeselect: localChoice.isAllowDeselect || false});
            }
        }
    }

    function deselectForceActivate(localChoice: Choice, fChoice: Choice, fRow: Row, num: number) {
        if (fChoice.activateOtherChoice && typeof fChoice.activateThisChoice !== 'undefined' && linkedObjects.indexOf(localChoice.id) === -1 && fChoice.activateThisChoice.split(',').some(item => item.split('/ON#')[0] === localChoice.id)) {
            linkedObjects.push(localChoice.id);
        }
        if (fChoice.isSelectableMultiple) {
            if (fChoice.isMultipleUseVariable && typeof fChoice.numMultipleTimesMinus !== 'undefined' && typeof fChoice.numMultipleTimesPluss !== 'undefined') {
                if (fChoice.isActive) {
                    if (num > 0) {
                        for (let i = 0; i < num; i++) {
                            if (!localChoice.isAllowDeselect) fChoice.numMultipleTimesMinus -= 1;
                            if (!localChoice.isNotDeactivate) {
                                selectedOneLess(fChoice, fRow);
                            }
                        }
                    } else if (num < 0) {
                        for (let i = 0; i > (num * -1); i++) {
                            if (!localChoice.isAllowDeselect) fChoice.numMultipleTimesPluss += 1;
                            if (!localChoice.isNotDeactivate) {
                                selectedOneMore(fChoice, fRow);
                            }
                        }
                    }
                } else {
                    const tmpAct = tmpActivatedMap.get(fChoice.id);
                    let tmpNum = 0;

                    if (typeof tmpAct !== 'undefined') {
                        tmpNum = tmpAct.multiple - num;
                        if (tmpNum === 0) {
                            tmpActivatedMap.delete(fChoice.id);
                        } else {
                            tmpActivatedMap.set(fChoice.id, {multiple: tmpNum, isAllowDeselect: localChoice.isAllowDeselect || false});
                        }
                    } else {
                        tmpActivatedMap.delete(fChoice.id);
                    }
                }
            }
        } else {
            if (typeof fChoice.activatedFrom !== 'undefined') {
                fChoice.activatedFrom--;
                if (fChoice.activatedFrom <= 0 || linkedObjects.indexOf(localChoice.id) !== -1) {
                    if (fChoice.isActive) {
                        delete fChoice.activatedFrom;
                        delete fChoice.forcedActivated;
                        if (!localChoice.isNotDeactivate) deselectObject(fChoice, fRow);
                    } else {
                        tmpActivatedMap.delete(fChoice.id);
                    }
                }
            } else {
                delete fChoice.forcedActivated;
                if (!localChoice.isNotDeactivate && fChoice.isActive) deselectObject(fChoice, fRow);
            }
        }
    }

    function selectForceRandomActivate(localChoice: Choice) {
        if (typeof localChoice.activateThisChoice !== 'undefined') {
            let forceList = localChoice.activateThisChoice.split(',');
            let listMap = new Map<string, number>();
            for (let i = 0; i < forceList.length; i++) {
                let [key, val = '0'] = forceList[i].split('/ON#');
                let num = parseInt(val);
                let group = groupMap.get(key);
                if (typeof group !== 'undefined') {
                    for (let j = 0; j < group.elements.length; j++) {
                        const cMap = choiceMap.get(group.elements[j]);
                        
                        if (typeof cMap !== 'undefined') {
                            const gChoice = cMap.choice;
                            const reqCheck = gChoice.isSelectableMultiple && gChoice.isMultipleUseVariable && typeof gChoice.numMultipleTimesPluss !== 'undefined' && gChoice.numMultipleTimesPluss >= gChoice.multipleUseVariable + num && !gChoice.isInfoRow && !gChoice.isNotSelectable && checkRequirements(gChoice.requireds);
                            if (!activatedMap.has(gChoice.id) || reqCheck) {
                                listMap.set(gChoice.id, num);
                            }
                        }
                    }
                } else {
                    const cMap = choiceMap.get(key);

                    if (typeof cMap !== 'undefined') {
                        const lChoice = cMap.choice;
                        const reqCheck = lChoice.isSelectableMultiple && lChoice.isMultipleUseVariable && typeof lChoice.numMultipleTimesPluss !== 'undefined' && lChoice.numMultipleTimesPluss >= lChoice.multipleUseVariable + num && !lChoice.isInfoRow && !lChoice.isNotSelectable && checkRequirements(lChoice.requireds);

                        if (!activatedMap.has(key) || reqCheck) {
                            listMap.set(key, num);
                        }
                    }
                }
            }
            let listArray = [...listMap.keys()];
            let actNum = Math.min(listArray.length, localChoice.numActivateRandom || 0);
            let repeatNum = actNum;
            for (let i = listArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [listArray[i], listArray[j]] = [listArray[j], listArray[i]];
            }
            let result: string[] = [];
            for (let i = 0; i < actNum;) {
                const id = listArray[i];
                const cMap = choiceMap.get(id);
                if (typeof cMap !== 'undefined') {
                    const rndRow = cMap.row;
                    const rndChoice = cMap.choice;
                    const choiceNum = listMap.get(id) || 0;
                    const rndNum = rndChoice.multipleUseVariable;
                    selectForceActivate(localChoice, rndChoice, rndRow, choiceNum);
                    if (!rndChoice.isActive || (rndChoice.isSelectableMultiple && rndChoice.isMultipleUseVariable && rndChoice.multipleUseVariable === rndNum)) {
                        if (result.length < actNum && listArray.length > repeatNum) {
                            listArray[i] = listArray[repeatNum++];
                            if (typeof rndChoice.activatedFrom !== 'undefined') {
                                rndChoice.activatedFrom--;
                                if (rndChoice.activatedFrom === 0) tmpActivatedMap.delete(rndChoice.id);
                            }
                            continue;
                        } else {
                            break;
                        }
                    }
                    let item = choiceNum > 0 ? `${id}/ON#${choiceNum}` : id;
                    result.push(item);
                }
                i++;
            }
            
            if (localChoice.isSelectableMultiple) {
                if (typeof localChoice.activatedRandomMul === 'undefined') localChoice.activatedRandomMul = [];
                localChoice.activatedRandomMul[localChoice.multipleUseVariable - 1] = [...result];
            } else {
                localChoice.activatedRandom = [...result];
            }
        }
    }

    function deselectUpdateScore(localChoice: Choice, tmpScores: TempScore, count: number, changedScores = new Set<string>()) {
        const activated = Array.from(activatedMap.keys());

        for (let i = activated.length - 1; i >= 0; i--) {
            const id = activated[i];
            const cMap = choiceMap.get(id);
            if (typeof cMap !== 'undefined') {
                const aRow = cMap.row;
                const aChoice = cMap.choice;
                const thisTmpScores = new SvelteMap<string, number>();
                const addCountSet = new Set<Choice>();
                const removeCountSet = new Set<Choice>();
                let disChoices = new Set<Choice>();
                let isChanged = false;
                let isRevoked = false;
                let idx = localChoice.appliedDisChoices ? localChoice.appliedDisChoices.indexOf(aChoice.id) : -1;
                for (let j = 0; j < aChoice.scores.length; j++) {
                    const aScore = aChoice.scores[j];
                    if (!aScore.isNotRecalculatable) {
                        const point = pointTypeMap.get(aScore.id);
                        if (typeof point !== 'undefined') {
                            if (localChoice.discountOther && aScore.isChangeDiscount && aScore.isActive && typeof aScore.tmpDisScore !== 'undefined') {
                                if (!localChoice.useDiscountCount || (localChoice.useDiscountCount && localChoice.appliedDisChoices)) {
                                    const mul = aChoice.multipleUseVariable;
                                    let remainDiscount = false;

                                    if (localChoice.useDiscountCount && aScore.discountedFrom && aScore.discountedFrom.length > 0) {
                                        if (idx !== -1) {
                                            for (let k = 0; k < aScore.discountedFrom.length; k++) {
                                                const cMap2 = choiceMap.get(aScore.discountedFrom[k]);

                                                if (typeof cMap2 !== 'undefined') {
                                                    const dChoice = cMap2.choice;
                                                    const cnt = dChoice.isSelectableMultiple && dChoice.isMultipleUseVariable && dChoice.stackableDiscount && dChoice.discountCount ? (dChoice.discountCount * dChoice.multipleUseVariable) + Number(localChoice.id === dChoice.id) : dChoice.discountCount;

                                                    if (dChoice.useDiscountCount && dChoice.appliedDisChoices && cnt && cnt > dChoice.appliedDisChoices.length) {
                                                        if (dChoice.id !== localChoice.id) disChoices.add(dChoice);
                                                        remainDiscount = true;
                                                    }
                                                }
                                            }
                                        } else {
                                            remainDiscount = true;
                                        }
                                    }

                                    if (remainDiscount) {
                                        delete aScore.isChangeDiscount;
                                        delete aScore.tmpDisScore;
                                        continue;
                                    }

                                    if (aChoice.isSelectableMultiple && aChoice.isMultipleUseVariable && typeof aChoice.numMultipleTimesMinus !== 'undefined') {
                                        for (let k = mul - 1; k >= 0; k--) {
                                            if (aChoice.isActive) {
                                                if (point.belowZeroNotAllowed && point.startingSum + aScore.tmpDisScore < 0) {
                                                    if (aChoice.forcedActivated && aChoice.isActive) {
                                                        aChoice.forcedActivated = false;
                                                        aChoice.numMultipleTimesMinus--;
                                                        selectedOneLess(aChoice, aRow);
                                                        aChoice.forcedActivated = true;
                                                    } else {
                                                        selectedOneLess(aChoice, aRow);
                                                    }
                                                } else {
                                                    point.startingSum += aScore.tmpDisScore;
                                                }
                                            }
                                        }

                                        if (aChoice.isActive) {
                                            thisTmpScores.set(aScore.id, aScore.tmpDisScore);
                                            delete aScore.isChangeDiscount;
                                            delete aScore.tmpDisScore;
                                        }
                                    } else if (!aChoice.isSelectableMultiple) {
                                        if (point.belowZeroNotAllowed && point.startingSum + aScore.tmpDisScore < 0) {
                                            if (aChoice.forcedActivated) {
                                                delete aChoice.forcedActivated;
                                                if (!aChoice.isAllowDeselect) tmpActivatedMap.set(aChoice.id, {multiple: aChoice.multipleUseVariable});
                                            }
                                            if (aChoice.isSelectableMultiple && aChoice.isMultipleUseVariable) {
                                                for (let k = 0; k < aChoice.multipleUseVariable; k++) {
                                                    if (aChoice.isActive) selectedOneLess(aChoice, aRow);
                                                }
                                            } else {
                                                if (aChoice.isActive) deselectObject(aChoice, aRow);
                                            }
                                        } else {
                                            point.startingSum += aScore.tmpDisScore;
                                            thisTmpScores.set(aScore.id, aScore.tmpDisScore);
                                            delete aScore.isChangeDiscount;
                                            delete aScore.tmpDisScore;
                                        }
                                    }
                                    isChanged = localChoice.id !== aChoice.id;
                                    if (!aScore.discountIsOn) delete aScore.appliedDiscount;
                                    isRevoked = true;
                                }
                            }
                            if (!changedScores.has(aScore.idx)) {
                                const hasScore = localChoice.scores.length > 0;
                                const scoreLeng = localChoice.scores.length || 1;
                                for (let k = 0; k < scoreLeng; k++) {
                                    const lScore = hasScore ? localChoice.scores[k] : null;
                                    const tmpScore = lScore ? (tmpScores.get(lScore.id) || 0) : 0;
                                    const lPoint = lScore ? pointTypeMap.get(lScore.id) : null;
                                    if (!hasScore || hasScore && lPoint) {
                                        if (aChoice.isActive) {
                                            const afterDeselected = checkRequirements(aScore.requireds);
                                            const tmpActivated: SvelteMap<string, ActivatedMap> = new SvelteMap(JSON.parse(JSON.stringify([...activatedMap])));
                                            tmpActivated.set(localChoice.id, {multiple : localChoice.multipleUseVariable});
                                            aRow.currentChoices += 1;
                                            if (lPoint) lPoint.startingSum += tmpScore;
                                            const beforeDeselected = checkRequirements(aScore.requireds, tmpActivated);
                                            aRow.currentChoices -= 1;
                                            if (lPoint) lPoint.startingSum -= tmpScore;
                                            if (beforeDeselected !== afterDeselected) {
                                                if (!aScore.setValue) setScoreValue(point, aScore);
                                                let scoreVal = aScore.discountIsOn && typeof aScore.discountScore !== 'undefined' && aScore.appliedDiscount ? aScore.discountScore : aScore.value;
                                                scoreVal = point.allowFloat ? scoreVal : Math.floor(scoreVal);
                                                let isApplied = false;
                                                if (beforeDeselected) {
                                                    if (aChoice.isSelectableMultiple && aChoice.isMultipleUseVariable && typeof aChoice.numMultipleTimesMinus !== 'undefined') {
                                                        const mul = aChoice.multipleUseVariable;

                                                        for (let l = mul - 1; l >= 0; l--) {
                                                            if (typeof aScore.isActiveMul !== 'undefined' && aScore.isActiveMul[l]) {
                                                                if (point.belowZeroNotAllowed && point.startingSum + scoreVal < 0) {
                                                                    if (aChoice.forcedActivated && aChoice.isActive) {
                                                                        aChoice.forcedActivated = false;
                                                                        aChoice.numMultipleTimesMinus--;
                                                                        selectedOneLess(aChoice, aRow);
                                                                        aChoice.forcedActivated = true;
                                                                    } else {
                                                                        selectedOneLess(aChoice, aRow);
                                                                    }
                                                                } else {
                                                                    point.startingSum += scoreVal;
                                                                    thisTmpScores.set(aScore.id, scoreVal);
                                                                    aScore.isActiveMul[l] = false;
                                                                    if (!isApplied) isApplied = true;
                                                                }
                                                            }
                                                        }
                                                    } else if (!aChoice.isSelectableMultiple) {
                                                        if (aScore.isActive) {
                                                            if (point.belowZeroNotAllowed && point.startingSum + scoreVal < 0) {
                                                                if (aChoice.forcedActivated) delete aChoice.forcedActivated;
                                                                deselectObject(aChoice, aRow);
                                                            } else {
                                                                point.startingSum += scoreVal;
                                                                thisTmpScores.set(aScore.id, scoreVal);
                                                                delete aScore.isActive;
                                                                isApplied = true;
                                                            }
                                                        }
                                                    }
                                                    if (isApplied && aScore.discountIsOn && aScore.appliedDiscount && aScore.discountedFrom) {
                                                        for (let l = 0; l < aScore.discountedFrom.length; l++) {
                                                            const dcMap = choiceMap.get(aScore.discountedFrom[l]);

                                                            if (typeof dcMap !== 'undefined') {
                                                                const dChoice = dcMap.choice;

                                                                if (dChoice.useDiscountCount && typeof dChoice.discountCount !== 'undefined' && dChoice.appliedDisChoices && dChoice.appliedDisChoices.indexOf(aChoice.id) !== -1) {
                                                                    delete aScore.appliedDiscount;
                                                                    removeCountSet.add(dChoice);
                                                                    break;
                                                                } else {
                                                                    delete aScore.appliedDiscount;
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    if (aScore.setValue) delete aScore.setValue;
                                                } else {
                                                    if (aChoice.isSelectableMultiple && aChoice.isMultipleUseVariable && typeof aChoice.numMultipleTimesMinus !== 'undefined') {
                                                        const mul = aChoice.multipleUseVariable;
                                                        if (typeof aScore.isActiveMul === 'undefined') aScore.isActiveMul = [];
                                                        for (let l = mul - 1; l >= 0; l--) {
                                                            if (!aScore.isActiveMul[l]) {
                                                                if (point.belowZeroNotAllowed && point.startingSum + scoreVal < 0) {
                                                                    if (aChoice.forcedActivated && aChoice.isActive) {
                                                                        aChoice.forcedActivated = false;
                                                                        aChoice.numMultipleTimesMinus--;
                                                                        selectedOneLess(aChoice, aRow);
                                                                        aChoice.forcedActivated = true;
                                                                    } else {
                                                                        selectedOneLess(aChoice, aRow);
                                                                    }
                                                                } else {
                                                                    point.startingSum -= scoreVal;
                                                                    thisTmpScores.set(aScore.id, scoreVal);
                                                                    aScore.isActiveMul[l] = true;
                                                                    if (!isApplied) isApplied = true;
                                                                }
                                                            }
                                                        }
                                                    } else if (!aChoice.isSelectableMultiple) {
                                                        if (!aScore.isActive) {
                                                            if (point.belowZeroNotAllowed && point.startingSum - scoreVal < 0) {
                                                                if (aChoice.forcedActivated) delete aChoice.forcedActivated;
                                                                deselectObject(aChoice, aRow);
                                                            } else {
                                                                point.startingSum -= scoreVal;
                                                                thisTmpScores.set(aScore.id, scoreVal);
                                                                aScore.isActive = true;
                                                                isApplied = true;
                                                            }
                                                        }
                                                    }
                                                    if (isApplied && aScore.discountIsOn && !aScore.appliedDiscount && aScore.discountedFrom) {
                                                        for (let l = 0; l < aScore.discountedFrom.length; l++) {
                                                            const dcMap = choiceMap.get(aScore.discountedFrom[l]);

                                                            if (typeof dcMap !== 'undefined') {
                                                                const dChoice = dcMap.choice;

                                                                if (dChoice.useDiscountCount && typeof dChoice.discountCount !== 'undefined') {
                                                                    const count = dChoice.isSelectableMultiple && dChoice.isMultipleUseVariable && dChoice.stackableDiscount ? dChoice.discountCount * dChoice.multipleUseVariable : dChoice.discountCount;
                                                                    if (!dChoice.appliedDisChoices) dChoice.appliedDisChoices = [];
                                                                    if (count > dChoice.appliedDisChoices.length || dChoice.appliedDisChoices.indexOf(aChoice.id) !== -1) {
                                                                        aScore.appliedDiscount = true;
                                                                        addCountSet.add(dChoice);
                                                                        break;
                                                                    }
                                                                } else {
                                                                    aScore.appliedDiscount = true;
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                if (!isChanged) {
                                                    isChanged = true;
                                                }
                                                changedScores.add(aScore.idx);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (disChoices.size > 0) {
                    const dChoices = Array.from(disChoices);
                    for (let j = 0; j < dChoices.length; j++) {
                        const dChoice = dChoices[j];
                        
                        if (!dChoice.appliedDisChoices) dChoice.appliedDisChoices = [];
                        if (dChoice.appliedDisChoices.indexOf(aChoice.id) === -1) dChoice.appliedDisChoices.push(aChoice.id);
                        if (idx !== -1) localChoice.appliedDisChoices!.splice(idx, 1);
                    }
                }
                if (isRevoked && localChoice.appliedDisChoices && idx !== -1) {
                    localChoice.appliedDisChoices.splice(idx, 1);
                }
                if (removeCountSet.size > 0) {
                    removeCountSet.forEach((dChoice) => {
                        if (dChoice.appliedDisChoices) {
                            if (!dChoice.scores.some(score => score.appliedDiscount)) {
                                const index = dChoice.appliedDisChoices.indexOf(aChoice.id);

                                if (index !== -1) dChoice.appliedDisChoices.splice(index, 1);
                            }
                        }
                    });
                }
                if (addCountSet.size > 0) {
                    addCountSet.forEach((dChoice) => {
                        if (dChoice.appliedDisChoices) {
                            if (dChoice.appliedDisChoices.indexOf(aChoice.id) === -1) dChoice.appliedDisChoices.push(aChoice.id);
                        }
                    });
                }
                if (isChanged) {
                    scoreUpdate.length === 0 ? scoreUpdate.push(`Scores Updated On: ${aChoice.title}`) : scoreUpdate.push(`, ${aChoice.title}`);
                    deselectUpdateScore(aChoice, thisTmpScores, count + 1, changedScores);
                }
            }
        }
        if (count === 0) {
            if (scoreUpdate.length > 0 && !app.hideScoresUpdated) {
                const tempDiv = document.createElement('div');
        
                tempDiv.innerHTML = scoreUpdate.join('');
                snackbarVariables.labelText = tempDiv.textContent;
                snackbarVariables.isOpen = true;
            }
            scoreUpdate.splice(0);
        }
    }

    function selectUpdateScore(localChoice: Choice, tmpScores: TempScore, count: number, changedScores = new Set<string>()) {
        const activated = Array.from(activatedMap.keys());

        for (let i = 0; i < activated.length; i++) {
            const id = activated[i];
            const cMap = choiceMap.get(id);
            if (typeof cMap !== 'undefined') {
                const aRow = cMap.row;
                const aChoice = cMap.choice;
                const thisTmpScores = new SvelteMap<string, number>();
                const addCountSet = new Set<Choice>();
                const removeCountSet = new Set<Choice>();
                let isDiscounted = false;
                let isChanged = false;
                if (localChoice.useDiscountCount && !localChoice.appliedDisChoices) localChoice.appliedDisChoices = [];
                for (let j = 0; j < aChoice.scores.length; j++) {
                    const aScore = aChoice.scores[j];
                    if (!aScore.isNotRecalculatable) {
                        const point = pointTypeMap.get(aScore.id);
                        if (typeof point !== 'undefined') {
                            if (localChoice.discountOther && aScore.isChangeDiscount && aScore.isActive && typeof aScore.tmpDisScore !== 'undefined' && aChoice.id !== localChoice.id) {
                                const mul = aChoice.multipleUseVariable;
                                const count = localChoice.isSelectableMultiple && localChoice.isMultipleUseVariable && localChoice.stackableDiscount && localChoice.discountCount ? localChoice.discountCount * localChoice.multipleUseVariable : localChoice.discountCount;

                                if (!localChoice.useDiscountCount || (localChoice.useDiscountCount && count && count > localChoice.appliedDisChoices!.length)) {
                                    if (aChoice.isSelectableMultiple && aChoice.isMultipleUseVariable && typeof aChoice.numMultipleTimesMinus !== 'undefined') {
                                        for (let k = mul - 1; k >= 0; k--) {
                                            if (aChoice.isActive) {
                                                if (point.belowZeroNotAllowed && point.startingSum + aScore.tmpDisScore < 0) {
                                                    if (aChoice.forcedActivated && aChoice.isActive) {
                                                        aChoice.forcedActivated = false;
                                                        aChoice.numMultipleTimesMinus--;
                                                        selectedOneLess(aChoice, aRow);
                                                        aChoice.forcedActivated = true;
                                                    } else {
                                                        selectedOneLess(aChoice, aRow);
                                                    }
                                                } else {
                                                    point.startingSum += aScore.tmpDisScore;
                                                }
                                            }
                                        }

                                        if (aChoice.isActive) {
                                            thisTmpScores.set(aScore.id, aScore.tmpDisScore);
                                            delete aScore.isChangeDiscount;
                                            delete aScore.tmpDisScore;
                                        }
                                    } else if (!aChoice.isSelectableMultiple) {
                                        if (point.belowZeroNotAllowed && point.startingSum + aScore.tmpDisScore < 0) {
                                            if (aChoice.forcedActivated) delete aChoice.forcedActivated;
                                            deselectObject(aChoice, aRow);
                                        } else {
                                            point.startingSum += aScore.tmpDisScore;
                                            thisTmpScores.set(aScore.id, aScore.tmpDisScore);
                                            delete aScore.isChangeDiscount;
                                            delete aScore.tmpDisScore;
                                        }
                                    }
                                    isChanged = true;
                                    if (aChoice.isActive) {
                                        aScore.appliedDiscount = true;
                                        isDiscounted = true;
                                    }
                                }
                            }
                            if (!changedScores.has(aScore.idx)) {
                                const hasScore = localChoice.scores.length > 0;
                                const scoreLeng = localChoice.scores.length || 1;
                                for (let k = 0; k < scoreLeng; k++) {
                                    const lScore = hasScore ? localChoice.scores[k] : null;
                                    const tmpScore = lScore ? (tmpScores.get(lScore.id) || 0) : 0;
                                    const lPoint = lScore ? pointTypeMap.get(lScore.id) : null;
                                    if (!hasScore || hasScore && lPoint) {
                                        if (aChoice.isActive && !aScore.isChanged) {
                                            const afterSelected = checkRequirements(aScore.requireds);
                                            const tmpActivated: SvelteMap<string, ActivatedMap> = new SvelteMap(JSON.parse(JSON.stringify([...activatedMap])));
                                            tmpActivated.delete(localChoice.id);
                                            aRow.currentChoices -= 1;
                                            if (lPoint) lPoint.startingSum += tmpScore;
                                            const beforeSelected = checkRequirements(aScore.requireds, tmpActivated);
                                            aRow.currentChoices += 1;
                                            if (lPoint) lPoint.startingSum -= tmpScore;
                                            if (beforeSelected !== afterSelected) {
                                                if (!aScore.setValue) setScoreValue(point, aScore);
                                                let scoreVal = aScore.discountIsOn && typeof aScore.discountScore !== 'undefined' && aScore.appliedDiscount ? aScore.discountScore : aScore.value;
                                                scoreVal = point.allowFloat ? scoreVal : Math.floor(scoreVal);
                                                let isApplied = false;
                                                if (beforeSelected) {
                                                    if (aChoice.isSelectableMultiple && aChoice.isMultipleUseVariable && typeof aChoice.numMultipleTimesMinus !== 'undefined') {
                                                        const mul = aChoice.multipleUseVariable;
                                                        
                                                        for (let l = mul - 1; l >= 0; l--) {
                                                            if (typeof aScore.isActiveMul !== 'undefined' && aScore.isActiveMul[l]) {
                                                                if (point.belowZeroNotAllowed && point.startingSum + scoreVal < 0) {
                                                                    if (aChoice.forcedActivated && aChoice.isActive) {
                                                                        aChoice.forcedActivated = false;
                                                                        aChoice.numMultipleTimesMinus--;
                                                                        selectedOneLess(aChoice, aRow);
                                                                        aChoice.forcedActivated = true;
                                                                    } else {
                                                                        selectedOneLess(aChoice, aRow);
                                                                    }
                                                                } else {
                                                                    point.startingSum += scoreVal;
                                                                    thisTmpScores.set(aScore.id, scoreVal);
                                                                    aScore.isActiveMul[l] = false;
                                                                    if (!isApplied) isApplied = true;
                                                                }
                                                            }
                                                        }
                                                    } else if (!aChoice.isSelectableMultiple) {
                                                        if (aScore.isActive) {
                                                            if (point.belowZeroNotAllowed && point.startingSum + scoreVal < 0) {
                                                                if (aChoice.forcedActivated) delete aChoice.forcedActivated;
                                                                deselectObject(aChoice, aRow);
                                                            } else {
                                                                point.startingSum += scoreVal;
                                                                thisTmpScores.set(aScore.id, scoreVal);
                                                                delete aScore.isActive;
                                                                isApplied = true;
                                                            }
                                                        }
                                                    }
                                                    if (isApplied && aScore.discountIsOn && aScore.appliedDiscount && aScore.discountedFrom) {
                                                        for (let l = 0; l < aScore.discountedFrom.length; l++) {
                                                            const dcMap = choiceMap.get(aScore.discountedFrom[l]);

                                                            if (typeof dcMap !== 'undefined') {
                                                                const dChoice = dcMap.choice;

                                                                if (dChoice.useDiscountCount && typeof dChoice.discountCount !== 'undefined' && dChoice.appliedDisChoices && dChoice.appliedDisChoices.indexOf(aChoice.id) !== -1) {
                                                                    delete aScore.appliedDiscount;
                                                                    removeCountSet.add(dChoice);
                                                                    break;
                                                                } else {
                                                                    delete aScore.appliedDiscount;
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    if (aScore.setValue) delete aScore.setValue;
                                                } else {
                                                    if (aChoice.isSelectableMultiple && aChoice.isMultipleUseVariable && typeof aChoice.numMultipleTimesMinus !== 'undefined') {
                                                        const mul = aChoice.multipleUseVariable;
                                                        if (typeof aScore.isActiveMul === 'undefined') aScore.isActiveMul = [];
                                                        for (let l = mul - 1; l >= 0; l--) {
                                                            if (!aScore.isActiveMul[l]) {
                                                                if (point.belowZeroNotAllowed && point.startingSum + scoreVal < 0) {
                                                                    if (aChoice.forcedActivated && aChoice.isActive) {
                                                                        aChoice.forcedActivated = false;
                                                                        aChoice.numMultipleTimesMinus--;
                                                                        selectedOneLess(aChoice, aRow);
                                                                        aChoice.forcedActivated = true;
                                                                    } else {
                                                                        selectedOneLess(aChoice, aRow);
                                                                    }
                                                                } else {
                                                                    point.startingSum -= scoreVal;
                                                                    thisTmpScores.set(aScore.id, scoreVal);
                                                                    aScore.isActiveMul[l] = true;
                                                                    if (!isApplied) isApplied = true;
                                                                }
                                                            }
                                                        }
                                                    } else if (!aChoice.isSelectableMultiple) {
                                                        if (!aScore.isActive) {
                                                            if (point.belowZeroNotAllowed && point.startingSum - scoreVal < 0) {
                                                                if (aChoice.forcedActivated) delete aChoice.forcedActivated;
                                                                deselectObject(aChoice, aRow);
                                                            } else {
                                                                point.startingSum -= scoreVal;
                                                                thisTmpScores.set(aScore.id, scoreVal);
                                                                aScore.isActive = true;
                                                                isApplied = true;
                                                            }
                                                        }
                                                    }
                                                    if (isApplied && aScore.discountIsOn && !aScore.appliedDiscount && aScore.discountedFrom) {
                                                        for (let l = 0; l < aScore.discountedFrom.length; l++) {
                                                            const dcMap = choiceMap.get(aScore.discountedFrom[l]);

                                                            if (typeof dcMap !== 'undefined') {
                                                                const dChoice = dcMap.choice;

                                                                if (dChoice.useDiscountCount && typeof dChoice.discountCount !== 'undefined') {
                                                                    const count = dChoice.isSelectableMultiple && dChoice.isMultipleUseVariable && dChoice.stackableDiscount ? dChoice.discountCount * dChoice.multipleUseVariable : dChoice.discountCount;
                                                                    if (!dChoice.appliedDisChoices) dChoice.appliedDisChoices = [];
                                                                    if (count > dChoice.appliedDisChoices.length || dChoice.appliedDisChoices.indexOf(aChoice.id) !== -1) {
                                                                        aScore.appliedDiscount = true;
                                                                        addCountSet.add(dChoice);
                                                                        break;
                                                                    }
                                                                } else {
                                                                    aScore.appliedDiscount = true;
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                if (!isChanged) {
                                                    isChanged = true;
                                                }
                                                changedScores.add(aScore.idx);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (isDiscounted && localChoice.appliedDisChoices) {
                    if (localChoice.appliedDisChoices.indexOf(aChoice.id) === -1) localChoice.appliedDisChoices.push(aChoice.id);
                }
                if (removeCountSet.size > 0) {
                    removeCountSet.forEach((dChoice) => {
                        if (dChoice.appliedDisChoices) {
                            if (!dChoice.scores.some(score => score.appliedDiscount)) {
                                const index = dChoice.appliedDisChoices.indexOf(aChoice.id);

                                if (index !== -1) dChoice.appliedDisChoices.splice(index, 1);
                            }
                        }
                    });
                }
                if (addCountSet.size > 0) {
                    addCountSet.forEach((dChoice) => {
                        if (dChoice.appliedDisChoices) {
                            if (dChoice.appliedDisChoices.indexOf(aChoice.id) === -1) dChoice.appliedDisChoices.push(aChoice.id);
                        }
                    });
                }
                if (isChanged) {
                    scoreUpdate.length === 0 ? scoreUpdate.push(`Scores Updated On: ${aChoice.title}`) : scoreUpdate.push(`, ${aChoice.title}`);
                    selectUpdateScore(aChoice, thisTmpScores, count + 1, changedScores);
                }
            }
        }
        if (count === 0) {
            if (scoreUpdate.length > 0 && !app.hideScoresUpdated) {
                const tempDiv = document.createElement('div');
        
                tempDiv.innerHTML = scoreUpdate.join('');
                snackbarVariables.labelText = tempDiv.textContent;
                snackbarVariables.isOpen = true;
            }
            scoreUpdate.splice(0);
        }
    }

    function activateTempChoices() {
        let isActivated = false;
        Array.from(tmpActivatedMap.entries()).forEach(([id, val]) => {
            const cMap = choiceMap.get(id);
            if (typeof cMap !== 'undefined') {
                const aRow = cMap.row;
                const aChoice = cMap.choice;
                if (!aChoice.isActive) {
                    activateObject(aChoice, aRow);
                    if (aChoice.isActive) {
                        tmpActivatedMap.delete(id);
                        isActivated = true;
                        if (!val.isAllowDeselect) aChoice.forcedActivated = true;
                    }
                }
            }
        });
        if (isActivated) activateTempChoices();
    }

    function activateObject(localChoice: Choice, localRow: Row, e?: MouseEvent, isManually: boolean = false) {
        let origRow = localRow;
        if (localRow.isResultRow || localRow.isGroupRow) {
            const cMap = choiceMap.get(localChoice.id);

            if (typeof cMap !== 'undefined') {
                origRow = cMap.row;
            }
        }
        if (localChoice.isSelectableMultiple) {
            if (localChoice.id === choice.id && localChoice.allowSelectByClick && localChoice.multipleUseVariable === 0) {
                if (e && e.target) {
                    const target = e.target as HTMLElement;

                    if (target.classList.contains('counter-icons') || target.classList.contains('mdi-plus') || target.classList.contains('mdi-minus') || target.classList.contains('mdc-slider')) {
                        return;
                    }
                }
                selectedOneMore(localChoice, origRow);
            }
        } else {
            if (checkRequirements(localChoice.requireds) && !localRow.isInfoRow && (!isManually || !localChoice.isNotSelectable) && !localChoice.forcedActivated) {
                if (localChoice.isActive) {
                    if (!localChoice.selectOnce) deselectObject(localChoice, origRow);
                } else {
                    selectObject(localChoice, origRow);
                }
            }
        }
    }

    function deselectObject(localChoice: Choice, localRow: Row) {
        const pointCheck = checkPoints(localChoice, false);
        if (pointCheck) {
            const deselectProcess = () => {
                const tmpScores = new SvelteMap<string, number>();
                let countSet = new Set<Choice>();
                for (let i = 0; i < localChoice.scores.length; i++) {
                    const score = localChoice.scores[i];
                    if (checkRequirements(score.requireds) && score.isActive || score.isActive) {
                        const point = pointTypeMap.get(score.id);
                        if (typeof point !== 'undefined') {
                            let val = score.value;
                            if (score.discountIsOn && typeof score.discountScore !== 'undefined' && score.appliedDiscount) {
                                if (score.discountedFrom && score.discountedFrom.length > 0) {
                                    for (let j = 0; j < score.discountedFrom.length; j++) {
                                        const cMap = choiceMap.get(score.discountedFrom[j]);

                                        if (typeof cMap !== 'undefined') {
                                            const dChoice = cMap.choice;

                                            if (dChoice.useDiscountCount && typeof dChoice.discountCount !== 'undefined' && dChoice.appliedDisChoices && dChoice.appliedDisChoices.length > 0) {
                                                countSet.add(dChoice);
                                                break;
                                            }
                                        }
                                    }
                                }
                                val = score.discountScore;
                            }
                            val = point.allowFloat ? val : Math.floor(val);
                            point.startingSum += val;
                            let tmpScore = tmpScores.get(score.id);
                            if (typeof tmpScore !== 'undefined') {
                                tmpScores.set(score.id, -val + tmpScore);
                            } else {
                                tmpScores.set(score.id, -val);
                            }
                            delete score.isActive;
                            delete score.setValue;
                            delete score.appliedDiscount
                        }
                    } else {
                        delete score.setValue;
                        delete score.appliedDiscount;
                    }
                }

                if (countSet.size > 0) {
                    countSet.forEach((dChoice) => {
                        if (dChoice.appliedDisChoices) {
                            const index = dChoice.appliedDisChoices.indexOf(localChoice.id);

                            if (index !== -1) dChoice.appliedDisChoices.splice(index, 1);
                        }
                    });
                }

                if (localChoice.activateOtherChoice && typeof localChoice.activateThisChoice !== 'undefined') {
                    if (localChoice.isActivateRandom && typeof localChoice.activatedRandom !== 'undefined') {
                        for (let i = 0; i < localChoice.activatedRandom.length; i++) {
                            const cMap = choiceMap.get(localChoice.activatedRandom[i]);
                            if (typeof cMap !== 'undefined') {
                                const fRow = cMap.row;
                                const fChoice = cMap.choice;
                                deselectForceActivate(localChoice, fChoice, fRow, 0);
                            }
                        }
                        delete localChoice.activatedRandom;
                    } else {
                        const list = localChoice.activateThisChoice.split(',');
                        for (let i = 0; i < list.length; i++) {
                            const item = list[i].split('/ON#');
                            const forceNum = item.length > 1 ? parseInt(item[1]) : 0;
                            const cMap = choiceMap.get(item[0]);
                            if (typeof cMap !== 'undefined') {
                                const fRow = cMap.row;
                                const fChoice = cMap.choice;
                                deselectForceActivate(localChoice, fChoice, fRow, forceNum);
                            } else {
                                const groupData = groupMap.get(item[0]);
                                if (typeof groupData !== 'undefined') {
                                    const groupEle = groupData.elements;
                                    for (let j = 0; j < groupEle.length; j++) {
                                        const cMap = choiceMap.get(groupEle[j]);
                                        if (typeof cMap !== 'undefined') {
                                            const fRow = cMap.row;
                                            const fChoice = cMap.choice;
                                            deselectForceActivate(localChoice, fChoice, fRow, forceNum);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                if (localChoice.discountOther) {
                    if (typeof localChoice.discountOperator !== 'undefined' && typeof localChoice.discountValue !== 'undefined') {
                        if (typeof localChoice.discountPointTypes === 'undefined') localChoice.discountPointTypes = [];
                        if (localChoice.isDisChoices) {
                            const dList = new Set<string>();
                            if (typeof localChoice.discountRows !== 'undefined') {
                                for (let i = 0; i < localChoice.discountRows.length; i++) {
                                    const dRow = rowMap.get(localChoice.discountRows[i]);
                                    if (typeof dRow !== 'undefined') {
                                        for (let j = 0; j < dRow.objects.length; j++) {
                                            const dChoice = dRow.objects[j];
                                            deselectDiscount(localChoice, dChoice);
                                            dList.add(dChoice.id);
                                        }
                                    }
                                }
                            }
                            if (typeof localChoice.discountChoices !== 'undefined') {
                                for (let i = 0; i < localChoice.discountChoices.length; i++) {
                                    if (!dList.has(localChoice.discountChoices[i])) {
                                        const cMap = choiceMap.get(localChoice.discountChoices[i]);
                                        if (typeof cMap !== 'undefined') {
                                            deselectDiscount(localChoice, cMap.choice);
                                        }
                                    }
                                }
                            }
                        } else {
                            if (typeof localChoice.discountGroups !== 'undefined') {
                                for (let i = 0; i < localChoice.discountGroups.length; i++) {
                                    const groupData = groupMap.get(localChoice.discountGroups[i]);
                                    if (typeof groupData !== 'undefined') {
                                        for (let j = 0; j < groupData.elements.length; j++) {
                                            const cMap = choiceMap.get(groupData.elements[j]);
                                            if (typeof cMap !== 'undefined') {
                                                deselectDiscount(localChoice, cMap.choice);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                
                localChoice.isActive = false;
                localRow.currentChoices -= 1;
                activatedMap.delete(localChoice.id);

                Array.from(activatedMap.entries()).forEach(([id, val]) => {
                    const cMap = choiceMap.get(id);
                    if (typeof cMap !== 'undefined') {
                        const aRow = cMap.row;
                        const aChoice = cMap.choice;
                        if (aChoice.id !== localChoice.id) {
                            if (!checkRequirements(aChoice.requireds)) {
                                if (aChoice.forcedActivated) {
                                    delete aChoice.forcedActivated;
                                    if (!aChoice.isAllowDeselect) tmpActivatedMap.set(aChoice.id, {multiple: val.multiple});
                                }
                                if (val.multiple === 0) {
                                    if (aChoice.isActive) deselectObject(aChoice, aRow);
                                } else if (val.multiple > 0) {
                                    for (let i = 0; i < val.multiple; i++) {
                                        if (aChoice.isActive) selectedOneLess(aChoice, aRow);
                                    }
                                }
                            }
                        }
                    }
                });

                if (localChoice.multiplyPointtypeIsOnCheck && typeof localChoice.pointTypeToMultiply !== 'undefined') {
                    let idx = 0;
                    for (let i = 0; i < localChoice.pointTypeToMultiply.length; i++) {
                        let point = pointTypeMap.get(localChoice.pointTypeToMultiply[i]);

                        if (typeof point !== 'undefined') {
                            for (let j = mdObjects.length - 1; j >= 0; j--) {
                                let mdChoice = mdObjects[j];

                                if (mdChoice.multiplyPointtypeIsOnCheck && typeof mdChoice.startingSumAtMultiply !== 'undefined') {
                                    let val = mdChoice.startingSumAtMultiply[i].value * mdChoice.startingSumAtMultiply[i].calcVal;
                                    val = point.allowFloat ? val : Math.floor(val);
                                    point.startingSum -= val;
                                    point.startingSum += mdChoice.startingSumAtMultiply[i].value;
                                }
                                if (mdChoice.dividePointtypeIsOnCheck && typeof mdChoice.startingSumAtDivide !== 'undefined') {
                                    let val = mdChoice.startingSumAtDivide[i].value / mdChoice.startingSumAtDivide[i].calcVal;
                                    val = point.allowFloat ? val : Math.floor(val);
                                    point.startingSum -= val;
                                    point.startingSum += mdChoice.startingSumAtDivide[i].value;
                                }
                                if (mdChoice.setPointtypeIsOnCheck && typeof mdChoice.startingSumAtSet !== 'undefined') {
                                    point.startingSum = mdChoice.startingSumAtSet[i].value;
                                }
                                if (mdChoice.id === localChoice.id) {
                                    idx = j;
                                    break;
                                }
                            }
                            for (let j = idx + 1;  j < mdObjects.length; j++) {
                                let mdChoice = mdObjects[j];

                                if (mdChoice.multiplyPointtypeIsOnCheck && typeof mdChoice.startingSumAtMultiply !== 'undefined') {
                                    mdChoice.startingSumAtMultiply[i].value = point.startingSum;
                                    point.startingSum *= mdChoice.startingSumAtMultiply[i].calcVal;
                                    point.startingSum = point.allowFloat ? point.startingSum : Math.floor(point.startingSum);
                                } 
                                if (mdChoice.dividePointtypeIsOnCheck && typeof mdChoice.startingSumAtDivide !== 'undefined') {
                                    mdChoice.startingSumAtDivide[i].value = point.startingSum;
                                    point.startingSum /= mdChoice.startingSumAtDivide[i].calcVal;
                                    point.startingSum = point.allowFloat ? point.startingSum : Math.floor(point.startingSum);
                                }
                                if (mdChoice.setPointtypeIsOnCheck && typeof mdChoice.startingSumAtSet !== 'undefined') {
                                    mdChoice.startingSumAtSet[i].value = point.startingSum;
                                    point.startingSum = mdChoice.startingSumAtSet[i].calcVal;
                                    point.startingSum = point.allowFloat ? point.startingSum : Math.floor(point.startingSum);
                                }
                            }
                        }
                    }

                    delete localChoice.multiplyPointtypeIsOnCheck;
                    delete localChoice.startingSumAtMultiply;
                    if (!localChoice.dividePointtypeIsOnCheck && !localChoice.setPointtypeIsOnCheck) mdObjects.splice(idx, 1);
                }

                if (localChoice.dividePointtypeIsOnCheck && typeof localChoice.pointTypeToDivide !== 'undefined') {
                    let idx = 0;
                    for (let i = 0; i < localChoice.pointTypeToDivide.length; i++) {
                        let point = pointTypeMap.get(localChoice.pointTypeToDivide[i]);

                        if (typeof point !== 'undefined') {
                            for (let j = mdObjects.length - 1; j >= 0; j--) {
                                let mdChoice = mdObjects[j];

                                if (mdChoice.multiplyPointtypeIsOnCheck && typeof mdChoice.startingSumAtMultiply !== 'undefined') {
                                    let val = mdChoice.startingSumAtMultiply[i].value * mdChoice.startingSumAtMultiply[i].calcVal;
                                    val = point.allowFloat ? val : Math.floor(val);
                                    point.startingSum -= val;
                                    point.startingSum += mdChoice.startingSumAtMultiply[i].value;
                                }
                                if (mdChoice.dividePointtypeIsOnCheck && typeof mdChoice.startingSumAtDivide !== 'undefined') {
                                    let val = mdChoice.startingSumAtDivide[i].value / mdChoice.startingSumAtDivide[i].calcVal;
                                    val = point.allowFloat ? val : Math.floor(val);
                                    point.startingSum -= val;
                                    point.startingSum += mdChoice.startingSumAtDivide[i].value;
                                }
                                if (mdChoice.setPointtypeIsOnCheck && typeof mdChoice.startingSumAtSet !== 'undefined') {
                                    point.startingSum = mdChoice.startingSumAtSet[i].value;
                                }
                                if (mdChoice.id === localChoice.id) {
                                    idx = j;
                                    break;
                                }
                            }
                            for (let j = idx + 1;  j < mdObjects.length; j++) {
                                let mdChoice = mdObjects[j];

                                if (mdChoice.multiplyPointtypeIsOnCheck && typeof mdChoice.startingSumAtMultiply !== 'undefined') {
                                    mdChoice.startingSumAtMultiply[i].value = point.startingSum;
                                    point.startingSum *= mdChoice.startingSumAtMultiply[i].calcVal;
                                    point.startingSum = point.allowFloat ? point.startingSum : Math.floor(point.startingSum);
                                }
                                if (mdChoice.dividePointtypeIsOnCheck && typeof mdChoice.startingSumAtDivide !== 'undefined') {
                                    mdChoice.startingSumAtDivide[i].value = point.startingSum;
                                    point.startingSum /= mdChoice.startingSumAtDivide[i].calcVal;
                                    point.startingSum = point.allowFloat ? point.startingSum : Math.floor(point.startingSum);
                                }
                                if (mdChoice.setPointtypeIsOnCheck && typeof mdChoice.startingSumAtSet !== 'undefined') {
                                    mdChoice.startingSumAtSet[i].value = point.startingSum;
                                    point.startingSum = mdChoice.startingSumAtSet[i].calcVal;
                                    point.startingSum = point.allowFloat ? point.startingSum : Math.floor(point.startingSum);
                                }
                            }
                        }
                    }

                    delete localChoice.dividePointtypeIsOnCheck;
                    delete localChoice.startingSumAtDivide;
                    if (!localChoice.setPointtypeIsOnCheck) mdObjects.splice(idx, 1);
                }

                if (localChoice.setPointtypeIsOnCheck && typeof localChoice.pointTypeToSet !== 'undefined') {
                    let idx = 0;
                    for (let i = 0; i < localChoice.pointTypeToSet.length; i++) {
                        let point = pointTypeMap.get(localChoice.pointTypeToSet[i]);

                        if (typeof point !== 'undefined') {
                            for (let j = mdObjects.length - 1; j >= 0; j--) {
                                let mdChoice = mdObjects[j];

                                if (mdChoice.multiplyPointtypeIsOnCheck && typeof mdChoice.startingSumAtMultiply !== 'undefined') {
                                    let val = mdChoice.startingSumAtMultiply[i].value * mdChoice.startingSumAtMultiply[i].calcVal;
                                    val = point.allowFloat ? val : Math.floor(val);
                                    point.startingSum -= val;
                                    point.startingSum += mdChoice.startingSumAtMultiply[i].value;
                                }
                                if (mdChoice.dividePointtypeIsOnCheck && typeof mdChoice.startingSumAtDivide !== 'undefined') {
                                    let val = mdChoice.startingSumAtDivide[i].value / mdChoice.startingSumAtDivide[i].calcVal;
                                    val = point.allowFloat ? val : Math.floor(val);
                                    point.startingSum -= val;
                                    point.startingSum += mdChoice.startingSumAtDivide[i].value;
                                }
                                if (mdChoice.setPointtypeIsOnCheck && typeof mdChoice.startingSumAtSet !== 'undefined') {
                                    point.startingSum = mdChoice.startingSumAtSet[i].value;
                                }
                                if (mdChoice.id === localChoice.id) {
                                    idx = j;
                                    break;
                                }
                            }
                            for (let j = idx + 1;  j < mdObjects.length; j++) {
                                let mdChoice = mdObjects[j];

                                if (mdChoice.multiplyPointtypeIsOnCheck && typeof mdChoice.startingSumAtMultiply !== 'undefined') {
                                    mdChoice.startingSumAtMultiply[i].value = point.startingSum;
                                    point.startingSum *= mdChoice.startingSumAtMultiply[i].calcVal;
                                    point.startingSum = point.allowFloat ? point.startingSum : Math.floor(point.startingSum);
                                }
                                if (mdChoice.dividePointtypeIsOnCheck && typeof mdChoice.startingSumAtDivide !== 'undefined') {
                                    mdChoice.startingSumAtDivide[i].value = point.startingSum;
                                    point.startingSum /= mdChoice.startingSumAtDivide[i].calcVal;
                                    point.startingSum = point.allowFloat ? point.startingSum : Math.floor(point.startingSum);
                                }
                                if (mdChoice.setPointtypeIsOnCheck && typeof mdChoice.startingSumAtSet !== 'undefined') {
                                    mdChoice.startingSumAtSet[i].value = point.startingSum;
                                    point.startingSum = mdChoice.startingSumAtSet[i].calcVal;
                                    point.startingSum = point.allowFloat ? point.startingSum : Math.floor(point.startingSum);
                                }
                            }
                        }
                    }

                    delete localChoice.setPointtypeIsOnCheck;
                    delete localChoice.startingSumAtSet;
                    mdObjects.splice(idx, 1);
                }

                if (localChoice.isChangeVariables && typeof localChoice.changedVariables !== 'undefined') {
                    for (let i = 0; i < localChoice.changedVariables.length; i++) {
                        const variable = variableMap.get(localChoice.changedVariables[i]);
                        if (typeof variable !== 'undefined') {
                            if (localChoice.changeType === '1') {
                                variable.isTrue = false;
                            } else if (localChoice.changeType === '2') {
                                variable.isTrue = true;
                            } else if (localChoice.changeType === '3') {
                                variable.isTrue = !variable.isTrue;
                            }
                        }
                    }
                }

                if (localChoice.addToAllowChoice && typeof localChoice.idOfAllowChoice !== 'undefined' && typeof localChoice.numbAddToAllowChoice !== 'undefined') {
                    for (let i = 0; i < localChoice.idOfAllowChoice.length; i++) {
                        const aRow = rowMap.get(localChoice.idOfAllowChoice[i]);
                        if (typeof aRow !== 'undefined') {
                            aRow.allowedChoices -= localChoice.numbAddToAllowChoice;
                            if (aRow.allowedChoices > 0 && aRow.currentChoices >= aRow.allowedChoices) {
                                for (let j = 0; j < aRow.objects.length; j++) {
                                    const thisChoice = aRow.objects[j];
                                    if (thisChoice.isActive) {
                                        if (!thisChoice.forcedActivated) {
                                            if (thisChoice.isSelectableMultiple) {
                                                let counter = thisChoice.multipleUseVariable;
                                                for (let k = 0; k < counter; k++) {
                                                    selectedOneLess(thisChoice, aRow);
                                                }
                                            } else {
                                                deselectObject(thisChoice, aRow);
                                            }
                                        }
                                    }    
                                    if (aRow.allowedChoices >= aRow.currentChoices) {
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }

                if (localChoice.textfieldIsOn && typeof localChoice.idOfTheTextfieldWord !== 'undefined' && typeof localChoice.wordChangeSelect !== 'undefined') {
                    const word = wordMap.get(localChoice.idOfTheTextfieldWord);
                    if (typeof word !== 'undefined') {
                        word.replaceText = typeof localChoice.wordChangeDeselect === 'undefined' ? '' : localChoice.wordChangeDeselect;
                    }
                }

                if (localChoice.isImageUpload) {
                    if (typeof localChoice.defaultImage !== 'undefined') localChoice.image = localChoice.defaultImage;
                }

                if (localChoice.backpackBtnRequirement) {
                    if (typeof app.btnBackpackIsOn !== 'undefined') {
                        app.btnBackpackIsOn -= 1;
                    }
                }

                if (localChoice.showAllAddons) {
                    if (typeof app.showAllAddons !== 'undefined') {
                        app.showAllAddons -= 1;
                    }
                }

                if (localChoice.changeBackground) {
                    if (localChoice.changeBgImage) {
                        if (typeof app.bgImageStack !== 'undefined') {
                            const idx = app.bgImageStack.findIndex(item => item.id === localChoice.id);
                            if (idx !== -1) app.bgImageStack.splice(idx, 1);

                            const leng = app.bgImageStack.length;
                            if (leng > 0) {
                                app.styling.backgroundImage = app.bgImageStack[leng - 1].data;
                            } else {
                                app.styling.backgroundImage = app.defaultBgImage || '';
                                delete app.bgImageStack;
                            }
                        }
                    } else {
                        if (typeof localChoice.changedBgColorCode !== 'undefined') {
                            if (typeof app.bgColorStack !== 'undefined') {
                                const idx = app.bgColorStack.findIndex(item => item.id === localChoice.id);
                                if (idx !== -1) app.bgColorStack.splice(idx, 1);

                                const leng = app.bgColorStack.length;
                                if (leng > 0) {
                                    app.styling.backgroundColor = app.bgColorStack[leng - 1].data;
                                } else {
                                    app.styling.backgroundColor = app.defaultBgColor || '#FFFFFFFF';
                                    delete app.bgColorStack;
                                }
                            }
                        }
                    }
                }
                
                if (localChoice.changePointBar) {
                    if (localChoice.changeBarBgColorIsOn && typeof localChoice.changedBarBgColor !== 'undefined') {
                        if (typeof app.barBgColorStack !== 'undefined') {
                            const idx = app.barBgColorStack.findIndex(item => item.id === localChoice.id);
                            if (idx !== -1) app.barBgColorStack.splice(idx, 1);

                            const leng = app.barBgColorStack.length;
                            if (leng > 0) {
                                app.styling.barBackgroundColor = app.barBgColorStack[leng - 1].data;
                            } else {
                                app.styling.barBackgroundColor = app.defaultBarBgColor || '#FFFFFFFF';
                                delete app.barBgColorStack;
                            }
                        }
                    }
                    if (localChoice.changeBarIconColorIsOn && typeof localChoice.changedBarIconColor !== 'undefined') {
                        if (typeof app.barIconColorStack !== 'undefined') {
                            const idx = app.barIconColorStack.findIndex(item => item.id === localChoice.id);
                            if (idx !== -1) app.barIconColorStack.splice(idx, 1);

                            const leng = app.barIconColorStack.length;
                            if (leng > 0) {
                                app.styling.barIconColor = app.barIconColorStack[leng - 1].data;
                            } else {
                                app.styling.barIconColor = app.defaultBarIconColor || '#0000008A';
                                delete app.barIconColorStack;
                            }
                        }
                    }
                    if (localChoice.changeBarTextColorIsOn && typeof localChoice.changedBarTextColor !== 'undefined') {
                        if (typeof app.barTextColorStack !== 'undefined') {
                            const idx = app.barTextColorStack.findIndex(item => item.id === localChoice.id);
                            if (idx !== -1) app.barTextColorStack.splice(idx, 1);

                            const leng = app.barTextColorStack.length;
                            if (leng > 0) {
                                app.styling.barTextColor = app.barTextColorStack[leng - 1].data;
                            } else {
                                app.styling.barTextColor = app.defaultBarIconColor || '#000000';
                                delete app.barTextColorStack;
                            }
                        }
                    }
                }

                if (localChoice.changeTemplates) {
                    if (localChoice.changeTemplatesList && localChoice.changeToThisTemplate) {
                        const list = localChoice.changeTemplatesList.split(',');
                        
                        for (let i = 0; i < list.length; i++) {
                            const item = list[i];
                            const cMap = choiceMap.get(item);
                            if (typeof cMap !== 'undefined') {
                                const tChoice = cMap.choice;
                                revertTemplate(tChoice, localChoice.id);

                                if (localChoice.changeAddonTemplate) {
                                    for (let j = 0; j < tChoice.addons.length; j++) {
                                        const tAddon = tChoice.addons[j];
                                        revertTemplate(tAddon, localChoice.id);
                                    }
                                }
                                continue;
                            }

                            const tRow = rowMap.get(item);
                            if (typeof tRow !== 'undefined') {
                                revertTemplate(tRow, localChoice.id);
                                continue;
                            }

                            const groupData = groupMap.get(item);
                            if (typeof groupData !== 'undefined') {
                                const groupRowEle = groupData.rowElements;

                                for (let j = 0; j < groupRowEle.length; j++) {
                                    const gtRow = rowMap.get(groupRowEle[j]);
                                    if (typeof gtRow !== 'undefined') {
                                        revertTemplate(gtRow, localChoice.id);
                                    }
                                }
                                const groupEle = groupData.elements;                                    
                                for (let j = 0; j < groupEle.length; j++) {
                                    const gcMap = choiceMap.get(groupEle[j]);
                                    if (typeof gcMap !== 'undefined') {
                                        const gtChoice = gcMap.choice;
                                        revertTemplate(gtChoice, localChoice.id);

                                        if (localChoice.changeAddonTemplate) {
                                            for (let k = 0; k < gtChoice.addons.length; k++) {
                                                const gtAddon = gtChoice.addons[k];
                                                revertTemplate(gtAddon, localChoice.id);
                                            }
                                        }
                                    }
                                }
                                continue;
                            }
                        }
                    }
                }

                if (localChoice.changeWidth) {
                    if (localChoice.changeWidthList && localChoice.changeToThisWidth) {
                        const list = localChoice.changeWidthList.split(',');
                        
                        for (let i = 0; i < list.length; i++) {
                            const item = list[i];
                            const cMap = choiceMap.get(item);
                            if (typeof cMap !== 'undefined') {
                                const tChoice = cMap.choice;
                                revertWidth(tChoice, localChoice.id);
                                continue;
                            }

                            const tRow = rowMap.get(item);
                            if (typeof tRow !== 'undefined') {
                                revertWidth(tRow, localChoice.id);
                                continue;
                            }

                            const groupData = groupMap.get(item);
                            if (typeof groupData !== 'undefined') {
                                const groupRowEle = groupData.rowElements;

                                for (let j = 0; j < groupRowEle.length; j++) {
                                    const gtRow = rowMap.get(groupRowEle[j]);
                                    if (typeof gtRow !== 'undefined') {
                                        revertWidth(gtRow, localChoice.id);
                                    }
                                }
                                const groupEle = groupData.elements;                                    
                                for (let j = 0; j < groupEle.length; j++) {
                                    const gcMap = choiceMap.get(groupEle[j]);
                                    if (typeof gcMap !== 'undefined') {
                                        const gtChoice = gcMap.choice;
                                        revertWidth(gtChoice, localChoice.id);
                                    }
                                }
                                continue;
                            }
                        }
                    }
                }

                if (localChoice.setBgmIsOn && bgmPlayer) {
                    if (localChoice.bgmId) {
                        bgmVariables.bgmIsPlaying = false;
                        playBgm(localChoice, localChoice.bgmId, 0);
                    }
                }

                if (localChoice.muteBgm && bgmPlayer) {
                    const player = get(bgmPlayer);

                    app.isMute = false;
                    if (player && typeof player.unMute === 'function') {
                        player.unMute();
                    }
                }

                if (localChoice.isContentHidden && typeof localChoice.hiddenContentsRow !== 'undefined' && typeof localChoice.hiddenContentsType !== 'undefined') {
                    for (let i = 0; i < localChoice.hiddenContentsRow.length; i++) {
                        const hRow = rowMap.get(localChoice.hiddenContentsRow[i]);
                        if (typeof hRow !== 'undefined') {
                            for (let j = 0; j < localChoice.hiddenContentsType.length; j++) {
                                switch (localChoice.hiddenContentsType[j]) {
                                    case '1':
                                        delete hRow.objectTitleRemoved;
                                        break;
                                    case '2':
                                        delete hRow.objectImageRemoved;
                                        break;
                                    case '3':
                                        delete hRow.objectTextRemoved;
                                        break;
                                    case '4':
                                        delete hRow.objectScoreRemoved;
                                        break;
                                    case '5':
                                        delete hRow.objectRequirementRemoved;
                                        break;
                                    case '6':
                                        delete hRow.addonTitleRemoved;
                                        break;
                                    case '7':
                                        delete hRow.addonImageRemoved;
                                        break;
                                    case '8':
                                        delete hRow.addonTextRemoved;
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }
                    }
                }
                delete localChoice.tempSlots;
                deselectUpdateScore(localChoice, tmpScores, 0);
                activateTempChoices();
                delete localChoice.appliedDisChoices;
            }

            if (localChoice.isSelectDelayed && typeof localChoice.selectDelayTime !== 'undefined') {
                if (!localChoice.selectDelayTimer) {
                    localChoice.selectDelayTimer = window.setTimeout(() => {
                        if (linkedObjects.indexOf(localChoice.id) === -1) {
                            if (localChoice.isFadeTransition) {
                                if (typeof localChoice.fadeTransitionColor === 'undefined' || localChoice.fadeTransitionColor === '') {
                                    app.fadeTransitionColor = '000000FF';
                                } else {
                                    app.fadeTransitionColor = localChoice.fadeTransitionColor;
                                }

                                if (typeof localChoice.fadeInTransitionTime === 'undefined') {
                                    app.fadeTransitionTime = 0.25;
                                } else {
                                    app.fadeTransitionTime = localChoice.fadeInTransitionTime / 1000;
                                }

                                app.fadeTransitionIsOn = true;
                                window.setTimeout(() => {
                                    if (typeof localChoice.fadeOutTransitionTime !== 'undefined') {
                                        app.fadeTransitionTime = localChoice.fadeOutTransitionTime / 1000;
                                    }
                                    app.fadeTransitionIsOn = false;
                                    deselectProcess();
                                }, app.fadeTransitionTime * 1000);
                            } else {
                                deselectProcess();
                            }
                        }
                        if (linkedObjects.indexOf(localChoice.id) === 0) {
                            linkedObjects.splice(0);
                        }
                        delete localChoice.selectDelayTimer;
                    }, localChoice.selectDelayTime);
                }
            } else {
                if (linkedObjects.indexOf(localChoice.id) === -1) {
                    if (localChoice.isFadeTransition) {
                        if (typeof localChoice.fadeTransitionColor === 'undefined' || localChoice.fadeTransitionColor === '') {
                            app.fadeTransitionColor = '000000FF';
                        } else {
                            app.fadeTransitionColor = localChoice.fadeTransitionColor;
                        }

                        if (typeof localChoice.fadeInTransitionTime === 'undefined') {
                            app.fadeTransitionTime = 0.25;
                        } else {
                            app.fadeTransitionTime = localChoice.fadeInTransitionTime / 1000;
                        }

                        app.fadeTransitionIsOn = true;
                        window.setTimeout(() => {
                            if (typeof localChoice.fadeOutTransitionTime !== 'undefined') {
                                app.fadeTransitionTime = localChoice.fadeOutTransitionTime / 1000;
                            }
                            app.fadeTransitionIsOn = false;
                            deselectProcess();
                        }, app.fadeTransitionTime * 1000);
                    } else {
                        deselectProcess();
                    }
                }
                if (linkedObjects.indexOf(localChoice.id) === 0) {
                    linkedObjects.splice(0);
                }
            }
        }
    }

    function selectObject(localChoice: Choice, localRow: Row) {
        let selectable = true;

        if (localRow.allowedChoices > 0 && localRow.currentChoices >= localRow.allowedChoices) {
            let count = 0;
            for (let i = 0; i < localRow.objects.length; i++) {
                const thisChoice = localRow.objects[i];
                if (thisChoice.isActive) {
                    if (!thisChoice.forcedActivated && !thisChoice.selectOnce) {
                        if (thisChoice.isSelectableMultiple) {
                            let counter = thisChoice.multipleUseVariable;
                            for (let j = 0; j < counter; j++) {
                                selectedOneLess(thisChoice, localRow);
                            }
                        } else {
                            activateObject(thisChoice, localRow);
                        }
                        break;
                    } else {
                        count++;
                    }
                }
            }
            if (count >= localRow.allowedChoices) {
                selectable = false;
            }
        }

        if (selectable) {
            for (let i = 0; i < localChoice.scores.length; i++) {
                const score = localChoice.scores[i];
                const point = pointTypeMap.get(score.id);
                if (typeof point !== 'undefined' && !score.setValue){
                    setScoreValue(point, score);
                }
            }
            const pointCheck = checkPoints(localChoice, true);
            if (pointCheck) {
                const selectProcess = () => {
                    const tmpScores = new SvelteMap<string, number>();

                    localChoice.isActive = true;
                    activatedMap.set(localChoice.id, {multiple: 0});
                    localRow.currentChoices += 1;

                    if (localChoice.discountOther) {
                        if (typeof localChoice.discountOperator !== 'undefined' && typeof localChoice.discountValue !== 'undefined') {
                            if (localChoice.isDisChoices) {
                                const dList = new Set<string>();
                                if (typeof localChoice.discountRows !== 'undefined') {
                                    for (let i = 0; i < localChoice.discountRows.length; i++) {
                                        const dRow = rowMap.get(localChoice.discountRows[i]);
                                        if (typeof dRow !== 'undefined') {
                                            for (let j = 0; j < dRow.objects.length; j++) {
                                                const dChoice = dRow.objects[j];
                                                selectDiscount(localChoice, dChoice);
                                                dList.add(dChoice.id);
                                            }
                                        }
                                    }
                                }
                                if (typeof localChoice.discountChoices !== 'undefined') {
                                    for (let i = 0; i < localChoice.discountChoices.length; i++) {
                                        if (!dList.has(localChoice.discountChoices[i])) {
                                            const cMap = choiceMap.get(localChoice.discountChoices[i]);
                                            if (typeof cMap !== 'undefined') {
                                                selectDiscount(localChoice, cMap.choice);
                                            }
                                        }
                                    }
                                }
                            } else {
                                if (typeof localChoice.discountGroups !== 'undefined') {
                                    for (let i = 0; i < localChoice.discountGroups.length; i++) {
                                        const groupData = groupMap.get(localChoice.discountGroups[i]);
                                        if (typeof groupData !== 'undefined') {
                                            for (let j = 0; j < groupData.elements.length; j++) {
                                                const cMap = choiceMap.get(groupData.elements[j]);
                                                if (typeof cMap !== 'undefined') {
                                                    selectDiscount(localChoice, cMap.choice);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    let countSet = new Set<Choice>();
                    for (let i = 0; i < localChoice.scores.length; i++) {
                        const score = localChoice.scores[i];
                        if (checkRequirements(score.requireds) && !score.isActive) {
                            const point = pointTypeMap.get(score.id);
                            if (typeof point !== 'undefined') {
                                let val = score.value;
                                if (score.useExpression && score.setValue) {
                                    expDiscount(point, score);
                                }
                                if (score.appliedDiscount && typeof score.discountScore !== 'undefined') {
                                    val = score.discountScore;
                                } else if (score.discountIsOn && typeof score.discountScore !== 'undefined' && score.discountedFrom && score.discountedFrom.length > 0) {
                                    let isDiscounted = false;
                                    for (let j = 0; j < score.discountedFrom.length; j++) {
                                        const cMap = choiceMap.get(score.discountedFrom[j]);

                                        if (typeof cMap !== 'undefined') {
                                            const dChoice = cMap.choice;

                                            if (dChoice.useDiscountCount && typeof dChoice.discountCount !== 'undefined') {
                                                const count = dChoice.isSelectableMultiple && dChoice.isMultipleUseVariable && dChoice.stackableDiscount ? dChoice.discountCount * dChoice.multipleUseVariable : dChoice.discountCount;
                                                if (!dChoice.appliedDisChoices) dChoice.appliedDisChoices = [];
                                                if (count > dChoice.appliedDisChoices.length) {
                                                    countSet.add(dChoice);
                                                    val = score.discountScore;
                                                    score.appliedDiscount = true;
                                                    isDiscounted = true;
                                                    break;
                                                }
                                            } else {
                                                val = score.discountScore;
                                                score.appliedDiscount = true;
                                                isDiscounted = true;
                                                break;
                                            }
                                        }
                                    }
                                    if (!isDiscounted && typeof score.tmpDiscount !== 'undefined') {
                                        for (let j = 0; j < score.tmpDiscount.length; j++) {
                                            if (val > score.tmpDiscount[j].discountedValue) val = score.tmpDiscount[j].discountedValue;
                                        }
                                    }
                                }
                                val = point.allowFloat ? val : Math.floor(val);
                                point.startingSum -= val;
                                score.isActive = true;
                                let tmpScore = tmpScores.get(score.id);
                                if (typeof tmpScore !== 'undefined') {
                                    tmpScores.set(score.id, val + tmpScore);
                                } else {
                                    tmpScores.set(score.id, val);
                                }
                            }
                        }
                    }
                    
                    if (countSet.size > 0) {
                        countSet.forEach((dChoice) => {
                            if (dChoice.appliedDisChoices) {
                                if (dChoice.appliedDisChoices.indexOf(localChoice.id) === -1) dChoice.appliedDisChoices.push(localChoice.id);
                            }
                        });
                    }

                    if (localChoice.duplicateRow) {
                        if (typeof localChoice.duplicateRowId !== 'undefined' && typeof localChoice.duplicateRowPlace !== 'undefined') {
                            duplicateRow(localChoice, localRow);
                        }
                    }
                    
                    if (localChoice.activateOtherChoice && typeof localChoice.activateThisChoice !== 'undefined') {
                        if (localChoice.isActivateRandom) {
                            selectForceRandomActivate(localChoice);
                        } else {
                            const list = localChoice.activateThisChoice.split(',');
                            for (let i = 0; i < list.length; i++) {
                                const item = list[i].split('/ON#');
                                const forceNum = item.length > 1 ? parseInt(item[1]) : 0;
                                const cMap = choiceMap.get(item[0]);
                                if (typeof cMap !== 'undefined') {
                                    const fRow = cMap.row;
                                    const fChoice = cMap.choice;
                                    selectForceActivate(localChoice, fChoice, fRow, forceNum);
                                } else {
                                    const groupData = groupMap.get(item[0]);
                                    if (typeof groupData !== 'undefined') {
                                        const groupEle = groupData.elements;
                                        for (let j = 0; j < groupEle.length; j++) {
                                            const cMap = choiceMap.get(groupEle[j]);
                                            if (typeof cMap !== 'undefined') {
                                                const fRow = cMap.row;
                                                const fChoice = cMap.choice;
                                                selectForceActivate(localChoice, fChoice, fRow, forceNum);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    
                    if (localChoice.deactivateOtherChoice && typeof localChoice.deactivateThisChoice !== 'undefined') {
                        const list = localChoice.deactivateThisChoice.split(',');
                        for (let i = 0; i < list.length; i++) {
                            const item = list[i].split('/ON#');
                            const deactiveNum = item.length > 1 ? parseInt(item[1]) : 0;
                            const cMap = choiceMap.get(item[0]);
                            if (typeof cMap !== 'undefined') {
                                const dRow = cMap.row;
                                const dChoice = cMap.choice;
                                if (dChoice.isActive) {
                                    if (dChoice.isSelectableMultiple && dChoice.isMultipleUseVariable) {
                                        for (let j = 0; j < deactiveNum; j++) {
                                            selectedOneLess(dChoice, dRow);
                                        }
                                    } else {
                                        deselectObject(dChoice, dRow);
                                    }
                                }
                            } else {
                                const groupData = groupMap.get(item[0]);
                                if (typeof groupData !== 'undefined') {
                                    const groupEle = groupData.elements;
                                    for (let j = 0; j < groupEle.length; j++) {
                                        const cMap = choiceMap.get(groupEle[j]);
                                        if (typeof cMap !== 'undefined') {
                                            const dRow = cMap.row;
                                            const dChoice = cMap.choice;
                                            if (dChoice.isActive) {
                                                if (dChoice.isSelectableMultiple && dChoice.isMultipleUseVariable) {
                                                    for (let k = 0; k < deactiveNum; k++) {
                                                        selectedOneLess(dChoice, dRow);
                                                    }
                                                } else {
                                                    deselectObject(dChoice, dRow);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    Array.from(activatedMap.entries()).forEach(([id, val]) => {
                        const cMap = choiceMap.get(id);
                        if (typeof cMap !== 'undefined') {
                            const aRow = cMap.row;
                            const aChoice = cMap.choice;
                            if (aChoice.id !== localChoice.id) {
                                if (!checkRequirements(aChoice.requireds)) {
                                    if (aChoice.forcedActivated) {
                                        delete aChoice.forcedActivated;
                                        if (!aChoice.isAllowDeselect) tmpActivatedMap.set(aChoice.id, {multiple: val.multiple});
                                    }
                                    if (val.multiple === 0) {
                                        if (aChoice.isActive) deselectObject(aChoice, aRow);
                                    } else if (val.multiple > 0) {
                                        for (let i = 0; i < val.multiple; i++) {
                                            if (aChoice.isActive) selectedOneLess(aChoice, aRow);
                                        }
                                    }
                                }
                            }
                        }
                    });

                    if (localChoice.multiplyPointtypeIsOn && typeof localChoice.pointTypeToMultiply !== 'undefined' && typeof localChoice.multiplyWithThis !== 'undefined') {
                        let count = 0;
                        localChoice.multiplyPointtypeIsOnCheck = true;
                        if (typeof localChoice.startingSumAtMultiply !== 'object') localChoice.startingSumAtMultiply = [];
                        for (let i = 0; i < localChoice.pointTypeToMultiply.length; i++) {
                            let point = pointTypeMap.get(localChoice.pointTypeToMultiply[i]);

                            if (typeof point !== 'undefined') {
                                if (localChoice.multiplyPointtypeIsId && typeof localChoice.multiplyWithThis === 'string') {
                                    let calcPoint = pointTypeMap.get(localChoice.multiplyWithThis);

                                    if (typeof calcPoint !== 'undefined') {
                                        localChoice.startingSumAtMultiply[i] = {value: point.startingSum, calcVal: calcPoint.startingSum};
                                        point.startingSum *= calcPoint.startingSum;
                                        point.startingSum = point.allowFloat ? point.startingSum : Math.floor(point.startingSum);
                                    } else {
                                        count++;
                                    }
                                } else if (typeof localChoice.multiplyWithThis === 'number') {
                                    localChoice.startingSumAtMultiply[i] = {value: point.startingSum, calcVal: localChoice.multiplyWithThis};
                                    point.startingSum *= localChoice.multiplyWithThis;
                                    point.startingSum = point.allowFloat ? point.startingSum : Math.floor(point.startingSum);
                                }
                            } else {
                                count++;
                            }
                        }
                        if (count === localChoice.pointTypeToMultiply.length) delete localChoice.multiplyPointtypeIsOnCheck;
                        if (localChoice.multiplyPointtypeIsOnCheck) mdObjects.push(localChoice);
                    }

                    if (localChoice.dividePointtypeIsOn && typeof localChoice.pointTypeToDivide !== 'undefined' && typeof localChoice.divideWithThis !== 'undefined') {
                        let count = 0;
                        localChoice.dividePointtypeIsOnCheck = true;
                        if (typeof localChoice.startingSumAtDivide !== 'object') localChoice.startingSumAtDivide = [];
                        for (let i = 0; i < localChoice.pointTypeToDivide.length; i++) {
                            let point = pointTypeMap.get(localChoice.pointTypeToDivide[i]);

                            if (typeof point !== 'undefined') {
                                if (localChoice.dividedWithThis === 0) {
                                    count++;
                                } else {
                                    localChoice.startingSumAtDivide[i] = {value: point.startingSum, calcVal: localChoice.divideWithThis};
                                    point.startingSum /= localChoice.divideWithThis;
                                    point.startingSum = point.allowFloat ? point.startingSum : Math.floor(point.startingSum);
                                }
                            } else {
                                count++;
                            }
                        }
                        if (count === localChoice.pointTypeToDivide.length) delete localChoice.dividePointtypeIsOnCheck;
                        if (!localChoice.multiplyPointtypeIsOnCheck && localChoice.dividePointtypeIsOnCheck) mdObjects.push(localChoice);
                    }

                    if (localChoice.setPointtypeIsOn && typeof localChoice.pointTypeToSet !== 'undefined' && typeof localChoice.setWithThis !== 'undefined') {
                        let count = 0;
                        localChoice.setPointtypeIsOnCheck = true;
                        if (typeof localChoice.startingSumAtSet !== 'object') localChoice.startingSumAtSet = [];
                        for (let i = 0; i < localChoice.pointTypeToSet.length; i++) {
                            let point = pointTypeMap.get(localChoice.pointTypeToSet[i]);

                            if (typeof point !== 'undefined') {
                                let val = 0;
                                try {
                                    const replaced = localChoice.setWithThis.replace(/\{([^{}]+)\}/g, (_, vStr) => {
                                        const vPoint = pointTypeMap.get(vStr);
                                        if (typeof vPoint !== 'undefined') {
                                            return `${vPoint.startingSum}`;
                                        }
                                        throw new Error(`Undefined variable: "${vStr}"`);
                                    });
                                    val = evaluate(replaced);
                                    val = point.allowFloat ? val : Math.floor(val);
                                } catch (e) {
                                    console.error(e);
                                }
                                localChoice.startingSumAtSet[i] = {value: point.startingSum, calcVal: val};
                                point.startingSum = val;
                            } else {
                                count++;
                            }
                        }
                        if (count === localChoice.pointTypeToSet.length) delete localChoice.setPointtypeIsOnCheck;
                        if (!localChoice.multiplyPointtypeIsOnCheck && !localChoice.dividePointtypeIsOnCheck && localChoice.setPointtypeIsOnCheck) mdObjects.push(localChoice);
                    }

                    if (localChoice.isChangeVariables && typeof localChoice.changedVariables !== 'undefined') {
                        for (let i = 0; i < localChoice.changedVariables.length; i++) {
                            const variable = variableMap.get(localChoice.changedVariables[i]);
                            if (typeof variable !== 'undefined') {
                                if (localChoice.changeType === '1') {
                                    variable.isTrue = true;
                                } else if (localChoice.changeType === '2') {
                                    variable.isTrue = false;
                                } else if (localChoice.changeType === '3') {
                                    variable.isTrue = !variable.isTrue;
                                }
                            }
                        }
                    }

                    if (localChoice.addToAllowChoice && typeof localChoice.idOfAllowChoice !== 'undefined' && typeof localChoice.numbAddToAllowChoice !== 'undefined') {
                        for (let i = 0; i < localChoice.idOfAllowChoice.length; i++) {
                            const aRow = rowMap.get(localChoice.idOfAllowChoice[i]);
                            if (typeof aRow !== 'undefined') {
                                aRow.allowedChoices += localChoice.numbAddToAllowChoice;
                                if (aRow.allowedChoices > 0 && aRow.currentChoices >= aRow.allowedChoices) {
                                    for (let j = 0; j < aRow.objects.length; j++) {
                                        const thisChoice = aRow.objects[j];
                                        if (thisChoice.isActive) {
                                            if (!thisChoice.forcedActivated) {
                                                if (thisChoice.isSelectableMultiple) {
                                                    let counter = thisChoice.multipleUseVariable;
                                                    for (let k = 0; k < counter; k++) {
                                                        selectedOneLess(thisChoice, aRow);    
                                                    }
                                                } else {
                                                    deselectObject(thisChoice, aRow);
                                                }
                                            }
                                        }
                                        if (aRow.allowedChoices >= aRow.currentChoices) {
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (localChoice.textfieldIsOn && typeof localChoice.idOfTheTextfieldWord !== 'undefined' && typeof localChoice.wordChangeSelect !== 'undefined') {
                        const word = wordMap.get(localChoice.idOfTheTextfieldWord);
                        if (typeof word !== 'undefined') {
                            word.replaceText = localChoice.wordChangeSelect;
                        }
                    }

                    if (localChoice.isImageUpload) {
                        localChoice.defaultImage = localChoice.image;
                        dlgVariables.currentDialog = 'appImageUpload';
                        dlgVariables.data = localChoice;
                        dlgVariables.imgProp = 'image';
                    }

                    if (localChoice.backpackBtnRequirement) {
                        app.btnBackpackIsOn += 1;
                    }

                    if (localChoice.showAllAddons) {
                        app.showAllAddons += 1;
                    }

                    if (localChoice.changeBackground) {
                        if (localChoice.changeBgImage) {
                            if (typeof localChoice.bgImage !== 'undefined') {
                                if (typeof app.bgImageStack === 'undefined') {
                                    app.bgImageStack = [];
                                    app.defaultBgImage = app.styling.backgroundImage || '';
                                }
                                app.bgImageStack.push({id: localChoice.id, data: localChoice.bgImage});
                                app.styling.backgroundImage = localChoice.bgImage;
                            }
                        } else {
                            if (typeof localChoice.changedBgColorCode !== 'undefined') {
                                if (typeof app.bgColorStack === 'undefined') {
                                    app.bgColorStack = [];
                                    app.defaultBgColor = app.styling.backgroundColor || '';
                                }
                                app.bgColorStack.push({id: localChoice.id, data: localChoice.changedBgColorCode});
                                app.styling.backgroundColor = localChoice.changedBgColorCode;
                            }
                        }
                    }
                    
                    if (localChoice.changePointBar) {
                        if (localChoice.changeBarBgColorIsOn && typeof localChoice.changedBarBgColor !== 'undefined') {
                            if (typeof app.barBgColorStack === 'undefined') {
                                app.barBgColorStack = [];
                                app.defaultBarBgColor = app.styling.barBackgroundColor || '#FFFFFFFF';
                            }
                            app.barBgColorStack.push({id: localChoice.id, data: localChoice.changedBarBgColor});
                            app.styling.barBackgroundColor = localChoice.changedBarBgColor;
                        }
                        if (localChoice.changeBarIconColorIsOn && typeof localChoice.changedBarIconColor !== 'undefined') {
                            if (typeof app.barIconColorStack === 'undefined') {
                                app.barIconColorStack = [];
                                app.defaultBarIconColor = app.styling.barIconColor || '#0000008A';
                            }
                            app.barIconColorStack.push({id: localChoice.id, data: localChoice.changedBarIconColor});
                            app.styling.barIconColor = localChoice.changedBarIconColor;
                        }
                        if (localChoice.changeBarTextColorIsOn && typeof localChoice.changedBarTextColor !== 'undefined') {
                            if (typeof app.barTextColorStack === 'undefined') {
                                app.barTextColorStack = [];
                                app.defaultBarTextColor = app.styling.barTextColor || '#000000';
                            }
                            app.barTextColorStack.push({id: localChoice.id, data: localChoice.changedBarTextColor});
                            app.styling.barTextColor = localChoice.changedBarTextColor;
                        }
                    }

                    if (localChoice.changeTemplates) {
                        if (localChoice.changeTemplatesList && localChoice.changeToThisTemplate) {
                            const list = localChoice.changeTemplatesList.split(',');
                            
                            for (let i = 0; i < list.length; i++) {
                                const item = list[i];
                                const cMap = choiceMap.get(item);
                                if (typeof cMap !== 'undefined') {
                                    const tChoice = cMap.choice;
                                    applyTemplate(tChoice, localChoice.id, localChoice.changeToThisTemplate);

                                    if (localChoice.changeAddonTemplate) {
                                        for (let j = 0; j < tChoice.addons.length; j++) {
                                            const tAddon = tChoice.addons[j];
                                            applyTemplate(tAddon, localChoice.id, localChoice.changeToThisTemplate);
                                        }
                                    }
                                    continue;
                                }

                                const tRow = rowMap.get(item);
                                if (typeof tRow !== 'undefined') {
                                    applyTemplate(tRow, localChoice.id, localChoice.changeToThisTemplate);
                                    continue;
                                }

                                const groupData = groupMap.get(item);
                                if (typeof groupData !== 'undefined') {
                                    const groupRowEle = groupData.rowElements;

                                    for (let j = 0; j < groupRowEle.length; j++) {
                                        const gtRow = rowMap.get(groupRowEle[j]);
                                        if (typeof gtRow !== 'undefined') {
                                            applyTemplate(gtRow, localChoice.id, localChoice.changeToThisTemplate);
                                        }
                                    }
                                    const groupEle = groupData.elements;                                    
                                    for (let j = 0; j < groupEle.length; j++) {
                                        const gcMap = choiceMap.get(groupEle[j]);
                                        if (typeof gcMap !== 'undefined') {
                                            const gtChoice = gcMap.choice;
                                            applyTemplate(gtChoice, localChoice.id, localChoice.changeToThisTemplate);

                                            if (localChoice.changeAddonTemplate) {
                                                for (let k = 0; k < gtChoice.addons.length; k++) {
                                                    const gtAddon = gtChoice.addons[k];
                                                    applyTemplate(gtAddon, localChoice.id, localChoice.changeToThisTemplate);
                                                }
                                            }
                                        }
                                    }
                                    continue;
                                }
                            }
                        }
                    }

                    if (localChoice.changeWidth) {
                        if (localChoice.changeWidthList && localChoice.changeToThisWidth) {
                            const list = localChoice.changeWidthList.split(',');
                            
                            for (let i = 0; i < list.length; i++) {
                                const item = list[i];
                                const cMap = choiceMap.get(item);
                                if (typeof cMap !== 'undefined') {
                                    const tChoice = cMap.choice;
                                    applyWidth(tChoice, localChoice.id, localChoice.changeToThisWidth);
                                    continue;
                                }

                                const tRow = rowMap.get(item);
                                if (typeof tRow !== 'undefined') {
                                    applyWidth(tRow, localChoice.id, localChoice.changeToThisWidth);
                                    continue;
                                }

                                const groupData = groupMap.get(item);
                                if (typeof groupData !== 'undefined') {
                                    const groupRowEle = groupData.rowElements;

                                    for (let j = 0; j < groupRowEle.length; j++) {
                                        const gtRow = rowMap.get(groupRowEle[j]);
                                        if (typeof gtRow !== 'undefined') {
                                            applyWidth(gtRow, localChoice.id, localChoice.changeToThisWidth);
                                        }
                                    }
                                    const groupEle = groupData.elements;                                    
                                    for (let j = 0; j < groupEle.length; j++) {
                                        const gcMap = choiceMap.get(groupEle[j]);
                                        if (typeof gcMap !== 'undefined') {
                                            const gtChoice = gcMap.choice;
                                            applyWidth(gtChoice, localChoice.id, localChoice.changeToThisWidth);
                                        }
                                    }
                                    continue;
                                }
                            }
                        }
                    }

                    if (localChoice.setBgmIsOn) {
                        if (localChoice.bgmId) {
                            bgmVariables.bgmIsPlaying = true;
                            
                            if (bgmVariables.isBgmInit) {
                                playBgm(localChoice, localChoice.bgmId, 0);
                            } else {
                                initYoutubePlayer(localChoice);
                                bgmVariables.isBgmInit = true;
                            }
                        }
                    }

                    if (localChoice.muteBgm && bgmPlayer) {
                        const player = get(bgmPlayer);

                        app.isMute = true;
                        if (player && typeof player.mute === 'function') {
                            player.mute();
                        }
                    }

                    if (localChoice.isContentHidden && typeof localChoice.hiddenContentsRow !== 'undefined' && typeof localChoice.hiddenContentsType !== 'undefined') {
                        for (let i = 0; i < localChoice.hiddenContentsRow.length; i++) {
                            const hRow = rowMap.get(localChoice.hiddenContentsRow[i]);
                            if (typeof hRow !== 'undefined') {
                                if (!hRow.textIsRemoved) hRow.textIsRemoved = true;
                                for (let j = 0; j < localChoice.hiddenContentsType.length; j++) {
                                    switch (localChoice.hiddenContentsType[j]) {
                                        case '1':
                                            hRow.objectTitleRemoved = true;
                                            break;
                                        case '2':
                                            hRow.objectImageRemoved = true;
                                            break;
                                        case '3':
                                            hRow.objectTextRemoved = true;
                                            break;
                                        case '4':
                                            hRow.objectScoreRemoved = true;
                                            break;
                                        case '5':
                                            hRow.objectRequirementRemoved = true;
                                            break;
                                        case '6':
                                            hRow.addonTitleRemoved = true;
                                            break;
                                        case '7':
                                            hRow.addonImageRemoved = true;
                                            break;
                                        case '8':
                                            hRow.addonTextRemoved = true;
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            }
                        }
                    }

                    if (localChoice.scrollToRow) {
                        tick().then(() => {
                            setTimeout(() => {
                                if (localChoice.scrollToObject) {
                                    if (localChoice.scrollObjectId) {
                                        const cMap = choiceMap.get(localChoice.scrollObjectId);
                                        if (typeof cMap !== 'undefined') {
                                            const sChoice = cMap.choice;
                                            const sRow = cMap.row;
                                            const idx = app.useToolbarBtn || !bCreatorMode ? sRow.index : sRow.index + 1;
                                            const divs = mainDiv?.children[idx]?.children[1]?.children[1]?.children;
                                            if (typeof divs !== 'undefined') {
                                                if (isBackpack) {
                                                    const thisWindow = document.getElementById('backpackDialog');
                                                    thisWindow?.scrollTo({top: divs[sChoice.index].getBoundingClientRect().top + window.scrollY, behavior: 'smooth'});
                                                }
                                                window.scrollTo({top: divs[sChoice.index].getBoundingClientRect().top + window.scrollY, behavior: 'smooth'});
                                            }
                                        }
                                    }
                                } else {
                                    if (localChoice.scrollRowId) {
                                        const sRow = rowMap.get(localChoice.scrollRowId);
                                        if (typeof sRow !== 'undefined') {
                                            const divs = mainDiv?.children;
                                            if (typeof divs !== 'undefined') {
                                                const idx = app.useToolbarBtn || !bCreatorMode ? sRow.index : sRow.index + 1;
                                                if (isBackpack) {
                                                    const thisWindow = document.getElementById('backpackDialog');
                                                    thisWindow?.scrollTo({top: divs[idx].getBoundingClientRect().top + window.scrollY, behavior: 'smooth'});
                                                } else {
                                                    window.scrollTo({top: divs[idx].getBoundingClientRect().top + window.scrollY, behavior: 'smooth'});
                                                }
                                            }
                                        }
                                    }
                                }
                            }, 10);
                        });
                    }

                    if (localChoice.cleanACtivatedOnSelect) {
                        cleanActivated();
                    }

                    selectUpdateScore(localChoice, tmpScores, 0);
                    activateTempChoices();
                    
                    if (!checkRequirements(localChoice.requireds) && localChoice.isActive) {
                        deselectObject(localChoice, localRow);
                    }
                }
                if (localChoice.isSelectDelayed && typeof localChoice.selectDelayTime !== 'undefined') {
                    if (!localChoice.selectDelayTimer) {
                        localChoice.selectDelayTimer = window.setTimeout(() => {
                            if (localChoice.customTextfieldIsOn && !isOverDlg) {
                                wordDialog.choice = localChoice;
                                wordDialog.row = localRow;
                                wordDialog.context = typeof localChoice.wordPromptText !== 'undefined' ? localChoice.wordPromptText : '';
                                wordDialog.prevText = localChoice.wordChangeSelect || '';
                                wordDialog.isWord = true;
                                currentDialog = 'dlgCommon';
                                
                                return;
                            }

                            if (localChoice.confirmIsOn && !isOverDlg) {
                                wordDialog.choice = localChoice;
                                wordDialog.row = localRow;
                                wordDialog.context = typeof localChoice.wordPromptText !== 'undefined' ? localChoice.wordPromptText : '';
                                wordDialog.isWord = false;
                                currentDialog = 'dlgCommon';
                                
                                return;
                            }

                            if (linkedObjects.indexOf(localChoice.id) === -1) {
                                if (localChoice.isFadeTransition) {
                                    if (typeof localChoice.fadeTransitionColor === 'undefined' || localChoice.fadeTransitionColor === '') {
                                        app.fadeTransitionColor = '000000FF';
                                    } else {
                                        app.fadeTransitionColor = localChoice.fadeTransitionColor;
                                    }

                                    if (typeof localChoice.fadeInTransitionTime === 'undefined') {
                                        app.fadeTransitionTime = 0.25;
                                    } else {
                                        app.fadeTransitionTime = localChoice.fadeInTransitionTime / 1000;
                                    }

                                    app.fadeTransitionIsOn = true;
                                    window.setTimeout(() => {
                                        if (typeof localChoice.fadeOutTransitionTime !== 'undefined') {
                                            app.fadeTransitionTime = localChoice.fadeOutTransitionTime / 1000;
                                        }
                                        app.fadeTransitionIsOn = false;
                                        selectProcess();
                                    }, app.fadeTransitionTime * 1000);
                                } else {
                                    selectProcess();
                                }
                            }
                            if (linkedObjects.indexOf(localChoice.id) === 0) {
                                linkedObjects.splice(0);
                            }
                            delete localChoice.selectDelayTimer;
                        }, localChoice.selectDelayTime);
                    }
                } else {
                    if (localChoice.customTextfieldIsOn && !isOverDlg) {
                        wordDialog.choice = localChoice;
                        wordDialog.row = localRow;
                        wordDialog.context = typeof localChoice.wordPromptText !== 'undefined' ? localChoice.wordPromptText : '';
                        wordDialog.prevText = localChoice.wordChangeSelect || '';
                        wordDialog.isWord = true;
                        currentDialog = 'dlgCommon';
                        
                        return;
                    }

                    if (localChoice.confirmIsOn && !isOverDlg) {
                        wordDialog.choice = localChoice;
                        wordDialog.row = localRow;
                        wordDialog.context = typeof localChoice.wordPromptText !== 'undefined' ? localChoice.wordPromptText : '';
                        wordDialog.isWord = false;
                        currentDialog = 'dlgCommon';
                        
                        return;
                    }

                    if (linkedObjects.indexOf(localChoice.id) === -1) {
                        if (localChoice.isFadeTransition) {
                            if (typeof localChoice.fadeTransitionColor === 'undefined' || localChoice.fadeTransitionColor === '') {
                                app.fadeTransitionColor = '000000FF';
                            } else {
                                app.fadeTransitionColor = localChoice.fadeTransitionColor;
                            }

                            if (typeof localChoice.fadeInTransitionTime === 'undefined') {
                                app.fadeTransitionTime = 0.25;
                            } else {
                                app.fadeTransitionTime = localChoice.fadeInTransitionTime / 1000;
                            }

                            app.fadeTransitionIsOn = true;
                            window.setTimeout(() => {
                                if (typeof localChoice.fadeOutTransitionTime !== 'undefined') {
                                    app.fadeTransitionTime = localChoice.fadeOutTransitionTime / 1000;
                                }
                                app.fadeTransitionIsOn = false;
                                selectProcess();
                            }, app.fadeTransitionTime * 1000);
                        } else {
                            selectProcess();
                        }
                    }
                    if (linkedObjects.indexOf(localChoice.id) === 0) {
                        linkedObjects.splice(0);
                    }
                }
            } else {
                for (let i = 0; i < localChoice.scores.length; i++) {
                    const score = localChoice.scores[i];
                    if (score.setValue) delete score.setValue;
                }
            }
        }
    }

    function selectedOneMore(localChoice: Choice, localRow: Row) {
        const reqCheck = checkRequirements(localChoice.requireds) && !localRow.isInfoRow && !localChoice.isNotSelectable;
        let selectable = true;
        let origRow = localRow;
        if (localRow.isResultRow) {
            const cMap = choiceMap.get(localChoice.id);

            if (typeof cMap !== 'undefined') {
                origRow = cMap.row;
            }
        }

        if (reqCheck && localChoice.isMultipleUseVariable && localChoice.multipleUseVariable === 0) {
            if (origRow.allowedChoices > 0 && origRow.currentChoices >= origRow.allowedChoices) {
                let count = 0;
                for (let i = 0; i < origRow.objects.length; i++) {
                    const thisChoice = origRow.objects[i];
                    if (thisChoice.isActive) {
                        if (!thisChoice.forcedActivated && !thisChoice.selectOnce) {
                            if (thisChoice.isSelectableMultiple) {
                                let counter = thisChoice.multipleUseVariable;
                                for (let j = 0; j < counter; j++) {
                                    selectedOneLess(thisChoice, origRow);
                                }
                            } else {
                                activateObject(thisChoice, origRow);
                            }
                            break;
                        } else {
                            count++;
                        }
                    }
                }
                if (count >= origRow.allowedChoices) {
                    selectable = false;
                }
            }
        }

        if (selectable) {
            for (let i = 0; i < localChoice.scores.length; i++) {
                const score = localChoice.scores[i];
                const point = pointTypeMap.get(score.id);
                if (typeof point !== 'undefined' && !score.setValue){
                    setScoreValue(point, score);
                }
            }
            const pointCheck = checkPoints(localChoice, true);
            if (pointCheck) {
                const selectProcess = () => {
                    const tmpScores = new SvelteMap<string, number>();
                    const wasActive = localChoice.isActive;
                    const isPos = localChoice.multipleUseVariable >= 0;
                    const selNum = Math.abs(localChoice.multipleUseVariable);

                    localChoice.multipleUseVariable += 1;

                    if (localChoice.multipleUseVariable === 0) {
                        activatedMap.delete(localChoice.id);
                        localChoice.isActive = false;
                        origRow.currentChoices -= 1;
                    } else {
                        if (localChoice.multipleUseVariable === 1) {
                            localChoice.isActive = true;
                            origRow.currentChoices += 1;
                        }
                        activatedMap.set(localChoice.id, {multiple: localChoice.multipleUseVariable});
                    }

                    if (isPos) {
                        if (localChoice.discountOther) {
                            if (typeof localChoice.discountOperator !== 'undefined' && typeof localChoice.discountValue !== 'undefined' && (localChoice.stackableDiscount || !localChoice.stackableDiscount && localChoice.multipleUseVariable === 1)) {
                                if (localChoice.isDisChoices) {
                                    const dList = new Set<string>();
                                    if (typeof localChoice.discountRows !== 'undefined') {
                                        for (let i = 0; i < localChoice.discountRows.length; i++) {
                                            const dRow = rowMap.get(localChoice.discountRows[i]);
                                            if (typeof dRow !== 'undefined') {
                                                for (let j = 0; j < dRow.objects.length; j++) {
                                                    const dChoice = dRow.objects[j];
                                                    selectDiscount(localChoice, dChoice);
                                                    dList.add(dChoice.id);
                                                }
                                            }
                                        }
                                    }
                                    if (typeof localChoice.discountChoices !== 'undefined') {
                                        for (let i = 0; i < localChoice.discountChoices.length; i++) {
                                            if (!dList.has(localChoice.discountChoices[i])) {
                                                const cMap = choiceMap.get(localChoice.discountChoices[i]);
                                                if (typeof cMap !== 'undefined') {
                                                    selectDiscount(localChoice, cMap.choice);
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    if (typeof localChoice.discountGroups !== 'undefined') {
                                        for (let i = 0; i < localChoice.discountGroups.length; i++) {
                                            const groupData = groupMap.get(localChoice.discountGroups[i]);
                                            if (typeof groupData !== 'undefined') {
                                                for (let j = 0; j < groupData.elements.length; j++) {
                                                    const cMap = choiceMap.get(groupData.elements[j]);
                                                    if (typeof cMap !== 'undefined') {
                                                        selectDiscount(localChoice, cMap.choice);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        let countSet = new Set<Choice>();
                        for (let i = 0; i < localChoice.scores.length; i++) {
                            const score = localChoice.scores[i];
                            if (typeof score.isActiveMul === 'undefined') score.isActiveMul = [];
                            if (checkRequirements(score.requireds) && !score.isActiveMul[selNum]) {
                                const point = pointTypeMap.get(score.id);
                                if (typeof point !== 'undefined') {
                                    let val = score.value;
                                    if (score.useExpression && score.setValue) {
                                        expDiscount(point, score);
                                    }
                                    if (score.appliedDiscount && typeof score.discountScore !== 'undefined') {
                                        val = score.discountScore;
                                    } else if (score.discountIsOn && typeof score.discountScore !== 'undefined' && score.discountedFrom && score.discountedFrom.length > 0) {
                                        let isDiscounted = false;
                                        for (let j = 0; j < score.discountedFrom.length; j++) {
                                            const cMap = choiceMap.get(score.discountedFrom[j]);

                                            if (typeof cMap !== 'undefined') {
                                                const dChoice = cMap.choice;

                                                if (dChoice.useDiscountCount && typeof dChoice.discountCount !== 'undefined') {
                                                    const count = dChoice.isSelectableMultiple && dChoice.isMultipleUseVariable && dChoice.stackableDiscount ? dChoice.discountCount * dChoice.multipleUseVariable : dChoice.discountCount;
                                                    if (!dChoice.appliedDisChoices) dChoice.appliedDisChoices = [];
                                                    if (count > dChoice.appliedDisChoices.length) {
                                                        countSet.add(dChoice);
                                                        val = score.discountScore;
                                                        score.appliedDiscount = true;
                                                        isDiscounted = true;
                                                        break;
                                                    }
                                                } else {
                                                    val = score.discountScore;
                                                    score.appliedDiscount = true;
                                                    isDiscounted = true;
                                                    break;
                                                }
                                            }
                                        }
                                        if (!isDiscounted && typeof score.tmpDiscount !== 'undefined') {
                                            for (let j = 0; j < score.tmpDiscount.length; j++) {
                                                if (val > score.tmpDiscount[j].discountedValue) val = score.tmpDiscount[j].discountedValue;
                                            }
                                        }
                                    }
                                    val = point.allowFloat ? val : Math.floor(val);
                                    if (score.multiplyByTimes) {
                                        val = val * (selNum + 1);
                                    }
                                    point.startingSum -= val;
                                    score.isActiveMul[selNum] = true;
                                    let tmpScore = tmpScores.get(score.id);
                                    if (typeof tmpScore !== 'undefined') {
                                        tmpScores.set(score.id, val + tmpScore);
                                    } else {
                                        tmpScores.set(score.id, val);
                                    }
                                }
                            }
                        }

                        if (countSet.size > 0) {
                            countSet.forEach((dChoice) => {
                                if (dChoice.appliedDisChoices) {
                                    if (dChoice.appliedDisChoices.indexOf(localChoice.id) === -1) dChoice.appliedDisChoices.push(localChoice.id);
                                }
                            });
                        }
                    } else {
                        for (let i = 0; i < localChoice.scores.length; i++) {
                            const score = localChoice.scores[i];
                            if (typeof score.isActiveMulMinus === 'undefined') score.isActiveMulMinus = [];
                            if (checkRequirements(score.requireds) && score.isActiveMulMinus[selNum] || score.isActiveMulMinus[selNum]) {
                                const point = pointTypeMap.get(score.id);
                                if (typeof point !== 'undefined') {
                                    let val = score.discountIsOn && typeof score.discountScore !== 'undefined' ? score.discountScore : score.value;
                                    val = point.allowFloat ? val : Math.floor(val);
                                    if (score.multiplyByTimes) {
                                        val = val * (Math.abs(selNum));
                                    }
                                    point.startingSum -= val;
                                    let tmpScore = tmpScores.get(score.id);
                                    if (typeof tmpScore !== 'undefined') {
                                        tmpScores.set(score.id, val + tmpScore);
                                    } else {
                                        tmpScores.set(score.id, val);
                                    }
                                    delete score.isActiveMulMinus[selNum];
                                }
                            }
                        }
                    }

                    if (isPos) {
                        if (localChoice.duplicateRow) {
                            if (typeof localChoice.duplicateRowId !== 'undefined' && typeof localChoice.duplicateRowPlace !== 'undefined') {
                                duplicateRow(localChoice, origRow);
                            }
                        }
                        
                        if (localChoice.activateOtherChoice && typeof localChoice.activateThisChoice !== 'undefined') {
                            if (localChoice.isActivateRandom) {
                                selectForceRandomActivate(localChoice);
                            } else {
                                const list = localChoice.activateThisChoice.split(',');
                                for (let i = 0; i < list.length; i++) {
                                    const item = list[i].split('/ON#');
                                    const forceNum = item.length > 1 ? parseInt(item[1]) : 0;
                                    const cMap = choiceMap.get(item[0]);
                                    if (typeof cMap !== 'undefined') {
                                        const fRow = cMap.row;
                                        const fChoice = cMap.choice;
                                        if (fChoice.isSelectableMultiple || !wasActive) selectForceActivate(localChoice, fChoice, fRow, forceNum);
                                    } else {
                                        const groupData = groupMap.get(item[0]);
                                        if (typeof groupData !== 'undefined') {
                                            const groupEle = groupData.elements;
                                            for (let j = 0; j < groupEle.length; j++) {
                                                const cMap = choiceMap.get(groupEle[j]);
                                                if (typeof cMap !== 'undefined') {
                                                    const fRow = cMap.row;
                                                    const fChoice = cMap.choice;
                                                    if (fChoice.isSelectableMultiple || !wasActive) selectForceActivate(localChoice, fChoice, fRow, forceNum);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    Array.from(activatedMap.entries()).forEach(([id, val]) => {
                        const cMap = choiceMap.get(id);
                        if (typeof cMap !== 'undefined') {
                            const aRow = cMap.row;
                            const aChoice = cMap.choice;
                            if (aChoice.id !== localChoice.id) {
                                if (!checkRequirements(aChoice.requireds)) {
                                    if (aChoice.forcedActivated) {
                                        delete aChoice.forcedActivated;
                                        if (!aChoice.isAllowDeselect) tmpActivatedMap.set(aChoice.id, {multiple: val.multiple});
                                    }
                                    if (val.multiple === 0) {
                                        if (aChoice.isActive) deselectObject(aChoice, aRow);
                                    } else if (val.multiple > 0) {
                                        for (let i = 0; i < val.multiple; i++) {
                                            if (aChoice.isActive) selectedOneLess(aChoice, aRow);
                                        }
                                    }
                                }
                            }
                        }
                    });

                    if (localChoice.addToAllowChoice && typeof localChoice.idOfAllowChoice !== 'undefined' && typeof localChoice.numbAddToAllowChoice !== 'undefined') {
                        for (let i = 0; i < localChoice.idOfAllowChoice.length; i++) {
                            const aRow = rowMap.get(localChoice.idOfAllowChoice[i]);
                            if (typeof aRow !== 'undefined') {
                                aRow.allowedChoices += localChoice.numbAddToAllowChoice;
                                if (aRow.allowedChoices > 0 && aRow.currentChoices >= aRow.allowedChoices) {
                                    for (let j = 0; j < aRow.objects.length; j++) {
                                        const thisChoice = aRow.objects[j];
                                        if (thisChoice.isActive) {
                                            if (!thisChoice.forcedActivated) {
                                                if (thisChoice.isSelectableMultiple) {
                                                    let counter = thisChoice.multipleUseVariable;
                                                    for (let k = 0; k < counter; k++) {
                                                        selectedOneLess(thisChoice, aRow);
                                                    }
                                                } else {
                                                    if (thisChoice.isActive) deselectObject(thisChoice, aRow);
                                                }
                                            }
                                        }
                                        if (aRow.allowedChoices >= aRow.currentChoices) {
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (!wasActive) {
                        if (localChoice.isChangeVariables && typeof localChoice.changedVariables !== 'undefined') {
                            for (let i = 0; i < localChoice.changedVariables.length; i++) {
                                const variable = variableMap.get(localChoice.changedVariables[i]);
                                if (typeof variable !== 'undefined') {
                                    if (localChoice.changeType === '1') {
                                        variable.isTrue = true;
                                    } else if (localChoice.changeType === '2') {
                                        variable.isTrue = false;
                                    } else if (localChoice.changeType === '3') {
                                        variable.isTrue = !variable.isTrue;
                                    }
                                }
                            }
                        }

                        if (localChoice.backpackBtnRequirement) {
                            app.btnBackpackIsOn += 1;
                        }

                        if (localChoice.showAllAddons) {
                            app.showAllAddons += 1;
                        }

                        if (localChoice.changeBackground) {
                            if (localChoice.changeBgImage) {
                                if (typeof localChoice.bgImage !== 'undefined') {
                                    if (typeof app.bgImageStack === 'undefined') {
                                        app.bgImageStack = [];
                                        app.defaultBgImage = app.styling.backgroundImage || '';
                                    }
                                    app.bgImageStack.push({id: localChoice.id, data: localChoice.bgImage});
                                    app.styling.backgroundImage = localChoice.bgImage;
                                }
                            } else {
                                if (typeof localChoice.changedBgColorCode !== 'undefined') {
                                    if (typeof app.bgColorStack === 'undefined') {
                                        app.bgColorStack = [];
                                        app.defaultBgColor = app.styling.backgroundColor || '';
                                    }
                                    app.bgColorStack.push({id: localChoice.id, data: localChoice.changedBgColorCode});
                                    app.styling.backgroundColor = localChoice.changedBgColorCode;
                                }
                            }
                        }
                        
                        if (localChoice.changePointBar) {
                            if (localChoice.changeBarBgColorIsOn && typeof localChoice.changedBarBgColor !== 'undefined') {
                                if (typeof app.barBgColorStack === 'undefined') {
                                    app.barBgColorStack = [];
                                    app.defaultBarBgColor = app.styling.barBackgroundColor || '#FFFFFFFF';
                                }
                                app.barBgColorStack.push({id: localChoice.id, data: localChoice.changedBarBgColor});
                                app.styling.barBackgroundColor = localChoice.changedBarBgColor;
                            }
                            if (localChoice.changeBarIconColorIsOn && typeof localChoice.changedBarIconColor !== 'undefined') {
                                if (typeof app.barIconColorStack === 'undefined') {
                                    app.barIconColorStack = [];
                                    app.defaultBarIconColor = app.styling.barIconColor || '#0000008A';
                                }
                                app.barIconColorStack.push({id: localChoice.id, data: localChoice.changedBarIconColor});
                                app.styling.barIconColor = localChoice.changedBarIconColor;
                            }
                            if (localChoice.changeBarTextColorIsOn && typeof localChoice.changedBarTextColor !== 'undefined') {
                                if (typeof app.barTextColorStack === 'undefined') {
                                    app.barTextColorStack = [];
                                    app.defaultBarTextColor = app.styling.barTextColor || '#000000';
                                }
                                app.barTextColorStack.push({id: localChoice.id, data: localChoice.changedBarTextColor});
                                app.styling.barTextColor = localChoice.changedBarTextColor;
                            }
                        }

                        if (localChoice.changeTemplates) {
                            if (localChoice.changeTemplatesList && localChoice.changeToThisTemplate) {
                                const list = localChoice.changeTemplatesList.split(',');
                                
                                for (let i = 0; i < list.length; i++) {
                                    const item = list[i];
                                    const cMap = choiceMap.get(item);
                                    if (typeof cMap !== 'undefined') {
                                        const tChoice = cMap.choice;
                                        applyTemplate(tChoice, localChoice.id, localChoice.changeToThisTemplate);

                                        if (localChoice.changeAddonTemplate) {
                                            for (let j = 0; j < tChoice.addons.length; j++) {
                                                const tAddon = tChoice.addons[j];
                                                applyTemplate(tAddon, localChoice.id, localChoice.changeToThisTemplate);
                                            }
                                        }
                                        continue;
                                    }

                                    const tRow = rowMap.get(item);
                                    if (typeof tRow !== 'undefined') {
                                        applyTemplate(tRow, localChoice.id, localChoice.changeToThisTemplate);
                                        continue;
                                    }

                                    const groupData = groupMap.get(item);
                                    if (typeof groupData !== 'undefined') {
                                        const groupRowEle = groupData.rowElements;

                                        for (let j = 0; j < groupRowEle.length; j++) {
                                            const gtRow = rowMap.get(groupRowEle[j]);
                                            if (typeof gtRow !== 'undefined') {
                                                applyTemplate(gtRow, localChoice.id, localChoice.changeToThisTemplate);
                                            }
                                        }
                                        const groupEle = groupData.elements;                                    
                                        for (let j = 0; j < groupEle.length; j++) {
                                            const gcMap = choiceMap.get(groupEle[j]);
                                            if (typeof gcMap !== 'undefined') {
                                                const gtChoice = gcMap.choice;
                                                applyTemplate(gtChoice, localChoice.id, localChoice.changeToThisTemplate);

                                                if (localChoice.changeAddonTemplate) {
                                                    for (let k = 0; k < gtChoice.addons.length; k++) {
                                                        const gtAddon = gtChoice.addons[k];
                                                        applyTemplate(gtAddon, localChoice.id, localChoice.changeToThisTemplate);
                                                    }
                                                }
                                            }
                                        }
                                        continue;
                                    }
                                }
                            }
                        }

                        if (localChoice.changeWidth) {
                            if (localChoice.changeWidthList && localChoice.changeToThisWidth) {
                                const list = localChoice.changeWidthList.split(',');
                                
                                for (let i = 0; i < list.length; i++) {
                                    const item = list[i];
                                    const cMap = choiceMap.get(item);
                                    if (typeof cMap !== 'undefined') {
                                        const tChoice = cMap.choice;
                                        applyWidth(tChoice, localChoice.id, localChoice.changeToThisWidth);
                                        continue;
                                    }

                                    const tRow = rowMap.get(item);
                                    if (typeof tRow !== 'undefined') {
                                        applyWidth(tRow, localChoice.id, localChoice.changeToThisWidth);
                                        continue;
                                    }

                                    const groupData = groupMap.get(item);
                                    if (typeof groupData !== 'undefined') {
                                        const groupRowEle = groupData.rowElements;

                                        for (let j = 0; j < groupRowEle.length; j++) {
                                            const gtRow = rowMap.get(groupRowEle[j]);
                                            if (typeof gtRow !== 'undefined') {
                                                applyWidth(gtRow, localChoice.id, localChoice.changeToThisWidth);
                                            }
                                        }
                                        const groupEle = groupData.elements;                                    
                                        for (let j = 0; j < groupEle.length; j++) {
                                            const gcMap = choiceMap.get(groupEle[j]);
                                            if (typeof gcMap !== 'undefined') {
                                                const gtChoice = gcMap.choice;
                                                applyWidth(gtChoice, localChoice.id, localChoice.changeToThisWidth);
                                            }
                                        }
                                        continue;
                                    }
                                }
                            }
                        }

                        if (localChoice.setBgmIsOn) {
                            if (localChoice.bgmId) {
                                bgmVariables.bgmIsPlaying = true;
                                
                                if (bgmVariables.isBgmInit) {
                                    playBgm(localChoice, localChoice.bgmId, 0);
                                } else {
                                    initYoutubePlayer(localChoice);
                                    bgmVariables.isBgmInit = true;
                                }
                            }
                        }

                        if (localChoice.muteBgm && bgmPlayer) {
                            const player = get(bgmPlayer);

                            app.isMute = true;
                            if (player && typeof player.mute === 'function') {
                                player.mute();
                            }
                        }

                        if (localChoice.isContentHidden && typeof localChoice.hiddenContentsRow !== 'undefined' && typeof localChoice.hiddenContentsType !== 'undefined') {
                            for (let i = 0; i < localChoice.hiddenContentsRow.length; i++) {
                                const hRow = rowMap.get(localChoice.hiddenContentsRow[i]);
                                if (typeof hRow !== 'undefined') {
                                    if (!hRow.textIsRemoved) hRow.textIsRemoved = true;
                                    for (let j = 0; j < localChoice.hiddenContentsType.length; j++) {
                                        switch (localChoice.hiddenContentsType[j]) {
                                            case '1':
                                                hRow.objectTitleRemoved = true;
                                                break;
                                            case '2':
                                                hRow.objectImageRemoved = true;
                                                break;
                                            case '3':
                                                hRow.objectTextRemoved = true;
                                                break;
                                            case '4':
                                                hRow.objectScoreRemoved = true;
                                                break;
                                            case '5':
                                                hRow.objectRequirementRemoved = true;
                                                break;
                                            case '6':
                                                hRow.addonTitleRemoved = true;
                                                break;
                                            case '7':
                                                hRow.addonImageRemoved = true;
                                                break;
                                            case '8':
                                                hRow.addonTextRemoved = true;
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                }
                            }
                        }

                        if (localChoice.scrollToRow) {
                            tick().then(() => {
                                setTimeout(() => {
                                    if (localChoice.scrollToObject) {
                                        if (localChoice.scrollObjectId) {
                                            const cMap = choiceMap.get(localChoice.scrollObjectId);
                                            if (typeof cMap !== 'undefined') {
                                                const sChoice = cMap.choice;
                                                const sRow = cMap.row;
                                                const idx = app.useToolbarBtn || !bCreatorMode ? sRow.index : sRow.index + 1;
                                                const divs = mainDiv?.children[idx]?.children[1]?.children[1]?.children;
                                                if (typeof divs !== 'undefined') {
                                                    if (isBackpack) {
                                                        const thisWindow = document.getElementById('backpackDialog');
                                                        thisWindow?.scrollTo({top: divs[sChoice.index].getBoundingClientRect().top + window.scrollY, behavior: 'smooth'});
                                                    }
                                                    window.scrollTo({top: divs[sChoice.index].getBoundingClientRect().top + window.scrollY, behavior: 'smooth'});
                                                }
                                            }
                                        }
                                    } else {
                                        if (localChoice.scrollRowId) {
                                            const sRow = rowMap.get(localChoice.scrollRowId);
                                            if (typeof sRow !== 'undefined') {
                                                const divs = mainDiv?.children;
                                                if (typeof divs !== 'undefined') {
                                                    const idx = app.useToolbarBtn || !bCreatorMode ? sRow.index : sRow.index + 1;
                                                    if (isBackpack) {
                                                        const thisWindow = document.getElementById('backpackDialog');
                                                        thisWindow?.scrollTo({top: divs[idx].getBoundingClientRect().top + window.scrollY, behavior: 'smooth'});
                                                    } else {
                                                        window.scrollTo({top: divs[idx].getBoundingClientRect().top + window.scrollY, behavior: 'smooth'});
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }, 10);
                            });
                        }
                    }

                    selectUpdateScore(localChoice, tmpScores, 0);
                    activateTempChoices();

                    if (!checkRequirements(localChoice.requireds) && localChoice.isActive) {
                        selectedOneLess(localChoice, localRow);
                    }
                }

                if (reqCheck) {
                    if (localChoice.isMultipleUseVariable) {
                        if (typeof localChoice.multipleUseVariable === 'undefined') localChoice.multipleUseVariable = 0;
                        if (typeof localChoice.numMultipleTimesPluss === 'undefined') localChoice.numMultipleTimesPluss = 0;
                        if (localChoice.numMultipleTimesPluss > localChoice.multipleUseVariable) {
                            if (localChoice.isSelectDelayed && typeof localChoice.selectDelayTime !== 'undefined') {
                                if (!localChoice.selectDelayTimer) {
                                    localChoice.selectDelayTimer = window.setTimeout(() => {
                                        if (linkedObjects.indexOf(localChoice.id) === -1) {
                                            if (localChoice.isFadeTransition) {
                                                if (typeof localChoice.fadeTransitionColor === 'undefined' || localChoice.fadeTransitionColor === '') {
                                                    app.fadeTransitionColor = '000000FF';
                                                } else {
                                                    app.fadeTransitionColor = localChoice.fadeTransitionColor;
                                                }

                                                if (typeof localChoice.fadeInTransitionTime === 'undefined') {
                                                    app.fadeTransitionTime = 0.25;
                                                } else {
                                                    app.fadeTransitionTime = localChoice.fadeInTransitionTime / 1000;
                                                }

                                                app.fadeTransitionIsOn = true;
                                                window.setTimeout(() => {
                                                    if (typeof localChoice.fadeOutTransitionTime !== 'undefined') {
                                                        app.fadeTransitionTime = localChoice.fadeOutTransitionTime / 1000;
                                                    }
                                                    app.fadeTransitionIsOn = false;
                                                    selectProcess();
                                                }, app.fadeTransitionTime * 1000);
                                            } else {
                                                selectProcess();
                                            }
                                        }
                                        if (linkedObjects.indexOf(localChoice.id) === 0) {
                                            linkedObjects.splice(0);
                                        }
                                        delete localChoice.selectDelayTimer;
                                    }, localChoice.selectDelayTime);
                                }
                            } else {
                                if (linkedObjects.indexOf(localChoice.id) === -1) {
                                    if (localChoice.isFadeTransition) {
                                        if (typeof localChoice.fadeTransitionColor === 'undefined' || localChoice.fadeTransitionColor === '') {
                                            app.fadeTransitionColor = '000000FF';
                                        } else {
                                            app.fadeTransitionColor = localChoice.fadeTransitionColor;
                                        }

                                        if (typeof localChoice.fadeInTransitionTime === 'undefined') {
                                            app.fadeTransitionTime = 0.25;
                                        } else {
                                            app.fadeTransitionTime = localChoice.fadeInTransitionTime / 1000;
                                        }

                                        app.fadeTransitionIsOn = true;
                                        window.setTimeout(() => {
                                            if (typeof localChoice.fadeOutTransitionTime !== 'undefined') {
                                                app.fadeTransitionTime = localChoice.fadeOutTransitionTime / 1000;
                                            }
                                            app.fadeTransitionIsOn = false;
                                            selectProcess();
                                        }, app.fadeTransitionTime * 1000);
                                    } else {
                                        selectProcess();
                                    }
                                }
                                if (linkedObjects.indexOf(localChoice.id) === 0) {
                                    linkedObjects.splice(0);
                                }
                            }
                        }
                    } else if (typeof localChoice.multipleScoreId !== 'undefined') {
                        const point = pointTypeMap.get(localChoice.multipleScoreId);
                        if (typeof point !== 'undefined') {
                            if (typeof localChoice.numMultipleTimesPluss === 'undefined') localChoice.numMultipleTimesPluss = 0;
                            if (localChoice.numMultipleTimesPluss > point.startingSum) {
                                point.startingSum += 1;
                            }
                        }
                    }
                }
            } else {
                for (let i = 0; i < localChoice.scores.length; i++) {
                    const score = localChoice.scores[i];
                    if (score.setValue) delete score.setValue;
                }
            }
        }
    }

    function selectedOneLess(localChoice: Choice, localRow: Row) {
        const pointCheck = checkPoints(localChoice, false);
        let origRow = localRow;
        if (localRow.isResultRow) {
            const cMap = choiceMap.get(localChoice.id);

            if (typeof cMap !== 'undefined') {
                origRow = cMap.row;
            }
        }
        
        if (pointCheck) {
            const deselectProcess = () => {
                const tmpScores = new SvelteMap<string, number>();
                const isPos = localChoice.multipleUseVariable > 0;
                const selNum = Math.abs(localChoice.multipleUseVariable - 1);

                if (isPos) {
                    for (let i = 0; i < localChoice.scores.length; i++) {
                        const score = localChoice.scores[i];
                        if (typeof score.isActiveMul !== 'undefined') {
                            if (checkRequirements(score.requireds) && score.isActiveMul[selNum] || score.isActiveMul[selNum]) {
                                const point = pointTypeMap.get(score.id);
                                if (typeof point !== 'undefined') {
                                    let val = score.discountIsOn && typeof score.discountScore !== 'undefined' ? score.discountScore : score.value;
                                    val = point.allowFloat ? val : Math.floor(val);
                                    if (score.multiplyByTimes) {
                                        val = val * (selNum + 1);
                                    }
                                    point.startingSum += val;
                                    let tmpScore = tmpScores.get(score.id);
                                    if (typeof tmpScore !== 'undefined') {
                                        tmpScores.set(score.id, -val + tmpScore);
                                    } else {
                                        tmpScores.set(score.id, -val);
                                    }
                                    delete score.isActiveMul[selNum];
                                    if (selNum === 0) delete score.setValue;
                                }
                            }
                        }
                    }

                    if (localChoice.activateOtherChoice && typeof localChoice.activateThisChoice !== 'undefined') {
                        if (localChoice.isActivateRandom && typeof localChoice.activatedRandomMul !== 'undefined' && typeof localChoice.activatedRandomMul[selNum] !== 'undefined') {
                            for (let i = 0; i < localChoice.activatedRandomMul[selNum].length; i++) {
                                const cID = localChoice.activatedRandomMul[selNum][i].split('/ON#');
                                const cMap = choiceMap.get(cID[0]);
                                if (typeof cMap !== 'undefined') {
                                    const fRow = cMap.row;
                                    const fChoice = cMap.choice;
                                    const forceNum = cID.length > 1 ? Number(cID[1]) : 0;
                                    deselectForceActivate(localChoice, fChoice, fRow, forceNum);
                                }
                            }
                            localChoice.activatedRandomMul.splice(selNum, 1);
                        } else {
                            const list = localChoice.activateThisChoice.split(',');
                            for (let i = 0; i < list.length; i++) {
                                const item = list[i].split('/ON#');
                                const forceNum = item.length > 1 ? parseInt(item[1]) : 0;
                                const cMap = choiceMap.get(item[0]);
                                if (typeof cMap !== 'undefined') {
                                    const fRow = cMap.row;
                                    const fChoice = cMap.choice;
                                    if (selNum === 0 || fChoice.isSelectableMultiple) deselectForceActivate(localChoice, fChoice, fRow, forceNum);
                                } else {
                                    const groupData = groupMap.get(item[0]);
                                    if (typeof groupData !== 'undefined') {
                                        const groupEle = groupData.elements;
                                        for (let j = 0; j < groupEle.length; j++) {
                                            const cMap = choiceMap.get(groupEle[j]);
                                            if (typeof cMap !== 'undefined') {
                                                const fRow = cMap.row;
                                                const fChoice = cMap.choice;
                                                if (selNum === 0 || fChoice.isSelectableMultiple) deselectForceActivate(localChoice, fChoice, fRow, forceNum);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (localChoice.discountOther) {
                        if (typeof localChoice.discountOperator !== 'undefined' && typeof localChoice.discountValue !== 'undefined' && (localChoice.stackableDiscount || !localChoice.stackableDiscount && localChoice.multipleUseVariable === 1)) {
                            if (typeof localChoice.discountPointTypes === 'undefined') localChoice.discountPointTypes = [];
                            if (localChoice.isDisChoices) {
                                const dList = new Set<string>();
                                if (typeof localChoice.discountRows !== 'undefined') {
                                    for (let i = 0; i < localChoice.discountRows.length; i++) {
                                        const dRow = rowMap.get(localChoice.discountRows[i]);
                                        if (typeof dRow !== 'undefined') {
                                            for (let j = 0; j < dRow.objects.length; j++) {
                                                const dChoice = dRow.objects[j];
                                                deselectDiscount(localChoice, dChoice);
                                                dList.add(dChoice.id);
                                            }
                                        }
                                    }
                                }
                                if (typeof localChoice.discountChoices !== 'undefined') {
                                    for (let i = 0; i < localChoice.discountChoices.length; i++) {
                                        if (!dList.has(localChoice.discountChoices[i])) {
                                            const cMap = choiceMap.get(localChoice.discountChoices[i]);
                                            if (typeof cMap !== 'undefined') {
                                                deselectDiscount(localChoice, cMap.choice);
                                            }
                                        }
                                    }
                                }
                            } else {
                                if (typeof localChoice.discountGroups !== 'undefined') {
                                    for (let i = 0; i < localChoice.discountGroups.length; i++) {
                                        const groupData = groupMap.get(localChoice.discountGroups[i]);
                                        if (typeof groupData !== 'undefined') {
                                            for (let j = 0; j < groupData.elements.length; j++) {
                                                const cMap = choiceMap.get(groupData.elements[j]);
                                                if (typeof cMap !== 'undefined') {
                                                    deselectDiscount(localChoice, cMap.choice);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    for (let i = 0; i < localChoice.scores.length; i++) {
                        const score = localChoice.scores[i];
                        if (typeof score.isActiveMulMinus === 'undefined') score.isActiveMulMinus = [];
                        if (checkRequirements(score.requireds) && !score.isActiveMulMinus[selNum]) {
                            const point = pointTypeMap.get(score.id);
                            if (typeof point !== 'undefined') {
                                let val = score.discountIsOn && typeof score.discountScore !== 'undefined' ? score.discountScore : score.value;
                                val = point.allowFloat ? val : Math.floor(val);
                                if (score.multiplyByTimes) {
                                    val = val * selNum;
                                }
                                point.startingSum += val;
                                let tmpScore = tmpScores.get(score.id);
                                if (typeof tmpScore !== 'undefined') {
                                    tmpScores.set(score.id, -val + tmpScore);
                                } else {
                                    tmpScores.set(score.id, -val);
                                }
                                score.isActiveMulMinus[selNum] = true;
                            }
                        }
                    }
                }

                localChoice.multipleUseVariable -= 1;

                if (localChoice.multipleUseVariable === 0) {
                    localChoice.isActive = false;
                    origRow.currentChoices -= 1;
                    activatedMap.delete(localChoice.id);
                } else {
                    if (localChoice.multipleUseVariable === -1) {
                        localChoice.isActive = true;
                        origRow.currentChoices += 1;
                    }
                    activatedMap.set(localChoice.id, {multiple: localChoice.multipleUseVariable});
                }

                Array.from(activatedMap.entries()).forEach(([id, val]) => {
                    const cMap = choiceMap.get(id);
                    if (typeof cMap !== 'undefined') {
                        const aRow = cMap.row;
                        const aChoice = cMap.choice;
                        if (aChoice.id !== localChoice.id) {
                            if (!checkRequirements(aChoice.requireds)) {
                                if (aChoice.forcedActivated) {
                                    delete aChoice.forcedActivated;
                                    if (!aChoice.isAllowDeselect) tmpActivatedMap.set(aChoice.id, {multiple: val.multiple});
                                }
                                if (val.multiple === 0) {
                                    if (aChoice.forcedActivated) delete aChoice.forcedActivated;
                                    if (aChoice.isActive) deselectObject(aChoice, aRow);
                                } else if (val.multiple > 0) {
                                    for (let i = 0; i < val.multiple; i++) {
                                        if (aChoice.isActive) selectedOneLess(aChoice, aRow);
                                    }
                                }
                            }
                        }
                    }
                });

                if (localChoice.addToAllowChoice && typeof localChoice.idOfAllowChoice !== 'undefined' && typeof localChoice.numbAddToAllowChoice !== 'undefined') {
                    for (let i = 0; i < localChoice.idOfAllowChoice.length; i++) {
                        const aRow = rowMap.get(localChoice.idOfAllowChoice[i]);
                        if (typeof aRow !== 'undefined') {
                            aRow.allowedChoices -= localChoice.numbAddToAllowChoice;
                            if (aRow.allowedChoices > 0 && aRow.currentChoices >= aRow.allowedChoices) {
                                for (let j = 0; j < aRow.objects.length; j++) {
                                    const thisChoice = aRow.objects[j];
                                    if (thisChoice.isActive) {
                                        if (!thisChoice.forcedActivated) {
                                            if (thisChoice.isSelectableMultiple) {
                                                let counter = thisChoice.multipleUseVariable;
                                                for (let k = 0; k < counter; k++) {
                                                    selectedOneLess(thisChoice, aRow);
                                                }
                                            } else {
                                                if (thisChoice.isActive) deselectObject(thisChoice, aRow);
                                            }
                                        }
                                    }    
                                    if (aRow.allowedChoices >= aRow.currentChoices) {
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }

                if (selNum === 0) {
                    if (localChoice.isChangeVariables && typeof localChoice.changedVariables !== 'undefined') {
                        for (let i = 0; i < localChoice.changedVariables.length; i++) {
                            const variable = variableMap.get(localChoice.changedVariables[i]);
                            if (typeof variable !== 'undefined') {
                                if (localChoice.changeType === '1') {
                                    variable.isTrue = false;
                                } else if (localChoice.changeType === '2') {
                                    variable.isTrue = true;
                                } else if (localChoice.changeType === '3') {
                                    variable.isTrue = !variable.isTrue;
                                }
                            }
                        }
                    }

                    if (localChoice.backpackBtnRequirement) {
                        if (typeof app.btnBackpackIsOn !== 'undefined') {
                            app.btnBackpackIsOn -= 1;
                        }
                    }

                    if (localChoice.showAllAddons) {
                        if (typeof app.showAllAddons !== 'undefined') {
                            app.showAllAddons -= 1;
                        }
                    }

                    if (localChoice.changeBackground) {
                        if (localChoice.changeBgImage) {
                            if (typeof app.bgImageStack !== 'undefined') {
                                const idx = app.bgImageStack.findIndex(item => item.id === localChoice.id);
                                if (idx !== -1) app.bgImageStack.splice(idx, 1);

                                const leng = app.bgImageStack.length;
                                if (leng > 0) {
                                    app.styling.backgroundImage = app.bgImageStack[leng - 1].data;
                                } else {
                                    app.styling.backgroundImage = app.defaultBgImage || '';
                                    delete app.bgImageStack;
                                }
                            }
                        } else {
                            if (typeof localChoice.changedBgColorCode !== 'undefined') {
                                if (typeof app.bgColorStack !== 'undefined') {
                                    const idx = app.bgColorStack.findIndex(item => item.id === localChoice.id);
                                    if (idx !== -1) app.bgColorStack.splice(idx, 1);

                                    const leng = app.bgColorStack.length;
                                    if (leng > 0) {
                                        app.styling.backgroundColor = app.bgColorStack[leng - 1].data;
                                    } else {
                                        app.styling.backgroundColor = app.defaultBgColor || '#FFFFFFFF';
                                        delete app.bgColorStack;
                                    }
                                }
                            }
                        }
                    }
                    
                    if (localChoice.changePointBar) {
                        if (localChoice.changeBarBgColorIsOn && typeof localChoice.changedBarBgColor !== 'undefined') {
                            if (typeof app.barBgColorStack !== 'undefined') {
                                const idx = app.barBgColorStack.findIndex(item => item.id === localChoice.id);
                                if (idx !== -1) app.barBgColorStack.splice(idx, 1);

                                const leng = app.barBgColorStack.length;
                                if (leng > 0) {
                                    app.styling.barBackgroundColor = app.barBgColorStack[leng - 1].data;
                                } else {
                                    app.styling.barBackgroundColor = app.defaultBarBgColor || '#FFFFFFFF';
                                    delete app.barBgColorStack;
                                }
                            }
                        }
                        if (localChoice.changeBarIconColorIsOn && typeof localChoice.changedBarIconColor !== 'undefined') {
                            if (typeof app.barIconColorStack !== 'undefined') {
                                const idx = app.barIconColorStack.findIndex(item => item.id === localChoice.id);
                                if (idx !== -1) app.barIconColorStack.splice(idx, 1);

                                const leng = app.barIconColorStack.length;
                                if (leng > 0) {
                                    app.styling.barIconColor = app.barIconColorStack[leng - 1].data;
                                } else {
                                    app.styling.barIconColor = app.defaultBarIconColor || '#0000008A';
                                    delete app.barIconColorStack;
                                }
                            }
                        }
                        if (localChoice.changeBarTextColorIsOn && typeof localChoice.changedBarTextColor !== 'undefined') {
                            if (typeof app.barTextColorStack !== 'undefined') {
                                const idx = app.barTextColorStack.findIndex(item => item.id === localChoice.id);
                                if (idx !== -1) app.barTextColorStack.splice(idx, 1);

                                const leng = app.barTextColorStack.length;
                                if (leng > 0) {
                                    app.styling.barTextColor = app.barTextColorStack[leng - 1].data;
                                } else {
                                    app.styling.barTextColor = app.defaultBarIconColor || '#000000';
                                    delete app.barTextColorStack;
                                }
                            }
                        }
                    }

                    if (localChoice.changeTemplates) {
                        if (localChoice.changeTemplatesList && localChoice.changeToThisTemplate) {
                            const list = localChoice.changeTemplatesList.split(',');
                            
                            for (let i = 0; i < list.length; i++) {
                                const item = list[i];
                                const cMap = choiceMap.get(item);
                                if (typeof cMap !== 'undefined') {
                                    const tChoice = cMap.choice;
                                    revertTemplate(tChoice, localChoice.id);

                                    if (localChoice.changeAddonTemplate) {
                                        for (let j = 0; j < tChoice.addons.length; j++) {
                                            const tAddon = tChoice.addons[j];
                                            revertTemplate(tAddon, localChoice.id);
                                        }
                                    }
                                    continue;
                                }

                                const tRow = rowMap.get(item);
                                if (typeof tRow !== 'undefined') {
                                    revertTemplate(tRow, localChoice.id);
                                    continue;
                                }

                                const groupData = groupMap.get(item);
                                if (typeof groupData !== 'undefined') {
                                    const groupRowEle = groupData.rowElements;

                                    for (let j = 0; j < groupRowEle.length; j++) {
                                        const gtRow = rowMap.get(groupRowEle[j]);
                                        if (typeof gtRow !== 'undefined') {
                                            revertTemplate(gtRow, localChoice.id);
                                        }
                                    }
                                    const groupEle = groupData.elements;                                    
                                    for (let j = 0; j < groupEle.length; j++) {
                                        const gcMap = choiceMap.get(groupEle[j]);
                                        if (typeof gcMap !== 'undefined') {
                                            const gtChoice = gcMap.choice;
                                            revertTemplate(gtChoice, localChoice.id);

                                            if (localChoice.changeAddonTemplate) {
                                                for (let k = 0; k < gtChoice.addons.length; k++) {
                                                    const gtAddon = gtChoice.addons[k];
                                                    revertTemplate(gtAddon, localChoice.id);
                                                }
                                            }
                                        }
                                    }
                                    continue;
                                }
                            }
                        }
                    }

                    if (localChoice.changeWidth) {
                        if (localChoice.changeWidthList && localChoice.changeToThisWidth) {
                            const list = localChoice.changeWidthList.split(',');
                            
                            for (let i = 0; i < list.length; i++) {
                                const item = list[i];
                                const cMap = choiceMap.get(item);
                                if (typeof cMap !== 'undefined') {
                                    const tChoice = cMap.choice;
                                    revertWidth(tChoice, localChoice.id);
                                    continue;
                                }

                                const tRow = rowMap.get(item);
                                if (typeof tRow !== 'undefined') {
                                    revertWidth(tRow, localChoice.id);
                                    continue;
                                }

                                const groupData = groupMap.get(item);
                                if (typeof groupData !== 'undefined') {
                                    const groupRowEle = groupData.rowElements;

                                    for (let j = 0; j < groupRowEle.length; j++) {
                                        const gtRow = rowMap.get(groupRowEle[j]);
                                        if (typeof gtRow !== 'undefined') {
                                            revertWidth(gtRow, localChoice.id);
                                        }
                                    }
                                    const groupEle = groupData.elements;                                    
                                    for (let j = 0; j < groupEle.length; j++) {
                                        const gcMap = choiceMap.get(groupEle[j]);
                                        if (typeof gcMap !== 'undefined') {
                                            const gtChoice = gcMap.choice;
                                            revertWidth(gtChoice, localChoice.id);
                                        }
                                    }
                                    continue;
                                }
                            }
                        }
                    }

                    if (localChoice.setBgmIsOn && bgmPlayer) {
                        if (localChoice.bgmId) {
                            bgmVariables.bgmIsPlaying = false;
                            playBgm(localChoice, localChoice.bgmId, 0);
                        }
                    }

                    if (localChoice.muteBgm && bgmPlayer) {
                        const player = get(bgmPlayer);

                        app.isMute = false;
                        if (player && typeof player.unMute === 'function') {
                            player.unMute();
                        }
                    }

                    if (localChoice.isContentHidden && typeof localChoice.hiddenContentsRow !== 'undefined' && typeof localChoice.hiddenContentsType !== 'undefined') {
                        for (let i = 0; i < localChoice.hiddenContentsRow.length; i++) {
                            const hRow = rowMap.get(localChoice.hiddenContentsRow[i]);
                            if (typeof hRow !== 'undefined') {
                                for (let j = 0; j < localChoice.hiddenContentsType.length; j++) {
                                    switch (localChoice.hiddenContentsType[j]) {
                                        case '1':
                                            hRow.objectTitleRemoved = false;
                                            break;
                                        case '2':
                                            hRow.objectImageRemoved = false;
                                            break;
                                        case '3':
                                            hRow.objectTextRemoved = false;
                                            break;
                                        case '4':
                                            hRow.objectScoreRemoved = false;
                                            break;
                                        case '5':
                                            hRow.objectRequirementRemoved = false;
                                            break;
                                        case '6':
                                            hRow.addonTitleRemoved = false;
                                            break;
                                        case '7':
                                            hRow.addonImageRemoved = false;
                                            break;
                                        case '8':
                                            hRow.addonTextRemoved = false;
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            }
                        }
                    }
                }

                deselectUpdateScore(localChoice, tmpScores, 0);
                activateTempChoices();
            }

            if (!localRow.isInfoRow && !localChoice.isNotSelectable && !localChoice.selectOnce) {
                if (localChoice.isMultipleUseVariable) {
                    if (typeof localChoice.numMultipleTimesMinus === 'undefined') localChoice.numMultipleTimesMinus = 0;
                    if (localChoice.multipleUseVariable > localChoice.numMultipleTimesMinus) {
                        if (localChoice.isSelectDelayed && typeof localChoice.selectDelayTime !== 'undefined') {
                            if (!localChoice.selectDelayTimer) {
                                localChoice.selectDelayTimer = window.setTimeout(() => {
                                    if (linkedObjects.indexOf(localChoice.id) === -1) {
                                        if (localChoice.isFadeTransition) {
                                            if (typeof localChoice.fadeTransitionColor === 'undefined' || localChoice.fadeTransitionColor === '') {
                                                app.fadeTransitionColor = '000000FF';
                                            } else {
                                                app.fadeTransitionColor = localChoice.fadeTransitionColor;
                                            }

                                            if (typeof localChoice.fadeInTransitionTime === 'undefined') {
                                                app.fadeTransitionTime = 0.25;
                                            } else {
                                                app.fadeTransitionTime = localChoice.fadeInTransitionTime / 1000;
                                            }

                                            app.fadeTransitionIsOn = true;
                                            window.setTimeout(() => {
                                                if (typeof localChoice.fadeOutTransitionTime !== 'undefined') {
                                                    app.fadeTransitionTime = localChoice.fadeOutTransitionTime / 1000;
                                                }
                                                app.fadeTransitionIsOn = false;
                                                deselectProcess();
                                            }, app.fadeTransitionTime * 1000);
                                        } else {
                                            deselectProcess();
                                        }
                                    }
                                    if (linkedObjects.indexOf(localChoice.id) === 0) {
                                        linkedObjects.splice(0);
                                    }
                                    delete localChoice.selectDelayTimer;
                                }, localChoice.selectDelayTime);
                            }
                        } else {
                            if (linkedObjects.indexOf(localChoice.id) === -1) {
                                if (localChoice.isFadeTransition) {
                                    if (typeof localChoice.fadeTransitionColor === 'undefined' || localChoice.fadeTransitionColor === '') {
                                        app.fadeTransitionColor = '000000FF';
                                    } else {
                                        app.fadeTransitionColor = localChoice.fadeTransitionColor;
                                    }

                                    if (typeof localChoice.fadeInTransitionTime === 'undefined') {
                                        app.fadeTransitionTime = 0.25;
                                    } else {
                                        app.fadeTransitionTime = localChoice.fadeInTransitionTime / 1000;
                                    }

                                    app.fadeTransitionIsOn = true;
                                    window.setTimeout(() => {
                                        if (typeof localChoice.fadeOutTransitionTime !== 'undefined') {
                                            app.fadeTransitionTime = localChoice.fadeOutTransitionTime / 1000;
                                        }
                                        app.fadeTransitionIsOn = false;
                                        deselectProcess();
                                    }, app.fadeTransitionTime * 1000);
                                } else {
                                    deselectProcess();
                                }
                            }
                            if (linkedObjects.indexOf(localChoice.id) === 0) {
                                linkedObjects.splice(0);
                            }
                        }
                    }
                } else if (typeof localChoice.multipleScoreId !== 'undefined') {
                    const point = pointTypeMap.get(localChoice.multipleScoreId);
                    if (typeof point !== 'undefined') {
                        if (typeof localChoice.numMultipleTimesMinus === 'undefined') localChoice.numMultipleTimesMinus = 0;
                        if (point.startingSum > localChoice.numMultipleTimesMinus) {
                            point.startingSum -= 1;
                        }
                    }
                }
            }
        }
    }

    function copyTooltip(e: Event) {
        navigator.clipboard.writeText(choice.imageSourceTooltip).then(() => {
            snackbarVariables.labelText = 'Tooltip copied to clipboard.';
            snackbarVariables.isOpen = true;
        }).catch(() => {
            console.log(choice.imageSourceTooltip);
            snackbarVariables.labelText = 'Tooltip text logged to developer console.';
            snackbarVariables.isOpen = true;
        });
    }
</script>