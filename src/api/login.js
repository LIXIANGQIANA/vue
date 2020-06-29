import service from "@/utils/request.js";
/**
 * 密码登陆
 * @param {} data 
 */
export function LoginPassword(data){ 
    return  service.request({
        method:'post',
        url:'/login/password',
        data
    })
}

/**
 * 验证码登陆
 */
export function LoginverifyCode(data){
    return service.request({
        method:'post',
        url:'/login/verify-code',
        data
    })
}

/**
 * 退出登陆
 */
export function Logout() {
    return service.request({
        method: 'post',
        url: '/login/logout'
    })
  }