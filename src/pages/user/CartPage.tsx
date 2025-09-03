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
  Spin,
} from "antd";
// LoadingOutlined is already imported in the destructured import above
import { LoadingOutlined } from "@ant-design/icons";

import ProductVariantSelector from "../../components/admin/cart/ProductVariantSelector";
import "../../styles/modal.cart.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchCart } from "../../redux/slices/cartSlice";
import { RootState } from "../../redux/store";
import { ICartItem } from "../../types/backend";
import { callUpdateCartItem, callDeleteCartItem } from "../../api/cartApi";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

import { checkCartItems } from "../../api/orderApi";
import { useNavigate } from "react-router-dom";

const CheckboxCustom = styled(Checkbox)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #fca120 !important;
    border-color: #fca120 !important;
  }

  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: #fca120 !important;
  }

  &:hover .ant-checkbox-inner {
    border-color: #fca120 !important;
  }
`;

const CartPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectAll, setSelectAll] = useState(false);
  const [isSticky, setIsSticky] = useState(true);
  const cartContainerRef = useRef<HTMLDivElement>(null);
  const totalSectionRef = useRef<HTMLDivElement>(null);
  const userId = useAppSelector(
    (state: RootState) => state.auth.account_info.id
  );
  const cartId = useAppSelector(
    (state: RootState) => state.auth.account_info.cartId
  );
  const cartItems = useAppSelector(
    (state: RootState) => state.cart.result.cartItems
  );
  const [cartItemsData, setCartItemsData] = useState<ICartItem[]>([]);
  //const [newSku, setNewSku] = useState<skuType>();
  const [cartItemSelected, setCartItemSelected] = useState<ICartItem>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const lastScrollTop = useRef(0); // Dùng để xác định hướng cuộn

  useEffect(() => {
    setLoading(true);
    dispatch(
      fetchCart({
        userId: userId.toString(),
        query: "",
      })
    );
  }, []);

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      handleFetchCartItems(1);
    }
  }, [cartItems]);

  useEffect(() => {
    setCartItemsData(cartItemsData);
  }, [cartItemsData]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Xác định hướng cuộn
      const isScrollingDown = scrollTop > lastScrollTop.current;
      lastScrollTop.current = scrollTop;

      // Kiểm tra xem có nên sticky hay không
      if (cartContainerRef.current && totalSectionRef.current) {
        const cartRect = cartContainerRef.current.getBoundingClientRect();
        const cartBottom = cartRect.bottom;
        setIsSticky(cartBottom > windowHeight);
      }

      // Chỉ load khi cuộn xuống và gần cuối trang
      if (
        isScrollingDown &&
        documentHeight - (scrollTop + windowHeight) <= windowHeight * 0.25 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => {
          if (prev * 10 >= cartItems?.length) {
            setHasMore(false);
            return prev;
          } else {
            return prev + 1;
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  useEffect(() => {
    if (page > 0) {
      handleFetchCartItems(page);
      console.log("page", page);
    }
  }, [page]);

  useEffect(() => {
    if (!cartItemSelected) {
      return;
    }
    handleQuantityChange(cartItemSelected?.id as string, 1);
  }, [cartItemSelected]);

  const handleFetchCartItems = async (pageNum: number) => {
    console.log("pageNum", pageNum);
    setLoading(true);

    setTimeout(() => {
      if (cartItems) {
        const newItems = cartItems.slice(0, pageNum * 10).map((item) => {
          const existing = cartItemsData.find((i) => i.id === item.id);
          return {
            ...item,
            selected: selectAll ? true : existing ? existing.selected : false,
          };
        });

        setCartItemsData(newItems);
      }
      setLoading(false);
    }, 1000);
  };

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

  const handleRemoveItem = async (id: string) => {
    setCartItemsData((prev) => prev.filter((item) => item.id !== id));

    const res = await callDeleteCartItem(userId as string, id);

    if (res.status !== 200) {
      dispatch(
        fetchCart({
          userId: userId.toString(),
          query: "",
        })
      );
      message.error("Có lỗi xảy ra vui lòng thử lại sau!");
    }
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setCartItemsData((prev) =>
      prev.map((item) => ({ ...item, selected: checked }))
    );
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    setCartItemsData((prev) => {
      const newItems = prev.map((item) =>
        item.id === id ? { ...item, selected: checked } : item
      );
      const allSelected = newItems.every((item) => item.selected);
      setSelectAll(allSelected);
      return newItems;
    });
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
        dispatch(
          fetchCart({
            userId: userId.toString(),
            query: "",
          })
        );
        message.success("Cập nhật thành công!");
      } else {
        dispatch(
          fetchCart({
            userId: userId.toString(),
            query: "",
          })
        );
        message.error(response.message);
      }
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
    return cartItemsData
      .filter((item) => item.selected)
      .reduce(
        (total, item) => total + (item.sku?.sellingPrice || 0) * item.quantity,
        0
      );
  };

  const calculateTotalDiscount = () => {
    return cartItemsData
      .filter((item) => item.selected)
      .reduce(
        (total, item) =>
          total +
          ((item.sku?.originalPrice || 0) - (item.sku?.sellingPrice || 0)) *
            item.quantity,
        0
      );
  };

  const handleProceedToCheckout = async () => {
    setCheckoutLoading(true);
    const selectedItems = cartItemsData
      .filter((item) => item.selected)
      .map((item) => ({
        ...item,
        cartId: cartId as string,
        skuId: item.sku?.id as string,
        productId: item.product?.id as string,
        option1: item.sku?.option1,
        option2: item.sku?.option2,
      }));

    if (selectedItems.length === 0) {
      message.warning("Vui lòng chọn sản phẩm để thanh toán");
      setCheckoutLoading(false);
      return;
    }

    try {
      const res = await checkCartItems(selectedItems, userId as string);

      if (res.status === 200) {
        sessionStorage.setItem("selectedItems", JSON.stringify(res.data));
        await Promise.resolve();
        setCheckoutLoading(false);
        navigate(`/checkout`);
      } else {
        message.error("Giỏ hàng có sự thay đổi, vui lòng kiểm tra lại");
        setCheckoutLoading(false);

        dispatch(
          fetchCart({
            userId: userId.toString(),
            query: "",
          })
        );
      }
    } catch (error) {
      message.error("Lỗi kiểm tra giỏ hàng. Vui lòng thử lại");
      setCheckoutLoading(false);
      dispatch(
        fetchCart({
          userId: userId.toString(),
          query: "",
        })
      );
    }
  };

  const TotalSection = () => (
    <div
      ref={totalSectionRef}
      style={{
        borderRadius: "8px",
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
            Tổng thanh toán (
            {cartItemsData.filter((item) => item.selected).length} sản phẩm):
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
            onClick={() => {
              handleProceedToCheckout();
            }}
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
            {calculateTotalDiscount().toLocaleString("vi-VN")}đ
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <Spin
      style={{
        position: "fixed",
        top: "23%",
        left: "-20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      spinning={checkoutLoading}
      indicator={<LoadingOutlined style={{ fontSize: 60, color: "#ee4d2d" }} />}
    >
      <div
        style={{
          display: "flex",
          marginTop: "50px",
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
            <CheckboxCustom
              checked={selectAll}
              onChange={(e) => handleSelectAll(e.target.checked)}
            />
          </Col>
          <Col xl={10} lg={10} md={10} sm={10} xs={10}>
            <span style={{ fontSize: "15px", fontWeight: "500" }}>
              Sản phẩm
            </span>
          </Col>
          <Col xl={4} lg={4} md={4} sm={4} xs={4}>
            <span style={{ fontSize: "15px", fontWeight: "500" }}>Đơn giá</span>
          </Col>
          <Col xl={4} lg={4} md={4} sm={4} xs={4}>
            <span style={{ fontSize: "15px", fontWeight: "500" }}>
              Số lượng
            </span>
          </Col>
          <Col xl={3} lg={3} md={3} sm={3} xs={3}>
            <span style={{ fontSize: "15px", fontWeight: "500" }}>
              Thành tiền
            </span>
          </Col>
          <Col xl={2} lg={2} md={2} sm={2} xs={2}>
            <span style={{ fontSize: "15px", fontWeight: "500" }}>
              Thao tác
            </span>
          </Col>
        </Row>

        {/* Empty Cart Section */}
        {cartItemsData.length > 0 ? (
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
                    <CheckboxCustom
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
                    <NavLink
                      to={`/product/${item.product?.id}`}
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                        textDecoration: "none",
                        color: "black",
                      }}
                    >
                      <img
                        src={`${item.product?.promotionImageURLs?.[0]}`}
                        alt={item.product?.productName}
                        style={{ width: 80, height: 80, objectFit: "cover" }}
                      />
                      <span>{item.product?.productName}</span>
                    </NavLink>
                    {item.sku?.option1 !== "Mặc định" &&
                    item.sku?.option2 !== "Mặc định" ? (
                      <div style={{ width: "50%" }}>
                        <ProductVariantSelector
                          product={item.product}
                          sku={item.sku}
                          cartItemSelected={item}
                          setCartItemSelected={setCartItemSelected}
                        />
                      </div>
                    ) : (
                      <div style={{ width: "50%" }}></div>
                    )}
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
        ) : loading ? null : (
          <Empty description="Giỏ hàng trống" style={{ marginTop: 100 }} />
        )}

        {/* Loading Indicator */}
        {loading && (
          <div
            style={{ textAlign: "center", padding: "16px", marginTop: "40px" }}
          >
            <Spin
              style={{
                position: "fixed",

                left: "48.5%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              spinning={loading}
              indicator={
                <LoadingOutlined style={{ fontSize: 50, color: "#ee4d2d" }} />
              }
            />
          </div>
        )}

        {/* Sticky Total Section */}
        {cartItemsData.length > 0 && (
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
    </Spin>
  );
};

export default CartPage;
