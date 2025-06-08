import * as React from "react";
import { Col, Row, Card, Collapse } from "antd";

import SectionProductDetail from "../../components/product/SectionProductDetail";
import "../../styles/page.product.css";
import ExpandableSection from "../../components/ExpandableSection";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchProduct } from "../../redux/slices/productSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const buyingGuideHTML = `
<p><strong>Bước 1:</strong>&nbsp;Truy cập website v&agrave; lựa chọn sản phẩm&nbsp;cần mua</p>
<p><strong>Bước 2:</strong>&nbsp;Click v&agrave; sản phẩm muốn mua, m&agrave;n h&igrave;nh hiển thị ra pop up với c&aacute;c lựa chọn sau</p>
<p>Nếu bạn muốn tiếp tục mua h&agrave;ng: Bấm v&agrave;o phần tiếp tục mua h&agrave;ng để lựa chọn th&ecirc;m sản phẩm v&agrave;o giỏ h&agrave;ng</p>
<p>Nếu bạn muốn xem giỏ h&agrave;ng để cập nhật sản phẩm: Bấm v&agrave;o xem giỏ h&agrave;ng</p>
<p>Nếu bạn muốn đặt h&agrave;ng v&agrave; thanh to&aacute;n cho sản phẩm n&agrave;y vui l&ograve;ng bấm v&agrave;o: Đặt h&agrave;ng v&agrave; thanh to&aacute;n</p>
<p><strong>Bước 3:</strong>&nbsp;Lựa chọn th&ocirc;ng tin t&agrave;i khoản thanh to&aacute;n</p>
<p>Nếu bạn đ&atilde; c&oacute; t&agrave;i khoản vui l&ograve;ng nhập th&ocirc;ng tin t&ecirc;n đăng nhập l&agrave; email v&agrave; mật khẩu v&agrave;o mục đ&atilde; c&oacute; t&agrave;i khoản tr&ecirc;n hệ thống</p>
<p>Nếu bạn chưa c&oacute; t&agrave;i khoản v&agrave; muốn đăng k&yacute; t&agrave;i khoản vui l&ograve;ng điền c&aacute;c th&ocirc;ng tin c&aacute; nh&acirc;n để tiếp tục đăng k&yacute; t&agrave;i khoản. Khi c&oacute; t&agrave;i khoản bạn sẽ dễ d&agrave;ng theo d&otilde;i được đơn h&agrave;ng của m&igrave;nh</p>
<p>Nếu bạn muốn mua h&agrave;ng m&agrave; kh&ocirc;ng cần t&agrave;i khoản vui l&ograve;ng nhấp chuột v&agrave;o mục đặt h&agrave;ng kh&ocirc;ng cần t&agrave;i khoản</p>
<p><strong>Bước 4:</strong>&nbsp;Điền c&aacute;c th&ocirc;ng tin của bạn để nhận đơn h&agrave;ng, lựa chọn h&igrave;nh thức thanh to&aacute;n v&agrave; vận chuyển cho đơn h&agrave;ng của m&igrave;nh</p>
<p><strong>Bước 5:</strong>&nbsp;Xem lại th&ocirc;ng tin đặt h&agrave;ng, điền ch&uacute; th&iacute;ch v&agrave; gửi đơn h&agrave;ng</p>
<p>Sau khi nhận được đơn h&agrave;ng bạn gửi ch&uacute;ng t&ocirc;i sẽ li&ecirc;n hệ bằng c&aacute;ch gọi điện lại để x&aacute;c nhận lại đơn h&agrave;ng v&agrave; địa chỉ của bạn.</p>
<p>Tr&acirc;n trọng cảm ơn.</p>
`;
const Product: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const product = useAppSelector((state) => state.product.result);

  useEffect(() => {
    if (true) {
      dispatch(fetchProduct({ id: id as string }));
    }
  }, []);
  useEffect(() => {
    console.log(product);
  }, [product]);
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
