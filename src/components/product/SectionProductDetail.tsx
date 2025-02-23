import * as React from "react";
import { Button, Image, Row, Rate, Input, InputNumber } from "antd";
import { Col } from "antd";
import CustomCarousel from "../CustomCarousel";
import { useMediaQuery } from 'react-responsive';
import "../../styles/product/modal.section.product.detail.css";
import StarRating from "../StarRating";




const SectionProductDetail: React.FC = () => {

    const isScreenMD = useMediaQuery({ query: '(max-width: 768px)' });
    const isScreenSM = useMediaQuery({ query: '(max-width: 576px)' });
    const slidesToShow = isScreenSM ? 3 : isScreenMD ? 4 : 5;
    const [quantity, setQuantity] = React.useState<number>(1);



    const items = [
        <div className="section-product-details__content-thumbnail-item">
            <Button className="section-product-details__content-btn" >
                <img
                    src="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangxamnoithatmohoban.jpg?v=1678770554273"
                />
            </Button>
        </div>,
        <div className="section-product-details__content-thumbnail-item">
            <Button className="section-product-details__content-btn" >
                <img
                    src="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangxamnoithatmohoban.jpg?v=1678770554273"
                />
            </Button>
        </div>,
        <div className="section-product-details__content-thumbnail-item">
            <Button className="section-product-details__content-btn" >
                <img
                    src="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangxamnoithatmohoban.jpg?v=1678770554273"
                />
            </Button>
        </div>,
        <div className="section-product-details__content-thumbnail-item">
            <Button className="section-product-details__content-btn" >
                <img
                    src="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangxamnoithatmohoban.jpg?v=1678770554273"
                />
            </Button>
        </div>,
        <div className="section-product-details__content-thumbnail-item">
            <Button className="section-product-details__content-btn" >
                <img
                    src="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangxamnoithatmohoban.jpg?v=1678770554273"
                />
            </Button>
        </div>,
        
    
       
        

       
    ]

    const onChangeQuantity = (value: any): void => {
        setQuantity(value);
    }

    return (
        <div className="section-product-details">
            <div className="section-product-details__container" >
                <Row>
                <Col xl={12} lg={12} md={24} sm={24} xs={24} style={{padding: "0 15px"}}>
                    <div className="section-product-details__content-image">
                        <Image
                            src="https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangxamnoithatmohoban.jpg?v=1678770554273"
                        />
                    </div>
                    <div style={{display: "flex", justifyContent: "center", width: "100%", backgroundColor: "#fff", marginTop: "10px", borderRadius: "8px", padding: '5px 0px'}}>
                        <div className="section-product-details__content-thumbnail">
                            <CustomCarousel children={items} slidesToShow={slidesToShow}/>
                        </div>
                    </div>
                </Col>
    
                <Col xl={12} lg={12} md={24} sm={24} xs={24} style={{padding: "0 15px"}}>  
                    <div className="section-product-details__content-info">
                        <h1 className="section-product-details__title">Bàn Sofa – Bàn Cafe – Bàn Trà Gỗ Cao Su màu tự nhiên</h1>
                        <div className="section-product-details__sold-start" style={{display: "flex", alignContent: 'center', marginBottom: '20px'}}>
                            <div className="section-product-details__start" style={{display: "flex", alignItems: "center", justifyContent: "flex-start", paddingRight: "15px", borderRight: '1px solid rgb(179, 179, 179)'}}>
                                <div style={{display: "flex", alignItems: "center", marginTop: "2px", borderBottom: '1px solid #333', marginRight: '5px'}}>
                                    <span style={{fontSize: "16.5px",color: "#333"}}>4.5</span>
                                </div>
                                <StarRating rating={4.5} />
                            </div>
                            <div className="section-product-details__rate" style={{display: "flex", alignItems: "center", justifyContent: "flex-start", padding: "0 15px", borderRight: '1px solid rgb(179, 179, 179)'}}>
                                <div style={{display: "flex", alignItems: "center", marginTop: "2px", borderBottom: '1px solid #333', marginRight: '5px'}}>
                                    <span style={{fontSize: "16.5px",color: "#333"}}>100</span>
                                </div>
                                <div style={{display: "flex", alignItems: "center", marginTop: "2px"}}>
                                    <span style={{fontSize: "14px",color: "#767676", }}>Đánh giá</span>
                                </div>
                            </div>
                            <div className="section-product-details__sold" style={{display: "flex", alignItems: "center", justifyContent: "flex-start", padding: "0 15px"}}>
                                <div style={{display: "flex", alignItems: "center", marginTop: "2px", borderBottom: '1px solid #333', marginRight: '5px'}}>
                                    <span style={{fontSize: "16.5px",color: "#333"}}>100</span>
                                </div>
                                <div style={{display: "flex", alignItems: "center", marginTop: "2px"}}>
                                    <span style={{fontSize: "14px",color: "#767676", }}>Đã bán</span>
                                </div>
                            </div>
                           
                        </div>
                        <div className="section-product-details__price">
                            <span>₫1.500.000</span>
                            <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/b90f3f018f55093cc6e6.svg" alt="icon" />
                            <p style={{fontSize: '17px', color: '#999', textDecoration: 'line-through'}}>₫998.000</p>
                            
                        </div>
                        <div className="section-product-details__description">
                            <p style={{color: '#000'}}>Đây là mô tả sản phẩm</p>



                        </div>
                        <div className="section-product-details__quantity">
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <p style={{color: '#000', fontWeight: '600', fontSize: '15px'}}>Số lượng:</p>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <InputNumber 
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: '5px', 
                                        fontSize: '15px', 
                                        border:'1px solid #000', 
                                        
                                    }} 
                                    min={1} 
                                    defaultValue={1} 
                                    onChange={onChangeQuantity} 
                                    changeOnWheel 
                                />
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <p style={{color: '#757575', fontWeight: '500'}}>136691 sản phẩm có sẵn</p>
                            </div>

                        </div>
                        <div className="section-product-details__btn">
                            <Button className="section-product-details__btn-add-cart">
                                <img style={{width: '18px', height: '18px', marginRight: '6px'}} src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/0f3bf6e431b6694a9aac.svg" alt="icon" />
                                <p>Thêm Vào Giỏ Hàng</p>
                            </Button>
                            <Button className="section-product-details__btn-buy-now">
                                <p>Mua Ngay</p>
                            </Button>
                        </div>
                        
                    </div>
                </Col>
                </Row>
            </div>
        </div>
    );
};
export default SectionProductDetail;