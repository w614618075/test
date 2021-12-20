import React from 'react';
import { useEffect, useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject } from 'utils';
import  qs from "qs"
const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })

    const [users, setUsers] = useState([])

    const [list, setList] = useState([])

    useEffect(() => {

        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response => {

            if (response.ok) {
                let data = response.json()
                setList(await data) // 获取表格数据
            }
            // console.log(list);
        })

    }, [param])

    // useEffect(() => {
    //         fetch(`${apiUrl}/projects`).then(async response => {
    //             return response.json();
    //         }).then(async response =>{
    //             // console.log(response);
    //             setList(await response) // 获取表格数据
    //             console.log(list);
    //         })
    
    // }, [])
    
    useEffect(()=>{
        fetch(`${apiUrl}/users`).then(async response =>{
            if(response.ok){
                let data = response.json()
                setUsers(await data)
            }
        })
    },[])

    return <div>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List users={users} list={list} />
    </div>
}