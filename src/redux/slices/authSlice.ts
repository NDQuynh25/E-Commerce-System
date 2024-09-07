import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callFetchAccount } from '../../api/authApi';
import { IGetAccount } from '../../types/backend';


// //First, create the thunk
const fetchAccount: AsyncThunk<IGetAccount | undefined, void, {}> = createAsyncThunk(
    'account/fetchAccount',
    async () => {
        const response = await callFetchAccount();
        return response.data;
    }
);

export interface IState {
    isAuthenticated: boolean;
    isLoading: boolean;
    isRefreshToken: boolean;
    errorRefreshToken: string;
    user: {
        id: number | string;
        email: string;
        fullname: string;
        avatar?: string;
        role: {
            id: number | string;
            name: string;
            permissions?: {
                id: number | string;
                name: string;
                api_access: string;
                method: string;
            }[]
        }
    };
    activeMenu: string;
}

const initialState: IState = {
    isAuthenticated: false,
    isLoading: true,
    isRefreshToken: false,
    errorRefreshToken: "",
    user: {
        id: "",
        email: "",
        fullname: "",
        avatar: "",
        role: {
            id: "",
            name: "",
            permissions: [],
        },
    },

    activeMenu: 'home'
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
       
        setRefreshTokenAction: (state, action) => {
            state.isRefreshToken = action.payload?.status ?? false;
            state.errorRefreshToken = action.payload?.message ?? "";
        },
        setLogoutAction: (state, action) => {
            localStorage.removeItem('access_token');
            state.isAuthenticated = false;
            state.user = {
                id: "",
                email: "",
                fullname: "",
                avatar: "",
                role: {
                    id: "",
                    name: "",
                    permissions: [],
                },
            }
        },
        setUserLoginInfo: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user.id = action.payload?.id;
            state.user.email = action.payload?.email;
            state.user.fullname = action.payload?.fullname;
            state.user.avatar = action.payload?.avatar;
            state.user.role.id = action?.payload?.role?.id ?? -1;
            state.user.role.name = action?.payload?.role?.name ?? "";
            state.user.role.permissions = action?.payload?.role?.permissions ?? [];
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchAccount.pending, (state, action) => {
            if (action.payload) {
                state.isAuthenticated = false;
                state.isLoading = true;
            }
        })

        builder.addCase(fetchAccount.fulfilled, (state, action) => {
            if (action.payload) {
                state.isAuthenticated = true;
                state.isLoading = false;
                
            }
        })

        builder.addCase(fetchAccount.rejected, (state, action) => {
            if (action.payload) {
                state.isAuthenticated = false;
                state.isLoading = false;
            }
        })

    },
});

export const {  setRefreshTokenAction, setLogoutAction, setUserLoginInfo } = authSlice.actions;
export default authSlice.reducer;