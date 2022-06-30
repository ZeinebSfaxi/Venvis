import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension";
import {
    deleteShopReducer,
    shopCreateReducer,
    shopDetailsReducer,
    shopListReducer,
    updateShopReducer
} from "./reducers/shopReducers";

const reducer = combineReducers({
    shopList: shopListReducer,
    shopDetails: shopDetailsReducer,
    shopUpdate: updateShopReducer,
    shopDelete: deleteShopReducer,
    shopCreate: shopCreateReducer
})

const initialState= {}

const middleware = [thunk]

const store = createStore (
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store