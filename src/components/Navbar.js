import '../App.css'
import React from 'react'
import { Link } from 'react-router-dom'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import { Button, IconButton } from '@material-ui/core'

export default function Navbar () {
    // window.addEventListener('scroll', function() {
    //     let header = document.querySelector('header')
    //     header.classList.toggle('sticky', window.screenY > 0)
    //     console.log(window.screenY)
    // })
    
    return (
        <header>
            <h1>Omart</h1>
            {
                localStorage.getItem('access_token') &&
                <ul>
                    <li><Button>Cart</Button></li>
                    <li><Button>Signout</Button></li>
                </ul>
            }
            {
                !localStorage.getItem('access_token') &&
                <ul>
                    <li><IconButton><Link to="/cart"><AddShoppingCartIcon/></Link></IconButton></li>
                    <li><Button>Signin</Button></li>
                    <li><Button>Signup</Button></li>
                </ul>
            }
        </header>
    )
}