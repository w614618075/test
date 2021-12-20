import React from 'react'
export const List = ({ users, list }) => {
    console.log(users, list);
    return <table border="1px solid #aaa" style={{margin:'0 auto',marginTop:30,width:240}}>
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