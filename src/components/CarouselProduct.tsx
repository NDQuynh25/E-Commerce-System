import * as React from "react";
import CarouselPoster from "./CustomCarousel";
import ProductItem from "./ProductItem";
import "../styles/modal.carousel.product.css";

interface IProps {
  productData?: any[];
  children?: React.ReactNode[];
  autoplay?: boolean;
  infinite?: boolean;
  slidesToShow?: number;
  slidesToScroll?: number;
}

const CarouselProduct: React.FC<IProps> = ({
  productData,
  children,
  autoplay = false,
  infinite = true,
  slidesToShow = 3,
  slidesToScroll = 1,
}) => {
  const items = [
    <div className="carousel-product__product-item">
      <ProductItem
        image1="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangnoithatmohobansofa.jpg?v=1678770554273"
        image2="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangxamnoithatmohoban.jpg?v=1678770554273"
        link="#"
      />
    </div>,
    <div className="carousel-product__product-item">
      <ProductItem
        image1="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangnoithatmohobansofa.jpg?v=1678770554273"
        image2="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangxamnoithatmohoban.jpg?v=1678770554273"
        link="#"
      />
    </div>,
    <div className="carousel-product__product-item">
      <ProductItem
        image1="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangnoithatmohobansofa.jpg?v=1678770554273"
        image2="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangxamnoithatmohoban.jpg?v=1678770554273"
        link="#"
      />
    </div>,
    <div className="carousel-product__product-item">
      <ProductItem
        image1="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangnoithatmohobansofa.jpg?v=1678770554273"
        image2="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangxamnoithatmohoban.jpg?v=1678770554273"
        link="#"
      />
    </div>,
  ];

  return <CarouselPoster children={items} slidesToShow={slidesToShow} />;
};
export default CarouselProduct;
