<script lang="ts">
	import Icon from '@iconify/svelte';
	import { _ } from 'svelte-i18n';
	let { id, data } = $props();
	const keys = [
		// 'id',
		// "lat, "lng", "address",
		'startTime',
		'endTime',
		// 'district', 'village',
		'route',
		'trip', // "team1", "team2",
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
		<tr>
			<td colspan="2" class="p-1 text-orange-400">
				<a
					href={`https://www.google.com/maps/dir//${data.lat},${data.lng}`}
					target="_blank"
					class="flex"
				>
					<Icon icon="logos:google-maps" class="h-4 w-4" />
					{$_('buttons.showInGoogleMap')}
				</a>
			</td>
		</tr>
	</tbody>
</table>
