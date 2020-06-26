import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store";
import VueCompositionApi from '@vue/composition-api';
Vue.use(VueCompositionApi);
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/icons/index.js'  //svg组件
import '@/router/premit.js'
Vue.use(ElementUI);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
