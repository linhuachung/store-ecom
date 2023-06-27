import React from 'react'

/** component */
/** asset */
import './style.scss'
import {Col, Row} from "antd";
import {Images} from "../../../theme";
import Switch from "../switch";


function AccountContainer({children}) {
    return (
        <div className="login">
            <Row className={'form-container'}>
                <Col span={12}>
                    <div className="form-login login-image">
                        <img className={'img-login'} src={Images.Images.bg_login_hero} alt={'img'}/>
                    </div>
                </Col>
                <Col span={12}>
                    <div className="form-login form-content">
                        <div className={'icon'}>
                            <img src={Images.Icons.ECom_icon} alt=""/>
                        </div>
                        <p className="title-page login-text">Welcome to E-Com</p>
                        <Switch/>
                        {children}
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default AccountContainer
