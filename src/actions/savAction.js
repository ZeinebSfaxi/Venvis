import axios from "axios";

const url ='http://localhost:4000/sav/';

export const listSavs = () => async (dispatch) => {
    try {
        dispatch({type: "RECLAMATION_LIST_REQUEST"})

        const {data} = await axios.get(url)
        dispatch({type: "RECLAMATION_LIST_SUCCESS", payload: data })

    } catch (error) {
        dispatch({type: "RECLAMATION_LIST_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}

export const GetSAVDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: "RECLAMATION_DETAILS_REQUEST"})

        const {data} = await axios.get( `http://localhost:4000/sav/${id}`)
        dispatch({type: "RECLAMATION_DETAILS_SUCCESS", payload: data })


    } catch (error) {
        dispatch({type: "RECLAMATION_DETAILS_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}


export const updateSAV = (id, updatedSAV) => async (dispatch) => {
    try {
        dispatch({type: "RECLAMATION_UPDATE_REQUEST"})

        const {data} = await axios.patch( `http://localhost:4000/sav/${id}`, updatedSAV)
        dispatch({type: "RECLAMATION_UPDATE_SUCCESS", payload: data })


    } catch (error) {
        dispatch({type: "RECLAMATION_UPDATE_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}

