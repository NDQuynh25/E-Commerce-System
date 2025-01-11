import React from 'react';
import { Form, Input, Button, AutoComplete } from 'antd';
import { PlusOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import runes from 'runes2';
import '../../../styles/modal.product.css';


const CustomItem = styled(Form.Item)`
    .ant-row.ant-form-item-row {
        display: grid;
        grid-template-columns: 10% 90%;
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
      
    }

`;

const ProductVariations: React.FC = () => {
    const [variationCount, setVariationCount] = React.useState<number>(0);
    const variationOptions = [
        {value: 'size', label: 'Size'}, 
        {value: 'color', label: 'Color'},
        {value: 'style', label: 'Style'},
        {value: 'gender', label: 'Gender'},
    ];


    return (
        <>
        <CustomItem label="Variations" >
            <Form.List name="variations">
                {(fields, { add, remove }) => {
                    return (
                        <>
                            {variationCount === 0 ? (
                                <Button  type="dashed" icon={<PlusOutlined />} onClick={() => {add(); setVariationCount((prevCount) => prevCount + 1);}}>Add Variation</Button>        
                            ) : (

                            <div>
                                {fields.map(({ key, name, ...restField }) => (
                                    <div
                                        key={key}
                                        className="modal-product-variation"
                                        style={{
                                            marginBottom: "20px",
                                            border: "1px solid #f0f0f0",
                                            padding: "10px 20px",
                                            backgroundColor: "#f6f6f6",
                                        }}
                                    >   
                                        <div style={{display: "flex", justifyContent: "right"}}>
                                            <Button
                                                type="text"
                                                icon={<CloseOutlined />}
                                                onClick={() => {remove(name); setVariationCount((prevCount) => prevCount - 1);}} 
                                            />
                                        </div>
                                        {/* Variation Input */}
                                        <CustomItem
                                            {...restField}
                                            label="Variation"
                                            name={[name, "variation"]}
                                        >
                                            <AutoComplete
                                                style={{ width: "40%" }}
                                                options={variationOptions}
                                                filterOption={false} 
                                            >
                                                <Input 
                                                    placeholder="Type or Select"
                                                    count={{
                                                        show: true,
                                                        max: 14,
                                                        strategy: (txt) => runes(txt).length,
                                                        exceedFormatter: (txt, { max }) => runes(txt).slice(0, max).join(''),
                                                    }} 
                                                />
                                            </AutoComplete>
                                        </CustomItem>
                                        {/* Options for each Variation */}
                                        <CustomItem label="Options">
                                            <Form.List name={[name, "options"]}>
                                                {(optionFields, { add: addOption, remove: removeOption }) => {
                                                    return (
                                                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                                                            {optionFields.map(({ key: optionKey, name: optionName, ...restOptionField }) => (
                                                                <div
                                                                    key={optionKey}
                                                                    style={{
                                                                        display: "flex",
                                                                        width: "50%",
                                                                    }}
                                                                >
                                                                    <CustomItem
                                                                        {...restOptionField}
                                                                        label=""
                                                                        name={optionName}
                                                                        
                                                                        
                                                                    >
                                                                        <Input
                                                                            placeholder={`Enter option`}
                                                                            style={{   
                                                                                minWidth: "250px",
                                                                                width: "100%",   
                                                                            }}
                                                                            count={{
                                                                                show: true,
                                                                                max: 20,
                                                                                strategy: (txt) => runes(txt).length,
                                                                                exceedFormatter: (txt, { max }) => runes(txt).slice(0, max).join(''),
                                                                            }}
                                                                        />
                                                                    </CustomItem>
                                                                    <Button
                                                                        type="text"
                                                                        icon={<DeleteOutlined />}
                                                                        onClick={() => removeOption(optionName)}
                                                                        style={{ marginBottom: "20px", marginLeft: "10px" }}
                                                                    />
                                                                </div>
                                                            ))}
                                                            <Button
                                                                type="dashed"
                                                                onClick={() => addOption()}
                                                                style={{ marginBottom: "20px" }}
                                                            >
                                                                Add Option
                                                            </Button>
                                                        </div>
                                                    );
                                                }}
                                            </Form.List>
                                        </CustomItem>
                                    </div>
                                ))}
                            </div>
                            )}
                            {(variationCount >= 2 || variationCount === 0) ? null : (
                                <div
                                    style={{
                                        border: "1px solid #f0f0f0",
                                        padding: "20px",
                                        backgroundColor: "#f9f9f9",
                                    }}
                                >
                                    <Button
                                        onClick={() => {add(); setVariationCount((prevCount) => prevCount + 1);}}
                                        type="dashed"
                                        icon={<PlusOutlined />}
                                    >
                                        Add Variation
                                    </Button>
                                </div>
                            )}
                        </>
                    );
                }}
            </Form.List>
        </CustomItem>
        {variationCount > 0 ? (
            <div className='modal-product-variation-list'>
                <CustomItem label="Variation List" name="variationList" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", backgroundColor: "#f9f9f9", padding: "20px" }}>

                    </div>
                </CustomItem>
            </div>
        ) : null}
        </>
    );
}


export default ProductVariations;