import { render } from '@testing-library/react'
import { Table } from 'antd'
import React from 'react'
import { User } from './search-panel'
interface Project {
    id: string;
    name: string;
    personId: string;
    pin: string;
    organization: string;
}
interface ListProps {
    list: Project[];
    users: User[]
}

export const List = ({ users, list }:ListProps) => {
    const columns = [
        {
            title:'名称',
            dataIndex:'name',
            sorter:(a:any,b:any)=> a.name.localeCompare(b.name)
        },
        {
            title:'负责人',
            render(value:any,project:any){
                return <span>
                    {users.find(user => user.id === project.personId)?.name || '未知'}
                </span>
            }
        }
    ]
    return <Table pagination={false} dataSource={list} columns={columns} />
       
    
}