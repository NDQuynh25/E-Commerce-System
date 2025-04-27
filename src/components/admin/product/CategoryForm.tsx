import * as React from "react";
import { useEffect } from "react";
import { Col, Form, Button, Row, Input, Select, Badge } from "antd";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import runes from 'runes';
import RequiredLabel from "../../input/RequiredLabel";
import CategorySelect from "./CategorySelect";
import { CategoryType } from "../../../types/backend";
import { callCreateCategory, callUpdateCategory, callDeleteCategory } from "../../../api/categoryApi";
import { notification } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setLoading } from "../../../redux/slices/globalSlice";
import { fetchCategory } from "../../../redux/slices/categorySlice";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";








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
    .ant-input-suffix {
        
        span {
            color: #000 !important;
        }
        padding-left: 10px !important;
        border-left: 1px solid #d9d9d9 !important;
    }


`;

interface CategoryFormProps {
    isEdit?: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({isEdit}) => {
    const [categoryData, setCategoryData] = React.useState<CategoryType | null>(null);
   
    const [form] = Form.useForm();
   
    const dispatch = useAppDispatch();

    const category = useAppSelector(state => state.category);
    const navigate = useNavigate();

    const { id } = useParams();

    const onFinish = async (values: any) => {   
        console.log(values);
        setCategoryData(preData => {
            const newData = values;
            if (isEdit) {
                console.log('>>> id', values.id);
                updateCategory(newData);
            } else {
                createCategory(newData);
            }
            return newData;
        })
    };

    const createCategory = async (data: CategoryType) => {
        dispatch(setLoading(true));
      
        try {
            const res = await callCreateCategory(data);

            if (res.status === 201) {
                dispatch(setLoading(false));
                notification.success({
                    message: 'Success',
                    description: 'Category created successfully',
                });
            } else {
                dispatch(setLoading(false));
                notification.error({
                    message: 'Error',
                    description: 'Failed to create category',
                });
            }
        }
        catch (err) {
            dispatch(setLoading(false));
            notification.error({
                message: 'Error',
                description: 'Failed to create category'
            });
        }
    }

    const updateCategory = async (data: CategoryType) => {
        dispatch(setLoading(true));

        const id = data.id;
        if (!id) {
            notification.error({
                message: 'Error',
                description: 'Category ID is required for update',
            });
            return;
        }

        try {
            const res = await callUpdateCategory(id.toString(), data);

            if (res.status === 200) {
                dispatch(setLoading(false));
                notification.success({
                    message: 'Success',
                    description: 'Category updated successfully',
                });
            } else {
                dispatch(setLoading(false));
                notification.error({
                    message: 'Error',
                    description: 'Failed to update category',
                });
            }
        }
        catch (err) {
            dispatch(setLoading(false));
            notification.error({
                message: 'Error',
                description: 'Failed to update category'
            });
        }
    }

    
 

   

    useEffect(() => {
        dispatch(setLoading(false));
        if (id && isEdit === true) {
            dispatch(fetchCategory({ id }));
        }
       
    }, []);
    
    useEffect(() => {
        if (category.result === null) {
          navigate("/admin/categories"); // Chuyển hướng về danh sách
        }
    }, [category]);



    useEffect(() => {
        if (isEdit) {
            form.setFieldsValue({
                id: category.result?.id,
                categoryName: category.result?.categoryName,
                isActive: category.result?.isActive?.toString() || "1",
                createdAt: category.result?.createdAt ? dayjs(category.result?.createdAt).format('DD-MM-YYYY HH:mm:ss') : "",
                createdBy: category.result?.createdBy,
                updatedAt: category.result?.updatedAt ? dayjs(category.result?.updatedAt).format('DD-MM-YYYY HH:mm:ss') : "",
                updatedBy: category.result?.updatedBy,
            });
          
        }
       

    }, [category]);
  
    return (
        
        <div className="category-form" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
           
            <div className="category-form__container" style={{padding: '40px 10%', display: 'flex', justifyContent: 'center'}}>
                <Form 
                    form={form} 
                    layout="vertical" 
                    name="category-form" 
                    initialValues={{
                        
                    }} 
                    onFinish={onFinish}
                
                >
                    
                        
                        <Row gutter={20} style={{padding: "20px", border: '1px solid blue', background: '#fff'}}>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24}><h5 style={{marginBottom: "20px"}}>Thông tin danh mục</h5></Col>
                            {isEdit && (
                                <Col xl={5} lg={10} md={15} sm={24} xs={24}>
                                    <CustomItem 
                                        label={<RequiredLabel label="Mã danh mục" tooltip="ID của danh mục" />}
                                        name="id" 
                                        labelCol={{ span: 24 }} 
                                        wrapperCol={{ span: 24 }}
                                        
                                    >
                                        <Input 
                                            readOnly
                                            style={{height: '35px', fontSize: '15px', backgroundColor: '#E0E0E0'}}
                                        />
                                    </CustomItem>
                                </Col>
                            )}
                            
                            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                <CustomItem 
                                    label={<RequiredLabel label="Tên danh mục" tooltip="Đây là tên nhóm sản phẩm, giúp khách hàng dễ dàng tìm kiếm"/>}
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
                                    label={<RequiredLabel label="Trạng thái" tooltip="Chọn trạng thái để kiểm soát việc hiển thị danh mục trên trang sản phẩm" />}
                                    name="isActive"  
                                    initialValue={"1"}
                                    labelCol={{ span: 24 }} 
                                    wrapperCol={{ span: 24 }}
                                    rules={[{ required: true, message: 'Không được bỏ trống ô' }]}
                                >
                                   <Select style={{ height: 35 }} optionLabelProp="label">
                                        <Select.Option value="1" label={<Badge status="success" text="Hoạt động" />}>
                                            <Badge status="success" text="Hoạt động" />
                                        </Select.Option>
                                        <Select.Option value="0" label={<Badge status="error" text="Vô hiệu" />}>
                                            <Badge status="error" text="Vô hiệu" />
                                        </Select.Option>
                                    </Select>


                                </CustomItem>
                            </Col>
                            {/* // Kiểm tra nếu category.result?.id có giá trị thì mới render component bên trong
                                // Điều này đảm bảo rằng dữ liệu danh mục đã được tải trước khi hiển thị CategorySelect */}
                            {(category.result?.id || !isEdit ) && ( 
                                <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                                    <CustomItem
                                        label={<RequiredLabel label="Danh mục phụ thuộc" tooltip="Chọn các danh mục con" />}
                                        name="categoryIds" 
                                        labelCol={{ span: 24 }} 
                                        wrapperCol={{ span: 24 }}
                                        style={{width: '100%'}}
                                    >
                                        <CategorySelect 
                                            form={form} 
                                            categoryIds={category.result?.subCategories?.map((item) => item.id) || []} 
                                            categoryId={category.result?.id}
                                            parentId={category.result?.parentId}
                                            queryNumber={isEdit ? 0 : 1} 
                                        />
                                    </CustomItem>
                                </Col>
                            )}

                            {isEdit && (
                                <>
                                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                                        <CustomItem 
                                            label={<RequiredLabel label="Thời gian tạo"/>}
                                            name="createdAt" 
                                        
                                            labelCol={{ span: 24 }} 
                                            wrapperCol={{ span: 24 }}
                                        >
                                            <Input 
                                                readOnly
                                                style={{height: '35px', fontSize: '15px', backgroundColor: '#E0E0E0'}}
                                            />
                                        </CustomItem>
                                    </Col>

                                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                                        <CustomItem 
                                            label={<RequiredLabel label="Người tạo"  />}
                                            name="createdBy"
                                            labelCol={{ span: 24 }} 
                                            wrapperCol={{ span: 24 }}
                                        >
                                            <Input 
                                                readOnly
                                                style={{height: '35px', fontSize: '15px', backgroundColor: '#E0E0E0'}}
                                            />
                                        </CustomItem>
                                    </Col>

                                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                                        <CustomItem 
                                            label={<RequiredLabel label="Thời gian cập nhật"  />}
                                            name="updatedAt" 
                                            labelCol={{ span: 24 }} 
                                            wrapperCol={{ span: 24 }}
                                        >
                                            <Input 
                                                readOnly
                                                style={{height: '35px', fontSize: '15px', backgroundColor: '#E0E0E0'}}
                                            />
                                        </CustomItem>
                                    </Col>

                                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                                        <CustomItem 
                                            label={<RequiredLabel label="Người cập nhật" />}
                                            name="updatedBy" 
                                            labelCol={{ span: 24 }} 
                                            wrapperCol={{ span: 24 }}
                                        >
                                            <Input 
                                                readOnly
                                                style={{height: '35px', fontSize: '15px', backgroundColor: '#E0E0E0'}}
                                            />
                                        </CustomItem>
                                    </Col>
                                </>
                            )}


                            
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

export default CategoryForm;
