import React from 'react'
import {Input} from 'antd'
import classNames from 'classnames'
import 'antd/es/input/style'
import './style.scss'

export default ({field, form, modern, simple, className, ...props}) => (
    props.type === 'password' ?
        <Input.Password
            {...field}
            {...props}
            className={classNames(className, {modern, simple})}
        /> : <Input
            {...field}
            {...props}
            className={classNames(className, {modern, simple})}
        />

)
