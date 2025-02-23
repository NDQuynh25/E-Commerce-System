import React from 'react';
import { CloseOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Card, Col, Form, Input, Row, Space,  } from 'antd';
import styled from 'styled-components';

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


}


const ProductVariations: React.FC<ProductVariationsProps> = () => {
  



  return (
    
      <Form.List name="variations">
        {(fields, { add, remove }) => (
          <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
            {fields.map((field) => (
              <Card
                style={{ backgroundColor: '#f6f6f6' }}
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
                <Row  key={field.key}>
                  <Col span={24}>
                    <CustomItem label="Phân loại" name={[field.name, 'variation']} rules={[{ required: true, message: 'Vui lòng nhập hoặc chọn phân loại' }]}>
                      <AutoComplete
                        options={[
                          { value: 'Size' },
                          { value: 'Màu sắc' },
                          { value: 'Kiểu dáng' },
                          { value: 'Chất liệu' },
                        ]}
                        style={{ maxWidth: 250, height: '35px' }}
                        placeholder="Chọn hoặc nhập phân loại"
                      />
                    </CustomItem>
                  </Col>
                  <Col span={24}>
                    
                    {/* Nest Form.List */}
                    <CustomItem label="Tùy chọn">
                      <Form.List name={[field.name, 'options']}>
                        {(subFields, subOpt) => (
                          <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', flexWrap: 'wrap' }}>
                          {subFields.map((subField) => (
                            <Space key={subField.key}>
                              <CustomItem noStyle name={[subField.name]} rules={[{ required: true, message: 'Vui lòng nhập tùy chọn' }]}>
                                <Input placeholder="Tùy chọn" style={{height: '35px', }} />
                              </CustomItem>
                              
                              <DeleteOutlined
                                onClick={() => {
                                  subOpt.remove(subField.name);
                                }}
                              />
                            </Space>
                          ))}
                          <Button type="dashed" style={{width: '186px', height: '35px'}} icon={<PlusOutlined/>} onClick={() => subOpt.add()} block>
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
            {(fields.length < 2) && (
              <Button type="dashed" icon={<PlusOutlined/>} onClick={() => add()} block style={{width: '160px', height: '35px',}}>
                Thêm phân loại
              </Button>) }
          </div>
        )}
      </Form.List>

     
  );
};

export default ProductVariations;
