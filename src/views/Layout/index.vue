<template>
    <section class="layout" >
        <LayoutNav/>
        <div style="display:flex; flex-direction: column; flex: auto;">
        <LayoutHeader/>
        <LayoutMain/>
        </div>
    </section>
</template>
<script>
import LayoutHeader from "./Header.vue";
import LayoutMain from "./Main.vue";
import LayoutNav from "./Nav.vue";
export default {
    name:'layout',
    components:{LayoutNav,LayoutHeader,LayoutMain},
    setup(props,{root}){

    }
}
</script>
<style lang="scss" scoped>
    .layout{
        overflow-x: hidden;
        display: flex;
        flex-direction: row;
        background-color: #f0f2f5;  
    }
</style>