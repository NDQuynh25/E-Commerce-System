import React from 'react';
import styled from 'styled-components';

// Styled Components
const ProductCard = styled.div`
    width: 15%;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    overflow: hidden;
    text-align: left;
    margin: 0.8%;
    font-family: Arial, sans-serif;

    .product-image {
      position: relative;
      width: 100%;
      
      img {
        width: 100%;
        aspect-ratio: 3 / 4;
      }
      .badge {
        position: absolute;
        top: 8px;
        right: 8px;
        background-color: #fadb5f;
        color: #000;
        font-size: 12px;
        padding: 4px 8px;
        border-radius: 4px;
        font-weight: bold;
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
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .product-price {
        font-size: 16px;
        font-weight: bold;
        color: #000;
      }
    }
`;
interface ProductItemProps {
    image: string;
}

const ProductItem = (props: ProductItemProps) => {
    const { image } = props;
    return (
      <ProductCard>
          {/* Product Image */}
          <div className="product-image">
              <img src={image} alt="Quần jeans nữ" />
              <div className="badge">Giá tốt</div>
          </div>

          {/* Product Info */}
          <div className="product-info">
              {/* Color Options */}
              <div className="color-options">
                  <div
                      className="color-circle"
                      style={{ backgroundColor: '#7DA0CA' }}
                  ></div>
                  <div
                      className="color-circle"
                      style={{ backgroundColor: '#44688C' }}
                  ></div>
              </div>

              {/* Product Name */}
              <div className="product-name">
                  Quần jeans nữ cotton cài cúc dáng suông
              </div>

              {/* Product Price */}
              <div className="product-price">399.000 đ</div>
          </div>
      </ProductCard>
    );
};

export default ProductItem;
