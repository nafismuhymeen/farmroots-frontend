import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer, productNameListReducer, productRecommendedListReducer, productOutOfStockReducer, productCallCenterNameListReducer, productUploadNameListReducer } from './reducers/productReducers';
import thunk from 'redux-thunk';
import {buyNowReducer, cartReducer} from './reducers/cartReducers';
import Cookie from 'js-cookie';
import { userSigninReducer } from './reducers/userReducer';
import { orderCreateReducer, orderDetailsReducer, myOrderListReducer, orderListReducer, orderCancelReducer, orderCallCenterListReducer, orderCallCenterAssignReducer, orderAuthorizeReducer, orderDeliveryListReducer, orderDeliverReducer, orderItemsEditReducer, orderEditReducer, orderSupplyChainListReducer, orderProcessReducer, orderFeedbackListReducer, orderCallCenterBossListReducer, orderFeedbackAssignReducer, orderTakeFeedbackReducer, orderReassignListReducer, orderDeliveryGuyAssignReducer, orderCompleteReducer, orderPickupReducer, orderEmployeeCancelReducer, orderPriceEditReducer, orderSplitItemsEditReducer, orderPartialCreateReducer} from './reducers/orderReducers';
import { userAddressSaveReducer, userAddressEditReducer, userAddressDeleteReducer, userAddressListReducer } from './reducers/addressReducers';
import { productReviewSaveReducer, productReviewListReducer, productReviewDeleteReducer, myReviewListReducer, productReviewEditReducer, userReviewListReducer } from './reducers/reviewReducers';
import { wishlistAddReducer, wishlistDeleteReducer, wishlistUserListReducer, wishlistProductListReducer } from './reducers/wishlistReducers';
import { shippingReducer } from './reducers/shippingReducers';
import { productCategoryCreateReducer, productCategoryDeleteReducer, productCategoryEditReducer, productCategoryListReducer, productPopularCategoryListReducer } from './reducers/productCategoryReducers';
import { productCarouselCreateReducer, productCarouselDeleteReducer, productCarouselEditReducer, productCarouselListReducer } from './reducers/productCarouselReducers';
import { orderDivisionCreateReducer, orderDivisionDeleteReducer, orderDivisionEditReducer, orderDivisionListReducer, orderZonesListReducer } from './reducers/orderDivisionReducers';
import { homeScreenCreateReducer, homeScreenEditReducer, homeScreenGetReducer } from './reducers/homeScreenReducers';
import { logoCreateReducer, logoEditReducer, logoGetReducer } from './reducers/logoReducers';
import { callCenterGuysListReducer, deliveryGuysListReducer, employeeRegisterReducer, employeeSigninReducer } from './reducers/employeeReducers';
import { aboutCreateReducer, aboutEditReducer, aboutEmployeeGetReducer, aboutGetReducer, aboutManagementContentAddReducer, aboutManagementContentDeleteReducer, aboutManagementContentEditReducer } from './reducers/aboutReducers';
import { videosCookingVideosContentAddReducer, videosCookingVideosContentDeleteReducer, videosCookingVideosContentEditReducer, videosCreateReducer, videosEditReducer, videosEmployeeGetReducer, videosGetReducer, videosHealthTipsContentAddReducer, videosHealthTipsContentDeleteReducer, videosHealthTipsContentEditReducer, videosKitchenHacksContentAddReducer, videosKitchenHacksContentDeleteReducer, videosKitchenHacksContentEditReducer } from './reducers/videosReducers';
import { careersArticlesContentAddReducer, careersArticlesContentDeleteReducer, careersArticlesContentEditReducer, careersCreateReducer, careersEditReducer, careersEmployeeGetReducer, careersGetReducer, careersJobOpeningsContentAddReducer, careersJobOpeningsContentDeleteReducer, careersJobOpeningsContentEditReducer } from './reducers/careersReducers';
import { helpCreateReducer, helpDeleteReducer, helpEditReducer, helpEmployeeListReducer, helpListReducer } from './reducers/helpReducers';
import { suggestProductCreateReducer, suggestProductDeleteReducer, suggestProductListReducer } from './reducers/suggestProductReducers';
import { blogContentAddReducer, blogContentDeleteReducer, blogContentEditReducer, blogCreateReducer, blogEditReducer, blogGetReducer } from './reducers/blogReducers';
import { exportsContentAddReducer, exportsContentDeleteReducer, exportsContentEditReducer, exportsCreateReducer, exportsEditReducer, exportsGetReducer } from './reducers/exportsReducers';
import { partnerContentAddReducer, partnerContentDeleteReducer, partnerContentEditReducer, partnerCreateReducer, partnerEditReducer, partnerGetReducer } from './reducers/partnerReducers';
import { priceCreateReducer, priceDeliveryChargesAddReducer, priceDeliveryChargesDeleteReducer, priceDeliveryChargesEditReducer, priceEditReducer, priceGetReducer, priceProductDiscountAddReducer, priceProductDiscountDeleteReducer, priceProductDiscountEditReducer, priceUserDiscountAddReducer, priceUserDiscountDeleteReducer, priceUserDiscountEditReducer } from './reducers/priceReducers';
import { loginReducer } from './reducers/loginReducers';

const cartItems = Cookie.getJSON("cartItems") || [];
const buyNowItems = Cookie.getJSON("buyNowItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;
const employeeInfo = Cookie.getJSON("employeeInfo") || null;
const shipping = Cookie.getJSON("shipping") || {};

const initialState = {cart: {cartItems}, shippingInfo: {shipping}, userSignin: {userInfo}, buyNow: {buyNowItems}, employeeSignin: {employeeInfo}};
const reducer = combineReducers({
    cart: cartReducer,
    buyNow: buyNowReducer,
    shippingInfo: shippingReducer,
    userSignin: userSigninReducer,
    employeeSignin: employeeSigninReducer,
    employeeRegister: employeeRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    productList: productListReducer, 
    productDetails: productDetailsReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    myOrderList: myOrderListReducer,    
    orderList: orderListReducer,
    orderCancel: orderCancelReducer,
    productSaveReview: productReviewSaveReducer,
    productListReview: productReviewListReducer,
    userListReview: userReviewListReducer,
    productDeleteReview: productReviewDeleteReducer,
    productEditReview: productReviewEditReducer,
    myListReview: myReviewListReducer,
    userSaveAddress: userAddressSaveReducer,
    userEditAddress: userAddressEditReducer,
    userDeleteAddress: userAddressDeleteReducer,
    userListAddress: userAddressListReducer,
    addWishlist: wishlistAddReducer,
    userWishlist: wishlistUserListReducer,
    deleteWishlist: wishlistDeleteReducer,
    productWishlist: wishlistProductListReducer,
    productName: productNameListReducer,
    recommendedProduct: productRecommendedListReducer,
    productOutOfStock: productOutOfStockReducer,
    categoryCreate: productCategoryCreateReducer,
    categoryList: productCategoryListReducer,
    categoryEdit: productCategoryEditReducer,
    categoryDelete: productCategoryDeleteReducer,
    carouselCreate: productCarouselCreateReducer,
    carouselList: productCarouselListReducer,
    carouselEdit: productCarouselEditReducer,
    carouselDelete: productCarouselDeleteReducer,
    divisionCreate: orderDivisionCreateReducer,
    divisionList: orderDivisionListReducer,
    divisionEdit: orderDivisionEditReducer,
    divisionDelete: orderDivisionDeleteReducer,
    homeScreenCreate: homeScreenCreateReducer,
    homeScreenGet: homeScreenGetReducer,
    homeScreenEdit: homeScreenEditReducer,
    logoCreate: logoCreateReducer,
    logoGet: logoGetReducer,
    logoEdit: logoEditReducer,
    orderCallCenterBossList: orderCallCenterBossListReducer,
    orderCallCenterList: orderCallCenterListReducer,
    orderCallCenterAssign: orderCallCenterAssignReducer,
    orderEmployeeCancel: orderEmployeeCancelReducer,
    orderAuthorize: orderAuthorizeReducer,
    orderDeliveryList: orderDeliveryListReducer,
    orderDelivered: orderDeliverReducer,
    orderSplitItemsEdit: orderSplitItemsEditReducer,
    orderPartialCreate: orderPartialCreateReducer,
    orderItemsEdit: orderItemsEditReducer,
    orderEdit: orderEditReducer,
    orderPriceEdit: orderPriceEditReducer,
    productCallCenterName: productCallCenterNameListReducer,
    orderSupplyChainList: orderSupplyChainListReducer,
    orderPickup: orderPickupReducer,
    orderProcess: orderProcessReducer,
    orderFeedbackList: orderFeedbackListReducer,
    callCenterGuysList: callCenterGuysListReducer,
    orderFeedbackAssign: orderFeedbackAssignReducer,
    orderTakeFeedback: orderTakeFeedbackReducer,
    orderReassignList: orderReassignListReducer,
    deliveryGuysList: deliveryGuysListReducer,
    orderDeliveryGuyAssign: orderDeliveryGuyAssignReducer,
    zonesList: orderZonesListReducer,
    orderComplete: orderCompleteReducer,
    popularCategoryList: productPopularCategoryListReducer,
    aboutCreate: aboutCreateReducer,
    aboutGet: aboutGetReducer,
    aboutEmployeeGet: aboutEmployeeGetReducer,
    aboutEdit: aboutEditReducer,
    aboutManagementContentAdd: aboutManagementContentAddReducer,
    aboutManagementContentEdit: aboutManagementContentEditReducer,
    aboutManagementContentDelete: aboutManagementContentDeleteReducer,
    videosCreate: videosCreateReducer,
    videosGet: videosGetReducer,
    videosEmployeeGet: videosEmployeeGetReducer,
    videosEdit: videosEditReducer,
    videosCookingVideosContentAdd: videosCookingVideosContentAddReducer,
    videosCookingVideosContentEdit: videosCookingVideosContentEditReducer,
    videosCookingVideosContentDelete: videosCookingVideosContentDeleteReducer,
    videosKitchenHacksContentAdd: videosKitchenHacksContentAddReducer,
    videosKitchenHacksContentEdit: videosKitchenHacksContentEditReducer,
    videosKitchenHacksContentDelete: videosKitchenHacksContentDeleteReducer,
    videosHealthTipsContentAdd: videosHealthTipsContentAddReducer,
    videosHealthTipsContentEdit: videosHealthTipsContentEditReducer,
    videosHealthTipsContentDelete: videosHealthTipsContentDeleteReducer,
    careersCreate: careersCreateReducer,
    careersGet: careersGetReducer,
    careersEmployeeGet: careersEmployeeGetReducer,
    careersEdit: careersEditReducer,
    careersJobOpeningsContentAdd: careersJobOpeningsContentAddReducer,
    careersJobOpeningsContentEdit: careersJobOpeningsContentEditReducer,
    careersJobOpeningsContentDelete: careersJobOpeningsContentDeleteReducer,
    careersArticlesContentAdd: careersArticlesContentAddReducer,
    careersArticlesContentEdit: careersArticlesContentEditReducer,
    careersArticlesContentDelete: careersArticlesContentDeleteReducer,
    helpCreate: helpCreateReducer,
    helpList: helpListReducer,
    helpEdit: helpEditReducer,
    helpDelete: helpDeleteReducer,
    helpEmployeeList: helpEmployeeListReducer,
    suggestProductCreate: suggestProductCreateReducer,
    suggestProductList: suggestProductListReducer,
    suggestProductDelete: suggestProductDeleteReducer,
    blogCreate: blogCreateReducer,
    blogGet: blogGetReducer,
    blogEdit: blogEditReducer,
    blogContentAdd: blogContentAddReducer,
    blogContentEdit: blogContentEditReducer,
    blogContentDelete: blogContentDeleteReducer,
    exportsCreate: exportsCreateReducer,
    exportsGet: exportsGetReducer,
    exportsEdit: exportsEditReducer,
    exportsContentAdd: exportsContentAddReducer,
    exportsContentEdit: exportsContentEditReducer,
    exportsContentDelete: exportsContentDeleteReducer,
    partnerCreate: partnerCreateReducer,
    partnerGet: partnerGetReducer,
    partnerEdit: partnerEditReducer,
    partnerContentAdd: partnerContentAddReducer,
    partnerContentEdit: partnerContentEditReducer,
    partnerContentDelete: partnerContentDeleteReducer,
    priceCreate: priceCreateReducer,
    priceGet: priceGetReducer,
    priceEdit: priceEditReducer,
    priceDeliveryChargesAdd: priceDeliveryChargesAddReducer,
    priceDeliveryChargesEdit: priceDeliveryChargesEditReducer,
    priceDeliveryChargesDelete: priceDeliveryChargesDeleteReducer,
    priceProductDiscountAdd: priceProductDiscountAddReducer,
    priceProductDiscountEdit: priceProductDiscountEditReducer,
    priceProductDiscountDelete: priceProductDiscountDeleteReducer,
    priceUserDiscountAdd: priceUserDiscountAddReducer,
    priceUserDiscountEdit: priceUserDiscountEditReducer,
    priceUserDiscountDelete: priceUserDiscountDeleteReducer,
    productUploadName: productUploadNameListReducer,
    modal: loginReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;