<script>
	let { children, title } = $props();
</script>

<div class="mx-auto my-8 max-w-3xl rounded-lg bg-white p-6 shadow-lg">
	<h2 class="mb-4 text-2xl font-semibold">{title}</h2>
	{#if children}
		{@render children()}
	{/if}
</div>
