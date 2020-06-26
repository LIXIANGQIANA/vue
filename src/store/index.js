import Vue from "vue";
import Vuex from "vuex";
import Cookie from "cookie_js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse:JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    isCollapses:JSON.parse(sessionStorage.getItem('isCollapses')) || false
  },
  getters:{},
  mutations: {
    SET_COLLAPSE:(state)=>{
      state.isCollapse=!state.isCollapse
      sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
    },
    SET_COLLAPSES:(state)=>{
      state.isCollapses=!state.isCollapses
      sessionStorage.setItem('isCollapses',JSON.stringify(state.isCollapses))
    }
    
  },
  actions: {},
  modules: {}
});
