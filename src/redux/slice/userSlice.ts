
import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/backend";

interface IState {
    isFetching: boolean;
    meta: {
        page: number;
        pageSize: number;
        pages: number;
        total: number;
    },
    result: IUser[]
}


const initialState: IState = {
    isFetching: true,
    meta: {
        page: 1,
        pageSize: 10,
        pages: 0,
        total: 0
    },
    result: []
};



export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        
    },
});