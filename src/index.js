import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import { FsOrMessage } from "@/utils/fs-or-message/fs-or-message";

import store from '@/store'
import '@/assets/css/normalize.css'
import '@/assets/css/reset.less'

const Login = React.lazy(() => import('./pages/login'));
const App = React.lazy(() => import('./App'));

/* 配置的全局的message的基本位置属性 */
FsOrMessage.config({
    placement: 'topMiddle',
})

ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <Switch>
                <Route path="/login" render={(routerData) => <Suspense fallback={<div>Loading...</div>}><Login {...routerData}></Login></Suspense>} />
                <Route path="/" render={(routerData) => <Suspense fallback={<div>Loading...</div>}><App {...routerData}></App></Suspense>}></Route>
            </Switch>
        </Provider>
    </HashRouter>,
    document.getElementById('root')
);


