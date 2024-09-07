import { grey, green, blue, red, orange } from '@ant-design/colors';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import { IPermission } from '../types/backend';


export const path = {
    HOME_PAGE: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    LOGIN_ADMIN: '/admin/login',
    ADMIN: '/admin/*',
    SELL: '/sell'
}

export const role = {
    ADMIN: 'ROLE_ADMIN',
    VENDOR: 'ROLE_VENDOR',
    USER: 'ROLE_USER'
}
export function colorMethod(method: "POST" | "PUT" | "GET" | "DELETE" | string) {
    switch (method) {
        case "POST":
            return green[6]
        case "PUT":
            return orange[6]
        case "GET":
            return blue[6]
        case "DELETE":
            return red[6]
        default:
            return grey[10];
    }
}

export const groupByPermission = (data: any[]): { module: string; permissions: IPermission[] }[] => {
    const groupedData = groupBy(data, x => x.module);
    return map(groupedData, (value, key) => {
        return { module: key, permissions: value as IPermission[] };
    });
};
