<script lang="ts">
	import Icon from '@iconify/svelte';
	let { onclick, icon, text } = $props();
</script>

<div class="group relative">
	<button {onclick} class="h-6 w-6 rounded-full text-white">
		<Icon {icon} class="h-full w-full text-stone-950" />
		<span
			class="absolute left-1/2 mt-2 -translate-x-1/2 transform text-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
		>
			{text}
		</span>
	</button>
</div>
