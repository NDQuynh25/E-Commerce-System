import React, { useState } from "react";
import { Form, Dropdown, Checkbox, Input, Button, Divider } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styled from "styled-components";


const CustomItem = styled(Form.Item)`
    .ant-row.ant-form-item-row {
        font-size: 1rem!important;
        flex-wrap: wrap !important;
    }
    
    .ant-form-item-label label::after {
        content: none !important;
    }
   
    .ant-form-item-label label {
        height: 100% !important;
        align-items: flex-start !important;
        display: flex;
        font-family: Inter, -apple-system, BlinkMacSystemFont, "San Francisco", "Segoe UI", Roboto, "Helvetica Neue", sans-serif;;
        font-size: 15px !important;
        font-weight: 450 !important;
        letter-spacing: 0px !important; 
        text-align: right !important;
        justify-content: left !important;
        margin-top: 5px !important;
        margin-right: 15px !important;
      
    }
    .ant-form-item-required:not(.ant-form-item-required-mark-optional)::before{
        display: none !important;
    }
    .ant-form-item-required:not(.ant-form-item-required-mark-optional)::after{
        display: inline-block !important;
        margin-top: 5px !important;
        margin-inline-start: 4px !important;
        color: #ff4d4f !important;
        font-size: 14px !important;
        font-family: SimSun, sans-serif !important;
        line-height: 1 !important;
        content: "*" !important;
        visibility: visible !important;
         display: none !important;
    }


`;


const StyledCheckbox = styled(Checkbox)<{ $isSelected: boolean }>`
    font-size: 14px;
    height: 35px;
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 5px 10px;
    margin-bottom: 2px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    /* Màu nền mặc định khi chưa chọn */
    background-color: ${({ $isSelected }) => ($isSelected ? "#e6f7ff" : "transparent")};

    &:hover {
        background-color: #f5f5f5;
    }
    
    &:focus {
        background-color: #f5f5f5;
    }
    
    &:active {
        background-color: #f5f5f5;
    }
`;

interface Category {
  id: number;
  name: string;
}
interface CategoryFormProps {
  form: any;
}

const categoryOptions: Category[] = [
  { id: 1, name: "Tất cả sản phẩm" },
  { id: 2, name: "Sản phẩm mới" },
  { id: 3, name: "Sản phẩm khuyến mãi" },
  { id: 4, name: "Sữa rửa mặt" },
  { id: 5, name: "Sữa tắm" },
  { id: 6, name: "Sản phẩm nổi bật" },
  { id: 7, name: "Kem dưỡng da" },
  { id: 8, name: "Dầu gội" },
];

const CategoryForm: React.FC<CategoryFormProps> = ({form}) => {
 
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  // Cập nhật giá trị đã chọn vào form
  const handleChange = (checkedValues: number[]) => {
    setSelectedCategories(checkedValues);
    form.setFieldsValue({ categoryIds: checkedValues });
  };

  // Lọc danh mục theo từ khóa
  const filteredCategories = categoryOptions.filter((cat) =>
    cat.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Nội dung dropdown
  const menu = (
    <div style={{ padding: "10px"}}>
      {/* Ô tìm kiếm */}
      <Input
        
        placeholder="Tìm kiếm"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: "10px"}}
      />
     
      {/* Danh sách checkbox */}
      <Checkbox.Group
        value={selectedCategories}
        onChange={(values) => handleChange(values as number[])}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {filteredCategories.map((category) => (
          <StyledCheckbox 
            key={category.id} 
            value={category.id}
            $isSelected={selectedCategories.includes(category.id)} // Kiểm tra nếu đã chọn
          >
            {category.name}
          </StyledCheckbox>
        ))}
      </Checkbox.Group>
    </div>
  );

  return (
    <>
      {/* Dropdown chọn danh mục */}
      <Dropdown  overlay={menu} trigger={["click"]} placement="bottomLeft" overlayStyle={{borderRadius: "10px", backgroundColor: "#fff", boxShadow: "0 0 10px rgba(0,0,0,0.1)"}}> 
        <Button style={{ width: "100%", height: '35px', textAlign: "left", border: "1px solid #d9d9d9"}}>
          {selectedCategories.length > 0
            ? `Đã chọn ${selectedCategories.length} danh mục`
            : "Chọn danh mục"}{" "}
          <DownOutlined />
        </Button>
      </Dropdown>
     

    </>
  );
};

export default CategoryForm;
