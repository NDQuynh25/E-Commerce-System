import { IRole } from "../../../types/backend";
import { Badge, Button, Col, Modal, notification, Row } from "antd";
import { useEffect, useState } from "react";
import { isMobile } from 'react-device-detect';
import { callCreateRole, callUpdateRole } from "../../../api/roleApi";
import { ProCard} from "@ant-design/pro-components";
import ModuleApi from "./ModalApi";
import FloatingLabelInput from "../../input/FloatingLabelInput";
import "../../../styles/modal.role.css";
import { set } from "lodash";


interface IState {
    openModal: boolean;
    setOpenModal: (openModal: boolean) => void;
    dataInit: IRole | null;
    setDataInit: (dataInit: IRole | null) => void;
    reloadTable: () => void;
}

const ModalRole = (props: IState) => {
    const { openModal , setOpenModal, reloadTable, dataInit, setDataInit } = props;
    const [listPermissionIds, setListPermissionIds] = useState<number[]>([]);
    const [roleData, setRoleData] = useState<IRole>({
        id: '',
        roleName: '',
        isActive: '',
        permissions: [],
        permissionIds: []
    });
    const activeOptions = [
        {value: "1", text: <Badge status="success" text="Active" />},
        {value: "0", text: <Badge status="error" text="Inactive" />},
    ];
    const formValidation = ['roleName', 'isActive'];


    useEffect(() => {
        setRoleData(prevState => ({
            ...prevState, 
            permissionIds: listPermissionIds.map(item => item.toString()) // Convert tất cả các ID thành chuỗi
        }));
    }, [listPermissionIds]);
    

    useEffect(() => {
        if (dataInit) {
            //console.log("dataInit: ", dataInit);
            const permissionIds = dataInit.permissions.map((item) => item.id);
            setListPermissionIds(permissionIds.map((item) => parseInt(item.toString())));
            setRoleData({
                id: dataInit.id,
                roleName: dataInit.roleName,
                isActive: dataInit.isActive,
                permissions: dataInit.permissions,
                permissionIds: dataInit.permissions.map((item) => item.id)

            });
        } else {
            setListPermissionIds([]);
            handleReset();
        }

    }, [dataInit]);

    const handleReset = () => {
        setDataInit(null);
        setRoleData({
            id: '',
            roleName: '',
            isActive: '',
            permissions: [],
            permissionIds: []
        });
        
    }

    const handleCancel = () => {
        setOpenModal(false);
        handleReset();
    }

    

    const handleSubmit = async () => {
        if (!validateForm(formValidation)) {
            return;
        }
        console.log("listPermissionIds line 78:", listPermissionIds.map(item => item.toString())); 
        setRoleData(prevState => ({
            ...prevState, 
            permissionIds: listPermissionIds.map(item => item.toString()) 
        }));
        
        console.log("roleData line 81: ", roleData);
        if (roleData.id) {
            await callUpdateRole(roleData, roleData.id).then((res) => {
                if (res && res.data) {
                    notification.success({
                        message: 'Update Role Successfully',
                        description: `Role ${roleData.roleName} has been updated successfully!`
                    });
                    setOpenModal(false);
                    reloadTable();
                    handleReset();
                }
            }).catch((error) => {
                notification.error({
                    message: 'Update Role Failed',
                    description: `Role ${roleData.roleName} failed to update!`
                });
            });
        } else {
            await callCreateRole(roleData).then((res) => {
                if (res && res.data) {
                    notification.success({
                        message: 'Create Role Successfully',
                        description: `Role ${roleData.roleName} has been created successfully!`
                    });
                    setOpenModal(false);
                    reloadTable();
                    handleReset();
                }
            }).catch((error) => {
                notification.error({
                    message: 'Create Role Failed',
                    description: `Role ${roleData.roleName} failed to create!`
                });
            });
        }
    }


    const [validators, setValidators] = useState<Record<string, (value: any) => boolean>>({});

    const handleValidate = (field: string, validateFn: (value: any) => boolean) => {
        setValidators((prevValidators) => ({
            ...prevValidators,
            [field]: validateFn,  // Lưu validate riêng cho từng trường
        }));
    };

    // Hàm kiểm tra tính hợp lệ của tất cả các trường
    const validateForm = (fields: string[]) => {
        let isValid = true;
        for (const field of fields) {
            const value = roleData[field];
            
            
            const validator = validators[field]; // Lấy validate riêng cho trường này
            if (validator && !validator(value)) {
                isValid = false;
                break;
            }
        }
        return isValid;
    };

    

    

    

    
    return (
        //console.log("listPermissionIds: ", listPermissionIds),
        <>
        {true &&
        <Modal
            title={roleData.id ? <span style={{ color: '#1890ff' }}>Update Role</span> : <span style={{ color: '#1890ff' }}>Create New Role</span>}
            open={openModal}
            width={isMobile ? '100%' : 700}
            footer={null}
            onCancel={handleCancel}
            className="modal-role"

        >
            <Row gutter={40}>

                {roleData.id &&
                    <Col lg={5} md={5} sm={24} xs={24}>
                        <FloatingLabelInput 
                            label="ID"
                            value={roleData?.id}
                            isDisabled={true}
                            type="text"
                            hight="45px"
                            width="100%"
                        />
                    </Col>
                }
                <Col lg={roleData.id? 9: 12} md={roleData.id? 9: 12} sm={24} xs={24} >
                    <FloatingLabelInput 
                        label="Role Name"
                        value={roleData?.roleName}
                        onChange={(e) => setRoleData({ ...roleData, roleName: e })}
                        onValidate={(validate) => handleValidate("roleName", validate)}  // Truyền validate riêng cho trường fullName
                        rules={[{ required: true, message: `Role name can't be left blank!`}]}
                        type="text"
                        hight="45px"
                        width="100%"
                        isRequired={true}
                    />
                </Col>
                <Col lg={roleData.id? 10: 12} md={roleData.id? 9: 12} sm={24} xs={24}>
                    <FloatingLabelInput
                        label="Status"
                        value={roleData?.isActive.toString()}
                        onValidate={(validate) => handleValidate("isActive", validate)}
                        onChange={(e) => setRoleData({ ...roleData, isActive: e })}
                        rules={[{ required: true, message: `Status can't be left blank!`}]}
                        type="select"
                        hight="45px"
                        width="100%"
                        options={activeOptions}
                        isRequired={true}
                    />
                </Col>
              
                <Col lg={24} md={24} sm={24} xs={24}>
                    <ProCard
                        title="Authority:"
                        subTitle="Permissions allowed for this role"
                        headStyle={{ color: '#d81921' }}
                        style={{ marginBottom: 20, border: '1.3px solid #d9d9d9' }}
                        headerBordered
                        size="small"
                        bordered
                    >
                        
                        <ModuleApi
                            listPermissionIds={listPermissionIds}
                            setListPermissionIds={(e) => setListPermissionIds(e)}
                            
                        />
                    </ProCard>

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
        }
        </>
        
    );
}
export default ModalRole;