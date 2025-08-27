import { mount } from 'svelte'
import 'ress'
import './app.css'
import App from './App.svelte'
import 'core-js/features/string/replace-all'
import ResizeObserver from 'resize-observer-polyfill';

if (typeof window.ResizeObserver === 'undefined') {
  window.ResizeObserver = ResizeObserver;
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
