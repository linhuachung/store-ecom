import React from 'react'
import {applyMiddleware, compose, createStore} from 'redux'
import {Provider} from 'react-redux'
import {ConnectedRouter, routerMiddleware} from 'connected-react-router'
import {createBrowserHistory} from 'history'
import createSagaMiddleware from 'redux-saga'

import Configs from '../configs'
import createRootReducer from './reducers'
import sagas from './sagas'
import * as process from "process";

const history = createBrowserHistory({
    basename: Configs.BASE_NAME
})

const composeEnhancers = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    || compose
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    createRootReducer(history),
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(history),
            sagaMiddleware
        )
    )
)

// if (process.env.NODE_ENV === 'development' && module.hot) {
//     module.hot.accept('./reducers', () => store.replaceReducer(createRootReducer(history)))
// }

sagaMiddleware.run(sagas)

export default ({children}) => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            {children}
        </ConnectedRouter>
    </Provider>
)
