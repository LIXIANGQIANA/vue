<template>
    <el-drawer
        @close="close"
        @open="open"
        :wrapperClosable="false"
        :visible.sync="drawer_info"
        custom-class="demo-drawer"
        title="修改"
        >
        <div class="demo-drawer__content">
            <el-form  :model="addForm" ref='form' :rules="addRules">
                <el-form-item label="机构ID：" label-width="80px" prop='orgId'>
                    <el-input v-model="addForm.orgId" autocomplete="off" size="small "></el-input>
                </el-form-item>
                <el-form-item label="用户编码" label-width="80px" prop='userName'>
                    <el-input v-model="addForm.username" autocomplete="off" size="small "></el-input>
                </el-form-item>
                <el-form-item label="姓名：" label-width="80px" prop='realName'>
                    <el-input v-model="addForm.realName" autocomplete="off" size="small "></el-input>
                </el-form-item>
                <el-form-item label="手机号：" label-width="80px" prop='phone'>
                    <el-input v-model="addForm.phone" autocomplete="off" size="small "></el-input>
                </el-form-item>
                <el-form-item label="邮箱：" label-width="80px" prop='email'>
                    <el-input v-model="addForm.email" autocomplete="off" size="small "></el-input>
                </el-form-item>
                <el-form-item label="性别：" label-width="80px" prop='sex'>
                   <el-radio-group v-model="addForm.sex">
                        <el-radio :label=0>女</el-radio>
                        <el-radio :label=1>男</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="workNo：" label-width="80px" prop='workNo'>
                    <el-input v-model="addForm.workNo" autocomplete="off" size="small "></el-input>
                </el-form-item>
                <el-form-item label="密码：" label-width="80px" prop='password'>
                    <el-input v-model="addForm.password" autocomplete="off" size="small "></el-input>
                </el-form-item>
                <el-form-item label="确认密码：" label-width="100px" prop='password'>
                    <el-input v-model="addForm.password" autocomplete="off" size="small "></el-input>
                </el-form-item>
                <el-form-item label="生日：" label-width="80px" prop='birthday'>
                    <!-- <el-input v-model="addForm.birthday" autocomplete="off" size="small "></el-input> -->
                    <el-date-picker
                        v-model="addForm.birthday"
                        type="date"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="状态：" label-width="80px" prop='delFlag'>
                   <el-radio-group v-model="addForm.delFlag" >
                        <el-radio :label=0>停用</el-radio>
                        <el-radio :label=1>启用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="职位：" label-width="80px" prop='userIdentity'>
                    <el-radio-group v-model="addForm.userIdentity">
                        <el-radio :label=1>普通员工</el-radio>
                        <el-radio :label=2>上级</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div class="demo-drawer__footer">
                <el-button size="mini">取 消</el-button>
                <el-button  size=mini @click="sumbmit('form')">确 定</el-button>
            </div>
        </div>
    </el-drawer>
</template>
<script>
import { reactive, ref, watchEffect, onMounted} from '@vue/composition-api';
import qs from "qs";
import {FindUserById,UpdateUser} from "@/api/user.js" 
import {validatePass,validatePhone,validateEmail} from "@/utils/validate.js";
export default {
    name:'dialogAddUser',
    props:{
        flag:{
            type:Boolean,
            default:false
        },
        id:{
            type:Number,
            default:''
        }
    },
    setup(props,{emit,refs,root}){
        var validatePassword = (rule, value, callback) => {
            // Form.password=stripscript(value)
            // value=form.password
            if (value==='') {
                return callback(new Error('请输入密码'));
            } else if(validatePass(value)) {
                return callback(new Error('密码为8至20位数字,字母'));
            }else{
                callback()
            }
        };

        var validateEmails = (rule, value, callback) => {
            if (value==='') {
                return callback(new Error('请输入邮箱'));
            } else if(validateEmail(value)) {
                return callback(new Error('邮箱格式不正确，请重新输入！'));
            }else{
                callback()
            }         
        };

        var validatePhones = (rule, value, callback) => {
            if (value==='') {
                return callback(new Error('请输入手机'));
            } else if(validatePhone(value)) {
                return callback(new Error('手机格式不正确，请重新输入！'));
            }else{
                callback()
            }         
        };

        const drawer_info=ref(false)
        const addForm=reactive({
            username:'',
            orgId: 0,
            realName: '',
            phone: '',
            email: '',
            sex: '',
            password: '',
            workNo: '',
            birthday: '',
            userIdentity: '',
            delFlag:''
        })

        const addRules=reactive({
            orgId: [
            { required: false, message: '请输入机构ID', trigger: 'blur' }
          ],
           userId: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
            realName: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
            phone: [
            { required: true,  trigger: 'blur', validator: validatePhones }
          ],
            email: [
            { required: true,  trigger: 'blur',validator: validateEmails }
          ],
            sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
            workNo: [
            { required: false, message: '请输入workNo', trigger: 'change' }
          ],
            password: [
            { required: true, message: '请输入密码', trigger: 'blur' ,},
            { min: 8, max: 20,  trigger: 'blur',validator: validatePassword }
            ],
            birthday: [
            { required: false, message: '请输入生日', trigger: 'change' }
          ],
            userIdentity: [
            { required: true, message: '请输选择职位', trigger: 'change' }
          ],
            delFlag: [
            { required: true, message: '请输选择状态', trigger: 'change' }
          ],
        })
        const close=()=>{
            drawer_info.value=false
            // emit('close',false)
            emit('update:flag',false)
           
        }
        const open=()=>{
           findUserById()
             
        }
        const findUserById=()=>{
            let requestData={
                userId: props.id
            }
            let data=qs.stringify(requestData)
            FindUserById(data).then(res=>{
                let responseData=res.data.result
                    addForm.username=responseData.username
                    addForm.realName=responseData.realName
                    addForm.phone=responseData.phone
                    addForm.email=responseData.email
                    addForm.userIdentity=responseData.userIdentity
                    addForm.sex=responseData.sex
                    addForm.delFlag=responseData.delFlag
                }).catch(error=>{     
                })

        }

        const updateUser=()=>{
            let requestDat={
                userId:props.id,
                orgId: addForm.orgId,
                realName: addForm.realName,
                phone: addForm.phone,
                email: addForm.email,
                password: addForm.password,
                sex: addForm.sex,
                workNo: addForm.workNo,
                birthday: addForm.birthday,
                userIdentity: addForm.userIdentity,
                delFlag: addForm.delFlag
            }
            let dat=qs.stringify(requestDat)
            console.log(dat);
            UpdateUser({dat}).then(res=>{
                 root.$message({
                    type:'success',
                    message:res.data.msg
                })    
            emit('getUserList')
            }).catch(error=>{
                console.log(error);
                
            })
        }

        const sumbmit=(form)=>{
            refs[form].validate((valid) => {
                if (valid) {
                    updateUser()
                } else {
                    return false;
                }
        });   
        }

        onMounted(()=>{
             
        })
        
        watchEffect(()=>drawer_info.value=props.flag)
            return{
                // ref
                drawer_info,
                // reactive
                addForm,addRules,
                // methods
                close,open,sumbmit,findUserById,updateUser
            }
        }
    }
    

</script>
<style lang="scss" scoped>
     .demo-drawer__content {
        padding: 0 50px;
            &.demo-drawer__footer{
                margin-bottom: 0;
            }
    }
    .el-radio-group {
        font-size: 14px;
}

.el-radio__inner{
    margin-right: 20px;
}
</style>