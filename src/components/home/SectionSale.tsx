import React from "react";
import Slider from "../slider/Slider";
import SliderText from "../slider/SliderText";
import CarouselPoster from "../CarouselPoster";
import ProductItem from "../ProductItem";
import { useMediaQuery } from "react-responsive";
import "../../styles/modal.section.sale.css";


const SectionSale: React.FC = () => {
    const isSmallScreen = useMediaQuery({ maxWidth: 1200 }); // Kiểm tra nếu màn hình nhỏ hơn 1200px
    
    const slidesToShow = isSmallScreen ? 2 : 3; // Thay đổi số slides dựa trên kích thước màn hình

    
    const children = [
        <div className="section-sale__product-item">
            <ProductItem 
            image1="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangnoithatmohobansofa.jpg?v=1678770554273"
            image2="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangxamnoithatmohoban.jpg?v=1678770554273"
            link="#"
            />
        </div>,
        <div className="section-sale__product-item">
            <ProductItem 
            image1="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangnoithatmohobansofa.jpg?v=1678770554273"
            image2="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangxamnoithatmohoban.jpg?v=1678770554273"
            link="#"
            />
        </div>,
        <div className="section-sale__product-item">
            <ProductItem 
            image1="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangnoithatmohobansofa.jpg?v=1678770554273"
            image2="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangxamnoithatmohoban.jpg?v=1678770554273"
            link="#"
            />
        </div>,
         <div className="section-sale__product-item">
         <ProductItem 
         image1="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangnoithatmohobansofa.jpg?v=1678770554273"
         image2="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangxamnoithatmohoban.jpg?v=1678770554273"
         link="#"
         />
     </div>,
      <div className="section-sale__product-item">
      <ProductItem 
      image1="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangnoithatmohobansofa.jpg?v=1678770554273"
      image2="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangxamnoithatmohoban.jpg?v=1678770554273"
      link="#"
      />
  </div>,
   <div className="section-sale__product-item">
   <ProductItem 
   image1="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangnoithatmohobansofa.jpg?v=1678770554273"
   image2="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangxamnoithatmohoban.jpg?v=1678770554273"
   link="#"
   />
</div>,
 <div className="section-sale__product-item">
 <ProductItem 
 image1="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangnoithatmohobansofa.jpg?v=1678770554273"
 image2="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangxamnoithatmohoban.jpg?v=1678770554273"
 link="#"
 />
</div>
    ];

    return (
        <div>
            <Slider
                imageUrls={{
                    desktop: 'https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/background_module_flashsale.png?1727161994343',  
                    tablet: 'https://res.cloudinary.com/dbu3hnaiz/image/upload/v1739216253/g6k1m7cs_frbah2.png',
                    tabletMini: 'https://res.cloudinary.com/dbu3hnaiz/image/upload/v1739256444/rsc2yjmjl2mdklhaoy7e.png',
                    mobile: 'https://res.cloudinary.com/dbu3hnaiz/image/upload/v1739260557/eua7apg4hdlqsh3imsgs.png'
                }}
            >
                <div className="section-sale__content">
                    <div className="section-sale__product-list">
                        <CarouselPoster 
                            children={children} 
                            autoplay={true}
                            slidesToShow={slidesToShow}
                            slidesToScroll={1}
                        />
                    </div>
                    <div className='section-sale__text' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '20px'}}>
                        <SliderText 
                            title="Khuyến mãi đặc biệt"
                            description="--------------------------------------"
                            buttonText="Xem tất cả"
                            style={{display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
                        />
                    </div>
                </div>
            </Slider>

        </div>
    );
};
export default SectionSale;
