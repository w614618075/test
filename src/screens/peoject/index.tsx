import React from 'react';
import { Link } from 'react-router-dom';
import { Routes, Route, } from 'react-router'
import { EpicScreen } from 'screens/epic';
import { KanbanScreen } from 'screens/kanban';
export const ProjectScreen = () => {
    return <div>
        <h1>ProjectScreen</h1>
        <Link to={'kanban'}>看板</Link>
        <Link to={'epic'}>任务组</Link>
        <Routes>
            {/* /project/:projectId/kanban */}
            <Route path={'kanban'} element={<KanbanScreen />} />
            {/* /project/:projectId/epic */}
            <Route path={'epic'} element={<EpicScreen />} />
            <Route index element={<KanbanScreen />} />
            
        </Routes>
    </div>
}
