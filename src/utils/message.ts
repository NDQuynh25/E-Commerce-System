


import { message } from 'antd';




export const showMessage = (status: 'success' | 'error', content: string) => {
  message.open({
    type: status,
    content: content,
    duration: 5,
  });
};
