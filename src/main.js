import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import './custom.scss'

import App from './App.vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false

window.songs = []
window.currentSong = {
  filename: ""
}
document.addEventListener("DOMContentLoaded",function(){
  
})

new Vue({
  render: h => h(App),
}).$mount('#app')
