import { IUser } from "../../../types/backend";
import { Badge, Descriptions, Drawer } from "antd";
import dayjs from 'dayjs';
import { isMobile } from "react-device-detect";
import '../../../styles/view.detail.css';

interface IProps {
    onClose: (v: boolean) => void;
    open: boolean;
    dataInit: IUser | null;
    setDataInit: (v: IUser | null) => void;
}
const ViewDetailUser = (props: IProps) => {
    const { onClose, open, dataInit, setDataInit } = props;

    return (
        
            <Drawer
                title={<h3>User Information</h3>}
                placement="right"
                onClose={() => { onClose(false); setDataInit(null) }}
                open={open}
                width={isMobile ? "95%" : "40%"}
                maskClosable={false}
            >
                <Descriptions title="" bordered column={1} layout="horizontal">
                    <Descriptions.Item label={<b>Avatar:</b>}>
                        <img src={dataInit?.avatar} alt="avatar" style={{ width: "30%", borderRadius: "50%"}} />
                    </Descriptions.Item>
                    <Descriptions.Item 
                        label={<b>ID:</b>} 
                        labelStyle={{ width: '30%' }}
                    >
                        {dataInit?.id}
                    </Descriptions.Item>
                    <Descriptions.Item label={<b>Full name:</b>} >{dataInit?.fullName}</Descriptions.Item>
                    <Descriptions.Item label={<b>Email:</b>} >{dataInit?.email}</Descriptions.Item>
                    <Descriptions.Item label={<b>Phone Number:</b>}>{dataInit?.phoneNumber}</Descriptions.Item>

                    <Descriptions.Item label={<b>Gender:</b>}>{dataInit?.gender}</Descriptions.Item>
                    <Descriptions.Item label={<b>Date of Birth:</b>}>{dataInit?.dateOfBirth}</Descriptions.Item>
                    <Descriptions.Item label={<b>Address:</b>}>{dataInit?.address}</Descriptions.Item>
                    <Descriptions.Item label={<b>Role:</b>} >
                        <Badge status="processing" text={<>{dataInit?.role?.roleName}</>} />
                    </Descriptions.Item>
                    
                    <Descriptions.Item label={<b>Status:</b>} >
                        {dataInit?.isActive.toString() === '1' ? <Badge status="success" text="Active" /> : <Badge status="error" text="Inactive" />}
                    </Descriptions.Item>


                    <Descriptions.Item label={<b>Created by:</b>}>{dataInit && dataInit.createdBy ? dataInit.createdBy : ""}</Descriptions.Item>
                    <Descriptions.Item label={<b>Created at:</b>}>{dataInit && dataInit.createdAt ? dayjs(dataInit.createdAt).format('DD-MM-YYYY HH:mm:ss') : ""}</Descriptions.Item>
                    <Descriptions.Item label={<b>Updated by:</b>}>{dataInit && dataInit.updatedBy ? dataInit.updatedBy : ""}</Descriptions.Item>
                    <Descriptions.Item label={<b>Updated by:</b>}>{dataInit && dataInit.updatedAt ? dayjs(dataInit.updatedAt).format('DD-MM-YYYY HH:mm:ss') : ""}</Descriptions.Item>

                </Descriptions>
            </Drawer>
        
    )
}

export default ViewDetailUser;