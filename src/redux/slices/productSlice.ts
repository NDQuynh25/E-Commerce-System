import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IBackendRes, IModelPaginate, IProduct } from '../../types/backend';
import { callGetProducts, callGetProduct } from '../../api/productApi';
import { showMessage } from '../../utils/message';

export interface IState {
    isFetching: boolean;
    meta: {
        page: number;
        page_size: number;
        total_elements: number;
        total_pages: number;
    },
    results: IProduct[],
    result: IProduct
}

const initialState: IState = {
    isFetching: true,
    meta: {
        page: 0,
        page_size: 10,
        total_elements: 0,
        total_pages: 0
    },
    results: [] as IProduct[],
    result: {} as IProduct
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setActiveMenu: (state, action) => {
            // state.activeMenu = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Thunk: Fetch Products List
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.isFetching = true;
        });
        
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
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

        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isFetching = false;
            showMessage('error', "Lỗi hệ thống");
        });

        // Thunk: Fetch Product
        builder.addCase(fetchProduct.pending, (state, action) => {
            state.isFetching = true;
        });

        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.isFetching = false;
            if (action.payload && action.payload.status === 404) {
                showMessage('error', "Không tìm thấy dữ liệu");
                state.result = {} as IProduct;
            } else if (action.payload && action.payload.status === 200 && action.payload.data) {
                console.log('>>> action.payload.data', action.payload.data);
                state.result = action.payload.data;
            } else {
                showMessage('error', "Lỗi hệ thống");
            }
        });

        builder.addCase(fetchProduct.rejected, (state, action) => {
            state.isFetching = false;
            showMessage('error', "Lỗi hệ thống");
        });
    },
});

export const fetchProducts = createAsyncThunk<
    IBackendRes<IModelPaginate<IProduct>>,
    { query: string },
    {}
>(
    'products/fetchProducts',
    async ({ query }) => {
        const response: IBackendRes<IModelPaginate<IProduct>> = await callGetProducts(query);
        return response;
    }
);

export const fetchProduct = createAsyncThunk<
    IBackendRes<IProduct>,
    { id: string },
    {}
>(
    'product/fetchProduct',
    async ({ id }) => {
        const response: IBackendRes<IProduct> = await callGetProduct(id);
        return response;
    }
);

export const { setActiveMenu } = productSlice.actions;

export default productSlice.reducer;
