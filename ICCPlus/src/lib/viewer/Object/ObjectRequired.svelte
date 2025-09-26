{#if isShowReq}
    {#if required.type === 'gid'}
        {#each globalRequireds as globalRequired}
            {#if globalRequired.showRequired}
                {#key replaceText(getChoiceTitle(globalRequired))}
                    <div class="col req text-prewrap" style={scoreText}>
                        {@html DOMPurify.sanitize(replaceText(getChoiceTitle(globalRequired)), sanitizeArg)}
                    </div>
                {/key}
            {/if}
        {/each}
    {:else}
        {#key reqTitle}
            <div class="col req text-prewrap" style={scoreText}>
                {@html DOMPurify.sanitize(reqTitle, sanitizeArg)}
            </div>
        {/key}
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
    let reqTitle = $derived(replaceText(getChoiceTitle(required)));
</script>