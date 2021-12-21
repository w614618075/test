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
    return <table  style={{ margin: '0 auto', marginTop: 30, width: 240, border:"1px solid #aaa" }}>
        <thead>
            <tr>
                <th>名称</th>
                <th>负责人</th>
            </tr>
        </thead>
        <tbody>
            {
                list?.map(project => <tr key={project.id}>
                    <td>{project.name}</td>
                    <td>{users.find(user => user.id === project.personId)?.name || '未知'}</td>
                </tr>)
            }
        </tbody>
    </table>
}