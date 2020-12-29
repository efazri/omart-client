import { Button, IconButton } from '@material-ui/core'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { useHistory } from 'react-router-dom'
import { setDeleteDialog, setSelectedProduct, setDialog } from '../store/actions/actions'


export default function Product_Card (props) {
    const { product } = props
    const { userRole } = useSelector (state => state)
    const history = useHistory()
    const dispatch = useDispatch()

    const deleteHandleOpen = () => {
        dispatch(setDeleteDialog(true))
        dispatch(setSelectedProduct(product))
    }

    const editProduct = () => {
        dispatch(setSelectedProduct(product))
        setTimeout(() => {
            dispatch(setDialog(true))
        }, 500);
    }

    function productDetail(id){
        history.push(`/${id}`)
    }

    const addToCart = (id) => {
        history.push('/' + id)
    }

    const buyProduct = (id) => {
        history.push('/checkout')
    }

    return (
        <div style={{ marginTop: '20vh', width: '20%'}}>
            <div style={{ width: '80%'}}>
                <div style={{ width: '100%', height: '30vh', textAlign:'center'}} onClick={() => productDetail(product.id)}>
                    <img src={product.image_url} alt={product.productName} style={{ width: '100%', height: `100%`, objectFit: 'scale-down'}} />
                </div>
                <div style={{marginTop: '3vh'}}>
                    <div style={{ height: '15vh'}}>
                        <h4>{product.productName}</h4>
                        <p>Rp {product.price}</p>
                        <p>Stock: {product.stock}</p>
                    </div>
                    {
                        userRole !== 'admin' &&
                        <div>
                            <IconButton onClick={() => {addToCart(product.id)}}>
                                <AddShoppingCartIcon/>
                            </IconButton>
                            <Button onClick={() => { buyProduct(product.id)}}>Buy now</Button>
                        </div>
                    }
                    {
                        userRole === 'admin' &&
                        <div style={{ display: 'flex', justifyContent: 'space-evenly'}}>
                            <IconButton onClick={() => {editProduct()}}>
                                <EditOutlinedIcon/>
                            </IconButton>
                            <IconButton onClick={() => {deleteHandleOpen()}}>
                                <DeleteOutlineOutlinedIcon/>
                            </IconButton>
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}




// <Card onClick={()=> productDetail(product.id)}>
//                 <CardMedia 
//                     component="img"
//                     className={classes.cover}
//                     alt="al"
//                     image = {product.image_url}
//                     title="image prod"
//                 />
//                 <CardContent>
//                     <Typography>{product.productName}</Typography>
//                     <Typography component="p" style={{ fontFamily : 'Work Sans, sans-serif;'}}>Rp {product.price}</Typography>
//                     <p>stock: {product.stock}</p>

//                 </CardContent>
//                 <CardActions className={classes.button_style}>
//                     <IconButton><AddShoppingCartIcon/></IconButton>
//                     <Button>Buy now</Button>
//                 </CardActions>
//             </Card>