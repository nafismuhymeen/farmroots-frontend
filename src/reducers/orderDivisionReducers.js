import { ORDER_DIVISION_CREATE_FAIL, ORDER_DIVISION_CREATE_REQUEST, ORDER_DIVISION_CREATE_SUCCESS, 
    ORDER_DIVISION_DELETE_FAIL, ORDER_DIVISION_DELETE_REQUEST, ORDER_DIVISION_DELETE_SUCCESS, ORDER_DIVISION_EDIT_FAIL, 
    ORDER_DIVISION_EDIT_REQUEST, ORDER_DIVISION_EDIT_SUCCESS, ORDER_DIVISION_LIST_FAIL, ORDER_DIVISION_LIST_REQUEST, 
    ORDER_DIVISION_LIST_SUCCESS, 
    ORDER_ZONES_LIST_FAIL, 
    ORDER_ZONES_LIST_REQUEST,
    ORDER_ZONES_LIST_SUCCESS} from "../constants/orderDivisionConstants";

function orderDivisionCreateReducer(state= {division: {}}, action){
    switch (action.type){
        case ORDER_DIVISION_CREATE_REQUEST:
            return {loading: true};
        case ORDER_DIVISION_CREATE_SUCCESS:
            return {loading: false, success: true, division: action.payload};
        case ORDER_DIVISION_CREATE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function orderDivisionListReducer(state= {divisions: []}, action){
    switch (action.type){
        case ORDER_DIVISION_LIST_REQUEST:
            return {loading: true, divisions: []};
        case ORDER_DIVISION_LIST_SUCCESS:
            return {loading: false, divisions: action.payload};
        case ORDER_DIVISION_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function orderZonesListReducer(state= {zones: []}, action){
    switch (action.type){
        case ORDER_ZONES_LIST_REQUEST:
            return {loading: true, zones: []};
        case ORDER_ZONES_LIST_SUCCESS:
            return {loading: false, zones: action.payload};
        case ORDER_ZONES_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function orderDivisionEditReducer(state= {division: {}}, action){
    switch (action.type){
        case ORDER_DIVISION_EDIT_REQUEST:
            return {loading: true};
        case ORDER_DIVISION_EDIT_SUCCESS:
            return {loading: false, success: true, division: action.payload};
        case ORDER_DIVISION_EDIT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function orderDivisionDeleteReducer(state= {division: {}}, action){
    switch (action.type){
        case ORDER_DIVISION_DELETE_REQUEST:
            return {loading: true};
        case ORDER_DIVISION_DELETE_SUCCESS:
            return {loading: false, success: true, division: action.payload};
        case ORDER_DIVISION_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export {orderDivisionCreateReducer, orderDivisionListReducer, orderDivisionEditReducer, orderDivisionDeleteReducer, orderZonesListReducer}