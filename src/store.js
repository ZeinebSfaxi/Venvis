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
    managerCreateReducer, ManagerListReducer, shopManagerDetailsReducer,
    updateManagerReducer
} from "./reducers/shopManagerReducers";
import {competitorListReducer} from "./reducers/competitorsReducer";
import {
    affectOrderToMissionReducer,
    OrderByMissionReducer, OrderByRegionReducer,
    OrderByShopReducer,
    OrderListReducer, OrderNumberReducer, OrderToDeliverReducer,
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
    UpdateMissionStateReducer,
    MissionNumberReducer,
    updateMissionReducer
} from "./reducers/missionReducer";
import {
    conversationByMemberReducer,
    conversationCreateReducer,
    messageCreateReducer,
    MessagesListReducer
} from "./reducers/chatReducer";
import {
    reclamationDetailsReducer,
    reclamationListReducer,
    SAVNumberReducer,
    updateReclamationReducer
} from "./reducers/savReducers";


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
    shopManagerDetails: shopManagerDetailsReducer,

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
    orderNumber: OrderNumberReducer,


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

    messagesList: MessagesListReducer,
    conversationCreate: conversationCreateReducer,
    conversationByMember: conversationByMemberReducer,
    messageCreate: messageCreateReducer,
    missionNumber: MissionNumberReducer,

    reclamationList: reclamationListReducer,
    reclamationDetails: reclamationDetailsReducer,
    updateReclamation: updateReclamationReducer,
    SAVNumber :SAVNumberReducer,

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