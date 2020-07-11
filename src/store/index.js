import Vue from 'vue'
import Vuex from 'vuex'
import {getProducts, deleteProducts} from "../api/request"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    productList: [],
  },
  getters: {
    getProductList: () => state.productList,
  },
  mutations: {
    setProductList(state, productList) {
      state.productList = productList;
    },
    deleteProduct(state, index) {
      state.productList = state.productList.filter(x => x !== state.productList[index]);
    }
  },
  actions: {
    async getProductList({commit}) {
      await getProducts()
        .then(resp => {
          commit('setProductList', resp);
        })
        .catch(() => {

        })
    },

    async deleteProduct({commit}, index) {
      await deleteProducts()
        .then(() => {
          commit('deleteProduct', index)
        })
        .catch(() => {

        })
    }
  },
  modules: {
  }
})
