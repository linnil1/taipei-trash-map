<script lang="ts">
    import { _ } from 'svelte-i18n'
    let { weekday, disabled = false, chosed = false, onclick } = $props()
</script>

<button
    type="button"
    class="h-8 rounded bg-blue-500 px-2 text-white
    {disabled ? 'opacity-50' : ''}
    {chosed ? 'bg-green-500' : 'bg-blue-500'}
  "
    {onclick}
>
    {$_(`weekdays.${weekday}`)}
</button>
