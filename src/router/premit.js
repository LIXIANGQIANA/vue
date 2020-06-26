// 路由守卫
import router from "./index.js";
import {getToken,removeToken} from "@/utils/app.js";
const whiteRouter=['/login']
router.beforeEach((to ,from, next)=>{
    console.log(getToken());
    
   if(getToken()){
        console.log('存在');
        if(to.path === '/login'){
            removeToken()
            next()
        }else{

            next()
        }
        
   }else{
        if(whiteRouter.indexOf(to.path) !== -1){
            next()
        }else{
            next('/login')
        }
   }
})