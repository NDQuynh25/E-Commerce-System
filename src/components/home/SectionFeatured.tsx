import React from "react";
import { useState } from "react";
import { Col, Row, Menu, Button } from "antd";
import { Link } from "react-router-dom";
import ProductItem from "../ProductItem";
import '../../styles/modal.section.featured.css';

const SectionFeatured: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imgTab, setImgTab] = React.useState<string>("https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/image_1_allpro1.png?1727161994343");

    // Danh sách mục
    const items = [
        { img: "https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/title_image_1_allpro1.png?1727161994343", imgTab: "https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/image_1_allpro1.png?1727161994343", alt: "Bàn", label: "Bàn" },
        { img: "https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/title_image_2_allpro1.png?1727161994343", imgTab: "https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/image_2_allpro1.png?1727161994343", alt: "Ghế", label: "Ghế" },
        { img: "https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/title_image_3_allpro1.png?1727161994343", imgTab: "https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/image_3_allpro1.png?1727161994343", alt: "Tủ", label: "Tủ" },
        { img: "https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/title_image_4_allpro1.png?1727161994343", imgTab: "https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/image_4_allpro1.png?1727161994343", alt: "Kệ", label: "Kệ" },
        { img: "https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/title_image_5_allpro1.png?1727161994343", imgTab: "https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/image_5_allpro1.png?1727161994343", alt: "Đèn", label: "Đèn" },
    ];
    
    return (
        <div className="section-featured">
            <div className="section-featured-container" >

                <div className="section-featured-title">
                    <h2 className="title-module"><a href="#">Sản phẩm nổi bật</a></h2>

                </div>
                <div className="section-featured-content">
                    <Row >

                        <Col xl={7} lg={7} md={24} sm={24} xs={24}>
                            <ul className="section-featured-list">
                                {items.map((item, index) => (
                                    <li
                                        key={index}
                                        className={`section-featured-item ${currentIndex === index ? "featured-item-current" : ""}`}
                                        onClick={() => {
                                            setCurrentIndex(index);
                                            setImgTab(item.imgTab);
                                        }}
                                         // Xử lý click
                                    >
                                        <Link to="#" className="section-featured-item-link">
                                            <img src={item.img} alt={item.alt} />
                                            <span>{item.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Col>
                        <Col xl={17} lg={17} md={24} sm={24} xs={24}>
                            <div className="section-featured-img image-effect">
                                <Link to="#">
                                    <img alt="Dola Furniture" src={imgTab}/>
                                </Link>
                            </div>
                        </Col>
                        
                    </Row>
                    <Row style={{marginTop: '15px', marginBottom: '15px'}}>
                        <div className="section-featured__product-list" style={{display: 'flex', width: '100%', flexWrap: 'wrap'}}> 
                            <div className="section-featured__product-item">
                                <ProductItem 
                                image1="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangnoithatmohobansofa.jpg?v=1678770554273"
                                image2="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangxamnoithatmohoban.jpg?v=1678770554273"
                                link="#"
                                />
                            </div>
                            <div className="section-featured__product-item">
                                <ProductItem 
                                image1="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangnoithatmohobansofa.jpg?v=1678770554273"
                                image2="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangxamnoithatmohoban.jpg?v=1678770554273"
                                link="#"
                                />
                            </div>
                            <div className="section-featured__product-item">
                                <ProductItem 
                                image1="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangnoithatmohobansofa.jpg?v=1678770554273"
                                image2="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangxamnoithatmohoban.jpg?v=1678770554273"
                                link="#"
                                />
                            </div>
                            <div className="section-featured__product-item">
                                <ProductItem 
                                image1="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangnoithatmohobansofa.jpg?v=1678770554273"
                                image2="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangxamnoithatmohoban.jpg?v=1678770554273"
                                link="#"
                                />
                            </div>
                            <div className="section-featured__product-item">
                                <ProductItem 
                                image1="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangnoithatmohobansofa.jpg?v=1678770554273"
                                image2="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangxamnoithatmohoban.jpg?v=1678770554273"
                                link="#"
                                />
                            </div>
                           
                            
                            

                        </div>
                        <div style={{display: 'flex', justifyContent: 'center', width: '100%', marginTop: '10px'}} >
                            <Button className="section-featured__btn" size="large"><p>Xem tất cả</p></Button>
                        </div>
                 
                       
                    </Row>
                </div>
            </div>
            
        </div>
    )
}

export default SectionFeatured;