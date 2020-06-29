import {LoginPassword,LoginverifyCode,Logout} from "@/api/login.js";
import {setToken,getToken,removeToken,} from "@/utils/app.js";
const login={
    namespaced:true,
    state:{
        token: '',
        username:''
    },
    getters:{},
    mutations:{
        SET_USERNAME(state,value){
            state.username=value
        },
        SET_TOKEN(state,value){
            state.token=value
        }
    },
    actions:{
        // 密码登陆
        loginPassword({commit},requestdata){
            return new Promise((resolve,reject)=>{
                LoginPassword(requestdata).then((response)=>{
                        setToken(response.headers.authorization)
                        commit('SET_TOKEN',response.headers.authorization)
                        resolve(response)
                }).catch((error)=>{
                    reject(error)    
                }) 
            })
        },
        // 验证码登陆
        loginverifyCode({commit},requestdata){
            return new Promise((resolve,reject)=>{
                LoginverifyCode(requestdata).then((response)=>{
                    setToken(response.headers.authorization)
                    commit('SET_TOKEN',response.headers.authorization)
                    resolve(response)
                }).catch((error)=>{
                        reject(error)
                }) 
            })
        },
        // 退出
        logout({commit}){
            return new Promise((resolve,reject)=>{
                Logout().then(response=>{
                    removeToken()
                    commit('SET_TOKEN','')
                    resolve(response)
                }).catch(error=>{
                    reject(error)
                })
            })
        }

    }
}

export default login