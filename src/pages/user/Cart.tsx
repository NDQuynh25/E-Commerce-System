import React, { useState, useEffect, useRef } from "react";
import { Table, InputNumber, Button, Empty } from "antd";
import type { ColumnsType } from "antd/es/table";
import "../../styles/modal.cart.css";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Giả lập fetch dữ liệu từ backend
  const fetchCartItems = async (pageNum: number) => {
    setLoading(true);
    try {
      // Thay thế bằng API call thực tế
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newItems = Array(5)
        .fill(null)
        .map((_, index) => ({
          id: `${pageNum}-${index}`,
          name: `Sản phẩm ${pageNum * 5 + index}`,
          price: Math.floor(Math.random() * 1000000) + 100000,
          quantity: 1,
          image:
            "https://bizweb.dktcdn.net/thumb/large/100/480/479/products/protrangnoithatmohobansofa.jpg",
        }));

      setCartItems((prev) => [...prev, ...newItems]);
      setHasMore(pageNum < 3); // Giả sử chỉ có 3 trang
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCartItems(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (
          scrollHeight - scrollTop <= clientHeight * 1.5 &&
          !loading &&
          hasMore
        ) {
          setPage((prev) => prev + 1);
        }
      }
    };

    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loading, hasMore]);

  const handleQuantityChange = (id: string, value: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: value } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const columns: ColumnsType<CartItem> = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={record.image}
            alt={text}
            style={{ width: 80, height: 80, objectFit: "cover" }}
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Phân loại",
      dataIndex: "variety",
      key: "variety",
    },

    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString("vi-VN")}đ`,
    },
    {
      title: "Số lượng",
      key: "quantity",
      render: (_, record) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={(value) => handleQuantityChange(record.id, value || 1)}
        />
      ),
    },
    {
      title: "Thành tiền",
      key: "total",
      render: (_, record) =>
        `${(record.price * record.quantity).toLocaleString("vi-VN")}đ`,
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Button type="link" danger onClick={() => handleRemoveItem(record.id)}>
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        className="container-cart"
        ref={containerRef}
        style={{ height: "", overflow: "auto" }}
      >
        {cartItems.length > 0 ? (
          <Table
            style={{ width: "100%" }}
            columns={columns}
            dataSource={cartItems}
            rowKey="id"
            //pagination={{ pageSize: 5 }}
            loading={loading}
          />
        ) : (
          <Empty description="Giỏ hàng trống" />
        )}
        {loading && (
          <div style={{ textAlign: "center", padding: "20px" }}>
            Đang tải...
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
