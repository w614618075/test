import { render } from '@testing-library/react'
import { Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import { Link } from 'react-router-dom' // react-router 和 react-router-dom 的关系，相当于 react 和 react-dom/react-native/...
import { User } from './search-panel'

// TODO 把所有的ID都改成number类型
export interface Project {
    id: string;
    name: string;
    personId: string;
    pin: string;
    organization: string;
    created: number;
}
interface ListProps extends TableProps<Project> {
    users: User[]
}

export const List = ({ users, ...props }: ListProps) => {
    const columns = [
        {
            title: '名称',
            sorter: (a: any, b: any) => a.name.localeCompare(b.name),
            render(value: any, project: any) {
                return <Link to={`/projects/${String(project.id)}`}>{project.name}</Link>
            }
        },
        {
            title: '部门',
            dataIndex: 'organization',
            sorter: (a: any, b: any) => a.name.localeCompare(b.name)
        },
        {
            title: '负责人',
            render(value: any, project: any) {
                return <span>
                    {users.find(user => user.id === project.personId)?.name || '未知'}
                </span>
            }
        },
        {
            title: '创建时间',
            render(value: any, project: any) {

                return <span>
                    {
                        project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'
                    }
                </span>
            }
        },
    ]
    return <Table pagination={false} {...props} columns={columns} />


}