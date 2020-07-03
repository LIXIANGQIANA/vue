/*
 * 获取列表
 * @param {*} data 
 */
export function ListByUser(data){
    return service.request({
        method:'post',
        url:'/user/listByEntity',
        data
    })
}
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
/*
 * 获取用户信息
 * @param {*} data 
 */
export function FindUserById(data){
    return service.request({
        method:'post',
        url:'/user/findUserById',
        data
    })
}
/*
 * 用户修改
 * @param {*} data 
 */
export function UpdateUser(data){
    return service.request({
        method:'post',
        url:'/user/updateUser',
        data
    })
}