import { memo } from 'react'
import { Table } from "fs-pro-ui";

import request from '@/services/request'

export default memo(function ProTable(props) {

    console.log('protable', props);
    const { formProps, tabs, tableProps, url } = props.state || JSON.parse(sessionStorage.getItem('init-state'));

    return (
        <Table
            title="测试数据"
            url={url}
            request={request}
            formProps={formProps}
            tabs={tabs}
            columns={tableProps.columns}
            rowKey={tableProps.rowKey}
        >

        </Table>
    )
})
