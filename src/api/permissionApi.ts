import { IBackendRes, IModelPaginate, IPermission } from "../types/backend";
import axios from "../config/axios";

export const callFetchPermission = (query: string) => {
    console.log('query: ', query);
    return axios.get<IBackendRes<IModelPaginate<IPermission>>>(`/api/v1/permissions/getAll?${query}`);
}

export const callCreatePermission = (data: IPermission) => {
    return axios.post<IBackendRes<IPermission>>('/api/v1/permissions/create', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const callUpdatePermission = (data: IPermission, id: string) => {
    return axios.put<IBackendRes<IPermission>>(`/api/v1/permissions/update/${id}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const callDeletePermission = (id: string) => {
    return axios.delete<IBackendRes<IPermission>>(`/api/v1/permissions/delete/${id}`);
}

export const callFetchPermissionById = (id: string) => {
    return axios.get<IBackendRes<IPermission>>(`/api/v1/permissions/get/${id}`);
}