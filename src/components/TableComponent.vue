<template>

  <div class="table-component">
    <control-panel
      :tableDataLength="tableDataFull.length"
      ref="controlPanel"
    />
    <brand-table
      v-if="$refs.controlPanel"
      :header="$refs.controlPanel.sortedSelectedColumns"
      :content="tableData"
    />
    <preloader
      v-if="preloaderStateShow"
      class="preloader_big"
    />
  </div>
</template>
<script>
  import ControlPanel from "./ControlPanel.vue";
  import Preloader from "./Preloader.vue";

  export default {
    name: 'TableComponent',
    components: {
      ControlPanel,
      Preloader
    },
    mounted() {
      this.$store.dispatch('table/getProductList')
        .then(() => {
        })
        .catch(() => {
          this.$store.commit('addToBrandNotificationStack', {
            text: 'На сервере произошла ошибка, <br> повторите запрос позднее.',
            type: 'error'
          });
        })
        .finally(() => {
          this.preloaderStateShow = false;
        })
    },
    data() {
      return {
        preloaderStateShow: true
      }
    },
    computed: {
      showRowsValue() {
        return this.$store.getters["table/getShowRowsValue"]
      },
      showRowsCounter() {
        return this.$store.getters["table/getShowRowsCounter"]
      },
      showRowsStartValue() {
        return this.$store.getters["table/getShowRowsStartValue"]
      },
      tableDataFull() {
        return this.$store.getters["table/getProductList"];
      },
      tableData() {
        const start = this.showRowsValue;
        const end = this.showRowsValue + this.showRowsCounter;

        return this.tableDataFull.slice(start, end)
      }
    }
  }
</script>
<style lang="scss">
  .table-component {
    position: relative;
    flex: 1;
  }
</style>