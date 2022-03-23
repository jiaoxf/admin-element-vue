const TokenKey = 'login-user'
const UserNid = 'login-userNid'
export function getToken() {
    return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
    return sessionStorage.setItem(TokenKey, token)
}

export function setUserId(userNid) {
	return sessionStorage.setItem(UserNid, userNid)
}

export function getUserNid() {
	return sessionStorage.getItem(UserNid)
}

