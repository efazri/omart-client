import { Button, IconButton } from '@material-ui/core'
import axios from 'axios'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import { useHistory } from 'react-router-dom'


export default function Product_Card (props) {
    const { product } = props
    const history = useHistory()

    function productDetail(id){
        history.push(`/${id}`)
    }

    const addToCart = () => {
        axios({
            url: 'http://localhost:3000/cart',
            method: 'POST',
            headers: {
                access_token : localStorage.getItem('access_token')
            },
            data: {
                product
            }
        })
        .then( resp => {
            console.log(`success`)
        })
        .catch(err => {
            console.log(err)
        })
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
                    <div>
                        <IconButton onClick={() => {addToCart()}}>
                            <AddShoppingCartIcon/>
                        </IconButton>
                        <Button onClick={() => { buyProduct(product.id)}}>Buy now</Button>
                    </div>
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