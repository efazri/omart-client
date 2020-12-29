import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Paper, Divider, Button, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

export default function Checkout () {
    const [ products, setProducts ] = useState([])
    const { cart } = useSelector(state => state)
    const [ paymentMethod, setPaymentMethod ] = useState('')
    const [ checkoutItems, setCheckoutItems ] = useState([])
    const [ deliveryFee, setDeliveryFee ] = useState(0)
    const [ deliveryService, setDeliveryService ] = useState('')
    const history = useHistory()

    const getPrice = () => {
        let price = 0
        cart.forEach(product => {
            price += (product.price * product.amount)
        })
        return price
    }

    const paymentHandler = (e) => {
        setPaymentMethod(e.target.value)
    }

    const deliveryHandler = (e) => {
        if (e.target.value === 'JNE') {
            setDeliveryFee(12000)
        } else if (e.target.value === 'JNT' || e.target.value === 'SiCepat' || e.target.value === 'AntarAja') {
            setDeliveryFee(11000)
        } else {
            setDeliveryFee(10000)
        }

        setDeliveryService(e.target.value)
    }


    const getCheckoutItem = () => {
        const newCart = []
        if (cart.length !== 0){
            cart.forEach(product => {
                if (product.checkout){
                    newCart.push(product)
                }
            })
        }
        setCheckoutItems(newCart)
    }

    const checkout = () => {
        axios({
            url: 'http://localhost:3000/checkout',
            method: 'PUT',
            headers: {
                access_token : localStorage.getItem('access_token')
            },
            data: {
                benda: 1000
            }
        })
        .then( resp => {
            console.log(`sukses`)
        })
        .catch( err => {
            console.log(err)
        })
    }

    useEffect(() => {
        if (localStorage.getItem('access_token')){
            axios({
                url: 'http://localhost:3000/product',
                method: 'GET'
            })
            .then( ({data}) => {
                setProducts(data)
                getCheckoutItem()
            })
            .catch(err => {
                console.log(err)
            })
        } else {
            history.push('/login')
        }
    }, [])


    return (
        <div style={{ marginTop: '15vh'}}>
            <div className="checkout-container">
                <div>
                    {
                        checkoutItems.length !==0 &&
                        checkoutItems.map(product => {
                            return (
                                <Paper key={product.id} style={{ marginBottom: '3vh', flexFlow: 'row wrap', width: '100vh', height: '35vh', padding: '2vh'}}>
                                    <div style={{ display: 'flex' }}>

                                        <img src={product.image_url} style={{ maxWidth: '20vh', height: '23vh', marginRight: '5vh'}} />
                                        <div>
                                            <h5>{ product.productName}</h5>
                                            <p>Rp { product.price }</p>
                                            <p>Qty: {product.amount} pcs</p>
                                        </div>
                                    </div>
                                    <Divider variant="light" style={{ marginTop: '2vh', marginBottom: '2vh'}} />
                                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                        <h5>Subtotal</h5>
                                        <h5>{product.totalAmount}</h5>
                                    </div>
                                </Paper>
                            )
                        })
                    }
                </div>
                <div>
                    <Paper style={{ width: '60vh', height: '70vh', padding: '5vh', textAlign: 'center'}}>
                        <FormControl variant="outlined" style={{ width: '35vh', marginBottom: '3vh'}}>
                            <InputLabel id="demo-simple-select-outlined-label">Payment Method</InputLabel>
                            <Select
                                name="category"
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                label="Category"
                                onChange={(e) => { paymentHandler(e)}}
                                >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="BNI">BNI</MenuItem>
                                <MenuItem value="BCA">BCA</MenuItem>
                                <MenuItem value="BRI">BRI</MenuItem>
                                <MenuItem value="Mandiri">Mandiri</MenuItem>
                                <MenuItem value="Permata">Permata</MenuItem>
                                <MenuItem value="BTN">BTN</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" style={{ width: '35vh', marginBottom: '3vh'}}>
                            <InputLabel id="demo-simple-select-outlined-label">Delivery Service</InputLabel>
                            <Select
                                name="category"
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                label="Category"
                                onChange={(e) => { deliveryHandler(e)}}
                                >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="JNE">JNE</MenuItem>
                                <MenuItem value="JNT">JNT</MenuItem>
                                <MenuItem value="SiCepat">SiCepat</MenuItem>
                                <MenuItem value="AntarAja">AntarAja</MenuItem>
                                <MenuItem value="Tiki">Tiki</MenuItem>
                            </Select>
                        </FormControl>


                        <div style={{ height : '30vh'}}>
                            <h5>Detail Transaction</h5>
                            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                <h5>Total Harga ({checkoutItems.length} barang)</h5>
                                <h5>{getPrice()}</h5>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                <h5>Ongkos Kirim</h5>
                                <h5>{deliveryFee}</h5>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                <h5>Payment Method</h5>
                                <h5>{paymentMethod}</h5>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                <h5>Delivery Service</h5>
                                <h5>{deliveryService}</h5>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4vh'}}>
                                <h3>Total Payment</h3>
                                <h3 style={{ color: 'red'}}>{getPrice() + deliveryFee}</h3>
                            </div>

                        </div>
                        
                        <Button onClick={() => {checkout()}} color="primary" variant="contained" style={{ width: '40vh'}}>Checkout</Button>
                    </Paper>
                </div>
            </div>
        </div>
    )
}