import axios from "axios";

const url ='http://localhost:5000/shops/';

export const listShops = () => async (dispatch) => {
    try {
        dispatch({type: "SHOP_LIST_REQUEST"})

        const {data} = await axios.get(url)
        dispatch({type: "SHOP_LIST_SUCCESS", payload: data })

    } catch (error) {
        dispatch({type: "SHOP_LIST_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}

export const GetshopDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: "SHOP_DETAILS_REQUEST"})

        const {data} = await axios.get( `http://localhost:5000/shops/${id}`)
        dispatch({type: "SHOP_DETAILS_SUCCESS", payload: data })


    } catch (error) {
        dispatch({type: "SHOP_DETAILS_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}


export const updateShop = (id, updatedShop) => async (dispatch) => {
    try {
        dispatch({type: "SHOP_UPDATE_REQUEST"})

        const {data} = await axios.patch( `http://localhost:5000/shops/${id}`, updatedShop)
        dispatch({type: "SHOP_UPDATE_SUCCESS", payload: data })


    } catch (error) {
        dispatch({type: "SHOP_UPDATE_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}

export const deleteShop = (id) => async (dispatch) => {
    try {
        dispatch({type: "SHOP_DELETE_REQUEST"})

        const {data} = await axios.delete( `http://localhost:5000/shops/${id}`)
        dispatch({type: "SHOP_DELETE_SUCCESS", payload: data })


    } catch (error) {
        dispatch({type: "SHOP_DELETE_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}

export const createShop = (newShop) => async (dispatch) => {
    try {
        dispatch({type: "SHOP_CREATE_REQUEST"})

        const {data} = await axios.post( `http://localhost:5000/shops/`, newShop)
        dispatch({type: "SHOP_CREATE_SUCCESS", payload: data })


    } catch (error) {
        dispatch({type: "SHOP_CREATE_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}