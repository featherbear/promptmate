<script lang="ts">
  let contentIsMirrored = false;
  const toggleMirroredView = () => (contentIsMirrored = !contentIsMirrored);

  import stub from "./stub";
</script>

<!-- <button on:click={toggleMirroredView} /> -->
<div class="interface">
  <header>
    <!-- Controls go here -->
    // controls here
  </header>
  <section class:mirrored={contentIsMirrored}>
    <!-- TODO: Edit mode -->
    <div class="content">
      {stub}
    </div>
    <!-- Main teleprompter content go here -->
  </section>
  <footer>
    <!-- Do we need a footer -->
    some footer text // file name blah blah
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

      position: relative;

      .content {
        position: absolute;
        top: 0;
        bottom: 0;

        overflow-y: scroll;

        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* Internet Explorer 10+ */

        &:-webkit-scrollbar {
          display: none;
        }
      }

      &.mirrored {
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
      }
    }
  }
</style>
