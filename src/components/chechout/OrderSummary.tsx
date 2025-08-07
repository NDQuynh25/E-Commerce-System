import React from "react";
import {
  Card,
  Divider,
  Radio,
  Row,
  Space,
  Typography,
  Button,
  Tag,
  Avatar,
} from "antd";
import { WalletOutlined } from "@ant-design/icons";
import { ICartItem } from "../../types/backend";

const { Title, Text } = Typography;

interface OrderSummaryProps {
  handleCheckout: () => void;
  merchandiseSubtotal: number;
  shippingFee: number;
  discount: number;
  totalPayment: number;
}
const OrderSummary: React.FC<OrderSummaryProps> = ({
  handleCheckout,
  merchandiseSubtotal,
  shippingFee,
  discount,
  totalPayment,
}) => {
  const [paymentMethod, setPaymentMethod] = React.useState<string>("");

  const handlePaymentChange = (e: any) => setPaymentMethod(e.target.value);

  return (
    <Card
      title={
        <div>
          <Title level={4}>Tóm tắt đơn hàng</Title>
        </div>
      }
      bordered
      style={{ position: "sticky", top: 24 }}
    >
      <div style={{ marginBottom: 16 }}>
        <Row justify="space-between">
          <Text style={{ fontSize: "15px" }}>Tạm tính</Text>
          <Text style={{ fontSize: "15px" }}>
            {merchandiseSubtotal.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Text>
        </Row>
        <Row justify="space-between">
          <Text style={{ fontSize: "15px" }}>Phí vận chuyển</Text>
          <Text style={{ fontSize: "15px" }}>
            {shippingFee.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Text>
        </Row>
        {discount > 0 && (
          <Row justify="space-between">
            <Text style={{ fontSize: "15px" }}>Giảm giá</Text>
            <Text style={{ fontSize: "15px" }} type="danger">
              -
              {discount?.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Text>
          </Row>
        )}
        <Divider />
        <Row justify="space-between">
          <Text style={{ fontSize: "17px" }} strong>
            Tổng cộng
          </Text>
          <Text style={{ fontSize: "18px" }} strong type="danger">
            {totalPayment?.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Text>
        </Row>
      </div>

      <Title level={5}>Phương thức thanh toán</Title>
      <Radio.Group
        value={paymentMethod}
        onChange={(e: any) => handlePaymentChange(e)}
      >
        <Space direction="vertical">
          <Radio value="shopeepay">
            <Space>
              <Avatar icon={<WalletOutlined />} />
              Ví ShopeePay
              <Tag color="red">Giảm 20k</Tag>
            </Space>
          </Radio>
          <Radio value="credit">Thẻ tín dụng/Ghi nợ</Radio>
          <Radio value="cod">Thanh toán khi nhận hàng (COD)</Radio>
        </Space>
      </Radio.Group>

      <Button
        type="primary"
        block
        size="large"
        style={{ marginTop: 24, backgroundColor: "#ee4d2d" }}
        onClick={handleCheckout}
      >
        ĐẶT HÀNG
      </Button>

      <Text
        type="secondary"
        style={{ fontSize: 12, display: "block", marginTop: 16 }}
      >
        Bằng việc nhấn Đặt hàng, bạn đồng ý với{" "}
        <a href="#">Điều khoản dịch vụ</a> và <a href="#">Chính sách bảo mật</a>
      </Text>
    </Card>
  );
};
export default OrderSummary;
