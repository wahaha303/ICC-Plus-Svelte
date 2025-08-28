import { Node, Mark, Extension } from '@tiptap/core'
import { sanitizeArg } from './store.svelte'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Image from '@tiptap/extension-image'

const BUILTIN_TAGS = new Set([
  'blockquote', 'pre', 'ul', 'ol', 'li', 'strong', 'em', 'strike', 'code', 'br', 'img'
])

const inlineTags = new Set([
  'a', 'abbr', 'b', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'dfn', 'em', 'i', 'kbd', 'mark', 'q', 'rb', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'small', 'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr', 'font', 'img', 'span'
])

const leafTags = new Set([
  'img', 'iframe', 'br', 'hr', 'wbr', 'col', 'colgroup'
])

const allowedAttrs = ['class', 'style', 'id', 'src', 'href', 'target', 'width', 'height', 'alt', 'title', 'color', 'face', 'span', 'value', 'reversed', 'start', 'type', 'download', 'rel', 'type', 'border', 'cellpadding', 'cellspacing', 'colspan', 'rowspan', 'headers', 'scope', 'abbr', 'size', 'name', 'lazy', 'allow', 'allowfullscreen', 'crossorigin'];

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

function createDynamicAttributes(attrs: string[]) {
  const result: Record<string, any> = {}
  for (const attr of attrs) {
    result[attr] = { default: null }
  }
  return result
}

function createGenericNode(tag: string): Extension {
  const isInline = inlineTags.has(tag)
  const isLeaf = leafTags.has(tag)

  return Node.create({
    name: tag === 'p' ? 'paragraph' : tag,
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
      return createDynamicAttributes(allowedAttrs)
    },
  }) as Extension
}

function createGenericMark(tag: string): Extension {
  const markName = tag === 'span' ? 'spanStyle' : tag

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
      return createDynamicAttributes(allowedAttrs)
    },
  }) as Extension
}

export const SanitizeExtensions: Extension[] =
  sanitizeArg.ALLOWED_TAGS
    .filter(tag => !BUILTIN_TAGS.has(tag))
    .map(tag =>
      inlineTags.has(tag) || tag === 'span'
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
})

export const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: { default: null },
      height: { default: null },
      class: { default: null },
      style: { default: null },
    }
  },
})

export const CustomHeading = Heading.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: { default: null },
      style: { default: null },
      id: { default: null },
    }
  },
})