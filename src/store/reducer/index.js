import { SET_PRODUCTS, SET_LOADING, SET_ERROR, SET_ADD_PRODUCT } from '../actions'

const initialState = {
    products : [],
    loading : false,
    error : false,
    addProduct: false
}

export default function reducer (state = initialState, action) {
    switch (action.type) {
        case SET_PRODUCTS:
            return { ...state, products: action.payload }
        case SET_LOADING:
            return { ...state, loading: action.payload }
        case SET_ERROR:
            return { ...state, error: action.payload }
        case SET_ADD_PRODUCT:
            return { ...state, addProduct: action.payload }
        default:
            return state
    }
}   