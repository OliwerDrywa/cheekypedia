<script>
  export let room;
  export let game;

  import Interviews from "./Interviews.svelte";
  import Guess from "./Guess.svelte";
  import Splash from "./Splash.svelte";

  // TODO: add client side version of $room for responsiveness
  $: players = Object.keys($room.players).map(k => ({ ...$room.players[k], uid: k }));
  // $: guessers = players.filter(p => p.role === "guesser");
  $: liars = players.filter(p => p.role === "liar");

  $: if (liars.every(p => p.article)) game.selectArticle();
</script>

<style>
  * {
    text-align: center;
    margin: auto;
  }
</style>

{#if $game && $game.selectedArticle}
  <!-- TODO pass minimum of props -->
  <Interviews {game} {room} let:notes>
    <Guess {game} {room} {notes} let:winners>
      <Splash {game} />
    </Guess>
  </Interviews>
{:else}
  <p>Waiting for all players to choose an article.</p>
{/if}
