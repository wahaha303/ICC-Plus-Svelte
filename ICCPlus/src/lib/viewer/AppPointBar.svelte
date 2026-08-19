<div style={pointBarText}>
    <span class="d-flex text-prewrap align-items-center" style="{point.pointPrivateColorIsOn ? `color: ${isPos ? hexToRgba(point.privateColor) : hexToRgba(point.privateNegativeColor)}` : ''}">
        {#if point.iconIsOn}
            {#if point.negativeIconIsOn && !isPos}
                {#if !point.negativeImageOnSide && !point.negativeImageSidePlacement}
                    {@html renderIcon(point, true)}
                {/if}
            {:else}
                {#if !point.imageOnSide && !point.imageSidePlacement}
                    {@html renderIcon(point, false)}
                {/if}
            {/if}
        {/if}
        {@html DOMPurify.sanitize(point.beforeText, sanitizeArg)}
        {#if point.iconIsOn}
            {#if point.negativeIconIsOn && !isPos}
                {#if point.negativeImageOnSide && !point.negativeImageSidePlacement}
                    {@html renderIcon(point, true)}
                {/if}
            {:else}
                {#if point.imageOnSide && !point.imageSidePlacement}
                    {@html renderIcon(point, false)}
                {/if}
            {/if}
        {/if}
        <span translate="no" style={pointSumText}>{point.startingSum % 1 === 0 ? point.startingSum : parseFloat(point.startingSum.toFixed(typeof point.decimalPlaces !== 'undefined' ? point.decimalPlaces : 2))}</span>
        {#if point.iconIsOn}
            {#if point.negativeIconIsOn && !isPos}
                {#if !point.negativeImageOnSide && point.negativeImageSidePlacement}
                    {@html renderIcon(point, true)}
                {/if}
            {:else}
                {#if !point.imageOnSide && point.imageSidePlacement}
                    {@html renderIcon(point, false)}
                {/if}
            {/if}
        {/if}
        {@html DOMPurify.sanitize(point.afterText, sanitizeArg)}
        {#if point.iconIsOn}
            {#if point.negativeIconIsOn && !isPos}
                {#if point.negativeImageOnSide && point.negativeImageSidePlacement}
                    {@html renderIcon(point, true)}
                {/if}
            {:else}
                {#if point.imageOnSide && point.imageSidePlacement}
                    {@html renderIcon(point, false)}
                {/if}
            {/if}
        {/if}
    </span>
</div>

<script lang="ts">
    import DOMPurify from 'dompurify';
    import { app, hexToRgba, sanitizeArg } from "$lib/store/store.svelte";
    import type { PointType } from "$lib/store/types";

    let { point }: { point: PointType } = $props();

    let isPos = $derived(point.treatZeroAsNegative ? point.startingSum > 0 : point.startingSum >= 0);
    let pointBarText = $derived(`color: ${hexToRgba(app.styling.barTextColor)}; margin: ${app.styling.barTextMargin}px; padding: ${app.styling.barTextPadding}px; font-family: '${app.styling.barTextFont}'; font-size: ${app.styling.barTextSize}px;`);
    let pointSumText = $derived.by(() => {
        const pointPos = point.pointPrivateColorIsOn ? point.privateColor : app.styling.barPointPos;
        const pointNeg = point.pointPrivateColorIsOn ? point.privateNegativeColor : app.styling.barPointNeg;
        if (isPos) {
            if (pointPos) return `color: ${hexToRgba(pointPos)};`;
        } else if (pointNeg) return `color: ${hexToRgba(pointNeg)};`;
        
        return '';
    });

    function renderIcon(point: PointType, isNegative: boolean) {
        const image = isNegative ? point.negativeImage : point.image;
        const width = isNegative ? point.negativeIconWidth : point.iconWidth;
        const height = isNegative ? point.negativeIconHeight : point.iconHeight;
        return image ? `<img src="${image}" class="mx-1" style="width: ${width}px; height: ${height}px;" alt="">` : '';
    }

</script>