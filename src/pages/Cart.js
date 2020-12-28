import React from 'react'
import { withStyles } from '@material-ui/core'
import { TableHead, TableBody, TableCell, TableContainer, Table, TableRow, Button, IconButton } from '@material-ui/core'
import { useSelector } from 'react-redux'
import DeleteIcon from '@material-ui/icons/Delete'

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
    const { products } = useSelector (state => state)
    return (
        <div>
            <div style={{ padding: '10vh'}}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
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
                            products.map(product => {
                                return(
                                    <StyledTableRow style={{ textAlign: 'center'}}>
                                        <StyledTableCell style={{ textAlign: 'center'}}><img src={product.image_url} alt={product.productName} style={{ width: '10vh'}} /></StyledTableCell>
                                        <StyledTableCell>{product.productName}</StyledTableCell>
                                        <StyledTableCell>{product.price}</StyledTableCell>
                                        <StyledTableCell>{product.stock}</StyledTableCell>
                                        <StyledTableCell>{(product.price * product.stock)}</StyledTableCell>
                                        <StyledTableCell>
                                            <div>
                                            <Button>Checkout</Button>
                                            <IconButton><DeleteIcon/></IconButton>
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
        </div>
    )
}