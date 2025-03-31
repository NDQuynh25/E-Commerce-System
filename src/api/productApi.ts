import { IBackendRes, IModelPaginate, IProduct, OSku, ProductType } from "../types/backend";
import axios from "../config/axios";

export const callCreateProduct = (data: any) => {
    return axios.post<IBackendRes<IProduct>>('/api/v1/products', data, {
        headers: {
           'Content-Type': 'application/json'
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
    console.log("res", axios.get<IBackendRes<IModelPaginate<ProductType>>>(`/api/v1/products?${query}`, {
            
            headers: {
                'Content-Type': 'application/json'
            }   
        }
    ));
    return axios.get<IBackendRes<IModelPaginate<ProductType>>>(`/api/v1/products?${query}`, {
        
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const callGetProduct = (id: string) => {
    return axios.get<IBackendRes<ProductType>>(`/api/v1/products/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
