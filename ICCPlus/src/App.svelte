<div id="bgm-player" style="display:none"></div>
{#if currentComponent.value === "appMain"}
    <Dialog
        bind:open
        escapeKeyAction=""
        scrimClickAction=""
        surface$style="width: 900px; max-width: calc(100vw - 32px);"
        style="text-align: center"
    >
        <Title class="d-flex d-column" tabindex={0} autofocus>
            <span class="main-title">Interactive CYOA Creator Plus</span>
            <span class="sub-title">Created by MeanDelay / Recreated by Wahaha303</span>
            <span class="sub-title--version">v{appVersion}</span>
            <span class="sub-title--date">Last Updated: {getDate('2025-07-14T16:00:00Z')}</span>
        </Title>
        <Content>
            <div class="row g-4">
                {#each menuComponentButtons as _undefined, i}
                    <div class="col-12 {i === 0 ? 'mt-0' : ''}">
                        <Button onclick={() => {currentComponent.value = menuComponentButtons[i].component; document.body.classList.remove('mdc-dialog-scroll-lock');}} variant="raised">
                            <Label>{menuComponentButtons[i].text}</Label>
                        </Button>
                    </div>
                {/each}
                <div class="col-12">
                    <Button href="https://github.com/wahaha303/ICCPlus/releases/latest" target="_blank">
                        <Label class="dialog-actions--btn">Download Viewer</Label>
                    </Button>
                </div>
                <div class="col-12">
                    <Button variant="raised" href="https://github.com/wahaha303/ICCPlus" target="_blank" class="m-1 w-auto">
                        <BtnIcon class="mdi mdi-github" />
                        <Label style="text-transform:none">View on GitHub</Label>
                    </Button>
                    <Button variant="raised" href="https://ko-fi.com/wahaha303" target="_blank" class="m-1 w-auto">
                        <BtnIcon class="mdi mdi-heart-box" />
                        <Label style="text-transform:none">Support me on Ko-fi</Label>
                    </Button>
                </div>
            </div>
        </Content>
    </Dialog>
{:else if currentComponent.value === 'appCyoaCreator'}
    <CreatorMain bCreatorMode={true} />
{:else if currentComponent.value === 'appCyoaViewer'}
    <ViewerMain />
{:else if currentComponent.value === 'appInformation'}
    <InfoMain />
{/if}
<Snackbar bind:this={snackbar} labelText={snackbarVariables.labelText} timeoutMs={snackbarVariables.timeoutMs}>
    <SnackbarLabel class="text-center" />
</Snackbar>

<script lang="ts">
    import Button, { Label, Icon as BtnIcon } from '@smui/button';
    import Dialog, { Title, Content} from '@smui/dialog';
    import CreatorMain from '$lib/creator/CreatorMain.svelte';
    import Snackbar, {Label as SnackbarLabel } from '@smui/snackbar';
    import ViewerMain from '$lib/viewer/ViewerMain.svelte';
    import InfoMain from '$lib/information/InfoMain.svelte';
    import { app, bgmPlayer, currentComponent, currentTheme, initStoreSaves, initBuildSaves, setShortcut, snackbarVariables, appVersion, getDate, isMediaSupport } from '$lib/store/store.svelte';
    import { onDestroy, onMount } from 'svelte';

    let open = $state(true);
    let snackbar: Snackbar;

    const menuComponentButtons = [
        { component: 'appCyoaCreator', text: 'Open Cyoa Creator (Alt + 1)'},
        { component: 'appCyoaViewer', text: 'Open Cyoa Viewer (Alt + 2)'},
        { component: 'appInformation', text: 'Help And Instructions (Alt + 3)'}
    ];

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

    onMount(() => {
        window.debugApp = app;
        autoModeWatcher();
        initStoreSaves();
        initBuildSaves();
        
        if (app.enableShortcut) {
            window.addEventListener('keydown', setShortcut);
        }

        onDestroy(() => {
            bgmPlayer.update(p => {
                p?.destroy();
                return null;
            });

            window.removeEventListener('keydown', setShortcut);
        });
    });

    $effect(() => {
        if(app.enableShortcut) {
            window.addEventListener('keydown', setShortcut);
        } else {
            window.removeEventListener('keydown', setShortcut);
        }
    });

    $effect(() => {
        if (snackbarVariables.isOpen) {
            snackbar.close();
            snackbar.open();
            snackbarVariables.isOpen = false;
        }
    });
</script>