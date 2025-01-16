import React, { useEffect } from "react";
import { Form, Input, Button, AutoComplete, Table, Badge, Col } from "antd";
import { PlusOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";
import runes from "runes2";
import "../../../styles/modal.product.css";
import { TableProps } from "antd/lib";
import ImageUpload from "../../input/ImageUpload";
import { In } from "spring-filter-query-builder/dist/types/comparators";

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

interface TableType {
  key: number;
  variation1: string;
  variation2?: string;
  price: string;
  stock: string;
}
interface skuType {
  variation1: string;
  variation2?: string;
  price: string;
  stock: string;
}

const ProductVariations: React.FC = () => {
  const [variationCount, setVariationCount] = React.useState<number>(0);
  const variationOptions = [
    { value: "Size", label: "Size" },
    { value: "Color", label: "Color" },
    { value: "Style", label: "Style" },
    { value: "Gender", label: "Gender" },
  ];
  const [variationsData, setVariationsData] = React.useState<
    { variation: string; options: string[] }[]
  >([]);
  const [skuData, setSkuData] = React.useState<skuType[]>([]);
  const [image, setImage] = React.useState<any>([]);
  const columns: TableProps<TableType>["columns"] = [
    {
      title: (
        <Badge
          status="processing"
          text={variationsData[0]?.variation || "Variation1"}
        />
      ),
      dataIndex: "variation1",
      onCell: (record: TableType) => ({
        rowSpan:
          record.key % (variationsData[1]?.options.length || 1) === 0
            ? variationsData[1]?.options.length || 1
            : 0,
      }),
      align: "center",
      width: "20%",
      render: (text, record) => (
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
            <span>{text}</span>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <ImageUpload
              size={65}
              count={1}
              fileList={image}
              setFileList={setImage}
            />
          </div>
        </div>
      ),
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
            dataIndex: "variation2",
            width: "20%",
            align: "center" as "left" | "center" | "right",
            render: (text: string, record: any) => (
              <span
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
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
        <Input
          value={text}
          //onChange={(e) => handleChange(e.target.value, record.key, "price")}
          placeholder="Enter Price"
        />
      ),
      align: "center",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      render: (text, record) => (
        <Input
          value={text}
          //onChange={(e) => handleChange(e.target.value, record.key, "stock")}
          placeholder="Enter Stock"
        />
      ),
      align: "center",
    },
  ];

  useEffect(() => {
    let data: skuType[] = [];
    let count1 = variationsData[0]?.options.length || 0;
    let count2 = variationsData[1]?.options.length || 0;
    if (count2 === 0) {
      for (let i = 0; i < count1; i++) {
        data.push({
          variation1: variationsData[0]?.options[i] || "",
          price: "",
          stock: "",
        });
      }
    } else {
      for (let i = 0; i < count1; i++) {
        for (let j = 0; j < count2; j++) {
          data.push({
            variation1: variationsData[0]?.options[i] || "",
            variation2: variationsData[1]?.options[j] || "",
            price: "",
            stock: "",
          });
        }
      }
    }
    setSkuData(data);
  }, [variationsData]);

  const onVariationChange = (key: number, value: string): void => {
    console.log("key", key);
    setVariationsData((prevData) => {
      const updatedData = [...prevData];
      if (!updatedData[key]) {
        updatedData[key] = { variation: "", options: [] }; // initialize if undefined
      }
      updatedData[key].variation = value;
      return updatedData;
    });
  };

  const onOptionChange = (
    key: number,
    optionKey: number,
    value: string
  ): void => {
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

  const addVariation = (): void => {
    setVariationsData((prevData) => {
      const updatedData = [...prevData];
      updatedData.push({ variation: "", options: [] });
      return updatedData;
    });
  };

  const removeVariation = (key: number): void => {
    console.log("delete key", key);
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

  console.log(variationsData);

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
                              //placeholder="Select Variation"
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
                                              placeholder={`Enter option`}
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
              <div style={{ display: "flex" }}>
                <Col lg={8} md={8} sm={8} xs={8}>
                  <CustomItem name="generalPrice" style={{ width: "100%" }}>
                    <Input
                      type="number"
                      addonAfter="VND"
                      style={{
                        width: "100%",
                        marginBottom: "20px",
                        border: "1px solid rgb(214, 209, 209)",
                        borderRadius: "0px",
                      }}
                      placeholder="Search Variation"
                    />
                  </CustomItem>
                </Col>
                <Col lg={8} md={8} sm={8} xs={8}>
                  <Input
                    style={{ width: "100%", marginBottom: "20px" }}
                    placeholder="Search Option"
                  />
                </Col>
                <Col lg={8} md={8} sm={8} xs={8}>
                  <Button
                    type="primary"
                    style={{ width: "100px", marginLeft: "10px" }}
                  >
                    Apply To All
                  </Button>
                </Col>
              </div>
              <Table
                style={{
                  width: "100%",
                  border: "1px solid rgb(214, 209, 209)",
                }}
                dataSource={skuData.map((data, index) => ({
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
