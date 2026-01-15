
import { GET_WITHDRAWAL_HISTORY_FAILURE, GET_WITHDRAWAL_HISTORY_REQUEST, GET_WITHDRAWAL_HISTORY_SUCCESS, WITHDRAWAL_FAILURE, WITHDRAWAL_PROCEED_FAILURE, WITHDRAWAL_PROCEED_REQUEST, WITHDRAWAL_PROCEED_SUCCESS, WITHDRAWAL_REQUEST, WITHDRAWAL_SUCCESS, GET_WITHDRAWAL_REQUEST_REQUEST, GET_WITHDRAWAL_REQUEST_SUCCESS, GET_WITHDRAWAL_REQUEST_FAILURE, ADD_PAYMENT_DETAILS_REQUEST, ADD_PAYMENT_DETAILS_SUCCESS, ADD_PAYMENT_DETAILS_FAILURE, GET_PAYMENT_DETAILS_REQUEST, GET_PAYMENT_DETAILS_SUCCESS, GET_PAYMENT_DETAILS_FAILURE, DELETE_PAYMENT_DETAILS_REQUEST, DELETE_PAYMENT_DETAILS_SUCCESS, DELETE_PAYMENT_DETAILS_FAILURE } from "./ActionType"
import api from "@/config/api"; 


export const withdrawalRequest =( {amount, jwt}) => async dispatch =>{
    dispatch({type: WITHDRAWAL_REQUEST});
    try {
        const response = await api.post(`api/withdrawal/${amount}`, null, {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
        });

        console.log("withdrawal === ",response.data);
        dispatch({
            type: WITHDRAWAL_SUCCESS,
            payload: response.data
        });
        
    } catch (error) {
        dispatch({
            type: WITHDRAWAL_FAILURE,
            payload: error.response
        })
    } 
}

export const proceedWithdrawal = ({id,jwt, accept}) => async dispatch =>{
    dispatch({type: WITHDRAWAL_PROCEED_REQUEST});
    try {
        const response = await api.patch(`api/admin/withdrawal/${id}/proceed/${accept}`, null, {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
        });

        console.log("proceed withdrawal === ", response.data);
        dispatch({
            type: WITHDRAWAL_PROCEED_SUCCESS,
            payload: response.data
        });

    } catch (error) {
        dispatch({
            type: WITHDRAWAL_PROCEED_FAILURE,
            payload: error.response
        })
    }
}

export const getWithdrawalHistory = jwt => async dispatch =>{
    dispatch({type: GET_WITHDRAWAL_HISTORY_REQUEST});
    try{
        const response = await api.get(`api/withdrawal`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
        });

        console.log("get withdrawal history-----",response.data);
        dispatch({
            type: GET_WITHDRAWAL_HISTORY_SUCCESS,
            payload: response.data
        });
        
    } catch (error) {
        dispatch({
            type: GET_WITHDRAWAL_HISTORY_FAILURE,
            payload: error.message
        })
    }   
}

export const getAllWithdrawalRequest = jwt => async dispatch =>{
    dispatch({type: GET_WITHDRAWAL_REQUEST_REQUEST});
    try{
        const response = await api.get(`api/admin/withdrawal`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
        });

        console.log("get withdrawal requests-----", response.data);
        dispatch({
            type: GET_WITHDRAWAL_REQUEST_SUCCESS,
            payload: response.data
        });

    } catch (error) {
        dispatch({
            type: GET_WITHDRAWAL_REQUEST_FAILURE,
            payload: error.message
        })
    }
}

export const addPaymentDetails = ({PaymentDetails, jwt}) => async dispatch =>{
    dispatch({type: ADD_PAYMENT_DETAILS_REQUEST});
    try {
        const response = await api.post(`api/payment-details`, PaymentDetails, {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
        });

        console.log("add payment details === ", response.data);
        dispatch({
            type: ADD_PAYMENT_DETAILS_SUCCESS,
            payload: response.data
        });

    } catch (error) {
        console.log(error);
        
        dispatch({
            type: ADD_PAYMENT_DETAILS_FAILURE,
            payload: error.message
        })
    }
}

export const getPaymentDetails = ({jwt}) => async dispatch =>{
    dispatch({type: GET_PAYMENT_DETAILS_REQUEST});
    try{
        const response = await api.get(`api/payment-details`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
        });

        console.log("get payment details-----", response.data);
        dispatch({
            type: GET_PAYMENT_DETAILS_SUCCESS,
            payload: response.data
        });

    } catch (error) {
        console.log(error);
        
        dispatch({
            type: GET_PAYMENT_DETAILS_FAILURE,
            payload: error.message
        })
    }
}

export const deletePaymentDetails = ({jwt}) => async dispatch =>{
    dispatch({type: DELETE_PAYMENT_DETAILS_REQUEST});
    try{
        const response = await api.delete(`api/payment-details`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
        });

        console.log("delete payment details-----", response.data);
        dispatch({
            type: DELETE_PAYMENT_DETAILS_SUCCESS,
            payload: null
        });
        
        // Refetch to ensure UI is updated
        dispatch(getPaymentDetails({jwt}));

    } catch (error) {
        console.log(error);
        
        dispatch({
            type: DELETE_PAYMENT_DETAILS_FAILURE,
            payload: error.message
        })
    }
}