<script>
  export let room;
  export let game;
  export let notes;

  // TODO: add client side version of $room for responsiveness
  $: players = Object.keys($room.players).map(k => ({ ...$room.players[k], uid: k }));
  // $: guessers = players.filter(p => p.role === "guesser");
  $: liars = players.filter(p => p.role === "liar");

  let selectedLiar;

  function toggleSelect(liar) {
    selectedLiar = selectedLiar !== liar ? liar : undefined;
  }

  const foo = () => {};
</script>

<style>
  .selected {
    background: grey;
  }
</style>

{#if !$game.splash}
  {$game.selectedArticle.title}
  <hr />

  {#each liars as liar}
    <div on:click={() => toggleSelect(liar)}>
      <h3 class:selected={liar === selectedLiar}>{liar.name}</h3>
      {#if liar === selectedLiar && notes[liar.uid]}
        <p>{notes[liar.uid]}</p>
      {/if}
    </div>
  {/each}

  <button disabled={!selectedLiar} on:click={() => game.guess(selectedLiar)}>make guess</button>
{:else}
  <slot winners={$game.splash} />
{/if}
