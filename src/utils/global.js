import { MessageBox, Message  } from 'element-ui';
// 删除弹窗的全局方法
export default{
    install(Vue,options){
        Vue.prototype.confirm=(parmas)=>{
            MessageBox.confirm(parmas.content, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
                }).then(() => {
                    parmas.fn && parmas.fn(parmas.deleteId || '')
                    Message({
                    type: 'success',
                    message: '删除成功!'
                });
                }).catch(() => {
                    Message({
                    type: 'info',
                    message: '已取消删除'
                });
            }); 
        }
    }
}