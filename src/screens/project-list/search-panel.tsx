import React from 'react'
import { Input, Select } from 'antd'
import { Form } from 'antd'
import { Project } from './list'
import { UserSelect } from 'components/user-select'

export interface User {
    id: number,
    name: string,
    email: string,
    title: string,
    organization: string,
    token: string,
}
interface SearchPanelPorps {
    users: User[],
    param: Partial<Pick<Project, 'name' | 'personId'>>

    setParam: (param: SearchPanelPorps['param']) => void
}
export const SearchPanel = ({ users, param, setParam }: SearchPanelPorps) => {

    // console.log(users, 'users');

    return <Form layout={'inline'} style={{ marginBottom: '2rem', marginTop: '2rem' }}>
        {/* setParam(Object.assign({}, param, {name:ect.target.value})) */}
        <Form.Item>
            <Input placeholder={'项目名'} type="text" value={param.name} onChange={evt => setParam({
                ...param,
                name: evt.target.value
            })} />

        </Form.Item>
        <Form.Item>
            <UserSelect
                defaultOptionName='负责人'
                value={param.personId}
                onChange={value => setParam({
                    ...param,
                    personId: value
                })}
            />
           
        </Form.Item>

    </Form>
} 