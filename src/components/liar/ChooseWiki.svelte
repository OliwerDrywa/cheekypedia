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

{#if !articleChosen}
  {#await articles[pointer]}
    <!-- TODO -->
    loading
  {:then wiki}
    <embed src={wiki.url} on:load={articleDoneLoading} />
  {/await}

  <nav>
    <button on:click={prev}>{'<'}</button>
    <button disabled={articleLoading} on:click={confirm}>confirm</button>
    <button on:click={next}>{'>'}</button>
  </nav>
{:else}
  <slot />
{/if}
