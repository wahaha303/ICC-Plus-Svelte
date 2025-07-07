{#if isEditModeOn}
    <div bind:clientWidth={width}>
        <div class="d-row justify-space-between overflow-auto">
            <Wrapper text="Move Left">
                <IconButton onclick={moveReqLeft} size="mini"><i class="mdi mdi-chevron-left"></i></IconButton>
            </Wrapper>
            <div class="d-flex">
                <Wrapper text="Create New Reqruirement">
                    <IconButton onclick={() => {dlgVariables.data = required; dlgVariables.currentDialog = 'appRequirement'}} size="mini"><i class="mdi mdi-key-plus"></i></IconButton>
                </Wrapper>
                <Wrapper text="Copy Requirement">
                    <IconButton onclick={copyRequirement} size="mini"><i class="mdi mdi-clipboard-outline"></i></IconButton>
                </Wrapper>
            </div>
            <Wrapper text="Move Right">
                <IconButton onclick={moveReqRight} size="mini"><i class="mdi mdi-chevron-right"></i></IconButton>
            </Wrapper>
        </div>
        <div class="row">
            <div class="col-12">
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
                        <Checkbox bind:checked={() => required.hideRequired?? false, (e) => required.hideRequired = e} class="check-scale" />
                        {#snippet label()}
                            Hide when Requirement is met
                        {/snippet}
                    </FormField>
                    <FormField class="w-100">
                        <Checkbox bind:checked={() => required.customTextIsOn?? false, (e) => required.customTextIsOn = e} onchange={() => {
                            if (!required.customTextIsOn) {
                                delete required.customText;
                            }
                        }} class="check-scale" />
                        {#snippet label()}
                            Use custom requirement text
                        {/snippet}
                    </FormField>
                    {#if required.customTextIsOn}
                        <Textfield bind:value={() => required.customText?? '', (e) => required.customText = e} label="Custom Text" variant="filled" />
                    {:else}
                        <Textfield bind:value={required.beforeText} label="Text Before" variant="filled" />
                        <Textfield bind:value={required.afterText} label="Text After" variant="filled" />
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
                    <Button onclick={() => required.requireds.splice(i, 1)} class="w-100 mt-1" variant="raised">
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
    import type { Choice, Requireds } from '$lib/store/types';
    import { app, globalReqMap, groupMap, choiceMap, pointTypeMap, replaceText, rowMap, sanitizeArg, snackbarVariables, dlgVariables, checkReq, checkRequirements } from '$lib/store/store.svelte';
    
    let { isEditModeOn, required, scoreText, choice, index }: { isEditModeOn?: boolean; required: Requireds; scoreText?: string; choice?: Choice; index?: number } = $props();
    
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
        if (required.showRequired) {
            if (required.hideRequired) {
                if (required.requireds.length > 0) {
                    return checkRequirements(required.requireds) && !checkReq(required);
                } else {
                    return !checkReq(required);
                }
            }
            return true;
        }
        return false;
    });

    function copyRequirement() {
        app.tmpRequired.length = 0;
        app.tmpRequired.push(required);
        snackbarVariables.labelText = 'Copied to clipboard.';
        snackbarVariables.isOpen = true;
    }

    function moveReqLeft() {
        if (typeof choice !== 'undefined' && typeof index !== 'undefined' && index > 0) {
            choice.requireds.splice(index - 1, 2, choice.requireds[index], choice.requireds[index - 1]);
        }
    }

    function moveReqRight() {
        if (typeof choice !== 'undefined' && typeof index !== 'undefined' && index < choice.requireds.length - 1) {
            choice.requireds.splice(index, 2, choice.requireds[index + 1], choice.requireds[index]);
        }
    }

    function getChoiceTitle(req: Requireds) {
        if (req.customTextIsOn) {
            return typeof req.customText !== 'undefined' ? req.customText : '';
        }

        switch (req.type) {
            case 'id': {
                let id = req.reqId.split('/ON#');
                let cMap = choiceMap.get(id[0]);
                if (typeof cMap !== 'undefined') {
                    let thisChoice = cMap.choice;

                    return `${req.beforeText} ${id.length > 1 ? `${id[1]} ` : ''} ${thisChoice.title} ${req.afterText}`;
                }
                break;
            }
            case 'point': {
                let thisPoint = pointTypeMap.get(req.reqId);
                if (typeof thisPoint !== 'undefined') {
                    
                    return `${req.beforeText} ${req.reqPoints} ${thisPoint.name} ${req.afterText}`;
                }
                break;
            }
            case 'or': {
                let val = [];
                for (let i = 0; i < req.orRequired.length; i++) {
                    let orReq = req.orRequired[i].req;
                    if (typeof orReq !== 'undefined') {
                        let id = orReq.split('/ON#');
                        let cMap = choiceMap.get(id[0]);
                        let num = '';
                        if (typeof cMap !== 'undefined') {
                            let thisChoice = cMap.choice;
                            num = id.length > 1 ? `${id[1]} ` : '';
                            val.push(`${num}${thisChoice.title}`);
                        }
                        if (app.orderOrReqText === '1') {
                            return `${req.beforeText} ${val.join(', ')} ${typeof req.orNum !== 'undefined' ? `${app.defaultOrReq} ${req.orNum}` : `${app.defaultOrReq} 1`} ${req.afterText}`;
                        } else {
                            return `${req.beforeText} ${typeof req.orNum !== 'undefined' ? `${req.orNum} ${app.defaultOrReq}` : `1 ${app.defaultOrReq}`} ${val.join(', ')} ${req.afterText}`;
                        }
                    }
                }
            }
            case 'selFromGroups': {
                if (typeof req.selGroups !== 'undefined') {
                    let val = [];
                    for (let i = 0; i < req.selGroups.length; i++) {
                        let id = req.selGroups[i];
                        let thisGroup = groupMap.get(id);
                        if (typeof thisGroup !== 'undefined') {
                            val.push(thisGroup.name);
                        }
                    }
                    if (app.orderSelReqText === '1') {
                        return `${req.beforeText} ${val.join(', ')} ${app.defaultOrReq} ${req.selNum} ${req.afterText}`;
                    } else {
                        return `${req.beforeText} ${req.selNum} ${app.defaultOrReq} ${val.join(', ')} ${req.afterText}`;
                    }
                }
            }
            case 'selFromRows': {
                if (typeof req.selRows !== 'undefined') {
                    let val = [];
                    for (let i = 0; i < req.selRows.length; i++) {
                        let id = req.selRows[i];
                        let thisRow = rowMap.get(id);
                        if (typeof thisRow !== 'undefined') {
                            val.push(thisRow.title);
                        }
                    }
                    if (app.orderSelReqText === '1') {
                        return `${req.beforeText} ${val.join(', ')} ${app.defaultOrReq} ${req.selNum} ${req.afterText}`;
                    } else {
                        return `${req.beforeText} ${req.selNum} ${app.defaultOrReq} ${val.join(', ')} ${req.afterText}`;
                    }
                }
            }
            case 'selFromWhole': {
                if (app.orderSelReqText === '1') {
                    return `${req.beforeText} ${app.defaultOrReq} ${req.selNum} ${req.afterText}`;
                } else {
                    return `${req.beforeText} ${req.selNum} ${app.defaultOrReq} ${req.afterText}`;
                }
            }
        }
        return `${req.beforeText} ${req.afterText}`;
    }
</script>