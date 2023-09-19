<script>
  import { createEventDispatcher } from "svelte";
  import { ActionType } from "../store/gameState";

  const dispatch = createEventDispatcher();

  const handleClick = () => {
    dispatch("send", { type: ActionType.Click });
  };
</script>

<div class="main">
  <span class="text-5xl mb-10">Fim de Jogo!</span>
  <button
    class="w-72 py-10 rounded-xl text-5xl hover:glow"
    on:click={handleClick}>Começar denovo</button
  >
</div>
