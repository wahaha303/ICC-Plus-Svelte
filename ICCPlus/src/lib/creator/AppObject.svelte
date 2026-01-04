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
                        {#each choiceToolbarButtons as choiceButton, i}
                            <Wrapper text={choiceButton.text}>
                                <IconButton disabled={choice.isActive && (i === 1 || i === 3)} onclickcapture={choiceButton.action} oncontextmenu={choiceButton.contextAction}><i class={choiceButton.icon}></i></IconButton>
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
                            <Textfield bind:value={choice.id} onfocus={() => choiceId = choice.id} onchange={() => changeObjectId()} label="Choice Id" variant="filled" disabled={choice.isActive} />
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
                                <IconButton disabled={choice.isActive && choiceButton.icon !== 'mdi mdi-comment-plus'} onclickcapture={choiceButton.action} oncontextmenu={choiceButton.contextAction}><i class={choiceButton.icon}></i></IconButton>
                            </Wrapper>
                        {/each}
                    </div>
                    <Accordion>
                    {#if choice.scores.length > 0}
                        <Panel class="bordered-panel{panelScore ? ' on-top' : ''}" bind:open={panelScore} variant="unelevated" conditionalRender={true}>
                            <Header class="p-0">
                                Scores: {choice.scores.length}
                            </Header>
                            <AcdContent style="overflow:visible">
                                {#if panelScore}
                                <div class="row gy-4">
                                    {#each choice.scores as score, i}
                                        <div class="col-12 p-0">
                                            <ObjectScore score={score} choice={choice} isEditModeOn={true} num={i} />
                                            <Button onclickcapture={() => {choice.scores.splice(i, 1); scoreSet.delete(score.idx)}} class="w-100 mt-1" variant="raised" disabled={choice.isActive}>
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
                                    <Wrapper text="Applies only when the choice image template is left or right." innerClass="mt-3 p-0">
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
                                            <Button onclickcapture={() => choice.requireds.splice(i, 1)} class="w-100 mt-1" variant="raised" disabled={choice.isActive}>
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
                                            <Button onclickcapture={() => deleteGroup(i)} class="w-100 mt-1" variant="raised" disabled={choice.isActive}>
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
                                        <div class:disabled={choice.isActive} class="row gy-3">
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
                                                        if (typeof choice.scores !== 'undefined') {
                                                            for (let i = 0; i < choice.scores.length; i++) {
                                                                const score = choice.scores[i];
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
                                            {#if choice.isSelectableMultiple}
                                                <Wrapper innerClass="m-0 p-0" text="Disabling this checkbox will make most features unavailable.">
                                                    <FormField class="col-12 m-1 p-0">
                                                        <Checkbox bind:checked={() => choice.isMultipleUseVariable ?? false, (e) => choice.isMultipleUseVariable = e} onchange={() => {
                                                            if (choice.isMultipleUseVariable) {
                                                                delete choice.multipleScoreId;
                                                            } else {
                                                                delete choice.isMultipleUseVariable;
                                                                if (typeof choice.scores !== 'undefined') {
                                                                    for (let i = 0; i < choice.scores.length; i++) {
                                                                        const score = choice.scores[i];
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
                                        <div class:disabled={choice.isActive} class="row gy-3">
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
                                        <div class:disabled={choice.isActive} class="row gy-3">
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
                                                        delete choice.useAudioURL;
                                                    }
                                                }} />
                                                {#snippet label()}
                                                    Enable Background Music
                                                {/snippet}
                                            </FormField>
                                            {#if choice.setBgmIsOn}
                                                <FormField class="col-12 m-1 p-0">
                                                    <Checkbox bind:checked={() => choice.useAudioURL ?? false, (e) => choice.useAudioURL = e} onchange={() => {
                                                        if (!choice.useAudioURL) {
                                                            delete choice.useAudioURL;
                                                        }
                                                    }} />
                                                    {#snippet label()}
                                                        Use External URL
                                                    {/snippet}
                                                </FormField>
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
                                                    {choice.useAudioURL ? 'Enter the audio file URL. Use the direct URL to the audio file, not a page or player link.' : 'Enter only the YouTube video ID (e.g., naktUDBaHuw), not the full URL.'}
                                                </div>
                                                <div class="col-12 m-1 px-2">
                                                    {#if choice.bgmFadeIn}
                                                        <Textfield bind:value={() => choice.bgmFadeInSec ?? 0, (e) => choice.bgmFadeInSec = e} label="Fade In Duration" type="number" suffix="ms" variant="filled" />
                                                    {/if}
                                                    {#if choice.bgmFadeOut}
                                                        <Textfield bind:value={() => choice.bgmFadeOutSec ?? 0, (e) => choice.bgmFadeOutSec = e} label="Fade Out Duration" type="number" suffix="ms" variant="filled" />
                                                    {/if}
                                                    <Textfield bind:value={() => choice.bgmId ?? '', (e) => choice.bgmId = e} label={choice.useAudioURL ? 'Audio File URL' : 'Youtube Video ID'} variant="filled" />
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
                                        <div class:disabled={choice.isActive} class="row gy-3">
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
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                            {/if}
                            {#if !row.objectScoreRemoved && !choice.showScoreInAddon}
                                {#each choice.scores as score}
                                    <ObjectScore score={score} row={row} choice={choice} />
                                {/each}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 1}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                            {/if}
                            {#if !row.objectRequirementRemoved && !choice.showReqInAddon}
                                {#each choice.requireds as required}
                                    <ObjectRequired required={required} scoreText={scoreText} />
                                {/each}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 2}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
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
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice}  selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
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
                            <div class="row p-0 w-100{addonJustify}">
                                {#each choice.addons as addon, i}
                                    {#if app.showAllAddons > 0 || (!addon.hideAddon || choice.isActive) && (addon.showAddon || checkRequirements(addon.requireds))}
                                        <ObjectAddon row={row} choice={choice} addon={addon} isEnabled={isEnabled} windowWidth={windowWidth} preloadImages={preloadImages} isFirst={firstAddonIndex === i} />
                                    {/if}
                                {/each}
                            </div>
                        {/if}
                        {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 4}
                            <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
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
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                            {/if}
                            {#if !row.objectScoreRemoved && !choice.showScoreInAddon}
                                {#each choice.scores as score}
                                    <ObjectScore score={score} row={row} choice={choice} />
                                {/each}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 1}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                            {/if}
                            {#if !row.objectRequirementRemoved && !choice.showReqInAddon}
                                {#each choice.requireds as required}
                                    <ObjectRequired required={required} scoreText={scoreText} />
                                {/each}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 2}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                            {/if}
                            {#if choice.text !== '' && !row.objectTextRemoved}
                                {#key choiceTextKey}
                                    <p class="mb-0" style={objectText}>
                                        {@html DOMPurify.sanitize(replaceText(choice.text), sanitizeArg)}
                                    </p>
                                {/key}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 3}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
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
                                    <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
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
                                    <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                                {/if}
                            </div>
                        {/if}
                    {:else if choice.template === 3}
                        <div class="col p-0 text-center" style="max-width: {100 - choiceImageBoxWidth}%">
                            {#if choice.title !== '' && !row.objectTitleRemoved}
                                {#key choiceTitleKey}<h2 class="mb-0" style={objectTitle}>{@html DOMPurify.sanitize(choiceTitleKey, sanitizeArg)}</h2>{/key}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 0}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                            {/if}
                            {#if !row.objectScoreRemoved && !choice.showScoreInAddon}
                                {#each choice.scores as score}
                                    <ObjectScore score={score} row={row} choice={choice} />
                                {/each}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 1}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                            {/if}
                            {#if !row.objectRequirementRemoved && !choice.showReqInAddon}
                                {#each choice.requireds as required}
                                    <ObjectRequired required={required} scoreText={scoreText} />
                                {/each}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 2}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                            {/if}
                            {#if choice.text !== '' && !row.objectTextRemoved}
                                {#key choiceTextKey}
                                    <p class="mb-0" style={objectText}>
                                        {@html DOMPurify.sanitize(choiceTextKey, sanitizeArg)}
                                    </p>
                                {/key}
                            {/if}
                            {#if choice.isSelectableMultiple && multiChoiceCounter && multiChoiceStyle.multiChoiceCounterPosition === 3}
                                <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
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
                                    <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
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
                                    <ObjectMultiChoice isEnabled={isEnabled && !row.isInfoRow && !choice.isNotSelectable} multiChoiceButton={multiChoiceButton} multiChoiceText={multiChoiceText} choice={choice} selectedOneMore={() => selectedOneMore(choice, row, options)} selectedOneLess={() => selectedOneLess(choice, row, options)} />
                                {/if}
                            </div>
                        {/if}
                    {/if}
                {/if}
            </div>
        </div>
    </div>
{/if}

<script lang="ts">
    import Accordion, { Panel, Header, Content as AcdContent} from '$lib/custom/accordion';
    import Autocomplete from '$lib/custom/autocomplete/Autocomplete.svelte';
    import Button, { Label } from '@smui/button';
    import Card, { Content as CardContent } from '@smui/card';
    import Checkbox from '@smui/checkbox';
    import ColorPicker, { ChromeVariant } from '$lib/custom/svelte-awesome-color-picker';
    import CustomChipInput from '$lib/store/CustomChipInput.svelte';
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
	import type { Choice, choiceOptions, Row } from '$lib/store/types';
	import { app, checkDupId, choiceMap, groupMap, getChoiceLabel, getRowLabel, getGroupLabel, getStyling, getPointTypeLabel, objectWidths, checkRequirements, sanitizeArg, replaceText, activatedMap, tmpActivatedMap, objectWidthToNum, generateObjectId, dlgVariables, snackbarVariables, getChoices, getGroups, getPointTypes, getRows, getVariables, getWords, objectDesignMap, winWidth, generateScoreId, scoreSet, getBackpackChoices, getBackpackRows, hexToRgba, menuVariables, removeAnchor, pasteObject, clearClipboard, deleteDiscount, exportData, selectObject, deselectObject, selectedOneMore, selectedOneLess } from '$lib/store/store.svelte';
    import { tick } from 'svelte';
    import { tooltip } from '$lib/custom/tooltip/store.svelte';

    export { activateObject, options };
    
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
    const options: choiceOptions = {linkedObjects: linkedObjects, mainDiv: mainDiv, bCreatorMode: bCreatorMode, isBackpack: isBackpack, isOverDlg: false};
    
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
    let choiceId = '';

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
                styles.push(`box-shadow: ${objectStyle.objectDropShadowH}px ${objectStyle.objectDropShadowV}px ${objectStyle.objectDropShadowBlur}px ${objectStyle.objectDropShadowSpread}px ${hexToRgba(objectStyle.objectDropShadowColor)};`);
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
        if (objectImageStyle.objectImgObjectFillIsOn) {
            styles.push(`object-fit: ${objectImageStyle.objectImgObjectFillStyle};`);
            const imgHeight = row.objectImgObjectFillHeight || objectImageStyle.objectImgObjectFillHeight;
            if (imgHeight) {
                styles.push(`height: ${imgHeight}px;`);
            }
        }
        styles.push(`border-radius: ${objectImageStyle.objectImgBorderRadiusTopLeft}${suffix} ${objectImageStyle.objectImgBorderRadiusTopRight}${suffix} ${objectImageStyle.objectImgBorderRadiusBottomRight}${suffix} ${objectImageStyle.objectImgBorderRadiusBottomLeft}${suffix};`);
        if (objectImageStyle.objectImgOverflowIsOn) {
            styles.push(`overflow: hidden;`);
        }
        if (objectImageStyle.objectImgBorderIsOn) {
            const borderColor = isEnabled ? (isActive && filterStyle.selImgBorderColorIsOn && filterStyle.selFilterImgBorderColor) || objectImageStyle.objectImgBorderColor : (filterStyle.reqImgBorderColorIsOn && filterStyle.reqFilterImgBorderColor) || objectImageStyle.objectImgBorderColor;
            styles.push(`border: ${objectImageStyle.objectImgBorderWidth}px ${objectImageStyle.objectImgBorderStyle} ${hexToRgba(borderColor)};`);
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

    $effect(() => {
        if (mainDiv) options.mainDiv = mainDiv;
        if (isBackpack) options.isBackpack = isBackpack;
    });

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

    function closestByClassPrefix(el: HTMLElement, prefix: string, endpoint: string) {
        let current: HTMLElement | null = el;
        let isEnd = false;

        while (current) {
            for (const cls of current.classList) {
                if (cls.startsWith(prefix)) return true;
                if (cls.startsWith(endpoint)) isEnd = true;
            }
            if (isEnd) return false;
            current = current.parentElement;
        }

        return false;
    }

    function activateObject(localChoice: Choice, localRow: Row, e?: MouseEvent, isManually: boolean = false) {
        const target = e && e.target ? e.target as HTMLElement : null
        let origRow = localRow;

        if (target && localChoice.isActive && localChoice.addons && localChoice.addons.length > 0) {
            if (closestByClassPrefix(target, 'addon-', 'addon')) return;
        }

        if (localRow.isResultRow || localRow.isGroupRow) {
            const cMap = choiceMap.get(localChoice.id);

            if (typeof cMap !== 'undefined') {
                origRow = cMap.row;
            }
        }

        if (localChoice.isSelectableMultiple) {
            if (localChoice.id === choice.id && localChoice.allowSelectByClick && localChoice.multipleUseVariable === 0) {
                if (target) {
                    if (closestByClassPrefix(target, 'multi-', 'choice-')) return;
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