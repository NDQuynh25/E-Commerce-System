import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


import { IBackendRes, ICartItem, ICart } from '../../types/backend';
import {callGetCartItems} from '../../api/cartApi';
import { checkCartItems } from '../../api/orderApi';
import { showMessage } from '../../utils/message';

// First, create the thunk


export interface IState {
    isFetching: boolean;
    isEdit: boolean;
    cartItemsSelected: ICartItem[],
    result: ICart,
  
}

const initialState: IState = {
    isFetching: true,
    isEdit: false,
    cartItemsSelected: [],
    result: {} as ICart

}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setActiveMenu: () => {
            // state.activeMenu = action.payload;
        },

        setEdit: (state, action) => {
            state.isEdit = action.payload;
        }
    },
    extraReducers: (builder) => {

        // Thunk: Fetch Categories List
        builder.addCase(fetchCart.pending, (state) => {
            state.isFetching = true;
        });
        
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.isFetching = false;
            if (action.payload && action.payload.status === 404) {
                showMessage('error', "Không tìm thấy dữ liệu");
                state.result = {} as ICart;
            } else if (action.payload && action.payload.status === 200 && action.payload.data) {
                state.result = action.payload.data;
            } else {
                showMessage('error', "Lỗi hệ thống");
                state.result = {} as ICart;
            }
        });

        builder.addCase(fetchCart.rejected, (state) => {
            state.isFetching = false;
            showMessage('error', "Lỗi hệ thống");
        });


        builder.addCase(fetchCheckCartItems.pending, (state) => {
            state.isFetching = true;
        });
        builder.addCase(fetchCheckCartItems.fulfilled, (state, action) => {
            state.isFetching = false;
            if (action.payload && (action.payload.status === 400 || action.payload.status === 404 || action.payload.status === 422)) {
                showMessage('error', "Giỏ hàng có sự thay đổi, vui lòng kiểm tra lại");
                state.cartItemsSelected = [];
            }
            if (action.payload && action.payload.status === 200 && action.payload.data) {
                console.log(action.payload.data);
                state.cartItemsSelected = action.payload.data;
                
            } else {
                showMessage('error', "Lỗi hệ thống");
                state.cartItemsSelected = [];
            }
        })

        builder.addCase(fetchCheckCartItems.rejected, (state) => {
            state.isFetching = false;
            showMessage('error', "Lỗi hệ thống");
        })

       

        
    },
});

export const fetchCart = createAsyncThunk<
    IBackendRes<ICart>,
    {userId: string, query: string }
>(
    'cart/fetchCart',
    async ({userId, query}) => {
        const response: IBackendRes<ICart> = await callGetCartItems(userId, query);
        console.log(response);
        return response;
    }
);

export const fetchCheckCartItems = createAsyncThunk<
    IBackendRes<ICartItem[]>,
    {userId: string, cartItems: ICartItem[]}
>(
    'cart/checkCartItems',
    async ({userId, cartItems}) => {
        const response: IBackendRes<ICartItem[]> = await checkCartItems(cartItems, userId);
        console.log(response);
        return response;
    }
)




export const { setActiveMenu, setEdit} = cartSlice.actions;

export default cartSlice.reducer;