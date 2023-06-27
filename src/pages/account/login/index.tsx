import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Formik } from 'formik'
import { object, string } from 'yup'
import { actions, TYPES } from '../../../store/actions'
import Storage from '../../../utils/storage'
import Request from '../../../utils/request'

/** component */
import Input from '../../../components/input'
import Button from '../../../components/button'
import Field from '../../../components/field'
import Notification from '../../../components/notification'

/** asset */
import './style.scss'
import { Link, useHistory } from 'react-router-dom';
import { Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import AccountContainer from '../account-container';
import { constant } from '../../../utils/constant';
import regex from '../../../utils/regex';

const validationSchema = object().shape({
    username: string().required().min(6).max(100),
    password: string().required()
})


function Login() {
    const { t } = useTranslation('message')
    const history = useHistory()
    const dispatch = useDispatch()
    const accountStore = useSelector((state: any) => state.account)
    const onSubmit = (values: any) => {
        const data = {
            username: values.username,
            password: values.password
        }
        dispatch(actions.login(data, (action: string, data: any, error: any) => {
            if (action === TYPES.LOGIN_SUCCESS) {
                console.log(data)
                Storage.set(constant.ACCESS_TOKEN, data.accessToken)
                Storage.set(constant.RESULT, data.resultUser)
                Request.setAccessToken(`Bearer ${data.accessToken}`)
                Notification.success(t('login_success'))
                history.push('/');
            }
        }))
    }


    const renderForm = ({ handleSubmit, ...form }) => {
        return (
            <Form className="form">
                <div className="form-group">
                    <div className="field-group">
                        <Field
                            form={form}
                            name="username"
                            label="Username"
                            component={Input}
                            className={'input-login'}
                        />
                        <Field
                            form={form}
                            name="password"
                            label="Password"
                            type="password"
                            component={Input}
                            className={'input-login input-password'}
                        />
                    </div>
                    <div className="field-action">
                        <Field
                            form={form}
                            name="remember"
                            label="Remember me"
                            component={Checkbox}
                            className={'input-checkbox'}
                        />
                        <Link to={'/reset-password'}>Forgot Password ?</Link>
                    </div>
                    <div className="action-box">
                        <Button
                            size="large"
                            htmlType="submit"
                            type="primary"
                            loading={!!accountStore.submitting}
                            disabled={!form.values.username?.match(regex.username) || !form.values.username || !form.values.password}
                            onClick={handleSubmit}
                            className={'button-login'}
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </Form>
        )
    }

    const initialValues = {
        username: '',
        password: ''
    }
    return (
        <AccountContainer>
            <Formik
                validateOnChange={false}
                validateOnBlur={false}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                component={renderForm}
            />
        </AccountContainer>
    )
}

export default Login
