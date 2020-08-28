import axios from 'axios'
let userInfo = sessionStorage.getItem('userInfo')
if (userInfo) {
    let token = JSON.parse(userInfo).access_token || ''
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
axios.defaults.baseURL = 'http://gb.lpykyz.com'

export default axios 