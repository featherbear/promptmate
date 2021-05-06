<script lang="ts">
  export let value: number = 2;

  export let inputClickable: boolean = false;

  function handleDoubleClickInput() {}

  function handleSizeButton(isIncrease: boolean) {
    console.log("clik");
    if (isIncrease) {
      value += Number(pickerElem.step);
    } else {
      value -= Number(pickerElem.step);
    }
  }

  let pickerElem: HTMLInputElement;
</script>

<div>
  <button on:click={() => handleSizeButton(false)}>-</button>
  <input
    bind:this={pickerElem}
    type="number"
    min={1}
    step={2}
    class:clickable={inputClickable}
    on:dblclick={handleDoubleClickInput}
    bind:value
  />
  <button on:click={() => handleSizeButton(true)}>+</button>
</div>

<style lang="scss">
  @import "../../styles/global.scss";

  button {
    font-family: monospace;
    cursor: pointer;

    opacity: 0.8;
    transition: opacity 500ms;

    &:hover {
      opacity: 1;
    }
  }

  input {
    width: 15px;
    color: $text;
    background: transparent;
    padding: 0;
    margin: 0;
    text-align: center;
    border: none;
    cursor: default;
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &.clickable {
      cursor: pointer;
      border-bottom: 1px dashed grey;
    }
  }
</style>
