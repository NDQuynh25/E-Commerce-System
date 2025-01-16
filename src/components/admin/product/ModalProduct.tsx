import React, { useEffect } from 'react';
import { Anchor, AutoComplete, Col, Divider, Input, Row, Space} from 'antd';
import '../../../styles/modal.product.css';
import CategoryMenu from './CategoryMenu';
import {PlusOutlined} from '@ant-design/icons';
import {
    Button,
    Form,
    Select
  } from 'antd';
import { runes } from 'runes2';
import ImageUpload from '../../input/ImageUpload';
import styled from 'styled-components';
import ProductVariations from './ProductVariations';




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
        margin-right: 10px !important;
        margin-top: 5px !important;
        margin-right: 15px !important;
      
    }

`;



const ModalProduct: React.FC = () => {
    const testOptions = ['Apple', 'Banana', 'Orange', 'Mango', 'Pineapple']
   


    const formattedOptions = testOptions.map((item) => ({ value: item }));

    
    const [fileList, setFileList] = React.useState<any>([]);
    const [openCategoryMenu, setOpenCategoryMenu] = React.useState<boolean>(false);
    const [form] = Form.useForm();
    const [newMaterial, setNewMaterial] = React.useState<string>('');
    const [variationCount, setVariationCount] = React.useState<number>(0);
    const [price, setPrice] = React.useState<number>(0);

    const onChange = (e: any): void => {
        console.log("value", e.target.value);
        setPrice(e.target.value);
    }
      
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
        console.log("value", e.target.value);
        setNewMaterial(e.target.value);
    }

    
    const onFinish = (values: any) => {
        console.log("fileList", fileList);
        console.log('Form data:', values);
    };

    useEffect(() => {
        form.setFieldsValue({
            fileList: fileList,
            material: ['cotton', 'fleece', 'nylon']
        });
    }, [fileList]);
    

    return (
        <>  
            <div className='modal-product-container'>
                <div className='modal-product-content'>
                    <div className='modal-product-anchor'>
                        <Anchor
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
                           
                            
                            
                          
                        >
                            <div id="part-1" className='modal-product-part'>
                                <div className='modal-product-part-content'>

                                    <div style={{marginBottom: '30px', marginTop: '30px'}}>
                                        <h2>Product Information</h2>
                                    </div>
                                    <Row gutter={40} className='modal-product-part-form'>
                                        <Col lg={24} md={24} sm={24} xs={24} >
                                            <CustomItem label="Product Images" name="fileList" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                                                <ImageUpload enableAspectRatio={true} fileList={fileList} setFileList={setFileList} count={2} />
                                            </CustomItem>
                                        </Col>
                                       
                                        

                                        <Col lg={24} md={24} sm={24} xs={24} >
                                            <CustomItem label="Promotion Image" name="username" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                                                <div style={{display: 'flex', alignItems: 'center'}}>
                                                    <div style={{display: "flex", flexDirection: "column"}}>
                                                        <ImageUpload fileList={fileList} setFileList={setFileList} />
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
                                            <CustomItem label="Product Name" name="productName" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
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
                                            <CustomItem label="Category" name="category"  labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}> {/* Cascader */}    
                                                <Input 
                                                    placeholder="Please set category" 
                                                    onClick={() => {setOpenCategoryMenu(true)}} 
                                                    style={{
                                                        height: "35px",
                                                        fontSize: "0.9rem",
                                                        fontWeight: 400,
                                                        letterSpacing: 0,
                                                    }}
                                                />
                                                <CategoryMenu open={openCategoryMenu} setOpen={setOpenCategoryMenu} />
                                            </CustomItem>
                                        </Col>
                                        <Col lg={24} md={24} sm={24} xs={24}>
                                            <CustomItem label="Product Description" name="description" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
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
                                            <CustomItem label="Brand" name="brand" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} >   
                                                <AutoComplete
                                                    options={formattedOptions}
                                                    placeholder="Please select"
                                                    filterOption={false} 
                                                >
                                                  
                                                </AutoComplete>
                                            </CustomItem>
                                        </Col>

                                        <Col lg={24} md={24} sm={24} xs={24}>
                                            <CustomItem label="Material" name="material" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
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
                                            <CustomItem label="Country of Origin" name="countryOfOrigin" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                                                <AutoComplete
                                                    options={formattedOptions}
                                                    placeholder="Please select"
                                                    filterOption={false}
                                                />
                                            </CustomItem>
                                        </Col>
                                    </Row>

                                </div>
                            </div>
                            
                            <div id="part-3" className='modal-product-part'>
                                <div className='modal-product-part-content'>   
                                    <div style={{marginBottom: '30px', marginTop: '30px'}}>
                                        <h2>Sales Information</h2>
                                    </div>
                                    <Row gutter={20} className='modal-product-part-form'>
                                        <Col lg={24} md={24} sm={24} xs={24}>     
                                            <ProductVariations/>
                                        </Col>
                                        <Col lg={24} md={24} sm={24} xs={24}>
                                            
                                        


                                        </Col>

                                        <Col lg={24} md={24} sm={24} xs={24}>
                                            <CustomItem label="Price" name="price"  labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} >
                                                <Input
                                                   
                                                    type="number" 
                                                    addonAfter="VND" 
                                                    style={{width: "100%"}}
                                                />
                                            </CustomItem>
                                        </Col>
                                        <Col lg={24} md={24} sm={24} xs={24}>
                                            <CustomItem label="Discount" name="discount" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                                                <Input 
                                                    type="number" 
                                                    addonAfter="%" 
                                                    style={{width: "100%"}}
                                                />
                                            </CustomItem>
                                        </Col>
                                        <Col lg={24} md={24} sm={24} xs={24}>
                                            <CustomItem label="Stock" name="stock" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                                                <Input 
                                                    type="number" 
                                                    style={{width: "100%"}}
                                                />
                                            </CustomItem>
                                        </Col>
                                    </Row>

                                </div>                     
                            </div>
                             <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                        </Form>
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalProduct;
