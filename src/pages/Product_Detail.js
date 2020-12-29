import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setCart } from '../store/actions/actions'
import { Button, IconButton, RadioGroup, Radio, FormControlLabel, TextField, Divider } from '@material-ui/core'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'

export default function Product_Detail(){
    const { products } = useSelector(state => state )
    const [ product, setProduct ] = useState({})
    const [ sizeProduct, setSize ] = useState('')
    const [ qty, setQty ] = useState(1)
    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    const sizeHandler = (e) => {
        setSize(e.target.value)
    }

    const qtyHandler = (e) => {
        setQty(e.target.value)
    }

    const fetchCart = () => {
        axios({
            url: 'http://localhost:3000/cart',
            method: 'GET',
            headers: {
                access_token : localStorage.getItem('access_token')
            }
        })
        .then(({ data }) => {
            dispatch(setCart(data))
            history.push('/cart')
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    const addToCart = () => {
        if(!localStorage.getItem('access_token')){
            history.push('login')
        }
        const data = {
            productName : product.productName,
            price: product.price,
            amount: qty,
            ProductId: product.id,
            image_url: product.image_url

        }
        axios({
            url: 'http://localhost:3000/cart',
            method: 'POST',
            headers: {
                access_token : localStorage.getItem('access_token')
            },
            data
        })
        .then( resp => {
            fetchCart()
        })
        .catch(err => {
            console.log(err)
        })
    }

    const buyProduct = () => {
        history.push('/checkout')
    }

    useEffect(() => {
        if(products.length !== 0){
            products.forEach(datum => {
                if(datum.id === Number(id)){
                    setProduct(datum)
                }
            })
        }
    }, [])


    return (
        <div style={{ marginTop: '20vh'}}>
            <div className="container_prod_detail">
                <div style={{ width: '50%', justifyContent: 'center', marginRight: '5vh'}}>
                    <img src={product.image_url} alt="helo" style={{ width: '100%'}} className="productImage"/>
                </div>
                <div style={{ textAlign: 'left', width: '50%' }}>
                    <h1>{product.productName}</h1>
                    <p style={{ fontSize: '80%', marginTop: '1vh', marginBottom: '1vh'}}>{product.description}</p>
                    <p>Rp {product.price}</p>
                    <Divider variant="light" style={{ marginTop: '2vh', marginBottom: '2vh'}} />
                    <div>
                        <p style={{ textAlign: 'center'}}>Available size:</p>
                        <div style={{ display: 'flex', justifyContent: 'row wrap'}}>
                            {   
                                product.availableSize &&
                                product.availableSize.map(size => {
                                    return (
                                        <div style={{ display: 'flex', alignItems: 'center'}}>
                                            <Radio
                                                checked = { sizeProduct === size}
                                                onChange = {(e) => { sizeHandler(e)}}
                                                value={size}
                                                color="default"
                                                name="product size"
                                                inputProps={{ 'aria-label': 'E' }}
                                                size="small"
                                                
                                            />
                                            <label>{size}</label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <Divider variant="light" style={{ marginTop: '2vh', marginBottom: '2vh'}} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
                        <TextField 
                                type="number"
                                value = {qty}
                                name="stock"
                                id="outlined-margin-normal"
                                InputProps={{
                                    inputProps: { 
                                        min: 1,
                                        max: product.stock
                                    }
                                }}
                                label="Qty"
                                margin="normal"
                                variant="outlined"
                                onChange={(e) => { qtyHandler(e)}}
                            />
                        <div>
                            <IconButton variant="contained" color="primary" style={{ marginRight: '2vh'}} onClick={() => {addToCart()}}>
                                <AddShoppingCartIcon/>
                            </IconButton>
                            <Button variant="contained" color="primary" onClick={() => {buyProduct()}}>Buy</Button>
                        </div>
                    </div>
                </div>

            </div>       
        </div>
    )
}