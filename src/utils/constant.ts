import { grey, green, blue, red, orange } from '@ant-design/colors';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import { IPermission } from '../types/backend';


export const path = {
    HOME_PAGE: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    LOGIN_ADMIN: '/admin/login',
    PRODUCT: '/product',
    INTRODUCE: '/introduce',
    NEWS: '/news',
    CONTACT: '/contact',
    CART: '/cart',
    
    ADMIN: '/admin/*',
    USER: '/*',

}

export const role = {
    ADMIN: 'ROLE_ADMIN',
    VENDOR: 'ROLE_VENDOR',
    USER: 'ROLE_USER'
};
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
};

export const groupByPermission = (data: any[]): { module: string; permissions: IPermission[] }[] => {
    const groupedData = groupBy(data, x => x.module);
    return map(groupedData, (value, key) => {
        return { module: key, permissions: value as IPermission[] };
    });
};

export const info = {
    ADDRESS: 'Số 1',
    EMAIL: 'nguyenquynhhy03@gmail.com',
    PHONE: '1900 6750',
    FACEBOOK: 'https://www.facebook.com/',
    INSTAGRAM: 'https://www.instagram.com/',
    YOUTUBE: 'https://www.youtube.com/',
    TWITTER: 'https://twitter.com/',
    LINKEDIN: 'https://www.linkedin.com/',
    ZALO: 'https://zalo.me/',
    GOOGLE: 'https://www.google.com/'
}

export const buyingGuideHTML = `
<p><strong>Bước 1:</strong>&nbsp;Truy cập website v&agrave; lựa chọn sản phẩm&nbsp;cần mua</p>
<p><strong>Bước 2:</strong>&nbsp;Click v&agrave; sản phẩm muốn mua, m&agrave;n h&igrave;nh hiển thị ra pop up với c&aacute;c lựa chọn sau</p>
<p>Nếu bạn muốn tiếp tục mua h&agrave;ng: Bấm v&agrave;o phần tiếp tục mua h&agrave;ng để lựa chọn th&ecirc;m sản phẩm v&agrave;o giỏ h&agrave;ng</p>
<p>Nếu bạn muốn xem giỏ h&agrave;ng để cập nhật sản phẩm: Bấm v&agrave;o xem giỏ h&agrave;ng</p>
<p>Nếu bạn muốn đặt h&agrave;ng v&agrave; thanh to&aacute;n cho sản phẩm n&agrave;y vui l&ograve;ng bấm v&agrave;o: Đặt h&agrave;ng v&agrave; thanh to&aacute;n</p>
<p><strong>Bước 3:</strong>&nbsp;Lựa chọn th&ocirc;ng tin t&agrave;i khoản thanh to&aacute;n</p>
<p>Nếu bạn đ&atilde; c&oacute; t&agrave;i khoản vui l&ograve;ng nhập th&ocirc;ng tin t&ecirc;n đăng nhập l&agrave; email v&agrave; mật khẩu v&agrave;o mục đ&atilde; c&oacute; t&agrave;i khoản tr&ecirc;n hệ thống</p>
<p>Nếu bạn chưa c&oacute; t&agrave;i khoản v&agrave; muốn đăng k&yacute; t&agrave;i khoản vui l&ograve;ng điền c&aacute;c th&ocirc;ng tin c&aacute; nh&acirc;n để tiếp tục đăng k&yacute; t&agrave;i khoản. Khi c&oacute; t&agrave;i khoản bạn sẽ dễ d&agrave;ng theo d&otilde;i được đơn h&agrave;ng của m&igrave;nh</p>
<p>Nếu bạn muốn mua h&agrave;ng m&agrave; kh&ocirc;ng cần t&agrave;i khoản vui l&ograve;ng nhấp chuột v&agrave;o mục đặt h&agrave;ng kh&ocirc;ng cần t&agrave;i khoản</p>
<p><strong>Bước 4:</strong>&nbsp;Điền c&aacute;c th&ocirc;ng tin của bạn để nhận đơn h&agrave;ng, lựa chọn h&igrave;nh thức thanh to&aacute;n v&agrave; vận chuyển cho đơn h&agrave;ng của m&igrave;nh</p>
<p><strong>Bước 5:</strong>&nbsp;Xem lại th&ocirc;ng tin đặt h&agrave;ng, điền ch&uacute; th&iacute;ch v&agrave; gửi đơn h&agrave;ng</p>
<p>Sau khi nhận được đơn h&agrave;ng bạn gửi ch&uacute;ng t&ocirc;i sẽ li&ecirc;n hệ bằng c&aacute;ch gọi điện lại để x&aacute;c nhận lại đơn h&agrave;ng v&agrave; địa chỉ của bạn.</p>
<p>Tr&acirc;n trọng cảm ơn.</p>
`;