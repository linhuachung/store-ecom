import {TYPES} from '../actions'

const INIT_STATE = {
    isSideBarOpen: false
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case TYPES.TOGGLE_SIDE_BAR:
            return {
                ...state,
                isSideBarOpen: !state.isSideBarOpen
            }
        default:
            return state
    }
}
