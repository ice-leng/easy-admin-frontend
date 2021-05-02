const routers = () => {
    return [
        {
            path: "/dashboard",
            key: "/dashboard",
            title: '统计数据',
            icon: 'AreaChartOutlined',
            componentPath: "pages/protable",
            permanent: true,
            exact: true,
        },
        {
            path: "/orders",
            key: "/orders",
            title: '订单管理',
            icon: 'FileSearchOutlined',
            componentPath: "",
            exact: true,
            children: [
                {
                    path: '/orders/jd-list',
                    key: '/orders/jd-list',
                    title: '京东订单',
                    icon: 'FileSearchOutlined',
                    componentPath: 'pages/protable',
                    section_id: 2,
                },
            ]
        },
    ]
}

export default routers()
