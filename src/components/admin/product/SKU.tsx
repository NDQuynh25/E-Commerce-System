import React from "react";
import { useEffect, useState } from "react";
import { Col, InputNumber, Modal, Row, Table, Select } from "antd";
import { TableProps } from "antd/es/table";
import { Badge, Form, Input } from "antd";
import styled from "styled-components";
import { skuType } from "../../../types/backend";

import { useAppSelector } from "../../../redux/hooks";
import { FormInstance } from "antd/lib";

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
    margin-top: 5px !important;
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

interface SKUProps {
  form: FormInstance<any>;
  variationsData: variation[];
  skusData: skuType[];
  skus: any;
  setSkusData: React.Dispatch<React.SetStateAction<skuType[]>>;
  isEdit?: boolean;
}

const SKU: React.FC<SKUProps> = ({
  form,
  variationsData,
  skusData,
  setSkusData,
}) => {
  const columns: TableProps<skuType>["columns"] = [
    {
      title: (
        <Badge
          status="processing"
          text={variationsData[0]?.variation || "Phân loại 1"}
        />
      ),
      dataIndex: "option1",
      onCell: (record: skuType) => ({
        rowSpan:
          record.key % (variationsData[1]?.options?.length || 1) === 0
            ? variationsData[1]?.options?.length || 1
            : 0,
      }),
      align: "center",
      fixed: "left",
      width: "11%",
      render: (text: string, record: skuType) => {
        return (
          <div
            style={{
              width: "100%",
              justifyContent: "left",
              justifyItems: "left",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: "0.95rem",
                }}
              >
                {text}
              </span>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",

                marginTop: "10px",
              }}
            ></div>
          </div>
        );
      },
    },
    ...(variationsData.length === 2
      ? [
          {
            title: (
              <Badge
                status="processing"
                text={variationsData[1]?.variation || "Phân loại 2"}
              />
            ),
            dataIndex: "option2",
            width: "11%",
            fixed: "left" as "left" | "right" | true | undefined,
            align: "center" as "left" | "center" | "right",
            render: (text: string, record: any) => (
              <span
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "0.95rem",
                }}
              >
                {text}
              </span>
            ),
          },
        ]
      : []),

    {
      title: "Giá gốc",
      dataIndex: "originalPrice",
      render: (text, record) => (
        <Form.Item
          name={`originalPrice_${record.key}`}
          key={record.key}
          rules={[
            { required: true, message: "Không được để trống ô" },
            {
              validator: (_, value) => {
                if (value === undefined || value === "") {
                  return Promise.resolve();
                }
                const numericValue = parseFloat(value);
                if (isNaN(numericValue) || numericValue < 0) {
                  return Promise.reject("Giá gốc tối thiểu là 0 VND");
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <InputNumber<number>
            type="number"
            style={{ width: "100%" }}
            prefix="₫"
            // value={record.price.toString()}

            onChange={(e) => onSKUChange(record.key, e, "originalPrice")}
            placeholder="Nhập giá gốc"
          />
        </Form.Item>
      ),
      align: "center",
    },
    {
      title: "Giảm giá",
      dataIndex: "discount",
      render: (text, record) => (
        <CustomItem
          name={`discount_${record.key}`}
          key={record.key}
          rules={[
            { required: true, message: "Không được để trống ô" },
            {
              validator: (_, value) => {
                if (value === undefined || value === "") {
                  return Promise.resolve();
                }
                const numericValue = parseFloat(value);
                if (
                  isNaN(numericValue) ||
                  numericValue < 0 ||
                  numericValue > 100
                ) {
                  return Promise.reject(
                    "Giảm giá tối thiểu là 0% và tối đa là 100%"
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <InputNumber<number>
            type="number"
            style={{ width: "100%", height: "35px" }}
            //value={record.discount.toString()}
            prefix="%"
            onChange={(e) => onSKUChange(record.key, e, "discount")}
            placeholder="Nhập giảm giá"
          />
        </CustomItem>
      ),
      align: "center",
    },
    {
      title: "Kho hàng",
      dataIndex: "stock",
      render: (text, record) => (
        <CustomItem
          name={`stock_${record.key}`}
          rules={[
            { required: true, message: "Không được để trống ô" },
            {
              validator: (_, value) => {
                if (value === undefined || value === "") {
                  return Promise.resolve();
                }
                const numericValue = Number(value);

                if (!Number.isInteger(numericValue) || numericValue < 0) {
                  return Promise.reject(
                    "Số lượng hàng phải là số nguyên không âm"
                  );
                }

                return Promise.resolve();
              },
            },
          ]}
        >
          <InputNumber<number>
            style={{ width: "100%", height: "35px" }}
            //value={record.stock.toString()}
            onChange={(e) => onSKUChange(record.key, e, "stock")}
            placeholder="Nhập số lượng hàng"
          />
        </CustomItem>
      ),
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      render: (text, record) => (
        <CustomItem
          name={`isActive_${record.key}`}
          //initialValue={"1"}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[{ required: true, message: "Không được bỏ trống ô" }]}
        >
          <Select
            style={{ height: 35 }}
            optionLabelProp="label"
            onChange={(e) => onSKUChange(record.key, e, "isActive")}
          >
            <Select.Option
              value="1"
              label={<Badge status="success" text="Hoạt động" />}
            >
              <Badge status="success" text="Hoạt động" />
            </Select.Option>
            <Select.Option
              value="0"
              label={<Badge status="error" text="Vô hiệu" />}
            >
              <Badge status="error" text="Vô hiệu" />
            </Select.Option>
          </Select>
        </CustomItem>
      ),
      align: "center",
    },
  ];

  useEffect(() => {
    console.log(">>> skusData: ", skusData);
    skusData.forEach((sku, index) => {
      console.log(">>> sku: ", sku);
      form.setFieldsValue({
        [`originalPrice_${index}`]: sku.originalPrice,
        [`discount_${index}`]: sku.discount,
        [`stock_${index}`]: sku.stock,
        [`isActive_${index}`]: sku.isActive?.toString() ?? "1",
      });
    });
  }, []);

  const onSKUChange = (
    key: number,
    value: string | number | null,
    field: string
  ) => {
    const newSkusData = skusData.map((sku) => {
      if (sku.key === key) {
        return {
          ...sku,
          [field]: value,
        };
      }
      return sku;
    });
    setSkusData(newSkusData);
  };

  // useEffect(() => {
  //   console.log("skusData: ", skusData);
  // }, [skusData]);

  useEffect(() => {
    let data: skuType[] = [];
    if (
      variationsData[0]?.variation === "Mặc định" ||
      variationsData[1]?.variation === "Mặc định"
    ) {
      data.push({
        key: 0,
        id: skusData[0]?.id || "",
        option1: "Mặc định",
        option2: "",
        originalPrice: skusData[0]?.originalPrice ?? 0,
        discount: skusData[0]?.discount ?? 0,
        stock: skusData[0]?.stock ?? 0,
        isActive: skusData[0]?.isActive?.toString() ?? "1",
      });
    } else {
      let count1 = variationsData[0]?.options?.length || 0;
      let count2 = variationsData[1]?.options?.length || 0;
      if (count2 === 0) {
        for (let i = 0; i < count1; i++) {
          data.push({
            key: i,
            id: skusData[i]?.id || "",
            option1: variationsData[0]?.options[i] || "",
            option2: "",
            originalPrice: skusData[i]?.originalPrice ?? 0,
            discount: skusData[i]?.discount ?? 0,
            stock: skusData[i]?.stock ?? 0,
            isActive: skusData[i]?.isActive?.toString() ?? "1",
          });
        }
      } else {
        for (let i = 0; i < count1; i++) {
          for (let j = 0; j < count2; j++) {
            const index = i * count2 + j;
            data.push({
              key: index,
              id: skusData[index]?.id || "",
              option1: variationsData[0]?.options[i] || "",
              option2: variationsData[1]?.options[j] || "",
              originalPrice: skusData[index]?.originalPrice ?? 0,
              discount: skusData[index]?.discount ?? 0,
              stock: skusData[index]?.stock ?? 0,
              isActive: skusData[index]?.isActive?.toString() ?? "1",
            });
          }
        }
      }
    }
    setSkusData(data);
    data.forEach((sku, index) => {
      form.setFieldsValue({
        [`originalPrice_${index}`]: sku.originalPrice,
        [`discount_${index}`]: sku.discount,
        [`stock_${index}`]: sku.stock,
        [`isActive_${index}`]: sku.isActive?.toString() ?? "1",
      });
    });
  }, [variationsData]);

  return (
    <>
      <Table
        style={{
          width: "100%",
          border: "1px solid rgb(214, 209, 209)",
        }}
        bordered
        dataSource={skusData.map((data, index) => ({
          ...data,
          key: index,
        }))}
        columns={columns}
        pagination={false}
        scroll={{ x: "max-content" }}
      />
    </>
  );
};
export default SKU;
