<Dialog
    bind:open
    surface$style="width: 1000px; max-width: calc(100vw - 32px);"
    onSMUIDialogClosed={onclose}
>
    <Title tabindex={0} autofocus>
        Create Requirement
    </Title>
    <Content>
        <div class="container-fluid">
            <div class="row pb-3">
                <div class="col-12 px-0">Requirements are conditions that will decide if the player can select the choice or not, these use the ID of choices and variables, and the design of the filter placed on non-selectable choices can be changed in filter design.</div>
            </div>
            <div class="row pb-2">
                <div class="col-12 pb-3">
                    <Button variant="raised" class="w-100" onclickcapture={() => pasteRequired()}>
                        <Label>Paste the copied requirement</Label>
                    </Button>
                </div>
                <div class="col-sm-6 col-12 pb-3">
                    <Button variant="raised" class="w-100" onclickcapture={() => addNewRequired('gid', true, '')}>
                        <Label>Add Global Requirement</Label>
                    </Button>
                </div>
                <div class="col-sm-6 col-12 pb-3">
                    <Button variant="raised" class="w-100" onclickcapture={() => addNewRequired('word', true, '')}>
                        <Label>Add Word Requirement</Label>
                    </Button>
                </div>
            </div>
            <div class="row pb-2">
                <div class="col-12 px-3 pb-2">Choice Requirements</div>
                <div class="col-sm-6 col-12 pb-3">
                    <Button variant="raised" class="w-100" onclickcapture={() => addNewRequired('id', true, '')}>
                        <Label>Add selected Choice requirement</Label>
                    </Button>
                </div>
                <div class="col-sm-6 col-12 pb-3">
                    <Button variant="raised" class="w-100" onclickcapture={() => addNewRequired('id', false, '')}>
                        <Label>Add non-selected Choice requirement</Label>
                    </Button>
                </div>
            </div>
            <div class="row pb-2">
                <div class="col-sm-6 col-12">
                    <div class="col-12 px-1 pb-2">Point Requirements</div>
                    <div class="col-12 pb-3">
                        <Select bind:value={pointRequire} label="Point Operator" variant="filled" alwaysFloat={true}>
                            {#each pointRequireList as requirement (requirement.text)}
                                <Option value={requirement.value}>{requirement.text}</Option>
                            {/each}
                        </Select>
                    </div>
                    <div class="col-12 pb-3">
                        <Button variant="raised" class="w-100" onclickcapture={() => addNewRequired('points', true, pointRequire)}>
                            <Label>Add Point Requirement</Label>
                        </Button>
                    </div>
                </div>
                <div class="col-sm-6 col-12">
                    <div class="col-12 px-1 pb-2">Point Comparison Requirements</div>
                    <div class="col-12 pb-3">
                        <Select bind:value={pointComparisonRequire} label="Point Comparison Operator" variant="filled" alwaysFloat={true}>
                            {#each pointRequireList as requirement (requirement.text)}
                                <Option value={requirement.value}>{requirement.text}</Option>
                            {/each}
                        </Select>
                    </div>
                    <div class="col-12 pb-3">
                        <Button variant="raised" class="w-100" onclickcapture={() => addNewRequired('pointCompare', true, pointRequire)}>
                            <Label>Add Point Comparison Requirement</Label>
                        </Button>
                    </div>
                </div>
            </div>
            <div class="row pb-2">
                <div class="col-12 px-3 pb-2">Or Requirements</div>
                <div class="col-sm-6 col-12 pb-3">
                    <Button variant="raised" class="w-100" onclickcapture={() => addNewRequired('or', true, '')}>
                        <Label>'X of these is met' Requirement</Label>
                    </Button>
                </div>
                <div class="col-sm-6 col-12 pb-3">
                    <Button variant="raised" class="w-100" onclickcapture={() => addNewRequired('or', false, '')}>
                        <Label>'X of these is not met' Requirement</Label>
                    </Button>
                </div>
            </div>
            <div class="row">
                <div class="col-12 px-3 pb-2">'Selected X or more From' Requirements</div> 
                <div class="col-12 pb-3">
                    <Textfield bind:value={numberOfSelection} label="Number of Selections" variant="filled" type="number" />
                </div>
                <div class="col-sm-4 col-12 pb-3">
                    <Button variant="raised" class="w-100" onclickcapture={() => addNewRequired('selFromGroups', true, '')}>
                        <Label>From Groups</Label>
                    </Button>
                </div>
                <div class="col-sm-4 col-12 pb-3">
                    <Button variant="raised" class="w-100" onclickcapture={() => addNewRequired('selFromRows', true, '')}>
                        <Label>From Rows</Label>
                    </Button>
                </div>
                <div class="col-sm-4 col-12 pb-3">
                    <Button variant="raised" class="w-100" onclickcapture={() => addNewRequired('selFromWhole', true, '')}>
                        <Label>From All</Label>
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
    import Select, { Option } from '$lib/custom/select';
    import Textfield from '$lib/custom/textfield/Textfield.svelte';
    import { app, snackbarVariables } from '$lib/store/store.svelte';
	import type { Addon, Choice, Requireds, Row, Score, GlobalRequirement } from '$lib/store/types';
    
    let { open, onclose, data, orReq = false }: { open: boolean; onclose: () => void; data: Row | Choice | Addon | Score | Requireds | GlobalRequirement; orReq?: boolean } = $props();
    const pointRequireList = [{
        text: '> More than',
        value: '1'
    }, {
        text: '≥ More or equal',
        value: '2'
    }, {
        text: '= Equal to',
        value: '3'
    }, {
        text: '≤ Less or equal',
        value: '4'
    }, {
        text: '< Less than',
        value: '5'
    }];
    let pointRequire = $state('1');
    let pointComparisonRequire = $state('1');
    let numberOfOrRequireds = $state(4);
    let numberOfSelection = $state(1);

    function addNewRequired(type: string, bType: boolean, operator: string) {
        if (orReq) {
            const req = data as Requireds;
            if (req.orRequireds) {
                req.orRequireds.push({
                    required: bType,
                    requireds: [],
                    orRequired: [],
                    orRequireds: [],
                    id: '',
                    type: type,
                    reqId: '',
                    reqId1: '',
                    reqId2: '',
                    reqId3: '',
                    reqPoints: 0,
                    showRequired: app.defaultUseShowReq,
                    operator: operator,
                    afterText: app.defaultAfterReq,
                    beforeText: app.defaultBeforeReq,
                    orNum: 1,
                    selNum: numberOfSelection,
                    selFromOperators: '1',
                    more: []
                });
            }
        } else {
            data.requireds.push({
                required: bType,
                requireds: [],
                orRequired: type === 'word' ? [{req: ''}] : [],
                orRequireds: [],
                id: '',
                type: type,
                reqId: '',
                reqId1: '',
                reqId2: '',
                reqId3: '',
                reqPoints: 0,
                showRequired: app.defaultUseShowReq,
                operator: operator,
                afterText: app.defaultAfterReq,
                beforeText: app.defaultBeforeReq,
                orNum: 1,
                selNum: numberOfSelection,
                selFromOperators: '1',
                more: []
            });
        }
        
    }

    function pasteRequired() {
        if (typeof app.tmpRequired === 'undefined' || app.tmpRequired.length === 0) {
            snackbarVariables.labelText = 'The clipboard is empty.';
            snackbarVariables.isOpen = true;
        } else {
            const tmpRequired = JSON.parse(JSON.stringify(app.tmpRequired));
            if (tmpRequired.length > 1) {
                for (var i = 0; i < tmpRequired.length; i++) {
                    data.requireds.push(tmpRequired[i]);
                }
            } else {
                if ('reqId' in data) {
                    tmpRequired[0].requireds = [];
                    data.requireds.push(tmpRequired[0]);
                } else {
                    data.requireds.push(tmpRequired[0]);
                }
            }
        }
    }
</script>