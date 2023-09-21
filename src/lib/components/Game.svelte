<script lang="ts">
  import { onMount } from 'svelte';
  import { createEventDispatcher } from "svelte";
  import Card from "./Card.svelte";
  import { ActionType } from "../store/gameState";

  export let selected = [];
  export let matches = [];
  export let cards: string[];

  const dispatch = createEventDispatcher();

  onMount(()=>{
    console.log('teste')
    document.body.scrollIntoView()
  }) 
</script>

<div class="main py-10 sm:py-0">
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

<style>
</style>
