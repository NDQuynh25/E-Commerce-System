import React, { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
import type {
  InputProps,
  SelectProps,
  FormItemProps,
  FormInstance,
} from "antd";
import styled from "styled-components";
import { TextAreaProps } from "antd/es/input";
import { useWatch } from "antd/es/form/Form";
import { current } from "@reduxjs/toolkit";

export interface FloatingLabelInputProps extends Omit<InputProps, "form"> {
  name: string;
  label: string;
  form?: FormInstance;
  rules?: FormItemProps["rules"];
  type?: "text" | "password" | "select" | "number" | "textarea";
  selectProps?: SelectProps;
}

const FloatingLabelWrapper = styled.div`
  position: relative;
  margin-bottom: 2px;

  .ant-input,
  .ant-select-selector {
    height: 45px !important;
    transition: all 0.3s ease;

    &::placeholder {
      color: transparent;
    }

    &:focus {
      box-shadow: none;
      border-color: #1890ff;
    }
  }

  .ant-select-selection-placeholder {
    opacity: 0;
  }

  .floating-label {
    position: absolute;
    left: 12px;
    top: 10px;
    color: #aaa;
    font-size: 15px;
    pointer-events: none;
    transition: all 0.3s ease;
    transform-origin: left top;
    background: white;
    padding: 0 4px;
    z-index: 1;
  }

  &.filled .floating-label,
  .ant-input:focus + .floating-label,
  .ant-select-focused + .floating-label {
    transform: translateY(-20px) scale(0.85);
    color: #1890ff;
    font-size: 16px;
  }
`;

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  name,
  label,
  form,
  rules,
  type = "text",
  selectProps,
  ...inputProps
}) => {
  const watchedValue = useWatch({ name, form });
  const [filled, setFilled] = useState(() => !!form?.getFieldValue(name)); // ✅ init với giá trị ban đầu
  const [currentValue, setCurrentValue] = useState(""); // ✅ init với giá trị ban đầu
  useEffect(() => {
    console.log("currentValue", currentValue);
  }, [currentValue]);

  useEffect(() => {
    setFilled(!!form?.getFieldValue(name));
    setCurrentValue(form?.getFieldValue(name)); // ✅ cập nhật giá trị hiện tại khi input thay đổ
  }, [form?.getFieldValue(name)]);

  const renderInput = () => {
    if (type === "select") {
      return (
        <Select
          {...selectProps}
          value={currentValue}
          style={{ width: "100%", marginBottom: "11px" }}
          onChange={(value) => {
            setFilled(!!value);
            form?.setFieldValue(name, value);
            selectProps?.onChange?.(value);
          }}
        />
      );
    }

    return (
      <Input
        {...inputProps}
        type={type}
        value={currentValue}
        onChange={(e) => {
          //form?.setFieldValue(name, e.target.value);
          inputProps.onChange?.(e);
          setFilled(!!e.target.value);
          setCurrentValue(e.target.value); // ✅ cập nhật giá trị hiện tại khi input thay đổ
        }}
      />
    );
  };

  return (
    <Form.Item name={name} rules={rules} style={{ marginBottom: "35px" }}>
      <FloatingLabelWrapper className={filled ? "filled" : ""}>
        {renderInput()}
        <label className="floating-label">
          {label}
          {rules?.some((rule) => (rule as any).required) && (
            <span style={{ color: "red", marginLeft: 4 }}>*</span>
          )}
        </label>
      </FloatingLabelWrapper>
    </Form.Item>
  );
};

export default FloatingLabelInput;
