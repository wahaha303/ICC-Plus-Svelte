{#if required.type === 'id'}
    <Textfield bind:value={required.reqId} label={required.required ? 'Selected Id' : 'Not Selected Id'} variant="filled" />
{:else if required.type === 'points'}
    <Autocomplete
        options={$optimizedPointTypes}
        getOptionLabel={getPointTypeLabel}
        bind:value={required.reqId}
        label="Point Type"
        toggle={true}
        showMenuWithNoInput={true}
        textfield$variant="filled"
        class="w-100"
    />
    <Select bind:value={required.operator} label="Operator" variant="filled" alwaysFloat={true}>
        {#each pointReqOperators as pointReqOperator}
            <Option value={pointReqOperator.value}>{pointReqOperator.text}</Option>
        {/each}
    </Select>
    <Textfield bind:value={required.reqPoints} label="Value" type="number" variant="filled" />
{:else if required.type === 'pointCompare'}
    <div class="toolbar d-row justify-center">
        <Wrapper text="Add Point Type">
            <IconButton onclick={() => {
                if (typeof required.more === 'undefined') required.more = [];
                required.more.push({operator: '1', type: 'id', id: ''});
            }} ><i class="mdi mdi-alphabetical-variant"></i></IconButton>
        </Wrapper>
        <Wrapper text="Add Number">
            <IconButton onclick={() => {
                if (typeof required.more === 'undefined') required.more = [];
                required.more.push({operator: '1', type: 'points', points: 0});
            }} ><i class="mdi mdi-numeric"></i></IconButton>
        </Wrapper>
    </div>
    <Autocomplete
        options={$optimizedPointTypes}
        getOptionLabel={getPointTypeLabel}
        bind:value={required.reqId}
        label="Target Point Type"
        toggle={true}
        showMenuWithNoInput={true}
        textfield$variant="filled"
        class="w-100"
    />
    <Select bind:value={required.operator} label="Operator" variant="filled" alwaysFloat={true}>
        {#each pointReqOperators as pointReqOperator}
            <Option value={pointReqOperator.value}>{pointReqOperator.text}</Option>
        {/each}
    </Select>
    <Autocomplete
        options={$optimizedPointTypes}
        getOptionLabel={getPointTypeLabel}
        bind:value={required.reqId1}
        label="Point Type"
        toggle={true}
        showMenuWithNoInput={true}
        textfield$variant="filled"
        class="w-100"
    />
    {#if required.more}
        {#each required.more as more, i}
            <Select bind:value={more.operator} label="Operator" variant="filled" alwaysFloat={true}>
                {#each pointReqOperators as pointReqOperator}
                    <Option value={pointReqOperator.value}>{pointReqOperator.text}</Option>
                {/each}
            </Select>
            <div class="floating-button-container">
                {#if more.type === 'id'}
                    <Autocomplete
                        options={$optimizedPointTypes}
                        getOptionLabel={getPointTypeLabel}
                        bind:value={more.id}
                        label="Point Type"
                        toggle={true}
                        showMenuWithNoInput={true}
                        textfield$variant="filled"
                        class="w-100"
                    />
                    <IconButton onclick={() => {
                        if (required.more) required.more.splice(i, 1);
                    }} class="floating-button"><i class="mdi mdi-minus-circle-outline"></i></IconButton>
                {:else if more.type === 'points'}
                    <Textfield bind:value={more.points} label="Value" type="number" variant="filled" />
                    <IconButton onclick={() => {
                        if (required.more) required.more.splice(i, 1);
                    }} class="floating-button" style="right: 35px"><i class="mdi mdi-minus-circle-outline"></i></IconButton>
                {/if}
            </div>
        {/each}
    {/if}
{:else if required.type === 'or'}
    <div class="toolbar d-row justify-space-between">
        <IconButton onclick={() => {
            if (required.orRequired.length > 1) required.orRequired.pop();
        }} ><i class="mdi mdi-minus"></i></IconButton>
        <IconButton onclick={() => {
            required.orRequired.push({req: ''});
        }} ><i class="mdi mdi-plus"></i></IconButton>
    </div>
    <Textfield bind:value={() => required.orNum ?? 1, (e) => required.orNum = e} onchange={() => required.orNum = Math.min(Math.max(required.orNum || 0, 0), required.orRequired.length)} label="X" type="number" input$min={0} input$max={required.orRequired.length} variant="filled" />
    {#each required.orRequired as orReq}
        <Textfield bind:value={orReq.req} label={required.required ? 'Selected Id' : 'Not Selected Id'} variant="filled" />
    {/each}
{:else if required.type === 'selFromGroups' || required.type === 'selFromRows' || required.type === 'selFromWhole'}
    {#if required.type === 'selFromGroups'}
        <CustomChipInput acValue={required.selGroups || []} acOptions={$optimizedGroups} inputLabel="Groups" getLabel={getGroupLabel} onSelected={setGroupElement} selectProp={required} />
    {:else if required.type === 'selFromRows'}
        <CustomChipInput acValue={required.selRows || []} acOptions={$optimizedRows} inputLabel="Rows" getLabel={getRowLabel} onSelected={setRowElement} selectProp={required} />
    {/if}
    <Select bind:value={required.selFromOperators} label="Operator" variant="filled" alwaysFloat={true}>
        {#each selFromOperators as operator}
            <Option value={operator.value}>{operator.text}</Option>
        {/each}
    </Select>
    <Textfield bind:value={required.selNum} onchange={() => required.selNum = Math.max(required.selNum || 0, 0)} label="Number of Selection" type="number" input$min={0} variant="filled" />
{:else if required.type === 'gid'}
    <Autocomplete
        options={$optimizedGlobalRequirement}
        getOptionLabel={getGlobalReqLabel}
        bind:value={required.reqId}
        label="Global Requirement"
        toggle={true}
        showMenuWithNoInput={true}
        textfield$variant="filled"
        class="w-100"
    />
{:else if required.type === 'word'}
    <div class="toolbar d-row justify-space-between">
        <IconButton onclick={() => {
            if (required.orRequired.length > 1) required.orRequired.pop();
        }} ><i class="mdi mdi-minus"></i></IconButton>
        <IconButton onclick={() => {
            required.orRequired.push({req: ''});
        }} ><i class="mdi mdi-plus"></i></IconButton>
    </div>
    <Autocomplete
        options={$optimizedWords}
        bind:value={required.reqId}
        label="Word ID"
        toggle={true}
        showMenuWithNoInput={true}
        textfield$variant="filled"
        class="w-100"
    />
    {#each required.orRequired as orReq}
        <Textfield bind:value={orReq.req} label="Word Text" variant="filled" />
    {/each}
{/if}

<script lang="ts">
    import Autocomplete from '$lib/custom/autocomplete/Autocomplete.svelte';
    import CustomChipInput from '$lib/store/CustomChipInput.svelte';
    import IconButton from '@smui/icon-button';
    import Select, { Option } from '$lib/custom/select';
    import Textfield from '$lib/custom/textfield/Textfield.svelte';
    import { Wrapper } from '$lib/custom/tooltip';
    import { groupMap, rowMap, getGroupLabel, getPointTypeLabel, getRowLabel, optimizedRows, optimizedPointTypes, optimizedGroups, optimizedGlobalRequirement, optimizedWords, getGlobalReqLabel } from '$lib/store/store.svelte';
    import type { Requireds } from '$lib/store/types';

    const { required }: { required: Requireds; } = $props();
    const pointReqOperators = [{
        text: '> More than',
        value: '1'
    }, {
        text: '≥ More or equal',
        value: '2'
    }, {
        text: '= Equal to',
        value: '3'
    }, {
        text: '≤ Less or equal',
        value: '4'
    }, {
        text: '< Less than',
        value: '5'
    }];
    const moreOperators = [{
        text: "+ Plus",
        value: '1'
    }, {
        text: "- Minus",
        value: '2'
    }, {
        text: "× Multiply",
        value: '3'
    }, {
        text: "÷ Divide",
        value: '4'
    }, {
        text: "% Mod",
        value: '5'
    }];
    const selFromOperators = [{
        text: '≥ More or equal',
        value: '1'
    }, {
        text: '= Equal to',
        value: '2'
    }, {
        text: '≤ Less or equal',
        value: '3'
    }];

    function setGroupElement(e: CustomEvent, req: Requireds) {
        let group = groupMap.get(e.detail);
        if (typeof group !== 'undefined') {
            if (typeof req.selGroups === 'undefined') {
                req.selGroups = [];
                req.selGroups.push(group.id);
            }
        }
    }

    function setRowElement(e: CustomEvent, req: Requireds) {
        let row = rowMap.get(e.detail);
        if (typeof row !== 'undefined') {
            if (typeof req.selRows === 'undefined') {
                req.selRows = [];
                req.selRows.push(row.id);
            }
        }
    }
</script>