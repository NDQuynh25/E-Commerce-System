import * as React from "react";
import SectionProductDetail from "../../components/product/SectionProductDetail";
import "../../styles/page.product.css";

const Product: React.FC = () => {
  return (
    <div className="product">
      <div className="product__container">
        <div className="product__section-product-details">
          <SectionProductDetail />
        </div>
        <div style={{ marginTop: "20px", height: "200px" }}></div>
      </div>
    </div>
  );
};

export default Product;
