import { is } from "tinymce";

export interface IBackendRes<T> {
    error?: string | null;
    message: string | string[];
    status: number | string;
    data?: T | null;
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


export interface ICategory {
    id?: string;
    categoryName: string;
    isActive: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
    [key: string]: any; // Add dynamic key
}

export interface IProduct {
    id?: string;
    imageURLs: string[];

    productName: string;
    skuCode: string;
    brand: string;
    countryOfOrigin: string;
    materials: string[];
    description: string;
    originalPrice?: number;
    sellingPrice?: number;
    stock?: number;

    variation1?: string;
    options1?: string[];
    variation2?: string;
    options2?: string[];
    skus?: {
        skuCode: string;
        option1?: string;
        option2?: string;
        originalPrice: number;
        sellingPrice: number;
        stock: number;

      
    }[];
    
    isActive?: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
    [key: string]: any; // Add dynamic key
}




export interface skuType {
    key: number;
    skuCode: string;
    option1?: string;
    option2?: string;
    originalPrice: number;
    sellingPrice: number;
    stock: number;
}

export interface OSku {
    productId: string;
    option1?: string;
    option2?: string;
    price: number;
    stock: number;
    discount: number;
}

export interface CategoryType {
    id?: string | number;
    categoryName: string;
    categoryIds?: string[];
    subCategories?: {
        id: number;
        categoryName: string;
        isActive: string;
    }[];
    isActive: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
    [key: string]: any; // Add dynamic key

}

export interface ProductType {
    id?: string;
    imageURLs?: string[];
    productName: string;
    originalPrice?: number;
    sellingPrice?: number;
    quantitySold: number;

    isActive: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
    [key: string]: any; // Add dynamic key
    

}