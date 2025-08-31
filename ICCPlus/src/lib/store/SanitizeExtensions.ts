import { Node, Mark, Extension } from '@tiptap/core'
import { sanitizeArg } from './store.svelte'
import { TextStyle } from '@tiptap/extension-text-style'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Image from '@tiptap/extension-image'

const BUILTIN_TAGS = new Set([
  'blockquote', 'pre', 'ul', 'ol', 'li', 'strong', 'em', 'strike', 'code', 'br', 'img', 'p', 'span'
])

const inlineTags = new Set([
  'a', 'abbr', 'b', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'dfn', 'em', 'i', 'kbd', 'mark', 'q', 'rb', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'small', 'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr', 'font', 'img'
])

const leafTags = new Set([
  'img', 'iframe', 'br', 'hr', 'wbr', 'col', 'colgroup'
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

  return Node.create({
    name: tag,
    group: isInline ? 'inline' : 'block',
    content: isInline ? 'text*' : 'inline*',
    inline: isInline,
    atom: isLeaf,
    selectable: true,
    draggable: isLeaf,
    ...(isLeaf ? {} : { content: isInline ? 'text*' : 'inline*' }),

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
})

export const CustomImage = Image.extend({
  addAttributes() {
    return {
      all: createAllAttributesAttr(),
    }
  },
})

export const CustomHeading = Heading.extend({
  addAttributes() {
    return {
      all: createAllAttributesAttr(),
    }
  },
})

export const CustomTextStyle = TextStyle.extend({
  addAttributes() {
    return {
      all: createAllAttributesAttr(),
    }
  },
})