<script lang="ts">
  import PromptInterface from "./components/PromptInterface";
</script>

<main>
  <PromptInterface />
</main>

<style lang="scss">
  :root {
    @import "./styles/global.scss";
    background-color: $bg;
  }

  main {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
  }
</style>
