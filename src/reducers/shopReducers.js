
export const shopListReducer = (state = { shops: [] }, action) => {
    switch (action.type) {
        case "SHOP_LIST_REQUEST":
            return { loading: true, shops: [] }
        case "SHOP_LIST_SUCCESS":
            return {
                loading: false,
                shops: action.payload,
            }
        case "SHOP_LIST_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const shopDetailsReducer = (state = { shop: {} }, action) => {
    switch (action.type) {
        case "SHOP_DETAILS_REQUEST":
            return { ...state, loading: true }
        case "SHOP_DETAILS_SUCCESS":
            return {
                loading: false,
                shop: action.payload
            }
        case "SHOP_DETAILS_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const updateShopReducer = (state = { shop: {} }, action) => {
    switch (action.type) {
        case "SHOP_UPDATE_REQUEST":
            return { loading: true }
        case "SHOP_UPDATE_SUCCESS":
            return {
                loading: false,
                shop: action.payload
            }
        case "SHOP_UPDATE_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const deleteShopReducer = (state = {}, action) => {
    switch (action.type) {
        case "SHOP_DELETE_REQUEST":
            return { loading: true }
        case "SHOP_DELETE_SUCCESS":
            return {
                loading: false,
                success: true
            }
        case "SHOP_DELETE_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const shopCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case "SHOP_CREATE_REQUEST":
            return { loading: true }
        case "SHOP_CREATE_SUCCESS":
            return { loading: false, success: true, shop: action.payload }
        case "SHOP_CREATE_FAIL":
            return { loading: false, error: action.payload }
        case "SHOP_CREATE_RESET":
            return {}
        default:
            return state
    }
}