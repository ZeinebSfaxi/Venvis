import axios from "axios";

export const GetConversationBymember = (userId) => async (dispatch) => {
    try {
        dispatch({type: "CONVERSATION_BY_MEMBER_REQUEST"})

        const {data} = await axios.get( `http://localhost:5000/conversations/${userId}` )
        dispatch({type: "CONVERSATION_BY_MEMBER_SUCCESS", payload: data })


    } catch (error) {
        dispatch({type: "MANAGER_BY_SHOP_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}

export const addConversation = (newConversation) => async (dispatch) => {
    try {
        dispatch({type: "CONVERSATION_CREATE_REQUEST"})

        const {data} = await axios.post( `http://localhost:5000/conversations`, newConversation)
        dispatch({type: "CONVERSATION_CREATE_SUCCESS", payload: data })


    } catch (error) {
        dispatch({type: "MANAGER_CREATE_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}

export const addMessage = (newMessage) => async (dispatch) => {
    try {
        dispatch({type: "MESSAGE_CREATE_REQUEST"})

        const {data} = await axios.post( `http://localhost:5000/messages/`, newMessage)
        dispatch({type: "MESSAGE_CREATE_SUCCESS", payload: data })


    } catch (error) {
        dispatch({type: "MANAGER_CREATE_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}

export const GetMessageByConvo = (conversationId) => async (dispatch) => {
    try {
        dispatch({type: "MESSAGES_LIST_REQUEST"})

        const {data} = await axios.get( `http://localhost:5000/messages/${conversationId}` )
        dispatch({type: "MESSAGES_LIST_SUCCESS", payload: data })


    } catch (error) {
        dispatch({type: "MESSAGES_LIST_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}
