import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { TYPES } from '../actions'
import ui from './ui'
import account from './account';
import product from './product'

const appReducer = (history) => combineReducers({
    router: connectRouter(history),
    ui,
    account,
    product
})

export default (history) => (state, action) => {
    if (action.type === TYPES.CLEAR_STORE) {
        state = {}
    }

    return appReducer(history)(state, action)
}
