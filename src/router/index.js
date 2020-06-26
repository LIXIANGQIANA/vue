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
    name: "register",
    hidden:true,
    meta:{
      name:'注册'
    },
    component: () =>import('../views/Register/register.vue')
  },
  {
    path:'/login',
    name:'login',
    hidden:true,
    meta:{
      name:'登陆'
    },
    component: ()=>import('../views/Login/login.vue')
  },
  {
    path:'/home',
    name:'home',
    hidden:false,
    redirect:'index',
    meta:{
      icon:'menu',
      name:'首页'
    },
    component: Layout,
    children:[
      {
        path:'/home/index',
        name:'index',
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
    name:'management',
    hidden:false,
    meta:{
      icon:'menu',
      name:'系统管理'
    },
    component: Layout,
    children:[
      {
        path:'/management/user',
        name:'user',
        meta:{
          name:'用户管理'
        },
        component: ()=>import('../views/Management/user.vue'),
      },
      {
        path:'/management/role',
        name:'role',
        meta:{
          name:'角色管理'
        },
        component: ()=>import('../views/Management/role.vue'),
      },
      {
        path:'/management/menu',
        name:'menu',
        meta:{
          name:'菜单管理'
        },
        component: ()=>import('../views/Management/menu.vue'),
      },
      {
        path:'/management/department',
        name:'department',
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
