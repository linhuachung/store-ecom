import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { object, string } from 'yup'
import { actions, TYPES } from '../../../store/actions'

/** component */
import Input from '../../../components/input'
import Button from '../../../components/button'
import Field from '../../../components/field'

/** asset */
import './style.scss'
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AccountContainer from '../account-container';
import regex from '../../../utils/regex';


function Login() {
    const { t } = useTranslation('message')
    const history = useHistory()
    const dispatch = useDispatch()
    const accountStore = useSelector((state: any) => state.account)
    const validationSchema = object().shape({
        name: string().required().min(6).max(100),
        email: string().email().required().min(6).max(100),
        password: string().required().min(6).max(100),
        passwordAgain: string().required().oneOf([Yup.ref('password'), null], `${t('password_incorrect')}`)
    })
    const onSubmit = (values: object) => {
        const data = {
            email: values.email,
            password: values.password,
            role_id: 1
        }
        dispatch(actions.register(data, (action: string, data: any, error: any) => {
            if (action === TYPES.REGISTER_SUCCESS) {
                history.push('/login');
            }
            if (action === TYPES.REGISTER_FAILURE) {
                if (error?.code) {
                    Notification.error.bind(this)(error.code)
                }
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
                            name="name"
                            label="Full Name"
                            component={Input}
                            require
                            className={'input-login'}
                        />
                        <Field
                            form={form}
                            name="email"
                            label="Email"
                            component={Input}
                            require
                            className={'input-login'}
                        />
                        <Field
                            form={form}
                            name="password"
                            label="Password"
                            type="password"
                            require
                            component={Input}
                            className={'input-login input-password'}
                        />
                        <Field
                            form={form}
                            name="passwordAgain"
                            label="Password Again"
                            type="password"
                            component={Input}
                            require
                            className={'input-login input-password'}
                        />
                    </div>
                    <div className="action-box">
                        <Button
                            size="large"
                            htmlType="submit"
                            type="primary"
                            loading={!!accountStore.submitting}
                            disabled={!form.values.name || !form.values.email?.match(regex.email) || !form.values.email || !form.values.password || !form.values.passwordAgain}
                            onClick={handleSubmit}
                            className={'button-login'}
                        >
                            Sign Up
                        </Button>
                    </div>
                    <div className="field-action-register">
                        <p>Have an account ? <Link to={'/login'}>Login</Link></p>
                    </div>
                </div>
            </Form>
        )
    }

    const initialValues = {}
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
