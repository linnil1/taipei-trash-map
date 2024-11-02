<script lang="ts">
	import { getContext, onDestroy, onMount } from 'svelte';
	import TimerMarker from './TimerMarker.svelte';
	import Station from '$lib/Station.svelte';

	let { station, hide } = $props();
	const loader = getContext('loader');
	const getMap = getContext('map');
	// const getCluster = getContext('cluster');
	// const cluster = getCluster();
	const map = getMap();
	const getInfoWindow = getContext('infoWindow');
	const infoWindow = getInfoWindow();
	// let fullTime = station.startTime + "-" + station.endTime
	const fullTime =
		station.startTime.slice(0, 2) +
		':' +
		station.startTime.slice(2, 4) +
		' - ' +
		station.endTime.slice(0, 2) +
		':' +
		station.endTime.slice(2, 4);

	let popup = () => {
		const header = document.createElement('h1');
		header.classList.add('text-xl');
		header.textContent = station.address;
		infoWindow.close();
		infoWindow.setHeaderContent(header);
		infoWindow.setContent(document.querySelector(`#stid-${station.id}`)?.cloneNode(true));
		infoWindow.open(map, marker);
	};

	let marker = $state();
	onMount(() => {
		loader.importLibrary('marker').then(({ AdvancedMarkerElement }) => {
			marker = new AdvancedMarkerElement({
				map: map,
				position: { lat: station.lat, lng: station.lng },
				content: document.querySelector(`#id-${station.id}`),
				gmpClickable: true
			});
			marker.addListener('click', popup);
			// cluster.addMarker(marker);
		});
	});

	$effect(() => {
		if (marker && hide) marker.setMap(null);
		else if (marker) marker.setMap(map);
	});

	onDestroy(() => {
		marker.removeEventListener('click', popup);
		marker.setMap(null);
		// cluster.removeMarker(marker);
		marker = null;
	});
</script>

<div class="hidden">
	<TimerMarker id={`id-${station.id}`} text={fullTime}></TimerMarker>
	<Station id={`stid-${station.id}`} data={station}></Station>
</div>
