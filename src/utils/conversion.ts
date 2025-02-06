

export const base64ToBlob = (base64String: string): Blob | null => {
    const arr = base64String.split(',');
    if (arr.length < 2) {
      console.error('Invalid base64 string format');
      return null;
    }
  
    // Lấy MIME type từ phần đầu của base64
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) {
      console.error('MIME type not found in base64 string');
      return null;
    }
  
    const mime = mimeMatch[1]; // MIME type: ví dụ: 'image/png'
  
    // Giải mã base64 thành chuỗi nhị phân
    const bstr = atob(arr[1]);
    const u8arr = new Uint8Array(bstr.length);
  
    for (let i = 0; i < bstr.length; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
  
    // Tạo Blob từ dữ liệu nhị phân và MIME type
    return new Blob([u8arr], { type: mime });
};


export const getBase64 = (file: any): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
});