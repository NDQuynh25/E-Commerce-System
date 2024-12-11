export interface IBackendRes<T> {
    error?: string;
    message: string | string[];
    status: number | string;
    data?: T;
}

export interface IModelPaginate<T> {
    meta: {
        page: number;
        page_size: number;
        total_elements: number;
        total_pages: number;
    },
    results: T[]
}

export interface IAccount {
    access_token: string;
    user: {
        id: number;
        email: string;
        fullname: string;
        role: {
            id: number;
            roleName: string;
            permissions: {
                id: number;
                permissionName: string;
                apiAccess: string;
                method: string;
            }[]
        }
    }
}

export interface IGetAccount extends Omit<IAccount, "access_token"> { }


export interface IUser {
    id?: string;
    fullName?: string;
    email: string;
    phoneNumber?: string;
    password?: string;
    confirmPassword?: string;
    gender?: string;
    address?: string;
    dateOfBirth: string;
    avatar: string;
    avatarFile?: File | null;
    role?: {
        id: string;
        roleName: string;
    }
    isActive: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
    [key: string]: any; // Add dynamic key
}


export interface IPermission {
    id: string;
    permissionName: string;
    apiAccess: string;
    method: string;
    isActive: string;
    description: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
    [key: string]: any; // Add dynamic key

}

export interface IRole {
    id?: string;
    roleName: string;
    isActive: string;
    permissions: IPermission[];
    permissionIds: string[];
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
    [key: string]: any; // Add dynamic key
}

