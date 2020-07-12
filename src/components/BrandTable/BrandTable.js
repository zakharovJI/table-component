export default {
  name: 'BrandTable',
  props: {
    header: {
      type: Array,
      required: true
    },
    content: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      tableData: this.content,
      sortingFlag: true
    }
  },
  computed: {
    sortActiveCol() {
      return this.$store.getters["table/getActiveSortCol"];
    },
    sortedHeader() {
      return this.header.slice().sort((a, b) => a.tablePosition - b.tablePosition);
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
  },
  watch: {
    sortActiveCol: function (newVal) {
      this.sortData(true);
      this.sortingFlag = false;
    },
    content: function (newVal) {
      this.tableData = newVal;
      this.sortData(true);
    },
    showRowsCounter: function (newVal, oldVal) {
      if (newVal > oldVal) {
        this.$refs.selectAllCheckbox.stateChecked = false;
      } else {
        this.selectedRows.forEach(row => {
          if (!this.tableData.includes(row)) {
            this.$store.commit("table/removeFromSelectedRows", row);
          }
        })

        if (this.selectedRows.length === this.tableData.length) {
          this.$refs.selectAllCheckbox.stateChecked = true;
        }
      }
    },
    showRowsValue: function () {
      this.$refs.selectAllCheckbox.stateChecked = false;
    },
    selectedRows: function (newVal) {
      if (!newVal?.length) {
        this.$refs.selectAllCheckbox.stateChecked = false;
      }
    }
  },
  methods: {
    checkTableDataShowing(value) {
      return !!this.sortedHeader.find(x => x.value === value);
    },
    getPartCheckboxState() {
      return this.selectedRows.length !== this.tableData.length && this.selectedRows.length !== 0;
    },
    allColumnSelected() {
      if (this.$refs.selectAllCheckbox.stateChecked) {
        this.$store.commit("table/removeAllFromSelectedRows");

        this.$refs.showRowsCheckbox.forEach(checkBox => {
          checkBox.stateChecked = false;
        });
      } else {
        this.$store.commit("table/addAllToSelectedRows", this.tableData)

        this.$refs.showRowsCheckbox.forEach(checkBox => {
          checkBox.stateChecked = true;
        });
      }
    },
    columnSelected(row) {
      if (this.selectedRows.includes(row)) {
        this.$store.commit("table/removeFromSelectedRows", row)
      } else {
        this.$store.commit("table/addToSelectedRows", row)
      }

      this.$refs.selectAllCheckbox.stateChecked = this.selectedRows.length === this.tableData.length;
    },
    checkSortingCol(name) {
      if (name === this.sortActiveCol) {
        return 'click';
      }

      return null;
    },
    sortData(flag = this.sortingFlag) {
      const sortingCol = this.sortActiveCol;

      if (flag && this.sortActiveCol === 'product') {
        this.tableData = this.tableData.slice().sort((a, b) => a[sortingCol]?.toString().localeCompare(b[sortingCol]?.toString()))
      } else {
        this.tableData = this.tableData.slice().sort((a, b) => b[sortingCol]?.toString().localeCompare(a[sortingCol]?.toString()))
      }

      if (flag && this.sortActiveCol !== 'product') {
        this.tableData = this.tableData.slice().sort((a, b) => a[sortingCol] - b[sortingCol])
      } else {
        this.tableData = this.tableData.slice().sort((a, b) => b[sortingCol] - a[sortingCol])
      }

      this.sortingFlag = !this.sortingFlag;
    }
  }
}