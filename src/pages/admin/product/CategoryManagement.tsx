import DataTable from "../../../components/DataTable";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { CategoryType} from "../../../types/backend";
import { DeleteOutlined, EditOutlined, PlusOutlined, EyeOutlined } from "@ant-design/icons";
import { ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, Popconfirm, Space, Tag, Tooltip, message, notification } from "antd";
import { useState, useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import { callDeleteCategory } from "../../../api/categoryApi";
import { setLoading } from "../../../redux/slices/globalSlice";
import queryString from 'query-string';
// import Access from "@/components/share/access";
// import { ALL_PERMISSIONS } from "@/config/permissions";
import { sfLike } from "spring-filter-query-builder";
import { Link } from "react-router-dom";
import { fetchCategories, fetchCategory, setEdit } from "../../../redux/slices/categorySlice";
import { NavLink } from "react-router-dom";


const CategoryManagement = () => {
    
    const tableRef = useRef<ActionType>();

    const isFetching = useAppSelector(state => state.category.isFetching);
    const meta = useAppSelector(state => state.category.meta);
    const categories = useAppSelector(state => state.category.results);
    
    const dispatch = useAppDispatch();
    // const useStyle = createStyles(({ css, token }) => {
    //     const { antCls } = token;
    //     return {
    //       customTable: css`
    //         ${antCls}-table {
    //           ${antCls}-table-container {
    //             ${antCls}-table-body,
    //             ${antCls}-table-content {
    //               scrollbar-width: thin;
    //               scrollbar-color: #eaeaea transparent;
    //               scrollbar-gutter: stable;
    //             }
    //           }
    //         }
    //       `,
    //     };
    //   });

    const deleteCategory = async (id: number) => {
            dispatch(setLoading(true));
            try {
                const res = await callDeleteCategory(id.toString());
    
                
                if (res.status === 200) {
                    dispatch(setLoading(false));
                    notification.success({
                        message: 'Success',
                        description: 'Category deleted successfully',
                    });
                } else {
                    dispatch(setLoading(false));
                    notification.error({
                        message: 'Error',
                        description: 'Failed to delete category',
                    });
                }
            }
            catch (err) {
                dispatch(setLoading(false));
                notification.error({
                    message: 'Error',
                    description: 'Failed to delete category'
                });
            }
        }
  

    const reloadTable = () => {
        tableRef?.current?.reload();
    }
    useEffect(() => {
        console.log('categories: ', categories);
    }, [categories])

    

    const columns: ProColumns<CategoryType>[] = [
        {
            title: <span style={{fontSize: '15px', fontWeight: '600'}}>Stt</span>,
            key: 'index',
            width: 75,
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
            width: 75,
        },
        {
            title: <span style={{fontSize: '15px', fontWeight: '600'}}>Danh mục</span>,
            dataIndex: 'categoryName',
            sorter: true,
            width: '20%',
           
            
        },

        {
            title: <span style={{fontSize: '15px', fontWeight: '600'}}>Số lượng</span>,
            dataIndex: 'productQuantity',
            width: '10%',
            sorter: true,
            
        },
        
        {
            title: <span style={{fontSize: '15px', fontWeight: '600'}}>Trạng thái</span>,
            dataIndex: 'status',
            width: '15%',
            render(dom, entity, index, action, schema) {
                return <>
                    <Tag color={entity.isActive ? "lime" : "red"} >
                        {entity.isActive?.toString() == '1' ? "Hoạt động" : "Vô hiệu"}
                    </Tag>
                </>
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
            width: 100,
            align: 'center',
            render: (_value, entity, _index, _action) => (
                <Space style={{display: 'flex', justifyContent: 'center', gap: '15px'}}>
                    {/* < Access
                        permission={ALL_PERMISSIONS.USERS.UPDATE}
                        hideChildren
                    > */}
                    <NavLink to={`/admin/categories/${entity.id}`} >
                        <Tooltip title="Chỉnh sửa hoặc xem chi tiết danh mục">
                            <EditOutlined
                                style={{
                                    fontSize: 20,
                                    color: '#ffa500',
                                }}
                                type=""
                                onClick={() => {dispatch(setEdit(true))}}
                                
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
                            title={"Xác nhận xóa danh mục"}
                            description={"Bạn có chắc chắn muốn xóa danh mục này không?"}
                            onConfirm={() => {
                                deleteCategory(entity.id as number); 
                                reloadTable()
                            }}
                            okText={<p>Xác nhận</p>} 
                            cancelText={<p>Hủy</p>}
                            
                        >
                            
                            <span style={{ cursor: "pointer", margin: "0 0px" }}>
                                <Tooltip title="Xóa vĩnh viễn danh mục">
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
        if (clone.categoryName) q.filter = `${sfLike("categoryName", clone.categoryName)}`;
        
        let temp = "";
        // if (q.filter) temp = q.filter + `&page=${q.page}&size=${q.size}`;

        if (!q.filter) delete q.filter;
            temp += queryString.stringify(q);
       

        let sortBy = "";
        if (sort && sort.id) {
            sortBy = sort.id === 'ascend' ? "sort=id,asc" : "sort=id,desc";
        }
        if (sort && sort.categoryName) {
            sortBy = sort.categoryName === 'ascend' ? "sort=categoryName,asc" : "sort=categoryName,desc";
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
                <DataTable<CategoryType>
                    
                    
                    actionRef={tableRef}
                    headerTitle="Danh sách danh mục"
                    rowKey="id"
                    loading={isFetching}
                    columns={columns}
                    dataSource={categories}
                    request={async (params, sort, filter): Promise<any> => {
                        let query = "";
                        query += buildQuery(params, sort, filter);
                        console.log('query: ', query);
                        await dispatch(fetchCategories({ query }));
                       
                        
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
                            <Link to="/admin/categories/create"  >
                                <Button
                                    icon={<PlusOutlined style={{color: '#fff'}}/>}
                                    type="primary"
                                    onClick={() => {dispatch(setEdit(false))}}   
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

export default CategoryManagement;