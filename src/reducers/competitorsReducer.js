export const competitorListReducer = (state = { competitors: [] }, action) => {
    switch (action.type) {
        case "COMPETITOR_LIST_REQUEST":
            return { loading: true, competitors: [] }
        case "COMPETITOR_LIST_SUCCESS":
            return {
                loading: false,
                competitors: action.payload,
            }
        case "COMPETITOR_LIST_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}