
import React from 'react';
import SectionCategory from '../../components/home/SectionCategory';
import SectionAbout from '../../components/home/SectionAbout';

import '../../styles/page.home.css';
import SectionFeatured from '../../components/home/SectionFeatured';
import SectionSale from '../../components/home/SectionSale';
import SectionSlider from '../../components/home/SectionSlider';
import SectionFurniture from '../../components/home/SectionFurniture';

const HomePage: React.FC = () => {

    return (
        <div className="homepage">
            <div className='homepage-container'>
            
                <div className="homepage-body">
                    <div className='homepage-section-slider'>
                        <SectionSlider/>
                    </div>
                    <div className="homepage-section-category">
                        <SectionCategory/>
                    </div>
                    <div className="homepage-section-about">
                        <SectionAbout/>
                    </div>
                    <div className="homepage-section-featured">
                        <SectionFeatured/>
                    </div>
                    <div className="homepage-section-sale">
                        <SectionSale/>
                    </div>
                    <div className='homepage-section-furniture'>
                        <SectionFurniture
                            imgURL='https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/image_module_phongkhach.png?1727161994343'
                            title='Nội thất phòng khách'
                            description='Nhiều sản phẩm giúp phòng khách của bạn trở nên phong phú hơn'
                            buttonText='Xem ngay'
                            href='#'
                        />
                    </div>
                    <div className='homepage-section-furniture'>
                        <SectionFurniture
                            imgURL='https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/image_module_phongngu.png?1727161994343'
                            title='Nội thất phòng ngủ'
                            description='Nhiều sản phẩm giúp căn phòng của bạn trở nên ấm cúng hơn'
                            buttonText='Xem ngay'
                            href='#'
                            reverse={true}
                        />
                    </div>
                    <div className='homepage-section-furniture'>
                        <SectionFurniture
                            imgURL='https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/image_module_phongbep.png?1727161994343'
                            title='Nội thất phòng bếp'
                            description='Nhiều sản phẩm có thể giúp các thành viên trong gia đình vui vẻ xum vầy'
                            buttonText='Xem ngay'
                            href='#'
                        />
                    </div>
                </div>
            </div>
        </div>
             
        
    );
};

export default HomePage;