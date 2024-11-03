<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';
	import Map from '$lib/Map.svelte';
	import Control from '$lib/Control.svelte';
	import MenuItem from '$lib/MenuItem.svelte';
	import { isUserBlockLocation } from '$lib/location';

	/*
const stations = [
  { id: 1, lat: 25.048238, lng:121.553540, startTime: "2300", endTime:"2330", address: "1234" },
  { id: 2, lat: 25.048238, lng:121.554540, startTime: "2200", endTime:"2300", address: "123" },
];
*/

	function goToInfo() {
		goto('/info?' + $page.url.searchParams.toString(), $page.state);
	}

	function calculateDuration(station) {
		let startTime = station['startTime'];
		let endTime = station['endTime'];
		const datePrefix = '2024-01-01 ';
		const startDateTimeStr = `${datePrefix}${startTime.slice(0, 2)}:${startTime.slice(2)}:00`;
		const endDateTimeStr = `${datePrefix}${endTime.slice(0, 2)}:${endTime.slice(2)}:00`;
		let startDate = new Date(startDateTimeStr);
		let endDate = new Date(endDateTimeStr);
		if (endDate < startDate) {
			endDate.setDate(endDate.getDate() + 1);
		}
		return Math.floor((endDate - startDate) / (1000 * 60));
	}

	async function fetchStation(latlng) {
		try {
			const response = await fetch(`/trashcar?lat=${latlng.lat}&lng=${latlng.lng}`, {
				cache: 'force-cache'
			});
			if (response.ok) {
				let stations1 = await response.json();
				stations = stations1.map((station) => {
					station['duration'] = calculateDuration(station);
					return station;
				});
			} else {
				console.error('Failed to fetch stations:', response.statusText);
			}
		} catch (error) {
			console.error('Error fetching stations:', error);
		}
	}

	let stations = $state([]);

	// gps
	let isGpsOn = $state(false);
	let deviceGps = $state(null);
	function toggleGps() {
		isGpsOn = !isGpsOn;
		if (isGpsOn) {
			// startGps()
		} else {
			// stopGps()
			deviceGps = null;
		}
	}

	onMount(() => {
		if (!isUserBlockLocation()) isGpsOn = true;
	});

	// Filter stations based on start and end time
	let filteredstations = $state([]);
	$effect(() => {
		// console.log(pickerDate);
		let pickStartTime = pickerDate[0].replace(':', '');
		let pickEndTime = pickerDate[1].replace(':', '');
		filteredstations = stations
			.filter(() => pickerWeekday != 3 && pickerWeekday != 7)
			.filter((station) => !(pickEndTime < station.startTime || station.endTime < pickStartTime))
			.filter((station) => station.duration >= pickerDuration);
	});

	async function onMoved(latlng) {
		// console.log(latlng)
		await fetchStation(latlng);
	}

	let pickerDate = $state(['00:00', '23:59']);
	let pickerWeekday = $state(null);
	let pickerDuration = $state(0);
	let isFilterMenuOpen = $state(false);
</script>

<Map stations={filteredstations} bind:deviceGps deviceTracing={isGpsOn} onmove={onMoved}>
	<div class="fixed right-4 top-4 z-10 flex space-x-2">
		<MenuItem
			onclick={() => {
				isFilterMenuOpen = !isFilterMenuOpen;
			}}
			icon={isFilterMenuOpen ? 'iconoir:filter-solid' : 'iconoir:filter'}
			text={$_('pages.openFilter')}
		/>

		<MenuItem onclick={goToInfo} icon="material-symbols:info-outline" text={$_('pages.goToInfo')} />

		<MenuItem
			onclick={toggleGps}
			icon={isGpsOn ? 'ph:gps-fill' : 'solar:gps-linear'}
			text={$_('buttons.getLocate')}
		/>
	</div>

	{#if isFilterMenuOpen}
		<Control bind:pickerDate bind:pickerWeekday bind:pickerDuration />
	{/if}
</Map>
