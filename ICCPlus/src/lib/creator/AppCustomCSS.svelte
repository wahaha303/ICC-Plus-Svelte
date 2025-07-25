<Dialog
    bind:open
    surface$style="width: 1200px; max-width: calc(100vw - 32px);"
    scrimClickAction=""
    escapeKeyAction=""
    onSMUIDialogClosed={onclose}
    style={dialogStyle}
>
    <Title class="dialog-title">
        <span class="title--text">Custom CSS</span>
        <FormField>
            <Checkbox bind:checked={isTransparent} />
            {#snippet label()}
                Preview Behind Dialog
            {/snippet}
        </FormField>
    </Title>
    <Content>
        <Textfield textarea bind:value={text} label="CSS" variant="filled" input$rows={20} input$use={[InitialFocus]} />
    </Content>
    <Actions>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-6 col-12">
                    <Button action="" onclickcapture={() => applyCustomCSS(text)}>
                        <Label class="dialog-actions--btn">Apply</Label>
                    </Button>
                </div>
                <div class="col-sm-6 col-12">
                    <Button action="accept">
                        <Label>Close</Label>
                    </Button>
                </div>
            </div>
        </div>
    </Actions>
</Dialog>
<script lang="ts">
    import Button, { Label } from '@smui/button';
    import Checkbox from '@smui/checkbox';
    import Dialog, { Title, Content, Actions, InitialFocus } from '@smui/dialog';
    import FormField from '@smui/form-field';
    import Textfield from '$lib/custom/textfield';
    import { onMount } from 'svelte';
    import { app, applyCustomCSS } from '$lib/store/store.svelte';

    let { open, onclose }: { open: boolean; onclose: () => void; } = $props();
    let text = $state('');
    let isTransparent = $state(false);
    let dialogStyle = $derived(isTransparent ? 'opacity: 0.2' : '');

    onMount(() => {
        if (typeof app.customCSS !== 'undefined') {
            text = app.customCSS;
        }
    });
    
</script>