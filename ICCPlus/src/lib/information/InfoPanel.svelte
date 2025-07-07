<Panel bind:open>
    <Header>
        {title}
        {#snippet icon()}
            <i class="mdi {open ? 'mdi-chevron-up' : 'mdi-chevron-down'} mdi--big"></i>
        {/snippet}
    </Header>
    <Content>
        <span style="white-space: pre-line">{@html text}</span>
    </Content>
</Panel>

<script lang="ts">
    import { Panel, Header, Content} from '$lib/custom/accordion';

    let { title, text, open = false }: { title: string; text: string; open?: boolean } = $props();
</script>