<script lang="ts">
	import { setContext } from 'svelte';
	import { Loader } from '@googlemaps/js-api-loader';
	import { _ } from 'svelte-i18n';
	import Marker from '$lib/Marker.svelte';
	// import { MarkerClusterer } from '@googlemaps/markerclusterer';
	import Device from './Device.svelte';
	import Alert from './Alert.svelte';

	const apiKey = 'AIzaSyBaEleIDTDRiwUv2k3H-qQAfgxSd9GOJXI';
	const loader = new Loader({
		apiKey,
		version: 'weekly',
		libraries: ['places']
	});
	setContext('loader', loader);
	let map = $state();
	// let cluster = $state();
	// setContext('cluster', () => cluster);
	const mapOptions = {
		center: {
			lat: 25.05,
			lng: 121.55
		},
		zoom: 17,
		mapId: 'DEMO_MAP_ID',
		mapTypeControl: false,
		fullscreenControl: false
	};
	setContext('map', () => map);
	let infoWindow = $state();
	setContext('infoWindow', () => infoWindow);

	let mytile = $state({ lat: 0, lng: 0 });
	const TILE_INTERVAL = 0.01;
	function getTile(x) {
		return Number(Math.floor(x / TILE_INTERVAL) * TILE_INTERVAL).toFixed(3);
	}

	loader
		.importLibrary('maps')
		.then(({ Map, InfoWindow }) => {
			map = new Map(document.getElementById('map'), mapOptions);
			// cluster = new MarkerClusterer({ map: map });
			infoWindow = new InfoWindow();

			map.addListener('idle', () => {
				const lat = getTile(map.getCenter().lat());
				const lng = getTile(map.getCenter().lng());
				if (!(lat == mytile.lat && lng == mytile.lng)) {
					mytile = { lat, lng };
					onmove({ lat, lng });
				}
			});

			map.addListener('zoom_changed', () => {
				if (map.getZoom() >= 16) hideMarker = false;
				else hideMarker = true;
			});
		})
		.catch((error) => {
			console.error('Error loading Google Maps:', error);
		});

	let { stations, deviceGps = $bindable(), deviceTracing = false, onmove, children } = $props();
	let hideMarker = $state(false);
</script>

<div id="map" class="h-screen w-screen"></div>
{#if map}
	{#if deviceGps || deviceTracing}
		<Device bind:location={deviceGps} tracing={deviceTracing} />
	{/if}

	{#if hideMarker}
		<Alert icon="mdi:alert-circle-outline" text={$_('infos.zoomInToShow')} />
	{/if}
	{#if !hideMarker && stations.length == 0}
		<Alert icon="mdi:alert-circle-outline" text={$_('infos.noStationsSelected')} />
	{/if}

	{#each stations as station (station.id)}
		<Marker {station} hide={hideMarker}></Marker>
	{/each}
	{@render children?.()}
{/if}
