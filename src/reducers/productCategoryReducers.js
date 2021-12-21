import { PRODUCT_CATEGORY_CREATE_FAIL, PRODUCT_CATEGORY_CREATE_REQUEST, PRODUCT_CATEGORY_CREATE_SUCCESS, 
    PRODUCT_CATEGORY_DELETE_FAIL, PRODUCT_CATEGORY_DELETE_REQUEST, PRODUCT_CATEGORY_DELETE_SUCCESS, PRODUCT_CATEGORY_EDIT_FAIL, 
    PRODUCT_CATEGORY_EDIT_REQUEST, PRODUCT_CATEGORY_EDIT_SUCCESS, PRODUCT_CATEGORY_LIST_FAIL, PRODUCT_CATEGORY_LIST_REQUEST, 
    PRODUCT_CATEGORY_LIST_SUCCESS, 
    PRODUCT_POPULAR_CATEGORY_LIST_FAIL, 
    PRODUCT_POPULAR_CATEGORY_LIST_REQUEST,
    PRODUCT_POPULAR_CATEGORY_LIST_SUCCESS} from "../constants/productCategoryConstants";

function productCategoryCreateReducer(state= {category: {}}, action){
    switch (action.type){
        case PRODUCT_CATEGORY_CREATE_REQUEST:
            return {loading: true};
        case PRODUCT_CATEGORY_CREATE_SUCCESS:
            return {loading: false, success: true, category: action.payload};
        case PRODUCT_CATEGORY_CREATE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function productCategoryListReducer(state= {categories: []}, action){
    switch (action.type){
        case PRODUCT_CATEGORY_LIST_REQUEST:
            return {loading: true, categories: []};
        case PRODUCT_CATEGORY_LIST_SUCCESS:
            return {loading: false, categories: action.payload};
        case PRODUCT_CATEGORY_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function productPopularCategoryListReducer(state= {popularCategories: []}, action){
    switch (action.type){
        case PRODUCT_POPULAR_CATEGORY_LIST_REQUEST:
            return {loading: true, popularCategories: []};
        case PRODUCT_POPULAR_CATEGORY_LIST_SUCCESS:
            return {loading: false, popularCategories: action.payload};
        case PRODUCT_POPULAR_CATEGORY_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function productCategoryEditReducer(state= {category: {}}, action){
    switch (action.type){
        case PRODUCT_CATEGORY_EDIT_REQUEST:
            return {loading: true};
        case PRODUCT_CATEGORY_EDIT_SUCCESS:
            return {loading: false, success: true, category: action.payload};
        case PRODUCT_CATEGORY_EDIT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function productCategoryDeleteReducer(state= {category: {}}, action){
    switch (action.type){
        case PRODUCT_CATEGORY_DELETE_REQUEST:
            return {loading: true};
        case PRODUCT_CATEGORY_DELETE_SUCCESS:
            return {loading: false, success: true, category: action.payload};
        case PRODUCT_CATEGORY_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export {productCategoryCreateReducer, productCategoryListReducer, productCategoryEditReducer, productCategoryDeleteReducer, 
    productPopularCategoryListReducer}