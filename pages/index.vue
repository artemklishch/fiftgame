<template>
  <div class="container">
    <GameBlock />
  </div>
</template>

<script>
import GameBlock from "../components/GameBlock";

export default {
  components: {
    GameBlock,
  },
};
</script>

<style lang='scss'>
.container {
  background-color: lightblue;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
