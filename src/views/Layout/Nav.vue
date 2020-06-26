<template>
   <aside class="side-wrap" :class="[isCollapse? 'close':'open']">
           <div class="logo">  
               <!-- <a href="#"> -->   
                    <img src="../../assets/logo.png" alt="logo">
                    <h1>后台管理系统</h1>
               <!-- </a> -->
           </div>
           <el-menu  class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse"  text-color="#595959"  router>
        
               <template v-for="(item,index) in routers">
               <el-submenu  v-if="!item.hidden" :key="item.id" :index="index+''">
                    <!-- 一级菜单 -->
                     <template slot="title" >
                        <i><svg-icon SvgClass="item.meta.icon" :SvgName="item.meta.icon"></svg-icon></i>
                        <!-- <i :class="item.meta.icon"></i> -->
                        <span slot="title">{{item.meta.name}}</span>
                    </template>

                    <!-- 二级菜单 -->
                    <template v-for="(sumbItem) in item.children">
                    <el-menu-item  v-if="!sumbItem.hidden"  :key="sumbItem.id" :index="sumbItem.path">{{sumbItem.meta.name}}</el-menu-item>
                    </template>

                </el-submenu>
               </template>
            </el-menu>
    </aside>
</template>
<script>
import {reactive,ref,onMounted, computed} from "@vue/composition-api";
export default {
    name:'',
    setup(props,{root}){
        const routers=reactive(root.$router.options.routes)
        // const isCollapse=ref(root.$store.state.isCollapse)
    
        const isCollapse=computed(()=>{
            return root.$store.state.app.isCollapse
        })

       
        const handleOpen=(key, keyPath)=>{
            console.log(key);
        }
        const handleClose=(key, keyPath)=>{
            console.log(key);
        }
        return{
            isCollapse,
            routers,
            handleOpen,handleClose
        }
    }

}
</script>
<style lang="scss" scoped>
    .side-wrap{
        flex: 0 0 200px;
        background-color: #fff;
        box-shadow: 2px 116px 8px 0 rgba(29,35,41,.05);
        transition:  all .9s ease 0s;
       -webkit-transition: all .9s ease 0s;
    }
    .close{
        flex: 0 0 64px;
    }
    a{
        // display: inline-block;
        text-decoration: none;
        outline: none;
        transition: color 0.9s ease 0s;
    }
    
    img{
        display: inline-block;
        width: 32px;
        height: 32px;
        vertical-align: middle;
        border-style: none; 
    }
    .logo{
      padding-left: 24px;
        height: 59px;
        line-height: 59px ;
        background-color: #1890ff;
        h1{
            display: inline-block;
            vertical-align: middle;
            margin-left: 8px;
            text-align: center;
            text-decoration: none;
            color: #fff;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            &:hover{
                color: unset;
                color: rgba(240, 235, 235, 0.9);
                transition: color .9s;
            }
        }
    }
    .el-menu-item-group{
        .el-menu-item {
            padding-left: 50px !important;
        }
    }
    .el-submenu{
        border: none;
    }
    .el-menu-item {
            padding-left: 45px !important;
        }
        svg{
            margin-right: 10px;
        }
        .el-menu-vertical-demo{
            &.el-menu{
            border: none;
        }
            
        }
       

</style>