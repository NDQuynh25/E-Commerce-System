

import React from 'react';
import Slider from '../slider/Slider';
import SliderText from '../slider/SliderText';
import { useMediaQuery } from 'react-responsive';



const SectionSlider: React.FC = () => {
    
    const isSmallScreen = useMediaQuery({ maxWidth: '992px' }); // Kiểm tra màn hình nhỏ hơn 1200px

    return (
        <div className="section-slider">
            <Slider
                
                imageUrls={{
                    desktop: 'https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/slider_1.jpg?1727161994343',
                    tablet: 'https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/slider_1.jpg?1727161994343',
                    tabletMini: 'https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/slider_1.jpg?1727161994343',
                    mobile: 'https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/slider_mb_1.jpg?1727161994343',
                    
                }}
            >
                {!isSmallScreen && (
                    <div style={{display: 'flex', width: '100%', justifyContent: 'left', alignItems: 'center', paddingLeft: '8%'}}> 
                        <SliderText
                            title="Nội thất phòng khách"
                            description="Giảm đến 50% khi đặt qua website"
                            buttonText="Xem ngay"
                            
                        />
                    </div>
                )}
            </Slider>
        </div>
    );
};
export default SectionSlider;