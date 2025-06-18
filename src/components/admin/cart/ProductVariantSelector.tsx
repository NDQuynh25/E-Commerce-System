import React, { useState, useEffect } from "react";
import { Popover, Button, Radio } from "antd";
import { ICartItem, IProduct, skuType } from "../../../types/backend";
import styled from "styled-components";
import { RadioChangeEvent } from "antd/lib/radio";

interface ProductVariantProps {
  product?: IProduct;
  sku?: skuType;
  cartItemSelected?: ICartItem;
  setCartItemSelected: React.Dispatch<
    React.SetStateAction<ICartItem | undefined>
  >;
}

const CustomRadio = styled(Radio.Group)`
  .ant-radio-button-wrapper::before {
    display: none !important;
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

const ProductVariantSelector: React.FC<ProductVariantProps> = ({
  product,
  sku,
  cartItemSelected,
  setCartItemSelected,
}) => {
  const [visible, setVisible] = useState(false);
  const [option1, setOption1] = useState<string>("");
  const [option2, setOption2] = useState<string>("");

  useEffect(() => {
    if (sku) {
      setOption1(sku.option1 || "");
      setOption2(sku.option2 || "");
    }
  }, [sku]);

  const handleConfirm = () => {
    const matchedSku = product?.skus?.find(
      (s) => s.option1 === option1 && s.option2 === option2
    );
    console.log("matchedSku", matchedSku);
    setCartItemSelected({
      id: cartItemSelected?.id || "",
      cartId: cartItemSelected?.cartId || "",
      productId: product?.id || "",
      skuId: matchedSku?.id || "",
      option1: matchedSku?.option1 || "",
      option2: matchedSku?.option2 || "",
      quantity: cartItemSelected?.quantity || 1,
    } as ICartItem);

    setVisible(false);
  };

  const content = (
    <div style={{ padding: "10px 5px", backgroundColor: "#fff" }}>
      {product?.variation1 && (
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <p style={{ color: "#000", fontWeight: 600, fontSize: "15px" }}>
              {product.variation1}:
            </p>
            <CustomRadio
              onChange={(e: RadioChangeEvent) => setOption1(e.target.value)}
              value={option1}
            >
              {product.options1?.map((item, idx) => {
                const matchingSku = product.skus?.find(
                  (sku) =>
                    sku.option1 === item &&
                    (!option2 || sku.option2 === option2) &&
                    sku.stock > 0
                );
                return (
                  <Radio.Button
                    key={idx}
                    value={item}
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
        <div style={{ marginBottom: "3px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <p style={{ color: "#000", fontWeight: 600, fontSize: "15px" }}>
              {product.variation2}:
            </p>
            <CustomRadio
              onChange={(e: RadioChangeEvent) => setOption2(e.target.value)}
              value={option2}
            >
              {product.options2?.map((item, idx) => {
                const matchingSku = product.skus?.find(
                  (sku) =>
                    sku.option2 === item &&
                    (!option1 || sku.option1 === option1) &&
                    sku.stock > 0
                );
                return (
                  <Radio.Button
                    key={idx}
                    value={item}
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

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
          marginTop: "30px",
        }}
      >
        <Button
          style={{
            backgroundColor: "#fff",
            color: "#000",
            border: "1px solid #000",
          }}
          onClick={() => setVisible(false)}
        >
          TRỞ LẠI
        </Button>
        <Button
          style={{ backgroundColor: "#fca120", border: "none" }}
          type="primary"
          onClick={handleConfirm}
        >
          XÁC NHẬN
        </Button>
      </div>
    </div>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      open={visible}
      onOpenChange={setVisible}
      placement="bottom"
    >
      <div
        onClick={() => setVisible(true)}
        style={{ cursor: "pointer", userSelect: "none" }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ marginBottom: 0 }}>Phân loại hàng:</p>
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "4px solid transparent",
              borderRight: "4px solid transparent",
              borderTop: visible ? "none" : "5px solid rgba(0, 0, 0, 0.54)",
              borderBottom: visible ? "5px solid rgba(0, 0, 0, 0.54)" : "none",
              margin: "0 0 0 10px",
              transition: "transform 0.2s ease",
            }}
          ></div>
        </div>

        <p style={{ marginTop: "5px" }}>
          {option1}, {option2}
        </p>
      </div>
    </Popover>
  );
};

export default ProductVariantSelector;
