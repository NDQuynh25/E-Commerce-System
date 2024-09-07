import React, { useEffect, useState } from 'react';
import { Switch, Transfer } from 'antd';
import type { TransferProps } from 'antd';
import { IPermission } from '../../../types/backend';
import { callFetchPermission } from '../../../api/permissionApi';


interface RecordType {
    key: string;
    title: string;
   
}
interface IState {
    listPermissionIds: string[];
    setListPermissionIds: (listPermissionIds: string[]) => void;
}


const ModalApi= (props: IState) => {
    const { listPermissionIds, setListPermissionIds } = props;


    const [targetKeys, setTargetKeys] = useState<TransferProps['targetKeys']>([]);
    const [listPermissions, setListPermissions] = useState<IPermission[]>([]);
    
    const [mockData, setMockData] = useState<RecordType[]>([]);

    const handleListPermissionTransferToRecordType = (listPermissions: IPermission[]): RecordType[] => {    
        return listPermissions.map((item) => {
            return {
                key: item.id,
                title: item.name
            };
        });
    }
    useEffect(() => {
        setTargetKeys(listPermissionIds);
    }, []);

    useEffect(() => {
        fetchPermissionList('').then((res) => {
            setListPermissions(res);
        });
    }, []);

   

    useEffect(() => {
        setMockData(handleListPermissionTransferToRecordType(listPermissions));
    }, [listPermissions]);

  



    async function fetchPermissionList(name: string): Promise<IPermission[]> {
        const res = await callFetchPermission(`?page=0&size=100`);
        if (res && res.data) {
            return res.data.results;

        }
        return [];
    }

    
    
    const handleChange: TransferProps['onChange'] = (newTargetKeys) => {
        
        setTargetKeys(newTargetKeys);
        setListPermissionIds(newTargetKeys.toString().split(','));
    };
    
    const handleSearch: TransferProps['onSearch'] = (dir, value) => {
        console.log('search:', dir, value);
    };
    console.log('targetkeys', targetKeys);
    return (
        <Transfer
            dataSource={mockData}
            showSearch
                listStyle={{
                    width: 250,
                    height: 300,
                }}
            oneWay
            targetKeys={targetKeys}
            onChange={handleChange}
            onSearch={handleSearch}
            pagination={{ pageSize: 5 }}
            render={(item) => item.title}
        />
    );
  
};

export default ModalApi;
