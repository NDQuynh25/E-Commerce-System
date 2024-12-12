import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callFetchPermission } from '../../api/permissionApi';

import { IPermission, IBackendRes, IModelPaginate } from '../../types/backend';

// First, create the thunk


export interface IState {
    isFetching: boolean;
    meta: {
        page: number;
        page_size: number;
        total_elements: number;
        total_pages: number;
    },
    results: IPermission[]
}

const initialState: IState = {
    isFetching: true,
    meta: {
        page: 1,
        page_size: 10,
        total_elements: 0,
        total_pages: 0
    },
    results: []
};




const permissionSlice = createSlice({
    name: 'permission',
    initialState,
    reducers: {
        setActiveMenu: (state, action) => {
            // state.activeMenu = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPermission.pending, (state, action) => {
            state.isFetching = true;
        });
        
        builder.addCase(fetchPermission.fulfilled, (state, action) => {
            console.log(action.payload.data?.results);
            if (action.payload && action.payload.data) {
                console.log(action.payload.data.results);
                state.isFetching = false;
                state.meta = action.payload.data.meta;
                state.results = action.payload.data.results;
            }
        });

        builder.addCase(fetchPermission.rejected, (state, action) => {
            state.isFetching = false;
        });
    },
});

export const fetchPermission = createAsyncThunk<
    IBackendRes<IModelPaginate<IPermission>>,
    { query: string },
    {}
>(
    'permission/fetchPermission',
    async ({ query }) => {
        const response: IBackendRes<IModelPaginate<IPermission>> = await callFetchPermission(query);
        return response;
    }
);

export const { setActiveMenu, } = permissionSlice.actions;

export default permissionSlice.reducer;