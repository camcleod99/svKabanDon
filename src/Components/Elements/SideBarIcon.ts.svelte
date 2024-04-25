<script lang="ts">
    import { Icon, IconType } from 'svelte-icons-pack';
    import { AiOutlineNodeExpand } from 'svelte-icons-pack/ai';
    import { BsPlus, BsGearFill } from 'svelte-icons-pack/bs'

    // Declare the type for iconMapping
    const iconMapping: { [key: string]: IconType } = {
      "BsPlus": BsPlus,
      "BsGearFill": BsGearFill,
      "AiOutlineNodeExpand": AiOutlineNodeExpand,
    }

    export let icon: string
    let iconOutput = iconMapping[icon];
    export let size: number
</script>

<div class="sidebar-icon group">
  <Icon src={ iconOutput } size="{size}" />
  <span class="sidebar-tooltip group-hover:scale-100">tooltip 💡</span>
</div>
