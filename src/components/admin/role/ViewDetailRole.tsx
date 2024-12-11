import { IRole } from "../../../types/backend";
import { Badge, Descriptions, Drawer, Table, TableColumnsType } from "antd";
import dayjs from 'dayjs';
import { useEffect, useState } from "react";
import { isMobile, isTablet } from "react-device-detect";

interface IProps {
    onClose: (v: boolean) => void;
    open: boolean;
    dataInit: IRole | null;
    setDataInit: (v: any) => void;
}
interface DataType {
    key: string;
    //id: string;
    permissionName: string;
    method: string;
    apiAccess: string;
    description: string;
}
const ViewDetailRole = (props: IProps) => {
    const { onClose, open, dataInit, setDataInit } = props;
    const columns: TableColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'key',
            key: 'key',
            width: '12.5%',
            
            //...getColumnSearchProps('key', 'ID'),
            //sorter: (a, b) => a.id.length - b.id.length,
        },

        {
            title: 'Permission Name',
            dataIndex: 'permissionName',
            
            width: '40%',
            //...getColumnSearchProps('permissionName', 'Permission Name'),
            sorter: (a, b) => a.permissionName.localeCompare(b.permissionName),
        },
        {
            title: 'Method',
            dataIndex: 'method',
            width: '25%',
            //...getColumnSearchProps('method', 'Method'),
        },
        Table.EXPAND_COLUMN,
    ];
    const [permissionData, setPermissionData] = useState<DataType[]>([]);
  



 
    useEffect(() => {
        setPermissionData(dataInit?.permissions.map((item) => ({
            key: item.id,
            permissionName: item.permissionName,
            method: item.method,
            apiAccess: item.apiAccess,
            description: item.description
        })) || []);
    }, [dataInit]);
    console.log("permissionData: ", permissionData);
    


    


    return (
        <>
            <Drawer
                title="Role Information"
                placement="right"
                onClose={() => { onClose(false); setDataInit(null) }}
                open={open}
                width={isTablet ? "80%" : isMobile ? "95%" : "40%"}
                maskClosable={false}
            >
                <Descriptions 
                    title={
                        <span style={{color: "#1677ff"}}>
                            Basic Information
                        </span>
                    } 
                    bordered column={1} 
                    layout="horizontal" 
                    style={{marginBottom: "20px"}}
                >
                   
                    <Descriptions.Item label={<b>ID:</b>} >{dataInit?.id}</Descriptions.Item>
                    <Descriptions.Item label={<b>Role Name:</b>}>{dataInit?.roleName}</Descriptions.Item>
                    <Descriptions.Item label={<b>Status:</b>}>
                        {dataInit?.isActive.toString() === '1' ? <Badge status="success" text="Active" /> : <Badge status="error" text="Inactive" />}
                    </Descriptions.Item>
                    <Descriptions.Item label={<b>Created by:</b>} span={2}>{dataInit && dataInit.createdBy ? dataInit.createdBy : ""}</Descriptions.Item>
                    <Descriptions.Item label={<b>Created at:</b>} >{dataInit && dataInit.createdAt ? dayjs(dataInit.createdAt).format('DD-MM-YYYY HH:mm:ss') : ""}</Descriptions.Item>
                    <Descriptions.Item label={<b>Updated by:</b>}>{dataInit && dataInit.updatedBy ? dataInit.updatedBy : ""}</Descriptions.Item>
                    <Descriptions.Item label={<b>Updated at:</b>}>{dataInit && dataInit.updatedAt ? dayjs(dataInit.updatedAt).format('DD-MM-YYYY HH:mm:ss') : ""}</Descriptions.Item>

                </Descriptions>

                <Descriptions title={
                    <span style={{color: "#1677ff"}}>
                        List of Role-based Permissions
                    </span>
                }/>
                <Table<DataType> 
                    columns={columns} 
                    dataSource={permissionData} 
                    //pagination={{ pageSize: 4 }}
                    expandable={{
                        expandedRowRender: (record) => (
                            <div style={{ maxWidth: '100%', overflow: 'auto' }}>
                            <p style={{ margin: 0, whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                {record.description}
                            </p>
                            
                            </div>
                        ),
                        
                        
                        
                        
                    }}
                    //scroll={{ x: 'max-content' }}  // Make the table horizontally scrollable when the screen is smaller
                    bordered
                    size="middle"
                />
                  
            </Drawer>
        </>
    );
}

export default ViewDetailRole;