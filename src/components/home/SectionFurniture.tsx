import CarouselProduct from '../CarouselProduct';
import Slider from '../slider/Slider';
import SliderText from '../slider/SliderText';
import ProductItem from '../ProductItem';
import { useMediaQuery } from 'react-responsive';
import React from 'react';
import '../../styles/modal.section.furniture.css';

interface IProps {
    imgURL?: string,
    title?: string,
    description?: string,
    buttonText?: string,
    href?: string,
    productData?: any[],
    reverse?: boolean

}

const SectionFurniture: React.FC<IProps> = ({
    imgURL = "https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/image_module_phongkhach.png?1727161994343",
    title = "Phòng khách",
    description = "Nhiều sản phẩm giúp phòng khách của bản trở nên phong phú hơn",
    buttonText = "Xem chi tiết",
    href = '#',
    productData, 
    reverse = false


}) => {
    
    const isSmallScreen = useMediaQuery({ maxWidth: 992 });
    const isDesktop = useMediaQuery({ minWidth: 1201 }); // > 1200px
    const isTablet = useMediaQuery({ minWidth: 992, maxWidth: 1200 }); // 992px - 1200px
    const isTabletMini = useMediaQuery({ minWidth: 768, maxWidth: 991 }); // 768px - 991px
    const isMobile = useMediaQuery({ maxWidth: 575 }); // < 576px
    const slidesToShow =  isDesktop ? 3 : isTablet ? 2 : isTabletMini ? 3 : 2; 

    return (
        <div className='section-furniture' style={{display: 'flex', justifyContent: 'center', alignSelf: 'start'}}>
            <div className='section-furniture__slider' style={{order: reverse ? 1 : 0, padding: slidesToShow === 3 ? '0 0.66666%' : '0 1%'}}>
                <Slider
                    imageUrls={
                        {
                            desktop: imgURL,
                            tablet: imgURL,
                            tabletMini: imgURL,
                            mobile: imgURL
                        }
                    }
                >
                    <div  
                        style={{ 
                            display: "flex", 
                            width: '100%', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            padding: '0% 9%'
                        }}
                    >
                        <SliderText
                            title={title}
                            description={description}
                            buttonText={buttonText}
                            href={href}
                            style={{
                                width: '100%', 
                                textAlign: 'center',  
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                flexDirection: 'column'
                            }}
                        />
                    </div> 
                </Slider>
            </div>
            <div className='section-furniture__carousel'>
                <CarouselProduct productData={[]} slidesToShow={slidesToShow} />

            </div>
        </div>
    );
};
export default SectionFurniture;