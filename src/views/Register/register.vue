<template>
    <div id="login">
        <div class="container">
            <div class="top"></div>
            <div class="main">
                <div class="login-wrap">
                     <!-- 表头 -->
                    <h1>注册</h1>
                    <!-- 表单 -->
                    <el-form :model="ruleForm" status-icon :rules="rules" ref="registerForm"   size="medium" >

                        <el-form-item  prop="region" >
                            <el-select v-model="selectOption" placeholder="请选择邮箱或者手机号注册" class="block ">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    >   
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item  prop="account" >
                            <el-input placeholder="" v-model="ruleForm.account" autocomplete="off"  prefix-icon="el-icon-message"></el-input>
                           
                        </el-form-item>

                        <el-form-item  prop="verifyCode" >
                             <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-input  v-model="ruleForm.verifyCode" autocomplete="off" prefix-icon="el-icon-chat-dot-round"></el-input>
                                </el-col>
                                <el-col :span="12" >
                                    <el-button  class="block" @click="getSms()" :disabled="codeButton.status" >{{codeButton.text}}</el-button>
                                </el-col>
                            </el-row>
                        </el-form-item>

                         <el-form-item  prop="password" >
                            <el-input placeholder="密码" v-model="ruleForm.password" autocomplete="off" prefix-icon="el-icon-lock"></el-input>
                        </el-form-item>
                         <el-form-item  prop="passwords" >
                            <el-input placeholder="确认密码" v-model="ruleForm.passwords" autocomplete="off" prefix-icon="el-icon-lock"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-row :gutter="20">
                                <el-col :span="14">
                                     <el-button type="primary" size="small" @click="submitForm('registerForm')" class="block margin-top-20"  >注册</el-button>
                                </el-col>
                                <el-col :span="10" >
                                   <router-link :to="{name:'login'}" class="btn">使用已有账户登录</router-link>
                                </el-col>
                            </el-row>
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
// import service from "@/utils/request.js";
import {Register,GetSms} from "@/api/register.js";
import qs from "qs";
export default {
    name:'login',
    setup(props,{root,refs}){
        // 
        var validateRegion=(rule, value, callback)=>{
            if(value == '' ){
                return callback(new Error('请选择注册方式'))
            }
            else{
                callback()
            }
        }
        // 用户名
        var validateAccount = (rule, value, callback) => {
            if(value==''){
                return callback(new Error('请输入用户名'))
            }else if(validateUser(value)){
                return callback(new Error('请输入用正确的邮箱或者手机'))
            }
            else if(ruleForm.region==1 && validatePhone(value)){
                return callback(new Error('手机格式不对'))
            }
            else if(ruleForm.region==2 && validateEmail(value)){
                return callback(new Error('邮箱格式不对'))
            }else{
                callback()
            }      
        };
        // 密码
        var validatePaeeword = (rule, value, callback) => {
            ruleForm.password=stripscript(value)
            value=ruleForm.password
            if (value =='') {
                return callback(new Error('请输入密码'));
            } else if(validatePass(value)) {
                return callback(new Error('密码为8至20位数字,字母'));
            }else{
                callback()
            }
        };
        // 重复密码
        var validatePaeewords = (rule, value, callback) => {
            ruleForm.passwords=stripscript(value)
            value=ruleForm.passwords
            if (value =='') {
                return callback(new Error('请输入密码'));
            } else if(value!=ruleForm.password) {
                return callback(new Error('密码为8至20位数字,字母'));
            }else{
                callback()
            }    
        };
        // 验证码
        var checkCode = (rule, value, callback) => {
           ruleForm.code=stripscript(value)
            value=ruleForm.code
                if (value =='') {          
                return callback(new Error('请输入验证码'));
                } else if(validateCode(value)) {
                return callback(new Error('验证码格式不正确，请重新输入！'));
                }else{
                callback()
            }  
        };
        const selectOption=ref('')

        const options=reactive([
            {value:1,label:'手机号码',},
            {value:2,label:'邮箱',}
        ])
        const ruleForm=reactive({
            account: '',
            verifyCode: '',
            password: '',
            passwords: '',
            region:selectOption
        });

        // 按钮初始状态
        const codeButton=reactive({
            text:'获取验证码',
            status:false
        })
        var timer=ref('')
        
        const rules=reactive({
            region: [
                { validator: validateRegion, trigger: 'change' }
            ],
            account: [
                { validator: validateAccount, trigger: 'blur' }
            ],
            password: [
                { validator: validatePaeeword, trigger: 'blur' }
            ],
            passwords: [
                { validator: validatePaeewords, trigger: 'blur' }
            ],
            verifyCode: [
                { validator: checkCode, trigger: 'blur' }
            ],
        });

        // 获取验证码
        const getSms=(()=>{    
            if( ruleForm.region==''){
                root.$message({
                    type:'error',
                    message:'请选择注册方式'
                })
                return false
            }
            if(ruleForm.account==''){
                root.$message({
                    type:'error',
                    message:'请输入邮箱或者验证码'
                })
                return false
            }
            let data={
                account:ruleForm.account,
                type:ruleForm.region
            }
            setTimeout(()=>{
                updateCodeButton({
                    status:true,
                    text:'发送中'
                })
                root.$message({
                     type:'success',
                     message:'获取验证码成功'
                })
                countDown(30)
                
            },5000)
        })

        // 更改按钮状态
        const updateCodeButton=((parants)=>{
            codeButton.text=parants.text
            codeButton.status=parants.status
        })

        //倒计时
        const countDown=((number)=>{
        //判断定时器是否存在，存在则清除
        if(timer.value){clearInterval(timer.value)
        }
        let time=number
        timer.value=setInterval(() => {
            time--
            if(time===0){
            clearInterval(timer.value)
                updateCodeButton({
                status:false,
                text:'再次获取'
            })
            }else{
            codeButton.text=`倒计时${time}秒`
            }
        }, 1000);
        });
            
        //注册
        const register=(()=>{
            let requestData={
                account:ruleForm.account,
                password:ruleForm.password,
                verifyCode:ruleForm.verifyCode,
                type:ruleForm.region
            }
            let data=qs.stringify(requestData)
            Register(data).then(response=>{
                let data=response.data
                console.log(data.msg); 
                root.$message({
                type:'success',
                message:data.msg
            })
            // root.$router.push({
            //     name:'Login'
            // })
            }).catch(error=>{

            })
            console.log(requestData);
           resetFormData()
        })

        //重置表单
        const resetFormData=(()=>{
        refs['registerForm'].resetFields();
        })
            
        //表单提交 
        const submitForm=((formName)=>{
            refs[formName].validate((valid) => {
                if (valid) {
                      register()
                } else {
                    return false;
                }
            });  
        })

        onMounted(()=>{
        
        })

        return{
            // ref
            selectOption,timer,
            // reactive
            ruleForm,rules,options,codeButton,
            // methods   
            getSms,updateCodeButton,countDown,register,resetFormData,submitForm
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
        width:100%;
    }
    .margin-top-20{
        margin-top: 20px;
    }
    .btn{
        color: #1890ff;
        text-decoration: none;
        float: right;
        line-height: 80px;
    }


</style>