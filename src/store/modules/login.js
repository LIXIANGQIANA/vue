import {LoginPassword,LoginverifyCode} from "@/api/login.js";
const login={
    namespaced:true,
    state:{},
    getters:{},
    mutations:{},
    actions:{
        // 密码登陆
        loginPassword({commit},requestdata){
            console.log(requestdata);
            return new Promise((resolve,reject)=>{
                    LoginPassword(requestdata).then((response)=>{
                       resolve(response)
                    }).catch((error)=>{
                        reject(error)
                    }) 
            })
        },
        // 验证码登陆
        loginverifyCode({commit},requestdata){
            console.log(requestdata);
            return new Promise((resolve,reject)=>{
                LoginverifyCode(requestdata).then((response)=>{
                       resolve(response)
                    }).catch((error)=>{
                        reject(error)
                    }) 
            })
        },

    }
}

export default login