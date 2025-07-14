import { mount } from 'svelte'
import 'ress'
import './app.css'
import App from './App.svelte'
import 'core-js/features/string/replace-all'
import ResizeObserver from 'resize-observer-polyfill';

if (typeof window.ResizeObserver === 'undefined') {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
}

(function(arr){
  arr.forEach(function(proto){
    if (!proto.hasOwnProperty('append')) {
      Object.defineProperty(proto, 'append', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function append() {
          var argArr = Array.prototype.slice.call(arguments),
              docFrag = document.createDocumentFragment();
          argArr.forEach(function(argItem){
            docFrag.appendChild(
              argItem instanceof Node ? argItem : document.createTextNode(String(argItem))
            );
          });
          this.appendChild(docFrag);
        }
      });
    }
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

(function(arr) {
  arr.forEach(function(proto) {
    if (!proto.hasOwnProperty('before')) {
      Object.defineProperty(proto, 'before', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function before() {
          var argArr = Array.prototype.slice.call(arguments),
              docFrag = document.createDocumentFragment();
          argArr.forEach(function(argItem) {
            docFrag.appendChild(
              argItem instanceof Node ? argItem : document.createTextNode(String(argItem))
            );
          });
          this.parentNode.insertBefore(docFrag, this);
        }
      });
    }
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

if (typeof queueMicrotask !== 'function') {
  window.queueMicrotask = function (callback) {
    Promise.resolve()
      .then(callback)
      .catch(e => setTimeout(() => { throw e; }, 0))
  }
}

const beforeunloadHandler = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '';
};

if (window.addEventListener) {
  window.addEventListener('beforeunload', beforeunloadHandler);
} else {
  window.onbeforeunload = beforeunloadHandler;
}

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
