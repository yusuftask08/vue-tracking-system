import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import ApiService from "./common/api.service";
import DateFilter from "./common/date.filter";
import ErrorFilter from "./common/error.filter";
import VueAxios from 'vue-axios'

Vue.config.productionTip = false;

Vue.filter("date", DateFilter);
Vue.filter("error", ErrorFilter);

ApiService.init();


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')