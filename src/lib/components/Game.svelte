<script lang="ts">
  import Card from "./Card.svelte";
  import shuffle from "./../utils/shuffle";

  const emojis = ["💀", "🎃", "🍙", "👾", "👽", "🎮", "👓"];
  let selected = [];
  let matches = [];
  const cards = shuffle([...emojis, ...emojis]);

  const handleSelected = (selected) => {
    selected = [...selected, selected];
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key == "Escape") console.log("PAUSE");
  };

  const matchCards = () => {
    const [firstCard, secondCard] = [cards[selected[0]],cards[selected[1]]]
    // Timeout so you can see the card
    setTimeout(() => {
      if (firstCard === secondCard) matches = [...matches, ...selected];
      selected = [];
    }, 500);
  };

  $: selected.length === 2 && matchCards();
</script>

<svelte:window on:keydown={handleKeyDown} />

  <div class="main">
    <h1>Score: {matches.length / 2}</h1>
    <div class="container flex flex-wrap justify-center mx-auto">
      {#each cards as card, index (index)}
        <Card
          selected={selected.includes(index)}
          currentSelection={index === selected[selected.length - 1]}
          matched={matches.includes(index)}
          on:select={handleSelected}
          {card}
          {index}
        />
      {/each}
    </div>
  </div>
  <span>{selected}</span>

<style>
</style>
