<script lang="ts">
	import { setContext } from 'svelte';
	import { Loader } from '@googlemaps/js-api-loader';
	import Marker from '$lib/Marker.svelte';
	import { MarkerClusterer } from '@googlemaps/markerclusterer';
	import Device from './Device.svelte';

	const apiKey = 'AIzaSyBaEleIDTDRiwUv2k3H-qQAfgxSd9GOJXI';
	const loader = new Loader({
		apiKey,
		version: 'weekly',
		libraries: ['places']
	});
	setContext('loader', loader);
	let map = $state();
	let cluster = $state();
	setContext('cluster', () => cluster);
	const mapOptions = {
		center: {
			lat: 25.050780024912346,
			lng: 121.55043121906115
		},
		zoom: 16,
		mapId: 'DEMO_MAP_ID',
		mapTypeControl: false,
		fullscreenControl: false
	};
	setContext('map', () => map);
	let infoWindow = $state();
	setContext('infoWindow', () => infoWindow);

	loader
		.importLibrary('maps')
		.then(({ Map, InfoWindow }) => {
			map = new Map(document.getElementById('map'), mapOptions);
			cluster = new MarkerClusterer({ map: map });
			infoWindow = new InfoWindow();
		})
		.catch((error) => {
			console.error('Error loading Google Maps:', error);
		});

	let { stations, deviceGps = $bindable(), deviceTracing = false, children } = $props();
</script>

<div id="map" class="h-screen w-screen"></div>
{#if map}
	{#if deviceGps || deviceTracing}
		<Device bind:location={deviceGps} tracing={deviceTracing} />
	{/if}

	{#each stations as station (station.id)}
		<Marker {station}></Marker>
	{/each}
	{@render children?.()}
{/if}
