import React, {memo, useState, useLayoutEffect, useEffect} from 'react'
import {Form, Input, Button, message, Spin} from 'antd';
import {UserOutlined, LockOutlined, BarcodeOutlined} from '@ant-design/icons';
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'

import routers from '@/router'
import {loginApi} from '@/services/login'
import {actions} from '@/components/layout/store/slice'
import './style.less';
import 'antd/dist/antd.css';


export default memo(function () {
    const history = useHistory();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false) //loading

    const [form] = Form.useForm();

    //登录后禁止跳转到登录页,跳转到登录后则清空所有数据
    useLayoutEffect(() => {
        if (localStorage.getItem("Authorization")) {
            history.replace('/')
        }
    }, [history])


    /**
     * 后台登录
     * @param {object} values
     */
    const onFinish = async values => {
        setLoading(true)
        let res = await loginApi(values)
        setLoading(false)
        if (res.code === '0') {
            message.success('登录成功')
            localStorage.setItem('Authorization', res.result.token)
            localStorage.setItem('username', values.account)
            localStorage.setItem('refreshToken', res.result.refreshToken)
            dispatch(actions.changeRoutersAction(routers))
            localStorage.setItem('Router', JSON.stringify(routers))
            history.push('/')
        } else {
            message.warning(res.msg || '请求超时')
        }
    };

    return (
        <div className="login-wrap">
            <div className="login-box">
                <h2 style={{textAlign: 'center'}}>管理系统</h2>
                <Form
                    name="normal_login"
                    className="login-form"
                    form={form}
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="account"
                        rules={[{required: true, message: '请输入账号'}]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                               style={{height: 40}}
                               size="middle"
                               placeholder={'账号'}/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true, message: '请输入密码'}]}
                    >
                        <Input style={{height: 40}}
                               prefix={<LockOutlined className="site-form-item-icon"/>}
                               type="password"
                               placeholder={'密码'}
                        />
                    </Form.Item>
                    <Form.Item style={{textAlign: 'center'}}>

                        <Button type="primary" htmlType="submit" onClick={() => {
                        }} className="login-form-button">登录</Button>


                    </Form.Item>

                </Form>

            </div>
            {
                loading && <Spin className="loading" size="large"/>
            }

        </div>
    )
})
