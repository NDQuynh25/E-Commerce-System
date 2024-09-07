import { IRole } from "../../../types/backend";
import { Badge, Button, Col, Form, Input, Modal, notification, Row, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { isMobile } from 'react-device-detect';
import { callCreateRole, callUpdateRole } from "../../../api/roleApi";
import { IPermission } from "../../../types/backend";
import { ModalForm, ProCard, ProFormSelect, ProFormText } from "@ant-design/pro-components";
import ModuleApi from "./ModalApi";


interface IState {
    openModal: boolean;
    setOpenModal: (openModal: boolean) => void;
    dataInit: IRole | null;
    setDataInit: (dataInit: IRole | null) => void;
    reloadTable: () => void;
}

const ModalRole = (props: IState) => {
    const { openModal, setOpenModal, reloadTable, dataInit, setDataInit } = props;
    const [listPermissions, setListPermissions] = useState<IPermission[]>([]);
    const [listPermissionIds, setListPermissionIds] = useState<string[]>([]);
    const [form] = Form.useForm();

   
    const handleReset = () => {
        form.resetFields();
        setOpenModal(false);
        setDataInit(null);
        setListPermissionIds([]);
    }

    useEffect(() => {
        if (dataInit) {
            const permissionIds = dataInit.permissions.map((item) => item.id);
            setListPermissionIds(permissionIds);
        }
    }, [dataInit]);

    

    

    const submitRole = async (valuesForm: any) => {
        const values = {
            ...valuesForm,
            permissionIds: listPermissionIds
        };

        console.log('values: ', values);
        if (dataInit?.id) {
            const res = await callUpdateRole(values, dataInit.id);
            if (res && res.data) {
                notification.success({
                    message: 'Cập nhật Role thành công!',
                    placement: 'bottomRight'
                });
                reloadTable();
                handleReset();
            }
        } else {
            const res = await callCreateRole(values);
            if (res && res.data) {
                notification.success({
                    message: 'Tạo mới Role thành công!',
                    placement: 'bottomRight'
                });
                reloadTable();
                handleReset();
            }
        }
     
    }

    return (
        <ModalForm
            title={dataInit ? "Chỉnh sửa Role" : "Thêm mới Role"}
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
            onFinish={submitRole}
            preserve={false}
            form={form}
        >
            <Row gutter={16}>
                {dataInit?.id &&
                    <Col lg={3} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="ID"
                            name="id"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            initialValue={dataInit?.id}
                            disabled
                        />
                    </Col>
                }
                <Col lg={10} md={12} sm={24} xs={24}>
                    <ProFormText
                        label="Role name"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                        initialValue={dataInit?.name}
                    />
                </Col>
                {dataInit?.id &&
                    <Col lg={6} md={12} sm={24} xs={24}>
                        <ProFormSelect
                            name="isActive"
                            label="Status"
                            valueEnum={{
                                1: <Badge status="success" text="Active" />,
                                0: <Badge status="error" text="Inactive" />,
                            }}
                            placeholder="Chọn trạng thái"
                            initialValue={dataInit?.isActive}
                            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
                        />
                    </Col>
                }
                <Col span={24}>
                    <ProCard
                        title="Quyền hạn"
                        subTitle="Các quyền hạn được phép cho vai trò này"
                        headStyle={{ color: '#d81921' }}
                        style={{ marginBottom: 20 }}
                        headerBordered
                        size="small"
                        bordered
                    >
                        <ModuleApi
                            listPermissionIds={listPermissionIds}
                            setListPermissionIds={setListPermissionIds}
                            
                        />

                    </ProCard>

                </Col>
            </Row>
                
        </ModalForm>
    );
}
export default ModalRole;