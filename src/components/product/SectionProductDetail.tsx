import * as React from "react";
import {
  Button,
  Image,
  Row,
  Rate,
  Input,
  InputNumber,
  Radio,
  RadioChangeEvent,
  message,
} from "antd";
import { Col } from "antd";
import CustomCarousel from "../CustomCarousel";
import { useMediaQuery } from "react-responsive";
import "../../styles/product/modal.section.product.detail.css";
import StarRating from "../StarRating";
import { IProduct, skuType } from "../../types/backend";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchSku } from "../../redux/slices/skuSlice";

// ant-radio-button-wrapper
const CustomRadio = styled(Radio.Group)`
  .ant-radio-button-wrapper::before {
    display: none !important;
    content: none !important;
  }
  .ant-radio-button-wrapper:hover {
    border: 1.5px solid #fca120 !important;
    color: #fca120;
  }

  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    border: 1.5px solid #fca120 !important;
    color: #fca120;
    font-weight: 500;
  }
`;

interface SectionProductDetailProps {
  product: IProduct;
}

const SectionProductDetail: React.FC<SectionProductDetailProps> = ({
  product,
}) => {
  const isScreenMD = useMediaQuery({ query: "(max-width: 768px)" });
  const isScreenSM = useMediaQuery({ query: "(max-width: 576px)" });
  const slidesToShow = isScreenSM ? 3 : isScreenMD ? 4 : 5;
  const [quantity, setQuantity] = React.useState<number>(1);
  const [imageDisplay, setImageDisplay] = React.useState<string>(
    product.promotionImageURLs?.[0] || ""
  );
  const [option1, setOption1] = React.useState<string>("");
  const [option2, setOption2] = React.useState<string>("");
  const [checkVariantSelection, setCheckVariantSelection] =
    React.useState<boolean>(false);
  const [stock, setStock] = React.useState<number>();

  const [skuData, setSkuData] = React.useState<skuType>();
  React.useEffect(() => {
    setSkuData({
      id: "",
      key: 0,
      option1: "",
      option2: "",
      originalPrice: product?.skuDisplay?.originalPrice || 0,
      sellingPrice: product?.skuDisplay?.sellingPrice || 0,
      stock: product.totalStock || 0,
      discount: product.discountDisplay || 0,
      isActive: "1",
    });
  }, [product]);

  React.useEffect(() => {
    if (product.promotionImageURLs?.length)
      setImageDisplay(product.promotionImageURLs[0]);
  }, [product.promotionImageURLs]);

  const listImage = React.useMemo(() => {
    const result = [];

    if (product?.promotionImageURLs?.length)
      result.push(...product?.promotionImageURLs);
    if (product?.productImageURLs?.length)
      result.push(...product.productImageURLs);

    return result;
  }, [product.productImageURLs, product.promotionImageURLs]);

  const onChangeQuantity = (value: number | null) => {
    if (value === null) return;

    if (value > (skuData?.stock ?? 0)) {
      message.error(`Chỉ còn ${skuData?.stock} sản phẩm trong kho`);
      return;
    }

    setQuantity(value);
  };

  const onChangeOption1 = (e: RadioChangeEvent) => {
    setOption1(e.target.value);
  };

  const onChangeOption2 = (e: RadioChangeEvent) => {
    setOption2(e.target.value);
  };

  React.useEffect(() => {
    const productOption = product?.skus?.find(
      (item) => item.option1 === option1 && item.option2 === option2
    );
    if (productOption) {
      setSkuData(productOption);
      setQuantity(1);
    }
    if (checkVariantSelection) {
      if (product?.variation1 && product?.variation2 && option1 && option2) {
        setCheckVariantSelection(false);
      } else if (product?.variation1 && !product?.variation2 && option1) {
        setCheckVariantSelection(false);
      }
    }
  }, [option1, option2]);

  const checkBeforeBuying = (): void => {
    if (product?.variation1 && product?.variation2) {
      if (!option1 || !option2) {
        message.error("Vui lòng chọn phân loại sản phẩm");
        setCheckVariantSelection(true);
        return;
      }
    } else if (product?.variation1) {
      if (!option1) {
        message.error("Vui lòng chọn phân loại sản phẩm");
        setCheckVariantSelection(true);
        return;
      }
    }
    setCheckVariantSelection(false);
  };

  return (
    <div className="section-product-details">
      <div className="section-product-details__container">
        <Row>
          {/* Hiển thị ảnh sản phẩm  */}
          <Col
            xl={12}
            lg={12}
            md={24}
            sm={24}
            xs={24}
            style={{ padding: "0 15px" }}
          >
            <div className="section-product-details__content-image">
              <Image src={imageDisplay} />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                backgroundColor: "#fff",
                marginTop: "10px",
                borderRadius: "8px",
                padding: "5px 0px",
              }}
            >
              <div className="section-product-details__content-thumbnail">
                <CustomCarousel
                  images={listImage}
                  slidesToShow={slidesToShow}
                  setImageDisplay={setImageDisplay}
                />
              </div>
            </div>
          </Col>
          <Col
            xl={0}
            lg={0}
            md={24}
            sm={24}
            xs={24}
            style={{ height: "30px" }}
          />
          {/* Hiển thị thông tin sản phẩm  */}

          <Col
            xl={12}
            lg={12}
            md={24}
            sm={24}
            xs={24}
            style={{ padding: "0 15px" }}
          >
            <div className="section-product-details__content-info">
              <h1 className="section-product-details__title">
                {product.productName}
              </h1>
              <div
                className="section-product-details__sold-start"
                style={{
                  display: "flex",
                  alignContent: "center",
                  marginBottom: "20px",
                }}
              >
                <div
                  className="section-product-details__start"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    paddingRight: "15px",
                    borderRight: "1px solid rgb(179, 179, 179)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "2px",
                      borderBottom: "1px solid #333",
                      marginRight: "5px",
                    }}
                  >
                    <span style={{ fontSize: "16.5px", color: "#333" }}>
                      4.5
                    </span>
                  </div>
                  <StarRating rating={4.5} />
                </div>
                <div
                  className="section-product-details__rate"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: "0 15px",
                    borderRight: "1px solid rgb(179, 179, 179)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "2px",
                      borderBottom: "1px solid #333",
                      marginRight: "5px",
                    }}
                  >
                    <span style={{ fontSize: "16.5px", color: "#333" }}>
                      100
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "2px",
                    }}
                  >
                    <span style={{ fontSize: "14px", color: "#767676" }}>
                      Đánh giá
                    </span>
                  </div>
                </div>
                <div
                  className="section-product-details__sold"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: "0 15px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "2px",
                      borderBottom: "1px solid #333",
                      marginRight: "5px",
                    }}
                  >
                    <span style={{ fontSize: "16.5px", color: "#333" }}>
                      {product?.totalQuantitySold}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "2px",
                    }}
                  >
                    <span style={{ fontSize: "14px", color: "#767676" }}>
                      Đã bán
                    </span>
                  </div>
                </div>
              </div>
              <div className="section-product-details__price">
                <p style={{ fontSize: "27px", fontWeight: "600" }}>
                  ₫{skuData?.sellingPrice?.toLocaleString("vi-VN")}
                </p>
                <img
                  src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/b90f3f018f55093cc6e6.svg"
                  alt="icon"
                />
                <p
                  style={{
                    fontSize: "17px",
                    color: "#999",
                    textDecoration: "line-through",
                  }}
                >
                  ₫{skuData?.originalPrice?.toLocaleString("vi-VN")}
                </p>
              </div>
              <div
                className="section-product-details__description"
                style={{ marginTop: "10px", marginBottom: "30px" }}
              >
                <p>
                  <strong>Thương hiệu:</strong> {product?.brand}
                </p>
                <p style={{ marginTop: "10px" }}>
                  <strong>Xuất xứ:</strong> {product?.countryOfOrigin}
                </p>
                <p style={{ marginTop: "10px" }}>
                  <strong>Chất liệu:</strong>{" "}
                  {product?.materials?.map((item, idx) => (
                    <span key={idx}>
                      {item}
                      {idx < product.materials.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              </div>
              <div
                style={{
                  padding: " 10px 5px",
                  backgroundColor: checkVariantSelection
                    ? "rgba(255,87,34,.1)"
                    : "#fff",
                }}
              >
                {product?.variation1 && (
                  <div
                    className="section-product-variation"
                    style={{ marginBottom: "20px" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      <p
                        style={{
                          color: "#000",
                          fontWeight: "600",
                          fontSize: "15px",
                        }}
                      >
                        {product.variation1}:
                      </p>

                      <CustomRadio onChange={onChangeOption1} value={option1}>
                        {product?.options1?.map((item, idx) => {
                          const matchingSku = product?.skus?.find(
                            (sku) =>
                              sku.option1 === item &&
                              (!option2 || sku.option2 === option2) &&
                              sku.stock > 0
                          );

                          return (
                            <Radio.Button
                              value={item}
                              key={idx}
                              disabled={!matchingSku}
                              style={{
                                marginRight: "10px",
                                border: "1px solid #000",
                                borderRadius: "3px",
                                opacity: !matchingSku ? 0.5 : 1,
                              }}
                            >
                              {item}
                            </Radio.Button>
                          );
                        })}
                      </CustomRadio>
                    </div>
                  </div>
                )}
                {product?.variation2 && (
                  <div
                    className="section-product-variation"
                    style={{ marginBottom: "3px" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      <p
                        style={{
                          color: "#000",
                          fontWeight: "600",
                          fontSize: "15px",
                        }}
                      >
                        {product.variation2}:
                      </p>

                      <CustomRadio onChange={onChangeOption2} value={option2}>
                        {product?.options2?.map((item, idx) => {
                          const matchingSku = product?.skus?.find(
                            (sku) =>
                              sku.option2 === item &&
                              (!option1 || sku.option1 === option1) &&
                              sku.stock > 0
                          );

                          return (
                            <Radio.Button
                              value={item}
                              key={idx}
                              disabled={!matchingSku}
                              style={{
                                marginRight: "10px",
                                border: "1px solid #000",
                                borderRadius: "3px",
                                opacity: !matchingSku ? 0.5 : 1,
                              }}
                            >
                              {item}
                            </Radio.Button>
                          );
                        })}
                      </CustomRadio>
                    </div>
                  </div>
                )}
                {checkVariantSelection && (
                  <p style={{ color: "red" }}>
                    Vui lòng chọn phân loại sản phẩm
                  </p>
                )}
              </div>

              <div
                className="section-product-details__quantity"
                style={{ marginTop: "25px", padding: "0px 5px" }}
              >
                <div style={{ display: "flex", gap: "15px" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p
                      style={{
                        color: "#000",
                        fontWeight: "600",
                        fontSize: "15px",
                      }}
                    >
                      Số lượng:
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <InputNumber
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "3px",
                        fontSize: "15px",
                        border: "1px solid #000",
                      }}
                      min={1}
                      max={skuData?.stock}
                      defaultValue={1}
                      value={quantity}
                      onChange={onChangeQuantity}
                      changeOnWheel
                    />
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p style={{ color: "#757575", fontWeight: "500" }}>
                      {skuData?.stock} sản phẩm có sẵn
                    </p>
                  </div>
                </div>
                {quantity > (skuData?.stock ?? 0) && (
                  <p style={{ color: "red" }}>
                    Số lượng sản phẩm lựa chọn vượt quá số lượng trong kho. Vui
                    lòng chọn lại
                  </p>
                )}
              </div>
              <div className="section-product-details__btn">
                <Button className="section-product-details__btn-add-cart">
                  <img
                    style={{
                      width: "18px",
                      height: "18px",
                      marginRight: "6px",
                    }}
                    src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/0f3bf6e431b6694a9aac.svg"
                    alt="icon"
                  />
                  <p>Thêm Vào Giỏ Hàng</p>
                </Button>
                <Button
                  onClick={() => checkBeforeBuying()}
                  className="section-product-details__btn-buy-now"
                  //disabled={}
                >
                  <p>Mua Ngay</p>
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default SectionProductDetail;
