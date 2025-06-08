import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IBackendRes, IModelPaginate, IProduct, skuType } from '../../types/backend';
import { callGetSku } from '../../api/skuApi';
import { showMessage } from '../../utils/message';

export interface IState {
    isFetching: boolean;
    meta: {
        page: number;
        page_size: number;
        total_elements: number;
        total_pages: number;
    },
    results: skuType[],
    result: skuType
}

const initialState: IState = {
    isFetching: true,
    meta: {
        page: 0,
        page_size: 10,
        total_elements: 0,
        total_pages: 0
    },
    results: [] as skuType[],
    result: {} as skuType
};

const skuSlice = createSlice({
    name: 'sku',
    initialState,
    reducers: {
        setActiveMenu: (state, action) => {
            // state.activeMenu = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Thunk: Fetch Products List
        // builder.addCase(fetchProducts.pending, (state, action) => {
        //     state.isFetching = true;
        // });
        
        // builder.addCase(fetchProducts.fulfilled, (state, action) => {
        //     state.isFetching = false;
        //     if (action.payload && action.payload.status === 404) {
        //         showMessage('error', "Không tìm thấy dữ liệu");
        //         state.results = [];
        //     } else if (action.payload && action.payload.status === 200 && action.payload.data) {
        //         state.meta = action.payload.data?.meta ? action.payload.data.meta : state.meta;
        //         state.results = action.payload.data?.results ? action.payload.data.results : state.results;
        //     } else {
        //         showMessage('error', "Lỗi hệ thống");
        //     }
        // });

        // builder.addCase(fetchProducts.rejected, (state, action) => {
        //     state.isFetching = false;
        //     showMessage('error', "Lỗi hệ thống");
        // });

        // Thunk: Fetch Product
        builder.addCase(fetchSku.pending, (state, action) => {
            state.isFetching = true;
        });

        builder.addCase(fetchSku.fulfilled, (state, action) => {
            state.isFetching = false;
            if (action.payload && action.payload.status === 404) {
                showMessage('error', "Không tìm thấy dữ liệu");
                state.result = {} as skuType;
            } else if (action.payload && action.payload.status === 200 && action.payload.data) {
                console.log('>>> action.payload.data', action.payload.data);
                state.result = action.payload.data;
            } else {
                showMessage('error', "Lỗi hệ thống");
            }
        });

        builder.addCase(fetchSku.rejected, (state, action) => {
            state.isFetching = false;
            showMessage('error', "Lỗi hệ thống");
        });
    },
});

// export const fetchSkus = createAsyncThunk<
//     IBackendRes<IModelPaginate<skuType>>,
//     { query: string },
//     {}
// >(
//     'skus/fetchSkus',
//     async ({ query }) => {
//         const response: IBackendRes<IModelPaginate<IProduct>> = await callGetSkus(query);
//         return response;
//     }
// );

export const fetchSku = createAsyncThunk<
    IBackendRes<skuType>,
    { id: string },
    {}
>(
    'sku/fetchSku',
    async ({ id }) => {
        const response: IBackendRes<skuType> = await callGetSku(id);
        return response;
    }
);

export const { setActiveMenu } = skuSlice.actions;

export default skuSlice.reducer;
