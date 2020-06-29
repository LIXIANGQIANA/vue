<template>
    <div>
        <!-- 表单 -->
        <el-form  :model="form" label-width="55px"  ref="form">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="账号："> 
                        <el-input v-model="form.userName" placeholder="请输入账号" size="small"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="性别："> 
                        <el-select v-model="sextOption" placeholder="请选择性别" style="width:100%" size="small"> 
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

                <el-col :span="6" v-if="!isCollapses">
                    <el-button type='primary' size="mini" icon="el-icon-search">查询</el-button>
                    <el-button type='primary' size="mini" icon="el-icon-refresh-left" @click="resetForm()">重置</el-button>
                    <a href="#" @click="fn()">暂开<i class='el-icon-arrow-down'></i></a>
                </el-col>

                <el-col :span="6" v-if="isCollapses">
                        <div class="label-wrap">
                            <label for="真实姓名">真实姓名：</label>
                            <div class="content-wrap">
                                <el-input v-model="form.realName" placeholder="请输入真实姓名" size="small"></el-input>
                            </div>
                        </div>
                </el-col>
                <el-col :span="6" v-if="isCollapses">
                        <div class="label-wrap">
                            <label for="真实姓名">手机号码：</label>
                            <div class="content-wrap">
                                <el-input v-model="form.phone" placeholder="请输入手机号码" size="small"></el-input>
                            </div>
                        </div>
                </el-col>
           
            </el-row>
            <el-row v-if="isCollapses">
                <el-col :span="6" >
                    <div class="label-wrap">
                        <label for="真实姓名">用户状态：</label>
                        <div class="content-wrap">
                        <el-select v-model="delOption" placeholder="请选择用户状态" style="width:95%" size="small"> 
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
                <el-col :span="6">
                    <el-button type='primary' size="mini" icon="el-icon-search">查询</el-button>
                    <el-button type='primary' size="mini" icon="el-icon-refresh-left" @click="resetForm()">重置</el-button>
                    <a href="#"  @click="fn()">收起<i class='el-icon-arrow-up'></i></a>
                </el-col> 
            </el-row>
                <el-button type='primary' size="mini" icon="el-icon-plus" style="margin-top:20px" @click="drawer_info=true">添加用户</el-button>
        </el-form>

        <!-- 表格 -->
        <el-table :data="tableData" border style="width: 100%" align='center' header-align="center">
            <el-table-column prop="userName" label="账号" align="center" ></el-table-column>
            <el-table-column prop="realName" label="姓名" align="center"> </el-table-column>
            <el-table-column prop="sex" label="性别" align="center"></el-table-column>
            <el-table-column prop="birthday" label="生日" align="center" ></el-table-column>
            <el-table-column prop="phone" label="手机号"  align="center"></el-table-column>
            <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
            <el-table-column prop="workNo" label="部门" align="center"></el-table-column>
            <el-table-column prop="userIdentity" label="职位" align="center"></el-table-column>
            <el-table-column prop="delFlag" label="状态" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <!-- 新增弹窗 -->
        <!-- <DialogAddUser :flag.sync='drawer_info'  @close='close'/> -->
        <DialogAddUser :flag.sync='drawer_info'/>

    </div>
</template>
<script>
import {reactive,ref,onMounted, computed} from "@vue/composition-api";
import DialogAddUser from "./drawer/AddUser.vue";
export default {
    name:'',
    components:{ DialogAddUser },
    setup(props,{root,refs}){
        const sextOption=ref('')
        const delOption=ref('')
        const drawer_info=ref(false)
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
        const tableData = reactive([
            {
                userName: 'AAAA',
                realName: '王小虎',
                sex: '男',
                birthday: '2020-05-20',
                phone: '15073758888',
                email: '806169408@qq.com',
                delFlag: '启用',
                workNo:'A00',
                userIdentity: '普通员工'
            },
            {
                userName: 'AAAA',
                realName: '王小虎',
                sex: '男',
                birthday: '2020-05-20',
                phone: '15073758888',
                email: '806169408@qq.com',
                delFlag: '启用',
                workNo:'A00',
                userIdentity: '普通员工'
            },
           
        
        ])

        // 编辑
        const  handleEdit=(value)=>{
   
        }
        // 删除
        const  handleDelete=(value)=>{
          
        }

        // 重置
        const resetForm=()=>{ 
            form.userName=''
            delOption.value=''
            form.phone=''
            form.realName=''
            sextOption.value=''
        }

        // 展开收起
        const isCollapses=computed(()=>{
            return root.$store.state.app.isCollapses
        })
        const fn=()=>{
            root.$store.commit('app/SET_COLLAPSES')  
        }
        // const close=()=>{
        //     drawer_info.value=false
        // }

        return{
            // ref
            sextOption,delOption,drawer_info,isCollapses,
            // reactive
            form,tableData,
            // methods
            handleEdit,handleDelete,resetForm,fn
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