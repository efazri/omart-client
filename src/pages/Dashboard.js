import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setProducts, setError, setLoading } from '../store/actions/actions'
import { Link } from 'react-router-dom'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField, FormControl } from '@material-ui/core'
import Card from '../components/Product_Card'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



export default function Dashboard() {
    const { products, loading, error } = useSelector( state => state )
    const [ open, setOpen ] = useState(false);
    const [ productName, setProductName ] = useState('')
    const [ image_url, setImageUrl ] = useState('')
    const [ price, setPrice ] = useState(0)
    const [ stock, setStock ] = useState(0)
    const [ productNameError, setProductNameError ] = useState(false)
    const [ imageError, setImageError ] = useState(false)
    const [ priceError, setPriceError ] = useState(false)
    const [ stockError, setStockError ] = useState(false)
    const dispatch = useDispatch()



    const handleClickOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };

    const inputHandler = (e) => {
        switch (e.target.name) {
            case "product name":
                setProductName(e.target.value)
                setProductNameError(false)
                break;
            case "image_url":
                setImageUrl(e.target.value)
                setImageError(false)
                break;
            case "price":
                setPrice(e.target.value)
                setPriceError(false)
                break;
            case "stock":
                setStock(e.target.value)
                setStockError(false)
                break;
            default:
                break;
        }
    }

    const addProduct = (data) => {
        axios({
            method: 'POST',
            url: 'http://localhost:3000/product',
            headers: {
                access_token : localStorage.getItem('access_token')
            },
            data
        })
        .then( resp => {
            console.log(resp)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const submitForm = () => {
        if (!productName){
            setProductNameError(true)
        } else if (!image_url || typeof(Number(image_url)) === "number" ){
            setImageError(true)
        } else if (!price || Number(price) < 1){
            setPriceError(true)
        } else if (!stock || Number(stock) < 1 ){
            setStockError(true)
        } else {
            const data = {
                productName,
                image_url,
                price,
                stock
            }
            addProduct(data)
        }
    }


    useEffect(() => {
        dispatch(setLoading(true))
        if (products.length === 0){
            axios({
                method: 'GET',
                url: 'http://localhost:3000/product'
            })
            .then(({ data }) => {
                dispatch(setProducts(data))
                dispatch(setLoading(false))
            })
            .catch( err => {
                console.log(err)
                dispatch(setError(true))
            })
        }
    }, [])




    return (
        <div className="dashboard-container">
            <div className="menu-dashboard">
                <ul>
                    <li><Link to="/products?category=makanan" style={{ textDecoration: 'none'}}>Pakaian</Link></li>
                    <li><Link to="/products?category=makanan" style={{ textDecoration: 'none'}}>Makanan</Link></li>
                    <li><Link to="/products?category=elektronik" style={{ textDecoration: 'none'}}>Elektronik</Link></li>
                </ul>
            </div>
            <div>
                <div style={{ textAlign: 'right', marginRight: '4vh'}}>
                <Button variant="outlined" color="primary" onClick={handleClickOpen} >
                        Add Product
                </Button>
                </div>
                <div className="products-container">
                    {
                        products && 
                        products.map(datum => {
                            return (
                                <Card key={datum.id} product={datum} />
                            )
                        })
                    }
                </div>
            </div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Add Product</DialogTitle>
                <DialogContent>
                    <FormControl>
                        <TextField
                            error={productNameError}
                            label="Product Name"
                            name="product name"
                            id="outlined-margin-normal"
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => { inputHandler(e)}}
                        />
                        <TextField
                            error={imageError}
                            label="Image Url"
                            name="image_url"
                            id="outlined-margin-normal"
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => { inputHandler(e)}}
                        />
                        <TextField
                            error={priceError}
                            label="Price"
                            name="price"
                            id="outlined-margin-normal"
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => { inputHandler(e)}}
                        />
                        <TextField 
                            error={stockError}
                            type="number"
                            name="stock"
                            id="outlined-margin-normal"
                            InputProps={{
                                inputProps: { 
                                    min: 1 
                                }
                            }}
                            label="Stock"
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => { inputHandler(e)}}
                        />
                        <DialogActions>
                            <Button onClick={() => {submitForm()}} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </FormControl>
                </DialogContent>
            </Dialog>
        </div>
    )
}