import React, { useState } from "react";
import { Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface ImageUploadProps {
    count?: number;
    fileList: any[];
    setFileList: (fileList: any[]) => void;
}

const ImageUpload = (props: ImageUploadProps) => {
    const { count = 1, fileList, setFileList } = props;
    const beforeUpload = (file: any) => {
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
        return true;
    };

    const onChange = ({ fileList }: any) => {
      setFileList(fileList);
    };

    const onPreview = async () => {
      let src = fileList[0]?.url;
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(fileList[0]?.originFileObj as Blob);
          reader.onload = () => resolve(reader.result as string);
        });
      }
      const imgWindow = window.open(src);
      imgWindow?.document.write(`<img src="${src}" style="width:50%, height:auto" />`);
    };

    return (
      <Upload
          name="avatar"
          listType="picture-card"
          maxCount={count}
          beforeUpload={beforeUpload}
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
      >
        <div>
          <PlusOutlined
            style={{
              fontSize: 16,
              color: "#1890ff",
              borderRadius: "50%",
              border: "1px solid #1890ff",
            }}
          />
          <div style={{ marginTop: 8, borderRadius: "50%" }}>Upload</div>
        </div>
      </Upload>
    );
};

export default ImageUpload;
