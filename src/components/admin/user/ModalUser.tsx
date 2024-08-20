import { ModalForm, ProForm, ProFormDatePicker, ProFormDateTimePicker, ProFormDigit, ProFormItem, ProFormSelect, ProFormText, ProFormUploadButton } from "@ant-design/pro-components";
import { Avatar, Col, Form, Row, Upload, message, notification } from "antd";
import { isMobile } from 'react-device-detect';
import { useState, useEffect } from "react";
import { callCreateUser, callUpdateUser } from "../../../api/userApi";
import { callFetchRole } from "../../../api/roleApi";
import { IUser } from "../../../types/backend";
import { create } from "domain";
import { PlusOutlined } from '@ant-design/icons';
import { UploadFile } from "antd/lib/upload/interface";
import "../../../styles/modal.user.css";
import enUS from 'antd/lib/locale/en_US';

interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    dataInit?: IUser | null;
    setDataInit: (v: any) => void;
    reloadTable: () => void;
}

export interface IRoleSelect {
    label: string;
    value: string;
    key?: string;
}

const ModalUser = (props: IProps) => {
    const { openModal, setOpenModal, reloadTable, dataInit, setDataInit } = props;
    const [form] = Form.useForm();
    const [roles, setRoles] = useState<IRoleSelect[]>([]);
    const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (dataInit?.id) {
            if (dataInit.avatar) {
                setFileList([{
                    uid: '-1',
                    name: 'avatar.png',
                    status: 'done',
                    url: dataInit.avatar,
                } as UploadFile]);
                setImageUrl(dataInit.avatar);
            }
        
            if (dataInit.role) {
                setRoles([
                    {
                        label: dataInit.role?.name,
                        value: dataInit.role?.id,
                        key: dataInit.role?.id,
                    }
                ])
            }
        }
    }, [dataInit]);

    useEffect(() => {
        if (fileList.length > 0 && fileList[0].originFileObj) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageUrl(e.target?.result as string);
            };
            reader.readAsDataURL(fileList[0].originFileObj);
        }
    }, [fileList]);

    const submitUser = async (valuesForm: any) => {
        const {id, fullname, email, avatar, role, phoneNumber, gender, dateOfBirth, isActive, address } = valuesForm;
        if (dataInit?.id) {
            //update
            const user = {
                id,
                fullname,
                email,
                avatar,
                role: { id: role.value, name: "" },
                phoneNumber,
                gender,
                dateOfBirth,
                isActive,
                address,  
            };
              

            const res = await callUpdateUser(user);
            if (res.data) {
                message.success("Cập nhật user thành công");
                handleReset();
                reloadTable();
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: res.message
                });
            }
        } else {
            //create
            const user = {
                fullname,
                email,
                avatar,
                role: { id: role.value, name: "" },
                phoneNumber,
                gender,
                dateOfBirth,
                isActive,
                address,  
            }
            const res = await callCreateUser(user);
            if (res.data) {
                message.success("Thêm mới user thành công");
                handleReset();
                reloadTable();
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: res.message
                });
            }
        }
    }

    const handleReset = async () => {
        form.resetFields();
        setDataInit(null);
       
        setOpenModal(false);
    }

    // Usage of DebounceSelect

    async function fetchRoleList(name: string): Promise<IRoleSelect[]> {
        const res = await callFetchRole(`page=0&size=100&name=/${name}/i`);
        console.log(res);
        if (res && res.data) {
            const list = res.data.results;
            const temp = list.map(item => {
                return {
                    label: item.name as string,
                    value: item.id as string
                }
            })
            return temp;
        } else return [];
    }

    return (
        <>
            <ModalForm
                title={<>{dataInit?.id ? "Cập nhật User" : "Tạo mới User"}</>}
                open={openModal}
                modalProps={{
                    onCancel: () => { handleReset() },
                    afterClose: () => handleReset(),
                    destroyOnClose: true,
                    width: isMobile ? "100%" : 900,
                    keyboard: false,
                    maskClosable: false,
                    okText: <>{dataInit?.id ? "Cập nhật" : "Tạo mới"}</>,
                    cancelText: "Cancel"
                }}
                scrollToFirstError={true}
                preserve={false}
                form={form}
                onFinish={submitUser}
                initialValues={dataInit?.id ? dataInit : {}}
            >
                <Row gutter={16}>
                    
                    <Col lg={12} md={12} sm={24} xs={24} className="col-image">
                       
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            maxCount={1}
                            beforeUpload={(file) => {
                                const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                                if (!isJpgOrPng) {
                                    message.error('Bạn chỉ có thể tải lên tệp JPG/PNG!');
                                    return Upload.LIST_IGNORE;
                                }
                                const isLt2M = file.size / 1024 / 1024 < 2;
                                if (!isLt2M) {
                                    message.error('Hình ảnh phải nhỏ hơn 2MB!');
                                    return Upload.LIST_IGNORE;
                                }
                                return true;
                            }}
                            fileList={fileList}
                            onChange={({ fileList }) => {
                                setFileList(fileList);
                               
                            }}
                            onPreview={async () => {
                                let src = fileList[0].url;  
                                if (!src) {
                                    src = await new Promise((resolve) => {
                                        const reader = new FileReader();
                                        reader.readAsDataURL(fileList[0].originFileObj as Blob);
                                        reader.onload = () => resolve(reader.result as string);
                                    });
                                }
                                const imgWindow = window.open(src);
                                imgWindow?.document.write(`<img src="${src}" style="width:50%, hight: auto" />`);
                            }}
                            
                        >
                            <div>
                                <PlusOutlined style={{
                                    fontSize: 16,
                                    color: "#1890ff",
                                    borderRadius: "50%",
                                    border: "1px solid #1890ff",
                                   
                                }}/>
                                <div style={{ marginTop: 8, borderRadius: "50%" }}>Upload</div>
                            </div>

                        </Upload>
                        

                    </Col>
                   
                 


                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' },
                                { type: 'email', message: 'Vui lòng nhập email hợp lệ' }
                            ]}
                            placeholder="Nhập email"
                        />
                    </Col>
                    <Col lg={6} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Phone Number"
                            name="phoneNumber"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập số điện thoại"
                        />
                    </Col>
                    <Col lg={6} md={12} sm={24} xs={24}>
                        <ProFormText.Password
                            disabled={dataInit?.id ? true : false}
                            label="Password"
                            name="password"
                            rules={[{ required: dataInit?.id ? false : true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập password"
                        />
                    </Col>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProFormText
                            label="Fullname"
                            name="fullname"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập tên hiển thị"
                        />
                    </Col>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProFormDatePicker
                            label="Date Of Birth"
                            name="dateOfBirth"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Ngày sinh"
                        />
                    </Col>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProFormSelect
                            name="gender"
                            label="Gender"
                            valueEnum={{
                                MALE: 'Nam',
                                FEMALE: 'Nữ',
                                OTHER: 'Khác',
                            }}
                            placeholder="Chọn giới tính"
                            rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
                        />
                    </Col>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProFormSelect
                            name="roles"
                            label="Role"
                            request={async () => {
                                return fetchRoleList("");
                            }}
                            placeholder="Chọn role"
                            rules={[{ required: true, message: 'Vui lòng chọn role!' }]}
                        />

                    </Col>
                    
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập địa chỉ"
                        />
                    </Col>
                </Row>
            </ModalForm >
        </>
    )
}

export default ModalUser;
