import {TYPES} from '../actions'

interface INIT_STATE {
    submitting?: null,
    error?: null,

    roleName: number,
}

const INIT_STATE: INIT_STATE = {
    submitting: null,
    error: null,

    roleName: 0
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case TYPES.REGISTER_REQUEST:
        case TYPES.LOGIN_REQUEST:
            return {
                ...state,
                submitting: action.type
            }
        case TYPES.REGISTER_SUCCESS:
        case TYPES.LOGIN_SUCCESS:
            return {
                ...state,
                submitting: null
            }
        case TYPES.REGISTER_FAILURE:
        case TYPES.LOGIN_FAILURE:
            return {
                ...state,
                submitting: null,
                error: action.error
            }
        default:
            return state
    }
}
