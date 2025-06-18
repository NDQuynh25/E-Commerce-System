import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  InputNumber,
  Button,
  Empty,
  Col,
  Row,
  Checkbox,
  Popover,
  message,
} from "antd";
import ProductVariantSelector from "./../../components/admin/cart/ProductVariantSelector";
import "../../styles/modal.cart.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchCartItems } from "../../redux/slices/cartSlice";
import { RootState } from "../../redux/store";
import { ICartItem, skuType } from "../../types/backend";
import { callUpdateCartItem } from "../../api/cartApi";

const Cart: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectAll, setSelectAll] = useState(false);
  const [isSticky, setIsSticky] = useState(true);
  const cartContainerRef = useRef<HTMLDivElement>(null);
  const totalSectionRef = useRef<HTMLDivElement>(null);
  const userId = useAppSelector((state: RootState) => state.auth.user.id);
  const cartId = useAppSelector((state: RootState) => state.auth.user.cartId);
  const cartItems = useAppSelector((state: RootState) => state.cart.results);
  const [cartItemsData, setCartItemsData] = useState<ICartItem[]>([]);
  //const [newSku, setNewSku] = useState<skuType>();
  const [cartItemSelected, setCartItemSelected] = useState<ICartItem>();

  const dispatch = useAppDispatch();
  // Giả lập fetch dữ liệu từ backend
  const fetchCartItemss = async (pageNum: number) => {
    setLoading(true);
    await dispatch(
      fetchCartItems({ userId: userId.toString(), query: "?page=0&size=10" })
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchCartItemss(1);
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      setCartItemsData(cartItems);
    }
  }, [cartItems]);

  useEffect(() => {
    console.log(cartItemsData);
  }),
    [cartItemsData];

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
          fetchCartItemss(nextPage);
          return nextPage;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  useEffect(() => {
    if (page > 1) {
      fetchCartItemss(page);
    }
  }, [page]);

  useEffect(() => {
    console.log("cartItemSelected", cartItemSelected);
    if (!cartItemSelected) {
      return;
    }
    handleQuantityChange(cartItemSelected?.id as string, 1);
  }, [cartItemSelected]);

  const handleQuantityChange = (id: string, value: number) => {
    setCartItemsData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: value } : item))
    );
    const item = cartItemsData.find((i) => i.id === id);

    if (item) {
      const payload = {
        ...item,
        cartId: cartId,
        productId: item.product?.id,
        skuId:
          cartItemSelected?.skuId !== undefined
            ? cartItemSelected.skuId
            : item.sku?.id,
        option1:
          cartItemSelected?.option1 !== undefined
            ? cartItemSelected.option1
            : item.sku?.option1,
        option2:
          cartItemSelected?.option2 !== undefined
            ? cartItemSelected.option2
            : item.sku?.option2,
        quantity: value, // Sử dụng giá trị mới từ InputNumber
      } as ICartItem;
      console.log("payload", item);
      console.log("payload", payload);
      debounceUpdate(payload); // Không cần chờ state cập nhật
    }
  };

  const handleRemoveItem = (id: string) => {
    //setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    // setCartItems((prev) =>
    //   prev.map((item) => ({ ...item, selected: checked }))
    // );
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    // setCartItems((prev) => {
    //   const newItems = prev.map((item) =>
    //     item.id === id ? { ...item, selected: checked } : item
    //   );
    //   const allSelected = newItems.every((item) => item.selected);
    //   setSelectAll(allSelected);
    //   return newItems;
    // });
  };

  const handleUpdateCartItem = async (payload: ICartItem) => {
    try {
      console.log(payload);
      const response = await callUpdateCartItem(
        userId as string,
        payload.id as string,
        payload
      );
      if (response.status === 200) {
        setCartItemsData(response.data?.cartItems || []);
      } else {
        dispatch(
          fetchCartItems({
            userId: userId.toString(),
            query: "?page=0&size=10",
          })
        );
        message.error(response.message);
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTimeouts = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const debounceUpdate = (payload: ICartItem) => {
    // Nếu đã có timeout trước đó, hủy nó
    if (updateTimeouts.current[payload.id ?? ""]) {
      clearTimeout(updateTimeouts.current[payload.id ?? ""]);
    }

    // Tạo mới timeout
    updateTimeouts.current[payload.id ?? ""] = setTimeout(() => {
      handleUpdateCartItem(payload);
      delete updateTimeouts.current[payload.id ?? ""];
    }, 1000); // Delay 1 giây
  };

  const calculateTotal = () => {
    return cartItems
      .filter((item) => item.selected)
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const calculateTotalPriceDiscount = () => {
    return (
      cartItems
        .filter((item) => item.selected)
        .reduce((total, item) => total + item.price * item.quantity, 0) - 100000
    );
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
        <Col xl={10} lg={10} md={10} sm={10} xs={10}>
          <span style={{ fontSize: "15px", fontWeight: "500" }}>Sản phẩm</span>
        </Col>
        <Col xl={4} lg={4} md={4} sm={4} xs={4}>
          <span style={{ fontSize: "15px", fontWeight: "500" }}>Đơn giá</span>
        </Col>
        <Col xl={4} lg={4} md={4} sm={4} xs={4}>
          <span style={{ fontSize: "15px", fontWeight: "500" }}>Số lượng</span>
        </Col>
        <Col xl={3} lg={3} md={3} sm={3} xs={3}>
          <span style={{ fontSize: "15px", fontWeight: "500" }}>
            Thành tiền
          </span>
        </Col>
        <Col xl={2} lg={2} md={2} sm={2} xs={2}>
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
            {cartItemsData.map((item) => (
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
                      handleSelectItem(item.id || "", e.target.checked)
                    }
                  />
                </Col>
                <Col
                  xl={10}
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    paddingRight: "15px",
                  }}
                >
                  <img
                    src={`${item.product?.promotionImageURLs?.[0]}`}
                    alt={item.product?.productName}
                    style={{ width: 80, height: 80, objectFit: "cover" }}
                  />
                  <span>{item.product?.productName}</span>
                  <div style={{ width: "50%" }}>
                    <ProductVariantSelector
                      product={item.product}
                      sku={item.sku}
                      cartItemSelected={item}
                      setCartItemSelected={setCartItemSelected}
                    />
                  </div>
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
                    gap: "10px",
                  }}
                >
                  <p
                    style={{
                      textDecoration: "line-through",
                    }}
                  >
                    {(item?.sku?.originalPrice || 0).toLocaleString("vi-VN")}đ
                  </p>
                  <p style={{ color: "red" }}>
                    {(item?.sku?.sellingPrice || 0).toLocaleString("vi-VN")}đ
                  </p>
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
                    //max={item.sku?.stock || 0}
                    value={item.quantity}
                    onChange={(value) =>
                      handleQuantityChange(item.id || "", value || 1)
                    }
                  />
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
                  <p style={{ color: "red" }}>
                    {(
                      (item?.sku?.sellingPrice || 0) * item.quantity
                    ).toLocaleString("vi-VN")}
                    đ
                  </p>
                </Col>
                <Col
                  xl={2}
                  lg={2}
                  md={2}
                  sm={2}
                  xs={2}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="link"
                    danger
                    onClick={() => handleRemoveItem(item.id || "")}
                  >
                    <p style={{ color: "red" }}> Xóa</p>
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
