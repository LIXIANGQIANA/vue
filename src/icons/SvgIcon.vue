<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="svgName" />
    </svg>
</template>
<script>
import {reactive,ref,onMounted, computed} from "@vue/composition-api";
export default {
    name:'',
    props:{
        SvgClass:{
            type:String,
            default:''
        },
        SvgName:{
            type:String,
            default:''
        }
    },
    setup(props,{root}){
        const svgClass=computed(()=>{
            if(props.SvgClass){
                return `svg-icon ${props.SvgClass}`
            }else{
                `svg-icon`
            }
        })
        const svgName=computed(()=>{
            return `#icon-${props.SvgName}`
        })
        return{
            svgClass,
            svgName
        }
    }
}
</script>
<style lang="scss" scoped>
    .svg-icon{
            width: 1em;
            height: 1em;
            vertical-align: -0.15em;
            fill:currentColor;
            color: #ccc;
            font-size: 14px;
            /* color:#fff;	 */
        }
</style>