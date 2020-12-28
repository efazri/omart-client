import {
    SET_ERROR,
    SET_PRODUCTS,
    SET_LOADING,
    SET_ADD_PRODUCT
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