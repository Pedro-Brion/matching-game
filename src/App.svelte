<script lang="ts">
  import Game from "./lib/components/Game.svelte";
  import GameOverScreen from "./lib/components/GameOverScreen.svelte";
  import PausedScreen from "./lib/components/PausedScreen.svelte";
  import StartScreen from "./lib/components/StartScreen.svelte";
  import {
    State,
    type Action,
    type GameMachine,
    ActionType,
    useState,
  } from "./lib/store/gameState";
  import shuffle from "./lib/utils/shuffle";

  const emojis = ["💀", "🎃", "🎮", "🍙", "👾", "👽",  "👓"];
  let selected = [];
  let matches = [];
  let cards = shuffle([...emojis, ...emojis]);

  const handleSelected = (cardIndex: number) => {
    if (selected.length === 2) return;
    selected = [...selected, cardIndex];
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    send({ type: ActionType.KeyDown, data: { key: e.key } });
  };

  const matchCards = () => {
    const [firstCard, secondCard] = [cards[selected[0]], cards[selected[1]]];
    // Timeout so you can see the card
    if (firstCard === secondCard) matches = [...matches, firstCard];
    setTimeout(() => {
      selected = [];
      send({ type: ActionType.FinishedMatching });
    }, 700);
  };

  const checkGameOver = () => {
    if (matches.length === emojis.length) return State.GameOver;
    return State.Playing;
  };

  const restartGame = () => {
    matches=[];
    selected=[];
    cards = shuffle([...emojis, ...emojis]);
  };

  const gameMachine: GameMachine = (state: State, event: Action): State => {
    if (event.type === ActionType.KeyDown && state !== State.Ready) {
      if (event.data.key === "Escape") return State.Paused;
    }
    switch (state) {
      case State.Ready: {
        if (event.type === ActionType.Click) return State.Playing;
        break;
      }
      case State.Playing: {
        if (event.type === ActionType.Click) {
          handleSelected(event.data);
          if (selected.length === 2) {
            matchCards();
            return State.Matching;
          }
          return State.Playing;
        }
        break;
      }
      case State.Matching: { 
        if (event.type === ActionType.FinishedMatching) return checkGameOver();
        return State.Matching;
      }
      case State.GameOver: {
        if(event.type === ActionType.Click){
          restartGame();
          return State.Playing
        }
        break;
      }
      case State.Paused: {
        if (event.type === ActionType.Click) return checkGameOver();
        break;
      }
    }
    return state;
  };

  const { state, send } = useState(gameMachine);
</script>

<svelte:window on:keydown={handleKeyDown} />

<main>
  {#if $state === State.Ready}
    <StartScreen on:send={({ detail }) => send(detail)} />
  {:else if $state === State.Playing || $state === State.Matching}
    <Game on:send={({ detail }) => send(detail)} {cards} {matches} {selected} />
  {:else if $state === State.Paused}
    <PausedScreen on:send={({ detail }) => send(detail)} />
  {:else if $state === State.GameOver}
    <GameOverScreen on:send={({ detail }) => send(detail)} />
  {/if}
</main>

<style>
</style>
