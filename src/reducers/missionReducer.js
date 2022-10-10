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

export const missionDetailsReducer = (state = { mission: {} }, action) => {
    switch (action.type) {
        case "MISSION_DETAILS_REQUEST":
            return { ...state, loading: true }
        case "MISSION_DETAILS_SUCCESS":
            return {
                loading: false,
                mission: action.payload
            }
        case "MISSION_DETAILS_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const missionCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case "MISSION_CREATE_REQUEST":
            return { loading: true }
        case "MISSION_CREATE_SUCCESS":
            return { loading: false, success: true, mission: action.payload }
        case "MISSION_CREATE_FAIL":
            return { loading: false, error: action.payload }
        case "MISSION_CREATE_RESET":
            return {}
        default:
            return state
    }
}

export const updateMissionReducer = (state = { mission: {} }, action) => {
    switch (action.type) {
        case "MISSION_UPDATE_REQUEST":
            return { loading: true }
        case "MISSION_UPDATE_SUCCESS":
            return {
                loading: false,
                mission: action.payload
            }
        case "MISSION_UPDATE_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const deleteMissionReducer = (state = {}, action) => {
    switch (action.type) {
        case "MISSION_DELETE_REQUEST":
            return { loading: true }
        case "MISSION_DELETE_SUCCESS":
            return {
                loading: false,
                success: true
            }
        case "MISSION_DELETE_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const affectAgentToMissionReducer = (state = { mission: {} }, action) => {
    switch (action.type) {
        case "AFFECT_AGENT_TO_MISSION_REQUEST":
            return { loading: true }
        case "AFFECT_AGENT_TO_MISSION_SUCCESS":
            return {
                loading: false,
                mission: action.payload
            }
        case "AFFECT_AGENT_TO_MISSION_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const UpdateMissionStateReducer = (state = { mission: {} }, action) => {
    switch (action.type) {
        case "UPDATE_MISSION_STATE_REQUEST":
            return { loading: true }
        case "UPDATE_MISSION_STATE_SUCCESS":
            return {
                loading: false,
                mission: action.payload
            }
        case "UPDATE_MISSION_STATE_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}