<script lang="ts">
	import Icon from '@iconify/svelte';
	import { _ } from 'svelte-i18n';
	import { getContext, onDestroy, onMount, tick } from 'svelte';
	import { userBlockLocation, userUnblockLocation } from './location';

	let { location = $bindable(), tracing = false } = $props();
	const loader = getContext('loader');
	const getMap = getContext('map');
	const map = getMap();
	let marker = $state();
	onMount(() => {
		loader.importLibrary('marker').then(({ AdvancedMarkerElement }) => {
			marker = new AdvancedMarkerElement({
				map: map,
				// position: { lat: location.lat, lng: location.lng },
				content: document.querySelector(`#device`),
				gmpClickable: true
			});
		});
	});

	let isStart = $state(false);
	let isStop = $state(false);
	let gpsTimer = $state();
	function stopGps() {
		// clearInterval(gpsTimer)
		clearTimeout(gpsTimer);
		isStop = true;
		// location = null;
	}

	function startGps() {
		/*
		gpsTimer = setInterval(() => {
			location = {lat: 25.0, lng: 121.5 + (new Date().getSeconds()) * 0.001}
		}, 1000)
		*/
		isStart = true;
		gpsTimer = setTimeout(getGps, 1000);
	}
	function getGps() {
		if (!navigator.geolocation) {
			alert($_('infos.unableGetGps'));
			stopGps();
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				let firstTime = location == null;
				location = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
				console.log('Location', JSON.stringify(location));
				userUnblockLocation();
				if (firstTime) map.setCenter(location);
				if (isStart && !isStop) gpsTimer = setTimeout(getGps, 1000);
			},
			(error) => {
				if (error.code === 1 ) {
					// Permission deny
					alert($_('infos.unableGetGps'));
					stopGps();
					userBlockLocation();
					return;
				}
			}
		);
	}

	$effect(() => {
		// console.log(tracing, isStart, isStop)
		if (!tracing && !isStop) stopGps();
		if (tracing && !isStart) startGps();
		if (marker && map && marker && isStart && !isStop) {
			// marker.setPosition(location)
			marker.position = location;
			// map.setCenter(location)
		}
	});

	onDestroy(() => {
		if (marker) {
			marker.map = null;
		}
		stopGps();
	});
</script>

<div class="hidden">
	<Icon id="device" icon="ph:gps-fill" class="h-8 w-8 text-red-500" />
</div>
