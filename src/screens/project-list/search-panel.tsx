import React from 'react'
import { Input, Select } from 'antd'
import { Form } from 'antd'

export interface User {
    id: string,
    name: string,
    email: string,
    title: string,
    organization: string,
    token: string,
}
interface SearchPanelPorps {
    users: User[],
    param: {
        name: string;
        personId: string;
    },
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
            <Select value={param.personId} onChange={value => setParam({
                ...param,
                personId: value
            })}>
                <Select.Option value={''}>负责人</Select.Option>
                {
                    users.map(user => <Select.Option key={user.id} value={String(user.id)}>{user.name}</Select.Option>)
                }
            </Select>
        </Form.Item>

    </Form>
} 