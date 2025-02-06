import { IBackendRes, OProduct, OSku } from "../types/backend";
import axios from "../config/axios";

export const callCreateProduct = (data: any) => {
    return axios.post<IBackendRes<OProduct>>('/api/v1/products', data, {
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