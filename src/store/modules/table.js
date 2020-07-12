import {getProducts, deleteProducts} from "../../api/request"

const state = {
  productList: [],
  sortActiveCol: null,
  selectedRows: [],
  showRowsValue: 0,
  showRowsCounter: 10,
  showRowsStartValue: 0,
  productParameters: [
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
  showingRows: [
    {
      name: '10 Per Page',
      value: 10
    },
    {
      name: '15 Per Page',
      value: 15
    },
    {
      name: '20 Per Page',
      value: 20
    },
  ]
};

const getters = {
  getProductList: state => state.productList,
  getProductParameters: state => state.productParameters,
  getShowingRows: state => state.showingRows,
  getActiveSortCol: state => state.sortActiveCol,
  getSelectedRows: state => state.selectedRows,
  getShowRowsValue: state => state.showRowsValue,
  getShowRowsCounter: state => state.showRowsCounter,
  getShowRowsStartValue: state => state.showRowsStartValue
};


const mutations = {
  setProductList(state, productList) {
    state.productList = productList;
  },
  deleteProduct(state, product) {
    state.productList = state.productList.filter(x => ![product].flat().includes(x));
  },
  setActiveSortCol(state, columnName) {
    state.sortActiveCol = columnName;
  },
  addToSelectedRows(state, row) {
    state.selectedRows.push(row);
  },
  removeFromSelectedRows(state, row) {
    state.selectedRows = state.selectedRows.filter(x => x !== row);
  },
  addAllToSelectedRows(state, rowList) {
    state.selectedRows = rowList;
  },
  removeAllFromSelectedRows(state) {
    state.selectedRows = [];
  },
  setShowRowsValue(state, value) {
    state.showRowsValue = value;
  },
  setShowRowsCounter(state, value) {
    state.showRowsCounter = value;
  },
  setShowRowsStartValue(state, value) {
    state.showRowsStartValue = value;
  },
};

const actions = {
  async getProductList({commit}) {
    await getProducts()
      .then(resp => {
        console.log(1)
        commit('setProductList', resp);
      })
      .catch(() => {
        return new Promise(async (resolve, reject) => {
          await getProducts()
            .then(resp => {
              console.log(2)
              commit('setProductList', resp);
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
        commit('deleteProduct', product)
      })
      .catch((resp) => {
        return new Promise((resolve, reject) => {
          reject()
        })
      })
  }
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};