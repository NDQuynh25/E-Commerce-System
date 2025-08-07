import axios from '../config/axios'
import { IBackendRes } from '../types/backend'
import { IAccount, IGetAccount, IUser } from '../types/backend'



export const callRegister = ( email: string, password: string, confirmPassword: String) => {
    return axios.post<IBackendRes<IUser>>('/api/v1/auth/register', {email, password, confirmPassword })
}

export const callLogin = (username: string, password: string) => {
    return axios.post<IBackendRes<IAccount>>('/api/v1/auth/login', { email: username, password })
}
export const callLoginGoogle = (idToken: string) => {
    return axios.post<IBackendRes<IAccount>>('/api/v1/auth/login/google', { idToken: idToken })
}
export const callLoginFacebook = (accessToken: string) => {
    return axios.post<IBackendRes<IAccount>>('/api/v1/auth/login/facebook', { accessToken: accessToken })
}
export const callFetchAccount = () => {
    return axios.get<IBackendRes<IGetAccount>>('/api/v1/auth/account')
}

export const callRefreshToken = () => {
    return axios.get<IBackendRes<IAccount>>('/api/v1/auth/refresh')
}

export const callLogout = () => {
    return axios.post<IBackendRes<string>>('/api/v1/auth/logout')
}