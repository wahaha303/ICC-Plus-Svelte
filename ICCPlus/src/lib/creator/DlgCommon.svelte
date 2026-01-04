<Dialog
    bind:open
    surface$style="width: 400px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={beforeClose}
>
    <Title class="px-3 pb-0 toolbar toolbar__dialog">
        {@html title}
    </Title>
    <Content>
        <div class="row pt-4">
            <div class="col-12">
                {@html context}
            </div>
            {#if isWord}
                <div class="col-12">
                    {#if defaultRow === 1}
                        <Textfield bind:value={wordText} label={textLabel} variant="filled" />
                    {:else}
                        <Textfield textarea bind:value={wordText} label={textLabel} variant="filled" input$rows={defaultRow} />
                    {/if}
                </div>
            {/if}
        </div>
    </Content>
    <Actions>
        <div class="container-fluid">
            <div class="row">
                {#if isDeselect}
                    <div class="col-12">
                        <Button action="deselect">
                            <Label>Deselect</Label>
                        </Button>
                    </div>
                {/if}
                <div class="col-6">
                    <Button action="close">
                        <Label>Cancel</Label>
                    </Button>
                </div>
                <div class="col-6">
                    <Button action="accept">
                        <Label class="dialog-actions--btn">OK</Label>
                    </Button>
                </div>
            </div>
        </div>
    </Actions>
</Dialog>
<script lang="ts">
    import Button, { Label } from '@smui/button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Textfield from '$lib/custom/textfield';

    let { open, onclose, title = '', context, closeHandler, isWord, prevText, defaultRow = 5, textLabel = '', isDeselect }: { open: boolean; onclose: () => void, title?: string, context: string, closeHandler(e: CustomEvent<{ action: string }>, wordText?: string): void, isWord?: boolean, prevText?: string, defaultRow?: number, textLabel?: string, isDeselect?: boolean } = $props();
    let wordText = $state(isWord && prevText ? prevText : '');

    function beforeClose(e: CustomEvent<{ action: string }>) {
        if (isWord) {
            closeHandler(e, wordText);
        } else {
            closeHandler(e);
        }
        onclose()
    }
    
</script>