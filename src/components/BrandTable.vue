<template>
  <div :class="$style['brand-table']">
    <table>
      <thead>
        <tr>
          <th>
            <brand-checkbox
              :class="[{'brand-checkbox_part' : getPartCheckboxState()}, $style['brand-checkbox']]"
              :checked="false"
              :object="{name: '', value: 'all'}"
              @click="allColumnSelected($event, ...arguments)"
              ref="selectAllCheckbox"
            />
          </th>
          <th
            v-for="head in sortedHeader"
            :key="head.value"
            :class="{ [$style.sorting] : !!checkSortingCol(head.value),
            [$style.product] : head.value === 'product',
            [$style.sorting_reverse] : !!checkSortingCol(head.value) && sortingFlag}"
            @[checkSortingCol(head.value)]="sortData(sortingFlag, true)"
          >
            <div :class="$style.data"> {{ head.name }}
              <svg :class="$style.icon">
                <use xlink:href="#arrow-down"/>
              </svg>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in sortedTableData"
          :key="row.id+'-row'"
        >
          <td>
            <brand-checkbox
              :class="$style['brand-checkbox']"
              :object="row"
              @click="columnSelected(row)"
              ref="showRowsCheckbox"
            />
          </td>
          <td
            v-for="(item, index) in sortedHeader"
            :key="item.value+index+'-td'"
          >
            <div :class="$style.data"> {{ row[item.value] }}
              <brand-button
                v-if="sortedHeader.indexOf(item) === sortedHeader.length - 1"
                :class="$style['brand-button']"
                :secondary="true"
                :withoutBorder="true"
                :recursive="true"
                :delete="true"
                :deleteObject="row"
                text="Delete"
              >
                <template v-slot:prepend>
                  <svg class="brand-button__icon brand-button__icon_prepend">
                    <use xlink:href="#trash" />
                  </svg>
                </template>
              </brand-button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <preloader
        v-if="preloaderStateShow"
        class="preloader_big"
    />
  </div>
</template>
<script>
  import { createNamespacedHelpers } from "vuex"
  import Preloader from "./Preloader.vue";
  const { mapState } = createNamespacedHelpers('table');

  export default {
    name: 'BrandTable',
    components: {
      Preloader
    },
    props: {
      header: {
        type: Array,
        required: true
      },
    },
    data() {
      return {
        productList: this.$store.getters['table/getSortedProductList'](false),
        sortingFlag: false,
        preloaderStateShow: false
      }
    },
    computed: {
      ...mapState([
        'sortActiveCol',
        'selectedRows',
        'showRowsValue',
        'showRowsCounter'
      ]),
      sortedHeader() {
        return this.header.slice().sort((a, b) => a.tablePosition - b.tablePosition);
      },
      sortedTableData() {
        const start = this.showRowsValue;
        const end = this.showRowsValue + this.showRowsCounter;

        return this.productList.slice(start, end)
      },
      productListLength() {
        return this.$store.getters['table/getProductListLength']
      }
    },
    watch: {
      sortActiveCol: function (newVal) {
        this.sortData(false);
        this.sortingFlag = true;
      },
      showRowsCounter: function (newVal, oldVal) {
        if (newVal > oldVal) {
          this.$refs.selectAllCheckbox.stateChecked = false;
        } else {
          this.selectedRows.forEach(row => {
            if (!this.sortedTableData.includes(row)) {
              this.$store.dispatch("table/deleteFromSelectedRows", row);
            }
          })

          if (this.selectedRows.length === this.sortedTableData.length) {
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
      },
      productListLength: function () {
        this.sortData(!this.sortingFlag);
      }
    },
    methods: {
      checkTableDataShowing(value) {
        return !!this.sortedHeader.find(x => x.value === value);
      },
      getPartCheckboxState() {
        return this.selectedRows.length !== this.sortedTableData.length && this.selectedRows.length !== 0;
      },
      allColumnSelected() {
        if (this.$refs.selectAllCheckbox.stateChecked) {
          this.$store.dispatch("table/deleteAllFromSelectedRows");

          this.$refs.showRowsCheckbox.forEach(checkBox => {
            checkBox.stateChecked = false;
          });
        } else {
          this.$store.dispatch("table/addAllToSelectedRows", this.sortedTableData)

          this.$refs.showRowsCheckbox.forEach(checkBox => {
            checkBox.stateChecked = true;
          });
        }
      },
      columnSelected(row) {
        if (this.selectedRows.includes(row)) {
          this.$store.dispatch("table/deleteFromSelectedRows", row)
        } else {
          this.$store.dispatch("table/addToSelectedRows", row)
        }

        this.$refs.selectAllCheckbox.stateChecked = this.selectedRows.length === this.sortedTableData.length;
      },
      checkSortingCol(name) {
        if (name === this.sortActiveCol) {
          return 'click';
        }

        return null;
      },
      sortData(flag = this.sortingFlag, changeFlag = false) {
        this.productList = this.$store.getters['table/getSortedProductList'](flag);

        if (changeFlag) {
          this.sortingFlag = !this.sortingFlag;
        }
      }
    }
  }
</script>
<style module lang="scss">
  .brand-table {
    $self: &;

    width: 100%;
    border: 1px solid $gray;
    border-radius: 4px;


    table {
      background: $light;
      border-collapse: collapse;
      width: 100%;
      color: $primary-text-color;

      .brand-checkbox {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }

      .data {
        display: flex;
        align-items: center;
      }
    }

    thead {
      th {
        text-align: left;
        padding: 16px 0;
        border-bottom: 1px solid $gray;
        position: relative;

        &:not(:first-child), &:not(:last-child) {
          width: 155px;
        }

        &:first-child {
          width: 69px;
          padding-left: 36px;
        }

        .icon {
          opacity: 0;
          width: 8px;
          height: 12px;
          color: $primary-text-color;
          transform: rotate(180deg);
          margin-left: 7px;
        }

        &.sorting {
          color: $primary-button-bg;
          cursor: pointer;
          user-select: none;

          .icon {
            opacity: 1;
          }

          &_reverse {
            .icon {
              transform: none;
            }
          }
        }

        &.product {
          width: 192px;
        }
      }
    }

    tbody {
      tr {
        transition: all $base-interval linear;

        .brand-button {
          transition: opacity $base-interval linear;
          opacity: 0;
          margin-left: auto;
        }

        &.selected {
          font-weight: bold;
        }

        &:nth-child(2n) {
          background-color: $primary-row-bg;
        }

        &:hover {
          background-color: $secondary-row-bg;

          .brand-button {
            opacity: 1;
          }
        }
      }

      td {
        text-align: left;
        padding: 13px 0;
        position: relative;

        &:first-child {
          //width: 80px;
          padding-left: 36px;
        }

        &:last-child {
          padding-right: 36px;
        }
      }
    }
  }
</style>