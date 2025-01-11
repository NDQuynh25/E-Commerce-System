import React, { useState } from "react";
import { Layout, Menu, Modal } from "antd";

const { Sider, Content } = Layout;

// Định nghĩa kiểu dữ liệu cho danh mục
interface Category {

  id: number;
  name: string;
  children?: Category[];
}
interface CategoryMenuProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

// Dữ liệu mẫu
const categories: Category[] = [
  {
    id: 1,
    name: "Thời Trang Nữ",
    children: [
      {
        id: 11,
        name: "Áo",
        children: [
          { id: 111, name: "Áo khoác mùa đông" },
          { id: 112, name: "Áo choàng" },
          { id: 113, name: "Áo blazer" },
        ],
      },
      {
        id: 12,
        name: "Quần",
        children: [{ id: 121, name: "Quần jeans" }],
      },
    ],
  },
  {
    id: 2,
    name: "Thời Trang Nam",
    children: [
      {
        id: 21,
        name: "Áo",
        children: [{ id: 211, name: "Áo sơ mi" }],
      },
    ],
  },
];

const CategoryMenu: React.FC<CategoryMenuProps> = ({open = false, setOpen}) => {
  const [selectedParent, setSelectedParent] = useState<number | null>(null);
  const [selectedChild, setSelectedChild] = useState<number | null>(null);

  const handleParentSelect = (parentId: number) => {
    setSelectedParent(parentId);
    setSelectedChild(null); // Reset danh mục con khi chọn danh mục cha khác
  };

  const handleChildSelect = (childId: number) => {
    setSelectedChild(childId);
  };

  const parentCategories: Category[] = categories;
  const childCategories: Category[] =
    parentCategories.find((cat) => cat.id === selectedParent)?.children || [];
  const subCategories: Category[] =
    childCategories.find((child) => child.id === selectedChild)?.children || [];

  return (
    <Modal
        title="Chọn danh mục"
        visible={true}
        footer={null}
        onCancel={() => {setOpen(false)}}
        open={open}
        width={800}
        style={{height: "600px"}}
    >
        <Layout style={{minHeight: "600px", display: "flex" }}>
        {/* Cột 1: Danh mục cha */}
        <Sider
            width="20%"
            style={{
            background: "#fff",
            borderRight: "1px solid #ddd",
            overflowY: "auto",
            }}
        >
            <Menu
            mode="vertical"
            selectedKeys={[String(selectedParent)]}
            onClick={(e) => handleParentSelect(Number(e.key))}
            >
            {parentCategories.map((parent) => (
                <Menu.Item key={parent.id}>{parent.name}</Menu.Item>
            ))}
            </Menu>
        </Sider>

        {/* Cột 2: Danh mục con */}
        <Sider
            width="40%"
            style={{
            background: "#fff",
            borderRight: "1px solid #ddd",
            overflowY: "auto",
            }}
        >
            <Menu
            mode="vertical"
            selectedKeys={[String(selectedChild)]}
            onClick={(e) => handleChildSelect(Number(e.key))}
            >
            {childCategories.map((child) => (
                <Menu.Item key={child.id}>{child.name}</Menu.Item>
            ))}
            </Menu>
        </Sider>

        {/* Cột 3: Danh mục nhỏ hơn */}
        <Content
            style={{
            padding: "16px",
            background: "#fff",
            overflowY: "auto",
            }}
        >
            {subCategories.length > 0 ? (
            <Menu mode="vertical">
                {subCategories.map((sub) => (
                <Menu.Item key={sub.id}>{sub.name}</Menu.Item>
                ))}
            </Menu>
            ) : (
            <p>Chọn danh mục con để hiển thị danh mục nhỏ hơn.</p>
            )}
        </Content>
        </Layout>
    </Modal>
  );
};

export default CategoryMenu;
