export const AgentListReducer = (state = { agents: [] }, action) => {
    switch (action.type) {
        case "AGENT_LIST_REQUEST":
            return { loading: true, agents: [] }
        case "AGENT_LIST_SUCCESS":
            return {
                loading: false,
                agents: action.payload,
            }
        case "AGENT_LIST_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const agentDetailsReducer = (state = { agent: {} }, action) => {
    switch (action.type) {
        case "AGENT_DETAILS_REQUEST":
            return { ...state, loading: true }
        case "AGENT_DETAILS_SUCCESS":
            return {
                loading: false,
                agent: action.payload
            }
        case "AGENT_DETAILS_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const updateAgentReducer = (state = { agent: {} }, action) => {
    switch (action.type) {
        case "AGENT_UPDATE_REQUEST":
            return { loading: true }
        case "AGENT_UPDATE_SUCCESS":
            return {
                loading: false,
                agent: action.payload
            }
        case "AGENT_UPDATE_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const deleteAgentReducer = (state = {}, action) => {
    switch (action.type) {
        case "AGENT_DELETE_REQUEST":
            return { loading: true }
        case "AGENT_DELETE_SUCCESS":
            return {
                loading: false,
                success: true
            }
        case "AGENT_DELETE_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const agentCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case "AGENT_CREATE_REQUEST":
            return { loading: true }
        case "AGENT_CREATE_SUCCESS":
            return { loading: false, success: true, manager: action.payload }
        case "AGENT_CREATE_FAIL":
            return { loading: false, error: action.payload }
        case "AGENT_CREATE_RESET":
            return {}
        default:
            return state
    }
}