import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { FilterDropdownProps, TableRowSelection } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { fetchPermission } from '../../../redux/slices/permissionSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { isMobile } from 'react-device-detect';

interface DataType {
    key: string;
    permissionName: string;
    method: string;
    apiAccess: string;
    description: string;
}
interface ModalRoleProps {
  
   
    listPermissionIds: number[];
    setListPermissionIds: (value: any) => void;
   
}

type DataIndex = keyof DataType;

const ModalApi = (props: ModalRoleProps) => {
    
    const {listPermissionIds, setListPermissionIds} = props;
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [permissionData, setPermissionData] = useState<DataType[]>([]);
    const dispatch = useAppDispatch();
    const permissions = useAppSelector(state => state.permission.results);
    const isFetching = useAppSelector(state => state.permission.isFetching);

    //console.log("listPermissionIds: ", listPermissionIds)
    //console.log("Permission: ", permissions);




    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchPermission({ query: '' }));
        };
        
        fetchData();
        
    }, [dispatch]);

    useEffect(() => {
        setPermissionData(permissions.map((item) => ({
            key: item.id,
            permissionName: item.permissionName,
            method: item.method,
            apiAccess: item.apiAccess,
            description: item.description
        })))
    }, [permissions]);

    console.log("selectedRowKeys: ", selectedRowKeys);







    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex, placeholder: String): TableColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
            <Input
                ref={searchInput}
                placeholder={`Search ${placeholder || dataIndex}`}
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
            <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
            >
                Search
            </Button>
            <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{ width: 90 }}
            >
                Reset
            </Button>
            <Button
                type="link"
                size="small"
                onClick={() => {
                close();
                }}
            >
                close
            </Button>
            </Space>
        </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()
        ),
        
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns: TableColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'key',
            key: 'key',
            width: '12.5%',
            ...getColumnSearchProps('key', 'ID'),
            //sorter: (a, b) => a.id.length - b.id.length,
        },

        {
            title: 'Permission Name',
            dataIndex: 'permissionName',
            
            width: '40%',
            ...getColumnSearchProps('permissionName', 'Permission Name'),
            sorter: (a, b) => a.permissionName.localeCompare(b.permissionName),
        },
        {
            title: 'Method',
            dataIndex: 'method',
            width: '25%',
            ...getColumnSearchProps('method', 'Method'),
        },
        Table.EXPAND_COLUMN,
        Table.SELECTION_COLUMN
    ];


    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setListPermissionIds(newSelectedRowKeys.map((item) => item));
        setSelectedRowKeys(newSelectedRowKeys.map((item) => item));

        
        
    };

    console.log("listPermissionIds: ", listPermissionIds);

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys: listPermissionIds,
        onChange: onSelectChange,
    };

    return (
        <Table<DataType> 
           
            columns={columns} 
            dataSource={permissionData} 
            rowSelection={rowSelection}
            pagination={{ pageSize: 4 }}
            loading={isFetching}
            expandable={{
                expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                //rowExpandable: (record) => record.name !== 'Not Expandable',
            }}
            scroll={{ x: 'max-content' }}  // Make the table horizontally scrollable when the screen is smaller
            bordered
            size="middle"

        />
    );
};

export default ModalApi;
