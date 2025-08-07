import axios from '../config/axios';
import { IBackendRes, ICart, ICartItem, IModelPaginate } from '../types/backend';

export const checkCartItems = (cartItems: ICartItem[], userId: string) => {
    return axios.post<IBackendRes<ICartItem[]>>(`/api/v1/orders/user/${userId}/check-cart-items`, cartItems, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}