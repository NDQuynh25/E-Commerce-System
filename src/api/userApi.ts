import axios from '../config/axios'
import { IBackendRes, IUser, IModelPaginate } from '../types/backend'

export const callCreateUser = (userFormData: FormData) => {
    return axios.post<IBackendRes<IUser>>('/api/v1/users/create',  userFormData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const callUpdateUser = (id: string, userFormData: FormData) => {
    return axios.put<IBackendRes<IUser>>(`/api/v1/users/update/${id}`, userFormData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const callDeleteUser = (id: string) => {
    return axios.delete<IBackendRes<IUser>>(`/api/v1/users/${id}`);
}

export const callFetchUser = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IUser>>>(`/api/v1/users/getAll?${query}`);
}