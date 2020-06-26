import Vue from "vue";
import Vuex from "vuex";
import Cookie from "cookie_js";
import app from "./modules/app.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app
  }
});
