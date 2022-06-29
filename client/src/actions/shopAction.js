import axios from "axios";

const url ='http://localhost:5000/shops/';

export const listShops = () => async (dispatch) => {
    try {
        dispatch({type: "SHOP_LIST_REQUEST"})

        const {data} = await axios.get('http://localhost:5000/shops/')
        dispatch({type: "SHOP_LIST_SUCCESS", payload: data })

    } catch (error) {
        dispatch({type: "SHOP_LIST_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}