import { IUser } from "../../../types/backend";
import { Badge, Descriptions, Drawer } from "antd";
import dayjs from 'dayjs';
import { isMobile } from "react-device-detect";

interface IProps {
    onClose: (v: boolean) => void;
    open: boolean;
    dataInit: IUser | null;
    setDataInit: (v: any) => void;
}
const ViewDetailUser = (props: IProps) => {
    const { onClose, open, dataInit, setDataInit } = props;

    return (
        
            <Drawer
                title="Thông Tin User"
                placement="right"
                onClose={() => { onClose(false); setDataInit(null) }}
                open={open}
                width={isMobile? "100vw" :"40vw"}
                maskClosable={false}
            >
                <Descriptions title="" bordered column={isMobile? 1 : 2} layout="vertical">
                    <Descriptions.Item label="Avatar" span={2}>
                        <img src={dataInit?.avatar} alt="avatar" style={{ width: "30%", borderRadius: "50%"}} />
                    </Descriptions.Item>
                    <Descriptions.Item label="ID">{dataInit?.id}</Descriptions.Item>
                    <Descriptions.Item label="FullName">{dataInit?.fullName}</Descriptions.Item>
                    <Descriptions.Item label="Email">{dataInit?.email}</Descriptions.Item>
                    <Descriptions.Item label="Phone Number">{dataInit?.phoneNumber}</Descriptions.Item>

                    <Descriptions.Item label="Gender">{dataInit?.gender}</Descriptions.Item>
                    <Descriptions.Item label="Date Of Birth">{dataInit?.dateOfBirth}</Descriptions.Item>
                    <Descriptions.Item label="Address" span={2} >{dataInit?.address}</Descriptions.Item>
                    <Descriptions.Item label="Role" >
                        <Badge status="processing" text={<>{dataInit?.role?.roleName}</>} />
                    </Descriptions.Item>
                    
                    <Descriptions.Item label="Status" >
                        {dataInit?.isActive.toString() === '1' ? <Badge status="success" text="Active" /> : <Badge status="error" text="Inactive" />}
                    </Descriptions.Item>


                    <Descriptions.Item label="Created by">{dataInit && dataInit.createdBy ? dataInit.createdBy : ""}</Descriptions.Item>
                    <Descriptions.Item label="Created at">{dataInit && dataInit.createdAt ? dayjs(dataInit.createdAt).format('DD-MM-YYYY HH:mm:ss') : ""}</Descriptions.Item>
                    <Descriptions.Item label="Updated by">{dataInit && dataInit.updatedBy ? dataInit.updatedBy : ""}</Descriptions.Item>
                    <Descriptions.Item label="Updated at">{dataInit && dataInit.updatedAt ? dayjs(dataInit.updatedAt).format('DD-MM-YYYY HH:mm:ss') : ""}</Descriptions.Item>

                </Descriptions>
            </Drawer>
        
    )
}

export default ViewDetailUser;