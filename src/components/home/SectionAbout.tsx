import React from "react";
import CarouselPoster from "../CarouselPoster";
import '../../styles/modal.section.about.css';

const children = [
    <div className="section-about-item-policy-item">
        <div className="section-about-item-policy-item-icon" style={{width: "60px", height: "60px", marginBottom: "10px"}}>
            <img src="https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/chinhsach_1.png?1727161994343" data-src="//bizweb.dktcdn.net/100/480/479/themes/900388/assets/chinhsach_1.png?1727161994343" alt="Miễn phí vẫn chuyển" data-was-processed="true"/>
        </div>
        <div className="section-about-item-policy-item-content">
            <h3>Miễn phí vận chuyển</h3>
            <p>Cho tất cả đơn hàng trong nội thành Hà Nội</p>
        </div>
    </div>,
    <div className="section-about-item-policy-item">
        <div className="section-about-item-policy-item-icon" style={{width: "60px", height: "60px", marginBottom: "10px"}}>
            <img src="https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/chinhsach_2.png?1727161994343" data-src="//bizweb.dktcdn.net/100/480/479/themes/900388/assets/chinhsach_2.png?1727161994343" alt="Miễn phí đổi - trả" data-was-processed="true"/>
        </div>
        <div className="section-about-item-policy-item-content">
            <h3>Miễn phí đổi - trả</h3>
            <p>Đối với sản phẩm lỗi sản xuất hoặc vận chuyển</p>
        </div>
    </div>,
    <div className="section-about-item-policy-item">
        <div className="section-about-item-policy-item-icon" style={{width: "60px", height: "60px", marginBottom: "10px"}}>
            <img src="//bizweb.dktcdn.net/100/480/479/themes/900388/assets/chinhsach_3.png?1727161994343" data-src="//bizweb.dktcdn.net/100/480/479/themes/900388/assets/chinhsach_3.png?1727161994343" alt="Hỗ trợ nhanh chóng" data-was-processed="true"/>
        </div>
        <div className="section-about-item-policy-item-content" >
            <h3>Hỗ trợ nhanh chóng</h3>
            <p>Gọi Hotline: <a href="tel:19006750">19006750</a> để được hỗ trợ ngay</p>
        </div>
    </div>
]

const SectionAbout: React.FC = () => {
    
    return (
        <div className="section-about">
            <div className="section-about-container" >
                
                <div className="section-about-item" style={{backgroundColor: "black", display: "inline-block", height: "100%"}}>
                    <div className="section-about-item-about" style={{backgroundColor: "black"}}>
                    
                        <p>Về chúng tôi</p>
                        <h2>Dola Furniture</h2>
                        <span>Với mong muốn phát triển thương hiệu Việt bằng nội lực, Dola Furniture đã chú trọng vào thiết kế và sản xuất nội thất trong nước. Danh mục sản phẩm của Dola Furniture thường xuyên được đổi mới và cập nhật, liên tục cung cấp cho khách hàng các dòng sản phẩm theo xu hướng mới nhất.</span>
                        
                    </div>
                    <div className="section-about-item-policy" style={{backgroundColor: "black"}}>
                        <CarouselPoster children={children}/>
                    </div>
                </div>
                <div className="section-about-item image-effect">
                    <img   src="//bizweb.dktcdn.net/100/480/479/themes/900388/assets/about_image.png?1727161994343" data-src="//bizweb.dktcdn.net/100/480/479/themes/900388/assets/about_image.png?1727161994343" alt="Dola Furniture" data-was-processed="true"/>
                </div>
            </div>
            
        </div>
    )
}
export default SectionAbout;