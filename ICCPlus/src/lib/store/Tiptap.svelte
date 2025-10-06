{#if editor}
    <div bind:this={header} class="d-flex justify-space-between position-relative tiptap-headmenu p-1">
        <div class:disabled={isRaw} class="d-flex flex-wrap p-0">
            <button onclick={toggleBold} use:tooltip={{text: 'Bold (Ctrl + B)', delay: 0}} class:tiptap-active={isBold && !isRaw} class="rich-button" aria-label="bold">
                <i class="mdi mdi-format-bold"></i>
            </button>
            <button onclick={toggleItalic} use:tooltip={{text: 'Italic (Ctrl + I)', delay: 0}} class:tiptap-active={isItalic && !isRaw} class="rich-button" aria-label="italic">
                <i class="mdi mdi-format-italic"></i>
            </button>
            <button onclick={toggleUnderline} use:tooltip={{text: 'Underline (Ctrl + U)', delay: 0}} class:tiptap-active={isUnderline && !isRaw} class="rich-button" aria-label="underline">
                <i class="mdi mdi-format-underline"></i>
            </button>
            <button onclick={toggleStrike} use:tooltip={{text: 'Strike (Ctrl + Shift + S)', delay: 0}} class:tiptap-active={isStrike && !isRaw} class="rich-button" aria-label="strike">
                <i class="mdi mdi-format-strikethrough-variant"></i>
            </button>
            <button bind:this={fontSizeBtn} onclick={toggleFontSize} use:tooltip={{text: 'Font Size', delay: 0}} class:tiptap-active={!!fontSize && !isRaw} class="rich-button" aria-label="font-size">
                <i class="mdi mdi-format-size"></i>
            </button>
            <button bind:this={textColorBtn} onclick={toggleTextColor} use:tooltip={{text: 'Text Color', delay: 0}} class:tiptap-active={hasTextColor && !isRaw} class="rich-button" aria-label="text-color">
                <i class="mdi mdi-format-color-text"></i>
            </button>
            <button bind:this={backgroundColorBtn} onclick={toggleBackgroundColor} use:tooltip={{text: 'Background Color', delay: 0}} class:tiptap-active={hasBackgroundColor && !isRaw} class="rich-button" aria-label="background-color">
                <i class="mdi mdi-format-color-fill"></i>
            </button>
            <button bind:this={lineHeightBtn} onclick={toggleLineHeight} use:tooltip={{text: 'Line Height', delay: 0}} class:tiptap-active={!!lineHeight && !isRaw} class="rich-button" aria-label="line-height">
                <i class="mdi mdi-format-line-spacing"></i>
            </button>
            <button bind:this={linkBtn} onclick={toggleLink} use:tooltip={{text: 'Link', delay: 0}} class:tiptap-active={isLinked && !isRaw} class="rich-button" aria-label="link">
                <i class="mdi mdi-link"></i>
            </button>
            <button bind:this={alignBtn} onclick={toggleAlignBox} use:tooltip={{text: 'Text Align', delay: 0}} class:tiptap-active={(isLeft || isCenter || isRight || isJustify) && !isRaw} class="rich-button" aria-label="link">
                <i class="mdi mdi-format-pilcrow"></i>
            </button>
        </div>
        <button onclick={toggleRawHTML} use:tooltip={{text: 'HTML', delay: 0}} class:tiptap-active={isRaw} class="rich-button" aria-label="html">
            <i class="mdi mdi-code-tags"></i>
        </button>
        {#if isFontSize}
            <div class="tiptap-submenu font-size" use:clickOutside={{ callback: () => (isFontSize = false), exclude: fontSizeBtn }} style={fontSizeBoxStyle}>
                <List class="p-0">
                    {#each fontSizes as size (size.text)}
                        <Item onclick={() => setFontSize(size.value)} style="height: 32px;">
                            <Text class="w-100 list-text text-center{fontSize === size.value ? ' tiptap-active' : ''}">{size.text}</Text>
                        </Item>
                    {/each}
                </List>
            </div>
        {/if}
        {#if isTextColor}
            <div class="tiptap-submenu pt-2" use:clickOutside={{ callback: () => (isTextColor = false), exclude: textColorBtn }} style={textColorBoxStyle}>
                <ColorPicker bind:hex={textColor} components={ChromeVariant} sliderDirection="horizontal" isDialog={false}  --picker-height="100px"/>
                <div class="row g-0">
                    <div class="col-6">
                        <Button onclick={applyTextColor}>
                            <Label class="dialog-actions--btn">Apply</Label>
                        </Button>
                    </div>
                    <div class="col-6">
                        <Button onclick={unsetTextColor}>
                            <Label>Unset</Label>
                        </Button>
                    </div>
                </div>
            </div>
        {/if}
        {#if isBackgroundColor}
            <div class="tiptap-submenu pt-2" use:clickOutside={{ callback: () => (isBackgroundColor = false), exclude: backgroundColorBtn }} style={backgroundColorBoxStyle}>
                <ColorPicker bind:hex={backgroundColor} components={ChromeVariant} sliderDirection="horizontal" isDialog={false}  --picker-height="100px"/>
                <div class="row g-0">
                    <div class="col-6">
                        <Button onclick={applyBackgroundColor}>
                            <Label class="dialog-actions--btn">Apply</Label>
                        </Button>
                    </div>
                    <div class="col-6">
                        <Button onclick={unsetBackgroundColor}>
                            <Label>Unset</Label>
                        </Button>
                    </div>
                </div>
            </div>
        {/if}
        {#if openLineHeight}
            <div class="tiptap-submenu line-height" use:clickOutside={{ callback: () => (openLineHeight = false), exclude: lineHeightBtn }} style={lineHeightBoxStyle}>
                <List class="p-0">
                    {#each lineHeights as height (height.text)}
                        <Item onclick={() => setLineHeight(height.value)} style="height: 32px;">
                            <Text class="w-100 list-text text-center{lineHeight === height.value ? ' tiptap-active' : ''}">{height.text}</Text>
                        </Item>
                    {/each}
                </List>
            </div>
        {/if}
        {#if openLink}
            <div class="tiptap-submenu link-menu" use:clickOutside={{ callback: () => {openLink = false; linkText = '';}, exclude: linkBtn }} style={linkBoxStyle}>
                <div class="row g-0">
                    <div class="col-12 p-2">
                        <Textfield bind:value={linkText} label="URL" variant="outlined" />
                    </div>
                    <div class="col-12">
                        <Button onclick={applyLink}>
                            <Label class="dialog-actions--btn">Apply</Label>
                        </Button>
                    </div>
                </div>
            </div>
        {/if}
        {#if openAlign}
            <div class="tiptap-submenu align-menu" use:clickOutside={{ callback: () => (openAlign = false), exclude: alignBtn }} style={alignBoxStyle}>
                <div class="d-flex flex-wrap align-item-center">
                    <button onclick={() => toggleAlign('left')} use:tooltip={{text: 'Left (Ctrl + Shift + L)', delay: 0}} class:tiptap-active={isLeft && !isRaw} class="rich-button" aria-label="align-left">
                        <i class="mdi mdi-format-align-left"></i>
                    </button>
                    <button onclick={() => toggleAlign('center')} use:tooltip={{text: 'Center (Ctrl + Shift + E)', delay: 0}} class:tiptap-active={isCenter && !isRaw} class="rich-button" aria-label="align-center">
                        <i class="mdi mdi-format-align-center"></i>
                    </button>
                    <button onclick={() => toggleAlign('right')} use:tooltip={{text: 'Right (Ctrl + Shift + R)', delay: 0}} class:tiptap-active={isRight && !isRaw} class="rich-button" aria-label="align-right">
                        <i class="mdi mdi-format-align-right"></i>
                    </button>
                    <button onclick={() => toggleAlign('justify')} use:tooltip={{text: 'Justify (Ctrl + Shift + J)', delay: 0}} class:tiptap-active={isJustify && !isRaw} class="rich-button" aria-label="align-justify">
                        <i class="mdi mdi-format-align-justify"></i>
                    </button>
                </div>
            </div>
        {/if}
    </div>
{/if}
{#if textarea}
    <Textfield textarea bind:value={data[dataProp]} class={isRaw ? '' : 'hidden'} label={label} variant="filled" input$rows={rows} />
{:else}
    <Textfield bind:value={data[dataProp]} class={isRaw ? '' : 'hidden'} label={label} variant="filled" />
{/if}
<div bind:this={element} class:hidden={isRaw} class:tiptap-wrapper--focused={isFocused} class="tiptap-wrapper" style={tiptapStyle}></div>

<script lang="ts">
    import Button, { Label } from '@smui/button';
    import ColorPicker, { ChromeVariant } from '$lib/custom/svelte-awesome-color-picker';
    import List, { Item, Text } from '@smui/list';
    import StarterKit from '@tiptap/starter-kit';
    import TextAlign from '@tiptap/extension-text-align'
    import Textfield from '$lib/custom/textfield/Textfield.svelte';
    import { tooltip } from '$lib/custom/tooltip/store.svelte';
	import { onMount } from 'svelte';
	import { Editor } from '@tiptap/core';
    import { BackgroundColor, Color, FontSize, LineHeight } from '@tiptap/extension-text-style';
    import type { Addon, Choice, Row } from './types';
    import { SanitizeExtensions, CustomParagraph, CustomImage, CustomHeading, CustomTextStyle, CustomBulletList, CustomOrderList, CustomListItem, CustomStrong, CustomItalic, CustomStrike, CustomUnderline, CustomCode } from './SanitizeExtensions';
    import { rgbToHex } from './store.svelte';

    type Params = {
        callback: () => void;
        exclude?: HTMLElement;
    };

    let { data, dataProp, textarea = false, rows = 5, label }: { data: Choice | Row | Addon, dataProp: string, textarea?: boolean, rows?: number, label: string } = $props();

	let element = $state<HTMLElement>();
    let header = $state<HTMLElement>();
    let fontSizeBtn = $state<HTMLElement>();
    let textColorBtn = $state<HTMLElement>();
    let backgroundColorBtn = $state<HTMLElement>();
    let lineHeightBtn = $state<HTMLElement>();
    let linkBtn = $state<HTMLElement>();
    let alignBtn = $state<HTMLElement>();
	let editor = $state<Editor>();
    let isBold = $state(false);
    let isItalic = $state(false);
    let isUnderline = $state(false);
    let isStrike = $state(false);
    let isFontSize = $state(false);
    let isTextColor = $state(false);
    let isBackgroundColor = $state(false);
    let isLinked = $state(false);
    let isLeft = $state(false);
    let isCenter = $state(false);
    let isRight = $state(false);
    let isJustify = $state(false);
    let openLink = $state(false);
    let openLineHeight = $state(false);
    let openAlign = $state(false);
    let linkText = $state('');
    let textColor = $state('#000000');
    let backgroundColor = $state('#FFFFFF');
    let isRaw = $state(false);
    let isFocused = $state(false);
    let hasTextColor = $state(false);
    let hasBackgroundColor = $state(false);
    let fontSize = $state<string | null>(null);
    let lineHeight = $state<string | null>(null);

    let tiptapStyle = $derived.by(() => {
        if (!textarea) return 'max-height: 83px; min-height: 40px;';
        return `height: ${24 * (rows + 1) + 11}px; min-height: 155px;`;
    });
    let fontSizeBoxStyle = $derived.by(() => {
        if (!fontSizeBtn) return '';
        if (window.innerWidth < fontSizeBtn.offsetLeft + 80) {
            return `top: ${fontSizeBtn.offsetTop + fontSizeBtn.offsetHeight}px;`;
        }
        return `left: ${fontSizeBtn.offsetLeft}px; top: ${fontSizeBtn.offsetTop + fontSizeBtn.offsetHeight}px;`;
    });
    let textColorBoxStyle = $derived.by(() => {
        if (!textColorBtn) return '';
        if (window.innerWidth < textColorBtn.offsetLeft + 282) {
            return `top: ${textColorBtn.offsetTop + textColorBtn.offsetHeight}px;`;
        }
        return `left: ${textColorBtn.offsetLeft}px; top: ${textColorBtn.offsetTop + textColorBtn.offsetHeight}px;`;
    });
    let backgroundColorBoxStyle = $derived.by(() => {
        if (!backgroundColorBtn) return '';
        if (window.innerWidth < backgroundColorBtn.offsetLeft + 282) {
            return `top: ${backgroundColorBtn.offsetTop + backgroundColorBtn.offsetHeight}px;`;
        }
        return `left: ${backgroundColorBtn.offsetLeft}px; top: ${backgroundColorBtn.offsetTop + backgroundColorBtn.offsetHeight}px;`;
    });
    let lineHeightBoxStyle = $derived.by(() => {
        if (!lineHeightBtn) return '';
        if (window.innerWidth < lineHeightBtn.offsetLeft + 100) {
            return `top: ${lineHeightBtn.offsetTop + lineHeightBtn.offsetHeight}px;`;
        }
        return `left: ${lineHeightBtn.offsetLeft}px; top: ${lineHeightBtn.offsetTop + lineHeightBtn.offsetHeight}px;`;
    });
    let linkBoxStyle = $derived.by(() => {
        if (!linkBtn) return '';
        if (window.innerWidth < linkBtn.offsetLeft + 300) {
            return `top: ${linkBtn.offsetTop + linkBtn.offsetHeight}px;`;
        }
        return `left: ${linkBtn.offsetLeft}px; top: ${linkBtn.offsetTop + linkBtn.offsetHeight}px;`;
    });
    let alignBoxStyle = $derived.by(() => {
        if (!alignBtn) return '';
        if (window.innerWidth < alignBtn.offsetLeft + 120) {
            return `top: ${alignBtn.offsetTop + alignBtn.offsetHeight}px;`;
        }
        return `left: ${alignBtn.offsetLeft}px; top: ${alignBtn.offsetTop + alignBtn.offsetHeight}px;`;
    });

    const fontSizes = [{
        text: '8',
        value: '8px'
    }, {
        text: '9',
        value: '9px'
    }, {
        text: '10',
        value: '10px'
    }, {
        text: '11',
        value: '11px'
    }, {
        text: '12',
        value: '12px'
    }, {
        text: '14',
        value: '14px'
    }, {
        text: '16',
        value: '16px'
    }, {
        text: '18',
        value: '18px'
    }, {
        text: '20',
        value: '20px'
    }, {
        text: '22',
        value: '22px'
    }, {
        text: '24',
        value: '24px'
    }, {
        text: '28',
        value: '28px'
    }, {
        text: '30',
        value: '30px'
    }, {
        text: '36',
        value: '36px'
    }, {
        text: '50',
        value: '50px'
    }, {
        text: '72',
        value: '72px'
    }, {
        text: '96',
        value: '96px'
    }];
    const lineHeights = [{
        text: '1.0',
        value: '1'
    }, {
        text: '1.2',
        value: '1.2'
    }, {
        text: '1.4',
        value: '1.4'
    }, {
        text: '1.5',
        value: '1.5'
    }, {
        text: '1.6',
        value: '1.6'
    }, {
        text: '1.8',
        value: '1.8'
    }, {
        text: '2.0',
        value: '2'
    }, {
        text: '3.0',
        value: '3'
    }];

    function isEmpty(editor: Editor | undefined): boolean {
        if (!editor) return true

        const json = editor.getJSON()
        const content = json.content ?? []

        if (content.length === 0) return true

        if (
            content.length === 1 &&
            content[0].type === 'paragraph' &&
            (!content[0].content || content[0].content.length === 0)
        ) {
            return true
        }

        return false
    }

	onMount(() => {
        data[dataProp] = convertNewlinesToBr(data[dataProp]);
		editor = new Editor({
			element: element,
			extensions: [
                StarterKit.configure({
                    paragraph: false,
                    heading: false,
                    bulletList: false,
                    orderedList: false,
                    listItem: false,
                }),
                BackgroundColor,
                Color,
                CustomParagraph,
                CustomHeading,
                FontSize,
                CustomImage.configure({
                    inline: true,
                    allowBase64: true,
                }),
                LineHeight,
                TextAlign.configure({
                    types: ['paragraph'],
                }),
                CustomTextStyle,
                CustomBulletList,
                CustomOrderList,
                CustomListItem,
                CustomStrong,
                CustomItalic,
                CustomStrike,
                CustomUnderline,
                CustomCode,
                ...SanitizeExtensions,
            ],
			content: data[dataProp],
			onTransaction: () => {
                if (editor) {
                    const attrs = editor.getAttributes('textStyle');

                    isBold = editor.isActive('bold');
                    isItalic = editor.isActive('italic');
                    isUnderline = editor.isActive('underline');
                    isStrike = editor.isActive('strike');
                    fontSize = attrs.fontSize;
                    hasTextColor = !!attrs.color;
                    hasBackgroundColor = !!attrs.backgroundColor;
                    lineHeight = attrs.lineHeight;
                    isLinked = editor.isActive('link');
                    isLeft = editor.isActive({ textAlign: 'left' });
                    isCenter = editor.isActive({ textAlign: 'center' });
                    isRight = editor.isActive({ textAlign: 'right' });
                    isJustify = editor.isActive({ textAlign: 'justify' });
                }
			},
		});

        element?.addEventListener('focusin', () => { isFocused = true; });

        element?.addEventListener('focusout', (event: FocusEvent) => {
            const relatedTarget = event.relatedTarget as HTMLElement;

            if (relatedTarget && (element?.contains(relatedTarget) || header?.contains(relatedTarget))) {
                return;
            }

            isFocused = false;
            if (isEmpty(editor)) {
                data[dataProp] = '';
            } else {
                let str = editor?.getHTML();
                
                str = convertBrToNewlines(str);
                data[dataProp] = str;
            }
        });

        return () => {
            if (editor) {
                if (isEmpty(editor)) {
                    data[dataProp] = '';
                } else {
                    if (!isRaw) {
                        let str = editor?.getHTML();
                    
                        str = convertBrToNewlines(str);
                        data[dataProp] = str;
                    }
                }
                editor.destroy();
            }
            if (element) {
                element.removeEventListener('focusin', () => {});
                element.removeEventListener('focusout', () => {});
            }
        }
	});

    $effect(() => {
        if (editor && !isRaw) {
            
            const str = convertNewlinesToBr(data[dataProp]);
            if (str !== editor.getHTML()) {
                editor.commands.setContent(str);
            }
        }
    })

    function removeNewlinesInsideList(html: string): string {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        doc.querySelectorAll('li').forEach((li) => {
            li.childNodes.forEach((node) => {
                if (node.nodeType === Node.TEXT_NODE && node.textContent) {
                    node.textContent = node.textContent.replace(/\n/g, '__KEEP_NEWLINE__');
                }
            });
        });
        
        doc.querySelectorAll('ul, ol').forEach((list) => {
            list.innerHTML = list.innerHTML.replace(/\n/g, '');

            const next = list.nextSibling;
            const parent = list.parentNode;

            if (next && parent && parent.lastChild === next) {
                if (next.nodeType === Node.TEXT_NODE && /^\s*$/.test(next.textContent || '')) {
                    next.remove();
                }

                if (next.nodeType === Node.ELEMENT_NODE) {
                    const el = next as HTMLElement;
                    if (el.tagName === 'P' && el.innerHTML.trim() === '') {
                        el.remove();
                    }
                }
            }
        });

        return doc.body.innerHTML;
    }

    function convertNewlinesToBr(str?: string) {
        if (!str) return '';
        let result = str;

        result = removeNewlinesInsideList(result);
        result = result.replace(/\n/g, '<br>');
        result = result.replace(/<p([^>]*)><br><\/p>/gi, '<p></p>');
        result = result.replace(/<\/p><br><p([^>]*)>/gi, '</p><p></p><p$1>');
        result = result.replace(/<\/p>(\s*<br\s*\/?>\s*)+(?=<p[^>]*>)/gi, (match) => {
            const count = (match.match(/<br\s*\/?>/gi) || []).length;
            return '</p>' + '<p></p>'.repeat(count);
        });
        result = result.replace(/ {2,}/g, spaces => spaces.split('').map(() => '&nbsp;').join(''));
        result = result.replace(/__KEEP_NEWLINE__/g, '<br>');

        return result;
    }

    function convertBrToNewlines(str?: string) {
        if (!str) return '';
        let result = str;

        result = result.replace(/<p[^>]*><\/p>/gi, '<br>');
        result = result.replace(/<br\s?>/gi, '\n');
        result = result.replace(/&nbsp;/g, ' ');

        return result;
    }

    function clickOutside(node: HTMLElement, params: Params): { destroy: () => void } {
        const { callback, exclude } = params;
        const handleClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!node.contains(target) && !exclude?.contains(target)) {
                callback();
            }
        };

        document.addEventListener('click', handleClick, true);

        return {
            destroy() {
                document.removeEventListener('click', handleClick, true);
            }
        };
    }

    function toggleBold() {
        if (editor) {
            editor.chain().focus().toggleBold().run();
        }
    }

    function toggleItalic() {
        if (editor) {
            editor.chain().focus().toggleItalic().run();
        }
    }

    function toggleUnderline() {
        if (editor) {
            editor.chain().focus().toggleUnderline().run();
        }
    }

    function toggleStrike() {
        if (editor) {
            editor.chain().focus().toggleStrike().run();
        }
    }

    function applyTextColor() {
        if (editor && isTextColor) {
            editor.chain().focus().setColor(textColor).run();
            isTextColor = false;
        }
    }

    function unsetTextColor() {
        if (editor && isTextColor) {
            (editor.chain() as any).focus().extendMarkRange('textStyle').clearColor().run();
            isTextColor = false;
        }
    }

    function applyBackgroundColor() {
        if (editor && isBackgroundColor) {
            editor.chain().focus().setBackgroundColor(backgroundColor).run();
            isBackgroundColor = false;
        }
    }

    function unsetBackgroundColor() {
        if (editor && isBackgroundColor) {
            (editor.chain() as any).focus().extendMarkRange('textStyle').clearBackgroundColor().run();
            isBackgroundColor = false;
        }
    }

    function toggleFontSize() {
        isFontSize = !isFontSize;
    }

    function setFontSize(size: string = '16px') {
        if (editor) {
            if (size === fontSize) {
                (editor.chain() as any).focus().extendMarkRange('textStyle').clearFontSize().run();
            } else {
                editor.chain().focus().setFontSize(size).run();
            }
            isFontSize = !isFontSize;
        }
    }

    function toggleTextColor() {
        if (editor) {
            textColor = rgbToHex(editor.getAttributes('textStyle').color) || textColor;
        }
        isTextColor = !isTextColor;
    }

    function toggleBackgroundColor() {
        if (editor) {
            backgroundColor = rgbToHex(editor.getAttributes('textStyle').backgroundColor) || backgroundColor;
        }
        isBackgroundColor = !isBackgroundColor;
    }

    function toggleRawHTML() {
        if (editor) {
            if (!isRaw) {
                if (isEmpty(editor)) {
                    data[dataProp] = '';
                } else {
                    let str = editor.getHTML();
                    
                    str = convertBrToNewlines(str)
                    data[dataProp] = str;
                }
                isFocused = false;
            } else {
                let str = data[dataProp];

                str = convertNewlinesToBr(data[dataProp]);
                editor.commands.setContent(str);
            }
        }
        isRaw = !isRaw;
    }

    function toggleLineHeight() {
        openLineHeight = !openLineHeight;
    }

    function setLineHeight(height: string = '1.0') {
        if (editor) {
            if (height === lineHeight) {
                (editor.chain() as any).focus().extendMarkRange('textStyle').clearLineHeight().run();
            } else {
                editor.chain().focus().toggleTextStyle({ lineHeight: height }).run();
            }
            openLineHeight = !openLineHeight;
        }
    }

    function toggleLink() {
        if (editor) {
            if (!openLink) {
                const prevLink = editor.getAttributes('link').href;
                if (prevLink) linkText = prevLink;
            } else {
                linkText = '';
            }
            openLink = !openLink;
        }
    }

    function applyLink() {
        if (editor) {
            if (linkText === '') {
                editor.chain().focus().extendMarkRange('link').unsetLink().run();
            } else {
                editor.chain().focus().extendMarkRange('link').setLink({ href: linkText }).run();
            }
            linkText = '';
            openLink = !openLink;
        }
    }

    function toggleAlignBox() {
        openAlign = !openAlign;
    }

    function toggleAlign(str: string) {
        if (editor) {
            (editor.chain() as any).focus().customToggleTextAlign(str).run();
            openAlign = !openAlign;
        }
    }
</script>