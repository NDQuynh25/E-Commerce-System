
import style from '../styles/header.client.module.css'; 
import logo from '../../public/shopping-cart.png';
import search from '../../public/search.png';
import cart from '../../public/cart.png';
const HeaderClient = () => {
    

    return (
    <header className={style["header-client"]}>
        <div className={style["header-container"]}>
            {/* Top header links */}
            <div className={style["header-top"]}>
                <nav className={style["top-links"]}>
                <a href="#">Kênh Người Bán</a>
                <a href="#">Trở thành người bán Shopee</a>
                <a href="#">Tải ứng dụng</a>
                <a href="#">Kết nối</a>
                </nav>
                <div className={style["language-selector"]}>
                <a href="#">Thông Báo</a>
                <a href="#">Hỗ Trợ</a>
                <a href="#">Tiếng Việt</a>
                <a href="#">Đăng Nhập </a>
                <span>|</span>
                <a href="#">Đăng Ký</a>
                </div>
            </div>

            {/* Main header with logo, search bar, and cart */}
            <div className={style["header-main"]}>
                <div className={style["logo"]}>
                    <img src={logo} alt="Shopee" />
                    <p className={style['font-logo']}>A & Z</p>
                </div>
                <div className={style["search-bar"]}>
                    <input type="text" placeholder="Shopee bao ship 0Đ - Đăng ký ngay!" />
                    <button type="submit" className={style['search-button']}>
                        <img src={search} alt="Search" />
                    </button>
                </div>
                <div className={style["cart"]} style={{ position: 'relative' }}>
                    <img src={cart} alt="Cart" />
                    {/* Hiển thị số lượng sản phẩm trong giỏ hàng */}
                    {120 > 0 && (
                        <span style={{
                            position: 'absolute',
                            top: '-10px',
                            right: '-18px',
                            background: '#E53935',
                            color: '#fff',
                            borderRadius: '50%',
                            padding: '2px 6px',
                            fontSize: '13px',
                        }}>
                            {120}
                        </span>
                    )}
                </div>
            </div>

            
        </div>
    </header>
  );
};

export default HeaderClient;
