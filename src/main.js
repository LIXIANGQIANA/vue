import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store";
import VueCompositionApi from '@vue/composition-api';
Vue.use(VueCompositionApi);
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/icons/index.js'  //svg全局组件
import '@/router/premit.js'
import global from  '@/utils/global.js'
Vue.use(ElementUI);
Vue.use(global);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
