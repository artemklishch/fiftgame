<template>
  <div class="gamewrap">
    <section class="gamewrap__gameblock">
      <BonesRow
        v-for="(row, index) in rows"
        :key="index"
        :itemsPerRow="row"
        :onGameHandler="onGameHandler"
      />
    </section>
    <section class="gamewrap__tools">
      <p class="gamewrap__tools_rules">
        Правила:<br />
        Необходимо упорядочить номера в блоке
        <span @click="getViewData('hor')">горизотнально</span> или
        <span @click="getViewData('vert')">вертикально</span>.<br />
        Чтоб начать игру, нажмите "Сбросить и начать игру"
      </p>
      <button
        @click="getMixData"
        class="gamewrap__tools_startBtn"
        type="button"
      >
        Сбросить и начать игру
      </button>
      <p>Прошло времени: {{ time.toLocaleTimeString() }}</p>
      <div v-if="win && !start" class="gamewrap__tools_finishMessage">
        Вы выиграли!
      </div>
    </section>
  </div>
</template>

<script>
import BonesRow from "./BonesRow.vue";
import onGameHandlerHelper from "../helpers/onGameHandler";
import { horData, vertData } from "../store/dataForGame";

export default {
  components: { BonesRow },
  data() {
    return {
      rows: JSON.parse(JSON.stringify(horData)),
      templateHor: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""],
      templateVert: [1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15, 4, 8, 12, ""],
      win: false,
      start: false,
      time: null,
      timer: false,
    };
  },
  created() {
    this.time = new Date(0, 0, 0);
  },
  methods: {
    onGameHandler(e, rowNum, cellNum) {
      if (
        e.path[0].className !== "row__bone_item" ||
        this.start === false ||
        (this.win === true && this.start === false)
      ) {
        return;
      }
      const updatedNum = Number(e.path[0].innerHTML);
      onGameHandlerHelper(this.rows, rowNum, cellNum, updatedNum);

      const identRowsData = this.rows.flat().map((el) => el.num);
      let isCorrectHorNums = true;
      let isCorrectVertNums = true;
      identRowsData.forEach((el, index) => {
        if (el !== this.templateHor[index]) isCorrectHorNums = false;
        if (el !== this.templateVert[index]) isCorrectVertNums = false;
      });
      if (isCorrectHorNums || isCorrectVertNums) {
        this.win = true;
        this.start = false;
        clearInterval(this.timer);
      }
    },
    getMixData() {
      this.win = false;
      this.start = true;
      this.time = new Date(0, 0, 0);
      this.rows.sort(() => Math.random() - 0.5);
      this.rows.forEach((arr) => arr.sort(() => Math.random() - 0.5));
      this.rows.forEach((data, index) => {
        data.forEach((item, i) => {
          item.row = index;
          item.cell = i;
        });
      });
      this.timer = setInterval(() => {
        this.time = new Date(this.time.setSeconds(this.time.getSeconds() + 1));
      }, 1000);
    },
    getViewData(viewtype) {
      this.start = false;
      this.win = false;
      clearInterval(this.timer);
      this.time = new Date(0, 0, 0);
      if (viewtype === "vert") {
        this.rows = JSON.parse(JSON.stringify(vertData));
      } else if (viewtype === "hor") {
        this.rows = JSON.parse(JSON.stringify(horData));
      }
    },
  },
};
</script>

<style scoped lang='scss'>
.gamewrap {
  display: flex;
  &__gameblock {
    width: 400px;
    height: 400px;
    background-color: #000;
  }
  &__tools {
    padding: 0 10px;
    &_rules {
      font-size: 14px;
      margin-bottom: 20px;
      span {
        color: blue;
        cursor: pointer;
        text-decoration: underline;
      }
    }
    &_startBtn {
      display: inline-block;
      padding: 10px 20px;
      border: none;
      background-color: red;
      color: #fff;
      text-transform: uppercase;
      cursor: pointer;
      border-radius: 5px;
      margin-bottom: 20px;
    }
    &_startBtn:hover {
      text-decoration: underline;
    }
    &_finishMessage {
      display: inline-block;
      padding: 20px 40px;
      color: #fff;
      background-color: blue;
      border-radius: 10px;
      margin-top: 20px;
      font-weight: 800;
    }
  }
}
</style>