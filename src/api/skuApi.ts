import { IBackendRes, OSku } from "../types/backend";
import axios from "../config/axios";

export const callCreateSku = async (data: OSku[]) => {
    return axios.post<IBackendRes<any>>('/api/v1/skus', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const callUploadImages = async (data: FormData) => {
    return axios.post<IBackendRes<any>>('/api/v1/skus/images', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}