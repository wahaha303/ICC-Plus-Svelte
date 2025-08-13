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
    import { app, globalReqMap, replaceText, sanitizeArg, checkReq, checkRequirements, getChoiceTitle } from '$lib/store/store.svelte';
    
    const { required, scoreText }: { required: Requireds; scoreText?: string; } = $props();
    
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
</script>