import React from 'react';
import { useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from '../../utils';
import styled from '@emotion/styled'
import { Typography } from 'antd';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';
import { Helmet } from 'react-helmet';
import { useUrlQueryParam } from 'utils/url';
export const ProjectListScreen = () => {


    // const [keys] = useState<('name'|'personId')[]>(['name','personId'])

    // 基本类型可以放到依赖里，组件状态可以放到依赖里，非组件状态的对象，绝不能放到依赖里
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    // console.log(param,'param');

    const debouncedParam = useDebounce(param, 200)
    const { isLoading, error, data: list } = useProjects(debouncedParam)
    const { data: users } = useUsers()
    useDocumentTitle("项目列表", false)
    console.log(useUrlQueryParam(['name']));

    return <Container>
        <h1>项目列表</h1>
        <SearchPanel users={users || []} param={param} setParam={setParam} />
        {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
        <List users={users || []} dataSource={list || []} loading={isLoading} />
        {/* <TsReactTest /> */}
        {/* <LoginScreen /> */}
    </Container>
}
ProjectListScreen.whyDidYouRender = false // 查看无限渲染原因
const Container = styled.div`
    padding:3.2rem;
`


