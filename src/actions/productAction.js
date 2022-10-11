import axios from "axios";


// const baseURL = "http://localhost:8080/auth/realms/master/protocol/openid-connect/token";
// const urlKeycloak = 'http://localhost:8080/auth/admin/realms/force-de-vente';


const params = new URLSearchParams()
params.append('client_id', '6cb595cc-554c-4a2e-943f-2c687fe884df/f5c024de-6051-43cb-b254-2c1434ae632f')
params.append('client_secret', '|1|Q|nvs9axAMU/!@H<B')
params.append('code', 'GB/d0b1f250-9519-4e93-ad11-d86d303cb17f')
params.append('grant_type', 'authorization_code')

export const getTokenSage = () => {
    axios.post("https://oauth.accounting.sage.com/token", params)
        .then((response) => {
            // console.log('Token from Api /n' + response.data.access_token)
            localStorage.setItem("tokenSage", response.data.access_token);
            // }
        });
}

let config = {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token2")?.toString()
    }
}



export const ProductList = () => async (dispatch) => {
    try {

        dispatch({type: "PRODUCT_LIST_REQUEST"})
        await getTokenSage();
        const {data} = await axios.get('https://api.accounting.sage.com/v3.1/products/', config)
        dispatch({type: "PRODUCT_LIST_SUCCESS", payload: data })

    } catch (error) {
        dispatch({type: "PRODUCT_LIST_FAIL", payload: error.response && error.response.data.message?
                error.response.data.message
                : error.message
        })
    }
}
