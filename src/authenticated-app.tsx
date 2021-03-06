
import React from 'react'
import styled from '@emotion/styled'
import { useAuth } from 'context/auth-context'
import { ProjectListScreen } from "screens/project-list"
import { Row } from 'components/lib'
import { ReactComponent as SLogo } from 'assets/software-logo.svg'
import { Button, Dropdown, Menu } from 'antd'
import { Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { ProjectScreen } from 'screens/peoject'
import { resetRoute } from 'utils'
export const AuthenticatedApp = () => {
    return <div>
        <PageHeaders />
        <Main>
            {/* <ProjectListScreen /> */}
            <Router>
                <Routes>
                    <Route index element={<ProjectListScreen />} />
                    <Route path={'projects'} element={<ProjectListScreen />} />
                    <Route path={'projects/:projectId/*'} element={<ProjectScreen />} />
                </Routes>
            </Router>
        </Main>
    </div>
}

const PageHeaders = () => {
    const { logout, user } = useAuth()

    return <Header between={true}>
        <HeaderLeft gap={true} between={false}>
            <Button type={'link'} onClick={resetRoute}>
                <SLogo width='18rem' color='rgb(38,132,255)' />
            </Button>

            <h3>项目</h3>
            <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
            <Dropdown overlay={<Menu>
                <Menu.Item key={'logout'}>
                    <Button type={'link'} onClick={logout}>登出</Button>
                </Menu.Item>
            </Menu>}>
                <Button onClick={e => e.preventDefault()}>Hi,{user?.name}</Button>
            </Dropdown>
        </HeaderRight>
    </Header>
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr 6rem;
    height:100vh;
`
const Header = styled(Row)`
    padding:3.2rem;
    box-shadow:0 0 5px 0 rgba(0,0,0,0.1);
    z-index: 1;
`
const HeaderLeft = styled(Row)`
    
`
const HeaderRight = styled.div`
    
`
const PageHeader = styled.header`
    background-color: #aaa;
    height:6rem;
`

const Main = styled.main`
    /* height:calc(100vh - 6rem) */
    grid-area: main;
`
