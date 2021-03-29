import React, { memo, useEffect, useState, useRef } from 'react'
import { Breadcrumb, Space, Popconfirm, Menu, Dropdown, Modal, Form, Input, message, } from 'antd';
import { useHistory } from 'react-router-dom'
import { SearchOutlined, BellOutlined, GithubOutlined, PoweroffOutlined, MenuUnfoldOutlined, DownOutlined } from '@ant-design/icons';
import './index.less'
// import { getProfileDetailApi, editUserPasswordApi } from "@/services/global.js";
// import sha1 from '@/utils/sha1'

export default memo(function ({ routers, pathname, toggle }) {

    const history = useHistory();
    const editRef = useRef();
    const [visible, setVisible] = useState(false);
    const [breadcrumb, setBreadcrumb] = useState();
    const [signMessage, setSignMessage] = useState({});

    useEffect(() => {
        const tag = renderTag(routers, pathname);
        setBreadcrumb(tag);
    }, [pathname])

    useEffect(() => {
        // getProfileDetailApi({}).then(res => {
        //     console.log(res, "登陆信息");
        //     if (res.code === 0) {
        //         setSignMessage(res.data)
        //     }
        // })
    }, [])

    const menu = (
        <Menu>
            <Menu.Item key="0" onClick={() => {
                console.log("修改密码");
                setVisible(true);
            }}>
                <span>修改密码</span>
            </Menu.Item>
            <Menu.Item key="1" onClick={() => {
                console.log("退出登陆");
                logOut();
            }}>
                <span>退出登陆</span>
            </Menu.Item>
        </Menu>
    );

    /**
     * 退出登录
     */
    const logOut = () => {
        localStorage.removeItem('Dense-Diary-team-Authorization');
        history.push('/login')
    }
    const handleOk = () => {
        // 数据验证
        editRef.current.validateFields().then((values) => {
            // console.log(values, "111")

            const params = {
                data: {
                    password: (values.password)
                }
            }
            // editUserPasswordApi(params).then(res => {
            //     if (res.code === 0) {
            //         //刷新列表
            //         setVisible(false);
            //         message.success("修改成功");
            //         setTimeout(() => {
            //             localStorage.removeItem('Dense-Diary-team-Authorization');

            //             history.push('/login')
            //         }, 100);
            //     } else {
            //         message.error(res.msg);
            //     }
            // })
        }, () => {
            // 数据验证失败
        });
    }
    const handleCancel = () => {
        editRef.current.setFieldsValue({ password: "" });
        setVisible(false);
    }



    return (
        <header className="layout-header-wrap bg-white flex space-between align-center">
            <div className="flex align-center">
                <Space>
                    <MenuUnfoldOutlined onClick={toggle} />
                    <Breadcrumb>
                        {
                            breadcrumb
                            && breadcrumb.map(item => {
                                return (
                                    <Breadcrumb.Item key={item.path}>
                                        <span>{item.title}</span>
                                    </Breadcrumb.Item>
                                )
                            })
                        }
                    </Breadcrumb>
                </Space>
            </div>
            <div className="layout-header-right flex align-center">
                {/* <SearchOutlined />
                <BellOutlined /> */}
                {/* <div className="userinfo flex align-center">
                    <GithubOutlined />
                    <div>{signMessage?.account ? signMessage?.account :"管理员"}</div>
                </div> */}
                <div className="userinfo flex align-center">
                    <GithubOutlined />
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()} style={{ color: "#000" }}>
                            {signMessage?.account ? signMessage?.account : "团队长"} <DownOutlined />
                        </ a>
                    </Dropdown>
                </div>

                <Popconfirm title={'确定退出登录吗？'} okText={'确定'} cancelText={'取消'} placement="bottomRight" onConfirm={logOut}>
                    <PoweroffOutlined color="orange" />
                </Popconfirm>
            </div>

            <Modal
                title="修改密码"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form ref={editRef}>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入！' }]}
                    >
                        <Input placeholder="请输入密码" type="password" allowClear />
                    </Form.Item>
                    <Form.Item
                        label="确认密码"
                        name="password2"
                        rules={[{ required: true, message: '请输入！', }, ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('两次输入密码不匹配');
                            },
                        })]}
                    >
                        <Input placeholder="请输入密码" type="password" allowClear />
                    </Form.Item>
                </Form>
            </Modal>
        </header>
    )
})

/**
 * 生成面包屑
 * @param {Array} router 路由数组 
 */
const renderTag = (router, pathname) => {
    let paths = []
    // console.log(router, pathname);
    router.forEach((item) => {
        if (item.path === pathname) {
            paths = [{ path: item.path, title: item.title }]
        } else if (item.children && pathname.includes(item.path)) {
            paths = [...paths, { path: item.path, title: item.title }, ...renderTag(item.children, pathname)]
        }
    })

    return paths
}