export const conversationByMemberReducer = (state = { conversation: [] }, action) => {
    switch (action.type) {
        case "CONVERSATION_BY_MEMBER_REQUEST":
            return { loading: true, conversation: [] }
        case "CONVERSATION_BY_MEMBER_SUCCESS":
            return {
                loading: false,
                conversation: action.payload,
            }
        case "CONVERSATION_BY_MEMBER_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const conversationCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case "CONVERSATION_CREATE_REQUEST":
            return { loading: true }
        case "CONVERSATION_CREATE_SUCCESS":
            return { loading: false, success: true, conversation: action.payload }
        case "CONVERSATION_CREATE_FAIL":
            return { loading: false, error: action.payload }
        case "CONVERSATION_CREATE_RESET":
            return {}
        default:
            return state
    }
}

export const MessagesListReducer = (state = { messages: [] }, action) => {
    switch (action.type) {
        case "MESSAGES_LIST_REQUEST":
            return { loading: true, messages: [] }
        case "MESSAGES_LIST_SUCCESS":
            return {
                loading: false,
                messages: action.payload,
            }
        case "MESSAGES_LIST_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
export const messageCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case "MESSAGE_CREATE_REQUEST":
            return { loading: true }
        case "MESSAGE_CREATE_SUCCESS":
            return { loading: false, success: true, message: action.payload }
        case "MESSAGE_CREATE_FAIL":
            return { loading: false, error: action.payload }
        case "MESSAGE_CREATE_RESET":
            return {}
        default:
            return state
    }
}



