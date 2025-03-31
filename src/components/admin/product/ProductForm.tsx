import * as React from "react";
import { useEffect } from "react";
import { Col, Form, Button, Row, Input, AutoComplete, Space, Select, Divider, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import TextEditor from "../../TextEditor";
import ImageUpload from "../../input/ImageUpload";
import styled from "styled-components";
import runes from 'runes';
import RequiredLabel from "../../input/RequiredLabel";
import { InputNumber } from "antd";
import { InputNumberProps } from "antd/lib/input-number";
import ProductVariations from "./ProductVariations";
import SKU from "./SKU";
import { callCreateProduct } from "../../../api/productApi";
import { callUploadFile } from "../../../api/fileApi";
import { message, notification } from "antd";
import { IProduct } from "../../../types/backend";
import CategorySelect from "./CategorySelect";
import '../../../styles/modal.product-form.css';




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
const ProductForm: React.FC = () => {
    const countryOfOriginOptions = [
        'Vietnam',       
        'China',       
        'Thailand',
        'Indonesia',
        'India',
        'Bangladesh',
        'Italy',         
        'Portugal',      
        'Spain',         
        'France',        
        'USA',          
        'South Korea',   
        'Japan',
        'Other',        
    ];   
    const brandOptions = [
        'Adidas', 
        'Nike', 
        'Puma', 
        'Converse', 
        'Vans', 
        'New Balance', 
        'Reebok', 
        'Fila', 
        'Under Armour', 
        'Skechers', 
        'Asics', 
        'Crocs', 
        'Birkenstock', 
        'Dr. Martens', 
        'Timberland', 
        'Clarks', 
        'Hush Puppies', 
        'Saucony', 
        'Merrell',
        'No Brand',
        'Other',
    ];
    const formatted1Options = brandOptions.map((option) => {
        return {value: option, label: option};
    });
    const formatted2Options = countryOfOriginOptions.map((option) => {
        return {value: option, label: option};
    });
    const [form] = Form.useForm();
    const [newMaterial, setNewMaterial] = React.useState<string>('');
    const [productImages, setProductImages] = useState<any[]>([]);
    const [promotionImages, setPromotionImages] = useState<any[]>([]);
    const [variationsData, setVariationsData] = useState<variation[]>([]);
    const [skusData, setSkusData] = useState<any[]>([]);
    const [productData, setProductData] = React.useState<IProduct>({
        
        imageURLs: [],
        skuCode: '',
        productName: '',
        description: '',
        categoryId: '',
        brand: '',
        materials: [],
        countryOfOrigin: '',
        originalPrice: 0,
        sellingPrice: 0,
        stock: 0,
        variation1: '',
        options1: [],
        variation2: '',
        options2: [],
        skus: [],
       
    });
    const [loading, setLoading] = React.useState<boolean>(false);
    const materialOptions = [
        {value: 'cotton', label: 'Cotton'}, 
        {value: 'fleece', label: 'Fleece'},
        {value: 'nylon', label: 'Nylon'},
        {value: 'velvet', label: 'Velvet'},
        {value: 'leather', label: 'Leather'},
        {value: 'chiffon', label: 'Chiffon'},
        {value: 'denim', label: 'Denim'},
        {value: 'down', label: 'Down'},
    ];
    const key = 'updatable';  


    const onChanges = (e: any): void => {
        setNewMaterial(e.target.value);
    }
    const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void => {
        e.preventDefault();
        console.log("newMaterial", newMaterial);
        if (newMaterial !== '') {
            materialOptions.push({value: newMaterial, label: newMaterial});
            form.setFieldsValue({

                material: [...form.getFieldValue('material'), newMaterial]
            });
            setNewMaterial('');
        }
    }
    const onChange: InputNumberProps['onChange'] = (value) => {
        console.log('changed', value);
    };

    const onFinish = async (values: any) => {
        console.log("values", values);
        // console.log("values", values);
        // console.log("skusData", skusData);
        console.log("variationsData", variationsData);
        message.open({
            key,
            type: 'loading',
            content: <span style={{fontSize: '16px'}}>Loading...</span>,
        });
        setLoading(true);
      
        const updatedSKUs = skusData.map(sku => ({
            skuCode: sku.skuCode,
            option1: sku.option1,
            option2: sku.option2,
            originalPrice: sku.originalPrice,
            sellingPrice: sku.sellingPrice,
            stock: sku.stock,

        }));

        const productImageFiles = new FormData();
        

        promotionImages.forEach((file: any) => {
            productImageFiles.append('files', file.originFileObj as Blob);
        })
        productImages.forEach((file: any) => {
            productImageFiles.append('files', file.originFileObj as Blob);
        });
        skusData.forEach((sku) => {
            if (sku.imageFile) productImageFiles.append('files', sku.imageFile?.originFileObj as Blob);
        });

        const resProductImage = await callUploadFile(productImageFiles);
        
        if (resProductImage.status === 201) {
            
           

            setProductData(prevData => {
                const newData = {
                    ...prevData,
                    imageURLs: resProductImage.data || [],
                    skuCode: values.skuCode,
                    productName: values.productName,
                    description: values.description,
                    brand: values.brand,
                    materials: values.materials,
                    countryOfOrigin: values.countryOfOrigin,
                    originalPrice: values.originalPrice,
                    sellingPrice: values.sellingPrice,
                    stock: values.stock,
                    skus: updatedSKUs,
                    variation1: variationsData[0].variation,
                    options1: variationsData[0].options,
                    variation2: variationsData[1]?.variation,
                    options2: variationsData[1]?.options,
                };
                createProduct(newData);
                return newData;
            });
        } else {
            notification.error({
                message: 'Error',
                description: 'Failed to upload images',
            });
        }
    };

    const createProduct = async (newData: IProduct) => {
        //console.log("productData", newData);
        const res = await callCreateProduct(newData);
        if (res.status === 201) {
            setLoading(false);
            notification.success({
                message: 'Success',
                description: 'Product created successfully',
            });
        } else {
            setLoading(false);
            notification.error({
                message: 'Error',
                description: 'Failed to create product',
            });
        }
    }

const categories = [
    { id: 1, name: "Điện thoại" },
    { id: 2, name: "Laptop" },
    { id: 3, name: "Phụ kiện" },
  ];
    const [selectedCategory, setSelectedCategory] = React.useState<number[]>([]);  


    useEffect(() => {
        form.setFieldsValue({
            productImages: productImages,
            promotionImages: promotionImages,
        });
    }, [productImages, promotionImages]);

    // useEffect(() => {
    //     console.log ('okok');
    // }, [form.getFieldValue('variations')]);

    useEffect(() => {
        console.log('variationsData', variationsData);
    }, [variationsData]);
  return (
      <div className="product-form">
          
          <div className="product-form__container" style={{padding: '20px 10%', display: 'flex'}}>
            <Form 
                form={form} 
                layout="vertical" 
                name="product-form" 
                initialValues={{
                    'originalPrice-0': 0,
                    variations: [{variation: 'ok', options: []}],
                }} 
                onFinish={onFinish}
                onValuesChange={(changedValues, allValues) => {
                    if (Object.keys(changedValues).some((key) => key.startsWith('variations'))) {
                      setVariationsData(allValues.variations || []);
                    }
                }}
            >
                <Row gutter={[50, 20]}>
                    <Col  xl={16} lg={24} md={24} sm={24} xs={24}>
                        <Row gutter={20} style={{padding: "20px", border: '1px solid blue', background: '#fff'}}>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24}><h5 style={{marginBottom: "20px"}}>Thông tin sản phẩm</h5></Col>
                            
                            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                <CustomItem 
                                    label={<RequiredLabel label="Tên sản phẩm" tooltip="Tên sản phẩm sẽ được hiển thị trên trang sản phẩm" />}
                                    name="productName" 
                                    labelCol={{ span: 24 }} 
                                    wrapperCol={{ span: 24 }}
                                    //rules={[{ required: true, message: 'Product name cannot be left blank!' }]}
                                >
                                    <Input 
                                        count={{
                                            show: true,
                                            max: 120,
                                            strategy: (txt) => runes(txt).length,
                                            exceedFormatter: (txt, { max }) => runes(txt).slice(0, max).join(''),
                                        }}
                                        placeholder='Brand Name + Product Type + Key Features (Materials, Color, Size, Modal)' 
                                        
                                    />
                                </CustomItem>
                            </Col>
                            
                            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                                <CustomItem 
                                    label={<RequiredLabel label="Mã SKU" tooltip="Mã SKU sẽ được hiển thị trên trang sản phẩm" />}
                                    name="skuCode" 
                                    labelCol={{ span: 24 }} 
                                    wrapperCol={{ span: 24 }}
                                    //rules={[{ required: true, message: 'Mã SKU không được bỏ trống' }]}
                                >
                                    <Input 
                                        type="text" 
                                        placeholder="Nhập mã SKU sản phẩm" 

                                        style={{
                                            height: "35px",
                                            fontSize: "14px",
                                            fontWeight: 400,
                                            letterSpacing: 0,
                                            textTransform: "uppercase" 
                                        }} 
                                    />
                                </CustomItem>
                            </Col>
                            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                                <CustomItem 
                                    label={<span>Thương hiệu</span>} 
                                    name="brand" 
                                    labelCol={{ span: 24 }} 
                                    wrapperCol={{ span: 24 }} 
                                    //rules={[{ required: true, message: 'Brand cannot be left blank!' }]}
                                >   
                                    <AutoComplete
                                        options={formatted1Options}
                                        placeholder="Please select or enter"
                                        filterOption={false} 
                                        style={{
                                            height: "35px",
                                            fontSize: "0.9rem",
                                            fontWeight: 400,
                                            letterSpacing: 0,
                                            
                                        }} 
                                    >
                                        
                                    </AutoComplete>
                                </CustomItem>
                            </Col>
                            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                                <CustomItem 
                                    label={<span>Xuất xứ</span>} 
                                    name="countryOfOrigin" 
                                    labelCol={{ span: 24 }} 
                                    wrapperCol={{ span: 24 }}
                                    //rules={[{ required: true, message: 'Country of origin cannot be left blank!' }]}
                                >
                                    <AutoComplete
                                        options={formatted2Options}
                                        placeholder="Please select or enter"
                                        filterOption={false}
                                        style={{
                                            height: "35px",
                                            fontSize: "0.9rem",
                                            fontWeight: 400,
                                            letterSpacing: 0,
                                            
                                        }} 
                                    />
                                </CustomItem>
                            </Col>
                            <Col xl={16} lg={24} md={24} sm={24} xs={24}>
                                <CustomItem 
                                    label={<span>Chất liệu</span>} 
                                    name="materials" 
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    //rules={[{ required: true, message: 'Material cannot be left blank!' }]}
                                >
                                    <Select
                                        mode="multiple"
                                        maxCount={5}
                                        placeholder="Please select"
                                        options={materialOptions}
                                        style={{
                                            display:'flex',
                                            alignItems: 'center',
                                            alignSelf: 'center !important' ,
                                            minHeight: "35px !important",
                                            fontSize: "0.9rem",
                                            fontWeight: 400,
                                            letterSpacing: 0,
                                            
                                        }} 
                                        dropdownRender={(menu) => (
                                            <>
                                                {menu}
                                                <Divider style={{ margin: '8px 0' }} />
                                                <Space style={{ padding: '0 8px 4px' }}>
                                                    <Input
                                                        placeholder="Please enter item"
                                                        value={newMaterial}
                                                        onChange={onChanges}
                                                        onKeyDown={(e) => e.stopPropagation()}
                                                        style={{
                                                            height: "35px",
                                                            fontSize: "0.9rem",
                                                            fontWeight: 400,
                                                            letterSpacing: 0,
                                                            
                                                        }} 
                                                    />
                                                    <Button type="link" icon={<PlusOutlined />} onClick={addItem} >
                                                        Add
                                                    </Button>
                                                

                                                </Space>
                                            </>
                                        )}
                                    />
                                </CustomItem>
                            </Col>                    
                            <Col lg={24} md={24} sm={24} xs={24}>
                                <CustomItem 
                                    label={<RequiredLabel label="Mô tả sản phẩm" tooltip="Mô tả sản phẩm sẽ được hiển thị trên trang sản phẩm" />} 
                                    name="description" 
                                    labelCol={{ span: 24 }} 
                                    wrapperCol={{ span: 24 }}
                                    //rules={[{ required: true, message: 'Product description cannot be left blank!' }]}
                                >
                                    <TextEditor  />   
                                </CustomItem>
                            </Col>
                        </Row>

                        <Row gutter={20} style={{padding: "20px", border: '1px solid blue', background: '#fff'}}>

                            <Col xl={24} lg={24} md={24} sm={24} xs={24}><h5 style={{marginBottom: "20px"}}>Thông tin giá sản phẩm</h5></Col>
                            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                                <CustomItem 
                                    label={<RequiredLabel label="Giá gốc" tooltip="Giá bán sẽ được hiển thị trên trang sản phẩm" />} 
                                    name="originalPrice" 
                                    labelCol={{ span: 24 }} 
                                    wrapperCol={{ span: 24 }}
                                    //rules={[{ required: true, message: 'Product price cannot be left blank!' }]}
                                >
                                    <InputNumber<number>
                                        style={{
                                            width: "100%",
                                            fontSize: "0.9rem",
                                            fontWeight: 400,
                                            letterSpacing: 0,
                                        }}
                                        
                                        placeholder="Nhập giá bán sản phẩm" 
                                        
                                        prefix="₫"
                                        // formatter={(value) => `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        // parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                                        onChange={onChange}
                                    />
                                </CustomItem>
                            </Col>
                            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                            
                                <CustomItem 
                                    label={<RequiredLabel label="Giá bán" tooltip="Giá bán sẽ được hiển thị trên trang sản phẩm" />} 
                                    name="sellingPrice" 
                                    labelCol={{ span: 24 }} 
                                    wrapperCol={{ span: 24 }}
                                    rules={[
                                        { required: true, message: "Price cannot be left blank" },
                                        {
                                        validator: (_, value) => {
                                            const numericValue = Number(value); 
                                            if (numericValue < 1000) {
                                            return Promise.reject("Minimum price is 1000");
                                            }
                                            return Promise.resolve();
                                        },
                                        },
                                    ]}
                                >
                                    <InputNumber<number>
                                        style={{
                                            width: "100%",
                                            fontSize: "0.9rem",
                                            fontWeight: 400,
                                            letterSpacing: 0,
                                        }}
                                        prefix="₫"
                                        placeholder="Nhập giá bán sản phẩm" 
                                        // defaultValue={1000}
                                        // formatter={(value) => `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        // parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                                        // onChange={onChange}
                                    />
                                </CustomItem>
                                
                            </Col>
                        </Row>

                        <Row gutter={20} style={{padding: "20px", border: '1px solid blue', background: '#fff'}}>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24}><h5 style={{marginBottom: "20px"}}>Thuộc tính</h5></Col>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24} style={{marginBottom: '10px'}}> Sản phẩm có nhiều thuộc tính khác nhau. Ví dụ: kích thước, màu sắc...</Col>

                            <Col lg={24} md={24} sm={24} xs={24}>     
                                <ProductVariations
                                    variationsData={variationsData}
                                />
                            </Col>
                        </Row>
                        <Row gutter={20} style={{padding: "20px", border: '1px solid blue', background: '#fff'}}>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24}><h5 style={{marginBottom: "20px"}}>Phiên bản</h5></Col>
                            <SKU
                                variationsData={variationsData}
                                skusData={skusData}
                                setSkusData={setSkusData}
                            />
                        </Row>
                    </Col>


                    <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                        <Row gutter={20}  style={{background: '#fff', padding: '20px', border: '1px solid blue'}}>   
                            <Col><h5>Ảnh sản phẩm</h5></Col>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24} style={{padding: '25px 20px' }} >
                                <ul>
                                    <li>Tải lên hình ảnh 1:1.</li>
                                    <li>Ảnh bìa sẽ được hiển thị tại các trang Kết quả tìm kiếm, Gợi ý hôm nay,... Việc sử dụng ảnh bìa đẹp sẽ thu hút thêm lượt truy cập vào sản phẩm của bạn.</li>
                                    
                                </ul>
                            </Col>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24} style={{padding: '0 10px' }}  >
                                <CustomItem 
                                    label={<span>Ảnh bìa sản phẩm</span>}
                                    name="promotionImages" 
                                    labelCol={{ span: 24 }} 
                                    wrapperCol={{ span: 24 }}
                                    //rules={[{ required: true, message: 'Please upload promotion image' }]}
                                >
                                    
                                    <ImageUpload fileList={promotionImages} setFileList={setPromotionImages} />

                                </CustomItem>
                            </Col>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24} style={{padding: '0 10px' }} >
                                
                                <CustomItem 
                                    label={<span>Ảnh sản phẩm</span>} 
                                    name="productImages" 
                                    labelCol={{ span: 24 }} 
                                    wrapperCol={{ span: 24 }}
                                >
                                    <ImageUpload enableAspectRatio={true} fileList={productImages} setFileList={setProductImages} count={8} />
                                </CustomItem>
                            </Col>
                        </Row>


                        <Row gutter={20} style={{padding: "20px", border: '1px solid blue', background: '#fff'}}>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24}><h5 style={{marginBottom: "20px"}}>Danh mục</h5></Col>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            
                                <CategorySelect
                                    form={form}
                                    queryNumber={1}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Button type="primary" htmlType="submit" style={{marginTop: '20px', width: '100%'}}/>
            </Form>
            </div>
        
      </div>
  );
};

export default ProductForm;
