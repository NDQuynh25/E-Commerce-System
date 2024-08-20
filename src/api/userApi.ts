import axios from '../config/axios'
import { IBackendRes, IUser, IModelPaginate } from '../types/backend'

export const callCreateUser = (user: IUser) => {
    return axios.post<IBackendRes<IUser>>('/api/v1/users', { ...user })
}

export const callUpdateUser = (user: IUser) => {
    return axios.put<IBackendRes<IUser>>(`/api/v1/users`, { ...user })
}

export const callDeleteUser = (id: string) => {
    return axios.delete<IBackendRes<IUser>>(`/api/v1/users/${id}`);
}

export const callFetchUser = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IUser>>>(`/api/v1/users/getAll?${query}`);
}