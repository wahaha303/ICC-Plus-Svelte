<div id="bgm-player" style="display:none"></div>
<ViewerMain />
<Snackbar bind:this={snackbar} labelText={snackbarVariables.labelText} timeoutMs={snackbarVariables.timeoutMs}>
    <SnackbarLabel class="text-center" />
</Snackbar>

<script lang="ts">
    import Snackbar, {Label as SnackbarLabel } from '@smui/snackbar';
    import ViewerMain from '$lib/viewer/ViewerMain.svelte';
    import { app, AppSchema, bgmPlayer, currentTheme, externalImages, hasAvif, initBuildSaves, initializeApp, removeNulls, snackbarVariables, isMediaSupport } from '$lib/store/store.svelte';
    import { onDestroy, onMount } from 'svelte';

    const loadingMessage = $state('Loading');
	const progressText = $state('');
	const showIndicator = $state(true);
    let boxEl: HTMLElement | null;
    let indicatorEl: HTMLElement | null;
    let sizeEl: HTMLElement | null;
    let defaultText: string = '<div>Loading</div>';    
    let snackbar: Snackbar;

    $effect(() => {
        if (snackbarVariables.isOpen) {
            snackbar.close();
            snackbar.open();
            snackbarVariables.isOpen = false;
        }
    });

    function autoModeWatcher() {
		let t = localStorage.getItem('theme') as string;
        let themeDarkLink: HTMLLinkElement | null = document.head.querySelector('#theme-dark');
        let themeLightLink: HTMLLinkElement | null = document.head.querySelector('#theme-light');
        let isSupport = isMediaSupport();

		if (t === 'dark') {
            if (isSupport) {
                if (themeDarkLink) {
                    themeDarkLink.media = 'screen and (prefers-color-scheme: light)';
                }
                if (themeLightLink) {
                    themeLightLink.media = 'screen and (prefers-color-scheme: dark)';
                }
                currentTheme.value = 'dark';
            } else {
                if (themeDarkLink) {
                    themeDarkLink.media = 'all';
                }

                if (themeLightLink) {
                    themeLightLink.media = 'not all';
                }
            }
		} else if (!isSupport) {
            if (themeLightLink) {
                themeLightLink.media = 'all';
            }
            if (themeDarkLink) {
                themeDarkLink.media = 'not all';
            }
        }
	}

    async function loadImagesSequentially(images: Set<string>) {
        const urls = Array.from(images);

        for (let i = 0; i < urls.length; i++) {
            const url = urls[i];

            try {
                await new Promise((resolve, reject) => {
                    const img = new Image();
                    
                    img.onload = resolve;
                    img.onerror = reject;
                    img.src = url;
                });
            } catch (error) {
                console.error(error);
            } finally {
                if (indicatorEl) indicatorEl.innerHTML = `<div>Images</div><div>${i} / ${urls.length}</div>`;
            }
        }
    }

    async function checkAvifSupport() {
        if (hasAvif.value) {
            const errorMsg = 'Your browser does not support the .avif format.\n Avif images may not be displayed.';

            try {
                await new Promise((resolve, reject) => {
                    const img = new Image();

                    img.onload = resolve;
                    img.onerror = reject
                    img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
                });
            } catch (error) {
                console.error(error);
                snackbarVariables.labelText = errorMsg;
                snackbarVariables.isOpen = true;
            }
        }
    }

    async function loadProject() {
        boxEl = document.getElementById('lm');
		sizeEl = document.getElementById('projectSize');
        indicatorEl = document.getElementById('indicator');
        const totalSize = sizeEl ? parseInt(sizeEl.innerHTML) : 0;
        const indType = indicatorEl ? indicatorEl.className : '';

        if (indicatorEl) {
            defaultText = indicatorEl.innerHTML;
        }

        if (boxEl) {
            boxEl.style.pointerEvents = 'none';
        }
        
        if (typeof window.fetch === 'function') {
            try {
                const response = await fetch('project.json');
                if (response && response.body) {
                    const reader = response.body.getReader();
                    const decoder = new TextDecoder();
                    let receivedLength = 0;
                    let data = '';

                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;
                        receivedLength += value.length;
                        data += decoder.decode(value, { stream: true });

                        if (indicatorEl) {
                            if (indType === 'ind2' && totalSize > 0) {
                                indicatorEl.innerHTML = `${defaultText}<div>${(receivedLength / totalSize * 100).toFixed(1)} %</div>`;
                            } else if (indType === 'ind3' && totalSize > 0) {
                                indicatorEl.innerHTML = `${defaultText}<div>${(receivedLength / 1e6).toFixed(1)}/${(totalSize / 1e6).toFixed(1)} MB</div>`
                            } else {
                                indicatorEl.innerHTML = `${defaultText}<div>${(receivedLength / 1e6).toFixed(1)} MB</div>`;
                            }
                        }
                    }

                    if (boxEl) {
                        boxEl.style.height = '0';
                    }
                    const json = JSON.parse(data);
                    const cleanedData = removeNulls(json);
                    const parsed = AppSchema.safeParse(cleanedData);
                    
                    if (parsed.success) {
                        initializeApp(parsed.data);
                        if (app.preloadExternalImages && externalImages.size > 0) {
                            await loadImagesSequentially(externalImages);
                        }
                        setTimeout(() => {
                            const styleEl = document.createElement('style');
                            document.head.appendChild(styleEl);
                            setTimeout(() => {
                                if (boxEl) {
                                    boxEl.style.height = '';
                                    boxEl.style.opacity = '1';
                                    boxEl.style.pointerEvents = '';
                                }
                                if (indicatorEl) indicatorEl.remove();
                                if (sizeEl) sizeEl.remove();
                                if (styleEl.sheet) styleEl.sheet.insertRule("body::before{opacity:0;transition:opacity 2s}", 0);
                            }, 1000);
                        }, 1000);
                        await checkAvifSupport();
                    } else {
                        snackbarVariables.labelText = 'Failed to load data.';
                        snackbarVariables.isOpen = true;
                        console.error(parsed.error);
                    }
                }
            } catch (error) {
                console.error(error);
                if (boxEl) {
                    boxEl.style.height = '0';
                }
                const json = JSON.parse(JSON.stringify(app));
                initializeApp(json);
                if (app.preloadExternalImages && externalImages.size > 0) {
                    await loadImagesSequentially(externalImages);
                }
                setTimeout(() => {
                    const styleEl = document.createElement('style');
                    document.head.appendChild(styleEl);
                    setTimeout(() => {
                        if (boxEl) {
                            boxEl.style.height = '';
                            boxEl.style.opacity = '1';
                            boxEl.style.pointerEvents = '';
                        }
                        if (indicatorEl) indicatorEl.remove();
                        if (sizeEl) sizeEl.remove();
                        if (styleEl.sheet) styleEl.sheet.insertRule("body::before{opacity:0;transition:opacity 2s}", 0);
                    }, 1000);
                }, 1000);
                await checkAvifSupport();
            }
        } else {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'project.json', true);

			xhr.onprogress = (e) => {
                if (indicatorEl) {
                    if (indType === 'ind2' && totalSize > 0) {
                        indicatorEl.innerHTML = `${defaultText}<div>${(e.loaded / totalSize * 100).toFixed(1)} %</div>`;
                    } else if (indType === 'ind3' && totalSize > 0) {
                        indicatorEl.innerHTML = `${defaultText}<div>${(e.loaded / 1e6).toFixed(1)}/${(totalSize / 1e6).toFixed(1)} MB</div>`;
                    } else {
                        indicatorEl.innerHTML = `${defaultText}<div>${(e.loaded / 1e6).toFixed(1)} MB</div>`;
                    }
                }
			};

			xhr.onload = async () => {
                if (boxEl) {
                    boxEl.style.height = '0';
                }
				if (xhr.status === 200) {
					const json = JSON.parse(xhr.responseText);
					initializeApp(json);

					if (app.preloadExternalImages && app.externalImages.size > 0) {
						await loadImagesSequentially(app.externalImages);
					}
				} else {
                    const json = JSON.parse(JSON.stringify(app));
					initializeApp(json);
				}
				setTimeout(() => {
                    const styleEl = document.createElement('style');
                    document.head.appendChild(styleEl);
                    setTimeout(() => {
                        if (boxEl) {
                            boxEl.style.height = '';
                            boxEl.style.opacity = '1';
                            boxEl.style.pointerEvents = '';
                        }
                        if (indicatorEl) indicatorEl.remove();
                        if (sizeEl) sizeEl.remove();
                        if (styleEl.sheet) styleEl.sheet.insertRule("body::before{opacity:0;transition:opacity 2s}", 0);
                    }, 1000);
                }, 1000);
                await checkAvifSupport();
			};

			xhr.send();
        }
    }

    onMount(() => {
        window.debugApp = app;
        autoModeWatcher();
        initBuildSaves();
        loadProject();
        
        onDestroy(() => {
            bgmPlayer.update(p => {
                p?.destroy();
                return null;
            });
        });
    });
</script>