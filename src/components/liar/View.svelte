<script>
  export let room;
  export let client;
  export let game;
  
  import Explainer from "./Explainer.svelte";
  import ChooseWiki from "./ChooseWiki.svelte";
  import Splash from "./Splash.svelte";
</script>

<ChooseWiki {room} {client} {game}>
  <Explainer {game}>
    <Splash {game} />
  </Explainer>
</ChooseWiki>
