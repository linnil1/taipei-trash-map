<script lang="ts">
	import '../app.css';
	let { children } = $props();

	import { browser } from '$app/environment';
	import '$lib/i18n';
	import { locale, waitLocale } from 'svelte-i18n';
	import type { LayoutLoad } from './$types';
	const url = 'https://taipei-trash-map.linnil1.me';

	export const load: LayoutLoad = async () => {
		if (browser) {
			locale.set(window.navigator.language);
		}
		await waitLocale();
	};
</script>

<svelte:head>
	<!-- Basic SEO -->
	<title>Taipei Trash Map - 台北市垃圾車地圖視覺化</title>
	<meta name="description" content="台北市垃圾車地圖視覺化" />
	<meta
		name="keywords"
		content="台北, 垃圾車, 清運地圖, Taipei trash, trash collection map, Google Maps API"
	/>
	<meta name="author" content="linnil1" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<!-- Open Graph / Social Sharing -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	<meta property="og:title" content="Taipei Trash Map" />
	<meta property="og:description" content="台北市垃圾車地圖視覺化" />
	<meta property="og:image" content={url + '/icon.jpg'} />
	<meta property="og:locale" content="zh_TW" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Taipei Trash Map" />
	<meta name="twitter:description" content="台北市垃圾車地圖視覺化" />
	<meta name="twitter:image" content={url + '/icon.jpg'} />

	<!-- Language & Location Meta Tags -->
	<meta name="geo.region" content="TW" />
	<meta name="geo.placename" content="Taipei" />
	<meta name="language" content="zh-TW" />
	<meta http-equiv="Content-Language" content="zh-TW" />

	<!-- Canonical Link -->
	<link rel="canonical" href={url} />

	<!-- JSON-LD Structured Data for Search Engines -->
	<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Taipei Trash Map",
      "url": url,
      "description": "台北市垃圾車地圖視覺化",
      "creator": {
        "@type": "Person",
        "name": "linnil1",
        "url": "https://github.com/linnil1"
      }
    }
	</script>
</svelte:head>
{@render children()}
