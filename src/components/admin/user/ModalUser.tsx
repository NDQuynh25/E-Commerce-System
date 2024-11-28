import { useState } from "react";
import FloatingLabelInput from "./FloatingLabelInput";
import { IUser } from "../../../types/backend";
import { Button, Modal, Steps} from "antd";
import "../../../styles/modal.user.css";
import ImageUpload from "../../ImageUpload";

interface ModalUserProps {
    openModal: boolean;
    setOpenModal: (openModal: boolean) => void;
    reloadTable: () => void;
    dataInit: IUser | null;
    setDataInit: (dataInit: IUser | null) => void;
}




const ModalUser = (props: ModalUserProps) => {
    const { Step } = Steps;
    const x = 0;
    const { openModal, setOpenModal, reloadTable, dataInit, setDataInit} = props;
    const [step, setStep] = useState(1); // Quản lý bước hiện tại
    const [fileList, setFileList] = useState<any[]>([]); 
    const [userData, setUserData] = useState<IUser>({
        id: '',
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        gender: '',
        address: '',
        dateOfBirth: '',
        avatar: '',
        avatarFile: undefined,
        role: {
            id: '',
            name: '',
        },
        isActive: '',
        
    }); // Lưu dữ liệu người dùng

    const genderOptions = [
        {value: "MALE", text: "Male"},
        {value: "FEMALE", text: "Female"},
        {value: "OTHER", text: "Other"},
    ]
 

    const handleFinish = (values: any) => {
        console.log("Dữ liệu người dùng cuối cùng:", userData);
        // Gửi dữ liệu đến API tại đây
    };

    const handleNext = () => {
        setStep(step + 1); // Chuyển sang form tiếp theo
      };
    
    const handleBack = () => {
        setStep(step - 1); // Quay lại form trước
    };
    
    return (
        <Modal
            open={openModal}
            style={{backgroundColor: "while"}} 
            width={"50vw"} // Độ rộng của modal
            footer={null} // Xóa footer để ẩn nút OK và Cancel

        >
            <div className="modal-user-form-container">
                <div className="modal-user-form-header">
                    {/* Hiển thị thanh tiến trình */}
                    <Steps current={step}>
                        <Step title="Account Information" />
                        <Step title="Personal Details" />
                        <Step title="Personal Details" />
                    </Steps>
                </div>

                {/* Khu vực chứa form */}
                <div className={`modal-user-form-content`}>
                    <div className={step === 1 ? `modal-user-form-slide display-step-${step}`: 'modal-user-form-slide'}>
                        <div className="modal-user-form-text">
                            <img src="/public/resume.png" alt="user"  />
                            <h3>Personal Details</h3>
                            <p>Enter personal information</p>
                        </div>
                        <div className="modal-user-form-input">
                            <ImageUpload fileList={fileList} setFileList={setFileList} />
                            <FloatingLabelInput
                                label="Full Name"
                                value={userData?.fullname}
                                onChange={(value) => setUserData({ ...userData, fullname: value })}
                                type="text"
                                hight="45px"
                                width="100%"
                            />
                        </div>
                    </div>
                    
                    <div className={step === 1 ? `modal-user-form-slide display-step-${step}`: 'modal-user-form-slide'}>
                        <div className="modal-user-form-text">
                            
                            <img src="/public/resume.png" alt="user"  />
                            <h3>Personal Details</h3>
                            <p>Enter personal information</p>
                        </div>
                        <div className="modal-user-form-input">
                            <ImageUpload fileList={fileList} setFileList={setFileList} />
                            <FloatingLabelInput
                                label="Full Name"
                                value={userData?.fullname}
                                onChange={(value) => setUserData({ ...userData, fullname: value })}
                                type="text"
                                hight="45px"
                                width="100%"
                            />

                            <FloatingLabelInput
                                label="Gender"
                                value={userData?.password}
                                onChange={(value) => setUserData({ ...userData, password: value })}
                                type="select"
                                hight="45px"
                                width="100%"
                                options={genderOptions}
                            />


                            <FloatingLabelInput
                                label="Confirm Password"
                                value={userData?.confirmPassword}
                                onChange={(value) => setUserData({ ...userData, confirmPassword: value })}
                                type="password"
                                hight="45px"
                                width="100%"
                            />
                        </div>
                    </div>
                </div>
                <div className="modal-user-form-footer">
                    <div className="modal-user-btn-left">
                        <Button onClick={handleBack} disabled={step === 0}>
                            Quay lại
                        </Button>
                    </div>
                    <div className="modal-user-btn-right">
                        <Button type="primary" onClick={step === 1 ? handleFinish : handleNext}>
                            {step === 1 ? "Submit" : "Next"}
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    
    );
};

export default ModalUser;
