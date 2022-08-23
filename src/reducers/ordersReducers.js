export const OrderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case "ORDER_LIST_REQUEST":
            return { loading: true, orders: [] }
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

export const OrderByShopReducer = (state = { ordersByShop: [] }, action) => {
    switch (action.type) {
        case "ORDER_BY_SHOP_REQUEST":
            return { loading: true, ordersByShop: [] }
        case "ORDER_BY_SHOP_SUCCESS":
            return {
                loading: false,
                ordersByShop: action.payload,
            }
        case "ORDER_BY_SHOP_FAIL":
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
        case "ORDER_DETAILS_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const OrderToDeliverReducer = (state = { orderToDeliver: {} }, action) => {
    switch (action.type) {
        case "ORDER_TO_DELIVER_REQUEST":
            return { ...state, loading: true }
        case "ORDER_TO_DELIVER_SUCCESS":
            return {
                loading: false,
                orderToDeliver: action.payload
            }
        case "ORDER_TO_DELIVER_FAIL":
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