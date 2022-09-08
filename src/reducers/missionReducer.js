export const MissionListReducer = (state = { missions: [] }, action) => {
    switch (action.type) {
        case "MISSION_LIST_REQUEST":
            return { loading: true, missions: [] }
        case "MISSION_LIST_SUCCESS":
            return {
                loading: false,
                missions: action.payload,
            }
        case "MISSION_LIST_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}