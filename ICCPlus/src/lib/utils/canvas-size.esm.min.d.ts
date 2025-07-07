declare module '$lib/utils/canvas-size.esm.min.js' {
    export function test(config: { width: number; height: number }): boolean;
  
    export function maxArea(options?: {
        usePromise?: boolean;
        useWorker?: boolean;
        onSuccess?: (width: number, height: number, benchmark: number) => void;
        onError?: (width: number, height: number, benchmark: number) => void;
    }): Promise<{ width: number; height: number; benchmark: number }>;
  
    export function maxWidth(): number;
  
    export function maxHeight(): number;
}