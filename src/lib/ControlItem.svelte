<script lang="ts">
	let { title = '', children } = $props();
</script>

<div class="flex flex-col p-2 md:p-0 md:rounded-lg bg-white shadow-lg">
	<label class="text-sm font-medium text-gray-700 md:pl-1 md:pt-2">{title}:</label>
	<div class="flex flex-wrap items-center space-x-1 space-y-1 rounded p-2">
		{@render children?.()}
	</div>
</div>
