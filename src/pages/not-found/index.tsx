import React from 'react'
import './style.scss'
import Button from '../../components/button'
import {useTranslation} from "react-i18next";

const NotFound = ({...props}) => {
    const {t} = useTranslation('message')
    return (
        <div className="page-404">
            <div>
                <p className="title">404</p>
                <p>{t('page_does_not_exist')}</p>
                <Button type="primary" className="btn-go-home"
                        onClick={() => props.history.push('/')}>{t('return_to_home_page')}</Button>
            </div>
        </div>
    )
}

export default NotFound
