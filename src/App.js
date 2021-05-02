import { useState, useLayoutEffect, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { useHistory } from 'react-router-dom';

import Layout from "@/components/layout";
import moment from 'moment';
import 'moment/locale/zh-cn';
import zhCN from 'antd/lib/locale/zh_CN';
moment.locale('zh-cn');

function App() {
    const history = useHistory()
    const [lang] = useState(zhCN)

    useLayoutEffect(() => {
        const Authorization = localStorage.getItem('Authorization')
        !Authorization && history.replace('/login')

        // 导航
        if (Authorization) {

        }

    }, [history])

    return (
        <ConfigProvider locale={lang}>
            <Layout />
        </ConfigProvider>
    );
}

export default App;
