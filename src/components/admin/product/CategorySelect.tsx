import React, { useEffect, useState } from "react";
import {  Dropdown, Checkbox, Input, Button, Spin} from "antd";
import { DownOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchCategories} from "../../../redux/slices/categorySlice";
import { sfEqual, sfIsNull, sfNotEqual } from "spring-filter-query-builder";
import queryString from 'query-string';




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
    Z-index: 1000;
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


interface CategoryFormProps {
  
  form: any;
  categoryIds?: number[];
  categoryId?: number | string ;
  parentId?: number | string;
  queryNumber?: number;
}


const CategorySelect: React.FC<CategoryFormProps> = ({form, categoryIds, categoryId, parentId, queryNumber = 0}) => {
 
    const [searchText, setSearchText] = useState<string>("");
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const dispatch = useAppDispatch();
    const category = useAppSelector((state) => state.category);
    const categories = useAppSelector((state) => state.category.results);
    const isFetching = useAppSelector((state) => state.category.isFetching);
    
    const queries = [
      `${sfEqual("isActive", 1)}` 
        + " and " + `${sfNotEqual('id', categoryId as number)}` 
        + " and " + `(${sfIsNull('parentCategory')} or ${sfEqual('parentCategory.id', categoryId as number)})`
        + " and " + `(${sfNotEqual('id', parentId as number)})`
      ,
        
      `${sfEqual("isActive", 1)}` 
    ];

    useEffect(() => {
     
      // Chỉ thực hiện query khi có id hợp lệ
      
      let query = queryString.stringify({ filter: queries[0] }) + '&page=0&size=100&isSummary=true&sort=categoryName,asc';
     
      dispatch(fetchCategories({ query: query }));
      if (category.isFetching === false) {
        console.log('id', category.result?.id)
      }
      
    
    }, []);

    useEffect(() => {
      console.log('category', categories);
    }, [categories]);

    useEffect(() => {
      
      setSelectedCategories(categoryIds || []);
    }, [category]);



    // Cập nhật giá trị đã chọn vào form
    const handleChange = (checkedValues: number[]) => {
      setSelectedCategories(checkedValues);
      form.setFieldsValue({ categoryIds: checkedValues });
    };

    

    // Lọc danh mục theo từ khóa
    const filteredCategories = categories.filter((cat) => {
      const matchesSearch = cat.categoryName.toLowerCase().includes(searchText.toLowerCase());
     
        
        return matchesSearch && (!cat.parentId || (category.result?.subCategories || []).some(subCat => subCat.id === cat.id));
      
    
    });
    

    



    // Nội dung dropdown
    const menu = (
      <div style={{ padding: "10px" }}>
        {/* Ô tìm kiếm */}
        <Input
          
          placeholder="Tìm kiếm"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: "20px"}}
        />
      
        {/* Danh sách checkbox */}
        <div style={{ maxHeight: "300px", minHeight: '100px' , borderRadius: "5px", display: "flex", flexDirection: "column", justifyContent: "center", }}>
          <Checkbox.Group
            value={selectedCategories}
            onChange={(values) => handleChange(values as number[])}
            style={{ display: "flex", flexDirection: "column", overflowY: "auto"}}
          >
            
            <Spin spinning={isFetching}>
             
              {filteredCategories.map((category) => (
                <StyledCheckbox 

                  key={category.id} 
                  value={category.id}
                  $isSelected={selectedCategories.includes(category.id as number)} // Kiểm tra nếu đã chọn
                >
                  {category.categoryName}
                </StyledCheckbox>
              ))}
            </Spin>
          
          </Checkbox.Group>
        </div>
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

export default CategorySelect;
