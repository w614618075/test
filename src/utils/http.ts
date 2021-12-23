import { useAuth } from "context/auth-context"
import { config } from "process"
import qs from "qs"
import { idText } from "typescript"
import * as auth from '../auth-provider'
const apiUrl = process.env.REACT_APP_API_URL

interface Config extends RequestInit { // 继承了RequestInit里的所有类型
    token?: string,
    data?: object,
}
export const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {
    const config = {
        method: "GET",
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? `application/json` : '',
        },
        ...customConfig
    }

    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data || {})
    }
    // axios会自己抛出状态错误，而fetch不会，比如status===401，那么fetch是不会自己抛出来的
    return window.fetch(`${apiUrl}/${endpoint}`, config)
        .then(async response => {
            if (response.status === 401) {
                await auth.logout()
                window.location.reload()
                return Promise.reject({ message: "请重新登陆" })
            }
            const data = await response.json()
            if (response.ok) {
                return data
            } else {
                return Promise.reject(data)
            }
        })
}

export const useHttp = () => {

    const {user}=useAuth()
    // 讲解 TS 操作符
    return (...[endpoint,config]:Parameters<typeof http>)=>http (endpoint,{...config,token:user?.token})
}
