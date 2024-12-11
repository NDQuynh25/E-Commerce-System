import { useEffect, useState } from "react";
import FloatingLabelInput from "../../input/FloatingLabelInput";
import { IRole, IUser } from "../../../types/backend";
import { Button, Form, Input, Modal, notification, Select, Steps} from "antd";
import "../../../styles/modal.user.css";
import ImageUpload from "../../input/ImageUpload";
import { useAppDispatch } from "../../../redux/hooks";
import { useAppSelector } from "../../../redux/hooks";
import { fetchRole } from "../../../redux/slices/roleSlice";
import { callCreateUser, callUpdateUser } from "../../../api/userApi";
import { UploadFile } from "antd/lib";




interface ModalUserProps {
    openModal: boolean;
    setOpenModal: (openModal: boolean) => void;
    reloadTable: () => void;
    dataInit: IUser | null;
    setDataInit: (dataInit: IUser | null) => void;
}
interface Role {
    value: string;
    text: string;
}




const ModalUser = (props: ModalUserProps) => {
    const { Step } = Steps;
    const { openModal, setOpenModal, reloadTable, dataInit, setDataInit} = props;
    const [step, setStep] = useState(0); // Quản lý bước hiện tại
    const [fileList, setFileList] = useState<any[]>([]); 
    const [roleOptions, setRoleOptions] = useState<Role[]>([]);
    const roles = useAppSelector(state => state.role.results);
    const dispatch = useAppDispatch();
    const genderOptions = [
        {value: "MALE", text: "Male"},
        {value: "FEMALE", text: "Female"},
        {value: "OTHER", text: "Other"},
    ];
    const activeOptions = [
        {value: "1", text: "Active"},
        {value: "0", text: "Inactive"},
    ];
    const [userData, setUserData] = useState<IUser>({
        id: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        gender: '',
        address: '',
        dateOfBirth: '',
        avatar: '',
        avatarFile: null,
        role: {
            id: '',
            roleName: '',
        },
        isActive: '',
        
        
    }); 
    // validate cho toàn bộ form
    const formValidation1 = ['fullName'];
    const formValidation2 = ['email', 'phoneNumber', 'role', 'isActive', 'password', 'confirmPassword'];

    useEffect(() => {
        if (fileList.length > 0) {
            setUserData({ ...userData, avatarFile: fileList[0] });
        }
    }, [fileList]);

    useEffect(() => {
        if (dataInit) {
            if (dataInit.avatar) {
                setFileList([{
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: dataInit.avatar,
                    
                } as UploadFile]);
            }
            setUserData({
                id: dataInit.id,
                fullName: dataInit.fullName,
                email: dataInit.email,
                phoneNumber: dataInit.phoneNumber,
                password: dataInit.password,
                confirmPassword: dataInit.confirmPassword,
                gender: dataInit.gender,
                address: dataInit.address,
                dateOfBirth: dataInit.dateOfBirth,
                avatar: dataInit.avatar,
                role: dataInit.role,
                isActive: dataInit.isActive,
            });
        }
    }, [dataInit]);

    useEffect(() => {
        if (openModal) {
            setStep(0);
            dispatch(fetchRole({ query: ''}));
        }
    }, [openModal]);

    useEffect(() => {
        if (roles) {
            setRoleOptions(roles.map((item) => ({
                value: item.id?.toString() || '',
                text: item.roleName,
            })))
            console.log(roles);
        }
    }, [roles]);

    const handleReset = () => {
        setUserData({
            
            fullName: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
            gender: '',
            address: '',
            dateOfBirth: '',
            avatar: '',
            avatarFile: null,
            role: {
                id: '',
                roleName: '',
            },
            isActive: '',
        });
        setFileList([]);
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
            const value = userData[field];
            
            
            const validator = validators[field]; // Lấy validate riêng cho trường này
            if (validator && !validator(field === 'role' ? value.id : value)) {
                isValid = false;
                break;
            }
        }
        return isValid;
    };
    
    

    const handleNext = () => {
        if (step === 0) {
            if (validateForm(formValidation1)) {
                setStep(step + 1);
            }
        }
    };

    const handleFinish = async () => {
        if (!validateForm(formValidation2)) {
            return;
        }
        
        const formData = new FormData();
        formData.append('fullName', userData.fullName || '');
        formData.append('email', userData.email || ''); 
        formData.append('phoneNumber', userData.phoneNumber || ''); 
        formData.append('password', userData.password || '');
        formData.append('confirmPassword', userData.confirmPassword || '');
        formData.append('gender', userData.gender || '');
        formData.append('address', userData.address || '');
        formData.append('dateOfBirth', userData.dateOfBirth || '');
        formData.append('roleId', userData.role?.id || '');
        formData.append('isActive', userData.isActive || '1');

        if (fileList.length > 0 && fileList[0].originFileObj) {
            formData.append('avatarFile', fileList[0].originFileObj as Blob);
        } 

        if (userData.id) {
            formData.append('id', userData.id);
    
            const res = await callUpdateUser(userData.id, formData);
            if (res && res.data) {
                notification.success({
                    message: 'Update user successfully!',
                    placement: 'bottomRight'
                });
                reloadTable();
                setOpenModal(false);
                handleReset();
            } else {
                notification.error({
                    message: Array.isArray(res.message) 
                    ? res.message.join('<br/>')   // Join array elements into a string with commas
                    : res.message || 'Update user failed!',
                    placement: 'bottomRight'
                });
            }
        } else {
            const res = await callCreateUser(formData);
            if (res && res.data) {
                notification.success({
                    message: 'Create user successfully!',
                    placement: 'bottomRight'
                });
                reloadTable();
                setOpenModal(false);
                handleReset();
            } else {
                notification.error({
                    message: Array.isArray(res.message) 
                    ? res.message.join('<br/>')   // Join array elements into a string with commas
                    : res.message || 'Create user failed!',
                    placement: 'bottomRight'
                });
            }
        }


    };

    

    
    
    const handleBack = () => {
        setStep(step - 1); 
    };

    /**
     * Check the match between password and confirm password
     * @param password 
     * @param confirmPassword 
     * @returns validate password and confirm password
     */
    const validatePasswords = (password: string, confirmPassword: string) => {
        if (password !== confirmPassword) {
            return false;
        }
        return true;
    };

    

    
    return (
        <Modal
            open={openModal}
            style={{backgroundColor: "while"}} 
            width={"50vw"} // Độ rộng của modal
            footer={null} // Xóa footer để ẩn nút OK và Cancel
            onCancel={() => {
                setOpenModal(false);
                handleReset();
            }}
        >
            <div className="modal-user-form-container">
                <div className="modal-user-form-header">
                    <div className="modal-user-form-header-content">
                        {/* Show progress bar */}
                        <Steps current={step}>
                            <Step title="Personal Details" />
                            <Step title="Account Information" />
                            
                        </Steps>
                    </div>
                </div>

              
                <div className={`modal-user-form-content`} style={{marginTop: "50px"}}>
                    <div className="modal-user-form-title">
                        {userData.id ? <h2>Update User</h2> : <h2>Create User</h2>}
                    </div>
                    <div className={step === 0 ? `modal-user-form-slide display-step`: 'hide-step'}>
                        <div className="modal-user-form-text">
                            
                            <img src="/public/resume.png" alt="user"  />
                            <h3>Personal Details</h3>
                            <p>Enter your personal information to ensure your rights.</p>
                        </div>
                        <div className="modal-user-form-input">
                        <Form onFinish={handleFinish} >  
                            <ImageUpload fileList={fileList} setFileList={setFileList} />
                    
                            <FloatingLabelInput 
                                label="Full Name"
                                value={userData?.fullName}
                                onChange={(e) => setUserData({ ...userData, fullName: e })}
                                onValidate={(validate) => handleValidate("fullName", validate)}  // Truyền validate riêng cho trường fullName
                                rules={[{ required: true, message: `Full name can't be left blank!`}]}
                                type="text"
                                hight="45px"
                                width="100%"
                                isRequired={true}
                            />
                           
                            <FloatingLabelInput 
                                label="Gender"
                                value={userData?.gender}
                                onChange={(e) => setUserData({ ...userData, gender: e })}
                                type="select"
                                options={genderOptions}
                                hight="45px"
                                width="100%"
                                
                            />

                            <FloatingLabelInput 
                                label="Date of Birth"
                                value={userData?.dateOfBirth}
                                onChange={(e) => setUserData({ ...userData, dateOfBirth: e })}
                                type="date"
                                hight="45px"
                                width="100%"
                            />

                            <FloatingLabelInput 
                                label="Address"
                                value={userData?.address}
                                onChange={(e) => setUserData({ ...userData, address: e })}
                                type="text"
                                hight="45px"
                                width="100%"
                            />
                        </Form>
                        </div>
                    </div>
                    
                    <div className={step === 1 ? `modal-user-form-slide display-step`: 'hide-step'}>
                        <div className="modal-user-form-text">
                            <img src="/public/secure-access.png" alt="user"  />
                            <h3>Account Information</h3>
                            <p>We rely on this information for verification, communication, and account management purposes.</p>
                        </div>
                        <div className="modal-user-form-input">
                            <FloatingLabelInput
                                label="Email"
                                value={userData?.email.toString()}
                                onChange={(e) => setUserData({ ...userData, email: e })}
                                onValidate={(validate) => handleValidate("email", validate)}  
                                rules={[
                                    { required: true, message: `Email can't be left blank!`}, 
                                    { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: 'Email is not valid!'}
                                ]}
                                type="text"
                                hight="45px"
                                width="100%"
                                isRequired={true}
                            />

                            <FloatingLabelInput
                                label="Phone Number"
                                value={userData?.phoneNumber?.toString()}
                                onChange={(e) => setUserData({ ...userData, phoneNumber: e })}
                                onValidate={(validate) => handleValidate("phoneNumber", validate)}  
                                rules={[
                                    { required: true, message: `Phone number can't be left blank!`}, 
                                    { pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/, message: 'Phone number is not valid!'}
                                ]}
                                type="text"
                                hight="45px"
                                width="100%"  
                                isRequired={true}
                            />

                            <FloatingLabelInput
                                label="Role"
                                value={userData?.role?.id.toString()}
                                onChange={(e) => setUserData({
                                    ...userData, 
                                    role: { 
                                        id: e, 
                                        roleName: roleOptions.find((item) => item.value === e)?.text || ''
                                    }
                                })}
                                options={roleOptions}
                                onValidate={(validate) => handleValidate("role", validate)}
                                rules={[{ required: true, message: `Role can't be left blank!`}]}
                                type="select"
                                hight="45px"
                                width="100%"
                                isRequired={true}
                            />

                            <FloatingLabelInput
                                label="Status"
                                value={userData?.isActive.toString()}
                                onValidate={(validate) => handleValidate("isActive", validate)}
                                onChange={(e) => setUserData({ ...userData, isActive: e })}
                                rules={[{ required: true, message: `Status can't be left blank!`}]}
                                type="select"
                                hight="45px"
                                width="100%"
                                options={activeOptions}
                                isRequired={true}
                            />

                            <FloatingLabelInput
                                label="Password"
                                value={userData?.password}
                                onValidate={(validate) => handleValidate("password", validate)}
                                onChange={(e) => setUserData({ ...userData, password: e })}
                                rules={[
                                    { required: true, message: `Password can't be left blank!`},
                                    { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: 'Password must contain at least 8 characters, including letters and numbers!'}
                                ]}
                                type="password"
                                hight="45px"
                                width="100%"
                                isRequired={true}
                            />
                            <FloatingLabelInput
                                label="Confirm Password"
                                value={userData?.confirmPassword}
                                onValidate={(validate) => handleValidate("confirmPassword", validate)}
                                onChange={(e) => {
                                    setUserData({ ...userData, confirmPassword: e });
                                }}
                                rules={[
                                    { required: true, message: `Confirm password can't be left blank!`},
                                    { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: 'Password must contain at least 8 characters, including letters and numbers!'},
                                    { validator: (value: string) => validatePasswords(userData.password || '', value), message: 'Password and confirm password do not match!'}
                                ]}
                                type="password"
                                hight="45px"
                                width="100%"
                                isRequired={true}
                            />
                        </div>
                    </div>
                    
                </div>
                <div className="modal-user-form-footer">
                    <div className="modal-user-btn-left">
                        <Button className="modal-user-btn" onClick={step === 1 ? handleBack : () =>{setOpenModal(false); handleReset();}}>
                            {step === 1 ? "Back" : "Cancel"}
                        </Button>
                    </div>
                    <div className="modal-user-btn-right">
                        <Button className="modal-user-btn" type="primary" onClick={step === 1 ? handleFinish : handleNext}>
                            {step === 1 ? "Submit" : "Next"}
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    
    );
};

export default ModalUser;
