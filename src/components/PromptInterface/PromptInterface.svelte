<script lang="ts">
  const requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    (window as any)?.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };

  function handleGrab(status: boolean) {
    if (!scrollOpts.isScrolling) return;
    (status ? disableScroll : enableScroll)();
  }

  let contentIsMirrored = false;
  const toggleMirroredView = () => (contentIsMirrored = !contentIsMirrored);

  const enableScroll = () => {
    // if (!scrollOpts.isScrolling) return;
    scrollOpts.scrollElem &&
      (scrollOpts.scrollElem.scrollTop += scrollOpts.scrollSpeed);

    scrollOpts.scrollVal = requestAnimFrame(enableScroll);
  };

  const disableScroll = () => {
    cancelAnimationFrame(scrollOpts.scrollVal);
  };

  const toggleScroll = () => {
    scrollOpts.isScrolling = !scrollOpts.isScrolling;

    if (scrollOpts.isScrolling) {
      enableScroll();
    } else {
      disableScroll();
    }
  };

  import stub from "./stub";
  import { attachScrollDrag } from "./ScrollUtil";

  let scrollOpts: {
    scrollElem?: HTMLElement;
    isScrolling: boolean;
    scrollSpeed: number;
    scrollVal?: any;
  } = {
    isScrolling: false,
    scrollSpeed: 2,
  };
</script>

<button on:click={toggleMirroredView}>Mirror</button>
<button on:click={toggleScroll}
  >{scrollOpts.isScrolling ? "Stop" : "Start"} Scroll</button
>
<div class="interface">
  <header>
    <!-- Controls go here -->
    // controls here
  </header>
  <section class:mirrored={contentIsMirrored}>
    <!-- TODO: Edit mode -->
    <div
      class="content"
      bind:this={scrollOpts.scrollElem}
      use:attachScrollDrag={{
        grabStart() {
          handleGrab(true);
        },
        grabEnd() {
          handleGrab(false);
        },
      }}
    >
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
        scroll-behavior: smooth;

        position: absolute;
        top: 0;
        bottom: 0;

        overflow-y: scroll;
        cursor: grab;

        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE 10+ */

        &:global(.grabbing) {
          cursor: grabbing;
          scroll-behavior: auto;
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
