import { IPermission } from "../../../types/backend";
import { Badge, Button, Col, Modal, notification, Row } from "antd";
import { useEffect, useState } from "react";
import { isMobile } from 'react-device-detect';
import { callCreateRole, callUpdateRole } from "../../../api/roleApi";
import { ProCard} from "@ant-design/pro-components";

import FloatingLabelInput from "../../input/FloatingLabelInput";
import "../../../styles/modal.role.css";
import { set } from "lodash";
import { callCreatePermission, callUpdatePermission } from "../../../api/permissionApi";


interface IState {
    openModal: boolean;
    setOpenModal: (openModal: boolean) => void;
    dataInit: IPermission | null;
    setDataInit: (dataInit: IPermission | null) => void;
    reloadTable: () => void;
}

const ModalRole = (props: IState) => {
    const { openModal , setOpenModal, reloadTable, dataInit, setDataInit } = props;
    const [listPermissionIds, setListPermissionIds] = useState<number[]>([]);
    const [permissionData, setPermissionData] = useState<IPermission>({
        id: '',
        permissionName: '',
        apiAccess: '',
        method: '',
        isActive: '',
        description: '',
      
    });
    const activeOptions = [
        {value: "1", text: <Badge status="success" text="Active" />},
        {value: "0", text: <Badge status="error" text="Inactive" />},
    ];
    const formValidation = ['permissionName', 'isActive', 'method', 'apiAccess'];

    const methods = [
        {value: "GET", text: "GET"},
        {value: "POST", text: "POST"},
        {value: "PUT", text: "PUT"},
        {value: "DELETE", text: "DELETE"},
        {value: "PATCH", text: "PATCH"},
        {value: "OPTIONS", text: "OPTIONS"},
        {value: "HEAD", text: "HEAD"},
        {value: "CONNECT", text: "CONNECT"},
        {value: "TRACE", text: "TRACE"},
    ];


    

    useEffect(() => {
        if (dataInit) {
            setPermissionData({
                id: dataInit.id,
                permissionName: dataInit.permissionName,
                apiAccess: dataInit.apiAccess,
                method: dataInit.method,
                isActive: dataInit.isActive,
                description: dataInit.description,
            });
        } else {
            handleReset();
        }

    }, [dataInit]);

    const handleReset = () => {
        setPermissionData({
            id: '',
            permissionName: '',
            apiAccess: '',
            method: '',
            isActive: '',
            description: '',
        });
        setDataInit(null);
    }

    const handleCancel = () => {
        setOpenModal(false);
        handleReset();
    }

    

    const handleSubmit = async () => {
        console.log("permissionData line 79: ", permissionData);
        if (!validateForm(formValidation)) {
            return;
        }
       
        
        console.log("permissionData line 81: ", permissionData);
        if (permissionData.id) {
            await callUpdatePermission(permissionData, permissionData.id).then((res) => {
                if (res && res.data) {
                    notification.success({
                        message: 'Update Permisson Successfully',
                        description: `Permission ${permissionData.permissionName} has been updated successfully!`
                    });
                    setOpenModal(false);
                    reloadTable();
                    handleReset();
                } else {
                    notification.error({
                        message: 'Update Permission Failed',
                        description: 'Failed to update permission!'
                    });
                }
            }).catch((error) => {
                notification.error({
                    message: 'Update Permission Failed',
                    description: error.message
                });
            });
        } else {
            await callCreatePermission(permissionData).then((res) => {
                if (res && res.data) {
                    notification.success({
                        message: 'Create Role Successfully',
                        description: `Role ${permissionData.roleName} has been created successfully!`
                    });
                    setOpenModal(false);
                    reloadTable();
                    handleReset();
                }
            }).catch((error) => {
                notification.error({
                    message: 'Create Role Failed',
                    description: `Role ${permissionData.roleName} failed to create!`
                });
            });
        }
    }


    const [validators, setValidators] = useState<Record<string, (value: any) => boolean>>({});

    const handleValidate = (field: string, validateFn: (value: any) => boolean) => {
        setValidators((prevValidators) => {
            // Chỉ cập nhật khi validateFn khác với giá trị hiện tại
            if (prevValidators[field] !== validateFn) {
                return {
                    ...prevValidators,
                    [field]: validateFn,
                };
            }
            return prevValidators;
        });
    };

    // Hàm kiểm tra tính hợp lệ của tất cả các trường
    const validateForm = (fields: string[]) => {
        let isValid = true;
        for (const field of fields) {
            const value = permissionData[field];
            
            
            const validator = validators[field]; // Lấy validate riêng cho trường này
            if (validator && !validator(value)) {
                isValid = false;
                break;
            }
        }
        return isValid;
    };

    

    

    

    
    return (
        <Modal
            title={permissionData.id ? <span style={{ color: '#1890ff' }}>Update Role</span> : <span style={{ color: '#1890ff' }}>Create New Role</span>}
            open={openModal}
            width={isMobile ? '100%' : 700}
            footer={null}
            onCancel={handleCancel}
            className="modal-role"
            style={{
                height: "fit-content",
            }}

        >
            <Row gutter={40}>

                {permissionData.id &&
                    <Col lg={5} md={5} sm={24} xs={24}>
                        <FloatingLabelInput 
                            label="ID"
                            value={permissionData?.id}
                            isDisabled={true}
                            type="text"
                            hight="45px"
                            width="100%"
                        />
                    </Col>
                }
                <Col lg={permissionData.id? 9: 12} md={permissionData.id? 9: 12} sm={24} xs={24} >
                    <FloatingLabelInput 
                        label="Permission Name"
                        value={permissionData?.permissionName}
                        onChange={(e) => setPermissionData({ ...permissionData, permissionName: e })}
                        onValidate={(validate) => handleValidate("permissionName", validate)}  // Truyền validate riêng cho trường fullName
                        rules={[{ required: true, message: `Permission name can't be left blank!`}]}
                        type="text"
                        hight="45px"
                        width="100%"
                        isRequired={true}
                    />
                </Col>
                <Col lg={permissionData.id? 10: 12} md={permissionData.id? 9: 12} sm={24} xs={24}>
                    <FloatingLabelInput
                        label="Status"
                        value={permissionData?.isActive.toString()}
                        //onValidate={(validate) => handleValidate("isActive", validate)}
                        onChange={(e) => setPermissionData({ ...permissionData, isActive: e })}
                        rules={[{ required: true, message: `Status can't be left blank!`}]}
                        type="select"
                        hight="45px"
                        width="100%"
                        options={activeOptions}
                        isRequired={true}
                    />
                </Col>

                <Col lg={12} md={12} sm={24} xs={24}>
                    <FloatingLabelInput 
                        label="Method"
                        value={permissionData?.method.toUpperCase()}
                        onValidate={(validate) => handleValidate("method", validate)}
                        onChange={(e) => setPermissionData({ ...permissionData, method: e.toUpperCase() })}
                        rules={[{ required: true, message: `Method can't be left blank!`}]}
                        options={methods}
                        type="select"
                        hight="45px"
                        width="100%"
                        isRequired={true}
                    />
                </Col>

                <Col lg={12} md={12} sm={24} xs={24}>
                    <FloatingLabelInput 
                        label="API Access"
                        value={permissionData?.apiAccess}
                        onChange={(e) => setPermissionData({ ...permissionData, apiAccess: e})}
                        onValidate={(validate) => handleValidate("apiAccess", validate)}
                        rules={[{ required: true, message: `API access can't be left blank!`}]}
                        type="text"
                        hight="45px"
                        width="100%"
                        isRequired={true}
                    />
                </Col>
              
                <Col lg={24} md={24} sm={24} xs={24} style={{height: "100%", marginBottom: "50px"}}>
                    <FloatingLabelInput 
                        label="Description"
                        value={permissionData?.description}
                        onChange={(e) => setPermissionData({ ...permissionData, description: e })}
                        type="textarea"
                        hight="45px"
                        width="100%"
                    />
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                    <div style={{display: "flex", justifyContent: 'right'}}>
                        <Button type="default" onClick={() => {handleCancel()}} style={{ width: '15%', }}>
                            Cancel
                        </Button>

                        <Button type="primary" onClick={() => {handleSubmit()}} style={{ width: '15%', marginLeft: '20px' }}>
                            {dataInit ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </Col>
                
            </Row>
                
        </Modal>
     
        
    );
}
export default ModalRole;