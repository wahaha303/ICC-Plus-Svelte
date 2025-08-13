{#if isEditModeOn}
    <div bind:clientWidth={width}>
        <div class="d-row justify-space-between overflow-auto">
            <Wrapper text="Move Left">
                <IconButton onclickcapture={moveReqLeft} size="mini"><i class="mdi mdi-chevron-left"></i></IconButton>
            </Wrapper>
            <div class="d-flex">
                <Wrapper text="Create New Reqruirement">
                    <IconButton onclickcapture={() => {dlgVariables.data = required; dlgVariables.currentDialog = 'appRequirement'}} size="mini"><i class="mdi mdi-key-plus"></i></IconButton>
                </Wrapper>
                <Wrapper text="Copy Requirement">
                    <IconButton onclickcapture={copyRequirement} size="mini"><i class="mdi mdi-clipboard-outline"></i></IconButton>
                </Wrapper>
            </div>
            <Wrapper text="Move Right">
                <IconButton onclickcapture={moveReqRight} size="mini"><i class="mdi mdi-chevron-right"></i></IconButton>
            </Wrapper>
        </div>
        <div class="row">
            <div class="col-12">
                {#if !isNotShown}
                    <FormField class="w-100">
                        <Checkbox bind:checked={required.showRequired} onchange={() => {
                            if (!required.showRequired) {
                                delete required.hideRequired;
                            }
                        }} class="check-scale" />
                        {#snippet label()}
                            Show Requirement
                        {/snippet}
                    </FormField>
                    {#if required.showRequired}
                        <FormField class="w-100">
                            <Checkbox bind:checked={() => required.hideRequired ?? false, (e) => required.hideRequired = e} class="check-scale" />
                            {#snippet label()}
                                Hide when Requirement is met
                            {/snippet}
                        </FormField>
                        {#if required.requireds.length > 0}
                            <FormField class="w-100">
                                <Checkbox bind:checked={() => required.hideRequired2 ?? false, (e) => required.hideRequired2 = e} class="check-scale" />
                                {#snippet label()}
                                    Hide when Requirement is not enabled
                                {/snippet}
                            </FormField>
                        {/if}
                        <FormField class="w-100">
                            <Checkbox bind:checked={() => required.customTextIsOn ?? false, (e) => required.customTextIsOn = e} onchange={() => {
                                if (!required.customTextIsOn) {
                                    delete required.customText;
                                }
                            }} class="check-scale" />
                            {#snippet label()}
                                Use custom requirement text
                            {/snippet}
                        </FormField>
                        {#if required.customTextIsOn}
                            <Textfield bind:value={() => required.customText ?? '', (e) => required.customText = e} label="Custom Text" variant="filled" />
                        {:else}
                            <Textfield bind:value={required.beforeText} label="Text Before" variant="filled" />
                            <Textfield bind:value={required.afterText} label="Text After" variant="filled" />
                        {/if}
                    {/if}
                {/if}
                <div>
                    <ObjectInnerReq required={required} />
                </div>
            </div>
        </div>
        <div class="row gy-3 p-2">
            {#each required.requireds as req, i}
                <div class={col6}>
                    <ObjectInnerReq required={req} />
                    <Button onclickcapture={() => deleteInnerReq(i)} class="w-100 mt-1" variant="raised">
                        <Label>Delete</Label>
                    </Button>
                </div>
            {/each}
        </div>
    </div>
{:else}
    {#if isShowReq}
        {#if required.type === 'gid'}
            {#each globalRequireds as globalRequired}
                {#if globalRequired.showRequired}
                    <div class="col" style={scoreText}>
                        {@html DOMPurify.sanitize(replaceText(getChoiceTitle(globalRequired)), sanitizeArg)}
                    </div>
                {/if}
            {/each}
        {:else}
            <div class="col" style={scoreText}>
                {@html DOMPurify.sanitize(replaceText(getChoiceTitle(required)), sanitizeArg)}
            </div>
        {/if}
    {/if}
{/if}

<script lang="ts">
    import Button, { Label } from '@smui/button';
    import Checkbox from '@smui/checkbox';
    import DOMPurify from 'dompurify';
    import FormField from '@smui/form-field';
    import IconButton from '@smui/icon-button';
    import ObjectInnerReq from './ObjectInnerReq.svelte';
    import Textfield from '$lib/custom/textfield/Textfield.svelte';
    import { Wrapper } from '$lib/custom/tooltip';
    import type { Row, Choice, Addon, Requireds, Score } from '$lib/store/types';
    import { app, globalReqMap, replaceText, sanitizeArg, snackbarVariables, dlgVariables, checkReq, checkRequirements, getChoiceTitle } from '$lib/store/store.svelte';
    
    let { isEditModeOn, required, scoreText, data, index, isNotShown }: { isEditModeOn?: boolean; required: Requireds; scoreText?: string; data?: Row | Choice | Score | Addon; index?: number; isNotShown?: boolean } = $props();
    
    let width = $state(0);
    let col6 = $derived.by(() => {
        if (width > 300) return 'col-6';
        else return 'col-12';
    });
    let globalRequireds = $derived.by(() => {
        let globalReq = globalReqMap.get(required.reqId);
        if (typeof globalReq !== 'undefined' && typeof app.globalRequirements !== 'undefined') {
            return globalReq.requireds;
        }
        return [];
    });
    let isShowReq = $derived.by(() => {
        let result = false;
        if (required.showRequired) {
            result = true;
            if (required.hideRequired2) {
                result = checkRequirements(required.requireds);
            }
            if (required.hideRequired) {
                if (required.requireds.length > 0) {
                    result = checkRequirements(required.requireds) && !checkReq(required);
                } else {
                    result = !checkReq(required);
                }
            }
        }
        return result;
    });

    function copyRequirement() {
        if (typeof app.tmpRequired === 'undefined') app.tmpRequired = [];
        app.tmpRequired.length = 0;
        app.tmpRequired.push(JSON.parse(JSON.stringify(required)));
        snackbarVariables.labelText = 'Copied to clipboard.';
        snackbarVariables.isOpen = true;
    }

    function deleteInnerReq(index: number) {
        required.requireds.splice(index, 1);
        if (required.requireds.length === 0 && required.hideRequired2) {
            delete required.hideRequired2;
        }
    }

    function moveReqLeft() {
        if (typeof data !== 'undefined' && typeof index !== 'undefined' && index > 0) {
            data.requireds.splice(index - 1, 2, data.requireds[index], data.requireds[index - 1]);
        }
    }

    function moveReqRight() {
        if (typeof data !== 'undefined' && typeof index !== 'undefined' && index < data.requireds.length - 1) {
            data.requireds.splice(index, 2, data.requireds[index + 1], data.requireds[index]);
        }
    }
</script>