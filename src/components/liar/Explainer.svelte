<script>
  export let game;
</script>

{#if !$game.splash}
  <p>convince the guesser this article is yours</p>
  {#if $game.selectedArticle}
    <h2>{$game.selectedArticle.title}</h2>
  {/if}
{:else}
  <slot winners={$game.splash} />
{/if}
