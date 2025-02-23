import * as React from "react";
import { useEffect } from "react";
import { Col, Form, Button, Row, Input, Select, Badge } from "antd";

import styled from "styled-components";
import runes from 'runes';
import RequiredLabel from "../../input/RequiredLabel";
import CategorySelect from "./CategorySelect";



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



const ProductForm: React.FC = () => {
   
    const [form] = Form.useForm();
    const onFinish = async (values: any) => {   
       console.log(values);
    };
   
  return (
      <div className="category-form">
          
          <div className="category-form__container" style={{padding: '40px 10%', display: 'flex', justifyContent: 'center'}}>
            <Form 
                form={form} 
                layout="vertical" 
                name="category-form" 
                initialValues={{
                    id: '10',
                    isActive: "1",
                }} 
                onFinish={onFinish}
               
            >
                
                    
                    <Row gutter={20} style={{padding: "20px", border: '1px solid blue', background: '#fff'}}>
                        <Col xl={24} lg={24} md={24} sm={24} xs={24}><h5 style={{marginBottom: "20px"}}>Thông tin danh mục</h5></Col>

                        <Col xl={5} lg={10} md={15} sm={24} xs={24}>
                            <CustomItem 
                                label={<RequiredLabel label="Mã danh mục" tooltip="ID của danh mục" />}
                                name="id" 
                                labelCol={{ span: 24 }} 
                                wrapperCol={{ span: 24 }}
                                
                            >
                                <Input 
                                    readOnly
                                    style={{height: '35px', fontSize: '15px'}}
                                />
                            </CustomItem>
                        </Col>
                        
                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            <CustomItem 
                                label={<RequiredLabel label="Tên danh mục" tooltip="Tên sản phẩm sẽ được hiển thị trên trang sản phẩm" />}
                                name="categoryName" 
                                labelCol={{ span: 24 }} 
                                wrapperCol={{ span: 24 }}
                                rules={[{ required: true, message: 'Không được bỏ trống ô' }]}
                            >
                                <Input 
                                    count={{
                                        show: true,
                                        max: 120,
                                        strategy: (txt) => runes(txt).length,
                                        exceedFormatter: (txt, { max }) => runes(txt).slice(0, max).join(''),
                                    }}
                                    placeholder='Nhập tên danh mục' 
                                    style={{height: '35px', fontSize: '15px'}}
                                    
                                />
                            </CustomItem>
                        </Col>
                        
                        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                            <CustomItem 
                                label={<RequiredLabel label="Trạng thái" tooltip="Mã SKU sẽ được hiển thị trên trang sản phẩm" />}
                                name="isActive" 
                                
                                labelCol={{ span: 24 }} 
                                wrapperCol={{ span: 24 }}
                                rules={[{ required: true, message: 'Không được bỏ trống ô' }]}
                            >
                                <Select style={{height: '35px'}}>
                                    <Select.Option value="1"><Badge status="success" text="Hoạt động"/></Select.Option>
                                    <Select.Option value="0"><Badge status="error" text="Vô hiệu"/></Select.Option>
                                </Select>
                            </CustomItem>
                        </Col>
                        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                            <CustomItem
                                label={<RequiredLabel label="Danh mục phụ thuộc" tooltip="Chọn các danh mục con" />}
                                name="categoryIds" 
                                labelCol={{ span: 24 }} 
                                wrapperCol={{ span: 24 }}
                                style={{width: '100%'}}
                            >
                                <CategorySelect form={form} />
                            </CustomItem>
                        </Col>
                        
                    </Row>
                    <Row gutter={20} style={{padding: "20px", border: '1px solid blue', background: '#fff', marginTop: '20px', gap: '20px', display: 'flex', justifyContent: 'right'}}>
                        <Button type="default" style={{marginTop: '20px', width: '140px', height: '35px'}}>Hủy</Button>
                        <Button type="primary" htmlType="submit" style={{marginTop: '20px', width: '140px', height: '35px'}}>Lưu</Button>
                    </Row>
                        
                   

                
            </Form>
            </div>
        
      </div>
  );
};

export default ProductForm;
