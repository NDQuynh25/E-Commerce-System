import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "../../styles/modal.section.category.css";
const CategoryWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 10px 10px 10px;
    margin: 5px 5px 5px 5px;
    background: #fff;
    border-radius: 5px;
    overflow: hidden;
    width: 100%;
    overflow: hidden;
    .category-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
       
        width: 100%;
        
        

    }

    .category-item__text {
        font-size: 16px;
        font-weight: 500;
        line-height: 1.4;
        font-family: 'Commissioner', sans-serif;
        display: flex;
        flex-direction: column;
        min
    }

    .category-item__image {
        height: 80px;
        position: relative;
      
        transition: all 1s ease;
        right: -20px;
        overflow: hidden;
    }
    .category-item:hover .category-item__image {
        right: 0;
            
    }
    .category-item:hover span {
        color: #ff6600 !important;
    }

`;

// ✅ Component hiển thị từng danh mục sản phẩm
interface CategoryItemProps {
    imageURL: string;
    title: string;
    quantity: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({imageURL, title, quantity}) => {
    return (
        <CategoryWrapper>
            <Link to="/category" style={{textDecoration: 'none', color: 'black', width: '100%'}}>
                <div className="category-item">
                    <div className="category-item__text">
                        <span>{title}</span>
                        <span>({quantity} sản phẩm)</span>  
                    </div>
                    <div className="category-item__image">
                        <img src={imageURL} alt={title}/>
                    </div>
                </div>
            </Link>
        </CategoryWrapper>
    );
};

// ✅ Component hiển thị danh sách danh mục
const SectionCategory: React.FC = () => {
    const [categories, setCategories] = React.useState<CategoryItemProps[]>([
        {title: 'Ghế', quantity: '50', imageURL: 'https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/danhmuc_1.jpg?1727161994343'},
        {title: 'Bàn', quantity: '50', imageURL: 'https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/danhmuc_2.jpg?1727161994343'},
        {title: 'Giường ngủ', quantity: '50', imageURL: 'https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/danhmuc_3.jpg?1727161994343'},
        {title: 'Đèn', quantity: '50', imageURL: 'https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/danhmuc_4.jpg?1727161994343'},
        {title: 'Kệ để giày', quantity: '50', imageURL: 'https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/danhmuc_5.jpg?1727161994343'},
        {title: 'Sofa', quantity: '50', imageURL: 'https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/danhmuc_6.jpg?1727161994343'},
        {title: 'Bàn', quantity: '50', imageURL: 'https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/danhmuc_7.jpg?1727161994343'},
        {title: 'Kệ tivi', quantity: '50', imageURL: 'https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/danhmuc_8.jpg?1727161994343'},
        {title: 'Tủ quần áo', quantity: '50', imageURL: 'https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/danhmuc_9.jpg?1727161994343'}
    ]);

        
    return (
        <div className="section-category" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className="section-category-container" style={{display: 'flex', flexWrap: 'wrap' ,justifyContent: 'center', alignItems: 'center'}}>
                {categories.map((category, index) => (
                    <div className="section-category-item" key={index}>
                        <CategoryItem title={category.title} quantity={category.quantity} imageURL={category.imageURL}/>
                    </div>
                ))}
                
            </div>
        </div>
    );
};

export default SectionCategory;
