import { IBackendRes, IModelPaginate, IProduct, OSku, ProductType } from "../types/backend";
import axios from "../config/axios";

export const callCreateProduct = (data: any) => {
    return axios.post<IBackendRes<IProduct>>('/api/v1/products', data, {
        headers: {
           'Content-Type': 'form-data'
        }
    });
}
export const callUpdateProduct = (id: string, formData: FormData) => {
    return axios.put<IBackendRes<IProduct>>(`/api/v1/products/${id}`, formData, {
        headers: {
            'Content-Type': 'form-data'
        }
    });
}

export const callUploadImages = (data: FormData) => {
    return axios.post<IBackendRes<any>>('/api/v1/products/images', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export const callGetProducts = (query: string) => {
    
    return axios.get<IBackendRes<IModelPaginate<IProduct>>>(`/api/v1/products?${query}`, {
        
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const callGetProduct = (id: string) => {
    return axios.get<IBackendRes<IProduct>>(`/api/v1/products/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
