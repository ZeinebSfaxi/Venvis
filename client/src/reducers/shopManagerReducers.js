export const ManagerByShopReducer = (state = { manager: {} }, action) => {
    switch (action.type) {
        case "MANAGER_BY_SHOP_REQUEST":
            return { ...state, loading: true }
        case "MANAGER_BY_SHOP_SUCCESS":
            return {
                loading: false,
                manager: action.payload
            }
        case "MANAGER_BY_SHOP_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const ManagerListReducer = (state = { managers: [] }, action) => {
    switch (action.type) {
        case "MANAGER_LIST_REQUEST":
            return { loading: true, managers: [] }
        case "MANAGER_LIST_SUCCESS":
            return {
                loading: false,
                managers: action.payload,
            }
        case "MANAGER_LIST_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const updateManagerReducer = (state = { manager: {} }, action) => {
    switch (action.type) {
        case "MANAGER_UPDATE_REQUEST":
            return { loading: true }
        case "MANAGER_UPDATE_SUCCESS":
            return {
                loading: false,
                manager: action.payload
            }
        case "MANAGER_UPDATE_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const deleteManagerReducer = (state = {}, action) => {
    switch (action.type) {
        case "MANAGER_DELETE_REQUEST":
            return { loading: true }
        case "MANAGER_DELETE_SUCCESS":
            return {
                loading: false,
                success: true
            }
        case "MANAGER_DELETE_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const managerCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case "MANAGER_CREATE_REQUEST":
            return { loading: true }
        case "MANAGER_CREATE_SUCCESS":
            return { loading: false, success: true, manager: action.payload }
        case "MANAGER_CREATE_FAIL":
            return { loading: false, error: action.payload }
        case "MANAGER_CREATE_RESET":
            return {}
        default:
            return state
    }
}