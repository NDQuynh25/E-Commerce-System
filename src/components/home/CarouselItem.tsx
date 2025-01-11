import React from 'react';
import { Carousel } from 'antd';
import styled from 'styled-components';
import ProductItem from './../ProductItem';


interface IProps {
    image?: string[];
    height?: string;
    width?: string;
    slidesToShow?: number;
    slidesToScroll?: number;
}
const CarouselWrapper = styled(Carousel)`
    > .slick-dots li button {
        display: none;
        background: black; 
    }
    > .slick-dots li.slick-active button { 
        background: black;
        display: none;
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

const ProductWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 92%;
    height: 100%;
    margin: 4%;
    //border: 1px solid red;
`;

const CarouselItem: React.FC<IProps> = (props: IProps) => {
    const { image, height = "270px", width = "100%", slidesToShow, slidesToScroll } = props;
    
    return (
        <CarouselWrapper autoplay={false} arrows infinite={false} className="custom-carousel" slidesToShow={slidesToShow} slidesToScroll={slidesToScroll}>
            <div>
               <ProductWrapper>
                    <ProductItem 
                        image='image 37.png'
                    />
                </ProductWrapper>

            </div>
            <div>
                <ProductWrapper>
                    <ProductItem 
                        image='test2.webp'
                    />
                </ProductWrapper>
            </div>
            <div>
                <ProductWrapper>
                    <ProductItem 
                        image='image 37.png'
                    />
                </ProductWrapper>
            </div>
            <div>
                <ProductWrapper>
                    <ProductItem 
                        image='image 37.png'
                    />
                </ProductWrapper>
            </div>
            <div>
                <ProductWrapper>
                    <ProductItem 
                        image='image 37.png'
                    />
                </ProductWrapper>
            </div>
            <div>
                <ProductWrapper>
                    <ProductItem 
                        image='image 37.png'
                    />
                </ProductWrapper>
            </div>
            <div>
                <ProductWrapper>
                    <ProductItem 
                        image='image 37.png'
                    />
                </ProductWrapper>
            </div>
            <div>
                <ProductWrapper>
                    <ProductItem 
                        image='image 37.png'
                    />
                </ProductWrapper>
            </div>
            <div>
                <ProductWrapper>
                    <ProductItem 
                        image='image 37.png'
                    />
                </ProductWrapper>
            </div>
            <div>
                <ProductWrapper>
                    <ProductItem 
                        image='image 37.png'
                    />
                </ProductWrapper>
            </div>
        
        </CarouselWrapper>
    );
};

export default CarouselItem;
