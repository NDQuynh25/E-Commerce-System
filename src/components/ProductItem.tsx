import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const ProductCard = styled.div`
    width: 100%;
    border: 1px solid #0000;
    border-radius: 8px;
    overflow: hidden;
    text-align: left;
    margin: 0%;
    background-color: white;
    
    font-family: Arial, sans-serif;
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* Hiệu ứng hover */

    &:hover {
        transform: translateY(-3px); /* Nổi lên */
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Thêm đổ bóng */
        border-color: #d1d1d1; /* Thay đổi màu viền khi hover */
    }

    a {
        display: block; /* Đảm bảo NavLink bao phủ toàn bộ sản phẩm */
        text-decoration: none;
        color: inherit;
        height: 100%;
    }

    .product-image {
        position: relative;
        width: 100%;
        
        img {
            width: 100%;
            height: auto;
            aspect-ratio: 3 / 3.3;
            object-fit: cover;
            transition: transform 0.3s ease; /* Thêm hiệu ứng ảnh */
        }

        &:hover img {
            transform: scale(1.05); /* Phóng to nhẹ ảnh khi hover */
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
    link?: string;
}

const ProductItem = (props: ProductItemProps) => {
    const { image, link = '#' } = props;
    return (
        <ProductCard>
            <NavLink to={link}>
                <div className="product-image">
                    <img src={image} alt="Quần jeans nữ" />
                    <div className="badge">Giá tốt</div>
                </div>
                <div className="product-info">
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
                    <div className="product-name">
                        Quần jeans nữ cotton cài cúc dáng suông
                    </div>
                    <div className="product-price">399.000 đ</div>
                </div>
            </NavLink>
        </ProductCard>
    );
};

export default ProductItem;
