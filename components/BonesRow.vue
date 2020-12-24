<template>
  <div class="row">
    <div
      v-for="item in itemsPerRow"
      :key="item.cell"
      class="row__bone"
      @click="onGameHandler($event, item.row, item.cell)"
    >
      <span class="row__bone_item" v-if="item.num">
        {{ item.num }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemsPerRow: {
      type: Array,
      required: true,
    },
    onGameHandler: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style scoped lang='scss'>
.row {
  height: 100px;
  display: flex;
  width: 100%;
  &__bone {
    outline: 1px solid red;
    width: 100px;
    span {
      display: inline-block;
      width: 100%;
      height: 100%;
      background-color: yellow;
      cursor: pointer;
      line-height: 100px;
      text-align: center;
      font-size: 30px;
    }
    span:hover {
      background-color: lightyellow;
    }
  }
}
</style>