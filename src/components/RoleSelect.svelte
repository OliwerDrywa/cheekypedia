<script>
  export let client;
  export let room;

  import { game } from "./game";

  game.init();

  // TODO: add client side version of $room for responsiveness
  $: players = Object.keys($room.players).map(k => ({ ...$room.players[k], uid: k }));
  $: guessers = players.filter(p => p.role === "guesser");
  $: liars = players.filter(p => p.role === "liar");

  // TODO must have at least one guesser etc, at least 3 players
  const MIN_PLAYERS = 2;

  $: smallestIndex = players.map(p => p.index).reduce((A, i) => Math.min(A, i));
</script>

<!-- guessers -->
<h2>guessers:</h2>
{#each guessers as guesser}
  <p class:client={guesser.uid === client.uid}>{guesser.name}     score: {guesser.score}</p>
{:else}
  <p>no guessers</p>
{/each}
{#if $client.role !== 'guesser'}
  <button on:click={room.joinGuessers}>join</button>
{/if}

<!-- liars -->
<h2>liars:</h2>
{#each liars as liar}
  <p class:client={liar.uid === client.uid}>{liar.name}     score: {liar.score}</p>
{:else}
  <p>no liars</p>
{/each}
{#if $client.role !== 'liar'}
  <button on:click={room.joinLiars}>join</button>
{/if}

<!-- start buttom -->
{#if players.find(p => p.uid === client.uid).index === smallestIndex}
  {#if players.length < MIN_PLAYERS}
    <button disabled>start {players.length} / {MIN_PLAYERS}</button>
  {:else}
    <button on:click={game.start}>start</button>
  {/if}
{/if}
