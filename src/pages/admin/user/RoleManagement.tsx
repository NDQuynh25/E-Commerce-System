import DataTable from "../../../components/DataTable";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { IRole} from "../../../types/backend";
import { DeleteOutlined, EditOutlined, PlusOutlined, EyeOutlined } from "@ant-design/icons";
import { ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, Modal, Popconfirm, Space, Tag, message, notification } from "antd";
import { useState, useRef } from 'react';
import dayjs from 'dayjs';
import queryString from 'query-string';
import ModalRole from "../../../components/admin/role/ModalRole";
// import Access from "@/components/share/access";
// import { ALL_PERMISSIONS } from "@/config/permissions";
import { sfLike } from "spring-filter-query-builder";
import { fetchRole } from "../../../redux/slices/roleSlice";
import { callDeleteRole } from "../../../api/roleApi";
import ViewDetailRole from "../../../components/admin/role/ViewDetailRole";

const RoleManagement = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [dataInit, setDataInit] = useState<IRole | null>(null);
    const [openViewDetail, setOpenViewDetail] = useState<boolean>(false);

    const tableRef = useRef<ActionType>();

    const isFetching = useAppSelector(state => state.role.isFetching);
    const meta = useAppSelector(state => state.role.meta);
    const roles = useAppSelector(state => state.role.results);
    const dispatch = useAppDispatch();


    const handleDeleteRole = async (id: string | undefined) => {
        if (id) {
            const res = await callDeleteRole(id);
            if (+res.status === 200) {
                message.success('Role deleted successfully');
                reloadTable();
            } else {
                notification.error({
                    message: 'An error occurred',
                    description: res.message
                });
            }
        }
    }

    const reloadTable = () => {
        tableRef?.current?.reload();
    }

    

    const columns: ProColumns<IRole>[] = [
        {
            title: 'STT',
            key: 'index',
            width: 50,
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
            title: 'ID',
            dataIndex: 'id',
            align: "center",
            sorter: true,
            //hideInSearch: true,

        },
        {
            title: 'Role Name',
            dataIndex: 'roleName',
            sorter: true,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render(dom, entity, index, action, schema) {
                return <>
                    <Tag color={entity.isActive ? "lime" : "red"} >
                        {entity.isActive?.toString() == '1' ? "ACTIVE" : "INACTIVE"}
                    </Tag>
                </>
            },
            hideInSearch: true,

        },

        {
            title: 'CreatedAt',
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
            title: 'UpdatedAt',
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

            title: 'Actions',
            hideInSearch: true,
            width: 50,
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
                                setOpenModal(true);
                                setDataInit(entity);
                            }}
                        />
                    {/* </Access > */}

                    {/* <Access
                        permission={ALL_PERMISSIONS.USERS.DELETE}
                        hideChildren
                    > */}
                        <EyeOutlined
                            style={{
                                fontSize: 20,
                                color: '#1890ff',
                                cursor: "pointer", 
                                margin: "0 5px"
                            }}
                            onClick={() => {
                                setOpenViewDetail(true);
                                setDataInit(entity);
                            }}

                        />
                        <Popconfirm
                            placement="leftTop"
                            title={"Confirm role deletion"}
                            description={"Are you sure you want to delete this role?"}
                            onConfirm={() => handleDeleteRole(entity.id)}
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
        if (clone.id) q.filter = `${sfLike("id", clone.id)}`;
        if (clone.roleName) q.filter = `${sfLike("roleName", clone.roleName)}`;
        if (clone.email) {
            q.filter = clone.name ?
                q.filter + " and " + `${sfLike("email", clone.email)}`
                : `${sfLike("email", clone.email)}`;
        }

        if (!q.filter) delete q.filter;
        let temp = queryString.stringify(q);

        let sortBy = "";
        if (sort && sort.id) {
            sortBy = sort.id === 'ascend' ? "sort=id,asc" : "sort=id,desc";
        }
        if (sort && sort.roleName) {
            sortBy = sort.roelName === 'ascend' ? "sort=roelName,asc" : "sort=roelName,desc";
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
        <div>
            {/* <Access
                permission={ALL_PERMISSIONS.USERS.GET_PAGINATE}
            > */}
                <DataTable<IRole>
                    actionRef={tableRef}
                    headerTitle="List of Roles"
                    rowKey="id"
                    loading={isFetching}
                    columns={columns}
                    dataSource={roles}
                    request={async (params, sort, filter): Promise<any> => {
                        const query = buildQuery(params, sort, filter);
                        console.log(query);
                        dispatch(fetchRole({query}));
                       
                        
                    }}
                    scroll={{ x: true }}
                    pagination={
                        {
                            current: meta.page+1,
                            pageSize: meta.page_size,
                            showSizeChanger: true,
                            total: meta.total_elements,
                        }
                    }
                    rowSelection={false}
                    toolBarRender={(_action, _rows): any => {
                        return (
                            <Button
                                icon={<PlusOutlined />}
                                type="primary"
                                onClick={() => {
                                    setOpenModal(true);
                                    setDataInit(null);
                                }}
                            >
                                Add new
                            </Button>
                        );
                    }}
                />
            {/* </Access> */}
            <ModalRole
                openModal={openModal}
                setOpenModal={setOpenModal}
                dataInit={dataInit}
                setDataInit={setDataInit}
                reloadTable={reloadTable}
            />
            <ViewDetailRole
                open={openViewDetail}
                onClose={setOpenViewDetail}
                dataInit={dataInit}
                setDataInit={setDataInit}
            />
            
        </div >
    )
}

export default RoleManagement;