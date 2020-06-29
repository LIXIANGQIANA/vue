import cookie from "cookie_js";
// const token='admin_token';
// export function setToken(token){
//     cookie.set('token',token)
// }
// export function getToken(){
//     return cookie.get('token')
// }

const TokenKey = 'token'

export function getToken () {
  return cookie.get(TokenKey)
}

export function setToken (token) {
    cookie.set(TokenKey, token)
}
export function removeToken () {
    return cookie.remove(TokenKey)
}