export const reclamationListReducer = (state = { reclamations: [] }, action) => {
    switch (action.type) {
        case "RECLAMATION_LIST_REQUEST":
            return { loading: true, reclamations: [] }
        case "RECLAMATION_LIST_SUCCESS":
            return {
                loading: false,
                reclamations: action.payload,
            }
        case "RECLAMATION_LIST_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const reclamationDetailsReducer = (state = { reclamation: {} }, action) => {
    switch (action.type) {
        case "RECLAMATION_DETAILS_REQUEST":
            return { ...state, loading: true }
        case "SHOP_DETAILS_SUCCESS":
            return {
                loading: false,
                reclamation: action.payload
            }
        case "RECLAMATION_DETAILS_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const updateReclamationReducer = (state = { reclamation: {} }, action) => {
    switch (action.type) {
        case "RECLAMATION_UPDATE_REQUEST":
            return { loading: true }
        case "RECLAMATION_UPDATE_SUCCESS":
            return {
                loading: false,
                reclamation: action.payload
            }
        case "RECLAMATION_UPDATE_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}