import React, { useState, useEffect } from 'react'
import axios from 'axios'
import imageBackground from '../assets/16108.jpg'
import { Paper, FormControl, TextField, InputAdornment, Button } from '@material-ui/core'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserRole, setError } from '../store/actions/actions'
import jwt from 'jsonwebtoken'

export default function Login () {
    const [ currentPage, setCurrentPage ] = useState('login')
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ address, setAddress ] = useState('')
    const [ firstNameError, setFirstNameError ] = useState(false)
    const [ lastNameError, setLastNameError ] = useState(false)
    const [ emailError, setEmailError ] = useState(false)
    const [ passwordError, setPasswordError ] = useState(false)
    const [ addressError, setAddressError ] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()


    const login = (data) => {
        axios({
            url: 'http://localhost:3000/login',
            method: 'POST',
            data
        })
        .then(({ data }) => {
            localStorage.setItem('access_token', data.access_token)
            const decoded = jwt.verify(data.access_token, 'JWT_SECRET')
            console.log(decoded)
            dispatch(setUserRole(decoded.role))
            history.push('/')
        })
        .catch(err => {
            console.log(err)
        })
    }

    const inputHandler = (e) => {
        switch (e.target.name) {
            case "first name":
                setFirstName(e.target.value)
                setFirstNameError(false)
                break;
            case "last name":
                setLastName(e.target.value)
                setLastNameError(false)
                break;
            case "email":
                setEmail(e.target.value)
                setEmailError(false)
                break;
            case "password":
                setPassword(e.target.value)
                setPasswordError(false)
                break;
            case "address":
                setAddress(e.target.value)
                setAddressError(false)
                break;
            default:
                break;
        }
    }

    const loginValidation = () => {
        if (!email){
            setEmailError(true)
        } else if (!password ){
            setPasswordError(true)
        } else {
            const data = {
                email,
                password
            }
            login(data)
        }
    }

    const register = () => {
        console.log(password, email)
        if (!email){
            setEmailError(true)
        } else if (!password ){
            setPasswordError(true)
        } else if (!firstName){
            setFirstNameError(true)
        } else if (!lastName){
            setLastNameError(true)
        } else if (!address){
            setAddressError(true)
        } else {
            const data = {
                email,
                password,
                name: firstName + lastName,
                address
            }
            axios({
                url: 'http://localhost:3000/register',
                method: 'POST',
                data
            })
            .then(data => {
                console.log(data)
                setCurrentPage('login')
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    const changePage = (e) => {
        e.preventDefault()
        if (currentPage === 'login') {
            setCurrentPage('register')
            setEmail('')
            setPassword('')
            setEmailError(false)
            setPasswordError(false)
        } else {
            setCurrentPage("login")
            setEmail('')
            setPassword('')
            setFirstName('')
            setLastName('')
            setAddress('')
            setEmailError(false)
            setPasswordError(false)
            setFirstNameError(false)
            setLastNameError(false)
            setAddressError(false)
        }
    }

    useEffect(() => {
        if(localStorage.getItem('access_token')){
            history.push('/')
        }
    })



    return (
        <div>
            <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around'}}>
                <div style={{ textAlign: 'center', marginTop: '18vh', margin: 'auto'}}>
                    {
                        currentPage === 'login' &&
                        <Paper style={{ width: '50vh', height: '55vh', padding: '2vh'}}>
                            <h1 style={{ marginBottom: '2vh'}}>Signin</h1>
                            <FormControl>
                            <TextField
                                error={emailError}
                                id="input-with-icon-textfield"
                                label="Email"
                                name="email"
                                margin="normal"
                                InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                    <MailOutlineIcon />
                                    </InputAdornment>
                                ),
                                }}
                                onChange={(e) => {inputHandler(e)}}
                            />
                            <TextField
                                error={passwordError}
                                id="input-with-icon-textfield"
                                label="Password"
                                name="password"
                                type="password"
                                margin="normal"
                                InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                    <LockOutlinedIcon />
                                    </InputAdornment>
                                ),
                                }}
                                onChange={(e) => {inputHandler(e)}}
                            />
                            <Button color="primary" variant="contained" style={{ marginTop: '1vh'}} onClick={(e) => {loginValidation(e)}}>Login</Button>
                            </FormControl>
                            <p style={{ fontSize: '70%', marginTop: '1vh'}}>forget password?</p>
                            <p style={{ fontSize: '70%', marginTop: '2vh'}}>Don't have an account? 
                                <a href="" onClick={(e) => {changePage(e)}} style={{ textDecoration: 'none', color: 'black', margin: '0.3vh', fontWeight: 'bold'}}>Signup</a> now
                            </p>
                        </Paper>
                    }
                    {
                        currentPage === 'register' &&
                        <Paper style={{ width: '50vh', height: '73vh', padding: '2vh'}}>
                            <h1 style={{ marginBottom: '2vh'}}>Signup</h1>
                            <FormControl>
                            <div style={{ display: 'flex', justifyContent: 'space-evenly'}}>
                                <TextField
                                    error={firstNameError}
                                    style={{ marginRight: '1vh'}}
                                    name="first name"
                                    id="input-with-icon-textfield"
                                    label="First name"
                                    margin="normal"
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <AccountCircleOutlinedIcon />
                                        </InputAdornment>
                                    ),
                                    }}
                                    onChange={(e) => {inputHandler(e)}}
                                />
                                <TextField
                                    error={lastNameError}
                                    id="input-with-icon-textfield"
                                    label="Last name"
                                    name="last name"
                                    margin="normal"
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <AccountCircleOutlinedIcon />
                                        </InputAdornment>
                                    ),
                                    }}
                                    onChange={(e) => {inputHandler(e)}}
                                />
                            </div>
                            <TextField
                                error={emailError}
                                id="input-with-icon-textfield"
                                label="Email"
                                name="email"
                                margin="normal"
                                InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                    <MailOutlineIcon />
                                    </InputAdornment>
                                ),
                                }}
                                onChange={(e) => {inputHandler(e)}}
                            />
                            <TextField
                                error={passwordError}
                                id="input-with-icon-textfield"
                                label="Password"
                                type="password"
                                name="password"
                                margin="normal"
                                InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                    <LockOutlinedIcon />
                                    </InputAdornment>
                                ),
                                }}
                                onChange={(e) => {inputHandler(e)}}
                            />
                            <TextField
                                error={addressError}
                                id="input-with-icon-textfield"
                                label="Address"
                                name="address"
                                margin="normal"
                                InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                    <HomeOutlinedIcon />
                                    </InputAdornment>
                                ),
                                }}
                                onChange={(e) => {inputHandler(e)}}
                            />
                            <Button color="primary" variant="contained" style={{ marginTop: '1vh'}} onClick={(e) => {register(e)}}>Register</Button>
                            </FormControl>
                            <p style={{ fontSize: '70%', marginTop: '2vh'}}>Already have account? 
                                <a href="" onClick={(e) => {changePage(e)}} style={{ textDecoration: 'none', color: 'black', margin: '0.3vh', fontWeight: 'bold'}}>Signin</a> here
                            </p>
                        </Paper>
                    }
                </div>
                <div style={{ width: '40%'}}>
                    <img src={imageBackground} style={{ position: 'relative', width: '100%', height: '100vh', objectFit: 'scale-down', marginLeft: '-20vh'}} />
                </div>
            </div>
        </div>
    )
}