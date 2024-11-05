<script lang="ts">
    import { _ } from 'svelte-i18n'
    import SveltyPicker from 'svelty-picker'
    import QuickFilterButton from './QuickFilterButton.svelte'

    import ControlItem from '$lib/ControlItem.svelte'
    import ButtonWeekday from './WeekdayButton.svelte'
    let {
        pickerWeekday = $bindable(),
        pickerDate = $bindable(),
        pickerDuration = $bindable()
    } = $props()

    const weekdays = [
        { weekday: 1, disabled: false },
        { weekday: 2, disabled: false },
        { weekday: 3, disabled: true },
        { weekday: 4, disabled: false },
        { weekday: 5, disabled: false },
        { weekday: 6, disabled: false },
        { weekday: 0, disabled: true }
    ]

    function selectDay(day) {
        return () => {
            day = day % 7
            if (pickerWeekday == day) pickerWeekday = null
            else pickerWeekday = day
        }
    }

    function setToday() {
        pickerWeekday = new Date().getDay()
    }

    function setTomorrow() {
        pickerWeekday = (new Date().getDay() + 1) % 7
    }

    function getTime(date) {
        return date.toTimeString().slice(0, 5)
    }

    function setNowWithTime(hour) {
        return () => {
            const now = new Date()
            const nowEnd = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                23,
                59,
                59
            ).getTime()
            const nowAddHour = new Date(now.getTime() + hour * 60 * 60 * 1000)
            // console.log(nowAddHour);
            // console.log(nowEnd);
            pickerWeekday = now.getDay()
            pickerDate = [getTime(now), getTime(nowAddHour < nowEnd ? nowAddHour : nowEnd)]
        }
    }

    function setNow() {
        const now = new Date()
        const now1 = new Date(now.getTime() + 10 * 60 * 1000)
        pickerWeekday = now.getDay()
        pickerDate = [getTime(now), getTime(now1)]
    }

    function setNotFinished() {
        const now = new Date()
        pickerWeekday = now.getDay()
        pickerDate = [getTime(now), '23:59']
    }

    function setDuration(mins) {
        return () => {
            pickerDuration = mins
        }
    }

    function reset() {
        pickerWeekday = null
        pickerDate = ['00:00', '23:59']
    }
</script>

<div
    class="absolute top-0 flex w-full flex-col flex-wrap justify-center rounded-lg md:m-4 md:flex-row md:items-start md:space-x-4"
>
    <!-- Time Range Picker -->
    <ControlItem title={$_('labels.timeRange')}>
        <SveltyPicker
            autocommit={true}
            isRange={true}
            manualInput={true}
            inputClasses="h-8 w-32 px-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            mode="time"
            format="hh:ii"
            bind:value={pickerDate}
        />
    </ControlItem>

    <!-- Weekday Picker -->
    <ControlItem title={$_('labels.weekday')}>
        {#each weekdays as { weekday, disabled }}
            <ButtonWeekday
                {weekday}
                {disabled}
                chosed={pickerWeekday === weekday}
                onclick={selectDay(weekday)}
            />
        {/each}
    </ControlItem>

    <!-- Duration Threshold -->
    <ControlItem title={$_('labels.durationThreshold') + $_('labels.minutes')}>
        <input
            id="durationThreshold"
            type="number"
            min="0"
            bind:value={pickerDuration}
            class="h-8 w-24 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </ControlItem>

    <!-- Quick Filter Picker -->
    <ControlItem title={$_('labels.quickButton')}>
        <QuickFilterButton onclick={reset}>{$_('buttons.reset')}</QuickFilterButton>
        <QuickFilterButton onclick={setToday}>{$_('buttons.today')}</QuickFilterButton>
        <QuickFilterButton onclick={setTomorrow}>{$_('buttons.tomorrow')}</QuickFilterButton>
        <QuickFilterButton onclick={setNow}>{$_('buttons.now')}</QuickFilterButton>
        <QuickFilterButton onclick={setNotFinished}>{$_('buttons.notFinished')}</QuickFilterButton>
        <QuickFilterButton onclick={setNowWithTime(1)}>{$_('buttons.inOneHour')}</QuickFilterButton>
        <QuickFilterButton onclick={setDuration(10)}
            >{$_('buttons.longerDuration')}</QuickFilterButton
        >
    </ControlItem>
</div>
