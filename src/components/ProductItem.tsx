import { Button } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const ProductCard = styled.div`
  width: 100%;

  border-radius: 8px;
  overflow: hidden;
  text-align: left;
  margin: 0%;
  background-color: white;

  font-family: Arial, sans-serif;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Hiệu ứng hover */

  a {
    display: block; /* Đảm bảo NavLink bao phủ toàn bộ sản phẩm */
    text-decoration: none;
    color: inherit;
    height: 100%;
  }

  .product-image {
    position: relative;
    border-radius: 8px;
    width: 100%;
    padding-bottom: 100%;
    overflow: hidden;

    .product-image-1 {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 1;
      will-change: opacify;
      transform: scale(1);
      object-fit: cover;
      transition: all 1s ease;
    }
    .product-image-2 {
      width: 100%;
      position: absolute;
      top: 0;
      border-radius: 8px;
      left: 0;
      opacity: 0;
      visibility: hidden;
      will-change: opacify;
      transform: scale(1);
      object-fit: cover;
      overflow: hidden;
    }

    .badge {
      position: absolute;
      top: 8px;
      left: 10px;
    }
    .favourite {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 20px;
      height: 20px;
    }

    .content-overlay {
      position: absolute;
      display: flex;
      margin: 0;
      padding: 0;
      align-items: center;
      gap: 5px;
      justify-content: center;
      bottom: -10px;
      width: 100%;
      transition: all 0.5s ease;
      opacity: 0;
      z-index: 1;
    }

    .btn {
      width: 35px;
      height: 35px;
      background-color: #fff;
      border: none;
      border-radius: 5px;
    }
    .btn:hover {
      background-color: var(--yellow);
    }
  }

  .product-info {
    padding: 10px;

    .color-options {
      display: flex;
      margin-bottom: 8px;

      .color-circle {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        margin-right: 5px;
        border: 1px solid #ddd;
        cursor: pointer;
      }
    }

    .product-name {
      font-size: 14px;
      color: #333;
      margin: 5px 0;
      display: -webkit-box;
      -webkit-line-clamp: 2; /* Giới hạn tối đa 2 dòng */
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-word; /* Đảm bảo từ dài không bị tràn */
    }

    .product-price {
      display: flex;

      flex-wrap: wrap;
      justify-content: left;
      gap: 8px;

      span {
        color: var(--red) !important;
        font-size: 16px;
        font-weight: bold;
      }
      p {
        font-size: 14px;
        color: #999;
        text-decoration: line-through;
      }
    }
  }

  &:hover {
    transform: translateY(-3px); /* Nổi lên */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Thêm đổ bóng */
    border-color: #d1d1d1; /* Thay đổi màu viền khi hover */
    border-radius: 8px !important;

    .product-image-1 {
      opacity: 0;
      transition: all 0.3s ease;
      transform: scale(0.95);
      object-fit: cover;
      border-radius: 8px !important;
    }
    .product-image-2 {
      opacity: 1;
      transition: all 0.6s ease;
      transform: scale(1.2);
      visibility: visible;
      object-fit: cover;
      border-radius: 8px !important;
    }
    .content-overlay {
      bottom: 10px;
      opacity: 1;
    }
  }
`;

interface ProductItemProps {
  image1: string;
  image2: string;
  link?: string;
}

const ProductItem: React.FC<ProductItemProps> = (props: ProductItemProps) => {
  const { image1, image2, link = "/login" } = props;

  const addToCart = () => void {};
  return (
    <NavLink to={link}>
      <ProductCard>
        <div className="product-image">
          <img className="product-image-1" src={image1} alt="Quần jeans nữ" />
          <img className="product-image-2" src={image2} alt="" />
          <div className="badge">
            <img style={{ width: "38px" }} src="sale-tag.svg" alt="Sale" />
          </div>
          <div className="favourite">
            <Button
              style={{
                width: "20px",
                height: "20px",
                padding: "0",
                backgroundColor: "transparent",
                border: "none",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000"
                stroke-width="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </Button>
          </div>

          <div className="content-overlay">
            <Button className="btn">
              <img style={{ width: "18px" }} src="basket.svg" />
            </Button>
            <Button className="btn">
              <img style={{ width: "18px" }} src="search.svg" />
            </Button>
          </div>
        </div>
        <div className="product-info">
          <div className="product-name">
            <span style={{ fontWeight: "500" }}>
              Quần jeans nữ cotton cài cúc dáng suông
            </span>
          </div>
          <div className="product-price">
            <span>319.000₫</span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <p>399.000₫</p>
              <div
                className="sale-off"
                style={{
                  backgroundColor: "#FEEEEA",
                  width: "30px",
                  height: "14px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <p
                  style={{
                    fontSize: "10px",
                    padding: "0px 0px",
                    color: "red",
                    textDecoration: "none",
                  }}
                >
                  -20%
                </p>
              </div>
            </div>
          </div>
        </div>
      </ProductCard>
    </NavLink>
  );
};

export default ProductItem;
