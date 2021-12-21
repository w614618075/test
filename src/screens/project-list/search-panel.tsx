import React from 'react'
import { useEffect, useState } from 'react';

export interface User {
    id:string,
    name:string,
    email:string,
    title:string,
    organization:string
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


    return <form>
        {/* setParam(Object.assign({}, param, {name:ect.target.value})) */}
        <input type="text" value={param.name} onChange={evt => setParam({
            ...param,
            name: evt.target.value
        })} />
        <select value={param.personId} onChange={evt => setParam({
            ...param,
            personId: evt.target.value
        })}>
            <option value={''}>负责人</option>
            {
                users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
            }
        </select>
    </form>
} 