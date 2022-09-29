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

export const GetOrdesrByShop = (id) => async (dispatch) => {
    try {
        dispatch({type: "ORDER_BY_SHOP_REQUEST"})

        const {data} = await axios.get(`http://localhost:4000/orders/ordersByShop/${id}`)
        dispatch({type: "ORDER_BY_SHOP_SUCCESS", payload: data })

    } catch (error) {
        dispatch({type: "ORDER_BY_SHOP_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}

export const GetOrdesrByRegion = (id) => async (dispatch) => {
    try {
        dispatch({type: "ORDER_BY_REGION_REQUEST"})

        const {data} = await axios.get(`http://localhost:4000/orders/orderByRegion/${id}`)
        dispatch({type: "ORDER_BY_REGION_SUCCESS", payload: data })

    } catch (error) {
        dispatch({type: "ORDER_BY_REGION_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}

export const GetOrdesrByMission = (id) => async (dispatch) => {
    try {
        dispatch({type: "ORDER_BY_MISSION_REQUEST"})

        const {data} = await axios.get(`http://localhost:4000/orders/orderByMission/${id}`)
        dispatch({type: "ORDER_BY_MISSION_SUCCESS", payload: data })

    } catch (error) {
        dispatch({type: "ORDER_BY_MISSION_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}

export const OrderNumberByMonth = () => async (dispatch) => {
    try {
        dispatch({type: "ORDER_NUMBER_REQUEST"})

        const {data} = await axios.get("http://localhost:4000/orders/numberstats")
        dispatch({type: "ORDER_NUMBER_SUCCESS", payload: data })

    } catch (error) {
        dispatch({type: "ORDER_NUMBER_FAIL", payload: error.response && error.response.data.message?
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

export const getFirstOrderToDeliver = (id) => async (dispatch) => {
    try {
        dispatch({type: "ORDER_TO_DELIVER_REQUEST"})

        const {data} = await axios.get( `http://localhost:4000/orders/LastorderByShop/${id}`)
        dispatch({type: "ORDER_TO_DELIVER_SUCCESS", payload: data })


    } catch (error) {
        dispatch({type: "ORDER_TO_DELIVER_FAIL", payload: error.response && error.response.data.message?
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


export const affectOrderToMission = (id, updatedOrder ) => async (dispatch) => {
    try {
        dispatch({type: "VALIDATE_ORDER_REQUEST"})

        const {data} = await axios.patch( `http://localhost:4000/orders/affectOrderToMission/${id}`, updatedOrder)
        dispatch({type: "VALIDATE_ORDER_SUCCESS", payload: data })



    } catch (error) {
        dispatch({type: "VALIDATE_ORDER_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}

export const unaffectOrderFromMission = (id) => async (dispatch) => {
    try {
        dispatch({type: "UNAFFECT_ORDER_FROM_MISSION_REQUEST"})

        const {data} = await axios.patch( `http://localhost:4000/orders/unaffectOrderFromMission/${id}`)
        dispatch({type: "UNAFFECT_ORDER_FROM_MISSION_SUCCESS", payload: data })


    } catch (error) {
        dispatch({type: "UNAFFECT_ORDER_FROM_MISSION_FAIL", payload: error.response && error.response.data.message?
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