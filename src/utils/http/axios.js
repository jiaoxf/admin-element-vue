import axios from 'axios'
import qs from 'qs'
import router, { resetRouter } from '@/router'

import { Message } from 'element-ui'

const contentTypes = {
    json: 'application/json; charset=utf-8',
    urlencoded: 'application/x-www-form-urlencoded; charset=utf-8',
    multipart: 'multipart/form-data'
}

// 创建axios实例
const service = axios.create({
    baseURL: 'http://www.cdraindrop.top', // api的base_url
    // baseURL: '/api', // api的base_url
    // withCredentials: true, // 跨域请求时是否发送cookies
    crossDomain: true,
    timeout: 10000 // 请求超时设置
})
// 请求拦截器
service.interceptors.request.use(
    config => {
        if (config.contentType && config.contentType == 'multipart') {
            config.headers = {
                'Content-Type': contentTypes.multipart
            }
        }
        config.headers['token'] = sessionStorage.getItem('login-user')
        if (!config.data) {
            config.data = {}
        }
        // console.log(config)
        // 设置公共参数
        // console.log(qs.stringify(config.data))
        return config
    },
    error => {
        // 处理请求错误
        console.log(error) // 用于调试
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        // let res = respone.data; // 如果返回的结果是data.data的，嫌麻烦可以用这个，return res
        if (response.data.code == 501) {
			Message.error(response.data.message)
			sessionStorage.clear()
			resetRouter()
			router.push('/login')
        } else if (response.data.code == 500) {
            Message.error(response.data.message)
        } else {
            return response.data
        }
    },
    error => {
        console.log('error：' + error) // 用于调试
        return Promise.reject(error)
    }
)

export default service
