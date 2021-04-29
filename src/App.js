import { useState, useLayoutEffect } from 'react';
import { ConfigProvider } from 'antd';
import { useHistory } from 'react-router-dom';

import Layout from "@/components/layout";
import moment from 'moment';
import 'moment/locale/zh-cn';
import zhCN from 'antd/lib/locale/zh_CN';
moment.locale('zh-cn');

function App() {
    const history = useHistory()


    useLayoutEffect(() => {
        const Authorization = localStorage.getItem('Authorization')
        !Authorization && history.replace('/login')

    }, [history])

    const [lang] = useState(zhCN)

    return (
        <ConfigProvider locale={lang}>
            <Layout />
        </ConfigProvider>
    );
}

export default App;
