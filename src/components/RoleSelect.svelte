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
  const MIN_GUESSERS = 1;
  const MIN_LIARS = 2;
  const MIN_PLAYERS = 2;

  $: earliestPlayer = players.reduce((A, i) => (A.index < i.index ? A : i), {});
</script>

<style>
  * {
    text-align: center;
  }
  .lighter {
    margin-left: 10%;
    color: #a1a1a1;
  }
  button {
    text-align: center;
    padding: 5px;
    margin: 10px auto;
    border: 1px solid var(--grey);
    border-radius: 50px;

    width: 65%;
  }
  .start {
    width: 80%;
    margin-top: 30px;
    font-size: 1.35rem;
  }

  .player::before {
    content: "> ";
    color: lightgray;
    font-weight: bolder;
  }
</style>

<!-- guessers -->
<h2>
  Guessers
  <span class="lighter">{guessers.length}</span>
</h2>
{#each guessers as guesser}
  <p class="player" class:client={guesser.uid === client.uid}>
    {guesser.name}
    <span class="lighter">{guesser.score} points</span>
  </p>
{:else}
  <p>Invite your friends!</p>
{/each}
{#if $client.role !== 'guesser'}
  <button on:click={room.joinGuessers}>Join the guessers</button>
{/if}

<br />
<br />

<!-- liars -->
<h2>
  Liars
  <span class="lighter">{liars.length}</span>
</h2>
{#each liars as liar}
  <p class="player" class:client={liar.uid === client.uid}>
    {liar.name}
    <span class="lighter">{liar.score} points</span>
  </p>
{:else}
  <p>Invite your friends!</p>
{/each}
{#if $client.role !== 'liar'}
  <button on:click={room.joinLiars}>Join the liars</button>
{/if}

<!-- start buttom -->
{#if client.uid === earliestPlayer.uid}
  <button class="start" on:click={game.start} disabled={liars.length < MIN_LIARS || guessers.length < MIN_GUESSERS}>
    Start game
  </button>
{/if}
