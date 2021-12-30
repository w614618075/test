
import React from 'react'
import styled from '@emotion/styled'
import { useAuth } from 'context/auth-context'
import { ProjectListScreen } from "screens/project-list"
import { Row } from 'components/lib'
import {ReactComponent as SLogo} from 'assets/software-logo.svg'
import { Button, Dropdown, Menu } from 'antd'
export const AuthenticatedApp = () => {
    const { logout,user } = useAuth()
    return <div>
        <Header between={true}>
            <HeaderLeft gap={true} between={false}>
                <SLogo  width='18rem' color='rgb(38,132,255)'  />
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
       
        <Main>
             <ProjectListScreen />
        </Main>
       
    </div>
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
