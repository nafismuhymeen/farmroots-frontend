import axios from 'axios';
import { USER_ADDRESS_SAVE_REQUEST, USER_ADDRESS_SAVE_SUCCESS, USER_ADDRESS_SAVE_FAIL, 
    USER_ADDRESS_EDIT_REQUEST, USER_ADDRESS_EDIT_SUCCESS, USER_ADDRESS_EDIT_FAIL, USER_ADDRESS_DELETE_REQUEST, 
    USER_ADDRESS_DELETE_SUCCESS, USER_ADDRESS_DELETE_FAIL, USER_ADDRESS_LIST_REQUEST, USER_ADDRESS_LIST_SUCCESS, USER_ADDRESS_LIST_FAIL } from '../constants/addressConstants';

const saveAddress = (address) => async (dispatch, getState) =>{
    const {userSignin: {userInfo}} = getState();
    dispatch({type: USER_ADDRESS_SAVE_REQUEST, payload: address});
    try {
        const {data} = await axios.post('/api/addresses', address,
        {headers:{
            Authorization: 'Bearer ' + userInfo.token
        }});
        dispatch({type: USER_ADDRESS_SAVE_SUCCESS, payload: data});
    } catch (error){
        dispatch ({type: USER_ADDRESS_SAVE_FAIL, payload: error.message});
    }
}

const editAddress = (address) => async (dispatch, getState) =>{
    const {userSignin: {userInfo}} = getState();
    dispatch({type: USER_ADDRESS_EDIT_REQUEST, payload: address});
    try {
        const {data} = await axios.put('/api/addresses/' + address._id, address,
        {headers:{
            Authorization: 'Bearer ' + userInfo.token
        }});
        dispatch({type: USER_ADDRESS_EDIT_SUCCESS, payload: data});
    } catch (error){
        dispatch ({type: USER_ADDRESS_EDIT_FAIL, payload: error.message});
    }
}

const deleteAddress = (addressId) => async (dispatch, getState) =>{
    const {userSignin: {userInfo}} = getState();
    dispatch({type: USER_ADDRESS_DELETE_REQUEST, payload: addressId});
    try {
        const {data} = await axios.delete('/api/addresses/' + addressId,
        {headers:{
            Authorization: 'Bearer ' + userInfo.token
        }});
        dispatch({type: USER_ADDRESS_DELETE_SUCCESS, payload: data});
    } catch (error){
        dispatch ({type: USER_ADDRESS_DELETE_FAIL, payload: error.message});
    }
}

const listMyAddresses = () => async (dispatch, getState) =>{
    try {
        dispatch({type: USER_ADDRESS_LIST_REQUEST});
        const {userSignin: {userInfo}} = getState();
        const {data} = await axios.get("/api/addresses/mine", {
            headers:{
                Authorization: 'Bearer ' + userInfo.token
            } 
        });
        dispatch({type: USER_ADDRESS_LIST_SUCCESS, payload: data})    
    } catch (error) {
        dispatch({type: USER_ADDRESS_LIST_FAIL, payload: error.message});            
    }
}

export {saveAddress, editAddress, deleteAddress, listMyAddresses}