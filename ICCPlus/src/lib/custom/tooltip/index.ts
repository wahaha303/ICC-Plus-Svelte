
import Tooltip from './Tooltip.svelte';
import TooltipWrapper from './Wrapper.svelte';

export { tooltipVariables, type TooltipVariables } from './store.svelte';

// Default export
export default Tooltip;

// Named subcomponent export
export const Wrapper = TooltipWrapper;