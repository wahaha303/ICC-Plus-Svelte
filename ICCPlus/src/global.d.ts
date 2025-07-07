// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	namespace YT {
		interface Player {
			playerInfo: {
				videoData?: {
					video_id?: string;
					title?: string;
					isPlayable?: boolean;
				}
			}
		}
	}
	interface Window {
		onYouTubeIframeAPIReady: () => void;
	}
}

// allow any prop on SMUI components (loosen type checking for now)
declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    [key: `surface$${string}`]: any;
    [key: `container$${string}`]: any;
    [key: `list$${string}`]: any;
    [key: `menu$${string}`]: any;
	open?: boolean;
  }
}
declare module '@smui/textfield' {
  import type { ComponentType } from 'svelte';
  const Textfield: ComponentType<any>;
  export default Textfield;
}

export {};
