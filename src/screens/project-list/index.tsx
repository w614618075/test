import React from 'react';
import { useEffect, useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { TsReactTest } from '../try-use/try-use-array'
// import { LoginScreen } from './login'
import { cleanObject, useMount, useDebounce } from '../../utils';
import { useHttp } from 'utils/http';
import styled from '@emotion/styled'

export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })

    const debouncedParam = useDebounce(param, 1000)
    const [users, setUsers] = useState([])
    const [list, setList] = useState([])
    const client = useHttp()
    useEffect(() => {
        client('projects', { data: cleanObject(debouncedParam) }).then(setList)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedParam])

    useMount(() => {
        client('users').then(setUsers)
    })

    return <Container>
        <h1>项目列表</h1>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List users={users} list={list} />
        {/* <TsReactTest /> */}
        {/* <LoginScreen /> */}
    </Container>
}

const Container = styled.div`
    padding:3.2rem;
`
