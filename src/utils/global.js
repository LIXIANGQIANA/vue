import { MessageBox, Message  } from 'element-ui';
export default{
    install(Vue,options){
        Vue.prototype.confirm=(parmas)=>{
            MessageBox.confirm(parmas.content, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
                }).then(() => {
                    parmas.fn && parmas.fn()
                    Message({
                    type: 'success',
                    message: '删除成功!'
                });
                }).catch(() => {
                    parmas.id=""
                    Message({
                    type: 'info',
                    message: '已取消删除'
                });
            }); 
        }
    }
}