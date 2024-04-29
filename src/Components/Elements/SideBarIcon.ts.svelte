<script lang="ts">
    import { Icon, IconType } from 'svelte-icons-pack';
    import { AiOutlineNodeExpand } from 'svelte-icons-pack/ai';
    import { BsPlus, BsGearFill, BsFileText } from 'svelte-icons-pack/bs'

    // Declare the type for iconMapping
    const iconMapping: { [key: string]: IconType } = {
      "BsPlus": BsPlus,
      "BsGearFill": BsGearFill,
      "BsFileText": BsFileText,
      "AiOutlineNodeExpand": AiOutlineNodeExpand,
    }

    // Declare Props
    export let icon: string = "BsPlus";
    let iconOutput = iconMapping[icon];
    export let size: number = 32;
    export let tooltip: string = "❓️What Does This Button Do?";

    // TODO : Implement on click Event
    export let action: () => void = () => console.log('Default action');

</script>

<div class="sidebar-icon group">
  <Icon src={iconOutput} size="{size}" on:click="{action}" />
  <span class="sidebar-tooltip group-hover:scale-100">{tooltip}</span>
</div>
