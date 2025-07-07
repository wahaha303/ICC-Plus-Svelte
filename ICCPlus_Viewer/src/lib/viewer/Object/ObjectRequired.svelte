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

<script lang="ts">
    import DOMPurify from 'dompurify';
    import type { Requireds } from '$lib/store/types';
    import { app, globalReqMap, groupMap, choiceMap, pointTypeMap, replaceText, rowMap, sanitizeArg, checkReq, checkRequirements } from '$lib/store/store.svelte';
    
    const { required, scoreText }: { required: Requireds; scoreText?: string; } = $props();
    
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