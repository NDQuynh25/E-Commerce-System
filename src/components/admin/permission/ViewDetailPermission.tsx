import { IPermission } from "../../../types/backend";
import { Badge, Descriptions, Drawer } from "antd";
import dayjs from 'dayjs';
import { isMobile } from "react-device-detect";
import '../../../styles/view.detail.css';

interface IProps {
    onClose: (v: boolean) => void;
    open: boolean;
    dataInit: IPermission | null;
    setDataInit: (v: any) => void;
}
const ViewDetailPermission = (props: IProps) => {
    const { onClose, open, dataInit, setDataInit } = props;

    return (
        
            <Drawer
                title={<h3>Permission Information</h3>}
                placement="right"
                onClose={() => { onClose(false); setDataInit(null) }}
                open={open}
                width={isMobile ? "95%" : "40%"}
                maskClosable={false}
            >
                <Descriptions title="" bordered column={1} layout="horizontal">
                   
                    <Descriptions.Item 
                        label={<b>ID:</b>} 
                        labelStyle={{ width: '30%' }}
                    >
                        {dataInit?.id}
                    </Descriptions.Item>
                    <Descriptions.Item label={<b>Permission Name:</b>} >{dataInit?.permissionName}</Descriptions.Item>
                    <Descriptions.Item label={<b>Method:</b>} >{dataInit?.method}</Descriptions.Item>
                    <Descriptions.Item label={<b>API Accesss:</b>}>{dataInit?.apiAccess}</Descriptions.Item>
                    
                    <Descriptions.Item label={<b>Status:</b>} >
                        {dataInit?.isActive.toString() === '1' ? <Badge status="success" text="Active" /> : <Badge status="error" text="Inactive" />}
                    </Descriptions.Item>
                    <Descriptions.Item label={<b>Description:</b>}>{dataInit && dataInit.description ? dataInit.description : ""}</Descriptions.Item>


                    <Descriptions.Item label={<b>Created by:</b>}>{dataInit && dataInit.createdBy ? dataInit.createdBy : ""}</Descriptions.Item>
                    <Descriptions.Item label={<b>Created at:</b>}>{dataInit && dataInit.createdAt ? dayjs(dataInit.createdAt).format('DD-MM-YYYY HH:mm:ss') : ""}</Descriptions.Item>
                    <Descriptions.Item label={<b>Updated by:</b>}>{dataInit && dataInit.updatedBy ? dataInit.updatedBy : ""}</Descriptions.Item>
                    <Descriptions.Item label={<b>Updated by:</b>}>{dataInit && dataInit.updatedAt ? dayjs(dataInit.updatedAt).format('DD-MM-YYYY HH:mm:ss') : ""}</Descriptions.Item>

                </Descriptions>
            </Drawer>
        
    )
}

export default ViewDetailPermission;