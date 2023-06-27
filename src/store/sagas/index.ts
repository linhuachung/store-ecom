import { all } from 'redux-saga/effects'

import account from './account.js'
import product from './product.js'

export default function* sagas() {
    yield all([
        account(),
        product()
    ])
}
