import axios from '../config/axios';
import { IBackendRes, ICart, ICartItem, IModelPaginate } from '../types/backend';

export const callAddItemToCart = (userId: string, data: ICartItem) => {
    return axios.post<IBackendRes<ICartItem>>(`/api/v1/cart/user/${userId}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
        
    })
}

export const callUpdateCartItem = (userId: string, cartItemId: string, data: ICartItem) => {
    return axios.put<IBackendRes<ICart>>(`/api/v1/cart/user/${userId}/item/${cartItemId}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }

    })
}

export const callGetCartItems = (userId: string, query: string) => {
    return axios.get<IBackendRes<IModelPaginate<ICartItem>>>(`/api/v1/cart/user/${userId}${query}`);
      
}