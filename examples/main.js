import Vue from 'vue'
import App from './App.vue'
import TurnTable from '@kafan/vue-turntable'
import '@kafan/vue-turntable/lib/index.css'

Vue.config.productionTip = false

Vue.use(TurnTable)

Vue.prototype.$TurnTable = TurnTable

new Vue({
  render: h => h(App),
}).$mount('#app')
