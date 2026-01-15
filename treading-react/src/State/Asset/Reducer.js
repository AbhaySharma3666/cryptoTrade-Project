import * as types from './ActionTypes';

const initialState = {
    asset: null,
    userAssets: [],
    assetDetails: null,
    Loading: false,
    error: null
};

const assetReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ASSET_REQUEST:
        case types.GET_USER_ASSET_REQUEST:
            return {
                ...state,
                Loading: true,
                error: null
            };
        case types.GET_ASSET_SUCCESS:
            return {
                ...state,
                asset: action.payload,
                Loading: false,
                error: null
            };
        case types.GET_ASSET_DETAILS_SUCCESS:
            return {
                ...state,
                assetDetails: action.payload,
                Loading: false,
                error: null
            };
        case types.GET_USER_ASSET_SUCCESS:
            return {
                ...state,
                userAssets: action.payload,
                Loading: false,
                error: null
            };
        case types.GET_ASSET_FAILURE:
        case types.GET_USER_ASSET_FAILURE:
            return {
                ...state,
                Loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default assetReducer;