<div bind:this={container} id="picture-input" class="picture-input">
    {#if !supportsUpload}
      <div>{@html strings.upload}</div>
    {:else if supportsPreview}
      <div class="preview-container" style="max-width: {previewWidth}px; height: {previewHeight}px; border-radius: {radius}%;">
        <canvas bind:this={previewCanvas}
                class="picture-preview {computedClasses}"
                tabindex="0"
                ondrag={(e) => { e.stopPropagation(); e.preventDefault(); }}
                ondragover={(e) => { e.stopPropagation(); e.preventDefault(); }}
                ondragstart={(e) => { e.stopPropagation(); e.preventDefault(); }}
                ondragend={(e) => { e.stopPropagation(); e.preventDefault(); }}
                ondragenter={(e) => { e.stopPropagation(); e.preventDefault(); onDragEnter(); }}
                ondragleave={(e) => { e.stopPropagation(); e.preventDefault(); onDragLeave(); }}
                ondrop={(e) => { e.stopPropagation(); e.preventDefault(); onFileDrop(e); }}
                onclick={(e) => { e.preventDefault(); onClick(); }}
                style="height: {previewHeight}px; z-index: {parseInt(zIndex + '') + 1};">
        </canvas>
        {#if !imageSelected && !plain}
          <div class="picture-inner"
               style="top: -{previewHeight}px; margin-bottom: -{previewHeight}px; font-size: {fontSize}; border-radius: {radius}%; z-index: {parseInt(zIndex + '') + 2};">
            {#if supportsDragAndDrop}
              <span class="picture-inner-text">
                {@html strings.drag}
              </span>
            {:else}
              <span class="picture-inner-text">
                {@html strings.tap}
              </span>
            {/if}
          </div>
        {/if}
      </div>
      {#if imageSelected && !hideChangeButton}
        <Button variant="raised" onclick={selectImage} class={buttonClass}>
            <Label>{strings.change}</Label>
        </Button>
      {/if}
      {#if imageSelected && removable}
        <Button variant="raised" onclick={removeImage} class={removeButtonClass}>
            <Label>{strings.remove}</Label>
        </Button>
      {/if}
      {#if imageSelected && toggleAspectRatio && width !== height}
        <Button variant="raised" onclick={rotateImage} class={aspectButtonClass}>
            <Label>{strings.aspect}</Label>
        </Button>
      {/if}
    {:else}
      <div>
        {#if !imageSelected}
            <Button variant="raised" onclick={selectImage} class={buttonClass}>
                <Label>{strings.select}</Label>
            </Button>
        {:else}
            <div>{@html strings.selected}</div>
            {#if !hideChangeButton}
                <Button variant="raised" onclick={selectImage} class={buttonClass}>
                    <Label>{strings.change}</Label>
                </Button>
            {/if}
            {#if removable}
                <Button variant="raised" onclick={removeImage} class={removeButtonClass}>
                    <Label>{strings.remove}</Label>
                </Button>
            {/if}
        {/if}
      </div>
    {/if}
    <input bind:this={fileInput} type="file" name={name} id={id} accept={accept} onchange={onFileChange} {capture} />
</div>

<script lang="ts">
    import { onDestroy, onMount, tick } from 'svelte';
    import Button, { Label } from '@smui/button';

    type OwnProps = {
        width?: number | string;
        height?: number | string;
        margin?: number | string;
        accept?: string;
        capture?: boolean | "user" | "environment" | null | undefined;
        size?: number | string;
        name?: string | null;
        id?: string | null;
        buttonClass?: string;
        removeButtonClass?: string;
        aspectButtonClass?: string;
        prefill?: string | File | Blob;
        prefillOptions?: Record<string, any>;
        crop?: boolean;
        radius?: number | string;
        removable?: boolean;
        hideChangeButton?: boolean;
        autoToggleAspectRatio?: boolean;
        toggleAspectRatio?: boolean;
        changeOnClick?: boolean;
        plain?: boolean;
        zIndex?: number;
        alertOnError?: boolean;
        customStrings?: Record<string, any>;
        onaspectratiochange?: (e: "landscape" | "portrait" | "square") => void;
        onchange?: (e: string) => void;
        onclick?: () => void;
        onerror?: ({}) => void;
        onprefill?: () => void;
        onremove?: () => void;
    }
  
    let {
        width = Number.MAX_SAFE_INTEGER,
        height = Number.MAX_SAFE_INTEGER,
        margin = 0,
        accept = 'image/*, image/avif',
        capture = null,
        size = Number.MAX_SAFE_INTEGER,
        name = null,
        id = null,
        buttonClass = '',
        removeButtonClass = '',
        aspectButtonClass = '',
        prefill = $bindable(''),
        prefillOptions = {},
        crop = true,
        radius = 0,
        removable = false,
        hideChangeButton = false,
        autoToggleAspectRatio = false,
        toggleAspectRatio = false,
        changeOnClick = true,
        plain = false,
        zIndex = 10000,
        alertOnError = true,
        customStrings = {},
        onaspectratiochange,
        onchange,
        onclick,
        onerror,
        onprefill,
        onremove
    }:OwnProps = $props();
  
    // ======= Local state =======
    let imageSelected: boolean = $state(false);
    let previewHeight: number = $state(0);
    let previewWidth: number = $state(0);
    let draggingOver: boolean = $state(false);
    let canvasWidth: number = $state(0);
    let canvasHeight: number = $state(0);
    let pixelRatio: number = $state(1);
    let containerWidth: number = $state(0);
    let image = $state('');
    let imageObject = $state<HTMLImageElement | null>(null);
    let file = $state<File | null>(null);
    let fileName = $state('');
    let fileSize = $state(0);
    let fileModified = $state(0);
    let fileType = $state('');
    let rotate: number | false = $state(false);
    let imageWidth: number = $state(0);
    let imageHeight: number = $state(0);
    let imageRatio: number = $state(0);
    let context: CanvasRenderingContext2D | null = $state(null);
    let fileTypes: string[] = $state([]);
  
    // ======= Strings (default messages) =======
    let strings = {
        upload: '<p>Your device does not support file uploading.</p>',
        drag: 'Drag an image or <br>click here to select a file',
        tap: 'Tap here to select a photo <br>from your gallery',
        change: 'Change Photo',
        aspect: 'Landscape/Portrait',
        remove: 'Remove Photo',
        select: 'Select a Photo',
        selected: '<p>Photo successfully selected!</p>',
        fileSize: 'The file size exceeds the limit',
        fileType: 'This file type is not supported.'
    };
  
    // ======= Refs =======
    let container: HTMLDivElement;
    let previewCanvas = $state<HTMLCanvasElement>();
    let fileInput: HTMLInputElement;
  
    // ======= Computed values =======
    const supportsUpload = $derived.by(() => {
        if (navigator.userAgent.match(/(Android (1\.0|1\.1|1\.5|1\.6|2\.0|2\.1))|(Windows Phone (OS 7|8\.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1\.0|2\.0|2\.5|3\.0))/)) {
            return false;
        }
        const el = document.createElement('input');
        el.type = 'file';
        return !el.disabled;
    });
  
    const supportsPreview = $derived(!!(window.FileReader && window.CanvasRenderingContext2D));
  
    const supportsDragAndDrop = $derived.by(() => {
        const div = document.createElement('div');
        return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && !('ontouchstart' in window || navigator.maxTouchPoints);
    });
  
    // computedClasses: Svelte doesn’t support object-to-class binding directly, so we convert it to a string:
    const computedClasses = $derived(draggingOver ? 'dragging-over' : '');
  
    const fontSize = $derived(`${Math.min(0.04 * previewWidth, 21)}px`);
  
    // ======= Watcher for prefill =======
    $effect(() => {
        if (prefill) {
            preloadImage(prefill, prefillOptions);
        }
    });
  
    // ======= Lifecycle =======
    onMount(async() => {
        await tick();
        updateStrings();
        if (prefill) {
            preloadImage(prefill, prefillOptions);
        }
        window.addEventListener('resize', onResize);
        onResize();
        if (supportsPreview && previewCanvas) {
                pixelRatio = Math.round(window.devicePixelRatio || 1);
                if (previewCanvas.getContext) {
                context = previewCanvas.getContext('2d');
                if (context) context.scale(pixelRatio, pixelRatio);
            }
        }
        if (accept !== 'image/*, image/avif') {
            fileTypes = accept.split(',').map(s => s.trim());
        }
        canvasWidth = width != Number.MAX_SAFE_INTEGER ? Number(width) : container.clientWidth;
        canvasHeight = height != Number.MAX_SAFE_INTEGER ? Number(height) : canvasWidth;
        previewWidth = canvasWidth;
        previewHeight = canvasHeight;
    });

    onDestroy(() => {
        window.removeEventListener('resize', onResize);
    })
  
    // ======= Methods =======
    function updateStrings() {
        if (customStrings) {
            for (const s in customStrings) {
                if (s in strings && typeof customStrings[s] === 'string') {
                    strings[s as keyof typeof strings] = customStrings[s];
                }
            }
        }
    }
  
    function onClick() {
        if (!imageSelected || changeOnClick) {
            selectImage();
        }
        if (onclick) onclick();
    }
  
    function onResize() {
        if (resizeCanvas() && imageObject) {
            drawImage(imageObject);
        }
    }
  
    function onDragEnter() {
        if (!supportsDragAndDrop) return;
        draggingOver = true;
    }
  
    function onDragLeave() {
        if (!supportsDragAndDrop) return;
        draggingOver = false;
    }
  
    function onFileDrop(e: DragEvent) {
        onDragLeave();
        onFileChange(e);
    }
  
    function onFileChange(e: Event, prefillFlag = false) {
        const target = e.target as HTMLInputElement;
        const files = e.type === 'drop' ? (e as DragEvent).dataTransfer?.files : target.files;
        if (!files || files.length === 0) return;
        if (files[0].size <= 0 || files[0].size > Number(size) * 1024 * 1024) {
            if (onerror) {
                onerror({
                    type: 'fileSize',
                    fileSize: files[0].size,
                    fileType: files[0].type,
                    fileName: files[0].name,
                    message: `${strings.fileSize} (${size}MB)`
                });
            }
            if (alertOnError) alert(`${strings.fileSize} (${size}MB)`);
            return;
        }
        if (files[0].name === fileName && files[0].size === fileSize && fileModified === files[0].lastModified) {
            return;
        }
        file = files[0];
        fileName = files[0].name;
        fileSize = files[0].size;
        fileModified = files[0].lastModified;
        fileType = files[0].type.split(';')[0];
  
        if (accept === 'image/*, image/avif') {
            if (!fileType.startsWith('image/')) {
                return;
            }
        } else {
            if (fileTypes.indexOf(fileType) === -1) {
                if (onerror) {
                    onerror({
                        type: 'fileType',
                        fileSize,
                        fileType,
                        fileName,
                        message: strings.fileType
                    });
                }
                if (alertOnError) alert(strings.fileType);
                return;
            }
        }
        imageSelected = true;
        image = '';
        if (supportsPreview && file) {
            loadImage(file, prefillFlag);
        } else {
            if (prefillFlag) {
                if (onprefill) onprefill();
            } else {
                if (onchange) onchange(image);
            }
        }
    }
  
    function loadImage(file: File, prefillFlag: boolean) {
      getEXIFOrientation(file, orientation => {
        setOrientation(orientation);
        const reader = new FileReader();
        reader.onload = e => {
            image = (e.target as FileReader).result as string;
            imageObject = new Image();
            imageObject.onload = () => {
                if (autoToggleAspectRatio) {
                    const canvasOrientation = getOrientation(canvasWidth, canvasHeight);
                    const imageOrientation = getOrientation(imageObject!.width, imageObject!.height);
                    if (canvasOrientation !== imageOrientation) {
                        rotateCanvas();
                    }
                }
                drawImage(imageObject!);
            };
            imageObject.src = image;
            if (!prefillFlag && onchange) onchange(image);
        };
        reader.readAsDataURL(file);
      });
    }
  
    function drawImage(image: HTMLImageElement) {
        imageWidth = image.width;
        imageHeight = image.height;
        imageRatio = image.width / image.height;
        let offsetX = 0;
        let offsetY = 0;
        let scaledWidth = previewWidth;
        let scaledHeight = previewHeight;
        const previewRatio = previewWidth / previewHeight;
        if (crop) {
            if (imageRatio >= previewRatio) {
                scaledWidth = scaledHeight * imageRatio;
                offsetX = (previewWidth - scaledWidth) / 2;
            } else {
                scaledHeight = scaledWidth / imageRatio;
                offsetY = (previewHeight - scaledHeight) / 2;
            }
        } else {
            if (imageRatio >= previewRatio) {
                scaledHeight = scaledWidth / imageRatio;
                offsetY = (previewHeight - scaledHeight) / 2;
            } else {
                scaledWidth = scaledHeight * imageRatio;
                offsetX = (previewWidth - scaledWidth) / 2;
            }
        }
        if (!previewCanvas) return;
        previewCanvas.style.background = 'none';
        previewCanvas.width = previewWidth * pixelRatio;
        previewCanvas.height = previewHeight * pixelRatio;
        if (context) {
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
            if (rotate && typeof image.style.imageOrientation === 'undefined') {
                context.translate(offsetX * pixelRatio, offsetY * pixelRatio);
                context.translate((scaledWidth / 2) * pixelRatio, (scaledHeight / 2) * pixelRatio);
                context.rotate(rotate as number);
                offsetX = -scaledWidth / 2;
                offsetY = -scaledHeight / 2;
            }
            context.drawImage(image, offsetX * pixelRatio, offsetY * pixelRatio, scaledWidth * pixelRatio, scaledHeight * pixelRatio);
        }
    }
  
    function selectImage() {
      fileInput.click();
    }
  
    function removeImage() {
        fileInput.value = '';
        // Trick: reset file input by changing its type
        fileInput.type = '';
        fileInput.type = 'file';
        fileName = '';
        fileType = '';
        fileSize = 0;
        fileModified = 0;
        imageSelected = false;
        image = '';
        file = null;
        imageObject = null;
        if (previewCanvas) {
            previewCanvas.style.backgroundColor = 'rgba(200,200,200,.25)';
            previewCanvas.width = previewWidth * pixelRatio;
        }
        if (onremove) onremove();
    }
  
    function rotateImage() {
        rotateCanvas();
        if (imageObject) {
            drawImage(imageObject);
        }
        const newOrientation = getOrientation(canvasWidth, canvasHeight);
        if (onaspectratiochange) onaspectratiochange(newOrientation);
    }
  
    function resizeCanvas(): boolean {
        const previewRatio = canvasWidth / canvasHeight;
        const newWidth = container.clientWidth;
        if (!newWidth) return false;
        if (!toggleAspectRatio && !autoToggleAspectRatio && newWidth === containerWidth) {
            return false;
        }
        containerWidth = newWidth;
        previewWidth = Math.min(containerWidth - Number(margin) * 2, canvasWidth);
        previewHeight = previewWidth / previewRatio;
        return true;
    }
  
    function getOrientation(w: number, h: number) {
        if (w > h) return 'landscape';
        if (w < h) return 'portrait';
        return 'square';
    }
  
    function switchCanvasOrientation() {
        const tmp = canvasWidth;
        canvasWidth = canvasHeight;
        canvasHeight = tmp;
    }
  
    function rotateCanvas() {
        switchCanvasOrientation();
        resizeCanvas();
    }
  
    function setOrientation(orientation: number) {
        rotate = false;
        if (orientation === 8) {
            rotate = -Math.PI / 2;
        } else if (orientation === 6) {
            rotate = Math.PI / 2;
        } else if (orientation === 3) {
            rotate = -Math.PI;
        }
    }
  
    function getEXIFOrientation(file: File, callback: (orientation: number) => void) {
        const reader = new FileReader();
        reader.onload = e => {
            const view = new DataView((e.target as FileReader).result as ArrayBuffer);
            if (view.getUint16(0, false) !== 0xFFD8) return callback(-2);
            const length = view.byteLength;
            let offset = 2;
            while (offset < length) {
                const marker = view.getUint16(offset, false);
                offset += 2;
                if (marker === 0xFFE1) {
                    if (view.getUint32(offset += 2, false) !== 0x45786966) return callback(-1);
                    const little = view.getUint16(offset += 6, false) === 0x4949;
                    offset += view.getUint32(offset + 4, little);
                    const tags = view.getUint16(offset, little);
                    offset += 2;
                    for (let i = 0; i < tags; i++) {
                        if (view.getUint16(offset + (i * 12), little) === 0x0112) {
                            return callback(view.getUint16(offset + (i * 12) + 8, little));
                        }
                    }
                } else if ((marker & 0xFF00) !== 0xFF00) {
                    break;
                } else {
                    offset += view.getUint16(offset, false);
                }
            }
            return callback(-1);
        };
        reader.readAsArrayBuffer(file.slice(0, 65536));
    }
  
    function preloadImage(source: string | File | Blob, options: Record<string, any>) {
        let FileConstructor = window.File;
        try {
            new FileConstructor([], '');
        } catch (e) {
            // IE11 fallback
            FileConstructor = class extends Blob {
                lastModifiedDate = new Date();
                lastModified = +this.lastModifiedDate;
                name: string;
                constructor(chunks: BlobPart[], filename: string, opts = {}) {
                super(chunks, opts);
                this.name = filename;
                }
            } as any;
        }
        options = Object.assign({}, options);
        if (typeof source === 'object') {
            imageSelected = true;
            image = '';
            if (supportsPreview) {
                loadImage(source as File, true);
            } else {
                if (onprefill) onprefill();
            }
            return;
        }
        if (source.indexOf('data:') === -1) {
            source += source.indexOf('?') !== -1 ? '&_=' + new Date().getTime() : '?_=' + new Date().getTime();
        }
        const headers = new Headers();
        headers.append('Accept', 'image/*, image/avif');
        fetch(source, { method: 'GET', mode: 'cors', headers })
            .then(response => response.blob())
            .then(imageBlob => {
                const e: any = { target: { files: [] } };
                const fileName = options.fileName || source.split('/').slice(-1)[0];
                let mediaType = options.mediaType || imageBlob.type || ('image/' + (options.fileType || fileName.split('?')[0].split('.').slice(-1)[0]));
                mediaType = mediaType.replace('jpg', 'jpeg').replace('image/svg', 'image/svg+xml');
                if (mediaType === 'image/svg') mediaType = 'image/svg+xml';
                e.target.files[0] = new FileConstructor([imageBlob], fileName, { type: mediaType });
                onFileChange(e, true);
            })
            .catch(err => {
                if (onerror) {
                    onerror({
                        type: 'failedPrefill',
                        message: 'Failed loading prefill image: ' + err
                    });
                }
          if (alertOnError) alert('Failed loading prefill image: ' + err);
        });
    }
</script>