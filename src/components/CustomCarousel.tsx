import React from 'react';
import { Carousel } from 'antd';
import styled from 'styled-components';



interface IProps {
    children?: React.ReactNode[]
    autoplay?: boolean
    infinite?: boolean
    slidesToShow?: number
    slidesToScroll?: number
}


const CarouselWrapper = styled(Carousel)`

    z-index: 1000;
    > .slick-dots li button {
        margin-top: 15px !important;
        background: var(--orange); 
    }
    > .slick-dots li.slick-active button { 
        background: var(--orange);
    }
    > .slick-next {
        color: var(--orange);
        font-size: 100px !important;
    }
    > .slick-prev {
        color: var(--orange);
        font-size: 40px;
    }
   
`;

const CustomCarousel: React.FC<IProps> = (props: IProps) => {
    const { children, autoplay = false, infinite = true, slidesToScroll = 1, slidesToShow = 3 } = props;
    

    return (
        <>
        <CarouselWrapper autoplay={autoplay} arrows infinite={infinite} slidesToShow={slidesToShow} slidesToScroll={slidesToScroll}>
            {children?.map((item, index) => (
                <div key={index}>{item}</div>
            ))}
        
        </CarouselWrapper>
        </>
    );
}

export default CustomCarousel;
