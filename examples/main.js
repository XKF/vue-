import Vue from 'vue'
import App from './App.vue'
import TurnTable from '../packages/'
import '../packages/style/index.scss'

Vue.config.productionTip = false

Vue.use(TurnTable)

Vue.prototype.$TurnTable = TurnTable

new Vue({
  render: h => h(App),
}).$mount('#app')
