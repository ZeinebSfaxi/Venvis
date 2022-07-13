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