<template>

  <div class="table-component">
    <control-panel
      :tableDataLength="tableDataFull.length"
      :baseProductParameters="baseProductParameters"
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
  import { createNamespacedHelpers } from "vuex"
  const { mapState } = createNamespacedHelpers('table');

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
        preloaderStateShow: true,
        baseProductParameters: [
          {
            name: 'Product (100g serving)',
            value: 'product'
          },
          {
            name: 'Calories',
            value: 'calories'
          },
          {
            name: 'Fat (g)',
            value: 'fat'
          },
          {
            name: 'Carbs (g)',
            value: 'carbs'
          },
          {
            name: 'Protein (g)',
            value: 'protein'
          },
          {
            name: 'Iron (%)',
            value: 'iron'
          },
        ],
      }
    },
    computed: {
      ...mapState([
        'showRowsValue',
        'showRowsCounter',
      ]),
      ...mapState({
        tableDataFull: 'productList'
      }),
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