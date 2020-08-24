<script>
  export let minimized = false;
</script>

<style>
  nav {
    height: min-content;
    padding: 0 0 2vh;
  }

  div {
    width: max-content;
    user-select: none;

    transition: var(--quick-out);

    font-size: min(15vw, 12vh);
    margin-left: 50vw;
    transform: translateX(-50%);
  }

  div.minimized {
    font-size: min(5vw, 4vh);
    margin-left: 2vw;
    transform: translateX(0%);
  }

  .cursive {
    color: var(--yellow);
  }

  .serif {
    font-variant: small-caps;
    margin: 0 3% 0 -3%;
  }
</style>

<nav>
  <div class:minimized>
    <span class="cursive">Cheeky</span>
    <span class="serif">pediA</span>
    <!-- <p class="sub">Check your sources.</p> -->
  </div>
</nav>

<slot />
