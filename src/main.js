import Vue from 'vue'
import App from './App.vue'
import store from './store'
import "./assets/symbols/icons"

Vue.config.productionTip = false;

let requireComponent = require.context('../src', true, /Brand[A-Z]\w+\.vue$/)
requireComponent.keys().forEach(function (fileName) {
  let baseComponentConfig = requireComponent(fileName)
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig
  let baseComponentName = baseComponentConfig.name || (
    fileName
      .replace(/^.+\//, '')
      .replace(/\.\w+$/, '')
  )
  Vue.component(baseComponentName, baseComponentConfig)
})


new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
