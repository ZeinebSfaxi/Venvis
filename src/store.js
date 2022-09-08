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
import {
    deleteManagerReducer,
    ManagerByShopReducer,
    managerCreateReducer, ManagerListReducer,
    updateManagerReducer
} from "./reducers/shopManagerReducers";
import {competitorListReducer} from "./reducers/competitorsReducer";
import {
    OrderByShopReducer,
    OrderListReducer, OrderToDeliverReducer,
    singleOrderReducer,
    stateOrderReducer,
    validateOrderReducer
} from "./reducers/ordersReducers";
import {
    agentCreateReducer,
    agentDetailsReducer,
    AgentListReducer,
    deleteAgentReducer,
    updateAgentReducer
} from "./reducers/agentsReducer";
import {MissionListReducer} from "./reducers/missionReducer";


const reducer = combineReducers({
    shopList: shopListReducer,
    shopDetails: shopDetailsReducer,
    shopUpdate: updateShopReducer,
    shopDelete: deleteShopReducer,
    shopCreate: shopCreateReducer,


    managerByShop: ManagerByShopReducer,
    managerCreate: managerCreateReducer,
    managerUpdate: updateManagerReducer,
    managerDelete: deleteManagerReducer,
    managerList: ManagerListReducer,

    orderList: OrderListReducer,
    singleOrder: singleOrderReducer,
    validateOrder: validateOrderReducer,
    stateOrder: stateOrderReducer,
    ordersByShop: OrderByShopReducer,
    OrderToDeliver: OrderToDeliverReducer,


    agentList: AgentListReducer,
    agentDetails: agentDetailsReducer,
    agentUpdate: updateAgentReducer,
    agentCreate: agentCreateReducer,
    agentDelete: deleteAgentReducer,

    missionList: MissionListReducer,


    competitorList: competitorListReducer,
})

const initialState= {}

const middleware = [thunk]

const store = createStore (
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store