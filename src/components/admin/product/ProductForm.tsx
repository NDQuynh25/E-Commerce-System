import * as React from "react";
import { useEffect } from "react";
import {
  Col,
  Form,
  Button,
  Row,
  Input,
  AutoComplete,
  Space,
  Select,
  Divider,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import TextEditor from "../../TextEditor";
import ImageUpload from "../../input/ImageUpload";
import styled from "styled-components";
import runes from "runes";
import RequiredLabel from "../../input/RequiredLabel";
import { InputNumber } from "antd";
import { InputNumberProps } from "antd/lib/input-number";
import ProductVariations from "./ProductVariations";
import SKU from "./SKU";
import { callCreateProduct, callUpdateProduct } from "../../../api/productApi";

import { notification } from "antd";
import { IProduct } from "../../../types/backend";
import CategorySelect from "./CategorySelect";
import "../../../styles/modal.product-form.css";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchProduct } from "../../../redux/slices/productSlice";
import { UploadFile } from "antd/lib";
import { extractAllBase64FromHTML, urlToBlob } from "../../../utils/conversion";

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
    font-family: Inter, -apple-system, BlinkMacSystemFont, "San Francisco",
      "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
    font-size: 15px !important;
    font-weight: 450 !important;
    letter-spacing: 0px !important;
    text-align: right !important;
    justify-content: left !important;
    margin-top: 5px !important;
    margin-right: 15px !important;
  }
  .ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
    display: none !important;
  }
  .ant-form-item-required:not(.ant-form-item-required-mark-optional)::after {
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

interface ProductFormProps {
  isEdit?: boolean;
}
type variation = {
  variation: string;
  options: string[];
};
const ProductForm: React.FC<ProductFormProps> = ({ isEdit }) => {
  const countryOfOriginOptions = [
    "Vietnam",
    "China",
    "Thailand",
    "Indonesia",
    "India",
    "Bangladesh",
    "Italy",
    "Portugal",
    "Spain",
    "France",
    "USA",
    "South Korea",
    "Japan",
    "Poland",
    "Germany",
    "Turkey",
    "Other",
  ];

  const brandOptions = [
    "IKEA",
    "Pottery Barn",
    "Restoration Hardware",
    "Crate & Barrel",
    "Poltrona Frau",
    "B&B Italia",
    "Kartell",
    "Hülsta",
    "Nolte",
    "MiiR",
    "SB Furniture",
    "Ligne Roset",
    "Thiên Thanh",
    "Đại Lộc",
    "Xoài Furniture",
    "Vietwood",
    "Không thương hiệu",
    "Khác",
  ];
  const formatted1Options = brandOptions.map((option) => {
    return { value: option, label: option };
  });
  const formatted2Options = countryOfOriginOptions.map((option) => {
    return { value: option, label: option };
  });
  const [form] = Form.useForm();
  const [newMaterial, setNewMaterial] = React.useState<string>("");
  const [productImages, setProductImages] = useState<any[]>([]);
  const [promotionImages, setPromotionImages] = useState<any[]>([]);
  const [descriptionImages, setDescriptionImages] = useState<any[]>([]);
  const [description, setDescription] = useState<string>("");
  const [variationsData, setVariationsData] = useState<variation[]>([]);
  const [skusData, setSkusData] = useState<any[]>([]);
  const [productData, setProductData] = React.useState<IProduct>({
    imageURLs: [],
    skuCode: "",
    productName: "",
    description: "",
    categoryId: "",
    brand: "",
    materials: [],
    countryOfOrigin: "",
    originalPrice: 0,
    sellingPrice: 0,
    stock: 0,
    variation1: "",
    options1: [],
    variation2: "",
    options2: [],
    skus: [],
  });
  const materialOptions = [
    // Gỗ
    { value: "wood", label: "Gỗ tự nhiên" },
    { value: "mdf", label: "Gỗ MDF (gỗ công nghiệp)" },
    { value: "plywood", label: "Ván ép (Plywood)" },
    { value: "veneer", label: "Veneer (Gỗ lạng phủ bề mặt)" },
    { value: "hdf", label: "Gỗ HDF (gỗ ép mật độ cao)" },
    { value: "chipboard", label: "Ván dăm (Chipboard)" },
    { value: "bamboo", label: "Tre" },
    { value: "rattan", label: "Mây tự nhiên" },
    { value: "synthetic_rattan", label: "Mây nhựa (Synthetic Rattan)" },
    { value: "water_hyacinth", label: "Lục bình (Water Hyacinth)" },

    // Đá
    { value: "marble", label: "Đá cẩm thạch (Marble)" },
    { value: "granite", label: "Đá granite" },
    { value: "quartz", label: "Đá thạch anh (Quartz)" },
    { value: "onyx", label: "Đá onyx tự nhiên" },
    { value: "solid_surface", label: "Đá nhân tạo Solid Surface" },

    // Kim loại
    { value: "metal", label: "Kim loại" },
    { value: "iron", label: "Sắt" },
    { value: "steel", label: "Thép" },
    { value: "stainless_steel", label: "Thép không gỉ" },
    { value: "aluminum", label: "Nhôm" },

    // Vải / Da
    { value: "fabric", label: "Vải" },
    { value: "cotton", label: "Vải cotton" },
    { value: "velvet", label: "Vải nhung (Velvet)" },
    { value: "linen", label: "Vải lanh (Linen)" },
    { value: "felt", label: "Nỉ (Felt)" },
    { value: "leather", label: "Da thật" },
    { value: "full_grain_leather", label: "Da bò nguyên tấm" },
    { value: "suede", label: "Da lộn (Suede)" },
    { value: "nubuck", label: "Da nubuck (Da bò mài mịn)" },
    { value: "pu_leather", label: "Da PU (giả da tổng hợp)" },

    // Nhựa
    { value: "plastic", label: "Nhựa" },
    { value: "polypropylene", label: "Polypropylene (Nhựa PP)" },
    { value: "resin", label: "Nhựa Resin" },
    { value: "fiberglass", label: "Sợi thủy tinh (Fiberglass)" },
    { value: "acrylic", label: "Acrylic (Nhựa bóng gương)" },

    // Khác
    { value: "glass", label: "Kính" },
    { value: "tempered_glass", label: "Kính cường lực" },
    { value: "frosted_glass", label: "Kính mờ" },
    { value: "mirror", label: "Gương" },
    { value: "ceramic", label: "Gốm sứ (Ceramic)" },
    { value: "porcelain", label: "Sứ cao cấp (Porcelain)" },
    { value: "concrete", label: "Bê tông" },
    { value: "cement", label: "Xi măng" },
    { value: "paperboard", label: "Giấy ép (Paperboard)" },
  ];

  // const key = 'updatable';
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const product = useAppSelector((state) => state.product.result);

  const onChanges = (e: any): void => {
    setNewMaterial(e.target.value);
  };
  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ): void => {
    e.preventDefault();
    console.log("newMaterial", newMaterial);
    if (newMaterial !== "") {
      materialOptions.push({ value: newMaterial, label: newMaterial });
      form.setFieldsValue({
        material: [...form.getFieldValue("material"), newMaterial],
      });
      setNewMaterial("");
    }
  };
  const onChange: InputNumberProps["onChange"] = (value) => {
    console.log("changed", value);
  };

  const processHTMLWithBase64 = async (html: string) => {
    const extractedBase64List = extractAllBase64FromHTML(html);

    const base64Files = await Promise.all(
      extractedBase64List.map(async (base64Image, index) => {
        const image_id = `${new Date().getTime()}_${index}`;
        html = html.replace(
          base64Image.base64,
          `https://example.com/image_${image_id}.jpg`
        );

        const { base64, mimeType } = base64Image;
        const blob = await urlToBlob(base64);
        const file = new File([blob], `image_${image_id}.jpg`, {
          type: mimeType,
        });
        return file;
      })
    );
    console.log("html", html);
    const descriptionImageFiles = base64Files.map(
      (file, index) =>
        ({
          uid: `${Date.now() + index}`,
          name: file.name,
          status: "done",
          url: URL.createObjectURL(file),
          originFileObj: file,
        } as UploadFile)
    );

    return {
      renewDescription: html,
      descriptionImageFiles: descriptionImageFiles,
    };
  };

  const onFinish = async (values: any) => {
    console.log("values", values);

    let newDescription = "";
    let descriptionImages = [] as UploadFile[];

    await processHTMLWithBase64(values.description)
      .then((result) => {
        newDescription = result.renewDescription;
        descriptionImages = result.descriptionImageFiles;

        // setDescriptionImages(descriptionImageFiles);
        // form.setFieldsValue({ description: renewDescription });
      })
      .catch((error) => {
        console.error("Error processing HTML:", error);
      });

    const productPayload = {
      id: product?.id,
      productName: values.productName,
      description: newDescription,
      brand: values.brand,
      countryOfOrigin: values.countryOfOrigin,
      materials: values.materials,
      categoryIds: values.categoryIds,

      variation1: variationsData[0]?.variation || "",
      options1: variationsData[0]?.options || [],
      variation2: variationsData[1]?.variation || "",
      options2: variationsData[1]?.options || [],

      skus: skusData.map((sku) => ({
        id: sku.id,
        option1: sku.option1,
        option2: sku.option2,
        originalPrice: sku.originalPrice,
        sellingPrice: sku.sellingPrice,
        stock: sku.stock,
      })),
    };

    console.log("productPayload", productPayload);

    const formData = new FormData();

    promotionImages.forEach((file: any) => {
      formData.append("promotionImages", file.originFileObj as Blob);
    });
    productImages.forEach((file: any) => {
      formData.append("productImages", file.originFileObj as Blob);
    });
    descriptionImages.forEach((file: any) => {
      formData.append("descriptionImages", file.originFileObj as Blob);
    });
    formData.append("productData", JSON.stringify(productPayload));

    if (isEdit && product?.id) {
      updateProduct(formData, product?.id as string);
    } else {
      createProduct(formData);
    }
  };
  const updateProduct = async (formData: FormData, id: string) => {
    const res = await callUpdateProduct(id, formData);
    if (res.status === 200) {
      notification.success({
        message: "Success",
        description: "Product updated successfully",
      });
    } else {
      notification.error({
        message: "Error",
        description: "Failed to update product",
      });
    }
  };

  const createProduct = async (formData: FormData) => {
    //console.log("productData", newData);
    const res = await callCreateProduct(formData);
    if (res.status === 201) {
      notification.success({
        message: "Success",
        description: "Product created successfully",
      });
    } else {
      notification.error({
        message: "Error",
        description: "Failed to create product",
      });
    }
  };

  const handleChangeDescription = (value: string) => {
    form.setFieldsValue({ description: value });
  };

  const [selectedCategory, setSelectedCategory] = React.useState<number[]>([]);

  const handleCategoryChange = (selected: number[]) => {
    setSelectedCategory(selected);
    form.setFieldsValue({ categoryId: selected });
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct({ id: id as string }));
    }
  }, []);

  const loadImages = async (
    imageURLs: string[],
    setImages: React.Dispatch<React.SetStateAction<UploadFile[]>>
  ) => {
    const timestamp = Date.now();

    const files = await Promise.all(
      imageURLs.map(async (url, index) => {
        const blob = await urlToBlob(url);
        const file = new File([blob], `image_${timestamp + index}.jpg`, {
          type: blob.type,
        });

        return {
          uid: `${timestamp + index}`,
          name: file.name,
          status: "done",
          url,
          originFileObj: file,
        } as UploadFile;
      })
    );

    setImages(files);
  };

  useEffect(() => {
    form.setFieldsValue({
      productImages: productImages,
      promotionImages: promotionImages,
    });
  }, [productImages, promotionImages]);

  useEffect(() => {
    if (product && isEdit) {
      const variation1 = product.variation1 || "";
      const options1 = product.options1 || [];
      const variation2 = product.variation2 || "";
      const options2 = product.options2 || [];
      const variations = [
        { variation: variation1, options: options1 },
        { variation: variation2, options: options2 },
      ].filter(
        (variation) =>
          variation.variation !== "" && variation.options.length > 0
      );

      loadImages(product.productImageURLs || [], setProductImages);
      loadImages(product.promotionImageURLs || [], setPromotionImages);

      form.setFieldsValue({
        id: product.id,
        productName: product.productName,
        skuCode: product.skuCode,
        description: product.description,
        brand: product.brand,
        countryOfOrigin: product.countryOfOrigin,
        originalPrice: product.originalPrice,
        sellingPrice: product.sellingPrice,
        materials: product.materials,
        categoryIds: product.categoryIds,
        stock: product.stock,
        variations: variations,
      });
      setVariationsData(variations);
      setSkusData(product?.skus || []);
      // for (let i = 0; i < (product?.skus ?? []).length; i++) {
      //   const sku = product?.skus?.[i];
      //   form.setFieldsValue({
      //     [`variations[${i}].skuCode`]: sku?.skuCode,
      //     [`variations[${i}].option1`]: sku?.option1,
      //     [`variations[${i}].option2`]: sku?.option2,
      //     [`variations[${i}].originalPrice`]: sku?.originalPrice,
      //     [`variations[${i}].sellingPrice`]: sku?.sellingPrice,
      //     [`variations[${i}].stock`]: sku?.stock,
      //   });
      // }
    } else {
      form.setFieldsValue({
        id: "",
        productName: "",
        skuCode: "",
        description: "",
        brand: "",
        countryOfOrigin: "",
        originalPrice: 0,
        sellingPrice: 0,
        materials: [],
        categoryIds: [],
        stock: 0,
        variations: [],
      });
      setProductImages([]);
      setPromotionImages([]);
      setSkusData([]);
      setVariationsData([]);
    }
  }, [product]);

  return (
    <div className="product-form">
      <div
        className="product-form__container"
        style={{ padding: "20px 10%", display: "flex" }}
      >
        <Form
          form={form}
          layout="vertical"
          name="product-form"
          initialValues={{}}
          onFinish={onFinish}
          onValuesChange={(changedValues, allValues) => {
            if (
              Object.keys(changedValues).some((key) =>
                key.startsWith("variations")
              )
            ) {
              setVariationsData(allValues.variations || []);
            }
          }}
        >
          <Row gutter={[50, 20]}>
            <Col xl={16} lg={24} md={24} sm={24} xs={24}>
              <Row
                gutter={20}
                style={{
                  padding: "20px",
                  border: "1px solid blue",
                  background: "#fff",
                }}
              >
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <h5 style={{ marginBottom: "20px" }}>Thông tin sản phẩm</h5>
                </Col>

                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <CustomItem
                    label={
                      <RequiredLabel
                        label="Tên sản phẩm"
                        tooltip="Tên sản phẩm sẽ được hiển thị trên trang sản phẩm"
                      />
                    }
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
                        exceedFormatter: (txt, { max }) =>
                          runes(txt).slice(0, max).join(""),
                      }}
                      placeholder="Brand Name + Product Type + Key Features (Materials, Color, Size, Modal)"
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
                    ></AutoComplete>
                  </CustomItem>
                </Col>
                <Col xl={12} lg={24} md={24} sm={24} xs={24}>
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
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
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
                        display: "flex",
                        alignItems: "center",
                        alignSelf: "center !important",
                        minHeight: "35px !important",
                        fontSize: "0.9rem",
                        fontWeight: 400,
                        letterSpacing: 0,
                      }}
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider style={{ margin: "8px 0" }} />
                          <Space style={{ padding: "0 8px 4px" }}>
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
                            <Button
                              type="link"
                              icon={<PlusOutlined />}
                              onClick={addItem}
                            >
                              Add
                            </Button>
                          </Space>
                        </>
                      )}
                    />
                  </CustomItem>
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                  {/* Ant Design tự động inject value và onChange vào TextEditor thông qua Form.Item
                                => Không cần truyền form hoặc dùng useEffect để sync dữ liệu
                                Miễn là TextEditor nhận props: `value` và `onChange`, thì nó hoạt động như một controlled component */}
                  <CustomItem
                    label={
                      <RequiredLabel
                        label="Mô tả sản phẩm"
                        tooltip="Mô tả sản phẩm sẽ được hiển thị trên trang sản phẩm"
                      />
                    }
                    name="description"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    //rules={[{ required: true, message: 'Product description cannot be left blank!' }]}
                  >
                    <TextEditor
                      value={form.getFieldValue("description")}
                      setValue={handleChangeDescription}
                    />
                  </CustomItem>
                </Col>
              </Row>

              <Row
                gutter={20}
                style={{
                  padding: "20px",
                  border: "1px solid blue",
                  background: "#fff",
                }}
              >
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <h5 style={{ marginBottom: "20px" }}>Thuộc tính</h5>
                </Col>
                <Col
                  xl={24}
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  style={{ marginBottom: "10px" }}
                >
                  {" "}
                  Sản phẩm có nhiều thuộc tính khác nhau. Ví dụ: kích thước, màu
                  sắc...
                </Col>

                <Col lg={24} md={24} sm={24} xs={24}>
                  {
                    <ProductVariations
                      variationsData={variationsData}
                      form={form}
                      setSkusData={setSkusData}
                    />
                  }
                </Col>
              </Row>
            </Col>

            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
              <Row
                gutter={20}
                style={{
                  background: "#fff",
                  padding: "20px",
                  border: "1px solid blue",
                }}
              >
                <Col>
                  <h5>Ảnh sản phẩm</h5>
                </Col>
                <Col
                  xl={24}
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  style={{ padding: "25px 20px" }}
                >
                  <ul>
                    <li>Tải lên hình ảnh 1:1.</li>
                    <li>
                      Ảnh bìa sẽ được hiển thị tại các trang Kết quả tìm kiếm,
                      Gợi ý hôm nay,... Việc sử dụng ảnh bìa đẹp sẽ thu hút thêm
                      lượt truy cập vào sản phẩm của bạn.
                    </li>
                  </ul>
                </Col>
                <Col
                  xl={24}
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  style={{ padding: "0 10px" }}
                >
                  <CustomItem
                    label={<span>Ảnh bìa sản phẩm</span>}
                    name="promotionImages"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    //rules={[{ required: true, message: 'Please upload promotion image' }]}
                  >
                    <ImageUpload
                      fileList={promotionImages}
                      setFileList={setPromotionImages}
                      count={2}
                    />
                  </CustomItem>
                </Col>
                <Col
                  xl={24}
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  style={{ padding: "0 10px" }}
                >
                  <CustomItem
                    label={<span>Ảnh sản phẩm</span>}
                    name="productImages"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <ImageUpload
                      enableAspectRatio={true}
                      fileList={productImages}
                      setFileList={setProductImages}
                      count={8}
                    />
                  </CustomItem>
                </Col>
              </Row>

              <Row
                gutter={20}
                style={{
                  padding: "20px",
                  border: "1px solid blue",
                  background: "#fff",
                }}
              >
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <h5 style={{ marginBottom: "20px" }}>Danh mục</h5>
                </Col>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <CustomItem
                    label={
                      <RequiredLabel
                        label="Danh mục"
                        tooltip="Danh mục sẽ được hiển thị trên trang sản phẩm"
                      />
                    }
                    name="categoryIds"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    //rules={[{ required: true, message: 'Category cannot be left blank!' }]}
                  >
                    <CategorySelect
                      categoryIds={form.getFieldValue("categoryIds")}
                      form={form}
                      queryNumber={1}
                    />
                  </CustomItem>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Row
              gutter={20}
              style={{
                width: "100%",
                padding: "20px",
                border: "1px solid blue",
                background: "#fff",
              }}
            >
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <h5 style={{ marginBottom: "20px" }}>Phiên bản</h5>
              </Col>
              {variationsData.length > 0 && (
                <SKU
                  form={form}
                  variationsData={variationsData}
                  skusData={skusData}
                  setSkusData={setSkusData}
                  skus={product?.skus || []}
                  isEdit={isEdit}
                />
              )}
            </Row>
          </Row>

          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: "20px", width: "100%" }}
          />
        </Form>
      </div>
    </div>
  );
};

export default ProductForm;
