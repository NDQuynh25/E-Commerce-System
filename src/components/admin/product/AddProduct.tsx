import React, { useEffect } from 'react';
import { Anchor, AutoComplete, Col, Divider, Input, Row, Space, UploadFile, notification} from 'antd';
import '../../../styles/modal.product.css';
import CategoryMenu from './CategoryMenu';
import {PlusOutlined} from '@ant-design/icons';
import {
    message,
    Button,
    Form,
    Select
  } from 'antd';
import { runes } from 'runes2';
import ImageUpload from '../../input/ImageUpload';
import styled from 'styled-components';
import ProductVariations from './ProductVariations';
import { IProduct, skuType } from '../../../types/backend';
import { callCreateProduct, callUploadImages } from '../../../api/productApi';

import { callUploadFile } from '../../../api/fileApi';
import { set } from 'lodash';





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
        font-size: 0.95rem !important;
        font-weight: 500 !important;
        letter-spacing: 0px !important; 
        text-align: right !important;
        justify-content: left !important;
        margin-top: 5px !important;
        margin-right: 15px !important;
      
    }

`;
type Variation = {
    variation: string;
    options: string[];
    
};
  

const AddProduct: React.FC = () => {
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
    const [productImages, setProductImages] = React.useState<any>([]);
    const [promotionImage, setPromotionImage] = React.useState<any>([]);
    const [form] = Form.useForm();
    const [newMaterial, setNewMaterial] = React.useState<string>('');
    const [skusData, setSkusData] = React.useState<skuType[]>([]);
    const [variationsData, setVariationsData] = React.useState<Variation[]>([]);
    const [initData, setInitData] = React.useState<any>({
        generalDiscount: 0,
        generalStock: 0,
    });
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';  
    const [productData, setProductData] = React.useState<IProduct>({
        
        imageURLs: [],
        promotionImageURL: '',
        productName: '',
        categoryId: '',
        description: '',
        brand: '',
        materials: [],
        countryOfOrigin: '',
        price: 0,
        stock: 0,
        discount: 0,
        variation1: '',
        options1: [],
        variation2: '',
        options2: [],
        skus: [],
        isActive: '1',
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
    
    const onChanges = (e: any): void => {
        setNewMaterial(e.target.value);
    }

    
    const onFinish = async (values: any) => {
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
            imageURL: '',
            option1: sku.option1,
            option2: sku.option2,
            price: sku.price,
            stock: sku.stock,
            discount: sku.discount,
        }));

        const productImageFiles = new FormData();
        

        promotionImage.forEach((file: any) => {
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
            
            resProductImage.data?.slice(productImages.length + 1).forEach((imageURL, index) => {
                updatedSKUs[index].imageURL = imageURL;
            });

            setProductData(prevData => {
                const newData = {
                    ...prevData,
                    productName: values.productName,
                    description: values.description,
                    categoryId: values.category[values.category.length - 1],
                    brand: values.brand,
                    materials: values.materials,
                    countryOfOrigin: values.countryOfOrigin,
                    price: values.price,
                    stock: values.stock,
                    discount: values.discount,
                    variation1: variationsData[0]?.variation,
                    options1: variationsData[0]?.options,
                    variation2: variationsData[1]?.variation,
                    options2: variationsData[1]?.options, 
                    imageURLs: resProductImage.data?.slice(1, productImages.length + 1) || [],
                    promotionImageURL: resProductImage.data?.[0] || '',
                    skus: updatedSKUs,
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
        console.log("productData", newData);
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
    
    useEffect(() => {
        skusData.forEach((sku, index) => {
            form.setFieldsValue({
                [`price-${index}`]: sku.price,
                [`stock-${index}`]: sku.stock,
                [`discount-${index}`]: sku.discount,
            });
        });
    }, [skusData, variationsData]);
    
    useEffect(() => {
        form.setFieldsValue({
            productImages: productImages,
            promotionImage: promotionImage,
        });
    }, [productImages, promotionImage]);

    // useEffect(() => {
    //     console.log("skuData", skusData, "length", skusData.length);
    // }, [skusData]);
    

    return (
        <>  
            <div className='modal-product-container'>
                <div className='modal-product-content'>
                    <div className='modal-product-anchor'>
                        <Anchor
                            style={{width: '100%', height: '45px', borderRadius: '10px', backgroundColor: 'white'}}
                            direction="horizontal"
                            items={[
                            {
                                key: 'part-1',
                                href: '#part-1',
                                title: 'Basic information',
                            },
                            {
                                key: 'part-2',
                                href: '#part-2',
                                title: 'Specification',
                            },
                            {
                                key: 'part-3',
                                href: '#part-3',
                                title: 'Sales information',
                            },
                            ]}
                        />
                    </div>
                    <div className='modal-product-form'>
                        <Form
                            onFinish={onFinish} 
                            form={form}
                            style={{textAlign: 'left'}}
                            initialValues={initData}
                        >
                            <div id="part-1" className='modal-product-part'>
                                <div className='modal-product-part-content'>

                                    <div style={{marginBottom: '30px', marginTop: '30px'}}>
                                        <h2>Product Information</h2>
                                    </div>
                                    <Row gutter={40} className='modal-product-part-form'>
                                        <Col lg={24} md={24} sm={24} xs={24} >
                                            <CustomItem 
                                                label="Product Images" 
                                                name="productImages" 
                                                labelCol={{ span: 24 }} 
                                                wrapperCol={{ span: 24 }}
                                                rules={[{ required: true, message: 'Please upload product images' }]}
                                            >
                                                <ImageUpload enableAspectRatio={true} fileList={productImages} setFileList={setProductImages} count={8} />
                                            </CustomItem>
                                        </Col>
                                       
                                        <Col lg={24} md={24} sm={24} xs={24} >
                                            <CustomItem 
                                                label="Promotion Image" 
                                                name="promotionImage" 
                                                labelCol={{ span: 24 }} 
                                                wrapperCol={{ span: 24 }}
                                                rules={[{ required: true, message: 'Please upload promotion image' }]}
                                            >
                                                <div style={{display: 'flex', alignItems: 'center'}}>
                                                    <div style={{display: "flex", flexDirection: "column"}}>
                                                        <ImageUpload fileList={promotionImage} setFileList={setPromotionImage} />
                                                    </div>
                                                    
                                                    <div style={{width: "65%", marginLeft: "50px"}}>
                                                        <ul>
                                                            <li>Upload 1:1 Image.</li>
                                                            <li>Promotion Image will be used on the promotion page, search result page, daily discover, etc，Upload Promotion Image will inspire buyers to click on your product.</li>
                                                            
                                                        </ul>
                                                    </div>
                                                </div>
                                            </CustomItem>
                                        </Col>

                                        <Col lg={24} md={24} sm={24} xs={24}>
                                            <CustomItem 
                                                label="Product Name" 
                                                name="productName" 
                                                labelCol={{ span: 24 }} 
                                                wrapperCol={{ span: 24 }}
                                                rules={[{ required: true, message: 'Product name cannot be left blank!' }]}
                                            >
                                                <Input 
                                                    count={{
                                                        show: true,
                                                        max: 120,
                                                        strategy: (txt) => runes(txt).length,
                                                        exceedFormatter: (txt, { max }) => runes(txt).slice(0, max).join(''),
                                                    }}
                                                    placeholder='Brand Name + Product Type + Key Features (Materials, Color, Size, Modal)' 
                                                    style={{
                                                        height: "35px",
                                                        fontSize: "0.9rem",
                                                        fontWeight: 400,
                                                        letterSpacing: 0,
                                                    }} 
                                                />
                                            </CustomItem>
                                        </Col>

                                        <Col lg={24} md={24} sm={24} xs={24}>
                                            <CategoryMenu/>
                                        </Col>

                                        <Col lg={24} md={24} sm={24} xs={24}>
                                            <CustomItem 
                                                label="Product Description" 
                                                name="description" 
                                                labelCol={{ span: 24 }} 
                                                wrapperCol={{ span: 24 }}
                                                rules={[{ required: true, message: 'Product description cannot be left blank!' }]}
                                            >
                                                <Input.TextArea 
                                                    count={{
                                                        show: true,
                                                        max: 3000,
                                                        strategy: (txt) => runes(txt).length,
                                                        exceedFormatter: (txt, { max }) => runes(txt).slice(0, max).join(''),
                                                    }}
                                                    style={{minHeight: "100px"}} 
                                                />
                                            </CustomItem>
                                        </Col>
                                    </Row>
                                </div>     
                            </div>

                            <div id="part-2" className='modal-product-part'>
                                <div className='modal-product-part-content' style={{height: "400px"}}>
                                    <div style={{marginBottom: '30px', marginTop: '30px'}}>
                                        <h2>Specification</h2>
                                    </div>
                                    <Row gutter={20} className='modal-product-part-form'>
                                        <Col lg={24} md={24} sm={24} xs={24}>
                                            <CustomItem 
                                                label="Brand" 
                                                name="brand" 
                                                labelCol={{ span: 24 }} 
                                                wrapperCol={{ span: 24 }} 
                                                rules={[{ required: true, message: 'Brand cannot be left blank!' }]}
                                            >   
                                                <AutoComplete
                                                    options={formatted1Options}
                                                    placeholder="Please select or enter"
                                                    filterOption={false} 
                                                >
                                                  
                                                </AutoComplete>
                                            </CustomItem>
                                        </Col>

                                        <Col lg={24} md={24} sm={24} xs={24}>
                                            <CustomItem 
                                                label="Material" 
                                                name="materials" 
                                                labelCol={{ span: 24 }}
                                                wrapperCol={{ span: 24 }}
                                                rules={[{ required: true, message: 'Material cannot be left blank!' }]}
                                            >
                                                <Select
                                                    mode="multiple"
                                                    maxCount={5}
                                                    style={{ width: '100%' }}
                                                    placeholder="Please select"
                                                    options={materialOptions}
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
                                                                    style={{ width: "100%" }}
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
                                                label="Country of Origin" 
                                                name="countryOfOrigin" 
                                                labelCol={{ span: 24 }} 
                                                wrapperCol={{ span: 24 }}
                                                rules={[{ required: true, message: 'Country of origin cannot be left blank!' }]}
                                            >
                                                <AutoComplete
                                                    options={formatted2Options}
                                                    placeholder="Please select or enter"
                                                    filterOption={false}
                                                />
                                            </CustomItem>
                                        </Col>
                                    </Row>

                                </div>
                            </div>
                            
                            <div id="part-3" className='modal-product-part' style={{paddingBottom: '50px'}}>
                                <div className='modal-product-part-content'>   
                                    <div style={{marginBottom: '30px', marginTop: '30px'}}>
                                        <h2>Sales Information</h2>
                                    </div>
                                    <Row gutter={20} className='modal-product-part-form'>
                                        <Col lg={24} md={24} sm={24} xs={24}>     
                                            <ProductVariations
                                                skusData={skusData}
                                                setSkusData={setSkusData}
                                                variationsData={variationsData}
                                                setVariationsData={setVariationsData}
                                            />
                                        </Col>
                                       
                                        {variationsData.length === 0 ? (
                                            <div>
                                                <Col lg={24} md={24} sm={24} xs={24}>
                                                    <CustomItem 
                                                        label="Price" 
                                                        name="price"  
                                                        labelCol={{ span: 24 }} 
                                                        wrapperCol={{ span: 24 }} 
                                                        rules={[
                                                            { required: true, message: "Price cannot be left blank" },
                                                            {
                                                              validator: (_, value) => {
                                                                const numericValue = Number(value); 
                                                                if (Number.isNaN(numericValue)) {
                                                                  return Promise.reject("Price must be a number");
                                                                }
                                                                if (numericValue < 1000) {
                                                                  return Promise.reject("Minimum price is 1000");
                                                                }
                                                                return Promise.resolve();
                                                              },
                                                            },
                                                          ]}
                                                          
                                                    >
                                                        <Input
                                                            type="number" 
                                                            addonAfter="VND" 
                                                            style={{width: "100%"}}
                                                            placeholder='Please enter price'
                                                        />
                                                    </CustomItem>
                                                </Col>
                                                <Col lg={24} md={24} sm={24} xs={24}>
                                                    <CustomItem 
                                                        label="Discount" 
                                                        name="discount" 
                                                        labelCol={{ span: 24 }}
                                                        wrapperCol={{ span: 24 }}
                                                        rules={[
                                                            { required: true, message: "Discount cannot be left blank" },
                                                            {
                                                              validator: (_, value) => {
                                                                const numericValue = Number(value); 
                                                                if (Number.isNaN(numericValue)) {
                                                                  return Promise.reject("Discount must be a number"); 
                                                                }
                                                                if (numericValue < 0) {
                                                                  return Promise.reject("Minimum discount is 0");
                                                                }
                                                                return Promise.resolve();
                                                              },
                                                            },
                                                          ]}
                                                          
                                                    >
                                                        <Input 
                                                            type="number" 
                                                            addonAfter="%" 
                                                            style={{width: "100%"}}
                                                            placeholder='Please enter discount'
                                                        />
                                                    </CustomItem>
                                                </Col>
                                                <Col lg={24} md={24} sm={24} xs={24}>
                                                    <CustomItem 
                                                        label="Stock" 
                                                        name="stock" 
                                                        labelCol={{ span: 24 }} 
                                                        wrapperCol={{ span: 24 }}
                                                        rules={[
                                                            { required: true, message: "Stock cannot be left blank" },
                                                            {
                                                              validator: (_, value) => {
                                                                const numericValue = Number(value); 
                                                                if (Number.isNaN(numericValue) || parseInt(value) !== numericValue) {
                                                                  return Promise.reject("Stock must be an integer"); 
                                                                }
                                                                if (numericValue < 0) {
                                                                  return Promise.reject("Minimum stock is 0");
                                                                }
                                                                return Promise.resolve();
                                                              },
                                                            },
                                                          ]}
                                                          
                                                    >
                                                        <Input 
                                                            type="number" 
                                                            style={{width: "100%"}}
                                                            placeholder='Please enter stock'
                                                        />
                                                    </CustomItem>
                                                </Col>
                                            </div>
                                        ) : null
                                        }
                                    </Row>

                                </div>                     
                            </div>
                            <div className='modal-product-button'>
                                <Form.Item>
                                    <Button style={{width: "100px", height: '35px', fontSize: '16px'}} type="primary" htmlType="submit" loading={loading}>
                                        Save
                                    </Button>
                                </Form.Item>
                            </div>
                            
                        </Form>
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddProduct;
