<script>
  export let game;
</script>

<style>
  
</style>

{#if $game.splash.length}
  {#each $game.splash as { player, points }}
    <p>{player} earned {points} points</p>
  {/each}
{/if}
