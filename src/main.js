import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
import vuetify from './plugins/vuetify';

Vue.prototype.$http = axios

Vue.use(require('vue-moment'));


import vueNumeralFilterInstaller from 'vue-numeral-filter';

Vue.use(vueNumeralFilterInstaller, { locale: 'fr' });

import VueParallaxJs from 'vue-parallax-js'

// add vue-parallax-js to vue
Vue.use(VueParallaxJs)

Vue.config.productionTip = false


new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
