<script lang="ts">
    import { locale, locales, _, isLoading } from 'svelte-i18n'
    import { goto, replaceState } from '$app/navigation'
    import { page } from '$app/stores'
    import { tick } from 'svelte'

    import Icon from '@iconify/svelte'
    import InfoCard from '$lib/InfoCard.svelte'
    import InfoCardText from '$lib/InfoCardText.svelte'

    let { data } = $props()
    let lastUpdateTime = data.lastUpdateTime

    $effect(() => {
        if ($isLoading) {
            return
        }
        tick().then(() => {
            $page.url.searchParams.set('lang', $locale)
            replaceState($page.url, $page.state)
        })
    })

    function gotoHome() {
        goto('/?' + $page.url.searchParams.toString(), $page.state)
    }
</script>

<div class="mt-8 flex items-center justify-center">
    <img src="/icon.jpg" class="h-48 w-48 rounded-lg object-cover" alt="Icon" />
</div>
<button
    onclick={gotoHome}
    class="fixed right-4 top-4 flex items-center space-x-1 rounded bg-blue-500 p-2 text-white shadow-lg hover:bg-blue-600"
>
    <Icon icon="lets-icons:back" class="h-8 w-8" />
    <span>{$_('pages.goToMap')}</span>
</button>

<h1 class="my-6 text-center text-3xl font-bold">{$_('app_full_name')}</h1>
<InfoCard title={$_('titles.setting')}>
    <div class="mb-4">
        <label for="locale-select" class="mb-2 block flex items-center text-lg font-semibold">
            <Icon icon="material-symbols:language" style="text-gray-700" />
            Language</label
        >
        <select
            id="locale-select"
            bind:value={$locale}
            class="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            {#each $locales as locale}
                <option value={locale}>{$_('languages.' + locale)}</option>
            {/each}
        </select>
    </div>
</InfoCard>

<InfoCard title={$_('titles.introduction')}>
    <InfoCardText>
        這個 project 其實是很簡單的地圖視覺化，想要地圖查詢垃圾車的時間地點而已。
    </InfoCardText>
    <InfoCardText>
        起源是當時住在新北 <a
            href="https://crd-rubbish.epd.ntpc.gov.tw/dispPageBox/Ntpcepd/NtpMP.aspx?ddsPageID=MAP"
            target="_blank"
            class="text-blue-500 hover:underline">新北垃圾車的地圖</a
        > 算是堪用，然而住在台北的時候，赫然發現，台北的垃圾車資訊只有文字沒有地圖，就練習一下，而且台北現在是定點倒垃圾，所以不用實作太複雜的垃圾車追蹤系統。
    </InfoCardText>
    <InfoCardText>
        目前市面上產品 <a
            href="https://play.google.com/store/apps/details?id=com.firemaples.taipei_garbage&hl=zh_TW"
            target="_blank"
            class="text-blue-500 hover:underline">台北市垃圾車清運地圖</a
        > 弄得很不錯，只是我不想為了這麼簡單的事下載 APP，所以這個網頁才誕生。
    </InfoCardText>
</InfoCard>

<InfoCard title={$_('titles.information')}>
    <InfoCardText title={$_('titles.author')}>
        <a href="https://linnil1.tw" target="_blank" class="text-blue-500 hover:underline">
            {$_('titles.author_link_text')}
        </a>
    </InfoCardText>

    <InfoCardText title={$_('titles.code')}>
        <a
            href="https://github.com/linnil1/taipei-trash-map"
            target="_blank"
            class="flex items-center space-x-1 text-blue-500 hover:underline"
        >
            <Icon icon="mdi:github" />
            <span>{$_('titles.github_repo')}</span>
        </a>
    </InfoCardText>
    <InfoCardText title={$_('titles.feedback')}>
        <span class="flex">
            不會使用 Github 的人，請使用<a
                href="https://docs.google.com/forms/d/e/1FAIpQLSepk3nqxEQ8QHw-FkF-uXVJm9aQOEk7Dl6Cp79WIhUsJTHTPQ/viewform?usp=sf_link"
                target="_blank"
                class="ml-2 text-blue-500 hover:underline"
            >
                Google 表單
            </a>
        </span>
        <br />
        相關討論、功能問題、需求，可以去我的 repo 玩。
        <br />
        除了倒數功能這個需求，因為我覺得 APP 的作者做得很好，所以我在這裡暫時先不實現這個功能。
    </InfoCardText>

    <InfoCardText title={$_('titles.data')}>
        有政府釋出的免費 <a
            href="https://data.taipei/dataset/detail?id=6bb3304b-4f46-4bb0-8cd1-60c66dcd1cae"
            target="_blank"
            class="text-blue-500 hover:underline">垃圾車</a
        > 相關資料而且有在更新。我大概每三個月更新一次就好。
    </InfoCardText>
    <InfoCardText title={$_('titles.lastUpdateTime')}>
        {lastUpdateTime}
    </InfoCardText>
</InfoCard>

<InfoCard title="Terms of Service">
    <InfoCardText title="1. Usage">
        You may use this website for informational purposes only. You agree not to misuse the
        website/API or its content. Programmatic fetching of our API endpoint is discouraged;
        instead, we encourage you to use the original API provided by the government.
    </InfoCardText>

    <InfoCardText title="2. Disclaimer"
        >This website is provided "as is" without warranties of any kind. We do not guarantee the
        accuracy or completeness of the information on this site.
    </InfoCardText>

    <InfoCardText title="3. Source">
        The map on our website is based on the Google Maps API. The trash car data is sourced from <a
            href="https://data.taipei/dataset/detail?id=6bb3304b-4f46-4bb0-8cd1-60c66dcd1cae"
            target="_blank"
            class="text-blue-500 hover:underline">臺北市垃圾車點位路線資訊</a
        >.
    </InfoCardText>

    <InfoCardText title="4. Changes">
        We may update these Terms of Service at any time. Updates will be posted on this page.
    </InfoCardText>
</InfoCard>

<InfoCard title="Privacy Policy">
    <InfoCardText title="1. Information Collection">
        We do not collect personal information on this website. We may collect basic analytics data
        (e.g., website visits) to improve our website.
    </InfoCardText>
    <InfoCardText title="2. Cookies">Our website does not use cookies.</InfoCardText>
    <InfoCardText title="3. Third-party">
        Our website uses third-party services such as Google Maps API. These services may collect
        their own data according to their privacy policies. Please refer to <a
            href="https://policies.google.com/privacy"
            target="_blank"
            class="text-blue-500 hover:underline">Google’s Privacy Policy</a
        > for details.
    </InfoCardText>
    <InfoCardText title="4. Changes">
        We may update these policies at any time. Updates will be posted on this page.
    </InfoCardText>
</InfoCard>
