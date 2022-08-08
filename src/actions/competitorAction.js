import axios from "axios";

const url ='http://localhost:5000/competitorsScrap/amazone';

export const listCompetitors = () => async (dispatch) => {
    try {
        dispatch({type: "COMPETITOR_LIST_REQUEST"})

        const {data} = await axios.get(url)
        dispatch({type: "COMPETITOR_LIST_SUCCESS", payload: data })

    } catch (error) {
        dispatch({type: "COMPETITOR_LIST_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}