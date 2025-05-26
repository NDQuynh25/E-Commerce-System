import React from "react";
import { CloseOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  AutoComplete,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Space,
  Select,
} from "antd";
import styled from "styled-components";

const CustomItem = styled(Form.Item)`
  .ant-row.ant-form-item-row {
    font-size: 1rem !important;
    flex-wrap: wrap !important;
  }

  .ant-form-item-label label::after {
    content: none !important;
  }

  .ant-form-item-label label {
    height: 100% !important;
    align-items: flex-start !important;
    display: flex;
    font-family: Inter, -apple-system, BlinkMacSystemFont, "San Francisco",
      "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
    font-size: 15px !important;
    font-weight: 450 !important;
    letter-spacing: 0px !important;
    text-align: right !important;
    justify-content: left !important;
    margin-top: 5px !important;
    margin-right: 15px !important;
  }
  .ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
    display: none !important;
  }
  .ant-form-item-required:not(.ant-form-item-required-mark-optional)::after {
    display: inline-block !important;
    margin-top: 2px !important;
    margin-inline-start: 4px !important;
    color: #ff4d4f !important;
    font-size: 14px !important;
    font-family: SimSun, sans-serif !important;
    line-height: 1 !important;
    content: "*" !important;
    visibility: visible !important;
    //display: none !important;
  }
`;

type variation = {
  variation: string;
  options: string[];
};

interface ProductVariationsProps {
  variationsData: variation[];
  form: any;
  setSkusData: React.Dispatch<React.SetStateAction<any[]>>;
}

const ProductVariations: React.FC<ProductVariationsProps> = ({ form }) => {
  // Thêm useEffect để theo dõi thay đổi của variation
  React.useEffect(() => {
    const variations = form.getFieldValue("variations") || [];
    variations.forEach((variation: any, index: number) => {
      if (variation?.variation === "Mặc định") {
        // Tự động set options thành "Mặc định"
        form.setFieldValue(["variations", index, "options"], ["Mặc định"]);
        // Tạo SKU mặc định
      }
    });
  }, [form.getFieldValue("variations")]);

  return (
    <Form.List name="variations">
      {(fields, { add, remove }) => (
        <div style={{ display: "flex", flexDirection: "column", rowGap: 16 }}>
          {fields.map((field) => (
            <Card
              style={{ backgroundColor: "#f6f6f6" }}
              size="default"
              title={`Phân loại ${field.name + 1}`}
              key={field.key}
              extra={
                <CloseOutlined
                  onClick={() => {
                    remove(field.name);
                  }}
                />
              }
            >
              <Row key={field.key}>
                <Col span={24}>
                  <CustomItem
                    label="Phân loại"
                    name={[field.name, "variation"]}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập hoặc chọn phân loại",
                      },
                    ]}
                  >
                    <Select
                      options={[
                        ...(field.name === 0
                          ? [{ value: "Mặc định", label: "Mặc định" }]
                          : []),
                        { value: "Size", label: "Size" },
                        { value: "Màu sắc", label: "Màu sắc" },
                        { value: "Kiểu dáng", label: "Kiểu dáng" },
                        { value: "Chất liệu", label: "Chất liệu" },
                      ]}
                      style={{ maxWidth: 250, height: "35px" }}
                      placeholder="Chọn phân loại"
                      onSelect={(value) => {
                        if (value === "Mặc định") {
                          // Clear existing options
                          form.setFieldValue(
                            ["variations", field.name, "options"],
                            []
                          );
                          // Add default option
                          form.setFieldValue(
                            ["variations", field.name, "options"],
                            ["Mặc định"]
                          );
                          // Set SKU data
                        }
                      }}
                    />
                  </CustomItem>
                </Col>
                <Col span={24}>
                  {/* Nest Form.List */}
                  <CustomItem label="Tùy chọn">
                    <Form.List name={[field.name, "options"]}>
                      {(subFields, subOpt) => (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "16px",
                            flexWrap: "wrap",
                          }}
                        >
                          {subFields.map((subField) => (
                            <Space key={subField.key}>
                              <CustomItem
                                noStyle
                                name={[subField.name]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Vui lòng nhập tùy chọn",
                                  },
                                ]}
                              >
                                <Input
                                  placeholder="Tùy chọn"
                                  style={{ height: "35px" }}
                                  disabled={
                                    form.getFieldValue([
                                      "variations",
                                      field.name,
                                      "variation",
                                    ]) === "Mặc định"
                                  }
                                />
                              </CustomItem>

                              <DeleteOutlined
                                onClick={() => {
                                  subOpt.remove(subField.name);
                                }}
                                style={{
                                  visibility:
                                    form.getFieldValue([
                                      "variations",
                                      field.name,
                                      "variation",
                                    ]) === "Mặc định"
                                      ? "hidden"
                                      : "visible",
                                }}
                              />
                            </Space>
                          ))}
                          <Button
                            type="dashed"
                            style={{
                              width: "186px",
                              height: "35px",
                              display:
                                form.getFieldValue([
                                  "variations",
                                  field.name,
                                  "variation",
                                ]) === "Mặc định"
                                  ? "none"
                                  : "block",
                            }}
                            icon={<PlusOutlined />}
                            onClick={() => subOpt.add()}
                            block
                          >
                            Thêm tùy chọn
                          </Button>
                        </div>
                      )}
                    </Form.List>
                  </CustomItem>
                </Col>
              </Row>
            </Card>
          ))}
          {fields.length < 2 &&
            !fields.some(
              (field) =>
                form.getFieldValue(["variations", field.name, "variation"]) ===
                "Mặc định"
            ) && (
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={() => add()}
                block
                style={{ width: "160px", height: "35px" }}
              >
                Thêm phân loại
              </Button>
            )}
        </div>
      )}
    </Form.List>
  );
};

export default ProductVariations;
