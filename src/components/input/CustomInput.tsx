import React from 'react';
import { Form, Input, Select } from 'antd';
import { on } from 'events';

interface CustomInputProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: any) => void;

}
const CustomInput = (props: CustomInputProps) => {
    const {placeholder, value, onChange } = props;
    return (
        <Input

            placeholder={placeholder}
            value={value}
            onChange={(e) => {
                onChange && onChange(e.target.value);
                
            }}
        />
    );
}
export default CustomInput;