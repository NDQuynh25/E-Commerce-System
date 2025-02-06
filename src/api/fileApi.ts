import axios from '../config/axios';
import { IBackendRes } from '../types/backend';

export const callUploadFile = (file: any) => { 
    return axios.post<IBackendRes<string[]>>('/api/v1/files/upload', file, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export const callDeleteFile = (imageURL: string) => {
    return axios.delete<IBackendRes<boolean>>('/api/v1/files/delete', { params: { imageURL } });
};
