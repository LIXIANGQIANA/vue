import service from "@/utils/request.js";
/*
 * 新增用户
 * @param {*} data 
 */
export function InsertUser(data){
    return service.request({
        method:'post',
        url:'/user/insertUser',
        data
    })
}
/*
 * 获取用户列表
 * @param {*} data 
 */
export function ListByUser(data){
    return service.request({
        method:'post',
        url:'/user/listByEntity',
        data
    })
}
/*
 * 删除用户
 * @param {*} data 
 */
export function DeleteUser(data){
    return service.request({
        method:'post',
        url:'/user/deleteUser',
        data
    })
}