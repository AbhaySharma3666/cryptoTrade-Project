import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import authReducer from "./Auth/Reducer";
import { thunk } from 'redux-thunk';
import coinReducer from "./Coin/Reducer";
import walletReducer from "./Wallet/Reducer";
import withdrawalReducer from "./Withdrawal/Reducer";
import orderReducer from "./Order/Reducer";
import assetReducer from "./Asset/Reducer";
import watchlistReducer from "./Watchlist/Reducer";

const rootReducer = combineReducers({
    // Add your reducers here
    auth: authReducer,
    coin: coinReducer,
    wallet: walletReducer,
    withdrawal: withdrawalReducer,
    order: orderReducer,
    asset: assetReducer, 
    watchlist:watchlistReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));