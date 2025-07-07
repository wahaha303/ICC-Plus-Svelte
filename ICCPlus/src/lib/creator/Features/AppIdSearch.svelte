<Dialog
    bind:open
    surface$style="width: 1200px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
>
    <Title class="dialog-title" tabindex={0} autofocus>
        Id / Title List
    </Title>
    <Content>
        <Card class="no-shadow">
            <CardContent>
                <div class="container-fluid p-0">
                    <div class="row">
                        You can use CTRL + F to find ID or Title.
                        {#each app.rows as row}
                            <div class="col-12 p-2">
                                <b>{@html `${row.debugTitle ?? ''} ${row.title} / ${row.id}`}</b>
                                <div class="row">
                                    {#each row.objects as choice}
                                        <div class="col-lg-2 col-sm-4 p-2">
                                            {@html `${choice.debugTitle ?? ''} ${choice.title} / ${choice.id}`}
                                        </div>
                                    {/each}
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </CardContent>
        </Card>
    </Content>
    <Actions>
        <div class="container-fluid">
            <div class="row p-0">
                <div class="col-sm-6">
                    <Button action="" onclick={exportAsCsv} >
                        <Label class="dialog-actions--btn">Export as a CSV File</Label>
                    </Button>
                </div>
                <div class="col-sm-6">
                    <Button action="close">
                        <Label class="dialog-actions--btn">Close</Label>
                    </Button>
                </div>
            </div>
        </div>
    </Actions>
</Dialog>
<script lang="ts">
    import Button, { Label } from '@smui/button';
    import Card, { Content as CardContent } from '@smui/card';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import { app } from '$lib/store/store.svelte';
    
    let { open, onclose }: { open: boolean; onclose: () => void } = $props();
    
    function exportAsCsv() {
        const fields = ['id', 'title', 'debugTitle'];
        const result = ['id,title,debugTitle'];

        for (let i = 0; i < app.rows.length; i++) {
            const row = app.rows[i];

            result.push(fields.map(item => JSON.stringify(row[item] ?? '')).join(','));

            for (let j = 0; j < row.objects.length; j++) {
                const choice = row.objects[j];

                result.push(fields.map(item => JSON.stringify(choice[item] ?? '')).join(','));
            }
            result.push('');
        }

        const csv = '\uFEFF' + result.join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.csv';
        a.click();

        URL.revokeObjectURL(url);
    }
</script>