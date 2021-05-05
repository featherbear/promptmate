<script lang="ts">
  let contentIsMirrored = false;
  const toggleMirroredView = () => (contentIsMirrored = !contentIsMirrored);

  import stub from "./stub";
  import { attachScrollDrag } from "./ScrollUtil";
</script>

<!-- <button on:click={toggleMirroredView} /> -->
<div class="interface">
  <header>
    <!-- Controls go here -->
    // controls here
  </header>
  <section class:mirrored={contentIsMirrored}>
    <!-- TODO: Edit mode -->
    <div class="content" use:attachScrollDrag>
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

    header,
    footer {
      user-select: none;
    }

    section {
      flex: 1;
      position: relative;

      .content {
        // scroll-behavior: smooth;

        position: absolute;
        top: 0;
        bottom: 0;

        overflow-y: scroll;
        cursor: grab;

        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* Internet Explorer 10+ */

        &:global(.grabbing) {
          cursor: grabbing;
          user-select: none;
        }

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
