<script>
  import { client, room } from "./components/room";
  import { game } from "./components/game";

  import Room from "./components/Room.svelte";
  import RoleSelect from "./components/RoleSelect.svelte";
  import Game from "./components/Game.svelte";

  // styling
  import Header from "./components/Header.svelte";
</script>

<style>
  main {
    width: 100%;
    height: 100vh;
    
    display: flex;
    flex-direction: column;
  }
</style>

<svelte:head>

  <script src="https://kit.fontawesome.com/6d495571ca.js" crossorigin="anonymous">

  </script>
</svelte:head>
<main>
  <Header minimized={$client.inRoom}>
    {#if $game && $game.started}
      <Game {client} {room} {game} />
    {:else}
      <Room {client} {room}>
        <RoleSelect {client} {room} />
      </Room>
    {/if}
  </Header>
</main>
