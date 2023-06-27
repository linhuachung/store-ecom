import { push } from 'connected-react-router'
import { put } from 'redux-saga/effects'

import Storage from './storage'
import Misc from './misc'
import Notification from '../components/notification'
import { actions } from '../store/actions'


export default ({ api, successMessage, errorHandler }) =>
    function* ({ type, data, callback }) {
        const successType = `${type}_SUCCESS`
        const failureType = `${type}_FAILURE`

        try {
            yield put({ type: `${type}_REQUEST`, payload: data })

            const { token, httpStatus, message, result } = yield api(data);
            if (httpStatus === 200) {
                yield put({ type: successType, data: result, payload: data })
                if (message) Notification.success(message)

                if (callback) {
                    callback(successType, { message, accessToken: token, resultUser: result })
                }

            }

            // if (success) {
            //     yield put({type: successType, data: result, payload: data})
            //
            //     if (successMessage) Notification.success(successMessage)
            //
            //     if (callback) callback(successType, result)
            // }

            // if (error) {
            //     if (['TOKEN_EXPIRED', 'INVALID_TOKEN'].includes(error.code)) {
            //         Storage.clear()
            //         yield put(push('/login'))
            //         yield put(actions.clearStore())
            //     }
            //
            //     yield put({type: failureType, error})
            //     if (callback) callback(failureType, result, error)
            // }

            // if (!error && !success) {
            //     throw result
            // }
        } catch (e) {
            if (e) {
                const error = yield Misc.getErrorJsonBody(e)
                yield put({ type: failureType, error })
                const errorMessage = error && error.message

                if (['TOKEN_EXPIRED', 'INVALID_TOKEN'].includes(errorMessage)) {
                    Storage.clear()
                    yield put(push('/login'))
                    yield put(actions.clearStore())
                }

                if (errorHandler) {
                    errorHandler(error)
                } else {
                    Notification.error(errorMessage)
                }

                if (callback) callback(failureType, error)
            }
        }
    }
