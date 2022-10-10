import axios from "axios";

export const ListMissions = () => async (dispatch) => {
    try {
        dispatch({type: "MISSION_LIST_REQUEST"})

        const {data} = await axios.get("http://localhost:4000/missions")
        dispatch({type: "MISSION_LIST_SUCCESS", payload: data })

    } catch (error) {
        dispatch({type: "MISSION_LIST_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}

export const GetMissionDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: "MISSION_DETAILS_REQUEST"})

        const {data} = await axios.get( `http://localhost:4000/missions/${id}`)
        dispatch({type: "MISSION_DETAILS_SUCCESS", payload: data })


    } catch (error) {
        dispatch({type: "MISSION_DETAILS_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}

export const createMission = (newMission) => async (dispatch) => {
    try {
        dispatch({type: "MISSION_CREATE_REQUEST"})

        const {data} = await axios.post( `http://localhost:4000/missions/`, newMission)
        dispatch({type: "MISSION_CREATE_SUCCESS", payload: data })


    } catch (error) {
        dispatch({type: "MISSION_CREATE_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}

export const updateMission = (id, updatedMission) => async (dispatch) => {
    try {
        dispatch({type: "MISSION_UPDATE_REQUEST"})

        const {data} = await axios.patch( `http://localhost:4000/missions/updateMission/${id}`, updatedMission)
        dispatch({type: "MISSION_UPDATE_SUCCESS", payload: data })



    } catch (error) {
        dispatch({type: "MISSION_UPDATE_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}

export const deleteMission = (id) => async (dispatch) => {
    try {
        dispatch({type: "MISSION_DELETE_REQUEST"})

        const {data} = await axios.delete( `http://localhost:4000/missions/${id}`)
        dispatch({type: "MISSION_DELETE_SUCCESS", payload: data })


    } catch (error) {
        dispatch({type: "MISSION_DELETE_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}

export const affectAgentToMission = (id, updatedMission) => async (dispatch) => {
    try {
        dispatch({type: "AFFECT_MANAGER_TO_SHOP_REQUEST"})

        const {data} = await axios.patch( `http://localhost:4000/missions/affectAgentToMission/${id}`, updatedMission)
        dispatch({type: "AFFECT_MANAGER_TO_SHOP_SUCCESS", payload: data })



    } catch (error) {
        dispatch({type: "AFFECT_MANAGER_TO_SHOP_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}

export const UpdateMissionState = (id, updatedMission) => async (dispatch) => {
    try {
        dispatch({type: "UPDATE_MISSION_STATE_REQUEST"})

        const {data} = await axios.patch( `http://localhost:4000/missions/updateMissionState/${id}`, updatedMission)
        dispatch({type: "UPDATE_MISSION_STATE_SUCCESS", payload: data })



    } catch (error) {
        dispatch({type: "UPDATE_MISSION_STATE_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}