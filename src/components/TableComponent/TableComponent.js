import ControlPanel from "../ControlPanel/ControlPanel.vue";
import Preloader from "../Preloader/Preloader.vue";

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