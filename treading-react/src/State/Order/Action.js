import api from '@/config/api';
import * as types from './ActionTypes';

export const payOrder = ({ jwt, orderData, amount }) => async (dispatch) => {
    dispatch({ type: types.PAY_ORDER_REQUEST });

    try {
        const response = await api.post('/api/orders/pay', orderData, {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
        });

        dispatch({
            type: types.PAY_ORDER_SUCCESS,
            payload: response.data,
            amount
        });
        console.log("order success", response.data);
        return { success: true, data: response.data };  // IMPORTANT
    } catch (error) {
        console.log("Order error -", error);
        const message =
            error?.response?.data?.message || "Order failed, try again";

        dispatch({
            type: types.PAY_ORDER_FAILURE,
            error: message,
        });

        return { success: false, message };  // IMPORTANT
    }
}

// export const getOrderById = (jwt, orderId) => async (dispatch) => {

export const getAllOrdersForUser = ({ jwt, orderType, assetSymbol }) => async (dispatch) => {
    dispatch({ type: types.GET_ALL_ORDERS_REQUEST });

    try {
        const response = await api.get('/api/orders', {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
            params: {
                order_type: orderType,
                asset_symbol: assetSymbol,
            },
        });

        dispatch({
            type: types.GET_ALL_ORDERS_SUCCESS,
            payload: response.data,
        });
        console.log("order success", response.data);

    } catch (error) {
        console.log("error", error);
        dispatch({
            type: types.GET_ALL_ORDERS_FAILURE,
            error: error.message,
        });
    }
}