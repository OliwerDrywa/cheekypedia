<script>
  export let room;
  export let client;
  export let game;

  import { getWiki } from "../functions";
  import ChooseWiki from "./ChooseWiki.svelte";

  let articleChosen = false;
  let articles = [getWiki($game.lang), getWiki($game.lang)];

  let pointer = 0;

  let articleLoading = true;

  function articleDoneLoading() {
    articleLoading = false;
  }

  function prev() {
    articleLoading = true;
    if (pointer > 0) pointer -= 1;
  }

  function next() {
    articleLoading = true;
    pointer += 1;
    if (articles.length <= pointer + 1) articles = [...articles, getWiki($game.lang)];
  }

  async function confirm() {
    articleChosen = true;
    client.chooseArticle(await articles[pointer]);
  }
</script>

<style>
  embed {
    flex: 1;
  }
  nav {
    height: 6vh;
    display: flex;
  }
  button {
    flex: 1
  }
  .confirm {
    flex: 3;
  }
</style>

{#if !articleChosen}
  {#await articles[pointer]}
    <!-- TODO -->
    loading
  {:then wiki}
    <embed src={wiki.url} on:load={articleDoneLoading} />
  {/await}

  <nav>
    <button on:click={prev}>{'<'}</button>
    <button class="confirm" disabled={articleLoading} on:click={confirm}>Select</button>
    <button on:click={next}>{'>'}</button>
  </nav>
{:else}
  <slot />
{/if}
