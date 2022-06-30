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
        console.log("hedhi data", data)

    } catch (error) {
        dispatch({type: "SHOP_DETAILS_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}