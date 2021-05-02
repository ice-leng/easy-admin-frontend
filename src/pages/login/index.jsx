import React, { memo, useState, useLayoutEffect, useEffect } from 'react'
import { Form, Input, Button, message, Spin } from 'antd';
import { UserOutlined, LockOutlined, BarcodeOutlined} from '@ant-design/icons';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import routers from '@/router'
import { loginApi } from '@/services/login'
import { actions } from '@/components/layout/store/slice'
import './style.less';
import 'antd/dist/antd.css';


export default memo(function () {
    const history = useHistory();
    // const setCurrentRouters = useSetRecoilState(currentRouters)
    const [loading, setLoading] = useState(false) //loading

    const [form] = Form.useForm();

    //登录后禁止跳转到登录页,跳转到登录后则清空所有数据
    useLayoutEffect(() => {
        if (localStorage.getItem("Dense-Diary-team-Authorization")) {
            history.replace('/')
        }
    }, [history])


    /**
     * 后台登录
     * @param {object} values 
     */
    const onFinish = async values => {
        console.log('denlgu', values);
        // let res = await loginApi({ ...values, password: sha1(values.password) })
        // // console.log('res', res);

        // if (res.code === 0) {
        //     message.success('登录成功')
        //     localStorage.setItem('Dense-Diary-team-Authorization', res.data)
        //     // res = await getsectionListApi();

        //     /**
        //      * 过滤菜单
        //      */
        //     const routers = JSON.parse(JSON.stringify(routersAll))
        //     // routers.forEach((item, index) => {
        //     //     if (item.path === '/orders') {
        //     //         // routers[index].children = item.children.filter(cItem => {
        //     //         //     return res.data.list.some(dItem => dItem.section_id === cItem.section_id)
        //     //         // })
        //     //     }
        //     // })

        //     setCurrentRouters(routers)
        //     // 存储后端菜单
        //     // localStorage.setItem('sectionList', JSON.stringify(res.data))
        //     localStorage.setItem('Dense-Diary-team-Router', JSON.stringify(routers))
        //     console.log('筛选完', routers);

        //     history.push('/')
        // } else {
        //     message.warning(res.msg || '请求超时')
        // }

    };

    return (
        <div className="login-wrap">
            <header>
                {/* <Dropdown overlay={menu}>
                    <TranslationOutlined style={{ fontSize: 18, marginBottom: 10 }} />
                </Dropdown> */}
            </header>
            <div className="login-box">
                <h2 style={{ textAlign: 'center' }}>管理系统</h2>
                <Form
                    name="normal_login"
                    className="login-form"
                    form={form}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="account"
                        rules={[{ required: true, message: '请输入账号' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />}
                               style={{ height: 40 }}
                               size="middle"
                               placeholder={'账号'} />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input style={{ height: 40 }}
                               prefix={<LockOutlined className="site-form-item-icon" />}
                               type="password"
                               placeholder={'密码'}
                        />
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'center' }}>

                        <Button type="primary" htmlType="submit" onClick={() => { }} className="login-form-button" >登录</Button>


                    </Form.Item>

                </Form>

            </div>
            {
                loading && <Spin className="loading" size="large" />
            }

        </div>
    )
})
