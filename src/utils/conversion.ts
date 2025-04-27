import { UploadFile } from "antd/es/upload/interface";

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

export const urlToBlob = (url: string): Promise<Blob> => {
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .catch((error) => {
            console.error('Error fetching the image:', error);
            throw error;
        });
}

interface Base64Image {
  base64: string;
  mimeType: string;
}

export const extractAllBase64FromHTML = (htmlString: string): Base64Image[] => {
  const imgRegex = /<img[^>]+src="(data:image\/[^;]+;base64,[^"]+)"/g;
  const matches: Base64Image[] = [];
  let match: RegExpExecArray | null;
  
  while ((match = imgRegex.exec(htmlString)) !== null) {
    try {
      const base64 = match[1];
      const typeMatch = base64.match(/data:(image\/\w+);/);
      
      if (typeMatch && typeMatch[1]) {
        matches.push({
          base64,
          mimeType: typeMatch[1]
        });
      }
    } catch (error) {
      console.warn('Error processing image match:', error);
      continue;
    }
  }
  
  return matches;
};


export const base64ToFile = (base64Data: string, mimeType: string, fileName: string): File => {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new File([byteArray], fileName, { type: mimeType });
}