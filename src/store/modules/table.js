import {getProducts, deleteProducts} from "../../api/request"

const state = {
  productList: [],
  sortActiveCol: null,
  selectedRows: [],
  showRowsValue: 0,
  showRowsCounter: 10,
  showRowsStartValue: 0,

};

const getters = {
  getSortedProductList: state => flag => {
    const sortingCol = state.sortActiveCol;

    if (sortingCol === 'product') {
      if (flag && sortingCol) {
        console.log(1)
        return state.productList.slice().sort((a, b) => a[sortingCol]?.toString().localeCompare(b[sortingCol]?.toString()))
      } else {
        console.log(2)
        return state.productList.slice().sort((a, b) => b[sortingCol]?.toString().localeCompare(a[sortingCol]?.toString()))
      }
    } else {
      if (flag && sortingCol) {
        console.log(3)
        return state.productList.slice().sort((a, b) => a[sortingCol] - b[sortingCol])
      } else {
        console.log(4)
        return state.productList.slice().sort((a, b) => b[sortingCol] - a[sortingCol])
      }
    }

    if (!sortingCol) {
      return state.productList;
    }
  },
  getProductListLength: state => state.productList.length
}

const mutations = {
  SET_PRODUCT_LIST(state, productList) {
    state.productList = productList;
  },
  DELETE_PRODUCT(state, product) {
    state.productList = state.productList.filter(x => ![product].flat().includes(x));
  },
  SET_ACTIVE_SORT_COL(state, columnName) {
    state.sortActiveCol = columnName;
  },
  ADD_TO_SELECTED_ROWS(state, row) {
    state.selectedRows.push(row);
  },
  DELETE_FROM_SELECTED_ROWS(state, row) {
    state.selectedRows = state.selectedRows.filter(x => x !== row);
  },
  ADD_ALL_TO_SELECTED_ROWS(state, rowList) {
    state.selectedRows = rowList;
  },
  DELETE_ALL_FROM_SELECTED_ROWS(state) {
    state.selectedRows = [];
  },
  SET_SHOW_ROWS_VALUE(state, value) {
    state.showRowsValue = value;
  },
  SET_SHOW_ROWS_COUNTER(state, value) {
    state.showRowsCounter = value;
  },

};

const actions = {
  async getProductList({commit}) {
    await getProducts()
      .then(resp => {
        commit('SET_PRODUCT_LIST', resp);
      })
      .catch(() => {
        return new Promise(async (resolve, reject) => {
          await getProducts()
            .then(resp => {
              commit('SET_PRODUCT_LIST', resp);
              resolve()
            })
            .catch(() => {
              reject()
            })
        })
      })
  },

  async deleteProduct({commit}, product) {
    await deleteProducts()
      .then(() => {
        commit('DELETE_PRODUCT', product)
      })
      .catch((resp) => {
        return new Promise((resolve, reject) => {
          reject()
        })
      })
  },

  setActiveSortCol({commit}, columnName) {
    commit('SET_ACTIVE_SORT_COL', columnName);
  },

  addToSelectedRows({commit}, row) {
    commit('ADD_TO_SELECTED_ROWS', row);
  },

  deleteFromSelectedRows({commit}, row) {
    commit('DELETE_FROM_SELECTED_ROWS', row);
  },

  addAllToSelectedRows({commit}, rowList) {
    commit('ADD_ALL_TO_SELECTED_ROWS', rowList);
  },

  deleteAllFromSelectedRows({commit}) {
    commit('DELETE_ALL_FROM_SELECTED_ROWS');
  },

  setShowRowsValue({commit}, value) {
    commit('SET_SHOW_ROWS_VALUE', value);
  },

  setShowRowsCounter({commit}, counter) {
    commit('SET_SHOW_ROWS_COUNTER', counter);
  },
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};