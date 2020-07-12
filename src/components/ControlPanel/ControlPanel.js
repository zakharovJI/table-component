export default {
  props: {
    tableDataLength: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      sortActiveCol: this.$store.getters["table/getActiveSortCol"],
      selectedColumns: this.$store.getters['table/getProductParameters'].map((item, index) => {
        return {
          ...item,
          basePosition: index + 1,
          tablePosition: index + 1
        }
      })
    }
  },
  watch: {
    sortActiveCol: function(newVal) {
      this.$store.commit('table/setActiveSortCol', newVal);

      this.selectedColumns = this.selectedColumns.map(x => {
        return {
          ...x,
          tablePosition: x.basePosition,
        }
      });

      this.selectedColumns.find(x => x.value === newVal).tablePosition = 0;
    }
  },
  computed: {
    productParameters() {
      return this.$store.getters['table/getProductParameters'].map((item, index) => {
        return {
          ...item,
          basePosition: index + 1,
          tablePosition: index + 1
        }
      })
    },
    sortedSelectedColumns() {
      return this.selectedColumns.sort((a, b) => a.basePosition - b.basePosition)
    },
    showingRows() {
      return this.$store.getters['table/getShowingRows'];
    },
    selectedRows() {
      return this.$store.getters["table/getSelectedRows"]
    },
    showRowsValue() {
      return this.$store.getters["table/getShowRowsValue"]
    },
    showRowsCounter() {
      return this.$store.getters["table/getShowRowsCounter"]
    },
    tempShowPage() {
      return this.$store.getters["table/getShowRowsStartValue"]
    }
  },
  methods: {
    showRowSelected(value) {
      this.$store.commit("table/setShowRowsCounter", value);
      this.$refs.rowSelect.toggleDropdown();
    },
    paginationBtnClicked(type) {
      this.$store.commit("table/removeAllFromSelectedRows");

      if (type === 'prev') {
        if (this.showRowsValue - this.showRowsCounter > 0) {
          // this.$store.commit("table/setShowRowsCounter", this.showRowsValue);
          this.$store.commit("table/setShowRowsValue", this.showRowsValue - this.showRowsCounter);
        } else {
          this.$store.commit("table/setShowRowsValue", 0);
        }
      } else {
        if (this.showRowsValue + this.showRowsCounter < this.tableDataLength) {
          console.log(123123)
          // this.$store.commit("table/setShowRowsCounter", this.showRowsValue);
          this.$store.commit("table/setShowRowsValue", this.showRowsValue + this.showRowsCounter);
        }
      }
    },
    columnSelected(e, params) {
      if (params.value) {
        this.selectedColumns = this.selectedColumns.filter(x => x.value !== params.name);

        if (!this.selectedColumns.find(x => x.value === this.sortActiveCol)) {
          this.sortActiveCol = this.selectedColumns[0]?.value
        }
      } else {
        this.selectedColumns.push(this.productParameters.find(x => x.value === params.name))
      }

      this.$refs.selectAllCheckbox.stateChecked = this.sortedSelectedColumns.length === this.productParameters.length;
    },
    allColumnSelected(e, params) {
      if (params.value) {
        this.$refs.showRowsCheckbox.forEach(item => {
          item.stateChecked = false
        });

        this.selectedColumns = [];
      } else {
        this.$refs.showRowsCheckbox.forEach(item => {
          item.stateChecked = true
        });

        this.selectedColumns = this.productParameters;
      }
    },
    getPartCheckboxState() {
      return this.sortedSelectedColumns.length !== this.productParameters.length &&
        this.sortedSelectedColumns.length !== 0;
    }
  }
}