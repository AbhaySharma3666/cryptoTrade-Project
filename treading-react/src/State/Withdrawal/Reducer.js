import {
    WITHDRAWAL_REQUEST,
    WITHDRAWAL_SUCCESS,
    WITHDRAWAL_FAILURE,
    WITHDRAWAL_PROCEED_REQUEST,
    WITHDRAWAL_PROCEED_SUCCESS,
    WITHDRAWAL_PROCEED_FAILURE,
    GET_WITHDRAWAL_HISTORY_REQUEST,
    GET_WITHDRAWAL_HISTORY_SUCCESS,
    GET_WITHDRAWAL_HISTORY_FAILURE,
    GET_WITHDRAWAL_REQUEST_REQUEST,
    GET_WITHDRAWAL_REQUEST_SUCCESS,
    GET_WITHDRAWAL_REQUEST_FAILURE,
    ADD_PAYMENT_DETAILS_REQUEST,
    ADD_PAYMENT_DETAILS_SUCCESS,
    ADD_PAYMENT_DETAILS_FAILURE,
    GET_PAYMENT_DETAILS_REQUEST,
    GET_PAYMENT_DETAILS_SUCCESS,
    GET_PAYMENT_DETAILS_FAILURE,
    DELETE_PAYMENT_DETAILS_REQUEST,
    DELETE_PAYMENT_DETAILS_SUCCESS,
    DELETE_PAYMENT_DETAILS_FAILURE
} from "./ActionType";

const initialState ={
    withdrawal :null,
    history: [],
    error: null,
    loading: false,
    PaymentDetails: null,
    requests: [] 
} 

const withdrawalReducer = (state=initialState, action) =>{
    switch(action.type){
        case WITHDRAWAL_REQUEST:
        case WITHDRAWAL_PROCEED_REQUEST:
        case GET_WITHDRAWAL_HISTORY_REQUEST:
        case GET_WITHDRAWAL_REQUEST_REQUEST:
        case ADD_PAYMENT_DETAILS_REQUEST:
        case GET_PAYMENT_DETAILS_REQUEST:
        case DELETE_PAYMENT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                error:null,
            }
        case WITHDRAWAL_SUCCESS:
            return {
                ...state,
                loading: false,
                error:null,
            }
        case GET_WITHDRAWAL_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                history: action.payload,
                error: null
            }
        case ADD_PAYMENT_DETAILS_SUCCESS:
        case GET_PAYMENT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                paymentDetails: action.payload,
                error:null,
            }
        case DELETE_PAYMENT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                paymentDetails: null,
                error:null,
            }
        case WITHDRAWAL_PROCEED_SUCCESS:
            return {
                ...state,
               requests: state.requests.map((item) => 
                item.id == action.payload.id ? action.payload : item
            ),
            loading: false,
            error:null,
            }
        case GET_WITHDRAWAL_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                request: action.payload,
                error: null
            }
        case WITHDRAWAL_FAILURE:
        case WITHDRAWAL_PROCEED_FAILURE:
        case GET_WITHDRAWAL_HISTORY_FAILURE:
        case GET_WITHDRAWAL_REQUEST_FAILURE:
        case ADD_PAYMENT_DETAILS_FAILURE:
        case GET_PAYMENT_DETAILS_FAILURE:
        case DELETE_PAYMENT_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export default withdrawalReducer; 