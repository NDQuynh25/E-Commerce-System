import DataTable from "../../../components/DataTable";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { IPermission} from "../../../types/backend";
import { DeleteOutlined, EditOutlined, PlusOutlined, EyeOutlined } from "@ant-design/icons";
import { ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, Popconfirm, Space, Tag, message, notification } from "antd";
import { useState, useRef } from 'react';
import dayjs from 'dayjs';
import queryString from 'query-string';
// import Access from "@/components/share/access";
// import { ALL_PERMISSIONS } from "@/config/permissions";
import { sfLike } from "spring-filter-query-builder";
import { fetchPermission } from "../../../redux/slices/permissionSlice";
import { callDeletePermission } from "../../../api/permissionApi";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";


const CategoryManagement = () => {
    
    const tableRef = useRef<ActionType>();

    const isFetching = useAppSelector(state => state.permission.isFetching);
    const meta = useAppSelector(state => state.permission.meta);
    const permissions = useAppSelector(state => state.permission.results);
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


  

    const reloadTable = () => {
        tableRef?.current?.reload();
    }

    

    const columns: ProColumns<IPermission>[] = [
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
            dataIndex: 'quantity',
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
            width: 200,
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
            width: 200,
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
            render: (_value, entity, _index, _action) => (
                <Space>
                    {/* < Access
                        permission={ALL_PERMISSIONS.USERS.UPDATE}
                        hideChildren
                    > */}
                        <EditOutlined
                            style={{
                                fontSize: 20,
                                color: '#ffa500',
                            }}
                            type=""
                            onClick={() => {
                                // setOpenModal(true);
                                // setDataInit(entity);
                            }}
                        />
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
                                <DeleteOutlined
                                    style={{
                                        fontSize: 20,
                                        color: '#ff4d4f',
                                    }}
                                />
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
        if (clone.name) q.filter = `${sfLike("name", clone.name)}`;
        if (clone.email) {
            q.filter = clone.name ?
                q.filter + " and " + `${sfLike("email", clone.email)}`
                : `${sfLike("email", clone.email)}`;
        }

        if (!q.filter) delete q.filter;
        let temp = queryString.stringify(q);

        let sortBy = "";
        if (sort && sort.name) {
            sortBy = sort.name === 'ascend' ? "sort=name,asc" : "sort=name,desc";
        }
        if (sort && sort.email) {
            sortBy = sort.email === 'ascend' ? "sort=email,asc" : "sort=email,desc";
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
                <DataTable<IPermission>
                    
                    actionRef={tableRef}
                    headerTitle="Danh sách danh mục"
                    rowKey="id"
                    loading={isFetching}
                    columns={columns}
                    dataSource={permissions}
                    request={async (params, sort, filter): Promise<any> => {
                        const query = buildQuery(params, sort, filter);
                        await dispatch(fetchPermission({ query }));
                       
                        
                    }}
                    scroll={{ x: true }}
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
                            <Link to="/admin/categories/create">
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

export default CategoryManagement;