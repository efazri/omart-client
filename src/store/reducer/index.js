import { 
    SET_PRODUCTS, 
    SET_LOADING, 
    SET_ERROR, 
    SET_ADD_PRODUCT, 
    SET_USER_ROLE, 
    SET_DELETE_DIALOG, 
    SET_SELECTED_PRODUCT, 
    SET_ADD_DIALOG, 
    SET_CART 
} from '../actions'

const initialState = {
    products : [],
    loading : false,
    error : false,
    addProduct: false,
    userRole: 'costumer',
    deleteDialog: false,
    dialog: false,
    selectedProduct: {},
    cart: []
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
        case SET_USER_ROLE:
            return { ...state, userRole: action.payload }
        case SET_DELETE_DIALOG:
            return { ...state, deleteDialog: action.payload }
        case SET_SELECTED_PRODUCT:
            return { ...state, selectedProduct: action.payload }
        case SET_ADD_DIALOG:
            return { ...state, dialog: action.payload}
        case SET_CART:
            return { ...state, cart: action.payload}
        default:
            return state
    }
}   