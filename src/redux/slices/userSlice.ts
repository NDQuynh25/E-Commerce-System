import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callFetchUser } from '../../api/userApi';

import { IUser, IBackendRes, IModelPaginate } from '../../types/backend';

// First, create the thunk


export interface IState {
    isFetching: boolean;
    meta: {
        page: number;
        page_size: number;
        total_elements: number;
        total_pages: number;
    },
    results: IUser[]
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




const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setActiveMenu: (state, action) => {
            // state.activeMenu = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.isFetching = true;
        });
        
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            if (action.payload && action.payload.data) {
                console.log(action.payload.data.results);
                state.isFetching = false;
                state.meta = action.payload.data.meta;
                state.results = action.payload.data.results;
            }
        });

        builder.addCase(fetchUser.rejected, (state, action) => {
            state.isFetching = false;
        });
    },
});

export const fetchUser = createAsyncThunk<
    IBackendRes<IModelPaginate<IUser>>,
    { query: string },
    {}
>(
    'user/fetchUser',
    async ({ query }) => {
        const response: IBackendRes<IModelPaginate<IUser>> = await callFetchUser(query);
        console.log(response);
        return response;
    }
);

export const { setActiveMenu, } = userSlice.actions;

export default userSlice.reducer;