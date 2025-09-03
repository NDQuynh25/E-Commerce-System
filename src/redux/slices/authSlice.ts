import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callFetchAccount } from '../../api/authApi';
import { IGetAccount, IBackendRes } from '../../types/backend';


export const fetchAccount = createAsyncThunk<IBackendRes<IGetAccount>>(
    'account/fetchAccount',
    async () => {
        const response = await callFetchAccount();
        return response
    }
);


export interface IState {
    isAuthenticated: boolean;
    isLoading: boolean;
    isRefreshToken: boolean;
    errorRefreshToken: string;
    account_info: {
        id: number | string;
        email: string;
        fullName: string;
        avatar?: string;
        cartId?: string;
        role: {
            id: number | string;
            roleName: string;
            permissions?: {
                id: number | string;
                name: string;
                apiAccess: string;
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
    account_info: {
        id: "",
        email: "",
        fullName: "",
        avatar: "",
        cartId: "",
        role: {
            id: "",
            roleName: "",
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

        


        
        setLogoutAction: (state) => {
            localStorage.removeItem('access_token');
            localStorage.removeItem("persist:auth");
            state.isAuthenticated = false;
            state.account_info = {
                id: "",
                email: "",
                fullName: "",
                avatar: "",
                cartId: "",
                role: {
                    id: "",
                    roleName: "",
                    permissions: [],
                },
            }
        },
        setUserLoginInfo: (state, action) => {
            console.log(action.payload);
            state.isAuthenticated = true;
            state.isLoading = false;
            state.account_info = {
                id: action.payload?.id ?? "",
                email: action.payload?.email ?? "",
                fullName: action.payload?.fullName ?? "",
                avatar: action.payload?.avatar ?? "",
                cartId: action.payload?.cartId ?? "",
                role: {
                    id: action.payload?.role?.id ?? "",
                    roleName: action.payload?.role?.roleName ?? "",
                    permissions: action.payload?.role?.permissions ?? [],
                },
            };
        }
        
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchAccount.pending, (state) => {
            state.isAuthenticated = false;
            state.isLoading = true;
            state.account_info = {
                id: "",
                email: "",
                fullName: "",
                avatar: "",
                cartId: "",
                role: {
                    id: "",
                    roleName: "",
                    permissions: [],
                },
            }
            
        })

        builder.addCase(fetchAccount.fulfilled, (state, action) => {
            if (action.payload.status === 200) {
                state.isAuthenticated = true;
                state.isLoading = false;
                state.account_info = {
                    id: action.payload.data?.account_info?.id?? "",
                    email: action.payload.data?.account_info?.email?? "",
                    fullName: action.payload.data?.account_info?.fullName?? "",
                    avatar: action.payload.data?.account_info?.avatar?? "",
                    cartId: action.payload.data?.account_info?.cartId?? "",
                    role: {
                        id: action.payload.data?.account_info?.role?.id?? "",
                        roleName: action.payload.data?.account_info?.role?.roleName?? "",
                        permissions: action.payload.data?.account_info?.role?.permissions?? [],
                    }
                }
                
                
            }
        })

        builder.addCase(fetchAccount.rejected, (state) => {
            state.isAuthenticated = false;
            state.isLoading = false;
            
        })

    },
});

export const {  setRefreshTokenAction, setLogoutAction, setUserLoginInfo } = authSlice.actions;
export default authSlice.reducer;