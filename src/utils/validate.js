// 特使字符过滤
export function stripscript(str) {
        var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]")
        var rs = "";
        for (var i = 0; i < str.length; i++) {
                rs = rs + str.substr(i, 1).replace(pattern, '');
            }
        return rs;
        }      
// 同时验证邮箱和手机号
export function validateUser(value){
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    let reg2 = /(^1[3|4|5|8]\d{9}$)/; 
    if(!reg.test(value) && !reg2.test(value)){
        return true
    }else{
        return false
    }
}
// 手机号验证
export function validatePhone(value){
    // let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    let reg = /(^1[3|4|5|8]\d{9}$)/; 
    if(!reg.test(value)){
        return true
    }else{
        return false
    }
}
//邮箱验证
export function validateEmail(value){
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    // let reg2 = /(^1[3|4|5|8]\d{9}$)/; 
    if(!reg.test(value)){
        return true
    }else{
        return false
    }
}
// 验证密码
export function validatePass(value){
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{8,20}$/;
    if(!reg.test(value)){
        return true
    }else{
        return false
    }
}
// 验证码
export function validateCode(value){
    let reg = /^[a-z0-9]{4}$/;
    if(!reg.test(value)){
        return true
    }else{
        return false
    }
}


