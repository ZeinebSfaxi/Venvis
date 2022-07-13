import axios from "axios";

export const GetManagerByShop = (id) => async (dispatch) => {
    try {
        dispatch({type: "MANAGER_BY_SHOP_REQUEST"})

        const {data} = await axios.get( `http://localhost:5000/shopManagers/managerByShop/${id}`)
        dispatch({type: "MANAGER_BY_SHOP_SUCCESS", payload: data })


    } catch (error) {
        dispatch({type: "MANAGER_BY_SHOP_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}