import React, {forwardRef, useImperativeHandle, useState} from 'react'
import {Modal} from 'antd'
import 'antd/es/modal/style'
import './style.scss'

const ModalComponents = ({children, ...props}, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    useImperativeHandle(ref, () => ({
        openModal: () => {
            console.log("open")
            setIsOpen(true)
        },
        closeModal: () => {
            console.log("close")
            setIsOpen(false)
        }
    }))

    return (
        <Modal
            open={isOpen}
            onCancel={() => {
                setIsOpen(false)
            }}
            centered
            footer={null}
            {...props}
        >
            {children}
        </Modal>
    )
}
export default forwardRef(ModalComponents)
