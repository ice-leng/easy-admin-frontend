import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Route} from "react-router-dom";

import App from './App';
import Login from '@/pages/login'
import 'antd/dist/antd.less'
import '@/assets/css/reset.less'

// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route path="/login" render={(routerData) => <Suspense
                fallback={<div>Loading...</div>}><Login {...routerData}/></Suspense>}/>
            <Route path="/" render={(routerData) => <Suspense
                fallback={<div>Loading...</div>}><App {...routerData}/></Suspense>}/>
        </Switch>
    </HashRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
