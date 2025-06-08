import React, { useState, useEffect, useRef } from "react";
import { Table, InputNumber, Button, Empty, Col, Row, Checkbox } from "antd";
import type { ColumnsType } from "antd/es/table";
import "../../styles/modal.cart.css";

interface CartItem {
  id: string;
  name: string;
  price: number;
  discount: number;
  quantity: number;
  image: string;
  selected: boolean;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectAll, setSelectAll] = useState(false);
  const [isSticky, setIsSticky] = useState(true);
  const cartContainerRef = useRef<HTMLDivElement>(null);
  const totalSectionRef = useRef<HTMLDivElement>(null);

  // Giả lập fetch dữ liệu từ backend
  const fetchCartItems = async (pageNum: number) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newItems = Array(5)
        .fill(null)
        .map((_, index) => ({
          id: `${pageNum}-${index}`,
          name: `Sản phẩm ${pageNum * 5 + index}`,
          price: Math.floor(Math.random() * 1000000) + 100000,
          discount: Math.floor(Math.random() * 10) + 1,
          quantity: 1,
          image:
            "https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangnoithatmohobansofa.jpg",
          selected: false,
        }));

      if (pageNum === 1) {
        setCartItems(newItems);
      } else {
        setCartItems((prev) => [...prev, ...newItems]);
      }
      setHasMore(pageNum < 10);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCartItems(1);
  }, []); // Chỉ gọi một lần khi component mount

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Kiểm tra xem có nên sticky hay không
      if (cartContainerRef.current && totalSectionRef.current) {
        const cartRect = cartContainerRef.current.getBoundingClientRect();
        const cartBottom = cartRect.bottom;
        const totalHeight = totalSectionRef.current.offsetHeight;

        // Nếu phần cart còn dài hơn màn hình, giữ sticky
        // Nếu đã cuộn gần hết cart, bỏ sticky
        setIsSticky(cartBottom > windowHeight + totalHeight);
      }

      // Load more items
      if (
        documentHeight - (scrollTop + windowHeight) <= windowHeight * 0.2 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => {
          const nextPage = prev + 1;
          fetchCartItems(nextPage);
          return nextPage;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  useEffect(() => {
    if (page > 1) {
      fetchCartItems(page);
    }
  }, [page]);

  const handleQuantityChange = (id: string, value: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: value } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setCartItems((prev) =>
      prev.map((item) => ({ ...item, selected: checked }))
    );
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    setCartItems((prev) => {
      const newItems = prev.map((item) =>
        item.id === id ? { ...item, selected: checked } : item
      );
      const allSelected = newItems.every((item) => item.selected);
      setSelectAll(allSelected);
      return newItems;
    });
  };

  const calculateTotal = () => {
    return cartItems
      .filter((item) => item.selected)
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const calculateTotalPriceDiscount = () => {
    return cartItems
     .filter((item) => item.selected)
     .reduce((total, item) => total + item.price * item.quantity, 0) -
     100000;
  };

  const TotalSection = () => (
    <div
      ref={totalSectionRef}
      style={{
        padding: "20px 20px",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "flex-end",
        borderTop: "1px solid #f0f0f0",
        boxShadow: isSticky ? "0 -2px 8px rgba(0,0,0,0.1)" : "none",
        zIndex: 1000,
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            fontSize: "16px",
          }}
        >
          <span>
            Tổng thanh toán ({cartItems.filter((item) => item.selected).length}{" "}
            sản phẩm):
          </span>

          <span
            style={{
              color: "#ee4d2d",
              fontSize: "25px",
              fontWeight: "500",
            }}
          >
            {calculateTotal().toLocaleString("vi-VN")}đ
          </span>
          <Button
            type="primary"
            size="large"
            style={{
              backgroundColor: "#ee4d2d",
              borderColor: "#ee4d2d",
              minWidth: "120px",
            }}
          >
            Mua Hàng
          </Button>
        </div>
        <div>
          <span>Tiết kiệm: </span>
          <span
            style={{
              color: "#ee4d2d",
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            100.000đ
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        justifyItems: "center",
        width: "100%",
        flexDirection: "column",
        minHeight: "100vh",
        paddingBottom: isSticky ? "100px" : "0", // Thêm padding để tránh che nội dung
      }}
    >
      <Row
        style={{
          padding: "15px",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          width: "80%",
          justifyItems: "center",
        }}
      >
        <Col xl={1} lg={1} md={1} sm={1} xs={1}>
          <Checkbox
            checked={selectAll}
            onChange={(e) => handleSelectAll(e.target.checked)}
          />
        </Col>
        <Col xl={8} lg={8} md={8} sm={8} xs={8}>
          <span style={{ fontSize: "15px", fontWeight: "500" }}>Sản phẩm</span>
        </Col>
        <Col xl={4} lg={4} md={4} sm={4} xs={4}>
          <span style={{ fontSize: "15px", fontWeight: "500" }}>Đơn giá</span>
        </Col>
        <Col xl={4} lg={4} md={4} sm={4} xs={4}>
          <span style={{ fontSize: "15px", fontWeight: "500" }}>Số lượng</span>
        </Col>
        <Col xl={4} lg={4} md={4} sm={4} xs={4}>
          <span style={{ fontSize: "15px", fontWeight: "500" }}>
            Thành tiền
          </span>
        </Col>
        <Col xl={3} lg={3} md={3} sm={3} xs={3}>
          <span style={{ fontSize: "15px", fontWeight: "500" }}>Thao tác</span>
        </Col>
      </Row>

      {cartItems.length > 0 ? (
        <div
          ref={cartContainerRef}
          style={{
            display: "flex",
            justifyContent: "center",
            width: "80%",
            justifyItems: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ width: "100%" }}>
            {cartItems.map((item) => (
              <Row
                key={item.id}
                style={{ padding: "15px", backgroundColor: "white" }}
              >
                <Col
                  xl={1}
                  lg={1}
                  md={1}
                  sm={1}
                  xs={1}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Checkbox
                    checked={item.selected}
                    onChange={(e) =>
                      handleSelectItem(item.id, e.target.checked)
                    }
                  />
                </Col>
                <Col
                  xl={8}
                  lg={8}
                  md={8}
                  sm={8}
                  xs={8}
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: 80, height: 80, objectFit: "cover" }}
                  />
                  <span>{item.name}</span>
                </Col>
                <Col
                  xl={4}
                  lg={4}
                  md={4}
                  sm={4}
                  xs={4}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {item.price.toLocaleString("vi-VN")}đ
                </Col>
                <Col
                  xl={4}
                  lg={4}
                  md={4}
                  sm={4}
                  xs={4}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <InputNumber
                    min={1}
                    value={item.quantity}
                    onChange={(value) =>
                      handleQuantityChange(item.id, value || 1)
                    }
                  />
                </Col>
                <Col
                  xl={4}
                  lg={4}
                  md={4}
                  sm={4}
                  xs={4}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                </Col>
                <Col
                  xl={3}
                  lg={3}
                  md={3}
                  sm={3}
                  xs={3}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="link"
                    danger
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Xóa
                  </Button>
                </Col>
              </Row>
            ))}
          </div>
        </div>
      ) : (
        <Empty description="Giỏ hàng trống" />
      )}

      {/* Sticky Total Section */}
      {cartItems.length > 0 && (
        <div
          style={{
            position: isSticky ? "fixed" : "static",
            bottom: isSticky ? 0 : "auto",
            left: 0,
            right: 0,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: isSticky ? 0 : "20px",
          }}
        >
          <div style={{ width: "80%" }}>
            <TotalSection />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
