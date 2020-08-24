<script>
  export let room;
  export let client;
  export let game;

  import LiarPOV from "./liar/View.svelte";
  import GuesserPOV from "./guesser/View.svelte";
</script>

{#if $client.role === 'audience'}
  <!-- foo -->
{:else if $client.role === 'liar'}
  <LiarPOV {client} {room} {game} />
{:else}
  <GuesserPOV {room} {game} />
{/if}
