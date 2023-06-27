import React from 'react'
import { Table } from 'antd'
import classNames from 'classnames'
import 'antd/es/table/style/css'
import './style.scss'

export default ({ className, columns, data, ...props }) => (
  <Table columns={columns} dataSource={data} className={classNames(className)} pagination={false} {...props} />
)
