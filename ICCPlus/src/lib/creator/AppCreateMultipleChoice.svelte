<Dialog
    bind:open={() => open, (e) => !e && onclose()}
    surface$style="width: 400px; max-width: calc(100vw - 32px);"
>
    <Title>
        Create New Choices
    </Title>
    <Content>
        <div class="row pt-4">
            <div class="col-12">
                <Textfield bind:value={num} label="Number of Choices" variant="filled" type="number" input$min={1} />
            </div>
        </div>
    </Content>
    <Actions>
        <div class="container-fluid">
            <div class="row">
                <div class="col-6">
                    <Button>
                        <Label>Cancel</Label>
                    </Button>
                </div>
                <div class="col-6">
                    <Button defaultAction onclickcapture={() => submit(num)}>
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

    const { open, onclose, submit }: { open: boolean; onclose: () => void; submit: (e: number) => void } = $props();
    let num = $state(1);
    
</script>