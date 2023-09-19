<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Card from "./Card.svelte";
  import { ActionType } from "../store/gameState";

  export let selected = [];
  export let matches = [];
  export let cards: string[];

  const dispatch = createEventDispatcher();
</script>

<div class="main">
  <h1>Score: {matches.length * 10}</h1>
  <div class="container flex flex-wrap justify-center mx-auto">
    {#each cards as card, index (index)}
      <Card
        selected={selected.includes(index)}
        currentSelection={index === selected[selected.length - 1]}
        matched={matches.includes(card)}
        on:select={(event) =>
          dispatch("send", { type: ActionType.Click, data: event.detail })}
        {card}
        {index}
      />
    {/each}
  </div>
</div>
<span>{selected}</span>

<style>
</style>
