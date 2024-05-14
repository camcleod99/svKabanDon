<script lang="ts">
    import { Icon, IconType } from 'svelte-icons-pack';

   /** I have no idea Why this is necessary but node is not having it so sod it */
    // @ts-ignore - This is a false positive, the import is working fine
    import { AiOutlineNodeExpand } from 'svelte-icons-pack/ai';
    // @ts-ignore - This is a false positive, the import is working fine
    import { HiOutlineBeaker }  from 'svelte-icons-pack/hi';
    // @ts-ignore - This is a false positive, the import is working fine
    import { BsPlus, BsGearFill, BsFileText } from 'svelte-icons-pack/bs'

    // Declare the type for iconMapping
    const iconMapping: { [key: string]: IconType } = {
      "BsPlus": BsPlus,
      "BsGearFill": BsGearFill,
      "BsFileText": BsFileText,
      "AiOutlineNodeExpand": AiOutlineNodeExpand,
      "HiOutlineBeaker": HiOutlineBeaker
    }

    // Declare Props
    export let icon: string = "BsPlus";
    let iconOutput = iconMapping[icon];
    export let size: number = 32;
    export let tooltip: string = "❓️What Does This Button Do?";
    export let action: () => void = () => console.log('Default action');


</script>

<div class="sidebar-icon group" on:click={action} on:keydown={() => {} }>
  <Icon src={iconOutput} size="{size}" />
  <span class="sidebar-tooltip group-hover:scale-100">{tooltip}</span>
</div>
