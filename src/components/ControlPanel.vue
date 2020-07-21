<template>
  <div class="control-panel">
    <div class="control-panel__block">
      <span class="control-panel__title"> Sorting by: </span>
      <div class="control-panel__sorting">
        <template v-for="item in sortedSelectedColumns">
          <input
            class="control-panel__label"
            v-model="sortActiveCol"
            :value="item.value"
            :id="item.value"
            type="radio"
            name="sorting"
            hidden
          />
          <label :for="item.value"> {{ item.name }} </label>
        </template>
      </div>
    </div>
    <div class="control-panel__block">
      <brand-button
        text="Delete"
        :disable="!selectedRows.length"
        :recursive="true"
        :delete="true"
        :deleteObject="selectedRows"
      >
        <template
          v-if="selectedRows.length"
          v-slot:append
        >
          <span>  &nbsp; ({{ selectedRows.length}}) </span>
        </template>
      </brand-button>
    </div>
    <div class="control-panel__block">
      <brand-dropdown
        v-model="showRowsValue"
        :label="showingRows.find(x => x.value === showRowsCounter).name"
        ref="rowSelect"
      >
        <template v-slot:dropdown-list>
          <div
            class="brand-dropdown__dropdown-item"
            v-for="item in showingRows"
            :key="item.value"
            @click="showRowSelected(item.value)"> {{ item.name }}
          </div>
        </template>
      </brand-dropdown>
    </div>
    <div class="control-panel__block control-panel__block_pagination">
      <brand-button
        text=""
        :secondary="true"
        :squared="true"
        @click="paginationBtnClicked('prev')"
      >
        <template v-slot:append>
          <svg class="brand-button__icon brand-button__icon_left">
            <use xlink:href="#chevron-down"/>
          </svg>
        </template>
      </brand-button>
      <span class="control-panel__text">
            <strong> {{ showRowsValue + 1}} - </strong>
            <strong> {{ showRowsValue + showRowsCounter + ' '}} </strong>
            <span> of </span>
            <strong> {{ ' ' + tableDataLength }} </strong>
          </span>
      <brand-button
        text=""
        :secondary="true"
        :squared="true"
        @click="paginationBtnClicked('next')"
      >
        <template v-slot:append>
          <svg class="brand-button__icon brand-button__icon_right">
            <use xlink:href="#chevron-down"/>
          </svg>
        </template>
      </brand-button>
    </div>
    <div class="control-panel__block">
      <brand-dropdown :label="sortedSelectedColumns.length + ' columns selected'">
        <template v-slot:dropdown-list>
          <div class="brand-dropdown__dropdown-item brand-dropdown__no-padding brand-dropdown__all">
            <brand-checkbox
              class="brand-dropdown__checkbox"
              :class="{'brand-checkbox_part' : getPartCheckboxState()}"
              :checked="true"
              :object="{name: 'Select all', value: 'all'}"
              @click="allColumnSelected($event, ...arguments)"
              ref="selectAllCheckbox"
            />
          </div>
          <div
            class="brand-dropdown__dropdown-item brand-dropdown__no-padding"
            v-for="item in productParameters"
            :key="item.value"
          >
            <brand-checkbox
              class="brand-dropdown__checkbox"
              ref="showRowsCheckbox"
              :checked="true"
              :object="item"
              @click="columnSelected($event, ...arguments)"
            />
          </div>
        </template>
      </brand-dropdown>
    </div>
  </div>
</template>
<script>
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
      sortActiveCol: function (newVal) {
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
</script>
<style lang="scss">
  .control-panel {
    $self: &;
    display: flex;

    &__block {
      display: flex;
      align-items: center;
      height: max-content;

      &:not(:last-child) {
        margin-right: 20px;
      }

      &:first-child {
        margin-right: auto;
      }

      &_pagination {
        & #{$self}__text {
          margin: 0 8px;
        }
      }
    }

    &__title {
      font-weight: 600;
      color: $secondary-text-color;
      margin-right: 8px;
    }

    &__sorting {
      height: 32px;
      display: flex;
      align-items: center;

      & #{$self}__label {
        color: $primary-text-color;
        padding: 4px 8px;
        border-radius: 2px;
        cursor: pointer;
        transition: all $base-interval linear;
        user-select: none;

        &:not(:last-child) {
          margin-right: 3px;
        }
      }

      input:checked {
        & + #{$self}__label {
          background-color: $primary-button-bg;
          color: $light;
        }
      }
    }
  }
</style>