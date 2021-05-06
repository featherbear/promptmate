<script lang="ts">
  import stub from "./stub";

  const requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    (window as any)?.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };

  let options: {
    fontSize: number;
  } = {
    fontSize: 48,
  };

  let scrollOpts: {
    isScrolling: boolean;
    scrollSpeed: number;
    scrollVal?: any;
  } = {
    isScrolling: false,
    scrollSpeed: 2,
  };

  function handleGrab(status: boolean) {
    if (!scrollOpts.isScrolling) return;
    (status ? disableScroll : enableScroll)();
  }

  const enableScroll = () => {
    // if (!scrollOpts.isScrolling) return;
    viewElem && (viewElem.scrollTop += scrollOpts.scrollSpeed);

    scrollOpts.scrollVal = requestAnimFrame(enableScroll);
  };

  const disableScroll = () => {
    cancelAnimationFrame(scrollOpts.scrollVal);
  };

  let viewElem;
  const toggleScroll = () => {
    scrollOpts.isScrolling = !scrollOpts.isScrolling;

    if (scrollOpts.isScrolling) {
      enableScroll();
    } else {
      disableScroll();
    }
  };

  import { attachScrollDrag } from "./ScrollUtil";
  import NumberPicker from "../NumberPicker";
  import App from "../../App.svelte";

  let FS;
  let contentIsMirrored = false;
  const toggleMirroredView = () => (contentIsMirrored = !contentIsMirrored);
</script>

<div class="interface">
  <header>
    <button on:click={toggleMirroredView}>Mirror</button>
    <button on:click={toggleScroll}
      >{scrollOpts.isScrolling ? "Stop" : "Start"} Scroll</button
    >

    <NumberPicker inputClickable={true} />

    <!-- <select>
      <option value="...">...</option>
    </select>

    <div>
      <label for="ctrl_fontSize">Font Size</label>
      <input id="ctrl_fontSize" type="number" bind:value={options.fontSize} />
    </div> -->
  </header>
  <section class:mirrored={contentIsMirrored}>
    <!-- TODO: Edit mode -->
    <div
      class="content"
      bind:this={viewElem}
      on:mousedown={({ buttons }) =>
        [1, 4].includes(buttons) && handleGrab(true)}
      on:mouseup={() => handleGrab(false)}
      use:attachScrollDrag
      style={`font-size: ${options.fontSize}px`}
    >
      {stub}
    </div>
    <!-- Main teleprompter content go here -->
  </section>
  <footer>
    <!-- Do we need a footer -->
    Document Name
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
