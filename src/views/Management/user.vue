<template>
    <div>
        <!-- 表单 -->
        <el-form  :model="form" label-width="55px"  ref="form">
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-form-item label="姓名"> 
                        <el-input v-model="form.realName" placeholder="请输入账号" size="small"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="日期"> 
                        <el-date-picker
                            size="small"
                            type="dates"
                            v-model="startBirthday"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="开始日期">
                        </el-date-picker>
                        <el-date-picker
                            size="small"
                            type="dates"
                            v-model="endBirthday"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
               
                <el-col :span="4" v-if="isCollapses">
                    <el-form-item label="手机号"> 
                        <el-input v-model="form.phone" placeholder="请输入手机号码" size="small"></el-input>
                    </el-form-item>
                </el-col>
    
                 <el-col :span="4" v-if="isCollapses">
                    <el-form-item label="邮箱"> 
                        <el-input v-model="form.email" placeholder="请输入邮箱" size="small"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="6" v-if="!isCollapses">
                    <el-button type='primary' size="mini" icon="el-icon-search" @click="seacherInfo()">查询</el-button>
                    <el-button type='primary' size="mini" icon="el-icon-refresh-left" @click="resetForm()">重置</el-button>
                    <a href="#" @click="fn()">暂开<i class='el-icon-arrow-down'></i></a>
                </el-col>

            </el-row>
            <el-row v-if="isCollapses">
                <el-col :span="4" >
                    <el-form-item label="状态"> 
                        <el-select v-model="delOption" placeholder="请选择用户状态" style="width:95%" size="small"> 
                            <el-option
                                v-for="item in form.delFlag"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-button type='primary' size="mini" icon="el-icon-search" @click="seacherInfo()">查询</el-button>
                    <el-button type='primary' size="mini" icon="el-icon-refresh-left" @click="resetForm()">重置</el-button>
                    <a href="#"  @click="fn()">收起<i class='el-icon-arrow-up'></i></a>
                </el-col> 
            </el-row>
                <el-button type='primary' size="mini" icon="el-icon-plus"  @click="drawer_info=true">添加用户</el-button>
                <el-button size="mini" @click="deleteAll" v-if='deleteAll_btn'>批量删除</el-button>
        </el-form>

        <!-- 表格 -->
        <el-table :data="tableData.item" border style="width: 100%;margin-top:20px " align='center' header-align="center" stripe @selection-change="handleSelectionChange"
            v-loading="loading"
            element-loading-text="拼命加载中"
             
        >
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="username" label="用户编码" align="center" width=""></el-table-column>
            <el-table-column prop="realName" label="姓名" align="center" > </el-table-column>
            <el-table-column prop="sex" label="性别" align="center" width="50px" :formatter="toSex"></el-table-column>
            <el-table-column prop="birthday" label="生日" align="center" ></el-table-column>
            <el-table-column prop="phone" label="手机号"  align="center"></el-table-column>
            <el-table-column prop="email" label="邮箱" align="center" width="200px"></el-table-column>
            <el-table-column prop="workNo" label="部门" align="center"></el-table-column>
            <el-table-column prop="userIdentity" label="职位" align="center" width="100px" :formatter="toUserIdentity"></el-table-column>
            <el-table-column prop="delFlag" label="状态" align="center" width="100px" :formatter="toDelFlag"></el-table-column>
            <el-table-column label="操作" align="center" width="250px">
                <template slot-scope="scope">
                    <el-button size="mini"  @click="handleEdit(scope.row.id)">编辑</el-button>
                    <el-button size="mini"  @click="deleteItem( scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <!-- 新增弹窗 -->
        <!-- <DialogAddUser :flag.sync='drawer_info'  @close='close'/> -->
        <DialogAddUser :flag.sync='drawer_info' @getUserList="getUserList"/>
        <!-- 修改弹窗 -->
        <!-- <DialogAddUser :flag.sync='drawer_info'  @close='close'/> -->
        <DialogEditUser :flag.sync='drawer_editinfo' :id="editId"  @getUserList="getUserList"/>

        <el-row style="margin-top:20px">
            <!-- <el-col :span="12">
            </el-col> -->
            <el-col :span="24">
                <el-pagination
                    class="pull-right"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    background
                    small
                    :page-sizes="[5, 10, 15, 20]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData.total">
                </el-pagination>
            </el-col>
        </el-row>


    </div>
</template>
<script>
import {reactive,ref,onMounted, computed} from "@vue/composition-api";
import DialogAddUser from "./drawer/AddUser.vue";
import DialogEditUser from "./drawer/EditUser.vue";
import {ListByUser,DeleteUser} from "@/api/user.js"
import qs from "qs"
export default {
    name:'',
    components:{ DialogAddUser,DialogEditUser },
    setup(props,{root,refs}){
        const startBirthday=ref('')
        const endBirthday=ref('')
        const delOption=ref('')
        const drawer_info=ref(false)
        const drawer_editinfo=ref(false)
        const deleteId=ref('')
        const editId=ref(''*1)
        const loading=ref(false)
        const deleteAll_btn=ref(false)
        const form=reactive({
            userName:'',
            realName:'',
            email:'',
            phone:'',
            delFlag:[
                {label:'启用',value:'1'},
                {label:'停用',value:'0'}
            ]

        })
        // 页码
        const page=reactive({
            pageNum:1,
            pageSize:10
        })
        const tableData = reactive({
            item:[],
            total:0
        })

        // 获取用户列表
        const getUserList=()=>{
            let requestData={
                username: form.username,
                realName:form.realName,
                phone:form.phone,
                email:form.email,
                delFlag:delOption.value,
                startBirthday: startBirthday.value[0]||'',
                endBirthday: endBirthday.value[0] || '',
                page:page.pageNum,
                pageSize:page.pageSize  
            }  
            let data=qs.stringify(requestData)
            loading.value=true
            ListByUser(data).then(res=>{
                let data=res.data.result.list
                tableData.item=data
                tableData.total=res.data.result.total 
                loading.value=false 
            }).catch(error=>{
                loading.value=false 
            })
        }

        // 查询
        const seacherInfo=()=>{
            getUserList()
        }

        // 编辑
        const  handleEdit=(value)=>{
             drawer_editinfo.value=true
             editId.value=value
        }
        // 删除当前
        const  deleteItem=(val)=>{
            deleteId.value=val
            root.confirm({
                content:'是否删除当前',
                // deleteId: deleteId.value ,  
                fn:confirmDelete,
            })
        }
        // 删除全部
        const  deleteAll=()=>{
            // if(!deleteId.value && deleteId.value.length==0 ){
            //     root.$message({
            //         message:'请选择要删除的内容',
            //         type:'error'
            //     })
            //     return false
            // }
            root.confirm({
                content:'是否删除全部',
                // deleteId:deleteId.value,
                fn:confirmDelete 
            })
        }

        const confirmDelete=()=>{
            let deleteData={
                userId:deleteId.value
            }
            let data=qs.stringify(deleteData)
            console.log(data);
            DeleteUser(data).then(res=>{
                deleteId.value=''
                getUserList()
            }).catch(error=>{
                deleteId.value=''
            })
        }

        const handleSelectionChange=(val)=>{
            if(val){
                deleteAll_btn.value=!deleteAll_btn.value
            }
            let id=val.map(item=>item.id)
            deleteId.value=id.join('') 
        }

        // 分页
        const handleSizeChange=(val)=>{
            page.pageSize=val
            getUserList()
        }
        const handleCurrentChange=(val)=>{
            page.pageNum=val
            getUserList()
            
        }

        // 重置
        const resetForm=()=>{ 
            form.realName=''
            form.phone=''
            form.email=''
            endBirthday.value=''
            startBirthday.value=''
            delOption.value=''
        }
        // 性别转换
        const toSex=(row, column, cellValue, index)=>{
            return row.sex==0?'女':'男' 
        }
        // 职位转换
        const toUserIdentity=(row, column, cellValue, index)=>{
            return row.sex==1?'普通成员':'上级'  
        }
        // 状态转换
        const toDelFlag=(row, column, cellValue, index)=>{
            return row.sex==0?'停用':'启用'  
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
        onMounted(()=>{
            getUserList()
        })

        return{
            // ref
            delOption,drawer_info,isCollapses,endBirthday,startBirthday,deleteId,loading,deleteAll_btn,drawer_editinfo,editId,
            // reactive
            form,tableData,page,
            // methods
            handleEdit,deleteItem,deleteAll,confirmDelete,resetForm,fn,handleSizeChange,
            handleCurrentChange,getUserList,toSex,toDelFlag,toUserIdentity,
            handleSelectionChange,seacherInfo
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
    .pull-right{
        float: right;
    }
</style>