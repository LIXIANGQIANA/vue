import service from "@/utils/request.js"
/**
 * 注册接口
 */
export function Register(data){ 
    return  service.request({
        method:'post',
        url:'/login/register/',
        data
    })
}

/**
 * 获取验证码接口
 */
export function GetSms(data){
    return service.request({
        method:'post',
        url:'',
        data
    })
}