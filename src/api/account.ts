import {MainApi} from './endpoint'

export function login(payload: any) {
    return MainApi.post(`/auth/login`, payload)
}

export function register(payload: any) {
    return MainApi.post(`/auth/register`, payload)
}
