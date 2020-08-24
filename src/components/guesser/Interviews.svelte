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

{#if !timeUp}
  {$game.selectedArticle.title}
  <h3>interview</h3>
  <h2>{currentPlayer.name}</h2>
  <p>{'<countdown>'}</p>
  <Notepad {notes} {currentPlayer} />
  <button on:click={skip}>next</button>
{:else}
  <slot {notes} />
{/if}
