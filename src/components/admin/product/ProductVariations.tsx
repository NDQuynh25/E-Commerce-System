import React, { useEffect } from "react";
import { Form, Input, Button, AutoComplete, Table, Badge, Col, Upload, UploadFile, Row } from "antd";
import { PlusOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";
import runes from "runes2";
import { getBase64 } from "../../../utils/conversion";

import { TableProps } from "antd/lib";
import { Image } from "antd";
import { skuType } from "../../../types/backend";




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
    font-size: 0.95rem !important;
    font-weight: 500 !important;
    letter-spacing: 0px !important;
    text-align: right !important;
    justify-content: left !important;
    margin-top: 5px !important;
  }
`;

const CustomUpload = styled(Upload)`
  .ant-upload.ant-upload-select {
    width: 60px !important;
    height: 60px !important;
  }
  .ant-upload-list-item-container {
    width: 60px !important;
    height: 60px !important;
  }
  .ant-upload-list-item.ant-upload-list-item-undefined::before {
    border-radius: 8px !important;
    width: 60px !important;
    height: 60px !important;
  }
  
  .ant-upload-list.ant-upload-list-picture-card .ant-upload-list-item {
    padding: 0px;
    
  }
  a.ant-upload-list-item-thumbnail {
    border-radius: 8px;
  }
 
`;

const uploadButton = (
  <button style={{ border: 0, background: 'none' }} type="button">
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <svg viewBox="0 0 23 21" xmlns="http://www.w3.org/2000/svg" style={{ height: "25px", width: "25px" }} fill="#1677ff" stroke="#1677ff">
          <path d="M18.5 0C19.3284 0 20 0.671573 20 1.5V12C19.5101 11.9299 18.9899 11.9299 18.5 12V1.5H2V14.1495L5.39451 10.7424C5.65509 10.4808 6.06062 10.4517 6.35341 10.6552L6.45741 10.7424L7.88894 12.1801L11.5762 6.9708C11.8367 6.70911 12.2423 6.68004 12.5351 6.88357L12.6391 6.9708L16.0301 10.3761C16.8392 11.1887 16.4631 12.6552 15.6322 13.4455C14.6267 14.4019 14 15.7528 14 17.25C14 17.5046 14.0181 17.755 14.0532 18H2C1.17157 18 0.5 17.3284 0.5 16.5V1.5C0.5 0.671573 1.17157 0 2 0H18.5Z"></path>
          <path d="M6.5 4.5C7.32843 4.5 8 5.17157 8 6C8 6.82843 7.32843 7.5 6.5 7.5C5.67157 7.5 5 6.82843 5 6C5 5.17157 5.67157 4.5 6.5 4.5Z"></path>
          <path d="M18.5 14.25C18.5 13.8358 18.8358 13.5 19.25 13.5C19.6642 13.5 20 13.8358 20 14.25V16.5H22.25C22.6642 16.5 23 16.8358 23 17.25C23 17.6642 22.6642 18 22.25 18H20V20.25C20 20.6642 19.6642 21 19.25 21C18.8358 21 18.5 20.6642 18.5 20.25V18H16.25C15.8358 18 15.5 17.6642 15.5 17.25C15.5 16.8358 15.8358 16.5 16.25 16.5H18.5V14.25Z"></path>
        </svg>
        
      </div>
  </button>
);


type Variation = {
  variation: string;
  options: string[];
};

interface ProductVariationsProps {
  skusData: skuType[];
  setSkusData: React.Dispatch<React.SetStateAction<skuType[]>>;
  variationsData: Variation[];
  setVariationsData: React.Dispatch<React.SetStateAction<Variation[]>>;


}




const ProductVariations: React.FC<ProductVariationsProps> = (props: ProductVariationsProps) => {
 
  const { skusData, setSkusData, variationsData, setVariationsData } = props;
  
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState('');
  const [variationCount, setVariationCount] = React.useState<number>(0);
  const [general, setGeneral] = React.useState({
    price: 0,
    discount: 0,
    stock: 0,
  });
  const variationOptions = [
    { value: "Size", label: "Size" },
    { value: "Color", label: "Color" },
    { value: "Style", label: "Style" },
    { value: "Gender", label: "Gender" },
  ];
  

  const columns: TableProps<skuType>["columns"] = [
    {
      title: (
        <Badge
          status="processing"
          text={variationsData[0]?.variation || "Variation1"}
        />
      ),
      dataIndex: "option1",
      onCell: (record: skuType) => ({
        rowSpan:
          record.key % (variationsData[1]?.options.length || 1) === 0
            ? variationsData[1]?.options.length || 1
            : 0,
      }),
      align: "center",
      width: "20%",
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
              <CustomUpload
                key={record.key}
                name="image"
                listType="picture-card"
                beforeUpload={() => false} // Ngăn tải file ngay lập tức
                onPreview={(file) => handlePreview(file as UploadFile)}
                onChange={(e) => {
                  setSkusData((prevData) => {
                    const updatedData = [...prevData];
                    updatedData.forEach((data) => {
                      if (data.key === record.key) {
                        data.imageFile = e?.fileList[0] ; 
                      }
                    });
                    return updatedData;
                  });
                  
                }}
              >
                {record.imageFile? null : uploadButton}
              </CustomUpload>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: 'none' }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                  }}
                  src={previewImage}
                />
              )}

          </div>
        </div>
      )},
    },
    ...(variationCount === 2
      ? [
          {
            title: (
              <Badge
                status="processing"
                text={variationsData[1]?.variation || "Variation2"}
              />
            ),
            dataIndex: "option2",
            width: "20%",
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
      title: "Price",
      dataIndex: "price",
      render: (text, record) => (
        <Form.Item
          name={`price-${record.key}`}
          key={record.key}
          rules={[
            { required: true, message: "Price is required" },
            {
              validator: (_, value) => {
                if (value === undefined || value === "") {
                  return Promise.resolve(); 
                }
                const numericValue = parseFloat(value);
                if (isNaN(numericValue) || numericValue < 1000) {
                  return Promise.reject("Minimum price is 1000");
                }
                return Promise.resolve();
              },
            }
          ]}
        >
          <Input
            type="number"
            value={record.price.toString()}
            addonAfter="VND" 
            onChange={(e) => onSKUChange(record.key, e.target.value, "price")}
            placeholder="Enter Price"
          />
        </Form.Item>
      ),
      align: "center",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      render: (text, record) => (
        <CustomItem 
          name={`discount-${record.key}`} 
          key={record.key}
          rules={[
            { required: true, message: "Discount is required" },
            {
              validator: (_, value) => {
                if (value === undefined || value === "") {
                  return Promise.resolve(); 
                }
                const numericValue = parseFloat(value);
                if (isNaN(numericValue) || numericValue < 0) {
                  return Promise.reject("Minimum discount is 0");
                }
                return Promise.resolve();
              },
            }
          ]}
        >
          <Input
            type="number"
            value={record.discount.toString()}
            addonAfter="%" 
            onChange={(e) => onSKUChange(record.key, e.target.value, "discount")}
            placeholder="Enter Discount"
          />
        </CustomItem>
      ),
      align: "center",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      render: (text, record) => (
        <CustomItem 
          name={`stock-${record.key}`} 
          rules={[
            { required: true, message: "Stock is required" },
            {
              validator: (_, value) => {
                if (value === undefined || value === "") {
                  return Promise.resolve(); 
                }
                const numericValue = parseFloat(value);
                if (isNaN(numericValue) || numericValue < 0) {
                  return Promise.reject("Minimum stock is 0");
                }
                return Promise.resolve();
              },
            }
          ]}
        >
          <Input
            value={record.stock.toString()}
            onChange={(e) => onSKUChange(record.key, e.target.value, "stock")}
            placeholder="Enter Stock"
          />
        </CustomItem>
        
      ),
      align: "center",
    },
  ];

  // Handle Preview Image
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  // Update SKU Data when variationsData changes
  useEffect(() => {
    let data: skuType[] = [];
    let count1 = variationsData[0]?.options.length || 0;
    let count2 = variationsData[1]?.options.length || 0;
    if (count2 === 0) {
      for (let i = data.length; i < count1; i++) {
        data.push({
          key: i,
          option1: variationsData[0]?.options[i] || "",
          price: 0,
          stock: 0,
          discount: 0,
        });
      }
    } else {
      for (let i = 0; i < count1; i++) {
        for (let j = 0; j < count2; j++) {
          data.push({
            key: i * count2 + j,
            option1: variationsData[0]?.options[i] || "",
            option2: variationsData[1]?.options[j] || "",
            price: 0,
            stock: 0,
            discount: 0,
          });
        }
      }
    }
    setSkusData(data);
  }, [variationsData]);

  const onVariationChange = (key: number, value: string): void => {
    setVariationsData(
      (prevData) => {
        const updatedData = [...prevData];
        updatedData[key].variation = value;
        return updatedData;
    }); 
  };

  const onOptionChange = (key: number, optionKey: number, value: string): void => {
    setVariationsData((prevData) => {
      const updatedData = [...prevData];
      // if (!updatedData[key]) {
      //     updatedData[key] = { variation: '', options: [] }; // initialize if undefined
      // }
      // if (!updatedData[key].options[optionKey]) {
      //     updatedData[key].options[optionKey] = ''; // initialize if undefined
      // }
      updatedData[key].options[optionKey] = value;
      return updatedData;
    });
  };

  const onSKUChange = (key: number, value: string, attribute: string): void => {
    setSkusData((prevData) => {
      const updatedData = [...prevData];
      updatedData[key] = {
        ...updatedData[key],
        [attribute]: Number(value), // Sử dụng [] để gán thuộc tính động
      };
      return updatedData;
    });
  };

  const addVariation = (): void => {
    setVariationsData((prevData) => {
      const updatedData = [...prevData];
      updatedData.push({ variation: "", options: [] });
      return updatedData;
    });
  };

  const removeVariation = (key: number): void => {
    setVariationsData((prevData) => {
      const updatedData = [...prevData];
      updatedData.splice(key - 1, 1);
      return updatedData;
    });
  };

  const removeOptions = (key: number, optionKey: number): void => {
    setVariationsData((prevData) => {
      const updatedData = [...prevData];
      updatedData[key].options.splice(optionKey, 1);
      return updatedData;
    });
  };

  const handleApplyToAll = (): void => {
    setSkusData((prevData) => {
      const updatedData = [...prevData];
      updatedData.forEach((data) => {
        data.price = general.price;
        data.discount = general.discount;
        data.stock = general.stock;
      });
      return updatedData;
    });
  };

  console.log("dcm", skusData);

  return (
    <>
      <CustomItem
        label="Variations"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Form.List name="variations">
          {(fields, { add, remove }) => {
            return (
              <>
                {variationCount === 0 ? (
                  <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      add();
                      setVariationCount((prevCount) => prevCount + 1);
                      addVariation();
                    }}
                  >
                    Add Variation
                  </Button>
                ) : (
                  <div>
                    {fields.map(({ key, name, ...restField }, index) => (
                      <div
                        key={index}
                        className="modal-product-variation"
                        style={{
                          marginBottom: "20px",
                          border: "1px solid #f0f0f0",
                          padding: "10px 20px",
                          backgroundColor: "#f6f6f6",
                        }}
                      >
                        <div
                          style={{ display: "flex", justifyContent: "right" }}
                        >
                          <Button
                            key={index}
                            type="text"
                            icon={<CloseOutlined />}
                            onClick={() => {
                              remove(name);
                              setVariationCount((prevCount) => prevCount - 1);
                              removeVariation(index);
                            }}
                          />
                        </div>
                        {/* Variation Input */}
                        <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                          <CustomItem
                            {...restField}
                            label="Variation"
                            name={[name, "variation"]}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                          >
                            <AutoComplete
                              options={variationOptions}
                              filterOption={false}
                              onChange={(value) => onVariationChange(index, value)}
                            >
                              <Input
                                placeholder="Type or Select"
                                onChange={(e) =>
                                  onVariationChange(index, e.target.value)
                                }
                                count={{
                                  show: true,
                                  max: 14,
                                  strategy: (txt) => runes(txt).length,
                                  exceedFormatter: (txt, { max }) =>
                                    runes(txt).slice(0, max).join(""),
                                }}
                              />
                            </AutoComplete>
                          </CustomItem>
                        </Col>

                        {/* Options for each Variation */}
                        <CustomItem
                          label="Options"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                        >
                          <Form.List name={[name, "options"]}>
                            {(
                              optionFields,
                              { add: addOption, remove: removeOption }
                            ) => {
                              return (
                                <div
                                  style={{ display: "flex", flexWrap: "wrap" }}
                                >
                                  {optionFields.map(
                                    (
                                      {
                                        key: optionKey,
                                        name: optionName,
                                        ...restOptionField
                                      },
                                      optionIndex
                                    ) => (
                                      <Col xl={8} lg={12} md={12} sm={24} xs={24} >
                                        <div
                                          key={optionIndex}
                                          style={{
                                            display: "flex"
                                          }}
                                        >
                                          <CustomItem
                                            {...restOptionField}
                                            name={optionName}
                                          >
                                            <Input
                                              key={optionIndex}
                                              placeholder="Enter option"
                                              style={{
                                                width: "100%",
                                              }}
                                              onChange={(e) =>
                                                onOptionChange(
                                                  index,
                                                  optionIndex,
                                                  e.target.value
                                                )
                                              }
                                              count={{
                                                show: true,
                                                max: 20,
                                                strategy: (txt) =>
                                                  runes(txt).length,
                                                exceedFormatter: (
                                                  txt,
                                                  { max }
                                                ) =>
                                                  runes(txt)
                                                    .slice(0, max)
                                                    .join(""),
                                              }}
                                            />
                                          </CustomItem>
                                          <Button
                                            type="text"
                                            icon={<DeleteOutlined />}
                                            onClick={() => {
                                              removeOption(optionName);
                                              removeOptions(index, optionIndex);
                                            }}
                                            style={{
                                              marginBottom: "20px",
                                              marginLeft: "10px",
                                            }}
                                          />
                                        </div>
                                      </Col>
                                    )
                                  )}
                                  <Button
                                    type="dashed"
                                    icon={<PlusOutlined />}
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
                {variationCount >= 2 || variationCount === 0 ? null : (
                  <div
                    style={{
                      border: "1px solid #f0f0f0",
                      padding: "20px",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <Button
                      onClick={() => {
                        add();
                        addVariation();
                        setVariationCount((prevCount) => prevCount + 1);
                      }}
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

      {/* Variation List */}
      {variationCount > 0 ? (
        <div className="modal-product-variation-list">
          <CustomItem
            label="Variation List"
            name="variationList"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <div>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
               
                <Col xl={6} lg={8} md={12} sm={8} xs={8}>
                  <Form.Item 
                    name="generalPrice" 
                    style={{ width: "100%", paddingRight: "10px"}}
                    rules={[
                      {
                        validator: (_, value) => {
                          if (value === undefined || value === "") {
                            return Promise.resolve(); 
                          }
                          const numericValue = parseFloat(value);
                          if (isNaN(numericValue) || numericValue < 1000) {
                            return Promise.reject("Minimum price is 1000");
                          }
                          return Promise.resolve();
                        },
                      }
                    ]}
                  >
                    <Input
                      type="number"
                      addonAfter="VND"
                      placeholder="Enter price"
                      value={general.price.toString()}
                      onChange={(e) => setGeneral((prev) => ({ ...prev, price: Number(e.target.value) }))}
                    />
                  </Form.Item>
                </Col>
                
                <Col xl={6} lg={8} md={12} sm={8} xs={8}>
                  <CustomItem 
                    name="generalDiscount" 
                    style={{ width: "100%", paddingRight: "10px" }}
                    rules={[
                      {
                        validator: (_, value) => {
                          if (value === undefined || value === "") {
                            return Promise.resolve(); 
                          }
                          const numericValue = parseFloat(value);
                          if (isNaN(numericValue) || numericValue < 0) {
                            return Promise.reject("Minimum discount is 0");
                          }
                          return Promise.resolve();
                        },
                      }
                    ]}
                  >
                    <Input
                      type="number"
                      addonAfter="%"
                      placeholder="Enter discount"
                      value={general.discount.toString()}
                      onChange={(e) => setGeneral((prev) => ({ ...prev, discount: Number(e.target.value) }))}
                    />
                  </CustomItem>
                </Col>
            
                <Col xl={6} lg={8} md={12} sm={8} xs={8}>
                  <CustomItem 
                    name="generalStock" 
                    style={{ width: "100%", paddingRight: "10px"}}
                    rules={[
                      {
                        validator: (_, value) => {
                          if (value === undefined || value === "") {
                            return Promise.resolve(); 
                          }
                          const numericValue = parseFloat(value);
                          if (isNaN(numericValue) || numericValue < 0) {
                            return Promise.reject("Minimum stock is 0");
                          }
                          return Promise.resolve();
                        },
                      }
                    ]}
                  >
                    <Input
                      type="number"
                      placeholder="Enter stock"
                      value={general.stock.toString()}
                      onChange={(e) => setGeneral((prev) => ({ ...prev, stock: Number(e.target.value) }))}
                    />
                  </CustomItem>
                </Col>

                <Col lg={6} md={8} sm={12} xs={8}>
                  <Button
                    type="primary"
                    style={{ width: "100px"}}
                    onClick={handleApplyToAll}
                  >
                    Apply To All
                  </Button>
                </Col>
               
              </div>
              <Table
                style={{
                  marginTop: "15px",
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
              />
            </div>
          </CustomItem>
        </div>
      ) : null}
    </>
  );
};

export default ProductVariations;
