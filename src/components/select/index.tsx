import React, { Component } from 'react'
import { Select } from 'antd'
import lodash from 'lodash'
import classNames from 'classnames'

import './style.scss'

const { Option } = Select

export default class extends Component {
    _onChange = (value) => {
        const { field, onChange, name } = this.props

        if (onChange) onChange({ target: { value, name: field?.name || name } })
        if (!lodash.isEmpty(field)) field.onChange({ target: { value, name: field.name } })
    }

    _renderOption = (option, index) => {
        if (lodash.isString(option) || lodash.isNumber(option)) {
            return <Option key={index} value={option}>{lodash.upperFirst(option)}</Option>
        }

        const { optionBinding, renderOption } = this.props

        let value
        let name
        if (lodash.isEmpty(optionBinding)) {
            /* eslint-disable prefer-destructuring */
            value = option.value
            name = option.name
        } else {
            value = option[optionBinding.value]
            name = option[optionBinding.name]
        }

        return (
            <Option key={index} value={value} name={name}>
                {renderOption ? renderOption({ value, name }) : name}
            </Option>
        )
    }

    render() {
        const {
            field,
            options,
            onChange,
            optionBinding,
            value,
            renderOption,
            modern,
            simple,
            className,
            ...props
        } = this.props

        return (
            <Select
                className={classNames('field-select', className, { modern, simple })}
                {...field}
                {...props}
                onChange={this._onChange}
                value={field?.value || value}
            >
                {options.map(this._renderOption)}
            </Select>
        )
    }
}
