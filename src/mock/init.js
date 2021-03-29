const initData = {
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
                    type: {
                        action: 'a',
                        url: 'abc'
                    },
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
        rowKey: "order_id",
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
                    return '2021-04-01'
                    // return text ? moment(parseInt(text) * 1000).format('YYYY-MM-DD HH:mm:ss') : ""
                }
            },
            {
                title: '结算时间',
                key: 'settle_at',
                width: 100,
                dataIndex: 'settle_at',
                render: text => {
                    return '2021-04-01'
                    // return text ? moment(parseInt(text) * 1000).format('YYYY-MM-DD HH:mm:ss') : ""
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
    }
}