<script lang="ts">
	let { title = '', children } = $props();
</script>

<div class="flex flex-col rounded-lg backdrop-blur-md">
	<label class="text-sm font-medium text-gray-700 md:pl-1 md:pt-2">{title}:</label>
	<div class="flex items-center space-x-1 rounded p-2">
		{@render children?.()}
	</div>
</div>
