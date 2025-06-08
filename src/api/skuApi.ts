import { IBackendRes, skuType } from "../types/backend";
import axios from "../config/axios";



export const callGetSku = (id: string) => {
    return axios.get<IBackendRes<skuType>>(`/api/v1/skus/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
