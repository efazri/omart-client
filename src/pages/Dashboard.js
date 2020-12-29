import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setProducts, setError, setLoading, setDeleteDialog, setDialog, setSelectedProduct } from '../store/actions/actions'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField, FormControl, Radio, InputLabel, MenuItem, Select, TextareaAutosize, Divider } from '@material-ui/core'
import Card from '../components/Product_Card'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



export default function Dashboard() {
    const { products, loading, error, userRole, deleteDialog, selectedProduct, dialog } = useSelector( state => state )
    const [ showProducts, setShowProducts ] = useState(false)
    const [ open, setOpen ] = useState(false);
    const [ productName, setProductName ] = useState('')
    const [ image_url, setImageUrl ] = useState('')
    const [ price, setPrice ] = useState(0)
    const [ stock, setStock ] = useState(0)
    const [ category, setCategory ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ productNameError, setProductNameError ] = useState(false)
    const [ imageError, setImageError ] = useState(false)
    const [ priceError, setPriceError ] = useState(false)
    const [ stockError, setStockError ] = useState(false)
    const [ categoryError, setCategoryError ] = useState(false)
    const [ descriptionError, setDescriptionError ] = useState(false)
    const [ availableSize, setAvailableSize ] = useState([])
    const sizeValue = ["S", "M", "L", "XL"]
    const dispatch = useDispatch()


    const useQuery = () => {
        return new URLSearchParams(useLocation().search)
    }

    const query = useQuery()



    const getCheckedSize = (data) => {
        // if (availableSize.length !== 0) {
        //     for(let i = 0; i < availableSize.length ; i++){
        //         if(availableSize[i] === data){
        //             return true
        //         }
        //     }
        //     return false
        // }

        return true
    }
 
    const handleClickOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };

    const editClose = () => {
        dispatch(setDialog(false))
        // dispatch(setSelectedProduct({}))
    }

    const submitEdit = (id) => {
        if (!productName){
            setProductNameError(true)
        } else if (!image_url ){
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
                stock,
                category,
                description,
                availableSize
            }
            axios({
                url: 'http://localhost:3000/product/' + id,
                method: 'PUT',
                headers: {
                    access_token: localStorage.getItem('access_token')
                },
                data
            })
            .then( ({ data }) => {
                dispatch(setDialog(false))
                fetchProducts()
                console.log(data)
            })
            .catch( err => {
                console.log(err)
            })
        }
    }

    const deleteHandleClose = () => {
        dispatch(setDeleteDialog(false))
    }
    
    const deleteProduct = (id) => {
        axios({
            url: 'http://localhost:3000/product/' + id,
            method: 'DELETE',
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        .then( resp => {
            fetchProducts()
            dispatch(setDeleteDialog(false))
        })
        .catch( err => {
            console.log(err)
        })
    }

    const sizeHandler = (e) => {
        setAvailableSize(size => [...size, e.target.value])
    }

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
            case "category":
                console.log(`ok masok`)
                setCategory(e.target.value)
                setCategoryError(false)
                break;
            case "description":
                console.log(`ini desc`)
                setDescription(e.target.value)
                setDescriptionError(false)
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
            fetchProducts()
            setOpen(false)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const submitForm = () => {
        if (!productName){
            setProductNameError(true)
        } else if (!image_url ){
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
                stock,
                category,
                description,
                availableSize
            }
            addProduct(data)
        }
    }

    const findByCategory = (e, category) => {
        if(e){
            e.preventDefault()
        }
        const newProducts = []


        products.forEach(product => {
            if (product.category.toLowerCase() === category.toLowerCase()){
                newProducts.push(product)
            } else if (category === 'all') {
                newProducts.push(product)
            }
        })
        setShowProducts(newProducts)
    }


    const fetchProducts = () => {
        dispatch(setLoading(true))
        axios({
            method: 'GET',
            url: 'http://localhost:3000/product'
        })
        .then(({ data }) => {
            dispatch(setProducts(data))
            dispatch(setLoading(false))
            setShowProducts(data)
        })
        .catch( err => {
            console.log(err)
            dispatch(setError(true))
        })
    }

    useEffect(() => {
        dispatch(setLoading(true))
        findByCategory('', 'all')
        if (products.length === 0){
            fetchProducts()
        }
    }, [])

    useEffect(() => {
        setProductName(selectedProduct.productName)
        setImageUrl(selectedProduct.image_url)
        setPrice(selectedProduct.price)
        setStock(selectedProduct.stock)
        setAvailableSize(selectedProduct.availableSize)
        setDescription(selectedProduct.description)
        setCategory(selectedProduct.category)
    }, [selectedProduct])




    return (
        <div className="dashboard-container">
            <div className="menu-dashboard">
                <ul>
                    <li><a href="" onClick={(e) => {findByCategory(e,`all`)}} style={{ textDecoration: 'none', color: 'black'}}>All</a></li>
                    <Divider variant="light" style={{ marginTop: '0.5vh', marginBottom: '0.5vh'}} />
                    <li><a href="" onClick={(e) => {findByCategory(e, `top`)}} style={{ textDecoration: 'none', color: 'black'}}>Top</a></li>
                    <Divider variant="light" style={{ marginTop: '0.5vh', marginBottom: '0.5vh'}} />
                    <li><a href="" onClick={(e) => {findByCategory(e, `bottom`)}} style={{ textDecoration: 'none', color: 'black'}}>Bottom</a></li>
                    <Divider variant="light" style={{ marginTop: '0.5vh', marginBottom: '0.5vh'}} />
                    <li><a href="" onClick={(e) => {findByCategory(e, `footwear`)}} style={{ textDecoration: 'none', color: 'black'}}>Footwear</a></li>
                    <Divider variant="light" style={{ marginTop: '0.5vh', marginBottom: '0.5vh'}} />
                    <li><a href="" onClick={(e) => {findByCategory(e, `eyewear`)}} style={{ textDecoration: 'none', color: 'black'}}>Eyewear</a></li>
                    <Divider variant="light" style={{ marginTop: '0.5vh', marginBottom: '0.5vh'}} />
                    <li><a href="" onClick={(e) => {findByCategory(e, `headwear`)}} style={{ textDecoration: 'none', color: 'black'}}>Headwear</a></li>
                    <Divider variant="light" style={{ marginTop: '0.5vh', marginBottom: '0.5vh'}} />
                    <li><a href="" onClick={(e) => {findByCategory(e, `others`)}} style={{ textDecoration: 'none', color: 'black'}}>Others</a></li>
                    <Divider variant="light" style={{ marginTop: '0.5vh', marginBottom: '0.5vh'}} />
                    
                </ul>
            </div>
            <div>
                <div style={{ textAlign: 'right', marginRight: '4vh'}}>
                {
                    userRole === 'admin' &&
                    <Button variant="outlined" color="primary" onClick={handleClickOpen} >
                        Add Product
                    </Button>
                }
                </div>
                <div className="products-container">
                    {
                        showProducts && 
                        showProducts.map(datum => {
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
                        <FormControl variant="outlined" style={{ marginTop: '3vh'}}>
                            <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                            <Select
                            name="category"
                            error={categoryError}
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Category"
                            onChange={(e) => { inputHandler(e)}}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="Top">Top</MenuItem>
                            <MenuItem value="Bottom">Bottom</MenuItem>
                            <MenuItem value="footwear">Footwear</MenuItem>
                            <MenuItem value="eyewear">Eyewear</MenuItem>
                            <MenuItem value="headwear">Headwear</MenuItem>
                            <MenuItem value="others">Others</MenuItem>
                            </Select>
                        </FormControl>
                        <p style={{ marginTop: '3vh'}}>Available size</p>
                        <div style={{ display: 'flex'}}>
                            {
                                sizeValue.map(data => {
                                    return (
                                        <div style={{ display: 'flex', alignItems: 'center'}}>
                                                <Radio
                                                    value={data}
                                                    color="default"
                                                    name="product size"
                                                    inputProps={{ 'aria-label': 'E' }}
                                                    size="small"
                                                    onClick={(e) => {sizeHandler(e)}}
                                                />
                                                <label>{data}</label>
                                            </div>
                                    )
                                })
                            }
                        </div>
                        
                        <TextareaAutosize 
                            aria-label="empty textarea" 
                            placeholder="description" 
                            name="description" 
                            error={descriptionError} 
                            style={{ marginTop: '3vh'}}                             
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

            <Dialog
                open={deleteDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={deleteHandleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Are you sure want to delete this product?</DialogTitle>
                <div style={{ margin: 'auto'}}>
                    <Paper style={{ width: '50vh', display: 'flex', flexFlow: 'row wrap', padding: '1vh', justifyContent: 'space-evenly'}}>
                        <img src={selectedProduct.image_url} style={{ width: '10vh'}} />
                        <div className="deleteContainer">
                            <h5>{selectedProduct.productName}</h5>
                            <p>{selectedProduct.description}</p>
                            <p>Rp {selectedProduct.price}</p>
                            <p>Stock : {selectedProduct.stock} Pcs </p>
                        </div>

                    </Paper>
                </div>
                <DialogContent>
                    <Button onClick={() => { deleteProduct(selectedProduct.id)}}>Yes</Button>
                    <Button onClick={() => { deleteHandleClose()}}>Cancel</Button>
                </DialogContent>
            </Dialog>



            {/* <- edit dialog-> */}

            <Dialog
                open={dialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Edit Product</DialogTitle>
                <DialogContent>
                    <FormControl>
                        <TextField
                            error={productNameError}
                            label="Product Name"
                            name="product name"
                            value={productName}
                            id="outlined-margin-normal"
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => { inputHandler(e)}}
                        />
                        <TextField
                            error={imageError}
                            label="Image Url"
                            name="image_url"
                            value={image_url}
                            id="outlined-margin-normal"
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => { inputHandler(e)}}
                        />
                        <TextField
                            error={priceError}
                            label="Price"
                            name="price"
                            value={price}
                            id="outlined-margin-normal"
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => { inputHandler(e)}}
                        />
                        <TextField 
                            error={stockError}
                            type="number"
                            name="stock"
                            value={stock}
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
                        <FormControl variant="outlined" style={{ marginTop: '3vh'}}>
                            <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                            <Select
                            name="category"
                            error={categoryError}
                            labelId="demo-simple-select-outlined-label"
                            value={category}
                            id="demo-simple-select-outlined"
                            label="Category"
                            onChange={(e) => { inputHandler(e)}}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="Top">Top</MenuItem>
                            <MenuItem value="Bottom">Bottom</MenuItem>
                            <MenuItem value="Footwear">Footwear</MenuItem>
                            <MenuItem value="eyewear">Eyewear</MenuItem>
                            <MenuItem value="headwear">Headwear</MenuItem>
                            <MenuItem value="others">Others</MenuItem>
                            </Select>
                        </FormControl>
                        <p style={{ marginTop: '3vh'}}>Available size</p>
                        <div style={{ display: 'flex'}}>
                            {
                                sizeValue.map(data => {
                                    return (
                                        <div style={{ display: 'flex', alignItems: 'center'}}>
                                                <Radio
                                                    value={data}
                                                    color="default"
                                                    checked={getCheckedSize(data)}
                                                    name="product size"
                                                    inputProps={{ 'aria-label': 'E' }}
                                                    size="small"
                                                    onClick={(e) => {sizeHandler(e)}}
                                                />
                                                <label>{data}</label>
                                            </div>
                                    )
                                })
                            }
                        </div>
                        
                        <TextareaAutosize 
                            aria-label="empty textarea" 
                            value={description}
                            name="description" 
                            error={descriptionError} 
                            style={{ marginTop: '3vh'}}                             
                            onChange={(e) => { inputHandler(e)}}
                        />

                        <DialogActions>
                            <Button onClick={() => {editClose()}} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={() => {submitEdit(selectedProduct.id)}} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </FormControl>
                </DialogContent>
            </Dialog>

        </div>
    )
}