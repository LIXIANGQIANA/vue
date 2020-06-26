<template>
    <header class="header-wrap">
        <i @click="menuStatus"><svg-icon SvgClass="why" SvgName="menu"></svg-icon></i>
        <span>欢迎进入企业级快速开发平台</span>
        <div class="right">
            <span><i><svg-icon SvgClass="why" SvgName="seacher"></svg-icon></i></span>
            <span><i><svg-icon SvgClass="why" SvgName="why"></svg-icon></i></span>
            <span><i><svg-icon SvgClass="why" SvgName="lidang"></svg-icon></i></span>
            
            <span class="user">
                <span><img src="" alt=""></span>
                <span>欢迎您806169406@qq.com</span>
            </span>
            <span class="user">
                <i ><svg-icon SvgClass="why" SvgName="exits" ></svg-icon></i>
                <span>退出登陆</span>
            </span>
        </div>
    </header>         
</template>
<script>
import {reactive,ref,onMounted} from "@vue/composition-api";
export default {
    name:'',
    setup(props,{root}){
        const menuStatus=()=>{
          root.$store.commit('SET_COLLAPSE')
          
          
            
        }

        return{
            menuStatus
        }
    }
    
}
</script>
<style lang="scss" scoped>
    .header-wrap{
        
        padding-right: 12px;
        height: 59px;
        line-height: 59px;
        color: #fff;
        background-color: #1890ff;
    }
    .right{
        float: right;
    }  
   
    .menu{
        margin-bottom: -8px;
        padding: 0 18px;
        font-size: 35px !important;
        color: #fff!important;
    }
    .why{
        padding: 0 18px;
        margin-bottom: -14px;
        height: 42px!important;
        font-size: 18px!important;
        color: #fff!important;
        cursor: pointer;
        &:hover{
            background: hsla(0,0%,100%,.3);
        }
    }
    .user{
        display: inline-block;
        height: 59px!important;
        &:hover{
            background: hsla(0,0%,100%,.3);
        }
    }
   
    
</style>