import React, { useState } from "react";
import { Upload, Modal, Radio, Button, message } from "antd";
import { DeleteOutlined, EditOutlined} from "@ant-design/icons";
import { base64ToBlob } from "../../utils/conversion";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import styled from "styled-components";
import { UploadProps } from "antd/lib";



interface ImageUploadProps {
  size?: number;
  count?: number;
  description?: string;
  enableAspectRatio?: boolean;
  isDislayCount?: boolean;
  fileList: any[];
  setFileList: (fileList: any[]) => void;
}
interface CustomUploadProps {
  size?: number;
  aspectRatio?: number;
 
}

const CustomUpload = styled(Upload)<CustomUploadProps>`
  .ant-upload.ant-upload-select {
    width: ${(props) => (props.size ? props.size : 85)}px !important;
    height: ${(props) => props.aspectRatio === 0.75 ? `${(props.size ? props.size : 85) * 4 / 3}px` : `${props.size ? props.size : 85}px`} !important;
  }
  .ant-upload-list-item-container {
    width: ${(props) => (props.size ? props.size : 85)}px !important;
    height: ${(props) => props.aspectRatio === 0.75 ? `${(props.size ? props.size : 85) * 4 / 3}px` : `${props.size ? props.size : 85}px`} !important;
  }
  .ant-upload-list-item.ant-upload-list-item-undefined {
   
    width: ${(props) => (props.size ? props.size : 85)}px !important;
    height: ${(props) => props.aspectRatio === 0.75 ? `${(props.size ? props.size : 85) * 4 / 3}px` : `${props.size ? props.size : 85}px`} !important;
  }
  .ant-upload-list.ant-upload-list-picture-card .ant-upload-list-item {
    padding: 1px;
    
  }
  a.ant-upload-list-item-thumbnail {
    border-radius: 8px;
  }
 
  .ant-upload-list-item-actions {
    display: none;
  }
  .ant-upload-list-item.ant-upload-list-item-undefined::before {
    display: none;
  }
  .image-upload-overlay {
    display: none;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
  }
  .ant-upload-list-item-container:hover {
    .image-upload-overlay {
      display: flex !important;
    }
  }
`;

const ImageModal = styled(Modal)`
  .ant-modal-content {
    margin: 0;
    padding: 0;
    background-color: rgba(0, 0, 0, 0);
    height: 80vh;
  }
  .ant-modal-body {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .ant-modal-footer {
    position: absolute;
    bottom: 20px;
    right: 20px;
  
  }
`;

const ImageCropper = styled(Cropper)`
  .cropper-modal {
    background-color: transparent;
    top: 20px;
  }
  .cropper-drag-box {
    top: 20px;
  }
`;

const ImageUpload: React.FC<ImageUploadProps> = ({
    size = 85,
    count = 1,
    description,
    enableAspectRatio = false,
    isDislayCount = true,
    fileList,
    setFileList,
}) => {
  const [cropper, setCropper] = useState<any>();
  const [cropVisible, setCropVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [aspectRatio, setAspectRatio] = useState(1);
  const [fileCurrent, setFileCurrent] = useState<any>();
  const [rotateDegree, setRotateDegree] = useState(0);

  React.useEffect(() => {
    if (fileCurrent?.originFileObj) {
      const url = URL.createObjectURL(fileCurrent.originFileObj);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url); // Dọn dẹp URL
    }
  }, [fileCurrent]);

  const handleBeforeUpload = (file: any): boolean | string => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Bạn chỉ có thể tải lên tệp JPG/PNG!");
      return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Hình ảnh phải nhỏ hơn 2MB!");
      return Upload.LIST_IGNORE;
    }

    const reader = new FileReader();
    reader.onload = () => setImageUrl(reader.result as string);
    reader.readAsDataURL(file);

    return false;
  };
  
  const handleCrop = async () : Promise<void> => {
    if (cropper) {
      const croppedImage = await cropper.getCroppedCanvas().toDataURL(); // Lấy Base64
      const croppedFile = base64ToBlob(croppedImage); // Chuyển Base64 sang File
      const currentFileIndex = fileList?.findIndex((file) => file.uid === fileCurrent.uid); // Tìm vị trí file gốc trong danh sách
      const currentTime = Date.now();

      // Thay thế file gốc trong danh sách
      const updatedFileList = fileList?.map((file, index) => {
        if (index === currentFileIndex) {
          return {
            lastModified: currentTime, // Cập nhật lastModified để React nhận diện file mới
            lastModifiedDate: new Date(currentTime), // Cập nhật lastModifiedDate để React nhận diện file mới
            name: `${file.name}-cropped`, // Đổi tên file
            size: croppedFile?.size, // Cập nhật kích thước file mới
            thumbUrl: croppedImage,
            percent: 100,
            originFileObj: croppedFile, // File mới
            uid: `${file.uid}-cropped`, // Thay đổi UID để React nhận diện file mới
            url: URL.createObjectURL(croppedFile || new Blob()), // Tạo URL hiển thị ảnh crop
          };
        } else {
          return file;
        }
      });

      setFileList(updatedFileList);
      setCropVisible(false); 
    }
  };

  const handleRotate = () => {
    if (cropper) {
      cropper.rotate(90); // Xoay ảnh 90 độ
      setRotateDegree((prev) => prev + 90);

      // Lấy kích thước canvas sau khi xoay
      const canvasData = cropper.getCanvasData();
      const newHeight = Math.min(canvasData.naturalHeight, 600); // Giới hạn chiều cao tối đa là 600px

      // Tự động điều chỉnh lại kích thước canvas và khung crop
      cropper.setCanvasData({
        ...canvasData,
        height: newHeight,
        width: (canvasData.width / canvasData.height) * newHeight,
      });
    }
  };

  const handleAspectRatioChange = (e: any): void => {
    const ratio = e.target.value === 1 ? 1 : 3 / 4;
    setAspectRatio(ratio);
  };

  const handleChange: UploadProps['onChange'] = (file: any) =>
    setFileList(file.fileList);

  const onRemove = (file: any): void => {
    setFileList(fileList?.filter((item) => item.uid !== file.uid));
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <svg viewBox="0 0 23 21" xmlns="http://www.w3.org/2000/svg" style={{ height: "25px", width: "25px" }} fill="#1677ff" stroke="#1677ff">
            <path d="M18.5 0C19.3284 0 20 0.671573 20 1.5V12C19.5101 11.9299 18.9899 11.9299 18.5 12V1.5H2V14.1495L5.39451 10.7424C5.65509 10.4808 6.06062 10.4517 6.35341 10.6552L6.45741 10.7424L7.88894 12.1801L11.5762 6.9708C11.8367 6.70911 12.2423 6.68004 12.5351 6.88357L12.6391 6.9708L16.0301 10.3761C16.8392 11.1887 16.4631 12.6552 15.6322 13.4455C14.6267 14.4019 14 15.7528 14 17.25C14 17.5046 14.0181 17.755 14.0532 18H2C1.17157 18 0.5 17.3284 0.5 16.5V1.5C0.5 0.671573 1.17157 0 2 0H18.5Z"></path>
            <path d="M6.5 4.5C7.32843 4.5 8 5.17157 8 6C8 6.82843 7.32843 7.5 6.5 7.5C5.67157 7.5 5 6.82843 5 6C5 5.17157 5.67157 4.5 6.5 4.5Z"></path>
            <path d="M18.5 14.25C18.5 13.8358 18.8358 13.5 19.25 13.5C19.6642 13.5 20 13.8358 20 14.25V16.5H22.25C22.6642 16.5 23 16.8358 23 17.25C23 17.6642 22.6642 18 22.25 18H20V20.25C20 20.6642 19.6642 21 19.25 21C18.8358 21 18.5 20.6642 18.5 20.25V18H16.25C15.8358 18 15.5 17.6642 15.5 17.25C15.5 16.8358 15.8358 16.5 16.25 16.5H18.5V14.25Z"></path>
          </svg>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span>{description}</span>
            <span>{`(${fileList.length}/${count})`}</span>
          </div>
        </div>
    </button>
  );

  return (
    <>
      {enableAspectRatio && (
        <Radio.Group
          style={{ marginTop: 5, marginBottom: 10 }}
          value={aspectRatio === 1 ? 1 : 2}
          onChange={handleAspectRatioChange}
        >
          <Radio value={1}>1 : 1</Radio>
          <Radio value={2}>3 : 4</Radio>
        </Radio.Group>
      )}

      <CustomUpload
        
        listType="picture-card"
        size={size}
        aspectRatio={aspectRatio}
        name="avatar"
        maxCount={count}
        fileList={fileList}
        onChange={handleChange}
        beforeUpload={handleBeforeUpload}
      
        itemRender={(originNode, file, currFileList, actions) => (
          <div style={{ position: "relative" }}>
            <div>{originNode}</div>
            <div className="image-upload-overlay" style={{
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: 5,
              right: 5,
              zIndex: 8,
              width: `${size-10}px`,
              height: aspectRatio === 0.75 ? `${size * 4 / 3 - 10}px` : `${size-10}px`,
              borderRadius: "5px",
            }}>
              <Button
                type="primary"
                icon={<EditOutlined />}
                size="small"
                onClick={() => { 
                  setCropVisible(true); 
                  setFileCurrent(file); 
                }}
                style={{
                  marginTop: "50px",
                  height: 20,
                  width: 20,
                }}
              />
              <Button
                type="primary"
                icon={<DeleteOutlined />}
                size="small"
                onClick={() => onRemove(file)}
                style={{
                  marginLeft: "5px",
                  marginTop: "50px",
                  height: 20,
                  width: 20,
                }}
              />
            </div>
          </div>
        )}
      >
        
        {fileList.length >= count ? null : uploadButton}
      </CustomUpload>

      <ImageModal
        width={"100vw"}
        height={"80vh"}
        style={{ top: "0", backgroundColor: "rgba(0, 0, 0, 0.5)"}}
        open={cropVisible}
        onCancel={() => setCropVisible(false)}
        footer={
          [
          
          <Button key="back" onClick={() => setCropVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleCrop}>
            Save
          </Button>,
        ]}
        
      >
       
        <ImageCropper
        
          key={aspectRatio} // Ensure cropper updates when aspectRatio changes
          src={imageUrl}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0)", 
            width: "100%", 
            height: "100%", 
            maxHeight: "600px", // Giới hạn chiều cao tối đa
            objectFit: "contain" // Giữ tỉ lệ ảnh và không làm ảnh bị méo
          }}
          initialAspectRatio={aspectRatio}
          aspectRatio={aspectRatio}
          guides={false}
          viewMode={1}
          autoCropArea={1}
          background={false}
          responsive={true}
          onInitialized={(instance) => setCropper(instance)}
        />
      </ImageModal>
    </>
  );
};

export default ImageUpload;
