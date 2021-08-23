import AuthTypes from "./AuthTypes";

const INITIAL_STATE = {
    data: [],
    isLoading: true,
    hasError: false
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case AuthTypes.SET_AUTH_LOADING:
            return { ...state, isLoading: true, hasError: false };
        case AuthTypes.SET_AUTH_SUCCESS:
            return { Data: action.payload, isLoading: false, hasError: false };
        case AuthTypes.SET_AUTH_FAILURE:
            return { ...state, isLoading: false, hasError: true };
        default:
            return state;
    }
}
