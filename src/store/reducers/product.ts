import { TYPES } from '../actions'

interface INIT_STATE {

    productList: any,
    productDetail:any,
    productCatefories: any,
    searchProductList: any,
    searchProductPageList: any,
    cart: any
}

const INIT_STATE: INIT_STATE = {
    productList: {
        total: 0,
        totalPage: 1,
        limit: 20,
        data: []
    },
    productDetail: {
        data: []
    },
    productCatefories: {
        data: []
    },
    searchProductList: {
        data: []
    },
    searchProductPageList: {
        data: []
    },
    cart: {
        data: [],
        totalCount: 0
    }
}

export default (state = INIT_STATE, action:any) => {
    switch (action.type) {
        case TYPES.GET_PRODUCT_CATEGORIES_SUCCESS:
            return {
                ...state,
                productCatefories: {
                    data: action.data
                }
            }
        case TYPES.GET_PRODUCT_SUCCESS:
            return {
                ...state,
                productList: {
                    data: action.data.products,
                }
            }
        case TYPES.GET_PRODUCT_DETAIL_SUCCESS:
            return {
                ...state,
                productDetail: {
                    data: action.data,
                }
            }
        case TYPES.SEARCH_PRODUCT_SUCCESS:
            return {
                ...state,
                searchProductList: {
                    data: action.data.products
                },

            }
        case TYPES.SEARCH_PRODUCT_PAGE_LIST_SUCCESS:
            return {
                ...state,
                searchProductPageList: {
                    total:  action.data.total,
                    limit:  action.data.limit,
                    data: action.data.products
                }
            }
        case TYPES.CLEAR_SEARCH_PRODUCT:
            return {
                ...state,
                searchProductList: {
                    data: []
                }
            }
        case TYPES.ADD_TO_CART_SUCCESS:
            if (!state.cart.data) {
                const dataCart = {
                    quality: action.data.quality,
                    name: action.data.name,
                    price: action.data.price,
                    productId: action.data.productId,
                }
                state.cart.data.push(dataCart)
            } else {
                let isDuplicateData = false
                state.cart.data.map((item, index) => {
                    if (item.productId == action.data.productId) {
                        if (!action.data.type) {
                            state.cart.data[index].quality += action.data.quality
                            isDuplicateData = true
                        }
                        if (action.data.type === 'minus') {
                            state.cart.data[index].quality--
                            isDuplicateData = true
                        }
                        if (action.data.type === 'plus') {
                            state.cart.data[index].quality++
                            isDuplicateData = true
                        }
                        if (action.data.type === 'delete') {
                            state.cart.data = state.cart.data.filter(x => x.productId !== action.data.productId)
                            isDuplicateData = true
                        }
                    }
                })

                if (!isDuplicateData) {
                    const cart = {
                        quality: action.data.quality,
                        name: action.data.name,
                        price: action.data.price,
                        productId: action.data.productId,
                    }
                    state.cart.data.push(cart)
                }
            }
            const totalCount = state.cart.totalCount = state.cart.data.length
            const data = state.cart.data
            return {
                ...state,
                cart: {
                    data: data,
                    totalCount: totalCount
                }
            }
        default:
            return state
    }
}
