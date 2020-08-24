<script>
  export let room;
  export let client;

  function make() {
    room.make();
    $client.inRoom = true;
  }

  function exit() {
    room.exit();
    $client.inRoom = false;
  }
</script>

<div class:inRoom={$client.inRoom}>

  {#if !$client.inRoom && !$room}
    <input on:input={e => client.setName(e.target.value)} disabled={$client.inRoom} type="text" placeholder="name" />
  {/if}

  <div class="roomInput">
    <input class="roomID" bind:value={$client.roomID} disabled={$client.inRoom || $room} type="text" placeholder="room id" />

    {#if $room && $client.inRoom}
      <button on:click={exit}>exit room</button>
    {:else if $client.inRoom}
      <button disabled={true}>exit room</button>
    {/if}
  </div>

  {#if !$client.inRoom && !$room}
    <button on:click={make}>create room</button>
  {/if}

  {#if $room}
    <slot />
  {/if}

</div>
