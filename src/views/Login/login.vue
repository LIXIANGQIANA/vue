<template>
    <div id="login">
        <div class="container">
            <div class="top"></div>
            <div class="main">
                <div class="login-wrap">
                     <!-- 表头 -->
                    <ul class="menu-tab">
                        <li :class="{current:item.current}" v-for="item in menuTab " :key="item.id" @click="toggleMenu(item)">{{item.txt}}</li> 
                    </ul>
                    <!-- 表单 -->
                    <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm"  class="demo-ruleForm" size="medium">
                       
                        <el-form-item  prop="account" >
                            <el-input placeholder="请输入手机或邮箱" v-model="ruleForm.account" autocomplete="off"  prefix-icon="el-icon-user"></el-input>
                        </el-form-item>

                         <el-form-item  prop="password" v-if="ways=='passwordLogin'">
                            <el-input placeholder="密码" v-model="ruleForm.password" autocomplete="off" prefix-icon="el-icon-lock"></el-input>
                        </el-form-item>

                        <el-form-item  prop="verifyCode" v-if="ways=='verifyCodeLogin'">
                             <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-input  v-model="ruleForm.verifyCode" autocomplete="off" prefix-icon="el-icon-chat-dot-round" placeholder="验证码"></el-input>
                                </el-col>
                                <el-col :span="12" >
                                    <el-button type="success" class="block">获取验证码</el-button>
                                </el-col>
                            </el-row>
                        </el-form-item>

                        <el-checkbox >自动登录</el-checkbox>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm('loginForm')" class="block margin-top-20" >确定</el-button>
                        </el-form-item>

                    </el-form>
                </div>
            </div>
            <div class="footer"></div>
        </div>
    </div>
</template>
<script>
import {reactive,ref,onMounted} from "@vue/composition-api";
import {stripscript,validateUser,validatePass,validateCode,validatePhone,validateEmail} from "@/utils/validate";
import qs from "qs";
export default {
    name:'login',
    setup(props,{root,refs}){
        var validateUsername = (rule, value, callback) => {
            if (value === '') {
                return callback(new Error('请输入邮箱或者手机'));
            } else if(validateUser(value)) {
                return callback(new Error('用户名格式不正确，请重新输入！'));
            }else{
                callback()
            }         
        };
        var validatePaeeword = (rule, value, callback) => {
            ruleForm.password=stripscript(value)
            value=ruleForm.password
            if (value === '') {
                return callback(new Error('请输入密码'));
            } else if(validatePass(value)) {
                return callback(new Error('密码为6至20位数字,字母'));
            }else{
                callback()
            }
        };
        var checkCode = (rule, value, callback) => {
           ruleForm.code=stripscript(value)
            value=ruleForm.code
                if (value === '') {          
                return callback(new Error('请输入验证码'));
                } else if(validateCode(value)) {
                return callback(new Error('验证码格式不正确，请重新输入！'));
                }else{
                callback()
            }  
        };

        const ruleForm=reactive({
            account: '',
            password: '',
            verifyCode: '',
        });

        const menuTab=reactive([
            {txt:'密码登录',current:true,type:'passwordLogin'},
            {txt:'验证码登录',current:false,type:'verifyCodeLogin'}, 
        ]);

        const ways=ref('passwordLogin')
        // const type=ref('')

        const rules=reactive({
            account: [
                { validator: validateUsername, trigger: 'blur' }
            ],
            password: [
                { validator: validatePaeeword, trigger: 'blur' }
            ],
            verifyCode: [
                { validator: checkCode, trigger: 'blur' }
            ],
        });

        const toggleMenu=((data)=>{       
          menuTab.forEach(ele=>{
            ele.current=false
            })
            data.current=true
            ways.value=data.type
            resetFormData()
        });

        //重置表单
        const resetFormData=(()=>{
        refs['loginForm'].resetFields();
        })

        //密码登陆
        const loginPassword=(()=>{   
            let requestData={
                account:ruleForm.account,
                password:ruleForm.password,
                type:validatePhone(ruleForm.account)==true?2:1
            }
        let data=qs.stringify(requestData)
        root.$store.dispatch('login/loginPassword',data).then(response=>{
            // root.$message({
            //    type:'success',
            //    message:`登陆${response.data.msg}`
            // })
            root.$router.push({
                name:'index',
                path:''
            })
        }).catch(error=>{   
            root.$message({
               type:'error',
               message:error.msg
            })
            })

        })

        // 验证码登陆
        const loginverifyCode=(()=>{
            let requestData={
                account:ruleForm.account,
                type:validatePhone(ruleForm.account)==true?2:1,
                verifyCode:ruleForm.verifyCode,
            }
            
            let data=qs.stringify(requestData)

            root.$store.dispatch('login/loginverifyCode',data).then(response=>{
                //  root.$message({
                //     type:'success',
                //     message:response.data.msg
                // })
                 root.$router.push({
                name:'index'
            })
            }).catch(error=>{  
                root.$message({
                type:'error',
                message:error.msg
            }) 
            })
        })

        // 表单提交
        const submitForm=((formName)=>{
            refs[formName].validate((valid) => {
                if (valid) {
                    if(ways.value=='passwordLogin'){
                        loginPassword()
                    }else{
                        loginverifyCode()
                    }
                } else {
                    return false;
                }
            });  
        })

        onMounted(()=>{

        })

        return{
            // ref
            menuTab,ways,
            // reactive
            ruleForm,rules,
            // methods   
            toggleMenu,resetFormData,submitForm,loginPassword,loginverifyCode
        }  
    }   
}
</script>
<style lang="scss" scoped>
    #login{
        background-color: #f0f2f5;
        width: 100%;
        height: 100vh;
    }
    .container{
        padding: 150px 0 0 0;
    }
    .login-wrap{
        width: 330px;
        margin: auto;
    }
    .menu-tab{
        margin-bottom: 20px;
        text-align: center;
        li{
           display: inline-block;
        //    margin: 0 32px 0 0;
           width: 100px;
           line-height: 36px;
           font-weight: 500;
           font-size: 14px;
           color: rgba(0,0,0,.65);
           cursor: pointer;
           transition: color .3s,boder-bottom .5s;
        }
        li:hover{
           color: #1890ff;
        }
        .current{
           color: #1890ff;
           border-bottom:2px solid #1890ff;    
        }
    }
        label{
            display: block;
            color: rgba(0,0,0,.65);
            font-size: 14px;
            font-weight: 500;
        }
        .block{
           display: block;
        //    margin-top: 20px;
           width:100%;
        }
        .margin-top-20{
           margin-top: 20px;
        }
</style>
