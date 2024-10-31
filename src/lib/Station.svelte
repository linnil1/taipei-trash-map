<script lang="ts">
	import { _ } from 'svelte-i18n';
	let { id, data } = $props();
	const keys = [
		'id',
		// "lat, "lng", "address",
		'startTime', 'endTime',
		'district', 'village',
		'route', 'trip', // "team1", "team2",
		'plate',
		'dataTime'
	];
</script>

<table {id} class="w-full border-collapse text-left font-sans text-gray-800">
	<tbody>
		{#each keys as key}
			{#if data[key]}
				<tr>
					<td class="border-b p-1 font-semibold text-blue-600">{$_('details.' + key)}</td>
					<td class="border-b p-1 text-gray-700">{data[key]}</td>
				</tr>
			{/if}
		{/each}
	</tbody>
</table>
