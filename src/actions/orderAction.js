import axios from "axios";

export const ListOrder = () => async (dispatch) => {
    try {
        dispatch({type: "ORDER_LIST_REQUEST"})

        const {data} = await axios.get("http://localhost:4000/orders")
        dispatch({type: "ORDER_LIST_SUCCESS", payload: data })

    } catch (error) {
        dispatch({type: "ORDER_LIST_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}

export const GetOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: "ORDER_DETAILS_REQUEST"})

        const {data} = await axios.get( `http://localhost:4000/orders/${id}`)
        dispatch({type: "ORDER_DETAILS_SUCCESS", payload: data })


    } catch (error) {
        dispatch({type: "ORDER_DETAILS_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}

export const validateOrder = (id, updatedOrder ) => async (dispatch) => {
    try {
        dispatch({type: "VALIDATE_ORDER_REQUEST"})

        const {data} = await axios.patch( `http://localhost:4000/orders/validate/${id}`, updatedOrder)
        dispatch({type: "VALIDATE_ORDER_SUCCESS", payload: data })



    } catch (error) {
        dispatch({type: "VALIDATE_ORDER_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}

export const stateOrder = (id, updatedOrder ) => async (dispatch) => {
    try {
        dispatch({type: "STATE_ORDER_REQUEST"})

        const {data} = await axios.patch( `http://localhost:4000/orders/state/${id}`, updatedOrder)
        dispatch({type: "STATE_ORDER_SUCCESS", payload: data })



    } catch (error) {
        dispatch({type: "STATE_ORDER_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}