<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let selected: boolean;
  export let matched: boolean;
  export let currentSelection: boolean;
  export let card: string;
  export let index: number;
  
  $: disabled = selected || matched;

  const dispatch = createEventDispatcher();

  const select = () => {
    !disabled && dispatch("select", index);
  };

  const spin = (node: Node, { delay = 0, duration = 200, spin = 90 }) => {
    return {
      delay,
      duration,
      css: (t: number) => `transform: rotateY(${spin - t * spin}deg)`,
    };
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if selected || matched}
  <div
    class="card"
    on:click={select}
    class:glow={currentSelection || matched}
    in:spin={{ delay: 0, duration: 300, spin: 180 }}
  >
    <span in:spin={{ delay: 150, duration: 150, spin: 90 }}>{card}</span>
  </div>
{:else}
  <div
    class="card"
    on:click={select}
    class:glow={currentSelection || matched}
    in:spin={{ delay: 0, duration: 200, spin: 180 }}
  />
{/if}
