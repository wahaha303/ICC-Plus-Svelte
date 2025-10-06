import { Node, Mark, Extension, type CommandProps } from '@tiptap/core'
import { sanitizeArg } from './store.svelte'
import { TextStyle } from '@tiptap/extension-text-style'
import { BulletList, ListItem, OrderedList } from '@tiptap/extension-list'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Image from '@tiptap/extension-image'
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Underline from '@tiptap/extension-underline'
import Code from '@tiptap/extension-code'


const BUILTIN_TAGS = new Set([
  'blockquote', 'pre', 'ul', 'ol', 'li', 'strong', 'em', 'strike', 'code', 'br', 'img', 'p', 'span'
])

const inlineTags = new Set([
  'a', 'abbr', 'b', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'dfn', 'em', 'i', 'kbd', 'mark', 'q', 's', 'samp', 'small', 'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr', 'font', 'img'
])

const leafTags = new Set([
  'img', 'br', 'hr', 'wbr', 'col'
])

const rubyTags = new Set([
  'ruby', 'rb', 'rp', 'rt', 'rtc'
])

function getAllAttributes(dom: HTMLElement): Record<string, string> {
  const attrs: Record<string, string> = {}
  for (let i = 0; i < dom.attributes.length; i++) {
    const attr = dom.attributes[i]
    if (attr) {
      attrs[attr.name] = attr.value
    }
  }
  return attrs
}

function createAllAttributesAttr() {
  return {
    default: {} as Record<string, string>,
    parseHTML: (el: HTMLElement) => {
      const attrs: Record<string, string> = {}
      for (const { name, value } of Array.from(el.attributes)) {
        attrs[name] = value
      }
      return attrs
    },
    renderHTML: (attrs: { all: Record<string, string> }) => {
      return { ...attrs.all }
    },
  }
}

function createGenericNode(tag: string): Extension {
  const isInline = inlineTags.has(tag)
  const isLeaf = leafTags.has(tag)
  const isRuby = rubyTags.has(tag)

  return Node.create({
    name: tag,
    group: isInline || isRuby ? 'inline' : 'block',
    content: isLeaf ? '' : (isInline && !isRuby ? 'text*' : 'inline*'),
    inline: isInline || isRuby,
    atom: isLeaf,
    selectable: true,
    draggable: isLeaf,

    parseHTML() {
      return [{
        tag,
        getAttrs: (dom: HTMLElement) => getAllAttributes(dom),
      }]
    },

    renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, string> }) {
      return isLeaf
        ? [tag, HTMLAttributes]
        : [tag, HTMLAttributes, 0]
    },

    addAttributes() {
      return {
        all: createAllAttributesAttr(),
      }
    },
  }) as Extension
}

function createGenericMark(tag: string): Extension {
  const markName = tag

  return Mark.create({
    name: markName,
    inclusive: false,

    parseHTML() {
      return [{
        tag,
        getAttrs: (dom: HTMLElement) => getAllAttributes(dom),
      }]
    },

    renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, any> }) {
      return [tag, HTMLAttributes, 0]
    },

    addAttributes() {
      return {
        all: createAllAttributesAttr(),
      }
    },
  }) as Extension
}

export const SanitizeExtensions: Extension[] =
  sanitizeArg.ALLOWED_TAGS
    .filter(tag => !BUILTIN_TAGS.has(tag))
    .map(tag =>
      inlineTags.has(tag)
        ? createGenericMark(tag)
        : createGenericNode(tag)
    )

export const CustomParagraph = Paragraph.extend({
  parseHTML() {
    return [
      {
        tag: 'p',
        getAttrs: () => ({}),
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['p', HTMLAttributes, 0]
  },

  addAttributes() {
    return {
      all: createAllAttributesAttr(),
    }
  },

  addCommands() {
    return {
      ...this.parent?.(),
      customToggleTextAlign: (str: string) => ({ chain }: CommandProps) => {
        const editor = this.editor
        if (!editor) return false

        const attrs = editor.getAttributes('paragraph') || {}
        const updated = { ...attrs.all }

        if (!updated || !updated.style || !updated.style.trim()) {
          return chain().toggleTextAlign(str).run()
        }

        const currentAlign = attrs.textAlign

        if (currentAlign === str) {
          updated.style = updated.style.replace(/(^|;)\s*text-align\s*:\s*[^;]+;?/i, '')
          if (!updated.style || !updated.style.trim()) delete updated.style
          
          return chain().updateAttributes('paragraph', { all: updated, textAlign: null }).run()
        } else {
          if (/text-align\s*:/i.test(updated.style)) {
            updated.style = updated.style.replace(/(^|;)\s*text-align\s*:\s*[^;]+;?/i, `text-align: ${str}`)
          } else {
            updated.style = `${updated.style}${updated.style.endsWith(';') || !updated.style ? '' : ';'}text-align: ${str};`
          }
          updated.style = updated.style.trim()
          return chain().updateAttributes('paragraph', { all: updated, textAlign: str }).run()
        }
      },
    }
  }
})

function createCustomExtension(Ext : any) {
  return Ext.extend({
    addAttributes() {
      return {
        all: createAllAttributesAttr(),
      }
    },
  })
}

export const CustomImage = Image.extend({
  addAttributes() {
    return {
      all: createAllAttributesAttr(),
      textAlign: {
        default: null,
        parseHTML: el => el.style.textAlign || null,
        renderHTML: attrs => attrs.textAlign ? { style: `text-align: ${attrs.textAlign}` } : {},
      }
    }
  },
})

export const CustomTextStyle = TextStyle.extend({
  addAttributes() {
    return {
      all: createAllAttributesAttr(),
      color: {
        default: null,
        parseHTML: el => el.style.color || null,
        renderHTML: attrs => attrs.color ? { style: `color: ${attrs.color}` } : {},
      },
      backgroundColor: {
        default: null,
        parseHTML: el => el.style.backgroundColor || null,
        renderHTML: attrs => attrs.backgroundColor ? { style: `background-color: ${attrs.backgroundColor}` } : {},
      },
      fontSize: {
        parseHTML: el => el.style.fontSize || null,
        renderHTML: attrs => attrs.fontSize ? { style: `font-size: ${attrs.fontSize}` } : {},
      },
      lineHeight: {
        parseHTML: el => el.style.lineHeight || null,
        renderHTML: attrs => attrs.lineHeight ? { style: `line-height: ${attrs.lineHeight}` } : {},
      },
    }
  },

  addCommands() {
    return {
      ...this.parent?.(),
      clearColor: () => ({ chain }: CommandProps) => {
        const editor = this.editor
        if (!editor) return false

        const attrs = editor.getAttributes('textStyle') || {}
        const updated = { ...attrs.all }

        if (!updated || !updated.style || !updated.style.trim()) {
          return chain().unsetColor().run()
        }
        
        updated.style = updated.style.replace(/(^|;)\s*color\s*:\s*[^;]+;?/i, '');
        if (!updated.style) delete updated.style;

        return chain().updateAttributes(this.name, { all: updated, color: null }).run()
      },
      clearBackgroundColor: () => ({ chain }: CommandProps) => {
        const editor = this.editor
        if (!editor) return false

        const attrs = editor.getAttributes('textStyle') || {}
        const updated = { ...attrs.all }

        if (!updated || !updated.style || !updated.style.trim()) {
          return chain().unsetBackgroundColor().run()
        }

        updated.style = updated.style.replace(/(^|;)\s*background-color\s*:\s*[^;]+;?/i, '');
        if (!updated.style) delete updated.style;

        return chain().updateAttributes(this.name, { all: updated, backgroundColor: null }).run()
      },
      clearFontSize: () => ({ chain }: CommandProps) => {
        const editor = this.editor
        if (!editor) return false

        const attrs = editor.getAttributes('textStyle') || {}
        const updated = { ...attrs.all }

        if (!updated || !updated.style || !updated.style.trim()) {
          return chain().unsetFontSize().run()
        }

        updated.style = updated.style.replace(/(^|;)\s*font-size\s*:\s*[^;]+;?/i, '');
        if (!updated.style) delete updated.style;

        return chain().updateAttributes(this.name, { all: updated, fontSize: null }).run()
      },
      clearLineHeight: () => ({ chain }: CommandProps) => {
        const editor = this.editor
        if (!editor) return false

        const attrs = editor.getAttributes('textStyle') || {}
        const updated = { ...attrs.all }

        if (!updated || !updated.style || !updated.style.trim()) {
          return chain().unsetLineHeight().run()
        }

        updated.style = updated.style.replace(/(^|;)\s*line-height\s*:\s*[^;]+;?/i, '');
        if (!updated.style) delete updated.style;

        return chain().updateAttributes(this.name, { all: updated, lineHeight: null }).run()
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span',
        getAttrs: node => {
          if (!(node instanceof HTMLElement)) return false

          const hasClass = node.getAttribute('class')
          const hasStyle = node.getAttribute('style')

          if (hasClass || hasStyle) {
            return {}
          }

          return false
        },
      },
    ]
  }
})

export const CustomHeading = createCustomExtension(Heading)

export const CustomBulletList = createCustomExtension(BulletList)

export const CustomOrderList = createCustomExtension(OrderedList)

export const CustomListItem = createCustomExtension(ListItem)

export const CustomStrong = createCustomExtension(Bold)

export const CustomItalic = createCustomExtension(Italic)

export const CustomStrike = createCustomExtension(Strike)

export const CustomUnderline = createCustomExtension(Underline)

export const CustomCode = createCustomExtension(Code)