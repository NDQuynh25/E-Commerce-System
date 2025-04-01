import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


import { IBackendRes, IModelPaginate, CategoryType } from '../../types/backend';
import { callGetCategories, callGetCategory } from '../../api/categoryApi';
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
    results: CategoryType[],
    result: CategoryType | null
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
    results: [] as CategoryType[],
    result: {} as CategoryType
};




const categorySlice = createSlice({
    name: 'category',
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
        builder.addCase(fetchCategories.pending, (state, action) => {
            state.isFetching = true;
        });
        
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
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

        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.isFetching = false;
            showMessage('error', "Lỗi hệ thống");
        });

        // Thunk: Fetch Category 
        builder.addCase(fetchCategory.pending, (state, action) => {
            state.isFetching = true;
        });

        builder.addCase(fetchCategory.fulfilled, (state, action) => {
            state.isFetching = false;
            if (action.payload && action.payload.status === 404) {
                showMessage('error', "Không tìm thấy dữ liệu");
                state.result = null;
               
            } else if (action.payload && action.payload.status === 200 && action.payload.data) {
                state.result = action.payload.data;
            } else {
                showMessage('error', "Lỗi hệ thống");
            }
        });

        builder.addCase(fetchCategory.rejected, (state, action) => {
            state.isFetching = false;
            showMessage('error', "Lỗi hệ thống");
        });

       
    },
});

export const fetchCategories = createAsyncThunk<
    IBackendRes<IModelPaginate<CategoryType>>,
    { query: string },
    {}
>(
    'categories/fetchCategories',
    async ({ query }) => {
        const response: IBackendRes<IModelPaginate<CategoryType>> = await callGetCategories(query);
        console.log(response);
        return response;
    }
);

export const fetchCategory = createAsyncThunk<
    IBackendRes<CategoryType>,
    { id: string },
    {}
    >(
        'category/fetchCategory',
        async ({ id }) => {
            const response: IBackendRes<CategoryType> = await callGetCategory(id);
            return response;
        }
    );



export const { setActiveMenu, setEdit} = categorySlice.actions;

export default categorySlice.reducer;