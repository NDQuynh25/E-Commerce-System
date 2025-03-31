import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callGetRole } from '../../api/roleApi';

import { IRole, IBackendRes, IModelPaginate } from '../../types/backend';
import { showMessage } from '../../utils/message';



// First, create the thunk


export interface IState {
    isFetching: boolean;
    meta: {
        page: number;
        page_size: number;
        total_elements: number;
        total_pages: number;
    },
    results: IRole[],
    result: IRole
};
    

const initialState: IState = {
    isFetching: true,
    meta: {
        page: 0,
        page_size: 10,
        total_elements: 0,
        total_pages: 0
    },
    results: [] as IRole[],
    result: {} as IRole
};


const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        setActiveMenu: (state, action) => {
            // state.activeMenu = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRole.pending, (state, action) => {
            state.isFetching = true;
            
        });
        
        builder.addCase(fetchRole.fulfilled, (state, action) => {
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

        builder.addCase(fetchRole.rejected, (state, action) => {
            state.isFetching = false;
            showMessage('error', "Lỗi hệ thống");
        });
    },
});

export const fetchRole = createAsyncThunk<
    IBackendRes<IModelPaginate<IRole>>,
    {id?: string,  query?: any},
    {}
>(
    'role/fetchRole',
    async ({ query }: { query?: any }) => {
        const response: IBackendRes<IModelPaginate<IRole>> = await callGetRole(query);
        return response;
    }
);

export const { setActiveMenu, } = roleSlice.actions;

export default roleSlice.reducer;