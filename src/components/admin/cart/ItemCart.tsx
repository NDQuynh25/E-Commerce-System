import { InputNumber, Table } from "antd";
import React from "react";

const ItemCart: React.FC = () => {
  const [quantity, setQuantity] = React.useState(1);

  const onChangeQuantity = (value: any): void => {
    setQuantity(value);
  };
  return (
    <div className="item-cart">
      <div className="item-cart-container">
        <Table></Table>
      </div>
    </div>
  );
};
export default ItemCart;
