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