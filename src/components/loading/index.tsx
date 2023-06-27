import React from 'react'
import { Space, Spin } from 'antd';

import './style.scss'

const Loading = () => (
  <div className="loading">
      <Space size="middle">
          <Spin size={"large"} className={'spin-loading'}/>
      </Space>
  </div>
)

export default Loading
