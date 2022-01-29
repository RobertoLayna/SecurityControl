import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import lodash from 'lodash'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$_ = lodash

const options = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
};
Vue.use(Toast, options);
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
