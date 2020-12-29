import '../App.css'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import { Button, IconButton } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { setUserRole } from '../store/actions/actions'


export default function Navbar () {
    const { userRole } = useSelector(state => state)
    const history = useHistory()
    const dispatch = useDispatch()
    // console.log(userRole)
    // window.addEventListener('scroll', function() {
    //     let header = document.querySelector('header')
    //     header.classList.toggle('sticky', window.screenY == 0)
    //     console.log(window.screenY)
    // })

    const signOut = () => {
        localStorage.clear()
        dispatch(setUserRole('costumer'))
        history.push('/')
    }
    
    return (
        <header>
            <h1><Link to="/" style={{ textDecoration: 'none', color: 'black'}}>O-Mart</Link></h1>
            {
                localStorage.getItem('access_token') && userRole === 'admin' &&
                <ul>
                    <li><Button onClick={() => {signOut()}}>Signout</Button></li>
                </ul>
            }
            {
                localStorage.getItem('access_token') && userRole !== 'admin' &&
                <ul>
                    <li><IconButton><Link to="/cart"><AddShoppingCartIcon/></Link></IconButton></li>
                    <li><Button onClick={() => {signOut()}}>Signout</Button></li>
                </ul>
            }
            {
                !localStorage.getItem('access_token') &&
                <ul>
                    <li><IconButton><Link to="/cart"><AddShoppingCartIcon/></Link></IconButton></li>
                    <li><Button><Link to="/login" style={{ textDecoration: 'none', color: 'black'}}>Signin</Link></Button></li>
                </ul>
            }
        </header>
    )
}