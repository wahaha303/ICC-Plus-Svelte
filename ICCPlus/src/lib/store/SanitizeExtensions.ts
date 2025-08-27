import { Node, Mark, Extension } from '@tiptap/core'
import { sanitizeArg } from './store.svelte'

const BUILTIN_TAGS = new Set([
  'p', 'blockquote', 'pre', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'strike', 'code', 'br' 
])

const inlineTags = new Set([
  'a', 'abbr', 'b', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'dfn', 'em', 'i', 'kbd', 'mark', 'q', 'rb', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'small', 'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr', 'font', 'img', 'span'
])

const leafTags = new Set([
  'img','iframe','br','hr','wbr','col','colgroup'
])

const allowedAttrs = ['class', 'style', 'id', 'src', 'href', 'target', 'width', 'height', 'alt', 'title', 'color', 'face', 'span', 'value', 'reversed', 'start', 'type', 'download', 'rel', 'type', 'border', 'cellpadding', 'cellspacing', 'colspan', 'rowspan', 'headers', 'scope', 'abbr', 'size', 'name', 'lazy', 'allow', 'allowfullscreen'];

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
    name: tag,
    group: isInline ? 'inline' : 'block',
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

// Mark
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