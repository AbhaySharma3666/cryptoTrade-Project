
import { existInWatchlist } from "@/utils/existInWatchlist"
import * as types from "./ActionTypes"

const initialState = {
    watchlist: null,
    loading: false,
    error: null,
    items: []
}

const watchlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_USER_WATCHLIST_REQUEST:
        case types.ADD_COIN_WATCHLIST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case types.TOGGLE_COIN_OPTIMISTIC:
            // Optimistically toggle coin in UI
            const { coinId, coin, shouldAdd } = action.payload;
            if (shouldAdd && coin) {
                // Add coin if it doesn't exist (prevent duplicates)
                const alreadyExists = state.items.some(item => item?.id === coinId);
                if (alreadyExists) {
                    return state; // Already in list, no change needed
                }
                return {
                    ...state,
                    items: [...state.items, coin],
                    loading: true
                };
            } else {
                // Remove coin if it exists
                return {
                    ...state,
                    items: state.items.filter((item) => item.id !== coinId),
                    loading: true
                };
            }
        case types.REMOVE_COIN_OPTIMISTIC:
            // Optimistically remove coin from UI (legacy support)
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload),
                loading: true
            }
        case types.CLEAR_WATCHLIST_ERROR:
            return {
                ...state,
                error: null
            }
        case types.GET_USER_WATCHLIST_SUCCESS:
            return {
                ...state,
                watchlist: action.payload,
                items: Array.isArray(action.payload?.coins) ? action.payload.coins : [],
                loading: false,
                error: null
            }
            
            case types.ADD_COIN_WATCHLIST_SUCCESS:
                // The refetch will handle the state update, so we just set loading to false
                // The optimistic update already handled the UI, and getUserWatchlist will sync it
                return {
                    ...state,
                    loading: false,
                    error: null
                }
            case types.GET_USER_WATCHLIST_FAILURE:
            case types.ADD_COIN_WATCHLIST_FAILURE:
                    return {
                        ...state,
                        loading: false,
                        error: action.error
                    }
        default:
            return state
    }
}

export default watchlistReducer