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
    affectOrderToMissionReducer,
    OrderByMissionReducer, OrderByRegionReducer,
    OrderByShopReducer,
    OrderListReducer, OrderToDeliverReducer,
    singleOrderReducer,
    stateOrderReducer,
    unaffectOrderFromMissionReducer,
    validateOrderReducer
} from "./reducers/ordersReducers";
import {
    agentCreateReducer,
    agentDetailsReducer,
    AgentListReducer,
    deleteAgentReducer,
    updateAgentReducer
} from "./reducers/agentsReducer";
import {
    affectAgentToMissionReducer,
    deleteMissionReducer,
    missionCreateReducer,
    missionDetailsReducer,
    MissionListReducer,
    updateMissionReducer,
    UpdateMissionStateReducer
} from "./reducers/missionReducer";


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
    affectOrderToMission: affectOrderToMissionReducer,
    unaffectOrderFromMission: unaffectOrderFromMissionReducer,
    stateOrder: stateOrderReducer,
    ordersByShop: OrderByShopReducer,
    ordersByRegion: OrderByRegionReducer,
    ordersByMission: OrderByMissionReducer,
    OrderToDeliver: OrderToDeliverReducer,


    agentList: AgentListReducer,
    agentDetails: agentDetailsReducer,
    agentUpdate: updateAgentReducer,
    agentCreate: agentCreateReducer,
    agentDelete: deleteAgentReducer,

    missionList: MissionListReducer,
    missionDetails: missionDetailsReducer,
    missionCreate: missionCreateReducer,
    missionUpdate: updateMissionReducer,
    missionDelete: deleteMissionReducer,
    missionAffect: affectAgentToMissionReducer,
    missionUpdateState: UpdateMissionStateReducer,

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