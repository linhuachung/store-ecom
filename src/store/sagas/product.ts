import { all, takeLatest } from 'redux-saga/effects'

import sagaHelper from '../../utils/saga-helper'
import { TYPES } from '../actions'
import {
    addToCartt,
    getProduct,
    getProductCategories,
    getProductDetail,
    searchProduct,
    searchProductPageList,
    getAllCartUser
} from '../../api/product';

export default function* watcher() {
    yield all([
        takeLatest(TYPES.GET_PRODUCT_CATEGORIES, sagaHelper({
            api: getProductCategories
        })),
        takeLatest(TYPES.GET_PRODUCT, sagaHelper({
            api: getProduct
        })),
        takeLatest(TYPES.SEARCH_PRODUCT, sagaHelper({
            api: searchProduct
        })),
        takeLatest(TYPES.SEARCH_PRODUCT_PAGE_LIST, sagaHelper({
            api: searchProductPageList
        })),
        takeLatest(TYPES.GET_PRODUCT_DETAIL, sagaHelper({
            api: getProductDetail
        })),
        takeLatest(TYPES.ADD_TO_CART, sagaHelper({
            api: addToCartt
        })),
        takeLatest(TYPES.GET_ALL_CART_USER, sagaHelper({
            api: getAllCartUser
        })),
    ])
}
