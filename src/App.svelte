<script>
  import { client, room } from "./components/room";
  import { game } from "./components/game";

  import Room from "./components/Room.svelte";
  import RoleSelect from "./components/RoleSelect.svelte";
  import Game from "./components/Game.svelte";

  // styling
  import Header from "./components/Header.svelte";
</script>

<Header minimized={$client.inRoom}>
  {#if $game && $game.started}
    <Game {client} {room} {game} />
  {:else}
    <Room {client} {room}>
      <RoleSelect {client} {room} />
    </Room>
  {/if}
</Header>
