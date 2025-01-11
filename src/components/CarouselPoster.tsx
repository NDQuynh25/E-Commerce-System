import React from 'react';
import { Carousel } from 'antd';
import styled from 'styled-components';



interface IProps {
    image?: string[];
    height?: string;
    width?: string;
}


const CarouselWrapper = styled(Carousel)`
    > .slick-dots li button {
        
        background: black; 
    }
    > .slick-dots li.slick-active button { 
        background: black;
    }
    > .slick-next {
        color: black;
        font-size: 20px;
    }
    > .slick-prev {
        color: black;
        font-size: 20px;
    }
`;

const CarouselPoster: React.FC<IProps> = (props: IProps) => {
    const { image, height = "270px", width = "100%" } = props;
    

    return (
        <>
        <CarouselWrapper autoplay={true} arrows infinite={true} className="custom-carousel" slidesToShow={1} slidesToScroll={1}>
            {image?.map((item, index) => (
                <div key={index}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: height, width: width, overflow: 'hidden' }}>
                        <img src={item} alt="poster" style={{height: "100%", width: "100%", objectFit: 'cover'}} />
                    </div>
                </div>
            ))}
        
        </CarouselWrapper>
        </>
    );
}

export default CarouselPoster;
