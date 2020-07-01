import cookie from "cookie_js";
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