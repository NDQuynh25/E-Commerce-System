import axios from '../config/axios';
import { IBackendRes, CategoryType, IModelPaginate } from '../types/backend';



export const callCreateCategory = (data: CategoryType) => {
    return axios.post<IBackendRes<CategoryType>>('/api/v1/categories', data, {
        headers: {
           'Content-Type': 'application/json'
        }
    });
}

export const callUpdateCategory = (id: string, data: CategoryType) => {
    return axios.put<IBackendRes<CategoryType>>(`/api/v1/categories/${id}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const callGetCategories = (query: string) => {
    
    return axios.get<IBackendRes<IModelPaginate<CategoryType>>>(`/api/v1/categories?${query}`);
}

export const callGetCategory = (id: string) => {
    return axios.get<IBackendRes<CategoryType>>(`/api/v1/categories/${id}`);
}