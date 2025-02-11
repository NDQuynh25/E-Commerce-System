import { Row, Col } from "antd";
import React from "react";
import { info } from "../../utils/constant";
import "../../styles/modal.footer.css";
import { Button, Input,  } from "antd";
import { Link } from "react-router-dom";
import {path} from "../../utils/constant";



const Footer: React.FC = () => {
    return (
        <footer className="footer"
            style={{
                width: "100%",
                backgroundImage: "url(//bizweb.dktcdn.net/100/480/479/themes/900388/assets/footer-bg.png?1727161994343)",
                backgroundSize: "cover",
            }}
        >
            <div className="footer__container" style={{ width: "100%"}}>
                <Row className="footer__item" style={{paddingTop: '50px', paddingBottom: '50px'}} >
                    <Col xl={8} lg={12} md={12} sm={24} xs={24} style={{paddingLeft: "15px"}}>
                        <div className="footer__phone" style={{display: "flex", marginBottom: "20px"}}>
                            <div className="footer__phone-logo" >
                                <img style={{width: "55px", height: "55px"}} src="//bizweb.dktcdn.net/100/480/479/themes/900388/assets/call.png?1727161994343" alt="call"/>
                            </div>
                            <div className="footer__phone-content" style={{display: "flex", flexDirection: "column", marginLeft: "20px"}}>
                                <span style={{fontSize: "14px", color: "white"}}>Hỗ trợ tư vấn</span>
                                <a href={`tel:${info.PHONE.replace(/\s+/g, "")}`} style={{fontSize: "30px", color: "#fca120", fontWeight: "700"}}>{info.PHONE}</a>
                            </div>
                        </div>
                        <div className="footer__group-address" style={{display: "flex", flexDirection: 'column', marginBottom: "20px", fontSize: "16px", gap: "15px"}}>
                            <div style={{display: "flex", justifyContent: "left", alignItems: "center", gap: "5px"}}>
                                <b style={{textTransform: 'uppercase'}}>Địa chỉ:</b>
                                <p>{info.ADDRESS}</p>
                            </div>
                            <div style={{display: "flex", justifyContent: "left", alignItems: "center", gap: "5px"}}>
                                <b>Số diện thoại:</b>
                                <a href={`tel:${info.PHONE.replace(/\s+/g, "")}`}><span style={{color: "white"}}>{info.PHONE}</span></a>
                            </div>
                            <div style={{display: "flex", justifyContent: "left", alignItems: "center", gap: "5px"}}>
                                <b>Email:</b>
                                <a href={`mailto:${info.EMAIL}`}><span style={{color: "white"}}>{info.EMAIL}</span></a>
                            </div>
                        </div>
                        <div className="footer__title-menu" style={{display: "flex", flexDirection: "column", marginBottom: "20px"}}>
                            <h4>MẠNG XÃ HỘI</h4>
                        </div>
                        <div className="footer__social" style={{display: "flex", gap: "20px", marginBottom: "20px"}}>
                            <a href={info.ZALO} target="_blank" rel="noreferrer">
                                <img style={{width: "32px", height: "32px"}} title="Zalo" src="https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/zalo.png?1727161994343"/>
                            </a>
                            <a href={info.FACEBOOK} target="_blank" rel="noreferrer">
                                <img style={{width: "32px", height: "32px"}} title="Facebook" src="https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/facebook.png?1727161994343"/>
                            </a>
                            <a href={info.YOUTUBE} target="_blank" rel="noreferrer">
                                <img style={{width: "32px", height: "32px"}} title="Youtube" src="https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/youtube.png?1727161994343"/>
                            </a>
                            <a href={info.GOOGLE} target="_blank" rel="noreferrer">
                                <img style={{width: "32px", height: "32px"}} title="Google" src="https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/google.png?1727161994343"/>
                            </a>
                        </div>
                    </Col>
                    <Col xl={8} lg={12} md={12} sm={24} className="footer__effect">
                        <div className="footer__policy" style={{display: "flex", flexDirection: "column", marginBottom: "20px"}}>
                            <h4 style={{marginBottom: '20px'}}>CHÍNH SÁCH</h4>
                            <a style={{marginBottom: '15px'}} href="#"><span style={{color: "#fff"}}>Chính sách thành viên</span></a>
                            <a style={{marginBottom: '15px'}} href="#"><span style={{color: "#fff"}}>Chính sách thanh toán</span></a>
                            <a style={{marginBottom: '15px'}} href="#"><span style={{color: "#fff"}}>Hướng dẫn mua hàng</span></a>
                            <a style={{marginBottom: '15px'}} href="#"><span style={{color: "#fff"}}>Bảo mật thông tin cá nhân</span></a>
                            <a style={{marginBottom: '15px'}} href="#"><span style={{color: "#fff"}}>Quà tặng tri ân</span></a>
                        </div>
                        <div className="footer__instruction" style={{display: "flex", flexDirection: "column", marginBottom: "20px"}}>
                            <h4 style={{marginBottom: '20px'}}>HƯỚNG DẪN</h4>
                            <a style={{marginBottom: '15px'}} href="#"><span style={{color: "#fff"}}>Hướng dẫn mua hàng</span></a>
                            <a style={{marginBottom: '15px'}} href="#"><span style={{color: "#fff"}}>Hướng dẫn thanh toán</span></a>
                            <a style={{marginBottom: '15px'}} href="#"><span style={{color: "#fff"}}>Đăng ký thành viên</span></a>
                            <a style={{marginBottom: '15px'}} href="#"><span style={{color: "#fff"}}>Hỗ trợ khách hàng</span></a>
                            <a style={{marginBottom: '15px'}} href="#"><span style={{color: "#fff"}}>Câu hỏi thường gặp</span></a>
                        </div>
                    </Col>
                    <Col xl={8} lg={12} md={12} sm={24} xs={24}  style={{display: "flex", flexDirection: "column", paddingLeft: "15px"}}>
                        <h4 style={{marginBottom: '20px'}}>ĐĂNG KÝ NHẬN BẢN TIN</h4>
                        <p style={{marginBottom: '10px', fontSize: '16px'}}>Đăng ký để nhận ngay nhiều ưu đãi hấp dẫn</p>
                        <div style={{display: "flex", marginBottom: '20px'}}>
                            <Input 
                                placeholder="Nhập email của bạn" 
                                style={{
                                    width: '100%', 
                                    height: '40px', 
                                    borderTopRightRadius: '0px',
                                    borderBottomRightRadius: '0px',
                                }}
                            />
                            <Button className="footer__btn">Đăng ký</Button>
                        </div>
                        <h4 style={{marginBottom: '20px'}}>HÌNH THỨC THANH TOÁN</h4>
                        <div style={{display: "flex", gap: "5px", }}>
                            <img width="57" height="35" alt="Payment 1" src="https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/payment_1.png?1727161994343" data-was-processed="true"/>
                            <img width="57" height="35" alt="Payment 2" src="https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/payment_2.png?1727161994343" data-was-processed="true"/>
                            <img width="57" height="35" alt="Payment 3" src="https://bizweb.dktcdn.net/100/480/479/themes/900388/assets/payment_3.png?1727161994343" data-was-processed="true"/>
                        </div>
                    </Col>
                </Row>
                <div style={{borderTop: "1px solid #535353"}}></div>
                <Row 
                    className="footer__item footer__active"
                    style={{
                        paddingTop: "10px",
                        paddingBottom: "10px",
                    }}
                >
                    <Col xl={12} lg={24} md={24} sm={24} xs={24} className="footer__active">
                        <p style={{color: "#fff", fontSize: "16px"}}>© 2024 - Bản quyền thuộc về QuynhND259</p>
                    </Col>
                    <Col >
                            
                        <div style={{display: 'flex',gap: '15px'}}>
                            <Link to={path.HOME_PAGE}><span style={{color: "#fff"}}>Trang chủ</span></Link>
                            <Link to={path.INTRODUCE}><span style={{color: "#fff"}}>Giới thiệu</span></Link>
                            <Link to={path.PRODUCT}><span style={{color: "#fff"}}>Sản phẩm</span></Link>
                            <Link to={path.NEWS}><span style={{color: "#fff"}}>Tin tức</span></Link>
                            <Link to={path.CONTACT}><span style={{color: "#fff"}}>Liên hệ</span></Link>
                        </div>
                    
                    </Col>
                </Row>
                    
            </div>
        </footer>
    );
}
export default Footer;
