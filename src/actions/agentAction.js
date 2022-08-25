import axios from "axios";


const baseURL = "http://localhost:8080/auth/realms/master/protocol/openid-connect/token";
const urlKeycloak = 'http://localhost:8080/auth/admin/realms/force-de-vente';


const params = new URLSearchParams()
params.append('client_id', 'admin-cli')
params.append('username', 'admin')
params.append('password', 'admin')
params.append('grant_type', 'password')

export const getToken = () => {
    axios.post("http://localhost:8080/auth/realms/master/protocol/openid-connect/token", params)
        .then((response) => {
            // console.log('Token from Api /n' + response.data.access_token)
            // if (!localStorage.getItem("token"))
            // {
            //     localStorage.setItem("token", response.data.access_token)
            // } else {
            //     localStorage.removeItem("token");
                localStorage.setItem("token", response.data.access_token);
            // }
        });
}

let config = {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")?.toString()
    }
}



export const listAgents = () => async (dispatch) => {
    try {

        dispatch({type: "AGENT_LIST_REQUEST"})
        await getToken();
        const {data} = await axios.get('http://localhost:8080/auth/admin/realms/force-de-vente/groups/199afe1a-5a23-4701-82b0-1459046d4501/members', config)
         dispatch({type: "AGENT_LIST_SUCCESS", payload: data })

    } catch (error) {
        dispatch({type: "AGENT_LIST_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}

export const GetAgentDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: "AGENT_DETAILS_REQUEST"})
        await getToken();
        const {data} = await axios.get( `http://localhost:8080/auth/admin/realms/force-de-vente/users/${id}`)
        dispatch({type: "AGENT_DETAILS_SUCCESS", payload: data })


    } catch (error) {
        dispatch({type: "AGENT_DETAILS_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}

export const updateAgent = (id, updatedAgent) => async (dispatch) => {
    try {
        dispatch({type: "AGENT_UPDATE_REQUEST"})
        await getToken();
        const {data} = await axios.put( `http://localhost:8080/auth/admin/realms/force-de-vente/users/${id}`, updatedAgent, config)
        dispatch({type: "AGENT_UPDATE_SUCCESS", payload: data })


    } catch (error) {
        dispatch({type: "AGENT_UPDATE_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}

export const deleteAgent = (id) => async (dispatch) => {
    try {
        dispatch({type: "AGENT_DELETE_REQUEST"})
        await getToken();
        const {data} = await axios.delete( `http://localhost:8080/auth/admin/realms/force-de-vente/users/${id}`, config)
        dispatch({type: "AGENT_DELETE_SUCCESS", payload: data })


    } catch (error) {
        dispatch({type: "AGENT_DELETE_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}
