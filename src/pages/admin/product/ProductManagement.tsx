import DataTable from "../../../components/DataTable";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { ProductType} from "../../../types/backend";
import { DeleteOutlined, EditOutlined, PlusOutlined, EyeOutlined } from "@ant-design/icons";
import { ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, Popconfirm, Space, Tag, Tooltip, message, notification } from "antd";
import { useState, useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import queryString from 'query-string';
import { fetchProducts } from "../../../redux/slices/productSlice";
// import Access from "@/components/share/access";
// import { ALL_PERMISSIONS } from "@/config/permissions";
import { sfLike } from "spring-filter-query-builder";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";


const ProductManagement = () => {
    
    const tableRef = useRef<ActionType>();

    const isFetching = useAppSelector(state => state.product.isFetching);
    const meta = useAppSelector(state => state.product.meta);
    const products = useAppSelector(state => state.product.results);
    
    const dispatch = useAppDispatch();


  

    const reloadTable = () => {
        tableRef?.current?.reload();
    }
   
    

    const columns: ProColumns<ProductType>[] = [
        {
            title: <span style={{fontSize: '15px', fontWeight: '600'}}>STT</span>,
            key: 'index',
            width: 70,
            align: "center",
            render: (text, record, index) => {
                return (
                    <>
                        {(index + 1) + (meta.page) * (meta.page_size)}
                    </>)
            },
            hideInSearch: true,
        },
        {
            title: <span style={{fontSize: '15px', fontWeight: '600'}}>ID</span>,
            key: 'id',
            dataIndex: 'id',
            align: "center",
            sorter: true,
            hideInSearch: true,
            width: 70,
        },
        {
            title: <span style={{fontSize: '15px', fontWeight: '600'}}>Sản phẩm</span>,
            dataIndex: 'productName',
            sorter: true,
            width: '25%',
            render: (text, record, index, action) => {
                return (
                    <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                        <img src={"https://res.cloudinary.com/dbu3hnaiz/image/upload/v1738775928/z51cfnhq6ihkhxtgwyzr.jpg"} style={{width: '40px', height: '40px', borderRadius: '50%'}} alt=""/>
                        {record.productName}
                    </div>
                    

                )
            }
           
            
        },

        {
            title: <span style={{fontSize: '15px', fontWeight: '600', display: 'flex', justifyContent: 'center'}}>Đã bán</span>,
            dataIndex: 'quantitySold',
            width: 75,
            sorter: true,
            align: 'center',
            
        },
        
        {
            title: <span style={{fontSize: '15px', fontWeight: '600', display: 'flex', justifyContent: 'center'}}>Trạng thái</span>,
            dataIndex: 'status',
            width: 80,
            align: 'center',
            render(dom, entity, index, action, schema) {
                return (
                <div style={{display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'center'}}>
                    <Tag color={entity.isActive ? "lime" : "red"}>
                        {entity.isActive?.toString() == '1' ? "Hoạt động" : "Vô hiệu"}
                    </Tag>
                </div>
                );
            },
            hideInSearch: true,

        },

        {
            title: <span style={{fontSize: '15px', fontWeight: '600'}}>Thời gian tạo</span>,
            dataIndex: 'createdAt',
            width: 125,
            sorter: true,
            render: (text, record, index, action) => {
                return (
                    <>{record.createdAt ? dayjs(record.createdAt).format('DD-MM-YYYY HH:mm:ss') : ""}</>
                )
            },
            hideInSearch: true,
        },
        {
            title: <span style={{fontSize: '15px', fontWeight: '600'}}>Thời gian cập nhật</span>,
            dataIndex: 'updatedAt',
            width: 125,
            sorter: true,
            render: (text, record, index, action) => {
                return (
                    <>{record.updatedAt ? dayjs(record.updatedAt).format('DD-MM-YYYY HH:mm:ss') : ""}</>
                )
            },
            hideInSearch: true,
        },
        {

            title: <span style={{fontSize: '15px', fontWeight: '600'}}>Thao tác</span>,
            hideInSearch: true,
            width: 80,
            align: 'center',
            render: (_value, entity, _index, _action) => (
                <Space style={{display: 'flex', justifyContent: 'center', gap: '15px'}}>
                    {/* < Access
                        permission={ALL_PERMISSIONS.USERS.UPDATE}
                        hideChildren
                    > */}
                    <NavLink to={`/admin/categories/${entity.id}`} >
                        <Tooltip title="Chỉnh sửa hoặc xem chi tiết sản phẩm">
                            <EditOutlined
                                style={{
                                    fontSize: 20,
                                    color: '#ffa500',
                                }}
                                type=""
                                
                            />
                        </Tooltip>
                    </NavLink>
                    {/* </Access > */}

                    {/* <Access
                        permission={ALL_PERMISSIONS.USERS.DELETE}
                        hideChildren
                    > */}
                        
                        <Popconfirm
                            placement="leftTop"
                            title={"Confirm deletion permission"}
                            description={"Are you sure you want to delete this permission?"}
                            onConfirm={() => {}}
                            okText="Confirm" 
                            cancelText="Cancel"
                            
                        >
                            
                            <span style={{ cursor: "pointer", margin: "0 0px" }}>
                                <Tooltip title="Xóa vĩnh viễn sản phẩm">
                                    <DeleteOutlined
                                        
                                        style={{
                                            fontSize: 20,
                                            color: '#ff4d4f',
                                        }}
                                    />
                                </Tooltip>
                            </span>
                        </Popconfirm>
                    {/* </Access> */}
                </Space >
            ),

        },
    ];

    const buildQuery = (params: any, sort: any, filter: any) => {
        const q: any = {
            page: params.current - 1,
            size: params.pageSize,
            filter: ""
        }

        
        const clone = { ...params };
        if (clone.id) q.filter = `${sfLike("id", clone.id)}`;
        if (clone.productName) q.filter = `${sfLike("productName", clone.productName)}`;
        
        let temp = "";
        // if (q.filter) temp = q.filter + `&page=${q.page}&size=${q.size}`;

        if (!q.filter) delete q.filter;
            temp += queryString.stringify(q);
       

        let sortBy = "";
        if (sort && sort.id) {
            sortBy = sort.id === 'ascend' ? "sort=id,asc" : "sort=id,desc";
        }
        if (sort && sort.productName) {
            sortBy = sort.productName === 'ascend' ? "sort=productName,asc" : "sort=productName,desc";
        }
        if (sort && sort.createdAt) {
            sortBy = sort.createdAt === 'ascend' ? "sort=createdAt,asc" : "sort=createdAt,desc";
        }
        if (sort && sort.updatedAt) {
            sortBy = sort.updatedAt === 'ascend' ? "sort=updatedAt,asc" : "sort=updatedAt,desc";
        }

        //mặc định sort theo updatedAt
        if (Object.keys(sortBy).length === 0) {
            temp = `${temp}&sort=updatedAt,desc`;
        } else {
            temp = `${temp}&${sortBy}`;
        }

        return temp;
    }
    
    
    return (
        
        <div style={{ padding: 20 }}>
            {/* <Access
                permission={ALL_PERMISSIONS.USERS.GET_PAGINATE}
            > */}
                <DataTable<ProductType>
                    
                    
                    actionRef={tableRef}
                    headerTitle="Danh sách sản phẩm"
                    rowKey="id"
                    loading={isFetching}
                    columns={columns}
                    dataSource={products}
                    request={async (params, sort, filter): Promise<any> => {
                        let query = "isSummary=true&";
                        query += buildQuery(params, sort, filter);
                        console.log('query: ', query);
                        await dispatch(fetchProducts({ query }));
                       
                        
                    }}
                    scroll={{ x: 1300 }}
                    pagination={
                        {
                            pageSize: meta.page_size,
                            total: meta.total_elements,
                            current: meta.page + 1,
                            showSizeChanger: true,       
                        }
                    }
                    rowSelection={false}
                   
                    toolBarRender={(_action, _rows): any => {
                        return (
                            <Link to="/admin/products/create">
                                <Button
                                    icon={<PlusOutlined style={{color: '#fff'}}/>}
                                    type="primary"
                                    
                                    
                                >
                                    <span style={{color: "#fff" }}>Thêm mới</span>
                                </Button>
                            </Link>
                        );
                    }}
                />
        </div >
    )
}

export default ProductManagement;