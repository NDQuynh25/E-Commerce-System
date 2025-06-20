import DataTable from "../../components/DataTable";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IUser } from "../../types/backend";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { ActionType, ProColumns } from "@ant-design/pro-components";
import { Button, Popconfirm, Space, message, notification } from "antd";
import { useState, useRef } from "react";
import dayjs from "dayjs";
import { callDeleteUser } from "../../api/userApi";

import ViewDetailUser from "../../components/admin/user/ViewDetailUser";
import ModalUser from "../../components/admin/user/ModalUser";
// import ViewDetailUser from "@/components/admin/user/view.user";
// import Access from "@/components/share/access";
// import { ALL_PERMISSIONS } from "@/config/permissions";

import { fetchUser } from "../../redux/slices/userSlice";

const UserManagement = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [dataInit, setDataInit] = useState<IUser | null>(null);
  const [openViewDetail, setOpenViewDetail] = useState<boolean>(false);

  const tableRef = useRef<ActionType>();

  const isFetching = useAppSelector((state) => state.user.isFetching);
  const meta = useAppSelector((state) => state.user.meta);
  const users = useAppSelector((state) => state.user.results);
  const dispatch = useAppDispatch();

  const handleDeleteUser = async (id: string | undefined) => {
    if (id) {
      const res = await callDeleteUser(id);
      if (+res.status === 200) {
        message.success("Xóa User thành công");
        reloadTable();
      } else {
        notification.error({
          message: "Có lỗi xảy ra",
          description: res.message,
        });
      }
    }
  };

  const reloadTable = () => {
    tableRef?.current?.reload();
  };

  const handleRowClick = (record: IUser) => {
    setDataInit(record);
    setOpenViewDetail(true);
    console.log("record: " + JSON.stringify(record));
    console.log("op");
  };

  const columns: ProColumns<IUser>[] = [
    {
      title: "STT",
      key: "index",
      width: 50,
      align: "center",
      render: (text, record, index) => {
        return <>{index + 1 + meta.page * meta.page_size}</>;
      },
      hideInSearch: true,
    },
    {
      title: "ID",
      dataIndex: "id",
      sorter: true,
      align: "center",
      width: 50,
    },
    {
      title: "Name",
      dataIndex: "fullName",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
    },

    {
      title: "Role",
      dataIndex: ["role", "roleName"],
      //sorter: true,
      hideInSearch: true,
    },

    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      width: 200,
      sorter: true,
      render: (text, record, index, action) => {
        return (
          <>
            {record.createdAt
              ? dayjs(record.createdAt).format("DD-MM-YYYY HH:mm:ss")
              : ""}
          </>
        );
      },
      hideInSearch: true,
    },
    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
      width: 200,
      sorter: true,
      render: (text, record, index, action) => {
        return (
          <>
            {record.updatedAt
              ? dayjs(record.updatedAt).format("DD-MM-YYYY HH:mm:ss")
              : ""}
          </>
        );
      },
      hideInSearch: true,
    },
    {
      title: "Actions",
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
              color: "#ffa500",
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
              color: "#1890ff",
              cursor: "pointer",
              margin: "0 5px",
            }}
            onClick={() => {
              setOpenViewDetail(true);
              setDataInit(entity);
            }}
          />
          <Popconfirm
            placement="leftTop"
            title={"Xác nhận xóa user"}
            description={"Bạn có chắc chắn muốn xóa user này ?"}
            onConfirm={() => handleDeleteUser(entity.id)}
            okText="Xác nhận"
            cancelText="Cancel"
          >
            <span style={{ cursor: "pointer", margin: "0 0px" }}>
              <DeleteOutlined
                style={{
                  fontSize: 20,
                  color: "#ff4d4f",
                }}
              />
            </span>
          </Popconfirm>
          {/* </Access> */}
        </Space>
      ),
    },
  ];

  const buildQuery = (params: any, sort: any, filter: any) => {
    const q: any = {
      page: params.current - 1,
      size: params.pageSize,
      filter: "",
    };

    const clone = { ...params };
    if (clone.id) q.filter = `${"id=like:" + clone.id}`;
    if (clone.fullName) {
      q.filter = q.filter
        ? q.filter + "&" + `${"fullName=like:" + clone.fullName}`
        : `${"fullName=like:" + clone.fullName}`;
    }
    if (clone.email) {
      q.filter = q.filter
        ? q.filter + "&" + `${"email=like:" + clone.email}`
        : `${"email=like:" + clone.email}`;
    }
    let temp = `page=${q.page}&size=${q.size}`;
    if (q.filter) temp = q.filter + `&page=${q.page}&size=${q.size}`;

    let sortBy = "";
    if (sort && sort.id) {
      sortBy = sort.id === "ascend" ? "sort=id,asc" : "sort=id,desc";
    }
    if (sort && sort.fullName) {
      sortBy =
        sort.fullName === "ascend" ? "sort=fullName,asc" : "sort=fullName,desc";
    }
    if (sort && sort.email) {
      sortBy = sort.email === "ascend" ? "sort=email,asc" : "sort=email,desc";
    }
    if (sort && sort.createdAt) {
      sortBy =
        sort.createdAt === "ascend"
          ? "sort=createdAt,asc"
          : "sort=createdAt,desc";
    }
    if (sort && sort.updatedAt) {
      sortBy =
        sort.updatedAt === "ascend"
          ? "sort=updatedAt,asc"
          : "sort=updatedAt,desc";
    }

    //mặc định sort theo updatedAt
    if (Object.keys(sortBy).length === 0) {
      temp = `${temp}&sort=updatedAt,desc`;
    } else {
      temp = `${temp}&${sortBy}`;
    }

    return temp;
  };

  return (
    <div style={{ padding: 20 }}>
      {/* <Access
                permission={ALL_PERMISSIONS.USERS.GET_PAGINATE}
            > */}
      <DataTable<IUser>
        actionRef={tableRef}
        headerTitle="Danh sách Users"
        rowKey="id"
        loading={isFetching}
        columns={columns}
        dataSource={users}
        request={async (params, sort, filter): Promise<any> => {
          const query = buildQuery(params, sort, filter);
          console.log("query: ", query);
          dispatch(fetchUser({ query }));
        }}
        scroll={{ x: true }}
        pagination={{
          current: meta.page + 1,
          pageSize: meta.page_size,
          showSizeChanger: true,
          total: meta.total_elements,
        }}
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
              Thêm mới
            </Button>
          );
        }}
      />
      {/* </Access> */}
      <ModalUser
        openModal={openModal}
        setOpenModal={setOpenModal}
        reloadTable={reloadTable}
        dataInit={dataInit}
        setDataInit={setDataInit}
      />
      <ViewDetailUser
        onClose={setOpenViewDetail}
        open={openViewDetail}
        dataInit={dataInit}
        setDataInit={setDataInit}
      />
    </div>
  );
};

export default UserManagement;
