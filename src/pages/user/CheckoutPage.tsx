import React, { useState } from "react";
import {
  List,
  Typography,
  Image,
  Button,
  InputNumber,
  Input,
  Radio,
  Space,
  Avatar,
  Tag,
  Form,
  Divider,
  message,
  Row,
  Col,
  Card,
} from "antd";

import CartItemList from "../../components/chechout/CartItemList";
import AddressSection from "../../components/chechout/AddressSection";
import OrderSummary from "../../components/chechout/OrderSummary";
import { ICartItem } from "../../types/backend";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { useAppDispatch } from "../../redux/hooks";
const CheckoutPage: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<string>("shopeepay");
  const [discountCode, setDiscountCode] = useState("");
  const [cartItemList, setCartItemList] = useState<ICartItem[]>([]);
  const [form] = Form.useForm();
  const [merchandiseSubtotal, setMerchandiseSubtotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [idempotencyKey, setIdempotencyKey] = useState(uuidv4());
  const dispatch = useAppDispatch();

  const cartItemsSelected = useAppSelector(
    (state: RootState) => state.cart.result.cartItems
  );

  // const handleDecrease = () => setQuantity((q) => Math.max(1, q - 1));
  // const handleIncrease = () => setQuantity((q) => q + 1);

  // const handlePaymentChange = (e: any) => setPaymentMethod(e.target.value);
  const idempotencyKeyRef = React.useRef(uuidv4());

  //Optional: reset lại key nếu giỏ hàng thay đổi
  React.useEffect(() => {
    idempotencyKeyRef.current = uuidv4();
  }, [cartItemList]);

  const handleCheckout = () => {
    console.log(form.getFieldsValue());
    console.log(cartItemList);
    message.success("Đặt hàng thành công!");
  };

  // React.useEffect(() => {
  //   console.log("idempotencyKeyRef", idempotencyKeyRef.current);
  // }, []);

  React.useEffect(() => {
    setMerchandiseSubtotal(caclulateMerchandiseSubtotal());
    setShippingFee(calculateShippingFee());
    setDiscount(calculateDiscount());
    setTotalPayment(calculateTotalPayment());
  }, [cartItemList]);

  const caclulateMerchandiseSubtotal = () => {
    let total = 0;
    cartItemList?.forEach((item) => {
      total += (item?.sku?.sellingPrice || 0) * item?.quantity;
    });
    return total;
  };

  const calculateShippingFee = () => {
    let total = 30000;
    return total;
  };

  const calculateDiscount = () => {
    let total = 0;
    if (discountCode === "GIAM20K") {
      total = 20000;
    }
    return total;
  };

  const calculateTotalPayment = () => {
    let total = 0;
    total =
      caclulateMerchandiseSubtotal() +
      calculateShippingFee() -
      calculateDiscount();
    return total;
  };

  return (
    <div
      className="checkout"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "85%",
        }}
      >
        <Row gutter={[24, 24]} justify="center" style={{ padding: 24 }}>
          {/* LEFT COLUMN */}
          <Col
            xs={24}
            lg={24}
            xl={16}
            style={{ display: "flex", gap: "40px", flexDirection: "column" }}
          >
            <AddressSection form={form} />
            <CartItemList
              cartItemList={cartItemList}
              setCartItemList={setCartItemList}
            />
          </Col>

          {/* RIGHT COLUMN */}
          <Col xs={24} lg={24} xl={8}>
            <OrderSummary
              handleCheckout={handleCheckout}
              merchandiseSubtotal={merchandiseSubtotal}
              shippingFee={shippingFee}
              discount={discount}
              totalPayment={totalPayment}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CheckoutPage;
