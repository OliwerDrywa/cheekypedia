<script>
  export let room;
  export let game;

  import Notepad from "./Notepad.svelte";

  let notes = {};

  // import { readable } from "svelte/store";

  const players = Object.keys($room.players).map(k => ({ ...$room.players[k], uid: k }));
  const liars = players.filter(p => p.role === "liar");

  let currentPlayer;

  let timeUp = false;

  function* playerQueue(interviewTimes, liars) {
    for (let duration of interviewTimes) {
      for (let liar of liars) {
        yield { liar, duration };
      }
    }
  }

  const queueGenerator = playerQueue($game.interviewTimes, liars);

  function co() {
    const { value } = queueGenerator.next();

    if (value) {
      const { liar, duration } = value;
      currentPlayer = liar;

      const timeout = setTimeout(co, duration * 1000);

      return () => {
        clearTimeout(timeout);
        co();
      };
    } else {
      timeUp = true;
    }

    return () => {};
  }

  const skip = co();
</script>

<style>
  * {
    text-align: center;
  }
  h2 {
    margin: 0;
  }
  button {
    text-align: center;
    padding: 5px;
    margin: 10px auto;
    border: 1px solid var(--grey);
    border-radius: 50px;

    width: 65%;
  }
  div {
    margin: 10px;
  }
</style>

{#if !timeUp}
  <p>Ask</p>
  <h2>{currentPlayer.name}</h2>
  <p>about</p>
  <h2>{$game.selectedArticle.title}</h2>

  <div>(pretend this is a countdown)</div>

  <Notepad {notes} {currentPlayer} />

  <button on:click={skip}>Next</button>
{:else}
  <slot {notes} />
{/if}
