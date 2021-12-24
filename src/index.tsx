import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loadDevTools } from 'jira-dev-tool';
import 'antd/dist/antd.less' //务必在jira-dev-tool后引入
import { AppProviders } from 'context';
loadDevTools(()=> ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
))

reportWebVitals();
