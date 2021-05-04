<script lang="ts">
  let contentIsMirrored = false;
  const toggleMirroredView = () => (contentIsMirrored = !contentIsMirrored);
</script>

<button on:click={toggleMirroredView} />
<div class="interface">
  <header>
    <!-- Controls go here -->
  </header>
  <section class:mirrored={contentIsMirrored}>
    <!-- Main teleprompter content go here -->
  </section>
  <footer>
    <!-- Do we need a footer -->
  </footer>
</div>

<style lang="scss">
  .interface {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;

    section {
      flex: 1;

      &.mirrored {
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
      }
    }
  }
</style>
