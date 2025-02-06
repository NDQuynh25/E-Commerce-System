import React from 'react';
import type { CascaderProps } from 'antd';
import { Cascader } from 'antd';
import { Form } from 'antd';
import styled from 'styled-components';


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
        font-size: 0.95rem !important;
        font-weight: 500 !important;
        letter-spacing: 0px !important; 
        text-align: right !important;
        justify-content: left !important;
        margin-top: 5px !important;
        margin-right: 15px !important;
      
    }

`;



interface TreeNode {
  id: string;
  value: string;
  label: string;
  parent_id: string | null;
  children?: TreeNode[];
}


function buildTree(data: any[]): TreeNode[] {
  const map: { [key: number]: TreeNode } = {};
  const tree: TreeNode[] = [];

  // Tạo một map để truy cập nhanh qua id
  data.forEach(item => {
    map[item.id] = { 
        id: item.id, 
        value: item.id, 
        label: item.name, 
        parent_id: item.parent_id, 
        children: [] 
    };
  });
  // Duyệt qua từng phần tử và gán vào cây hoặc làm con
  data.forEach(item => {
      if (item.parent_id === null) {
          tree.push(map[item.id]); // Đây là node root
      } else {
          if (map[item.parent_id]) {
              map[item.parent_id].children?.push(map[item.id]); // Gán làm con
          }
      }
  });

  return tree;
}

const onChange: CascaderProps<TreeNode>['onChange'] = (value) => {
  console.log(value);

  
};

const CategoryMenu: React.FC = () => {
  // Ví dụ dữ liệu từ DB
const data: any[] = [
  { id: 1, name: "Zhejiang", parent_id: null },
  { id: 2, name: "Jiangsu", parent_id: null },
  { id: 3, name: "Hangzhou", parent_id: 1 },
  { id: 4, name: "Nanjing", parent_id: 2 },
  { id: 5, name: "West Lake", parent_id: 3 },
  { id: 6, name: "Zhong Hua Men", parent_id: 4 },
];

const options = buildTree(data);
console.log(options);
  return(
    <CustomItem label="Category" name="category" rules={[{ required: true, message: 'Please select a category!' }]} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
      <Cascader
        options={options}
        onChange={onChange}
        placeholder="Please select"
      />
    </CustomItem>
  );
}

export default CategoryMenu;
