import { IBackendRes, IModelPaginate, IPermission } from "../types/backend";
import axios from "../config/axios";

export const callFetchPermission = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IPermission>>>(`/api/v1/permissions/getAll${query}`);
}