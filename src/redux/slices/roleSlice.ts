import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callFetchRole } from '../../api/roleApi';

import { IRole, IBackendRes, IModelPaginate } from '../../types/backend';

// First, create the thunk


export interface IState {
    isFetching: boolean;
    meta: {
        page: number;
        page_size: number;
        total_elements: number;
        total_pages: number;
    },
    results: IRole[]
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
            if (action.payload && action.payload.data) {
                console.log(action.payload.data.results);
                state.isFetching = false;
                state.meta = action.payload.data.meta;
                state.results = action.payload.data.results;
            }
        });

        builder.addCase(fetchRole.rejected, (state, action) => {
            state.isFetching = false;
        });
    },
});

export const fetchRole = createAsyncThunk<
    IBackendRes<IModelPaginate<IRole>>,
    { query: string },
    {}
>(
    'role/fetchRole',
    async ({ query }) => {
        const response: IBackendRes<IModelPaginate<IRole>> = await callFetchRole(query);
        return response;
    }
);

export const { setActiveMenu, } = roleSlice.actions;

export default roleSlice.reducer;