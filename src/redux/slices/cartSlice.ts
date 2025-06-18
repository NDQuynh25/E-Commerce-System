import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


import { IBackendRes, IModelPaginate, CategoryType, ICartItem } from '../../types/backend';
import {callGetCartItems} from '../../api/cartApi';
import { showMessage } from '../../utils/message';

// First, create the thunk


export interface IState {
    isFetching: boolean;
    isEdit: boolean;
    meta: {
        page: number;
        page_size: number;
        total_elements: number;
        total_pages: number;
    },
    results: ICartItem[],
    result: ICartItem | null
}

const initialState: IState = {
    isFetching: true,
    isEdit: false,
    meta: {
        page: 0,
        page_size: 10,
        total_elements: 0,
        total_pages: 0
    },
    results: [] as ICartItem[],
    result: {} as ICartItem

}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setActiveMenu: (state, action) => {
            // state.activeMenu = action.payload;
        },

        setEdit: (state, action) => {
            state.isEdit = action.payload;
        }
    },
    extraReducers: (builder) => {

        // Thunk: Fetch Categories List
        builder.addCase(fetchCartItems.pending, (state, action) => {
            state.isFetching = true;
        });
        
        builder.addCase(fetchCartItems.fulfilled, (state, action) => {
            state.isFetching = false;
            if (action.payload && action.payload.status === 404) {
                showMessage('error', "Không tìm thấy dữ liệu");
                state.results = [];
            } else if (action.payload && action.payload.status === 200 && action.payload.data) {
                state.meta = action.payload.data?.meta ? action.payload.data.meta : state.meta;
                state.results = action.payload.data?.results ? action.payload.data.results : state.results;
            } else {
                showMessage('error', "Lỗi hệ thống");
            }
        });

        builder.addCase(fetchCartItems.rejected, (state, action) => {
            state.isFetching = false;
            showMessage('error', "Lỗi hệ thống");
        });

       

       
    },
});

export const fetchCartItems = createAsyncThunk<
    IBackendRes<IModelPaginate<ICartItem>>,
    {userId: string, query: string },
    {}
>(
    'cartItems/fetchCartItems',
    async ({userId, query}) => {
        const response: IBackendRes<IModelPaginate<ICartItem>> = await callGetCartItems(userId, query);
        console.log(response);
        return response;
    }
);




export const { setActiveMenu, setEdit} = cartSlice.actions;

export default cartSlice.reducer;