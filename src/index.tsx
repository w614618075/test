import './wdyr'
import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {DevTools, loadServer  } from 'jira-dev-tool';
import 'antd/dist/antd.less' //务必在jira-dev-tool后引入
import { AppProviders } from 'context';
loadServer(()=> ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <DevTools/>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
))

reportWebVitals();
