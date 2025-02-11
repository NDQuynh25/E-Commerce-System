import React from "react";
import "../../styles/modal.slider.css";

interface SliderImageProps {
    maxWidthImage?: string;
    imageUrls?: {
        desktop?: string;
        tablet?: string;
        tabletMini?: string;
        mobile?: string;
    };
}

const SliderImage: React.FC<SliderImageProps> = ({maxWidthImage='100%', imageUrls }) => {
    return (
        <div className="slider-image">
            <picture style={{width: '100%', height: 'auto', objectFit: 'cover', justifyContent: 'center', alignItems: 'center'}}>
                <source media="(min-width: 1200px)" srcSet={imageUrls?.desktop} />
                <source media="(min-width: 768px) and (max-width: 1199px)" srcSet={imageUrls?.tablet} />
                <source media="(min-width: 567px) and (max-width: 767px)" srcSet={imageUrls?.tabletMini} />
                <source media="(max-width: 566px)" srcSet={imageUrls?.mobile} />
                
                <img 
                    style={{ maxWidth: maxWidthImage }}
                    src={imageUrls?.desktop} // Fallback nếu trình duyệt không hỗ trợ <picture>
                    alt="Slider"
                    className="img-responsive"
                />
            </picture>

        </div>
    );
};

export default SliderImage;
