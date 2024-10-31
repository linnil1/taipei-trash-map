<script lang="ts">
	let { onclick, children } = $props();
</script>

<button type="button" class="h-8 rounded bg-blue-500 px-2 text-white" {onclick}>
	{@render children?.()}
</button>
