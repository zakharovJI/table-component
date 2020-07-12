import Vue from 'vue'
import Vuex from 'vuex'
import table from "./modules/table"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    brandNotificationStack: [],
  },
  getters: {
    getBrandNotificationStack: state => state.brandNotificationStack,
  },
  mutations: {
    addToBrandNotificationStack(state, data = {}) {
      let reducer = () => {
        state.brandNotificationStack.pop();

        if (state.brandNotificationStack.length === 0) {
          clearTimeout(reducer);
        }
      }

      state.brandNotificationStack.push(data);

      setTimeout(reducer, 3000)
    },
  },
  actions: {
  },
  modules: {
    table
  }
})
