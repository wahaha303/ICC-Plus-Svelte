<Dialog
    bind:open={() => open, (e) => !e && onclose()}
    surface$style="width: 400px; max-width: calc(100vw - 32px);"
>
    <Title class="px-3 pb-0 toolbar toolbar__dialog">
        Counter
    </Title>
    <Content>
        <div class="row pt-4">
            <div class="col-12">
                <Textfield bind:value={changeNum} label="Number of Count" variant="filled" type="number" onchange={() => {
                    changeNum = Math.min(Math.max(changeNum, minVal), maxVal);
                }} input$min={minVal} input$max={maxVal} />
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
                    <Button defaultAction onclickcapture={() => submit(Math.min(Math.max(changeNum, minVal), maxVal))}>
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

    let { open, onclose, submit, changeNum, minVal = 0, maxVal = 0 }: { open: boolean, onclose: () => void, submit: (e: number) => void, changeNum: number, minVal?: number, maxVal?: number } = $props();
    
</script>