import React, { ReactNode } from "react";
import SliderImage from "./SlideImage";
import "../../styles/modal.slider.css";

interface SliderProps {
    maxWidthImage?: string;
    imageUrls?: {
        desktop?: string;
        tablet?: string;
        tabletMini?: string;
        mobile?: string;
    };
    children?: ReactNode; // Nhận thêm nội dung con
}

const Slider: React.FC<SliderProps> = ({maxWidthImage = '100%', imageUrls, children }) => {
    return (
        <div className="slider">
            <div className="slider-container"> 
                <SliderImage imageUrls={imageUrls} maxWidthImage={maxWidthImage} />
                <div className="slider__content">
                    {children}  
                </div>
               
            </div>
        </div>
    );
};

export default Slider;
