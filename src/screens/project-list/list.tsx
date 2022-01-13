import { render } from '@testing-library/react'
import { Table, TableProps } from 'antd'
import { Pin } from 'components/pin'
import dayjs from 'dayjs'
import React from 'react'
import { Link } from 'react-router-dom' // react-router 和 react-router-dom 的关系，相当于 react 和 react-dom/react-native/...
import { useEditProject } from 'utils/project'
import { User } from './search-panel'

// TODO 把所有的ID都改成number类型
export interface Project {
    id: number;
    name: string;
    personId: number;
    pin: boolean;
    organization: string;
    created: number;
}
interface ListProps extends TableProps<Project> {
    users: User[]
    refresh?: () => void
}

export const List = ({ users, ...props }: ListProps) => {
    const { mutate } = useEditProject()
    // const PinProject = (id: number, pin: boolean) => mutate({ id, pin })
    const PinProject = (id: number) => (pin: boolean) => mutate({ id, pin }).then(props.refresh)
    const columns = [
        {
            title: <Pin checked={true} disabled={true} />,
            render(value: any, project: any) {
                console.log('project', project);

                return <Pin checked={project.pin} onCheckedChange={PinProject(project.id)} />
            }
        },
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

    return <Table pagination={false} {...props} columns={columns} rowKey={rowkey => rowkey.id} />


}