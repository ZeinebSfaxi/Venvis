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