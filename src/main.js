import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css"
import lodash from 'lodash'
import moment from 'moment'
import "regenerator-runtime/runtime.js";
import VueHtml2Canvas from 'vue-html2canvas'
require("babel-polyfill");

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$_ = lodash
Vue.prototype.$moment = moment

const options = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
};
Vue.use(Toast, options);
Vue.use(VueHtml2Canvas);
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
