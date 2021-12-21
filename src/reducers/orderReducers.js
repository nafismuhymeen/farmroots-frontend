const { ORDER_CREATE_SUCCESS, ORDER_CREATE_REQUEST, ORDER_CREATE_FAIL, ORDER_DETAILS_REQUEST,
     ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL, 
     ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, 
     ORDER_DELETE_FAIL, ORDER_CREATE_RESET, ORDER_CANCEL_REQUEST, ORDER_CANCEL_SUCCESS, ORDER_CANCEL_FAIL, ORDER_CALL_CENTER_LIST_REQUEST, ORDER_CALL_CENTER_LIST_SUCCESS, ORDER_CALL_CENTER_LIST_FAIL, ORDER_CALL_CENTER_ASSIGN_REQUEST, ORDER_CALL_CENTER_ASSIGN_SUCCESS, ORDER_CALL_CENTER_ASSIGN_FAIL, ORDER_AUTHORIZE_REQUEST, ORDER_AUTHORIZE_SUCCESS, ORDER_AUTHORIZE_FAIL, ORDER_DELIVERY_LIST_REQUEST, ORDER_DELIVERY_LIST_SUCCESS, ORDER_DELIVERY_LIST_FAIL, ORDER_DELIVERED_REQUEST, ORDER_DELIVERED_SUCCESS, ORDER_DELIVERED_FAIL, ORDER_ITEMS_EDIT_REQUEST, ORDER_ITEMS_EDIT_SUCCESS, ORDER_ITEMS_EDIT_FAIL, ORDER_EDIT_REQUEST, ORDER_EDIT_SUCCESS, ORDER_EDIT_FAIL, ORDER_SUPPLY_CHAIN_LIST_REQUEST, ORDER_SUPPLY_CHAIN_LIST_SUCCESS, ORDER_SUPPLY_CHAIN_LIST_FAIL, ORDER_PROCESS_REQUEST, ORDER_PROCESS_SUCCESS, ORDER_PROCESS_FAIL, ORDER_FEEDBACK_LIST_REQUEST, ORDER_FEEDBACK_LIST_SUCCESS, ORDER_FEEDBACK_LIST_FAIL, ORDER_CALL_CENTER_BOSS_LIST_REQUEST, ORDER_CALL_CENTER_BOSS_LIST_SUCCESS, ORDER_CALL_CENTER_BOSS_LIST_FAIL, ORDER_FEEDBACK_ASSIGN_REQUEST, ORDER_FEEDBACK_ASSIGN_SUCCESS, ORDER_FEEDBACK_ASSIGN_FAIL, ORDER_TAKE_FEEDBACK_REQUEST, ORDER_TAKE_FEEDBACK_SUCCESS, ORDER_TAKE_FEEDBACK_FAIL, ORDER_REASSIGN_LIST_REQUEST, ORDER_REASSIGN_LIST_SUCCESS, ORDER_REASSIGN_LIST_FAIL, ORDER_DELIVERY_GUY_ASSIGN_REQUEST, ORDER_DELIVERY_GUY_ASSIGN_SUCCESS, ORDER_DELIVERY_GUY_ASSIGN_FAIL, ORDER_COMPLETE_REQUEST, ORDER_COMPLETE_SUCCESS, ORDER_COMPLETE_FAIL, ORDER_PICKUP_REQUEST, ORDER_PICKUP_SUCCESS, ORDER_PICKUP_FAIL, ORDER_EMPLOYEE_CANCEL_REQUEST, ORDER_EMPLOYEE_CANCEL_SUCCESS, ORDER_EMPLOYEE_CANCEL_FAIL, ORDER_PRICE_EDIT_REQUEST, ORDER_PRICE_EDIT_SUCCESS, ORDER_PRICE_EDIT_FAIL, ORDER_SPLIT_ITEMS_EDIT_REQUEST, ORDER_SPLIT_ITEMS_EDIT_SUCCESS, ORDER_SPLIT_ITEMS_EDIT_FAIL, ORDER_PARTIAL_CREATE_REQUEST, ORDER_PARTIAL_CREATE_SUCCESS, ORDER_PARTIAL_CREATE_FAIL } = require("../constants/orderConstants");

function orderCreateReducer(state = {}, action){
    switch(action.type){
        case ORDER_CREATE_REQUEST:
            return {loading: true}
        case ORDER_CREATE_SUCCESS:
            return {loading: false, order: action.payload, success: true};
        case ORDER_CREATE_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }
}

function orderDetailsReducer(state = {
    order:{
        orderItems: [],
        shipping: {}
    }
}, action){
    switch(action.type){
        case ORDER_DETAILS_REQUEST:
            return {loading: true}
        case ORDER_DETAILS_SUCCESS:
            return {loading: false, order: action.payload};
        case ORDER_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }
}

function myOrderListReducer(state = {
    orders:[]
}, action){
    switch(action.type){
        case MY_ORDER_LIST_REQUEST:
            return {loading: true}
        case MY_ORDER_LIST_SUCCESS:
            return {loading: false, orders: action.payload};
        case MY_ORDER_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }
}

function orderListReducer(state = {
    orders:[]
}, action){
    switch(action.type){
        case ORDER_LIST_REQUEST:
            return {loading: true}
        case ORDER_LIST_SUCCESS:
            return {loading: false, orders: action.payload};
        case ORDER_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }
}

function orderCallCenterListReducer(state = {
    orders:[]
}, action){
    switch(action.type){
        case ORDER_CALL_CENTER_LIST_REQUEST:
            return {loading: true}
        case ORDER_CALL_CENTER_LIST_SUCCESS:
            return {loading: false, orders: action.payload};
        case ORDER_CALL_CENTER_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }
}

function orderReassignListReducer(state = {
    orders:[]
}, action){
    switch(action.type){
        case ORDER_REASSIGN_LIST_REQUEST:
            return {loading: true}
        case ORDER_REASSIGN_LIST_SUCCESS:
            return {loading: false, orders: action.payload};
        case ORDER_REASSIGN_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }
}

function orderCallCenterBossListReducer(state = {
    orders:[]
}, action){
    switch(action.type){
        case ORDER_CALL_CENTER_BOSS_LIST_REQUEST:
            return {loading: true}
        case ORDER_CALL_CENTER_BOSS_LIST_SUCCESS:
            return {loading: false, orders: action.payload};
        case ORDER_CALL_CENTER_BOSS_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }
}

function orderFeedbackListReducer(state = {
    orders:[]
}, action){
    switch(action.type){
        case ORDER_FEEDBACK_LIST_REQUEST:
            return {loading: true}
        case ORDER_FEEDBACK_LIST_SUCCESS:
            return {loading: false, orders: action.payload};
        case ORDER_FEEDBACK_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }
}

function orderSupplyChainListReducer(state = {
    orders:[]
}, action){
    switch(action.type){
        case ORDER_SUPPLY_CHAIN_LIST_REQUEST:
            return {loading: true}
        case ORDER_SUPPLY_CHAIN_LIST_SUCCESS:
            return {loading: false, orders: action.payload};
        case ORDER_SUPPLY_CHAIN_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }
}

function orderDeliveryListReducer(state = {
    orders:[]
}, action){
    switch(action.type){
        case ORDER_DELIVERY_LIST_REQUEST:
            return {loading: true}
        case ORDER_DELIVERY_LIST_SUCCESS:
            return {loading: false, orders: action.payload};
        case ORDER_DELIVERY_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }
}

function orderCancelReducer(state = {
    order: {
        orderItems: [],
        shipping: {},
        payment: {}
    }
}, action) {
    switch(action.type){
        case ORDER_CANCEL_REQUEST:
            return {loading: true}
        case ORDER_CANCEL_SUCCESS:
            return {loading: false, success: true};
        case ORDER_CANCEL_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }    
}

function orderEmployeeCancelReducer(state = {
    order: {
        orderItems: [],
        shipping: {},
        payment: {}
    }
}, action) {
    switch(action.type){
        case ORDER_EMPLOYEE_CANCEL_REQUEST:
            return {loading: true}
        case ORDER_EMPLOYEE_CANCEL_SUCCESS:
            return {loading: false, success: true};
        case ORDER_EMPLOYEE_CANCEL_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }    
}

function orderAuthorizeReducer(state = {
    order: {
        orderItems: [],
        shipping: {},
        payment: {}
    }
}, action) {
    switch(action.type){
        case ORDER_AUTHORIZE_REQUEST:
            return {loading: true}
        case ORDER_AUTHORIZE_SUCCESS:
            return {loading: false, success: true};
        case ORDER_AUTHORIZE_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }    
}

function orderPickupReducer(state = {
    order: {
        orderItems: [],
        shipping: {},
        payment: {}
    }
}, action) {
    switch(action.type){
        case ORDER_PICKUP_REQUEST:
            return {loading: true}
        case ORDER_PICKUP_SUCCESS:
            return {loading: false, success: true};
        case ORDER_PICKUP_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }    
}

function orderProcessReducer(state = {
    order: {
        orderItems: [],
        shipping: {},
        payment: {}
    }
}, action) {
    switch(action.type){
        case ORDER_PROCESS_REQUEST:
            return {loading: true}
        case ORDER_PROCESS_SUCCESS:
            return {loading: false, success: true};
        case ORDER_PROCESS_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }    
}

function orderDeliverReducer(state = {
    order: {
        orderItems: [],
        shipping: {},
        payment: {}
    }
}, action) {
    switch(action.type){
        case ORDER_DELIVERED_REQUEST:
            return {loading: true}
        case ORDER_DELIVERED_SUCCESS:
            return {loading: false, success: true};
        case ORDER_DELIVERED_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }    
}

function orderCompleteReducer(state = {
    order: {
        orderItems: [],
        shipping: {},
        payment: {}
    }
}, action) {
    switch(action.type){
        case ORDER_COMPLETE_REQUEST:
            return {loading: true}
        case ORDER_COMPLETE_SUCCESS:
            return {loading: false, success: true};
        case ORDER_COMPLETE_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }    
}

function orderItemsEditReducer(state = {
    order: {
        orderItems: [],
        shipping: {},
        payment: {}
    }
}, action) {
    switch(action.type){
        case ORDER_ITEMS_EDIT_REQUEST:
            return {loading: true}
        case ORDER_ITEMS_EDIT_SUCCESS:
            return {loading: false, success: true};
        case ORDER_ITEMS_EDIT_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }    
}

function orderSplitItemsEditReducer(state = {
    order: {
        orderItems: [],
        shipping: {},
        payment: {}
    }
}, action) {
    switch(action.type){
        case ORDER_SPLIT_ITEMS_EDIT_REQUEST:
            return {loading: true}
        case ORDER_SPLIT_ITEMS_EDIT_SUCCESS:
            return {loading: false, success: true};
        case ORDER_SPLIT_ITEMS_EDIT_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }    
}

function orderEditReducer(state = {
    order: {
        orderItems: [],
        shipping: {},
        payment: {}
    }
}, action) {
    switch(action.type){
        case ORDER_EDIT_REQUEST:
            return {loading: true}
        case ORDER_EDIT_SUCCESS:
            return {loading: false, success: true};
        case ORDER_EDIT_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }    
}

function orderPriceEditReducer(state = {
    order: {
        orderItems: [],
        shipping: {},
        payment: {}
    }
}, action) {
    switch(action.type){
        case ORDER_PRICE_EDIT_REQUEST:
            return {loading: true}
        case ORDER_PRICE_EDIT_SUCCESS:
            return {loading: false, success: true};
        case ORDER_PRICE_EDIT_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }    
}

function orderCallCenterAssignReducer(state = {
    order: {
        orderItems: [],
        shipping: {},
        payment: {}
    }
}, action) {
    switch(action.type){
        case ORDER_CALL_CENTER_ASSIGN_REQUEST:
            return {loading: true}
        case ORDER_CALL_CENTER_ASSIGN_SUCCESS:
            return {loading: false, success: true};
        case ORDER_CALL_CENTER_ASSIGN_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }    
}

function orderDeliveryGuyAssignReducer(state = {
    order: {
        orderItems: [],
        shipping: {},
        payment: {}
    }
}, action) {
    switch(action.type){
        case ORDER_DELIVERY_GUY_ASSIGN_REQUEST:
            return {loading: true}
        case ORDER_DELIVERY_GUY_ASSIGN_SUCCESS:
            return {loading: false, success: true};
        case ORDER_DELIVERY_GUY_ASSIGN_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }    
}

function orderFeedbackAssignReducer(state = {
    order: {
        orderItems: [],
        shipping: {},
        payment: {}
    }
}, action) {
    switch(action.type){
        case ORDER_FEEDBACK_ASSIGN_REQUEST:
            return {loading: true}
        case ORDER_FEEDBACK_ASSIGN_SUCCESS:
            return {loading: false, success: true};
        case ORDER_FEEDBACK_ASSIGN_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }    
}

function orderTakeFeedbackReducer(state = {
    order: {
        orderItems: [],
        shipping: {},
        payment: {}
    }
}, action) {
    switch(action.type){
        case ORDER_TAKE_FEEDBACK_REQUEST:
            return {loading: true}
        case ORDER_TAKE_FEEDBACK_SUCCESS:
            return {loading: false, success: true};
        case ORDER_TAKE_FEEDBACK_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }    
}

function orderPartialCreateReducer(state = {}, action){
    switch(action.type){
        case ORDER_PARTIAL_CREATE_REQUEST:
            return {loading: true}
        case ORDER_PARTIAL_CREATE_SUCCESS:
            return {loading: false, order: action.payload, success: true};
        case ORDER_PARTIAL_CREATE_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }
}

export {orderCreateReducer, orderDetailsReducer, myOrderListReducer, orderListReducer, orderEmployeeCancelReducer, 
    orderCancelReducer, orderCallCenterListReducer, orderCallCenterAssignReducer, orderAuthorizeReducer, orderPickupReducer, 
    orderDeliveryListReducer, orderDeliverReducer, orderItemsEditReducer, orderEditReducer, orderPriceEditReducer, orderSplitItemsEditReducer, 
    orderSupplyChainListReducer, orderProcessReducer, orderFeedbackListReducer, orderCallCenterBossListReducer, orderFeedbackAssignReducer,
    orderTakeFeedbackReducer, orderReassignListReducer, orderDeliveryGuyAssignReducer, orderCompleteReducer, orderPartialCreateReducer}