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

  $: if ($room) $client.inRoom = true
</script>

<style>
  i {
    color: red;
  }
  i.disabled {
    filter: grayscale(80%);
  }

  main {
    height: 100%;
    width: 100%;
    max-width: 300px;

    margin: auto;

    display: flex;
    flex-direction: column;
  }

  .box {
    width: 100%;
    padding-bottom: 15%;
    margin: auto;

    display: flex;
    flex-direction: column;
  }

  .box > * {
    margin: 10px 0;
    border: 1px solid var(--grey);
    border-radius: 50px;

    text-align: center;
    font-size: 1.35rem;
  }

  .roomInput {
    background-color: var(--white);
    display: flex;
    max-width: 100%;

    transition: 0.1s;
  }
  .roomInput.inRoom {
    transform: translateY(-50%);
  }

  .roomInput > * {
    text-align: center;
    background-color: #0000;
    border: 0;

    font-size: 1.35rem;
    padding: 5px;
  }

  .roomInput > input {
    width: 86%;
  }

  .roomInput.inRoom > input {
    letter-spacing: 2px;
  }

  .roomInput > button {
    width: min-content;
  }

  .box > input {
    padding: 5px;
  }

  .box > button {
    padding: 5px;
    width: 80%;
    margin: 10px auto;
  }
</style>

<main>

  <div class="box">

    <div class="roomInput" class:inRoom={$client.inRoom}>
      <input
        class="roomID"
        bind:value={$client.roomID}
        disabled={$client.inRoom || $room}
        type="text"
        placeholder="Enter 4-letter room code" />

      {#if $client.inRoom}
        <button disabled={!$room} on:click={exit}>
          <i class:disabled={!$room} class="fas fa-times" />
        </button>
      {/if}
    </div>

    {#if !$client.inRoom}
      <input
        on:input={e => client.setName(e.target.value)}
        disabled={$client.inRoom}
        type="text"
        placeholder="Enter your name" />

      <button on:click={make}>Create room</button>
    {/if}

    {#if $room}
      <slot />
    {/if}

  </div>

</main>
