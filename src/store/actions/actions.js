import {
    SET_ERROR,
    SET_PRODUCTS,
    SET_LOADING,
    SET_ADD_PRODUCT,
    SET_USER_ROLE,
    SET_DELETE_DIALOG,
    SET_SELECTED_PRODUCT,
    SET_ADD_DIALOG,
    SET_CART
} from '.'

export function setProducts (data) {
    return {
        type: SET_PRODUCTS,
        payload: data
    }
}

export function setLoading (data) {
    return { 
        type: SET_LOADING,
        payload: data
    }
}

export function setError (data) {
    return {
        type: SET_ERROR,
        payload: data
    }
}

export function setAddProduct (data) {
    return {
        type: SET_ADD_PRODUCT,
        payload: data
    }
}

export function setUserRole (data) {
    return {
        type: SET_USER_ROLE,
        payload: data
    }
}

export function setDeleteDialog (data) {
    return {
        type: SET_DELETE_DIALOG,
        payload: data
    }
}

export function setSelectedProduct (data) {
    return {
        type: SET_SELECTED_PRODUCT,
        payload: data
    }
}

export function setDialog (data) {
    return {
        type: SET_ADD_DIALOG,
        payload: data
    }
}

export function setCart (data) {
    return {
        type: SET_CART,
        payload: data
    }
}