export function saveToken(token) {
localStorage.setItem('prephub_token', token)
}
export function clearToken() {
localStorage.removeItem('prephub_token')
}
export function getToken() {
return localStorage.getItem('prephub_token')
}