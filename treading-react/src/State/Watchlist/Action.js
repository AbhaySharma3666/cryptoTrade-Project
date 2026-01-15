import api from '@/config/api';
import * as types from './ActionTypes';

export const clearWatchlistError = () => ({
    type: types.CLEAR_WATCHLIST_ERROR
});

export const getUserWatchlist = (jwt) => async (dispatch) => {
    
    dispatch({ type: types.GET_USER_WATCHLIST_REQUEST });
    try {
        const response = await api.get(`/api/watchlist/user`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                }
            }
        );
        dispatch({
            type: types.GET_USER_WATCHLIST_SUCCESS,
            payload: response.data
        });
        console.log("user watchlist ---",response.data);
    } catch (error) {
        console.log("user watchlist ---",error.response?.data);
        dispatch({
            type: types.GET_USER_WATCHLIST_FAILURE,
            error: error.message
        });
    }
}

export const addItemToWatchlist = ({coinId, jwt, coin}) => async (dispatch, getState) => {
    dispatch({ type: types.ADD_COIN_WATCHLIST_REQUEST });
    
    // Get current state to determine if coin exists
    const state = getState();
    const currentItems = state.watchlist?.items || [];
    const coinExists = currentItems.some(item => item?.id === coinId);
    
    // Optimistic toggle - update UI immediately based on current state
    dispatch({ 
        type: types.TOGGLE_COIN_OPTIMISTIC, 
        payload: { coinId, coin, shouldAdd: !coinExists }
    });
    
    try {
        const response = await api.patch(`/api/watchlist/add/coin/${coinId}`,{},
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                }
            }
        );
        console.log("add coin to watchlist ---", response.data);
        // Refetch watchlist to ensure UI is in sync with backend
        // This will override the optimistic update with the actual server state
        dispatch(getUserWatchlist(jwt));
    } catch (error) {
        console.log("add coin to watchlist ---", error.response?.data);
        let errorMessage = 'Failed to update watchlist';
        
        // Detect CORS errors
        if (error.code === 'ERR_NETWORK' || 
            error.message?.includes('Network Error') || 
            error.message?.includes('CORS') ||
            error.message?.includes('blocked by CORS policy') ||
            (error.response === undefined && error.request)) {
            errorMessage = 'CORS Error: Backend needs to allow requests from http://localhost:5173. The item was removed from the UI but may not be synced with the server.';
        } else if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
        } else if (error.message) {
            errorMessage = error.message;
        }
        
        dispatch({
            type: types.ADD_COIN_WATCHLIST_FAILURE,
            error: errorMessage,
            coinId: coinId
        });
        
        // Refetch to restore correct state if error occurred
        dispatch(getUserWatchlist(jwt));
    }
}