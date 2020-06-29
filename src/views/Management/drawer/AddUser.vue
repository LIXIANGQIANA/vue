<template>
    <el-drawer
        @close="close"
        :wrapperClosable="false"
        :visible.sync="drawer_info"
        custom-class="demo-drawer"
        :modal-append-to-body='false'
        >
        <div class="demo-drawer__content">
            <el-form >
                <el-form-item label="姓名：" label-width="70px">
                    <el-input autocomplete="off" size="small "></el-input>
                </el-form-item>
                <el-form-item label="手机号：" label-width="70px">
                    <el-input autocomplete="off" size="small "></el-input>
                </el-form-item>
                <el-form-item label="邮箱：" label-width="70px">
                    <el-input autocomplete="off" size="small "></el-input>
                </el-form-item>
                <el-form-item label="性别：" label-width="70px">
                    <el-input autocomplete="off" size="small "></el-input>
                </el-form-item>
                <el-form-item label="密码：" label-width="70px">
                    <el-input autocomplete="off" size="small "></el-input>
                </el-form-item>
                <el-form-item label="生日：" label-width="70px">
                    <el-input autocomplete="off" size="small "></el-input>
                </el-form-item>
            </el-form>
            <div class="demo-drawer__footer">
                <el-button size="mini">取 消</el-button>
                <el-button  size=mini>确 定</el-button>
            </div>
        </div>
    </el-drawer>
</template>
<script>
import { reactive, ref, watchEffect} from '@vue/composition-api';
export default {
    name:'dialogAddUser',
    props:{
        flag:{
            type:Boolean,
            default:false
        }
    },
    setup(props,{emit}){
        const drawer_info=ref(false)
        const close=()=>{
            drawer_info.value=false
            // emit('close',false)
            emit('update:flag',false)
        }
        
        watchEffect(()=>drawer_info.value=props.flag)


            return{
                drawer_info,
                close
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
</style>