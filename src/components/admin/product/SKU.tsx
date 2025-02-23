import React from 'react';
import { useEffect, useState } from 'react';
import { Col, InputNumber, Modal, Row, Table } from 'antd';
import { TableProps } from 'antd/es/table';
import { Badge, Form, Input } from 'antd';
import styled from 'styled-components';
import { skuType } from '../../../types/backend';

import RequiredLabel from '../../input/RequiredLabel';



const CustomItem = styled(Form.Item)`
    .ant-row.ant-form-item-row {
        font-size: 1rem!important;
        flex-wrap: wrap !important;
    }
    
    .ant-form-item-label label::after {
        content: none !important;
    }
   
    .ant-form-item-label label {
        height: 100% !important;
        align-items: flex-start !important;
        display: flex;
        font-family: Inter, -apple-system, BlinkMacSystemFont, "San Francisco", "Segoe UI", Roboto, "Helvetica Neue", sans-serif;;
        font-size: 15px !important;
        font-weight: 450 !important;
        letter-spacing: 0px !important; 
        text-align: right !important;
        justify-content: left !important;
        margin-top: 5px !important;
        margin-right: 15px !important;
      
    }
    .ant-form-item-required:not(.ant-form-item-required-mark-optional)::before{
        display: none !important;
    }
    .ant-form-item-required:not(.ant-form-item-required-mark-optional)::after{
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
    variationsData: variation[];
    skusData: skuType[];
    setSkusData: React.Dispatch<React.SetStateAction<skuType[]>>;   
    
}


const SKU: React.FC<SKUProps> = ({variationsData, skusData, setSkusData }) => {



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
                style={{ width: "100%", display: "flex", justifyContent: "center" }}
              >
                <span style={{
                  fontSize: "0.95rem",
                }}>{text}</span>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  
                  marginTop: "10px",
                }}
              >
                
              </div>
            </div>
          )},
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
            title: "Mã SKU",
            dataIndex: "skuCode",
            render: (text, record) => (
                <CustomItem 
                  name={`skuCode-${record.key}`} 
                  rules={[{ required: true, message: "Mã SKU không được trống" }]}
                >
                 <Input
                    style={{ height: "35px" }}
                    placeholder="Nhập mã SKU" 
                    onChange={(e) => onSKUChange(record.key, e.target.value, "skuCode")}
                  />
                </CustomItem>
            ),
            align: "center",
        },
        {
          title: "Giá gốc",
          dataIndex: "originalPrice",
          render: (text, record) => (
            <Form.Item
              name={`originalPrice-${record.key}`}
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
                }
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
          title: "Giá bán",
          dataIndex: "sellingPrice",
          render: (text, record) => (
            <CustomItem 
              name={`sellingPrice-${record.key}`} 
              key={record.key}
              rules={[
                { required: true, message: "Không được để trống ô" },
                {
                  validator: (_, value) => {
                    if (value === undefined || value === "") {
                      return Promise.resolve(); 
                    }
                    const numericValue = parseFloat(value);
                    if (isNaN(numericValue) || numericValue < 1000) {
                      return Promise.reject("Giá bán tối thiểu là 1000 VND");
                    }
                    return Promise.resolve();
                  },
                }
              ]}
            >
              <InputNumber<number>
                type="number"
                style={{ width: "100%", height: "35px" }}
                //value={record.discount.toString()}
                prefix="₫"
                onChange={(e) => onSKUChange(record.key, e, "sellingPrice")}
                placeholder="Nhập giá bán"
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
              name={`stock-${record.key}`} 
              rules={[
                { required: true, message: "Không được để trống ô" },
                {
                  validator: (_, value) => {
                    if (value === undefined || value === "") {
                      return Promise.resolve(); 
                    }
                    const numericValue = Number(value); 

                    if (!Number.isInteger(numericValue) || numericValue < 0) {
                      return Promise.reject("Số lượng hàng phải là số nguyên không âm");
                    }

                    return Promise.resolve();
                  },
                }
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
    ];
    console.log("variationsData: ", variationsData);
    console.log("skusData: ", skusData);

    const onSKUChange = (key: number, value: string | number | null, field: string) => {
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
      }

    useEffect(() => {
      console.log("skusData: ", skusData);
    }, [skusData]); 
    useEffect(() => {
        let data: skuType[] = [];
        let count1 = variationsData[0]?.options?.length || 0;
        let count2 = variationsData[1]?.options?.length || 0;
        if (count2 === 0) {
          for (let i = data.length; i < count1; i++) {
            data.push({
              key: i,
              skuCode: "",
              option1: variationsData[0]?.options[i] || "",
              originalPrice: 0,
              sellingPrice: 0,
              stock: 0,
              
            });
          }
        } else {
          for (let i = 0; i < count1; i++) {
            for (let j = 0; j < count2; j++) {
              data.push({
                key: i * count2 + j,
                skuCode: "",
                option1: variationsData[0]?.options[i] || "",
                option2: variationsData[1]?.options[j] || "",
                originalPrice: 0,
                sellingPrice: 0,
                stock: 0,
              });
            }
          }
        }
        setSkusData(data);
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
            scroll={{ x: 'max-content' }}
            
        />
        {/* <Modal
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          title="Add SKU"
          okText="Add"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="SKU Code"
                name="skuCode"
                rules={[{ required: true, message: "SKU Code is required" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Original Price"
                name="originalPrice"
                rules={[{ required: true, message: "Original Price is required" }]}
              >
                <Input />
              </Form.Item>
            </Col>

          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Selling Price"
                name="sellingPrice"
                rules={[{ required: true, message: "Selling Price is required" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Stock"
                name="stock"
                rules={[{ required: true, message: "Stock is required" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Modal> */}
      </>
    )
}
export default SKU;