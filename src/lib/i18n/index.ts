import { init, register, getLocaleFromQueryString } from 'svelte-i18n'

const defaultLocale = 'tw'

register('en', () => import('./en.json'))
register('tw', () => import('./tw.json'))

init({
	fallbackLocale: defaultLocale,
	initialLocale: getLocaleFromQueryString('lang'),
})