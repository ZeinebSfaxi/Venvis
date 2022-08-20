export const OrderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case "ORDER_LIST_REQUEST":
            return { loading: true, managers: [] }
        case "ORDER_LIST_SUCCESS":
            return {
                loading: false,
                orders: action.payload,
            }
        case "ORDER_LIST_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const singleOrderReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case "ORDER_DETAILS_REQUEST":
            return { ...state, loading: true }
        case "ORDER_DETAILS_SUCCESS":
            return {
                loading: false,
                order: action.payload
            }
        case "SHOP_DETAILS_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const validateOrderReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case "VALIDATE_ORDER_REQUEST":
            return { loading: true }
        case "VALIDATE_ORDER_SUCCESS":
            return {
                loading: false,
                order: action.payload
            }
        case "VALIDATE_ORDER_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const stateOrderReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case "STATE_ORDER_REQUEST":
            return { loading: true }
        case "STATE_ORDER_SUCCESS": return {
                loading: false,
                order: action.payload
            }
        case "STATE_ORDER_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}