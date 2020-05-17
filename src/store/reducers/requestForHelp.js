import {
    SET_HELP_RESQUESTS,
    CREATING_REQUEST_FOR_HELP,
    REQUEST_FOR_HELP_CREATED
} from '../actions/actionTypes'

const initialState = {
    helpRequests: [],
    isUploading: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_HELP_RESQUESTS:
            return {
                ...state,
                helpRequests: action.payload
            }
        case CREATING_REQUEST_FOR_HELP:
            return {
                ...state,
                isUploading: true
            }
        case REQUEST_FOR_HELP_CREATED:
            return {
                ...state,
                isUploading: false
            }
        default:
            return state
    }
}

export default reducer