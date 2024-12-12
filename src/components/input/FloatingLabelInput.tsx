import React, { useState } from "react";
import { Form, Input, Select } from "antd";
import "../../styles/floating.label.input.css";  

interface FloatingLabelInputProps {
    label?: string; 
    value?: string | undefined;
    onChange?: (value: any) => void; 
    type?: "text" | "password" | "email" | "select" | "textarea" | "date"; // Thêm "date" vào kiểu
    options?: 
        {
            value: string;
            text: string | JSX.Element | any;
        }[]; 
    hight?: string;
    width?: string;
    style?: React.CSSProperties; // Thêm style để nhận kiểu từ bên ngoài
    rules?: any[];
    isDisabled?:boolean;
    isRequired?: boolean;
    onValidate?: (value: any) => void;
    
}


const FloatingLabelInput = (props: FloatingLabelInputProps) => {
    const { label, value, onChange, type = "text", options = [], hight, width, style, rules, isDisabled = false ,onValidate, isRequired = false} = props;
    const [isFocused, setIsFocused] = useState(false); // Trạng thái focus
    const [error, setError] = useState<string | null>(null);
    const { Option } = Select;

    // Hàm kiểm tra validation
    const validate = (value: any) => {
        if (rules?.length) {
            for (const rule of rules) {
                if (rule.required && !value) {
                    setError(rule.message || "Vui lòng không bỏ trống");
                    return false;
                }
                if (rule.pattern && !rule.pattern.test(value)) {
                    setError(rule.message || "Giá trị không hợp lệ");
                    return false;
                }
                if (rule.validator && !rule.validator(value)) {
                    setError(rule.message || "Giá trị không hợp lệ");
                    return false;
                }
            }
        }
        setError(null); // Reset error nếu validation thành công
        return true;
    };

   

    React.useEffect(() => {
        if (onValidate) {
            onValidate(validate);  // Gọi validate khi prop onValidate thay đổi
        }
    }, []);

  
    
    return (
        <div className="floating-label-input"
            style={{
                padding: 0,
                marginTop: "15px",
                marginBottom: "20px",
                height: "fit-content",
            }}
        >
            <div
                style={{
                    position: "relative",
                    
                    width: width,
                    height: hight,
                    ...style, 
                }}
            >   

                
                {/* Trường nhập liệu */}
                {type === "textarea" ? (
                    <Input.TextArea
                        value={value}
                        onChange={
                            (e) => {
                                onChange?.(e.target.value);
                                validate(e.target.value);
                            }
                        }
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(!!value)}
                        placeholder=" "
                        disabled={isDisabled}
                        style={{
                            fontSize: "14px",
                            width: "100%",
                            padding: "10px",
                            background: "white",
                            color: "black",
                            borderRadius: "5px",
                            outline: "none",
                            border: error? "1.45px solid red" : (isFocused || value ? "1.45px solid #1a73e8" : "1px solid #aaa"),
                            minHeight: "50px",
                            maxHeight: "100px", 
                            resize: "vertical", 
                            ...style,
                        }}
                    />
                ) : type === "select" ? (
                    <Select
                        value={value}
                        onChange={(e) => {
                            onChange?.(e);
                            validate(e);
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(!!value)}
                        placeholder=" "
                        disabled={isDisabled}
                        className="custom-select"
                        style={{
                            fontSize: "14px",
                            width: "100%",
                            height: "100%",
                            padding: "0px",
                            background: "white",
                            color: "black",
                            borderRadius: "5px",
                            outline: "none",
                            border: error? "1.45px solid red" : (isFocused || value ? "1.45px solid #1a73e8" : "1px solid #aaa"),
                            ...style, // Áp dụng style từ bên ngoài
                        }}
                    >
                        {options?.map((option, index) => (
                            <Option key={index} value={option.value}>
                                {option.text}
                            </Option>
                        ))}
                    </Select>
                ) : type === "date" ? (
                    <Input
                        type="date"
                        value={value || ""}  // Đảm bảo không hiển thị placeholder mặc định nếu không có giá trị
                        onChange={
                            (e) => {
                                onChange?.(e.target.value);
                                validate(e.target.value);
                            }
                        }
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(!!value)}
                        placeholder=""
                        disabled={isDisabled}
                        className={isFocused || value ? "focused" : ""}
                        style={{
                            fontSize: "14px",
                            width: "100%",
                            padding: "10px",
                            background: "white",
                            borderRadius: "5px",
                            outline: "none",
                            border: error? "1.45px solid red" : (isFocused || value ? "1.45px solid #1a73e8" : "1px solid #aaa"),
                            color: "black",
                            ...style, // Áp dụng style từ bên ngoài
                            
                        }}
                    />
                ) : (
                    <Input
                        type={type}
                        value={value}
                        onChange={
                            (e) => {
                                onChange?.(e.target.value);
                                validate(e.target.value);
                            }
                        }
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(!!value)}
                        disabled={isDisabled}
                        placeholder=" "
                        style={{
                            fontSize: "14px",
                            padding: "10px",
                            background: isDisabled? "#F0F0F0" : "white",
                            color: "black",
                            borderRadius: "5px",
                            outline: "none",
                            border: error? "1.45px solid red" : (isFocused || value ? "1.45px solid #1a73e8" : "1px solid #aaa"),
                            ...style, // Áp dụng style từ bên ngoài
                        }}
                    />
                )}

                {/* Nhãn */}
                <label
                    style={{
                        position: "absolute",
                        left: "10px",
                        top: isFocused || value ? "0px" : "50%",
                        transform: "translateY(-50%)",
                        fontSize: isFocused || value ? "13px" : "16px",
                        color: isFocused || value ? "#1a73e8" : "#aaa",
                        backgroundColor: (isFocused || value ? "white" : "transparent"),
                        fontWeight: isFocused || value ? "400" : "normal",
                        padding: "0 5px",
                        pointerEvents: "none",
                        transition: "all 0.3s ease-in-out",
                        ...style, // Áp dụng style từ bên ngoài
                    }}
                >   
                    <div style={{ display: "flex", alignItems: "center"}}>
                        {label}
                        {isRequired && <span style={{ color: "red", marginLeft: "3px"}}>*</span>}
                    </div>
                </label>
            
            
            </div>
            {error && <p style={{ color: "red", fontSize: "13px", marginTop: "1px"}}>{error}</p>}
        </div>
        
    );
};

export default FloatingLabelInput;
