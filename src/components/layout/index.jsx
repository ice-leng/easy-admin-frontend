import React, {memo, Suspense, useState} from 'react';
import {Route, useHistory, useLocation} from 'react-router-dom'
// import { useRecoilValue } from 'recoil'
import {Layout, Menu} from 'antd';
import {ShareAltOutlined, FileSearchOutlined, RiseOutlined, AreaChartOutlined} from '@ant-design/icons'


import Header from './layout-header'

// import { currentRouters } from '@/store'
import routersAll from '@/router'
import routers from "@/router";
import TbaleService from '@/common/constant/pro-table'
import {useCreateRoutes} from '@/utils/utils'
import moment from 'moment'


// import LogoTitle from '@/assets/images/logo-title.png'
// import Logo from '@/assets/images/logo.png'
import './index.less'

const {Sider, Content} = Layout;
const {SubMenu} = Menu;
const icons = {
    'ShareAltOutlined': <ShareAltOutlined/>,
    'FileSearchOutlined': <FileSearchOutlined/>,
    'RiseOutlined': <RiseOutlined/>,
    'AreaChartOutlined': <AreaChartOutlined/>,
}

export default memo(() => {

    const history = useHistory();
    const location = useLocation();
    // const routers = useRecoilValue(currentRouters)

    const [collapsed, setCollapsed] = useState(false) //菜单开关
    const [currentPath, setCurrentPath] = useState('') //当前路由
    // const [currentPath, setCurrentPath] = useState('') //当前路由

    console.log('location', location);

    /**
     * 菜单显示隐藏
     */
    const toggle = () => setCollapsed(!collapsed)

    /**
     * 页面跳转
     * @param {Object} item
     */
    const goto = async item => {
        setTimeout(() => {

            setCurrentPath(item.path)
            const state = {
                url: 'order/list',
                formProps: {
                    search: [
                        {
                            wrap: {
                                key: 'show_order_id',
                                name: 'show_order_id',
                                label: '订单编号',
                                type: 'input',
                            },
                            props: {
                                placeholder: '请输入订单编号',
                            }
                        },
                        {
                            wrap: {
                                key: 'seller_mobile',
                                name: 'seller_mobile',
                                label: '推广人手机号',
                                type: 'input',
                            },
                            props: {
                                placeholder: '请输入推广人手机号',
                            }

                        },
                        {
                            wrap: {
                                key: 'seller_name',
                                name: 'seller_name',
                                label: '推广人昵称',
                                type: 'input',
                            },
                            props: {
                                placeholder: '请输入推广人昵称',
                            }
                        },
                        {
                            wrap: {
                                key: 'create_time',
                                name: 'create_time',
                                label: '下单时间',
                                type: 'rangePicker',
                            },
                            props: {},
                        },
                        {
                            wrap: {
                                key: 'settle_time',
                                name: 'settle_time',
                                label: '结算时间',
                                type: 'rangePicker',
                            },
                            props: {},
                        },

                    ],
                    config: {
                        submit: {
                            text: '查询'
                        },
                        reset: {
                            text: '重置'
                        },
                    },
                    layoutConfig: {
                        layout: 'inline',
                        // wrapperCol:{
                        //     lg:8
                        // }
                    }
                },
                tabs: {
                    firstTabs: {
                        key: 'bonus_status',
                        onChange: false,
                        defaultkey: '0',
                        data: [
                            {
                                label: "全部",
                                key: 0,
                            },
                            {
                                label: "待结算",
                                key: 1,
                            },
                            {
                                label: "已结算",
                                key: 2,
                            },
                            {
                                label: "已失效",
                                key: 3,
                            },
                            {
                                label: "已到账",
                                key: 4,
                            },
                        ]
                    },
                },
                tableProps: {
                    columns: [
                        {
                            title: '渠道订单号',
                            key: 'show_order_id',
                            width: 130,
                            dataIndex: 'show_order_id',
                        },
                        {
                            title: '推广人',
                            key: 'seller_name',
                            width: 100,
                            dataIndex: 'seller_name',
                        },
                        {
                            title: '推广人手机号',
                            key: 'seller_mobile',
                            width: 110,
                            dataIndex: 'seller_mobile',
                        },
                        {
                            title: '佣金类型',
                            key: 'type_msg',
                            width: 80,
                            dataIndex: 'type_msg',
                        },
                        {
                            title: '商品名称',
                            dataIndex: 'product_name',
                            key: 'product_name',
                            ellipsis: true,
                            width: 300
                        },
                        // {
                        //     title: 'sku',
                        //     key: 'spec_desc',
                        //     width: 200,
                        //     dataIndex: 'spec_desc',
                        // },
                        // {
                        //     title: '数量',
                        //     key: 'number',
                        //     width: 90,
                        //     dataIndex: 'number',
                        // },
                        {
                            title: '订单金额',
                            key: 'total_amount',
                            width: 90,
                            dataIndex: 'total_amount',
                            render: text => {
                                return (<span>¥{text}</span>)
                            }
                        },
                        {
                            title: '预计佣金',
                            key: 'estimate_bonus',
                            width: 90,
                            dataIndex: 'estimate_bonus',
                            render: text => {
                                // console.log(text);
                                return (<span>¥{text}</span>)
                            }
                        },
                        {
                            title: '实际佣金',
                            key: 'bonus',
                            width: 90,
                            dataIndex: 'bonus',
                            render: text => {
                                return (<span>¥{text}</span>)
                            }
                        },
                        {
                            title: '佣金状态',
                            key: 'bonus_status_msg',
                            width: 80,
                            dataIndex: 'bonus_status_msg',
                        },
                        // {
                        //     title: '平台收益',
                        //     key: 'platform_fee',
                        //     width: 90,
                        //     dataIndex: 'platform_fee',
                        //     render: text => {
                        //         return (<span>¥{text}</span>)
                        //     }
                        // },


                        {
                            title: '下单时间',
                            key: 'create_at',
                            width: 100,
                            dataIndex: 'create_at',
                            render: text => {
                                return text ? moment(parseInt(text) * 1000).format('YYYY-MM-DD HH:mm:ss') : ""
                            }
                        },
                        {
                            title: '结算时间',
                            key: 'settle_at',
                            width: 100,
                            dataIndex: 'settle_at',
                            render: text => {
                                return text ? moment(parseInt(text) * 1000).format('YYYY-MM-DD HH:mm:ss') : ""
                            }
                        },
                        //'',{
                        //     title: '操作',
                        //     dataIndex: '',
                        //     align: 'center',
                        //     fixed: 'right',
                        //     width: 100,
                        //     render: (record, text) => {
                        //         return <Button type="link" onClick={() => handleLook(record)}>查看</Button>
                        //     }
                        // },
                    ],
                    rowKey: "order_id"
                }
            }
            // 动态传参
            history.push({pathname: item.path, state});
            sessionStorage.setItem('init-state', JSON.stringify(state));
        }, 100);
    }

    return (
        <Layout className="layout-wrap">
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">

                </div>
                {createMenu(routers, goto, location, currentPath)}
            </Sider>
            <Layout className="site-layout">
                <Header routers={routers} pathname={currentPath} toggle={toggle}>

                </Header>
                <Content
                    className="layout-conent site-layout-background"
                    style={{margin: '24px 16px 0'}}
                >
                    {useCreateRoutes(routers)}
                    <Route path="/404" render={(routerData) => <Suspense
                        fallback={<div>Loading...</div>}>404</Suspense>}/>
                </Content>
            </Layout>
        </Layout>
    );

})

/**
 * 创建菜单
 * @param {Array} routes 路由配置表
 * @param {Function} goto 页面跳转
 * @param {Object} location
 * @param {String} currentPath 当前路由
 */
const createMenu = (routes, goto, location, currentPath) => {

    const parent = routersAll.find(item => item.children?.some(cItem => cItem.path === location.pathname))
    // 菜单默认选中为当前路由
    return (<Menu theme="dark" mode="inline" multiple={true} defaultOpenKeys={[parent?.path]}
                  selectedKeys={[currentPath || location.pathname]}>
        {
            routes.map(mItem => {
                if (mItem.children) {
                    return (
                        <SubMenu key={mItem.path} title={mItem.title} icon={icons[mItem.icon]}>
                            {mItem.children.map(item => !item.hidden &&
                                <Menu.Item key={item.path} onClick={() => goto(item)}
                                           icon={icons[item.icon]}>{item.title}</Menu.Item>)}
                        </SubMenu>
                    )
                } else {
                    return !mItem.hidden ? <Menu.Item key={mItem.path} icon={icons[mItem.icon]}
                                                      onClick={() => goto(mItem)}>{mItem.title}</Menu.Item> : null
                }
            })
        }
    </Menu>)
}

