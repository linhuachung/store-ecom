import React, {useEffect, useRef, useState} from 'react'

import Storage from '../../utils/storage'

/** asset */
import {Images} from '../../theme'
import './style.scss'

import ModalComponents from '../modal'


function Flags(props) {
    const ref = useRef()
    const [imageFlag, setImageFlag] = useState({name: 'Vietnamese', code: 'vi', active: true})
    useEffect(() => {
        if (!Storage.has('LANGUAGE') || Storage.get('LANGUAGE') === 'vi') {
            setImageFlag({
                name: 'Vietnamese', code: 'vi', active: true
            })
        }

        if (Storage.get('LANGUAGE') === 'en') {
            setImageFlag({
                name: 'English', code: 'en', active: true
            })
        }
        if (Storage.get('LANGUAGE') === 'jp') {
            setImageFlag({
                name: 'Japanese', code: 'jp', active: true
            })
        }

    }, [])
    return (
        <>
            <div className="flags" onClick={() => ref.current.openModal()}>
                <img src={Images[`${imageFlag.code.toUpperCase()}_FLAG`]} alt=""/>
            </div>
            <ModalComponents ref={ref}>
                Language
            </ModalComponents>
        </>


    )
}

export default Flags
