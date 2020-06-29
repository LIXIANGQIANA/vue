<template>
    <main class="main-wrap">
        <div class="tab-wrap">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <!-- <el-breadcrumb-item>活动管理</el-breadcrumb-item> -->
            </el-breadcrumb>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </main>  
</template>
<script>
export default {
    name:'',
}
</script>
<style lang="scss" scoped>
    .main-wrap{
        height: 100vh;
    }
    .el-breadcrumb{
        line-height: 52px;
        padding: 0 20px;
        background-color: #fff;
        border-bottom: 1px solid #ccc;
        border-left: 1px solid #ccc;
    }
    .content{
        margin: 12px 12px 0 ;
        padding: 24px;
        color: #595959;
        background-color: #fff;
    }
    
</style>