import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/Layout/index.vue";
Vue.use(VueRouter);
const routes = [
  
  {
    path: "/",
    redirect:'login',
    hidden:true,
    meta:{
      name:'主页'
    },
  },
  {
    path: "/register",
    name: "Register",
    hidden:true,
    meta:{
      name:'注册'
    },
    component: () =>import('../views/Register/register.vue')
  },
  {
    path:'/login',
    name:'Login',
    hidden:true,
    meta:{
      name:'登陆'
    },
    component: ()=>import('../views/Login/login.vue')
  },
  {
    path:'/home',
    name:'Home',
    hidden:false,
    meta:{
      icon:'menu',
      name:'首页'
    },
    redirect:'/home/index',
    component: Layout,
    children:[
      {
        path:'/home/index',
        name:'Index',
        hidden:false,
        meta:{
          name:'首页'
        },
        component: ()=>import('../views/Home/index.vue'),
      }
    ]
  },
  {
    path:'/management',
    name:'Management',
    hidden:false,
    meta:{
      icon:'menu',
      name:'系统管理'
    },
    component: Layout,
    children:[
      {
        path:'/management/user',
        name:'User',
        meta:{
          name:'用户管理'
        },
        component: ()=>import('../views/Management/user.vue'),
      },
      {
        path:'/management/role',
        name:'Role',
        meta:{
          name:'角色管理'
        },
        component: ()=>import('../views/Management/role.vue'),
      },
      {
        path:'/management/menu',
        name:'Menu',
        meta:{
          name:'菜单管理'
        },
        component: ()=>import('../views/Management/menu.vue'),
      },
      {
        path:'/management/department',
        name:'Department',
        meta:{
          name:'部门管理'
        },
        component: ()=>import('../views/Management/department.vue'),
      }
    ]
  },
];
const router = new VueRouter({
  routes,
  mode:'history',
});

export default router;
