import type TooltipType from './Tooltip.svelte';
import type WrapperType from './Wrapper.svelte';

export { tooltipVariables, type TooltipVariables } from './store.svelte';

// Default export
declare const Tooltip: typeof TooltipType;
export default Tooltip;

// Named export
export const Wrapper: typeof WrapperType;