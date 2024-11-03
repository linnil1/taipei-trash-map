<script>
	import Icon from '@iconify/svelte';

	let { id, text } = $props();
</script>

<div {id} class="marker">
	<Icon class="markerIcon h-6 w-6 text-gray-800" icon="tabler:trash" />
	{text}
</div>

<style>
	.marker {
		background-color: #4285f4;
		border-radius: 8px;
		color: #ffffff;
		font-size: 14px;
		padding: 4px 6px;
		position: relative;
	}

	.marker::after {
		content: '';
		position: absolute;
		left: 50%;
		top: 100%;
		transform: translate(-50%, 0);
		width: 0;
		height: 0;
		border-left: 4px solid transparent;
		border-right: 4px solid transparent;
		border-top: 4px solid #4285f4;
	}

	:global(.markerIcon) {
		position: absolute;
		bottom: -24px;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
