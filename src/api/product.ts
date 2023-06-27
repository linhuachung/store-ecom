import { MainApi } from './endpoint'

export function getProductCategories() {
    return MainApi.get('/products/categories')
}
export function getProduct(payload: any) {
    return MainApi.get('/products', payload)
}

export function getProductDetail(payload: any) {
    return MainApi.get(`/products/${payload}`)
}

export function searchProduct(payload: string) {
    return MainApi.get('/products/search', { q: payload })
}

export function searchProductPageList(payload: string) {
    return MainApi.get('/products/search', payload)
}

export function addToCartt(payload: any) {
    return MainApi.post('/carts/add', payload)
}

export function getAllCartUser(payload: any) {
    return MainApi.get(`/carts/user/${payload}`)
}
