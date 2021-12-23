import React, { ReactNode, useState } from 'react'
import * as auth from 'auth-provider'
import { User } from 'screens/project-list/search-panel'
import { http } from 'utils/http'
import { useMount } from 'utils'
interface AuthForm {
    username: string,
    password: string
}

const bootstrapUser = async () => {  // 初始化user
    let user = null
    const token = auth.getToken() // 调用getToken函数拿到token
    if (token) { // 如果有token
        const data = await http("me", { token }) // 就带着token去请求me这个接口
        user = data.user // 拿到user
    }
    return user
}

const AuthContext = React.createContext<{
    user: User | null,
    login: (form: AuthForm) => Promise<void>,
    register: (form: AuthForm) => Promise<void>,
    logout: () => Promise<void>
} | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // point free
    const [user, setUser] = useState<User | null>(null)
    const login = (form: AuthForm) => auth.login(form).then(setUser)  //user => setUser(user)
    const register = (form: AuthForm) => auth.register(form).then(setUser)  //user => setUser(user)
    const logout = () => auth.logout().then(user => setUser(null))
    useMount(() => {
        bootstrapUser().then(setUser)
    })
    return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}



export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context
}
