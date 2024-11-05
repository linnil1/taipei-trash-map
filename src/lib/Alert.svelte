<script lang="ts">
    import Icon from '@iconify/svelte'

    let { icon, text } = $props()
</script>

<div
    class="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform items-end space-x-2 rounded-full border-2 border-red-600 bg-red-100 p-3 text-red-600 shadow-lg"
>
    <Icon {icon} class="h-6 w-6 pt-1" />
    <p>{text}</p>
</div>
