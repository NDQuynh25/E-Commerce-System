export interface IBackendRes<T> {
    error?: string | string[];
    message: string;
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
            name: string;
            permissions: {
                id: number;
                name: string;
                api_access: string;
                method: string;
            }[]
        }
    }
}

export interface IGetAccount extends Omit<IAccount, "access_token"> { }


export interface IUser {
    id?: string;
    fullname?: string;
    email: string;
    phoneNumber?: string;
    password?: string;
    confirmPassword?: string;
    gender?: string;
    address?: string;
    dateOfBirth: string;
    avatar: string;
    avatarFile?: File;
    role?: {
        id: string;
        name: string;
    }
    isActive: number;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
}


export interface IPermission {
    id?: string;
    name?: string;
    apiPath?: string;
    method?: string;

    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;

}

export interface IRole {
    id?: string;
    name: string;
    description: string;
    active: boolean;
    permissions: IPermission[] | string[];

    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
}

