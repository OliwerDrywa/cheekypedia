<script>
  export let notes = {};
  export let currentPlayer;
</script>

<style>
  textarea {
    width: 90%;
    height: 90%;
    margin: auto;
    border-radius: 20px;
  }
</style>

<textarea bind:value={notes[currentPlayer.uid]} />
