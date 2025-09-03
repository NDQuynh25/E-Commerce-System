import * as React from "react";
import { Col, Row, Card, Collapse } from "antd";

import SectionProductDetail from "../../components/product/SectionProductDetail";
import "../../styles/page.product.css";
import ExpandableSection from "../../components/ExpandableSection";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchProduct } from "../../redux/slices/productSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { buyingGuideHTML } from "../../utils/constant";
import { RootState } from "../../redux/store";
import { callAddItemToCart } from "../../api/cartApi";

const Product: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const cartId = useAppSelector(
    (state: RootState) => state.auth.account_info.cartId
  );
  const userId = useAppSelector(
    (state: RootState) => state.auth.account_info.id
  );
  const product = useAppSelector((state: RootState) => state.product.result);

  useEffect(() => {
    if (true) {
      dispatch(fetchProduct({ id: id as string }));
    }
  }, []);

  const addItemToCart = async (product: any) => {
    if (cartId && userId) {
      const productId = product.id;
      const quantity = 1;
      const payload = {
        cartId: cartId,
        productId: productId,
        skuId: product.skus[0].id,
        quantity: quantity,
      };
      await callAddItemToCart(userId as string, payload);
    }
  };

  return (
    <div className="product">
      <div className="product__container">
        <div className="product__section-product-details">
          <SectionProductDetail product={product} />
        </div>

        <Row
          className="product__section-product-details"
          style={{
            display: "flex",
            marginTop: "50px",
          }}
        >
          <Col lg={17} md={24} sm={24} style={{ padding: "0 15px" }}>
            <Row
              style={{
                width: "100%",
                display: "flex",
                padding: "20px",
                gap: "20px",
                borderRadius: "10px",
                backgroundColor: "white",
              }}
            >
              <ExpandableSection title="MÔ TẢ SẢN PHẨM">
                <div
                  className="product-description"
                  dangerouslySetInnerHTML={{
                    __html: product?.description || "",
                  }}
                />
                <style>{`
                  .product-description p,
                  .product-description h1,
                  .product-description h2,
                  .product-description h3,
                  .product-description h4,
                  .product-description h5,
                  .product-description span {
                    all: unset;
                    display: revert;
                    font-weight: revert;
                    font-size: revert;
                    font-family: revert;
                    text-align: revert;
                    text-decoration: revert;
                    text-transform: revert;
                    letter-spacing: revert;
                    word-spacing: revert;
                    white-space: revert;
                    vertical-align: revert;
                    text-indent: revert;
                    text-shadow: revert;
                    text-rendering: revert;
                    box-sizing: revert;
                    border: revert;
                    border-radius: revert;
                    background: revert;
                    background-clip: revert;
                    background-image: revert;
                    background-origin: revert;
                    background-position: revert;
                    margin: revert;
                    padding: revert;
                    line-height: revert;
                    color: revert;
                  }
                  .product-description img {
                    max-width: 100% !important;
                    height: auto !important;
                    display: block;
                    margin: 0 auto;
                  }
                `}</style>
              </ExpandableSection>

              <ExpandableSection title="HƯỚNG DẪN MUA HÀNG">
                <div
                  className="product-description"
                  dangerouslySetInnerHTML={{
                    __html: buyingGuideHTML || "",
                  }}
                />
                <style>{`
                  .product-description p,
                  .product-description h1,
                  .product-description h2,
                  .product-description h3,
                  .product-description h4,
                  .product-description h5,
                  .product-description span {
                    all: unset;
                    display: revert;
                    font-weight: revert;
                    font-size: revert;
                    font-family: revert;
                    text-align: revert;
                    text-decoration: revert;
                    text-transform: revert;
                    letter-spacing: revert;
                    word-spacing: revert;
                    white-space: revert;
                    vertical-align: revert;
                    text-indent: revert;
                    text-shadow: revert;
                    text-rendering: revert;
                    box-sizing: revert;
                    border: revert;
                    border-radius: revert;
                    background: revert;
                    background-clip: revert;
                    background-image: revert;
                    background-origin: revert;
                    background-position: revert;
                    margin: revert;
                    padding: revert;
                    line-height: revert;
                    color: revert;
                  }
                  .product-description img {
                    max-width: 100% !important;
                    height: auto !important;
                    display: block;
                    margin: 0 auto;
                  }
                `}</style>
              </ExpandableSection>
            </Row>
          </Col>
          <Col lg={0} md={24} sm={24} style={{ height: "30px" }}></Col>
          <Col lg={7} md={24} sm={24} style={{ padding: "0 15px" }}>
            <Row
              style={{
                width: "100%",
                display: "flex",
                marginBottom: "30px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            >
              <div style={{ padding: "10px" }}>
                <h2 className="title-module">
                  <span style={{ fontSize: "21px", color: "black" }}>
                    Chỉ có tại Dola Furniture
                  </span>
                </h2>
                <div
                  style={{
                    gap: "10px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <p>
                    <span
                      style={{
                        padding: "2px 7px",
                        marginRight: "8px",

                        backgroundColor: "#fca120",
                        borderRadius: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      1
                    </span>
                    Giảm ngay 20.000đ khi Bạn tạo đơn hàng online
                  </p>
                  <p>
                    <span
                      style={{
                        padding: "2px 7px",
                        marginRight: "8px",
                        backgroundColor: "#fca120",
                        borderRadius: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      2
                    </span>
                    Nhiều ưu đãi khi trở thành thành viên của Dola
                  </p>
                  <p>
                    <span
                      style={{
                        padding: "2px 7px",
                        marginRight: "8px",
                        backgroundColor: "#fca120",
                        borderRadius: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      3
                    </span>
                    Nhân viên tư vấn và hỗ trợ nhiệt tình
                  </p>
                  <p>
                    <span
                      style={{
                        padding: "2px 7px",
                        marginRight: "8px",
                        backgroundColor: "#fca120",
                        borderRadius: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      4
                    </span>
                    Cam kết hàng chất lượng. Nói không với hàng kém chất lượng
                  </p>
                  <p>
                    <span
                      style={{
                        padding: "2px 7px",
                        marginRight: "8px",
                        backgroundColor: "#fca120",
                        borderRadius: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      5
                    </span>
                    Miễn phí đổi trả khi sản phẩm phẩm lỗi do sản xuất hoặc vận
                    chuyển
                  </p>
                </div>
              </div>
            </Row>
            <Row
              style={{
                width: "100%",
                display: "flex",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            >
              <div style={{ padding: "10px" }}>
                <h2 className="title-module">
                  <span style={{ fontSize: "21px", color: "black" }}>
                    Tin nổi bật
                  </span>
                </h2>
              </div>
            </Row>
          </Col>
        </Row>
        <div style={{ marginTop: "20px", height: "200px" }}></div>
      </div>
    </div>
  );
};

export default Product;
