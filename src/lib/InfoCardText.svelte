<script>
	let { title = '', children } = $props();
</script>

{#if title}
	<h3 class="text-lg font-semibold">{title}</h3>
{/if}
<p class="mb-4 text-gray-700">
	{@render children?.()}
</p>
