<Dialog
    bind:open
    surface$style="width: 1920px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
>
    <Title class="px-3 pb-0 toolbar toolbar__dialog" tabindex={0} autofocus>
        Build Form
    </Title>
    <Content>
        <div class="row">
            <div class="col-12 mt-4 mb-2">
                <FormField>
                    <Switch bind:checked={seperateChoices} color="secondary" class="switch-scale" />
                    {#snippet label()}
                        Separate Choice Titles by Row
                    {/snippet}
                </FormField>
            </div>
            <div class="col-sm-6 col-12 mb-4">
                <Textfield textarea bind:this={choiceTitles} value={getSelectedObjectName()} label="Current Activated Choices Titles" variant="filled" input$rows={5} />
            </div>
            <div class="col-sm-6 col-12 mb-4">
                <Textfield textarea bind:this={choiceIds} value={getSelectedObjectId()} label="Current Activated Choices ID's" variant="filled" input$rows={5} />
            </div>
            <div class="col-12">
                <Textfield textarea bind:value={idList} label="Area To Import Activated Choices With Lists Of Id's" variant="filled" input$rows={5} />
                <Button onclickcapture={() => loadActivated(idList)} variant="raised" >
                    <Label>Import Choices/Clean if empty</Label>
                </Button>
            </div>
        </div>
    </Content>
    <Actions>
        <Button action="close">
            <Label class="dialog-actions--btn">Cancel</Label>
        </Button>
    </Actions>
</Dialog>
<script lang="ts">
    import Button, { Label } from '@smui/button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import FormField from '@smui/form-field';
    import Switch from '@smui/switch';
    import Textfield from '$lib/custom/textfield';
	import { activatedMap, choiceMap, getSelectedObjectId, loadActivated } from '$lib/store/store.svelte';

    let { open, onclose }: { open: boolean; onclose: () => void } = $props();
    let choiceTitles = $state<any>();
    let choiceIds = $state<any>();
    let idList = $state('');
    let seperateChoices = $state(false);

    function getSelectedObjectName() {
        let result: string[] = [];
        let idArray = Array.from(activatedMap.keys());

        idArray.sort((a, b) => {
            let aMap = choiceMap.get(a);
            let bMap = choiceMap.get(b);

            if (typeof aMap !== 'undefined' && typeof bMap !== 'undefined') {
                if (aMap.row.index !== bMap.row.index) return aMap.row.index - bMap.row.index;
                return aMap.choice.index - bMap.choice.index;
            }

            return 0;
        });

        if (seperateChoices) {
            let prevRowId = '';

            for (let i = 0; i < idArray.length; i++) {
                let cMap = choiceMap.get(idArray[i]);

                if (typeof cMap !== 'undefined') {
                    const row = cMap.row;
                    const choice = cMap.choice;

                    if (row.id !== prevRowId) {
                        if (prevRowId !== '') result.push('\n');
                        result.push(`**${row.title}**\n`);
                        result.push(`${choice.title}`);
                        prevRowId = row.id;
                    } else {
                        result.push(`, ${choice.title}`);
                    }
                }
            }

            return result.join('');
        } else {
            for (let i = 0; i < idArray.length; i++) {
                let cMap = choiceMap.get(idArray[i]);

                if (typeof cMap !== 'undefined') {
                    result.push(cMap.choice.title);
                }
            }

            return result.join(', ');
        }
    }    
</script>