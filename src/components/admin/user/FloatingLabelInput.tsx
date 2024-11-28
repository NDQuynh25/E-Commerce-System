import React, { useState } from "react";
import { Input, Select } from "antd";
import "../../../styles/floating.label.input.css";  

interface FloatingLabelInputProps {
    label: string; 
    value?: string | undefined; // Giá trị của input
    onChange?: (value: any) => void; 
    type?: "text" | "password" | "email" | "select" | "textarea" | "date"; // Thêm "date" vào kiểu
    options?: 
        {
            value: string;
            text: string;
        }[]; 
    hight: string;
    width: string;
}

const FloatingLabelInput = (props: FloatingLabelInputProps) => {
    const { label, value, onChange, type = "text", options = [], hight, width } = props;
    const [isFocused, setIsFocused] = useState(false); // Trạng thái focus
    const { Option } = Select;

    return (
        <div
            style={{
                position: "relative",
                marginBottom: "20px",
                width: width,
                height: hight,
            }}
        >
            {/* Input Field */}
            {type === "textarea" ? (
                <Input.TextArea
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(!!value)}
                    placeholder=" "
                    style={{
                        width: "100%",
                        padding: "10px",
                        background: "white",
                        color: "black",
                        borderRadius: "5px",
                        outline: "none",
                        border: isFocused || value ? "1.45px solid #1a73e8" : "1px solid #aaa",
                        minHeight: "100px", // Điều chỉnh chiều cao tối thiểu
                        resize: "vertical", // Cho phép người dùng kéo thả để thay đổi chiều cao
                    }}
                />
            ) : type === "select" ? (
                <Select
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(!!value)}
                    placeholder=" "
                    className="custom-select"
                    style={{
                        width: "100%",
                        height: "100%",
                        padding: "0px",
                        background: "white",
                        color: "black",
                        borderRadius: "5px",
                        outline: "none",
                        border: isFocused || value ? "1.45px solid #1a73e8" : "1px solid #aaa",
                    }}
                >
                    {options?.map((option, index) => (
                        <Option key={index} value={option.value} >
                            {option.text}
                        </Option>
                    ))}
                </Select>
            ) : type === "date" ? (
                <Input
                    type="date"
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(!!value)}
                    placeholder=" "
                    style={{
                        width: "100%",
                        padding: "10px",
                        background: "white",
                        color: "black",
                        borderRadius: "5px",
                        outline: "none",
                        border: isFocused || value ? "1.45px solid #1a73e8" : "1px solid #aaa",
                    }}
                />
            ) : (
                <Input
                    type={type}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(!!value)}
                    placeholder=" "
                    style={{
                        padding: "10px",
                        background: "white",
                        color: "black",
                        borderRadius: "5px",
                        outline: "none",
                        border: isFocused || value ? "1.45px solid #1a73e8" : "1px solid #aaa",
                    }}
                />
            )}

            {/* Label */}
            <label
                style={{
                    position: "absolute",
                    left: "10px",
                    top: isFocused || value ? "0px" : "50%",
                    transform: "translateY(-50%)",
                    fontSize: isFocused || value ? "13px" : "16px",
                    color: isFocused || value ? "#1a73e8" : "#aaa",
                    backgroundColor: isFocused || value ? "white" : "transparent",
                    fontWeight: isFocused || value ? "400" : "normal",
                    padding: "0 5px",
                    pointerEvents: "none",
                    transition: "all 0.3s ease-in-out",
                }}
            >
                {label}
            </label>
        </div>
    );
};

export default FloatingLabelInput;
