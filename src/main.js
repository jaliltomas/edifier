import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'
import router from './router'
import './plugins/font-awesome'
import vuetify from './plugins/vuetify'
import './plugins/vee-validate'
import './plugins/snotify'
import './plugins/crypto'

import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

// Font awesome end
// filtros
import filters from "./filters";
Vue.use(filters);

Vue.config.productionTip = false

store.dispatch('auth/TRY_AUTO_LOGIN');

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
