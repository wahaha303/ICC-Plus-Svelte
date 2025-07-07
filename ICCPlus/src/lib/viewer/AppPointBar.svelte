<div style={pointBarText}>
    <span style={point.pointPrivateColorIsOn ? `color: ${point.startingSum >= 0 ? point.privateColor : point.privateNegativeColor}` : ""}>
        {#if point.iconIsOn}
            {#if point.negativeIconIsOn && point.startingSum < 0}
                {#if !point.negativeImageOnSide && !point.negativeImageSidePlacement}
                    {@html renderIcon(point, true)}
                {/if}
            {:else}
                {#if !point.imageOnSide && !point.imageSidePlacement}
                    {@html renderIcon(point, false)}
                {/if}
            {/if}
        {/if}
        {point.beforeText}
        {#if point.iconIsOn}
            {#if point.negativeIconIsOn && point.startingSum < 0}
                {#if point.negativeImageOnSide && !point.negativeImageSidePlacement}
                    {@html renderIcon(point, true)}
                {/if}
            {:else}
                {#if point.imageOnSide && !point.imageSidePlacement}
                    {@html renderIcon(point, false)}
                {/if}
            {/if}
        {/if}
        <span translate="no" style={pointSumText}>{point.startingSum % 1 === 0 ? point.startingSum : parseFloat(point.startingSum.toFixed(point.decimalPlaces ?? 2))}</span>
        {#if point.iconIsOn}
            {#if point.negativeIconIsOn && point.startingSum < 0}
                {#if !point.negativeImageOnSide && point.negativeImageSidePlacement}
                    {@html renderIcon(point, true)}
                {/if}
            {:else}
                {#if !point.imageOnSide && point.imageSidePlacement}
                    {@html renderIcon(point, false)}
                {/if}
            {/if}
        {/if}
        {point.afterText}
        {#if point.iconIsOn}
            {#if point.negativeIconIsOn && point.startingSum < 0}
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
    import { app } from "$lib/store/store.svelte";
    import type { PointType } from "$lib/store/types";

    let { point }: { point: PointType } = $props();

    let pointBarText = $derived(`color: ${app.styling.barTextColor};margin: ${app.styling.barTextMargin}px;padding: ${app.styling.barTextPadding}px;font-family: "${app.styling.barTextFont}";font-size: ${app.styling.barTextSize}px`);
    let pointSumText = $derived.by(() => {
        if (point.startingSum >= 0) {
            if (typeof app.styling.barPointPos !== 'undefined') return `color: ${app.styling.barPointPos};`;
        } else if (typeof app.styling.barPointNeg !== 'undefined') return `color: ${app.styling.barPointNeg};`;
        
        return '';
    });

    function renderIcon(point: PointType, isNegative: boolean) {
        const image = isNegative ? point.negativeImage : point.image;
        const width = isNegative ? point.negativeIconWidth : point.iconWidth;
        const height = isNegative ? point.negativeIconHeight : point.iconHeight;
        return image ? `<img src="${image}" style="width: ${width}px; height:${height}px;" alt="">` : '';
    }

</script>