import Vue from 'vue'
import Vuex from 'vuex'
import table from "./modules/table"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    brandNotificationStack: [],
  },
  mutations: {
    ADD_TO_BRAND_NOTIFICATION_STACK(state, data) {
      state.brandNotificationStack.push(data);
    },
    DELETE_FROM_BRAND_NOTIFICATION_STACK(state) {
      state.brandNotificationStack.pop();
    },
  },
  actions: {
    addToBrandNotificationStack({ state, commit }, data = {}) {
      let reducer = () => {
        commit('DELETE_FROM_BRAND_NOTIFICATION_STACK');

        if (state.brandNotificationStack.length === 0) {
          clearTimeout(reducer);
        }
      }

      commit('ADD_TO_BRAND_NOTIFICATION_STACK', data)

      setTimeout(reducer, 3000)
    }
  },
  modules: {
    table
  }
})
