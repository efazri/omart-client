import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { withStyles } from '@material-ui/core'
import { TableHead, TableBody, TableCell, TableContainer, Table, TableRow, Button, Checkbox, IconButton, Divider, Slide, Dialog, Paper, DialogTitle, DialogContent } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { setCart } from '../store/actions/actions'
import { Link } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete'
import { useHistory } from 'react-router-dom'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      textAlign: 'center',
      fontWeight: 'bold'
    },
    body: {
      fontSize: 14,
      textAlign: 'center'
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
}))(TableRow);



export default function Cart(){
    const { products, cart } = useSelector (state => state)
    const [ checked, setChecked ] = useState(true)
    const [ dialog, setDialog ] = useState (false)
    const [ deleteId, setDeleteId ] = useState(0)
    const history = useHistory()
    const dispatch = useDispatch()

    const getHistory = (e) => {
        e.preventDefault()
    }

    const handleChange = (id, value) => {
        let newValue = false

        if (value) {
            newValue = false
        } else {
            newValue = true
        }

        axios({
            url: 'http://localhost:3000/cart/' + id,
            method: 'PATCH',
            headers: {
                access_token : localStorage.getItem('access_token')
            },
            data: {
                checkout : newValue
            }
        })
        .then( resp => {
            fetchCart()
        })
        .catch ( err => {
            console.log(err)
        })
        
    };


    const deleteCartHandleOpen = (id) => {
        setDialog(true)
        setDeleteId(id)
    }

    const deleteCart = () => {
        axios({
            url: 'http://localhost:3000/cart/' + deleteId,
            method: 'Delete',
            headers: {
                access_token : localStorage.getItem('access_token')
            }
        })
        .then( data => {
            fetchCart()
            setDialog(false)
        })
        .catch( err => {
            console.log(err)
        })
    } 

    const deleteHandleClose = (id, value) => {
       setDialog(false)
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
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        if (!localStorage.getItem('access_token')){
            history.push('/login')
        } else if (cart.length === 0){
            fetchCart()
        }
    }, [])


    return (
        <div>
            <div style={{ padding: '10vh'}}>
            <div style={{ width: '15%', margin: 'auto', marginTop: '5vh'}}>
            <lu style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-evenly'}}>
                <li><a href="" onClick={(e) => { getHistory(e) }} style={{ textDecoration: 'none', color: 'grey'}} >History</a></li>
                <li><Link to="/checkout" style={{ textDecoration: 'none', color: 'grey'}}>Checkout</Link></li>
            </lu>
            </div>
            <Divider variant="light" style={{ marginTop: '2vh', marginBottom: '2vh'}} />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell>Product Name</StyledTableCell>
                            <StyledTableCell>Price</StyledTableCell>
                            <StyledTableCell>Qty</StyledTableCell>
                            <StyledTableCell>Total Amount</StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {   
                            cart.length !== 0 &&
                            cart.map(product => {
                                return(
                                    <StyledTableRow style={{ textAlign: 'center'}}>
                                        <StyledTableCell style={{ textAlign: 'center'}}>
                                            <Checkbox
                                                checked={product.checkout}
                                                onClick={() => handleChange(product.id, product.checkout)}
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell style={{ textAlign: 'center'}}><img src={product.image_url} alt={product.productName} style={{ width: '10vh'}} /></StyledTableCell>
                                        <StyledTableCell>{product.productName}</StyledTableCell>
                                        <StyledTableCell>{product.price}</StyledTableCell>
                                        <StyledTableCell>{product.amount}</StyledTableCell>
                                        <StyledTableCell>{product.totalAmount}</StyledTableCell>
                                        <StyledTableCell>
                                            <div>
                                            <Button>Checkout</Button>
                                            <IconButton onClick={() => {deleteCartHandleOpen(product.id)}}><DeleteIcon/></IconButton>
                                            </div>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            
            </div>

            <Dialog
                open={dialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={deleteHandleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Are you sure want to delete this product?</DialogTitle>
                <DialogContent>
                    <Button onClick={() => { deleteCart()}}>Yes</Button>
                    <Button onClick={() => { deleteHandleClose()}}>Cancel</Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}