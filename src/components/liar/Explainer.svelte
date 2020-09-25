<script>
  export let game;
</script>

<style>
  * {
    text-align: center;
    margin: auto;
  }
</style>

{#if !$game.splash}
  {#if $game.selectedArticle}
    <p>Convince others this article is yours</p>
    <h2>{$game.selectedArticle.title}</h2>
  {:else}
    <h2>Waiting for the remaining players.</h2>
  {/if}
{:else}
  <slot winners={$game.splash} />
{/if}
