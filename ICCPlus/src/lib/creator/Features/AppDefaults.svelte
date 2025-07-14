<Dialog
    bind:open
    surface$style="width: 1300px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
>
    <Title class="dialog-title" tabindex={0} autofocus>
        Project Defaults
    </Title>
    <Content>
        <div class="container-fluid pb-4">
            <div class="row">
                <div class="col-md-4 col-12">
                    <div class="col-12 mt-4">Row</div>
                    <Textfield bind:value={app.defaultRowTitle} label="Row Title" variant="filled" />
                    <Textfield bind:value={app.defaultRowText} label="Row Text" variant="filled" />
                    <div class="col-12 mt-4">Choice</div>
                    <Textfield bind:value={app.defaultChoiceTitle} label="Choice Title" variant="filled" />
                    <Textfield bind:value={app.defaultChoiceText} label="Choice Text" variant="filled" />
                    <div class="col-12 mt-4">Addon</div>
                    <Textfield bind:value={app.defaultAddonTitle} label="Addon Title" variant="filled" />
                    <Textfield bind:value={app.defaultAddonText} label="Addon Text" variant="filled" />
                </div>
                <div class="col-md-4 col-12">
                    <div class="col-12 mt-4">Requirement</div>
                    <Textfield bind:value={app.defaultBeforeReq} label="Before Required Text" variant="filled" />
                    <Textfield bind:value={app.defaultAfterReq} label="After Required Text" variant="filled" />
                    <div class="col-12 mt-4">Or Requirement</div>
                    <Select bind:value={app.orderOrReqText} label="Order of Text" variant="filled">
                        {#each orderOrReq as order (order.text)}
                            <Option value={order.value}>{order.text}</Option>
                        {/each}
                    </Select>
                    <Textfield bind:value={app.defaultOrReq} label="Or Requirement Text" variant="filled" />
                    <div class="col-12 mt-4">Selected From Requirement</div>
                    <Select bind:value={app.orderSelReqText} label="Order of Text" variant="filled">
                        {#each orderSelReq as order (order.text)}
                            <Option value={order.value}>{order.text}</Option>
                        {/each}
                    </Select>
                    <Textfield bind:value={app.defaultSelReq} label="Selected From Requirement Text" variant="filled" />
                </div>
                <div class="col-md-4 col-12">
                    <div class="col-12 mt-4">Points</div>
                    <Textfield bind:value={app.defaultBeforePoint} label="Before Points Text" variant="filled" />
                    <Textfield bind:value={app.defaultAfterPoint} label="After Points Text" variant="filled" />
                    <div class="col-12 mt-5">
                        Clicking this will change the id of all of the choices and rows where the title is longer than 2 letters, or the default title, into the title, which can make it easier to manage on larger projects with large amounts of requirements being used. Spaces will be replaced with underscores(_).
                    </div>
                    <Button onclick={idToTitle} variant="raised">
                        <Label>Change Ids to titles</Label>
                    </Button>
                </div>
            </div>
        </div>
    </Content>
    <Actions>
        <Button action="close">
            <Label class="dialog-actions--btn">Close</Label>
        </Button>
    </Actions>
</Dialog>
<script lang="ts">
    import Button, { Label } from '@smui/button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Textfield from '$lib/custom/textfield/Textfield.svelte';
    import Select, { Option } from '$lib/custom/select';
	import { app, checkDupId, rowMap, choiceMap } from '$lib/store/store.svelte';
    
    let { open, onclose }: { open: boolean; onclose: () => void } = $props();
    const orderOrReq = [{
        text: 'X of Y',
        value: '0'
    }, {
        text: 'Y of X',
        value: '1'
    }];
    const orderSelReq = [{
        text: 'X from Y',
        value: '0'
    }, {
        text: 'Y from X',
        value: '1'
    }];

    function idToTitle() {
        for (let i = 0; i < app.rows.length; i++) {
            let appRow = app.rows[i];
            if (appRow.id.length > 2 && appRow.title !== app.defaultRowTitle) {
                let rowTitle = appRow.title.replace(/ /g, '_');
                let id = checkDupId(rowTitle, rowMap);
                let data = rowMap.get(appRow.id);
                if (typeof data !== 'undefined') {
                    rowMap.set(id, data);
                    rowMap.delete(appRow.id);
                    appRow.id = id;
                }
            }
            for (let j = 0; j < appRow.objects.length; j++) {
                let appChoice = appRow.objects[j];
                if (appChoice.id.length > 2 && appChoice.title !== app.defaultChoiceTitle) {
                    let choiceTitle = appChoice.title.replace(/ /g, '_');
                    let id = checkDupId(choiceTitle, choiceMap);
                    let data = choiceMap.get(appChoice.id);
                    if (typeof data !== 'undefined') {
                        choiceMap.set(id, data);
                        choiceMap.delete(appChoice.id);
                        appChoice.id = id;
                    }
                }
            }
        }
        for (let i = 0; i < app.backpack.length; i++) {
            let appRow = app.backpack[i];
            if (appRow.id.length > 2 && appRow.title !== app.defaultRowTitle) {
                let rowTitle = appRow.title.replace(/ /g, '_');
                let id = checkDupId(rowTitle, rowMap);
                let data = rowMap.get(appRow.id);
                if (typeof data !== 'undefined') {
                    rowMap.set(id, data);
                    rowMap.delete(appRow.id);
                    appRow.id = id;
                }
            }
            for (let j = 0; j < appRow.objects.length; j++) {
                let appChoice = appRow.objects[j];
                if (appChoice.id.length > 2 && appChoice.title !== app.defaultChoiceTitle) {
                    let choiceTitle = appChoice.title.replace(/ /g, '_');
                    let id = checkDupId(choiceTitle, choiceMap);
                    let data = choiceMap.get(appChoice.id);
                    if (typeof data !== 'undefined') {
                        choiceMap.set(id, data);
                        choiceMap.delete(appChoice.id);
                        appChoice.id = id;
                    }
                }
            }
        }
    }
</script>