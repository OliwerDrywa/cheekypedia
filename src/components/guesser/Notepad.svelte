<script>
  export let notes = {};
  export let currentPlayer;
</script>

<textarea bind:value={notes[currentPlayer.uid]} />
