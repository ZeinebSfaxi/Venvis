import axios from "axios";

export const GetManagerByShop = (id) => async (dispatch) => {
    try {
        dispatch({type: "MANAGER_BY_SHOP_REQUEST"})

        const {data} = await axios.get( `http://localhost:5000/shopManagers/managerByShop/${id}` )
        dispatch({type: "MANAGER_BY_SHOP_SUCCESS", payload: data })


    } catch (error) {
        dispatch({type: "MANAGER_BY_SHOP_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}

export const addManager = (newManager) => async (dispatch) => {
    try {
        dispatch({type: "MANAGER_CREATE_REQUEST"})

        const {data} = await axios.post( `http://localhost:5000/shopManagers/`, newManager)
        dispatch({type: "MANAGER_CREATE_SUCCESS", payload: data })


    } catch (error) {
        dispatch({type: "MANAGER_CREATE_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}

export const deleteManager = (id) => async (dispatch) => {
    try {
        dispatch({type: "MANAGER_DELETE_REQUEST"})

        const {data} = await axios.delete( `http://localhost:5000/shopManagers/${id}`)
        dispatch({type: "MANAGER_DELETE_SUCCESS", payload: data })


    } catch (error) {
        dispatch({type: "MANAGER_DELETE_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}

export const updateManager = (id, updatedManager) => async (dispatch) => {
    try {
        dispatch({type: "MANAGER_UPDATE_REQUEST"})

        const {data} = await axios.patch( `http://localhost:5000/shopManagers/${id}`, updatedManager)
        dispatch({type: "MANAGER_UPDATE_SUCCESS", payload: data })


    } catch (error) {
        dispatch({type: "MANAGER_UPDATE_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}

export const listManagers = () => async (dispatch) => {
    try {
        dispatch({type: "MANAGER_LIST_REQUEST"})

        const {data} = await axios.get("http://localhost:5000/shopManagers")
        dispatch({type: "MANAGER_LIST_SUCCESS", payload: data })

    } catch (error) {
        dispatch({type: "MANAGER_LIST_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}