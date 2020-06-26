<template>
    <div>
        <el-form ref="form" :model="form" label-width="55px" >
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="账号："> 
                        <el-input v-model="form.userName" placeholder="请输入账号" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="性别："> 
                        <el-select v-model="sextOption" placeholder="请选择性别" style="width:100%"> 
                            <el-option
                                v-for="item in form.sex"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >

                            </el-option>

                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="4" v-if="!isCollapses">
                    <el-button type='primary' size="medium" icon="el-icon-search">查询</el-button>
                    <el-button type='primary' size="medium" icon="el-icon-refresh-left">重置</el-button>
                    <a href="#" @click="fn()">暂开<i class='el-icon-arrow-down'></i></a>
                </el-col>

                <el-col :span="6" v-if="isCollapses">
                        <div class="label-wrap">
                            <label for="真实姓名">真实姓名：</label>
                            <div class="content-wrap">
                                <el-input v-model="form.realName" placeholder="请输入真实姓名" ></el-input>
                            </div>
                        </div>
                </el-col>
                <el-col :span="6" v-if="isCollapses">
                        <div class="label-wrap">
                            <label for="真实姓名">手机号码：</label>
                            <div class="content-wrap">
                                <el-input v-model="form.phone" placeholder="请输入手机号码" ></el-input>
                            </div>
                        </div>
                </el-col>
           
            </el-row>
            <el-row v-if="isCollapses">
                <el-col :span="6" >
                    <div class="label-wrap">
                        <label for="真实姓名">用户状态：</label>
                        <div class="content-wrap">
                        <el-select v-model="delOption" placeholder="请选择用户状态" style="width:95%"> 
                            <el-option
                                v-for="item in form.delFlag"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                        </div>
                    </div>
                </el-col>
                <el-col :span="4">
                    <el-button type='primary' size="medium" icon="el-icon-search">查询</el-button>
                    <el-button type='primary' size="medium" icon="el-icon-refresh-left">重置</el-button>
                    <a href="#"  @click="fn()">收起<i class='el-icon-arrow-up'></i></a>
                </el-col> 
            </el-row>
        </el-form>
                <el-button type='primary' size="medium" icon="el-icon-plus" style="margin-top:20px">添加用户</el-button>
    </div>
</template>
<script>
import {reactive,ref,onMounted, computed} from "@vue/composition-api";
export default {
    name:'',
    setup(props,{root}){
        const form=reactive({
            userName:'',
            realName:'',
            phone:'',
            sex:[
                {label:'男性',value:'1'},
                {label:'女性',value:'2'}
            ]
            ,
            delFlag:[
                {label:'正常',value:'1'},
                {label:'冻结',value:'2'}
            ]

        })
        const sextOption=ref('')
        const delOption=ref('')

        // 展开收起
        const isCollapses=computed(()=>{
            return root.$store.state.app.isCollapses
        })
        const fn=()=>{
            root.$store.commit('app/SET_COLLAPSES')  
        }


        return{
            form,sextOption,delOption,
            fn,isCollapses
        }
    }
}
</script>
<style lang="scss" scoped>
    .label-wrap{
       label{
           float: left;
           line-height: 40px;
       }
        .content-wrap{
       margin-left: 80px;
    }
    }
    a{
        display: inline-block;
        text-decoration: none;
        color:#1890ff;
        margin-left: 10px;
    }
   
</style>