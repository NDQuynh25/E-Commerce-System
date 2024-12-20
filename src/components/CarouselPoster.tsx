import React from 'react';
import { Carousel } from 'antd';
import styled from 'styled-components';
import ProductItem from './ProductItem';

const contentStyle: React.CSSProperties = {
    height: '270px',
    
    color: 'black',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
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

const CarouselPoster: React.FC = () => (
    <CarouselWrapper autoplay={false} arrows infinite={false} className="custom-carousel">
        {/* <div >
            <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                <img src='poster-4.jpg' alt='poster1' style={{height:"270px"}}/>
                <img src='poster-1.jpg' alt='poster1' style={{height:"270px"}}/>
                <img src='poster-2.jpg' alt='poster1' style={{height:"270px"}}/>
                
               
                
            </div>  
        </div> */}
        <div>
            <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                <ProductItem 
                    image='image 37.png'
                />
                <ProductItem
                    image='test2.jpg'
                />
                <ProductItem
                    image='test2.jpg'
                />
                <ProductItem
                    image='test2.jpg'
                />
                <ProductItem
                    image='test2.jpg'
                />
                <ProductItem
                    image='test2.jpg'
                />
            </div>
        </div>
        <div>
            <ProductItem
                image='test2.jpg'
            />
        </div>
        <div>
        <h3 style={contentStyle}>4</h3>
        </div>
    </CarouselWrapper>
    );

export default CarouselPoster;
