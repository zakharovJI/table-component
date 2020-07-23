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
    addToBrandNotificationStack({ state, commit }, data = {}) {

    }
  },
  modules: {
    table
  }
})
