import React from "react";
import { Image, Table, TableProps, Card } from "antd";
import { ICartItem } from "../../types/backend";
import { Typography } from "antd";
import { useLocation } from "react-router-dom";
const { Text } = Typography;

interface CartItemListProps {
  cartItemList: ICartItem[];
  setCartItemList: React.Dispatch<React.SetStateAction<ICartItem[]>>;
}

const columns: TableProps<ICartItem>["columns"] = [
  {
    title: "Sản phẩm",
    dataIndex: "product",
    width: "55%",
    render: (_, record) => {
      const { product, sku } = record;
      return (
        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <Image width={80} src={product?.promotionImageURLs?.[0] || ""} />
          <div>
            <Text strong>{product?.productName}</Text>
            <div>
              <span style={{ color: "rgba(0,0,0,0.65)" }}>
                Phân loại: {sku?.option1}, {sku?.option2}
              </span>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    title: "Đơn giá",
    dataIndex: "sku",
    align: "left",
    render: (_, record) => {
      const { sku } = record;
      return (
        <Text style={{ fontSize: "0.9rem" }}>
          {sku?.sellingPrice?.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </Text>
      );
    },
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
    align: "left",
    render: (_, record) => {
      const { quantity } = record;
      return <Text style={{ fontSize: "0.9rem" }}>{quantity}</Text>;
    },
  },
  {
    title: "Thành tiền",
    dataIndex: "",
    align: "left",
    render: (_, record) => {
      const { quantity, sku } = record;
      return (
        <Text style={{ fontSize: "0.9rem" }}>
          {(quantity * (sku?.sellingPrice || 0)).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </Text>
      );
    },
  },
];

const CartItemList: React.FC<CartItemListProps> = ({
  cartItemList,
  setCartItemList,
}) => {
  const { state } = useLocation();
  const [cartItems, setCartItems] = React.useState<ICartItem[]>([]);

  React.useEffect(() => {
    setCartItemList(cartItems);
  }, [cartItems]);

  React.useEffect(() => {
    const stored = sessionStorage.getItem("selectedItems");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  return (
    <Card
      title={
        <div>
          <Text style={{ fontSize: "18px" }} strong>
            Đơn hàng ({cartItems?.length} sản phẩm)
          </Text>
        </div>
      }
    >
      <Table<ICartItem>
        columns={columns}
        pagination={false}
        dataSource={cartItems}
        style={{
          width: "100%",
        }}
      />
    </Card>
  );
};

export default CartItemList;
