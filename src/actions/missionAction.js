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