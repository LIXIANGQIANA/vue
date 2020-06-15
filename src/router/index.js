import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    redirect:'login',
  },
  {
    path:'/login',
    name:'Login',
    component: ()=>import('../views/Login/login.vue')
  },
  {
    path: "/register",
    name: "Register",
    component: () =>import('../views/Register/register.vue')
  },
];

const router = new VueRouter({
  routes
});

export default router;
